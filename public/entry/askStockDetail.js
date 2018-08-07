/*///////////////////////////////////////////////////////////////////*/
var fn = require('~/lib/fn.js');
var askWindow = require('base/askWindow.js'); //提问
var chart = require('m/stock-trend-day.js')
var hot = require('m/askStock/hotStock.js') // 热问股票
var profile = require('base/teacher-profile.js'); //鼠标放到老师头像是显示详细信息
var error = require("e/error-type")

var reduceTime = function(time) {
    return time.replace(/:\d+\.\d+$/, "")
}

//投顾端待回答/已忽略
if (ynIsTeacher && (is_reply == 0 || is_reply == 2)) {
    $('.is_reply').hide()
}
//投顾端已过期
if (ynIsTeacher && is_reply == 3) {
    $('.is_reply .is-reply-btn').hide()
}
$('.is_reply .is-reply-btn').click(function() {  //点击'去直播间看看'跳转值活跃榜第一名的直播间
    queryFirstLiveRoom(data => {
        window.location.href = `/live/${data.teacherid}/`
    })
})

//查询直播活跃榜第一名
function queryFirstLiveRoom(callback) {
    $.getJSON("/html/liveRoomList.htm", {
        type: 2,
    }, function(data) {
        if (data.status == 1) {
            callback(data.data[0]);
        } else {
            return layer.msg(error[data.status])
        }

    })
}


// 是否已经回答过
// var hasAnswered = ynIsTeacher && _.indexOf(_.uniq(_.pluck(__answer, 'answeruserid')), +ynTeacherId) != -1;
var hasAnswered = null

// 是否已经采纳
// var isAdopt = _.indexOf(_.pluck(__answer, 'is_adopt'), 1) != -1;
var isAdopt = null

//提问人uesrId
var __uesrId = null;
var __questionInfo = null //提问内容
var __answerInfo = null
var noteid = location.href.match(/([0-9]+).htm/)[1]


/*  百度分享  */

window._bd_share_config = {
    common: {
        onBeforeClick: function(cmd, config) {
            config.bdText = $('#questionName').text() + '--【约投顾】';
            config.bdDesc = $('#questionName').text() + '--【约投顾】';
            return config
        },
        onAfterClick: function() {
            $('.bdsharebuttonbox').hide();
        }
    },
    share: {
        "bdSize": 24,
        "bdStyle": 1,
        "bdCustomStyle": "/public/v2/base/base.css"
    }
}


/* 增加浏览量 */
$.post("/consultation/addNoteReadCount.htm", { noteid: noteid }, back => {
    back = JSON.parse(back)
    if (back.status != 1) {
        return layer.msg(error[back.status])
    }
})

/*///////////////////////////////////////////////////////////////////*/

/* 右侧提问栏目 */

var bar = function() {
    var container, type = ynIsTeacher ? "answer" : "ask";

    return {
        init: function() {
            container = $(".ask");



            $.getJSON("/consultation/queryNoteDetail.htm", {
                noteid: noteid
            }, function(data) {
                if (data.status == '1') {
                    __questionInfo = data.data.note[0]
                    __answerInfo = data.data.note_answer

                    __uesrId = __questionInfo.questionuserid

                    hasAnswered = ynIsTeacher && _.indexOf(_.uniq(_.pluck(__answerInfo, 'answeruserid')), ynTeacherId) != -1;
                    isAdopt = _.indexOf(_.pluck(__answerInfo, 'is_adopt'), 1) != -1;

                    // 显示回答窗口(没有回答过的老师+没有采纳)
                    if (ynIsTeacher && !hasAnswered && !isAdopt) {
                        replyWindow()
                    }

                    container.find('.questionCount').text(data.data.questionCount);

                    // 分时图
                    if (__questionInfo.stockcode) {
                        var chart_container = $('.chart')
                        chart_container.show()
                        chart.render({
                            name: __questionInfo.stockname,
                            code: __questionInfo.stockcode,
                            container: chart_container
                        })
                    }
                    answers()
                    bar.render()
                } else {
                    return layer.msg(error[data.status])
                }

            })
            container.on('click', '.column1', function() {
                console.log("type", type)
                if (!ynIsLogin) return yn.login.render();
                if (type === "done") return layer.msg("回答过的不能再回答了");
                if (type === "answer") {
                    $('body').velocity('scroll', { duration: 750, offset: 10000 })
                    return
                }

                if (type == "ask") {
                    askWindow.render({
                        filter: _.uniq(_.map(__answerInfo, item => item.answeruserid))
                    });
                }
            })

        },
        render: function() {
            var titleValues = {
                    "ask": "我要提问",
                    "answer": "我要解答",
                    "done": "已经回答",
                    'accept': "已经结束"
                }
                //已经回答过的老师显示已经回答
            if (hasAnswered) {
                type = "done";
            }

            //已经采纳的问题显示已经结束
            if (ynTeacherId && isAdopt) {
                type = "accept";
            }

            // 显示标题
            container.find('.ask-title').text(titleValues[type]);
        }
    }
}()


/* 问题相关 */
var question = (function() {

    var container = $('#detailQuestion')
    var share = $('.bdsharebuttonbox')
    var showShare = false

    // 处理时间
    var time = container.find('.time')
    time.show().text(reduceTime(time.text()));

    // 处理来源
    var source = container.find('.from')
    var value = source.find('.value');
    source.show()
    if (!value.text()) {
        value.text('约投顾')
    }
    if (ynIsTeacher) {
        let questionuserid = container.find('.puber').data('id')
        $.getJSON("/consultation/referUser.htm", { questionuserid: questionuserid }, function(data) {
            if (data.status == 1) {
                container.find('.puber').prepend('<i class="refer-icon"></i>')
            } else if (data.status == '-1') return
        })
    }
    //判断是否is_inside
    container.find('.puber').each(function() {
        var inside = $(this).data('inside')
        var isInside = inside == 1 && yn.isInside;
        console.log("isInside", isInside)
        var tag = isInside ? `<strong class="start" style="color:red;font-size:18px">*</strong>` : ''
        $(this).append(tag)
    })

    //分享
    container.on('click', '.shareIcon', function() {
        yn.positionShare($(this));
    }).on('mouseleave', function() {
        setTimeout(function() {
            if (!showShare) {
                share.hide();
            }
        }, 300)
    })

    share.on('mouseenter', function() {
        showShare = true;
    }).on('mouseleave', function() {
        showShare = false;
        share.hide();
    })
})()


/*  回答设置 */
var answers = (function() {
    var container = $('.answer')
    var items = container.find('.items')
        // 遍历
    container.find('.item').each(function() {
        var item = $(this);
        var data = __answerInfo[item.index()];

        var time = $(this).find('.time span')
        time.show().text(reduceTime(time.text()))

        // 是否显示正在直播
        if (+data.status == 0) {
            item.find('.living').show();
        }

        // 显示采纳图标
        if (+data.is_adopt == 1) {
            items.addClass("hasAccept")
            item.find('.accept-icon').show();
        }

        // 显示采纳操作 : 当前用户为提问用户时
        if (!ynIsTeacher && __uesrId == +ynUserId) {
            item.find('.action-use').show();
        }

        // 显示看涨看跌
        // if (item.stock_trend === "") {
        //     item.stock_trend = 2;
        // }
        // item.uplight = ["light", "hide", "hide"][+item.stock_trend];
        // item.downLight = ["hide", "light", "hide"][+item.stock_trend];
    })


    // 点击有帮助
    container.on('click', '.action-help', function() {
        if (!ynIsLogin) return yn.login.render();
        var el = $(this);
        var index = el.parents('.item').index();
        var data = __answerInfo[index];

        $.post("/consultation/answerZan.htm", { id: data.id }, function(back) {
            back = JSON.parse(back)
            if (back.status == "1") {
                var count = el.find('.txt');
                count.text(+count.text() + 1);
                layer.msg("多谢您的点赞")
            } else {
                return layer.msg(error[back.status])
            }
        })
    })


    //采纳
    container.on('click', '.action-use', function() {
        var el = $(this);
        el.hide()
        var index = el.parents('.item').index();
        var data = __answerInfo[index];

        $.post("/consultation/answerAdopt.htm", { id: data.id }, function(back) {
            if (back.status == "1") {
                window.location.reload()
            } else() => {
                return layer.msg(error[back.status])
            }
        })
    })

    //放大图片
    container.on('click', '.line2 img', function() {
        yn.zoomImage($(this));
    });

})



// 回答问题(只有老师端显示)
var replyWindow = function() {
    var container = $('#answerWindow')
    var inputStock = $('#showStockList')
    var category = container.find('.category');



    var isFirstAnswer = __answerInfo.length < 1; //是否第一次回答

    // 是否显示分类 : 仅第一次回答显示分类判断
    if (isFirstAnswer) {
        category.show();
    }
    //投顾端已过期
    if (ynIsTeacher && is_reply == 3) {
        container.hide();
    } else {
        container.show()
    }


    category.on('click', '.askStock-category-item', function() {
        $(this).addClass('select').siblings().removeClass('select');
    })

    // 编辑器初始化
    var ue = UE.getEditor('answerWindow-edit', {
        toolbars: [
            ['forecolor']
        ],
        initialFrameHeight: 200,
        elementPathEnabled: false,
        wordCount: false,
        enableContextMenu: false,
        enableAutoSave: false,
        pasteplain: true
    })

    // 股票查询
    yn.showStockList(inputStock, {
        top: 0,
        onSelect: item => {
            inputStock.val("");
            ue.focus(true)
            ue.execCommand('insertHtml', '<span syle="color:red;font-weight:bold" class="stockWrap">' + item.stockWrap + '</span>')
        }
    })


    // 提交
    container.on('click', '.submit', _.debounce(() => submit(), 2000, { leading: true, trailing: false }))
    var submit = function() {


        var cateId = category.find('.item.select').data("id") || '-1'
        var content = _.trim(ue.getContent());

        //验证
        if (!content) {
            return layer.msg("请输入内容")
        }

        if (isFirstAnswer && cateId == '-1') {
            return layer.msg("请选择分类")
        }

        container.hide()

        var send = {
            userid: ynUserId,
            answeruserid: ynTeacherId,
            answercontent: content,
            answerusername: ynTeacherName,
            stock_trend: "", //0=看涨, 1=看跌,
            note_type: cateId,
            noteid: noteid,
            is_reply: 1,
            note_billno: __questionInfo.note_billno //流水号
        }



        $.post("/consultation/answerNote.htm", send, back => {
            back = JSON.parse(back)
            if (back.status == "1") {
                layer.msg("发布成功")
                setTimeout(function() {
                    window.location.reload()
                }, 1000)
            } else() => {
                return layer.msg(error[back.status])
            }
        })
    }
}


//call
$(function() {

    askWindow.init();
    hot.init({ wrap: $(".hot-ask-container") })
    hot.render()

    //右上角Bar
    bar.init();
    // bar.render();


    profile.init();
    profile.add('.imgw')
    onSelect('问股')
});
