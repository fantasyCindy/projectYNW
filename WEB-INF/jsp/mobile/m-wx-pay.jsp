<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>内参|支付</title>
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
            <script>
            var payInfo = JSON.parse('${payInfo}')
            </script>
            <style>
            .page-pay-wx {
                text-align: center;
                padding-top: 40px;
            }
            
            .page-pay-wx > * {
                margin-bottom: 10px;
            }
            
            .page-pay-wx .price .value {
                font-weight: bold;
                font-size: 30px;
                position: relative;
                top: 5px;
            }
            
            .page-pay-wx .status {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                line-height: 150px;
                color: white;
                background: #e83939;
                font-size: 18px;
                margin: 20px auto;
            }
            
            .page-pay-wx .status.done {
                background: #3eb90a;
            }
            
            .pay-status {
                overflow: hidden;
                text-align: center;
            }
            </style>
    </head>

    <body>
        <!-- <div>${payInfo}</div> -->
        <div class="page-pay-wx">
            <div class="title">约投顾|内参支付</div>
            <div class="pay-status">
                <div class="status continue">继续支付</div>
                <div class="status done">支付完成</div>
            </div>
        </div>
        <!-- /*///////////////////////////////////////////////////////////////////*/ -->
        <script src="http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js"></script>
        <script src="/public/module/socket.js"></script>
        <script>
        // var host = ""

        // if (/yueniuwang/.test(live_path)) {
        //     alert("1"+live_path)
        //     host = "http://ws.yuetougu.com"
        // } else if (/yuetougu/.test(live_path)) {
        //     alert("2"+live_path)
        //     host = "http://ws.yuetougu.com"
        // } else {
        //     alert("3"+live_path)
        //     host = live_path
        // }

            // alert("host"+host)
        // var COMMONSOKCET = function() {
        //     host = host.replace("http:", "");
        //     try {
        //         var webSocket;
        //         webSocketPath = "ws:" + host + "/websocket";
        //         webSocket = new ReconnectingWebSocket(webSocketPath);
        //         webSocket.debug = false;
        //         webSocket.timeoutInterval = 5400;
        //         webSocket.onopen = function(event) {
        //             var key = [0, 0, 0, 0].join('_')
        //             webSocket.send(key);
        //         };
        //         webSocket.onmessage = function(event) {
        //             var data = JSON.parse(event.data);
        //             ynSocket.dispatch(data);
        //         };
        //     } catch (e) {
        //         console.log('===推送有错')
        //         return;
        //     }
        // }()
        // var YNSOCKET = function() {
        //     host = host.replace("http:", "");
        //     var tid = ynTeacherId || "0";
        //     var uid = ynUserId || "0";
        //     if (tid !== "0") {
        //         uid = "0"
        //     }
        //     if (!ynUserId) {
        //         return;
        //     }
        //     try {
        //         var webSocket;
        //         webSocketPath = "ws:" + host + "/websocket";
        //         webSocket = new ReconnectingWebSocket(webSocketPath);
        //         webSocket.debug = true;
        //         webSocket.timeoutInterval = 5400;
        //         webSocket.onopen = function(event) {
        //             var key = [0, uid, tid, 0].join('_')
        //             webSocket.send(key);
        //         };
        //         webSocket.onmessage = function(event) {
        //             var data = JSON.parse(event.data);
        //             console.log('---push---', data)
        //             ynSocket.dispatch(data);
        //         };
        //     } catch (e) {
        //         console.log('===推送有错')
        //         return;
        //     }
        // }()
        // var onSelect = function(name) {
        //     $('.yn-mean').find('ul a').each(function() {
        //         if ($(this).text() == name) {
        //             $(this).parents('ul li').addClass("cur")
        //         }
        //     })
        // }

        $('.status.continue').click(function() {
            onBridgeReady()
        })

        $('.status.done').click(function() {
            // $.post('/app/isBuyRefer.htm', {
            //     referid: referid  //没有referid
            // }, function(back) {
            //     if (back.status == 1) {
            //         return alert(支付未完成)
            //     } else if (back.status == 60020) {
                    window.location.href = '/welfare.htm'
            //     }
            // }, 'json')
            
        })

        function onBridgeReady() {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": payInfo.appId, //公众号名称，由商户传入     
                    "timeStamp": payInfo.timeStamp, //时间戳，自1970年以来的秒数     
                    "nonceStr": payInfo.nonceStr, //随机串     
                    "package": payInfo.package,
                    "signType": "MD5", //微信签名方式：     
                    "paySign": payInfo.paySign //微信签名 
                },
                function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {


                    } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                }
            );
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }

        ynSocket.paySuccess.render = function(data) {
            window.location.href = __path + '/web/showccSuccess.htm';
        }
        </script>
    </body>

    </html>
