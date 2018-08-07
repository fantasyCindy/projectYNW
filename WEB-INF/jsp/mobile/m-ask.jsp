<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-ask.css">
</head>
<body>
<%@ include file="../common/m-front-head.jsp" %>
    <%@ include file="../common/m-head.jsp" %>
    <div id="yn_ask" class="wrap_box">
        <p class="headline bt20"><img src="/public/images/yn-h5/ask.png">我的问答<span class="more">立即查看</a></span>
        <div id="new_ask" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/new.png">最新问答</p>
	            <c:forEach items="${newslist}" var="news">
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
		                    <div class="user clear">
		                        <span class="photo"><img alt="" src="${news.photo }"></span>
		                        	${news.teachertitle}
		                        <span class="time">
		                            ${news.answertimeStr}
		                        </span>
		                    </div>
		                </a>
		            </div>
            	</c:forEach>
        </div>
        <div id="hot_ask" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/ques.png">精彩问答</p>
           <c:forEach items="${bestlist}" var="best">
		            <div class="wrap_list">
		                <a href="/mobile/m-askInfo.htm?noteid=${best.noteid}">
		                    <div class="quesition_list">
		                        <span class="ques_icon">问</span>
		                        	${best.questioncontent}
		                    </div>
		                    <div class="ask_list">
		                        <span class="ask_icon">答</span>
		                       		${best.answercontentStr}
		                    </div>
		                    <div class="user clear">
		                        <span class="photo"><img alt="" src="${best.photo }"></span>
		                        	${best.teachertitle}
		                        <span class="time">
		                            ${best.answertimeStr}
		                        </span>
		                    </div>
		                </a>
		            </div>
            	</c:forEach>
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript">
        m.navigation.name=m_config.navigation.a;
        $(function(){
            $('.more').on('click',function(){
            	m.alert.show();
            })
        })
    </script>
</body>
</html>