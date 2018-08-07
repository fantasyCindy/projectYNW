<template>
  <div id="Animation" v-show="showModule"></div>
</template>
<script>
const SVGA = require("svgaplayerweb");
export default {
  data() {
    return {
      showModule: false,
      giftList: {
        19: "/public/live/images/red.svga",
        20: "/public/live/images/flower.svga",
        21: "/public/live/images/thanks.svga",
        22: "/public/live/images/stock.svga",
        23: "/public/live/images/makemoney.svga",
        24: "/public/live/images/feast.svga",
        25: "/public/live/images/fu.svga",
        26: "/public/live/images/god.svga",
        28: "/public/live/images/driver.svga"
      },
      giftid: []
    };
  },
  methods: {
    //   接收礼物ID并添加进队列
    giftId(id) {
      if (this.giftid.length < 1) {
        this.giftid.push(id);
        this.animatePlay();
      } else {
        this.giftid.push(id);
      }
    },
    // 根据礼物队列来展示动画
    animatePlay() {
      this.showModule = true;
      let player = new SVGA.Player("#Animation");
      let parser = new SVGA.Parser("#Animation"); // Must Provide same selector eg:#Animation IF support IE6+
      parser.load(this.giftList[this.giftid[0]], function(videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
      });
      player.loops = 1; //0为无限循环

      player.onFinished(() => {
        if (this.giftid.length < 2) {
          this.showModule = false;
        }else{
          this.animatePlay();
        }
        this.giftid.shift();
      });
    }
  },
  mounted() {
    
  }
};
</script>
<style lang="scss" scoped>
#Animation {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index:1;
}
</style>
