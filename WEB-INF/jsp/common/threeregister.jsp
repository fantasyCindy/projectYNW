<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <link rel="stylesheet" type="text/css" href="/private/head/css/threeregister.css?1215">
    <div class="account" id="accountform">
        <div class="account_user"><span>Hi，</span>
            <span class="nickname">${nickname}</span><span style="margin-left:5px;">欢迎登录约投顾</span></div>
        <div class="tag">
            <div class="tag_right">
                <form action="" autocomplete="off">
                    <div class="yes">
                        <!-- <p>首次访问，请填写以下信息，以后可以用手机号登录约投顾。</p> -->
                        <div class="three-content">
                            <div class="three-phone">
                                <span class="three-label">手机号</span>
                                <input name="phone" type="text" class="form-control" placeholder="手机号为11位数字" autocomplete="off" value="">
                            </div>
                            <div class="three-tip">
                                <div class="phoneFormat">手机号格式错误</div>
                                <div class="phoneEmpty">手机号不能为空</div>
                            </div>
                            <div class="code" style="display:none;">
                                <span class="three-label">图形验证码</span>
                                <input type="text" class="form-control Verification_code" aria-label="..." placeholder="图形验证码" name="validCode" autocomplete="off">
                                <img src="${path }/validCode.htm" id="imgCodeId">
                            </div>
                            <div class="three-tip" style="display:none;">
                                <div class="imgCodeFormat">图形验证码格式错误</div>
                                <div class="imgCodeEmpty">图形验证码不能为空</div>
                            </div>
                            <div class="col-xs-3 red">
                                <span id="validCode_span" class=""></span>
                            </div>
                            <div class="send">
                                <span class="three-label">验证码</span><input type="text" class="form-control Verification_code"
                                    aria-label="..." placeholder="短信验证码/语音验证码" name="phoneCode" autocomplete="off">
                                <span id="sendPhoneCodeId"><input type="button" class='phone-state-none' value="获取验证码"></span>
                                <div class="getVoiceCode">没收到短信？<span class="txt getVoiceMsg">点此获取语音验证码</span></div>
                            </div>

                            <div class="three-tip">
                                <div class="sendFormat">手机验证码格式错误</div>
                                <div class="sendEmpty">手机验证码不能为空</div>
                                <div class="sendLost">手机验证码失效</div>
                            </div>
                            <div class="three-pass">
                                <span class="three-label">密码</span><input name="pwd" type="password" class="form-control password"
                                    placeholder="字母/数字/下划线/至少6位" autocomplete="off">
                            </div>
                            <div class="three-tip">
                                <div class="passFormat">密码格式错误</div>
                                <div class="passEmpty">密码不能为空</div>
                            </div>
                            <div class="three-invited">
                                <span class="three-label">邀请码</span><input name="employeecode" placeholder="邀请码（选填）" type="text"
                                    class="form-control employeecode" placeholder="" autocomplete="off">
                            </div>
                        </div>
                        <button class="btn false" type="button">提交</button>
                    </div>
                </form>
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
    <script src="http://cdn.bootcss.com/jquery/1.10.1/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/layer/3.0.1/layer.js"></script>
    <script src="/public/js/lodash.js"></script>
    <script src="/public/js/gt.js"></script>
    <script type="text/javascript">
        var logintype = "${logintype}";
    </script>
    <script src="/public/bundle/threeRegister.bundle.js?0127"></script>
    </body>

    </html>