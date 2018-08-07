<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <title>约投顾，让股民与牛人相约</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="renderer" content="webkit">
        <meta http-equiv="Content-Language" content="zh-CN" />
        <meta http-equiv="Cache-Control" content="no-siteapp" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <%@include file="../common/all.jspf" %>
        <link rel="stylesheet" type="text/css" href="/private/app/css/app.css">
        <script type="text/javascript">
            var isMobile = {}
            isMobile.Android= function() {
                return navigator.userAgent.match(/Android/i) ? true: false;
            },
            isMobile.iOS= function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
            },
            isMobile.any= function() {  
                return (isMobile.Android() || isMobile.iOS());  
            }
            if (isMobile.any()) {
                window.location.href = '/app/returnAppJsp.htm';
            }      
        </script>
    </head>

    <body>
        <%@include file="../common/head.jsp" %>
            <div id="app">
                <div class="yn-app title">
                    <div class="yn-wrap banner">
                        <div class="down">
                            <img width="180" style="float:left" src="/private/head/images/appewm.png">
                            <a target="_blank" href="https://itunes.apple.com/us/app/约牛炒股/id1102710227?l=zh&ls=1&mt=8" class="appdown iphone-app"></a>
                            <a target="_blank" href="/public/other/yueniulive.apk" class="appdown android-app"></a>
                        </div>
                    </div>
                </div>
                <div class="yn-wrap live mt50"></div>
                <div class="yn-wrap question mt50"></div>
                <div class="yn-wrap information mt50"></div>
                <div class="yn-wrap group mt50"></div>
                <div class="yn-wrap client mt50">
                    <h3><center>约牛炒股客户端</center></h3>
                    <center>开发商：约投顾</center>
                    <center>适用于iOS7.1 Android 4.0以上平台</center>
                    <div class="ct">
                        <center>iPhone</center>
                        <a target="_blank" href="https://itunes.apple.com/us/app/约牛炒股/id1102710227?l=zh&ls=1&mt=8" class="sub subiphone"></a>
                        <center>Android Phone</center>
                        <a target="_blank" href="/public/other/an.apk?00005" class="sub subandroid"></a>
                    </div>
                    <center><img width="180" src="/private/head/images/appewm.png"></center>
                    <center>扫一扫，从此爱上炒股</center>
                </div>
            </div>
            <%@include file="../common/foot.jsp" %>
    </body>

    </html>
