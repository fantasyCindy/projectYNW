<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>约牛支付</title>
            <%@ include file="../common/front-common.jspf" %>
                <%@ include file="../common/session-info.jsp" %>
                    <link rel="stylesheet" href="/public/css/pay-refer.css">
                    <style>
                    /*==================footer====================*/
                    
                    #footer {
                        border-top: 1px solid #dddddd;
                        min-width: 1200px;
                        margin-top: 10px;
                        background: #f8f8f8;
                        padding: 30px 0 0;
                    }
                    
                    #footer .footer_top {
                        padding-bottom: 45px;
                        position: relative;
                    }
                    
                    #footer .footer_logo {
                        width: 250px;
                        color: #666666;
                        font-size: 12px;
                        line-height: 21px;
                    }
                    
                    #footer .footer_logo img {
                        margin-bottom: 5px;
                    }
                    
                    #footer .footer_nav {
                        width: 600px;
                        position: absolute;
                        left: 50%;
                        margin-left: -300px;
                    }
                    
                    #footer .footer_nav dl {
                        width: 20%;
                        float: left;
                        line-height: 25px;
                    }
                    
                    #footer .footer_nav dt a {
                        font-size: 16px;
                        color: #333333;
                    }
                    
                    #footer .footer_nav dd a {
                        font-size: 12px;
                        color: #666666;
                    }
                    
                    #footer .footer_phone dl {
                        margin-bottom: 5px;
                        line-height: 22px;
                        color: #333333;
                    }
                    
                    #footer .footer_phone dt a {
                        font-size: 16px;
                        color: #333333;
                    }
                    
                    #footer .footer_phone dd a {
                        font-size: 12px;
                        color: #666666;
                    }
                    
                    #footer .img_list {
                        border-top: 1px solid #e4e4e4;
                        padding: 15px 0;
                        background-color: #f5f5f5;
                    }
                    
                    #footer .img_list img {
                        border-radius: 3px;
                        margin: 0 15px;
                    }
                    
                    #footer .footer_about {
                        background: #333333;
                        line-height: 40px;
                    }
                    
                    #footer .footer_about a {
                        font-size: 12px;
                        color: #fff;
                        border-right: 1px solid #fff;
                        padding-right: 10px;
                        padding-left: 5px;
                    }
                    
                    #footer .footer_about a:last-child {
                        border: none;
                        padding-right: 0;
                    }
                    
                    .navwrap {
                        position: relative;
                        width: 1200px;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    
                    #hint {
                        padding: 15px 0;
                        line-height: 30px;
                        background: white;
                        font-size: 14px;
                        color: #666666;
                    }
                    
                    #hint a {
                        color: #d70621;
                    }
                    
                    #hint span {
                        margin: 0 10px;
                    }
                    /*========================nav======================*/
                    
                    #nav {
                        position: relative;
                        line-height: 50px;
                        background-color: #ff7e3a;
                    }
                    
                    #nav a {
                        position: relative;
                        display: inline-block;
                        color: #fff;
                        padding: 0 7px;
                        font-size: 16px;
                    }
                    
                    #nav a:hover {
                        background: #ffa060;
                    }
                    /*========================header=========================*/
                    
                    header {
                        background-color: #fff;
                        box-shadow: 0 2px 2px #f1d6d5;
                    }
                    
                    header img {
                        border: none;
                    }
                    
                    #head {
                        padding: 18px 0;
                    }
                    
                    #head .search {
                        margin: 9px 93px;
                        border: 1px solid #e4e4e4;
                    }
                    /*#head .search input{
    line-height:33px;
}*/
                    
                    #head .search input[type='submit'] {
                        width: 32px;
                        border: none;
                        background: #fff url(/public/icons/search.png) no-repeat center;
                        background-size: 80%;
                        line-height: 33px;
                    }
                    
                    #bdcsMain {
                        color: #999999;
                        font-size: 12px;
                        padding: 9px 13px;
                        width: 374px;
                        border: none;
                        border-right: 1px solid #e4e4e4;
                    }
                    
                    #head .yn-cion a {
                        display: inline-block;
                        width: 59px;
                        height: 59px;
                        font-size: 14px;
                        color: #666666;
                        text-align: center;
                        margin-left: 15px;
                        line-height: 103px;
                        background: url(http://www.yueniucj.com/public/icons/yn_01.png) no-repeat top;
                    }
                    
                    #head .yn-cion a:last-child {
                        background: url(http://www.yueniucj.com/public/icons/yn_03.png) no-repeat top;
                    }
                    
                    #specialNav {
                        text-align: center;
                        line-height: 45px;
                        font-size: 14px;
                        border-top: 1px solid #cccccc;
                    }
                    
                    #specialNav a {
                        display: inline-block;
                        width: 16%;
                        color: #d72621;
                        position: relative;
                    }
                    
                    #specialNav .icon:before {
                        content: '';
                        display: inline-block;
                        width: 26px;
                        height: 26px;
                        background: url(/public/icons/icon.png) no-repeat;
                        position: relative;
                        top: 10px;
                        left: -4px;
                    }
                    
                    #specialNav a:first-child .icon:before {
                        background-position: -30px 0px;
                    }
                    
                    #specialNav a:first-child+a .icon:before {
                        background-position: -107px 0px;
                    }
                    
                    #specialNav a:first-child+a+a .icon:before {
                        background-position: -185px 0px;
                    }
                    
                    #specialNav a:first-child+a+a+a .icon:before {
                        background-position: -264px 0px;
                    }
                    
                    #specialNav a:first-child+a+a+a+a .icon:before {
                        background-position: -341px 0px;
                    }
                    
                    #specialNav a:last-child .icon:before {
                        background-position: -419px 0px;
                    }
                    
                    #market {
                        border-top: 1px solid #eeeeee;
                        line-height: 32px;
                    }
                    
                    #market .mark {
                        background: #cccccc;
                        color: #333333;
                        padding: 0 7px;
                        width: 73px;
                        margin-right: 15px;
                        position: relative;
                    }
                    
                    #market .mark .icon {
                        color: #cccccc;
                        position: absolute;
                        top: 8px;
                        right: -6px;
                        font-size: 18px;
                    }
                    
                    #market .mar-container {
                        line-height: 32px;
                        overflow: hidden;
                    }
                    
                    #MarketIndex {
                        font-size: 13px;
                    }
                    
                    #MarketIndex td {
                        padding-right: 10px;
                    }
                    
                    #MarketIndex .red {
                        color: red;
                    }
                    
                    #MarketIndex .green {
                        color: green;
                    }
                    
                    #MarketIndex .marketIndex-item .name {
                        margin-right: 5px;
                        position: relative;
                        color: #333333;
                    }
                    
                    #MarketIndex .marketIndex-item.gray {
                        color: #c8c8c8 !important;
                    }
                    
                    #MarketIndex .marketIndex-item.gray .icon {
                        background-position: 0 center;
                    }
                    
                    #MarketIndex .marketIndex-item.red .icon {
                        background-position: 0 top;
                    }
                    
                    #MarketIndex .marketIndex-item.green .icon {
                        background-position: 0 bottom;
                    }
                    
                    .web-yueniucj .logocj {
                        display: block;
                        width: 400px;
                    }
                    
                    .web-yueniucj .logocj img {
                        width: 100%;
                    }
                    
                    .web-yueniucj .logoyn,
                    .web-yueniucj .site-sidebar-wrap {
                        display: none
                    }
                    
                    .web-yueniucj #footer {
                        display: block
                    }
                    </style>
    </head>

    <body>
        <script>
        if (window.location.href.indexOf("yueniucj") >= 0) {
            document.body.className = 'web-yueniucj'
        } else {
            document.body.className = 'web-yueniu'
        }
        </script>
        <div class="pay-header container">
            <a class="logo logoyn inline" href="http://www.yuetougu.com"><img src="/public/images/logo_v4.png"></a>
            <a class="logo logocj inline hide" href="http://www.yueniucj.com"><img src="http://www.yueniucj.com/public/images/logo.png"></a>
        </div>
        <!-- 操盘内线支付中心 -->
        <div class="pay-center">
            <div class="box">
                <div class="titleBar">
                    <span class="name">操盘内线支付</span>
                </div>
                <div class="contentBar">
                    <!-- 订单信息 -->
                    <div class="order">
                        <div class="line">
                            <span class="num">订单号：<i class="orderNum"></i></span>
                            <span class="descript">订单描述：<i>操盘内线 </i></span>
                        </div>
                        <div class="line">
                            <span>请您在提交订单后<strong>20分钟</strong>内完成支付，否则订单会自动取消</span>
                        </div>
                    </div>
                    <!-- 操盘内线支付 -->
                    <div class="vip-refer">
                        <div class="title-1">选择期限：</div>
                        <div class="items"></div>
                        <div class="Tips">
                            <div class="title-1">选择支付方式：</div>
                            <div class="tip">
                                <p>购买必读：为了保证该产品的正常使用，请您务必在付款成功之后<strong>联系客服开通</strong>产品VIP账号！！！ 客服电话：
                                    <span class="phone">010-81733516</span>（注：请保留微信、支付宝付款截图或银行转账单据）</p>
                            </div>
                        </div>
                    </div>
                    <!-- 付款方式 -->
                    <div class="pay-category">
                        <div class="item ali-pay" data-type="ali">
                            <img src="/public/images/pay/pay-ali.jpg" />
                            <i class="icon"></i>
                        </div>
                        <div class="item weixin-pay" data-type="weixin">
                            <img src="/public/images/pay/pay-wx.jpg" />
                            <i class="icon"></i>
                        </div>
                        <div class="item cardBar active" data-type="card">
                            <img src="/public/images/pay/pay-card.jpg" />
                            <i class="icon"></i>
                        </div>
                    </div>
                    <div class="pay-types">
                        <div class="pay-type" id="code-card">
                            <div class="cardBar ">
                                <div class="card-item ">
                                    <div class="imgw"><img class="icon-bank " src="/public/images/pay/jh.jpg "></div>
                                    <div class="info">
                                        <div>户名：云南产业投资管理有限公司</div>
                                        <div>开户行：中国建设银行股份有限公司昆明滇龙支行</div>
                                        <div>银行账号：<i class="num ">5305 0161 5537 0000 0130</i></div>
                                    </div>
                                </div>
                                <div class="card-item ">
                                    <div class="imgw"><img class="icon-bank " src="/public/images/pay/nh.jpg "></div>
                                    <div class="info">
                                        <div>户名：云南产业投资管理有限公司</div>
                                        <div>开户行：中国农业银行股份有限公司昆明护国支行</div>
                                        <div>银行账号：<i class="num ">2401 9501 0400 34924</i></div>
                                    </div>
                                </div>
                                <div class="card-item ">
                                    <div class="imgw"><img class="icon-bank " src="/public/images/pay/gh.jpg "></div>
                                    <div class="info">
                                        <div>户名：云南产业投资管理有限公司</div>
                                        <div>开户行：中国工商银行股份有限公司昆明城市开发支行</div>
                                        <div>银行账号：<i class="num ">2502 0215 1920 0032 245</i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pay-type hide" id="code-weixin">
                            <p class="pay-tip">1分钟后失效，请重新刷新页面操作</p>
                            <div class="content"></div>
                        </div>
                        <div class="pay-type hide" id="code-ali">
                            <p class="pay-tip">1分钟后失效，请重新刷新页面操作</p>
                            <div class="content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===Footer=== -->
        <%@include file="../common/vip-refer-foot.jsp" %>
            <script src="/public/bundle/pay-refer.bundle.js"></script>
    </body>

    </html>
