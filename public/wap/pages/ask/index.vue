<template>
    <div class="page-ask">
        <Nav></Nav>
        <div id="ask_stock" class="wrap_box">
            <div class="ask_stock_wrap">
                <textarea name="" id="textarea" cols="30" rows="10" placeholder="请用简洁的语言描述你的问题" v-model="question" v-on:focus="onFocus"></textarea>
                <span class="word"><span class="wordCount" v-text="wordCount"></span>/200</span>
                <div class="askCount">您今天还有<span class="count">{{canAsk}}</span>次提问机会</div>
                <div class="ask_stock_btn" @click="submit">提交</div>
            </div>
            <div class="ask-done" v-show="askWindow">
                <div class="ask-done-wrap">
                    <div class="ask-done-close" @click="close"></div>
                    <div class="ask-done-content">
                        <div class="ask-done-logo"><img src="/public/wap/images/icon-logo.png" alt=""></div>
                        <div class="ask-success">
                            <div class="ask-done-text icon" v-show="still">今天提问次数已达上限！</div>
                            <div class="ask-done-text icon" v-show="askSuccess"><i class="success-icon"></i>提问成功!</div>
                            <div class="ask-done-text">下载约投顾app查看投顾回复</div>
                        </div>
                        <div class="ask-done-download"><a href="http://www.yuetougu.com/app/returnAppJsp.htm">立即下载</a></div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Nav from "../common/nav";
import Footer from "../common/Footer"
import * as fn from '@wap/fn'
import {
    Toast
} from 'vant';
import {
    mapState
} from 'vuex';

export default {
    components: {
        Nav,
        Footer
    },
    data() {
        return {
            active: 2,
            question: '',
            wordCount: 200,
            toplimit: 3,
            still: false,
            count: 3,
            wordLimit:200
        };
    },
    computed: {
        ...mapState({
            askSuccess: state => state.askSuccess,
            askWindow: state => state.askWindow,
            canAsk: state => state.canAsk
        })
    },
    watch:{
        question(val){
            const len = val.length
            if(len <= this.wordLimit){
                this.wordCount = this.wordLimit - len
            }else{
                this.wordCount = 0
                this.question = val.substr(0,200)
                return Toast.fail('提问最多200字')
            }
        }
    },
    methods: {
        onFocus() {
            if (!ynIsLogin) {
                localStorage['route-path'] = this.$route.path
                this.$router.push('/Login')
                return
            }
        },
        submit() {
            if (!ynIsLogin) {
                localStorage['route-path'] = this.$route.path
                this.$router.push('/Login')
                return
            }
            var content = this.question.trim()
            if (!content) return Toast.fail('请输入您的问题')
            if (content.length > 200) return Toast.fail('提问最多200字')
            if (fn.isEmojiCharacter(content)) return Toast.fail('暂不支持手机键盘表情输入')
            if (this.canAsk <= 0) { //提问次数达上限
                this.$store.commit({
                    type: 'set',
                    path: 'askWindow',
                    reducer: true
                })
                this.$store.commit({
                    type: 'set',
                    path: 'askSuccess',
                    reducer: false
                })
                this.still = true
                this.question = '';
                this.wordCount = 200;
                return
            }
            this.$store.dispatch('askStock', {
                questionuserid: ynUserId,
                questioncontent: this.question
            })
            this.question = '';
            this.wordCount = 200;
        },
        close() {
            this.$store.commit({
                type: 'set',
                path: 'askWindow',
                reducer: false
            })
        }
    },
    mounted() {
        this.$store.commit({
            type: 'set',
            path: 'activeNav',
            reducer: 1
        })
        if (ynIsLogin) {
            this.$store.dispatch('getAskCount')
        }
    }
}
</script>
<style>
#ask_stock {
    background: #fff;
    margin-top: 0.2rem;
}

.ask_stock_wrap {
    width: 9.3rem;
    min-height: 11.8rem;
    margin: 0.3rem auto;
    padding-top: 0.5rem;
    border-top: 1px solid #f5f5f5;
}

#textarea {
    width: 8.9rem;
    border: 1px solid #f5f5f5;
    padding: 0.2rem;
    font-size: 0.35rem;
    line-height: 0.55rem;
}

#ask_stock .ask_stock_btn {
    color: #fff;
    background: #ea2827;
    border-radius: 4px;
    text-align: center;
    margin: 0.2rem auto;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.4rem;
}

.word {
    display: inline-block;
    float: right;
    position: relative;
    top: -0.5rem;
    right: 0.2rem;
    color: #b3b1b1;
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

.ask-done {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: fixed;
    top: 0;
    left: 0;
}

.ask-done-logo {
    width: 3.44rem;
    height: 2.027rem;
    margin: 0 auto 0.3rem auto;
}

.ask-done-logo img {
    width: 100%;
}

.ask-done-wrap {
    width: 6.24rem;
    height: 7.08rem;
    background: url(/public/wap/images/window_bg.jpg) no-repeat center;
    background-size: 6.24rem 7.08rem;
    margin: 4rem auto;
    position: relative;
}

.ask-done-close {
    width: .347rem;
    height: .347rem;
    background: url(/public/wap/images/icon-close.png) no-repeat center;
    background-size: .347rem;
    position: absolute;
    right: 0.3rem;
    top: 0.28rem;
}

.ask-done-content {
    width: 80%;
    margin: 0 auto;
    font-size: .38rem;
    text-align: center;
    padding-top: 1.5rem;
}

.ask-done-text {
    line-height: 0.6rem;
    font-size: 0.36rem;
}

.ask-done-download a {
    display: block;
    width: 3.533rem;
    height: .92rem;
    line-height: .92rem;
    font-size: .38rem;
    background: #d52720;
    color: #fff;
    text-align: center;
    margin: 0.4rem auto;
}

.success-icon {
    display: inline-block;
    width: .373rem;
    height: .373rem;
    background: url(../../images/success.jpg) no-repeat;
    background-size: .373rem;
    position: relative;
    top: 0.05rem;
    right: 0.15rem;
}

.askCount {
    margin-top: 0.2rem;
    font-size: 0.33rem;
    color: #918f8f;
}

.count {
    color: red;
}
</style>
