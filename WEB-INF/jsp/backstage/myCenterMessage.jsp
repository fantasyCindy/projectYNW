<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾 | 我的内参</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
                <link rel="stylesheet" href="/private/backstage/css/myRefer.css?v=03295">
                <link rel="stylesheet" href="/private/backstage/css/myCenterMessage.css?v=0329">
                <link rel="stylesheet" href="/private/backstage/css/actin.css?20170921">
                <link href="http://cdn.bootcss.com/element-ui/1.2.4/theme-default/index.css" rel="stylesheet">
                <link rel="stylesheet" href="/public/css/cropper.min.css">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock"  class="clear">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <div class="right shadow">
                            <div id="contentWrap">
                                <!-- /*==================================================*/ -->
                                <div id="myRefer">
                                    <div class="titleBar">
                                        <i class="md-icon"></i>
                                        <span class="title">我的消息</span>
                                    </div>
                                    <!-- 用户端 -->
                                    <div id="userBar">
                                        <div class="category"><table><tr class="tab-content"> </tr></table></div>
                                        <div class="contentBar">
                                            <div class="items">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /*==================================================*/ -->
                            </div>
                        </div>
                </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/js/cropper.min.js"></script>
                <script src="/public/js/vue.min.js"></script>
                <script src="https://cdn.bootcss.com/element-ui/1.3.5/index.js"></script>
                <script type="text/javascript" src="/public/ueditor/ueditor.config.js"></script>
                <script type="text/javascript" src="/public/ueditor/ueditor.all.min.js"></script>
                <script type="text/javascript" src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
                <script src="/public/bundle/myCenterMessage.bundle.js?0127"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>