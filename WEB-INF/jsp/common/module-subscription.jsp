<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div id="subscription" class="hide">
        <p class="title">确认订阅</p>
        <i class="close fa fa-times-circle fa-2x"></i>
        <div class="wrap">
            <div class="getPrice">
                <div class="group">
                    <p class="paytitle">支付项目：<span class="title"></span></p>
                    <p class="pricenum">价格：<span class="price"></span>牛币</p>
                </div>
                <p class="balance clear"><span class="fl" id="support-surplus">可用余额0牛币</span><a href="/html/recharge.htm" class="gopay fr" target="_blank">余额不足？去充值</a></p>
                <div class="info clear">
                    <span>实付款：<font size="5" color="red" class="price"></font>牛币</span>
                    <span class="submit fr" />立即支付</span>
                </div>
            </div>
            <div class="confirmPrice hide">
                <div class="content">
                    <div class="name">支付项目：<span class="payName">打赏直播室</span></div>
                    <div class="price">价格：<strong id="shouldPayValue"></strong>牛币</div>
                </div>
                <div class="read">
                    <input type="checkbox" checked class="agreement">我已经阅读并同意
                    <a href="/html/returnAgreementJsp.htm" target="_blank" style="color:green">
                        <风险揭示书>
                    </a>
                </div>
                <div class="bottom">
                    <span class="finalPrice">实际付款：<strong id="finalPayValue"></strong>牛币</span>
                    <a href="" id="pay-jump" target="_blank">立即支付</a>
                    <button id="pay-jump-button" disabled="true" class="hide">立即支付</button>
                </div>
            </div>
        </div>
    </div>
