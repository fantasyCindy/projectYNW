<template>
    <div class="page-meeting">
        <Nav></Nav>
        <div class="meeting-container">
            <div class="meeting-list" v-for="(item, index) in topicListData" :key="item.id">
                <a :href="item._link">
                    <div class="meeting-title" :class="{first:index == 0}">{{item.topic_title}}</div>
                    <div class="meeting-desc">{{item.topic_content}}</div>
                    <div class="meeting-time">{{item.create_time}}</div>
                    <div class="meeting-msg clear">
                        <div class="metting-guest-title">参与嘉宾:
                            <span class="guest-none" v-show="item._teacherList.length<1">暂无</span></div>
                        <div class="meeting-guests">
                            <div class="meeting-guest-wrap" v-for="item in item._teacherList" :key="item.teacherid">
                                <div class="meeting-guest-photo">
                                    <img :src="item.photo_path" alt="item.nickname">
                                </div>
                                <i class="teacher-icon"><img :src="item.type_ioc" alt=""></i>
                            </div>
                        </div>
                        <div class="meeting-disscuss">投顾讨论：{{item.commentCount}}<span v-show="!item.commentCount">0</span></div>
                    </div>
                </a>
            </div>
        </div>
        <Load @loading="loadMoreItems" :visible="shouldMore" v-show="LoadMore"></Load>
        <Footer></Footer>
        <toTop v-show="topShow"></toTop>
    </div>
</template>
<script>
import Nav from "../common/nav";
import Footer from "../common/Footer";
import {
    topicList
} from "../../api";
import {
    mapState
} from "vuex"
import Load from "../common/loadMore"
import toTop from "../common/toTop";
export default {
    components: {
        Nav,
        Footer,
        Load,
        toTop
    },
    data() {
        return {
            page: 10,
            cur: 1
        }
    },
    computed: {
        ...mapState({
            topicListData: state => state.meeting.topicListData,
            shouldMore: state => state.meeting.shouldLoadMoreMeeting,
            LoadMore: state => state.meeting.LoadMore,
            topShow: state => state.toTopShow
        })
    },
    methods: {
        loadMoreItems() {
            this.$store.dispatch('getTopicList', {
                currentPage: ++this.cur,
                pageSize: this.page
            })
        }
    },
    mounted() {
        this.$store.commit({
            type: 'set',
            path: 'activeNav',
            reducer: 3
        })
        this.$store.dispatch('getTopicList', {
            pageSize: this.page
        })
    }
}
</script>
<style scoped>
.page-meeting {
    width: 10rem;
    margin: 0 auto;
}

.meeting-container {
    background: #f5f5f5;
}

.meeting-list {
    width: 9rem;
    padding: 0.3rem 0.5rem;
    background: #fff;
    margin-top: 0.4rem;
    font-size: 0.38rem;
    line-height: 0.55rem;
    border-top: 1px solid #f5f5f5;
    white-space: normal;
    word-wrap: break-word;
}

.meeting-list:active {
    background: rgba(0, 0, 0, .05) !important;
}

.meeting-list:first {
    margin-top: 0;
}

.meeting-desc {
    font-size: .36rem;
    line-height: .533rem;
    color: #666;
}

.meeting-time {
    color: #999999;
    border-bottom: 1px dashed #f1f1f1;
    padding: .1rem 0;
    font-size: .32rem;
}

.meeting-title {
    background: url(../../images/icon-topic.png) no-repeat;
    background-size: 0.507rem .44rem;
    padding-left: 0.6rem;
    background-position: 0 .05rem;
    margin-bottom: 0.2rem;
}

.meeting-title.first {
    background: url(../../images/icon-yuanzhuo.jpg) no-repeat;
    background-size: 0.507rem .44rem;
    padding-left: 0.6rem;
    background-position: 0 .05rem;
    margin-bottom: 0.2rem;
}

.meeting-msg {
    font-size: .32rem;
    height: .867rem;
    line-height: .867rem;
    margin-top: 0.2rem;
}

.meeting-guests {
    color: #999999;
    display: inline-block;
    vertical-align: middle;
}

.meeting-guest-wrap {
    display: inline-block;
    position: relative;
    margin: 0 0.1rem;
}

.metting-guest-title {
    display: inline-block;
    position: relative;
    top: -0.08rem;
    color: #999999;
}

.meeting-guest-wrap img {
    width: 100%;
}

.meeting-guest-photo {
    width: .867rem;
    height: .867rem;
    overflow: hidden;
    border-radius: 50%;
}

.teacher-icon {
    display: inline-block;
    width: .267rem;
    position: absolute;
    bottom: 0;
    right: 0;
    line-height: 0;
}

.meeting-disscuss {
    display: inline-block;
    float: right;
    color: #d52720;
}

.guest-none {
    display: inline-block;
    margin-top: 0.1rem;
}
</style>
