<template>
    <div class="m-list-container">
        <div class="m-list" v-for="item in items">
            <p class="m-top">
                <span class="m-l-title"><i class="line"></i>操盘绝学</span> ——
                <span class="f24">本周展望</span>
                <span class="m-l-time fr f16">2017-3-24</span>
            </p>
            <p class="m-l-text">
                技术形式上看，本周的走势整体对于上周五大阴线的技术修复技术等待着机会下调整空间不大，各路资金都等待机会
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []
        }
    }
}
</script>
