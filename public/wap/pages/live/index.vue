<template>
    <div class="live">
        <Nav></Nav>
        <Tab :items="TabData" @select="tabSelect"></Tab>
        <div class="live-wrap">
            <Popular :items="list" v-show="selectType<3" ref="popular"></Popular>
            <newLive :items="list" v-show="selectType == 3"></newLive>
        </div>
        <Footer></Footer>
        <toTop v-show="topShow"></toTop>
    </div>
</template>
<script>
import Tab from "../common/tab";
import Nav from "../common/nav";
import Footer from "../common/Footer"
import Popular from "./popular"
import newLive from "./newLive"
import toTop from "../common/toTop";
import {
    TabData
} from "../../enum";
import {mapState} from 'vuex'
export default {
    components: {
        Tab,
        Nav,
        Footer,
        Popular,
        newLive,
        toTop
    },
    data() {
        return {
            TabData,
            selectType: 2,
            list: []
        };
    },
    computed:{
        ...mapState({
            topShow: state => state.toTopShow
        })
    },
    methods: {
        tabSelect(item) {
            this.selectType = item.type
            this.$refs.popular.changeType(item.type)
        },
    },
    mounted() {
        this.$refs.popular.changeType(2)
        this.$store.commit({
            type: 'set',
            path: 'activeNav',
            reducer: 0
        })
    }
};
</script>
<style scoped>
.live {
    width: 100%;
}

.live-wrap {
    background: #f5f5f5;
    padding: 0.1rem 0.35rem;
}

#new_live {
    width: 9.33rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0.3rem auto 0 auto;
}
</style>
