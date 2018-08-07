<template>
    <div id="login" class="register">
        <div class="main" v-if="!isLogin">
            <img src="/public/images/caoh5/logo.jpg" alt="约牛网" class="logo block" />
            <div class="relative line">
                <i class="icon person"></i>
                <input type="text" class="input" placeholder="请输入手机号" v-model="send.userName" />
            </div>
            <div class="relative line">
                <i class="icon person person1"></i>
                <input type="password" class="input" placeholder="请输入密码" v-model="send.password" v-if="!passVisible" />
                <input type="text" class="input" placeholder="请输入密码" v-model="send.password" v-if="passVisible" />
                <i class="icon person person2" @click="passVisible=!passVisible"></i>
            </div>
            <button class="btn" @click="login">登录</button>
            <button class="btn buy" @click="buy">购买</button>
            <div class="info">
                <!-- <router-link to="/registe" class="info-span fl">立即注册</router-link>
                <router-link to="/forget" class="info-span fr">忘记密码</router-link> -->
            </div>
        </div>
        <!-- 退出 -->
        <div class="logout" v-if="isLogin">
            <img src="/public/images/caoh5/logo.jpg" alt="约牛网" class="logo block" />
            <div class="name">{{name}}</div>
            <div class="action" @click="logout">退出登录</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                isLogin: ynUserId != '',
                name: ynUserName,
                passVisible: false,
                send: {
                    userName: '',
                    password: ''
                }
            }
        },
        methods: {
            logout() {
                $.post("/html/logout.htm", data => {
                    if (data == "success") {
                        window.location.reload()
                    }
                });
            },
            buy() {
                window.location.href = '/pay-qrcode.htm'
            },
            login() {

                // 验证
                if (!/^[0-9]+$/.test(this.send.userName)) {
                    return layer.alert('请正确填写用户名')
                }
                if (!/^[^\s]+$/.test(this.send.password)) {
                    return layer.alert('请正确填写密码')
                }

                // 登录
                var self = this;
                var action = {
                    "2": () => layer.alert("用户名不存在"),
                    "3": () => layer.alert("密码错误"),
                    "success": () => {
                        layer.msg("登录成功", function() {
                            window.location.href = `/mobile/refer.htm?${Date.now()}#/vip/live`
                                // window.location.href = `/mobile/refer.htm?${Date.now()}`
                        })
                    }
                }

                $.post('/public/login.htm', this.send, back => {
                    action[back]()
                })
            }
        },
        created() {
            this.$root.menuTop = 3
            this.$root.menuBottom = -1
        }
}
</script>
