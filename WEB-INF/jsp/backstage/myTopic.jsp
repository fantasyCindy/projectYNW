<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <meta charset="UTF-8">
            <title>约投顾 | 我的话题</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css">
                <link href="http://cdn.bootcss.com/element-ui/1.2.4/theme-default/index.css" rel="stylesheet">
                <link rel="stylesheet" href="/public/css/cropper.min.css">
                <link rel="stylesheet" href="/public/v2/my/myTopic.css?0503" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="myTopic" class="clear">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <div class="right">
                        	<router-view></router-view>
                        </div>                    
                </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/source/ynmodule.js"></script>
                <script src="/public/js/cropper.min.js"></script>
                <script src="/public/js/vue.min.js"></script>
                <script src="https://cdn.bootcss.com/element-ui/1.3.5/index.js"></script>
                <script src="http://cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script>
                <script src="http://cdn.bootcss.com/vuex/2.2.1/vuex.min.js"></script>
                <script type="text/javascript" src="/public/ueditor/ueditor.config.js"></script>
                <script type="text/javascript" src="/public/ueditor/ueditor.all.min.js"></script>
                <script type="text/javascript" src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
                <script src="/public/v2/my/myTopic.bundle.js?01271"></script>
    </body>

    </html>
