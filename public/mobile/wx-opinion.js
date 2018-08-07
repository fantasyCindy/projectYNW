var lo = require('m/lib/lo.js')
FastClick.attach(document.body)

/*///////////////////////////////////////////////////////////////////*/

var list = require('mobile/wx-opinion.vue')
var detail = require('mobile/wx-opinion-detail.vue')


var router = new VueRouter({
    routes: [
        { path: '', component: list },
        { path: '/detail', component: detail },
    ]
})


new Vue({
    el: '#app',
    data: {
        style: {
            app: {
                width: '100%',
                height: screenHeight + "px"
            }
        }
    },
    router
})
