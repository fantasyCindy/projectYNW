<template>
    <div class="vip-ask">
        <div class="ask-content" v-show="visible">
            <textarea cols="30" rows="7" placeholder="请输入您要交流的内容" v-model="send.content"></textarea>
        </div>
        <div class="banned banTxt" v-show="disabled">
            <p>您已被禁言1天</p>
            <p>距离发言时间为<span class="hour" style="color:red;"></span>小时<span class="minutes" style="color:red;"></span>分钟</p>
        </div>
        <div class="banned" v-show="unvisible">
            <p>您已被永久禁言</p>
            <span class="btn appeal" @click="appeal">禁言申诉</span>
        </div>
        <div class="center" v-show="visible">
            <div class="submit" @click="submit">提问</div>
        </div>
    </div>
</template>
<script>
var lo = require('m/lib/lo.js')
export default {
    data() {
            return {
                send: {
                    content: "",
                    prId: store.pid,
                    parentid: -1,
                    user_type: 0
                },
                visible: true,
                disabled:false,
                unvisible: false,
                EndTime: ''
            }
        },
        methods: {
            goto(url) {
                this.$router.push({
                    path: url
                })
            },
            submit() {
                if (!lo.trim(this.send.content)) {
                    return layer.msg('请输入内容')
                }

                $.post('/html/interactionComm.htm', this.send, back => {
                    if(back == '80000'){
                        layer.msg('您已被禁言')
                        setTimeout(function() {
                        window.location.reload()
                    }, 1000)
                        return 
                    }
                    if (back == "success") {
                        layer.msg("提交成功")
                        this.send.content = "";
                    }
                })
            },
            appeal() {
                $.post('/banned/isAppeal.htm', back => {
                    if (back.status == '20001') {
                        return layer.msg('请登录')
                    }
                    if (back.status == '1') {
                        $('.btn.appeal').html('已提交申诉申请')
                        layer.msg('申诉已提交')
                    }
                    if(back.status = '-1'){
                        layer.msg('已解除禁言')
                        setTimeout(function(){
                            window.location.reload()
                        },1000)
                    }
                },'json')
            },
            countDown() {
                var nowTime = new Date().getTime();
                var t = this.EndTime - nowTime;
                var h = 0;    
                var m = 0;  
                if (t >= 0) {           
                    h = Math.floor(t / 1000 / 60 / 60 % 24);      
                    m = Math.floor(t / 1000 / 60 % 60); 
                }
                if (h == 0 && m == 0) {
                    $('.banTxt').html(`<p>请刷新页面解除禁言</p>`)
                    return
                }
                $('.hour').html(h)
                $('.minutes').html(m)
                }
              
        },
        created() {
            this.$root.menuBottom = 1;
            this.$root.menuTop = 1;
        },
        mounted() {
            $.post('/banned/isBanned.htm', back => {
                back = JSON.parse(back)

            if(back.data.bannedDay == '1'){
                this.disabled = true
                this.visible = false  
                var banTime = back.data.createTime
                banTime = banTime.replace(/-/g, '/')
                this.EndTime = new Date(banTime).getTime();
                this.EndTime += 24 * 60 * 60 * 1000
                this.countDown() 
                var self = this 
                setInterval(function(){
                    self.countDown()  
                },60000) 
                    
            }
            if(back.data.bannedDay == '-1'){
                this.visible = false
                this.unvisible = true
            }
        })        
            // this.disabled = true
     }
}
</script>
