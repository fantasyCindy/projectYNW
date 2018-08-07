<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约牛，让股民与牛人相约</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <style>
            	#map{
            		width:1200px;
            		margin:0 auto;
            	}
            	.lead{
            		color:#999;
                    margin-top:20px;
            	}
            	.container{
            		width:1200px;
            		margin:0 auto;
            		border:1px solid #DCDCDC;
            		margin:15px auto;
            		background:#fff;
            		padding-bottom:30px;
            	}
            	.top{
            		padding: 12px 45px;
    				font-size: 17px;
            		border-bottom:1px solid #DCDCDC;
            		background:url(/public/images/location.png) no-repeat;
            		background-position: 20px 15px;
            		font-weight: bold;
            		font-size:20px;
            	}
                #map .first{
                    color:#999;
                }
            	.content .title{
            		font-weight: bold;
            		font-size:18px;
            	}
          		.content{
          			padding:20px 45px;
          			line-height: 25px;
          		}
            	.content a{
            		display: inline-block;
					color:#2FA9E1;
					margin-right:20px;
					margin-top:10px;
            	}
            	.content .item{
            		margin-bottom: 40px;
            	}
            </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="map">
            	<div class="lead"><a target="_blank" href="http://www.yuetougu.com"target="_blank" class="first">首页</a> <i class="fa fa-angle-right"></i> 网站地图</div>
            	<div class="container">
            		<div class="top">网站地图</div>
            		<div class="content">
	            		<div class="item">
	            			<div class="title">问股</div>
	            			<a target="_blank" href="http://ask.yuetougu.com/new/all/">在线老师</a>
	            			<a target="_blank" href="http://ask.yuetougu.com/best/all/">热问股票</a>
	            			<a target="_blank" href="http://ask.yuetougu.com/new/all/">最新回答</a>
	            			<a target="_blank" href="http://ask.yuetougu.com/best/all/">精彩回答</a>
	            		</div>
	            		<div class="item">
	            			<div class="title">直播</div>
	            			<a target="_blank" href="http://live.yuetougu.com/">直播动态</a>
	            			<a target="_blank" href="http://live.yuetougu.com/">直播大厅</a>
	            			<a target="_blank" href="http://live.yuetougu.com/">推荐直播</a>
	            			<a target="_blank" href="http://live.yuetougu.com/">新晋直播</a>
	            		</div>
	            		<div class="item">
	            			<div class="title">观点</div>
	            			<a target="_blank" href="http://opinion.yuetougu.com/">大盘</a>
	            			<a target="_blank" href="http://opinion.yuetougu.com/">题材</a>
	            			<a target="_blank" href="http://opinion.yuetougu.com/">股票学院</a>
	            		</div>
	            		<div class="item">
	            			<div class="title">视频</div>
	            			<a target="_blank" href="http://video.yuetougu.com/">视频</a>
	            		</div>
	            		<div class="item">
	            			<div class="title">资讯</div>
	            			<a target="_blank" href="http://news.yuetougu.com/">热门资讯</a>
	            			<a target="_blank" href="http://news.yuetougu.com/">涨停揭秘</a>
	            			<a target="_blank" href="http://news.yuetougu.com/">宏观要闻</a>
	            			<a target="_blank" href="http://news.yuetougu.com/">个股资讯</a>
	            		</div>
	            		<div class="item">
	            			<div class="title">操盘内线</div>
	            			<a target="_blank" href="http://cp.yueniucj.com/">操盘内线</a>
	            		</div>
            			
            		</div>
            	</div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
    </body>
   

    </html>
