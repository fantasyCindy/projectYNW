import { request } from 'ynw/lib/axios';
import { Message } from 'element-ui';
import { errorCode } from './error';
const http = new request({ baseURL: 'http://101.201.41.116:8080/' });

//统一处理错误
const response = (body) => {
	const { status, data } = body;
	if (body.status != 1) {
		const message = errorCode[status] ? errorCode[status] : `服务器错误:${status}`;
		layer.msg(message);
		return Promise.reject(body.status);
	}
	return Promise.resolve({ status, data });
};

//观点详情
export const getOpinionInfo = async (params) => {
	const url = '/teacher/articleDetail.htm';
	const res = await http.get(url, { params });
	console.log('res', res);
	return response(res.data);
};
//战法详情
export const getLearningInfo = async (params) => {
	const url = '/learning/learStockDetail.htm';
	const res = await http.get(url, { params });
	console.log('res', res);
	return response(res.data);
};

//获取礼物数据
export const getGiftData = async (params) => {
	const url = '/app/appGiftPayOrder.htm';
	const res = await http.post(url, params);
	return response(res.data);
};

export const getGiftList = async () => {
	const url = '/gift/giftList.htm';
	const res = await http.get(url);
	return response(res.data);
};

//根据内参ID，查询内参信息
export const getReferInfo = async (params) => {
	const url = '/reference/referbyid.htm';
	const res = await http.get(url, { params });
	return response(res.data);
};

//查询内参内容
export const getReferContent = async (params) => {
	const url = '/reference_periodical/list.htm';
	const res = await http.get(url, { params });
	return response(res.data);
};
//根据内参ID，查询内参评论
export const getReferComment = async (params) => {
	const url = '/reference/commentList.htm';
	const res = await http.get(url, { params });
	return response(res.data);
};
// 内参发布评论
export const addComment = async (params) => {
	const url = '/reference/addComment.htm';
	const res = await http.post(url, params);
	return response(res.data);
};
//发布股友互动
export const interactionComm = async (params) => {
	const url = '/html/interactionComm.htm';
	const res = await http.post(url, params);
	console.log('res', res.data);
	return res.data;
};
//获取股友互动
export const interactionList = async (params) => {
	const url = '/html/interactionList.htm';
	const res = await http.get(url, { params });
	return response(res.data);
};

//获取股友互动加载更多
export const getInteractionMore = async (params) => {
	const url = '/html/queryInteractionlist.htm';
	const res = await http.get(url, { params });
	return response(res.data);
};

//问股详情
export const queryNoteDetail = async (params) => {
	const url = '/consultation/queryNoteDetail.htm';
	const res = await http.get(url, { params });
	return response(res.data);
};

//回复问股
export const answerNote = async (params) => {
	const url = '/consultation/answerNote.htm';
	const res = await http.post(url, params);
	return response(res.data);
};
//删除互动
export const delInteraction = async (params) => {
	const url = '/interaction/delInteraction.htm';
	const res = await http.post(url, params);
	return response(res.data);
};

//获取用户禁言状态
export const isBanned = async (params) => {
	const url = '/banned/isBanned.htm';
	const res = await http.post(url, params);
	return response(res.data);
};
//前台禁言
export const banned = async (params) => {
	const url = '/banned/banned.htm';
	const res = await http.post(url, params);
	return res.data;
};
//禁言申诉
export const isAppeal = async (params) => {
	const url = '/banned/isAppeal.htm';
	const res = await http.post(url, params);
	return res.data;
};
