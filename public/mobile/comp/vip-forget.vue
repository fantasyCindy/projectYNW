<template>
    <div class="forget register">
        <div class="logo">
            <img src="/public/images/caoh5/logo.png" />
        </div>
        <div class="title" :style='titleStyle'>找回密码</div>
        <div class="lines">
            <div class="line" v-if="step==1">
                <i class="icon phone"><img src="/public/images/caoh5/phone_icon.png"></i>
                <input type="text" placeholder="输入手机号" v-model="send.phone">
            </div>
            <div class="line" v-if="step==1">
                <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
                <input type="text" placeholder="输入图片验证码" v-model="validCode">
                <span class="valid img" @click="timestamp=Date.now()"><img :src="'/validCode.htm?' + timestamp"></span>
            </div>
            <div class="line" v-if="step==1">
                <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
                <input type="text" placeholder="输入短信验证码" v-model="phoneCode">
                <span class="valid msg" v-show="!msgStatus" @click="getPhoneCode">获取短信验证码</span>
                <div class="valid msg void" v-show="msgStatus">{{timeCount}}秒后重新获取</div>
            </div>
            <div class="line" v-if="step==2">
                <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
                <input type="password" placeholder="输入新密码" v-model="send.newPassword">
            </div>
            <div class="line" v-if="step==2">
                <i class="icon code"><img src="/public/images/caoh5/verification_icon.png"></i>
                <input type="password" placeholder="确认新密码" v-model="passConfirm">
            </div>
            <div class="line">
                <div class="submit" @click="next" v-if="step==1">下一步</div>
                <div class="submit" @click="submit" v-if="step==2">提交</div>
            </div>
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
                send: {
                    phone: '',
                    newPassword: ''
                },
                passConfirm: '',
                msgStatus: false,
                timeCount: 60,
                step: 1,
                phoneCode: '',
                titleStyle: {
                    fontSize: "15px",
                    textAlign: "center",
                    padding: "20px"
                }
            }
        },
        created() {
            this.$root.menuTop = 3;
            this.$root.menuBottom = -1
        },
        methods: {
            getPhoneCode() {
                if (!this.validCode) {
                    return layer.alert("请输入图形验证码")
                }
                if (!/0?1[35789]\d{9}/.test(this.send.phone)) {
                    return layer.alert("请输入有效手机号")
                }

                $.post("/user/isMobileNO.htm", {
                    phone: this.send.phone
                }, back => {
                    if (back == "success") {
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
                        })
                    } else {
                        layer.alert("用户不存在")
                        this.timestamp = Date.now()
                        this.validCode = ''
                    }
                })
            },

            next() {
                if (!/0?1[35789]\d{9}$/.test(this.send.phone)) {
                    return layer.alert("请输入有效手机号")
                }
                if (!lo.trim(this.phoneCode)) {
                    return layer.alert("请输入短信验证码")
                }

                this.step = 2;
            },

            submit() {

                if (!/^[0-9a-zA-Z_]{6,}$/.test(this.send.newPassword)) {
                    return layer.alert("密码为字母/数字/下划线(至少6位)")
                }

                if (this.send.newPassword != this.passConfirm) {
                    return layer.alert("两次密码输入不一致")
                }

                $.post('/user/forget.htm', {
                    phone_u: this.send.phone,
                    newPassword: this.send.newPassword
                }, data => {
                    if (data == 'success') {
                        layer.alert("密码修改成功", () => {
                            this.$router.push('/login')
                        })
                    }
                })
            }
        }
}
</script>
</script>
