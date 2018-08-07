<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <title>我的约牛</title>
        <%@ include file="../common/front-common.jspf" %>
            <%@ include file="../common/session.jsp" %>
                <link rel="stylesheet" href="/public/css/all.css">
                <link rel="stylesheet" href="/private/shortcutpay/css/shortcutpay.css">

                <body>
                    <div id="defray-nav">
                        <div class="defray-wrap">
                            <span style="color:white;">约投顾支付中心</span>
                        </div>
                    </div>
                    <div id="defray">
                        <div class="defray-wrap clear">
                            <div class="fl" id="logo">
                                <a href="/"><img src="/public/images/logo_v4.png" alt="约投顾" title="约投顾"></a>
                                <span class="defray-title">支付中心</span>
                            </div>
                        </div>
                        <div class="defray-online">
                            <div class="defray-wrap">
                                <div class="defray-process">约牛支付</div>
                                <div class="defray-detail clear">
                                    <div class="detail_left fl">
                                        <span class="indent_num">订单号：</span>
                                        <span class="indent_describe">订单描述：</span>
                                        <div>
                                            <span>请您在提交订单后</span>
                                            <font color="#e20000">20</font>分钟内完成支付，否则订单会自动取消。
                                        </div>
                                    </div>
                                    <div class="detail_right fr">
                                        <span>应付：<font color="#e20000" size="6" class="price">0</font>元</span>
                                    </div>
                                </div>
                                <div class="defray-content">
                                    <!-- 支付宝 -->
                                    <div data-source="alipay" class="defray-item clear thisclass">
                                        <div class="rounded fl">
                                            <input type="radio" id="roundedThree" name="radio" checked="checked">
                                            <label for="roundedThree"></label>
                                        </div>
                                        <div class="defray_radio defray-alipay clear fl">
                                            <div class="apyphoto fl"></div>
                                            <div class="yn_pay fl">
                                                <span class="pay-title">支付宝支付</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 微信支付 -->
                                    <div data-source="wechat" class="defray-item clear">
                                        <div class="rounded fl">
                                            <input type="radio" id="roundedTwo" name="radio">
                                            <label for="roundedTwo"></label>
                                        </div>
                                        <div class="defray_radio defray-wechat clear fl">
                                            <div class="apyphoto fl"></div>
                                            <div class="yn_pay fl">
                                                <span class="pay-title">微信支付</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 余额支付 -->
                                    <div data-source="balance" class="defray-item clear">
                                        <div class="rounded fl">
                                            <input type="radio" id="roundedOne" name="radio">
                                            <label for="roundedOne"></label>
                                        </div>
                                        <div class="defray_radio defray-balance clear fl">
                                            <div class="apyphoto fl"></div>
                                            <div class="yn_pay fl">
                                                <p class="pay-title">余额支付</p>
                                                <p class="yn_balance"></p>
                                            </div>
                                            <a href="/html/recharge.htm" class="fr">去充值</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="finish" id="pay-submit"><span class="finish_btn">确认付款</span></div>
                            </div>
                        </div>
                    </div>
                    <%@include file="../common/front-foot.jsp" %>
                        <script type="text/javascript" src="/public/bundle/shortcutpay.bundle.js"></script>
                </body>

    </html>
