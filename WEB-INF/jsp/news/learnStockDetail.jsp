<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../v2/seo-v2.jspf" %>
        <title>
                ${learning_stocks.title}-今日股市行情走势分析-约投顾66
            </title>
            <meta name="keywords" content="${learning_stocks.title}-今日股市行情走势分析,约投顾" />
            <meta name="description" content="${fn:substring(learning_stocks.contentStr,0,120)},${learning_stocks.title}-今日股市行情走势分析，约投顾" />
        
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/v2/news/headlineDetail.css?v=20180301" />
                <script>
                var room_teacherid = "${learning_stocks.teacherid}";
                </script>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="headlineDetail">
                <div class="crumbs">当前位置 : <a href="http://www.yuetougu.com/" target="_blank">首页</a><i class="fa fa-angle-right margin5" aria-hidden="true"></i><a href="${xuechaogu_path}" target="_blank">学炒股</a><i class="fa fa-angle-right margin5" aria-hidden="true"></i><span class="light">${learning_stocks.title}</span></div>
                <div class="container">
                    <div class="left frame-shadow">
                        <div class="content">
                            <div class="left-t">${learning_stocks.title}</div>
                            <div class="left-msg">
                                <span class="name">${learning_stocks.author == null ? '约投顾':learning_stocks.author}</span>
                                <span class="time">${time}</span>
                                <span class="readCount">阅读（${learning_stocks.viewcount}）</span>
                            </div>
                            <div class="article">${learning_stocks.content}</div>
                        </div>
                    </div>
                    <div class="right frame-shadow clear">
                        <!-- 个人简介 -->
                        <div class="person-info">
                        </div>
                        <div class="right-t">编辑推荐</div>
                        <div class="right-list">
                        <c:if test="${empty recommend}">
                           <div class="none"><i class="fa fa-exclamation-circle" aria-hidden="true" style="margin-right:5px;"></i>暂无内容</div>
                          </c:if>
                          <c:forEach var="recommends" items="${recommend}" varStatus="status">
                          
                            <li class="right-item">
                                <a href="/learning/${recommends.id}.htm" target="_blank">
                                    <div class="related-t">${recommends.title}</div>
                                </a>
                            </li>
                            </c:forEach>
                           
                        </div>
                    </div>
                    <div class="clean"></div>
                </div>
            </div>
            <%@  include file="../common/moudule-ask.jsp" %>
            <%@include file="../v2/front-foot-v2.jsp" %>
            <script src="/public/js/template.js?695"></script>
            <script src="//cdn.bootcss.com/layer/3.0.1/layer.js"></script>
                <script src="/public/v2/base/yntool.js?20170705"></script>
                <script src="/public/v2/news/learnStockDetail.bundle.js?20180727"></script>
                <script>
                    window.onload = function() {
                        var imgs = document.getElementsByTagName('img')
                            for (var i = 0; i < imgs.length; i++) {
                                var img = imgs[i]
                                img.onclick = function() {
                                    passValue(this.src)
                                }
                            }
                        }

                        function passValue(src) {
                            console.log(src)
                        }
                </script>
    </body>

    </html>
