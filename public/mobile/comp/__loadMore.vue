<template>
    <div class="loadMore" :style="conStyle">
        <span v-show="visible" :style="iconStyle"><img src="/public/icons/loading2.gif" :style="imgStyle"></span>
        <span class="text" :style="textStyle">{{text}}</span>
    </div>
</template>
<script>
export default {
    data() {
            return {
                conStyle: {
                    textAlign: "center",
                    width: "100%",
                    padding: "20px 0"
                },
                iconStyle: {
                    display: 'inline-block',
                    width: "20px",
                    height: "20px",
                    position: "relative",
                    top: '5px'
                },
                imgStyle: {
                    width: "20px"
                },
                textStyle: {
                    fontSize: "12px"
                }
            }
        },
        props: {
            visible: {
                default: true
            }
        },
        computed: {
            text() {
                return this.visible ? "正在努力加载..." : '没有数据了'
            }
        }
}
</script>
