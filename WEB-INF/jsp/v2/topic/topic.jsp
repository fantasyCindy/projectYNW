<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../seo-v2.jspf" %>
            <title>约投顾,投顾圆桌-${topic.topic_title}</title>
            <meta name="keywords" content="约投顾，投顾圆桌，${topic.topic_title}" />
            <meta name="description" content="约投顾,投顾圆桌-${topic.topic_content}" />
            <%@ include file="../front-common-v2.jspf" %>
                <link rel="stylesheet" href="${path}/public/module/qqface/sprite.css" />
                <link rel="stylesheet" href="/public/v2/base/bootpag.css" />
                <link rel="stylesheet" href="/public/v2/topic/topic.css?12141" />
                <link rel="stylesheet" href="/public/v2/index/layer.css?v=4993" />
                <script>
                var topic_id = '${topic.id}'
                var create_id = '${topic.create_id}'
                var isAttention = '${topic.isAttention}'
                var length = '${topic.teacherList.size()}'
                </script>
    </head>

    <body>
        <%@include file="../front-head-v2.jsp" %>
            <div id="topic">
                <div class="topic-common">
                    <div class="topic-top">
                        <div class="topic-photo"><img src="${topic.topic_img}" alt=""></div>
                        <div class="topic-top-msg">
                            <span class="topic-title">#${topic.topic_title}#</span>
                            <span class="topic-attention attention${topic.isAttention}"></span>
                            <span class="topic-tip">关注：<span class="attention-num">${topic.attention}</span>投顾讨论：<span class="comment-num">
                                <c:if test="${topic.commentCount == null}">0</c:if>
                            ${topic.commentCount}</span></span>
                            <div class="topic-host">主持人：${topic.nickname}</div>
                        </div>
                    </div>
                    <div class="topic-msg">
                        <div class="topic-msg-text">${topic.topic_content}</div>
                        <i class="icon-line"></i>
                        <div class="topic-msg-guest">
                            <div class="topic-msg-title">参与的嘉宾<span class="guest-num">（${topic.teacherList.size()}人）</span></div>
                            <c:if test="${empty topic.teacherList}">
                                <div class="none">暂无参与嘉宾呢</div>
                            </c:if>
                            <div class="topic-guest-photos">
                                <script>
                                if (length > 7) {
                                    document.write('<span class="left-arrow arrow"></span>')
                                }
                                </script>
                                <div class="guest-photo-content">
                                    <div class="guest-photo-wrap clear">
                                        <c:forEach items="${topic.teacherList}" var="list">
                                            <a href="/live/${list.teacherid}" target="_blank">
                                                <div class="guest-photo">
                                                    <span class="guest-photos"><span class="guest-teacher-photo"><img src="${list.photo}" alt=""></span>
                                                    <i class="item-icon item-icon-guwen"><img src="${list.type_ioc}" alt="" /></i></span>
                                                    <p>
                                                        <c:if test="${fn:length(list.nickname) > 5}">
                                                            ${fn:substring(list.nickname,0,5)}..
                                                        </c:if>
                                                        <c:if test="${fn:length(list.nickname) <= 5}">
                                                            ${list.nickname}
                                                        </c:if>
                                                    </p>
                                                </div>
                                            </a>
                                        </c:forEach>
                                    </div>
                                </div>
                                <script>
                                if (length > 7) {
                                    document.write('<span class="right-arrow arrow"></span>')
                                }
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="topic-middle clear">
                    <div class="topic-left">
                        <div class="topic-textarea" style="display: none;">
                            <textarea rows="12" cols="99" placeholder="#${topic.topic_title}#"></textarea>
                            <div class="topic-tool-bar">
                                <span class="face" id="face-trigger"></span>
                                <div class="topic-send">发布</div>
                                <span class="topic-comment-count"><span class="count">500</span>/500</span>
                            </div>
                        </div>
                        <div class="topic-items-wrap">
                            <div class="topic-items clear">
                            </div>
                            <div class="page"></div>
                        </div>
                    </div>
                    <div class="topic-right" id="emerging">
                        <h1 class="topic-right-title">嘉宾直播</h1>
                        <div class="emerging-list">
                            <c:if test="${empty topic.teacherList}">
                                <div class="none">暂无参与嘉宾</div>
                            </c:if>
                            <c:forEach items="${topic.teacherList}" var="list">
                                <div class="emerging-item clear">
                                    <div class="avatar fl" data-userid="${list.user_id}">
                                        <img class="photo" src="${list.photo}" alt="">
                                        <span class="moods"><img src="/public/v2/live-list/images/hot.png" alt="">${list.popularity_number}</span>
                                    </div>
                                    <div class="content fl">
                                        <p class="clear top"><a href="/live/${list.teacherid}" target="_blank" class="title fl f4 b">
                                    <c:if test="${fn:length(list.title) > 5}">
                                        ${fn:substring(list.title,0,4)}..
                                    </c:if>
                                    <c:if test="${fn:length(list.title) <= 5}">
                                        ${list.title}
                                    </c:if>
                                    </a><a href="/live/${list.teacherid}" target="_blank" class="enter fr f2">查看直播</a></p>
                                        <p class="text bomb-tan">
                                            ${list.description}
                                        </p>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../front-foot-v2.jsp" %>
                <script src="/public/js/bootpag.js"></script>
                <script src="/public/source/ynmodule.js"></script>
                <script src="/public/v2/base/yntool.js?20170705"></script>
                <script src="/public/js/velocity.js?695"></script>
                <script src="/public/js/velocity.ui.js?695"></script>
                <script src="/public/v2/topic/topic.bundle.js?0329"></script>
    </body>

    </html>
