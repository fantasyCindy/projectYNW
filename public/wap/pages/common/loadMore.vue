<template>
  <div class="loadMore" ref="el">
    <div class="center">
      <span class="loading" v-show="visible">
        <img width="16" src="/public/wap/images/loading.gif">
      </span>
      <span class="text">{{text}}</span>
    </div>
  </div>
</template>
<script>
const HEIGHT = window.screen.height;
export default {
  data() {
    return {
      path: window.imagesPath
    };
  },
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    text() {
      return this.visible ? "正在加载" : "没有数据了";
    },
    scroll() {
      return this.$store.state.scroll;
    }
  },
  watch: {
    scroll() {
      if (!this.visible) return;
      const el = this.$refs.el;
      const rect = el.getBoundingClientRect();
      const scrollTop1 = rect.top + document.documentElement.scrollTop;
      const scrollTop2 = rect.top + document.body.scrollTop;
      const should = scrollTop1 < HEIGHT || scrollTop2 < HEIGHT
      console.log("should",should)
      if (should) {
        this.$emit("loading");
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.center {
  text-align: center;
  padding: 10px 0;
}
img {
  position: relative;
  top: 3px;
}
.loading img{
  width:16px;
}
</style>