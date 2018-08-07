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
            <title>内参简介</title>
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
            * {
                padding: 0;
                margin: 0;
            }
            
            body {
                width: 100%;
                font-family: "微软雅黑";
            }
            
            #app-refer-introduction {
                max-width: 800px;
                margin:0 auto;
                padding: 15px 15px 70px 15px;
            }
            
            .app-refer-introduction-title {
                font-size: 16px;
            }
            
            .app-refer-introduction-content {
                margin-top: 10px;
                font-size: 15px;
                color: #666;
                line-height: 25px;
            }
            
            .app-refer-introduction-content img {
                display: block;
                width: 100% !important;
                height:auto !important;
                margin: 10px auto;
            }
            </style>
        </head>

        <body>
            <!-- app webview内参简介 -->
            <div id="app-refer-introduction">
                <input type="text" name="qqq" value="123" style="display:none" />
                <div class="app-refer-introduction-title">内参简介:</div>
                <div class="app-refer-introduction-content"></div>
            </div>
            <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
            <script>
            $(function() {
                var a = document.getElementsByName('qqq')[0].value
                console.log('a',a)
                var path = '${path}'
                var href = window.location.href
                var match = href.match(/referenceid=(\d+)/)
                var referid = match ? match[1] : ''
                var item = $('.app-refer-introduction-content')
                $.getJSON(path + '/reference/referbyid.htm', {
                    id: referid
                }, function(back) {
                    if(back.status == 1){
                        item.html(back.data.productInfo)
                    }else{
                        return alert('参数为空')
                    }
                })
            })
            </script>
        </body>

        </html>
