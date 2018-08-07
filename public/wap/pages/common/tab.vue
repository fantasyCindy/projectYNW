<template>
  <div class="tab">
    <span class="item" v-for="item in items" :key="item.id" :class="{active:active == item.id}" @click="tabClick(item)">{{item.text}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: ""
    };
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  watch: {
    items(val) {
      if (val.length > 0) {
        this.active = val[0].id;
      }
    }
  },
  methods: {
    tabClick(item) {
      this.active = item.id;
      this.$emit("select", item);
    }
  }
};
</script>
<style scoped>
.tab {
  background:#fff;
  width:9.3rem;
  margin:0 auto;
  border-top:1px solid #f5f5f5;
}
.item {
  display: inline-block;
	width:0.9rem;
	padding:0.4rem 0;
	margin-right: 0.4rem;
	font-size:0.35rem;
	text-align: center;
	color:#666;
	border-bottom:0.05rem solid #fff;
}

.item.active {
  border-bottom:0.05rem solid #d72621;
	color:#d72621;
}
</style>
