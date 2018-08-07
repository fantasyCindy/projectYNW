<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../v2/seo-v2.jspf" %>
            <title>
                ${learnStockTitle}-今日股市行情走势分析-约投顾
            </title>
            <meta name="keywords" content="${learnStockKey}-今日股市行情走势分析,约投顾" />
            <meta name="description" content="${fn:substring(learnStockDescription,0,120)},${learnStockDescription}-今日股市行情走势分析，约投顾" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/v2/news/learnStock.css?v=03292" />
                <link rel="stylesheet" href="/public/v2/base/bootpag.css?v=2017070532132" />
                <script>
                var room_teacherid = "${teacher.teacherid}";
                var __total = ${total}

                var __href = window.location.href;
                var typeMatch = __href.match(/com\/([a-z]+)/)
                var pageMatch = __href.match(/\d+$/)
                var __page = pageMatch ? pageMatch[0] : 1
                var __type = typeMatch ? typeMatch[1] : "xcg"
                </script>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                <div class="address">当前位置：<a href="http://www.yuetougu.com/" target="_blank">首页</a> &gt; <span>学炒股</span></div>
            <div id="learnStock" class="clear">
                <div class="container frame-shadow">
                    <div class="menu">
                        <a href="${xuechaogu_path}xcg/" class="item xcg" data-type="xcg">全部</a>
                        <a href="${xuechaogu_path}mjzf/" class="item" data-classify="0" data-type="mjzf">名家战法</a>
                        <a href="${xuechaogu_path}wufz/" class="item" data-classify="1" data-type="wufz">5分钟学炒股</a>
                        <a href="${xuechaogu_path}tzxl/" class="item" data-classify="2" data-type="tzxl">投资心理</a>
                    </div>
                    <div class="newsList">
                        <c:forEach items="${learnstockList}" var="list" varStatus="size">
                            <div class="list">
                                <div class="title"><a href="${xuechaogu_path}learning/${list.id}" target="_blank">${list.title}</a></div>
                                <div class="content">${list.shortContent}</div>
                                <div class="msg">	                          
	                          <span class="keywords"> 
	                          	<c:if test="${list.ltype == 0}">
                            		名家战法
                        		</c:if>
                        		<c:if test="${list.ltype == 1}">
                            		五分钟学炒股
                        		</c:if>
                        		<c:if test="${list.ltype == 2}">
                            		投资心理
                        		</c:if>
                        		<c:if test="${list.ltype == 3}">
                            		股票百科
                        		</c:if>
                                </span>    
                                    <span class="time">${list.cTime}</span>
                                </div>
                            </div>
                        </c:forEach>
                        <c:if test="${empty learnstockList}">
                            <div class="listNone">暂无数据</div>
                        </c:if>
                    </div>

                </div>
                <div class="right clear">
                    <div class="right-top frame-shadow">
                        <div class="right-t">编辑推荐</div>
                        <div class="right-list">
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../v2/front-foot-v2.jsp" %>
                <script src="/public/js/template.js?695"></script>
                <script src="${path}/public/js/bootpag.js"></script>
                <script src="/public/v2/base/yntool.js?20170705"></script>
                <script src="/public/v2/news/learnStock.bundle.js?0127"></script>
    </body>

    </html>
