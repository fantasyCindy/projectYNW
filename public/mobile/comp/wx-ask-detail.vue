<template>
    <div id="wx-askDetail">
        <div class="askDetail-wrap">
            <div class="wx-ask-title">
                <span class="wx-ask-title-icon">问</span>
                <span class="wx-ask-title-txt">{{detailData.questionInfo.questioncontent}}</span>
            </div>
            <div class="ask-msg">
                <div class="answer-count fl"><span>{{detailData.answerCount}}</span>个回答</div>
                <div class="date">{{detailData.questionInfo.questiontime}}</div>
            </div>
            <div class="answer" v-for="an in detailData.answerArray">
                <div class="wx-title">
                    <i class="wx-title-icon"></i>
                    <span class="wx-title-txt">以下为投顾回答</span>
                </div>
                <div class="opinion-msg">
                    <div class="t-photo fl"><img :src="an.answerUser.photo"></div>
                    <div class="t-name fl">{{an.answerusername}}</div>
                    <div class="date fr">{{an.ansertimeStr}}</div>
                </div>
                <div class="answer-detail">{{an.answerContentStr}}</div>
            </div>
        </div>
        <div id="warn">
            <p>风险提示：以上内容仅代表个人观点，不构成投资建议</p>
            <p>股市有风险，投资需谨慎</p>
        </div>
        <div class="ask-too" @click="ask"><i class="fa fa-question-circle"></i>我也要问</div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                detailData: store.detailData
            }
        },
        methods: {
            ask() {
                if (__userId) {
                    this.$router.push('/question')
                } else {
                    window.location.href = "/gzh/toLogin.htm";
                }
            }
        }
}
</script>
