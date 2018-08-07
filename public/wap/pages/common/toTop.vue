<template>
    <div class="toTop" @click="top"></div>
</template>
<script>
export default {
    data() {
            return {}
        },
        methods: {
            top() {
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
            }
        }
}
</script>
<style scoped>
.toTop {
    opacity: 0.8;
    z-index: 9999;
    position: fixed;
    right: .427rem;
    bottom: .533rem;
    background: #ffffff url(/public/wap/images/totop.png) no-repeat center center;
    background-size: .48rem .533rem;
    box-shadow: 0 0.267rem 1.067rem 0 rgba(0, 0, 0, 0.08);
    width: 1.067rem;
    height: 1.067rem;
    border-radius: 100%;
    transition: all .3s;
}
</style>
