<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title></title>
        <%@ include file="../common/vue.jspf" %>
            <link rel="stylesheet" href="/public/v2/base/base.css?20180206">
            <link rel="stylesheet" href="${path}/manage/pages/financeOrder/financeOrder.css?0322">
            <style>
            .query-result{
                padding-bottom:20px;
            }
            .up {
                display: inline-block;
                width: 32px;
                height: 32px;
                background: url('/manage/pages/teacherList/images/arrow_up.png');
                cursor: pointer;
                margin:10px;
            }
            .down{
                display: inline-block;
                width: 32px;
                height: 32px;
                background: url('/manage/pages/teacherList/images/arrow_down.png');
                cursor: pointer;
                margin:10px;
            }
            .top {
                display: inline-block;
                width: 32px;
                height: 32px;
                cursor: pointer;
                background: url('/manage/pages/teacherList/images/up.png');
                margin:10px;
            }
            td{
                text-align:center;
            }
            td.photo{
                width:50px;
                padding:10px;
                line-height:0;
            }
            img{
                width:100%;
            }
            table tr.select{
                background: #e0eefd;
            }
            [v-cloak]{
                display:none;
            }
            </style>
    </head>

    <body>
        <div id="app">
            <!-- list -->
            <div class="query-result">
                <table>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>头像</td>
                            <td>称号</td>
                            <td>姓名</td>
                            <td>昵称</td>
                            <td>关联用户</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list">
                            <td>{{index+1}}</td>
                            <td class="photo"><img :src="item.photo_path" alt=""></td>
                            <td>{{item.type_name}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.nickname}}</td>
                            <td>{{item.username}}</td>
                            <td>
                                <span class="up" @click="up(item,index)"></span>
                                <span class="down" @click="down(item,index)"></span>
                                <span class="top" @click="top(item)"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
        <script src="${path}/manage/pages/teacherList/mmm.teacherList.js?0612444"></script>
    </body>

    </html>
