<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>注册</title>
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <link rel="stylesheet" href="/public/mobile/css/app-welfare-index.css?1222">
            <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
            <script>
            var href = window.location.href
            var __path = 'http://101.201.41.116:8080'
            if (/yuetougu/.test(href)) {
                __path = 'http://www.yuetougu.com'
            }
            </script>
    </head>

    <body>
        <div id="app-welfare">
            <router-view></router-view>
        </div>
        <script src="https://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
        <script src="https://cdn.bootcss.com/vue/2.4.2/vue.min.js"></script>
        <script src="http://cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script src="/public/bundle/app-welfare-index.bundle.js?01311"></script>
    </body>

    </html>
