var welfare_login = require('mcomp/app-welfare-login.vue')
var welfare_register = require('mcomp/app-welfare-register.vue')
var welfare_pay = require('mcomp/app-welfare-pay.vue')
var welfare_finish = require('mcomp/app-welfare-finish.vue')

window.location.hash = ''


var href = window.location.href
var initRouter = '/welfare/register'



if (/router=[a-z\/]+/.test(href)) {
    initRouter = href.match(/router=([a-z\/]+)/)[1]
}

var router = new VueRouter({
    routes: [{
        path: '/',
        redirect: initRouter
    }, {
        path: '/welfare/register',
        component: welfare_register
    }, {
        path: '/welfare/login',
        component: welfare_login
    }, {
        path: '/welfare/pay',
        component: welfare_pay
    }, {
        path: '/welfare/finish',
        component: welfare_finish
    }]

})

new Vue({
    el: '#app-welfare',
    watch:{
        '$route':function(to,from){
            if(to.path == '/welfare/register'){
                document.title = '注册'
            }else if(to.path == '/welfare/login'){           
                document.title = '登录'
            }else if(to.path == '/welfare/pay'){           
                document.title = '购买'
            }
        }
    },
    router,
    created() {

    }
})
