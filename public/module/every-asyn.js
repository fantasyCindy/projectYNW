var showStockList = require('~/ui/stockList-1.2.js');

/*///////////////////////////////////////////////////////////////////*/


// /* 广告弹窗 */
// var popPoster = (function() {

//     // 排除活动页面
//     var href = window.location.href;
//     if (/liveVipAct/.test(href)) return;

//     // 一小时只显示一次
//     var time = +localStorage.getItem('pop-poster')
//     if (time && _.now() - time < 3600000) {
//         return
//     }

//     var render = function() {
//         $('body').append(`<div class="pop-poster">
//                 <div class="box">
//                     <i class="fa fa-times-circle close"></i>
//                     <a target="_blank" href="/html/liveVipAct.htm"><img src="/public/banner/pop.jpg"/></a>
//                 </div>   
//             </div>`)

//         var container = $('.pop-poster')
//         container.on('click', '.close', function() {
//             container.hide()
//         })

//         // mark
//         localStorage.setItem('pop-poster', _.now())
//     }

//     setTimeout(function() {
//         render()
//     }, 3000)

// })()


var sidebar = function() {
    var container = $('#site-sidebar');
    var icon = container.find('.site-sidebar-item .icon');
    var text = container.find('.site-sidebar-item .txt');

    //hover
    icon.on('mouseenter', function() {
        var el = $(this);
        var parent = el.parent();
        var txt = parent.find('.txt');
        txt.velocity('transition.whirlIn', { duration: 400 });
        parent.addClass('hover');
    }).on('mouseleave', function() {
        var parent = $(this).parent();
        var txt = parent.find('.txt');
        txt.velocity('transition.whirlOut', { duration: 400 })
        parent.removeClass('hover');
    })

    text.on('mouseenter', function() {
        txt.velocity('transition.whirlIn', { duration: 400 })
    }).on('mouseleave', function() {
        var parent = $(this).parent();
        $(this).velocity('transition.whirlOut', { duration: 400 })
        parent.removeClass('hover');
    })

    //回到顶部
    container.on('click', '.toTop', function() {
        $("body,html").animate({ scrollTop: 0 }, 500);
        return false;
    })
}()


// 头部
var header = function() {

    var container = $('#yn-header'),
        winxin = container.find('.wechat'),
        mobile = container.find('.mobile'),
        login = $("#ynLogin"),
        logout = $("#ynLogout"),
        register = $('#register')
    var body, wxcode, user;

    var event = function() {

        //微信
        winxin.on('mouseenter', function() {
            var x = $(this).offset().left - 12 + "px";
            var y = $(this).offset().top + $(this).height() + "px";
            $('body').append('<div id="wxcode" style="background:#fff;z-index:1000;position:absolute"><img width="120" style="border:5px solid #fff;" src="/public/images/wechatewm.jpg"/><p class="applabel">官方微信</p></div>');
            wxcode = $('#wxcode');
            wxcode.css({ "left": x, "top": y })
        }).on('mouseleave', function() {
            wxcode.remove();
            wxcode = null;
        })

        //app
        mobile.on('mouseenter', function() {
            var x = $(this).offset().left - 50 + "px";
            var y = $(this).offset().top + $(this).height() + "px";
            $('body').append('<div id="wxcode" style="background:#fff;z-index:1000;position:absolute"><img width="120"  style="border:5px solid #fff;" src="/private/head/images/appewm.png" /><p class="applabel">APP下载</p></div>');
            wxcode = $('#wxcode');
            wxcode.css({ "left": x, "top": y })
        }).on('mouseleave', function() {
            wxcode.remove();
            wxcode = null;
        })
        //注册
        register.on('click',function(){
            var href = window.location.href;
            window.location.href = `${sso_path}account/register.htm?systemCode=yuetougu&clientUrl=${href}`
        })
        //登录
        login.on('click', function() {
            yn.login.render();
        })

        //退出
        logout.on('click', function() {
            yn.logout.jump();
        })
    }()

}()


//搜索
var search = {
    key: $('.search-key'),
    table: null,
    body: $('body'),
    input: $('#stock_code'),
    inputRoom: $('#search-room-key'),
    searchRoomInput: $("#search-room-input"),
    searchBtn: $('#btn_search'),
    typeIndex: 0,
    init: function() {
        this.event();
        showStockList.get().render({
            id: 'stock_code',
            listLen: 8,
            onSelect: (item, trigger) => {
                window.location.href = `/marketLine.htm?stockcode=${item.stockCode}`
            }
        })

    },
    event: function() {
        var self = this;

        //点击搜索
        this.searchBtn.on('click', () => submit())

        //enter搜索
        this.input.keyup(function(e) {
            if (e.keyCode == 13) {
                submit();
            }
        })

        this.searchRoomInput.keyup(function(e) {
            if (e.keyCode == 13) {
                submit();
            }
        })

        function submit() {
            var input = $('.search-type-item:visible');
            var url = "";
            if (+self.typeIndex == 1) url = "/html/queryLiveRooms.htm?queryText=" + input.val();

            if (+self.typeIndex == 0) {
                var first = input.data('firstStockCode');
                if (!first) {
                    layer.msg("请选择");
                    return;
                } else {
                    url = "/marketLine.htm?stockcode=" + first;
                }
            }
            window.location.href = url;
        }


        //搜直播
        // this.key.on('click', function() {
        //     var left = $(this).offset().left + "px";
        //     var top = $(this).offset().top + "px";
        //     self.body.append('<table id="searchKeyItems">' +
        //         '<tr><td class="search-key-item" data-id="stock_code">搜股票</td></tr>' +
        //         '<tr><td class="search-key-item" data-id="search-room-input">搜直播</td></tr>' +
        //         '</table>')
        //     self.table = $('#searchKeyItems');
        //     self.table.css({
        //         "left": left,
        //         "top": top
        //     });
        //     return false;
        // })

        // //搜索类型
        // this.body.on('click', '.search-key-item', function(e) {
        //     e.stopPropagation();
        //     var text = $(this).text();
        //     self.typeIndex = $(this).parent().index();
        //     var id = $(this).data('id');
        //     $('.search-type-item').hide();
        //     $('#' + id).show();
        //     self.key.find('.key').text(text);
        //     self.table.remove();
        // })

        this.body.on('click', function() {
            $('#searchKeyItems').remove();
        })
    }
}

//入驻
var settle = function() {
    var container, trigger, box;
    return {
        init: function() {
            container = $('#contentart_res');
            trigger = $('#triger-settle');
            box = $('#residencies');
            if (+ynIsTeacher != 1) trigger.show();
            trigger.click(() => this.render())
            container.click(() => this.disappear())
            box.click(() => false)
            box.on('click', '.close', () => container.hide())
            box.on('click', 'a', function() {
                var link = $(this).attr('href');
                location.href = link;
            })
        },
        render: function() {
            var w = $(window).width();
            var h = $(window).height();
            container.show();
            var bw = box.width();
            var bh = box.height();
            var left = (w - bw) / 2 + 'px';
            var top = (h - bh) / 2 + 'px';
            box.css({ "left": left, "top": top })
        },
        disappear: function() {
            container.hide();
        }
    }
}()



var foot = {
    imgcode: $('#imgCodeId'),
    imgCodeInput: $('#comCode'),
    init: function() {
        this.event();
        yn.inputVerify("#comCode", {
            blur: function(self) {
                var defer = $.Deferred();
                var val = self.val();
                $.get("/validateImgCode.htm", {
                    code: val
                }, function(data) {
                    if (data == "success") {
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                })
                return defer.promise();
            }
        })

    },
    event: function() {
        $('.feedback-trigger').click(function() {
            ynIsLogin ? feedback.render() : yn.login.render();
        })

        //验证码换一换
        $('#changeImg').click(() => {
            this.imgcode.attr("src", "/validCode.htm?" + new Date().getTime())
        })
    }
}

/*------*/

search.init();
settle.init();
foot.init();

/*百度站长*/

var baidu = function() {
    // baidu push
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
}()