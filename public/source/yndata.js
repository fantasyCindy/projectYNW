var yndata = {};

/*////////////////////////////////////////////////////////////////

    getTopIncome : 收益排行
    getHotRanking : 获取排名数据

    getStockTips : 股票常识/精品观点
    getHotChart : 股票问答/最新咨询

    ------------------------------------------关注-------------------------------------------

    addCare : 添加关注
    cancelCare : 取消关注

    ------------------------------------------问股-------------------------------------------

    getMyAnswer : 我的问答
    getMyAnswerWithType : 我的问答-分类
    getLastestChat : 咨询/问股
    getMyChat : 我的问股
    getNewChat:最新回答
    replyQuestion : 回答提问
    hotAsk:热问股票
    getStatistics : 查询老师的回答问题信息
    question_mention :　查询@我的问股
    question_all　：查询全部问股
    question_done　：　已经回答问股
    queryTeacherHotAnswer : 查询老师的精彩回答 | 基于sort 参数排序

    ------------------------------------------观点-------------------------------------------

    getHotArticle : 观点
    getOpinion :　观点数据
    getOpinionBest : 观点牛人
    queryOpinion : 查询观点


    getHotNews : 资讯
    getNews : 最新资讯
    getArticleCommon : 文章评论
    postArticleCommon : 发表文章评论

    ------------------------------------------直播-------------------------------------------

    getOnlineTeacher : 查询所有在线老师
    queryOnlineTeacher :查询所有在线老师 |  关键字搜索
    getHotTeacher : 热门直播老师
    recommendLive : 推荐直播
    getMyLiveList : 我的直播列表
    getBroadcastList : 直播大厅
    postQuestion : 向老师提问所有
    postQuestionForTeacher ：向特定老师提问
    getHotLive : 热门直播室
    getLiveContent : 直播数据
    publishLiveContent : 发布直播
    Statistics:提问统计数
    getTeacherLiveInfo : 查询老师的直播信息, 基于直播发言ID分页

    getMyCustomStock : 查询我的自选股
    addMyCustomStock :添加自选股票
    removeMyCustomStock : 删除自选股

    ------------------------------------------视频-------------------------------------------
    
    getHotVideo : 视频/牛人解股/股市揭秘
    getVideoCount : 视频课程总数
    getVideoCategory : 视频分类
    getVideos : 所有视频
    getMyVideo  : 我的视频

    getFriendTalk : 网友互动
    getPersonInfo : 加载个人注册

    ------------------------------------------观点-------------------------------------------

    queryOpinion : 观点查询
    getMyOpinion : 我的观点
    postOpinion : 发布观点
    removeOpinion : 删除观点

    getMyRefer : 我的内参

    feedback : 投诉与建议
    getPhoneCode : 发送短信验证码

    getGoodat: 擅长领域
    getInvestType : 投资方向
    getMonthIncome : 过去6个月收益

    getRelativeVideo : 获取相关视频课程
    getVideoComment : 获取视频评论
    postVideoComment : 发表视频评论

    getAlbumInfo : 获取专辑数据
    getViewCount : 阅读数量
    like : 观点点赞
    getCity :  获取城市列表

    ------------------------------------------支付-------------------------------------------

    postMsg :发送私信
    getMyMsg : 我的私信
    removefans:删除粉丝
    getNewsPush:消息推送
    getrecord:发送纪录
    mass:粉丝群发
    answerask:解答排行
    Rising:牛人看涨跌
    postplaytour:向老师打赏
    balance:账户余额
    indentNum:生成订单号
    alipay:充值
    payStatus:支付状态
    rencharge：生成充值订单号
    referInquire:查询内参
    getregerp：内参详情list
    addReferp：更新内参
    commontlist：内参详情评论列表
    upCommont：内参用户评论
    TARefer：TA的内参
    referindentNum ：内参生成预支付订单
    getone：我的内参
    postGift：余额支付
////////////////////////////////////////////////////////////////*/


//向所有老师提问
yndata.postQuestion = function(content) {
    var defer = $.Deferred();
    var url = "/auth/allTeacherQuestions.htm";
    $.get(url, { content: content }, function(data) {
        if (data == "success") {
            layer.msg("提问成功");
            defer.resolve();
        } else {
            layer.alert("提问失败")
            defer.reject();
        }
    });
    return defer.promise();
};


//向指定老师提问
yndata.postQuestionForTeacher = function(teacherId, content, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        stockCode: "",
        stockName: ""
    }, ops)

    $.post("/auth/teacherQuestion.htm", {
        teacherId: teacherId,
        content: content,
        stock_code: ops.stockCode,
        stock_name: ops.stockName
    }, function(data) {
        if (+data == 10) {
            layer.alert("直播室已经关闭，暂时不能提问");
            defer.reject();
            return;
        }
        if (data == "success") {
            layer.msg("提问成功");
            defer.resolve();
        } else {
            layer.alert("提问失败")
            defer.reject();
        }
    });
    return defer.promise();
};


yndata.getHotLive = function(ops) {
    ops = _.extend({
        rows: 6, //当前页码
        page: 1 // 每页数量
    }, ops);

    var defer = $.Deferred();

    $.ajax({
        url: "/html/hotLiveRooms.htm?",
        data: ops,
        dataType: 'json',
        success: function(_data) {
            defer.resolve(_data);
        }
    });
    return defer.promise();
};


yndata.getTopIncome = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        row: 3,
        take: 6
    }, ops);

    $.ajax({
        url: "/html/capitalShow.htm?",
        data: { "num": ops.row },
        dataType: 'json',
        success: function(_data) {
            _data = _.map(_data, function(item, i) {
                return {
                    name: item.title,
                    feed: item.popularity_number,
                    income: item.revenue,
                    teacherid: item.teacherid
                };
            });
            var result = _.take(_data, ops.take);
            defer.resolve(result);
        }
    });
    return defer.promise();
};


yndata.getHotVideo = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 3
    }, ops);

    $.getJSON("/video/list.htm", { pageSize: ops.row, currentPage: ops.page }, function(data) {
        data = _.map(data, function(item, i) {
            item.video_src = item.video_src.replace(/http:\\\/\\\//, 'http://');
            return item;
        });
        defer.resolve(data);
    });
    return defer.promise();
};

//热问股票
yndata.hotAsk = function(ops) {
    ops = _.extend({
        currentPage: 1, //当前页码
        pageSize: 3 // 每页数量
    }, ops);

    var send = {
        pageSize: ops.pageSize,
        currentPage: ops.currentPage
    };
    var defer = $.Deferred();

    $.getJSON("/consultation/queryHotStock.htm", send, function(data) {
        defer.resolve(data);
    });
    return defer.promise();
}



//获取最新观点
yndata.getHotArticle = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 5,
        showType: 0 // 普通观点=0， 精品观点=1
    }, ops);

    $.ajax({
        url: "/html/lastedArticle.htm?",
        dataType: 'json',
        data: { page: ops.page, rows: ops.row, showType: 0 },
        success: function(data) {
            data = _.map(data, function(item) {
                item.link_path = item.link_path.replace("http://www.yuetougu.com/", '');
                return item;
            })
            defer.resolve(data);
        }
    });
    return defer.promise();
};


//新闻资讯
yndata.getHotNews = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 10
    }, ops);

    $.getJSON("/article/rmzxList.htm", { pageSize: ops.row, currentPage: ops.page }, function(data) {
        defer.resolve(data);
    });
    return defer.promise();
};


//老师排行
yndata.getHotTeacher = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 7,
        type: "total", //total=综合排名, ask=回答问题最多
        unit: null //统计单位:[null, "month"]
    }, ops);

    var send = {
        orderStype: ops.type,
        rows: ops.row,
    };

    switch (ops.type) {
        case "total":
            send.orderStype = 0;
            break;
        case "ask":
            send.orderStype = 1;
            break;
    }

    if (ops.unit == "month") {
        send.monNum = 5;
    }

    $.ajax({
        url: "/html/teacherOrderList.htm?",
        data: send,
        dataType: 'json',
        success: function(data) {
            data = _.map(data, function(item, i) {
                item.index = i + 1;
                return item;
            });
            defer.resolve(data);
        }
    });
    return defer.promise();
};


yndata.getBroadcastList = function(ops) {
    var defer = $.Deferred();
    var url = "/html/broadcastingList.htm";
    ops = _.extend({
        order: "attentionnumber", // pinyininitials按拼音排序
        sort: "desc", //desc=?
        type: 2 //1=最热, 2=观点最多, 3=互动最多
    }, ops);
    $.getJSON(url, { order: ops.order, sort: ops.sort, type: ops.type }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

yndata.recommendLive = function(ops) {
    var defer = $.Deferred();
    var url = "/html/roomOrderList.htm";
    ops = _.extend({
        type: 0,
        row: 7
    }, ops);
    $.getJSON(url, { orderStype: ops.type, rows: ops.row }, function(data) {
        data = _.compact(data);
        defer.resolve(data);
    });
    return defer.promise();
}

//最新资讯
yndata.getNews = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 10,
        titleSub: 20, //截标题长度
        contentSub: 130 //截取内容长度
    }, ops)

    $.ajax({
        type: 'GET',
        url: '/article/zdxwList.htm',
        data: { pageSize: ops.row, currentPage: ops.page },
        dataType: 'json',
        cache: false,
        success: function(data) {
            data.rows = _.map(data.rows, function(item) {
                if (item.content.length > ops.contentSub) {
                    item.content = (item.content.substr(0, ops.contentSub) + "...").replace(/\s+/g, '');
                }
                if (item.title.length > ops.titleSub) {
                    item.title = (item.title.substr(0, ops.titleSub) + '...')
                }
                return item
            })
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
            defer.resolve(data);
        }
    })
    return defer.promise()
}


//观点最热排名 : orderType = -1
//直播最火 orderType = 1 
//回答问题最多 orderType = 0 
yndata.getHotRanking = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        orderType: -1,
        row: 20,
    }, ops);
    var send = {
        orderType: ops.orderType,
        row: ops.row,
    }
    $.getJSON("/html/investmentAdviserOrderList.htm", send, function(data) {
        data = _.map(data, function(item, index) {
            item.index = index + 1;
            return item
        });
        defer.resolve(data);
    })
    return defer.promise();
}


//查询我的自选股
/*默认获取当前用户id*/
yndata.getMyCustomStock = function(ops) {
    ops = _.extend({
        userid: ynUserId //用户id
    })
    var defer = $.Deferred();
    $.getJSON("/queryOp.htm", { user_id: ops.userid }, function(data) {
        data = _.chain(data).filter(function(item) {
            return item.stockInfo
        }).map(function(item) {
            return handleItem(item);
        }).value()
        defer.resolve(data);
    })

    function handleItem(item) {

        var data = eval(item.stockInfo);
        var open = yn.setDecimal(+data[1]);
        var yesterday = data[2];
        var now = yn.setDecimal(data[3]) || open; //现价如果没有等于昨日收盘价
        var high = data[4];
        var low = data[5];
        var up = yn.setDecimal((now - yesterday) / yesterday * 100); //涨跌幅
        var money = yn.setDecimal(now - yesterday); //涨跌额

        //返回数据格式
        var result = {
            stockcode: item.stockcode,
            stockname: item.stockname,
            stockid: item.id,
            now: yn.colorValue(now, { left: now - open }),
            money: yn.colorValue(money),
            up: yn.colorValue(up, { suffix: "%" }),
            yesterday: yn.setDecimal(yesterday),
            open: yn.setDecimal(open),
            max: yn.setDecimal(high),
            min: yn.setDecimal(low)
        }
        return result
    }

    return defer.promise();
}



/*添加自选
send对象: {stockcode, stockname, [user_id]}
*/
yndata.addMyCustomStock = function(send, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        user_id: ynUserId //默认添加到当前用户
    }, ops)
    if (!send || !send.stockname || !send.stockcode) {
        console.log("添加自选参数错误", send);
        return;
    }
    send.user_id = ops.user_id;

    //查询是否已存在
    $.post('/addOpStock.htm', send, function(data) {
        defer.resolve(data);
    })

    return defer.promise();
}

/*删除自选股*/
/*参数(stockname, stockcode, [user_id], id(股票id))*/
yndata.removeMyCustomStock = function(send, ops) {

    var defer = $.Deferred();
    ops = _.extend({
        user_id: ynUserId //默认添加到当前用户
    })
    send.user_id = ops.user_id;
    if (!send && !send.stockname & !stockCode && !send.id) {
        layer.msg("yndta.removeMyCustomStock : 参数错误");
        return;
    }
    $.get('/deleteOpStock.htm', send, function(data) {
        if (data == 'success') {
            defer.resolve(send.stockCode);
        } else {
            layer.msg("yndta.addMyCustomStock: 删除自选股失败...");
            defer.reject(send.stockCode);
        }
    })
    return defer.promise();
}


/*视频课程数量*/
yndata.getVideoCount = function() {
    var defer = $.Deferred();
    $.get("/video/collageListCount.htm", function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


/*课程分类*/
yndata.getVideoCategory = function() {
    var url = "/videoType/select.htm";
    var defer = $.Deferred();
    $.getJSON(url, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

/*视频课程*/
yndata.getVideos = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        type: "", //类型
        album: "", //专辑
        time: "1", //最新发布
        look: "", //最多观看
        page: 1, //页码
        row: 12 //数量
    }, ops)

    var send = {
        videoType: ops.type,
        byAlbum: ops.album,
        byCreateTime: ops.time,
        byLookCount: ops.look,
        pageSize: ops.row,
        currentPage: ops.page
    }

    $.getJSON("/video/collageList.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}


//个人信息
yndata.getPersonInfo = function(ops) {
    ops = _.extend({
        userid: ynUserId //默认是当前登录用户
    })
    var defer = $.Deferred();
    $.getJSON("/center/queryUserInfo.htm", { user_id: ops.userid }, function(data) {
        if (data === 0) {
            layer.alert("参数为空");
            return;
        }
        if (data === 2) {
            layer.alert("用户不存在");
            return;
        }
        if (data === 8) {
            layer.alert("用户信息有误");
            return;
        }
        if (data.specialtys === undefined) {
            data.specialtys = [];
        }
        defer.resolve(data);
    })
    return defer.promise();
}


//热门观点
yndata.getHotOpinion = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/html/liveLastedArticle.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}





//我的观点
yndata.getMyOpinion = function(ops) {
    ops = _.extend({
        userid: ynUserId, //默认当前用户
        isDraft: false, //是否草稿
        page: 1,
        row: 10
    }, ops)

    var send = {
        user_id: ops.userid,
        is_draft: ops.isDraft ? 1 : 0,
        pageSize: ops.row,
        currentPage: ops.page
    }
    var defer = $.Deferred();
    $.getJSON("/center/queryMyView.htm", send, function(data) {
        if (data === -1) {
            layer.alert("身份信息有误，请联系客服！");
            return;
        }
        if (data === 0) {
            layer.alert("参数错误");
            return;
        }
        //计算页码
        var count = ops.isDraft ? data.headdata.draftcount : data.headdata.viewcount
        var total = _.max([Math.ceil(count / ops.row), 1]);
        data.pageNumber = total;
        defer.resolve(data);
    })
    return defer.promise();
}

//发布观点
yndata.postOpinion = function(send, ops) {
    ops = _.extend({
        is_draft: 0, //默认为发布观点, 1=草稿
    }, ops);

    send.is_draft = ops.is_draft;

    var defer = $.Deferred();
    $.post("/center/addEditView.htm", send, function(data) {
        if (data == "-1") {
            layer.alert("身份信息有误，请联系客服！");
            return;
        }
        if (data == "success") {
            defer.resolve();
        }
    });
    return defer.promise();
}


yndata.modifyValues = function(send, ops) {
    ops = _.extend({
        is_draft: 1, //默认为草稿
    }, ops);

    send.is_draft = ops.is_draft;

    var defer = $.Deferred();
    $.post("/center/addEditView.htm", send, function(data) {
        if (data == "-1") {
            layer.alert("身份信息有误，请联系客服！");
            return;
        }
        if (data == "success") {
            defer.resolve();
        }
    });
    return defer.promise();
}


//删除观点
yndata.removeOpinion = function(id) {

    var defer = $.Deferred();
    layer.confirm("确定要删除吗", { icon: 3 }, function(index) {
        $.post("/center/addEditView.htm", { article_id: id, is_del: 1, dr: 1 }, function(data) {
            if (data == "success") {
                defer.resolve();
            }
        });
        layer.close(index);
    });
    return defer.promise();
}



//我的直播列表
yndata.getMyLiveList = function(ops) {

    ops = _.extend({
        userid: ynUserId,
        page: 1,
        row: 10
    }, ops)

    var send = {
        user_id: ops.userid,
        pageSize: ops.row,
        currentPage: ops.page
    }

    var defer = $.Deferred();

    $.getJSON("/center/queryMyLive.htm", send, function(data) {
        if (data == "-1") {
            layer.alert("身份信息有误，请联系客服！");
            return;
        }
        //页码
        data.pageNumber = _.max([1, Math.ceil(data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}


//我的内参
yndata.getMyRefer = function(ops) {
    ops = _.extend({
        puiblisherid: ynUserId, //默认当然用户
        page: 1,
        row: 10
    }, ops)

    var send = {
        puiblisherid: ops.puiblisherid,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON('/center/reference/list.htm', send, function(data) {
        var num = Math.ceil(data.total / ops.row);
        data.pageNumber = num > 1 ? num : 1;
        defer.resolve(data);
    })
    return defer.promise();
}


//内参(包括订单信息)
yndata.getRefer = function(teacherid, ops) {
    ops = _.extend({
        userid: ynUserId,
        pge: 1,
        row: 10
    }, ops)

    var send = {
        teacherid: teacherid,
        user_id: ops.userid,
        pageSize: ops.row,
        currentPage: ops.page
    }
    var defer = $.Deferred();
    $.getJSON("/qreference/list.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//我的直播
yndata.getLiveContent = function(periodicalid, ops) {
    ops = _.extend({
        page: 1,
        row: 60
    }, ops)
    var send = {
        periodicalid: periodicalid, //期刊id
        pageSize: ops.row,
        currentPage: ops.page
    }
    var defer = $.Deferred();
    $.getJSON("/html/liveInfo.htm?" + yn.timestamp(), send, function(data) {
        data.pageNumber = Math.ceil(data.total / ops.row);
        defer.resolve(data);
    })
    return defer.promise();
}


//发布直播
yndata.publishLiveContent = function(id, content) {
    if (ynIsLogin != "success") {
        layer.alert("请登录...");
        return;
    }
    if (!content) {
        layer.alert("请输入内容...");
        return;
    }
    var defer = $.Deferred();
    content = content.replace(/(<img)\s+(?:class="big_pic")?(.+?(jpg"|png"))/g, '$1  $2 class="big_pic"');
    var send = {
        periodicalid: id,
        content: content
    }
    $.post("/teacher/html/broadcasting/addBroadcasting.htm", send, function(data) {
        if (data == "success") {
            layer.msg("发表成功")
            defer.resolve(data);
        }
    })
    return defer.promise();
}


//加载股友互动信息
yndata.getFriendTalk = function(periodicalid, ops) {
    var defer = $.Deferred();
    var ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        periodicalid: periodicalid,
        currentPage: ops.page,
        pageSize: ops.row
    }

    $.getJSON("/html/interactionList.htm", send, function(data) {
        data.hasMore = data.length == ops.row ? true : false;
        data = data.reverse();
        defer.resolve(data);
    })
    return defer.promise();
}


//历史直播列表
yndata.getLiveHistory = function(teacherid, ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops);

    var send = {
        teacherid: teacherid,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/html/periodicalList.htm", send, function(data) {
        data.pageNumber = _.max([Math.ceil(data.total / ops.row), 1]);
        defer.resolve(data);
    })
    return defer.promise();
}


//我的视频
yndata.getMyVideo = function(ops) {
    ops = _.extend({
        teacherid: ynTeacherId,
        page: 1,
        row: 10,
        isDraft: false
    }, ops)

    var send = {
        teacherid: ops.teacherid,
        currentPage: ops.page,
        pageSize: ops.row,
        isDraft: ops.isDraft ? 1 : 0
    }

    var defer = $.Deferred();
    $.getJSON("/video/videoList.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}

//关注别表
yndata.getCareList = function(ops) {
    ops = _.extend({
        userid: ynUserId,
        page: 1,
        row: 20
    }, ops)

    var send = {
        user_id: ops.userid,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/center/attentionList.htm", send, function(data) {
        data.pageNumber = _.max([1, +data.total / ops.row])
        defer.resolve(data);
    })
    return defer.promise();
}

//添加关注
yndata.addCare = function(userid, teacherid) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", { user_id: userid, teacherid: teacherid }, function(data) {
        if (data == "success") {
            layer.msg("关注成功");
            defer.resolve();
        }
    })
    return defer.promise();
}


//取消关注
yndata.cancelCare = function(userid, teacherid) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", { user_id: userid, teacherid: teacherid }, function(data) {
        if (data == "success") {
            layer.msg("取消成功");
            defer.resolve();
        }
    })
    return defer.promise();
}


yndata.feedback = function(content, ops) {
        var defer = $.Deferred();
        ops = _.extend({
            creatorid: ynUserId,
            content: content
        }, ops)

        $.post("/feedback/add.htm", ops, function(data) {
            if (data == "success") {
                layer.alert("收到您宝贵的意见，我们会做得更好");
                defer.resolve()
            }
        })
        return defer.promise();
    }
    //粉丝群发
yndata.mass = function(title, content) {
    var defer = $.Deferred();
    var send = {
        tmessagetitle: title,
        tmessagecontent: content
    }
    $.post("/teachermessage/add.htm", send, function(data) {
        if (data == "success") {
            layer.alert("发送成功");
            defer.resolve();
        } else {
            yn.log("msg : send message to all", data)
        }
    })
    return defer.promise();
}

// 最新咨询/问股
yndata.getLastestChat = function(content, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    $.getJSON("/consultation/lastedNote.htm", { pageSize: ops.row, currentPage: ops.page }, function(data) {
        data.pageNumber = _.max([Math.ceil(+data.total / ops.row), 1]);
        defer.resolve(data);
    })
    return defer.promise();
}


//我的问股
yndata.getMyChat = function(content, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        page: 1,
        row: 10,
        isReplay: true, // 是否为回复
        user_id: ynUserId
    }, ops)
    $.getJSON("/consultation/myNoteList.htm", { pageSize: ops.row, currentPage: ops.page, self: ops.isReplay }, function(data) {
        data.pageNumber = _.max([Math.ceil(+data.total / ops.row), 1]);
        defer.resolve(data);
    })
    return defer.promise();
}


//最新回答
yndata.getNewChat = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        best: "", // 精彩参数 best=1
        type: -1 // 分类 [ynconfig.noteType]
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        note_type: ops.type >= 0 ? ops.type : "",
        is_adopt: ops.best
    }

    var defer = $.Deferred();
    $.getJSON("/consultation/lastedNote.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}

//提问统计数
yndata.Statistics = function() {
    var defer = $.Deferred();
    $.getJSON("/consultation/queryAnswerCountAndReadCount.htm", function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//文章评论
yndata.getArticleCommon = function(id, ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        type: 0
    }, ops)

    var send = {
        articleId: id,
        type: ops.type,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/articleCommentList.htm", send, function(data) {
        if (data.rows.status == "-1") {
            layer.msg("评论出错")
            defer.reject();
            return;
        }
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}


//发布观点评论
yndata.postArticleCommon = function(id, content, ops) {
    ops = _.extend({
        type: 0, //0=资讯, 1=观点评论
        parentId: "" //如果是回复评论, 为评论的ID
    }, ops)
    var defer = $.Deferred();
    var send = { article_id: id, content: content, type: ops.type, parent_id: ops.parentId }

    console.log("send", send);
    $.post("/articleCommentReply.htm", send, function(data) {
        if (data.rows.status == "1") {
            layer.msg("发表成功")
        }
        defer.resolve(data);
    }, 'json')
    return defer.promise();
}


// 发布评论观点
yndata.postNewsComment = function(id, content) {
    var defer = $.Deferred();
    var send = {
        backnews_id: id,
        content: content,
        create_id: ynUserId
    }

    $.post("/article/commentNews.htm", send, function(data) {
        if (data == "success") {
            defer.resolve(data);
        } else {
            layer.msg("评论成功")
        }

    })
    return defer.promise();
}


//获取资讯评论
yndata.getNewsComment = function(id, ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        backnews_id: id
    }

    var defer = $.Deferred();
    $.getJSON("/article/queryNewsComments.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}


//获取我的问答信息/向我提问信息
yndata.getMyAnswer = function(ops) {
    ops = _.extend({
        userid: ynUserId, //当前用户
        isReply: 0, //
        page: 1,
        row: 10
    }, ops)

    var send = {
        userid: ops.userid,
        is_reply: ops.isReply,
        pageSize: ops.row,
        currentPage: ops.page
    }
    var defer = $.Deferred();
    $.getJSON("/center/queryMyanswer.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        data.head = data.rows.headdata;
        data.body = data.rows.bodydata;
        data.rows = null
        defer.resolve(data);
    })
    return defer.promise();
}

//获取我的问答信息: 基于分类
yndata.getMyAnswerWithType = function(teacherid, ops) {

    ops = _.extend({
        teacherid: teacherid,
        page: 1,
        row: 10,
        type: 0 //0：大盘 1：板块  2：个股  3：股票知识
    }, ops)

    var send = {
        teacherid: ops.teacherid,
        pageSize: ops.row,
        currentPage: ops.page,
        type: ops.type
    }

    var defer = $.Deferred();
    $.getJSON("/live/queryTeacherNoteByType.htm", send, function(data) {
        if (data.status == 1) {
            data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.row)]);
            defer.resolve(data);
        }

    })
    return defer.promise();
}


//回答提问
yndata.replyQuestion = function(noteid, content) {
    var send = {
        noteid: noteid,
        answercontent: content
    }
    var defer = $.Deferred();
    $.post("/center/answer.htm", send, function(data) {
        if (data = 'success') {
            layer.msg("回答成功");
            defer.resolve(data);
        }
    })
    return defer.promise();
}


yndata.getPhoneCode = function(btn, phoneNumber) {
    if (!yn.isMobile(phoneNumber)) {
        layer.alert("请输入正确手机号码");
        return;
    }
    btn.html("<span id='sendCount'>60</span>秒后可以再次获取!");
    btn.removeClass("sendbefore").addClass("sendafter");
    var background = btn.css('background-color');
    var border = btn.css("border-color");
    btn.css({ 'background': "gray", "border-color": "gray" })
    btn.get(0).disabled = true;
    var timer = setInterval(function() {
        var count = $("#sendCount");
        var value = Number(count.text());
        if (value > 1) {
            value--
            count.text(value);
        } else {
            btn.get(0).disabled = false;
            btn.html("获取手机验证码");
            btn.css({ "background-color": background, "border-color": border });
            clearInterval(timer);
        }
    }, 1000);

    $.post("/sendPhoneCode.htm", { phone: phoneNumber }, function(data) {
        if (data === "-1") {
            layer.alert("短信发送失败，请重试!");
        }
    });
}


//获取城市列表

yndata.getCity = function(provinceid) {
    var defer = $.Deferred();
    $.getJSON("/address/queryCity.htm?parentid=" + provinceid, function(data) {
        var tags = ''
        _.forEach(data, function(item) {
            tags += '<option value="' + item.address_id + '">' + item.address_name + '</option>';
        })
        defer.resolve(tags);
    })
    return defer.promise();
}


//擅长领域
yndata.getGoodat = function() {
    var defer = $.Deferred();
    $.getJSON("/center/specialty.htm", function(data) {
        defer.resolve(data.rows);
    })
    return defer.promise();
}


//投资方向
yndata.getInvestType = function() {
    var defer = $.Deferred();
    $.getJSON("/investmenttypes/select.htm", function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


/**
 * [查询持仓明细]
 * @param  {[String]} id [用户id]
 * @return {[Array]}    [持仓数据]
 */
yndata.getHoldStock = function(id) {
    var defer = $.Deferred();
    $.getJSON("/webstock/webQueryshlist.htm", { teacherid: id }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

/**
 * 查询交易记录
 */
yndata.getStockTradeHistory = function(id, ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)
    var defer = $.Deferred();
    $.getJSON("/webstock/webQuerysdlist.htm", {
        teacherid: id,
        pageSize: ops.row,
        currentPage: ops.page
    }, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}


//获取过去6个月收益
yndata.getMonthIncome = function(id) {
    var defer = $.Deferred();
    $.getJSON("/webstock/webQueryMothlist.htm", { teacherid: id }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//获取相关视频课程
yndata.getRelativeVideo = function(teacherid, ops) {
    ops = _.extend({
        page: 1,
        row: 5
    }, ops)
    var defer = $.Deferred();
    $.getJSON("/video/collageList.htm", {
            teacherId: teacherid,
            pageSize: ops.row,
            currentPage: ops.page
        },
        function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
            defer.resolve(data);
        })
    return defer.promise()
}


//获取视频评论
yndata.getVideoComment = function(videoid, ops) {
    ops = _.extend({
        page: 1,
        row: 5
    }, ops)
    var defer = $.Deferred();
    $.getJSON("/videoCommentList.htm", {
            videoId: videoid,
            pageSize: ops.row,
            currentPage: ops.page
        },
        function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.commentCount / ops.row)])
            defer.resolve(data);
        })
    return defer.promise()
}

//发表视频评论
yndata.postVideoComment = function(videoid, content) {
    var defer = $.Deferred();
    $.post("/auth/videoCommentReply.htm", { video_id: videoid, content: content }, function(data) {
        if (data.status == "1") {
            layer.msg("评论成功!")
            defer.resolve();
        } else {
            layer.msg("评论失败");
            defer.reject();
        }
    }, 'json')
    return defer.promise()
}


//获取专辑信息
yndata.getAlbumInfo = function(id) {
    ops = _.extend({
        page: 1,
        row: 5
    })

    var send = {
        albumId: id,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/video/albumList.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise()
}


//阅读数量
yndata.getViewCount = function(articleId) {
    var defer = $.Deferred();
    $.getJSON("/articleViewCount.htm", { articleId: articleId }, function(data) {
        if (+data.status == 1) {
            defer.resolve(data);
        } else {
            console.log("xxx: yndata.getViewCount error...", data);
            defer.reject()
        }
    });
    return defer.promise();
}


//观点点赞
yndata.like = function(article_id) {
    var defer = $.Deferred();
    $.post("/html/zanArticle.htm", { article_id: article_id }, function(data) {
        if (data == "success") {
            layer.msg("谢谢您的赞美...")
            defer.resolve(data);
        }
        if (data == 'complete') {
            layer.msg("您已经赞美过啦...")
            defer.reject()
        }
    })
    return defer.promise()
}


//发送私信
//如果是回复: 需要第三个参数
yndata.postMsg = function(receiverId, content, msgid) {
    var defer = $.Deferred();
    var send = {
        acceptid: receiverId, //接收人
        creatorid: ynUserId, //发送人
        content: content, // 内容
    }

    if (msgid) {
        send.id = msgid; //回复的私信id
    }

    $.post("/letter/questionLetter.htm", send, function(data) {
        if (data == "success") {
            layer.msg("发送成功")
            defer.resolve();
        }
        if (+data == 0) {
            layer.alert("参数为空");
            defer.reject();
        }
    })
    return defer.promise();
}


/**
 * 我的私信
 */
yndata.getMyMsg = function(ops) {
        ops = _.extend({
            page: 1,
            row: 10,
            type: 0
        }, ops)

        var send = {
            currentPage: ops.page,
            pageSize: ops.row,
        }

        if (+ops.type === 1) {
            send.creatorid = ynUserId
        } else if (+ops.type === 0) {
            send.acceptid = ynUserId
        } else {
            layer.msg("getMyMsg : type参数错误 : [0, 1]")
            return;
        }

        var defer = $.Deferred();

        $.getJSON("/letter/queryLetterList.htm", send, function(data) {
            if (+data == 0) {
                layer.alert("参数为空");
                defer.reject()
                return;
            }

            if (+data == 11) {
                layer.alert("参数错误");
                defer.reject()
                return;
            }

            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
            defer.resolve(data);
        })
        return defer.promise();
    }
    //删除粉丝
    // yndata.removefans = function(id) {
    //     var defer = $.Deferred();
    //     layer.confirm("确定要删除吗", { icon: 3 }, function(index) {
    //         $.post("/getAttentionUserList.htm", { user_id: id, is_del: 1 }, function(data) {
    //             if (data == "success") {
    //                 defer.resolve();
    //             }
    //         });
    //         layer.close(index);
    //     });
    //     return defer.promise();
    // }
    /**
     * 消息推送
     */
yndata.getNewsPush = function(ops) {
        ops = _.extend({
            page: 1,
            row: 10,
        }, ops)

        var send = {
            currentPage: ops.page,
            pageSize: ops.row,
        }

        var defer = $.Deferred();
        $.getJSON("/getAttentionUserList.htm", send, function(data) {
            if (+data == 0) {
                layer.alert("参数为空");
                defer.reject()
                return;
            }

            if (+data == 11) {
                layer.alert("参数错误");
                defer.reject()
                return;
            }
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
            defer.resolve(data);
        })
        return defer.promise();
    }
    /**
     * 发送纪录
     */
yndata.getrecord = function() {
    var defer = $.Deferred();
    $.getJSON("/getTeacher_message.htm", function(data) {
        if (+data == 0) {
            layer.alert("参数为空");
            defer.reject()
            return;
        }

        if (+data == 11) {
            layer.alert("参数错误");
            defer.reject()
            return;
        }
        defer.resolve(data);
    })
    return defer.promise();
}


//查询问股详情
yndata.queryNoteDetail = function(id) {
    var defer = $.Deferred();
    $.getJSON("/consultation/queryNoteDetail.htm", { noteid: id }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//解答排行
yndata.answerask = function(ops) {
    ops = _.extend({
        page: 1,
        row: 5,
    }, ops);

    var defer = $.Deferred();
    $.getJSON("/consultation/queryAnswerRanking.htm", { currentPage: ops.page, pageSize: ops.row }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//牛人看涨涨跌
yndata.rising = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        type: 0
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        singtype: ops.type
    }

    var defer = $.Deferred();
    $.getJSON("/consultation/querySeeStockTrent.htm", send, function(data) {
        defer.resolve(data);
    })

    return defer.promise();
}

/**
 * 查询所有在线老师
 */
yndata.getOnlineTeacher = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        row: 5,
        page: 1,
        userid: ynUserId //根据userid返回是否关注该老师
    }, ops);

    var send = {
        pageSize: ops.row,
        currentPage: ops.page,
        userid: ops.userid
    };

    $.getJSON("/consultation/queryOnlineTeacher.htm", send, function(data) {
        defer.resolve(data);
    });
    return defer.promise();
};

/**
 * 查询所有在线老师
 * 支持关键字搜索
 */
yndata.queryOnlineTeacher = function(key) {
    key = key || "";
    var defer = $.Deferred();
    $.getJSON("/consultation/queryLikeTeacher.htm", { likename: key }, function(data) {
        defer.resolve(data);
    })
    return defer.promise()
}

//用户提问  未回答
yndata.noAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        questionuserid: ynUserId
    }

    var defer = $.Deferred();
    $.getJSON("/center/queryNoAnswer.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//用户提问  已回答
yndata.yesAnswer = function(ops) {

    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        questionuserid: ynUserId
    }

    var defer = $.Deferred();
    $.getJSON("/center/queryYesAnswer.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//用户提问  待评价
yndata.evalAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        questionuserid: ynUserId
    }

    var defer = $.Deferred();
    $.getJSON("/center/queryEvalAnswer.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//查询老师的回答问题信息
yndata.getStatistics = function(ops) {
    ops = _.extend({
        teacherId: ynTeacherId
    }, ops)

    var defer = $.Deferred();
    $.getJSON("/center/queryTeacherAskStock.htm", {
        answeruserid: ops.teacherId,
        t: yn.timestamp()
    }, function(data) {
        defer.resolve(data)
    })
    return defer.promise();
}

//查询@我的问股
yndata.question_mention = function(ops) {
    ops = _.extend({
        teacherId: ynTeacherId,
        page: 1,
        row: 10
    }, ops)

    var defer = $.Deferred();
    $.getJSON("/center/queryATeacherNote.htm", {
        teacherid: ops.teacherId,
        currentPage: ops.page,
        pageSize: ops.row,
        t: yn.timestamp()
    }, function(data) {
        data.pageNubmer = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data)
    })
    return defer.promise();
}

//待解答问股
yndata.question_all = function(ops) {
    ops = _.extend({
        teacherid: ynTeacherId,
        page: 1,
        row: 10
    }, ops)
    var defer = $.Deferred();
    $.getJSON("/center/queryTeacherUnAnswered.htm", {
        currentPage: ops.page,
        pageSize: ops.row,
        teacherid: ops.teacherid,
        t: yn.timestamp()
    }, function(data) {
        data.pageNubmer = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}

//已回答
yndata.question_done = function(ops) {
    ops = _.extend({
        teacherId: ynTeacherId,
        page: 1,
        row: 10
    }, ops)

    var defer = $.Deferred();
    $.getJSON("/center/queryTeacherYesAnswer.htm", {
        teacherid: ops.teacherId,
        currentPage: ops.page,
        pageSize: ops.row,
        t: yn.timestamp()
    }, function(data) {
        if (+data == 0) {
            layer.msg("参数错误 : 请确认当前用户角色是否为老师")
            return;
        }
        data.pageNubmer = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data)
    })
    return defer.promise();
}


//用户提问  未回答
yndata.noAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        userId: ynUserId
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        questionuserid: ops.userId
    }

    var defer = $.Deferred();
    $.getJSON("/center/queryNoAnswer.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}

//用户提问 待评价
yndata.evalAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        userId: ynUserId
    }, ops)
    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        questionuserid: ops.userId
    }
    var defer = $.Deferred();
    $.getJSON("/center/queryEvalAnswer.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}


//用户提问  已回答
yndata.yesAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        userId: ynUserId
    }, ops)
    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        questionuserid: ops.userId
    }
    var defer = $.Deferred();
    $.getJSON("/center/queryYesAnswer.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}


//
yndata.getAskTimes = function() {
    var defer = $.Deferred();
    $.getJSON("/consultation/queryTodayQuestionCount.htm", {
        questionuserid: ynUserId,
        t: yn.timestamp()
    }, function(data) {
        defer.resolve(ynconfig.totalAskTime - data.rows);
    })
    return defer.promise()
}



//向老师打赏
yndata.postplaytour = function(price, teacherid, goodsId) {
    var defer = $.Deferred();
    var send = {
        actual_price: price, //实际价格
        teacherid: teacherid,
        goodsId: goodsId, // 商品ID 
        consumption_name: "打赏观点", // 红包/饮料...
        consumption_type: 0, // 0观点 ， 1组合，2课程，3礼物，4内参
        consumption_source: 0, //客户端类型
        user_id: ynUserId,
        price: price, //价格
        discount_price: price //折扣价格
    }
    $.post('/reward/rewardTheacher.htm', send, function(data) {
        if (data == "success") {
            layer.msg("打赏成功,感谢打赏!");
            defer.resolve();
        } else {
            layer.msg("打赏失败!");
            defer.reject();
        }
    })
    return defer.promise();
}


//余额支付
yndata.postGift = function(ops) {
    var defer = $.Deferred();
    var send = {
        orderNum: ops.orderNum
    }
    console.log(send)
    $.post('/reward/rewardTheacher.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}




//账户余额
yndata.balance = function() {
    var defer = $.Deferred();
    $.getJSON('/useraccount/pay_useraccountDetail.htm', { user_id: ynUserId }, function(data) {
        defer.resolve(data)
    })
    return defer.promise();
}


/**
 * 观点数据
 *
 */
yndata.getOpinion = function(ops) {
    ops = _.extend({
        teacherid: "",
        page: 1,
        row: 10,
        type: null // 观点分类   0大盘, 1题材, 2个股, 3股票学堂  ,null查询全部
    }, ops)

    var send = {
        pageSize: ops.row,
        currentPage: ops.page,
        classify: ops.type,
        teacherid: ops.teacherid
    }

    var defer = $.Deferred()
    $.getJSON("/opinion/queryNewOpinions.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })

    return defer.promise();
}


//观点牛人
yndata.getOpinionBest = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
    }, ops)

    var send = {
        pageSize: ops.row,
        currentPage: ops.page,
    }

    var defer = $.Deferred()
    $.getJSON("/opinion/queryOpinionTeacher.htm", send, function(data) {
        defer.resolve(data);
    })

    return defer.promise();
}


//获取新闻资讯
//type :  ["热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻"]
yndata.getNewsList = function(ops) {
    var defer = $.Deferred();

    ops = _.extend({
        type: "", //
        page: 1,
        row: 20
    }, ops)

    var send = {
        backnews_type: ops.type,
        currentPage: ops.page,
        pageSize: ops.row
    }

    $.getJSON("/article/queryNews.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })

    return defer.promise()
}

//生成充值订单号
yndata.rencharge = function(totalPrice) {
    var defer = $.Deferred();
    var send = {
        pay_source: 0,
        totalPrice: totalPrice,
        orderType: 0
    }
    console.log(send)
    $.post('/app/appRechargeOrder.htm', send, function(data) {
        defer.resolve(data);
    }, 'json');
    return defer.promise();
}

//生成订单
yndata.indentNum = function(ops) {
    ops = _.extend({
        pay_source: 0,
    }, ops)
    var send = {
        goodsId: ops.goodsId, //商品id
        goodsType: ops.goodsType, //商品类型(0观点，1组合，2课程，3礼物，4内参 5:问股 6 直播)
        totalPrice: ops.totalPrice, //支付总价
        pay_source: ops.pay_source, //来源 0web 1ios 2android
        teacherId: ops.teacherId //老师ID
    }
    console.log(send)
    var defer = $.Deferred()
    $.post("/app/appRewardPayOrder.htm", send, function(data) {
        defer.resolve(data);
    }, 'json')

    return defer.promise();
}

//充值
yndata.alipay = function(orderNum) {
    var defer = $.Deferred();
    $.post('/web/webPay.htm', { orderNum: orderNum }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//支付状态
yndata.payStatus = function() {
    var defer = $.Deferred()
    $.post("/web/getPayStatus.htm", function(data) {
        defer.resolve(data);
    })

    return defer.promise();
}

//内参生成预支付订单
yndata.referindentNum = function(ops) {
    ops = _.extend({
        pay_source: 0,
    }, ops)
    var send = {
        goodsId: ops.goodsId, //商品id
        goodsType: ops.goodsType, //商品类型(0观点，1组合，2课程，3内参 4:问股 5 直播)
        buy_number: 1, //内参数量
        pay_source: ops.pay_source, //来源 0web 1ios 2android
    }
    var defer = $.Deferred()
    $.post("/app/buyGoodsPayOrder.htm", send, function(data) {
        defer.resolve(data);
    }, 'json')

    return defer.promise();
}

//增加资讯阅读量
yndata.addViewCount = function(id) {
    var defer = $.Deferred()
    $.post("/article/addNewsViewCount.htm", { backnews_id: id }, function(data) {
        defer.resolve()
    })
    return defer.promise()
}


//查询资讯阅读量
yndata.getViewCount = function(id) {
    var defer = $.Deferred()
    $.getJSON("/article/queryNewsViewAndZanCount.htm", { backnews_id: id }, function(data) {
        defer.resolve(data)
    })
    return defer.promise()
}



//观点查询
yndata.queryOpinion = function(ops) {
    var defer = $.Deferred();

    ops = _.extend({
        teacherid: "",
        page: 1,
        row: 5,
        type: 'viewnumber' //viewnumber  浏览量字段   comment_count  评论量字段   zan_count 点赞字段   create_time 时间字段
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        orderbyStr: ops.type,
        teacherid: ops.teacherid
    }

    $.getJSON("/opinion/queryOrderByStrOpinion.htm", send, function(data) {
        console.log("查询观点", data);
        defer.resolve(data);
    })
    return defer.promise();
}


//查询老师的精彩回答 | 基于sort 参数排序
yndata.queryTeacherHotAnswer = function(teacherid, ops) {
    var defer = $.Deferred();
    // sort : questiontime提问时间，note_readcount，阅读量，zancount点赞量，answertime回答时间
    ops = _.extend({
        teacherid: teacherid,
        sort: "note_readcount",
        page: 1,
        row: 10
    }, ops)

    var send = {
        teacherid: ops.teacherid,
        orderByStr: ops.sort,
        pageSize: ops.row,
        currentPage: ops.page
    }
    $.getJSON('/live/queryTeacherHotAnswer.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//获取老师的精彩观点数据
yndata.getTeacherBestOpinion = function(teacherid, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        order: "viewnumber", //comment_count，zan_count，cai_count，create_time，viewnumber  评论数据，赞数量，踩数量，创建时间，浏览量
        page: 1,
        row: 6
    }, ops)
    var send = {
        teacherid: teacherid,
        orderbyStr: ops.order,
        pageSize: ops.row,
        currentPage: ops.page
    }
    $.getJSON("/opinion/queryOrderByStrOpinion.htm", send, function(data) {
        console.log("-----===========", data)
        defer.resolve(data);
    })
    return defer.promise();
}


/**
 * 查询老师的直播信息
 */
yndata.getTeacherLiveInfo = function(teacherId, ops) {
        ops = _.extend({
            id: "", // 直播信息ID, 默认从最新的信息作为起点, 不为空则从该直播作为起点计算
            page: 1,
            row: 10
        }, ops)

        var send = {
            id: ops.id,
            teacherid: teacherId,
            currentPage: ops.page,
            pageSize: ops.row
        }

        var defer = $.Deferred();
        $.getJSON("/live/liveDetailByTeacherid.htm", send, function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    //内参查询
yndata.referInquire = function(ops) {
        ops = _.extend({
            id: ''
        }, ops)

        var send = {
            id: ops.id
        }

        var defer = $.Deferred();
        $.getJSON('/reference/referbyid.htm', send, function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    //内参详情list
yndata.getregerp = function(ops) {
        ops = _.extend({
            referenceid: referenceid,
            currentPage: 1,
            pageSize: 10
        }, ops)
        var send = {
            referenceid: ops.referenceid,
            pageSize: ops.pageSize,
            currentPage: ops.currentPage
        }
        var defer = $.Deferred();
        $.getJSON('/reference_periodical/list.htm', send, function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.pageSize)])
            defer.resolve(data);
        })
        return defer.promise();
    }
    //更新内参
yndata.addReferp = function(ops) {
        ops = _.extend({
            referenceid: referenceid,
            content: '',
            puiblisher: puiblisher,
            puiblisherid: puiblisherid
        }, ops)
        var send = {
            referenceid: ops.referenceid,
            content: ops.content,
            puiblisher: ops.puiblisher,
            puiblisherid: ops.puiblisherid
        }
        var defer = $.Deferred();
        $.post('/reference_periodical/add.htm', send, function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    //内参详情评论列表
yndata.commontlist = function(ops) {
        ops = _.extend({
            type: 0,
            content: '',
            referenceid: referenceid,
            user_id: ynUserId,
            productStatus: status,
            pageSize: 10,
            currentPage: 1
        }, ops)
        var send = {
            type: ops.type,
            content: ops.content,
            reference_id: ops.referenceid,
            user_id: ops.user_id,
            productStatus: ops.productStatus,
            pageSize: ops.pageSize,
            currentPage: ops.currentPage
        }
        var defer = $.Deferred();
        $.getJSON('/reference/commentList.htm', send, function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.pageSize)])
            defer.resolve(data);
        })
        return defer.promise();
    }
    //内参用户评论
yndata.upCommont = function(ops) {
        ops = _.extend({
            reference_id: referenceid, //内参id
            create_id: ynUserId, //用户id
        }, ops)
        var send = {
            reference_id: ops.reference_id,
            parent_id: ops.parent_id,
            create_id: ops.create_id,
            content: ops.content,
        }
        var defer = $.Deferred();
        $.post('/reference/addComment.htm', send, function(data) {
            if (data == "success") {
                layer.msg('评论成功！');
            };
            defer.resolve(data);
        })
        return defer.promise();
    }
    //TA的内参
yndata.TARefer = function(ops) {
        ops = _.extend({
            puiblisherid: puiblisherid,
            userId: ynTeacherId,
            pageSize: 5,
            currentPage: 1
        }, ops)
        var send = {
            puiblisherid: ops.puiblisherid,
            userId: ops.userId,
            pageSize: ops.pageSize,
            currentPage: ops.currentPage
        }
        var defer = $.Deferred();
        $.getJSON('/center/reference/teacherReferenceList.htm', send, function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    //我的内参
yndata.getone = function(ops) {
    ops = _.extend({
        audit: '',
        status: '',
        productStatus: '',
        puiblisherid: ynUserId, //默认当然用户
        page: 1,
        row: 10
    }, ops)

    var send = {
        audit: ops.audit,
        type: ynIsTeacher,
        status: ops.status,
        productStatus: ops.productStatus,
        puiblisherid: ops.puiblisherid,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON('/center/reference/list.htm', send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}
