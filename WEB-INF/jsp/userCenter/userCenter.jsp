<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
    <html lang="zh-CN">

    <head>
        <%@ include file="/WEB-INF/jsp/common/webcommon.jspf" %>
            <link href="${path}/web/css/userCenter.css" rel="stylesheet" />
            <link href="${path}/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
            <script src="${path}/web/js/jquery-1.10.2.js"></script>
            <script src="${path}/plugins/datetimepicker/js/moment-with-locales.js"></script>
            <script src="${path}/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
            <script type="text/javascript">
                $(function() {

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
                            } else if (_data.status == "-1") {
                                showErrMsg("参数不合法");
                            } else if (_data.status == "-2") {
                                showErrMsg("原密码不匹配");
                            } else if (_data.status == "-3") {
                                showErrMsg("用户不存在");
                            } else if (_data.status == "-4") {
                                showErrMsg("修改失败");
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
            </script>
    </head>

    <body>
        <!-- 引入头部 -->
        <%@include file="/commonweb/head.jsp" %>
            <div class="container" id="userCenter">
                <div class="row">
                    <div class="col-xs-12">
                        <p class="navg"><img src="${path }/web/images/house.png"><a href="">首页</a>&gt;<a href="" class="orange">个人中心</a></p>
                        <div class="center_tag">
                            <div class="tag2">
                                <div class="tag_left">
                                    <ul class="info_two">
                                        <div class="header_title"><img id="head_img" src="${path }/${user.photo}"><span>${user.name }</span>
                                            <input class="btn btn-default" id="change-img" type="button" value="修改头像" style="cursor:pointer">
                                        </div>
                                        <li class="thisclass">个人设置</li>
                                        <li>我的私信</li>
                                        <li>我的关注</li>
                                        <li>我的内参</li>
                                        <li>投诉建议</li>
                                        <li>帮助中心</li>
                                        <li>联系客服</li>
                                        <li>申请直播</li>
                                    </ul>
                                </div>
                                <div class="tag_right">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li role="presentation" class="active"><a href="javascript:void(0)" aria-controls="home" role="tab" data-toggle="tab">个人设置</a></li>
                                        <li role="presentation"><a href="javascript:void(0)" aria-controls="profile" role="tab" data-toggle="tab">修改密码</a></li>
                                        <li role="presentation"><a href="javascript:void(0)" aria-controls="messages" role="tab" data-toggle="tab">手机验证</a></li>
                                        <li role="presentation"><a href="javascript:void(0)" aria-controls="settings" role="tab" data-toggle="tab">邮箱验证</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane active" id="home">
                                            <form id="editUserFormId" name="editUserFormId" method="post" action="">
                                                <input type="hidden" name="user_id" value="${user.user_id }" />
                                                <table width="90%%" border="0">
                                                    <tr>
                                                        <td width="9%">昵　　称<span class="red">*</span></td>
                                                        <td width="70%" colspan="5">
                                                            <input type="text" class="form-control" name="nickname" id="nickname_input" placeholder="请输入您的昵称" value="${user.nickname }">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>真实姓名<span class="red">*</span></td>
                                                        <td colspan="5">
                                                            <input type="text" class="form-control" name="name" id="name_input" placeholder="请输入您的真实姓名" value="${user.name }">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>邮　　箱<span class="red">*</span></td>
                                                        <td colspan="5">
                                                            <input type="text" class="form-control" name="email" placeholder="请输入您的邮箱" value="${user.email }">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>职　　业</td>
                                                        <c:forEach items="${jobtypes }" var="job">
                                                            <td width="15%">
                                                                <label>
                                                                    <input type="radio" name="job" value="${job.id }" <c:if test="${user.job ==job.id }"> checked </c:if> />${job.job_name }</label>
                                                            </td>
                                                        </c:forEach>
                                                    </tr>
                                                    <c:if test="${fundstypes ==null }">
                                                        <tr>
                                                            <td>资金</td>
                                                        </tr>
                                                    </c:if>
                                                    <c:if test="${fundstypes !=null }">
                                                        <c:forEach items="${fundstypes }" var="funds" varStatus="status">
                                                            <c:if test="${status.index==0 }">
                                                                <tr>
                                                                    <td>资金</td>
                                                            </c:if>
                                                            <c:if test="${status.index !=0 and status.index%3==0}">
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                            </c:if>
                                                            <td<c:if test="${(status.index !=0 and status.index%2==0) or status.last }"> colspan="2"</c:if>>
                                                    <label>
                                                        <input type="radio" name="funds" value="${funds.id }" <c:if test="${user.funds ==funds.id }"> checked </c:if> />${funds.founds_name }</label>
                                                    </td>
                                                    <c:if test="${(status.index!=0 and status.index%2==0)  or (status.index%2!=0 and status.last)}">
                                                        </tr>
                                                    </c:if>
                                                    </c:forEach>
                                                    </c:if>
                                                    <c:if test="${investmenttypes ==null }">
                                                        <tr>
                                                            <td>投资风格</td>
                                                        </tr>
                                                    </c:if>
                                                    <c:if test="${investmenttypes !=null }">
                                                        <c:forEach items="${investmenttypes }" var="investment" varStatus="status">
                                                            <c:if test="${status.index==0 }">
                                                                <tr>
                                                                    <td>投资风格</td>
                                                            </c:if>
                                                            <c:if test="${status.index!=0 and status.index%4==0}">
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                            </c:if>
                                                            <td <c:if test="${(status.index!=0 and status.index%3==0) or status.last}">colspan="3"</c:if>>
                                                    <label>
                                                        <input type="radio" name="investment_style" value="${investment.id }" <c:if test="${user.investment_style ==investment.id }"> checked </c:if> />${investment.investment_name }</label>
                                                    </td>
                                                    <c:if test="${(status.index!=0 and (status.index+1)%4==0) or ((status.index+1)%4!=0 and status.last)}">
                                                        </tr>
                                                    </c:if>
                                                    </c:forEach>
                                                    </c:if>
                                                    <tr>
                                                        <td>所在地区</td>
                                                        <td>
                                                            <label for="province_input"></label>
                                                            <select name="provinceid" id="province_input">
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <label for="city_input"></label>
                                                            <select name="cityid" id="city_input">
                                                                <option value="-1">请选择</option>
                                                            </select>
                                                        </td>
                                                        <td colspan="3">
                                                            <label for="area_input"></label>
                                                            <select name="areaid" id="area_input">
                                                                <option value="-1">请选择</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>入市时间</td>
                                                        <td colspan="5">
                                                            <div style="position: relative;">
                                                                <label for="market_time_input"></label>
                                                                <input type="text" class="form-control" name="market_time" id="market_time_input" value="${user.market_time }" placeholder="入市时间">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="6" align="center">
                                                            <input id="editUser" class="btn btn-default" type="button" value="确认修改">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </form>
                                        </div>
                                        <div role="tabpanel" class="tab-pane hid" id="profile">
                                            <table width="90%%" border="0">
                                                <tr>
                                                    <td width="9%">输入旧密码</td>
                                                    <td width="80%">
                                                        <input type="password" class="form-control" name="oldPassword" id="oldPassword_input" placeholder="请输入旧密码">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>输入新密码</td>
                                                    <td>
                                                        <input type="password" class="form-control" name="newPassword" id="newPassword_input" placeholder="请输入新密码(6-16位字母或数字)">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>确认新密码</td>
                                                    <td>
                                                        <input type="password" class="form-control" id="newPassword_again_input" placeholder="请确认新密码">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <center>
                                                            <input class="btn btn-default" id="changePassword" type="button" value="确认修改">
                                                        </center>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div role="tabpanel" class="tab-pane hid" id="messages">
                                            <center><a class="red">温馨提示</a><span>手机号将用来登录和便捷升级其它服务，约投顾保证会员信息不被泄露和挪作其它用途</span></center>
                                            <div class="hid">
                                                <center>
                                                    <div class="input-group"><span class="input-group-btn">修改认证手机号</span>
                                                        <input type="text" class="form-control" placeholder="">
                                                    </div>
                                                </center>
                                                <center>
                                                    <input class="btn btn-default" type="button" value="确认">
                                                </center>
                                            </div>
                                            <div>
                                                <center>
                                                    <h3>您已完成手机验证</h3>
                                                </center>
                                                <center>
                                                    <h4>已设置验证手机号：18*******78</h4>
                                                </center>
                                                <center>
                                                    <input class="btn btn-default" type="button" value="更换手机号码">
                                                </center>
                                            </div>
                                        </div>
                                        <div role="tabpanel" class="tab-pane hid" id="settings">
                                            <center>我们会发送验证邮件到您的邮箱，收取邮件后点击邮件内的激活地址即可成功通过验证激活账号。</center>
                                            <center>
                                                <div class="input-group"><span class="input-group-btn">修改认证邮箱</span>
                                                    <input type="text" class="form-control" placeholder="">
                                                </div>
                                            </center>
                                            <center>
                                                <input class="btn btn-default" type="button" value="确认">
                                            </center>
                                        </div>
                                    </div>
                                </div>
                                <div class="tag_right hid">
                                    <!--我的私信-->
                                    <h3>我的私信</h3>
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li role="presentation" class="active"><a id="replied" aria-controls="yes" role="tab" data-toggle="tab">已回复</a></li>
                                        <li role="presentation"><a id="unreply" aria-controls="no" role="tab" data-toggle="tab">未回复</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div role="tabpane2" class="tab-pane" id="yes" style="height: 410px;overflow-y:auto;">
                                            <ul class="say" id="replied_say">
                                            </ul>
                                        </div>
                                        <div role="tabpane2" class="tab-pane hid" id="no" style="height: 410px;overflow-y:auto;">
                                            <ul class="say" id="reply_say">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="tag_right hid">
                                    <!--我的关注-->
                                    <h3>我的关注</h3>
                                    <div class="my_follow" id="my_follow" style="height: 410px;overflow-y:auto;">
                                        <ul class="fol_one">
                                            <li>昵称</li>
                                            <li>关注时间</li>
                                            <li>关注状态</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tag_right hid">
                                    <!--我的内参-->
                                </div>
                                <div class="tag_right hid">
                                    <!--投诉建议-->
                                    <h3>意见反馈</h3>
                                    <div class="opinion">
                                        <textarea placeholder="内容不超过200字" id="textarea" onkeyup="words_deal();"></textarea>
                                        <div><span><a id="textCount">200</a>/200</span>
                                            <button id="feedback_btn" class="btn btn-default" type="button">提交</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tag_right hid">
                                    <!--帮助中心-->
                                    <h3>帮助中心</h3>
                                    <div class="help_center">
                                        <ul>
                                            <li>
                                                <p>什么是股市直播?</p>
                                                <span>约投顾股市直播间是直播播主与投资者的网上互动交流平台。播主通过在自己的直播间，及时发布最新看法和观点，投资者通过互动栏与播主进行实时沟通交流，共同学习、切磋和进步。</span>
                                            </li>
                                            <li>
                                                <p>1.如何与老师进行沟通？</p>
                                                <span>在右侧"互动栏"与播主和股友进行及时交流。</span>
                                            </li>
                                            <li>
                                                <p>2. 给老师提问。</p>
                                                <span>在直播右侧"我要发纸条"，提交内容直接与播主沟通。</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tag_right hid">
                                    <!--联系客服-->
                                </div>
                                <div class="tag_right hid">
                                    <!--申请直播室-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--清除浮动-->
            <div class="clearfix"></div>
            <div class="upload-img">
                <iframe></iframe>
                <div class="thickdiv"></div>
                <div class="thickbox">
                    <div class="thicktitle"><span>上传头像</span></div>
                    <a id="closeBox" class="thickclose">×</a>
                    <div class="container">
                        <div class="imageBox">
                            <div class="thumbBox"></div>
                            <div class="spinner">Loading...</div>
                        </div>
                        <div class="action">
                            <div class="new-contentarea tc">
                                <a style="display: block;" href="javascript:void(0)" class="upload-img">
                                    <label for="upload-file">选择图片</label>
                                </a>
                                <input class="" name="upload-file" id="upload-file" type="file">
                            </div>
                            <input id="btnCrop" class="Btnsty_peyton" value="预览" type="button">
                            <input id="btnZoomIn" class="Btnsty_peyton" value="+" type="button">
                            <input id="btnZoomOut" class="Btnsty_peyton" value="-" type="button">
                        </div>
                        <div class="cropped"></div>
                    </div>
                    <button>确认上传</button>
                    <span>确认上传前，请先预览效果。</span>
                </div>
            </div>
            <!-- 引入尾部 -->
            <%@include file="/commonweb/foot_nosuspend.jsp" %>
                <script type="text/javascript">
                    var user_id = "${user.user_id}";
                    $(window).load(function() {
                        var options = {
                            thumbBox: '.thumbBox',
                            spinner: '.spinner',
                            imgSrc: ''
                        }
                        var cropper = $('.imageBox').cropbox(options);
                        $('#upload-file').on('change', function() {
                            var reader = new FileReader();
                            reader.onload = function(e) {
                                options.imgSrc = e.target.result;
                                cropper = $('.imageBox').cropbox(options);
                            }
                            reader.readAsDataURL(this.files[0]);
                            this.files = [];
                        })
                        $('#btnCrop').on('click', function() {
                            var img = cropper.getDataURL();
                            $('.cropped').html('');
                            $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:64px;margin-top:4px;border-radius:10px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
                            $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:128px;margin-top:4px;border-radius:10px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
                            $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:180px;margin-top:4px;border-radius:10px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
                            $('.thickbox>button').off('click').on('click', function() {
                                $.ajax({
                                        url: path + '/auth/user/headImgUpload.htm',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: {
                                            dataImg: img,
                                            updateEntity: true,
                                            user_id: user_id
                                        }
                                    })
                                    .done(function(data) {
                                        var data = eval(data);
                                        if (data.status == 1) {
                                            var img_srcFilePath = data.returnPath;
                                            $('.upload-img').css('display', 'none');
                                            $("#head_img").attr("src", path + "/" + img_srcFilePath);
                                            $('body').css('overflow', 'scroll');
                                        } else {
                                            alert('头像上传失败，请稍后重试。');
                                        }
                                    })
                                    .fail(function() {
                                        alert('头像上传失败，请稍后重试。');
                                    });
                            });
                        })
                        $('#btnZoomIn').on('click', function() {
                            cropper.zoomIn();
                        })
                        $('#btnZoomOut').on('click', function() {
                            cropper.zoomOut();
                        });

                    });
                </script>
                <script src="${path }/plugins/cropbox/cropbox.js"></script>
    </body>

    </html>