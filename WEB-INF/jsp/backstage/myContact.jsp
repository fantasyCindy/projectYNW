<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
        <%@ include file="../common/front-common.jspf" %>
        <link rel="stylesheet" href="/private/backstage/css/backstage.css" />
    </head>

    <body>
        <%@include file="../common/front-head.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="contentWrap">
                            <div class="title-1">联系客服</div>
                        </div>
                    </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
            <script src="/private/backstage/js/backstage.js"></script>
                <script type='text/javascript'>
                $(function() {
                    yn.centerMenu.init();
                    yn.centerMenu.render();
                })
                </script>
    </body>

    </html>
