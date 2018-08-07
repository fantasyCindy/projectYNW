<template>
    <div class="m-list-container">
        <div class="m-list" v-for="item in items" @click="goDetail(item.article_id)">
            <div class="time">
                <span>{{item.create_timeStr}}</span>
            </div>
            <div class="m-top">
                <div class="title">
                    <i class="line"></i><span class="name">{{item.title}} </span>
                </div>
            </div>
            <p class="m-l-text">{{item.shortContent}}</p>
        </div>
        <loading :visible="visible"></loading>
    </div>
</template>
<script>
var ajax = require('mobile/__ajax.js')
var type = null;
var loading = require('mobile/__loadMore.vue')
var lo = require('m/lib/lo.js')

export default {
    components: {
        loading
    },
    data() {
        return {
            items: [],
            visible: true
        }
    },
    beforeRouteEnter(to, from, next) {
        type = to.params.type;
        next(vm => vm.getData())
    },
    beforeRouteUpdate(to, from, next) {
        type = to.params.type;
        this.visible = true
        this.getData()
        next()
    },
    methods: {
        goDetail(id) {
            this.$router.push({
                path: `/vip/article/${type}/${id}`
            })
        },
        getData(ops) {
            ops = lo.extend({
                type: type, //4 操盘绝学，5独家内参
                limit: 10, //请求条数
                sinceId: '', //起始ID
                direct: "" //请求方向 up down
            }, ops)

            $.getJSON('/app/vipOpinion.htm', ops, back => {
                if (back.status == 1) {


                    var arr = back.data.articles;

                    // 返回条数小于请求条数
                    if (arr.length < ops.limit) {
                        store.status.loadMore = false
                        this.visible = false
                    }

                    //追加或者替换
                    this.items = ops.sinceId ? this.items.concat(arr) : arr;
                }
            })
        }
    },
    mounted() {
        store.status.hasMore = true
        store.status.onLoadMoreBegin = () => {
            this.getData({
                sinceId: this.items[this.items.length - 1].article_id,
                direct: 'up'
            })
        }
    }
}
</script>
