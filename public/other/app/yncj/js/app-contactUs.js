
var res = Vue.compile(`<div class="v-pre">
            <div class="app-contact-card">
           <div class="app-company-name">云南产业投资管理有限公司</div>
           <div class="app-company-location">地址：云南省昆明市南屏街88号世纪广场B1座10楼</div>
       </div>
       <div class="app-contact-card">
           <div class="app-company-name">云南产业投资管理有限公司郑州分公司</div>
           <div class="app-company-location">地址：郑州市金水区丰庆路与三全路交叉口西南角瀚宇国际10楼
        </div>
       </div>
       <div class="app-contact-card">
           <div class="app-company-phone">投诉电话<a href="tel:010-81912454" class="app-contact-num">010-81912454</a></div>
       </div>
       <div class="app-contact-card">
           <div class="app-company-phone">咨询电话<a href="tel:010-81912454" class="app-contact-num">010-81912454</a></div>
       </div>
        </div>`)
const vm = new Vue({
    el: '#app',
    render: res.render,
    staticRenderFns: res.staticRenderFns
})