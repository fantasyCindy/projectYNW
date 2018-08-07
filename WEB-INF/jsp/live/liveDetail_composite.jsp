<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
         <%@ include file="../common/front-common.jspf" %>
        <title>${teacher.title} <c:forEach items="${specialtys}" var="sp">${sp.name} </c:forEach>约投顾</title>        
		<meta name="keywords" content="${teacher.title},<c:forEach items="${specialtys}" var="sp">${sp.name},</c:forEach>约投顾"/>
		<meta name="description" content="${teacher.title},${teacher.descriptionString} <c:forEach items="${specialtys}" var="sp">${sp.name},</c:forEach>约投顾"/>
        
            <link href="/private/live/css/liveDetail.css?v=20170930" rel="stylesheet" />
            <link rel="stylesheet" href="/public/css/composite.css" />
            <link rel="stylesheet" href="/public/css/liveDetail_composite.css" />
            <script type="text/javascript">
            var projectPath = "${path}";
            var periodicalid = "${periodical.periodicalid}";
            var room_id = "${periodical.roomid}";
            var room_teacherid = "${teacher.teacherid}";
            var room_userid = "${teacher.user_id}";
            var isTeacherSelf = (room_userid == ynUserId);
            var liveStatus = '${periodical.status}';
            yn.log("isTeacherSelf = " + isTeacherSelf);
            </script>
    </head>

    <body>
        <%@ include file="../common/head.jsp" %>
            <%@ include file="liveDetail_common.jsp" %>
                <div id="liveDetail">
                    <div class="liveContent">
                        <!-- LEFT -->
                        <div class="leftBar">
                            <div class="filter">
                                <div class="item select" data-value="0">预售中</div>
                                <div class="item" data-value="1">运行中</div>
                                <div class="item" data-value="2">已完成</div>
                            </div>
                            <div class="composite-container">
                                <div class="composite-items"></div>
                            </div>
                        </div>
                        <!--  RIGHT -->
                        <div class="rightBar">
                            <%@ include file="../modules/composite-tip.jsp" %>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <%@  include file="../modules/composite-item.jsp" %>
                <%@ include file="../common/moudule-ask.jsp" %>
                    <%@ include file="../common/foot.jsp" %>
                        <script type="text/javascript" src="/public/bundle/liveDetail_composite.bundle.js?20170930"></script>
    </body>

    </html>
