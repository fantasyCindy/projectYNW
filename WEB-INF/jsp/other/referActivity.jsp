<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
          <script>      
            var isMobile = navigator.userAgent.match(/iPhone|Android/i)
            if (isMobile) window.location.href = '/welfare.htm'
        </script>
        <%@ include file="../v2/seo-v2.jspf" %>
            <title>股市福利内参</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/css/unslider.css" />
                <link rel="stylesheet" href="/public/v2/index/layer.css?v=4993" />
                <%-- <link rel="stylesheet" href="/public/css/referActivity.css?2017090611" /> --%>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="login_register" class="hid">
                <div class="l-r-content">
                    <div class="register-top">
                        <span class="register-top-text">注册</span>
                        <span class="register-top-close"><i class="fa fa-times"></i></span>
                    </div>
                    <div class="register">
                        <div class="w300">
                            <div class="register-inpt login-phone">
                                <input type="text" name="userName" class="l-r-input r-phone" placeholder="请输入手机号">
                            </div>
                            <!--   <div class="register-inpt login-password">
                                <img class="image-code" src="${path}/validCode.htm"></img>
                                <input type="text" name="text" class="l-r-input r-imgcode" placeholder="请输入图片验证码">
                            </div> -->
                            <div class="register-inpt login-password">
                                <i class="register-fa r-code">获取验证码</i>
                                <input type="text" name="message" class="l-r-input r-message" placeholder="请输入手机验证码">
                            </div>
                            <div class="register-inpt login-password">
                                <i class="register-fa r-see"></i>
                                <input type="password" name="password" class="l-r-input r-pass" placeholder="请输入密码">
                            </div>
                            <div class="register-inpt login-password">
                                <input type="text" name="text" class="l-r-input r-invite" placeholder="请输入邀请码">
                            </div>
                            <div class="inline register-agree">
                                <input id="agree" type="checkbox" checked="" class="r-check">
                                <span>我已阅读并同意遵守
                                <a  class="" target="_blank" href="/html/protocol.htm">《约投顾用户注册协议》</a>
                            </span>
                            </div>
                            <div class="login-info">
                                <span class="l-r-submit l-r-input">注册</span>
                            </div>
                            <div class="go-login">已有账号？去登录</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="referActivity">
                <div class="referAct-banner"></div>
                <div class="referAct-second"><img src="/public/images/referAct/second.png" alt="" /><span class="refer-second-btn go-buy"><img src="/public/images/referAct/btn.png" alt="" /></span></div>
                <div class="referAct-third"><img src="/public/images/referAct/third.png" alt="" />
                    <span class="referAct-today hide">当日剩余名额：
                    <span class="referAct-places referAct-places1 hide"></span>
                    <span class="referAct-places referAct-places2 hide"></span>
                    <span class="referAct-places referAct-places3 hide"></span> 人
                    </span>
                    <span class="refer-third-btn go-buy"><img src="/public/images/referAct/btn3.png" alt="" /></span></div>
                <div class="referAct-forth"><img src="/public/images/referAct/forth.png" alt="" /></div>
                <div class="referAct-banner2"><img src="/public/images/referAct/banner2.png" alt="" /><span class="refer-banner2-btn go-buy"><img src="/public/images/referAct/btn2.png" alt="" /></span></div>
                <div class="referAct-jia">
                    <div class="video-pop fire-video" data-vid="XMjk2MDYxMTg5Ng==">
                        <div class="box">
                            <div id="video-container">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="referAct-zhanji">
                    <div class="referAct-slider">
                        <ul>
                            <li><img src="/public/images/referAct/slider1.png" alt="" /></li>
                            <li><img src="/public/images/referAct/slider2.jpg" alt="" /></li>
                            <li><img src="/public/images/referAct/slider3.jpg" alt="" /></li>
                            <li><img src="/public/images/referAct/slider4.jpg" alt="" /></li>
                            <li><img src="/public/images/referAct/slider5.jpg" alt="" /></li>
                        </ul>
                    </div>
                </div>
                <div class="go go-buy"><img src="/public/images/referAct/button.png" alt="" /></div>
            </div>
            <div id="popup-captcha">
                <div id="popup-captcha-box"></div>
            </div>
            <div id="pay-employeecode" class="hide">
                <div class="pay-container">
                    <div class="pay-employee-title">请输入邀请码</div>
                    <div class="pay-employee-input">
                        <input type="text">
                    </div>
                    <div class="pay-employee-bar">
                        <span class="pay-btn pay-sure">确定</span>
                        <span class="pay-btn pay-cancel">取消</span>
                    </div>
                </div>
            </div>
            <%@include file="../v2/front-foot-v2.jsp" %>
                <script type="text/javascript" src="//player.youku.com/jsapi"></script>
                <script src="/public/js/velocity.js?695"></script>
                <script src="/public/js/velocity.ui.js?695"></script>
                <script src="/public/entry/unslider.js"></script>
                <script src="/public/js/gt.js"></script>
                <script src="/public/bundle/referActivity.bundle.js?201709013"></script>
    </body>

    </html>
