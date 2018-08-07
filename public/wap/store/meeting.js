import * as fn from '@wap/fn'
import { setter } from '@wap/vuex'
import * as api from '@wap/api'
import { Toast } from 'vant'
const state = {
    shouldLoadMoreMeeting: true,
    LoadMore: true,
    topicListData: [],
}

const setState4 = (commit, path, reducer) => {
    commit('meetingSetState', { path, reducer })
}

const requestCount = {} //记录请求ID
const mutations = {
    meetingSetState: setter,

}

const handle = arr => {
    return arr.map(item => {
        item._teacherList = _.take(item.teacherList, 3);
        item._link = __path + '/app/appTopic.htm?topic_id=' + item.id + '&from=h5'
        return item
    })
}

const actions = {
    getTopicList: async function({ state, commit }, params) {
        var res = await api.topicList(params)
        const len = res.data.list.length
        if (len < 1 && state.topicListData.length < 1) {
            setState4(commit, 'LoadMore', false)
        } else if (len < params.pageSize) {
            setState4(commit, 'LoadMore', true)
            setState4(commit, 'shouldLoadMoreMeeting', false)
        }
        if (requestCount[params.currentPage]) {
            setState4(commit, 'topicListData', handle(res.data.list))
        } else {
            requestCount[params.currentPage] = true
            setState4(commit, 'topicListData', v => v.concat(handle(res.data.list)))
        }

    },
}

export default {
    actions,
    mutations,
    state: Object.assign({}, state)
}
