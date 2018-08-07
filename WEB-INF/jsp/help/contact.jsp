<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>联系我们</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/help/css/help.css?04232">
            <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
            <style>
            .li7 {
                background: #D6D6D6;
                border-top: 1px solid rgb(235, 235, 235);
                border-bottom: 1px solid rgb(235, 235, 235);
                border-left: 2px solid #d72621;
                color: #000;
            }
            </style>
            <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                    <div id="navg">
                        <a href="/index.htm">首页</a>
                        <i class="fa fa-angle-right"></i>
                        <a href="#">帮助中心</a>
                        <i class="fa fa-angle-right"></i>
                        <a>联系我们</a>
                    </div>
                    <div id="helpWrap">
                        <div id="help" class="yn-wrap">
                            <%@include file="../help/help-common.jsp" %>
                                <div class="help-right fr">
                                    <!-- 联系我们 -->
                                    <div class="contentItem" id="contact">
                                        <h1 class="title"><p class="tc">联系我们<br/><font>Contact us</font></p></h1>
                                        <h2><center>云南产业投资管理有限公司</center></h2>
                                        <div class="list">
                                            <ul>
                                                <li class="list_one"></li>
                                             
                                            </ul>
                                            <div class="list_text">
                                                <span>400-0000-577</span>
                                          
                                            </div>
                                            <div id="allmap"></div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- footer -->
                    <%@include file="../common/front-foot.jsp" %>
                        <script type="text/javascript" src="/private/help/js/help.js"></script>
            </body>

    </html>
