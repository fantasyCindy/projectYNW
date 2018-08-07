<template>
    <div class="app-welfare-register">
        <div class="welfare-register-wrap">
            <div class="welfare-msg">
                <input type="text" placeholder="请输入手机号" v-model="send.phone">
            </div>
            <div class="welfare-msg welfare-phoneCode">
                <input type="text" placeholder="手机验证码" v-model="send.phoneCode"><span class="welfare-phoneCode-btn" @click="imgPop" v-html="sendBtn"></span></div>
            <div class="welfare-msg welfare-pass">
                <input v-model="send.pwd" type='text' v-if="!isPassword" placeholder="请输入密码" />
                <input v-model="send.pwd" type='password' v-if="isPassword" placeholder="请输入密码" />
                <span class="welfare-by"><img :src="eyeSrc" alt="" @click="isPassword = !isPassword"></span>
            </div>
            <div class="welfare-msg">
                <input type="text" placeholder="邀请码" v-model="send.employeecode">
            </div>
        </div>
        <div class="welfare-login-btn" @click="register">注册</div>
        <div class="welfare-agree"><a href="/public/other/app/refer-serve.html?418529637">注册即同意《约投顾服务协议》</a>
            <router-link to="/welfare/login"><span class="welfare-already">已有账号</span></router-link>
        </div>
        <div class="welfare-pop" v-show="show">
            <div class="welfare-imgCode">
                <div class="welfare-img"><img src="/validCode.htm" alt="" @click="changeImgCode($event)"></div>
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
</template>
<script>
var layer = require('module/layer.js')
var error = require('e/error-type');
export default {
    data() {
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
                src: '/public/mobile/images/by.png',
                sendBtn: '获取验证码',
                isSending: false,
            }
        },
        computed: {
            passwordType() {
                return this.isPassword ? "text" : "password";
            },
            eyeSrc() {
                return this.isPassword ? '/public/mobile/images/by.png' : '/public/mobile/images/zy.png';
            }
        },
        methods: {
            closed() {
                this.show = false
                this.imgCode = ''
                this.isSending = false
            },
            imgPop() {
                if (!this.send.phone) {
                    return layer.msg('请输入手机号码')
                }
                if (/^1[34578][0-9]{9}$/.test(this.send.phone) && !this.isSending) {
                    this.show = true
                    this.isSending = true
                }
            },
            changeImgCode(e) {
                var el = $(e.target)
                el.attr('src', '/validCode.htm?' + Date.now())
            },
            sendPhoneCode() {
                var self = this
                if (!self.imgCode) {
                    return layer.msg('图形验证码为空')
                }
                if (this.imgCode) {
                    $.post(__path + '/sendH5PhoneCode.htm', {
                        phone: this.send.phone,
                        phone_imgcode: this.imgCode,
                        source: 0
                    }, back => {
                        back = JSON.parse(back)
                        if (back.status == '1') {
                            self.closed()
                            self.sendBtn = `<span id='sendCount'>60</span>秒后再次获取!`;
                            $('.welfare-phoneCode-btn').html(`<span id='sendCount'>60</span>秒后再次获取!`)
                            var timer = setInterval(function() {
                                var count = $("#sendCount");
                                var value = Number(count.text());
                                if (value == 1) {
                                    self.sendBtn = `获取验证码`
                                    self.isSending = false
                                    $('.welfare-img img').attr('src', '/validCode.htm?' + Date.now())
                                    clearInterval(timer);
                                    timer = null
                                    return
                                }
                                count.text(--value);
                            }, 1000)
                        } else if (back.status == 30002) {
                            layer.msg('图形验证码错误')
                            $('.welfare-img img').attr('src', '/validCode.htm?' + Date.now())
                            self.imgCode = ''
                            return
                        }
                    })
                }
            },
            register() {
                var self = this
                if (!/^1[34578][0-9]{9}$/.test(this.send.phone)) {
                    return layer.msg('请输入有效的手机号码')
                }
                if (!/^\d+$/.test(this.send.phoneCode)) {
                    return layer.msg('请输入短信验证码')
                }
                if (!/^[a-zA-Z0-9_]{6,30}$/.test(this.send.pwd)) {
                    return layer.msg('密码由字母数字或下划线组成,至少6位')
                }
                $.post('/user/webRegister.htm', this.send, back => {
                    back = JSON.parse(back)
                    if (back.status == '1' || back.status == 100002) {
                        layer.msg('注册成功')
                        setTimeout(function() {
                            self.autoLogin()
                        }, 1000)
                    }else{return layer.msg(error[back.status])}
                })
            },
            autoLogin() { //自动登录
                $.post('/public/login.htm', {
                    userName: this.send.phone,
                    password: this.send.pwd
                }, back => {
                    if (back === "success") {
                        layer.msg('已为您自动登录')
                        setTimeout(function() {
                            var match = window.location.href.match(/url=([^]+)#/)
                            var href = match ? match[1] : ''
                            window.location.href = href
                        }, 1000)
                        return;
                    }
                    if (back === "2") {
                        layer.msg("用户名不存在");
                        return;
                    }
                    if (back === "3") {
                        layer.msg("密码错误");
                        return;
                    }
                })
            }
        },
        mounted(){
            var href = window.location.href
            $.post("/web/getjssdkInfo.htm", {
                url: href
            }, function(data) {
                var back = JSON.parse(data)
                if (back.status == 1) {
                    wx.config({
                        debug: false,
                        appId: back.data.appId,
                        timestamp: back.data.timeStamp, // 必填，生成签名的时间戳
                        nonceStr: back.data.nonceStr, // 必填，生成签名的随机串
                        signature: back.data.signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                    });
                    wx.ready(function() {
                        wx.hideOptionMenu();
                    });
                }
            })
        }
}
</script>
