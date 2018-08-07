yn.navigation.name = ynconfig.navigation.b;

$(function() {

    //排序方式
    $("#liveindexLeft .sort").on('click', 'a', function() {
        $(this).parent().find('.thisclass').removeClass("thisclass")
        $(this).addClass("thisclass");
        var index = $(this).index();
        showBoradcastList(index);
    })

    ///////////////////////////////////////////////////////////////////

    //轮播图
    $.getJSON("/banner/pcBannerList.htm", function(data) {
        data = _.map(data, function(item, i) {
            if (i === 0) {
                item.style = "";
            } else {
                item.style = "hide"
            }
            return item;
        })
        yn.sliderMake($('#homeslide'));
    });


    ///////////////////////////////////////////////////////////////////

    //大盘指数
    var marindex = yn.MarketIndex();
    marindex.render($('.mar-container'), 'line');

    /////////////////////////////////////////////////////////////////////

    //直播动态
    var living = function() {
        var container = $("#livelist");
        var items = container.find('.items');
        var row = 12;
        var view = 6;
        var viewData, poolData, timer;

        var handleData = function(data) {
            return _.map(data, function(item) {
                item.shortContent = yn.filterHTML(item.shortContent, { substr: 50, trim: true });
                item.link = "/live/liveDetailLive.htm?teacherid=" + item.teacherid
                return item;
            })
        }

        var loading = new ynmodule.loading();
        loading.container = items;
        loading.type = 3;
        loading.margin = 100;

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

                //clear
                clearInterval(timer);
                timer = null;

                $.getJSON("/html/lastBroadcasting.htm", { pageSize: row }, function(data) {
                    var len = data.length;
                    if (len <= view) {
                        items.html(template("living-template", handleData(data)));
                        return;
                    }

                    //动态滚动
                    data = _.chunk(handleData(data), view);
                    viewData = data[0];
                    poolData = data[1];
                    items.html(template("living-template", viewData));
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
        var container = $('#broadcast');
        var items = container.find('.items');

        //切换
        container.on('click', '.action', function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
            broadcast.type = $(this).data('type');
            broadcast.render();
        })

        var zeroWrap = function(value) {
            var count = value || "0"
            return '<strong style="margin:0 5px">' + count + '</strong>'
        }

        var handleData = function(data) {
            return _.chain(data).map(function(item) {
                item.link = "/live/liveDetailLive.htm?teacherid=" + item.teacherid;
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

        var loading = new ynmodule.loading();
        loading.container = items;
        loading.type = 3;
        loading.margin = 300;
        loading.render();

        return {
            type: 1, // 1=最热, 2=观点最多, 3=互动最多
            render: function() {
                var self = this;
                yndata.getBroadcastList({ type: self.type }).done(function(data) {
                    data = handleData(data);
                    console.log("直播大厅" + self.type, data)
                    items.html(template('broadcast-template', data));
                })
            }
        }
    }()

    broadcast.render();


    ///////////////////////////////////////////////////////////////////


    //推荐直播
    yndata.recommendLive().done(function(data) {
        console.log("推荐直播", data);
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
    yndata.getHotTeacher({ unit: "month", row: 10 }).done(function(data) {
        console.log("新晋直播", data)

        $('#newLive .items').html(template('newLive-template', _.take(data, 5)));
    })


    ynmodule.PersonIntro.getInstance();

})
