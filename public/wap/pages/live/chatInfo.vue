<template>
    <div class="page-chatInfo">
        <div class="none" v-show="chatData.length < 1">
            <div class="none-text">暂无互动</div>
        </div>
        <div class="liveInfo-list" v-for="item in chatData" :key="item.id" v-show="chatData.length >= 1">
            <div class="liveInfo-line1">
                <span class="inline photo"><img :src="item._photo" alt=""></span>
                <span class="inline name">{{item.nickName}}</span><span class="inline time">{{item._time}}</span>
            </div>
            <div class="liveInfo-line2"><i class="replyIcon fa fa-caret-left"></i><span v-html="item.content"></span>
                <div class="reply" v-show="item._replyList" v-for="items in item._replyList">
                    <div class="reply-user">@{{items.nickName}}</div>
                    <div class="reply-content" v-html="items.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    data() {
            return {
            }
        },
        computed: {
            ...mapState({
                chatData: state => state.chat.chatData,
                pid: state => state.pid
            }),
        },
        methods: {
            getMore() {
                if (this.chatData == '') return
                this.sinceId = this.chatData[this.chatData.length - 1].id
                this.$store.dispatch('getChatInfo', {
                    periodicalid: this.pid,
                    id: this.sinceId
                })
            },
            loadMoreItem() {
                this.getMore()
            },
        }
}
</script>
<style scoped>
html {
    background: #f5f5f5 !important;
}

.inline {
    display: inline-block;
}

.page-chatInfo {
    padding: 0.5rem 0.5rem 0 0.5rem;
    overflow: auto;
    background: #f5f5f5;
}

.liveInfo-list {
    margin-bottom: 0.5rem;
}

.liveInfo-list:first {
    margin-top: 0;
}

.photo {
    width: .827rem;
    height: .827rem;
    border-radius: 50%;
    overflow: hidden;
}

.photo img {
    width:100%;
    height: 100%;
}

.name {
    position: relative;
    top: -0.3rem;
    left: 0.25rem;
    font-size: 0.31rem;
    color: #666;
    margin-right: 0.3rem;
}

.time {
    position: relative;
    top: -0.3rem;
    left: 0.25rem;
    font-size: 0.28rem;
    color: #666;
}

.liveInfo-line2 {
    display: inline-block;
    max-width: 6rem;
    color: #333;
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
    margin-left: 1.2rem;
    font-size: 0.33rem;
    line-height: 0.5rem;
    background: #fff;
    border-radius: .107rem;
    white-space: normal;
    word-wrap: break-word;
}

.reply {
    padding: 0.2rem;
    background: #f5f5f5;
    margin: 0.1rem 0;
}

.reply-user {
    color: #038de9;
}

.replyIcon {
    color: #fff;
    position: relative;
    left: -0.4rem;
    top: -0.1rem;
    font-size: 0.4rem;
}
.none {
    width: 4.907rem;
    height: 2.32rem;
    background: url(../../images/none-chat.png) no-repeat center;
    background-size: 4.907rem 2.32rem;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding-top: 5.8rem;
}

.none-text {
    color: #999;
}

</style>
