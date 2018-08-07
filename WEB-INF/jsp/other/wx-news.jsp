<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>每日5分钟</title>
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta content=always name=referrer>
        <meta http-equiv="Content-Language" content="zh-CN" />
        <meta http-equiv="Cache-Control" content="no-siteapp" />
        <meta name="baidu-site-verification" content="98ebBPqVhQ" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="/public/css/reset-mobile.css">
        <link rel="stylesheet" href="/public/mobile/css/wx-news.css">
        <script src="https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js"></script>
        <script>
        var store = {
            cacheData: []
        }
        </script>
    </head>

    <body>
        <div id="app" :style="style.app">
            <div class="news-items">
                <div class="news-item" v-for="item in news">
                    <div class="news-avatar">
                        <div class="imgw"><img :src="item.title_img_path"></div>
                    </div>
                    <div class="news-title" @click="goto(item.link)">
                        <p class="name" v-text="item.title"></p>
                        <div class="info">
                            <span class="time" v-text="item.publish_time"></span>
                        </div>
                    </div>
                </div>
            </div>
            <loading :visible="isLoading"></loading>
        </div>
        <script src="http://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>
        <script src="https://cdn.bootcss.com/vue/2.2.6/vue.min.js"></script>
        <script src="https://cdn.bootcss.com/vue-router/2.4.0/vue-router.min.js"></script>
        <script src="/public/mobile/wx-news.bundle.js"></script>
    </body>

    </html>
