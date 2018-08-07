<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-live-common.css">
        <link rel="stylesheet" type="text/css" href="/public/css/m-asking.css">
        <script type="text/javascript">
        var match_teacherId = window.location.href.match(/teacherid=(\d+)/)
        var __teacherId = match_teacherId ? match_teacherId[1] : null
        </script>
</head>
<body>
<%@ include file="../common/m-front-head.jsp" %>
    <%@ include file="../common/m-liveDetail-head.jsp" %>
    <div id="asking_box" class="bt20">
    		<c:forEach items="${newlist}" var="news">
		            <div class="wrap_list">
		                <a href="/mobile/m-askInfo.htm?noteid=${news.noteid}">
		                    <div class="quesition_list">
		                        <span class="ques_icon">问</span>
		                        	${news.questioncontent}
		                    </div>
		                    <div class="ask_list">
		                        <span class="ask_icon">答</span>
		                       		${news.answercontentStr}
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
