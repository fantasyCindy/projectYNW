<template>
    <div class="history-list">
        <table>
            <tr v-for="item in list">
                <td class="his-time">
                    <div class="t-icon"></div>
                    <div class="t-text">{{item.publisher_timeStringDay | reduceDay}}</div>
                </td>
                <td class="his-text" @click="goLive(item)">
                    <span>{{item.todaysubject}}</span>
                </td>
            </tr>
        </table>
        <loading :visible="loadingVisible"></loading>
    </div>
</template>
<script>
var loading = require('mobile/__loadMore.vue')
var lo = require('m/lib/lo.js')
export default {
    components: {
        loading
    },
    data() {
        return {
            list: [],
            loadingVisible: true
        }
    },
    filters: {
        reduceDay(val) {
            return val.match(/\d+-\d+$/)[0];
        }
    },
    methods: {
        goLive(item) {
            store.historyId = item.periodicalid
            window.location.hash = `#/vip/live/${item.periodicalid}`
        },
        getData(ops) {
            ops = lo.extend({
                limit: 10,
                sinceId: '',
                direct: ''
            }, ops)

            $.getJSON("/app/vipHistory.htm", ops, back => {
                if (back.status == 1) {
                    var data = back.data.history;
                    if (data.length < ops.limit) {
                        this.loadingVisible = false
                        store.status.hasMore = false
                        return;
                    }

                    this.list = ops.sinceId ? this.list.concat(data) : data
                }
            })
        }
    },
    mounted() {
        store.status.hasMore = true
        store.status.onLoadMoreBegin = () => {
            this.getData({
                direct: 'up',
                sinceId: this.list[this.list.length - 1].periodicalid
            })
        }
        this.getData();
    }
}
</script>
