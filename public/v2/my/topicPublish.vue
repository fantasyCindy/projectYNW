<template>
    <div class="publishTopic">
        <div class="topicList-title">
            <i class="topicList-title-icon"></i> 发布话题
            <router-link to="/topicList">
                <div class="goPublish">返回列表</div>
            </router-link>
        </div>
        <div class="publishContent">
            <div class="pub-topic-title"><span class="pub-title-right"><span class="pub-title-text">标题</span>
                <input v-model="send.topic_title" type="text" placeholder="给话题起个名字" />
                </span>
            </div>
            <div class="pub-topic-title"><span class="pub-title-right"><span class="pub-title-text">正文</span>
                <textarea class="publish-topic-edit" name="" id="" cols="100" rows="10" v-model="send.topic_content"></textarea>
                <span class="wordCount"><span class="wordCount-num">150</span>/150</span>
                <!-- <script id="publish-topic-edit" type="text/plain"></script> -->
                </span>
            </div>
            <div class="pub-topic-title"><span class="pub-title-right"><span class="pub-title-text">关注人数</span>
                <input v-model="send.attention" type="text" placeholder="请输入初始关注人数" />
                </span>
            </div>
        </div>
        <div class="topic-pic" @click="showCrop">
            <a id="upload" class="upload publish-cover-btn"><img :src="ImgData" class="publish-cover-container" /></a>
            <p id="imgMsg" class="note red">支持JPG、 JPEG和PNG文件尺寸为，大小不超过1M</p>
        </div>
        <div class="pub-btn">
            <div class="publishBtn pubBtn" @click="submit">立即创建</div>
            <div class="cancel pubBtn" @click="backToList">取消</div>
        </div>
    </div>
</template>
<script>
var cropper = require('~/ui/cropper-v1.2.js')
var crop;
var wordCount = $('.wordCount-num')
var textarea = $('.publish-topic-edit')
export default {
    data() {
            return {
                send: {
                    topic_title: '',
                    topic_content: '',
                    attention: '',
                    dataImg: ''
                },
                // ue: '',
                ImgData: ''
            }
        },
        methods: {
            validate() {
                if (!_.trim(this.send.topic_title)) {
                    layer.msg('请输入标题')
                    return false
                }
                if (_.trim(this.send.topic_title).length > 20) {
                    layer.msg('标题不能超过20字')
                    return false
                }
                if (!_.trim(this.send.topic_content)) {
                    layer.msg('请输入正文')
                    return false
                }

                if (!/^\d*$/.test(_.trim(this.send.attention))) {
                    layer.msg('关注人数只能是数字')
                    return false
                }
                if (this.send.topic_content.length > 150) {
                    layer.msg('内容不能超过150字')
                    return false
                }
                if (!this.send.dataImg) {
                    layer.msg('请上传话题封面')
                    return false
                }
                return true
            },
            showCrop() {
                crop = cropper.getInstance();
                crop.render({
                    width: 180,
                    height: 180
                })

                crop.onCrop = imgData => {
                    this.send.dataImg = imgData
                    $.post(__path + '/auth/user/ImgUpload.htm', {
                        dataImg: imgData,
                        user_id: ynUserId
                    }, data => {
                        if (data.status == 'success') {
                            var src = data.returnPath;
                            this.ImgData = src
                        } else {
                            layer.msg(data)
                        }
                    }, 'json')
                }
            },
            submit() {
                var self = this
                this.send.topic_content = _.trim(this.send.topic_content)
                this.send.topic_title = _.trim(this.send.topic_title)
                if (!this.validate()) return

                $.post(__path + '/app/addTopic.htm', this.send, back => {
                    if (back.status == '1') {
                        layer.msg('创建话题成功')
                        $('.wordCount-num').text('150')
                    }
                }, 'json')
                this.send = {
                        topic_title: '',
                        topic_content: '',
                        dataImg: ''
                    }
                    // this.ue.setContent('')

                setTimeout(function() {
                    // window.location.reload()
                    self.$router.push({
                        path: '/topicList'
                    });
                }, 1000)

            },
            backToList() {
                this.send = {
                        topic_title: '',
                        topic_content: '',
                        dataImg: ''
                    }
                    // this.ue.setContent('')
                this.$router.push({
                    path: '/topicList'
                });
            }
        },
        mounted() {

            var wordCount = $('.wordCount-num')
            var textarea = $('.publish-topic-edit')
                //字数统计
            yn.wordCount(textarea, {
                indicate: wordCount,
                limit: 150
            });
            // this.ue = UE.getEditor('publish-topic-edit', {
            //     toolbars: [
            //         ['forecolor']
            //     ],
            //     initialFrameHeight: 200,
            //     elementPathEnabled: false,
            //     wordCount: true,
            //     enableContextMenu: false,
            //     enableAutoSave: false,
            //     pasteplain: true,
            //     maximumWords: 150
            // })
        },
        destroyed() {
            // this.ue.destroy();
        }
}
</script>
