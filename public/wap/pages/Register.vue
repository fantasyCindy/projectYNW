<template>
  <div class="comp-app">
    <!-- <header-comp></header-comp> -->
        <div class="app-welfare-register">
        <div class="welfare-register-wrap">
            <div class="welfare-msg">
                <input type="text" placeholder="请输入手机号" v-model="send.phone">
            </div>
            <div class="welfare-msg welfare-phoneCode">
                <input type="text" placeholder="请输入短信验证码" v-model="send.phoneCode">
                <span class="welfare-phoneCode-btn" v-show="!countDownShow" @click="imgPop">获取验证码</span>
                <span class="welfare-phoneCode-btn" v-show="countDownShow"><span id='sendCount' v-html="countDownNum"></span>秒后再次获取!</span>
                
                </div>
            <div class="welfare-msg welfare-pass">
                <input v-model="send.pwd" type='text' v-if="!isPassword" placeholder="请输入密码" />
                <input v-model="send.pwd" type='password' v-if="isPassword" placeholder="请输入密码" />
                <span class="welfare-by"><img :src="eyeSrc" alt="" @click="isPassword = !isPassword"></span>
            </div>
            <div class="welfare-msg">
                <input type="text" placeholder="请输入邀请码(选填)" v-model="send.employeecode">
            </div>
        </div>
        <div class="welfare-login-btn" @click="register">注册</div>
        <div class="welfare-agree">注册即同意<a href="/html/protocol.htm">《约投顾注册协议》</a>
        <router-link to="/Login"><span class="welfare-already">已有账号</span></router-link>
        </div>
        <div class="welfare-pop" v-show="show">
            <div class="welfare-imgCode">
                <div class="welfare-img"><img :src="imgURL" alt="" @click="changeImgCode()"></div>
                <div class="welfare-imgCode-input">
                    <input type="text" v-model='imgCode'>
                </div>
                <div class="welfare-code-bar">
                    <span class="welfare-code-bar-btn" @click="sendPhoneCode">确定</span>
                    <span class="welfare-code-bar-btn" @click="closed">取消</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import HeaderComp from "./common/Header";
import {sendPhoneCode,registerSubmit,loginSubmit} from "../api"
import { errorCode } from '../enum';
import { Toast } from 'vant';
export default {
    components: { HeaderComp},
    data(){
        return {
            imgCode: '',
            show: false,
            isPassword: true, //密码可见性
            send: {
                phone: '',
                phoneCode: '',
                pwd: '',
                employeecode: ''
            },
            countDownShow:false,
            src: '/public/wap/images/icon-eye-close.png',
            // sendBtn: '获取验证码',
            imgURL:'/validCode.htm',
            isSending: false,
            countDownNum:60,
            getPhoneCode: {
                 phone: '',
                 phone_imgcode: '',
                 source: 0
                }
            }
        },
    computed: {
            passwordType() {
                return this.isPassword ? "text" : "password";
            },
            eyeSrc() {
                return this.isPassword ? '/public/wap/images/icon-eye-close.png' : '/public/wap/images/icon-eye-open.png';
            }
    },
    methods: {
        closed() {
            this.show = false
            this.imgCode = ''
            this.isSending = false
            this.changeImgCode()
        },
        imgPop() {
            if (!this.send.phone) {
                return Toast('请输入手机号码');
            }
            if (/^1[34578][0-9]{9}$/.test(this.send.phone) && !this.isSending) {
                this.show = true
                this.isSending = true
            }
        },
        changeImgCode() {
            this.imgURL = __path +'/validCode.htm?' + Date.now()
        },
        sendPhoneCode: async function() {
            var self = this;
            if (!self.imgCode) {
                return Toast('图形验证码为空');
            }
            if (self.imgCode) {
                self.getPhoneCode = {
                 phone: self.send.phone,
                 phone_imgcode: self.imgCode,
                }
                var res = await sendPhoneCode(self.getPhoneCode)
                if(res.status == 1){
                    //   关闭图形验证码
                    self.closed()
                    self.countDown()
                    this.countDownShow = true
                }else{
                    this.changeImgCode()
                }
            }
        },
        countDown(){
            var self = this
            var timer = setInterval(function(){
                 if (Number(self.countDownNum) == 1) {
                    self.isSending = false
                    self.changeImgCode()
                    clearInterval(timer);
                    timer = null
                    self.countDownShow = false;
                    self.countDownNum = 60;
                    return
                }else{
                    self.countDownNum = Number(self.countDownNum) -1;}
            }, 1000)
        },
        register:async function() {
            var self = this
            if (!/^1[34578][0-9]{9}$/.test(this.send.phone)) {
                return Toast('请输入有效的手机号码');
            }
            if (!/^\d+$/.test(this.send.phoneCode)) {
                return Toast('请输入短信验证码');
            }
            if (!/^[a-zA-Z0-9_]{6,30}$/.test(this.send.pwd)) {
                return Toast('密码由字母、数字、下划线组成且至少6位');
            }
            var res = await registerSubmit(this.send)
            if(res.status != 1) return Toast.fail(errorCode[res.status])
            Toast.success('注册成功');
            // window.location.href = base + '?' + Date.now() +'#' + '/live/list'
            window.location.href = __path + 'mobile/m-live.htm' + '?' + Date.now() +'#' + '/live/list'
        },
        autoLogin:async function() { //自动登录
        var loginSend = {
            userName: this.send.phone,
            password: this.send.pwd
        }
        var res = await loginSubmit(loginSend)
        if(res.status == 'success'){
            Toast('已为您自动登录')
        }else return Toast.fail(errorCode[res.status])
            // $.post('/public/login.htm', {
            //     userName: this.send.phone,
            //     password: this.send.pwd
            // }, back => {
            //     if (back === "success") {
            //         Toast('已为您自动登录')
            //         setTimeout(function() {
            //             var match = window.location.href.match(/url=([^]+)#/)
            //             var href = match ? match[1] : ''
            //             window.location.href = href
            //         }, 1000)
            //         return;
            //     }
            //     if (back === "2") {
            //         Toast.fail("用户名不存在");
            //         return;
            //     }
            //     if (back === "3") {
            //         Toast.fail("密码错误");
            //         return;
            //     }
            // })
        }
    },
    mounted(){}
};
</script>

<style>
.comp-app{
    margin-top:1.2rem;
}
.welfare-register-wrap{
	width: 10rem;
    margin: 0 auto;
    background: url(http://www.yuetougu.com/public/mobile/images/bj.png) no-repeat center;
    background-position: 0 0;
    background-size: cover;
    padding: 2.5rem 0 0.3rem 0;
}
.welfare-phoneCode{
    position: relative;
}
.welfare-phoneCode-btn{
    position: absolute;
    right:0;
    top:0;
	width:37%;
	display: inline-block;
	font-size:.35rem;
	height:1rem;
	line-height: 1rem;
	text-align: center;
	color:#E85545;
	background:#fff;
	border-radius:1.25rem;

}
.welfare-agree{
	width:80%;
	height:1rem;
	line-height:1rem;
	margin:0 auto;
	font-size:0.3rem;
	color:#999;
}
.welfare-agree a{
	color:#E85545;
	text-decoration: none;
}
.welfare-already{
	float:right;
	position:relative;
	right:5%;
}
.welfare-pass{
	position: relative;
}
.welfare-by{
	width:20px;
	height:15px;
	position: absolute;
	right:10px;
	top:15px;
}
.welfare-by img{
	width:100%;
}
/*imgCode*/
.welfare-pop{
	width:100%;
	height:100%;
	background:rgba(0,0,0,.5);
	position:fixed;
	left:0;
	top:0;
	transition:1s all;
	z-index: 99;
}
.welfare-imgCode{
	width:70%;
	background:#fff;
	margin:25% auto;
	border-radius: 4px;
	padding-top:20px;
}
.welfare-img{
	display: block;
	width:53%;
	height:auto;
	margin:0 auto;
	text-align: center;
}
.welfare-img img{
	width:100%;
}
.welfare-imgCode-input input{
	width:70%;
    height:0.8rem;
    line-height:0.8rem;
	display: block;
	margin:0.5rem auto;
	border:none;
	background:#ececec;
	text-align: center;
}
.welfare-code-bar{
	border-top:1px solid #DCDCDC;
}
.welfare-code-bar-btn{
	width:48%;
	height:0.8rem;
	display: inline-block;
	line-height: 0.8rem;
	text-align: center;
	color:#6A6A6A;
	border-left:1px solid #DCDCDC;
    cursor: pointer;
    font-size:0.34rem;
}
.welfare-code-bar-btn:first-child{
	border-left:none;
}
.welfare-msg {
	width:8rem;
	margin:0.5rem auto;
}
.welfare-msg input {
    width: 96%;
    height: 1rem;
    border-radius: 1.25rem;
    text-align: left;
    font-size: .37rem;
    line-height: 1rem;
    border:none;
    padding-left:0.3rem;
    background: rgba(255,255,255,.8);
   
}
 ::-webkit-input-placeholder {/*Chrome/Safari*/
        color:#b3b1b1;
    }
    ::-moz-placeholder {/*Firefox*/
        color:#b3b1b1;
    }
　  ::-ms-input-placeholder {/*IE*/
       color:#b3b1b1;
    } 
.welfare-login-btn {
    width: 8rem;
    height: 1rem;
    color: #fff;
    border-radius: 1.25rem;
    background: #F6684E;
    line-height: 1rem;
    text-align: center;
    font-size: .37rem;
    cursor: pointer;
    margin:0 auto;
}
</style>

