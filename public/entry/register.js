// var errorCode = require('m/lib/errorCode')
var error = require('e/error-type');
// 注册
var register = (function() {
    var $container,
        $phone,
        $msg,
        $getMsgCode,
        $password,
        $pop,
        $popBox,
        $popRefer,
        $getVoice,
        $getVoiceMsg



    //获取短信验证码
    var getPhoneCode = function(info) {
        var send = _.extend({
            phone: $phone.val().trim(),
            source: 2
        }, info)


        var handler = function() {
            $pop.hide()
            $popBox.html("")

            $getMsgCode.html("<span id='sendCount'>60</span>秒后再次获取!");
            $getMsgCode.get(0).disabled = true;
            $getVoice.hide()
            var timer = setInterval(function() {
                var count = $("#sendCount");
                var value = Number(count.text());
                if (value > 1) {
                    value--
                    count.text(value);
                } else {
                    $getMsgCode.get(0).disabled = false;
                    $getMsgCode.html("获取手机验证码");
                    $getVoice.html(`没收到短信？<span class="txt getVoiceMsg">点此获取语音验证码</span>`);
                    clearInterval(timer);
                    $getVoice.show()
                }
            }, 1000)

        }

        $.post("/sendPhoneCode.htm", send, function(back) {
            back = JSON.parse(back)
            if (back.status == 20012) return layer.msg("短信发送失败，请重试!")
            if (back.status == 30002) return layer.msg("图片验证码错误")
            if (back.status == 1) { setTimeout(handler, 500) }
        })
    }


    //获取语音验证码
    var getVoiceCode = function(info) {
        var send = _.extend({
            phone: $phone.val().trim(),
            source: 2,
            isVoice: 'voice'
        }, info)

        var handler = function() {
            $pop.hide()
            $popBox.html("")

            $getVoice.html(`您将通过语音接收验证码，请注意接听来电！<span id='voiceCount'>60</span>s`);
            $getVoice.get(0).disabled = true;
            $getMsgCode.get(0).disabled = true;
            $getMsgCode.addClass('')

            var timer1 = setInterval(function() {
                var count = $("#voiceCount");
                var val = Number(count.text());
                if (val > 1) {
                    val--
                    count.text(val);
                } else {
                    $getVoice.get(0).disabled = false;
                    $getVoice.html(`未接收到来电？<span class="txt getVoiceMsg">点击重新获取</span>`);
                    clearInterval(timer1);
                    $getMsgCode.get(0).disabled = false;
                }
            }, 1000)


        }

        $.post("/sendPhoneCode.htm", send, function(back) {
            back = JSON.parse(back)
            if (back.status == 20012) return layer.msg("短信发送失败，请重试!")
            if (back.status == 30002) return layer.msg("图片验证码错误")
            if (back.status == 1) { setTimeout(handler, 500) }
        })
    }









    // 事件
    var event = function() {
        $('#submit-btn').click(submit)

        // 获取短信验证码
        $getMsgCode.click(function() {
            var phone = $phone.val().trim()
            if (!/^1[34578][0-9]{9}$/.test(phone)) {
                return layer.msg("请输入有效的手机号码")
            }
            $pop.show()
            dragValidate(phone, getPhoneCode)
        })

        //获取语音验证码
        $getVoice.on('click', '.getVoiceMsg', function() {
            var phone = $phone.val().trim()
            if (!/^1[34578][0-9]{9}$/.test(phone)) {
                return layer.msg("请输入有效的手机号码")
            }
            $pop.show()
            dragValidate(phone, getVoiceCode)
        })

        //切换密码可见性
        $('#enable-pass-visible').click(function() {
            var isPassword = $password.attr('type') == 'password'
            var target = isPassword ? "text" : 'password'
            $password.attr('type', target)
        })

        //关闭弹窗
        $popRefer.on('click', '.pop-refer-close', function() {
            $popRefer.hide()
            window.location.href = '/'
        })

    }

    var submit = function() {
        var phone = $phone.val().trim()
        var code = $msg.val().trim()
        var pass = $password.val().trim()
        var employeecode = $('#input_code input').val()

        if (!/^1[34578][0-9]{9}$/.test(phone)) {
            return layer.msg("请输入有效的手机号码")
        }
        if (!/^\d+$/.test(code)) {
            return layer.msg("请输入短信验证码")
        }
        if (!/^[a-zA-Z0-9_]{6,30}$/.test(pass)) {
            return layer.msg("密码由字母数字或下划线组成,至少6位")
        }
        if (!$('#agree').get(0).checked) {
            return layer.msg("请同意遵守注册协议")
        }

        $.post("/user/webRegister.htm", {
            phone,
            pwd: pass,
            phoneCode: code,
            employeecode: employeecode
        }, back => {
            back = JSON.parse(back)
            if (back.status == '1' || back.status == 100002) {
                return window.location.href = '/'
            } else if (back.status == 100001) {
                $popRefer.fadeIn()
            } else {
                return layer.msg(error[back.status])
            }
        })
    }

    return {
        init() {
            $container = $('#register')
            $phone = $container.find('input[name="phone"]')
            $msg = $container.find('input[name="phoneCode"]')
            $getMsgCode = $container.find('#getPhoneCode')
            $password = $container.find('input[name="pwd"]')
            $pop = $('#popup-captcha')
            $popBox = $('#popup-captcha-box')
            $popRefer = $('#pop-refer')
            $getVoice = $('.getVoiceCode')
            $getVoiceMsg = $getVoice.find('.getVoiceMsg')

            event()
        }
    }

})()


/* 拖动验证 */
var dragValidate = function(phone, callback) {
    $.ajax({
        url: __path + "/geetest/register.htm?t=" + (new Date()).getTime(),
        type: "get",
        dataType: "json",
        data: { user_name: phone },
        success: function(data) {
            console.log("back", data)
            initGeetest({
                gt: data.data.gt,
                challenge: data.data.challenge,
                offline: !data.data.success,
                new_captcha: true,
                product: "popup",
            }, handlerPopup);
        }
    })

    function handlerPopup(captchaObj) {
        captchaObj.appendTo("#popup-captcha-box");
        captchaObj.onSuccess(function() { //成功回调
            var validate = captchaObj.getValidate();
            callback && callback({
                geetest_challenge: validate.geetest_challenge,
                geetest_validate: validate.geetest_validate,
                geetest_seccode: validate.geetest_seccode
            })
        })
    }
}


/*///////////////////////////////////////////////////////////////////*/


$(function() {
    register.init()
})
