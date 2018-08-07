$(function() {

    require('~/center/center.js')
    var local = require('m/lib/localData.js')
    yn.centerMenu.init({ render: 'my', light: '我的战法' });

    var list = require('comp/myTactics-list.vue')
    var pub = require('comp/myTactics-pub.vue')

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
