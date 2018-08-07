<template>
    <div>
        <div class="title-1" v-if="!isVip">发布战法</div>
        <div class="title-1" v-if="isVip">发布</div>
        <div class="vip-icon" v-if="isVip"><img src="/public/images/vipact/logo.png"></div>
        <div class="pub-content">
            <el-form label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="send.title"></el-input>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="send.keywords" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                    <div id="ue-container"></div>
                </el-form-item>
            </el-form>
            <div class="center">
                <!-- <el-button type="primary" size="large" @click="submit(1)">保存为草稿</el-button> -->
                <el-button type="danger" size="large" @click="submit(0)">发布</el-button>
            </div>
        </div>
    </div>
</template>
<script>
var ue, ueInit = require('m/ui/ue.js')
var fn = require('m/lib/fn.js')
var error = require('e/error-type');

// 验证表达式
var expressTable = {
    title: {
        invalid() {
            return !_.trim(this.title)
        },
        msg: '请输入标题'
    },
    keywords: {
        invalid() {
            return !_.trim(this.keyWords)
        },
        msg: '请输入关键词'
    },
    content: {
        invalid() {
            return !_.trim(this.content)
        },
        msg: '请输入正文内容'
    }
}

/* beautify preserve:end */


export default {
    data() {
            return {
                send: {
                    title: '',
                    content: '',
                    ltype: 0,
                    keywords: '',
                    id:'',
                    teacherid: ynTeacherId,
                },
                isEdit:false,
                text: ''
            }
        },
        methods: {

            should(type) {
                if (type == "up") {
                    this.up = "danger"
                    this.down = ""
                }
                if (type == "down") {
                    this.down = "success"
                    this.up = ""
                }
            },

            validate(need) {

                // 查询表达式, 执行验证
                var error = _.find(need, item => {
                    var express = expressTable[item];
                    var isInvalid = express.invalid.call(this, null)
                    if (isInvalid) {
                        layer.msg(express.msg)
                    }
                    return isInvalid
                })

                return !error
            },

            submit() {
                this.send.content = ue.getContent().replace(/<a.+?>|<\/a>/g, '')

                // 验证表单
                if (!this.send.title) {
                    return layer.msg('请输入标题')
                }
                if (!this.send.keywords) {
                    return layer.msg('请输入关键词')
                }
                if (!this.send.content) {
                    return layer.msg('请输入内容')
                }

                // 发布观点
                $.post("/learning/addLearning.htm", this.send, data => {
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        this.text = this.isEdit ? '修改成功' : '发布成功'
                        layer.msg(this.text)
                        this.$router.push({
                            path: '/'
                        })
                    } else() => {
                        return layer.msg(error[data.status])
                    }
                });

            }
        },
        mounted() {

            if (store.editData) {
                this.isEdit = true;
                fn.override(this.$data, store.editData)
                console.log("data33", store.editData)
                this.send.title = store.editData.title
                this.send.keywords = store.editData.keywords
                this.send.id = store.editData.id
            }

            ue = ueInit('ue-container')
            ue.ready(() => {
                ue.setContent
                if (store.editData) {
                    ue.setContent(store.editData.content)
                }
            })
        },
        destroyed() {
            ue.destroy();
        }
}
</script>
