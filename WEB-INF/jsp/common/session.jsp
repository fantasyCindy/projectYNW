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
 %>
        <script>
        /*user_id, nickname, username, phone, photo, isteacher, teacherid*/
        parent.ynTeacherId = '${sessionScope.Teacher.teacherid}';
        parent.ynIsLogin = "${loginFlag}";
        parent.ynIsTeacher = "${sessionScope.login_user_front.isteacher}"
        parent.ynUserId = "${sessionScope.login_user_front.user_id}";
        parent.ynTeacherName = '${sessionScope.Teacher.nickname}';
        parent.ynUserName = '${sessionScope.login_user_front.nickname}'
        console.log('parent.ynIsLogin = ' + parent.ynIsLogin);
        console.log('parent.ynIsTeacher = ' + parent.ynIsTeacher);
        console.log('parent.ynUserId = ' + parent.ynUserId);
        console.log('parent.ynTeacherId = ' + parent.ynTeacherId);
        console.log('parent.ynTeacherName = ' + parent.ynTeacherName);
        console.log('parent.ynUserName=' + parent.ynUserName)
        </script>
