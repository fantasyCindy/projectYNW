<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta content=always name=referrer>
        <meta http-equiv="Content-Language" content="zh-CN" />
        <meta http-equiv="Cache-Control" content="no-siteapp" />
        <meta name="baidu-site-verification" content="98ebBPqVhQ" />
        <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <title>${learning_stocks.title}</title>
        <style>
        body {
            font-family: '微软雅黑';
            font-size: 15px;
            margin: 0;
            padding: 0;
        }
        
        .app {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 15px 25px;
        }
        
        .app .top {
            padding-bottom: 10px;
            border-bottom: 1px solid #EAE8E8;
        }
        
        .color333 {
            color: #333;
        }
        
        .color666 {
            color: #666;
        }
        
        .color999 {
            color: #999;
        }
        
        .fl {
            float: left;
        }
        
        .fr {
            float: right;
        }
        
        .app .title {
            font-size: 16px;
        }
        
        .app .t-icon {
            display: inline-block;
            width: 3px;
            height: 15px;
            background: red;
            margin-right: 8px;
            position: relative;
            top: 1px;
        }
        
        .app .msg {
            margin-top: 5px;
        }
        
        .app .photo,
        .app .name,
        .app .time,
        .app .count {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            margin-right: 8px;
        }
        
        .app .photo {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            top: 8px;
        }
        
        .app .time {
            font-size: 12px;
        }
        
        .app .count {
            position: relative;
            /*top: 8px;*/
            background: url(../public/images/read_icon.png) no-repeat;
            background-size: 12px;
            padding-left: 16px;
            background-position: 0 9px;
            font-size: 12px;
        }
        
        .app .photo img {
            width: 100%;
        }
        
        .app .article {
            line-height: 25px;
        }
        
        .app .reminder {
            /*width: 100%;*/
            border: 1px solid #EAA3A3;
            background: #fbeeee;
            text-align: left;
            padding: 20px 35px;
            margin: 15px auto;
        }
        
        .content {
            padding-bottom: 20px;
            border-bottom: 1px solid #EAE8E8;
        }
        
        .content img {
            width: 100% !important;
            display: block;
            margin: 0 auto;
        }
        
        .text {
            font-size: 12px;
            margin-top: 5px;
        }
        
        .hide {
            display: none;
        }
        
        .article {
            white-space: normal;
            word-wrap: break-word;
        }
        .article p{
            padding:0;
            margin:0;
        }
        </style>
    </head>

    <body>
        <div class="app">
            <div class="content">
                <div class="top hide">
                    <div class="title color333"><i class="t-icon"></i>${learning_stocks.title}</div>
                    <div class="msg color666">
                        <!-- <div class="photo"><img src="./live-vip-act/icon1.png" alt=""></div> -->
                        <div class="name color666">约投顾</div>
                        <div class="time color999">${learning_stocks.create_time}</div>
                        <div class="count fr">${learning_stocks.viewcount}</div>
                    </div>
                </div>
                <div class="article color333">${learning_stocks.content}</div>
                <div class="reminder color666">风险提示:以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎。</div>
            </div>
            <div class="text color999">以上谨代表个人观点</div>
        </div>
        <script src="http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js"></script>
        <script>
        window.onload = function() {
            var is_weixin = function() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }()

            var is_QQ = function() {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/qq/i)) {
                    return true;
                } else {
                    return false;
                }
            }()
            if (is_weixin || is_QQ) {
                $('.app .top').show()
            }

            var time = $('.time');
            var val = time.text().substr(0, 16);
            time.html(val)

            //点击图片
            var imgs = document.getElementsByTagName('img')
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i]
                img.onclick = function() {
                    passValue(this.src)
                }
            }
        }

        function passValue(src) {
            console.log(src)
        }
        </script>
    </body>

    </html>
