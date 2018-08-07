<template>
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
        <router-link to="/welfare/register">
            <div class="go-register">立即注册</div>
        </router-link>
    </div>
</template>
<script>
var layer = require('module/layer.js')
export default {
    data() {
            return {
                send: {
                    userName: '',
                    password: ''
                },
                src: '/public/mobile/images/by.png',
                isPassword: true, //密码可见性
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
            login() {
                var self = this
                if (!/^1[34578][0-9]{9}$/.test(this.send.userName)) {
                    return layer.msg('请输入有效的手机号码')
                }
                if (!/^[a-zA-Z0-9_]{6,30}$/.test(this.send.password)) {
                    return layer.msg('密码由字母数字或下划线组成,至少6位')
                }
                $.post('/public/login.htm', this.send, back => {
                    back = JSON.parse(back)
                    if (back.status == "1") {
                        layer.msg('登录成功')
                        var match = window.location.href.match(/url=([^]+)#/)
                        var href = match ? match[1] : ''
                        console.log("==href=",href)
                        setTimeout(function() {
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
