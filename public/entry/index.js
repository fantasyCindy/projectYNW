yn.navigation.name = "首页";
var Path = require('~/lib/path.js');
var fn = require('~/lib/fn.js');
var local = require('m/lib/localData.js');
var marindex = require('m/market-index.js');
// var countDown = require('m/countDown.js')
var askWindow;

/*///////////////////////////////////////////////////////////////////*/
/*-约牛公告-*/
var warn = (function() {
    var container, content, index = 0;
    return {
        init: function() {
            container = $('#notice');
            content = container.find('.layer-content');

            container.on('click', '.layer', function() {
                content.animate({ right: '411px' }, 300);
            })

            container.on('click', '.layer-close', function() {
                content.animate({ right: '-420px' }, 300);
            })
        }
    }
})()


/* 倒计时 */



/**
 * 轮播图
 * 原接口 banner/pcBannerList.htm 
 */
// var slider = (function() {
//     var container, items

//     // 创建标签
//     var createItems = arr => {
//         log(arr)
//         return _.map(arr, item => {
//             var style = `background:url(/public/banner/${item.name}) no-repeat center`;
//             var link = item.link ? `target="_blank" href="${item.link}"` : '';
//             return `<li class="slide-item"><a class="banner" style="${style}" ${link}></a></li>`
//         }).join('')
//     }

//     return {
//         init() {
//             container = $('#home-slide')
//             items = container.find('.content')
//         },
//         render() {

//             //加入倒计时
//             // countDown.render($('.slide-item-1'))

//             /* beautify preserve:start */
//              var sliders = [
//                     { name: "banner-home-5.jpg", link: '/about.htm' },
//                     { name: "banner-home-3.jpg", link: live_path },
//                     { name: "banner-home-2.jpg", link: ask_path },
//                     { name: "banner-home-4.jpg", link: opinion_path}
//              ]
//             /* beautify preserve:end */

//             items.find('ul').append(createItems(sliders));
//             items.unslider({
//                 autoplay: true,
//                 delay: 9000,
//                 speed: 500,
//                 animation: 'fade'
//             })
//         }
//     }
// })()


// banner统计数字
var sideTop = function() {
    var container, answerCount, zanCount

    var getData = callback => {
        var key = 'home_arcount'
        var cache = local.get(key, { timeout: 600 })
        if (cache && cache.valid) return callback(cache.data);
        $.getJSON("/consultation/queryAnswerCountAndReadCount.htm", back => {
            typeof callback == 'function' && callback(back)
            local.set(key, back)
        });
    }
    return {
        init() {
            container = $(".side-banner-top");
            answerCount = $(".answerCount");
            zanCount = $(".zanCount");

            container.on('click', '.scans-menu-item', function() {
                $(this).addClass('')
                var src = $(this).data('src');
                img.attr('src', src);
            })
        },
        render() {
            getData(data => {
                var data = data.rows;
                answerCount.text(data.answercount);
                zanCount.text(data.zancount);
            })
        }
    }
}()


log(20170401162740)


//热门直播
var hotLive = (function() {
    var container, items, query = { page: 1, rows: 6 },
        count = 2,
        loading;

    // 普通直播
    var createNormal = arr => {
        return _.map(arr, item => {
            var _link = `${live_path}live/${item.teacherid}/`
            return `<div class="item" id="teacher${item.roomid}">
                    <div class="wrap">
                        <div class="image"><a href="${_link}" target="_blank"><img src="${item.photo}" alt="${item.title}"></a></div>
                        <div class="string">
                            <div class="name">
                                <a href="${_link}" target="_blank">
                                    <span class="teacherName">${item.title}</span>
                                    <strong class="liveState${item.status}">${item._liveState}</strong>
                                </a>
                            </div>
                            <div class="info">${item.content}</div>
                            <div class="actions">
                                <span class="live"><span class="txt">直播</span>（<span class="value">${item.bcount}</span>）</span>
                                <span class="popularity"><span class="txt">人气</span>（<span class="value">${item.popularity}</span>）</span>
                            </div>
                        </div>
                    </div>
                </div>`
        }).join("")
    }


    var getData = ops => {
        var key = 'hotLiveRooms' + local.joinKey(ops.query);
        var cache = local.get(key, { timeout: 180, disable: true });
        if (cache && cache.valid) {
            ops.callback(cache.data)
            return
        }

        $.ajax({
            url: "/html/hotLiveRooms.htm",
            data: ops.query,
            dataType: 'json',
            success(data) {
                ops.callback(data)
                local.set(key, data)
            },
            error(err) {
                if (cache) ops.callback(cache.data)
            }
        })
    }


    return {
        init: function() {
            container = $("#hotVideo");
            items = container.find('.content');
            loading = new yn.loading({
                container: items,
                type: 3,
                margin: 227
            }).render();

            //换一换
            container.on('click', '.action', () => {
                count++;
                query.page = count % 2 + 1;
                this.render();
            })
        },
        render: function() {

            var handleData = arr => {
                return _.map(arr, item => {
                    item.notecount = item.notecount || "0"
                    item._liveState = +item.status === 0 ? "正在直播" : "离线";
                    return item;
                })
            }

            getData({
                query,
                callback: data => {
                    var normal = handleData(data.roomList)
                    items.empty()
                    items.append(createNormal(normal))
                    items.velocity('transition.fadeIn');
                }
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/


// 精品观点
var opinion = function() {
    var container, items, query = {
        type: 0, // 观点分类   0大盘, 1题材, 2鉴股, 3股票学堂  ,null查询全部
        size: 5,
        page: 1
    }

    var getOpinion = function(callback) {
        var key = 'queryNewOpinions' + local.joinKey(query);
        var cache = local.get(key, { timeout: 600 })
        if (cache && cache.valid) return callback(cache.data);

        $.getJSON("/opinion/queryNewOpinions.htm", {
            pageSize: query.size,
            currentPage: query.page,
            classify: query.type,
            teacherid: ""
        }, data => {
            data.pageNumber = _.max([1, Math.ceil(+data.total / query.size)]);
            callback(data);
            local.set(key, data)
        })
    }

    return {
        init: function() {
            var self = this;
            container = $("#quality-view");
            items = container.find('.content');

            //切换
            container.on('mouseover', '.opinion-type-item', function() {
                $(this).addClass('select').siblings().removeClass('select')
                query.type = $(this).data('type');
                self.render();
            })
        },
        render: function() {
            var handleData = arr => {
                return _.map(arr, item => {
                    item.stock_trend_text = ["看涨", "看跌"][+item.stock_trend];
                    item.opinionShortContent = fn.clean(item.opinionShortContent, 100);
                    return item;
                })
            }
            getOpinion(data => {
                items.html(template('quality-template', handleData(data.rows)))
            })
        }
    }
}()



// 问股
var askStock = (function() {
    var container, items, query = {
        page: 1,
        row: 6,
        best: '', //最新问答="" 精彩问答=1
        type: '' //分类
    }

    var create = arr => {
        return _.map(arr, item => {

            var ask = `${ask_path}consultation/${item.noteid}.htm`;
            var live = `${live_path}live/${item.answeruserid}/`;
            var answer = item.answercontentStr.substr(0, 100);
            var time = item.answertime.substr(0, 10)

            return `<div class="list item" data-noteid="${item.noteid}">
                    <div class="question">
                        <span class="faquestion"></span>
                        <a class="block content-wrap" href="${ask}" target="_blank" title="${item.questioncontent}">
                            <span class="value">${item.questioncontent}</span>
                        </a>
                    </div>
                    <div class="answer">
                        <span class="facomment"></span>
                        <a class="block content-wrap" href="${ask}" target="_blank" title="${answer}">
                            <p class="value">${answer}</p>
                        </a>
                    </div>
                    <div class="consult">
                        <a class="author" href="${live}" title="${item.teachertitle}">${item.teachertitle}</a>
                        <span class="time">${time}</span><a class="askStockWin-trigger">提问</a>
                    </div>
                </div>`
        }).join("")
    }

    var getData = function(callback) {
        var key = 'lastestNote' + local.joinKey(query)
        var cache = local.get(key, { timeout: 600 })
        if (cache && cache.valid) {
            callback(cache.data)
            return;
        }

        $.getJSON("/consultation/lastedNote.htm", {
            currentPage: query.page,
            pageSize: query.row,
            note_type: query.type,
            is_adopt: query.best
        }, data => {
            callback(data)
            if (data.length > 0) {
                log('data问股', data)
                local.set(key, data)
            }
        })
    }


    /* 循环动画 */
    var moving = _.debounce(function() {
        var first = items.find('.item:eq(0)');
        var height = first.outerHeight();
        items.velocity({ top: `-=${height}` }, {
            easing: "easeInOutSine",
            complete: function() {
                items.append(first.get(0).outerHTML);
                first.remove();
                items.css('top', 0);
            }
        })
    }, 4100, { leading: true, trailing: false })

    return {
        init() {
            container = $("#AskStock");
            items = container.find('.wrap');
            var loading = new yn.loading({
                container: items,
                type: 3
            })

            // 显示提问窗口
            container.on('click', '.askStockWin-trigger', () => askWindow.render())
        },

        render() {
            getData(data => {
                items.html(create(data));
                setInterval(moving, 6000);
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/

//热门资讯
var news = (function() {
    var container, items, first, row = 7;
    var createItem = item => {
        return `<a href="${item.link}" target="_blank" class="home-news-item block" title="${item._title18}">
            <span class="icon"></span><span class="name">${item._title18}</span>
        </a>`
    }

    var createFirst = item => {
        return `<a href="${item.link}" target="_blank" class="block" title="${item._title12}">
        <div class="avatar">
                <img src="${item.title_img}" />
            </div>
            <div class="info">
                <div class="name">${item._title12}</div>
                <div class="subject">${item._content}</div>
            </div>
        </a>`
    }

    var handleData = arr => {
        return _.map(arr, item => {
            var str = item.title;
            item._title12 = fn.limit(str, 12);
            item._title18 = fn.limit(str, 22);
            item._content = fn.limit(item.content, 27);
            item.link = news_path + item.link
            return item;
        })
    }

    return {
        init: function() {
            container = $("#home-news");
            items = container.find('.items');
            first = container.find('.first');
        },

        render: function() {
            $.getJSON("/article/queryNews.htm", {
                backnews_type: "",
                currentPage: 1,
                pageSize: row
            }, data => {
                var list = handleData(data.rows);
                var firstData = _.take(list, 1)[0]
                var itemsData = _.takeRight(list, row - 1);
                items.html(_.map(itemsData, item => createItem(item)).join(""));
                first.html(createFirst(firstData));
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/


//视频
var college = function() {
    var container, items, cover, param = { page: 1, row: 4 },
        loading;


    var getData = callback => {
        var key = 'home_video_list' + local.joinKey(param);
        var cache = local.get(key, { timeout: 3600 })
        if (cache && cache.valid) {
            return callback(cache.data)
        }
        $.getJSON("/video/list.htm", {
            pageSize: param.row,
            currentPage: param.page
        }, back => {
            log("视频数据=========")
            back = _.map(back, (item, i) => {
                item.video_src = item.video_src.replace(/http:\\\/\\\//, 'http://');
                return item;
            });
            callback(back)
            if (back.length > 0) {
                local.set(key, back)
            }
        });
    };


    var createItem = item => {
        return `<a href="${item._link}" target="_blank" class="item inline" title="${item._title}">
                    <div class="inline cover"><img src="${item.image}" /></div>
                    <div class="info inline">
                        <div class="name">${item._title}</div>
                        <div class="datas">
                            <span class="puber">约投顾</span><span class="time">${item._time}</span>
                        </div>
                    </div>
                </a>`
    }
    var createThumb = item => {
        return `<a href="${item._link}" target="_blank"  class="inline cover" title="${item._title}"><img src="${item.image}"></div>
                <div class="name absolute">${item._title}</div>`;
    }
    var handleData = arr => {
        return _.map(arr, item => {
            item._time = item.create_time && yn.timeFormat(item.create_time);
            item._title = function() {
                var str = fn.clear(item.title);
                str = str.replace(/[（(]?青闻天下第.*期[）)]?/, '')
                if (str.length > 17) {
                    str = str.substr(0, 16) + "..."
                }
                return str;
            }();
            // item._name = fn.clear(item.teacherName);
            item._link = `${video_path}video/${item.video_id}.htm`
            return item;
        })
    }
    return {
        init: function() {
            container = $("#college");
            items = container.find('.items');
            cover = container.find('.large');
            loading = new yn.loading({ container: items, type: 3 }).render();
        },
        render: function() {
            getData(data => {
                var list = handleData(data);
                items.html(_.map(_.takeRight(list, 3), item => createItem(item)).join(""));
                cover.html(createThumb(_.take(list, 1)[0]));
            });

        }
    }
}()


log(20170420000340)

/*///////////////////////////////////////////////////////////////////*/


//牛人排行
var teacherIndex = (function() {
    var container, menu, items, param = {
        page: 1,
        rows: 5,
        unit: "", //统计单位:["", "month"]
        orderStype: 0 //[0=人气排行, 1=咨询排行, 2=新晋牛人]
    };

    var getData = callback => {
        var key = 'teacherIndex' + local.joinKey(param);
        var cache = local.get(key, { timeout: 3600 * 24 * 3 })
        if (cache && cache.valid) {
            return callback(cache.data)
        }
        $.getJSON("/html/teacherOrderList.htm", param, data => {
            typeof callback == "function" && callback(data)
            if (data.length > 0) {
                local.set(key, data)
            }
        })
    }

    return {
        init: function() {
            var self = this;
            container = $("#best");
            items = container.find('> .content');
            menu = container.find('.tab');
            menu.on('click', 'td', function() {
                $(this).addClass('select').siblings().removeClass('select')
                self.render({
                    orderStype: $(this).data('type'),
                    unit: $(this).data('unit')
                })
            })
        },
        render: function(ops) {
            _.extend(param, ops);

            var handleData = arr => {
                return _.map(arr, (item, i) => {
                    item.index = i + 1
                    return item;
                })
            }

            getData(data => {
                items.html(template('best-template', handleData(data)));
            })
        }
    }
})()


$(function() {

    //大盘指数
    marindex.render({
        container: $('.mar-container')
    });

    //init()
    hotLive.init()
    hotLive.render()
    askStock.init()
    askStock.render()
    opinion.init()
    opinion.render()
    warn.init()


    /*///////////////////////// 组合 //////////////////////////////////*/

    // var reComposite = require('~/composite/recommend.js')
    // reComposite.high.render({ container: $("#composite .high") });
    // reComposite.ready.render({ container: $("#composite .ready") });
    // var referLastest = require('~/composite/refer-lastest.js');
    // referLastest.render({ container: $("#refer .refer-items"), row: 3 });

    /*///////////////////////////////////////////////////////////////////*/

    //render
    college.init()
    college.render()
    news.init()
    news.render()
    teacherIndex.init()
    teacherIndex.render()

    /*================轮播图动画===================*/
    var banner = `
            
            <li class="slide-item slide-item-4" style="width:100%;background: url(/public/banner/banner_ask.jpg) no-repeat center;">
                <a href="${ask_path}" target="_blank">
                    <div class="banner-center">
                        <div class="ani-ask hide"><img src="./public/banner/banner-ask-1.png" alt="问股" /></div>
                    </div>
                </a>
            </li>
                <li class="slide-item slide-item-2" style="width:100%;overflow: hidden; background: url(/public/banner/banner-home-5.jpg?123456) no-repeat center">
                    <a href="/public/other/down.html" target='_blank'>
                        <div class="banner-center">
                            <div class="ani-code1"><img src="/public/banner/banner-code-5.png" alt="APP" /></div>
                            <div class="ani-code2"><img src="/public/banner/banner-code-2.png" alt="APP" /></div>
                            <div class="ani-code3"><img src="/public/banner/banner-code-3.png" alt="APP" /></div>
                            <div class="ani-code4"><img src="/public/banner/banner-code-4.png" alt="APP" /></div>
                        </div>
                    </a>
                </li>
            <li class="slide-item slide-item-5" style="width:100%;background: url(/public/banner/banner_opinion.jpg) no-repeat center">
                <a href="${opinion_path}" target="_blank">
                    <div class="banner-center">
                        <div class="ani-opinion1 hide"><img src="/public/banner/banner-opinion-1.png" alt="观点" /></div>
                        <div class="ani-opinion2 hide"><img src="/public/banner/banner-opinion-2.png" alt="观点" /></div>
                    </div>
                </a>
            </li>
            <li class="slide-item slide-item-1" style="width:100%;">
                <a href="http://cp.yueniucj.com/" target="_blank"></a>
            </li>`

    setTimeout(function() {
        $('#home-slide .content ul').append(banner);
        var slidey = $('#home-slide .content').unslider({
            autoplay: true,
            speed: 800,
            delay: 8000,
            dots: true,
            pause: true
        })
        var data = slidey.data('unslider'); //访问unslider属性
        slidey.on('unslider.change', function() {
            $('.slide-item .ani-opinion1').removeClass('show animated fadeInLeft')
            $('.slide-item .ani-opinion2').removeClass('show animated fadeInRight')
            $('.slide-item .ani-live').removeClass('show animated fadeInRight')
            $('.slide-item .ani-ask').removeClass('show animated bounceIn')
            $('.slide-item .ani-code1').removeClass('show animated swing')
            $('.slide-item .ani-code2').removeClass('show animated flip')
            $('.slide-item .ani-code3').removeClass('show animated fadeInRight')
            $('.slide-item .ani-code4').animate({ left: '430px', top: '560px', easing: 'linear' })
            if (data.current == '2') {
                $('.slide-item .ani-code1').addClass('show animated swing')
                $('.slide-item .ani-code2').addClass('show animated bounceIn')
                $('.slide-item .ani-code3').addClass('show animated fadeInRight')
                $('.slide-item .ani-code4').addClass('show animated bounceInUp')
                $('.slide-item .ani-code4').animate({ left: '965px', top: '40px', easing: 'linear' })
            }
            if (data.current == '3') { //data.current 为当前banner图的index
                $('.slide-item .ani-opinion1').addClass('show animated fadeInLeft')
                $('.slide-item .ani-opinion2').addClass('show animated fadeInRight')
            }
            if (data.current == '0') {
                $('.slide-item .ani-live').addClass('show animated fadeInRight')
            }

            if (data.current == '1') {
                $('.slide-item .ani-ask').addClass('show animated bounceIn')
            }
        })
    }, 3000)

    /*=====================================================*/




    // asyn loading
    require.ensure([], function(require) {
        askWindow = require('m/askStock/askWindow.js')
        askWindow.init()
            // slider.init()
            // slider.render()
    }, 'index-asyn')

});

/*///////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////*/




var getTopIncome = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        row: 3,
        take: 6
    }, ops);

    $.ajax({
        url: "/html/capitalShow.htm?",
        data: { "num": ops.row },
        dataType: 'json',
        success: function(_data) {
            _data = _.map(_data, function(item, i) {
                return {
                    name: item.title,
                    feed: item.popularity_number,
                    income: item.revenue,
                    teacherid: item.teacherid
                };
            });
            var result = _.take(_data, ops.take);
            defer.resolve(result);
        }
    });
    return defer.promise();
};


var getAskTimes = function() {
    var defer = $.Deferred();
    $.getJSON("/consultation/queryTodayQuestionCount.htm", {
        questionuserid: ynUserId,
        t: yn.timestamp()
    }, function(data) {
        defer.resolve(ynconfig.totalAskTime - data.rows);
    })
    return defer.promise()
}


/**
 * 查询所有在线老师
 * 支持关键字搜索
 */
var queryOnlineTeacher = function(key) {
    key = key || "";
    var defer = $.Deferred();
    $.getJSON("/consultation/queryLikeTeacher.htm", { likename: key }, function(data) {
        defer.resolve(data);
    })
    return defer.promise()
}
