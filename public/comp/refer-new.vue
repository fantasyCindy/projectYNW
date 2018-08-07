<template>
    <div id="newReferBox" class="publish-container" v-show="show">
        <div class="publish-box">
            <span class="close top-close" @click='close'>返回我的内参</span>
            <div class="md-titlebar"><i class="md-icon"></i>发售新投资内参<span class="subtit">(定位清晰、内容专注的投资内参更容易被用户定制)</span></div>
            <div class="my-body">
                <div class="md-content">
                    <div class="refer-info">
                        <div class="refer-pic" @click='showCrop'>
                            <a id="upload" class="upload publish-cover-btn relative"><img :src="send.productImg" class="publish-cover-container absolute" /></a>
                            <p id="imgMsg" class="note red">支持JPG、 JPEG和PNG文件尺寸为，大小不超过1M</p>
                        </div>
                        <form id="myReferform">
                            <div class="refer-form">
                                <div>
                                    <span class="refer-form-title">标题</span>
                                    <input v-model="send.title" type="text" class="txtbox txtbox-name texts publish-title" maxlength="15" placeholder="给投资内参起个名字（不超过15个字，发售后不可修改）" />
                                    <span class="error-msg red" style="display:none;">请输入不超过15个字的标题</span>
                                    <div style="clear:both"></div>
                                </div>
                                <div class="mt10 textarea-wrap">
                                    <span class="refer-form-title">介绍</span>
                                    <!--  <textarea id="textarea_1" class="texts" v-model="send.productInfo" maxlength="500" placeholder="插入标签后，介绍更方便，排版更漂亮~~"></textarea> -->
                                    <script id="publish-refer-edit" type="text/plain"></script>
                                    <!--   <div class="clearnumber">
                                        <span id="textCount_1" class="msg-info c_666 fr"><font id="count">500</font>/ 500</span>
                                        <span class="error-msg red" style="display:none;">请输入10-1000字的简介</span>
                                    </div> -->
                                    <div style="clear:both"></div>
                                </div>
                                <div class="refer-label" @click="addTag($event)">
                                    <span class="refer-label-item">个人介绍</span>
                                    <span class="refer-label-item">内参介绍</span>
                                    <span class="refer-label-item">以往战绩</span>
                                    <span class="refer-label-item">适应人群</span>
                                    <span class="refer-label-item">风险程度</span>
                                    <span class="refer-label-item">更新频率</span>
                                </div>
                                <div class="refer-property">
                                    <div class="refer-property">
                                        <input type="text" class="refer-input" v-model="send.updateDay">
                                        <span class="refer-form-stitle">交易日</span>
                                        <input v-model="send.updatefrequency" type="text" class="refer-input">次
                                    </div>
                                    <div class="refer-property">
                                        <span class="refer-form-stitle">设置价格: 订阅价</span>
                                        <input v-model="send.price" type="text" class="txtbox texts publish-price refer-input">牛币
                                        <span class=" red ml10">（价格为1~6000的整数）</span>
                                    </div>
                                    <div class="refer-property service-time">
                                        <div class="refer-line" v-if="teacherid == 19 || teacherid == 12 || teacherid == 15">
                                            <span>服务时间：</span><span class="circle" :class="{select:send.referenceType == 0}" @click="selectItem(0)"><span class="circle-inner"></span></span><span>无限期</span>
                                        </div>
                                        <div class="refer-line1" v-if="teacherid != 19 || teacherid != 12 || teacherid == 15">
                                            <span class="circle" :class="{select:send.referenceType == 1}" @click="selectItem(1)"><span class="circle-inner"></span></span><span>固定时间</span>
                                        </div>
                                       <!--  <input v-model="send.referenceType" type="radio" name="service" value="1"><span>固定时间</span>
                                        <input v-model="send.referenceType" type="radio" name="service" value="0"><span>无限期</span> -->
                                    </div>
                                        <div class="refer-property refer-line2" :class="{normal:teacherid == 19 || teacherid == 12 || teacherid == 15}" v-show="send.referenceType == 1">
                                            <span class="refer-form-stitle">开始时间:</span>
                                            <input id="startTime" autocomplete="off" v-model="send.startTime1" type="text" class="refer-input txtbox showdate texts publish-timeBegin">
                                            <span class="refer-form-stitle">结束时间:</span>
                                            <input id="endTime" autocomplete="off" v-model="send.endTime1" type="text" class="refer-input txtbox showdate texts publish-timeEnd">
                                            <!-- <span id="dateMsg" class="red tc" style="padding-bottom:10px;">（服务期最长两个月）</span> -->
                                        </div>
                                            <p class="red">注：内参审核时间72小时以内</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="btn-wrap">
                        <button class="btn btn-89-32" id="" @click='close'>取消</button>
                        <button class="btn btn-89-31" id="submitBtn" @click='submit'>立即创建</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <ReferList :visible="showRefer"></ReferList> -->
    </div>
</template>
<style>
.field {
    width: 115px;
}
</style>
<script>
var cropper = require('~/ui/cropper-v1.2.js')
var calendar = require('~/ui/calendar.js')
var day = require('~/lib/day.js')
var error = require('e/error-type');

var crop;

var getDay = time => time.match(/^[^\s]+/)[0]
    //验证日期的格式
var isDateFormat = val => /^20[12][0-9][.\-/][01]?[0-9][.\-/][0-3][0-9]$/.test(_.trim(val))
var override = (source, target) => {
    for (var key in source) {
        if (target[key]) {
            source[key] = target[key]
        }
    }
    return source;
}

export default {
    data() {
            return {
                show: false,
                send: {
                    puiblisher: ynTeacherName,
                    puiblisherid: ynUserId,
                    productImg: '',
                    title: '',
                    productInfo: '',
                    price: '',
                    startTime1: '',
                    endTime1: '',
                    serviceperiod: '', //周期
                    teacherid: ynTeacherId,
                    updatefrequency: '',
                    updateDay: '',
                    referenceType: 1
                },
                isEdit: false,
                text: '',
                isPass: false,
                ue: '',
                teacherid:ynTeacherId
            }
        },
        props: {
            visible: Number,
            data: {
                type: Object,
                require: false
            }
        },
        watch: {
            visible(val) {
                this.show = true
            },
            data(itemData) {
                console.log("itemData", itemData)
                this.ue.setContent(itemData.productInfo)
                itemData.startTime1 = getDay(itemData.startTime)
                itemData.endTime1 = getDay(itemData.endTime)
                override(this.send, itemData)
                this.isEdit = true
                this.send.id = itemData.id
                this.isPass = itemData.status == '2' ? true : false
            }
        },
        methods: {
            close() {
                this.show = false
                this.send = {
                    puiblisher: ynTeacherName,
                    puiblisherid: ynUserId,
                    productImg: '',
                    title: '',
                    productInfo: '',
                    price: '',
                    startTime1: '',
                    endTime1: '',
                    serviceperiod: '', //周期
                    teacherid: ynTeacherId,
                    updatefrequency: '',
                    updateDay: '',
                    referenceType: 1
                }
                this.ue.setContent('')
                $('#myRefer .titleBar').show()
                $('.teacher-refer-list').attr('style', 'display:block')
                $('.publish-container').attr('style', 'display:none')

            },
            validate() {
                if (!_.trim(this.send.title)) {
                    layer.msg('标题不能为空')
                    return false
                }

                if (!_.trim(this.send.productInfo)) {
                    layer.msg('内参详情不能为空')
                    return false
                }
                if (!(/^[0-9]+$/.test(_.trim(this.send.updateDay)))) {
                    console.log('updata', this.send.updateDay)
                    return layer.msg('请输入正确的交易日数量')
                }
                if (!_.trim(this.send.updatefrequency)) {
                    return layer.msg('更新频率不能为空')
                }

                if (!(/^[0-9]+$/.test(_.trim(this.send.updatefrequency)))) {
                    console.log('this.send.updatefrequency', /^[0-9]+]$/.test(_.trim(this.send.updatefrequency)))
                    return layer.msg('更新频率必须为数字')
                }

                if (!(/^[1-9]+[0-9]*]*$/.test(this.send.price) && +this.send.price <= 6000)) {
                    layer.msg("请设置价格,范围: 1-6000的整数")
                    return false
                }

                if (this.send.referenceType == 1) {
                    if (!isDateFormat(this.send.startTime1) || !isDateFormat(this.send.endTime1)) {
                        layer.msg("请填写正确的服务周期, 格式:1949-10-01")
                        return false
                    }

                    var begin = new day(this.send.startTime1)
                    if (begin.offset() < 0) {
                        layer.msg('开始日期不能小于当前日期');
                        return false;
                    }

                    var end = new day(this.send.endTime1)
                    var off = end.offset(this.send.startTime1);
                    this.send.serviceperiod = off;
                    if (off < 3) {
                        layer.msg('服务周期至少为3天');
                        return false;
                    }
                }

                if (!this.send.productImg) {
                    layer.msg('请上传封面图片')
                    return false;
                }

                return true
            },
            addTag(e) {
                var el = $(e.target)
                if (el.attr('class').indexOf("refer-label-item") < 0) return;
                var text = $(e.target).text()
                var currentText = this.ue.getContent()
                var tag = '<span class="referTag">【' + text + '】</span><span>：<span>'
                this.ue.setContent('')
                this.ue.setContent(currentText + tag)
            },
            submit() {
                this.send.productInfo = _.trim(this.ue.getContent());
                this.text = this.isEdit ? '保存成功' : '创建成功！等待审核~'
                if (!this.validate()) return;
                if (this.isEdit && this.isPass) { //未通过的内参编辑后变成待审核
                    this.send.status = '0'
                    this.text = '保存成功,等待审核~'
                }
                $.post('/center/reference/add.htm', this.send, data => {
                    data = JSON.parse(data)
                    if (data.status != "1") return layer.msg(error[data.status])
                    if (data.status == '1') {
                        layer.msg(this.text);
                        this.show = false;
                        this.send = {
                            puiblisher: ynTeacherName,
                            puiblisherid: ynUserId,
                            productImg: '',
                            title: '',
                            productInfo: '',
                            price: '',
                            startTime1: '',
                            endTime1: '',
                            serviceperiod: '', //周期
                            teacherid: ynTeacherId,
                            updatefrequency: ''
                        }
                        this.ue.getContent('')
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000)
                    }
                })
            },
            showCrop() {
                console.log("===")
                crop = cropper.getInstance();
                crop.render({
                    width: 180,
                    height: 180
                })
                crop.onCrop = imgData => {
                    $.post(__path + "/auth/user/ImgUpload.htm", {
                        dataImg: imgData,
                        user_id: ynUserId
                    }, data => {
                        if (data.status == "success") {
                            var src = data.returnPath;
                            this.send.productImg = src;
                        } else {
                            layer.msg(data);
                        }
                    }, 'json')
                }
            },
            selectItem(val){
                this.send.referenceType = val;
            }
        },
        mounted() {

            var start = $("#startTime");
            calendar.add(start, info => {
                start.val(info.day)
                this.send.startTime1 = info.day
            })

            var end = $("#endTime")
            calendar.add(end, info => {
                end.val(info.day)
                this.send.endTime1 = info.day
            })

            // yn.wordCount($("#textarea_1"), {
            //     limit: 500,
            //     indicate: $('#count')
            // })
            // // 编辑器初始化
            this.ue = UE.getEditor('publish-refer-edit', {
                toolbars: [
                    ['forecolor', 'simpleupload']
                ],
                initialFrameHeight: 250,
                elementPathEnabled: false,
                wordCount: true,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                maximumWords: 500
            })

        }
}
</script>
