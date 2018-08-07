//所属机构
$(function() {

    if (!ynIsLogin) {
        yn.login.render();
        $('#login').on('click', '.close', function() {
            window.location.href = "/index.htm"
        })
    }

    var indicate = $('#indicate');

    //所在公司
    var C = {
        wrap: $('.dropdownlist-wrap'),
        indexLeft: $('.dropdownlist-cnt-left div ul li'),
        indexRight: $('.dropdownlist-cnt-right .index'),
        indexContent: $('.dropdownlist-cnt-right'),
        indexItem: $('.dropdownlist-cnt-right .dropdown-item'),
        data: null,
        companyInput: $('#txtCompany'),
        init: function() {
            this.dropDown(); //下拉
            this.jump(); //调用索引点击跳转效果  
        },
        editCompany: function(company_txt) {
            var _this = this;
            var com = this.companyInput;
            if (this.data && this.data.length > 0) {
                $.each(C.data, function(i, arr) {
                    $.each(arr, function(j, obj) {
                        if (obj.shortName == company_txt) {
                            com.val(obj.name)
                        }
                    })
                })
            } else {
                C.setData(function() {
                    $.each(C.data, function(i, arr) {
                        $.each(arr, function(j, obj) {
                            if (obj.shortName == company_txt) {
                                com.val(obj.name)
                            }
                        })
                    })
                })
            }
        },
        dropDown: function() { //点击下拉
            var list = $('.dropdownlist-cnt'),
                com = C.companyInput
            C.wrap.click(function(e) {
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
                com.val($(this).text());
                com.data('verify', '1');
                com.attr('data-shortName', $(this).attr('shortname'));
                list.hide();
            });
            $(document).click(function() {
                list.hide();
            });
        },
        jump: function() {
            var _dropright = C.indexContent,
                _index = C.indexLeft,
                _list_index = C.indexRight;

            _dropright.scrollTop(0)

            function get_list(_val) {
                var _this;
                _list_index.each(function() {
                    if ($(this).text() == _val) {
                        _this = $(this)
                    }
                });
                return _this;
            }

            _index.click(function() {
                var index_val = $(this).text(),
                    _list, _all_height = _dropright.offset().top,
                    scroll_top = _dropright.scrollTop(),
                    _list_height, _height;

                _index.removeClass('cur')
                $(this).addClass('cur')

                _list = get_list(index_val);
                _list_height = _list.offset().top;
                _height = _list_height - _all_height;
                _dropright.scrollTop((_height + scroll_top))
            });
        },
        filling: function() {
            var _index = [],
                _div = [];
            for (var item in C.data) {
                var value = C.data[item],
                    elem;

                elem = C.indexItem.clone(true);
                elem.find('.index').text(item)
                for (var j = 0; j < value.length; j++) {
                    elem.find('.list').append($('<p shortName="' + value[j].shortName + '">').text(value[j].name))
                }

                _div.push(elem);
                _index.push(item);
            }
            C.indexLeft.each(function(_i) {
                if (_index[_i]) {
                    $(this).text(_index[_i])
                    C.indexContent.append(_div[_i])
                }
            });
        },
        getCompany: function() {
            var com = C.companyInput,
                _name = com.val();
            if (C.data && C.data.length > 0) {
                $.each(C.data, function(i, arr) {
                    $.each(arr, function(j, obj) {
                        if (obj.shortName == _name) {
                            com.val(obj.name)
                            com.attr('data-shortname', _name)
                        }
                    })
                })
            } else {
                C.setData(function() {
                    $.each(C.data, function(i, arr) {
                        $.each(arr, function(j, obj) {
                            if (obj.shortName == _name) {
                                com.val(obj.name)
                                com.attr('data-shortname', _name)
                            }
                        })
                    })
                })
            }
        }
    }


    var step1 = {
        phone: $('#txtMobile'),
        province: $('#select-province'),
        city: $('#select-city'),
        form: $('#form_1'),
        indicate: $('#indicate'),
        applyType: $('#applyType'),
        aptitude: $('#aptitude'),
        aptitudeInput: $('#img_srcInput1'),
        uploadButton: $('#uploadButton'),
        textarea: $('#textarea_2'),
        init: function() {
            var _this = this;
            this.verifyForm();
            this.event()
            yndata.getPersonInfo().done(function(data) {
                _this.phone.val(data.phone);
            })
            this.form.show();
            this.form.ajaxForm({
                url: "/applycome/imgsrcUpload1.htm",
                type: "post",
                dataType: "json",
                success: function(data) {
                    if (data.flag = "success") {
                        layer.msg("上传成功");
                        var src = data.returnPath;
                        $('#zzzmimg').val(src);
                        _this.uploadButton.html("上传成功").data('verify', "1");
                    }
                }
            })

            //字数统计
            yn.wordCount(this.textarea, {
                limit: 2000,
                indicate: $('#textCount_2')
            })
        },
        renderCity: function(provinceid) {
            var _this = this;
            yndata.getCity(provinceid).done(function(data) {
                _this.city.html(data).data('verify', "1")
            })
        },
        event: function() {
            var _this = this;
            this.province.on('change', function() {
                var id = $(this).val();
                console.log(id)
                _this.renderCity(id);
            })

            $('#modify').click(function(e) {
                e.preventDefault();
                _this.phone.get(0).disabled = false;
            })

            //手机验证码
            $('#vcode').click(function() {
                yndata.getPhoneCode($(this), _this.phone.val());
            })

            //第一步验证
            $('#step1').click(function() {
                var result = true;
                $('.step1').each(function(i, element) {
                    var verify = $(this).data('verify');
                    console.log($(this).attr('id') + '---------')
                    console.log(verify)
                    if (verify === "0" || verify == undefined) {
                        result = false
                    }
                })
                if (result == true) {
                    _this.indicate.attr('class', 'step-item step-item-2');
                    _this.form.hide();
                    step2.form.show();
                    $('.past1').attr('class', 'past');
                    window.scrollTo(0, 0);
                } else {
                    layer.alert("请填写正确~");
                }
            })


            //职业
            this.applyType.on('click', 'li', function() {
                $(this).parent().find('.checked').removeClass('checked');
                $(this).addClass('checked');
            })

            //能力资质证明
            this.form.on('click', '#uploadButton', function() {
                _this.form.submit();
            })

            this.aptitudeInput.change(function() {
                _this.uploadButton.html("立即上传").data('verify', '0');
            })

        },
        verifyForm: function() {
            //验证姓名
            yn.inputVerify('#txtUsername', {
                blur: function(_this) {
                    var val = _this.val();
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    return val.length > 1 && reg.test(val);
                }
            })

            //验证昵称
            yn.inputVerify("#nick_name", {
                blur: function() {
                    var val = $(this).val();
                    return yn.isWord(val)
                }
            })

            //验证机构简称
            yn.inputVerify('#orgShortName', {
                blur: function(_this) {
                    var val = _this.val();
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    return val.length > 1 && reg.test(val);
                }
            })

            //验证法人代表
            yn.inputVerify('#artificialPerson', {
                blur: function(_this) {
                    var val = _this.val();
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    return val.length > 1 && reg.test(val);
                }
            })

            //验证机构简介
            yn.inputVerify('#orgSummary', {
                blur: function(_this) {
                    var val = _this.val();
                    return val.length > 1;
                }
            })

            //验证身份证号码
            yn.inputVerify('#txtID', {
                blur: function(_this) {
                    var val = _this.val();
                    return yn.isCard(val);
                }
            })

            //验证手机号
            yn.inputVerify('#txtMobile', {
                blur: function(_this) {
                    var val = _this.val();
                    return yn.isMobile(val);
                }
            })

            //验证短信
            yn.inputVerify('#txtVCode', {
                blur: function(_this) {
                    var defer = $.Deferred();
                    yn.verifyPhoneCode($('#txtMobile').val(), $('#txtVCode').val()).done(function(flag) {
                        defer.resolve(flag);
                    })
                    return defer.promise()
                }
            })


            //验证座机
            yn.inputVerify('#telephone', {
                blur: function(_this) {
                    return yn.isPhonereg(_this.val());
                }
            })


            //验证QQ号
            yn.inputVerify('#txtQQ', {
                blur: function(_this) {
                    var val = _this.val();
                    var len = val.length;
                    return yn.isNumber(val) && len > 4
                }
            })

            //验证邮箱
            yn.inputVerify('#txtMail', {
                blur: function(_this) {
                    var val = _this.val();
                    return yn.isMail(val);
                }
            })

            //验证资格编号
            yn.inputVerify('#txtNumber', {
                blur: function(_this) {
                    return yn.isWord(_this.val());
                }
            })

            //验证个人简介
            yn.inputVerify('.miniediter', {
                blur: function(_this) {
                    var val = _this.val();
                    return val !== "" && val.length > 10
                }
            })

            //验证省份
            yn.inputVerify('#select-province', {
                blur: function(_this) {
                    var val = _this.val();
                    return val !== "0"
                }
            })

            //验证城市
            yn.inputVerify('#select-city', {
                blur: function(_this) {
                    var val = _this.val();
                    return val !== "0"
                }
            })

            //验证职业
            yn.inputVerify('#position', {
                blur: function(_this) {
                    var val = _this.val();
                    return val !== "0"
                }
            })

            //验证能力证明
            yn.inputVerify('#textarea_2', {
                blur: function(_this) {
                    return _this.val() != "" && _this.val().length > 100
                }
            })
        }
    }

    var step2 = {
        form: $('#form_2'),
        imgModel: $('.upload-img'),
        avatar: $('#max1'),
        uploadCardBtn: $('#uploadCardBtn'),
        cardInput: $('#img_srcInput'),
        isUpload: false,
        indicate: $('#indicate'),
        init: function() {
            var _this = this;
            this.event();
            yn.cropbox(function(img) {
                var send = {
                    dataImg: img,
                    updateEntity: true,
                    user_id: ynUserId
                }
                $.post("/auth/user/rzImgUpload.htm", send, function(data) {
                    if (data.status == "success") {
                        var src = data.returnPath;
                        _this.imgModel.hide();
                        _this.avatar.attr('src', src).data('verify', "1");
                        $("#tximg").val(src);
                        $("#max2").attr("src", src);
                        $("#mid").attr("src", src);
                        $("#min").attr("src", src);
                        layer.msg("上传成功");
                    }
                    if (data.status == "error ") {
                        layer.alert("上传失败,程序错误....")
                    }
                }, 'json')
            });

            this.form.ajaxForm({
                url: "/applycome/imgsrcUpload.htm",
                type: "post",
                dataType: "json",
                success: function(data) {
                    if (data.flag == "success") {
                        layer.msg("上传成功");
                        _this.uploadCardBtn.html('上传成功').data('verify', "1");
                        $('#sfzimg').val(data.returnPath);
                    }
                }
            })
        },
        event: function() {
            var _this = this;
            $('#upload-fake1').click(function() {
                _this.imgModel.show();
            });

            //立即上传
            this.uploadCardBtn.click(function(e) {
                e.preventDefault();
                var val = _this.cardInput.val();
                if (!yn.verifyImgFile(val)) {
                    return;
                }
                _this.form.submit()
            })

            //更改文件
            this.cardInput.change(function() {
                _this.uploadCardBtn.html('立即上传').data('verify', "0");
            })

            //第二步验证
            $('#step2').click(function() {
                var pass = true;
                $('.step2-input').each(function() {
                    var verify = $(this).data('verify');
                    if (verify != "1") {
                        pass = false;
                    }
                })

                if (!pass) {
                    layer.alert("请上传全部图片~");
                } else {
                    _this.indicate.attr('class', 'step-item step-item-3');
                    _this.form.hide();
                    step3.form.show();
                    $('.past2').attr('class', 'past');
                    window.scrollTo(0, 0);
                }
            })
        }
    }


    var step3 = {
        form: $('#form_3'),
        investType: $('#investType'),
        investTypeCount: 0,
        labels: $('#labelList'),
        labelsCount: 0,
        textarea: $('#textarea_1'),
        agreeCheck: $('#agreeCheck'),
        step3: $('#step3'),
        init: function() {
            this.event();
            this.render();
            yn.wordCount(this.textarea, {
                limit: 500,
                indicate: $('#textCount_1')
            })
            this.agreeCheck.get(0).checked = true;
        },
        event: function() {
            var _this = this;

            //投资方向
            this.investType.on('click', 'li', function() {
                if (_this.investTypeCount == 3 && $(this).attr('class').indexOf('checked') == -1) {
                    layer.alert("不能超过3项");
                    return
                }
                if ($(this).attr('class').indexOf('checked') == -1) {
                    _this.investTypeCount += 1;
                } else {
                    _this.investTypeCount -= 1;
                }
                $(this).toggleClass('checked');
            })

            //擅长领域
            this.labels.on('click', '.goodat', function() {
                if (_this.labelsCount == 10 && $(this).attr('class').indexOf('checked') == -1) {
                    layer.alert("不能超过3项");
                    return
                }
                if ($(this).attr('class').indexOf('checked') == -1) {
                    _this.labelsCount += 1;
                } else {
                    _this.labelsCount -= 1;
                }
                $(this).toggleClass('checked');
            })

            this.agreeCheck.on('change', function() {
                var element = $(this).get(0);
                var btn = _this.step3.get(0);
                var val = element.checked;
                if (!val) {
                    btn.disabled = true
                } else {
                    btn.disabled = false
                }
            })

            //第三步验证
            this.step3.click(function() {
                var a = _this.investTypeCount > 0;
                var b = _this.labelsCount > 0;
                var c = _this.textarea.val() != "";
                var d = _this.agreeCheck.get(0).checked

                if (a && b && c && d) {
                    _this.saveData()
                } else {
                    layer.alert("表单请填写完整")
                }
            })
        },
        render: function() {
            var _this = this;
            yndata.getGoodat().done(function(data) {
                var tag = ''
                _.forEach(data, function(item) {
                    tag += '<li class="goodat" data-id="' + item.id + '">' + item.name + '</li>'
                })
                _this.labels.html(tag);
            })
        },
        saveData: function() {
            var _this = this;
            //收集数据
            var data = {
                user_id: ynUserId,
                real_name: $.trim($('#txtUsername').val()), //真实姓名
                id_card: $('#txtID').val(), //身份证号
                sex: $("input[name='sex']:checked").val(), //性别
                phone: $('#txtMobile').val(), //电话
                nick_name:$('#nick_name').val(),                    //昵称
                qq: $('#txtQQ').val(), //QQ
                email: $('#txtMail').val(), //email
                province: $('#select-province').find("option:selected").text(), //省份
                city: $('#select-city').find("option:selected").text(), //城市
                company: $('#txtCompany').val(), //公司
                occupation: $('#position').find("option:selected").text(), //岗位
                investment_life: $('#experienceScope').find("option:selected").text(), //从业年限
                invitation_code: $('#inviteCode').val(), //邀请码      
                tximg: $("#tximg").val(), //头像
                sfzimg: $("#sfzimg").val(), //身份证图片
                description: $('#textarea_1').val(),
                ability: $('#textarea_2').val(), //能力资质证明
                abilityphoto: $('#zzzmimg').val(), //能力资质证明图片
                specialtyList: function() {
                    var result = '';
                    var len = $("#labelList li.checked").length;
                    $('#labelList li.checked').each(function(index, ele) {
                        if (index + 1 == len) {
                            result += $(this).text();
                        } else {
                            result += $(this).text() + ",";
                        }
                    })
                    return result;
                }(),
                tzfx: function() {
                    var result = '';
                    var len = $("#investType li.checked").length;
                    $('#investType li.checked').each(function(index, ele) {
                        if (index + 1 == len) {
                            result += $(this).text();
                        } else {
                            result += $(this).text() + ",";
                        }
                    })
                    return result;
                }()
            }
            yn.log("===发送的数据===");
            yn.log(data);

            $.post('/applycome/addApplyCome.htm', data, function(data) {
                if (data == "success") {
                    indicate.attr('class', 'step-item step-item-4');
                    $('.past3').attr('class', 'past');
                    step3.form.hide();
                    step4.form.show();
                    window.scrollTo(0, 0);
                } else {
                    layer.alert("提交申请失败");
                }
            })
        }
    }

    var step4 = {
        form: $('#success')
    }

    ////////////////////////////////////////////////////////
   
    C.init();
    step1.init();
    step2.init();
    step3.init();
});
