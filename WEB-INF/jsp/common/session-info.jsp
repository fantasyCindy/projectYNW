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
        ynTeacherId = '${sessionScope.Teacher.teacherid}';
        ynIsLogin = "${loginFlag}";
        ynIsTeacher = "${sessionScope.login_user_front.isteacher}"
        ynUserId = "${sessionScope.login_user_front.user_id}";
        ynTeacherName = '${sessionScope.Teacher.nickname}';
        ynUserName = '${sessionScope.login_user_front.nickname}'
        console.log('ynIsLogin = ' + ynIsLogin);
        console.log('ynIsTeacher = ' + ynIsTeacher);
        console.log('ynUserId = ' + ynUserId);
        console.log('ynTeacherId = ' + ynTeacherId);
        console.log('ynTeacherName = ' + ynTeacherName);
        console.log('ynUserName=' + ynUserName)
        </script>
