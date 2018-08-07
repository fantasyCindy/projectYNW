<template>
    <div class="register">
        <div class="logo">
            <img src="/public/images/caoh5/logo.png" />
        </div>
        <div class="line">
            <i class="icon phone"><img src="/public/images/caoh5/phone_icon.png"></i>
            <input type="text" placeholder="输入手机号" v-model="send.phone">
        </div>
        <div class="line">
            <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
            <input type="password" placeholder="输入登录密码" v-model="send.pwd">
        </div>
        <div class="line">
            <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
            <input type="password" placeholder="验证密码" v-model="passConfirm">
        </div>
        <div class="line">
            <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
            <input type="text" placeholder="输入图片验证码" v-model="validCode">
            <span class="valid img" @click="timestamp=Date.now()"><img :src="'/validCode.htm?' + timestamp"></span>
        </div>
        <div class="line">
            <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
            <input type="text" placeholder="输入短信验证码" v-model="send.phoneCode">
            <span class="valid msg" v-show="!msgStatus" @click="getPhoneCode">获取短信验证码</span>
            <div class="valid msg void" v-show="msgStatus">{{timeCount}}秒后重新获取</div>
        </div>
        <div class="line">
            <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
            <input type="text" placeholder="输入邀请码" v-model="send.inviteCode">
        </div>
        <div class="line">
            <input type="checkbox" v-model="agree">
            <span>我同意约牛网<a href="#/protocol">《用户注册服务协议》</a></span>
        </div>
        <div class="line">
            <div class="submit" @click="submit">注册</div>
        </div>
    </div>
</template>
<script>
var lo = require('m/lib/lo.js')
export default {
    data() {
            return {
                timestamp: Date.now(),
                validCode: '', //图形验证码
                agree: true,
                send: {
                    phone: '',
                    pwd: '',
                    phoneCode: '',
                    inviteCode: ''
                },
                passConfirm: '',
                msgStatus: false,
                timeCount: 60
            }
        },
        created() {
            this.$root.menuTop = 3;
            this.$root.menuBottom = -1
        },

        beforeRouteUpdate(to, from, next) {
            try {
                this.send.inviteCode = to.params.code
            } catch (e) {
                console.log("beforeRouteUpdate tow times")
            }
            next()
        },
        mounted() {
            this.fillCode()
        },
        methods: {

            // 填充邀请码
            fillCode() {
                var code = this.$route.params.code
                if (code) {
                    this.send.inviteCode = code
                }
            },

            getPhoneCode() {
                if (!this.validCode) {
                    return layer.alert("请输入图形验证码")
                }
                if (!/0?1[35789]\d{9}/.test(this.send.phone)) {
                    return layer.alert("请输入有效手机号")
                }

                $.post("/sendPhoneCode.htm", {
                    phone: this.send.phone,
                    phone_imgcode: this.validCode
                }, data => {
                    if (data === "-1") return layer.alert("短信发送失败，请重试!")
                    if (data === "13") return layer.alert("图片验证码错误")
                    if (data === "success") {
                        this.msgStatus = true
                        this.timeCount = 60
                        var timer = setInterval(() => {
                            if (this.timeCount == 1) {
                                clearInterval(timer)
                                timer = null
                                this.msgStatus = false
                                this.timestamp = Date.now()
                                return;
                            }
                            this.timeCount--
                        }, 1000)
                    }
                });

            },

            submit() {
                if (!/0?1[35789]\d{9}$/.test(this.send.phone)) {
                    return layer.alert("请输入有效手机号")
                }
                if (!/^[0-9a-zA-Z_]{6,}$/.test(this.send.pwd)) {
                    return layer.alert("密码为字母/数字/下划线(至少6位)")
                }

                if (this.send.pwd != this.passConfirm) {
                    return layer.alert("两次密码输入不一致")
                }

                if (!lo.trim(this.send.phoneCode)) {
                    return layer.alert("请输入短信验证码")
                }

                if (!this.agree) {
                    return layer.alert("请同意《用户注册服务协议》")
                }

                $.post("/user/webRegister.htm", this.send, data => {
                    if (data == 'failed') return layer.alert('注册失败');
                    if (data == '0') return layer.alert('图片验证码错误');
                    if (data == '1') return layer.alert('用户已存在');
                    if (data == '4') return layer.alert('短信验证码错误');
                    if (data == 'success') {
                        layer.alert("注册成功")
                        this.$router.push({
                            path: '/login'
                        })
                    }
                })
            }
        }
}
</script>
