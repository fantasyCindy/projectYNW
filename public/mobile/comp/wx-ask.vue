<template>
    <div id="wx-ask">
        <div class="container" v-for="item in news">
            <div class="wx-ask-title">
                <span class="wx-ask-title-icon">问</span>
                <span class="wx-ask-title-txt" @click="goDetail(item)">{{item.questionInfo.questioncontent}}</span>
            </div>
            <div class="answer" v-for="an in item.answerArray">
                <div class="opinion-content">
                    <span class="wx-answer-title-icon">答</span>
                    <span @click="goDetail(item)">{{an.answerContentStr | substr}}</span>
                </div>
                <div class="opinion-msg">
                    <div class="t-photo fl"><img :src="an.answerUser.photo"></div>
                    <div class="t-name fl">{{an.answerusername}}</div>
                    <div class="date fr">{{an.ansertimeStr}}</div>
                </div>
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
                news: [],
                isLoading: true
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
                store.detailData = item;
                this.$router.push({
                    path: '/detail'
                })
            },
            getData(ops) {
                ops = lo.extend({
                    limit: 10,
                    direct: "down",
                    sinceId: ''
                }, ops)


                // 使用缓存数据
                if (store.cacheData.length > 0 && !ops.sinceId) {
                    this.news = store.cacheData
                    return
                }

                $.getJSON('/ask/mnewnote.htm', ops, back => {
                    if (back.data.length < 1) {
                        this.isLoading = false
                        return;
                    }
                    store.cacheData = store.cacheData.concat(back.data)
                    this.news = ops.sinceId ? this.news.concat(back.data) : back.data
                })
            }
        },
        mounted() {

            this.getData();
            var $root = $('#wx-ask')
            var more = $('.loadMore')

            // 滚动到上次记录的位置
            setTimeout(function() {
                $root.scrollTop(store.position)
            }, 100)

            $root.scroll(lo.debounce(() => {
                store.position = $root.scrollTop(); // 列表页记录滚动条的位置
                if (this.isLoading) {
                    var top = more.offset().top;
                    if (top > screenHeight) return;
                    this.getData({
                        direct: "up",
                        sinceId: this.news[this.news.length - 1].noteid
                    })
                }
            }, 200))
        }
}
</script>
