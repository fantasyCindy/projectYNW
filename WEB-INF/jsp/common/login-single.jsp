<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title></title>
        <%@ include file="../common/all.jspf" %>
            <link rel="stylesheet" href="/private/register/css/login-single.css" />
    </head>

    <body>
        <%@include file="../common/head.jsp" %>
            <div id="loginSingle">
                <div class="box-bg"><img src="/public/images/login-single.jpg"></div>
                <div class="box-fg">
                    <form>
                        <div class="box">
                            <div class="line">
                                <span class="txt">账号</span>
                                <input type="text" name="userName" id="loginSingle-username" placeholder="昵称/手机号" autocomplete="off" />
                            </div>
                            <div class="line">
                                <span class="txt">密码</span>
                                <input type="password" name="password" id="loginSingle-password" placeholder="密码" autocomplete="off" />
                            </div>
                            <div class="line">
                                <button class="submit">登录</button>
                            </div>
                            <div class="line forget">
                                <a href="/user/register.htm">立即注册</a>
                                <a href="/public/user/forget.htm">忘记密码</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <%@include file="../common/foot.jsp" %>
                <script>
                $(function() {
                    var loginSingle = {
                        container:$('#loginSingle'),
                        form: null,
                        submit: null,
                        name: null,
                        pw: null,
                        init: function() {
                            this.form = this.container.find('form');
                            this.submit = this.container.find('.submit');
                            this.name = $("#loginSingle-username");
                            this.pw = $("#loginSingle-password");
                            this.event();
                        },
                        event: function() {
                            var _this = this;
                            this.submit.on('click', function(e) {
                                e.preventDefault();

                                if (!_this.name.val()) {
                                    layer.alert("请输入账号");
                                    return;
                                }

                                if (!_this.pw.val()) {
                                    layer.alert("请输入密码");
                                    return;
                                }

                                $.post('/public/login.htm', _this.form.serialize(), function(data) {
                                    data = JSON.parse(data)
                                    if (data.status == "1") {
                                        window.location.reload();
                                        return;
                                    }
                                    if (data.status == "20005") {
                                        layer.alert("密码错误")
                                        return;
                                    }
                                    if (data.status == "20007") {
                                        layer.alert("账号不存在")
                                        return;
                                    }
                                })
                            })
                        }
                    }

                    loginSingle.init()
                })
                </script>
    </body>

    </html>
