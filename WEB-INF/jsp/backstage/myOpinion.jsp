<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾 | 我的观点</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329" />
                <link rel="stylesheet" href="/public/css/myOpinion.css>?0329" />
                <link rel="stylesheet" href="http://cdn.bootcss.com/element-ui/1.1.6/theme-default/index.css">
                
                <script type="text/javascript">
                // 组件协同交互
                var store = {
                    editData: null
                }
                var path = '${path}'
                </script>
                <style>
                    .el-message-box__headerbtn{
                        background:#fff;
                        border:none;
                        width:0;
                        height:0;
                    }
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock" style="margin-top:15px;">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <!-- /*========================  right  ==========================*/ -->
                        <div class="right shadow">
                            <div id="contentWrap">
                                <router-view></router-view>
                            </div>
                        </div>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script type="text/javascript" src="/public/ueditor/ueditor.config.js"></script>
                <script type="text/javascript" src="/public/ueditor/ueditor.all.min.js"></script>
                <script type="text/javascript" src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
                <script src="https://cdn.bootcss.com/vue/2.3.4/vue.min.js"></script>
                <script src="https://cdn.bootcss.com/vue-router/2.6.0/vue-router.min.js"></script>
                <script src="https://cdn.bootcss.com/element-ui/1.3.5/index.js"></script>
                <script src="/public/bundle/myOpinion.bundle.js?v=0127"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
