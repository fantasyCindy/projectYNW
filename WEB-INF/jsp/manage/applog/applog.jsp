<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>applog</title>
        <link rel="stylesheet" href="/public/css/font-awesome.min.css">
        <link rel="stylesheet" href="/public/css/all.css">
        <link rel="stylesheet" href="/public/css/manage_news.css">
        <style>
        #list .small {
            text-align: left;
        }
        
        #add-lay, #creat {
            width: 400px;
            height: 300px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 2px 2px 20px gray;
            position: fixed;
            top: 20%;
            left: 30%;
        }
        
        #add-lay .title,#creat .title  {
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #D0D0D0;
            font-size: 16px;
        }
        
        #add-lay .content, #creat .content {
            padding: 10px 30px;
        }
        
        #add-lay input, #creat input{
            width: 280px;
            height: 40px;
            margin-left: 8px;
            border-radius: 4px;
            margin: 10px auto;
            padding-left: 20px;
            border: 1px solid #ccc;
            font-size: 15px;
            display: inline-block;
        }
        
        .btn.save {
            display: block;
            margin: 20px auto;
            background: #0088CC;
            border: 0;
        }
        .btn.add{
            margin-left:30px;
        }
        </style>

        <body>
            <div class="title-1 flex">
                <span class="item select" data-type="list" style="border:none">APP统计编码管理</span>
                <span class="item hide" data-type="publish"></span>
                <span class="flex1"></span>
            </div>
            <div class="btn-wrap" style="padding:5px;">
                <button class="btn add">新增</button>
            </div>
            <!-- applog列表 -->
            <div id="list" class="content-child column">
                <div class="header flex">
                    <label></label>
                    <span class="title small">id</span>
                    <span class="small">名称</span>
                    <span class="small">编码</span>
                    <span class="small">上级名称</span>
                    <span class="small">结构id</span>
                    <span class="small">等级</span>
                    <span class="small">操作</span>
                </div>
                <div class="items flex column"></div>
            </div>
            <div id="add-lay" class="hide">
                <div class="title">新增<i class="fa fa-times close" aria-hidden="true" style="float:right;margin-right:10px;font-size:16px;cursor: pointer"></i></div>
                <div class="content">
                    <div class="name">
                        <label for="">名称</label>
                        <input class="input inputName" type="text">
                    </div>
                    <div class="code">
                        <label for="">编码</label>
                        <input class="input inputCode" type="text">
                    </div>
                    <div class="level">
                        <label for="">等级</label>
                        <input type="text" class="inputLevel" value="" disabled="disabled">
                    </div>
                    <button class="btn save">保存</button>
                </div>
            </div>
          <!--   <div id="creat" class="hide">
                <div class="title">增加标签<i class="fa fa-times close" aria-hidden="true" style="float:right;margin-right:10px;font-size:16px;cursor: pointer"></i></div>
                <div class="content">
                    <div class="name">
                        <label for="">名称</label>
                        <input class="input inputName" type="text">
                    </div>
                    <div class="code">
                        <label for="">编码</label>
                        <input class="input inputCode" type="text">
                    </div>
                    <div class="level">
                        <label for="">等级</label>
                        <input type="text" class="inputLevel" value="1" disabled="disabled">
                    </div>
                    <button class="btn save">保存</button>
                </div>
            </div> -->
            <script src="/public/js/jquery.js"></script>
            <script src="/public/js/cropper.min.js"></script>
            <script src="/public/js/layer/layer.js"></script>
            <script src="/public/js/lodash.js"></script>
            <script src="/public/js/bootpag.js"></script>
            <!--    <script src="/public/ueditor/ueditor.config.js"></script>
            <script src="/public/ueditor/ueditor.all.min.js"></script> -->
            <!-- <script src="/public/ueditor/lang/zh-cn/zh-cn.js"></script> -->
            <script src="/public/bundle/applog.bundle.js"></script>
        </body>

        </html>
