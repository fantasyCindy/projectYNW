<template>
    <div class="page-teacherCenter">
        <div class="teacherDetail">
            <div class="teacher-title">投顾简介</div>
            <div class="teacher-top">
                <div class="teacher-head introduction">简介</div>
                <div class="teacher-content">{{teacherDetail.descriptionString}}</div>
            </div>
            <div class="teacher-top">
                <div class="teacher-head skill">擅长领域</div>
                <div class="teacher-content">
                    <span class="teacher-goodat" v-for="item in teacherDetail.specialtys" :key="item.id">{{item.name}}</span>
                </div>
            </div>
            <div class="teacher-top">
                <div class="teacher-head base">基本信息</div>
                <div class="teacher-table">
                    <table>
                        <tr>
                            <td class="table-title">身份</td>
                            <td>{{teacherDetail.type_name}}</td>
                        </tr>
                        <tr>
                            <td class="table-title">资质证书</td>
                            <td>{{teacherDetail.certificate_num}}</td>
                        </tr>
                        <tr>
                            <td class="table-title ">从业年限</td>
                            <td>--</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <toTop v-show="topShow"></toTop>
    </div>
</template>
<script>
import {
    getTeacherDetail
} from '../../api';
import {
    mapState
} from 'vuex'
import toTop from "../common/toTop";
export default {
    components: {
        toTop
    },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            teacherDetail: state => state.teacherDetail,
            topShow: state => state.toTopShow
        })
    },
    created: async function() {
        this.teacherid = this.$route.query.teacherid;
    },
    mounted() {
        this.$store.dispatch('getTeacherDetail', this.teacherid)
    }
}
</script>
<style>
.teacher-title {
    width: 10rem;
    height: 1.3rem;
    line-height: 1.3rem;
    margin: 0 auto;
    text-align: center;
    color: #000;
    font-size: 0.45rem;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 1.2rem;
}

.teacher-top {
    width: 9rem;
    margin: 0.5rem auto;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
}

.teacher-head {
    font-size: 0.387rem;
    color: #333;
    padding: 0.35rem;
}

.teacher-content {
    background: #f5f5f5;
    font-size: 0.38rem;
    line-height: 0.6rem;
    padding: 0.35rem;
    color: #333;
}

.teacher-goodat {
    display: inline-block;
    color: #db3b55;
    background: #f0b9bf;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    margin: 0.1rem;
    padding: 0 0.2rem;
    border-radius: .067rem;
}

.teacher-goodat:first-child {
    margin-left: 0;
}

.teacher-table {
    background: #f5f5f5;
    font-size: 0.38rem;
    line-height: 0.6rem;
    color: #333;
}

.teacher-table table {
    text-align: center;
    width: 100%;
}

.teacher-table table tr {
    border-top: 1px solid #e5e5e5;
}

.teacher-table table tr:first-child {
    border-top: none;
}

.teacher-table table td {
    line-height: 0.55rem;
    padding: 0.3rem;
}

.table-title {
    width: 30%;
    text-align: left;
}

.teacher-head.introduction {
    background: url(../../images/introduce_icon.jpg) no-repeat;
    background-size: .467rem;
    background-position: .373rem;
    padding-left: 1rem;
}

.teacher-head.skill {
    background: url(../../images/advantage_icon.jpg) no-repeat;
    background-size: .467rem;
    background-position: .373rem;
    padding-left: 1rem;
}

.teacher-head.base {
    background: url(../../images/information_icon.jpg) no-repeat;
    background-size: .467rem;
    background-position: .373rem;
    padding-left: 1rem;
}
</style>
