<template>
    <div id="wx-opinion">
        <div class="container" v-for="item in items">
            <div class="wx-title">
                <span class="wx-title-txt" @click="goDetail(item)">{{item.title}}</span>
            </div>
            <div class="opinion-content" @click="goDetail(item)">{{item.opinionShortContent}}</div>
            <div class="opinion-msg">
                <div class="t-photo fl"><img :src="item.teacher_photo"></div>
                <div class="t-name fl">{{item.createrName}} <i class="line"></i></div>
                <div class="read-count fl">阅读：{{item.viewnumber}}</div>
                <div class="date fr">{{item.create_timeStr}}</div>
            </div>
        </div>
        <loading :visible="isLoading"></loading>
    </div>
</template>
<script>
var loading = require('mobile/__loadMore.vue')
var lo = require('m/lib/lo.js')
export default {
    data() {
            return {
                isLoading: true,
                items: []
            }
        },
        filters: {
            substr(val) {
                if (val.length > 20) {
                    return val.substr(0, 36) + '..'
                }

                return val
            }
        },
        components: {
            loading
        },
        methods: {
            goDetail(item) {
                window.location.href = `/mobile/m-opinionDetail.htm?id=${item.article_id}`
            },
            getData(ops) {

                ops = lo.extend({
                    limit: 10,
                    direct: "down",
                    sinceId: ''
                }, ops)


                // 使用缓存数据
                if (store.cacheData.length > 0 && !ops.sinceId) {
                    this.items = store.cacheData
                    return
                }

                $.getJSON('/opinion/queryMOpinion.htm', ops, back => {
                    if (back.data.length < 1) {
                        this.isLoading = false
                        return;
                    }

                    store.cacheData = store.cacheData.concat(back.data)
                    this.items = ops.sinceId ? this.items.concat(back.data) : back.data
                })

            }
        },
        mounted() {
            this.getData()
            var body = $('body')

            $(window).scroll(lo.debounce(() => {
                var offset = body.scrollTop(); // 列表页记录滚动条的位置
                if (this.isLoading) {
                    var position = $('.loadMore').offset().top;
                    if (offset < position - screenHeight) return;
                    this.getData({
                        direct: "up",
                        sinceId: this.items[this.items.length - 1].article_id
                    })
                }
            }, 200))
        }
}
</script>
