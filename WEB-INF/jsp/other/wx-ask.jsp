<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>问股 | 约投顾</title>
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta content=always name=referrer>
        <meta http-equiv="Content-Language" content="zh-CN" />
        <meta http-equiv="Cache-Control" content="no-siteapp" />
        <meta name="baidu-site-verification" content="98ebBPqVhQ" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script>
        //重定向到首页
        var __href = window.location.href
        if (/#/.test(__href)) {
            window.location.href = __href.match(/^(.+?)#/)[1]
        }
        </script>
        <link rel="stylesheet" href="/public/css/reset.css">
        <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/public/mobile/css/wx-ask.css?v=20170504132510">
        <script src="https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js"></script>
        <script>
        var __userId = '${sessionScope.frontUserid}'
        var __userName = '${sessionScope.frontLoginName}'
        var screenHeight = $(window).height()
        var store = {
            detailData: null,
            cacheData: [],
            position: 0 // 滚动条的位置
        }
        </script>
    </head>

    <body>
        <div id="app" :style="style.app">
            <router-view></router-view>
        </div>
        <script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
        <script src="https://cdn.bootcss.com/vue/2.2.6/vue.min.js"></script>
        <script src="https://cdn.bootcss.com/vue-router/2.4.0/vue-router.min.js"></script>
        <script src="/public/mobile/wx-ask.bundle.js?v=20170504131330"></script>
    </body>

    </html>
