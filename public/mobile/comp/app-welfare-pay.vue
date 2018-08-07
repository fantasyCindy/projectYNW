<template>
    <div class="app-welfare-pay">
        <div class="app-welfare-pay-logo"><img src="/public/images/ytg-logo.png" alt=""></div>
        <div class="app-welfare-pay-price">支付金额<span class="app-pay-icon">￥<span class="app-welfare-pay-num" v-text='price'></span>元</span>
        </div>
        <div class="app-welfare-pay-way">支付方式</div>
        <div class="app-welfare-pay-type pay-type-wx" v-show="is_weixin">微信支付<span class="welfare-buy" @click="ecode ? callPay() : ++show">立即支付</span></div>
        <div class="app-welfare-pay-type pay-type-alipay" v-show="!is_weixin">支付宝支付<span class="welfare-buy" @click="ecode ? callPay() : ++show">立即支付</span></div>
        <!-- <div class="app-welfare-goBuy" @click="callPay">立即支付</div> -->
        <div class="welfare-pop" v-show="show">
            <div class="welfare-imgCode">
                <div class="welfare-img">请输入邀请码</div>
                <div class="welfare-imgCode-input">
                    <input type="text" v-model='employeCode'>
                </div>
                <div class="welfare-code-bar">
                    <span class="welfare-code-bar-btn" @click="makeSure">确认</span>
                    <span class="welfare-code-bar-btn" @click="ignore">跳过</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var layer = require('module/layer.js')
var href = window.location.href
var match = href.match(/referid=(\d+)/)
var referid = match ? match[1] : ''
var error = require('e/error-type');
var matcha = href.match(/ecode=([^]+)router/)
var ecode = matcha ? matcha[1] : ''

var matchb = window.location.href.match(/url=([^]+)&/); //不需要ecode工号
var backurl = matchb ? matchb[1] : ''
export default {
    data() {
            return {
                price: '',
                show: false,
                ecode: ecode, //地址栏邀请码
                employeCode: '', //输入邀请码
                is_weixin: (function() {
                    var ua = navigator.userAgent.toLowerCase();
                    return ua.match(/MicroMessenger/i) == "micromessenger";
                })()
            }
        },
        methods: {
            callPay() {
                var self = this
                this.ecode = ecode ? ecode : this.employeCode //如果地址栏传了邀请码ecode就不弹窗口，如果没传ecode就弹邀请码窗口
                    /* 获取订单号 */
                $.post('/app/buyGoodsPayOrder.htm', {
                    goodsId: referid, //商品id
                    goodsType: 3,
                    buy_number: 1,
                    pay_source: 3,
                    employeecode: this.ecode
                }, function(back) {
                    if (back.status == 60011) {
                        layer.msg("用户没有开通账户!请联系客服!")
                        return
                    }
                    if (back.status == 60023) {
                        return layer.msg("商品已经超过购买时间")
                    }
                    if (back.status == 60020) {
                        layer.msg('商品已购买,请下载APP或者到约投顾官网查看')
                        return
                    }
                    if (back.status == 60023) {
                        layer.msg('商品购买时间已过')
                        setTimeout(function() {
                            window.location.href = backurl
                        }, 1000)
                        return
                    }
                    if (+back.status == 1) {
                        //微信浏览器使用微信支付
                        if (self.is_weixin) {
                            $.get('/web/h5codeCal.htm', {
                                state: back.data.orderNum,
                                // isTest:1
                            }, function(url) {
                                window.location.href = url
                            })
                        }

                        //其他浏览器调用支付宝
                        if (!self.is_weixin) {
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
            makeSure() {
                if (!ynIsLogin) {
                    layer.msg('用户未登录')
                    setTimeout(function() {
                        window.location.href = '/appwelfare.htm?router=/welfare/login'
                    }, 1000)
                    return
                }
                if (!this.employeCode) {
                    return layer.msg('请输入邀请码')
                }
                this.show = false
                this.callPay()
                this.employeCode = ''
            },
            ignore() {
                if (!ynIsLogin) {
                    layer.msg('用户未登录')
                    setTimeout(function() {
                        window.location.href = '/appwelfare.htm?router=/welfare/login'
                    }, 1000)
                    return
                }
                this.employeCode = ''
                this.show = false
                this.callPay()
            },
            getReferMsg() {
                var self = this
                $.getJSON('/reference/referbyid.htm', {
                    id: referid
                }, function(back) {
                    if(back.status == 1){
                        self.price = back.data.price
                    }else () => {return layer.msg(error[back.status])}
                    
                })
            }

        },
        mounted() {
            this.getReferMsg()
            document.title = "购买"
            var href = window.location.href
            $.post("/web/getjssdkInfo.htm", {
                url: href
            }, function(data) {
                var back = JSON.parse(data)
                if (back.status == 1) {
                    wx.config({
                        debug: false,
                        appId: back.data.appId,
                        timestamp: back.data.timeStamp, // 必填，生成签名的时间戳
                        nonceStr: back.data.nonceStr, // 必填，生成签名的随机串
                        signature: back.data.signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                    });
                    wx.ready(function() {
                        wx.hideOptionMenu();
                    });
                }
            })

        }
}
</script>
