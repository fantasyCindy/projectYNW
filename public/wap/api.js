import { request, attach } from './axios';
import { errorCode } from './enum';
import { Toast } from 'vant';

const http = request({
    // baseURL: 'http://www.yuetougu.com/',
    // baseURL: 'http://101.201.41.116:8080/',
    baseURL:'http://60.205.243.97:8080/',
    timeout: 3000,
    params: {
        t: Date.now()
    }
});


/**
 * 统一处理返回值
 */
const response = function(body) {
    const { status, data } = body;
    if (status != 1) {
        const message = errorCode[status] ? errorCode[status] : `服务器错误:${status}`;
        Toast.fail(message);
    }
    return Promise.resolve({ status, data });
};

/**
 * 发送 ajax请求示例
 */
const GET = async() => {
    const url = '';
    const params = {};
    const res = await attach(http.get(url, { params }));
    return response(res.data);
};

const POST = async() => {
    const url = '';
    const params = {};
    const res = await attach(http.post(url, params));
    return response(res.data);
};

//////////////////////////////////////////////////////////////
//登录
export const Login = async(ops) => {
    const url = '/public/login.htm';
    const params = Object.assign({
            userName: '',
            password: ''
        },
        ops
    );
    const res = await attach(http.post(url, params));
    return response(res.data);
};
//退出
export const LogOut = async(ops) => {
    const url = '/html/logout.htm';
    const res = await attach(http.post(url));
    return response(res.data);
};
//活跃，人气直播室
export const getPopLive = async(ops) => {
    const url = '/html/liveRoomList.htm';
    const params = Object.assign({
            currentPage: 1,
            pageSize: 30,
            type: 2 //默认活跃
        },
        ops
    );
    const res = await attach(http.get(url, { params }));
    return response(res.data);
};

//新晋直播
export const getNewLive = async(ops) => {
    const url = '/html/teacherOrderList.htm';
    const params = Object.assign({
            page: 1,
            rows: 30,
            orderStype: 2
        },
        ops
    );
    const res = await attach(http.get(url, { params }));
    return response(res.data);
};

//发送短信验证码
export const sendPhoneCode = async(ops) => {
    const url = '/sendH5PhoneCode.htm';
    const params = Object.assign({
            phone: '',
            phone_imgcode: '',
            source: 0
        },
        ops
    );
    const res = await attach(http.post(url, params));
    return response(res.data);
};
//注册
export const registerSubmit = async(ops) => {
    const url = '/user/webRegister.htm';
    const params = Object.assign({},
        ops
    );
    const res = await attach(http.post(url, params));
    return response(res.data);
};


//最新观点
export const opinionList = async(ops) => {
    const url = '/opinion/queryNewOpinions.htm';
    const params = Object.assign({
        currentPage: 1
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};

//圆桌列表
export const topicList = async(ops) => {
    const url = 'topic/topicList.htm';
    const params = Object.assign({
        currentPage: 1
    }, ops);
    const res = await attach(http.get(url, {
        params
    }));
    return response(res.data)
};

//关注、取消关注
export const attention = async(ops) => {
    const url = '/center/attention.htm';
    const params = Object.assign({}, ops);
    const res = await attach(http.post(url, params));
    return response(res.data)
}

//直播内容
export const queryTeacherLive = async(ops) => {
    const url = '/html/queryLiveInfo.htm';
    const params = Object.assign({
        periodicalid: '',
        pageSize: 20,
        id: ''
    }, ops);
    const res = await attach(http.get(url, {
        params
    }));
    return response(res.data)
};
//直播间老师信息
export const getTeacherDetail = async(ops) => {
    const url = '/app/appTeacherDetail.htm';
    const params = Object.assign({
        teacherid: ''
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};

//获取直播期刊id
export const getPeriodicalid = async(ops) => {
    const url = '/live/getPeriodicalid.htm';
    const params = Object.assign({
        teacherid: ''
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};

//获取股友互动
export const getInteractionList = async(ops) => {
    const url = '/html/interactionList.htm';
    const params = Object.assign({
        periodicalid: '',
        pageSize: 20,
        currentPage:1,
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};


//获取股友互动加载更多
export const getInteractionMore = async(ops) => {
    const url = '/html/queryInteractionlist.htm';
    const params = Object.assign({
        periodicalid: '',
        pageSize: 20,
        currentPage:1,
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};
//获取直播室今日牛股
export const getBroadcastingTop = async(ops) => {
    const url = '/broadcastingTop/topDetail.htm';
    const params = Object.assign({
        periodicalid: '',
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};

//老师观点
export const getTeacherView = async(ops) => {
    const url = '/html/articleList.htm';
    const params = Object.assign({
        teacherId: '',
        currentPage: 1,
        showType: 0
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};

//老师问股信息
export const getTeacherAnswer = async(ops) => {
    const url = '/live/queryTeacherNoteByType.htm';
    const params = Object.assign({
        teacherid: '',
        pageSize: 20,
        currentPage: 1
    }, ops);
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};

//发布股友互动
export const sendChat = async(ops) => {
    const url = '/html/interactionComm.htm';
    const params = Object.assign({
        content: '',
        prId: '',
        parentid: -1,
        user_type: ynIsTeacher ? '1' : '0'
    }, ops);
    const res = await attach(http.post(url,
        params
    ));
    return response(res.data)
};

//提问
export const askStock = async(ops) => {
    const url = '/consultation/questionNote.htm';
    const params = Object.assign({
        questionuserid: '',
        teacherids: '',
        questioncontent: '',
        usstockcode:'',
        stockname:'',
        note_source:0
    }, ops);
    const res = await attach(http.post(url,
        params
    ));
    return response(res.data)
};


//获取提问次数
export const getAskCount = async() => {
    const url = '/consultation/queryTodayQuestionCount.htm';
    const params = {
        questionuserid: ynUserId 
    };
    const res = await attach(http.get(url, { params }));
    return response(res.data)
};
