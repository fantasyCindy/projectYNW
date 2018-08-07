<template>
    <div class="home">
        <div class="banner" @click="enter">
            <img src="/public/mobile/images/home/refer_mobile_01.jpg" />
        </div>
        <div class="home-nav">
            <div class="item" @click="scroll('post-1')">
                <div class="wrap">
                    <i class="icon"><img src="/public/mobile/images/home/live.png"/></i>
                    <span class="name">直播室</span>
                </div>
            </div>
            <div class="item" @click="scroll('post-2')">
                <div class="wrap">
                    <i class="icon"><img src="/public/mobile/images/home/operate.png"/></i>
                    <span class="name">操盘绝学</span>
                </div>
            </div>
            <div class="item" @click="scroll('post-3')">
                <div class="wrap">
                    <i class="icon"><img src="/public/mobile/images/home/reference.png"/></i>
                    <span class="name">独家内参</span>
                </div>
            </div>
        </div>
        <div id="post-1" @click="goto('/vip/live')" class="home-imgw first"> <img src="/public/mobile/images/home/refer_mobile_02.jpg" /></div>
        <div id="post-2" @click="goto('/vip/opinion/refer/4')" class="home-imgw"><img src="/public/mobile/images/home/refer_mobile_03.jpg" /></div>
        <div id="post-3" @click="goto('/vip/opinion/refer/5')" class="home-imgw"><img src="/public/mobile/images/home/refer_mobile_04.jpg" /></div>
        <div class="home-imgw"><img src="/public/mobile/images/home/refer_mobile_05.jpg" /></div>
        <div class="home-notice">
            云南产业投资管理有限公司（下称云南产投）是中国证监会首批颁发认证的专业投资咨询机构，执业资格证书编号：ZX0093,具有专业、丰富、合规、可信的证券投资咨询经验。 我们拥有证监会认证的精英分析师团队，长期精耕细作在市场一线，全面、客观、旗帜鲜明地分析股票行情，撰写专业的宏观研究、数据分析、企业调研、个股解读等深度投资内参。
        </div>
        <div class="home-imgw last"><img src="/public/mobile/images/home/refer_mobile_06.jpg" /></div>
        <div class="home-bottom">
            <span class="btn" @click="enter">立即加入</span>
            <!-- <div class="count"><span v-text="count"></span>人已加入</div> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                count: (function() {
                    return 7000
                })()
            }
        },
        methods: {
            scroll(id) {
                var top = $(`#${id}`).offset().top - 44 + 'px';
                $('.app-contentBar').animate({
                    scrollTop: top
                }, 500)
            },
            // 点击立即购买
            enter() {
                if (!ynIsLogin) {
                    this.$router.push('/login')
                    return
                }

                console.log("store.orderCode", store.orderCode)

                // 已付款
                if (store.orderCode == 60021) {
                    layer.alert("商品已经付款, 请等待客服人员与您联系")
                }
                // 未购买
                if (store.orderCode == 60022) {
                    window.location.href = '/pay-choose.htm'
                }
                // 已购买
                if (store.orderCode == 60020) {
                    this.$router.push('/vip/live')
                }

            },
            goto(name) {
                this.$router.push(name)
            }
        },
        created() {
            this.$root.menuBottom = -1;
            this.$root.menuTop = 3;
        },
        mounted() {
            var second = Math.floor(Date.now() / 1000);
        }
}
</script>
