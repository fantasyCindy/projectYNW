<template>
  <div class="comp-app">
    <header-comp></header-comp>
    <router-view></router-view>
  </div>
</template>
<script>

import HeaderComp from "./common/Header";
import FooterComp from "./common/Footer";
export default {
  components: { HeaderComp, FooterComp}
};
</script>
