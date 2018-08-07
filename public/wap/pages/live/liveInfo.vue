<template>
    <div class="page-liveInfo">
        <div class="none" v-show="liveData.length < 1">
            <div class="none-text">暂无直播</div>
        </div>
        <div class="liveInfo-list" v-for="item in liveData" :key="item.id" v-show="liveData.length >= 1">
            <div class="liveInfo-line1">
                <span class="inline photo"><img :src="item.teacherPhoto_path" :alt="item.teacherName" @click="goCenter(item)"></span>
                <span class="inline time">{{item._pubtime}}</span>
            </div>
            <div class="liveInfo-line2" v-html="item._text"></div>
            <div class="images">
            <div v-for="(image, index) in item._imagesPath" :key="image" @click="preview(item._imagesPath, index)" class="imgbox" :style="{background:'black url('+image+')no-repeat center center',backgroundSize:'auto 100%'}"></div>
          </div>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex';
import {ImagePreview } from 'vant'
export default {
    data() {
            return {
                sinceId: '',
            }
        },
        computed: {
            ...mapState({
                liveData: state => state.live.liveData,
                pid: state => state.pid
            })
        },
        methods: {
            preview: (images,index) => ImagePreview(images,index),
            getMore() {
                if (this.liveData == '') return
                this.sinceId = this.liveData[this.liveData.length - 1].id
                this.$store.dispatch('queryLiveInfo', {
                    periodicalid: this.pid,
                    id: this.sinceId
                })
            },
            loadMoreItems() {
                this.getMore()
            },
            goCenter(item){
                if(item.teacherid){
                    this.$router.push('/center?teacherid=' + item.teacherid)
                }
            }
        },
        mounted(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
}
</script>
<style scoped>
.inline {
    display: inline-block;
}

.page-liveInfo {
    padding: 0.5rem 0.5rem 0 0.5rem;
    overflow: auto;
}
.liveInfo-list{
    border-left:1px solid #e3e3e3;
    margin-left:0.45rem;
    padding:0.5rem 0;
}
.photo {
    width: .827rem;
    height: .827rem;
    border-radius: 50%;
    overflow: hidden;
}

.photo img {
    width:100%;
    height: 100%;
}

.time {
    position: relative;
    top: -0.3rem;
    left: 0.25rem;
    font-size: 0.31rem;
    color: #666;
}

.liveInfo-line1 {
    position:relative;
    left:-0.42rem;
    top:-0.5rem;
}
.liveInfo-line2 {
    color: #333333;
    margin: 0 0 0 0.8rem;
    font-size: 0.36rem;
    line-height: 0.5rem;
    word-wrap: break-word;
}
.none {
    width: 4.907rem;
    height: 2.32rem;
    background: url(../../images/none-live.png) no-repeat center;
    background-size: 4.907rem 2.32rem;
    margin: 0 auto;
    text-align: center;
    position: relative;
    padding-top: 5.8rem;
}
.none-text {
    color: #999;
}
.images {
    margin-left:0.435rem;
    /*border-left:1px solid #e3e3e3;*/
}
.imgbox {
  width: 1.5789rem;
  height: 1.5789rem;
  overflow: hidden;
  margin-left: 0.4rem;
  margin-bottom:0.3rem;
}
</style>
