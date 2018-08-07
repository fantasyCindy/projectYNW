$(function() {

    require('~/center/center.js')
    var local = require('m/lib/localData.js')
    yn.centerMenu.init({ render: 'my', light: '我的观点' });

    var list = require('comp/myOpinion-list.vue')
    var pub = require('comp/myOpinion-pub.vue')

    var router = new VueRouter({
        routes: [
            { path: "/", component: list },
            { path: "/pub", component: pub }
        ]
    })

    var vm = new Vue({
        el: '#contentWrap',
        router
    })

})
