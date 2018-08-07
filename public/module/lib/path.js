var liveDetailTable = {
    composite: `${live_path}/html/liveDetail_composite.htm`
}


module.exports = {

    //首页

    //组合
    composite: {
        portal: () => `${__path}/html/returnCompositeJsp.htm`,
        detail: (compositeId, teacherId) => {
            teacherId = teacherId || "YN"
            return `${__path}/html/CompositeDetail.htm?${teacherId}ZHXQ${compositeId}`
        },
        create: id => {
            id = `?EDIT${id}` || ""
            return `${__path}/html/compositeCreate.htm${id}`
        }
    },

    //直播
    live: {
        detail: type => liveDetailTable[type],
        refer: id => `${live_path}/live/liveDetailRefer.htm?teacherid=${id}`
    },

    //内参
    refer: {
        detail: id => `${__path}/referp/list.htm?referenceid=${id}`
    },

    //支付
    pay: order => `${__path}/html/returnshortcutpayJsp.htm?orderNum=${order}`,

    //视频
    video: {
        portal: `${video_path}/video/index.htm`,
        detail: id => `${video_path}/video/detail.htm?videoId=${id}`
    },

    //个人中心
    center: {
        stock: `${__path}/myCenter/myCenter.htm`
    },

    //资讯
    news: {
        portal: `${news_path}/article/index.htm`
    },

    //观点

    opinion: {
        portal: `${opinion_path}/opinion`,
        detail: id => `${opinion_path}/opinion/${id}.htm`
    }
}
