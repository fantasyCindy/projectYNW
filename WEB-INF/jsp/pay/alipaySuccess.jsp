<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/all.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>我的</title>
            <link rel="stylesheet" href="/private/alipaySuccess/css/alipaySuccess.css">

            <body>
                <div id="defray-nav">
                    <div class="defray-wrap">
                        <a href="/">首页</a>
                        <a href="${ask_path}">问股</a>
                        <a href="${live_path}">直播</a>
                        <a href="${video_path}">视频</a>
                        <a href="${news_path}">资讯</a>
                        <!-- <a href="/html/findTeacher.htm?hl5">找投顾</a> -->
                        <a href="${path}/myCenters.htm">我的</a>
                    </div>
                </div>
                <div id="defray">
                    <div class="defray-wrap clear">
                        <div class="fl" id="logo">
                            <a href="/">
                                <img src="/public/images/logo_v4.png" alt="约投顾" title="约投顾">
                            </a>
                            <span class="defray-title">支付中心</span>
                        </div>
                    </div>
                    <div class="defray-money">
                        <div class="defray-wrap">
                            <div class="defray-process">填写充值金额</div>
                            <a href="/myCenter/myIncome.htm?record" class="fr record">充值记录</a>
                            <div class="defray-win">
                                <p>
                                    <font color="#e20000">恭喜您，支付成功！</font>
                                </p>
                                <p><span><a id="count">1</a>秒后自动关闭页面</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                            <%@ include file="../common/front-foot.jsp" %>
                    <script type="text/javascript">
                    var timer = setInterval(function() {
                        var count = $('#count');
                        var value = Number(count.text());
                        if (value > 1) {
                            value--
                            count.text(value);
                        } else {
                            clearInterval(timer);
                            window.close();
                        }
                    }, 1000)
                    </script>
            </body>

    </html>
