require('~/center/center.js')
var answerWindow = require('m/askStock/answerWindow.js')
var error = require('e/error-type')

//是否回复：0:否 1:是 2:以忽略 3:已过期


$(function() {

    if (!ynIsLogin) return yn.login.render();
    yn.centerMenu.init({
        render: 'my',
        light: '我的问答'
    });


    //回答窗口
    // var answerWindow = ynmodule.answerWindow();
    answerWindow.init({
        isPop: true
    });

    //页码
    var bootpag = yn.bootpag($("#myAnswer"));
    bootpag.on('page', function(err, num) {
        mention.page = num;
        mention.render.getNoteData({ currentPage: num, noteType: mention.contentType });
    })

    var mention = {
        container: $("#myAnswer"),
        statistics: null,
        items: null,
        page: 1,
        row: 10,
        totalCount: null,
        contentType: 0, //当前显示类型
        loading: null,
        price: null,
        setPriceWin: null,
        typeText: null,
        template: null,
        init: function() {
            this.statistics = this.container.find('.statistics');
            this.items = this.container.find('.items');
            this.totalCount = this.container.find('.totalCount');
            this.price = this.container.find('.askPrice');
            this.setPriceWin = $('#setPrice');
            this.typeText = {
                0: "待回答",
                1: "已回答",
                2: "已忽略",
                3: "已过期"
            };
            this.template = {
                0: 'list-item-template',
                1: 'list-chat-template',
                2: 'list-item-template',
                3: 'list-item-template'
            }
            mention.loading = new ynmodule.loading();
            mention.loading.margin = 200;
            mention.loading.container = this.items;

            this.render.statistics();
            this.render.getPrice();
            this.render.getNoteData({ noteType: mention.contentType });
            this.event();
        },
        render: {
            statistics: function() {
                //统计信息
                getStatistics().done(function(data) {
                    data = data.data
                    mention.statistics.html(template('statistics-template', data))
                })
            },
            mention: function() {
                mention.loading.render()
                    //@我的
                question_mention({ page: mention.page, row: mention.row }).done(function(data) {
                    data.data.list = mention.handleData(data.data.list)
                    mention.items.html(template('list-item-template', data.data.list))
                    bootpag.bootpag({ page: mention.page, total: data.pageNubmer });
                    mention.totalCount.text("共有" + data.data.total + "条提问" + this.typeText[ops.noteType]);
                })
            },
            getNoteData: function(ops) {
                mention.loading.render()
                getTeacherNote(ops).done(data => {
                    mention.items.html(template(mention.template[mention.contentType], mention.handleData(data.data.list)))
                    bootpag.bootpag({ page: ops.currentPage, total: data.pageNubmer });
                    mention.totalCount.text("共有" + data.data.total + "条提问" + mention.typeText[mention.contentType]);
                })
            },
            getPrice: function() {
                getPrice().done(function(data) {
                    var price = data.data;
                    mention.price.html('￥' + price);
                })
            }
        },

        handleData: function(data) {
            return _.map(data, function(item) {
                item.questiontime = item.questiontime ? yn.timeFormat(item.questiontime) : "";
                item.answercontent = item.answercontent ? yn.filterHTML(item.answercontent) : "";
                item.zancount = item.zancount || "0";
                item.price = item.questionPrice ? item.questionPrice : 0
                item.overdue = item.is_reply == 3 ? "hide" : "";
                item.ignore = item.is_reply == 2 ? "hide" : "";
                if (item.answercontent && item.answercontent.length > 50) {
                    item._answercontent = item.answercontent.substr(0, 50) + '..'
                } else {
                    item._answercontent = item.answercontent
                }
                if (item.questioncontent && item.questioncontent.length > 50) {
                    item._questioncontent = item.questioncontent.substr(0, 50) + '..'
                } else {
                    item._questioncontent = item.questioncontent
                }
                return item;
            })
        },

        event: function() {

            var _this = this;

            //回答
            this.container.on('click', '.askButton', function() {
                var question = $(this).parents('.list-item').find('.questioncontent').text();
                var noteid = $(this).data('noteid');
                var code = $(this).data('code')
                var name = $(this).data('name')
                answerWindow.render(noteid, {
                    stockName: name,
                    stockCode: code,
                    number: $(this).data('number'),
                    question: question
                });
            })

            //忽略
            this.container.on('click', '.ignoreButton', function() {
                    var self = this
                    layer.confirm('确定忽略该提问吗', function() {
                        var noteid = $(self).data('noteid');
                        $.post("/consultation/updateNoteIsReply.htm", { noteid: noteid }, back => {
                            back = JSON.parse(back);
                            if (back.status == 1) {
                                layer.msg('已忽略')
                                setTimeout(function() {
                                    mention.render.getNoteData({ currentPage: mention.page, noteType: mention.contentType });
                                }, 1000);
                            }
                        })
                    })
                })
                //分类切换
            this.container.on('click', '.category td', function() {
                if ($(this).attr('class').indexOf('select') != -1) return;
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');
                mention.contentType = $(this).data('type');
                mention.render.getNoteData({ currentPage: 1, noteType: mention.contentType });
            })

            // 详情
            this.container.on('click', 'span.trigger-detail', function() {
                var noteid = $(this).data('noteid');
                open(ask_path + "consultation/" + noteid + '.htm')
            })

            //设置价格
            this.container.on('click', '.setting-price', function() {
                    _this.setPriceWin.show()
                })
                // //关闭设置价格弹窗
            _this.setPriceWin.on('click', '.closeWin', function() {
                    closePriceWin(_this.setPriceWin)
                })
                // //确认修改
            _this.setPriceWin.on('click', '.submit', function() {
                var val = _this.setPriceWin.find('.setPrice-num').val().trim()
                if (!val) return layer.msg('请输入价格');
                if (!(/^[0-9]+[0-9]*]*$/.test(val) && +val <= 200)) return layer.msg('请设置价格，范围0~200的整数');
                $.post('/teacher/updateQuestionsPrice.htm', { questionsPrice: val }, back => {
                    back = JSON.parse(back)
                    if (back.status == 1) {
                        layer.msg('设置成功');
                        closePriceWin(_this.setPriceWin);
                        mention.render.getPrice();
                    }else if(back.status == 50004){
                        return layer.msg('本月修改次数已达上限')
                    }
                })
            })
        }
    }

    //reset set price window
    function closePriceWin(obj) {
        obj.hide()
        obj.find('.setPrice-num').val('');
    }

    ///////////////////////////////////////////////////////////////////
    //获取老师提问价格
    function getPrice() {
        var defer = $.Deferred();
        $.getJSON('/teacher/getQuestionsPrice.htm', back => {
            if (back.status == 1) {
                defer.resolve(back)
            } else() => {
                return layer.msg(error[back.status])
            }
        })
        return defer.promise();
    }
    mention.init()

})

//查询老师的回答问题信息
function getStatistics(ops) {
    ops = _.extend({
        teacherId: ynTeacherId
    }, ops)

    var defer = $.Deferred();
    $.getJSON("/center/queryTeacherAskStock.htm", {
        answeruserid: ops.teacherId,
        t: yn.timestamp()
    }, function(data) {
        if (data.status == 1) {
            defer.resolve(data)
        } else() => {
            return layer.msg(error[data.status])
        }
    })
    return defer.promise();
}


//根据type获取相关类型问答
function getTeacherNote(ops) {
    ops = _.extend({
        pageSize: 10,
        currentPage: 1
    }, ops)
    var defer = $.Deferred();
    $.getJSON('/consultation/teacherNoteType.htm', ops, back => {
        if (back.status == 1) {
            back.pageNubmer = _.max([1, Math.ceil(+back.data.total / ops.pageSize)]);
            defer.resolve(back)
        } else {
            return layer.msg(error[back.status])
        }
    })
    return defer.promise();
}
