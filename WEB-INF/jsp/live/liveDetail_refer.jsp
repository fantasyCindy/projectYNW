<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>${teacher.title}
                <c:forEach items="${specialtys}" var="sp">${sp.name} </c:forEach>约投顾</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta name="keywords" content="${teacher.title},<c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
                <meta name="description" content="${teacher.title},${teacher.descriptionString} <c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
                <link rel="stylesheet" href="/private/live/css/liveDetail.css?v=0730" />
                <script type="text/javascript">
                var projectPath = "${path}";
                var periodicalid = "${periodical.periodicalid}";
                var room_id = "${periodical.roomid}";
                var room_teacherid = "${teacher.teacherid}";
                var room_userid = "${teacher.user_id}";
                var liveStatus = '${periodical.status}';
                </script>
                <style>
                    #refer-li.refer-list-item .feedBtn {
                    left: 695px !important;
                }
                
                #refer-li.refer-list-item .dayCount {
                    bottom: 24px !important;
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <script>
            var isTeacherSelf = (room_userid == ynUserId);
            // yn.log("isTeacherSelf = " + isTeacherSelf);
            </script>
            <%@ include file="liveDetail_common.jsp" %>
                <div id="liveDetail" class="clear">
                    <div class="liveContent">
                        <!-- left -->
                        <div class="leftBar">
                            <div id="myRefer" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的内参</span>
                                </div>
                                <div class="refer-category"></div>
                                <div class="refer-items"></div>
                                <div class="page"></div>
                            </div>
                        </div>
                        <!-- right -->
                        <div class="rightBar">
                            <div id="hotRefer" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的热门内参</span>
                                </div>
                                <div class="items hotRefer-items"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <%@  include file="../common/moudule-ask.jsp" %>
                    <%@ include file="../common/front-foot.jsp" %>
                        <script src="/public/bundle/liveDetail_refer.bundle.js?v=0730"></script>
    </body>

    </html>
