<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <title>牛人观点</title>
        <%@ include file="../common/m-common.jspf" %>
        <link rel="stylesheet" type="text/css" href="/public/css/m-opinionList.css">
        <script type="text/javascript">
        var total='${total}';
        </script>
</head>
<body>
<%@ include file="../common/m-front-head.jsp" %>
    <div id="tag">
        <div class="op-list-title">
            <a class="item op-list-list" href="/mobile/m-opinionList.htm?type=0&pageSize=10&currentPage=1">大盘</a>
            <a class="item op-list-list" href="/mobile/m-opinionList.htm?type=1&pageSize=10&currentPage=1">题材</a>
        </div>
    </div>
    <div id="m-opinionList">
    	<!-- 列表 -->
    	<div class="op-list-content">
            <c:forEach items="${opinionList }" var="opinion">
	            <div class="op-list-item">
	                <a href="/mobile/m-opinionDetail.htm?id=${opinion.article_id}">
	                    <div class="op-title-1">
	                        <span class="icon"></span>
	                        ${opinion.title }
	                    </div>
	                    <p class="op-list-con">${opinion.shortContent}</p>
	                    <div class="op-list-foot">
	                        <span class="photo"><img alt="" src="${opinion.photo }"></span>
	                        <span>${opinion.createrName }</span>
	                        |
	                        <span>${opinion.viewnumber}次订阅</span>
	                        <span class="fr time">${opinion.create_timeStr }</span>
	                    </div>
	                </a>
	            </div>
            </c:forEach> 
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script src="/public/bundle/m_opinionList.bundle.js"></script>
    <script type="text/javascript">
        $(function(){
            var getUrlParam = function(name){
                var reg= new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
                var r= window.location.search.substr(1).match(reg);
                if (r!=null) return unescape(r[2]); return null;
            }
            $('#tag .item').eq(getUrlParam('type')).addClass('cur')
        })
    </script>
</body>
</html>
