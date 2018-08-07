import * as fn from '@wap/fn'
import { setter } from '@wap/vuex'
import * as api from '@wap/api'
import { Toast } from 'vant'
import { dics } from '../faceCode';
const state = {
    chatData: [],
    topData: {},
    chatSelect: 1, //当前选择 1直播,2互动
    shouldLoadMoreLive: true,
    LoadMore: true,
    chatSuccess:0

}
const requestCount = {} //记录请求ID

const setState = (commit, path, reducer) => {
    commit('chatSetState', { path, reducer })
}


const mutations = {
    chatSetState: setter,

}

function titleToName(key) { //解析表情
    var _key = key.replace(/[\[\]]/g, '')
    return dics[_key] ? dics[_key] : "";
}
const handleData = arr => {
    return arr.map((item) => {
        item._time = item.ctime.substr(0, 16)
        // item._time = item.ctimeString
        if (item.replyList) {
            item._replyList = handleData(item.replyList)
        }
        item._photo = item.photoImg_path ? item.photoImg_path : 'http://live.yuetougu.com//public/images/yn.jpg'
        // 解析表情符
        item.content = item.content.replace(/\[.+?\]/g, match => {
            let name = titleToName(match)
            if (!name) return match;
            let src = `/public/module/qqface/png/${name}@2x.png`;
            let img = `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" />`
            return img;
        })
        return item;
    })
}
const actions = {
    getChatInfo: async function({ state, commit }, ops) { //互动数据
        var res = await api.getInteractionList(ops.params)
        if (!requestCount[ops.params.id]) {
            if (ops.push) {
                handleData(res.data).map(item => {
                    return state.chatData.unshift(item)
                })
            }else{
                setState(commit, 'chatData', handleData(res.data))
            }

        } else {
            requestCount[ops.params.id] = true
            setState(commit, 'chatData', v => v.concat(handleData(res.data)))
        }
        const none = res.data.length < 1
        if (none && state.chatData.length < 1) {
            setState(commit, 'LoadMore', false)
        } else if (res.data.length < 20) {
            setState(commit, 'shouldLoadMoreLive', false)
        } else if (res.data.length >= 20) {
            setState(commit, 'shouldLoadMoreLive', true)
        }

    },
    getChatMore: async function({ state, commit }, params) { //互动加载更多
        var res = await api.getInteractionMore(params)
        if (res.data.list.length < 20) {
            setState(commit, 'shouldLoadMoreLive', false)
        }
        setState(commit, 'chatData', v => v.concat(handleData(res.data.list)))
    },
    getTopInfo: async function({ state, commit }, params) { //有牛股
        var res = await api.getBroadcastingTop(params)
        if (!res.data) return
        const handle = item => {
            item.shortContent = item.content.length > 18 ? item.content.substr(0, 18) : item.content
            return item
        }
        setState(commit, 'topData', handle(res.data))
    },
    sendChat: async function({ state, commit }, params) {
        var res = await api.sendChat(params)
        if (res.status == 1) {
            Toast.success('发送成功')
            setState(commit,'chatSuccess',Date.now())
        }
    }
}

export default {
    actions,
    mutations,
    state: Object.assign({}, state)
}
