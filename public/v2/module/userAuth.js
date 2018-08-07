/* 
    实名认证弹窗
    var auth = require('vmodule/userAuth')
    auth.get().render(back => {
        alert(back) // 认证结果
    })
*/

var ajax = require('m/ajax');
var verification = require('m/id-verify');
var countDonw = require('m/count-down');
require('./userAuth.css');

/*///////////////////////////////////////////////////////////////////*/

var _isVerify = true; // 是否认证
var _isAppraisal = true; // 是否评估

// 检查是否实名认证
var check = (function() {
    $.post(
        '/app/isIdCard.htm',
        (back) => {
            if (back.status == 1) {
                _isVerify = back.data.isCard == 'false' ? false : true;
                _isAppraisal = back.data.isRisk == 'false' ? false : true;
            }
        },
        'json'
    );
})();

var w = $(window).width();
var h = $(window).height();

var layoutBox = function(box) {
    var cw = box.outerWidth();
    var ch = box.outerHeight();
    box.css({
        left: (w - cw) / 2 + 'px',
        top: (h - ch) / 2 - 250 + 'px'
    });
};

var createElement = function() {
    return `<div id="auth-overlay" class="123456">
        <div id="auth-verify">
                <div class="title"><span class="value">认证与评估</span> <i class="close fa fa-close"></i></div>
                    <div class="auth-remind">应证监会要求，同时为了保障您的资金财产安全，请进行实名认证</div>
                    <div class="auth-remind">认证信息仅作备案使用，不会以任何形式透露给第三方，请放心使</div>
                <div class="auth-frame card">                 
                    <div class="form-item verify-form">
                        <div class="line">
                            <span class="form-text">真实姓名</span>
                            <input class="auth-verify-name" type="text" placeholder="填写您身份证上的名字">
                        </div>
                        <div class="line">
                            <span  class="form-text">身份证号</span>
                            <input class="auth-verify-code" type="text" placeholder="15或18位身份证号码">
                        </div>
                        <div class="line submitBar">
                            <div class="auth-error"></div>
                            <div class="submit">确认</div>
                        </div>
                    </div>
                    <div class="form-item done">
                        <div class="result">
                            <div class="icon-done-big icon"></div>
                            <p>恭喜您认证成功!</p>
                        </div>
                        <div class="to-btn"><span class="count-down">4</span>秒后开始风险评估</div>
                    </div>
                </div>
                <div class="auth-frame appraisal">
                    <div class="appraisal-tip">只需一次风险评估，方便我们为您更好地服务！</div>
                    <div class="appraisal-btn">去评估</div>
                </div>
            </div></div>`;
};

var verify = (function() {
    var instance = null;

    var createInstance = function() {
        var callback; //验证回调

        $('body').append(createElement());
        var container = $('#auth-verify');
        var frame_card = container.find('.auth-frame.card');
        var frame_appraisal = container.find('.auth-frame.appraisal');
        var group_form = container.find('.verify-form'); // 评估表单
        var group_success = container.find('.form-item.done'); //评估完成
        var error = container.find('.auth-error');
        var name = container.find('.auth-verify-name');
        var code = container.find('.auth-verify-code');
        var submit = container.find('.submit');
        var overlay = $('#auth-overlay');
        overlay.css({
            width: w + 'px',
            height: h + 'px'
        });

        layoutBox(container);

        var reset = function() {
            overlay.hide();
            error.text('');
            name.val('');
            code.val('');
        };

        var showError = function(text) {
            error.text(text);
            error.addClass('shake');
            setTimeout(() => {
                error.removeClass('shake');
            }, 1000);
        };

        var toAppraisal = function() {
            window.location.href = '/backstage/myAppraisal.htm?jump=' + window.location.href;
        };

        // 评估完成
        var showSuccess = function() {
            _isVerify = true;
            container.find('.close').hide();
            group_success.show();
            group_form.hide();
            countDonw.run({
                $el: container.find('.count-down'),
                done: function() {
                    toAppraisal();
                }
            });
        };

        if (!_isVerify) {
            // 未认证
            frame_card.show();
        } else {
            frame_appraisal.show();
        }

        frame_card.find('input').focus(function() {
            error.text('');
        });

        container.on('click', '.close', function() {
            reset();
            if (typeof callback == 'function') {
                callback(false);
            }
        });

        container.on('click', '.appraisal-btn', function() {
            toAppraisal();
        });

        /* Event */

        submit.on('click', function() {
            var val_name = name.val().replace(/^\s+|\s+$/, '');
            var val_code = code.val().replace(/^\s+|\s+$/, '');
            var valid_name = /^[\u4e00-\u9fa5\.]{2,20}$/.test(val_name);
            var valid_code = verification(val_code);

            if (!valid_name) {
                return showError('真实姓名为中文汉字(2-20)');
            }

            if (!valid_code) {
                return showError('请填写有效身份证号');
            }

            $.post(
                '/app/verificationIdCard.htm',
                {
                    username: val_name,
                    idCard: val_code
                },
                function(data) {
                    if (data.status == 1 || data.status == 90001) {
                        _isVerify = true;
                        return showSuccess();
                    }

                    if (data.status == 90000) {
                        return showError(`还有${data.data.validateCount}次认证机会`);
                    }

                    if (data.status == 90004) {
                        return showError('认证次数已用完，请明天再试');
                    }

                    if (data.status == 90005) {
                        layer.msg('身份证绑定用户数已达上限');
                    }
                },
                'json'
            );
        });

        return {
            render(_callback, flag) {
                // 如果第二个参数为“none”， 不验证
                if (flag == 'none') {
                    _callback(true);
                    return;
                }

                callback = _callback;

                // 已经认证完毕
                console.log('=969696', _isAppraisal && _isVerify);
                if (_isAppraisal && _isVerify) {
                    console.log(8520);
                    if (typeof callback == 'function') {
                        callback(true);
                    }
                    return;
                }

                overlay.show();
            }
        };
    };

    return {
        get() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = verify;
