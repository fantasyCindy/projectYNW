<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>VIP操盘内线 | 约投顾</title>
            <%@ include file="../common/front-common.jspf" %>
                <link rel="stylesheet" href="/private/live/css/liveDetail.css?v=20170511154436" />
                <link rel="stylesheet" href="/private/live/css/liveVip.css?v=20170511154433" />
                <style>
                .reply {
                    width: 1200px;
                    margin: 15px auto;
                }
                
                .reply .list {
                    width: 1200px;
                }
                
                .live-item-2 {
                    background: #fff;
                    margin-bottom: 15px;
                }
                
                .live-item-2 .content {
                    width: 1000px; 
                }
                .title{
                	width:1200px;
					margin:10px auto;
					font-size:18px;
                }
                </style>
    </head>

    <body>
        <%@ include file="../common/front-head.jsp" %>
            <div id="operate" class="banner">
                <div class="renew">
                    <div class="box">
                    </div>
                </div>
            </div>
            <div class="title">操盘内线回复列表</div>
            <div class="reply">
            </div>
            <div class="page"></div>
            <%@ include file="../common/front-foot.jsp" %>
                <script src="/public/bundle/vip-teacher-reply.bundle.js"></script>
    </body>

    </html>
