import * as fn from '@wap/fn'
import { setter } from '@wap/vuex'
import * as api from '@wap/api'
import { Toast } from 'vant'
const state = {
    shouldLoadMoreOpinion: true,
    LoadMore: true,
    opinionList: [],
}
const requestCount = {} //记录请求ID
const handle = (arr) => { //观点
    return arr.map(item => {
        item._link = __path + "/html/articleDetail.htm?article_id=" + item.article_id + '&from=h5';
        item._src = item.photo;
        if (item.createrName.length > 9) {
            item._createrName = item.createrName.substr(0, 9) + '..'
        } else {
            item._createrName = item.createrName
        }
        if (item.title.length > 20) {
            item._title = item.title.substr(0, 20) + '..'
        } else {
            item._title = item.title
        }
        if (item.opinionShortContent.length > 70) {
            item._opinionShortContent = item.opinionShortContent.substr(0, 70) + '..'
        } else {
            item._opinionShortContent = item.opinionShortContent
        }
        //时间转换
        var newDate = new Date()
        var strtime = item.create_time;
        var date = getSeconds(strtime)
        const sub = Date.now() - date;
        const onemin = 1000 * 60;
        const onehour = 1000 * 60 * 60;
        const oneDay = 1000 * 60 * 60 * 24;
        const yesterday = 1000 * 60 * 60 * 48;
        const yesterdayStart = getSeconds(getYesterday() + ' ' + '00:00:00') //昨天开始时间
        const yesterdayEnd = getSeconds(getYesterday() + ' ' + '23:59:59') //昨天结束时间
        const thisYear = getSeconds(newDate.getFullYear() + '-01-01' + ' ' + '00:00:00') //今年开始时间
        if (sub <= onemin) { //1分钟以内显示刚刚
            item._time = "刚刚"
        } else
        if (sub > onemin && sub <= onehour) { //1-60分钟
            item._time = Math.ceil(sub / onemin) + '分钟前'
        } else if (sub > onehour && date > yesterdayEnd) { //当日1小时之前
            item._time = item.create_timeStr.substr(6, 12)
        } else if (date >= yesterdayStart && date <= yesterdayEnd) {
            item._time = '昨天' + item.create_timeStr.substr(6, 12)
        } else if (date > thisYear && date < yesterdayStart) {
            item._time = item.create_timeStr
        } else {
            item._time = item.create_time.substr(0, 16)
        }
        return item
    })
}



function getYesterday() {
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
    return s1
}
//日期获取毫秒数
function getSeconds(date) {
    var time = new Date(date.replace(/-/g, '/'));
    var seconds = time.getTime()
    return seconds
}

const setState3 = (commit, path, reducer) => {
    commit('opinionSetState', { path, reducer })
}


const mutations = {
    opinionSetState: setter,

}

const actions = {
    getOpinionList: async function({ state, commit }, params) {
        var res = await api.opinionList(params)
        const len = res.data.list.length

        if (requestCount[params.currentPage]) {
            setState3(commit, 'opinionList',handle(res.data.list))
        } else {
            requestCount[params.currentPage] = true
            setState3(commit, 'opinionList', v => v.concat(handle(res.data.list)))
        }
        

        if (len < 1 && state.opinionList.length < 1) {
            setState3(commit, 'LoadMore', false)
        } else if (len < params.pageSize && state.opinionList.length >= 1) {
            setState3(commit, 'LoadMore', true)
            setState3(commit, 'shouldLoadMoreOpinion', false)
        }

    },
    getTeacherOpinion: async function({ state, commit }, params) {
        var res = await api.getTeacherView(params)
        setState3(commit, 'opinionList', handle(res.data.list))
    },
}

export default {
    actions,
    mutations,
    state: Object.assign({}, state)
}
