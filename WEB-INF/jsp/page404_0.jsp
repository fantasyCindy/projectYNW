<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title></title>
        <%@ include file="./common/all.jspf" %>
            <link href="/public/css/404.css" rel="stylesheet" />
    </head>

    <body>
        <div class="container-fluid m634 pink">
            <div class="container w634 No1">
                <div class="row conter">
                    <p>我们深表歉意，页面无法访问，这种错误可能因为：</p>
                    <p>·您键入的网址不正确</p>
                    <p>·过期的书签或搜索引擎链接</p>
                    <p>·您要查找的页面可能已被转移、更新或删除</p>
                </div>
                <div class="row">
                    <div class="return">
                        <a href="${path}">返回约投顾首页</a>
                        <a href="javascript:history.go(-1);">返回上一页</a>
                    </div>
                </div>
            </div>
        </div>
    </body>

    </html>
