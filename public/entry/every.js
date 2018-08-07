var __showStockList = require('~/ui/stockList.js');
yn.showStockList = __showStockList.add //代理
var local = require('base/localData.js')
window.JSON = window.JSON || false; // 防止IE8下JSON未定义
require('m/socket.js') //推送
    // window.activity = require('vmodule/activity.js') // 活动弹窗
    /*///////////////////////////////////////////////////////////////////*/
var Message = require('m/ui/message.js')
var error = require('e/error-type');


/*
请求未读消息数据
*/
var getUnreadMessageCount = function(callback) {
    // var key = 'unReadMesssageCount'
    // var cache = local.get(key, { timeout: 600 })
    // console.log("cache", cache)
    // if (cache && cache.valid) {
    //     return callback(cache.data)
    // } else {
    $.getJSON('/app/queryNoRead.htm', { source: 0 }, back => {
            if (back.status == 1) {
                //2系统消息 3问股消息 5内参消息 8直播消息
                var data = _.filter(back.data, item => /[2358]/.test(item.messageType))
                    // local.set(key, data)
                callback(data)
            }
        })
        // }
}

var unreadMessage = (function() {
    var container, items, msg
    var unReadDate = null
    var key = null
    var create = arr => {
        return _.map(arr, item => {
            return `<li class="msgCenter-item"><a ${item.link}>${item.text}<span class="ask-msg unreadNum ${item.style}">${item._unReadCount}</span></a></li>`
        }).join('')
    }
    var handle = arr => {
        return _.map(arr, item => {
            item.text = ['', '', '系统消息', '问股消息', '', '内参消息', '', '', '直播消息'][item.messageType]
            item._unReadCount = item.unReadCount != 0 ? item.unReadCount : ''
            item._unReadCount = item.unReadCount > 99 ? '99+' : item.unReadCount
            item.style = item.unReadCount == 0 ? 'hide' : 'show'
            if (item.messageType == 3 && ynIsTeacher) {
                item.link = `href=${us_path}backstage/myAnswer.htm`
                item.style = 'hide'
            } else if (item.messageType == 3 && !ynIsTeacher) {
                item.link = `href=${us_path}backstage/userQuestion.htm`
                item.style = 'hide'
            } else {
                item.link = `href=${us_path}backstage/myCenterMessage.htm?type=${item.messageType}`
            }
            return item
        })
    }
    return {
        init: function() {
            container = $('#yn-header')
            items = container.find('.msgCenter')
            msg = container.find('.envelope')

            //鼠标移入头部信箱
            if (ynIsLogin) {
                var timer = null
                msg.get(0).onmouseenter = function() {
                    clearTimeout(timer)
                    unreadMessage.insert()
                }
                container.find('.msgCenter').get(0).onmouseenter = function() {
                    clearTimeout(timer)
                    items.fadeIn()
                }
                msg.get(0).onmouseleave = container.find('.msgCenter').get(0).onmouseleave = function() {
                    timer = setTimeout(function() {
                        items.hide()
                    }, 500)
                }
            }

        },
        render: function(data) {
            getUnreadMessageCount(data => {
                var count = _.reduce(data, (pre, cur) => {
                    if (pre.messageType == 3) {
                        pre.unReadCount = 0
                    } else if (cur.messageType == 3) {
                        cur.unReadCount = 0
                    }
                    return { unReadCount: pre.unReadCount + cur.unReadCount }
                })

                //首次登录
                // if (count.unReadCount && !localStorage.getItem('isLogin')) {
                //     new Message({
                //         type: 1,
                //         title: `您有${count.unReadCount}条未读消息`,
                //         link: `/html/returnMessageJsp.htm`,
                //         dismiss: 3000
                //     });
                // }
                if (count.unReadCount) {
                    container.find('.msg-circle').removeClass('hide')
                }

                items.find('ul').html(create(handle(data)))
                    // localStorage.setItem('isLogin', ynUserName)
            })
        },
        insert: function() {
            $.getJSON('/app/queryNoRead.htm', { source: 0 }, back => {
                if (back.status == 1) {
                    var data = _.filter(back.data, item => /[2358]/.test(item.messageType))
                    items.find('ul').html(create(handle(data)))
                    var count = _.reduce(data, (pre, cur) => {
                        return { unReadCount: pre.unReadCount + cur.unReadCount }
                    })
                    items.fadeIn()
                }
            })
        }
    }
})()



//活动侧边栏注册图标适应窗口大小改变 
// var resizeRegisterIcon = function() {
//         var winWidth = window.innerWidth
//         if (winWidth >= 1366 && winWidth <= 1550) {
//             var w = (winWidth - 1200) * 0.45
//             $('.activeOut').attr('width', w)
//         } else if (winWidth > 1550) {
//             $('.activeOut').attr('width', 162)
//         } else {
//             $('.activeOut').attr('width', 74)
//         }
//     }
//     // resizeRegisterIcon()
// setTimeout(resizeRegisterIcon, 500);
// window.onresize = resizeRegisterIcon


var detectBrowser = (function() {
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join('-');
})();

// log(detectBrowser)

window.__browserVersion = /[0-9]+/.test(detectBrowser)[0];
window.__isIE = /IE/.test(detectBrowser);
window.__isIE7 = __isIE && __browserVersion < 8;
window.__isIE8 = __isIE && __browserVersion < 9;

/*///////////////////////////////////////////////////////////////////*/

window.ynconfig = {
    none: function(ops) {
        ops = _.extend({
            text: "暂无记录",
            margin: 260,
            fontSize: 14
        }, ops)
        return "<p class='nothing' style='background:white;text-align:center;padding:" + ops.margin + "px 0;font-size:" + ops.fontSize + "px'>" +
            "<i class='fa fa-exclamation-circle fa-lg' style='margin-right:5px'></i>" + ops.text + "</p>"
    },
    more: function() {
        return '<p class="loadMore">加载更多</p>';
    },
    noteType: { "a2": "个股", "a1": "板块", "a0": "大盘", "a3": "知识" },
    askStockCategory: [
        { id: -1, name: "全部" },
        { id: 2, name: "个股" },
        { id: 1, name: "板块" },
        { id: 0, name: "大盘" },
        { id: 3, name: "知识" }
    ],
    totalAskTime: 3, //用户提问次数
    inviteLimit: 3, //用户邀请老师的个数
    opinionType: [
        { id: 0, name: "大盘" },
        { id: 1, name: "题材" },
        { id: 2, name: "鉴股" },
        { id: 3, name: "股票学院" }
    ],
    newsType: [
        { id: 0, name: "热门资讯" },
        { id: 2, name: "涨停揭秘" },
        { id: 3, name: "宏观要闻" },
        { id: 4, name: "个股资讯" },
        { id: 5, name: "重点新闻" }
    ],
    //导航栏
    navigation: {
        a: "问股",
        b: "直播",
        c: "观点",
        d: "视频",
        e: "资讯",
        f: "找投顾",
        g: "我的",
        h: "内参",
        i: "组合"
    },
    //组合状态
    composite_state: [
        [0, "预售"],
        [1, "进行中"],
        [2, "完成"],
        [3, "提前关闭"],
        [4, "提前完成"],
        [5, "到期失败"],
        [6, "触及止损"]
    ],
    composite_style: [
        [0, "保守型"],
        [1, "稳健性"],
        [2, "激进型"]
    ]

}

/*is_inside*/
yn.isInside = function() {
    var res = false
    if (ynIsTeacher || flag === "1") {
        res = true
    }
    return res;
}()

/*//////////////////////////  导航栏 /////////////////////////////////////*/

/**
 * 
 * yn.navigation.name = "观点"; //默认从地址栏识别, 可以指定选中
 */
yn.navigation = function() {
    var container, li;

    var getName = function(path) {
        var paths = [
            { key: "consultation", name: "问股" },
            { key: "live", name: "直播" },
            { key: "opinion", name: "观点" },
            { key: "video", name: "视频" },
            { key: "article", name: "资讯" },
            { key: "findTeacher", name: "找投顾" },
            { key: "indexrefer", name: "内参" },
            { key: "myCenter", name: "我的" }
        ];
        var name = "";
        _.forEach(paths, item => {
            if (path.indexOf(item.key) != -1) {
                name = item.name;
            }
        })
        return name;
    }

    return {
        name: null,
        init: function() {
            container = $('.yn-mean');
            li = container.find('li');
        },
        select: function() {
            //优先使用指定的值, 再从地址中识别
            var name = this.name || getName(location.href);
            li.each(function(i) {
                if ($(this).text() == name) {
                    $(this).addClass("cur");
                }
            })
        }
    }

}()



/*/////////////////////////////  登录  //////////////////////////////////*/
/**
 * 
 * yn.login.render();
 * yn.login.onClose
 */
yn.login = function() {
    var container, box,
        inputName,
        inputPassword,
        prompt, errorMsg,
        form;

    function event() {
        container.on('click', '.close', function() {
            container.hide();
            yn.login.onClose();
        })

        container.on('click', '.submit', function(e) {
            e.preventDefault()
            if (!_.trim(inputName.val())) {
                return layer.msg('请输入用户名')
            }
            if (!_.trim(inputPassword.val())) {
                return layer.msg('请输入密码')
            }
            $.post('/public/login.htm', form.serialize(), function(data) {
                data = JSON.parse(data)
                if (data.status == "1") {
                    yn.login.redirect()
                    return;
                }
                if (data.status == "20005") {
                    layer.msg("密码错误")
                    prompt.show();
                    return;
                }
                if (data.status == "20007") {
                    layer.msg("账号不存在")
                    return;
                }
            })
        })
    }

    return {
        init() {
            container = $('#contentart');
            inputName = container.find("input[name=userName]");
            inputPassword = container.find("input[name=password]");
            box = $('#login');
            prompt = $("#prompt");
            errorMsg = $('#errorMsg');
            form = $("#yn-form-login");
            event()
        },
        // render() {
        //     container.show();
        //     yn.centerBox(box);
        //     prompt.hide()
        //     inputName.val('')
        //     inputPassword.val('')
        // },
        render() {
            var href = window.location.href
            window.location.href = `${sso_path}?systemCode=yuetougu&clientUrl=${href}`
            return;
        },
        onClose() {
            // override 
        },
        redirect() {
            window.location.reload()
        }
    }
}()


//退出
yn.logout = {
    path: window.location.href,
    jump: function() {
        var self = this;
        $.post("/html/logout.htm", function(data) {
            data = JSON.parse(data)
            if (data.status == "1") {
                localStorage.setItem('isLogin', '')
                window.location.href = self.path
            }
        });
    }
}

/*///////////////////////// 消息推送 ///////////////////////////////*/



/*///////////////////////// layer模块  /////////////////////////////////*/

window.layer = function() {

    //common
    var container, box,
        msg_container, msg_title, msg_close,
        confirm_container, confirm_callback, confirm_content,
        confirm_visible = false,
        msg_visible = false

    var alert_callback = function() {}

    var tag = `<div id="layer-item-container" class="hide">
                <div class="layer-item-wrap">
                    <div class="layer-item-box">
                        <div id="layer-item-msg" class="layer-item hide">
                            <span class="layer-item-icon layer-item-"></span>
                            <span class="layer-item-title"></span>
                            <span class="layer-item-icon close hide"></span>
                        </div>
                        <div id="layer-item-confirm"  class="layer-item hide">
                            <div class="confirm-title">温馨提示</div>
                            <div class="confirm-content"></div>
                            <div class="buttons">
                                <span class="inline confirm-btn no">取消</span>
                                <span class="inline confirm-btn yes">确定</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

    var animate = function() {
        var animateType = {
            pop: "transition.expandIn",
            down: "transition.slideDownIn"
        }
        box.velocity(animateType.pop, { duration: 200 });
    }


    var commonInit = _.once(function() {
        $('body').append(tag);
        container = $("#layer-item-container");
        box = container.find('.layer-item-box');

        //设置高度
        var height = _.min([document.body.clientHeight, $(window).height()]);
        container.height(height);

        //alert 关闭
        container.on('click', '.close', () => {
            container.hide();
            alert_callback && alert_callback()
        });

        container.on('click', '.no', () => container.hide()); //取消

        //确定
        container.on('click', '.yes', function() {
            confirm_callback();
            container.hide();
        })
    })

    var msgInit = _.once(function() {
        msg_container = $('#layer-item-msg');
        msg_title = msg_container.find('.layer-item-title');
        msg_close = msg_container.find('.layer-item-icon.close');
    })

    var confirmInit = _.once(function() {
        confirm_container = $('#layer-item-confirm');
        confirm_content = confirm_container.find('.confirm-content');
    })

    var msgCommon = function(txt) {
        commonInit();
        msgInit();
        if (confirm_visible) confirm_container.hide();
        msg_title.text(txt);
        container.show();
        msg_container.show();
        animate();
        msg_visible = true;
    }

    return {
        msg: function(txt) {
            msgCommon(txt);
            msg_close.hide();
            setTimeout(() => container.hide(), 1000)
        },

        //alert
        alert: function(txt, callback) {
            msgCommon(txt);
            msg_close.show();
            alert_callback = callback;
        },

        confirm: function(txt, callback) {
            commonInit();
            confirmInit();
            confirm_callback = callback;
            confirm_content.text(txt);
            if (msg_visible) msg_container.hide();
            container.show();
            confirm_container.show();
            animate();
            confirm_visible = true
        },
        close: function() {
            container.hide();
        }
    }
}()

//////////////////////////////////////////////////////////////////////

$(function() {
    yn.login.init()
    yn.navigation.init()
    yn.navigation.select()
    __showStockList.init()

    // activity.init() // 内参活动弹窗


    //没有头部的页面不需要执行（充值页）
    var href = window.location.href
    var match = href.match(/recharge/)
    var recharge = match ? match[0] : ''
    if (!recharge) {
        unreadMessage.init()
            /*登录之后检测是否有未读消息 */
        if (ynIsLogin) {
            unreadMessage.render()
        }
    }



    setTimeout(function() {
        require('~/every-asyn.js')
    }, 100)
})
