var profile = require('~/ui/teacher-profile.js');
var teacherData = require('~/ajax/teacher.js')
yn.navigation.name = ynconfig.navigation.b;
var marindex = require('m/market-index.js');
var local = require('m/lib/localData.js')

/*///////////////////////////////////////////////////////////////////*/



$(function() {

    var li = '<li class="banner banner1" style="background:url(http://os6luyppb.bkt.clouddn.com/live_2.jpg) no-repeat center;"></li>'                            
        $('#homeslide .content ul').append(li)
        $('#homeslide .content').unslider({
            speed: 500,
            delay: 4000,
            autoplay: true
        })


    profile.init()
    profile.add('.show-person-intro')
    var num = $('.t-num').val()
        log("num",num)
        if(num == ''){
            log('kong')
            log('元素',$('.column2 .number'))
            $('.t-num').parent().hide()
        }

    //排序方式
    $("#liveindexLeft .sort").on('click', 'a', function() {
        $(this).parent().find('.thisclass').removeClass("thisclass")
        $(this).addClass("thisclass");
        var index = $(this).index();
        showBoradcastList(index);
    })

    ///////////////////////////////////////////////////////////////////
    
    //轮播图
    // $.getJSON(__path + "/banner/pcBannerList.htm", function(data) {
    //     data = _.map(data, (item, i) => {
    //         item.style = i == 0 ? "" : "hide"
    //         return item;
    //     })
    //     yn.sliderMake($('#homeslide'));
    // });


    // $('.content').unslider()

    ///////////////////////////////////////////////////////////////////

    //大盘指数
    marindex.render({
        container: $('.mar-container')
    });

    /////////////////////////////////////////////////////////////////////

    //直播动态
    var living = function() {
        var container = $("#livelist");
        var items = container.find('.items');
        var row = 12;
        var view = 6;
        var viewData, poolData, timer;
        var hasCache = false;

        var handleData = function(data) {
            return _.map(data, function(item) {
                item.shortContent = yn.filterHTML(item.shortContent, { substr: 50, trim: true });
                item.link = live_path + "/live/liveDetailLive.htm?teacherid=" + item.teacherid
                return item;
            })
        }

        var loading = new yn.loading({
            container: items,
            type: 3,
            margin: 100
        });

        var animate = function() {
            timer = setInterval(function() {
                //交换数据
                var viewLast = viewData.pop();
                var newData = poolData.shift();
                poolData.push(viewLast);
                viewData.unshift(newData);

                items.find('.item:last').remove();
                items.prepend(template("living-template", [newData]));

                var newItem = $("#living" + newData.id);
                newItem.velocity('transition.perspectiveDownIn')

            }, 4000);
        }

        return {
            render: function() {

                var key = 'live_dynamic'
                var cache = local.get(key, { timeout: 3600 })
                if (cache && cache.valid) {
                    items.html(template("living-template", cache.data));
                }

                //clear
                clearInterval(timer);
                timer = null;

                $.getJSON(__path + "/html/lastBroadcasting.htm", { pageSize: row }, function(data) {
                    var len = data.length;
                    if (len <= view) {
                        data = handleData(data)
                        items.html(template("living-template", data));
                        local.set(key, data) //缓存 
                        return;
                    }

                    //动态滚动
                    data = _.chunk(handleData(data), view);
                    viewData = data[0];
                    poolData = data[1];
                    items.html(template("living-template", viewData));
                    local.set(key, viewData) //缓存 
                    animate();
                })
            }
        }
    }()

    living.render();
    setInterval(function() {
        living.render();
    }, 30000);


    /////////////////////////////////////////////////////////////////////

    //直播大厅
    var broadcast = function() {
        var container = $('#broadcast')
        var items = container.find('.items')
        var type = 1 // 1=最热, 2=观点最多, 3=互动最多

        //切换
        container.on('mouseover', '.action', function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
            type = $(this).data('type');
            broadcast.render();
        })

        var zeroWrap = function(value) {
            var count = value || "0"
            return '<strong style="margin:0 5px">' + count + '</strong>'
        }

        var handleData = function(data) {
            return _.chain(data).map(function(item) {
                item.link = live_path + "/live/liveDetailLive.htm?teacherid=" + item.teacherid;
                item._popularity = "人气" + zeroWrap(item.popularity);
                item._answerCount = "回答问题" + zeroWrap(item.answerCount);
                item._gdCount = function() {
                    if (+broadcast.type === 3) {
                        return zeroWrap(item.hdcount) + "条互动";
                    } else {
                        return "发布直播" + zeroWrap(item.gdcount);
                    }
                }()
                return item;
            }).take(8).value()
        }

        var loading = new yn.loading({
            container: items,
            type: 3,
            margin: 300
        });
        loading.render();

        return {
            render: function() {
                var self = this;
                teacherData.broadcast({ type }, data => {
                    data = handleData(data);
                    items.html(template('broadcast-template', data));
                })
            }
        }
    }()

    broadcast.render();


    ///////////////////////////////////////////////////////////////////


    //推荐直播
    teacherData.recommend({}, data => {
        data = handleData(data);
        $('#recommend .items').html(template('recommend-template', data));

        function handleData(data) {
            return _.map(data, function(item) {
                item._userid = item.teacher.user_id;
                return item;
            })
        }
    })

    ///////////////////////////////////////////////////////////////////

    //新晋直播
    teacherData.hot({ unit: "month", type: "emerging", row: 10 }, data => {
        $('#newLive .items').html(template('newLive-template', _.take(data, 5)));
    })

})
