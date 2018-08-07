<template>
    <div class="page-opinion">
        <Nav></Nav>
        <OpinionList></OpinionList>
        <Load :visible="shouldMore" @loading="loadMoreItems" v-show="LoadMore"></Load>
        <Footer></Footer>
        <toTop v-show="topShow"></toTop>
    </div>
</template>
<script>
import Nav from "../common/nav";
import Footer from "../common/Footer"
import OpinionList from "./opinionList"
import Load from '../common/loadMore'
import {mapState} from 'vuex'
import toTop from "../common/toTop";
export default {
    components: {
        Nav,
        Footer,
        OpinionList,
        Load,
        toTop
    },
    data() {
        return {
            active: 2,
            currentPage:1,
            page:30
        }
    },
    computed:{
        ...mapState({
            shouldMore: state => state.opinion.shouldLoadMoreOpinion,
            LoadMore: state => state.opinion.LoadMore,
            topShow: state => state.toTopShow
        })
    },
    methods:{
        loadMoreItems(){
            this.$store.dispatch('getOpinionList',{currentPage:++this.currentPage,pageSize:this.page})
        }
    },
    mounted() {
        this.$store.commit({
            type: 'set',
            path: 'activeNav',
            reducer: 2
        })
        this.$store.dispatch('getOpinionList',{pageSize:this.page})
    }
}
</script>
