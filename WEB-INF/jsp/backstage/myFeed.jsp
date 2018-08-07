<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
    <head>
        <%@ include file="../common/all.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css" />
    </head>

    <body>
        <%@include file="../common/head.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="contentWrap">
                        	我的关注
                        </div>
                    </div>
            </div>
            <%@include file="../common/foot.jsp" %>
                <script src="/private/backstage/js/backstage.js"></script>
                <script src="/private/backstage/js/mySetting.js"></script>
                <script type="text/javascript">
                $(function() {
                    setting.init();
                })
                </script>
    </body>

    </html>
