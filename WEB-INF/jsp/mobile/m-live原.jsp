<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>

        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-live.css">
</head>
<body>
    <%@ include file="../common/m-front-head.jsp" %>
    <%@ include file="../common/m-head.jsp" %>
    <div id="yn_live" class="wrap_box">
        <div id="new_live" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/liveing.png">直播动态</p>
	            <c:forEach items="${blist}" var="b">
		            <div class="wrap_list">
		                <a href="/mobile/m-liveing.htm?teacherid=${b.teacherid}">
		                    <div class="wrap_title">
		                        ${b.shortContent}
		                    </div>
		                    <div class="intro clear">
		                        <span class="photo"><img alt="" src="${b.teacherPhoto }"></span>
		                        <span class="userName">${b.roomTitle}</span>|
		                        <span class="quantity">${b.popularity }</span>人参与
		                        <span class="time">${b.pubtimeString }</span>
		                    </div>
		                </a>
		            </div>
	            </c:forEach>
        </div>
        <div id="recommend" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/live.png">推荐直播</p>
            <c:forEach items="${rlist}" var="room">
	            <div class="wrap_list clear">
	                <a href="/mobile/m-liveing.htm?teacherid=${room.teacherid}">
	                    <div class="wrap_cont clear">
	                        <div class="photo"><img alt="" src="${room.photo }"> </div>
	                        <div class="wrap_intro">
	                            <div class="wrap_title">
	                            ${room.title }                           
	                            </div>
	                            <div class="intro">
	                            ${room.content }
	                            </div>
	                        </div>
	                    </div>
	                    <div class="quantity">
	                        <p>${room.popularity }</p>
	                        人参与
	                    </div>
	                </a>
	            </div>
            </c:forEach>
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript">
	    m.navigation.name=m_config.navigation.b;
	</script>
</body>
</html>
