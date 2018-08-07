<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
        <%@ include file="../common/m-common.jspf" %>
            <script src="/public/js/lodash.js"></script>
            <script src="http://cdn.bootcss.com/jquery/1.10.1/jquery.min.js"></script>
            <link rel="stylesheet" type="text/css" href="/public/css/m-askDetail.css">
    </head>

    <body>
        <%@ include file="../common/m-front-head.jsp" %>
        <div id="tag" class="detail_navigation">
            <span class="item active tab" data-type='ranking'>解答排行</span>
            <span class="item tab" data-type='hot'>热问股票</span>
            <span class="item rising-type" data-id='0'>牛人看涨</span>
            <span class="item rising-type" data-id='1'>牛人看跌</span>
        </div>
        <div id="yn_askDetail" class="wrap_box">
            <div class="detail_container">
                <!-- 解答排行 -->
                <div class="answer"></div>               
                <!-- 热问股票 -->
                <div class="hotStock"></div>               
                <!-- 牛人看涨 -->
                <div class="up"></div>               
                <!-- 牛人看跌 -->
                <!-- <div class="down"></div> -->
            </div>
        </div>
        <%@ include file="../common/m-front-footer.jsp" %>
        <script src="/public/source/yncommon.js"></script>
        <script src="/public/bundle/m-askDetail.bundle.js?01274"></script>
    </body>

    </html>
