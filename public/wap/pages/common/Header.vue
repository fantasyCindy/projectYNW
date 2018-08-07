<template>
  <div class="header logo-bar">
        <a href="/mobile/m-live.htm"><img src="http://m.live.yuetougu.com/public/images/yn-h5/logo.jpg"></a>
        约投顾<span @click="logout">退出</span>
        <a href="http://www.yuetougu.com/app/returnAppJsp.htm" class="download">下载APP</a>
    </div>
</template>
<script>
    export default{
        data(){
            return{}
        },
        methods:{
            logout(){
                this.$store.dispatch('logout')
            }
        }
    }
</script>
<style scoped>
.logo-bar{
    width:100%;
	height:1.2rem;
	text-align:center;
	background:#d52720;
	font-size:.48rem;
	color:#fff;
	line-height:1.2rem;
	position:fixed;
    top:0;
    left:0;
    z-index:100;
}
.logo-bar img{
	width:0.76rem;
	position:absolute;
	left:0.4rem;
	top:0.3rem;
}
.logo-bar a.download{
	display: inline-block;
    position: absolute;
    right: .35rem;
    top: .3rem;
    font-size: .3rem;
    border: .015rem solid #fff;
    border-radius: .1rem;
    text-align: center;
    line-height: .55rem;
    color: #fff;
    width: 1.5rem;
    height: .55rem;
}
</style>