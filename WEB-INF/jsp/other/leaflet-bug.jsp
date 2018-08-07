<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>找错|约投顾-找错</title>
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta content=always name=referrer>
        <meta http-equiv="Content-Language" content="zh-CN" />
        <meta http-equiv="Cache-Control" content="no-siteapp" />
        <meta name="baidu-site-verification" content="98ebBPqVhQ" />
        <meta name="viewport" content="width=375">
        <meta name="viewport" content="width=414">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="/public/css/all.css">
        <link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/public/css/leaflet-bug.css">
        <link rel="stylesheet" href="/public/css/cropper.min.css">
    </head>

    <body>
    <%@include file="../common/front-login.jsp" %>
        <div id="leaflet_logo">
            
        </div>
        <div id="leaflet">
            <div class="leaflet_title"><span>基本信息填写</span><a href="http://www.yuetougu.com"></a></div>
            <form id="leaflet_form">
                <input type="hidden" name="creatorid" value="${sessionScope.login_user_front.user_id}" />
                <div class="form-group">
                    <label>网站名称：</label>约投顾
                </div>
                <div class="form-group">
                    <label>问题类型：</label>
                    <select class="form-control" name="typeid" id="askType">
                    </select>
                </div>
                <div class="form-group">
                    <label>问题页面网址：</label>
                    <input class="form-control" style="width:78%;float:left" name="url" />
                </div>
                <div class="form-group">
                    <label>截图上传：</label>
                    <input type="hidden" id="imgJoint" name="image" />
                    <div class="form-imgBox">
                        <div class="add"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label>问题描述：</label>
                    <textarea class="form-textarea" name="content"></textarea>
                </div>
                <div class="form-group">
                    <label>您的姓名：</label>
                    <input class="form-control" name="name" />
                </div>
                <div class="form-group">
                    <label>您的电话：</label>
                    <input class="form-control" name="phone" />
                </div>
                <span class="confirm">确定提交</span>
            </form>
        </div>
    </body>
    <script src="http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="/public/js/lodash.js"></script>
    <script src="http://cdn.bootcss.com/layer/3.0.1/layer.min.js"></script>
    <script src="/public/js/cropper.min.js"></script>
    <script src="/public/bundle/leaflet-bug.bundle.js"></script>
    <script>
        var href = window.location.href;
    </script>

    </html>
