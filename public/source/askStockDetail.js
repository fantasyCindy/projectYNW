window._bd_share_config = {
    common: {
        onBeforeClick: function(cmd, config) {
            config.bdText = $('#questionName').text() + '--【约投顾】';
            config.bdDesc = $('#questionName').text() + '--【约投顾】';
            return config
        },
        onAfterClick: function(cmd) {
            $('.bdsharebuttonbox').hide();
        }
    },
    share: {
        "bdSize": 24,
        "bdStyle": 1,
        "bdCustomStyle": "/public/css/all.css"
    }
}


/**
 * 分时图
 * o.init()
 * o.render(stockName, stockCode)
 */
var chart = {
    container: null,
    items: null,
    name: null,
    code: null,
    img: null,
    link: null,
    init: function() {
        this.container = $("#klineChart")
        this.items = this.container.find('.content')
        this.event();
    },
    render: function(name, code) {
        //没有股票代码则不显示
        if (!name || !code) {
            return;
        }
        this.container.show();
        this.code = code;
        this.name = name
        var fileName = yn.stockPrefix(code);
        var data = {
            src: "http://image.sinajs.cn/newchart/min/n/" + fileName + ".gif",
            code: code,
            name: name,
            href: "/marketLine.htm?stockcode=" + code
        }
        this.items.html(template('chart-template', data))
    },
    event: function() {
        var self = this;
        //添加自选
        this.container.on('click', '.addCustom', function() {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            var send = {
                stockcode: self.code,
                stockname: self.name
            }
            yndata.addMyCustomStock(send);
        })
    }
}

//右侧提问栏目
var bar = {
    container: null,
    type: "ask",
    init: function() {
        this.container = $(".ask");

        if (+ynIsTeacher == 1) {
            this.type = "answer"
        }
        this.event();
    },
    render: function(data) {
        var self = this;

        var titleValues = {
            "ask": "我要提问",
            "answer": "我要解答",
            "done": "已经回答",
            'accept': "已经结束"
        }

        var $count = this.container.find('.questionCount');
        $count.text(data.rows.questionCount);

        //已经回答过的老师显示已经回答
        var answers = _.pluck(data.rows.note_answer, 'answeruserid');
        if (ynTeacherId && _.indexOf(answers, ynTeacherId + "") != -1) {
            self.type = "done";
        }

        //已经采纳的问题显示已经结束
        var adopt = _.pluck(data.rows.note_answer, 'is_adopt');
        adopt = _.reduce(adopt, function(pre, cur) {
            return (pre - 0) + (cur - 0)
        }, 0)
        if (ynTeacherId && adopt > 0) {
            self.type = "accept";
        }

        var $title = this.container.find('.ask-title');
        $title.text(titleValues[this.type]);
    },
    event: function() {
        var self = this;

        //点击
        this.container.on('click', '.column1', function() {
            var title = $(this).find('.ask-title');
            
            if (self.type === "done") {
                layer.msg("回答过的不能再回答了");
                return
            }
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            if (self.type === "answer" && +ynIsTeacher == 1) {
                $('body').velocity('scroll', { duration: 750, offset: 10000 });
                return;
            }

            self.delegate.click(self.type);
        })
    },
    delegate: {
        click: function() {}
    }
}


var noteid = location.href.match(/id=([0-9]+)/)[1];

//增加浏览量
$.post("/consultation/addNoteReadCount.htm", { noteid: noteid })


/**
 * 问题
 * o.init()
 * o.render()
 * o.delegate.done : Function
 */
var question = function() {
    var container, share, showShare = false
    return {
        stockCode: null,
        stockName: null,
        userId: null,
        data: null,
        init: function() {
            var self = this;
            container = $("#detailQuestion");
            share = $('.bdsharebuttonbox');

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

            //邀请回答
            container.on('click', '#inviteBtn', function() {
                var ops = {
                    onlyInvite: true,
                    qUserId: $(this).data('userid'),
                    qId: $(this).data('billno'),
                    filter: _.uniq(_.map(self.answerData, function(item) {
                        return item.answeruserid;
                    }))
                };
                self.delegate.invite(ops);
            });

        },
        render: function() {
            var self = this;
            yndata.queryNoteDetail(noteid).done(function(data) {
                self.data = data;
                console.log("问题和回答", data)
                console.log("问题", data.rows.note[0])
                qData = self.handleQuestion(data.rows.note[0]);
                qData._ancount = data.rows.note_answer_count;
                container.html(template('question-template', qData));
                self.delegate.done(data);
            })
        },
        handleQuestion: function(data) {
            this.userId = data.questionuserid;
            this.stockCode = data.stockcode;
            this.stockName = data.stockname;

            data._questioncontent = yn.codeFormat(data.questioncontent)
            data.questiontime = yn.timeFormat(data.questiontime);
            data.questionCount = data.questionCount || 0
            data.note_source = ["约牛WEB端", "约牛iOS客户端", "约牛安卓客户端"][+data.note_source];
            return data;
        },
        delegate: {
            done: function(data) {},
            invite: function(ops) {}
        }
    }
}()



/**
 * 回答
 * o.qUserId : Number
 * o.init();
 * o.render(data)
 */
var answer = function() {
    var container, items;
    return {
        qUserId: null,
        hasAccept: false,
        answerData: null,
        init: function() {
            var self = this;
            container = $("#askStockDetail");
            items = container.find('.answer .items');

            //帮助
            container.on('click', '.action.help', function() {
                var element = $(this);
                var index = element.parents('.item').index();
                var data = self.answerData[index];
                $.post("/consultation/answerZan.htm", {
                    id: data.id
                }, function(data) {
                    if (data == "success") {
                        var count = element.find('.txt');
                        count.text(+count.text() + 1);
                    }
                    if (data == "complete") {
                        layer.msg("您已经点过啦!");
                    }
                    if (+data === 0) {
                        layers.msg("参数为空")
                    }
                })
            })


            //采纳
            container.on('click', '.action.use', function() {
                var element = $(this);
                element.hide()
                var index = element.parents('.item').index();
                var data = self.answerData[index];
                $.post("/consultation/answerAdopt.htm", {
                    id: data.id
                }, function(_data) {
                    if (_data == "success") {
                        window.location.reload()
                    }
                    if (+_data === 0) {
                        layers.msg("参数为空")
                    }
                })
            })

            //放大图片
            container.on('click', '.line2 img', function() {
                yn.zoomImage($(this));
            });
        },
        render: function(data) {
            this.answerData = this.handleData(data);
            console.log("回答", this.answerData)
            items.html(template('answer-template', this.answerData));
        },
        handleData: function(data) {
            var self = this;
            return _.map(data, function(item) {
                item.answertime = yn.timeFormat(item.answertime);
                item.zancount = item.zancount || "0";

                //是否显示在线
                item._liveStyle = item.status == "0" ? "" : "hide";

                //采纳操作仅当用户为自己时才显示
                item.style = self.qUserId == ynUserId ? "" : "hide";

                //是否显示采纳标志
                item.acceptStyle = item.is_adopt == "1" ? "" : "hide";

                //已经有采纳
                if (item.is_adopt == "1") {
                    items.addClass("hasAccept");
                    self.hasAccept = true;
                }

                //看涨看跌
                if (item.stock_trend === "") {
                    item.stock_trend = 2;
                }
                item.uplight = ["light", "hide", "hide"][+item.stock_trend];
                item.downLight = ["hide", "light", "hide"][+item.stock_trend];

                return item;
            })
        }
    }
}()


//call
$(function() {

    //回答窗口
    var answerWindow = ynmodule.answerWindow();
    answerWindow.init();

    //提问窗口
    var askWindow = ynmodule.askWindow();
    askWindow.init();

    //问题
    question.init();
    question.render();
    question.delegate.done = function(data) {

        var stockName = question.stockName;
        var stockCode = question.stockCode;
        var userId = question.userId;

        //右上角Bar
        bar.init();
        bar.render(data);
        bar.delegate.click = function(type) {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            if (type == "ask") {
                askWindow.render({
                    filter: _.uniq(_.map(data.rows.note_answer, function(item) {
                        return item.answeruserid;
                    }))
                });
            }
        }

        //回答
        answer.init();
        answer.qUserId = userId;
        answer.render(data.rows.note_answer);

        //////分时图

        chart.init();
        chart.render(stockName, stockCode);

        //相关问答
        var relative = new ynmodule.ReativeAsk();
        relative.init(stockName, stockCode);
        relative.render();


        if (+ynIsTeacher == 1 && !answer.hasAccept) {
            var ops = {
                stockCode: stockCode,
                stockName: stockName,
                replys: _.pluck(data.rows.note_answer, 'answeruserid'),
                number: data.rows.note[0].note_billno,
                answerCount: data.rows.note_answer_count
            };
            answerWindow.render(noteid, ops);
        }

    };

    question.delegate.invite = function(ops) {
        askWindow.render(ops);
    }
});
