<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div class="clearfix"></div>
    <div class="site-sidebar-wrap">
        <div id="site-sidebar">
            <div class="site-sidebar-items">
                <!-- <div class="app-download"><img src="/public/images/aside.png?0412" alt=""></div> -->
                <div class="app-download"><img src="/public/images/ynstock.png" alt=""></div>
                <div class="activeSide activity-refer">
                    <!-- <img class="activeClose" src="/public/v2/index/images/close.png" alt="" /> -->
                    <img class="activeOut" src="/public/v2/index/images/activeSide.png" alt="" />
                </div>
                <div class="site-sidebar-item service block">
                    <a href="http://wpa.qq.com/msgrd?v=3&uin=3004636921&site=qq&menu=yes" target="_blank" class="txt hide">在线客服</a>
                    <a href="http://wpa.qq.com/msgrd?v=3&uin=3004636921&site=qq&menu=yes" target="_blank" class="icon"></a>
                </div>
                <div class="site-sidebar-item feedback block">
                    <a href="/otherFeedback/index.htm" target="_blank" class="txt hide">意见反馈</a>
                    <a href="/otherFeedback/index.htm" target="_blank" class="icon"></a>
                </div>
             <div class="site-sidebar-item toTop block">
                    <span class="icon"></span>
                </div>
            </div>
        </div>
    </div>
    <!--yueniuwang-->
    <div id="yn-footer">
        <div class="yn-wrap">
            <div class="fl">
                <p><a href="http://us.yuetougu.com/about.htm" target="_blank">关于我们</a>｜<a href="http://us.yuetougu.com/law.htm" target="_blank">法律声明</a>｜<a href="http://us.yuetougu.com/mianze.htm" target="_blank">免责条款</a>｜<a href="http://us.yuetougu.com/fengxian.htm" target="_blank">风险提示</a>｜<a href="http://us.yuetougu.com/zhaopin.htm" target="_blank">招纳贤士</a>｜
                    <!-- <a href="/software-copyright.htm" target="_blank">计算机软件著作权登记证书</a> -->
                </p>
                <p>Copyright©2018云南产业投资管理有限公司　版权所有备案/许可证号:京ICP备16014162号-1</p>
                <p>风险提示：约投顾任何用户或者嘉宾的发言，都有其特定立场，投资决策需要建立在独立思考之上。</p>
                <p><a href="http://us.yuetougu.com/about.htm">投顾咨询提供：云南产业投资管理有限公司 [证书ZX0093]</a></p>
            </div>
            <div class="scan middle fl tc">
                <div class="ewm hide">
                    <img src="/public/images/wechatewm.jpg">
                    <p>约投顾官方微信</p>
                </div>
            </div>
            <div class="fl mgl20 g-bug-bg">
                <a href="/leaflet-bug.htm"><img class=" g-bug" src="/public/images/composite/bug.png"></a>
            </div>
            <div class="fr">
                <table class="home-foot-info">
                    <tr>
                        <td>工作时间：8:30--18:00</td>
                        <td><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3004636921&site=qq&menu=yes"><i class="fa fa-user"></i>在线客服</a></td>
                    </tr>
                    <tr>
                        <td>客服热线：400-0000-577
                        </td>
                        <td><a href="/otherFeedback/index.htm" target="_blank"><i class="fa fa-envelope"></i>留言投诉</a></td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td><a href="/html/returnMessageJsp.htm"><i class="fa fa-bullhorn" aria-hidden="true"></i></i>消息中心</a></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <script src="${path}/public/source/jquery.min.js"></script>
    <script src="${path}/public/source/es5-shim.min.js"></script>
    <script src="${path}/public/js/lodash.js"></script>
    <script src="${path}/public/js/reconnecting-websocket.js"></script>
    <script src="${path}/public/v2/base/every.bundle.js?v=0509"></script>
    <script>
    if (/yuetougu.com/.test(window.location.href)) {
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cdf5cc671e64a2ce9d27df535342c9ae";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }


    var __path = '${path}';

    var host = ""

    if (/yueniuwang/.test(live_path)) {
        host = "http://ws.yuetougu.com"
    } else if (/yuetougu/.test(live_path)) {
        host = "http://ws.yuetougu.com"
    } else {
        host = live_path
    }
    var COMMONSOKCET = function() {
        host = host.replace("http:", "");
        try {
            var webSocket;
            webSocketPath = "ws:" + host + "/websocket";
            webSocket = new ReconnectingWebSocket(webSocketPath);
            webSocket.debug = false;
            webSocket.timeoutInterval = 5400;
            webSocket.onopen = function(event) {
                var key = [0, 0, 0, 0].join('_')
                webSocket.send(key);
            };
            webSocket.onmessage = function(event) {
                var data = JSON.parse(event.data);
                ynSocket.dispatch(data);
            };
        } catch (e) {
            console.log('===推送有错')
            return;
        }
    }()
    var YNSOCKET = function() {
        host = host.replace("http:", "");
        var tid = ynTeacherId || "0";
        var uid = ynUserId || "0";
        if (tid !== "0") {
            uid = "0"
        }
        if (!ynUserId) {
            return;
        }
        try {
            var webSocket;
            webSocketPath = "ws:" + host + "/websocket";
            webSocket = new ReconnectingWebSocket(webSocketPath);
            webSocket.debug = true;
            webSocket.timeoutInterval = 5400;
            webSocket.onopen = function(event) {
                var key = [0, uid, tid, 0].join('_')
                webSocket.send(key);
            };
            webSocket.onmessage = function(event) {
                var data = JSON.parse(event.data);
                console.log('---push---', data)
                ynSocket.dispatch(data);
            };
        } catch (e) {
            console.log('===推送有错')
            return;
        }
    }()
    var onSelect = function(name) {
        $('.yn-nav-wrap').find('ul a').each(function() {
            if ($(this).text() == name) {
                $(this).parents('ul li').addClass("cur")
            }
        })
    }
    </script>
