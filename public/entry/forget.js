/**
 * 找回密码
 * 
 */



var imgLayer = require('m/ui/valid-img-model.js')
var error = require('e/error-type');
/*///////////////////////////////////////////////////////////////////*/


$(function() {

    var indicate = $("#step-indicate");
    var phoneCode;
    var step1 = function() {
        var container = $(".step1")
        var messageCode = $("#message-code")
        var input_phone = $("#input_phone")
        var input_message_code = $("#input_message_code")
        var voiceCode = $('.getVoiceCode')
        var getVoiceMsg = $('.getVoiceMsg')
        var getMsgCode = $('.getMsgCode')


        // 短信验证码
        messageCode.on('click', '.getMsgCode', function() {

            var val = _.trim(input_phone.val())
            if (!val) {
                return layer.msg('请输入手机号码')
            }

            // 检测手机号码是否已经注册
            $.post("/user/isMobileNO.htm", { phone: val }, back => {
                back = JSON.parse(back)
                if (back.status == "1") {
                    // 显示图片验证码
                    imgLayer.get().render({
                        callback: (type, info) => {
                            if (type == "yes") {

                                //发送短信
                                $.post(`${__path}/sendH5PhoneCode.htm`, {
                                    phone: val,
                                    phone_imgcode: info.value,
                                    source: 0,
                                }, function(data) {
                                    data = JSON.parse(data)
                                    if (data.status == '1') {
                                        countDown({ 'isVoice': false })
                                    } else {
                                        return layer.msg(error[data.status])
                                    }
                                })
                            }
                        }
                    })

                } else {
                    return layer.msg(error[back.status])
                }
            })
        })


        // 语音验证码
        voiceCode.on('click', '.getVoiceMsg', function() {

            var val = _.trim(input_phone.val())
            if (!val) {
                return layer.msg('请输入手机号码')
            }

            // 检测手机号码是否已经注册
            $.post("/user/isMobileNO.htm", { phone: val }, back => {
                back = JSON.parse(back)
                if (back.status == "1") {
                    // 显示图片验证码
                    imgLayer.get().render({
                        callback: (type, info) => {
                            if (type == "yes") {
                                //发送短信
                                $.post(`${__path}/sendH5PhoneCode.htm`, {
                                    phone: val,
                                    phone_imgcode: info.value,
                                    source: 0,
                                    isVoice: 'voice'
                                }, function(data) {
                                    data = JSON.parse(data)
                                    if (data.status == '1') {
                                        countDown({ 'isVoice': true })
                                    } else {
                                        return layer.msg(error[data.status])
                                    }
                                })
                            }
                        }
                    })

                } else {
                    layer.msg("用户不存在")
                }
            })
        })

        // 倒计时
        var countDown = function(ops) {
            var isVoice = ops.isVoice
                // if (!yn.isMobile(val)) return layer.msg("请输入正确手机号码");
            if (isVoice) {
                voiceCode.html(`您将通过语音接收验证码，请注意接听来电！<span id='sendCount'>60</span>s`)
                messageCode.find('.getMsgCode').get(0).disabled = true;
                messageCode.find('.getMsgCode').addClass('isDisable')
            } else {
                voiceCode.hide()
                messageCode.html(`<button class="getMsgCode"><span id='sendCount'>60</span>秒后可再次获取!</button>`);
            }
            var btn = $(this)
            var val = _.trim(input_phone.val())

            var timer = setInterval(function() {
                var count = $("#sendCount");
                var value = Number(count.text());
                if (value > 1) {
                    value--
                    count.text(value);
                } else {
                    if (isVoice) {
                        voiceCode.html(`未接收到来电？<span class="txt getVoiceMsg">点击重新获取</span>`)
                        messageCode.find('.getMsgCode').get(0).disabled = false;
                        messageCode.find('.getMsgCode').removeClass('isDisable')
                    } else {
                        messageCode.html(`<button class="getMsgCode">获取短信验证码</button>`);
                        voiceCode.html(`没收到短信？<span class="txt getVoiceMsg">点此获取语音验证码</span>`)
                        voiceCode.show()
                    }
                    clearInterval(timer);
                }
            }, 1000);
        }


        return {
            hide: () => container.hide(),

            submit() {

                var phone = _.trim(input_phone.val())
                phoneCode = _.trim(input_message_code.val())
                if (!yn.isMobile(phone)) return layer.msg('手机号码不正确！')
                if (!/[0-9]{4,6}/.test(phoneCode)) return layer.msg('请填写验证码')
                step1.hide()
                step2.show()
                curStep = step2;

                // 验证短信
                // $.post('/validPhoneCode.htm', {
                //     phone: phone,
                //     phoneCode: phoneCode
                // }, function(data) {
                //     data = JSON.parse(data)
                //     if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                //     if (data.status == 30002) return layer.msg("图片验证码错误")
                //     if (data.status == 1) {
                //         step1.hide()
                //         step2.show()
                //         curStep = step2;
                //     }
                // })
            }
        }
    }()


    var step2 = function() {
        var container = $(".step2");
        var newPass = $("#input_new")
        var confirm = $("#input_confirm")

        return {
            show: () => {
                curStep = step2;
                container.show()
                indicate.attr('class', 'step-item-2')
            },
            hide: () => container.hide(),
            submit() {

                var val_new = _.trim(newPass.val())
                var val_confirm = _.trim(confirm.val())
                if (!/^[0-9a-zA-Z_\-@$]{6,}$/.test(val_new)) return layer.msg("密码必须包含字母/下划线或数字, 且至少6位")
                if (val_confirm != val_new) return layer.msg("两次输入不一致")

                $.post(__path + '/user/forget.htm', {
                    phone_u: _.trim($("#input_phone").val()),
                    newPassword: _.trim(newPass.val()),
                    phoneCode: _.trim(phoneCode),
                }, data => {
                    data = JSON.parse(data)
                    if (data.status == '1') {
                        $('#next').hide();
                        step2.hide();
                        step3.show();
                        return
                    } else {
                        return layer.msg(error[data.status]) }
                })
            }
        }
    }()

    var step3 = function() {
        var container = $(".step3");
        var count = container.find('.count')
        yn.login.redirect = function() {
            window.location.href = __path
        }

        return {
            show() {
                container.show()
                indicate.attr('class', 'step-item-3')
                setTimeout(function() {
                    window.close()
                }, 1000)
            }
        }
    }()

    // 下一步
    var curStep = step1;
    var btn = $("#next");
    btn.click(function() {
        curStep.submit()
    })
})
