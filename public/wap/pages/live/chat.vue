<template>
    <div class="chat" :isHistory="ishistory">
        <div class="display-content" v-if="chatContent.length>0"><span v-html="chatContent"></span><span class="wordCount">还能输入
            <span v-text="chatWordCount"></span>字
            </span><i class="chatIcon fa fa-caret-down"></i></div>
        <input class="chat-input" type="text" placeholder="聊聊你的想法(不超过200字)" v-model="chatContent" v-on:focus="onFocus">
        <span class="chat-send" @click="sendChat()">发送</span>
    </div>
</template>
<script>
import {
    Toast
} from 'vant';
import {
    mapState
} from 'vuex'
import * as fn from '@wap/fn'
var socketOpen = 0

export default {
    data() {
            return {
                chatContent: '',
                ishistory: '',
                chatWordCount: 200,
                limit: 200
            }
        },
        computed: {
            ...mapState({
                pid: state => state.pid,
                socketOpen: state => state.socketOpen,
                chatSuccess: state => state.chat.chatSuccess
            })
        },
        props: {
            isHistory: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            pid() {
                this.$store.dispatch('socket', this.pid)
            },
            isHistory() {
                this.history = this.isHistory
            },
            chatSuccess(val) {
                this.chatContent = ''
            },
            chatContent(val) {
                const len = this.chatContent.length
                if (len <= this.limit) {
                    this.chatWordCount = this.limit - len
                } else {
                    this.chatWordCount = 0
                    this.chatContent = this.chatContent.substr(0, 200)
                    return Toast.fail('超过字数限制')
                }
            }
        },
        methods: {
            sendChat: async function() {
                if (!this.pid || this.history) {
                    this.chatContent = ''
                    return Toast('直播尚未开启，无法互动')
                }
                if (!ynIsLogin) {
                    this.$store.dispatch('jumpLogin')
                    return
                }
                var content = this.chatContent.trim()
                if (!content) return Toast.fail('请输入你要说的话')
                if (content.length > 200) {
                    content = content.substr(0, 200)
                    return Toast.fail('超过字数限制')
                }
                if (fn.isEmojiCharacter(content)) return Toast.fail('暂不支持手机键盘表情输入')
                var params = {
                    content: content,
                    prId: this.pid
                }
                this.$store.dispatch('sendChat', params)
            },
            onFocus: function() {
                if (this.history) {
                    return Toast('直播尚未开启，无法互动')
                }
                if (!ynIsLogin) {
                    this.$store.dispatch('jumpLogin')
                    return
                }
            }
        }
}
</script>
<style scoped>
.chat {
    width: 9rem;
    padding: 0.3rem 0.5rem;
    background: #f0f0f0;
    position: fixed;
    bottom: 0;
}

.chat-input {
    width: 6.7rem;
    height: 0.9rem;
    padding-left: 0.4rem;
    font-size: 0.35rem;
}

.chat-send {
    display: inline-block;
    width: 1.427rem;
    height: .907rem;
    line-height: .9rem;
    background: url(/public/wap/images/icon-send.png) no-repeat;
    background-size: 1.427rem 0.907rem;
    color: #fff;
    text-align: center;
    float: right;
    position: relative;
    top: 0.05rem;
}

::-webkit-input-placeholder {
    /*Chrome/Safari*/
    color: #b3b1b1;
}

::-moz-placeholder {
    /*Firefox*/
    color: #b3b1b1;
}

::-ms-input-placeholder {
    /*IE*/
    color: #b3b1b1;
}

.display-content {
    position: relative;
    padding: 0.3rem;
    white-space: normal;
    word-wrap: break-word;
    background: #fff;
    line-height: 0.5rem;
    border-radius: 5px;
    padding-bottom: 0.7rem;
    margin-bottom: 0.3rem;
}

.wordCount {
    display: block;
    position: absolute;
    bottom: 0.1rem;
    right: 0.15rem;
    color: #a4a4a4;
}

.chatIcon {
    color: #fff;
    position: absolute;
    left: 0.5rem;
    bottom: -0.32rem;
    font-size: 0.5rem;
}
</style>
