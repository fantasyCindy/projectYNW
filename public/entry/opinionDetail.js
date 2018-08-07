yn.navigation.name = ynconfig.navigation.c;
var askWindow = require('base/askWindow.js'); //提问
var personInfo = require('m/ui/person-info.js');
var payAny = require('m/ui/pay-any-package.js')
var comments = require('m/ui/post-comment.js')
var Face = require('m/qqface/main.js');
var error = require('e/error-type')




var readCount = (function() {
    var key = "open-last"
    var last = +localStorage.getItem(key) || 0 // 上一次打开时间

    // 30分钟之内仅增加一次
    if (_.now() - last > 1000 * 60 * 30) {
        // 增加阅读量
        $.get("/article/updateBrowser.htm", { article_id: __detail.id }, function(back) {
            back = JSON.parse(back)
            if (back.status == 1) {
                localStorage.setItem(key, _.now())
            } else() => {
                return layer.msg(error[back.status])
            }
        })
    }

})()


// $('body,html').animate({ scrollTop: 0 })
/*///////////////////////////////////////////////////////////////////*/

window._bd_share_config = {
    common: {
        onBeforeClick: function(cmd, config) {
            config.bdText = $('#opinion-detail-title').text() + '--【约投顾】';
            config.bdDesc = $('#opinion-detail-title').text() + '--【约投顾】';
            return config
        },
        onAfterClick: function(cmd) {
            $('.bdsharebuttonbox').hide();
        }
    },
    share: {
        "bdSize": 24,
        "bdStyle": 1,
        "bdCustomStyle": "/public/v2/base/base.css"
    }
}

/*------------老师名片位置------------*/

var scroll = function() {
        var info, height, place, htm, visible = false;

        $(window).scroll(function() {
            if (!info) {
                info = $('.right-container .person-info')
                place = $('.namecard')
            }
            if (!height) {
                height = $('.frame-right').outerHeight(true) + 120
                log('height111', height)
            }

            var h = $(window).scrollTop();
            if (h >= height) {
                if (visible) {
                    htm = $('.namecard .person-info').html();
                    info.html(htm)
                    return;
                }
                place.show().html(info.clone(true))
                visible = true;
            } else {
                place.hide()
                visible = false;
            }
        });
    }
    //个人信息渲染完毕再执行scroll()
personInfo.finish = function(data) {
    scroll();
}

/*----------global--------*/
var bootpag


// 评论
var comment = {
    page: 1,
    row: 10,
    init: function() {
        //发布
        var post = new comments({
            container: $('.yncomment'),
            limit: 200
        })
        post.init();
        post.onSubmit = function(send) {
            if (_.trim(send.value.length) > 200) {
                return layer.msg('评论不能超过200字哦')
            }
            postArticleCommon(__detail.id, send.value, {
                type: 1,
                parentId: send.parentId
            }).done(function() {

                if (!send.parentId) {
                    comment.page = 1;
                    bootpag.bootpag({
                        page: 1
                    });
                }
                comment.render();
            })
        }
        var self = this;
        this.container = $('#article-common');
        this.items = $('#article-common .items');

        this.container.on('click', '.reply', function() {

            var id = $(this).data('id')
            var createid = $(this).data('userid');
            if (+createid == +ynUserId) {
                return layer.msg("自己不能回复自己")
            }
            var name = $(this).data('name')
            post.addReply(id, name);
        })
    },
    render: function() {
        var self = this;
        var result = [];

        getArticleCommon(__detail.id, {
            page: this.page,
            row: this.row,
            type: 1
        }).done(function(data) {
            var rows = data.data.data;
            if (rows.length < 1) {
                self.items.html(ynconfig.none({ margin: 50 }));
                return;
            }
            handleData(rows);
            self.items.html(template('comment-template', result));
            bootpag.bootpag({ total: data.pageNumber })
        })

        function handleData(data, replyFlag) {
            console.log("=data==", data)
            _.forEach(data, function(item) {
                item.createPhoto = item.createPhoto || "/public/images/user.jpg";
                item._isSelf = ""
                item._reply = "";
                item._style = "";
                result.push(item);
                if (replyFlag) {
                    item._reply = "<span style='font-size:12px;color:#f57a17;position:relative;top:-1px'>回复" +
                        "<i style='margin:0 10px;' class='fa fa-angle-right'></i></span>";
                    item._style = "isReply";


                }

                if (item.childList.length > 0) {
                    handleData(item.childList.reverse(), item.createName);
                }
                // item.content = yn.parseFaceCode(item.content);
                item._content = item.content.replace(/\[.+?\]/g, match => {
                    var isOld = /face=/.test(match)
                    if (isOld) {
                        return yn.parseFaceCode(match)
                    } else {
                        var name = Face.getInstance().titleToName(match)
                        if (!name) return match;
                        var src = `${__path}/public/module/qqface/png/${name}@2x.png`
                        return `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" >`
                    }
                })
            })
        }
    }
}



// 打赏/分享
var action = function() {
    var container,
        likeCount, //赞数量
        bd, //分享
        showShare = false,
        share,
        supportUsers

    var event = function() {

        //点赞
        container.on('click', '.like', function() {
            like(__detail.id).done(data => {
                var cur = +likeCount.text();
                likeCount.text(++cur)
            })
        })

        //分享
        share.on('click', function() {
            yn.positionShare($(this));
        }).on('mouseleave', function() {
            setTimeout(function() {
                if (!showShare) bd.hide();
            }, 600)
        })

        bd.on('mouseenter', function() {
            showShare = true
        }).on('mouseleave', function() {
            showShare = false
            bd.hide();
        })

        //打赏
        container.on('click', '.support', function() {
            if (!ynIsLogin) return yn.login.render();

            // 显示打赏窗口
            payAny.render({
                type:0, //0观点，1组合，2课程，3 内参 4:问股 5 直播 6vip直播室
                teacherId: __detail.teacherId,
                id: __detail.id,
                finish: true,
                useNB:true,
                success: () => {
                    action.render()
                }
            })
        })
    }

    var createItems = arr => {
        var arr = _.compact(arr); //lodash 返回一个移除所有假值的数组 如false null "" 0 NaN undefined
        return _.map(arr, item => `<div class="inline support-user"><img src="${item.photo}"/></div>`).join("")
    }

    return {
        init() {
            container = $(".addition");
            likeCount = $('#zanCountValue');
            bd = $('.bdsharebuttonbox');
            share = $('.share');
            supportUsers = $(".support-users")
            event()
        },
        render() {

            // 获取打赏人列表
            $.getJSON(`${__path}/opinion/rewardOpinion.htm`, {
                article_id: __detail.id
            }, back => {
                if (back.status == 1) {
                    supportUsers.find('.items').html(createItems(back.data))
                    back.length > 0 && supportUsers.find('.length').show().find('.value').text(back.data.length)
                }
            })
        }
    }
}()


//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

$(function() {
    askWindow.init();
    viewDidLoad();

    // 个人信息
    personInfo.render({
        container: $('.person-info'),
        teacherid: __detail.teacherId,
        onAsk: info => askWindow.aimedRender({ select: info })
    })

    onSelect('观点')
    $('#articleContent').find('a').removeAttr('href')
})


function viewDidLoad() {

    var teacherName = $('.person-info .name').text();
    var $live = $(".person-live");
    var $answer = $(".person-answer");
    var $opinion = $(".person-opinion");
    var $opinion = $(".person-opinion");
    var $navg = $("#navg");
    $navg.find('.dapan').attr('href', "/" + __name[__classifyName] + '/')
        //设置链接
    _.forEach([$live, $answer, $opinion], item => {
        var more = item.find('a.more');
        var href = more.attr('href');
        href = item == $live ? href + __detail.teacherId + '/' : href + __detail.teacherId + '/';
        more.attr('href', href)
    })

    //页码
    bootpag = yn.bootpag("#article-common .comment");
    bootpag.on('page', function(err, num) {
        bootpag.bootpag({ page: num });
        comment.page = num;
        comment.render();
    })

    //评论
    comment.init();
    comment.render();

    //赞
    action.init();
    action.render();

    //观点
    var opinion = new TeacherBestOpinion();
    opinion.container = $opinion.find('.items');
    opinion.teacherid = __detail.teacherId;
    opinion.order = "create_time";
    opinion.row = 4;
    opinion.init();
    opinion.render();

    //回答
    var bestAnswer = new BestAnswer();
    bestAnswer.container = $answer.find(".items");
    bestAnswer.teacherid = __detail.teacherId
    bestAnswer.row = 4;
    bestAnswer.render();

    //直播
    var living = new TeacerLivingInfo();
    living.container = $live.find('.items');
    living.teacherId = __detail.teacherId;
    living.render();
}



/*//////////////////////// get data TA的观点///////////////////////////////////////////*/
//获取老师的精彩观点数据
var getTeacherBestOpinion = function(teacherid, ops) {
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
        defer.resolve(data);
    })
    return defer.promise();
}


var TeacherBestOpinion = function() {}
TeacherBestOpinion.prototype = {
    order: "viewnumber", ////comment_count，zan_count，cai_count，create_time，viewnumber  评论数据，赞数量，踩数量，创建时间，浏览量
    container: null,
    teacherid: null,
    row: 5,
    init: function() {},
    render: function() {
        var _this = this;
        var handleData = function(data) {
            return _.map(data, function(item) {
                item._content = function() {
                    var result = "";
                    result = item.opinionShortContent.replace(/^【.+?】/, '')
                    return result
                }()

                return item;
            })
        }
        getTeacherBestOpinion(this.teacherid, { row: this.row, order: this.order }).done(function(data) {
            if (data.status == 1) {
                data.data.list = handleData(data.data.list);
                _this.container.html(template('bestOpinion-list-template', data.data.list));
            }
        })
    }
}





/*//////////////////////// get data  TA的问股///////////////////////////////////////////*/
//查询老师的精彩回答 | 基于sort 参数排序
var queryTeacherHotAnswer = function(teacherid, ops) {
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


var BestAnswer = function() {}
BestAnswer.prototype = {
    teacherid: null,
    container: null,
    row: 8,
    sort: "note_readcount", //// sort : questiontime提问时间，note_readcount，阅读量，zancount点赞量，answertime回答时间
    render: function() {
        var _this = this;
        queryTeacherHotAnswer(this.teacherid, {
            row: _this.row,
            sort: _this.sort
        }).done(function(data) {
            if (data.status == '1') {
                var rows = handleData(data.data);
            } else {
                return layer.msg(error(data.status))
            }

            var tableView = new TableView();
            tableView.container = _this.container;
            tableView.data = rows;
            tableView.init();
            tableView.render();
        })

        function handleData(data) {
            return _.map(data, function(item) {
                item._title = item.questioncontent;
                item._content = yn.filterHTML(item.answercontent);
                item._time = yn.timeFormat(item.answertime);
                item._link = "/consultation/askStockDetail.htm?id=" + item.noteid
                item._class_time = "show";
                item._class_view = "show";
                item._count_view = item.note_readcount
                return item;
            })
        }
    }
}

var TableView = function() {
    this.container = null;
    this.data = null;
}

TableView.prototype = {
    init: function() {},
    render: function() {
        this.data = this.dataMap(this.data);
        this.container.html(template('tableView-template', this.data))
    },
    dataMap: function(data) {
        return _.map(data, function(item) {
            item._title = item._title || "";
            item._content = item._content || "";
            item._time = item._time || "";
            item._link = item._link || "#";
            item._count_view = item._count_view || "";
            item._count_zan = item._count_zan || "";
            item._count_comment = item._count_comment || "";

            item._class_content = item._style_content || "";
            item._class_time = item._class_time || "hide";
            item._class_zan = item._class_zan || "hide";
            item._class_view = item._class_view || "hide";
            item._class_comment = item._class_comment || "hide";

            return item;
        })
    }
}


//////////////////////老师直播信息 TA的直播/////////////////////////////////

/**
 * 查询老师的直播信息
 */
var getTeacherLiveInfo = function(teacherId, ops) {
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




var TeacerLivingInfo = function() {}
TeacerLivingInfo.prototype = {
    container: null, //*
    teacherId: null, //*
    ItemId: "", //直播发言ID
    page: 1,
    row: 3,
    init: function() {},
    render: function() {
        var _this = this;
        getTeacherLiveInfo(this.teacherId, {
            page: this.page,
            row: this.row,
            id: this.ItemId
        }).done(function(data) {
            log("直播信息", data);
            if (data.status == '1') {
                var periodical = data.data.periodical
                var isArray = Object.prototype.toString.call(periodical) == "[object Array]"

                if (!isArray) {
                    _this.container.html(ynconfig.none({ margin: 30 }))
                    return;
                }
                var rows = handleData(periodical);
                _this.container.html(createHTML(rows));
            } else {
                return layer.msg(error[data.status])
            }


        })

        function handleData(data) {
            return _.map(data, function(item) {
                if (item.contentFilter.length > 100) {
                    item.contentFilter = item.contentFilter.substr(0, 100) + "..."
                }
                return item;
            })
        }

        function createHTML(data) {
            return _.map(data, function(item) {
                return `<div class="living-item">
                    <div class="living-time">${item.pubtimeString}</div>
                    <div class="living-content">${item.contentFilter}</div>
                </div>`
            }).join("")
        }
    }
}

// 文章评论
var getArticleCommon = function(id, ops) {
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
        if (data.status == "1") {
            data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.row)]);
            defer.resolve(data);
        } else {
            layer.msg(error[data.status])
            defer.reject();
            return
        }
    })
    return defer.promise();
}


// 发布观点评论
var postArticleCommon = function(id, content, ops) {
    ops = _.extend({
        type: 0, //0=资讯, 1=观点评论
        parentId: "" //如果是回复评论, 为评论的ID
    }, ops)
    var defer = $.Deferred();
    var send = { article_id: id, content: content, type: ops.type, parent_id: ops.parentId }

    $.post("/articleCommentReply.htm", send, function(data) {
        if (data.status == 1) {
            layer.msg("发表成功")
        } else {
            return layer.msg(error[data.status]) }
        defer.resolve(data);
    }, 'json')
    return defer.promise();
}



// 观点点赞
var like = function(article_id) {
    var defer = $.Deferred();
    $.post("/html/zanArticle.htm", { article_id: article_id }, function(data) {
        // var back = JSON.parse(data)
        if (data == 'complete') {
            layer.msg("您已经赞美过啦...")
            defer.reject()
        } else {
            var back = JSON.parse(data)
            if (back.status == 1) {
                layer.msg("谢谢您的赞美...")
                defer.resolve(back);
            }
        }
    })
    return defer.promise()
}
