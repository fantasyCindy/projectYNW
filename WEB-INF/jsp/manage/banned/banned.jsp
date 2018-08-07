<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>applog</title>
        <link rel="stylesheet" href="/public/css/font-awesome.min.css">
        <link rel="stylesheet" href="/public/css/all.css">
        <!-- <link rel="stylesheet" href="/public/css/manage_news.css"> -->
        <style>
         body{
            background:#fff;
         }
         .title-1 .item{
            display: block;
            font-size:16px;
            padding:10px 30px;
            border-bottom: 1px solid #DCDCDC;
            margin-bottom:10px;
         }
         .btn-wrap span{
            display: inline-block;
            width:200px;
         }
         .btn-wrap .btnTime,.btn-wrap .btnTimes{
                background:#434546;
                border: none;
                margin-right:10px;
         }
         .btn-wrap span label{
            margin-left:20px;
         }
         .btn-wrap span input{
            width:230px;
            height:40px;
            border:1px solid #ccc;
            border-radius: 4px;
            padding-left:10px;
         }
         .btn-wrap span select{
            width: 100px;
            margin-left:30px;
         }
         .btn-wrap .phone{
            width:310px;
         }
         #list span.small{
            display: inline-block;
            width:12%;
            font-size:14px;
         }
         #list{
            padding:20px 50px;
         }
         #list .header{
            border-bottom:1px solid #DCDCDC;
            padding-bottom:20px;
         }
         .list{
            padding:10px 0;
         }
         .btn.select{
            background:#d72621;
         }
         
        </style>

        <body>
            <div class="title-1 flex">
                <span class="item select" data-type="list" style="border:none">禁言管理</span>
            </div>
            <div class="btn-wrap" style="padding:5px;">
                <span class="title">
                        <select name="" class="querySelect">
                            <option value="">全部</option>
                            <option value="1">已申诉</option>
                            <option value="0">未申诉</option>
                        </select>
                    </span>
                <button class="btn btnTime up" data-order='0'>按时间(正序)</button>
                <button class="btn btnTime down" data-order='0'>按时间(倒序)</button>
                <button class="btn btnTimes up" data-times='2'>按申诉次数(正序)</button>
                <button class="btn btnTimes down" data-times='2'>按申诉次数(倒序)</button>
                <span class="phone">
                       <label for="">手机号</label> <input type="text" class="queryPhone">
                    </span>
                <button class="btn query">查询</button>
            </div>
            <!-- applog列表 -->
            <div id="list" class="content-child column">
                <div class="header flex">
                    <span class="small">id</span>
                    <span class="small">禁言用户</span>
                    <span class="small">老师</span>
                    <span class="small">禁言类型</span>
                    <span class="small">禁言时间</span>
                    <span class="small">是否申诉</span>
                    <span class="small">申诉次数</span>
                    <span class="small">是否解禁</span>
                </div>
                <div class="items flex column"></div>
                <div class="page"></div>
            </div>
            <script src="/public/js/jquery.js"></script>
            <script src="/public/js/cropper.min.js"></script>
            <script src="/public/js/layer/layer.js"></script>
            <script src="/public/js/lodash.js"></script>
            <script src="/public/js/bootpag.js"></script>
            <script src="/public/bundle/banned.bundle.js?122"></script>
        </body>

        </html>
