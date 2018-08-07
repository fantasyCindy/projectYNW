<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>购买成功</title>
            <%@ include file="../common/front-common.jspf" %>
                <style>
                #done-refer {
                    width: 510px;
                    height: 566px;
                    background: #fff url(/public/images/pay-bg.png) no-repeat;
                    background-position: 25px 0;
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
                    left:20px;
                }
                
                .content {
                    width: 320px;
                    padding: 50px 20px;
                    padding-top:96px;
                    margin: 0 auto;
                    line-height: 50px;
                    font-size: 18px;
                    color:rgb(102,102,102);
                    text-align: center;
                }
                .colorRed{
                    color:rgb(215,39,33);
                }
                .colorBlue{
                    color:rgb(10,125,246);
                }
                strong{
                    color:#000;
                }
                .time{
                    background:url(/public/images/t-time.png) no-repeat;
                    background-position: 57px 16px;
                    padding-left:26px;
                }
                .time a{
                    display: inline-block;
                    margin-left:20px;
                    font-size:15px;
                    color:rgb(215,39,33);
                }
                </style>
    </head>

    <body>
        <%@ include file="../common/front-head.jsp" %>
            <div id="done-refer">
                <div class="top"><img src="${path}/public/images/congratulate.png" alt="" /></div>
                <div class="content">
                    <div class="txt">用户您好，您已购买成功!</div>
                    <div class="txt">请等待我们的客服和您联系</div>
                    <div class="time">倒计时<span class="colorBlue"><span class="count">3</span>S</span><a class="link" href="http://101.201.41.116:8080/html/liveVipAct.htm">跳过></a></div>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
            <script>

                var timer = setInterval(function(){
                    var count = $('.count');
                    var value = Number(count.text());
                    if(value > 1){
                        value--;
                        count.text(value);
                    }else{
                        clearInterval(timer);
                        window.location.href = 'http://101.201.41.116:8080/html/liveVipAct.htm'
                    }
                },1000)
              
            </script>
    </body>

    </html>
