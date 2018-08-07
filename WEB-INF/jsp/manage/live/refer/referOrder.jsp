<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
            <meta charset="UTF-8">
            <title>Document</title>
            <link href="https://cdn.bootcss.com/element-ui/1.4.3/theme-default/index.css" rel="stylesheet">
            <style>
            body {
                font-family: "微软雅黑"
            }
            #referOrder{
                padding:10px;
            }
            .menu {
                display: inline-block;
                padding: 5px 10px;
                background: #ececec;
                border: 1px solid #999;
                cursor: pointer;
                color: black;
                border-radius:0;
            }
            
            .big {
                width: 100%;
                margin: 20px auto;
            }
            
            .orderList table {
                width: 100%;
                border-collapse: collapse;
                text-align: center;
            }
            
            .orderList table thead td {
                background: #BDDEF2;
            }
            
            .orderList table td {
                border: 1px solid #e6e6e6;
                padding: 10px;
            }
            
            .orderList table tr:nth-child(even) {
                background: #f3f3f3;
            }
            
            .option {
                display: inline-block;
                margin-right:10px;
            }
            .option input{
                margin-left:10px;
                height:30px;
                border-radius: 4px;
                padding-left:5px;
            }
            .option select {
                width: 130px;
                height: 30px;
                margin-bottom: 20px;
                border-radius: 4px;
                text-align: center;
                margin-left: 10px;
                font-size: 16px;
            }
            
            .query {
                display: inline-block;
                width: 80px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                background: #4ABFE3;
                color: #fff;
                border-radius: 4px;
                margin-left: 10px;
                cursor: pointer;
            }
            
            .addOrder {
                display: inline-block;
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: #D5690C;
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .addPhone {
                width: 350px;
                height: 200px;
                background: #fff;
                position: absolute;
                top: 35%;
                left: 50%;
                margin-left: -130px;
                box-shadow: 2px 2px 20px #B8B3B3;
                text-align: center;
            }
            
            .addPhone .addPhone-title {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #62B8EC;
                color: #fff;
            }
            
            .addPhone .input input {
                display: block;
                width: 75%;
                height: 35px;
                border-radius: 4px;
                text-align: center;
                line-height: 35px;
                margin: 20px auto;
                font-size: 15px;
            }
            
            .addBtn,
            .closeBtn {
                display: inline-block;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin: 10px;
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .addBtn {
                background: #62B8EC;
                color: #fff;
            }
            
            .closeBtn {
                color: #000;
                border: 1px solid #999;
            }
            
            .list-title {
                font-size: 20px;
                color: #000;
                margin-bottom: 12px;
            }
            .totalprice{
                display: inline-block;
                margin:0 10px;
            }
            .totalPrice{
                color:#EC6708;
                font-size:25px;
            }
            .none{
                padding:50px 0;
            }
            .none span i{
                margin-right:5px;
            }
            .export{
                background:#d72612;
            }
            .clean{
                background:#02905C;
            }
            </style>
    </head>

    <body>
        <div id="referOrder">
            <router-link to="/referOrderList">
                <span class="menu menu1" style="position:relative;top:2px;">订单列表</span>
            </router-link>
            <router-link to="/referOrderAdd">
                <span class="menu menu2 btn" menuCode='addReferOrderService'>新增订单</span>
            </router-link>
            <div class="big">
                <router-view></router-view>
            </div>
        </div>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
        <script src="https://cdn.bootcss.com/vue/2.4.2/vue.min.js"></script>
        <script src="https://cdn.bootcss.com/element-ui/1.4.3/index.js"></script>
        <script src="http://cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script>
        <script src="http://cdn.bootcss.com/vuex/2.2.1/vuex.min.js"></script>
        <script src="/public/bundle/referOrder.bundle.js?1230"></script>
    </body>

    </html>
