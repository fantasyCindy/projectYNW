<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>问题详情</title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-askInfo.css">
</head>
<body>
 <%@ include file="../common/m-front-head.jsp" %>
    <div id="m-askInfo">
        <div class="question">
            <p class="f15">${note.questioncontent }</p>
            <span class="cb4 f12">${note.questiontime }</span>
            <span class="cb4 f12">${note_answer_count }人回答</span>
        </div>
        <div class="m-ask-list">
            <span class="m-asklist"><i class="icon"></i>邀请回答</span><span class="m-asklist"><i class="icon icon1"></i>关注</span>
        </div>
        <div class="m-ask-item">
        	<c:forEach items="${note_answer }" var="answer">
	            <div class="photo fl"><img src="${answer.photo }" alt=""></div>
	            <div class="m-ask-items">
	                <span class="m-ask-title">${answer.answerusername}</span>
	                <span class="time fr cb4">${answer.answertime}</span>
	                <div class="quest">${answer.answercontent}</div>
	                <div class="zan"><span class="adopt">采纳</span><span class="zan_count"><i class="icon icon2"></i>(${answer.zancount})</span></div>
	            </div>
            </c:forEach>
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript">
        $('#m-askInfo').on('click','.m-ask-list .m-asklist,.zan',function(){
            m.alert.show();
        })
    </script>
</body>
</html>