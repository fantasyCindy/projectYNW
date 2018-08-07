<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>约投顾 | 注册</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet"  href="/public/css/register.css?v=0329" />

    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <!-- Begin -->
            <div class="container">
                <div id="register">
                    <div class="menuBar">
                        <div class="item inline" data-type="normal">注册</div>
                    </div>
                    <div class="form-items">
                        <!--  <div class="form-item" id="input_nickName">
                            <div class="content">
                                <span class="label">昵称</span>
                                <input type="text" autocomplete="off" placeholder="中文/字母/数字,且不超过12个字符" name='nickname' />
                            </div>
                            <div class="error"><span class="txt">中文/字母/数字,且2~12个字符</span></div>
                        </div> -->
                        <div class="form-item" id='input_mobile'>
                            <div class="content">
                                <span class="label">手机号码</span>
                                <input type="text" autocomplete="off" placeholder="手机号为11位数字" name="phone" />
                            </div>
                            <div class="error"><span class="txt">手机号为11位数字</span></div>
                        </div>
                        <!-- 图形验证码 -->
                        <!-- <div class="form-item" id='input_imgCode'>
                            <div class="content">
                                <span class="label">图形验证码</span>
                                <input type="text" autocomplete="off" name="validCode" placeholder="请输入图形验证码" />
                                <img class="img-validCode absolute" src="${path}/validCode.htm" />
                            </div>
                            <div class="error"><span class="txt">请输入正确验证码</span></div>
                        </div> -->
                        <!-- 短信验证码 -->
                        <div class="form-item" id='input_message'>
                            <div class="content">
                                <span class="label">验证码</span>
                                <input type="text" autocomplete="off" placeholder="短信验证码/语音验证码" name="phoneCode" />
                            </div>
                            <button id="getPhoneCode"><span>获取验证码</span></button>
                            <div class="error"><span class="txt">短信验证码输入错误</span></div>
                            <div class="getVoiceCode">没收到短信？<span class="txt getVoiceMsg">点此获取语音验证码</span></div>
                        </div>
                        <div class="form-item" id="input_password" style="height:34px;">
                            <div class="content">
                                <span class="label">登录密码</span>
                                <input type="password" class="see-input" placeholder="字母/下划线或数字, 至少6位" name="pwd" />
                                <span class="eye can" id="enable-pass-visible"><img src="/public/images/vipact/see.png" alt="" /></span>
                            </div>
                            <div class="error"><span class="txt">密码必须包含字母/下划线或数字, 且至少6位</span></div>
                        </div>
                        <!--   <div class="form-item" id="input_confirm">
                            <div class="content">
                                <span class="label">确认密码</span>
                                <input type="password" class="see-input" name="confirmpwd" placeholder="字母/下划线或数字, 至少6位"/><span class="eye can"><img src="/public/images/vipact/see.png" alt="" /></span>
                            </div>
                            <div class="error"><span class="txt">两次密码输入不一致</span></div>
                        </div> -->
                         <div class="form-item" id="input_code">
                            <div class="content">
                                <span class="label">邀请码</span>
                                <input type="text" name="confirmpwd" placeholder="邀请码"/>
                            </div>
                        </div>
                    </div>
                    <div class="center">
                        <div class="inline">
                            <input id="agree" type="checkbox" checked class="r-check" />
                            <span>我已阅读并同意遵守 <a target="_blank" href="/html/protocol.htm">《约投顾网站用户注册协议》</a></span>
                        </div>
                    </div>
                    <div class="action">
                        <button class="submit" id="submit-btn">立即注册</button>
                    </div>
                </div>
            </div>
            <div id="popup-captcha">
                <div id="popup-captcha-box"></div>
            </div>
            <div id="pop-refer">
                <div class="pop-refer-content">
                <span><img src="${path}/public/images/register/bg1.png" alt=""></span>
                <span class="pop-refer-close"><img src="${path}/public/images/register/off1.png" alt=""></span>
                </div>
            </div>
            <!-- End -->
            <%@ include file="../common/front-foot.jsp" %>
                <script src="/public/js/gt.js"></script>
                <script src="/public/bundle/register.bundle.js?v=03011"></script>

    </body>

    </html>