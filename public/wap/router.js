import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Live from "./pages/live"; //直播首页
import Ask from "./pages/ask"; //问股首页
import Meeting from "./pages/meeting"; //圆桌首页
import Opinion from "./pages/opinion"; //观点首页
import Login from "./pages/Login"; //登录
import Register from "./pages/Register"; //注册
import LiveRoom from "./pages/live/liveRoom"; //直播室
import ChatRoom from "./pages/live/chatRoom"; //
import Center from "./pages/center"; //个人主页
import CenterDetail from "./pages/center/teacherDetail"; //个人主页

export default new VueRouter({
    routes: [
        { path: "/", redirect: "/live/list" },
        { path: "/live/list", component: Live },
        { path: "/live/room/:teacherid", component: LiveRoom },
        { path: "/live/chatroom/:teacherid", component: ChatRoom },
        { path: "/ask/list", component: Ask },
        { path: "/meeting/list", component: Meeting },
        { path: "/opinion/list", component: Opinion },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/center", component: Center },
        { path: "/center/detail", component: CenterDetail },
        { path: "/center/detail", component: CenterDetail },
    ]
});