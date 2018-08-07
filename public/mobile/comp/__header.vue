<template>
    <div class="live-header" :class="{fixed:visible}" :style="{opacity:opacity}">
        <span class="h-title on" @click="goto('/vip/live')">直播室</span>
        <span class="h-title" @click="goto('/vip/chat')">股友互动</span>
    </div>
</template>
<script>
export default {

    props: {
        visible: {
            default: true
        }
    },
    computed: {
        opacity() {
            return visible ? 100 : 0
        }
    },
    methods: {
        goto(url) {
            this.$router.push({
                path: url
            })
        }
    },
    mounted() {
        $('.live-header').on('click', '.h-title', function() {
            console.log("click header...")
            $(this).addClass('on').siblings().removeClass('on')
        })
    }
}
</script>
