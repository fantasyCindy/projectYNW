require('~/center/center.js')
var cropper = require('~/ui/cropper-v1.2.js')
yn.logout.path = "/index.htm";
yn.centerMenu.init({ render: 'my', light: '我的资料' }) //菜单
var error = require('e/error-type');
/*///////////////////////////////////////////////////////////////////*/

// 共享变量
var backData = null

// 获取个人信息
$.getJSON("/center/queryUserInfo.htm", { user_id: ynUserId }, back => {
        if (back.status == 1) {
            back.specialtys = back.data.specialtys || [];
            backData = back.data;
            infoBar.$mount('#personInfoBar')
            editBar.$mount('#editBar')
        } else{
            return layer.msg(error[data.status])
        }
    })
    /*tab切换*/
var tab = (function() {
    var container,
        perInfo,
        modifyPassword
    return {
        init: function() {
            container = $('#customeStock')
            perInfo = container.find('#personInfoBar')
            modifyPassword = container.find('#modifyPassword')
            container.on('click', 'td', function() {
                $(this).addClass('select').siblings().removeClass('select')
                var show = $(this).data('show')
                if (show == 'personInfoBar') {
                    modifyPassword.hide()
                    infoBar.visible = true
                    editBar.visible = false
                } else if (show == 'modifyPassword') {
                    perInfo.hide()
                    modifyPassword.show()
                    infoBar.visible = false
                    editBar.visible = false
                    menu.isEdit = false
                }
            })
        }
    }
})()


$(function() {
    tab.init()
    updatePassword.init();
    updatePassword.event();
})




/* 菜单栏 */

var menu = new Vue({
    el: '#vue-titleBar',
    data: {
        origin: null,
        isEdit: false
    },
    computed: {
        text() {
            return this.isEdit ? "取消编辑" : "编辑"
        }
    },
    methods: {
        edit() {
            this.isEdit = !this.isEdit
            if (this.isEdit) {
                $('#select-city').val(backData.cityid)
                infoBar.visible = false
                editBar.visible = true
            } else {
                infoBar.visible = true
                editBar.visible = false
                editBar.reset()
            }
        }
    }
})



/* 个人信息 */

var infoBar = new Vue({
    data: {
        info: {},
        visible: true
    },
    mounted() {
        this.info = JSON.parse(JSON.stringify(backData));
    },
    filters: {
        sexMap(val) {
            return ["女", "男"][+val]
        }
    }
})


/* 编辑 */

var editBar = new Vue({
    data: {
        visible: false,
        info: {},
        validCode: '',
        timestamp: _.now(),
        msgStatus: 0,
        timeCount: 60,
        inputDisabled: true, //手机号码编辑
        msgVisible: false,
        voiceStatus: 0,
        phoneCode: '',
        origin: null,
        send: {
            phone: '',
            phone_imgcode: '',
            source: 1,
        }

    },

    methods: {
        reset() {
            this.info = JSON.parse(this.origin)
        },
        modifyAvatar() {
            var self = this;
            var crop = cropper.getInstance()
            crop.render({ width: 200, height: 200 })
            crop.onCrop = imageData => {
                $.post("/auth/user/headImgUpload.htm", {
                    dataImg: imageData,
                    updateEntity: true,
                    user_id: ynUserId
                }, back => {
                    if (back.status == "1") {
                        self.info.photo = back.data.photo_path;
                    }
                }, 'json')
            }
        },
        modifyPhone() {
            this.msgStatus = 1;
            this.inputDisabled = false
        },

        //获取城市列表
        getCitys(pid, callback) {
            $.getJSON("/address/queryCity.htm?parentid=" + pid, data => {
                if (data.status == 1) {
                    var tags = _.map(data.data, item => `<option value="${item.address_id}">${item.address_name}</option>`).join("")
                    callback(tags)
                }
            })
        },

        getPhoneCode() {
            if (!this.validCode) {
                return layer.msg("请输入图形验证码")
            }
            if (!/0?1[35789]\d{9}/.test(this.info.phone)) {
                return layer.msg("请输入有效手机号")
            }
            this.send = {
                phone: this.info.phone,
                phone_imgcode: this.validCode,
                source: 1,
            }
            $.post("/sendH5PhoneCode.htm", this.send, data => {
                data = JSON.parse(data)
                if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                if (data.status == 30002) return layer.msg("图片验证码错误")
                if (data.status == "1") {
                    this.msgVisible = true
                    this.inputDisabled = true
                    this.voiceStatus = 2
                    this.msgStatus = 2
                    this.timeCount = 60
                    this.voiceStatus = 0
                    var timer = setInterval(() => {
                        if (this.timeCount == 1) {
                            clearInterval(timer)
                            timer = null
                            this.msgStatus = 0
                            this.voiceStatus = 1
                            this.timestamp = Date.now()
                            return;
                        }
                        this.timeCount--
                    }, 1000)
                }
            })
        },
        getVoiceCode() {
            if (!this.validCode) {
                return layer.msg("请输入图形验证码")
            }
            if (!/0?1[35789]\d{9}/.test(this.info.phone)) {
                return layer.msg("请输入有效手机号")
            }
            this.send = {
                phone: this.info.phone,
                phone_imgcode: this.validCode,
                source: 1,
                isVoice: 'voice'
            }
            $.post("/sendH5PhoneCode.htm", this.send, data => {
                data = JSON.parse(data)
                if (data.status == 30010) return layer.msg("请输入有效手机号")
                if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                if (data.status == 30002) return layer.msg("图片验证码错误")
                if (data.status == "1") {
                    this.msgVisible = true
                    this.inputDisabled = true
                    this.voiceStatus = 2
                    this.timeCount = 60
                    this.msgStatus = 3
                    var timer = setInterval(() => {
                        if (this.timeCount == 1) {
                            clearInterval(timer)
                            timer = null
                            this.voiceStatus = 3
                            this.msgStatus = 0
                            this.timestamp = Date.now()
                            return;
                        }
                        this.timeCount--
                    }, 1000)
                }
            })
        },
        submit() {

            var userName = _.trim(this.info.username)
            console.log('userName', userName.length);
            if (!/^[0-9a-zA-Z\u4E00-\u9FA5]{1,13}$/.test(userName)) {
                return layer.msg("姓名为1-13位的数字/字母或汉字")
            }

            if (!/^[0-9a-zA-Z\u4E00-\u9FA5*]{1,13}$/.test(_.trim(this.info.nickname))) {
                return layer.msg("昵称为1-13位的数字/字母或汉字")
            }

            if (/^[0-9]{10,}$/.test(_.trim(this.info.nickname))) {
                return layer.msg("昵称不能为纯数字")
            }

            if (!yn.isMail(this.info.email)) {
                return layer.msg("邮箱输入错误");
            }

            if (!/^[1-9][0-9]{5,10}$/.test(this.info.qq)) {
                return layer.msg("QQ号输入错误")
            }


            //提交数据
            var submitData = () => {
                var send = {
                    user_id: ynUserId,
                    username: this.info.username,
                    nickname: this.info.nickname,
                    sex: this.info.sex,
                    phone: this.info.phone,
                    qq: this.info.qq,
                    email: this.info.email,
                    provinceid: this.info.provinceid,
                    cityid: $('#select-city').val(),
                    photo: this.info.photo
                }

                //提交数据
                $.post("/center/user/edit.htm", send, function(data) {
                    if (data.status == "1") {
                        infoBar.info = JSON.parse(JSON.stringify(editBar.info))
                        infoBar.visible = true
                        editBar.visible = false
                        menu.isEdit = false
                        window.location.reload()
                    } else {
                        return layer.msg(error[data.status]) }
                }, 'json')
            }


            // 验证短信验证码是否正确
            if (this.msgVisible) {
                if (!this.phoneCode) return layer.msg("请输入短信验证码");
                $.post('/validPhoneCode.htm', {
                    phone: this.info.phone,
                    phoneCode: this.phoneCode
                }, data => {
                    data = JSON.parse(data)
                    if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                    if (data.status == 30002) return layer.msg("图片验证码错误")
                    if (data.status == 1) {
                        submitData()
                    }
                })
            } else {
                submitData()
            }


        }
    },
    mounted() {
        this.origin = JSON.stringify(backData)
        this.info = JSON.parse(this.origin)

        if (this.info.phone) {
            this.disabled = true
        }

        // 城市联动
        var p = $('#select-province')
        var c = $('#select-city')
        var pid = this.info.provinceid;
        if (pid) this.getCitys(pid, tags => c.html(tags))
        p.change(() => {
            this.getCitys(p.val(), tags => c.html(tags))
        })

    }
})


// 修改密码
var updatePassword = (function() {
    var container, old, newPass, confirm, submit, isValide_new, isValide_confirm
    return {
        init: function() {
            container = $("#customeStock")
            old = $('#old')
            newPass = $('#new')
            confirm = $('#confirm')
            submit = $('.submit')
        },
        event: function() {

            submit.on('click', function() {
                if (!_.trim(old.val())) return layer.msg('原密码不能为空')
                if (!_.trim(newPass.val())) return layer.msg('新密码不能为空')
                if (!_.trim(confirm.val())) return layer.msg('确认密码不能为空')

                isValide_new = /^[a-zA-Z0-9_]{6,}/.test(_.trim(newPass.val()))
                isValide_confirm = _.trim(newPass.val()) === _.trim(confirm.val())

                if (!isValide_new) {
                    return layer.msg('新密码格式错误')
                }
                if (!isValide_confirm) {
                    return layer.msg('两次密码不一致')
                }
                var send = {
                    user_id: ynUserId,
                    oldPassword: _.trim(old.val()),
                    newPassword: _.trim(newPass.val()),
                }

                $.post('/auth/user/editPassword.htm', send, back => {
                    if (back.status == "1") {
                        layer.msg("修改成功");
                        container.find('input').val('');
                    } else {
                        return layer.msg(error[back.status]);
                    }
                }, 'json')
            })
        }
    }
})()
