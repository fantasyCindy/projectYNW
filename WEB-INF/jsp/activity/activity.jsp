<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
	    <%@ include file="../common/all.min.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>我的约牛</title>
            <link rel="stylesheet" href="/private/alipaySuccess/css/alipaySuccess.css">
            <body>
            <button onclick="getToken()">点击</button>
            <button style="display: none;" id="appLogin" onclick="appLogin()">登录</button>
            ${appsecret}
            <script type="text/javascript">
	        var appsecret =  "${appsecret}";
	        alert(OCObject);
            var token = OCObject.getToken(appsecret);
            if(token){
	            alert(token);
            	$("#appLogin").hide();
            }else{
            	$("#appLogin").show();
            }
            
            function getToken(){
            	 var token = OCObject.getToken(appsecret);
 	             alert(token);
            }
            function appLogin(){
            	OCObject.appLogin();
            }
            </script>
            </body>
    </html>