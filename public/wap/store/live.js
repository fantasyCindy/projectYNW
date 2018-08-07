import * as fn from '@wap/fn'
import { setter } from '@wap/vuex'
import * as api from '@wap/api'
import { Toast } from 'vant'



const state = {
        teachersById: {},
        teacherByIdUpdate:0,
        newTeachers: [],
        popularTeachers: [], //人气老师ids   type:1 默认1
        activityTeachers: [], //活跃老师ids   type:2
        newData: [],
        shouldLoadMoreLive: true, //是否显示正在加载
        LoadMore: true, //是否显示loadmore
        liveData: [],

    }
    /**
     * 从文本中提取IMG节点
     */
const getImages = str => {
    const images = [];
    const text = str.replace(/<img.+?>/g, match => {
        const srcMatch = match.match(/src=([^\s]+)/);
        srcMatch && images.push(srcMatch[1].replace(/["']/g, ""));
        return "";
    });
    return { text, images };
};


const requestCount = {} //记录请求ID

const setState = (commit, path, reducer) => {
    commit('liveSetState', { path, reducer })
}


//处理活跃，人气列表数据
const handleLiveData = arr => {
    return arr.map(item => {
        if (item.title.length > 7) {
            item._title = item.title.substr(0, 7) + '...'
        } else {
            item._title = item.title
        }
        item.short = fn.getTwo(item.specialty, 1)
        item.isLive = !item.status ? "直播中" : "未直播"
        item._isAttention = item.isAttention || 0
        item._isPop = true
        // if (!item.liveContentCount) {
            item._popularity = item.popularity
        // }
        return item
    })
}

//处理直播信息
const handleLiveInfo = arr => {
    return arr.map(item => {
        item._pubtime = item.pubtime.substr(0, 16)
            // item._pubtime = item.pubtimeString
        const data = getImages(item.content)
        item._images = data.images;
        item._text = data.text;
        item._imagesPath = data.images.map(item => __path + item);
        return item
    })
}
const mutations = {
    liveSetState: setter,
    care(state, { id, value }) { //关注
        const message = value == 0 ? "关注成功" : "已取消"
        const status = !value ? 1 : 0
        Toast.success(message)
        state.teachersById[id]._isAttention = status;
    }
}


//合并state中的旧的对象
const mergeToById = (state, arr) => {
    const byId = arr.reduce((acc, cur) => {
        const id = cur.teacherid
        const old = state.teachersById[id]
        acc[id] = Object.assign({}, old, cur)
        return acc
    }, {})
    return Object.assign({}, state.teachersById, byId)
}


const actions = {
    getPopularTeachers: async function({ state, commit, dispatch }, params) {
        const res = await api.getPopLive(params)
        if (res.status != 1) return;

        if (!params) {
            //活跃直播数据
            setState(commit, 'activityTeachers', res.data.map(item => item.teacherid)) //活跃老师ids
        } else { //人气
            setState(commit, 'popularTeachers', res.data.map(item => item.teacherid)) //人气老师ids
        }

        const back = handleLiveData(res.data)
        setState(commit, "teachersById", mergeToById(state, back))
        setState(commit, 'teacherByIdUpdate', Date.now())
    },
    getNewTeachers: async function({ state, commit, dispatch }) {
        const res = await api.getNewLive() //新晋直播数据
        if (res.status != 1) return;
        const handle = arr => {
            return arr.map(item => {
                item.shortSpecialty = fn.getTwo(item.specialty, 2)
                item._isAttention = !item.isAttention ? 0 : 1
                if (item.title.length > 7) {
                    item._title = item.title.substr(0, 7) + '...'
                } else {
                    item._title = item.title
                }
                if (item.description.length > 45) {
                    item._description = item.description.substr(0, 45) + '...'
                } else {
                    item._description = item.description
                }
                return item
            })
        }
        setState(commit, "teachersById", mergeToById(state, handle(res.data)))
        setState(commit, 'teacherByIdUpdate', Date.now())
        setState(commit, 'newTeachers', res.data.map(item => item.teacherid))
        setState(commit, 'newData', state.newTeachers.map(function(i) {
            return state.teachersById[i]
        }))
    },
    careTeacher: async function({ state, commit }, item) { //关注
        var res = await api.attention({ teacherid: item.teacherid })
        if (res.status != 1) return
        commit('care', { id: item.teacherid, value: item._isAttention })
    },
    queryLiveInfo: async function({ state, commit, dispatch }, params) {
        var res = await api.queryTeacherLive(params)
        var len = res.data.list.length
        if (requestCount[params.id]) {
            if (len >= 20) { //总条数不小于于20
                setState(commit, 'shouldLoadMoreLive', true)
                setState(commit, 'LoadMore', true)
            } else if (len < 1) { //开了直播还没有发直播
                setState(commit, 'LoadMore', false)
            } else if (0 <= len <= 20) { //不到20条
                setState(commit, 'LoadMore', true)
                setState(commit, 'shouldLoadMoreLive', false)
            }
            setState(commit, 'liveData', handleLiveInfo(res.data.list).reverse())
            return
        }
        requestCount[params.id] = true
        if (len >= 20) { //总条数不小于于20
            setState(commit, 'shouldLoadMoreLive', true)
            setState(commit, 'LoadMore', true)
        } else if (len < 1 && state.liveData.length < 1) { //开了直播还没有发直播
            setState(commit, 'LoadMore', false)
        } else if (0 <= len <= 20) { //不到20条
            setState(commit, 'shouldLoadMoreLive', false)
        }
        setState(commit, 'liveData', v => v.concat(handleLiveInfo(res.data.list).reverse())) //合并数组
    },

}

export default {
    actions,
    mutations,
    state
}
