
var res = Vue.compile(`<div class="v-pre">
            <div class="app-about-first">
                <div class="app-about-title">公司简介</div>
                <p class="app-about-content">约牛财经创立于2016年，是由北京约牛科技有限公司全力打造的财经门户网站，包含财经资讯、直播问股、专家观点等多种功能，是集资讯、投顾、投教于一体的一站式投资服务平台</p>
            </div>
            <div class="app-about-first">
                <div class="app-about-title">证券咨询服务提供</div>
                <p class="app-about-content">云南产业投资管理有限公司 编号：zx0093</p>
                
                <img src="./images/about/certificate_02.jpg" alt="">
                <img src="./images/about/certificate_03.jpg" alt="">
            </div>
        </div>`)
const vm=new Vue({
    el:'#app',
    render:res.render,
    staticRenderFns: res.staticRenderFns
})