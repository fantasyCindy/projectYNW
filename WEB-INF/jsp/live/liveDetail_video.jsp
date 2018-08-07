<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/all.jspf" %>
            <link href="/private/live/css/liveDetail.css?v=2" rel="stylesheet" />
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
                        </div>
                        <!--  RIGHT -->
                        <div class="rightBar"></div>
                    </div>
                </div>
                <%@ include file="../common/foot.jsp" %>
                    <script type="text/javascript" src="/public/source/liveDetail.js"></script>
                    <script type="text/javascript">
                    </script>
    </body>

    </html>
