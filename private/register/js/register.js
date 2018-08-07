

var inputVerify = (id, ops) => {

    var _this = function() {
        if (typeof id == "string") {
            return $(id);
        } else {
            return id;
        }
    }()

    ops = _.extend({
        borderColor: _this.css('borderColor'),
        rightColor: "#00DD00",
        errorColor: "red",
        errorMsg: null,
        focus: function() {},
        blur: function() {}
    }, ops);

    (function(ops, _this) {
        _this.focus(function() {
            //find msg
            var parent = _this.parent();
            var msg = parent.find('.error-msg');
            if (msg.get(0) === undefined) {
                msg = parent.parent().find('.error-msg');
            }
            msg.hide();
            _this.data('verify', '0').css('borderColor', ops.borderColor);
            ops.focus(_this);
        })
    })(ops, _this);

    (function(ops, _this) {
        _this.blur(function() {
            //find msg
            var parent = _this.parent();
            var msg = parent.find('.error-msg');
            if (msg.get(0) === undefined) {
                msg = parent.parent().find('.error-msg');
            }

            var _verify = function(flag) {
                if (flag) {
                    _this.data('verify', '1').css('borderColor', ops.rightColor);
                } else {
                    msg.show();
                    _this.css('borderColor', ops.errorColor);
                }
            }
            var result = ops.blur(_this);

            //defer
            if (result.hasOwnProperty('done')) {
                result.done(function(data) {
                    _verify(data);
                })
                return;
            }

            //normal
            _verify(result);

        });
    })(ops, _this)
}

(function($) {
    $(function() {

        //验证手机号
        inputVerify("#mobile", {
            blur: function(_this) {
                return yn.isMobile(_this.val());
            }
        })

        //登录密码
        inputVerify("#pwd1", {
            blur: function(_this) {
                var val = _this.val();
                var len = val.length;
                return yn.isWord(val) && len < 16 && len > 6;
            }
        })
        inputVerify("#pwd2", {
            blur: function(_this) {
                var val = _this.val();
                var len = val.length;
                return yn.isWord(val) && len < 16 && len > 6;
            }
        })

        //确认密码
        inputVerify('#confirmpwd1', {
            blur: function(_this) {
                var val = _this.val();
                return val == $("#pwd1").val() && val;
            }
        })
        inputVerify('#confirmpwd2', {
            blur: function(_this) {
                var val = _this.val();
                return val == $("#pwd2").val() && val;
            }
        })

        //验证昵称
        inputVerify("#nickname1", {
            blur: function(_this) {
                var val = _this.val();
                return yn.isCharacter(val) && val.length <= 8;
            }
        })
        inputVerify("#nickname2", {
            blur: function(_this) {
                var val = _this.val();
                return yn.isCharacter(val) && val.length <= 8;
            }
        })

        //图片验证码
        inputVerify("#validCode1", {
            blur: function(_this) {
                var defer = $.Deferred();
                var val = _this.val();
                $.get("/validateImgCode.htm", { code: val }, function(data) {
                    if (data == "success") {
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                })
                return defer.promise();
            }
        })
        inputVerify("#validCode2", {
            blur: function(_this) {
                var defer = $.Deferred();
                var val = _this.val();
                $.get("/validateImgCode.htm", { code: val }, function(data) {
                    if (data == "success") {
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                })
                return defer.promise();
            }
        })

        //换一张图片
        $('#changeImg1').click(function() {
            $("#imgCodeId1").attr("src", "/validCode.htm?r=" + Math.random());
        })
        $('#changeImg2').click(function() {
            $("#imgCodeId2").attr("src", "/validCode.htm?r=" + Math.random());
        })

        //发送短信
        $('#sendPhoneCodeId').click(function() {
            yndata.getPhoneCode($(this), $('#mobile').val());
        })

        //手机验证码
        inputVerify('#phoneCode', {
            blur: function(_this) {
                return _this.val() !== "";
            }
        })

        //同意
        $('#agreement1').click(function() {
            $('#registerBtn1').toggleClass('loginred');
            if (this.checked) {
                $(this).data('verify', 1)
                $("input[name=registerBtn1]").removeAttr("disabled");
            } else {
                $(this).data('verify', 0)
                $("input[name=registerBtn1]").attr("disabled", "disabled");
            }
        })
        $('#agreement2').click(function() {
            $('#registerBtn2').toggleClass('loginred');
            if (this.checked) {
                $(this).data('verify', 1)
                $("input[name=registerBtn2]").removeAttr("disabled");
            } else {
                $(this).data('verify', 0)
                $("input[name=registerBtn2]").attr("disabled", "disabled");
            }
        })


        /*----------------------------------------------------------------*/

        // 快速注册
        $('#registerBtn1').click(function() {
            var result = true;
            $('#regForm1 .lastVerify').each(function(i, e) {
                var verify = $(this).data('verify');
                if (verify === "0" || verify === undefined) {
                    result = false;
                    $(this).parent().parent().find('.error-msg').show();
                }
            })
            if (!result) return;

            var send = $('#regForm1').serialize();
            $.post("/user/fastRegister.htm", send, function(data) {
                yn.log("注册..." + data);
                if (data == "failed") {
                    layer.alert("请求失败");
                }
                if (data == "1") {
                    layer.alert("用户已经存在");
                }
                if (data == "success") {
                    layer.alert("注册成功", function() {
                        window.location.href = "/index.htm"
                    });

                }
            })
        })

        // 手机注册
        $('#registerBtn2').click(function() {
            var result = true;
            $('#regForm2 .lastVerify').each(function(i, e) {
                var verify = $(this).data('verify');
                if (verify === "0" || verify === undefined) {
                    result = false;
                    $(this).parent().parent().find('.error-msg').show();
                }
            })
            if (!result) {
                return;
            }

            var send = $('#regForm2').serialize();
            $.post("/user/webRegister.htm", send, function(data) {
                yn.log("注册..." + data);
                if (data == "4") {
                    layer.alert("手机验证码不正确");
                }
                if (data == "1") {
                    layer.alert("手机号码已注册");
                }
                if (data == "success") {
                    layer.msg("注册成功");
                    setTimeout(function() {
                        window.location.href = "/index.htm"
                    }, 500)
                }
            })
        })

        $('#registerPage').find('.registerTitles').on('click', '.registerTitle', function() {
            $(this).parent().find('.thisclass').removeClass("thisclass");
            $(this).addClass("thisclass");
            var tagindex = $(this).index() + 1;
            $('#registerPage').find("#regForm" + tagindex).show();
            $('#registerPage').find("#regForm" + tagindex).siblings().hide();
        })

    })
})(jQuery)
