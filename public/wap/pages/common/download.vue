<template>
  <div id="art" v-show="close" :visible="visible"><a href="http://www.yuetougu.com/app/returnAppJsp.htm"><img src="/public/wap/images/download.png"/></a><span class="close icon-close" @click="close = false"></span></div>
</template>
<script>
export default {
  data(){
      return {
          close:false
      }
  },
  props:{
      visible:{
          default:0
      }
  },
  watch:{
      visible(){
          this.close = true
      }
  }
}
</script>


<style>
#art{
	position:fixed;
	left:0;
	top:0;
	right:0;
	bottom:0;
	transition:all .3s;
	z-index:1000;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, .5);
}
#art img{
	width:78%;
	margin-left:auto;
	margin-right:auto;
	display:block;
	margin-top:1.5rem;
}
#art .icon-close{
	display:block;
	width:1.2rem;
	height:1.2rem;
	margin-left:auto;
	margin-right:auto;
	margin-top:1rem;
	background:url(/public/wap/images/close.png) no-repeat;
    background-size:1.2rem;
}
</style>
