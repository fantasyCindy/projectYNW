<template>
    <div id="asking_box" class="bt20">
        <div class="none" v-show="answerData.length < 1">
            <div class="none-text">暂无问股消息</div>
        </div>
        <div class="wrap_list" v-for="item in answerData" :key="item.id" @click="++visible">
            <div class="quesition_list">
                <span class="ques_icon">问</span>{{item._questioncontent}}
            </div>
            <div class="ask_list">
                <span class="ask_icon">答</span>{{item._answercontentStr}}
            </div>
            <div class="teacher clear">
                <div class="teacher-photo"><img :src="teacherMessage.photo_path" alt="">{{teacherMessage._title}}</div>
                <div class="time">{{item._time}}</div>
            </div>
        </div>
        <Download :visible="visible"></Download>
    </div>
</template>
<script>
import Download from '../common/download';
import {mapState} from 'vuex'
export default {
    components: {
        Download
    },
    data() {
        return {
            visible: 0,
            teacherid: '',
            teacherMessage: {}
        }
    },
    computed:{
        ...mapState({
            answerData: state => state.askList
        })
    },
    props: {
        teacherDetail: {}
    },
    watch: {
        teacherDetail() {
            this.teacherMessage = this.teacherDetail
        }
    },
    create() {
        this.teacherid = this.$route.query.teacherid;
    }
}
</script>
<style scoped>
#asking_box .wrap_list {
    padding: 15px;
    border-bottom: 1px dashed #cccccc;
}

#asking_box .wrap_list:active {
    background: rgba(0, 0, 0, .05) !important;
}

#asking_box .wrap_list:last-child {
    border: none;
    margin-bottom: 0;
}

#asking_box .wrap_list .ques_icon,
#asking_box .wrap_list .ask_icon {
    display: inline-block;
    width: .48rem;
    height: .48rem;
    border-radius: 50%;
    position: relative;
    font-size: 12px;
    text-align: center;
    line-height: .48rem;
    color: #fff;
    margin-right: 0.2rem;
}

#asking_box .wrap_list .ques_icon {
    background: #25a9ff;
}

#asking_box .wrap_list .ask_icon {
    background: #d72621;
}

#asking_box .wrap_list .quesition_list,
#asking_box .wrap_list .ask_list {
    line-height: .587rem;
}

#asking_box .wrap_list .quesition_list {
    color: #333333;
    margin-bottom: .267rem;
    font-size: .373rem;
}

#asking_box .wrap_list .ask_list {
    color: #666666;
    font-size: .373rem;
}

.none {
    width: 4.907rem;
    height: 2.32rem;
    background: url(/public/wap/images/none-ask.png) no-repeat center;
    background-size: 4.907rem 2.32rem;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding-top: 5.8rem;
}

.none-text {
    color: #999;
}

.teacher-photo {}

#asking_box .teacher {
    margin-top: 0.267rem;
    color: #666;
}

#asking_box .teacher-photo {
    float: left;
}

#asking_box .teacher-photo img {
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
    position: relative;
    top: 0.13rem;
    margin-right: 0.1rem;
}

#asking_box .time {
    float: right;
    position: relative;
    top: 0.267rem;
}
</style>
