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
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <%@ include file="liveDetail_common.jsp" %>
                <div id="liveDetail" class="clear">
                    <div class="liveContent">
                        <!-- LEFT -->
                        <div class="leftBar">
                            <div id="opinion" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的观点</span>
                                </div>
                                <div id="category">
                                    <a href="${opinion_path }dapan/${teacher.teacherid}/" class="opinionType-item dapan" data-id="2">大盘</a>
                                    <a href="${opinion_path }ticai/${teacher.teacherid}/" class="opinionType-item ticai" data-id="1">题材</a>
                                   <!--  <a href="${opinion_path }jiangu/${teacher.teacherid}/" class="opinionType-item jiangu" data-id="0">鉴股</a>
                                    <a href="${live_path}gupiaoxueyuan/${teacher.teacherid}/" class="opinionType-item gupiaoxueyuan" data-id="3">股票学院</a> -->
                                </div>
                                <div class="items">
                                    <c:forEach items="${opinionList}" var="opinion">
                                        <div class="opinion-list-item">
                                            <div class="info inline">
                                                <a href="/opinion/${opinion.article_id}.htm" data-articleid='${opinion.article_id}' data-createid='${opinion.create_id}' target="_blank" class="title href">
                                                    <span class="value">${opinion.title}</span>
                                                    <span class="trend  trend">${opinion.stock_trend_text}</span>
                                                </a>
                                                <a href="/opinion/${opinion.article_id}.htm" data-articleid='${opinion.article_id}' data-createid='${opinion.create_id}' target="_blank" class="subject href">${opinion.shortContent}</a>
                                                <div class="intro">
                                                    <span class="time">${opinion.create_timeStr}</span>
                                                    <span class="view">
                                                                <i class="icon"></i>阅读
                                                                <span class="value">${opinion.viewnumber}</span>
                                                    <i class="icon"></i>赞
                                                    <span class="value">${opinion.zan_count}</span>
                                                    </span>
                                                    <span class="common">
                                                                <i class="icon"></i>评论
                                                                <span class="value">${opinion.comment_count}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                        <!--  RIGHT -->
                        <div class="rightBar">
                            <div id="bestOpinion" class="b220">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的精彩观点</span>
                                </div>
                                <div class="items">
                                    <c:forEach items="${bestList}" var="opinion">
                                        <div class="bestOpinion-item">
                                            <div class="bestOpinion-item-title">
                                                <span class="yn-icon-circle"></span>
                                                <a href="/opinion/${opinion.article_id}.htm" target="_blank" class="value">${opinion.title}</a>
                                            </div>
                                            <div class="bestOpinion-item-content">
                                                <a href="/opinion/${opinion.article_id}.htm" target="_blank" class="value">${opinion.shortContent}</a>
                                            </div>
                                            <div class="bestOpinion-item-info">
                                                <span class="time">${opinion.create_timeStr}</span>
                                                <span class="view">阅读 : （${opinion.viewnumber}）</span>
                                            </div>
                                        </div>
                                    </c:forEach>
                                     <c:if test="${empty bestList}">
                                        <div class="listNone"><i class="fa fa-exclamation-circle fa-lg" style="margin-right:5px;position:relative;top:-1px;"></i>暂无记录</div>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <%@ include file="../common/bestOpinion.jsp" %>
                    <%@ include file="../common/module-opinion-list-person.jsp" %>
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
                                yn.log("isTeacherSelf = " + isTeacherSelf);
                                var __total = Number('${total}');
                                </script>
                                <script src="/public/source/yndata.min.js"></script>
                                <script src="/public/source/ynmodule.min.js"></script>
                                <script type="text/javascript" src="/public/bundle/liveDetail_opinion.bundle.js?0730"></script>
    </body>

    </html>
