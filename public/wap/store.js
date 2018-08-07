import Vue from 'vue';
import Vuex from 'vuex';
import { setter, logger } from '@wap/vuex';
import * as api from '@wap/api'
import * as fn from '@wap/fn'
import live from './store/live'
import chat from './store/chat'
import opinion from './store/opinion'
import meeting from './store/meeting'
import debounce from "lodash/debounce";
import { Toast } from 'vant'

Vue.use(Vuex);

const setState1 = (commit, path, reducer) => {
        commit('set', { path, reducer })
    }
    //管理scoket创建
const socketManager = {
    /* pid : socket */
}
const handleData = item => { //老师详情
    if (item.title.length > 9) {
        item._title = item.title.substr(0, 9) + '..'
    } else {
        item._title = item.title
    }
    if (item.description.length > 15) {
        item._description = item.description.substr(0, 15) + '..'
    } else {
        item._description = item.description
    }
    item._influential = item.influential ? item.influential : 0;
    item._specialtys = item.specialtys.slice(0, 3)
    return item
}




const handleAsk = arr => { //问股
    return arr.map(item => {
        item._time = item.answertime.substr(0, 16)
        if (item.questioncontent.length > 45) {
            item._questioncontent = item.questioncontent.substr(0, 45) + '..'
        } else {
            item._questioncontent = item.questioncontent
        }
        if (item.answercontentStr.length > 40) {
            item._answercontentStr = item.answercontentStr.substr(0, 40) + '..'
        } else {
            item._answercontentStr = item.answercontentStr
        }
        return item
    })
}

const store = new Vuex.Store({
    plugins: [logger],
    modules: {
        live,
        chat,
        opinion,
        meeting
    },
    state: {
        activeNav: 0,
        teacherDetail: {},
        scroll: 0,
        livePush: {},
        chatPush: {},
        pid: '',
        askSuccess: false,
        askWindow: false,
        askCount: 0,
        canAsk: 3,
        loginFinish: 0,
        socketOpen: false,
        askList: [],
        toTopShow: false
    },
    mutations: {
        set: setter,
    },
    actions: {
        login: async function({ state, commit }, params) {
            var res = await api.Login(params)
            if (res.status != 1) return
            Toast.success('登录成功')
            setState1(commit, 'loginFinish', Date.now())
        },
        jumpLogin() {
            const href = window.location.href
            window.location.href = `${sso_path}?systemCode=yuetougu&clientUrl=${href}`     //一账通 
        },
        logout: async function({ state, commit }) {
            localStorage['route-path'] = ''
            var res = await api.LogOut()
            if (res.status != 1) return
            window.location.reload()
        },
        socket: function({ state, commit }, pid) {
            const hasCreated = socketManager[pid]
            if (!pid || hasCreated) return;

            const host = __path.replace('http:', '')
            var webSocketPath = "ws:" + host + "/websocket";
            const webSocket = new ReconnectingWebSocket(webSocketPath);
            webSocket.debug = true;
            webSocket.timeoutInterval = 5400;
            window.onbeforeunload = function() {
                webSocket.close();
            };
            webSocket.onopen = function(event) {
                var key = "0_0_0_" + pid;
                webSocket.send(key);
                socketManager[pid] = webSocket
            };
            webSocket.onmessage = function(event) {
                var _data = eval('(' + event.data + ')');
                console.log("push", _data);
                var dataType = _data.dataType;
                //直播消息
                if (dataType == "1") {
                    commit({
                        type: 'set',
                        path: 'livePush',
                        reducer: _data
                    })
                }
                //互动信息
                if (dataType == "2") {
                    commit({
                        type: 'set',
                        path: 'chatPush',
                        reducer: _data
                    })
                }

            }
            return webSocket;
        },
        askStock: async function({ state, commit }, params) {
            var res = await api.askStock(params)
            if (res.status == 1) {
                setState1(commit, 'askSuccess', true)
                setState1(commit, 'askWindow', true)
                setState1(commit, 'canAsk', --state.canAsk)
            }
        },
        getAskCount: async function({ state, commit }) {
            var res = await api.getAskCount()
            setState1(commit, 'askCount', res.data) //已问股次数
            setState1(commit, 'canAsk', 3 - res.data) //还能问几次
        },
        getTeacherDetail: async function({ state, commit }, teacherid) {
            var result = await api.getTeacherDetail({
                teacherid: teacherid
            })
            if (result.status == 1) {
                setState1(commit, 'teacherDetail', handleData(result.data))
            }
        },
        getTeacherAskList: async function({ state, commit }, params) {
            var result = await api.getTeacherAnswer(params)
            setState1(commit, 'askList', handleAsk(result.data))
        },
        backtoTop() {
                document.body.scrollTop = '-300px'
                document.documentElement.scrollTop = '-300px'
        }
    }
});
export default store;
store.dispatch('getPopularTeachers')
store.dispatch('getPopularTeachers', { type: 1 })
store.dispatch('getNewTeachers', { type: 1 })
store.dispatch('backtoTop')
const debounceTrailing = function(time, fn) {
    return debounce(fn, time, { leading: false, trailing: true });
};
/**
 * 滚动
 */
window.addEventListener(
    "scroll",
    debounceTrailing(1000, function(e) {
        store.commit("set", {
            path: "toTopShow",
            reducer: true
        });
        setTimeout(function() {
            store.commit("set", {
                path: "toTopShow",
                reducer: false
            });
        }, 3000)
        store.commit("set", {
            path: "scroll",
            reducer: Date.now()
        });
    })
);
