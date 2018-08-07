<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
<head>
    <title></title>
    <%@ include file="./common/all.jspf" %>
    <link href="/public/css/404.css" rel="stylesheet"/>
</head>
<body>
<div class="container-fluid m377 gray">
    <div class="container w377 five00">
        <div class="row conter"></div>
        <div class="return">
            <span>很抱歉！该网页无法访问......</br>您还可以：</span>
            <a href="${path}">返回首页</a><a href="javascript:history.go(-1);">返回上一页</a>
        </div>
    </div>
</div>
</body>
</html>

