<template>
    <div id="new_live">
        <div class="new_live_list" v-for="id in ids" :key="id" @click="goRoom(id)">
            <div class="new_live_list_name">{{byId[id]._title}}</div>
            <div class="new_live_list_photo">
                <span class="new_live_btop" v-show="byId[id].is_btop"></span>
                <span class="new_live_tphoto"><img :src= "byId[id].photo_path" alt=""></span>
                <i class="new_live_teacherIcon"><img :src="byId[id].type_ioc" alt=""></i>
            </div>
            <div class="new_live_list_line" v-show="type == 2">
                <span class="new_live_num">{{byId[id].liveContentCount}}条</span>直播内容
            </div>
            <div class="new_live_list_line" v-show="type == 1">
                参与人数<span class="new_live_num">{{byId[id]._popularity}}</span>
            </div>
            <div class="new_live_speciality-wrap">
                <span v-for="short in byId[id].short" class="new_live_list_speciality" :key="short">{{short}}</span>
            </div>
            <i class="new_live_line"></i>
            <div class="new_live_list_bottom">
                <div class="new_live_status"><i :class="{icon0:!byId[id].status}" class="new_live_status_icon1"></i>{{byId[id].isLive}}</div>
                <div class="new_live_btn" v-show="!byId[id]._isAttention" v-on:click.stop="care(byId[id])"><i class="care-icon"></i>关注</div>
                <div class="new_live_btn cancel" v-show="byId[id]._isAttention" v-on:click.stop="care(byId[id])"><i class="care-icon cancel"></i>取消关注</div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getPopLive,
    attention
} from '../../api';
import {
    Toast
} from 'vant';
import {
    mapState
} from 'vuex'


export default {
    data() {
            return {
                ids: [],
                type: 2,
            }
        },
        computed: {
            ...mapState({
                activeIds: state => state.live.activityTeachers,
                popularIds: state => state.live.popularTeachers,
                byId: state => state.live.teachersById,
                shouldMore: state => state.live.shouldLoadMoreLive,
            }),
        },
        watch: {
            activeIds(value) {
                if (this.type == 2) {
                    this.ids = value
                }
            }
        },

        methods: {
            care(item) {
                if (!ynIsLogin) {
                    localStorage['route-path'] = this.$route.path
                    this.$router.push('/Login')
                    return
                }
                this.$store.dispatch('careTeacher', item)
            },
            goRoom(item) {
                this.$router.push('/live/room/' + item)
            },
            changeType(value) {
                this.type = value
                const types = {
                    1: this.popularIds,
                    2: this.activeIds
                }
                types[value] && (this.ids = types[value])
            }
        },
        mounted() {}
}
</script>
<style scoped>
/*active*/

a {
    display: block;
}

#new_live .new_live_list {
    width: 4.16rem;
    height: 5rem;
    margin-bottom: 0.4rem;
    padding: 0.4rem 0.2rem 0.2rem;
    background: red;
    background: #fff;
    box-shadow: 2px 2px 5px 1px #d2d2d2;
    text-align: center;
}

.new_live_list:active {
    background: rgba(0, 0, 0, .05) !important;
}

.new_live_list .new_live_list_name {
    color: #000;
    font-size: 0.4rem;
    text-align: center;
}

.new_live_list .new_live_list_photo {
    position: relative;
    display: block;
    text-align: center;
}

.new_live_btop {
    display: inline-block;
    position: absolute;
    top: .12rem;
    right: 0.55rem;
    width: 1.28rem;
    height: .613rem;
    background: url(/public/wap/images/icon-btop.png) no-repeat;
    background-size: 100%;
}

.new_live_list .new_live_tphoto {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    overflow: hidden;
    margin: 0.4rem auto;
    position: relative;
    left: 0.1rem;    
    border: 1px solid #f5f5f5;
}

#new_live img {
    width:100%;
    height: 100%;
}

.new_live_list .new_live_teacherIcon {
    display: inline-block;
    width: 0.30rem;
    position: relative;
    left: -0.21rem;
    top: -0.45rem;
}

.new_live_teacherIcon img {
    width: 100%;
}

.new_live_list .new_live_list_line {
    text-align: center;
    color: #666;
    font-size: 0.35rem;
}

.new_live_list .new_live_num {
    color: red;
    margin: 0 0.15rem;
}

.new_live_speciality-wrap {
    height: 1.44rem;
}

.new_live_list .new_live_list_speciality {
    display: inline-block;
    padding: 0.15em 0.3em;
    margin: 0.4rem auto;
    font-size: 0.35rem;
    border: 1px solid #5da5fd;
    border-radius: 0.1rem;
    color: #5da5fd;
}

.new_live_list .new_live_list_bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 0.37rem;
    color: #666;
    font-size: 0.35rem;
    cursor: pointer;
}

.new_live_list .new_live_status_icon1.icon0 {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.1rem;
    background: url(/public/wap/images/icon-live.png) no-repeat center;
    background-size: 0.3rem;
}

.new_live_list .new_live_status_icon1 {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 0.1rem;
    background: url(/public/wap/images/icon-offline.png) no-repeat center;
    background-size: 0.3rem;
}

.care-icon {
    display: inline-block;
    width: .32rem;
    height: .252rem;
    margin-right: 0.1rem;
    background: url(/public/wap/images/icon-care.png) no-repeat center;
    background-size: .32rem .252rem;
}

.care-icon.cancel {
    display: inline-block;
    width: .32rem;
    height: .251rem;
    margin-right: 0.1rem;
    background: url(/public/wap/images/icon-cancel.png) no-repeat center;
    background-size: .32rem .251rem;
}

.new_live_list .new_live_btn {
    color: #ff5054;
}

.new_live_list .new_live_btn.cancel {
    color: #999;
}
.new_live_line{
    display: block;
    width:100%;
    height:1px;
    background:#f5f5f5;
}
</style>
