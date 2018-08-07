// /*///////////////////////////////////////////////////////////////////*/

var lo = require('m/lib/lo.js')
var screenHeight = $(window).height()



/* 同步组件 */

var login = require('mobile/vip-login.vue')
var registe = require('mobile/vip-registe.vue')
var index = require('mobile/vip-index.vue') // 首页活动页
var buy = require('mobile/vip-buy.vue') // 购买页
var opinion = require('mobile/vip-opinion.vue') // 内参
var live = require('mobile/vip-live.vue') // 直播
var chat = require('mobile/vip-chat.vue') // 股友互动
var myTalk = require('mobile/vip-myTalk.vue') // 股友互动
var ask = require('mobile/vip-ask.vue') // 提问
var list = require('mobile/vip-list.vue') // 列表
var history = require('mobile/vip-history.vue') // 列表
var article = require('mobile/vip-opinion-detail.vue')
var forget = require('mobile/vip-forget.vue')


/* 异步组件 */

var protocol = resolve => {
    require.ensure([], require => {
        resolve(require('mobile/protocol.vue'))
    }, '__protocol')
}


/*///////////////////////////////////////////////////////////////////*/

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/index' },
        { path: '/login', component: login }, {
            path: '/registe',
            component: registe,
            children: [
                { path: '', component: registe },
                { path: ':code', component: registe }
            ]
        },
        { path: '/index', component: index },
        { path: '/buy', component: buy }, {
            path: '/vip/live',
            component: live,
            children: [
                { path: '', component: live },
                { path: ':id', component: live }
            ]
        }, {
            path: '/vip/chat',
            component: chat,
            children: [
                { path: '', component: chat },
                { path: ':id', component: chat }
            ]
        },
        { path: '/vip/myTalk', component: myTalk },
        { path: '/vip/ask', component: ask }, {
            path: '/vip/opinion',
            component: opinion,
            children: [
                { path: '', component: opinion },
                { path: 'refer/:type', component: list },
                // { path: 'history', component: history }
            ]
        },
        { path: '/vip/article/:type/:id', component: article },
        { path: '/protocol', component: protocol },
        { path: '/forget', component: forget }
    ]
})

window.layer = require('m/mobile/layer.js').get()


/* 权限验证 (重定向) */

router.beforeEach((to, from, next) => {

    // 重置
    if (store.status) {
        store.status.hasMore = false //是否需要计算加载更多
        store.status.onLoadMoreBegin = null
    }

    log("to", to.path)
    var target = to.path;
    if (target.indexOf('vip') != -1 && !store.isBuy) {
        if (store.orderCode == 60021) {
            return layer.alert("商品已经付款, 请等待客服人员与您联系", function() {
                next('/')
            })
        }
        ynIsLogin ? window.location.href = '/pay-choose.htm' : next('/login')
        return
    }
    next()
})



Object.defineProperty(store, 'historyId', {
    get() {
        return store.historyId
    },
    set(val) {
        vm.hisId = val
    }
})



// /*///////////////////////////////////////////////////////////////////*/

var vm = new Vue({
    el: "#app",
    router,
    data: {
        msg: "20170517103016",
        menuTop: 1,
        menuBottom: 1,
        mh: '44px', //顶部菜单高度
        ch: screenHeight - 44 + 'px', // 内容高度
        menuLeft: null,
        contentBar: null,
        hisId: ""
    },
    methods: {
        showMenuLeft() {
            this.menuLeft.addClass('in')
        },
    },
    mounted() {
        var self = this;
        this.menuLeft = $('.app-menu-left')
        this.contentBar = $('.app-contentBar')
        this.menuLeft.on('click', '.menu-left-item', function() {

            // 跳转到购买时显示相应的介绍
            var type = +$(this).data('buy')
            if (type != -1) {
                store.buyType = type;
            }

            self.$router.push($(this).data('to'))
        })

        //退出菜单
        this.menuLeft.click(() => {
            this.menuLeft.removeClass('in')
        })

        //检测滚动, 是否加载更多
        this.contentBar.scroll(lo.debounce(function() {
            if (store.status.hasMore) {
                var more = $(this).find('.loadMore')
                if (more.get(0)) {
                    var top = more.offset().top
                    if (top > screenHeight) return;

                    // 加载更多, 浮出水面
                    if (typeof store.status.onLoadMoreBegin == 'function') {
                        store.status.onLoadMoreBegin()
                    }
                }
            }
        }, 500))
    }
})



// 推送
var connectSocket = (function() {

    /* 开启推送(直播室开启+已经购买) */
    var timer = setInterval(function() {
        if (!store.isBuy) return;
        getPid(pid => {
            if (pid != -1) {
                clearInterval(timer)
                timer = null
                createSocket(pid)
            }
        })
    }, 5000)

    //检测直播室是否开启
    function getPid(callback) {
        $.getJSON('/app/vipBroadcasting.htm', {
            periodicalid: '',
            limit: 1
        }, back => {
            if (back.status == 1) {
                if (!back.data) return callback(-1);
                if (back.data.length > 0) {
                    var pid = back.data[0].periodicalid;
                    callback(pid);
                }
            }
        })
    }

    //websocket推送
    function createSocket(pid) {

        var host = window.location.href.match(/http:(.+?(?:8080|com))/)[1]
        var path = "ws:" + host + "/websocket";

        var webSocket = new ReconnectingWebSocket(path);
        webSocket.debug = false;
        webSocket.timeoutInterval = 5400;

        window.onbeforeunload = function() {
            webSocket.close();
        };

        webSocket.onopen = function(event) {
            webSocket.send("0_0_0_" + pid)
        }

        webSocket.onmessage = function(event) {
            var data = eval('(' + event.data + ')');
            log("push", data);
            var dataType = data.dataType;

            //直播消息
            if (dataType == 1) {
                typeof store.socket.live == "function" && store.socket.live(data)
                return;
            }

            //互动信息
            // VIP网友互动审核状态(vipStatus=0未审核，1已审核，2我的)
            if (dataType == 2) {
                if (typeof store.socket.chat == "function") {
                    store.socket.chat(data)
                }

                if (+data.vipStatus == 2 && data.user_id == +ynUserId) {
                    layer.alert("您有新的私信", ()=>{
                        router.push('/vip/myTalk')
                    })
                }
            }
        }

    }

})()
