<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>操盘内线|支付</title>
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <script>
            if (!ynIsLogin) {
                window.location.href = "/mobile/refer.htm"
            }
            var is_weixin = (function() {
                var ua = navigator.userAgent.toLowerCase();
                return ua.match(/MicroMessenger/i) == "micromessenger";
            })()
            </script>
            <link rel="stylesheet" href="/public/css/reset.css">
            <link rel="stylesheet" href="/public/mobile/css/m-wx-pay.css">
    </head>

    <body>
        <div class="page-pay-wx" id="app">
            <div class="logo" @click="window.location.href='/mobile/refer.htm'">
                <div class="logo-yn"><img src="/public/mobile/images/pay/logo.png"></div>
                <div class="logo-vip"><img src="/public/mobile/images/pay/-logo.png"></div>
            </div>
            <div class="line">
                <div class="title-1">支付价格</div>
                <div class="pay-types">
                    <div class="width" :class="{active: index == 1 }" v-for="(item, index) in priceList" @click="change(item)">
                        <span class="item">￥<strong class="price">{{item.product_price}}</strong>/{{item.servicePeriod | unit}}</span>
                    </div>
                </div>
            </div>
            <div class="confirm">
                <span class="title-1">支付金额</span>
                <span class="price">￥<strong class="value" v-text="price"></strong>元</span>
            </div>
            <div class="category">
                <span class="title-1">支付方式</span>
                <div class="notice">
                    <img class="icon" src="/public/mobile/images/pay/prompt_icon.png">
                    <span>风险提示：软件需要数据支持，仅提供辅助建议，投资有风险，操作需要谨慎，投资顾问意见仅作参考。</span>
                </div>
                <div class="cate-item wxpay" style="display: none" v-show="isWeiXin" @click="callPay">
                    <span class="avatar"></span>
                    <span class="name">微信支付</span>
                    <i class="icon choose">立即支付</i>
                </div>
                <div class="cate-item alipay" style="display: none" v-show="!isWeiXin" @click="callPay">
                    <span class="avatar"></span>
                    <span class="name"> 支付宝</span>
                    <i class="icon choose">立即支付</i>
                </div>
                <div class="cate-item cardpay">
                    <span class="avatar"></span>
                    <span class="name">银行转账</span>
                </div>
                <div class="cardBar">
                    <div class="card-item">
                        <img class="icon-bank" src="/public/mobile/images/pay/jh.jpg">
                        <div class="left">
                            <div>户名：云南产业投资管理有限公司</div>
                            <div>开户行：中国建设银行股份有限公司昆明滇龙支行</div>
                            <div>银行账号：<i class="num">5305 0161 5537 0000 0130</i></div>
                        </div>
                    </div>
                    <div class="card-item">
                        <img class="icon-bank" src="/public/mobile/images/pay/nh.jpg">
                        <div class="left">
                            <div>户名：云南产业投资管理有限公司</div>
                            <div>开户行：中国农业银行股份有限公司昆明护国支行</div>
                            <div>银行账号：<i class="num">2401 9501 0400 34924</i></div>
                        </div>
                    </div>
                    <div class="card-item">
                        <img class="icon-bank" src="/public/mobile/images/pay/gh.jpg">
                        <div class="left">
                            <div>户名：云南产业投资管理有限公司</div>
                            <div>开户行：中国工商银行股份有限公司昆明城市开发支行</div>
                            <div>银行账号：<i class="num">2502 0215 1920 0032 245</i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js"></script>
        <script src="https://cdn.bootcss.com/vue/2.3.0/vue.min.js"></script>
        <script>
        var vm = new Vue({
            el: '#app',
            data: {
                price: 6980,
                isWeiXin: is_weixin,
                priceList: [],
                price_id: '', //价格ID
                goodsId: '' //产品ID
            },
            filters: {
                unit: function(val) {
                    var types = {
                        "1": '月',
                        "3": '季',
                        "6": '半年'
                    };
                    return types[val]
                }
            },
            methods: {

                callPay: function() {

                    /* 获取订单号 */
                    $.post('/app/appRewardPayOrder.htm', {
                        pay_source: 0,
                        goodsType: 6,
                        price_id: this.price_id,
                        goodsId: this.goodsId
                    }, function(back) {

                        if (+back.status == 60020) {
                            alert("商品已购买, 请等待客服人员与您联系")
                            return;
                        }


                        if (+back.status == 1) {
                            //微信浏览器使用微信支付
                            if (is_weixin) {
                                $.get('/web/h5codeCal.htm', {
                                    state: back.data.orderNum
                                }, function(url) {
                                    window.location.href = url
                                })
                            }

                            //其他浏览器调用支付宝
                            if (!is_weixin) {
                                $.post('/wap/wapPay.htm', {
                                    orderNum: back.data.orderNum
                                }, function(aliback) {
                                    if (+aliback.status == 1) {
                                        var url = aliback.data;
                                        window.location.href = url
                                    }
                                }, 'json')
                            }
                        }
                    }, 'json')
                },

                change: function(item) {
                    this.price = item.product_price
                    this.price_id = item.id
                    this.goodsId = item.product_id
                }
            },
            mounted: function() {
                var self = this;

                // 获取价格
                $.getJSON("/product/productList.htm", function(back) {
                    self.priceList = back[0].priceList;
                    self.priceList.forEach(function(item, i) {

                        //默认选中第二个
                        if (i == 1) {
                            self.price_id = item.id
                            self.goodsId = item.product_id
                        }
                    })
                })


                // 选择价格
                var el = $('.pay-types');
                el.on('click', '.width', function() {
                    el.find('.active').removeClass('active')
                    $(this).addClass('active')
                })
            }
        })
        </script>
    </body>

    </html>
