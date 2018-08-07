    //加载省份
    var p_id = "${user.provinceid}";
    var c_id = "${user.cityid}";
    loadProvince();
    loadCity(p_id, "city_input", true);
    loadArea(c_id, "area_input", true);

    $("#province_input").change(function() {
        var _id = $("#province_input option:selected").val();
        loadCity(_id, "city_input");
    });
    $("#city_input").change(function() {
        var _id = $("#city_input option:selected").val();
        loadArea(_id, "area_input");
    });

    $("#editUser").click(function() {
        var nickname = $("#nickname_input").val();
        if (!validNickname(nickname)) {
            showTipsMsg("昵称为2-8位汉字和字母");
            return;
        }
        var name = $("#name_input").val();
        if (!validAllChinese(name)) {
            showTipsMsg("姓名为少于4位的汉字");
            return;
        }
        var _params = $("#editUserFormId").serialize();
        $.post(path + "/auth/user/edit.htm", _params, function(data) {
            eval("var _data = " + data);
            if (_data.status == "1") {
                showTipsMsg("保存成功");
            } else if (_data.status == "-2") {
                showErrMsg("用户名已存在");
            } else if (_data.status == "-1") {
                showErrMsg("参数错误");
            } else if (_data.status == "-3") {
                showErrMsg("保存失败");
            }
        });
    });

    $("#change-img").click(function() {
        $(".upload-img").css("display", "block");
        $("body").css("overflow", "hidden")
    });
    $(".thickclose").click(function() {
        $(".upload-img").css("display", "none");
        $("body").css("overflow", "auto")
    });

    $("#changePassword").click(function() {
        var oldPassword = $("#oldPassword_input").val();
        var newPassword = $("#newPassword_input").val();
        var newPassword_again = $("#newPassword_again_input").val();
        if (oldPassword == "") {
            showErrMsg("请填写旧密码");
            return;
        }
        if (!validPassword(newPassword.trim())) {
            showErrMsg("密码格式不正确");
            return;
        }
        if (newPassword_again.trim() != newPassword.trim()) {
            showErrMsg("两次密码不一致");
            return;
        }
        $.post(path + "/auth/user/editPassword.htm", {
            phone: "${user.phone}",
            oldPassword: oldPassword,
            newPassword: newPassword
        }, function(data) {
            eval("var _data = " + data);
            if (_data.status == "1") {
                showTipsMsg("修改成功");
            } else {
                return showErrMsg(error[_data.status]);
            } 
        });
    });

    //我的私信已回复
    $("#replied").click(function() {
        $.getJSON(path + "/letter/frontList.htmlx?creatorid=${sessionScope.login_user_front.user_id}&IsReply=1&callback=?",
            function(data) {
                $("#replied_say").empty();
                for (var i = 0; i < data.length; i++) {
                    var li =
                        '<li>' +
                        '<div><i class="fa fa-question-circle"></i><p class="yes"><a></a><span>' + data[i].content + '</span></p></div>' +
                        '<div><i class="fa fa-commenting-o"></i><p class="no"><span>' + data[i].replycontent + '</span></p></div>' +
                        '<p class="yes_user"><span>解答者：</span><a>' + data[i].teacherName + '</a></p>' +
                        '</li>';
                    $("#replied_say").append(li);
                }
            });
    });

    //我的私信未回复
    $("#unreply").click(function() {
        $.getJSON(path + "/letter/frontList.htmlx?creatorid=${sessionScope.login_user_front.user_id}&IsReply=0&callback=?",
            function(data) {
                $("#reply_say").empty();
                for (var i = 0; i < data.length; i++) {
                    var li = '<li>' +
                        '<div><i class="fa fa-question-circle"></i><p class="yes"><a></a><span>' + data[i].content + '</span></p></div>' +
                        '</li>'
                    $("#reply_say").append(li);
                }
            });
    });


    $('#userCenter').on('click', '.tag_left li', function() {
        var right = $('.tag_right');
        var index = $(this).index();
        right.hide().eq(index - 1).show();
        $(this).parent().find('.thisclass').removeClass('thisclass');
        $(this).addClass('thisclass');
        $("#replied").click();
        attentionTable(); //获取关注表格

    })

    //右侧菜单单击事件
    $(".nav-tabs li").on('click', function() {
        var parent = $(this).parent();
        var index = $(this).index();
        var tab_content = parent.next();
        parent.find('.active').removeClass('active');
        $(this).addClass('active');
        tab_content.find('.tab-pane').hide();
        tab_content.find('.tab-pane').eq(index).show();
    })

    //生成关注表格
    function attentionTable() {
        $("#my_follow").empty();
        $("#my_follow").append('<ul class="fol_one"><li>昵称</li><li>关注时间</li><li>关注状态</li></ul>');
        $.getJSON(path + "/html/webuserTeacher/attentionList.htmlx?websiteuserid=${sessionScope.login_user_front.user_id}&callback=?",
            function(data) {
                for (var i = 0; i < data.length; i++) {
                    var nickname = data[i].title == null ? "未设置" : data[i].title;
                    var d = new Date(data[i].createtime); //根据时间戳生成的时间对象
                    var date = (d.getFullYear()) + "-" +
                        (d.getMonth() + 1) + "-" +
                        (d.getDate()) + " " +
                        (d.getHours()) + ":" +
                        (d.getMinutes()) + ":" +
                        (d.getSeconds());
                    var $ul = $('<ul>' +
                        '<li>' + nickname + '</li>' +
                        '<li>' + date + '</li>' +
                        '<li style="text-align:center;"><input class="btn btn-default" type="button" value="已关注"></li>' +
                        '</ul>');
                    $ul.data("id", data[i].id);
                    $ul.data("teacherid", data[i].teacherid);
                    $("#my_follow").append($ul);
                }
            });
    }
    //取消关注
    $("#my_follow").on("click", "input", function() {
        var $ul = $(this).parents("ul");
        var id = $ul.data("id");
        var teacherid = $ul.data("teacherid");
        if (id == null || teacherid == null) {
            showErrMsg("系统错误");
            return;
        }
        showConfirmMsg("确定要取消关注吗？", function() {
            $.post(path + "/html/webuserTeacher/attention.htmlx", {
                id: id,
                teacherid: teacherid
            }, function(data) {
                attentionTable();
            });
        });

    });
    //意见反馈
    $("#feedback_btn").on("click", function() {
        var creatorid = "${sessionScope.login_user_front.user_id}";
        var content = $("#textarea").val().trim();
        if (creatorid == null) {
            showErrMsg("请先登录");
            return;
        }
        if (content == "") {
            showErrMsg("请填写反馈意见");
            return;
        }
        $.post(path + "/feedback/add.htm", {
            creatorid: creatorid,
            content: content
        }, function(data) {
            showTipsMsg(data);
        });
        $("#textarea").val("");
        $("#textCount").text(200);
    });

});

function loadProvince() {
    $.post(path + "/address/queryProvience.htm", {}, function(data) {
        eval("var _data = " + data);
        var _html = "";
        var _id = "${user.provinceid}";
        _html += "<option value='-1'>请选择</option>";
        for (var i = 0; i < _data.length; i++) {
            _html += "<option value='" + _data[i].address_id + "'>" + _data[i].address_name + "</option>";
        }
        $("#province_input").html(_html);
        $("#province_input").val(_id);
    });
}

function loadCity(_id, _selectid, _init) {
    $.post(path + "/address/queryCity.htm", {
        id: _id
    }, function(data) {
        eval("var _data = " + data);
        var _html = "";
        $("#" + _selectid).html("");
        if (_data == null || _data.length == 0) {
            _html += "<option value='-1'>请选择</option>";
            $("#" + _selectid).html(_html);
            loadArea("-1", "area_input");
            return;
        }
        var _id = _data[0].address_id;
        for (var i = 0; i < _data.length; i++) {
            _html += "<option value='" + _data[i].address_id + "'>" + _data[i].address_name + "</option>";
        }
        $("#" + _selectid).html(_html);
        if (_init) {
            $("#city_input").val("${user.cityid}");
        } else {
            loadArea(_id, "area_input");
        }
    });
}

function loadArea(_id, _selectid, _init) {
    $.post(path + "/address/queryCity.htm", {
        id: _id
    }, function(data) {
        eval("var _data = " + data);
        var _html = "";
        $("#" + _selectid).html("");
        if (_data == null || _data.length == 0) {
            _html += "<option value='-1'>请选择</option>";
            $("#" + _selectid).html(_html);
            return;
        }
        for (var i = 0; i < _data.length; i++) {
            _html += "<option value='" + _data[i].address_id + "'>" + _data[i].address_name + "</option>";
        }
        $("#" + _selectid).html(_html);
        if (_init) {
            $("#" + _selectid).val("${user.areaid}");
        }

    });
}

function words_deal() {
    var curLength = $("#textarea").val().length;
    if (curLength > 200) {
        var num = $("#textarea").val().substring(0, 200);
        $("#textarea").val(num);
        showErrMsg("超过字数限制!");
    } else {
        $("#textCount").text(
            200 - ($("#textarea").val().length));
    }
}
