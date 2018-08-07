<template>
    <div class="leaflet-list">
        <div class="titleBar">
            <div class="value">落地页模板列表</div>
        </div>
        <div class="contentBar">
            <div class="item" v-for="item in images" @click="enterDetail(item)">
                <div class="avatar">
                    <img :src="url + item.name">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 宣传页模板缩略图
/* beautify preserve:start */

var images =  [
	{ name: 'leaflet-live.jpg' },
	{ name: 'leaflet-refer.jpg' }
 ]

/* beautify preserve:end */


export default {
    data() {
            return {
                images,
                url: store.url
            }
        },
        methods: {
            enterDetail(item) {
                store.edit = item
                this.$router.push({
                    path: '/detail'
                })
            }
        }
}
</script>
