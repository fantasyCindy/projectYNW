<template>
    <div class="page-liveroom">
        <div class="liveroom-top">
            <div class="liveroom-top-line1">
                <router-link :to="{path:'/center',query:{teacherid:teacherid}}"><span class="liveroom-photo"><img :src="data.photo_path" alt=""></span>
                    <i class="new_live_teacherIcon"><img :src="data.type_ioc" alt=""></i>
                    <span class="liveroom-name">{{data._title}}</span></router-link>
                <div class="new_live_btn" v-show="!data._isAttention" @click="care(data)"><i class="care-icon"></i>关注</div>
                <div class="new_live_btn cancel" v-show="data._isAttention" @click="care(data)"><i class="care-icon"></i>取消关注</div>
            </div>
            <div class="liveroom-top-line2">
                <span class="inline liveroom-tab tab-live" :class="{select:chatSelect == 1}" @click="liveTab(1)">直播</span>
                <span class="inline liveroom-tab tab-chat" :class="{select:chatSelect == 2}" @click="liveTab(2)">互动交流</span>
                <span class="inline liveroom-count">累计{{teacherDetail.popularity}}人参与</span>
            </div>
        </div>
        <div class="liveroom-btop" v-show="topInfoData.id">
            <span class="btop-text inline" v-text="topInfoData.shortContent"></span>
            <span class="btop-arrow-down inline" :class="{up:isOpen}" @click="showTopDetail(topInfoData)"></span>
        </div>
        <chatInfo></chatInfo>
        <Load :visible="shouldMore" @loading="loadMoreItems" v-show="LoadMore"></Load>
        <chat :isHistory="isHistory"></chat>
    </div>
</template>
<script>
/*表情转换*/
const titleToName = key => {
        var _key = key.replace(/[\[\]]/g, '')
        return dics[_key] ? dics[_key] : "";
    }
    /*处理推送信息*/
const mapPushKey = item => {
    item.photoImg_path = item.photo
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var day = myDate.getDate(); //获取当前日(1-31)   //获取当前日期
    var month = myDate.getMonth() + 1
    if (String(month).length == 1) {
        month = '0' + month
    }
    if (String(day).length == 1) {
        day = '0' + day
    }
    item._time = year + '-' + month + '-' + day + ' ' + item.showTimeStr
        // 解析表情符
    item.content = item.content.replace(/\[.+?\]/g, match => {
        var name = titleToName(match)
        if (!name) return match;
        var src = `/public/module/qqface/png/${name}@2x.png`
        return `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" >`

    })
    if (item.parentId) {
        const name = item.content.replace(/【回复:(.+)】(.+)/g, `$1`)
        const replyContent = item.content.replace(/【回复:(.+)】(.+)/g, `$2`)
        item.content = replyContent
        item.replyList = [{
            nickName: name,
            content: ''
        }]
    }
    return item
}
import chatInfo from "./chatInfo";
import Load from '../common/loadMore'
import chat from "./chat";
import findIndex from 'lodash/findIndex'
import {
    dics
} from '../../faceCode';
import {
    mapState
} from 'vuex';
import {
    Toast
} from 'vant';
import {
    getPeriodicalid
} from '../../api'
export default {
    components: {
        chatInfo,
        chat,
        Load
    },
    data() {
        return {
            select: 2,
            teacherid: this.$route.params.teacherid,
            chatInfoData: [],
            isOpen: false,
            sinceId: '',
            data: {},
            isHistory: false
        }
    },
    computed: {
        ...mapState({
            shouldMore: state => state.chat.shouldLoadMoreLive,
            LoadMore: state => state.chat.LoadMore,
            chatData: state => state.chat.chatData,
            chatpush: state => state.chatPush,
            pid: state => state.pid,
            topInfoData: state => state.chat.topData,
            chatSelect: state => state.chat.chatSelect,
            teacherByIdUpdate: state => state.live.teacherByIdUpdate,
            teacherDetail: state => state.teacherDetail
        }),
    },
    watch: {
        chatpush(val) {
            const has = findIndex(this.chatData, item => item.id == val.id) >= 0;
            if (has) return;
            this.$store.dispatch('getChatInfo', {
                    params: {
                        pageSize: 1,
                        periodicalid: this.pid,
                        id: ''
                    },
                    push: true
                })
                // this.chatData.unshift(mapPushKey(val))
        },
        teacherByIdUpdate(val) {
            this.data = this.$store.state.live.teachersById[this.teacherid]
        }
    },
    methods: {
        liveTab(type) {
            if (type == 1) {
                this.$router.push('/live/room/' + this.teacherid)
            } else {
                this.$router.push('/live/chatroom/' + this.teacherid)
            }
        },
        showTopDetail(item) { //有牛股展开收起
            if (!this.isOpen) {
                this.topInfoData.shortContent = item.content
                this.isOpen = true
            } else {
                this.topInfoData.shortContent = item.content.substr(0, 18)
                this.isOpen = false
            }
        },
        care: async function(item) {
            if (!ynIsLogin) {
                this.$store.dispatch('jumpLogin')
                return
            }
            this.$store.dispatch('careTeacher', item)
        },
        loadMoreItems() {
            this.sinceId = this.chatData[this.chatData.length - 1].id
            this.$store.dispatch('getChatMore', {
                periodicalid: this.pid,
                id: this.sinceId
            })
        },
        getTeacherPeriodical: function(params) {
            this.data = this.$store.state.live.teachersById[this.teacherid]
            getPeriodicalid(params).then(res => {
                if (res.data.periodicalid == '-1') {
                    Toast('尚未开启直播')
                    this.$store.commit({
                        type: 'set',
                        path: 'chat.LoadMore',
                        reducer: false
                    })
                    this.reset()
                    return
                }
                this.isHistory = res.data.isHistory
                this.$store.commit({
                    type: 'set',
                    path: 'pid',
                    reducer: res.data.periodicalid
                })
                this.$store.dispatch('getChatInfo', {
                    params: {
                        periodicalid: this.pid,
                        // id:''
                    },
                    push: false
                })

                this.$store.dispatch('getTopInfo', {
                    periodicalid: res.data.periodicalid
                })

                this.$store.commit({ //没开直播不显示加载更多组件
                    type: 'set',
                    path: 'chat.LoadMore',
                    reducer: true
                })

            })
        },
        reset() {
            this.$store.commit({
                type: 'set',
                path: 'chat.chatData',
                reducer: []
            })
            this.$store.commit({
                type: 'set',
                path: 'chat.topData',
                reducer: {}
            })
            this.$store.commit({
                type: 'set',
                path: 'live.liveData',
                reducer: []
            })
            this.$store.commit({
                type: 'set',
                path: 'pid',
                reducer: ''
            })
        }
    },
    mounted: async function() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.getTeacherPeriodical({
            teacherid: this.teacherid
        })
        this.$store.commit({
            type: 'set',
            path: 'chat.chatSelect',
            reducer: 2
        })
        this.$store.dispatch('getTeacherDetail', this.teacherid)
    }
}
</script>
<style scoped>
.inline {
    display: inline-block;
}

.page-liveroom {
    width: 10rem;
    margin: 0 auto;
    padding-bottom: 2rem;
    padding-top: 3.5rem;
    background: #f5f5f5;
}

.liveroom-top {
    width: 9.4rem;
    padding: 0.3rem;
    height: 1.76rem;
    background: #f14a3d;
    position: fixed;
    top: 1.2rem;
    left: 50%;
    margin-left: -5rem;
    z-index: 100;
}

.liveroom-top-line1 {
    text-align: center;
    height: 1.15rem;
    position: relative;
}

.liveroom-photo {
    display: inline-block;
    width: .827rem;
    height: .827rem;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 1rem;
}

.liveroom-name {
    display: inline-block;
    height: .827rem;
    line-height: .827rem;
    position: relative;
    top: -0.25rem;
    color: #fff;
    font-size: 0.38rem;
    left: -0.3rem;
}

.liveroom-photo img {
    height: 100%;
}

.new_live_teacherIcon {
    display: inline-block;
    display: inline-block;
    width: 0.3rem;
    position: relative;
    left: -0.45rem;
    top: 0;
}

.new_live_teacherIcon img {
    width: 100%;
}

.care-icon {
    display: inline-block;
    width: .427rem;
    height: .373rem;
    margin-right: 0.15rem;
    background: url(../../images/icon-live-care.png) no-repeat center;
    background-size: .427rem .373rem;
    position: relative;
    left: 0;
    top: 0.05rem;
}

.cancel .care-icon {
    display: inline-block;
    width: .427rem;
    height: .373rem;
    margin-right: 0.15rem;
    background: url(../../images/icon-live-cancel.png) no-repeat center;
    background-size: .427rem .373rem;
    position: relative;
    left: 0;
    top: 0.05rem;
}

.new_live_btn {
    color: #fff;
    float: right;
    font-size: 0.38rem;
    position: absolute;
    right: 0;
    top: 0.2rem;
}

.liveroom-tab {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.38rem;
    color: #fff;
}

.tab-live.select:after {
    display: inline-block;
    content: "";
    width: 0.8rem;
    height: 2px;
    background: #fff;
    position: relative;
    top: 0.44rem;
    left: -1rem;
}

.tab-chat.select:before {
    display: inline-block;
    content: "";
    width: 0.8rem;
    height: 2px;
    background: #fff;
    position: relative;
    top: 0.44rem;
    right: -1.15rem;
}

.tab-live {
    background: url(../../images/icon-live-msg.png) no-repeat;
    background-size: .48rem .4rem;
    background-position: 0 0.23rem;
    padding-left: 0.55rem;
}

.liveroom-count {
    float: right;
    font-size: 0.32rem;
    color: rgba(255, 255, 255, .8);
    position: relative;
    top: 0.28rem;
    right: 0;
}

.liveroom-btop {
    padding: 0.35rem;
    background: #fff7f6 url(../../images/icon-live-btop.png) no-repeat;
    background-size: 1.76rem .827rem;
    background-position: 0.2rem 0.25rem;
    padding-left: 2.2rem;
    font-size: 0.35rem;
    color: #666;
    border-bottom: 1px solid #f5f5f5;
}

.liveroom-btop.show {
    overflow: visible;
}

.btop-text {
    width: 6.8rem;
    line-height: 0.5rem;
}

.btop-arrow-down {
    width: .267rem;
    height: .267rem;
    background: url(../../images/icon-fold.png) no-repeat;
    background-size: .267rem;
    float: right;
    position: relative;
    top: .1rem;
    right: 0;
}

.btop-arrow-down.up {
    width: .267rem;
    height: .267rem;
    background: url(../../images/icon-unfold.png) no-repeat;
    background-size: .267rem;
    float: right;
    position: relative;
    top: .1rem;
    right: 0;
}
</style>
