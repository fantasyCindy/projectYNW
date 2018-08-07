<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
    <html>

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约牛，让股民与牛人相约</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" type="text/css" href="/public/css/forget.css?0329">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="forget" class="container">
                <h2 class="title-1">找回密码</h2>
                <div class="contentBar center">
                    <div class="indicate">
                        <div id="step-indicate" class="step-item-1"></div>
                        <div class="step-text">
                            <span class="ind-text1">身份验证</span>
                            <span class="ind-text2">重置密码</span>
                            <span class="ind-text3">找回成功</span>
                        </div>
                    </div>
                    <!-- step1 -->
                    <div class="step1">
                        <div class="item">
                            <span class="inline label">手机号码</span>
                            <input type="text" placeholder="输入11位数字" id="input_phone">
                        </div>
                        <div class="item">
                            <span class="inline label">验证码</span>
                            <input type="text" placeholder="短信验证码/语音验证码" id="input_message_code">
                            <div id="message-code" class="absolute code inline"><button class="getMsgCode">获取短信验证码</button></div>
                            <div class="getVoiceCode">没收到短信？<span class="txt getVoiceMsg">点此获取语音验证码</span></div>
                        </div>
                    </div>
                    <!-- step 2 -->
                    <div class="step2 hide">
                        <div class="item">
                            <span class="inline label">设置新密码</span>
                            <input type="password" placeholder="字母/下划线或数字至少6位" id="input_new">
                        </div>
                        <div class="item">
                            <span class="inline label">确认新密码</span>
                            <input type="password" id="input_confirm">
                        </div>
                    </div>
                    <!-- step 3 -->
                    <div class="step3 hide">
                        <h2>新密码设置成功</h2>
                    </div>
                    <div class="action">
                        <button id="next">下一步</button>
                    </div>
                </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/bundle/forget.bundle.js?0330"></script>
    </body>

    </html>
