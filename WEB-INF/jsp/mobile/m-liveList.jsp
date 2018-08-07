<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-liveList.css">
</head>
<body>
    <%@ include file="../common/m-front-head.jsp" %>
    <div id="tag" class="bt20">
        <span class="item" data-type="1">人气最高</span>
        <span class="item" data-type="2">观点最多</span>
        <span class="item" data-type="3">互动最多</span>
    </div>
    <div class="wrap_box">
        <div id="liveList" class="bt20">
            
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript" src="/public/bundle/m-liveList.bundle.js"></script>
</body>
</html>
