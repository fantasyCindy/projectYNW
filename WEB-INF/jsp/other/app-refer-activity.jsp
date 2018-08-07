<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
pageContext.setAttribute("path", path);

%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <title>邀请好友注册，享专属特权</title>
            <meta name="description" content="我在约投顾跟着牛人炒股，邀请你一起赚钱-约投顾！
邀请小伙伴来约投顾，双方都可获得牛人内参，立即行动吧！" />
            <meta charset="utf-8">
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <link rel="shortcut icon" href="/public/images/favicon.ico">
            <style>
                *{
                    padding:0;
                    margin:0;
                }
                body{
                    width:100%;
                }
               #app-refer-activity{
                    max-width:800px;
                    margin: 0 auto;
                    background:#fdedd4;
                    padding-bottom:15%;
                }
                img{
                    width:100%;
                    display:block;
                    margin:0 auto;
                }
               .refer-activity-top img{
                    width:100%;
                }
                .refer-activity-invite{
                    margin-top:20px;
                }
                .refer-activity-invite img{
                    width:80%;
                }
                .refer-activity-btn img{
                    width:66%;
                }
                .refer-activity-introduce,.refer-activity-rules{
                    margin-top:30px;
                }
                .refer-activity-introduce img{
                    width:93%;
                }
                .refer-activity-rules img{
                    width:90%;
                }
            </style>
    </head>

    <body>
       <div id="app-refer-activity">
        <div class="refer-activity-top"><img src="/public/images/app-activity/banner.jpg" alt=""></div>
        <div class="refer-activity-invite"><img src="/public/images/app-activity/copy.png" alt=""></div>
        <div class="refer-activity-btn"><img src="/public/images/app-activity/invite_btn.png" alt=""></div>
        <div class="refer-activity-introduce"><img src="/public/images/app-activity/tougu.png" alt=""></div>
        <div class="refer-activity-rules"><img src="/public/images/app-activity/rule.png" alt=""></div>
       </div>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script>
        
        var path = '${path}'
        window.onload = function() {
            var btn = document.getElementsByClassName('refer-activity-btn')[0]
            btn.onclick = function(){
                var href = path + '/app-refer-share.htm'
                var obj = {
                    href: path + '/app-refer-share.htm',
                    title: '我在约投顾跟着牛人炒股，邀请你一起领牛人内参策略',
                    shortContent : "邀请小伙伴来约投顾，双方都可获得免费牛人内参，立即行动吧！"
                }
                sharePath(obj)
            }
        }

        function sharePath(obj) {
            console.log(obj)
        }
        </script>
    </body>

    </html>
