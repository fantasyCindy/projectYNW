var href = window.location.href;
var match = href.match(/\?code=(\d+)/);
var __yqcode = match ? match[1] : "";
// window.location.href = __path + '?#register'
var validate = {
    // nickName: false,
    mobile: false,
    getPhoneCode: false,
    password: false,
    // confirm: false,
}
var register = (function() {
    var container = $('#register'),
        input_nickName = container.find('#input_nickName'),
        nickName = container.find('#input_nickName input'),

        input_mobile = container.find('#input_mobile'),
        mobile = container.find('#input_mobile input'),

        input_imgCode = container.find('#input_imgCode'),
        inputCode = container.find('#input_imgCode input'),
        imgCode = container.find('#input_imgCode img'),
        getPhoneCode = container.find('#getPhoneCode'),

        input_message = container.find('#input_message'),
        message = container.find('#input_message input'),

        input_password = container.find('#input_password'),
        password = container.find('#input_password  input'),

        input_confirm = container.find('#input_confirm '),
        confirm = container.find('#input_confirm input'),

        input_code = container.find('#input_code'),
        code = container.find('#input_code input'),

        submit_btn = container.find('#submit-btn'),
        eye = container.find('.eye');
    // 密码
    var mima = function() {
        if (!/^[a-zA-Z0-9_]{6,30}$/.test(password.val())) {
            validate.password = false
            return input_password.find('.error').show()
        }
        validate.password = true
        input_password.find('.error').hide()
        // if (_.trim(confirm.val()) != _.trim(password.val())) {
        //     validate.confirm = false
        //     return input_confirm.find('.error').show()
        // }   
        console.log('validate.password',validate.password)
        // validate.confirm = true
        // input_confirm.find('.error').hide()
    }

    // 昵称
    // nickName.keyup(function() {
    //     if (nickName.val().length > 12 || nickName.val().length < 2) {
    //         validate.nickName = false
    //         return input_nickName.find('.error').show()
    //     }
    //     input_nickName.find('.error').hide()
    //     validate.nickName = true
    // })

    // 手机号
    mobile.keyup(function() {
        if (/^1[34578][0-9]{9}$/.test(mobile.val())) {
            validate.mobile = true
            return input_mobile.find('.error').hide()
        }
        validate.mobile = false
        input_mobile.find('.error').show()
        console.log('validate.mobile',validate.mobile)
    })

    // 获取图片验证码
    imgCode.click(function() {
        $(this).attr('src', '/validCode.htm?' + _.now())
    })

    // 短信验证码
    getPhoneCode.click(function() {
        var val = _.trim(mobile.val());
        var img = _.trim(inputCode.val());
        if (!/^0?1[34578][0-9]{9}$/.test(val)) {
            layer.msg("请输入有效手机号")
            return;
        }
        if (val=='18382157990') {
            layer.msg("已被列入黑名单")
            return;
        }
        if (!/^[0-9A-Za-z]+$/.test(img)) {
            return layer.msg('图形验证码错误')
        }
        phoneCode($(this), val, img)
    })

    // 密码
    password.keyup(function() {
        mima()
        console.log('validate.mobile',validate.mobile)
    })

    // 确认密码
    // confirm.keyup(function() {
    //     mima()
    // })

    // 邀请码
    // code.val(__yqcode)

    // 提交
    submit_btn.click(function() {
        register.submit()
    })

    //密码可见
    container.on('click', '.eye.can', function() {
        container.find('.eye.can img').attr('src', '/public/images/vipact/no-see.png')
        container.find('.eye.can').removeClass('can').addClass('not')
        container.find('input.see-input').attr('type', 'text')
    })
    container.on('click', '.eye.not', function() {
        container.find('.eye.not img').attr('src', '/public/images/vipact/see.png')
        container.find('.eye.not').removeClass('not').addClass('can')
        container.find('input.see-input').attr('type', 'password')
    })

    return {
        submit() {
            var param = {
                    // nickname: _.trim(nickName.val()),
                    phone: _.trim(mobile.val()),
                    pwd: _.trim(password.val()),
                    phoneCode: _.trim(message.val()),
                    // inviteCode: _.trim(code.val()),
                }
                // validate
            // if (!_.trim(nickName.val())) {
            //     layer.msg("请输入有效昵称")
            //     return;
            // }
            if (!/^1[34578][0-9]{9}$/.test(param.phone)) {
                layer.msg("请输入有效手机号")
                return;
            }
            if (_.trim(param.phone)=='18382157990') {
                layer.msg("已被列入黑名单")
                return;
            }
            if (!_.trim(inputCode.val())) {
                layer.msg("请输入图片验证码")
                return;
            }
            if (!param.phoneCode) {
                layer.msg("请输入短信验证码")
                return;
            }
            if (param.pwd.length < 6 || !/[0-9a-zA-Z_@$]/.test(param.pwd)) {
                layer.msg("字母/下划线和数字, 至少6位")
                return;
            }
            if (!container.find('.r-check').get(0).checked) {
                layer.msg("请先阅读遵守协议")
                return;
            }
            console.log('validate',validate)

            var falseCount = _.filter(validate, item => !item).length;
            console.log('/////', falseCount)
            if (falseCount >= 1) return
                // 提交
            $.post("/user/webRegister.htm", param, function(back) {
                console.log('***back***', back)
                if (back == 'failed') {
                    layer.msg('注册失败');
                    return;
                }
                if (back == '4') {
                    layer.msg('短信验证码错误');
                    return;
                }
                if (back == '0') {
                    layer.msg('验证码错误');
                    return;
                }
                if (back == 'success') {
                    window.location.href = 'http://www.yuetougu.com/'
                    return;
                }
                if (back === "1") {
                    layer.msg('用户已存在');
                    return;
                }
                if(back == '80000'){
                    return layer.msg('该手机号被用户举报，涉嫌违规操作，目前不能注册账号')
                }
            })
        }
    }
})()

var phoneCode = function(btn, phoneNumber, imgcode) {
    $.post("/sendPhoneCode.htm", { phone: phoneNumber, phone_imgcode: imgcode, source: 2 }, function(data) {
        if (data === "-1") {
            layer.alert("短信发送失败，请重试!");
        }
        if (data === "13") {
            layer.alert("图片验证码错误");
        }
        if (data === "success") {
            btn.html("<span id='sendCount'>60</span>秒后再次获取!");
            btn.get(0).disabled = true;
            validate.getPhoneCode = true
            console.log('validate.getPhoneCode',validate.getPhoneCode)
            var timer = setInterval(function() {
                var count = $("#sendCount");
                var value = Number(count.text());
                if (value > 1) {
                    value--
                    count.text(value);
                } else {
                    btn.get(0).disabled = false;
                    btn.html("获取手机验证码");
                    clearInterval(timer);
                }
            }, 1000);
        }
    });
}
