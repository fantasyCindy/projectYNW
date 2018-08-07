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
        textarea: $('#orgSummary'),
        init: function() {
            var _this = this;
            this.form.show();
            this.verifyForm();
            this.event()
            yndata.getPersonInfo().done(function(data) {
                    _this.phone.val(data.phone);
                })
                //字数统计
            yn.wordCount(this.textarea, {
                limit: 500,
                indicate: $('#textCount_1')
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

            //手机验证码
            $('#vcode').click(function() {
                yndata.getPhoneCode($(this), _this.phone.val());
            })

            //第一步验证
            $('#step1').click(function() {
                var result = true;
                $('.step1').each(function(i, element) {
                    var verify = $(this).data('verify');
                    console.log($(this).attr('class') + '---------')
                    console.log(verify)
                    if (verify === "0" || verify == undefined) {
                        $(this).css('border-color', 'red');
                        result = false
                    }
                })
                if (result == true) {
                    indicate.attr('class', 'step-item step-item-2');
                    _this.form.hide();
                    step2.form.show();
                    $('.past1').attr('class', 'past');
                    window.scrollTo(0, 0);
                } else {
                    layer.alert("表单请填写完整");
                }
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
                    return val.length > 50;
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


            //验证邮箱
            yn.inputVerify('#txtMail', {
                blur: function(_this) {
                    var val = _this.val();
                    return yn.isMail(val);
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

            //验证职位
            yn.inputVerify('#position', {
                blur: function(_this) {
                    return _this.val() != ""
                }
            })

        }
    }

    yn.cropbox(function(img) {
        var send = {
            dataImg: img,
            updateEntity: true,
            user_id: ynUserId
        }
        $.post("/auth/user/rzImgUpload.htm", send, function(data) {
            if (data.status == "success") {
                var src = data.returnPath;
                var logoimg = $("#logoimg").val();
                $('.upload-img').hide();
                if (!logoimg) {
                    $("#max1").attr("src", src);
                    $("#logoimg").val(src);
                    $("#max2").attr("src", src);
                    $("#mid").attr("src", src);
                    $("#min").attr("src", src);
                    $('#upload-orgLogo').html("上传成功").data('verify', "1");
                } else {
                    $("#max11").attr("src", src)
                    $("#max22").attr("src", src);
                    $("#mid1").attr("src", src);
                    $("#min1").attr("src", src);
                    $("#yyzzimg").val(src);
                    $('#upload-fake1').html("上传成功").data('verify', "1");
                }
                layer.msg("上传成功");
            }
            if (data.status == "error ") {
                layer.alert("上传失败,程序错误....")
            }
        }, 'json')
    });

    var step2 = {
        form: $('#form_2'),
        imgModel: $('.upload-img'),
        uploadCardBtn: $('#upload-fake1'),
        init: function() {
            var _this = this;
            this.event();
        },
        event: function() {
            var _this = this;
            $('#upload-orgLogo').click(function() {
                $('.upload-img').show();
            });

            $('#upload-fake1').click(function() {
                _this.imgModel.show();
            });

            //第二步验证
            $('#step2').click(function() {
                var verify = _this.uploadCardBtn.data('verify');
                console.log(verify)
                if (verify != "1") {
                    layer.alert("请上传图片");
                } else {
                    indicate.attr('class', 'step-item step-item-3');
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
        init: function() {}
    }

    ////////////////////////////////////////////////////////

    C.init();
    step1.init();
    step2.init();
    step3.init();
});
