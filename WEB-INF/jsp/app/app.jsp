<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <title>约投顾，让股民与牛人相约</title>
    <script type="text/javascript" src="/public/js/Zepto.min.js"></script>
    <script type="text/javascript">
        var isMobile = {}
                isMobile.Android= function() {
                    return navigator.userAgent.match(/Android/i) ? true: false;
                },
                isMobile.iOS= function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true: false;
                },
                isMobile.Windows= function() {  
                    return navigator.platform.indexOf('Win') ==0;  
                },
                isMobile.Mac= function() {  
                    return   navigator.platform.indexOf('Mac') ==0;
                }, 
                isMobile.wechat= function(){
                    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ? true: false;
                },
                isMobile.any= function() {  
                    return (isMobile.Mac() || isMobile.Windows());  
                }
                if (isMobile.any()) {
                    window.location.href = '/public/other/down.html';
                    // window.location.href = '/app/returnAppDownloadJsp.htm';
                }
            

                  
    </script>
</head>
<body>
    <style type="text/css">
        *{margin:0; padding:0;}
        img{max-width: 100%; height: auto;border:none;}
        .content{text-align:center;}
        .content .dow{width:224px;height:49px;margin:30px 0;}
        .content img:not(.dow){display:block}
        #weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} 
        #weixin-tip p{text-align: center; margin-top: 10%; padding:0 5%;}
    </style>
    <div class="content">
        <img src="/public/images/appdown/app_01.png" alt="">
        <img src="/public/images/appdown/app_02.png" alt="">
        <img src="/public/images/appdown/app_03.png" alt="">
        <img src="/public/images/appdown/dow_btn.png" alt="" class="dow">
    </div>
    <script type="text/javascript">
        $(function(){
                isMobile.loadHtml= function(){
                    var div = document.createElement('div');
                    div.id = 'weixin-tip';
                    div.innerHTML = '<p><img src="/private/app/images/live_weixin.png" alt="微信打开"/></p>';
                    document.body.appendChild(div);
                }
            if(isMobile.wechat()){
                isMobile.loadHtml();
            }
            
            if (isMobile.iOS()) {
                $('.content').on('click','.dow',function(){
                    window.location.href = 'https://itunes.apple.com/us/app/约牛炒股/id1102710227?l=zh&ls=1&mt=8';
                })
            }
            if (isMobile.Android()) {
                
                $('.content').on('click','.dow',function(){
                    window.location.href = '/public/other/app-server-release_3.3.4.apk';
                })

            }; 
        })
    </script>
</body>
</html>