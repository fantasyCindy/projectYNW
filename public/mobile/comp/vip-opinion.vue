<template>
    <div id="buy">
        <div class="banner">
            <img src="/public/mobile/images/banner/refer.jpg" style="display:none" v-show="src=='/vip/opinion/refer/5'" />
            <img src="/public/mobile/images/banner/skill.jpg" style="display:none" v-show="src=='/vip/opinion/refer/4'" />
            <img src="/public/mobile/images/banner/history.jpg" style="display:none" v-show="src=='/vip/opinion/history'" />
        </div>
        <div class="opinion-list">
            <router-view></router-view>
        </div>
        <loading></loading>
    </div>
</template>
<script>
var loading = require('mobile/__loadMore.vue')
export default {
    data() {
            return {
                loadingVisible: true,
                src: ''
            }
        },
        beforeRouteUpdate: function(to, from, next) {
            this.src = to.path
            next()
        },
        created() {
            this.$root.menuBottom = -1;
            this.$root.menuTop = 2;
        },
        mounted() {
            this.src = this.$route.path;
        }
}
</script>
