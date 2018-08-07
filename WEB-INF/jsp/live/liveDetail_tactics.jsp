<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>${teacher.title}
                <c:forEach items="${specialtys}" var="sp">${sp.name} </c:forEach>约投顾</title>
            <meta name="keywords" content="${teacher.title},<c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
            <meta name="description" content="${teacher.title},${teacher.descriptionString} <c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link href="/private/live/css/liveDetail.css?v=0730" rel="stylesheet" />
                <style>
                    .short-time-2{
                        width:80px !important;
                        display: inline-block;
                    }
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <script>
            // var isTeacherSelf = (room_userid == ynUserId);
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
                                    <span class="txt">TA的战法</span>
                                </div>
                                <div class="refer-items">
                                    <c:forEach items="${list}" var="tactics">
                                        <div class="opinion-list-item">
                                            <div class="info inline">
                                                <a href="/learning/${tactics.id}" target="_blank" class="title href">
                                                    <span class="value tac-title">${tactics.title}</span>
                                                    <span class="trend  trend"></span>
                                                </a>
                                                <a href="/learning/${tactics.id}" target="_blank" class="subject href contentStr">${tactics.contentStr}</a>
                                                <a href="/learning/${tactics.id}" target="_blank" class="subject href img" style="display: none;">[图片]</a>
                                                <div class="intro">
                                                    <span class="time short-time-2">${tactics.create_time}</span>
                                                    <span class="view">
                                                        <i class="icon"></i>阅读
                                                        <span class="value">${tactics.viewcount}</span>
                                                        <i class="icon"></i>赞
                                                    <span class="value">${tactics.zancount}</span>
                                                    </span>
                                                    <span class="common">
                                                        <i class="icon"></i>评论
                                                        <span class="value">${tactics.commentcount}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </c:forEach>
                                    <c:if test="${empty list}">
                                        <div class="listNone"><i class="fa fa-exclamation-circle" aria-hidden="true" style="margin-right:5px;position:relative;top:-1px;"></i>暂无内容</div>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                        <!-- right -->
                        <div class="rightBar">
                            <div id="hotRefer" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的精彩战法</span>
                                </div>
                                <div class="items hotRefer-items">
                                    <c:if test="${empty hotlist}">
                                        <div class="listNone"><i class="fa fa-exclamation-circle" aria-hidden="true" style="margin-right:5px;position:relative;top:-1px;"></i>暂无内容</div>
                                    </c:if>
                                    <c:forEach items="${hotlist}" var="hot">
                                        <div class="bestOpinion-item">
                                            <div class="bestOpinion-item-title">
                                                <span class="yn-icon-circle"></span>
                                                <a href="/learning/${hot.id}" target="_blank" class="value">${hot.title}</a>
                                            </div>
                                            <div class="bestOpinion-item-content">
                                                <a href="/learning/${hot.id}" target="_blank" class="value">${hot.contentStr}</a>
                                            </div>
                                            <div class="bestOpinion-item-info">
                                                <span class="time short-time-2">${hot.create_time}</span>
                                                <span class="view">阅读 :（${hot.viewcount}）</span>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <%@  include file="../common/moudule-ask.jsp" %>
                    <%@ include file="../common/front-foot.jsp" %>
                        <script type="text/javascript">
                        var projectPath = "${path}";
                        var periodicalid = "${periodical.periodicalid}";
                        var room_id = "${periodical.roomid}";
                        var room_teacherid = "${teacher.teacherid}";
                        var room_userid = "${teacher.user_id}";
                        var isTeacherSelf = (room_userid == ynUserId);
                        var liveStatus = '${periodical.status}';
                        yn.log("isTeacherSelf = " + isTeacherSelf);
                        var __total = Number('${total}');
                        </script>
                        <script src="/public/bundle/liveDetail_tactics.bundle.js?0730"></script>
    </body>

    </html>
