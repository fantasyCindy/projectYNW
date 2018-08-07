<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-opinionDetail.css">
</head>
<body>
<%@ include file="../common/m-front-head.jsp" %>
    <div id="risePanel" class="wrap_box">
        <div class="wrap_list">
            <a href="">
                <div class="wrap_title">
                    <span></span>
                    ${opinion.title }
                </div>
                <div class="intro clear">
                    <span class="photo"><img alt="" src="${photo }"> </span>
                    <span class="userName">${opinion.createrName }</span>|
                    <span class="time">${opinion.create_timeStr }</span>
                    <span class="read">阅读：${opinion.viewnumber }</span>
                </div>
            </a>
        </div>
    </div>
    <div id="m_newDetail">
        <div class="content">
            ${opinion.content }
        </div>
        <div class="attention">
            风险提示：以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎。
        </div>
    </div>
    <p class="statement">以上言论仅代表个人观点</p>
    <%@ include file="../common/m-front-footer.jsp" %>
</body>
</html>
