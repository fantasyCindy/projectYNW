<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>约牛有你更美好</title>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="/private/appregister/css/appregister.css">
</head>
<body>
    <div id="appregister">
        <div class="logo">
        	
        </div>
    	<div class="register_tag">
    		<span>手机号注册</span>
    	</div>
    	<span class="line line-left"></span><span class="line line-right"></span>
    	<div class="register_content">
    		<form name="name" id="name" method="post" action="">
                <div class="wrap">
                    <div class="entry">
                        <input type="text" id="mobile"  maxlength="11" class="lastVerify form-control tel" aria-label="..." placeholder="请输入11位手机号码" name="phone">
                    </div>
                    <div class="red">
                        <span class="error-msg hid" id="phone_span">手机号格式错误</span>
                    </div>
                </div>
                <div class="wrap">
                	<div class="entry" style="margin-top:5px;">
                    	<input type="text" class="lastVerify form-control Verification_code" aria-label="..." placeholder="手机验证码" id="phoneCode" name="phoneCode">
                        <a id="sendPhoneCodeId" class="sendbefore">获取验证码</a>
                    </div>
                    <div class="red">
                        <span class="error-msg hid" id="phoneCode_span" class="">验证码错误</span>
                    </div>
                </div>
                <div class="wrap">
                    <div class="entry">
                        <input type="password" id="pwd" class="lastVerify form-control tel" aria-label="..." placeholder="请设置登陆密码" name="pwd">
                    </div>
                    <div class="red">
                        <span class="error-msg hid" id="password_span">密码是6-16个英文和数字</span>
                    </div>
                </div>
                <!-- <div class="wrap">
	                <div class="entry">
	                    <input type="password" class="lastVerify form-control tel" aria-label="..." placeholder="请再次确认新密码" id="confirmpwd" name="confirmpwd">
	                </div>
	                <div class="red">
	                    <span class="error-msg hid" id="newPassword_again_input">两次密码输入不一致</span>
	                </div>
                </div> -->
    		</form>
    	</div>
    	<div class="finsh">
            <div class="wrap">
                <input id="registerBtn" class="btn-login" style="cursor: pointer;" type="button" name="registerBtn" value="立即注册">
            </div>
            <div class="wrap">
                <span>注册即同意遵守
                    <a target="_black" href="${path }/html/protocol.htm">《约投顾网站用户注册协议》</a>
                </span>
            </div>
    	</div>
    </div>
    <script src="http://cdn.bootcss.com/jquery/1.10.1/jquery.min.js"></script>
    <script src="/public/js/layer/layer.js"></script>
    <script src="/private/appregister/js/appregister.js"></script>
</body>
</html>