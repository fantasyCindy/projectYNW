/* 短信验证 */
/*
    validPhone($("#myButton"), "18612568049")
*/


var layer = require('./ui/layer.js')

module.exports = function($el, phoneNumber) {
    if (!/^1[34578][0-9]{9}$/.test(phoneNumber)) {
        layer.msg("请输入正确手机号码");
        return;
    }

    $el.html("<span id='sendCount'>60</span>秒后再次获取!");
    $el.get(0).disabled = true;
    var timer = setInterval(function() {
        var count = $("#sendCount");
        var value = Number(count.text());
        if (value > 1) {
            value--
            count.text(value);
        } else {
            $el.get(0).disabled = false;
            $el.html("获取验证码");
            clearInterval(timer);
        }
    }, 1000);

    $.post(path + "/sendPhoneCode.htm", { phone: phoneNumber }, function(data) {
        if (+data == -1) {
            layer.msg("短信发送失败，请重试!");
        }
    });
}
