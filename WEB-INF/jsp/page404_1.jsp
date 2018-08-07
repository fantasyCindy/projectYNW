<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
<head>
    <title></title>
    <%@ include file="./common/all.jspf" %>
    <link href="/public/css/404.css" rel="stylesheet"/>
</head>
<body>
<div class="container-fluid m560 No2_bg">
    <div class="container w560 No2">
        <div class="row conter">
            <a href="${path}">返回约牛网首页</a>
            <a href="javascript:history.go(-1);">返回上一页</a>
        </div>
        <div class="row">
            <div class="return">
                <span>哎呀...您访问的页面不存在</br>友情提示:您可能输入了错误的网址，或者该网页已删除或移动</span>
            </div>
        </div>
    </div>
</div>
</body>
</html>

