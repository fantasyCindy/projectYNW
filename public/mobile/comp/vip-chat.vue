<template>
    <div id="live">
        <div class="chat"></div>
        <loading :visible="loadingVisible"></loading>
    </div>
</template>
<script>
var error = require('m/lib/errorCode.js')
var lo = require('m/lib/lo.js')
var loading = require('mobile/__loadMore.vue')

var parseFaceCode = function(content) {
    return content.replace(/\[face=([a-z]+)\]/g, '<img src="/public/icons/face/$1.gif" />')
}

// 推送的数据键的转换
var socketDataMap = data => {
    data.ctimeString = data.showTimeStr
    data.photoImg = data.photo
    return data
}

export default {
    components: {
        loading
    },
    data() {
        return {
            container: null,
            lastTime: null,
            historyId: this.$route.params.id || "",
            chatCount: 0,
            loadingVisible: true
        }
    },
    methods: {
        goto(url) {
            this.$router.push({
                path: url
            })
        },
        createItem: function(item) {
            var isMine = (item.userid || item.user_id) == +ynUserId
            var belong = isMine ? 'my-chat' : 'other-chat'
            var direct = isMine ? 'right' : 'left'
            item.content = parseFaceCode(item.content);
            item.photoImg = item.photoImg || '/public/images/yn.jpg'

            //时间标签如果和上次的相同的则不需要创建
            var need = item.ctimeString != this.lastTime
            var time = need ? `<div class="chat-time">${item.ctimeString}</div>` : '';
            this.lastTime = item.ctimeString;

            return `${time}<div class="chat-list ${belong}" v-for="item in myChat">
                        <div class="img float"><img src="${item.photoImg}"></div>
                        <div class="relative answer float">
                            <div class="chat-title">${item.nickName}</div>
                            <div class="chat-con">
                                <i class="indicate fa fa-caret-${direct}"></i>
                                <div class="float">
                                     <div class="chat-content">${item.content}</div>
                                </div>
                            </div>
                        </div>
                    </div>`
        },

        getChatData(ops) {
            ops = lo.extend({
                periodicalid: "",
                myInteraction: 0,
                limit: 10,
                sinceId: this.chatCount,
                direct: ''
            }, ops)

            $.getJSON('/app/vipInteraction.htm', ops, back => {
                if (back.status == 1) {

                    // 没有加载更多
                    if (back.data.length < ops.limit) {
                        store.status.hasMore = false
                        this.loadingVisible = false
                    }

                    if (back.data.length > 0) {
                        var arr = back.data
                        this.chatCount += arr.length;
                        var tags = arr.map(item => this.createItem(item)).join("")
                        this.container.append(tags)
                    }
                    return;
                }

                layer.alert(error[back.status])
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
        self = this
        this.container = $('#live .chat')
        store.status.hasMore = true;
        store.status.onLoadMoreBegin = () => {
            self.getChatData({
                periodicalid: self.historyId,
                direct: 'up'
            })
        }
        this.getChatData({
            periodicalid: this.historyId
        })

        // 收到推送的消息
        store.socket.chat = data => {
            if (data.vipStatus == 1) {
                this.container.prepend(this.createItem(socketDataMap(data)))
            }
        }
    }
}
</script>
