var DragVerify = require('module/drag-verify') // 拖动验证
var error = require('e/error-type');
var register = (function() {
    var container, tag, nickname, phone, password, imgCode, error, phone_code, falseCount, __isValid, __submit, employeecode, popRefer, getVoiceCode;
    var validate = {
        phone: false,
        // imgCode: false,
        phoneCode: false,
        passWord: false
    }
    var setValidate = (key, value) => {
        validate[key] = value;
        falseCount = _.filter(validate, item => !item).length; //获取false的个数
        __isValid = falseCount < 2; //验证
        __submit = falseCount == 0
            // __isValid ? container.find('.three-pass').show() : container.find('.three-pass').hide()
        __submit ? container.find('button.btn').removeClass('false') : container.find('button.btn').addClass('false');
    }


    var phoneState = {
        modify(ops) {
            var entry = ops.isVoice ? 'voiceCode' : 'msgCode'
            var modifyBtn = {
                'voiceCode': function() {
                    getVoiceCode.html(`您将通过语音接收验证码，请注意接听来电！<span id='sendCount'>60</span>s`)
                    tag.find('.phone-state-none').get(0).disabled = true;
                    var sendCount = $("#sendCount");
                    tag.find('.phone-state-none').addClass('gray')

                    var timer = setInterval(function() {

                        if (+sendCount.text() == 0) {
                            clearInterval(timer);
                            timer = null;
                            getVoiceCode.html(`未接收到来电？<span class="txt getVoiceMsg">点击重新获取</span>`)
                            tag.find('.phone-state-none').removeClass('gray')
                            tag.find('.phone-state-none').get(0).disabled = false;
                            return;
                        }

                        var val = +sendCount.text();
                        sendCount.text(--val);
                    }, 1000)
                },
                'msgCode': function() {
                    tag.html(`<button class="phone-state-time"><strong id='timeRemained'>60</strong>秒后重新获取</button>`);
                    tag.find('.phone-state-time').get(0).disabled = true;
                    getVoiceCode.hide()
                    var timeRemained = $("#timeRemained");

                    var timer = setInterval(function() {

                        if (+timeRemained.text() == 0) {
                            clearInterval(timer);
                            timer = null;
                            tag.html(`<span class="phone-state-none">获取验证码</span>`)
                            getVoiceCode.html(`没收到短信？<span class="txt getVoiceMsg">点此获取语音验证码</span>`)
                            getVoiceCode.show()
                            return;
                        }

                        var val = +timeRemained.text();
                        timeRemained.text(--val);
                    }, 1000)
                }
            }
            modifyBtn[entry]()
        }
    }
    return {
        init: function() {
            container = $('#accountform');
            tag = $('#sendPhoneCodeId');
            getVoiceCode = $('.getVoiceCode');
            nickname = $('input[name="nickname"]');
            phone = $('input[name="phone"]');
            password = $('input[name="pwd"]');
            imgCode = $('input[name="validCode"]');
            error = $('.three-tip')
            phone_code = $('input[name="phoneCode"]')
            popRefer = $('#pop-refer')

            popRefer.on('click', '.pop-refer-close', function() {
                    popRefer.hide()
                    window.location.href = '/'
                })
                // employeecode = $('input[name="employeecode"]')
            container.on('click', 'button.btn', function() {
                    var url = logintype + "Register.htm";
                    var send = container.find('form').serialize();
                    var res = {}
                    send.split('&').forEach(function(i) {
                        var j = i.split('=');
                        res[j[0]] = j[1];
                    });

                    if (__submit) {
                        $.post(url, send, function(data) {
                            data = JSON.parse(data)
                            if (data.status == '1' || data.status == 100002) {
                                layer.msg('注册成功,自动跳转到首页')
                                $.post('/public/login.htm', { userName: res.phone, password: res.pwd }, function(data) {
                                    data = JSON.parse(data)
                                    if (data.status == "1") {
                                        setTimeout(function() {
                                            window.location.href = '/'
                                        }, 1500)
                                    }
                                })
                            }else {return layer.msg(error[data.status])}
                        })
                    }

                })
                ////////////////////////////////////////////////////////

            //手机号失去焦点
            phone.blur(function() {

                var val = _.trim(phone.val())
                if (!val) {
                    error.find('.phoneEmpty').show().siblings().hide()
                    setValidate('phone', false)
                    return
                } else if (!(/^0?1[34578][0-9]{9}$/.test(val))) {
                    error.find('.phoneFormat').show().siblings().hide()
                    setValidate('phone', false)
                    return
                } else {
                    error.find('div').hide()
                    setValidate('phone', true)
                }

                //验证手机号是否已存在
                $.getJSON('/app/verificationPhonoe.htm', { phone: val }, back => {
                    if (back.status == '30004') {
                        layer.confirm('该手机号已注册，是否继续绑定是否继续绑定？', { btn: ['回首页', '绑定'] }, function() {
                            window.location.href = '/'
                        })
                    } else if (back.status == '30010') {
                        error.find('.phoneError').show()
                    } else if (back.status == '30009') {
                        layer.msg('该手机号码已绑定')
                    }
                })
            })


            //手机验证码
            phone_code.blur(function() {
                var val = _.trim(phone_code.val())
                if (!(/^[0-9]+$/.test(val))) {
                    error.find('.sendFormat').show()
                    setValidate('phoneCode', false)
                } else if (!val) {
                    error.find('.sendEmpty').show()
                    setValidate('phoneCode', false)
                } else {
                    error.find('div').hide()
                    setValidate('phoneCode', true)
                }
            })


            //密码失去焦点
            password.blur(function() {
                var val = _.trim(password.val())
                if (!(/^[0-9a-zA-Z_]{6,}$/.test(val))) {
                    error.find('.passFormat').show()
                    setValidate('passWord', false)
                    return
                } else if (!val) {
                    error.find('.passEmpty').show()
                    setValidate('passWord', false)
                    return
                } else {
                    error.find('div').hide()
                    setValidate('passWord', true)
                }
            })


            ////////////////////////////////////////////////////////

            // $('#imgCodeId').on('click', function () {
            //     $(this).attr("src", "/validCode.htm?r=" + Math.random());
            // })


            /*///////////////////////////////////////////////////////////////////*/
            //发送验证码
            function sendCode(ops) {
                var isVoice = ops.isVoice ? true : false
                $.post("/sendPhoneCode.htm", ops, data => {
                    data = JSON.parse(data)
                    if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                    if (data.status == 30002) return layer.msg("图片验证码错误")
                    if (data.status == 1) {
                        phoneState.modify({ isVoice: isVoice });
                    }
                })

            }

            //点击获取短信验证码
            tag.on('click', '.phone-state-none', function() {

                // 验证手机号
                var phoneNumber = phone.val().trim();
                var isValid = /^1[34578][0-9]{9}$/.test(phoneNumber)
                if (!isValid) return layer.msg('请输入有效手机号！');

                //显示拖动验证窗口
                $('#popup-captcha').show()

                // 验证成功回调
                DragVerify(phoneNumber, info => {
                    var send = _.extend({ phone: phoneNumber, source: 2 }, info)
                    sendCode(send)
                })

                /*///////////////////////////////////////////////////////////////////*/

                // var imgNumber = _.trim(imgCode.val())
                // if (!/^[0-9A-Za-z]+$/.test(imgNumber)) {
                //     return layer.msg('图形验证码错误')
                // }


            })

            //点击获取语音验证码
            getVoiceCode.on('click', '.getVoiceMsg', function() {

                // 验证手机号
                var phoneNumber = phone.val().trim();
                var isValid = /^1[34578][0-9]{9}$/.test(phoneNumber)
                if (!isValid) return layer.msg('请输入有效手机号！');

                //显示拖动验证窗口
                $('#popup-captcha').show()

                // 验证成功回调
                DragVerify(phoneNumber, info => {
                    var send = _.extend({ phone: phoneNumber, source: 2, isVoice: 'voice' }, info)
                    sendCode(send)

                    // 获取验证码
                    // $.post("/sendPhoneCode.htm", send, data => {
                    //     if (+data == -1) return layer.msg("短信发送失败，请重试!");
                    //     if (+data == 13) return layer.msg("图形验证码错误");
                    //     if (data == "success") {
                    //         phoneState.modify();
                    //     }
                    // })
                })

                /*///////////////////////////////////////////////////////////////////*/

                // var imgNumber = _.trim(imgCode.val())
                // if (!/^[0-9A-Za-z]+$/.test(imgNumber)) {
                //     return layer.msg('图形验证码错误')
                // }


            })
        }
    }
})()

$(function() {
    register.init()
})
