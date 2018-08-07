var lo = require('m/lib/lo.js')
FastClick.attach(document.body)

/*///////////////////////////////////////////////////////////////////*/

var list = require('mobile/wx-ask.vue')
var detail = require('mobile/wx-ask-detail.vue')
var question = require('mobile/wx-ask-question.vue')


window.layer = require('m/mobile/layer.js').get()

var router = new VueRouter({
    routes: [
        { path: '', component: list },
        { path: '/detail', component: detail },
        { path: '/question', component: question },
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
