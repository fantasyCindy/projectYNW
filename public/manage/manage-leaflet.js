var leaflet_list = require('comp/leaflet-list.vue') // 列表页
var leaflet_detail = require('comp/leaflet-detail.vue') // 详情页

var router = new VueRouter({
    routes: [
        { path: '/', component: leaflet_list },
        { path: '/detail', component: leaflet_detail }
    ]
})

new Vue({
    el: '#app',
    router
})
