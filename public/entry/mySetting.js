require('~/center/center.js')
var cropper = require('~/ui/cropper-v1.2.js')
var crop = cropper.getInstance()
var error = require('e/error-type');
/*///////////////////////////////////////////////////////////////////*/

$(function() {

    //菜单
    yn.centerMenu.init({
        render: 'my',
        light: '我的资料'
    })


    //个人信息
    var info = {
        container: $('#personInfoBar'),
        titleBar: $('.titleBar'),
        condition: $('#signCondition'),
        passWord: $('#modifyPassword'),
        data: null,
        init: function() {
            var self = this;
            this.event();
            this.render();
        },
        render: function() {
            var self = this;
            edit.container.hide();
            getPersonInfo().done(function(_data) {
                self.container.show().html(template('personInfoBar-template', _data.data));
                self.data = _data.data;
            })
        },
        event: function() {
            var self = this;

            //编辑
            this.container.on('click', '.editButton', function() {
                self.container.hide()
                edit.render(self.data);
            })

            //tabBar切换
            this.titleBar.on('click', 'td', function() {
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');
                var show = $(this).data('show');
                if (show == "signCondition") {
                    self.container.hide();
                    self.passWord.hide()
                    self.condition.show();
                    edit.container.hide();

                }
                if (show == "personInfoBar") {
                    self.container.show();
                    self.passWord.hide()
                    self.condition.hide();
                }
                if (show == "modifyPassword") {
                    self.passWord.show();
                    self.container.hide();
                    self.condition.hide();
                    edit.container.hide();
                }
            })
        }
    }

    //编辑个人信息
    var edit = {
        container: $('#teacherRegister'),
        data: null,
        favicons: $('.favicons img'),
        username: $('#txtUserName'),
        phone: $('#txtMobile'),
        qq: $('#txtQQ'),
        mail: $('#txtMail'),
        province: $("#select-province"),
        city: $("#select-city"),
        labelList: $('#labelList'),
        textarea: $('#personalInfo'),
        modify: $('#btnModify'),
        modifyState: 1,
        submit: $('#btnSave'),
        faviconBtn: $('#modifyFaviconBtn'),
        investType: $('#investType'),
        init: function() {
            var self = this;
            this.event();

            //字数统计
            yn.wordCount(this.textarea, {
                limit: 350,
                indicate: $('.wordCount .value')
            })
        },
        event: function() {
            var self = this;

            //取消编辑
            this.container.on('click', '#btnCancel', function() {
                self.container.hide();
                info.render();
            })

            //修改手机号
            this.modify.click(function() {
                if (self.modifyState === 1) {
                    $(this).text('获取验证码');
                }
                if (self.modifyState === 2) {
                    getPhoneCode($(this), self.phone.val());
                    return;
                }
                self.modifyState += 1;
            })

            //设置选中状态

            this.labelList.on('click', 'li', function() {
                $(this).toggleClass('checked');
            })

            this.investType.on('click', 'li', function() {
                $(this).toggleClass('checked');
            })

            //修改头像
            this.faviconBtn.click(function() {
                crop.render({ width: 200, height: 200 });
                crop.onCrop = img => {
                    var send = {
                        dataImg: img,
                        updateEntity: true,
                        user_id: ynUserId
                    }
                    $.post("/auth/user/headImgUpload.htm", send, function(data) {
                        if (data.status = "1") {
                            var src = data.data.photo_path;
                            self.favicons.attr('src', src);
                        }
                    }, 'json');
                }
            })

            //省份
            this.province.change(function() {
                var id = $(this).val();
                getCity(id).done(function(data) {
                    self.city.html(data);
                })
            })

            //保存
            this.submit.click(function() {
                var validNickname = function() {
                    var val = _.trim(self.username.val())
                    return /[0-9a-zA-Z\u4E00-\u9FA5]+/.test(val) && val.length > 1 && val.length < 13;
                }()
                if (!validNickname) {
                    layer.msg("请输入有效的昵称");
                    return;
                }

                var QQ = self.qq.val().trim();
                if (!/^[1-9][0-9]{5,10}$/.test(QQ)) {
                    layer.msg("QQ号输入错误")
                    return;
                }
                var phone = self.phone.val().trim();
                if (!yn.isMobile(phone)) return layer.msg("手机号输入错误");

                var saveData = {
                    user_id: ynUserId,
                    username: $.trim(self.username.val()),
                    sex: $("input[name='sex']:checked").val(),
                    phone: self.phone.val(),
                    qq: self.qq.val(),
                    email: self.mail.val(),
                    provinceid: self.province.val(),
                    cityid: self.city.val(),
                    teacherid: self.data.teacherid,
                    description: self.textarea.val().replace('\\t\\n', ''),
                    photo: self.favicons.eq(0).attr('src'),
                    investment_style: self.investType.find('.checked').data('id'),
                    specialtyList: function() {
                        var result = '';
                        self.labelList.find('li.checked').each(function() {
                            var id = $(this).data('id');
                            result += id + ",";
                        })
                        return result;
                    }()
                }

                $.post("/center/user/edit.htm", saveData, function(data) {
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        layer.msg('保存成功')
                        setTimeout(function() {
                            window.location.reload()
                        }, 1000)
                    } else {
                        return layer.msg(error[data.status]) }
                });

            })
        },
        render: function(data) {
            this.data = data;
            this.container.show();
            this.insert();
        },

        //数据回填
        insert: function() {
            var self = this;
            var data = this.data;
            this.favicons.attr('src', data.user_photo);
            this.username.val(data.username);
            if (data.sex == "1") {
                $('#sex-male').attr('checked', "true");
            } else {
                $('#sex-female').attr('checked', "true");
            }
            //手机号
            this.phone.val(data.phone).attr('disabled', 'false');
            this.qq.val(data.qq);
            this.mail.val(data.email);

            //省份
            this.province.val(data.provinceid);

            //城市
            if (data.provinceid) {
                getCity(data.provinceid).done(function(citys) {
                    self.city.html(citys);
                    if (data.cityid) {
                        self.city.val(data.cityid);
                    }
                })
            }

            //投资方向
            getInvestType().done(function(_data) {
                if (_data.status == 1) {
                    var tag = '';
                    var isSelect = '';
                    _.forEach(_data.data, function(item) {
                        if (data.investment_name == item.investment_name) {
                            isSelect = 'checked';
                        } else {
                            isSelect = '';
                        }
                        tag += '<li class="' + isSelect + '" data-id="' + item.id + '">' + item.investment_name + '</li>'
                    })
                    self.investType.html(tag);
                }
            })

            //擅长领域
            getGoodat().done(function(back) {
                var gootTags = ''
                _.forEach(back, function(item) {
                    var isSelect = '';
                    //是否是老师擅长的添加check参数
                    _.forEach(data.specialtys, function(_item) {
                        if (+_item.id == +item.id) {
                            isSelect = "checked"
                        }
                    })
                    gootTags += '<li class="' + isSelect + '" data-id="' + item.id + '">' + item.name + '</li>'
                })
                self.labelList.html(gootTags);


            });

            //个人简介
            this.textarea.val($.trim(data.description));
        }
    }

    /*///////////////////////////////////////////////////////////////////*/

    info.init();
    edit.init();
    updatePassword.init();
    updatePassword.event();
})


var yndata = {}


//个人信息
function getPersonInfo(ops) {
    ops = _.extend({
        userid: ynUserId //默认是当前登录用户
    })
    var defer = $.Deferred();
    $.getJSON("/center/queryUserInfo.htm", { user_id: ops.userid }, function(data) {
        if (data.status == 1) {
            defer.resolve(data);
            if (data.data.specialtys === undefined) {
                data.data.specialtys = [];
            }
        } else() => {
            return layer.msg(error[data.status])
        }

    })
    return defer.promise();
}

function getPhoneCode(btn, phoneNumber) {
    if (!yn.isMobile(phoneNumber)) {
        layer.alert("请输入正确手机号码");
        return;
    }
    btn.html("<span id='sendCount'>60</span>秒后可以再次获取!");
    btn.removeClass("sendbefore").addClass("sendafter");
    var background = btn.css('background-color');
    var border = btn.css("border-color");
    btn.css({ 'background': "gray", "border-color": "gray" })
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
            btn.css({ "background-color": background, "border-color": border });
            clearInterval(timer);
        }
    }, 1000);

    $.post("/sendPhoneCode.htm", { phone: phoneNumber, source: 1 }, function(data) {
        data = JSON.parse(data)
        if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
        if (data.status == 30002) return layer.msg("图片验证码错误")
    });
}


function getCity(provinceid) {
    var defer = $.Deferred();
    $.getJSON("/address/queryCity.htm?parentid=" + provinceid, function(data) {
        if (data.status == 1) {
            var tags = ''
            _.forEach(data.data, function(item) {
                tags += '<option value="' + item.address_id + '">' + item.address_name + '</option>';
            })
            defer.resolve(tags);
        }
    })
    return defer.promise();
}


//投资方向
function getInvestType() {
    var defer = $.Deferred();
    $.getJSON("/investmenttypes/select.htm", function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//擅长领域
function getGoodat() {
    var defer = $.Deferred();
    $.getJSON("/center/specialty.htm", function(data) {
        if (data.status == 1) {
            defer.resolve(data.data);
        } else {
            return layer.msg(error[data.status])
        }

    })
    return defer.promise();
}

// 修改密码
var updatePassword = (function() {
    var container, old, newPass, confirm, submit, isValide_new, isValide_confirm
    return {
        init: function() {
            container = $("#customeStock")
            old = $('#old')
            newPass = $('#new')
            confirm = $('#confirm')
            submit = $('.submit')
        },
        event: function() {

            submit.on('click', function() {
                if (!_.trim(old.val())) return layer.msg('原密码不能为空')
                if (!_.trim(newPass.val())) return layer.msg('新密码不能为空')
                if (!_.trim(confirm.val())) return layer.msg('确认密码不能为空')

                isValide_new = /^[a-zA-Z0-9_]{6,}/.test(_.trim(newPass.val()))
                isValide_confirm = _.trim(newPass.val()) === _.trim(confirm.val())

                if (!isValide_new) {
                    return layer.msg('新密码格式错误')
                }
                if (!isValide_confirm) {
                    return layer.msg('两次密码不一致')
                }
                var send = {
                    user_id: ynUserId,
                    oldPassword: _.trim(old.val()),
                    newPassword: _.trim(newPass.val()),
                }

                $.post('/auth/user/editPassword.htm', send, back => {
                    if (back.status == "1") {
                        layer.msg("修改成功");
                        container.find('input').val('');
                    } else {
                        return layer.msg(error[back.status]);
                    }
                }, 'json')
            })
        }
    }
})()
