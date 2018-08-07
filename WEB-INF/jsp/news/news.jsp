<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
    <!-- 资讯列表页面 -->

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>${head.article.title}</title>
		<meta name="keywords" content="${head.article.keywords}"/>
		<meta name="description" content="${head.article.description}"/>
        <%@ include file="../common/front-common.jspf" %>
        <link href="/public/css/newslist.css" rel="stylesheet" />
    </head>

    <body>
        <%@ include file="../common/front-head.jsp" %>
            <div class="yn-container">
                <div id="newslist">
                    <div class="yn-left">
                        <div class="list">
                            <div class="title-1" id="title-top"></div>
                            <div class="items">
                                <c:forEach var="news" items="${article_list}">
                                    <div class="item">
                                        <div class="avatar inline">
                                            <img src="${path }${news.title_img}" width="100%" alt="${news.title}" />
                                        </div>
                                        <div class="info">
                                            <a href="${path }${news.link}" target="_blank" class="title">${news.title}</a>
                                            <a href="${path }${news.link}" target="_blank" class="subject inline">${news.content}</a>
                                            <div class="msg">
                                                <span class="author">约投顾</span>
                                                <span class="time">${news.create_time}</span>
                                                <span class="view">阅读<span class="count">${news.viewcount}</span></span>
                                                <span class="comment hide">评论<span class="count">${news.commentcount}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                    </div>
                    <div class="yn-right">
                        <div id="stockIndex"></div>
                        
                        <c:forEach var="news" items="${right_article_list}">
                            <div class="news-item-2 hide">
                                <div class="right-child">
                                    <div class="yn-title-1">
                                        <span class="yn-title-1-icon"></span>
                                        <span class="txt">
					           						 <c:if test="${news.key ==1 }">
					           						 热门资讯
						                            	<a class="inline more inline" href="/article/index_1_1.htm">
						                            	<span class="txt">更多</span>
                                        <i class="fa fa-angle-right fa-lg"></i>
                                        </a>
                                        </c:if>
                                        <c:if test="${news.key ==2 }">
                                        	    涨停揭秘
                                            <a class="inline more inline" href="/article/index_2_1.htm">
                                                <span class="txt">更多</span>
                                                <i class="fa fa-angle-right fa-lg"></i>
                                            </a>
                                        </c:if>
                                        <c:if test="${news.key ==3 }">
                                          	  宏观要闻
                                            <a class="inline more inline" href="/article/index_3_1.htm">
                                                <span class="txt">更多</span>
                                                <i class="fa fa-angle-right fa-lg"></i>
                                            </a>
                                        </c:if>
                                        <c:if test="${news.key ==4 }">
                                           	 个股资讯
                                            <a class="inline more inline" href="/article/index_4_1.htm">
                                                <span class="txt">更多</span>
                                                <i class="fa fa-angle-right fa-lg"></i>
                                            </a>
                                        </c:if>
                                        </span>
                                    </div>
                                    <div class="items">
                                        <c:forEach var="news_value" items="${news.value}">
                                            <a class="item" href="${path }${news_value.link}" target="_blank">
                                                <span class="yn-icon-circle"></span>
                                                <span class="name">${news_value.title}</span>
                                            </a>
                                        </c:forEach>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script>
                yn.navigation.name = ynconfig.navigation.e;
                var href = window.location.href,
                	match = href.match(/index_(\d+)_(\d+).htm/);
                	type = match ? match[1] : 1,
                    page = match ? match[2] : 1,
                	types = ["", "热门资讯", "涨停揭秘", "宏观要闻", "个股资讯"];

                $("#title-top").text(types[type])

                var tag = $('.time')
                console.log('.time', tag)
                for (var i = 0; i < tag.length; i++) {
                    var time = tag[i].innerHTML;
                    // console.log('time' + i, time)
                    time = time.substr(0, 10)
                    tag[i].innerHTML = time
                }

                $(function() {
	                var marketIndex = yn.MarketIndex();
	                marketIndex.render($("#stockIndex"), "column");
	                var bootpag = yn.bootpag('.list')
	                bootpag.on('page', function(err, n) {
	                		window.location.href = '/article/index_'+ type +'_'+ n +'.htm'
	                })
	                bootpag.bootpag({page: page,total: Math.ceil(${total}/10)})
              });
                </script>
    </body>

    </html>
