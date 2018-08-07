<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../v2/seo-v2.jspf" %>
            <title>
                ${article.title}-今日股市行情走势分析-约投顾
            </title>
            <meta name="keywords" content="${article.title}-今日股市行情走势分析,约投顾" />
            <meta name="description" content="${fn:substring(article.contentStr,0,120)},${article.title}-今日股市行情走势分析，约投顾" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/v2/news/headlineDetail.css?v=201709223" />
                <script>
                var room_teacherid = "${teacher.teacherid}";
                </script>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="headlineDetail">
                <div class="crumbs">当前位置 : <a href="${path}/index.htm" target="_blank">首页</a><i class="fa fa-angle-right margin5" aria-hidden="true"></i><a href="${path}/headline.htm" target="_blank">约牛头条</a><i class="fa fa-angle-right margin5" aria-hidden="true"></i><span class="light">${article.title}</span></div>
                <div class="container">
                    <div class="left frame-shadow">
                        <div class="content">
                            <div class="left-t">${article.title}</div>
                            <div class="left-msg">
                                <span class="name">约牛头条</span>
                                <span class="time">${article.time}</span>
                                <span class="readCount">阅读（${article.viewCount}）</span>
                            </div>
                            <div class="article">${article.content}</div>
                            <div class="tip">
                                <p class="tip-title">风险提示：以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎。</p>
                            </div>
                        </div>
                    </div>
                    <div class="right frame-shadow clear">
                        <div class="right-t">相关观点</div>
                        <div class="right-list">
                        <c:if test="${empty relevant}">
                           <div class="none"><i class="fa fa-exclamation-circle" aria-hidden="true" style="margin-right:5px;"></i>暂无内容</div>
                          </c:if>
                          <c:forEach var="relevants" items="${relevant}" varStatus="status">
                          
                            <li class="right-item">
                                <a href="${path}/opinion/${relevants.article_id}.htm" target="_blank">
                                    <div class="related-t">${relevants.title}</div>
                                    <div class="right-msg">
                                        <span class="name">${relevants.author}</span>
                                        <span class="time clear">${relevants.ctime}</span>
                                    </div>
                                </a>
                            </li>

                            </c:forEach>
                           
                        </div>
                    </div>
                    <div class="clean"></div>
                </div>
            </div>
            <%@include file="../v2/front-foot-v2.jsp" %>
                <script src="/public/v2/base/yntool.js?20170705"></script>
    </body>

    </html>
