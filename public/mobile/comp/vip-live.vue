<template>
    <div id="live">
        <div class="main chat-items">
            <div class="warning">风险提示：以下内容仅供参考，投资有风险，操作需谨慎</div>
            <div class="remainder">
                <span>您购买的操盘内线将于<strong class="value">{{dueDate}}</strong>到期</span>
                <span class="renew-btn" @click="renew">续费</span>
            </div>
            <div class="list" v-for="item in liveData">
                <div class="info">
                    <div class="img"><img :src="item.teacherPhoto"></div>
                    <div class="title">
                        <span class="blue">{{item.teacherName}}</span>
                        <div class="inline"><span>{{item.pubtimeString}}</span></div>
                    </div>
                </div>
                <div v-html="item.shortContent"></div>
                <!-- 图片栏 -->
                <div class="img-container">
                    <div class="imgw" v-for="src in item.imgPathList" v-show="item.imgPathList.length>0" @click="zoomImage(src)">
                        <img :src="src">
                    </div>
                </div>
                <div class="list-teach" v-show="item.quotecontent">
                    <span class="teacher">{{item._quote_users}}</span>
                    <span>{{item._quote_info}}</span>
                </div>
            </div>
        </div>
        <loading :visible="showLoading"></loading>
    </div>
</template>
<script>
var error = require('m/lib/errorCode.js')
var lo = require('m/lib/lo.js')
var loading = require('mobile/__loadMore.vue')

// 去掉标签
var clearHTML = str => {
    if (typeof str != 'string') return str;
    return str.replace(/<.+?>/g, '')
}

var handle = arr => {
    return arr.map(item => {
        item._quote_users = ""
        item._quote_info = ""

        // 是打赏消息
        if (!item.teacherName) {
            item.teacherName = "系统消息"
            item.teacherPhoto = "/public/images/vip/gift.jpg"
        }

        try {

            // 处理引用的内容
            if (item.quotecontent) {
                item.quotecontent = clearHTML(item.quotecontent)
                var match = item.quotecontent.match(/@[^\s]+/g);
                item._quote_users = match.join(" ");
                item._quote_info = match.length == 1 ? item.quotecontent.match(/\s.+$/)[0] : '';
            }

        } catch (e) {}

        return item
    })
}

// 推送的数据键的转换
var socketDataMap = data => {
    data = handle([data])[0];
    data.teacherPhoto = data.photo
    data.teacherName = data.nickName
    data.pubtimeString = data.showTimeStr

    //提取推送数据的图片
    data.imgPathList = []
    var match = data.content.match(/src=".+?"/g)
    if (match) {
        data.imgPathList = match.map(item => item.match(/"(.+)"/)[1])
    }
    data.shortContent = clearHTML(data.content)

    return data
}

/*///////////////////////////////////////////////////////////////////*/

export default {
    components: {
        loading
    },
    data() {
        return {
            showLoading: true,
            liveData: [],
            historyId: this.$route.params.id || "",
            dueDate: ''
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.path == "/vip/live") {
            this.getLiveData({
                periodicalid: ''
            })
            this.$root.menuTop = 1;
            this.$root.menuBottom = 1;
        }
        next()
    },
    methods: {

        // 去续费
        renew() {
            window.location.href = '/pay-choose.htm'
        },

        /* 放大图片 */
        zoomImage(src) {
            var image = new Image()
            image.src = src;
            image.onload = function() {
                openPhotoSwipe([{
                    src,
                    w: image.width,
                    h: image.height
                }])
            }
        },
        goto(url) {
            this.$router.push(url)
        },
        getLiveData(ops) {
            var self = this;
            ops = lo.extend({
                periodicalid: "", //不传查正在直播, 传值查询历史直播
                limit: 10, // 请求条数
                direct: '', // up/down
                sinceId: ''
            }, ops)

            $.getJSON('/app/vipBroadcasting.htm', ops, back => {
                if (back.status == 20016) {
                    layer.alert("今日直播尚未开启", function() {
                        self.$router.push('/index')
                    })
                }

                if (back.status == 1) {

                    // 没有加载更多
                    if (back.data.length < ops.limit) {
                        store.status.loadMore = false
                        this.showLoading = false
                    }

                    if (back.data.length > 0) {

                        // 如果请求的是正在直播的数据, 返回数据后保存正在直播的ID
                        if (!ops.periodicalid) {
                            store.pid = back.data[0].periodicalid
                        }

                        var pullData = handle(back.data);

                        // 如果是加载更多获取的数据, 追加的现有数据中
                        this.liveData = ops.sinceId ? this.liveData.concat(pullData) : pullData
                    }
                    return
                }
            })
        }
    },
    created() {
        if (this.historyId) {
            this.$root.menuTop = 4;
            this.$root.menuBottom = -1;
        } else {
            this.$root.menuTop = 1;
            this.$root.menuBottom = 1;
        }
    },
    mounted() {
        store.status.hasMore = true;
        store.status.onLoadMoreBegin = () => {
            this.getLiveData({
                periodicalid: this.historyId,
                sinceId: this.liveData[this.liveData.length - 1].id,
                direct: 'up'
            })
        }
        this.getLiveData({
            periodicalid: this.historyId
        });

        // 收到推送的消息
        store.socket.live = data => {
            log("推送的消息", data)
            this.liveData.unshift(socketDataMap(data))
        }

        //到期时间
        $.getJSON('/app/vipendTime.htm', back => {
            this.dueDate = back.data.replace(/-/g, '.').replace(/:\d+$/, '')
        })
    }
}
</script>
