<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

        <!DOCTYPE html>
        <html lang="en">

        <head>
            <%@ include file="../v2/seo-v2.jspf" %>
        <%@ include file="../common/m-common.jspf" %>
            <%@ include file="../common/session-info.jsp" %>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
            <script>
            window.onload = function() {
                document.addEventListener('touchstart', function(event) {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                    }
                })
                var lastTouchEnd = 0;
                document.addEventListener('touchend', function(event) {
                    var now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false)
            }
            </script>
            <script async src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
            <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <link rel="stylesheet" href="/public/wap/reset.css">
            <link rel="stylesheet" href="/public/wap/index.css?@@152325945992142@@">
        </head>

        <body>
            <div id="app"></div>
            <script src="https://cdn.bootcss.com/lodash.js/4.17.5/lodash.min.js"></script>
            <script src="/public/js/reconnecting-websocket.js"></script>
            <script src="/public/wap/index.bundle.js?@@20180508@@"></script>
        </body>

        </html>
