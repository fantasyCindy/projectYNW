<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-refer.css">
</head>
<body>
    <%@ include file="../common/m-head.jsp" %>
    <div id="yn_refer" class="wrap_box">
        <p class="headline bt20"><img src="/public/images/yn-h5/hot.png">热门内参</p>
        <p class="headline bt20"><img src="/public/images/yn-h5/new.png">最新内参</p>
    </div>
    <script type="text/javascript">
        $(function(){
            m.navigation=m_config.navigation.d;
        })
    </script>
</body>
</html>