<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>约牛支付中心</title>
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <link rel="stylesheet" href="/public/css/reset.css">
            <link rel="stylesheet" href="/public/mobile/css/pay-step.css">
    </head>

    <body>
        <div class="contentWrap">
            <div class="top">
                <p><strong>温馨提示：</strong>由于微信支付宝支付仅支持3000元以下支付，请按照以下提示进行操作</p>
            </div>
            <div class="step one">
                <div class="title-1">第一步：点击号码联系客服</div>
                <div class="phone">010-82177313</div>
            </div>
            <div class="step two">
                <div class="title-1">第二步：线下汇款</div>
                <div class="cardBar ">
                    <div class="card-item ">
                        <div class="imgw"><img class="icon-bank " src="/public/mobile/images/pay/jh.jpg "></div>
                        <div>户名：云南产业投资管理有限公司</div>
                        <div>开户行：中国建设银行股份有限公司昆明滇龙支行</div>
                        <div>银行账号：<i class="num ">5305 0161 5537 0000 0130</i></div>
                    </div>
                    <div class="card-item ">
                        <div class="imgw"><img class="icon-bank " src="/public/mobile/images/pay/nh.jpg "></div>
                        <div>户名：云南产业投资管理有限公司</div>
                        <div>开户行：中国农业银行股份有限公司昆明护国支行</div>
                        <div>银行账号：<i class="num ">2401 9501 0400 34924</i></div>
                    </div>
                    <div class="card-item ">
                        <div class="imgw"><img class="icon-bank " src="/public/mobile/images/pay/gh.jpg "></div>
                        <div>户名：云南产业投资管理有限公司</div>
                        <div>开户行：中国工商银行股份有限公司昆明城市开发支行</div>
                        <div>银行账号：<i class="num ">2502 0215 1920 0032 245</i></div>
                    </div>
                </div>
            </div>
            <div class="step three">
                <div class="title-1">第三步：开通产品</div>
                <p class="strong">支付成功后，请联系客服人员帮您快速开通产品，享受超短线产品服务。</p>
            </div>
        </div>
        <script src="http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js "></script>
    </body>

    </html>
