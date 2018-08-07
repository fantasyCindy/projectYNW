<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-opinion.css">
</head>
<body>
<%@ include file="../common/m-front-head.jsp" %>
    <%@ include file="../common/m-head.jsp" %>
    <div id="yn_opinion" class="wrap_box">
        <div id="new_opinion" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/new.png">最新观点</p>
            <c:forEach items="${newlist }" var="news">
	            <div class="wrap_list">
	                <a href="/mobile/m-opinionDetail.htm?id=${news.article_id}">
	                    <div class="wrap_title">
	                        <span class="icon">荐</span>
	                        	${news.title }
	                    </div>
	                    <div class="wrap_description">
	                    		${news.shortContent }
	                    </div>
	                    <div class="user clear">
	                        <span class="photo"><img alt="" src="${news.photo}"></span>
	                        ${news.createrName }
	                        <span class="day">
	                            ${news.create_timeStr }
	                        </span>
	                    </div>
	                </a>
	            </div>
            </c:forEach>
        </div>
        <div id="hot_opinion" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/hot.png">最热观点</p>
            <c:forEach items="${hotlist }" var="hot">
	            <div class="wrap_list">
	                <a href="/mobile/m-opinionDetail.htm?id=${hot.article_id}">
	                    <div class="wrap_title">
	                        <span class="icon">荐</span>
	                        	${hot.title }
	                    </div>
	                    <div class="wrap_description">
	                    		${hot.shortContent }
	                    </div>
	                    <div class="user clear">
	                        <span class="photo"><img alt="" src="${hot.photo}"></span>
	                        ${hot.createrName }
	                        <span class="day">
	                            ${hot.create_timeStr }
	                        </span>
	                    </div>
	                </a>
	            </div>
            </c:forEach>
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript">
        m.navigation.name=m_config.navigation.c;
    </script>
</body>
</html>