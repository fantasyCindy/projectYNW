<template>
  <div class="nav">
    <div tag="div"  class="item" v-for="item in items" :key="item.id" :class="{active:activeNav == item.id}" @click="go(item)">{{item.text}}</div>
  </div>
</template>
<script>
import { NavData } from "../../enum";
export default {
  data(){
    return {
      items: NavData
    }
  },
  computed:{
    activeNav(){
      return this.$store.state.activeNav
    }
  },
  methods:{
   go(item){
     this.$store.commit({
       type:'set',
       path:'activeNav',
       reducer:item.id
     })
     this.$router.push(item.to)
   }
  }
};
</script>
<style scoped>
.nav {
  width: 10rem;
  background: white;
  text-align: center;
  margin: 1.5rem auto 0.4rem auto;;
}
.item {
  padding: .15rem .533rem;
  cursor: pointer;
  display: inline-block;
  border-radius: 16px;
  font-size:.373rem;
  margin:0 .267rem;
  background:#f5f5f5;
  color:#333;
}

.item.active {
  background: #d52720;
  color: white;
}
</style>
