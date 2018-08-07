<template>
    <div class="comp-app">
        <!-- <header-comp></header-comp> -->
        <div class="app-welfare-login">
            <div class="welfare-login-wrap">
                <div class="welfare-msg">
                    <input type="text" placeholder="请输入手机号" v-model="send.userName">
                </div>
                <div class="welfare-msg welfare-pass">
                    <!-- <input type="password" placeholder="请输入密码" v-model="send.password"><span class="welfare-by"></span> -->
                    <input v-model="send.password" type='text' v-if="!isPassword" placeholder="请输入密码" />
                    <input v-model="send.password" type='password' v-if="isPassword" placeholder="请输入密码" />
                    <span class="welfare-by"><img :src="eyeSrc" alt="" @click="isPassword = !isPassword"></span>
                </div>
            </div>
            <div class="welfare-login-btn" @click="login">登录</div>
            <router-link to="/Register">
                <div class="go-register">立即注册</div>
            </router-link>
        </div>
    </div>
</template>
<script>
import HeaderComp from "./common/Header";
import {Toast} from "vant"
import {
    Login
} from '../api';
import {
    mapState
} from 'vuex'
export default {
    components: {
        HeaderComp
    },
    data() {
        return {
            send: {
                userName: '',
                password: ''
            },
            src: '/public/wap/images/icon-eye-close.png',
            isPassword: true, //密码可见性
        }
    },
    computed: {
        passwordType() {
            return this.isPassword ? "text" : "password";
        },
        eyeSrc() {
            return this.isPassword ? '/public/wap/images/icon-eye-close.png' : '/public/wap/images/icon-eye-open.png';
        },
        ...mapState({
            loginFinish: state => state.loginFinish

        }),
    },
    watch: {
        loginFinish(val) {
            const self = this
            setTimeout(function() {
                self.jump()
            }, 1000)
        }
    },
    methods: {
        login: function() {
            if (!/^1[34578][0-9]{9}$/.test(this.send.userName)) {
                return Toast('请输入有效的手机号码')
            }
            if (!/^[a-zA-Z0-9_]{6,30}$/.test(this.send.password)) {
                return Toast('密码由字母、数字、下划线组成且至少6位')
            }
            this.$store.dispatch('login', this.send)
        },
        jump(){
            var backPath = localStorage['route-path']
            if(!backPath){
                backPath = '/live/list'
            }
            // window.location.href = base + '?' + Date.now() +'#' +backPath
            window.location.href = __path + 'mobile/m-live.htm' + '?' + Date.now() +'#' +backPath
        }
    },
    mounted() {
            
    }
}
</script>
<style scoped>
/*login*/

.comp-app {
    margin-top: 1.2rem;
}

.welfare-msg {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 15px;
}

.welfare-login-btn {
    width: 8rem;
    color: #fff;
    height: 1rem;
    color: #fff;
    border-radius: 1.25rem;
    background: #F6684E;
    line-height: 1rem;
    text-align: center;
    font-size: .37rem;
    cursor: pointer;
    margin: 0.65rem auto 0 auto;
}

.go-register {
    width: 60px;
    color: #999;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    position: relative;
    left: 13%;
    cursor: pointer;
}

.welfare-login-wrap {
    width: 10rem;
    margin: 0 auto;
    background: url(http://www.yuetougu.com/public/mobile/images/bj.png) no-repeat center;
    background-position: 0 0;
    background-size: cover;
    padding: 2.5rem 0 0.3rem 0;
}

.welfare-phoneCode {
    position: relative;
}

.welfare-phoneCode-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 37%;
    display: inline-block;
    font-size: .35rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #E85545;
    background: #fff;
    border-radius: 1.25rem;
}

.welfare-agree {
    width: 80%;
    height: 1rem;
    line-height: 1rem;
    margin: 0 auto;
    font-size: 0.3rem;
    color: #E85545;
}

.welfare-agree a {
    color: #E85545;
    text-decoration: none;
    position: relative;
    left: 3%;
}

.welfare-already {
    float: right;
    position: relative;
    right: 5%;
}

.welfare-pass {
    position: relative;
}

.welfare-by {
    width: 20px;
    height: 15px;
    position: absolute;
    right: 10px;
    top: 15px;
}

.welfare-by img {
    width: 100%;
}


/*imgCode*/

.welfare-pop {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    top: 0;
    transition: 1s all;
    z-index: 99;
}

.welfare-imgCode {
    width: 70%;
    background: #fff;
    margin: 25% auto;
    border-radius: 4px;
    padding-top: 20px;
}

.welfare-img {
    display: block;
    width: 53%;
    height: auto;
    margin: 0 auto;
    text-align: center;
}

.welfare-img img {
    width: 100%;
}

.welfare-imgCode-input input {
    width: 70%;
    height: 0.8rem;
    line-height: 0.8rem;
    display: block;
    margin: 0.5rem auto;
    border: none;
    background: #ececec;
    text-align: center;
}

.welfare-code-bar {
    border-top: 1px solid #DCDCDC;
}

.welfare-code-bar-btn {
    width: 48%;
    height: 0.8rem;
    display: inline-block;
    line-height: 0.8rem;
    text-align: center;
    color: #6A6A6A;
    border-left: 1px solid #DCDCDC;
    cursor: pointer;
    font-size: 0.34rem;
}

.welfare-code-bar-btn:first-child {
    border-left: none;
}

.welfare-msg {
    width: 8rem;
    margin: 0.5rem auto;
}

.welfare-msg input {
    width: 96%;
    height: 1rem;
    border-radius: 1.25rem;
    text-align: center;
    font-size: .37rem;
    line-height: 1rem;
    border: none;
    padding-left: 0.3rem;
    background: rgba(255, 255, 255, .8);
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
</style>
