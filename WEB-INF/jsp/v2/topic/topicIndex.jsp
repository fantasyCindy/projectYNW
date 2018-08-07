<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../seo-v2.jspf" %>
            <title>${head.yuanzhuo.title}</title>
            <meta name="keywords" content="${head.yuanzhuo.keywords}" />
            <meta name="description" content="${head.yuanzhuo.description}" />
            <%@ include file="../front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/v2/base/bootpag.css" />
                <link rel="stylesheet" href="/public/v2/topic/topic.css?12141" />
                <link rel="stylesheet" href="/public/v2/topic/topicIndex.css?12141" />
                <link rel="stylesheet" href="/public/v2/index/layer.css?v=4993" />
                <script>
                var __total = ${total}
                var __href = window.location.href;
                var pageMatch = __href.match(/\?pn=(\d+)$/)
                var __page = pageMatch ? pageMatch[1] : 1
                </script>
    </head>

    <body>
        <%@include file="../front-head-v2.jsp" %>
            <div id="topic" class="clear">
                <div class="topiclist_left">
                    <c:forEach items="${topicList}" var="list" varStatus="status">
                        <div class="topic-common" data-id="${list.id}">
                            <div class="topic-top">
                                <div class="topic-photo"><img src="${list.topic_img}" alt=""></div>
                                <div class="topic-top-msg">
                                    <span class="topic-title topic-title${status.index + 1}">#${list.topic_title}#
                                    </span>
                                </div>
                                <div class="topic-msg-line">
                                    <span class="topic-tip">
                                <span class="topic-msg-time">${fn:substring(list.create_time,0,11)}</span> 
                                    投顾讨论：
                                    <span class="comment-num comment-num${status.index + 1}">
                                <c:if test="${list.commentCount == null}">0</c:if>
                                    ${list.commentCount}
                                    </span>
                                关注：<span class="attention-num attention-num${status.index + 1}">
                                    <fmt:formatNumber type="number" groupingUsed="true" value="${list.attention}" />
                            </span> 
                                    <c:if test="${list.isAttention == 0 || list.isAttention == null}">
                                        <span class="topic-attention attention0">+关注</span>
                                    </c:if>
                                    <c:if test="${list.isAttention == 1}">
                                        <span class="topic-attention attention${list.isAttention}">取消关注</span>
                                    </c:if>
                                    </span>
                                </div>
                            </div>
                            <div class="topic-msg">
                                <div class="topic-msg-text">
                                    <i class="topic-msg-icon topic-msg-icon${status.index + 1}"></i>
                                    <c:if test="${fn:length(list.topic_content) > 110}">
                                        ${fn:substring(list.topic_content,0,110)}...
                                    </c:if>
                                
                                    <c:if test="${fn:length(list.topic_content) <= 110}">
                                        ${list.topic_content}
                                    </c:if>
                            </div>
                                <i class="icon-line"></i>
                                <div class="topic-msg-guest">
                                    <div class="topic-msg-title">参与的嘉宾<span class="guest-num">（${list.teacherList.size()}人）</span></div>
                                    <c:if test="${empty list.teacherList}">
                                        <div class="none">暂无参与嘉宾</div>
                                    </c:if>
                                    <div class="topic-guest-photos">
                                        <c:if test="${list.teacherList.size() > 3}">
                                            <span class="left-arrow arrow"></span>
                                        </c:if>
                                        <div class="guest-photo-content">
                                            <div class="guest-photo-wrap clear">
                                                <c:forEach items="${list.teacherList}" var="teacherlist">
                                                        <div class="guest-photo" data-teacherid="${teacherlist.teacherid}">
                                                            <span class="guest-photos"><span class="guest-teacher-photo"><img src="${teacherlist.photo}" alt=""></span>
                                                            <i class="item-icon item-icon-guwen"><img src="${teacherlist.type_ioc}" alt="${teacherlist.nickname}" /></i></span>
                                                            <p>${teacherlist.nickname}</p>
                                                        </div>
                                                </c:forEach>
                                            </div>
                                        </div>
                                        <c:if test="${list.teacherList.size() > 3}">
                                            <span class="right-arrow arrow"></span>
                                        </c:if>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </c:forEach>
                </div>
                <div class="topiclist_right">
                    <div class="topiclist_guestList" id="emerging">
                        <h1 class="topic-right-title">相关嘉宾</h1>
                        <div class="emerging-list">
                            <c:if test="${empty teacherList}">
                                <div class="none">暂无参与嘉宾</div>
                            </c:if>
                            <c:forEach items="${teacherList}" var="list">
                                <div class="emerging-item clear">
                                    <div class="avatar fl">
                                        <img class="photo" src="${list.teacherPhoto}" alt="">
                                        <span class="moods"><img src="/public/v2/live-list/images/hot.png" alt="">${list.popularity_number}</span>
                                    </div>
                                    <div class="content fl">
                                        <p class="clear top"><a href="/live/${list.teacher_id}" target="_blank" class="title fl f4 b">${list.teacherName}</a><a href="/live/${list.teacher_id}" target="_blank" class="enter fr f2">查看直播</a></p>
                                        <p class="text bomb-tan">
                                            ${list.description}
                                        </p>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                    <!-- 牛人排行 -->
                    <div class="ynw-ranking">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <span class="text">牛人排行</span>
                            <span class="color153 f1 ml10">最牛的人都在这里</span>
                        </div>
                        <div class="ranking-content frame-shadow">
                            <p class="ranking-title f5">
                                <span class="ranking-title-list cursor select" data-type="2">新晋牛人</span>
                                <span class="ranking-title-list cursor" data-type="1">咨询牛人</span>
                                <span class="ranking-title-list cursor" data-type="0">人气直播</span>
                            </p>
                         <%-- 人气 --%>
                                <div class="ranking-main hide">
                                    <c:forEach items="${popularityTeacher}" var="list" varStatus="status">
                                        <div class="ranking-main-list ranking-main-list${status.index + 1}">
                                            <a href="${live_path}live/${list.teacherid}/" target="_blank" class="block">
                                                <i class="ranking-icon"></i>
                                                <img class="image" src="${list.photo}" alt="" />
                                                <span class="ranking-text f3 ranking-people">${list.title}</span>
                                                <span class="ranking-text ranking-num f3 fr b"><span class="ranking-people-num">人气数</span>${list.popularity_number}</span>
                                            </a>
                                        </div>
                                    </c:forEach>
                                </div>
                                <%-- 咨询 --%>
                                    <div class="ranking-main hide">
                                        <c:forEach items="${answerCountTeacher}" var="list" varStatus="status">
                                            <div class="ranking-main-list ranking-main-list${status.index + 1}">
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="block">
                                                    <i class="ranking-icon"></i>
                                                    <img class="image" src="${list.photo}" alt="" />
                                                    <span class="ranking-text f3 ranking-people">${list.title}</span>
                                                    <span class="ranking-text ranking-num f3 fr b"><span class="ranking-people-num">回答问题数</span>${list.answerNum}</span>
                                                </a>
                                            </div>
                                        </c:forEach>
                                    </div>
                                    <%-- 新晋 --%>
                                        <div class="ranking-main">
                                            <c:forEach items="${newTeacher}" var="list" varStatus="status">
                                                <div class="ranking-main-list ranking-main-list${status.index + 1}">
                                                    <a href="${live_path}live/${list.teacherid}/" target="_blank" class="block">
                                                        <i class="ranking-icon"></i>
                                                        <img class="image" src="${list.photo}" alt="" />
                                                        <span class="ranking-text f3 ranking-people">${list.title}</span>
                                                        <span class="ranking-text ranking-num f3 fr b"><span class="ranking-people-num">人气数</span>${list.popularity_number}</span>
                                                    </a>
                                                </div>
                                            </c:forEach>
                                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../front-foot-v2.jsp" %>
                <script src="/public/js/bootpag.js"></script>
                <script src="/public/js/velocity.js?695"></script>
                <script src="/public/js/velocity.ui.js?695"></script>
                <script src="/public/v2/topic/topicIndex.bundle.js?03282"></script>
    </body>

    </html>
