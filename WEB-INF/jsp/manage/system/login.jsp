<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
<style type="text/css">
html,body {
	height: 100%;
}
.box {
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#198397', endColorstr='#198397'); /*  IE */
	background-image:linear-gradient(bottom, #198397 0%, #198397 100%);
	background-image:-o-linear-gradient(bottom, #198397 0%, #198397 100%);
	background-image:-moz-linear-gradient(bottom, #198397 0%, #198397 100%);
	background-image:-webkit-linear-gradient(bottom, #198397 0%, #198397 100%);
	background-image:-ms-linear-gradient(bottom, #198397 0%, #198397 100%);
	margin: 0 auto;
	position: relative;
	width: 100%;
	height: 100%;
}
.login-box {
	width: 100%;
	max-width:500px;
	height: 400px;
	position: absolute;
	top: 50%;
	margin-top: -200px;
	/*设置负值，为要定位子盒子的一半高度*/
	
}
@media screen and (min-width:500px){
	.login-box {
		left: 50%;
		/*设置负值，为要定位子盒子的一半宽度*/
		margin-left: -250px;
	}
}	

.form {
	width: 100%;
	max-width:500px;
	height: 275px;
	margin: 0px auto 0px auto;
	padding-top: 25px;
}	
.login-content {
	height: 300px;
	width: 100%;
	max-width:500px;
	background-color: rgba(255, 250, 2550, .6);
	float: left;
}		
	
	
.input-group {
	margin: 0px 0px 30px 0px !important;
}
.form-control,
.input-group {
	height: 40px;
}

.form-group {
	margin-bottom: 0px !important;
}
.login-title {
	padding: 20px 10px;
	background-color: rgba(0, 0, 0, .6);
}
.login-title h1 {
	margin-top: 10px !important;
}
.login-title small {
	color: #fff;
}

.link p {
	line-height: 20px;
	margin-top: 30px;
}
.btn-sm {
	padding: 8px 24px !important;
	font-size: 16px !important;
}
</style>
<script type="text/javascript">
	$(document).ready(function(){
		//如果登录页嵌入iframe则自动刷新
		if (self.frameElement != null) {
			parent.location.reload();
	    }
	});

	function loginValidate(){
		var usernameObj = $("#username");
		var passwordObj = $("#password");
		if($.trim(usernameObj.val()).length == 0){
			usernameObj.tooltip("show");
			return false;
		}
		if($.trim(passwordObj.val()).length == 0){
			passwordObj.tooltip("show");
			return false;
		}
		return true;
	}
</script>
  </head>
  
  <body>
  <div class="box">
		<div class="login-box">
			<div class="login-title text-center">
				<h1><small>网站后台管理系统</small></h1>
			</div>
			<div class="login-content ">
			<div class="form">
			<form action="${path }/login.do" method="post" onsubmit="return loginValidate();">
				<div style="width:100%;margin: 0 auto;text-align: center;margin-bottom: 25px;height: 20px;">
					<span id="loginFailInfo"></span>
				</div>
				<div class="form-group">
					<div class="col-xs-12  ">
						<div class="input-group">
							<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
							<input type="text" id="username" name="userName" class="form-control" placeholder="用户名" data-toggle="tooltip" data-placement="top" title="请输入用户名">
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-xs-12  ">
						<div class="input-group">
							<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
							<input type="password" id="password" name="password" class="form-control" placeholder="密码" data-toggle="tooltip" data-placement="top" title="请输入密码">
						</div>
					</div>
				</div>
				<div class="form-group form-actions">
					<div class="col-xs-12">
						<button type="submit" class="btn btn-sm btn-info" style="width:100%;"><span class="glyphicon glyphicon-off"></span> 登录</button>
					</div>
				</div>
			</form>
			</div>
		</div>
	</div>
</div>
	   <script type="text/javascript">
	   var msg = "${msg}";
		if(msg!=null&&msg!=""){
			var loginFailInfoObj = $("#loginFailInfo");
			loginFailInfoObj.html("登录失败：<font color='#FF0000'>"+msg+"</font>")
		}
	   </script>
  </body>
</html>	