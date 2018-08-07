<template>
    <div>
        <div id="live-info">
            <div class="photo"><img :src="teacherDetail.photo_path"></div>
            <p class="nickname">{{teacherDetail._title}}</p>
            <div class="instrument">
                <span>{{teacherDetail.popularity_number}}<br>粉丝数</span>
                <span>{{teacherDetail.answerCount}}<br>回答</span>
                <span>{{teacherDetail._influential}}<br>日志浏览</span>
            </div>
            <div class="intro">
                <span>简介：{{teacherDetail._description}}</span>
                <router-link :to="{path:'/center/detail',query:{teacherid:teacherid}}">
                    <a class="icon fa fa-angle-right"></a>
                </router-link>
            </div>
            <div class="advantage">
                擅长领域：<span v-for="special in teacherDetail._specialtys" :key="special.id">{{special.name}}</span>
            </div>
        </div>
        <div id="live-tag">
            <span class="live-tag-nav" :class="{select:selectType == 1}" @click="selectTab(1)">观点</span>
            <span class="live-tag-nav" :class="{select:selectType == 2}" @click="selectTab(2)">问股</span>
        </div>
        <OpinionList v-show="selectType == 1"></OpinionList>
        <AskList v-show="selectType == 2" :teacherDetail="teacherDetail"></AskList>
        <Footer></Footer>
        <toTop v-show="topShow"></toTop>
    </div>
</template>
<script>
import {
    getTeacherView,
    getTeacherAnswer,
    getTeacherDetail
} from '../../api';
import OpinionList from "../opinion/opinionList"
import AskList from "../ask/askList";
import {mapState} from "vuex"
import Footer from "../common/Footer"
import toTop from "../common/toTop";
export default {
    components: {
        OpinionList,
        AskList,
        Footer,
        toTop
    },
    data() {
        return {
            specialtys: [],
            opinionData: [],
            selectType: 1,
            answerData: [],
            teacherid: '',
            teacherData: {},
            page:20
        }
    },
    computed:{
        ...mapState({
            teacherDetail: state => state.teacherDetail,
            askList: state => state.askList,
            topShow: state => state.toTopShow
        })
    },
    methods: {
        selectTab(type) {
            this.selectType = type == 1 ? 1 : 2
        },
    },
    created: async function() {
        this.$store.commit({
            type: 'set',
            path: 'opinionList',
            reducer: []
        })
        this.teacherid = this.$route.query.teacherid;

    },
    mounted() {
        this.$store.dispatch('getTeacherDetail',this.teacherid)
        this.$store.dispatch('getTeacherAskList',{teacherid:this.teacherid,pageSize:this.page})
        this.$store.dispatch('getTeacherOpinion',{teacherId:this.teacherid,pageSize:this.page})
    }
}
</script>
<style>
#live-info {
    background: #cf140e url(/public/wap/images/live_bg3.jpg) no-repeat bottom center;
    background-size: 100%;
    height: 5.747rem;
    position: relative;
    padding-top: .533rem;
    overflow: hidden;
    margin-top: 1.2rem;
}

#live-info .photo {
    border: 1px solid #fff;
    width: 1.787rem;
    height: 1.787rem;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

#live-info .photo img {
    width: 100%;
    height: 100%;
}

#live-info .nickname {
    text-align: center;
    color: #fff;
    font-size: .453rem;
    margin-top: .267rem;
}

#live-info .instrument {
    text-align: center;
    color: #fff;
    margin-top: .4rem;
    font-size: .373rem;
}

#live-info .instrument span {
    display: inline-block;
    width: 30%;
    line-height: .5rem;
    border-right: 1px solid #efefef4a;
}

#live-info .instrument span:last-child {
    border: none;
}

#live-info .intro {
    color: #fff;
    width: 9rem;
    margin-top: .45rem;
    font-size: .32rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

#live-info .intro span {
    display: inline-block;
    width: 8.5rem;
    font-size: .32rem;
    line-height: .4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#live-info .advantage {
    color: #fff;
    width: 9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: .213rem;
    font-size: .32rem;
    line-height: .56rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left: -0.08rem;
}

#live-info .advantage span {
    display: inline-block;
    padding: 0 .107rem;
    line-height: .56rem;
    background: rgba(0, 0, 0, .2);
    border-radius: 5px;
    margin: 0 .08rem;
}

#live-info .intro .icon {
    color: #fff;
    font-size: .48rem;
    position: absolute;
    top: -3px;
    right: 0;
}

#live-tag {
    text-align: center;
    border-bottom: 1px solid #efefef;
}

.live-tag-nav {
    display: inline-block;
    width: 1rem;
    padding: 0.38rem 0;
    margin: 0 0.5rem;
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    font-size: .36rem;
    color: #666;
}

.live-tag-nav.select {
    color: #e95b4e;
    border-bottom: 2px solid #e95b4e;
}
</style>
