import { Promise } from 'es6-promise';
import Vue from 'vue';
import './component'
import VueRouter from "vue-router";
import { Toast } from 'vant';
Vue.use(VueRouter)
Vue.use(Toast);


import App from './pages/App';
import Register from './pages/Register';
import TeacherCenter from './pages/center/teacherDetail';
import Login from './pages/Login';

import router from "./router";
import store from "./store";




new Vue({ 
	el: '#app', 
	store,
	router,
	render: (h) => h(App)
});
