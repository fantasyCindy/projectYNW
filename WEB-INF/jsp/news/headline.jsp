<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../v2/seo-v2.jspf" %>
            <title>${headLinesTitle}</title>
            <meta name="keywords" content="${headLinesKey}" />
            <meta name="description" content="${headLinesDescription}" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/v2/base/bootpag.css" />
                <link rel="stylesheet" href="/public/v2/news/headline.css?v=2017071012" />
                <script>
                var room_teacherid = "${teacher.teacherid}";
                var __total = ${total};
                var __href = window.location.href;
                var pageMatch = __href.match(/\d+$/)
                var __page = pageMatch ? pageMatch[0] : 1
                </script>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="headline">
                <div class="banner"></div>
                <div class="container frame-shadow">
                    <c:forEach items="${headLinesList}" var="list">
                        <div class="list">
                            <div class="title"><a href="${path}/headlines/${list.type}/${list.articleid}.htm" target="_blank">${list.title}</a></div>
                            <div class="content">${list.shortContent.length() > 200 ? fn:substring(list.shortContent,0,200): list.shortContent}</div>
                            <div class="msg">
                                <span class="keywords">${list.keywords}</span>
                                <span class="time">${fn:substring(list.create_time,0,16)}</span>
                            </div>
                        </div>
                    </c:forEach>
                </div>
            </div>
            <%@include file="../v2/front-foot-v2.jsp" %>
                <script src="/public/js/template.js?695"></script>
                <script src="/public/js/bootpag.js"></script>
                <script src="/public/v2/base/yntool.js?20170705"></script>
                <script src="/public/v2/news/headline.bundle.js?0127"></script>
    </body>

    </html>
