<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-liveing.css">
        <link rel="stylesheet" type="text/css" href="/public/css/m-live-common.css">
        <script type="text/javascript">
        var match_teacherId = window.location.href.match(/teacherid=(\d+)/)
        var __teacherId = match_teacherId ? match_teacherId[1] : null
        var pid='${pid}'
        </script>
</head>
<body>
    <%@ include file="../common/m-front-head.jsp" %>
    <%@ include file="../common/m-liveDetail-head.jsp" %>
    <div id="liveing_box" class="bt20">
    	<c:forEach items="${liveList }" var="live">
	    	<div class="live_list" data-id='${live.id}'>
	    		<span class='time'>${live.pubtimeString }</span>
	    		<div class="live_cont">
	    			${live.contentFilter == '' ? '[图片]' : live.contentFilter }
	    		</div>
	    	</div>
    	</c:forEach>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript" src="/public/bundle/m-live-common.bundle.js"></script>
    <script type="text/javascript" src="/public/bundle/m-liveing.bundle.js"></script>
</body>
</html>
