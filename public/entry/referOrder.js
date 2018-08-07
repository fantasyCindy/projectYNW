var referOrderList = require('comp/referOrderList.vue')
var referOrderAdd = require('comp/referOrderAdd.vue')
window.location.hash = ""


var router = new VueRouter({
	routes: [{
		path: '/',
		redirect: '/referOrderList'
	},{
		path: '/referOrderList',
		component: referOrderList
	},{
		path: '/referOrderAdd',
		component: referOrderAdd
	}]
})


new Vue({
	el: '#referOrder',
	router,
	
})




