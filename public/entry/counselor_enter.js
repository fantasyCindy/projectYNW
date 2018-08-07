var cropper = require('~/ui/cropper-v1.2.js')
var imgModel = require('~/ui/valid-img-model.js')
var error = require('e/error-type')
    /*///////////////////////////////////////////////////////////////////*/

/* 控制显示隐藏 */

var step = (function() {
    var container, children;
    return {
        init: function() {
            container = $('#indicate');
            children = {
                step1: step1,
                step2: step2,
                step3: step3,
                step4: step4
            }

            //点击上一步
            $('.before-step').click(function() {
                $('.form-item').hide()
                var id = $(this).data('to')
                $(`#${id}`).show()
            })
        },
        indicator: function(step) {
            container.attr('class', 'step-item step-item-' + step);
        },
        showChild: (type, ops) => {
            for (var key in children) {
                children[key].hide();
            }
            children[type].render && children[type].render(ops);
        }
    }
})();


/* 所在公司 */

var company = (function() {
    var wrap, indexLeft, indexRight, indexContent, indexItem, data, companyInput;
    return {
        init: function() {
            wrap = $('.dropdownlist-wrap');
            indexLeft = $('.dropdownlist-cnt-left div ul li');
            indexRight = $('.dropdownlist-cnt-right .index');
            indexContent = $('.dropdownlist-cnt-right');
            indexItem = $('.dropdownlist-cnt-right .dropdown-item');
            companyInput = $('#txtCompany');
            this.dropDown(); //下拉
            this.jump(); //调用索引点击跳转效果  
        },
        dropDown: function() { //点击下拉
            var list = $('.dropdownlist-cnt');
            wrap.click(function(e) {
                e.stopPropagation();
                $(this).find('.dropdownlist-cnt').toggle();
                $('.SSContainerDivWrapper').hide();
                $('.newListSelected').css({
                    position: 'static'
                });
            });
            list.click(function(e) { //ABCD索引
                e.stopPropagation();
            });
            $('.dropdownlist-cnt p').mouseenter(function() {
                $(this).addClass('hover');
            }).mouseleave(function() {
                $(this).removeClass('hover');
            }).on('click', function() {
                companyInput.val($(this).text());
                companyInput.attr('data-verify', '1');
                companyInput.attr('data-shortName', $(this).attr('shortname'));
                list.hide();
            });
            $(document).click(function() {
                list.hide();
            });
        },
        jump: function() {
            indexContent.scrollTop(0)

            function get_list(_val) {
                var _this;
                indexRight.each(function() {
                    if ($(this).text() == _val) {
                        _this = $(this)
                    }
                });
                return _this;
            }

            indexLeft.click(function() {
                var index_val = $(this).text(),
                    _list, _all_height = indexContent.offset().top,
                    scroll_top = indexContent.scrollTop(),
                    _list_height, _height;

                indexLeft.removeClass('cur')
                $(this).addClass('cur')

                _list = get_list(index_val);
                _list_height = _list.offset().top;
                _height = _list_height - _all_height;
                indexContent.scrollTop((_height + scroll_top))
            });
        }
    }
})()


/* 第一步 */

var step1 = (function() {
    var container, next, identity, phone, province, city, modify, phoneCode, textarea, photoCode, imgCode;

    var formValues // 保存表单数据

    var renderCity = function(provinceid) {
        $.getJSON("/address/queryCity.htm", { parentid: provinceid }, data => {
            if (data.status == 1) {
                var tags = _.map(data.data, function(item) {
                    return `<option value="${item.address_id}">${item.address_name}</option>`
                })
                city.html(tags)
            }
        })
    }

    var phoneState = {
        none() {
            modify.html("<span class='phone-state-none'>获取验证码</span>");
            phone.prop('disabled', false);
        },

        modify() {
            var count = 0;
            modify.html("<strong id='timeRemained'>60</strong>秒后重新获取");
            var timeRemained = $("#timeRemained");
            var timer = setInterval(function() {
                if (count === 60) {
                    clearInterval(timer);
                    timer = null;
                    phoneState.none();
                    return;
                }
                var val = +timeRemained.text();
                timeRemained.text(--val);
                count++;
            }, 1000)
        }
    }


    var event = function() {


        //切换职业
        $('#applyType').on('click', 'li', function() {
            $(this).addClass('checked').siblings().removeClass('checked')
        })

        //字数统计
        yn.wordCount(textarea, { limit: 2000, indicate: $('#textCount_2') })

        // 图片验证码切换
        imgCode.on('click', function() {
            $(this).attr('src', '/validCode.htm?' + _.now())
        })

        //获取验证码
        modify.on('click', '.phone-state-none', function() {
            var moblie = phone.val();
            if (!yn.isMobile(+moblie)) {
                imgCode.attr('src', '/validCode.htm?' + _.now())
                layer.msg('手机号格式错误')
                return
            }

            // 显示图片验证码
            imgModel.get().render({
                callback: (val, info) => {
                    if (val == "yes") {

                        // 发送短信
                        $.post("/sendPhoneCode.htm", { phone: moblie, phone_imgcode: info.value, source: 1 }, function(data) {
                            data = JSON.parse(data)
                            if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                            if (data.status == 30002) return layer.msg("图片验证码错误")
                            if (data.status == "1") {
                                layer.msg('验证码已发送')
                                phoneState.modify();
                            }
                        })

                    }
                }
            })
        })

        //城市联动
        province.on('change', function() {
            var id = $(this).val();
            renderCity(id);
        })

        next.on('click', function() {

            var phone = _.trim($('#txtMobile').val())
            var msg = _.trim($('#mobile_hidden').val())

            //真实姓名
            if (!/^[\u4e00-\u9fa5]{2,7}$/.test(_.trim($('#txtUsername').val()))) {
                return layer.msg("真实姓名为2-7个汉字")
            }

            //身份证号
            if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_.trim($('#txtID').val()))) {
                return layer.msg("请输入有效身份证号")
            }

            // 手机号码
            if (!/^1[35789]\d{9}$/.test(phone)) {
                return layer.msg("请输入有效手机号码")
            }

            // 短信验证码
            if (!/^\d{4,6}$/.test(msg)) {
                return layer.msg("请输入短信验证码")
            }

            //QQ号码
            if (!/^\d{5,12}$/.test(_.trim($('#txtQQ').val()))) {
                return layer.msg("请输入QQ号码")
            }

            //邮箱号码
            if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(_.trim($('#txtMail').val()))) {
                return layer.msg("请输入有效邮箱")
            }

            //所在公司
            if (!/^[^\s]{5,}$/.test(_.trim($('#txtCompany').val()))) {
                return layer.msg("请输入所在公司")
            }

            // 资格证号
            if (!/^[a-zA-Z][0-9]{13}$/.test(_.trim($('#txtNumber').val()))) {
                return layer.msg("资格证编号为字母+13位数字")
            }

            // 验证短信验证码是否正确
            $.post('/validPhoneCode.htm', {
                phone: phone,
                phoneCode: msg
            }, function(data) {
                data = JSON.parse(data)
                if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
                if (data.status == 30002) return layer.msg("图片验证码错误")
                if (data.status == 1) {
                    // 下一步
                    formValues = container.serialize();
                    step.showChild('step2');
                }
            })
        })
    }

    return {

        init: function() {
            container = $('#form_1')
            next = $('#step1')
            identity = $('#identityId')
            phone = $('#txtMobile')
            province = $('#select-province')
            city = $('#select-city')
            modify = $('#modify')
            phoneCode = $('#mobile_hidden')
            photoCode = $('#photoCode')
            imgCode = $('#imgCode')
            textarea = $('#textarea_2')
            phoneState.none()

            event()

            // 获取个人信息
            $.getJSON("/center/queryUserInfo.htm?user_id=" + ynUserId, back => {
                if (back.status == 1) {
                    phone.val(back.data.phone) // 回填手机号码
                } else() => {
                    return layer.msg(error[back.status])
                }

            })
        },
        render: function() {
            container.show();
            step.indicator(1);
        },
        hide() {
            container.hide()
        },
        getValues() {
            return formValues;
        }
    }
})()


/* 第二步 */

var step2 = (function() {
    var container, formValues = [];

    // 图片上传回调
    var onCrop = callback => {
        cropper.getInstance().onCrop = imageData => {
            $.post("/auth/user/rzImgUpload.htm", {
                dataImg: imageData,
                updateEntity: true,
                user_id: ynUserId
            }, function(data) {
                if (data.status == "success") {
                    (typeof callback == "function") && callback(data.returnPath);
                }
            }, 'json');
        }
    }

    return {
        init: function() {
            container = $('#form_2');

            // 上传头像
            $('#upload-fake1').click(function() {
                cropper.getInstance().render({ width: 200, height: 200 })
                onCrop(src => {
                    $(".avatar").attr({ src })
                    formValues[0] = "tximg=" + src
                })
            })

            // 上传身份证
            $('#uploadCardBtn').click(function() {
                cropper.getInstance().render({ width: 200, height: 200, ratio: 'free' })
                onCrop(src => {
                    $('.cardImg').attr({ src })
                    formValues[1] = 'sfzimg=' + src
                })
            })

            //点击下一步
            $('#step2').click(function() {
                if (!formValues[0]) {
                    return layer.msg("请上传头像")
                }
                if (!formValues[1]) {
                    return layer.msg("请上传身份证照片")
                }
                step.showChild('step3')
            })
        },
        render() {
            step.indicator(2);
            container.show();
        },
        hide() {
            container.hide()
        },
        getValues() {
            return formValues.join('&')
        }
    }
})()


/*  第三步 */

var step3 = (function() {
    var container, investType, labelList, specialtys, agreeCheck, next;

    var renderTimes = 0
    return {
        init: function() {
            container = $('#form_3')
            investType = $('#investType')
            labelList = $('#labelList')
            agreeCheck = $('#agreeCheck')
            next = $('#step3')

            // 字数统计
            yn.wordCount($('#textarea_1'), {
                indicate: $('#textCount_1'),
                limit: 500
            })

            labelList.on('click', 'li', function() {
                $(this).toggleClass('checked');
            })

            investType.on('click', 'li', function() {
                $(this).toggleClass('checked');
            })

            // 提交数据
            next.click(function(e) {
                e.preventDefault();

                var input_list = $('#tzfx')[0];
                var input_type = $('#specialty')[0];
                input_list.value = _.map([...investType.find('li.checked')], item => $(item).data('id')).join(",") // 获取投资方向
                input_type.value = _.map([...labelList.find('li.checked')], item => $(item).data('id')).join(",") // 获取选择擅长领域

                if (!input_list.value) return layer.msg("请选择投资方向")
                if (!input_type.value) return layer.msg("请选择擅长领域")
                if (!$('#textarea_1').val()) return layer.msg("请填写个人简介")
                if (!agreeCheck.get(0).checked) return layer.msg("请同意约投顾平台投顾服务协议")


                // 拼接表单数据
                var send = [step1.getValues(), step2.getValues(), container.serialize()].join("&")

                $.post('/applycome/addApplyCome.htm', send, function(data) {
                    if (data == "success") return step.showChild('step4')
                    if (data == "4") return layer.msg("短信验证码错误")
                    layer.msg(`错误:${data}`)
                })
            })
        },

        render: function() {
            step.indicator(3);
            container.show();

            if (renderTimes == 0) {
                renderTimes++;

                //投资方向
                $.getJSON("/investmenttypes/select.htm", function(data) {
                    if (data.status == 1) {
                        var tag = '';
                        var isSelect = '';
                        _.forEach(data.data, item => {
                            if (data.investment_name == item.investment_name) {
                                isSelect = 'checked';
                            } else {
                                isSelect = '';
                            }
                            tag += '<li class="' + isSelect + '" data-id="' + item.id + '">' + item.investment_name + '</li>'
                        })
                        investType.html(tag);
                    }

                })

                $.getJSON("/center/queryUserInfo.htm", { user_id: ynUserId }, function(data) {
                    specialtys = data.specialtys;
                })

                //擅长领域
                $.getJSON("/center/specialty.htm", function(back) {
                    var gootTags = ''
                    _.forEach(back.rows, function(item) {
                        var isSelect = '';
                        //是否是老师擅长的添加check参数
                        _.forEach(specialtys, function(_item) {
                            if (+_item.id == +item.id) {
                                isSelect = "checked"
                            }
                        })
                        gootTags += '<li class="' + isSelect + '" data-id="' + item.id + '">' + item.name + '</li>'
                    })
                    labelList.html(gootTags);
                });
            }


        },

        hide: () => container.hide()
    }
})();

var step4 = (function() {
    var container;
    return {
        init: function() {
            container = $('#success');
        },
        render: function() {
            step.indicator(4);
            container.show();
        },
        hide() {
            container.hide()
        }
    }
})()


$(function() {
    if (!ynIsLogin) {
        yn.login.render();
        $('#login').on('click', '.close', function() {
            window.location.href = "/index.htm"
        })
        return
    }
    company.init()
    step.init()
    step1.init()
    step2.init()
    step3.init()
    step4.init()
})
