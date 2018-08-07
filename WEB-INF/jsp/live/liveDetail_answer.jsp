<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
        <title>${teacher.title} <c:forEach items="${specialtys}" var="sp">${sp.name} </c:forEach>约投顾</title>        
		<meta name="keywords" content="${teacher.title},<c:forEach items="${specialtys}" var="sp">${sp.name},</c:forEach>约投顾"/>
		<meta name="description" content="${teacher.title},${teacher.descriptionString} <c:forEach items="${specialtys}" var="sp">${sp.name},</c:forEach>约投顾"/>
            <%@ include file="../v2/front-common-v2.jspf" %>
        <link href="/private/live/css/liveDetail.css?v=0730" rel="stylesheet" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <%@ include file="liveDetail_common.jsp" %>
                <div id="liveDetail" class="clear">
                    <div class="liveContent">
                        <!-- LEFT -->
                        <div class="leftBar">
                            <div id="myAnswer" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的问答</span>
                                </div>
                                <div id="category">
                                    <a href="${ask_path }gegu/${teacher.teacherid}/" class="item askStock-category-item gegu" data-id="2">个股</a>
                                    <a href="${ask_path }bankuai/${teacher.teacherid}/" class="item  askStock-category-item bankuai" data-id="1">板块</a>
                                    <a href="${ask_path }panmian/${teacher.teacherid}/" class="item  askStock-category-item panmian" data-id="0">大盘</a>
                                    <a href="${ask_path }zhishi/${teacher.teacherid}/" class="item  askStock-category-item zhishi" data-id="3">知识</a>
                                </div>
                                <div class="items">
                                    <c:forEach items="${noteList}" var="note">
                                        <div class="answer-list-item" data-id=${note.noteid}>
                                            <div class="question">
                                                <a href="${ask_path}consultation/${note.noteid}.htm" target="_blank" class="value">${note.questioncontent}</a>
                                                <span class="trend"></span>
                                            </div>
                                            <div class="answer">
                                                <a href="${ask_path}consultation/${note.noteid}.htm" target="_blank" class="value">${note.answercontentStr}</a>
                                            </div>
                                            <div class="info">
                                                <span class="time">${note.answertimeStr}</span>
                                                <span class="view">
                                                    <i class="yn-icon-view"></i>
                                                    <span class="count">${note.note_readcount}</span>
                                                </span>
                                                <span class="comment hide">
                                                    <i class="yn-icon-comment"></i>
                                                    <span class="count"></span>
                                                </span>
                                                <span class="type hide">
                                                    <i class="yn-icon-note"></i>
                                                    <span class="value"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                        <!--  RIGHT -->
                        <div class="rightBar">
                            <div id="bestAnswer" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的精彩回答</span>
                                </div>
                                <div class="items">
                                    <c:forEach items="${hotList}" var="note">
                                        <div class="tableView-item">
                                            <a class="tableView-title" href="${ask_path}consultation/${note.noteid}.htm" target="_blank">
                                                <span class="value">${note.questioncontent}</span>
                                            </a>
                                            <a class="tableView-content " href="${ask_path}consultation/${note.noteid}.htm" target="_blank">${note.answercontentStr}</a>
                                            <div class="tableView-info">
                                                <span class="time ">${note.answertimeStr}</span>
                                                <span class="view ">
                                                <span class="txt">阅读</span>
                                                <span class="value">${note.note_readcount}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </c:forEach>
                                     <c:if test="${empty hotList}">
                                        <div class="listNone"><i class="fa fa-exclamation-circle fa-lg" style="margin-right:5px;position:relative;top:-1px;"></i>暂无记录</div>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <%@ include file="../common/moudule-ask.jsp" %>
                    <%@ include file="../common/front-foot.jsp" %>
                        <script type="text/javascript">
                        var projectPath = "${path}";
                        var periodicalid = "${periodical.periodicalid}";
                        var room_id = "${periodical.roomid}";
                        var room_teacherid = "${teacher.teacherid}";
                        var room_userid = "${teacher.user_id}";
                        var isTeacherSelf = (room_userid == ynUserId);
                        var liveStatus = '${periodical.status}';
                        var __total = ${total};
                        yn.log("isTeacherSelf = " + isTeacherSelf);
                        </script>
                        <script src="/public/bundle/liveDetail_answer.bundle.js?0730"></script>
    </body>

    </html>
