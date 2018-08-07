<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>企业账户</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/help/css/help.css?0329">
                <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
                <style>
                .li8 {
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
                            <a href="">帮助中心</a>                           
                            <i class="fa fa-angle-right"></i>
                            <a>企业账户</a>
                        </div>
                        <div id="helpWrap">
                            <div id="help" class="yn-wrap">
                                <%@include file="../help/help-common.jsp" %>
                                    <div class="help-right fr">
                                        <!-- 帮助中心 -->
                                        <div class="contentItem" id="help-center">
                                            <h1 class="title"><p class="tc">企业账户<br/><font>Enterprise account</font></p></h1>
                                            <div class="account1">
                                                <img src="/private/help/images/bian.png" alt="">
                                                <div class="bank"><img src="/private/help/images/bank2.png" alt=""></div>
                                                <div class="txt">
                                                    <p>户名：云南产业投资管理有限公司</p>
                                                    <p>开户行：中国农业银行股份有限公司昆明护国支行</p>
                                                    <p>银行账号：<span style="color:red;display:inline;font-size:22px">2401 9501 0400 34924</span></p>
                                                </div>
                                            </div>
                                            <div class="account1">
                                                <img src="/private/help/images/bian.png" alt="">
                                                <div class="bank"><img src="/private/help/images/bank.png" alt=""></div>
                                                <div class="txt">
                                                    <p>户名：云南产业投资管理有限公司</p>
                                                    <p>开户行：中国建设银行股份有限公司昆明滇龙支行</p>
                                                    <p>银行账号：<span style="color:red;display:inline;font-size:22px">5305 0161 5537 0000 0130</span></p>
                                                </div>
                                            </div>
                                            <div class="account1">
                                                <img src="/private/help/images/bian.png" alt="">
                                                <div class="bank"><img src="/private/help/images/bank3.png" alt=""></div>
                                                <div class="txt">
                                                    <p>户名：云南产业投资管理有限公司</p>
                                                    <p>开户行：中国工商银行股份有限公司昆明城市开发支行</p>
                                                    <p>银行账号：<span style="color:red;display:inline;font-size:22px">2502 0215 1920 0032 245</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <!-- footer -->
                        <%@include file="../common/front-foot.jsp" %>
                </body>

    </html>
