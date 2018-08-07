<template>
    <div>
        <div id="live">
            <div class="chat"></div>
            <div class="none" v-show="none">没有数据了</div>
        </div>
    </div>
</template>
<script>
var error = require('m/lib/errorCode.js')
var parseFaceCode = function(content) {
    return content.replace(/\[face=([a-z]+)\]/g, '<img src="/public/icons/face/$1.gif" />')
}


export default {
    data() {
            return {
                container: null,
                lastTime: null,
                none: false
            }
        },

        methods: {
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
                this.$router.push({
                    path: url
                })
            },
            createItem: function(item) {
                var isMine = item.userid == +ynUserId
                var belong = isMine ? 'my-chat' : 'other-chat'
                var direct = isMine ? 'right' : 'left';
                item.content = parseFaceCode(item.content);
                item.photoImg = item.photoImg || '/public/images/yn.jpg'

                //时间标签如果和上次的相同的则不需要创建
                var need = item.ctimeString != this.lastTime
                var time = need ? `<div class="chat-time">${item.ctimeString}</div>` : ''
                this.lastTime = item.ctimeString;

                var reply = ''
                if (item.isReply) {
                    reply = `<div class="reply">
                                    <span class="name">@${item.replyName}</span>
                                    <span>${item.replyContent}</span>
                             </div>`
                }

                return `${time}<div class="chat-list ${belong}" v-for="item in myChat">
                        <div class="img float"><img src="${item.photoImg}"></div>
                        <div class="relative answer float">
                            <div class="chat-title">${item.nickName}</div>
                            <div class="chat-con">
                                <i class="indicate fa fa-caret-${direct}"></i>
                                <div class="float">
                                    <div class="chat-content">
                                        ${item.content}${reply}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
            },

            getData(callback) {
                $.getJSON('/app/vipInteraction.htm', {
                    myInteraction: 1,
                    limit: 60
                }, back => {

                    // 错误
                    if (back.status != 1) {
                        return layer.alert(error[back.status])
                    }

                    // 没有数据
                    if (back.data.length < 1) {
                        this.none = true;
                        return
                    }

                    //展开回复数据
                    var all = []
                    back.data.forEach(item => {
                        all.push(item)
                        item.timestamp = new Date(item.ctime).getTime() // 保存时间戳

                        if (item.replyList && item.replyList.length > 0) {

                            // 添加回复内容
                            item.replyList.map(sub => {
                                sub.isReply = true
                                sub.replyName = item.nickName
                                sub.replyContent = item.content
                                sub.timestamp = new Date(sub.ctime).getTime()
                                all.push(sub)
                                return sub;
                            })
                        }
                    })

                    // 按照时间排序
                    all.sort((a, b) => a.timestamp - b.timestamp)
                    callback(all)

                })
            },
            update() {
                this.getData(data => {
                    this.container.append(data.map(item => this.createItem(item)).join(""))
                })
            }
        },
        mounted() {
            var self = this;
            this.container = $('#live .chat')
            this.update()

            this.container.on('click', '.chat-content img', function() {
                var src = $(this).attr('src')
                if (/icons\/face/.test(src)) return;
                self.zoomImage(src)
            })

            // 收到推送的消息
            store.socket.chat = data => {
                if (+data.vipStatus == 2 && data.user_id == +ynUserId) {
                    this.update()
                }
            }
        }
}
</script>
