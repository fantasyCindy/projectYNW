/*  
    jsp结构
    <!-- 热门直播 -->
    <div class="hot-live overflow">
        <div class="title-1">
            <span class="title-icon"></span>
            <a href="${live_path}/live/" class="text">热门直播</a>
            <div class="action f1 fr cursor">
                <span>换一批</span>
                <i class="fa fa-refresh"></i>
            </div>
        </div>
        <div class="content overflow"></div>
    </div>

    初始化
    hotLive.init()

    获取数据
    hotLive.render()
*/

require('./hot-live.css')
var ajax = require('module/ajax.js') //接口
var local = require('module/lib/localData.js'); //本地缓存
var askWindow = require('base/askWindow.js'); //提问
var error = require('e/error-type')

var hotLive = function() {
    var query = { page: 1, rows: 8, type: 2 },
        container, items, count = 1,
        isCare, slideHeight, slide, timerBig, allobj, allurl;
    var normal,
        showCount = '',
        pageCount = 0;


    //chuangji
    var create = (arr, link) => {
        return _.map(arr, item => {
            if (item.contentFilter) {
                item._contentFilter = item.contentFilter.substr(0, 45) //内容
                item._contentFilter = item._contentFilter.replace(/&nbsp;/g, " ");
                item._contentFilter = item._contentFilter.replace(/&nbs/g, " ");
            } else {
                item._contentFilter = '[图片]'
            }
            return `<div class="info overflow"><span class="fl color999">${item.pubtimeString}</span><a href="${link}" target="_blank" class="fl itemleft">${item._contentFilter}</a></div>`
        }).join("")
    }


    var createNormal = arr => {
            var index = 0
            return _.map(arr, item => {
                var _link = `${live_path}live/${item.teacherid}/` //跳转链接
                var opinionLink = `${live_path}dapan/${item.teacherid}/` //链接
                item._status = +item.status === 0 ? "online" : "offline"; //显示隐藏
                item._color = +item.status === 0 ? "" : "color153"; //无直播时的样式
                item._content = item.content ? item.content : item.description //老师的介绍
                item._content = item._content.replace(/&nbsp;/g, " ");
                //老师是否有直播内容
                if (item.broadcastingList) {
                    var tag = item.broadcastingList.length != 0 ? create(item.broadcastingList, _link) : '<div style="margin-top:20px;text-align:center;">暂无直播内容</div>'
                }
                //滚动
                if (item.todaysubject) {
                    item._todaysubject = item.todaysubject.length > 18 ? item.todaysubject.substring(0, 18) + '...' : item.todaysubject
                } else {
                    item._todaysubject = '未设置直播主题'
                }
                item.__bcount = +item.status === 0 ? item._todaysubject : "离线"; //直播主题

                var isCare = item.isAttention ? '已关注' : '关注' //已关注
                index = index + 1
                item.icon = item.is_btop == 1 ? `<i class="btop btop1"><img src="${item.tag_img}"></i>` : ''

                return `<div class="hot-live item ${index % 2 == 0 ? 'fr':'fl'} frame-shadow ${item._status}" id="teacher${item.roomid}">
                        ${item.icon}
                        <div class="item-wrap ${item._color}">
                            <div class="item-top overflow">
                                <a href="${_link}" target="_blank" data-teacherid="${item.teacherid}" class="avatar image border-radius fl"><img src="${item.photo}" alt="${item.title}"></a>
                                <div class="name fl">
                                    <a href="${_link}" target="_blank">
                                        <span class="teacherName f3 b">${item.title}</span>
                                        <span class="color666 f2"><i class='item-icon item-icon-guwen'><img src="${item.type_ioc}" alt="" /></i>${item.type_name}</span>
                                    </a>
                                    <div class='f2 color666'><i class='item-icon item-icon00'></i>${item.__bcount}</div>
                                </div>
                            </div>
                            <div class="string f2 overflow relative">
                                <div class="slide">${tag}</div>
                                <div class="no-live color666">${item._content}</div>
                            </div>
                        </div>
                        <div class="item-bottom f5 overflow" data-teacherid="${item.teacherid}" data-price="${item.questionsPrice}">
                            <span class="item-bottom-span cursor item-care fl">
                                <i class='item-icon item-icon1'></i>
                                <span class="care-live">${isCare}</span>
                            </span>
                            <span class="item-bottom-span cursor item-ask fl ">
                                <i class='item-icon item-icon2'></i>提问
                            </span>
                            <a href="${_link}" target="_blank" class="item-bottom-span cursor item-see fl">
                                <i class='item-icon item-icon3'></i>立即查看
                            </a>
                            <span class="item-bottom-status item-bottom-status1 cursor item-ask fl">
                                <i class='item-icon item-icon2'></i>提问
                            </span>
                            <a target="_blank" href="${opinionLink}" class="item-bottom-status cursor fl">
                                <i class="item-icon fa fa-file-text-o mr5" aria-hidden="true"></i>观点
                            </a>
                        </div>
                    </div>`
            }).join("")
        }
        /* 循环动画 */
    var tick = function() {
        var move = function() {
            slide.each(function(i, num) {
                var first = $(num).find('.info:eq(0)');
                var height = first.outerHeight();
                // $(num).velocity({ top: `-=${height}` }, {
                //     easing: "easeInOutSine",
                //     complete: function() {
                //         if (height) {
                //             $(num).append(first.get(0).outerHTML);
                //             first.remove();
                //             $(num).css('top', 0);
                //         }
                //     }
                // })
                $(num).animate({ top: `-=${height}` }, function() {
                    if (height) {
                        $(num).append(first.get(0).outerHTML);
                        first.remove();
                        $(num).css('top', 0);
                    }
                })
            })
        }

        var random = 6000 + Math.floor(Math.random() * 3) * 1000
        setTimeout(function() {
            tick()
            move()
        }, random)
    }



    // 获取数据
    var getCreate = function(obj, url) {
        getData({
            obj,
            url,
            callback: data => {
                if (data.status == 1) {
                    if (data.data) {
                        normal = data.data
                    } else {
                        normal = data
                    }

                    // normal = _.groupBy(normal, 'status')
                    // normal[0] = _.shuffle(normal[0])   //打乱
                    // pageCount = Math.max(Math.ceil(normal[0].length / showCount), 2) //显示的页数
                    // var offCount = pageCount * showCount - normal[0].length
                    // _.times(offCount, function(i) {
                    //     normal[0].push(normal[1][i])
                    // })

                    //分配页码
                    // normal[0] = normal[0].map(function(item, index) {
                    //     item.pageNum = Math.floor(index / showCount) + 1
                    //     return item
                    // })

                    //不随机
                    pageCount = Math.max(Math.ceil(normal.length / showCount), 2) //显示的页数
                    normal = normal.map(function(item, index) {
                        item.pageNum = Math.floor(index / showCount) + 1
                        return item
                    })

                    hotLive.getRooms(count)
                    slideHeight = $('.string').height()
                    slide = $('.slide')
                } else() => {
                    return layer.msg(error[data.status])
                }

            }
        })
    }

    return {
        init: function() {
            var _this = this
            tick()
            container = $(".hot-live");
            items = container.find('.content');
            askWindow.init()

            var loading = new yntool.loading({
                container: items,
                type: 3
            }).render()



            // 点击换一批
            container.on('click', '.action', () => {
                    count = count % pageCount + 1
                        // allobj.page = count % 2 + 1;
                    this.getRooms(count);
                })
                // 点击关注
            container.on('click', '.item-care', function() {
                    if (!ynIsLogin) {
                        yn.login.render();
                        return;
                    }
                    var teacherid = $(this).parent().data('teacherid')
                    var caretext = $(this).find('.care-live').text()
                    if ((+ynTeacherId == +teacherid)) return layer.msg("不能关注自己啊");
                    addCare(teacherid, caretext).done(data => {
                        if (caretext == '关注') {
                            $(this).find('.care-live').text("已关注")
                        } else {
                            $(this).find('.care-live').text("关注")
                        }
                        isCare = !isCare
                    });
                })
                // 点击提问
            container.on('click', '.item-ask', function() {
                var teacherid = $(this).parents('.item-bottom').data('teacherid');
                var teachername = $(this).parents('.item-bottom').prev().find('.teacherName').text();
                var price = $(this).parents('.item-bottom').data('price');
                if (ynTeacherId == teacherid) return layer.msg("扪心自问");

                askWindow.aimedRender({
                    select: { id: teacherid, name: teachername}
                })
            })
        },
        render: function(obj, url, object) {
            clearInterval(timerBig)
            allobj = obj
            allurl = url
            showCount = object.count
            getCreate(obj, url)
            timerBig = setInterval(function() {
                getCreate(obj, url)
            }, 50000);

        },
        getRooms: function(num) {
            // var data = _.filter(normal[0], function(item) {
            //     return item.pageNum == num
            // })

            //不随机
            var data = _.filter(normal, function(item) {
                return item.pageNum == num
            })
            items.empty()
            items.append(createNormal(data))
        }
    }
}();
// 关注
var addCare = function(teacherid, isCare) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", { teacherid: teacherid }, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            var html = isCare == '关注' ? '关注成功' : '取消成功'
            layer.msg(html);
            defer.resolve();
        } else {
            layer.msg(error[data.status])
        }

    })
    return defer.promise();
}

// 获取数据
var getData = (ops) => {
    var key = 'hotLiveRooms' + local.joinKey(ops.query)
    var cache = local.get(key, { timeout: 180, disable: true })
    if (cache && cache.valid) {
        ops.callback(cache.data)
        return;
    }
    ajax.ajax(ops.url, ops.obj, function(back) {
        ops.callback(back)
        local.set(key, back)
    })
};

module.exports = hotLive
