<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>注册成功</title>
            <%@ include file="../common/front-common.jspf" %>
                <style>
                #done-refer {
                    width: 510px;
                    height: 566px;
                    background: #fff url(/public/images/logo-11.png) no-repeat;
                    background-position: 45px 180px;
                    margin: 50px auto;
                    border-radius: 10px;
                    padding-top: 46px;
                    box-shadow: 10px 0 1px #DFDFDF;
                }
                
                .top {
                    width: 252px;
                    height: 46px;
                    margin: 0 auto;
                    position: relative;
                    left: 20px;
                }
                
                .content {
                    width: 320px;
                    padding: 50px 20px;
                    padding-top: 96px;
                    margin: 0 auto;
                    line-height: 50px;
                    font-size: 18px;
                    color: rgb(102, 102, 102);
                    position: relative;
                    left: 10px;
                }
                
                .colorRed {
                    color: rgb(215, 39, 33);
                }
                
                .colorBlue {
                    color: rgb(10, 125, 246);
                }
                
                strong {
                    color: #000;
                }
                
                .time {
                    background: url(/public/images/t-time.png) no-repeat;
                    background-position: 0 16px;
                    padding-left: 26px;
                }
                
                .time a {
                    display: inline-block;
                    margin-left: 20px;
                    font-size: 15px;
                    color: rgb(215, 39, 33);
                }
                </style>
    </head>

    <body>
        <%@ include file="../common/front-head.jsp" %>
            <div id="done-refer">
                <div class="top"><img src="${path}/public/images/welcome.png" alt="" /></div>
                <div class="content">
                    <div class="txt">用户您好，您已成功注册约投顾!</div>
                    <div class="txt">手机号：<span class="colorRed user">18310372520</span></div>
                    <div class="txt">您可以用<strong>手机号</strong>进行登录</div>
                    <div class="time">倒计时<span class="colorBlue"><span class="count">3</span>S</span><a href="http://www.yuetougu.com/html/liveVipAct.htm">跳过></a></div>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script>
                var href = window.location.href;

                // var matcha = href.match(/\&target=([\s\S]*)/);
                // var target = matcha?matcha[1]　:　'';
                // $('.link').attr('href',target)

                //匹配帐号
                var matchb = href.match(/\?user\=([\w\.+]+)/);
                var user = matchb?matchb[1]　:　'';
                $('.user').html(user)
                console.log('user',user)

                var timer = setInterval(function() {
                    var count = $('.count');
                    var value = Number(count.text());
                    if (value > 1) {
                        value--;
                        count.text(value);
                    } else {
                        clearInterval(timer);
                        window.location.href = 'http://www.yuetougu.com/html/liveVipAct.htm'
                    }
                }, 1000)
                </script>
    </body>

    </html>
