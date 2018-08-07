<template>
    <div id="new_live">
        <div class="ranking_live_list" v-for="id in newTeachers" :key="byId[id].teacherid" @click.stop="goCenter(byId[id])">
            <div class="ranking_live_photo">
                <span class="ranking_live_tphoto">
                        <img :src="byId[id].photo_path" alt="">
                    </span>
                <i class="new_live_teacherIcon">
                        <img :src="byId[id].type_ioc" alt="">
                    </i>
            </div>
            <span class="ranking_live_name">{{byId[id]._title}}</span>
            <div class="ranking_live_live">
                <div class="ranking_live_speciality">
                    <span v-for="short in byId[id].shortSpecialty" :key="short" class="ranking_live_skill">{{short}}</span>
                </div>
                <div class="ranking_live_btn" v-show="!byId[id]._isAttention" @click.stop="care(byId[id])"><i class="care-icon"></i>关注</div>
                <div class="ranking_live_btn cancel" v-show="byId[id]._isAttention" @click.stop="care(byId[id])"><i class="care-icon cancel"></i>取消关注</div>
            </div>
            <div class="ranking_live_title">个人介绍</div>
            <div class="ranking_live_content">{{byId[id]._description}}</div>
            <i class="new_live_line"></i>
            <div class="ranking_live_room">
                <div class="ranking_live_roomname" @click.stop="goRoom(byId[id])">{{byId[id]._title}}的直播间</div>
                <div class="ranking_live_checkin" @click.stop="goRoom(byId[id])">立即查看</div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getNewLive
} from "../../api";
import {
    Toast
} from 'vant'
import {
    mapState
} from 'vuex'
const getTwo = str => {
    if (!str) return []
    return str.split(",").filter((v, i) => i < 2);
}
export default {
    data() {
            return {
                show: false,
                isAttention: false,
                careMessage: {
                    'false': '关注成功',
                    'true': '已取消'
                }
            }
        },
        computed: {
            ...mapState({
                newData: state => state.live.newData,
                newTeachers: state => state.live.newTeachers,
                byId: state => state.live.teachersById,
            }),
        },
        methods: {
            goRoom(item) {
                this.$router.push('/live/room/' + item.teacherid)
            },
            goCenter(item) {
                this.$router.push('/center?teacherid=' + item.teacherid)
            },
            care: async function(item) {
                if (!ynIsLogin) {
                    this.$store.dispatch('jumpLogin')
                    return
                }
                this.$store.dispatch('careTeacher', item)
            },
        }
}
</script>
<style scoped>
/*ranking_live*/

img {
    width: 100%;
    height: 100%;
}

#new_live .ranking_live_list {
    width: 9.3rem;
    box-shadow: 2px 2px 5px 1px #d2d2d2;
    background: #fff;
    padding: 0.2rem;
    margin: 0.6rem 0 0.4rem 0;
    position: relative;
    border-radius: 3px;
}

.ranking_live_list:active {
    background: rgba(0, 0, 0, .05) !important;
}

.ranking_live_list .ranking_live_photo {
    display: inline-block;
    position: absolute;
    top: -0.65rem;
    left: 0.25rem;
}

.ranking_live_list .ranking_live_tphoto {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border: 0.07rem solid #fff;
    border-radius: 50%;
    overflow: hidden;
}

.ranking_live_list .new_live_teacherIcon {
    display: inline-block;
    width: 0.35rem;
    position: relative;
    left: -0.35rem;
    top: -0.05rem;
}

.ranking_live_name {
    position: relative;
    left: 1.7rem;
    font-size: 0.38rem;
}

.ranking_live_live {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.ranking_live_list .ranking_live_skill {
    display: inline-block;
    height: 0.45rem;
    line-height: 0.45rem;
    padding: 0 0.3em;
    margin: 0.2rem 0.15rem 0.2rem 0;
    font-size: 0.35rem;
    border: 1px solid #5da5fd;
    border-radius: 0.1rem;
    color: #5da5fd;
}

.ranking_live_list .ranking_live_btn {
    height: 0.45rem;
    line-height: 0.45rem;
    font-size: 0.35rem;
    padding: 0 0.3em;
    margin: 0.2rem 0;
    color: #ff5054;
}

.ranking_live_title {
    color: #5da5fd;
    font-size: 0.35rem;
    line-height: 0.4rem;
    background: url(/public/wap/images/icon-person.png) no-repeat;
    padding-left: 0.5rem;
    background-size: 0.42rem;
}

.ranking_live_content {
    color: #000;
    font-size: 0.35rem;
    line-height: 0.5rem;
    margin: 0.2rem 0;
}

.ranking_live_room {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.ranking_live_room {
    margin-top: 0.2rem;
}

.ranking_live_roomname {
    height: 0.65rem;
    line-height: 0.65rem;
    font-size: 0.35rem;
    color: #666;
    background: url(/public/wap/images/icon-new-live.png) no-repeat;
    padding-left: 0.5rem;
    background-size: 0.4rem;
    background-position: 0 0.11rem;
}

.ranking_live_checkin {
    color: #fff;
    height: 0.65rem;
    line-height: 0.65rem;
    padding: 0 0.35rem;
    background: #f65c30;
    font-size: 0.35rem;
}

.care-icon {
    display: inline-block;
    width: .32rem;
    height: .252rem;
    margin-right: 0.1rem;
    background: url(../../images/icon-care.png) no-repeat center;
    background-size: .32rem .252rem;
}

.care-icon.cancel {
    display: inline-block;
    width: .32rem;
    height: .251rem;
    margin-right: 0.1rem;
    background: url(../../images/icon-cancel.png) no-repeat center;
    background-size: .32rem .251rem;
}

.ranking_live_btn.cancel {
    color: #999;
}

.new_live_line {
    display: block;
    width: 100%;
    height: 1px;
    background: #f5f5f5;
}
</style>
