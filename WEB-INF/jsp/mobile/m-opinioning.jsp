<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-live-common.css">
        <link rel="stylesheet" type="text/css" href="/public/css/m-opinioning.css">
        <script type="text/javascript">
        var match_teacherId = window.location.href.match(/teacherid=(\d+)/)
        var __teacherId = match_teacherId ? match_teacherId[1] : null
        </script>
</head>
<body>
<%@ include file="../common/m-front-head.jsp" %>
    <%@ include file="../common/m-liveDetail-head.jsp" %>
    <div id="opinioning_box" class="bt20">
    	 <c:forEach items="${newlist }" var="news">
	            <div class="wrap_list">
	                <a href="/mobile/m-opinionList.htm?id=${news.article_id}">
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
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript" src="/public/bundle/m-live-common.bundle.js"></script>
    <script type="text/javascript">
    	$(function(){
			$('#reward').on('click','span',function(){
				m.alert.show();
			})
    	})
	</script>
</body>
</html>
