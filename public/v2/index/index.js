// var hotLive = require('./hot-live.js') // 热门直播
// var newsOpinion = require('./news-opinion.js') // 最新观点
var hotRefer = require('./hot-refer.js') // 热卖内参
    // var askStock = require('./ask-stock.js') // 投顾问股
    // var ynwHeadline = require('./ynw-headline.js') // 约牛头条
    // var ynwRanking = require('./ynw-ranking.js') // 牛人排行
var banner = require('./banner.js') // 轮播图
var topic = require('./indexTopic.js') //首页话题

var askWindow = require('base/askWindow.js'); //提问
var error = require("e/error-type")
    ////////////////////////////////////////////////////////////////////////
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
    /*支出*/
    //直播
var liveList = (function() {
    var slide, slideHeight, tab, container, isCare, items
    var tick = function() {
        var move = function() {
            slide.each(function(i, num) {
                var first = $(num).find('.info:eq(0)');
                var height = first.outerHeight();
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

    return {
        init: function() {
            container = $('.hot-live')
            items = container.find('.content')

            //点击切换
            tab = {
                'live-active-first': $('.live-active-first'),
                'live-pop-first': $('.live-pop-first'),
                'live-active-second': $('.live-active-second'),
                'live-pop-second': $('.live-pop-second')
            }
            slideHeight = $('.string').height()
            slide = $('.slide')
            tick()

            // 点击提问
            items.on('click', '.item-ask', function() {
                var teacherid = $(this).parents('.item-bottom').data('teacherid')
                var teachername = $(this).parents('.item-bottom').prev().find('.teacherName').text();
                if (ynTeacherId == teacherid) return layer.msg("扪心自问");

                askWindow.aimedRender({
                    select: { id: teacherid, name: teachername}
                })
            })

            // 点击关注
            items.on('click', '.item-care', function() {
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

            //活跃/人气
            container.on('click', '.liveRoom_action', function() {
                $(this).addClass('select').siblings().removeClass('select')
                var type = $(this).data('show')
                _.forEach(tab, item => item.hide())
                tab[type].show()
                container.find('.action').attr('data-type', type)
            })

            //换一换
            var isFirst = true
            container.on('click', '.action', function() {
                var type = $(this).attr('data-type')
                if (type == 'live-active-first' && isFirst) {
                    _.forEach(tab, item => item.hide())
                    tab['live-active-second'].show()
                    isFirst = false
                } else if (type == 'live-active-first' && !isFirst) {
                    _.forEach(tab, item => item.hide())
                    tab['live-active-first'].show()
                    isFirst = true
                }
                if (type == 'live-pop-first' && isFirst) {
                    _.forEach(tab, item => item.hide())
                    tab['live-pop-second'].show()
                    isFirst = false
                } else if (type == 'live-pop-first' && !isFirst) {
                    _.forEach(tab, item => item.hide())
                    tab['live-pop-first'].show()
                    isFirst = true
                }
            })
        }
    }

})()


// 牛人排行
var ynwRanking = (function() {
    var container, items
    return {
        init: function() {
            container = $('.ranking-content')
            items = container.find('.ranking-main')

            container.on('click', '.ranking-title-list', function() {
                var type = $(this).data('type')
                $(this).addClass('select').siblings().removeClass('select')
                items.hide().each(function(i) {
                    if (type == i) {
                        $(this).fadeIn()
                    }
                })
            })
        }
    }
})()


//最新观点
var newsOpinion = (function() {
    var container, items
    return {
        init: function() {
            container = $('.news-opinion')
            items = container.find('.news-opinion-content')

            container.on('mouseenter', '.news-list', function() {
                var type = $(this).data('type')
                $(this).addClass('select').siblings().removeClass('select')
                items.hide().each(function(i) {
                    if (type == i) {
                        $(this).show()
                    }
                })
            })
        }
    }
})()


//问股
var askList = (function() {
    var container, items
    return {
        init: function() {
            container = $('.ask-stock')
            items = container.find('.stocklist')
                //收起展开
            var isPackage = true
            items.on('click', '.ask-off-text', function() {
                if (isPackage) {
                    $(this).text('收起')
                    $(this).parents('.stocklist').find('.ask-content-all').show()
                    $(this).parents('.stocklist').find('.ask-content-str').hide()
                    isPackage = false
                } else {
                    $(this).text('展开')
                    $(this).parents('.stocklist').find('.ask-content-str').show()
                    $(this).parents('.stocklist').find('.ask-content-all').hide()
                    isPackage = true
                }
            })

            container.on('click', '.ask-btn', function() {
                askWindow.render()
            })
        }
    }
})()


//有牛股弹窗
// var btop = (function() {
//     var container
//     return {
//         init: function() {
//             container = $('#toTopWin')
//             container.on('click', '.know', function() {
//                 btop.hidden()
//             })
//         },
//         render: function() {
//             container.show()
//         },
//         hidden: function() {
//             container.find('.toTop').css('animationName', 'zoomOut')
//             setTimeout(function() {
//                 container.hide()
//             }, 170)
//         }
//     }
// })()


//1元领取弹窗
var receive = (function() {
    var container
    return {
        init: function() {
            container = $('#price1')
            container.on('click', '.close', function() {
                receive.hidden()
            })
        },
        render: function() {
            container.show()
        },
        hidden: function() {
            container.find('.toTop').css('animationName', 'zoomOut')
            setTimeout(function() {
                container.hide()
            }, 170)
        }
    }
})()
$(function() {

    askWindow.init()
    liveList.init()
    ynwRanking.init()
    newsOpinion.init()
    banner.init()
    topic.init()
        // btop.init();
        // receive.init()
    banner.render()
        // referList.init()
    askList.init()
    hotRefer.init()
    hotRefer.render()


    /* 未登录 = 弹出一次 */
    var last = localStorage['refer-pop-time']
    var now = _.now()
    if (!last || (now - last > 60 * 30 * 1000)) {
        localStorage['refer-pop-time'] = _.now()
            // btop.render()
            // receive.render()
            // setTimeout(function() {
            //     // btop.hidden()
            // }, 7000)
            // setTimeout(function() {
            //     receive.hidden()
            // }, 30000)
    }
})
