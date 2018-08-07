<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <%
     String username = "";
     String password = "";
     //获取当前站点的所有Cookie
     Cookie[] cookies = request.getCookies();
     if(cookies != null){
     //对cookies中的数据进行遍历，找到用户名、密码的数据
         for (int i = 0; i < cookies.length; i++) {
             if ("username".equals(cookies[i].getName())) {
                 username = cookies[i].getValue();
             } else if ("password".equals(cookies[i].getName())) {
                 password = cookies[i].getValue(); 
             }
         }
     }

     String jsessionid=session.getId();
    pageContext.setAttribute("jsessionid", jsessionid);
 %>
        <div id="contentart">
            <div id="login">
                <div class="topti">
                    <span class="title">登录</span>
                    <span class="close"><i class="fa fa-times"></i></span>
                </div>
                <div class="w300">
                    <form id="yn-form-login">
                        <div class="prompt" id="prompt" style="display: none;">
                            <img src="/public/images/stop.png">
                            <span id="errorMsg">账户名与密码不匹配，请重新输入</span>
                        </div>
                        <div class="inpt phone">
                            <a><i class="fa fa-user"></i></a>
                            <input type="text" name="userName" placeholder="昵称/已验证手机号">
                        </div>
                        <div class="inpt password">
                            <a><i class="fa fa-lock"></i></a>
                            <input type="password" name="password" placeholder="密码">
                        </div>
                        <div class="box">
                            <!-- <input type="checkbox" value="y" name="isLogin" /> -->
                            <!-- <span>自动登录</span> -->
                            <a href="/public/user/forget.htm" target="_blank" class="fr">忘记密码？</a>
                        </div>
                        <div class="info">
                            <button class="submit">登录</button>
                        </div>
                        <p class="three"><span>第三方登录</span></p>
                        <center class="threepto">
                            <a href="/qqlogin.htm"><img src="/public/images/qq.png" onclick=""></a>
                            <a href="/weixinLogin.htm"><img src="/public/images/weix.png" onclick=""></a>
                            <a href="/weibologin.htm" id="wb_connect_btn"><img src="/public/images/sina.png" onclick=""></a>
                        </center>
                        <center class="register">还没有帐号?<a href="/user/register.htm" target="_blank">立即注册</a></center>
                    </form>
                </div>
                    <div class="act activity-refer" style="overflow: hidden;"><a onclick="activity.render()" style="display: inline-block;width:100%"><img style="width:100%;" src="/public/v2/index/images/ditu.png?333" alt=""></a></div>
            </div>
        </div>
        <script>
        /* beautify preserve:start */

        var __path = '${path}';
        var jsessionid = '${jsessionid}'
        var __soketHost = __path.replace("http:", "");
        ynTeacherId = '${sessionScope.Teacher.teacherid}';
        ynIsLogin = ${sessionScope.login_user_front.user_id != null};
        ynIsTeacher = ${sessionScope.login_user_front.isteacher == 1};
        ynUserId = "${sessionScope.login_user_front.user_id}";
        ynTeacherName = '${sessionScope.Teacher.nickname}';
        ynUserName = '${sessionScope.login_user_front.nickname}';

        /* beautify preserve:end */


        // 公共推送
        var COMMONSOKCET = function() {
            var host = __path.replace("http:", "");
            try {
                var webSocket;
                webSocketPath = "ws:" + host + "/websocket";
                webSocket = new ReconnectingWebSocket(webSocketPath);
                webSocket.debug = true;
                webSocket.timeoutInterval = 5400;
                webSocket.onopen = function(event) {
                    var key = [0, 0, 0, 0].join('_')
                    webSocket.send(key);
                };
                webSocket.onmessage = function(event) {
                    var data = JSON.parse(event.data);
                    console.log('---push---', data)
                    ynSocket.dispatch(data);
                };
            } catch (e) {
                return;
            }
        }()
        var YNSOCKET = function() {
            var host = __path.replace("http:", "");
            var tid = ynTeacherId || "0";
            var uid = ynUserId || "0";
            if (tid !== "0") {
                uid = "0"
            }

            if (!ynUserId) {
                return;
            }

            try {
                var webSocket;
                webSocketPath = "ws:" + host + "/websocket";
                webSocket = new ReconnectingWebSocket(webSocketPath);
                webSocket.debug = true;
                webSocket.timeoutInterval = 5400;
                webSocket.onopen = function(event) {
                    var key = [0, uid, tid, 0].join('_')
                    webSocket.send(key);
                };
                webSocket.onmessage = function(event) {
                    var data = JSON.parse(event.data);
                    console.log('---push---', data)
                    ynSocket.dispatch(data);
                };
            } catch (e) {
                return;
            }
        }()
        </script>
