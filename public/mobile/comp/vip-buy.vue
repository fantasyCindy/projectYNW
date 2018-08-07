<template>
    <div id="buy">
        <nav class="nav" id="buy-nav">
            <span class="nav-list" :class="{active:index == 0}" @click="select(0)">专家直播</span>
            <span class="nav-list" :class="{active:index == 1}" @click="select(1)">独家内参</span>
            <span class="nav-list" :class="{active:index == 2}" @click="select(2)">操盘绝学</span>
        </nav>
        <div class="banner">
            <img src="/public/images/caoh5/banner.jpg" alt="banner">
        </div>
        <div class="mian">
            <div class="rate">
                <i class="icon"></i>
                <span class="red">更新时间</span>
                <span class="">{{content.update}}</span>
            </div>
            <div class="rate rate2">
                <i class="icon icon2"></i>
                <div class="red">功能特色</div>
                <div class="w50">{{content.action}}</div>
            </div>
        </div>
        <div class="footer">
            <div class="foot-btn foot-price">
                <div class="wrap">
                    <i class="mark">￥</i>
                    <span class="value" style="font-weight:bold">2980</span>
                </div>
            </div>
            <div class="foot-btn btn-buy" @click="buy">
                <div class="wrap">
                    <span class="value">{{text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var contents = [{
    update: '实时在线',
    action: '专家实时在线互动，提示大盘趋势，参与股友互动，解决投资疑难，跟高手，学操盘，选股不再难。',
    to: '/vip/live'
}, {
    update: '每个交易日9:00',
    action: '大盘趋势解析，潜力热点前瞻，早盘个股挖掘，拒绝马后炮，赢在开盘前。',
    to: '/vip/opinion/refer/4'
}, {
    update: '每天一次',
    action: '资深高手绝招解密， 要赚钱，先学习，只有不为普通人知的招式，才是致命的招式。',
    to: '/vip/opinion/refer/5'
}]
var error = require('m/lib/errorCode.js')
var is_weixin = (function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
})()



export default {
    data() {
            return {
                text: store.isBuy ? '立即进入' : '立即购买',
                index: store.buyType,
                iframeURL: "http://www.baidu.com"
            }
        },
        computed: {
            content() {
                return contents[this.index]
            }
        },
        methods: {
            select(index) {
                this.index = index;
            },
            buy() {
                if (!store.isBuy) {
                    if (!ynUserId) {
                        store.event.login = function() {
                            this.$router.push('/')
                        }.bind(this)
                        this.$router.push('/login')
                        return;
                    }
                    window.location.href = "/pay-choose.htm";
                } else {
                    this.$router.push({
                        path: contents[this.index].to
                    })
                }
            }
        },
        created() {
            this.$root.menuTop = 3;
            this.$root.menuBottom = -1;
        }
}
</script>
