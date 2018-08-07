<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>
                <c:choose>
                    <c:when test="${opinionTitle != null}">${opinionTitle }</c:when>
                    <c:otherwise>${head.opinion.title}</c:otherwise>
                </c:choose>
            </title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta name="keywords" content="<c:choose><c:when test='${opinionKey != null}'>${opinionKey }</c:when><c:otherwise>${head.opinion.keywords}</c:otherwise></c:choose>" />
                <meta name="description" content="<c:choose><c:when test='${opinionDescription != null}'>${opinionDescription}</c:when><c:otherwise>${head.opinion.description}</c:otherwise></c:choose>" />
                <link href="/public/css/opinionCategory.css?0329" rel="stylesheet" />
                <script type="text/javascript">
                /* beautify preserve:start */
           var __total = ${total};
        /* beautify preserve:end */             
                </script>
                <style>
                #personIntro .liveBtn{
                    display:inline !important;
                    width: 90px !important;
                    height: 20px;
                    border-radius: 4px;
                    line-height: 20px;
                    text-align: center;
                    color: #fff;
                    background: #ff8487;
                    font-size: 14px;
                    margin-left: 15px;
                    position:relative;
                    top:4px;
                    border:none !important;
                }
                </style>    
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="navg">
                <a href="/index.htm">首页</a>
                <i class="fa fa-angle-right"></i>
                <a href="/opinion/index.htm">观点</a>
                <i class="fa fa-angle-right"></i>
                <a href="#">观点详情</a>
            </div>
            <div id="opinionCategory" class="clear">
                <div class="left pagination" style="padding-bottom:20px;">
                    <div class="nav">
                        <a href="${opinion_path}dapan/" class="opinionType-item dapan">大盘</a>
                        <a href="${opinion_path}ticai/" class="opinionType-item ticai">题材</a>
                        <!-- <a href="${opinion_path}jiangu/" class="opinionType-item jiangu">鉴股</a> -->
                        <a href="${opinion_path}gupiaoxueyuan/" class="opinionType-item gupiaoxueyuan">股票学院</a>
                    </div>
                    <div class="opinion-content">
                        <c:forEach var="category" items="${categoryList}">
                            <div class="opinion-list-item">
                                <a class="avatar" data-teacherid="${category.create_id}" href="${live_path}live/${category.create_id}/" target="_blank">
                                    <img width="100%" src="${path}/${category.photo}" />
                                </a>
                                <div class="info inline">
                                    <p class="name">
                                        <a href="${live_path}live/${category.create_id}/" target="_blank">${category.createrName}</a></p>
                                    <a href="${opinion_path}opinion/${category.article_id}.htm" data-articleid='${category.article_id}' data-createid='${category.create_id}' target="_blank" class="title href">
                                        <span class="value">${category.title}</span>
                                        <span class="trend ${category.stock_trend} trend${category.stock_trend}">看涨</span>
                                    </a>
                                    <a href="${opinion_path}opinion/${category.article_id}.htm" data-articleid='${category.article_id}' data-createid='${category.create_id}' target="_blank" class="subject href">${category.opinionShortContent}</a>
                                    <div class="intro">
                                        <span class="time">${fn:substring(category.create_time,0,16)}</span>
                                        <span class="view">
                                    <i class="icon"></i>阅读
                                    <span class="value">${category.viewnumber}</span>
                                        <i class="icon"></i>赞
                                        <span class="value">${category.zan_count}</span>
                                        </span>
                                        <span class="common">
                                    <i class="icon"></i>评论
                                    <span class="value">${category.comment_count}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
                <div class="right">
                    <div class="hotOpinion">
                        <div class="title">热门观点</div>
                        <div class="items">
                            <c:forEach var="hot" items="${hotList}" varStatus="status">
                                <div class="hot-opinion-item">
                                    <span class="index index${status.count}">${status.count}</span>
                                    <div class="content">
                                        <a href="${opinion_path}opinion/${hot.article_id}.htm" target="_blank" class="name">${hot.title}</a>
                                        <div class="info">
                                            <a href="${live_path}live/${hot.create_id}/" target="_blank" class="author">${hot.createrName}</a>
                                            <span class="time">${fn:substring(hot.create_time,0,16)}</span>
                                            <a href="#" class="noteType" data-type="${hot.classifyName}" data-id="${hot.create_id}"><i class="yn-icon yn-icon-note">
                                            </i>${hot.classifyName}</a>
                                        </div>
                                    </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/v2/base/yntool.js?20170705"></script>
                <script src="${path}/public/bundle/opinionCategory.bundle.js?03291"></script>
    </body>

    </html>
