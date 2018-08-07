<template>
  <div id="zoom" v-show="moduleShow" @click.stop="hidden">
    <div class="zoom-wrap">
      <img class="zoom-img" @click.stop="" :src="src" alt="">
    </div>
  </div>
</template>
<script>
  export default {
      data(){
        return {
            moduleShow: false,
            src:null
        }
      },
      methods:{
        showModule(src){
          this.src = src ? src : '';
          this.moduleShow = true;
        },
        hidden(){
          this.moduleShow = false;
          this.src = null;
        }
      }
  }
</script>
<style lang="scss" scoped>
#zoom{
  width:100%;
  height:100%;
  background:rgba(0,0,0,.4);
  position:fixed;
  top:0;
  left:0;
  z-index:3;
    .zoom-wrap{
      position:relative;
      width:100%;
      height:100%;
      overflow: auto;
      .zoom-img{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        max-height:900px;
        max-width:1900px;
        width:auto;
      }
    }
}
</style>
