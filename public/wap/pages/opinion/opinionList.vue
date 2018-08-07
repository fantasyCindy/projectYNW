<template>
    <div class="opinion-container">
        <div class="none" v-show="opinionList.length < 1">
            <div class="none-text">暂无观点</div>
        </div>
        <div class="opinion-list" v-for="item in opinionList" :key="item.article_id">
            <a :href="item._link">
                <div class="opinion-list-head">
                    <div class="opinion-list-photo item"><img :src="item._src" /></div>
                    <div class="opinion-list-msg item">
                        <div class="opinion-list-name">{{item._createrName}}<i class="teacher-icon"><img :src="item.type_ioc"></i></div>
                        <div class="opinion-list-time">{{item._time}}</div>
                    </div>
                    <span class="opinion-list-type">{{item.classifyName}}</span>
                </div>
                <div class="opinion-list-title">{{item._title}}</div>
                <div class="opinion-list-content">{{item._opinionShortContent}}</div>
            </a>
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
                opinionData: []
            }
        },
        computed: {
            // ...mapState(['opinionList'])
            ...mapState({
                opinionList: state => state.opinion.opinionList
            })
        },

}
</script>
<style scoped>
img {
    width: 100%;
}

.page-opinion {
    width: 10rem;
    margin: 0 auto;
}

.opinion-list {
    width: 9rem;
    padding: 0.3rem 0.5rem;
    background: #fff;
    font-size: 0.38rem;
    line-height: 0.55rem;
    border-top: 1px solid #f5f5f5;
    margin: 0 auto;
    white-space: normal;
    word-wrap: break-word;
}

.opinion-list:active {
    background: rgba(0, 0, 0, .05) !important;
}

.opinion-list-head {
    position: relative;
}

.opinion-list-head .item {
    display: inline-block;
}

.opinion-list-photo {
    width: .867rem;
    height: .867rem;
    overflow: hidden;
    border-radius: 50%;
}

.opinion-list-msg {
    width: 5rem;
    font-size: .32rem;
}

.opinion-list-time {
    color: #999999;
}

.teacher-icon {
    display: inline-block;
    width: .267rem;
    position: relative;
    top: 0.01rem;
    left: 0.1rem;
}

.opinion-list-type {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    padding: 0.03rem 0.2rem;
    font-size: 0.3rem;
    background: #f14a3d;
    color: #fff;
    border-radius: 2px;
    box-shadow: -1px 0px 1px 0px #eb5448;
    text-align: center;
}

.opinion-list-title {
    font-size: 0.38rem;
    margin: 0.2rem auto;
}

.opinion-list-content {
    font-size: 0.35rem;
    color: #999999;
    line-height: 0.46rem;
}

.none {
    width: 4.907rem;
    height: 2.32rem;
    background: url(/public/wap/images/none-opinion.png) no-repeat center;
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
