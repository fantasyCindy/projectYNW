<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf"%>
            <title>${head.opinion.title}</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta name="keywords" content="${head.opinion.keywords}" />
                <meta name="description" content="${head.opinion.description}" />
                <link href="/public/css/opinion.css?03292" rel="stylesheet" />     
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
                <a href="${path}/index.htm">首页</a>
                <i class="fa fa-angle-right"></i>
                <a href="${opinion_path}">观点</a>
            </div>
            <div id="opinion">
                <div class="category">
                    <div class="left" id="stockType">
                        <div class="items">
                            <div class="type0">
                                <div class="stockType-item item ">
                                    <div class="line top">
                                        <span class="title bg0">大盘</span>
                                        <a class="more" href="${opinion_path}dapan/" target="_blank">
                                            <span>更多</span> <i class="fa fa-angle-right fa-lg"></i>
                                        </a>
                                    </div>
                                    <c:forEach var="opinion" items="${article0}" varStatus="status">
                                        <c:if test="${status.count == 1}">
                                            <div class="line main">
                                                <div class="thum">
                                                    <img width="100%" src="${path}/${opinion.image}" />
                                                </div>
                                                <div class="content">
                                                    <div class="title">
                                                        <span class="recommended">荐</span><a class="name" href="${opinion_path}dapan/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.title}</a>
                                                    </div>
                                                    <a class="subject" href="${opinion_path}dapan/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.shortContent}</a>
                                                    <div class="info">
                                                        <a class="avatar inline" href="${live_path}live/${opinion.create_id}/" target="_blank">
                                                            <img src="${opinion.photo}" />
                                                        </a>
                                                        <a class="name" href="${live_path}live/${opinion.create_id}/" target="_blank">${opinion.createrName}</a>
                                                        <span class="time">${fn:substring(opinion.create_time,0,16)}</span> <span class="read">阅读：<span class="count">${opinion.viewnumber}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:if>
                                    </c:forEach>
                                    <div class="bottom-items overflow">
                                        <c:forEach var="opinion" items="${article0}" varStatus="status">
                                            <c:if test="${status.count != 1}">
                                                <div class="line bottom">
                                                    <!-- <i class="icon-small-circle"></i>  -->
                                                    <span class="recommended">荐</span>
                                                    <a class="name" href="${opinion_path}dapan/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.title}</a> <span class="time">${fn:substring(opinion.create_time,0,16)}</span>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                    </div>
                                </div>
                            </div>
                            <div class="type1">
                                <div class="stockType-item item ">
                                    <div class="line top">
                                        <span class="title bg0">题材</span>
                                        <a class="more" href="${opinion_path}ticai/" target="_blank">
                                            <span>更多</span> <i class="fa fa-angle-right fa-lg"></i>
                                        </a>
                                    </div>
                                    <c:forEach var="opinion" items="${article1}" varStatus="status">
                                        <c:if test="${status.count == 1}">
                                            <div class="line main">
                                                <div class="thum">
                                                    <img width="100%" src="${path}/${opinion.image}" />
                                                </div>
                                                <div class="content">
                                                    <div class="title">
                                                        <a class="name" href="${opinion_path}ticai/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.title}</a>
                                                    </div>
                                                    <a class="subject" href="${opinion_path}ticai/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.shortContent}</a>
                                                    <div class="info">
                                                        <a class="avatar inline" href="${live_path}live/${opinion.create_id}/" target="_blank">
                                                            <img src="${opinion.photo}" />
                                                        </a>
                                                        <a class="name" href="${live_path}live/${opinion.create_id}/" target="_blank">${opinion.createrName}</a>
                                                        <span class="time">${fn:substring(opinion.create_time,0,16)}</span>
                                                        <span class="read">阅读：<span class="count">${opinion.viewnumber}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:if>
                                    </c:forEach>
                                    <div class="bottom-items overflow">
                                        <c:forEach var="opinion" items="${article1}" varStatus="status">
                                            <c:if test="${status.count != 1}">
                                                <div class="line bottom fl">
                                                    <i class="icon-small-circle"></i>
                                                    <a class="name" href="${opinion_path}ticai/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.title}</a>
                                                    <span class="time">${fn:substring(opinion.create_time,0,16)}</span>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                    </div>
                                </div>
                            </div>
                            <div class="type3">
                                <div class="stockType-item item ">
                                    <div class="line top">
                                        <span class="title bg0">股票学院</span>
                                        <a class="more" href="${opinion_path}gupiaoxueyuan/" target="_blank">
                                            <span>更多</span> <i class="fa fa-angle-right fa-lg"></i>
                                        </a>
                                    </div>
                                    <c:forEach var="opinion" items="${article3}" varStatus="status">
                                        <c:if test="${status.count == 1}">
                                            <div class="line main">
                                                <div class="thum">
                                                    <img width="100%" src="${path}/${opinion.image}" />
                                                </div>
                                                <div class="content">
                                                    <div class="title">
                                                        <a class="name" href="${opinion_path}gupiaoxueyuan/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.title}</a>
                                                    </div>
                                                    <a class="subject" href="${opinion_path}gupiaoxueyuan/${opinion.create_id}/${opinion.article_id}.htm" target="_blank">${opinion.shortContent}</a>
                                                    <div class="info">
                                                        <a class="avatar inline" href="${live_path}live/${opinion.create_id}/" target="_blank">
                                                            <img src="${path}/${opinion.photo}" />
                                                        </a>
                                                        <a class="name" href="${live_path}live/${opinion.create_id}/" target="_blank">${opinion.createrName}</a>
                                                        <span class="time">${fn:substring(opinion.create_time,0,16)}</span> <span class="read">阅读：<span class="count">${opinion.viewnumber}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:if>
                                    </c:forEach>
                                    <div class="bottom-items overflow">
                                        <c:forEach var="opinion" items="${article3}" varStatus="status">
                                            <c:if test="${status.count != 1}">
                                                <div class="line bottom">
                                                    <i class="icon-small-circle"></i>
                                                    <a class="name" href="${opinion_path}opinion/${opinion.article_id}.htm" target="_blank">${opinion.title}</a>
                                                    <span class="time">${fn:substring(opinion.create_time,0,16)}</span>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <!-- 最新观点 -->
                        <div class="lastestAiticles child ">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span> <span class="txt">最新观点</span>
                            </div>
                            <div class="items">
                                <c:forEach var="opinion" items="${article}" varStatus="status">
                                    <div class="item">
                                        <div class="title">
                                            <a href="${opinion_path}opinion/${opinion.article_id}.htm" target="_blank">${opinion.title}</a>
                                        </div>
                                        <div class="info">
                                            <span class="name">${opinion.createrName}</span>
                                            <span class="time">${fn:substring(opinion.create_time,0,16)}</span>
                                        </div>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                        <!-- 观点牛人 -->
                        <div class="bestTeachers child ">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span> <span class="txt">观点排行</span>
                            </div>
                            <div class="items">
                                <c:forEach var="opinion" items="${opinionTeahcer}" varStatus="status">
                                    <div class="item">
                                        <a class="avatar inline thead" data-teacherid="${opinion.create_id}" href="${live_path}live/${opinion.create_id}/" target="_blank">
                                            <img width="100%" src="${opinion.photo}" />
                                        </a>
                                        <div class="content">
                                            <div class="top">
                                                <a class="name" href="${live_path}live/${opinion.create_id}/" target="_blank">${opinion.createrName}</a>
                                                <a class="enter" href="${live_path}live/${opinion.create_id}/" target="_blank">进入直播室</a>
                                            </div>
                                            <div class="bottom">
                                                <span class="txt">观点：</span>
                                                <span class="opinionCount">${opinion.opinionCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../common/front-foot.jsp"%>
            <script>
                onSelect('观点')
            </script>
                <!-- <script src="/public/v2/base/yntool.js?20170705"></script> -->
                <!-- <script src="${path}/public/bundle/opinion.bundle.js?2017092833"></script> -->
    </body>

    </html>
