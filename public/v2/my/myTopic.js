require('~/center/center.js')
var topicList = require('./topicList.vue')
var topicPublish = require('./topicPublish.vue')

// window.location.href = __path + '/backstage/myTopic.htm#/topicList'


var router = new VueRouter({
	routes: [{
		path: '/',
		redirect: '/topicList'
	},{
		path: '/topicList',
		component: topicList
	},{
		path: '/topicPublish',
		component: topicPublish
	}]
})


new Vue({
	el: '.right',
	router,
})







$(function () {
    yn.centerMenu.init({
        render: 'my',
        light: '我的话题'
    })
})