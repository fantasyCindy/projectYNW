var askWindow = require('base/askWindow.js'); //提问
require('~/center/center.js');
var error = require('e/error-type')

$(function() {

    askWindow.init();
    yn.centerMenu.init({ render: 'my', light: '我的问答' });

    var bootpag = yn.bootpag($("#myquertion"));
    bootpag.on('page', function(e, num) {
        Question.page = num;
        Question.render();
    })

    askWindow.onClick = function(data) {
        var val1 = $('.menu-item.select').text();
        console.log('val', val1)
        if (val1 == '待回答') {
            $('.menu-item.select').click();
        }
    }

    function timeFormat() {
        return new Date().getTime();
    }

    //问股
    var Question = {
        container: $('#myquertion'),
        topWrap: null,
        bootpag: null,
        type: "done",
        items: null,
        page: 1,
        row: 10,
        loading: null,
        init: function() {
            this.items = this.container.find('.items');
            this.topWrap = this.container.find('.menu');
            this.sum = this.container.find('.sum');
            this.event();

            this.loading = new yn.loading();
            this.loading.margin = 200;
            this.loading.container = this.items;

            this.render();

            //剩余次数
            getAskTimes().done(function(data) {
                if (data <= 0) {
                    $('.ques-num').html(`您的免费提问已用尽，可进入直播间进行互动`)
                } else {
                    $('.ques-num').html(`您还剩余 <span id="lastAskTimes">${data}</span> 次提问机会`)
                }
            })

        },
        event: function() {
            var _this = this;
            this.topWrap.on('click', '.menu-item', function() {
                if ($(this).attr('class').indexOf('select') != -1) return;
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');
                var type = $(this).data('type');
                _this.type = type;
                _this.page = 1
                console.log("_.th", _this.page)
                _this.render({ page: 1 });
            })

            //提问
            $('.trigger-askWin').on('click', function() {
                askWindow.render()
            })
        },
        render: function(op) {
            var _this = this;
            var ops = {
                page: this.page,
                row: this.row
            }
            ops = _.extend(ops, op)

            this.loading.render();

            //已过期
            if (this.type == "overdue") {
                ops.isReply = 3;
                noAnswer(ops).done(function(data) {
                    console.log("已过期", data)
                    data.data.list = _this.handle(data.data.list);

                    //所有邀请的老师
                    data.data.list = _.map(data.data.list, function(item) {
                        if (item.teachertitle instanceof Array) {
                            item.answerer = _.compact(item.teachertitle.split(","));
                            var len = item.answerer.length;
                            var count = "";
                            if (len > 6) {
                                count = `等${len}位老师`
                            }

                            if (len > 0) {
                                item.answerer = "邀请【" + _.take(item.answerer, 6).join("-") + "】" + count + "回答"
                            }
                        } else {
                            item.answerer = item.teachertitle
                        }
                        return item;
                    })
                    _this.items.html(template('myquertion-noask-template', data.data.list));
                    _this.sum.html("共" + data.data.total + "条提问已过期")
                    bootpag.bootpag({ page: _this.page, total: data.pageNumber })
                    console.log("_this", _this.page)
                })
            };

            //待回答
            if (this.type == "unanswer") {
                ops.isReply = 0;
                noAnswer(ops).done(function(data) {
                    console.log("待回答", data)
                    data.data.list = _this.handle(data.data.list);

                    //所有邀请的老师
                    data.data.list = _.map(data.data.list, function(item) {
                        if (item.teachertitle instanceof Array) {
                            item.answerer = _.compact(item.teachertitle.split(","));
                            var len = item.answerer.length;
                            var count = "";
                            if (len > 6) {
                                count = `等${len}位老师`
                            }

                            if (len > 0) {
                                item.answerer = "邀请【" + _.take(item.answerer, 6).join("-") + "】" + count + "回答"
                            }
                        } else {
                            item.answerer = item.teachertitle
                        }
                        return item;
                    })
                    _this.items.html(template('myquertion-noask-template', data.data.list));
                    _this.sum.html("共" + data.data.total + "条提问待回答")
                    bootpag.bootpag({ page: _this.page, total: data.pageNumber })
                    console.log("_this", _this.page)
                })
            };

            //已回答
            if (this.type == "done") {
                yesAnswer(ops).done(function(data) {
                    console.log("已回答", data)
                    data.data.list = _this.handle(data.data.list);
                    _this.items.html(template('myquertion-yesask-template', data.data.list));
                    _this.sum.html("共" + data.data.total + "条提问已回答")
                    bootpag.bootpag({ page: _this.page, total: data.pageNumber })
                })
            };

            //已采纳
            if (this.type == "evaluate") {
                evalAnswer(ops).done(function(data) {
                    console.log("已采纳", data)
                    data.data.list = _this.handle(data.data.list).reverse();
                    _this.items.html(template('myquertion-accept-template', data.data.list));
                    _this.sum.html("共" + data.data.total + "条提问已采纳")
                    bootpag.bootpag({ page: _this.page, total: data.pageNumber })
                    console.log("_this采纳", _this.page)
                })
            };

        },
        handle: function(data) {
            var _this = this;
            return _.map(data, function(item) {
                if (item.questiontime) {
                    item.questiontime = item.questiontime.substr(0, 16)
                }
                if (item.answertime) {
                    item.answertime = item.answertime.substr(0, 16)
                }
                 if (item.questioncontent && item.questioncontent.length > 50) {
                    item._questioncontent = item.questioncontent.substr(0, 50) + '..'
                } else {
                    item._questioncontent = item.questioncontent
                }

                item.price = item.questionPrice ? item.questionPrice : 0
                // item.questiontime = timeFormat(item.questiontime);
                // item.answertime = timeFormat(item.answertime);
                return item;
            });
        }
    }

    Question.init();
})


/**/

var getAskTimes = function() {
    var defer = $.Deferred();
    $.getJSON("/consultation/queryTodayQuestionCount.htm", {
        questionuserid: ynUserId,
        t: yn.timestamp()
    }, function(data) {
        if (data.status == 1) {
            defer.resolve(ynconfig.totalAskTime - data.data);
        } else() => {
            return layer.msg(error[data.status])
        }

    })
    return defer.promise()
}

//用户提问  未回答
var noAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
        isReply:0

    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        isReply:ops.isReply
    }

    var defer = $.Deferred();
    $.getJSON("/center/queryNoAnswer.htm", send, function(data) {
        if (data.status == 1) {
            data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.row)])
            defer.resolve(data);
        } else() => {
            return layer.msg(error[data.status])
        }

    })
    return defer.promise();
}

//用户提问  已回答
var yesAnswer = function(ops) {
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
        if (data.status == 1) {
            data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.row)])
            defer.resolve(data);
        } else() => {
            return layer.msg(error[data.status])
        }
    })
    return defer.promise();
}

//用户提问  待评价
var evalAnswer = function(ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/center/queryEvalAnswer.htm", send, function(data) {
        if (data.status == 1) {
            data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.row)])
            defer.resolve(data);
        } else() => {
            return layer.msg(error[data.status])
        }
    })
    return defer.promise();
}
