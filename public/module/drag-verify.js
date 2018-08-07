/* 拖动验证 */

require('./drag-verify.css')

module.exports = function (phone, callback) {
    $.ajax({
        url: "/geetest/register.htm?t=" + (new Date()).getTime(),
        type: "get",
        dataType: "json",
        data: { user_name: phone },
        success: function (data) {
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
        captchaObj.onSuccess(function () { //成功回调
            setTimeout(function () {
                $('#popup-captcha').hide()
                $('#popup-captcha-box').html("")
            }, 500)
            var validate = captchaObj.getValidate();
            callback && callback({
                geetest_challenge: validate.geetest_challenge,
                geetest_validate: validate.geetest_validate,
                geetest_seccode: validate.geetest_seccode
            })
        })
    }
}