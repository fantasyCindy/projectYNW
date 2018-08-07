$(function() {
		        //验证手机号
		        yn.inputVerify("#mobile", {
		            blur: function(_this) {
		                return yn.isMobile(_this.val());
		            }
		        })
		        //登录密码
		        yn.inputVerify("#pwd", {
		            blur: function(_this) {
		                var val = _this.val();
		                var len = val.length;
		                return yn.isWord(val) && len < 16 && len > 6;
		            }
		        })
		        //发送短信
		        $('#sendPhoneCodeId').click(function() {
		             yndata.getPhoneCode($(this), $('#mobile').val());
		        })
		        //手机验证码
		        yn.inputVerify('#phoneCode', {
		            blur: function(_this) {
		                return _this.val() !== "";
		            }
		        })
		        // //确认密码
		        // yn.inputVerify('#confirmpwd', {
		        //     blur: function(_this) {
		        //         var val = _this.val();
		        //         return val == $("#pwd").val() && val;
		        //     }
		        // })

		        //手机注册
		        $('#registerBtn').click(function() {
		            var result = true;
		            $('#name .lastVerify').each(function(i, e) {
		                var verify = $(this).data('verify');
		                if (verify === "0" || verify === undefined) {
		                    result = false;
		                    $(this).parent().find('.error-msg').show();
		                }
		            })
		            if (!result) {
		                yn.log("..." + result);
		                return;
		            }
		            var send = $('#name').serialize();
		            $.post("/user/webRegister.htm", send, function(data) {
		                yn.log("注册..." + data);
		                if (data == "4") {
		                    layer.alert("手机验证码不正确");
		                }
		                if (data == "1") {
		                    layer.alert("手机号码已注册");
		                }
		                if (data == "success") {
		                    layer.alert("注册成功", function() {
		                        window.location.href = "/app/returnAppJsp.htm"
		                    });

		                }
		            })
		        })
		    })

		var yn={}
		var yndata={}
		yn.inputVerify = function(id, ops) {
		    var _this = function() {
		        if (typeof id == "string") {
		            return $(id);
		        } else {
		            return id;
		        }
		    }()

		    ops = extend({
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
		            _this.data('verify', '0');
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
		                    _this.data('verify', '1');
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
		yn.isNumber = function(value) {
		    value = String(value);
		    var result = true;
		    for (var i = 0; i < value.length; i++) {
		        var flag = /[0-9.]/.test(value[i]);
		        if (!flag) {
		            result = false;
		        }
		    }
		    return result;
		};
		yn.isMobile = function(value) {
		    value = String(value);
		    var isNumber = yn.isNumber(value);
		    if (!isNumber) {
		        return false;
		    }
		    var reg = /^0?1[3458][0-9]{9}$/;
		    if (reg.test(value)) {
		        return true;
		    } else {
		        return false;
		    }
		};
		yn.isWord = function(value) {
		    value = String(value);
		    var reg = /[\w0-9@$!\-]+/;
		    if (reg.test(value)) {
		        return true;
		    } else {
		        return false;
		    }
		};
		function extend(target, source) {
            if (source) {
                for (key in source) {
                    var value = source[key];
                    if (typeof value !== undefined) {
                        target[key] = value
                    }
                }
            }
            return target;
        }
        //打印信息: 避免IE8报错
		yn.log = function(msg) {
		    if (window.console) {
		        console.log(msg);
		    }
		};

		function log(msg) {
		    if (window.yn) {
		        yn.log(msg);
		    }
		}
		yndata.getPhoneCode = function(btn, phoneNumber) {
		    if (!yn.isMobile(phoneNumber)) {
		        layer.alert("请输入正确手机号码");
		        return;
		    }
		    btn.html("<span id='sendCount'>60</span>秒后再次获取!");
		    btn.get(0).disabled = true;
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

		    $.post("/sendPhoneCode.htm", { phone: phoneNumber }, function(data) {
		        if (data === "-1") {
		            layer.alert("短信发送失败，请重试!");
		        }
		    });
		}