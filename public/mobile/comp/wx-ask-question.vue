<template>
    <div class="wx-ask-question">
        <div class="input-wrap">
            <textarea placeholder="请输入提问内容" class="input-field" @keyup="limit" v-model="word"></textarea>
        </div>
        <div class="btn" @click="submit">向老师提问</div>
    </div>
</template>
<script>
var lo = require('m/lib/lo.js')

export default {
    data() {
            return {
                word: ''
            }
        },
        methods: {

            //字数限制
            limit() {
                if (this.word.length > 200) {
                    layer.alert("字数限制200", () => {
                        this.word = this.word.substr(0, 200)
                    })

                }
            },

            submit() {

                if (!/^.{4,}$/.test(lo.trim(this.word))) {
                    return layer.alert('至少得4个字!')
                }

                $.post("/consultation/questionNote.htm", {
                    questionuserid: __userId,
                    questioncontent: this.word
                }, back => {
                    if (back == 'success') {
                        layer.msg('发布成功')
                        this.$router.push('/')
                    }
                })
            }
        },
        mounted() {

        }
}
</script>
