<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约投顾 | 消息中心</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link href="/public/css/message.css?03291" rel="stylesheet">
    </head>

    <body>
        <!-- 引入头部 -->

        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="messeage">
                <div class="messeage-wrap b220">
                    <div class="yn-title-1">
                        <span class="yn-title-1-icon"></span>
                        <span class="txt">消息中心</span>
                    </div>
                    <div class="messeage-body">
                        <div class="body-menu">
                            <div data-type="system" class="menu-item select">系统消息<span class="uncount unsys"></span><i class="fa fa-angle-right"></i></div>
                            <div data-type="askStock" class="menu-item">问股消息<span class="uncount unask"></span><i class="fa fa-angle-right"></i></div>
                            <div data-type="refer" class="menu-item">内参消息<span class="uncount unrefer"></span><i class="fa fa-angle-right"></i></div>
                            <div data-type="live" class="menu-item">直播消息<span class="uncount unlive"></span><i class="fa fa-angle-right"></i></div>
                        </div>
                        <div class="body-content">
                            <div class="body-items"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 投顾动态 -->
            <script id="news-template" type="text/html">
                {{each}}
                <div class="body-item">
                    <div class="line title">
                        <span class="avatar">
                            <img src="{{$value._photo}}" width="100%"/>
                        </span>
                        <a class="name">{{$value._name}}</a>
                        <span class="type type{{$value.tmessagetype}}">{{$value._type}}</span>
                        <span class="time">{{$value._time}}</span>
                    </div>
                    <div class="line line2">
                    <a href="{{$value._link}}" target="_blank">{{$value._content}}</a>
                    </div>
                </div>
                {{/each}}
            </script>
            <!-- 系统消息 -->
            <script id="system-template" type="text/html">
                {{each}}
                <div class="system-item  message-item {{$value._style}}">
                    <div class="title">
                        来自<span class="name">{{$value.sendusername}}</span>的{{$value.messagetitle}}</span>
                        <span class="time">{{$value.createtime}}</span>
                    </div>
                    <a href="{{$value._link}}" target="_blank" class="content">{{$value.messagecontent}}</a>
                </div>
                {{/each}}
            </script>
            <%@ include file="../common/front-foot.jsp" %>
                <script src="/public/source/ynmodule.min.js"></script>
                <script src="/public/source/message.js?20171103"></script>
    </body>

    </html>
