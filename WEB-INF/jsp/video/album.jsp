<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/all.jspf" %>
            <link href="/private/video/css/album.css" rel="stylesheet" />
            <script type="text/javascript">
            var album_id=${album.album_id};
            </script>
    </head>
    <%@include file="../common/head.jsp" %>
        <div id="album" class="shadow">
            <div class="title-1">专辑详情</div>
            <div class="info">
                <div class="imgw inline">
                    <img src="${album.img}" />
                </div>
                <div class="inline infow">
                    <div class="title">${album.title}</div>
                    <div class="note">专辑介绍：${album.note}</div>
                    <div class="view">人气指数：${videoCount}</div>
                </div>
            </div>
            <div class="items"></div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////// -->
        <script id="video-template" type="text/html">
            {{each}}
            <a class="item" href="/video/detail.htm?videoId={{$value.video_id}}">
                <div class="imgw">
                    <img src="{{$value.image}}">
                    <span class="type">{{$value.typeName}}</span>
                </div>
                <p class="title">{{$value.title}}</p>
                <p class="teacher">讲师：{{$value.teacherName}}</p>
                <p class="count">{{$value.look_count}}人正在学习</p>
            </a>
            {{/each}}
        </script>
        <%@include file="../common/foot.jsp" %>
            <script src="/public/bundle/special_detail.bundle.js"></script>
            </body>

    </html>
