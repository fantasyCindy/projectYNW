<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>操盘内线|约投顾</title>
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <link rel="stylesheet" href="/public/css/reset.css">
            <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="http://cdn.bootcss.com/photoswipe/4.1.2/photoswipe.min.css">
            <link rel="stylesheet" href="http://cdn.bootcss.com/photoswipe/4.1.2/default-skin/default-skin.min.css">
            <link rel="stylesheet" href="/public/mobile/m-vip-refer.css?v=20170607163609">
            <script src="http://cdn.bootcss.com/jquery/3.0.0/jquery.min.js"></script>
    </head>

    <body>
        <div id="app">
            <div class="app-menu-top" :style="{height:mh}">
                <div class="menu-top-1 menu-tab red" v-show="menuTop == 1" style="display: none">
                    <span class="menu-left-trigger" @click="showMenuLeft"><i class="fa fa-bars"></i></span>
                    <router-link class="link" to="/vip/live"><span class="name">今日直播</span></router-link>
                    <router-link class="link" to="/vip/chat"><span class="name">股友互动</span></router-link>
                    <!-- <router-link class="icon-history" to="/vip/opinion/history"><i class="fa fa-clock-o"></i></router-link> -->
                </div>
                <div class="menu-top-2  menu-tab red" v-show="menuTop == 2" style="display: none">
                    <span class="menu-left-trigger" @click="showMenuLeft"><i class="fa fa-bars"></i></span>
                    <router-link class="link" to="/vip/opinion/refer/4"><span class="name">操盘绝学</span></router-link>
                    <router-link class="link" to="/vip/opinion/refer/5"><span class="name">独家内参</span></router-link>
                    <!-- <router-link class="link" to="/vip/opinion/history"><span class="name">历史直播</span></router-link> -->
                </div>
                <div class="menu-top-3" v-show="menuTop == 3" style="display: none">
                    <span class="menu-left-trigger" @click="showMenuLeft"><i class="fa fa-bars"></i></span>
                    <span>约投顾 | 让股民与牛人相约</span>
                </div>
                <div class="menu-top-4 menu-tab gray" v-show="menuTop == 4" style="display: none">
                    <span class="menu-left-trigger" @click="showMenuLeft"><i class="fa fa-bars"></i></span>
                    <router-link class="menu-item" :to='"/vip/live/" + hisId'><span class="name">第{{hisId}}期直播</span></router-link>
                    <router-link class="menu-item" :to='"/vip/chat/" + hisId'><span class="name">股友互动</span></router-link>
                    <!-- <router-link class="icon-history" to="/vip/opinion/history"><i class="fa fa-clock-o"></i></router-link> -->
                </div>
            </div>
            <div class="app-contentBar" :style="{height:ch}">
                <router-view></router-view>
            </div>
            <div class="app-menu-left">
                <div class="menu-left-items">
                    <div class="menu-left-item" data-buy="-1" data-to="/index">首页</div>
                    <div class="menu-left-item" data-buy="0" data-to="/vip/live">今日直播</div>
                    <div class="menu-left-item" data-buy="1" data-to="/vip/opinion/refer/5">独家内参</div>
                    <div class="menu-left-item" data-buy="2" data-to="/vip/opinion/refer/4">操盘绝学</div>
                    <!-- <div class="menu-left-item" data-buy="3" data-to="/vip/opinion/history">历史直播</div> -->
                    <div class="menu-left-item" data-buy="-1" data-to="/login">登录</div>
                    <!-- <div class="menu-left-item" data-buy="-1" data-to="/registe">注册</div> -->
                </div>
            </div>
            <div class="app-menu-bottom">
                <div class="menu-bottom-1" v-show="menuBottom==1 && menuTop == 1">
                    <router-link class="menu-item" to="/vip/ask">发布互动</router-link>
                    <router-link class="menu-item" to="/vip/myTalk">我的互动</router-link>
                </div>
            </div>
        </div>
        <%@ include file="../common/photoswipe.jsp" %>
            <script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
            <script src="https://cdn.bootcss.com/vue/2.3.3/vue.min.js"></script>
            <script src="https://cdn.bootcss.com/vue-router/2.5.3/vue-router.min.js"></script>
            <script src="http://cdn.bootcss.com/photoswipe/4.1.2/photoswipe.min.js"></script>
            <script src="http://cdn.bootcss.com/photoswipe/4.1.2/photoswipe-ui-default.min.js"></script>
            <script src="/public/js/reconnecting-websocket.js"></script>
            <script>
            // log
            window.log = (function() {
                var href = window.location.href
                var match = href.match(/yuetougu.com/)
                return function() {
                    if (!match) {
                        //console.log.apply(this, arguments)
                    }
                }
            })()

            var store = {
                isBuy: false,
                orderCode: -1, //-1
                pid: "", //正在直播的直播室期刊ID
                buyType: 0, //[0,1,2]进入购买页, 显示相应的介绍
                historyId: -1, //当前的历史直播期刊ID
                event: {
                    login: null
                },
                status: {
                    hasMore: false, // 是否加载更多
                    onLoadMoreBegin: null //加载更多回调
                },
                socket: {
                    live: null,
                    chat: null
                }
            }

            $.ajax({
                async: false,
                type: "POST",
                url: '/app/isBuyvip.htm',
                dataType: 'json',
                success: function(back) {
                    log("查询是否购买", back)
                    if (back.status != 1) {
                        log("系统错误")
                    }
                    store.orderCode = back.data
                    if (store.orderCode == 60020) {
                        store.isBuy = true;
                    }
                }
            })

            FastClick.attach(document.body);
            var pswpElement = document.querySelectorAll('.pswp')[0]
            var openPhotoSwipe = function(items) {
                var options = {
                    showAnimationDuration: 0,
                    hideAnimationDuration: 0
                }
                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            }
            window.zoomImage = function(src) {
                var image = new Image()
                image.src = src;
                image.onload = function() {
                    openPhotoSwipe([{
                        src: src,
                        w: image.width,
                        h: image.height
                    }])
                }
            }
            </script>
            <script src="/public/mobile/m-vip-refer.bundle.js?v=20170607163535"></script>
    </body>

    </html>
