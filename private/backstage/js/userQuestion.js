$(function() {

    yn.centerMenu.init();
    yn.centerMenu.render({
        type: "my"
    });


    var bootpag = yn.bootpag($("#myquertion"));
    bootpag.on('page', function(e, num) {
        Question.page = num;
        Question.render();
    })

   
    //问股
    var Question = {
        container: $('#myquertion'),
        topWrap: null,
        bootpag: null,
        type: "done",
        items: null,
        page: 1,
        row: 10,
        loading:null,
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
            yndata.getAskTimes().done(function(data) {
                $('#lastAskTimes').text(data);
            })

        },
        event: function() {
            var _this = this;
            this.topWrap.on('click', '.menu-item', function() {
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');
                var type = $(this).data('type');
                _this.type = type;
                _this.render();
            })

            //提问
            $('.trigger-askWin').on('click', function() {
                askWindow.render()
            })
        },
        render: function() {
            var _this = this;
            var ops = {
                page: this.page,
                row: this.row,
            }

            this.loading.render();

            //待回答
            if (this.type == "unanswer") {
                yndata.noAnswer(ops).done(function(data) {
                    console.log("待回答", data)
                    data.rows = _this.handle(data.rows);

                    //所有邀请的老师
                    data.rows = _.map(data.rows, function(item) {
                        item.answerer = _.compact(item.teachertitle.split(","));
                        var len = item.answerer.length;
                        var count = "";

                        if (len > 6) {
                            count = "等" + len + "位老师"
                        }

                        if (len > 0) {
                            item.answerer = "邀请【" + _.take(item.answerer, 6).join("-") + "】" + count + "回答"
                        }
                        return item;
                    })
                    _this.items.html(template('myquertion-noask-template', data.rows));
                    _this.sum.html("共" + data.total + "条提问")
                    bootpag.bootpag({ page: _this.page, total: data.pageNumber })
                })
            };

            //已回答
            if (this.type == "done") {
                yndata.yesAnswer(ops).done(function(data) {
                    console.log("已回答", data)
                    data.rows = _this.handle(data.rows);
                    _this.items.html(template('myquertion-yesask-template', data.rows));
                    _this.sum.html("共" + data.total + "条已回答")
                    bootpag.bootpag({ currentPage: _this.page, total: data.pageNumber })
                })
            };

            //已采纳
            if (this.type == "evaluate") {
                yndata.evalAnswer(ops).done(function(data) {
                    console.log("已采纳", data)
                    data.rows = _this.handle(data.rows).reverse();
                    _this.items.html(template('myquertion-accept-template', data.rows));
                    _this.sum.html("共采纳" + data.total + "条回答")
                    bootpag.bootpag({ currentPage: _this.page, total: data.pageNumber })
                })
            };

        },
        handle: function(data) {
            var _this = this;
            return _.map(data, function(item) {
                item.questiontime = yn.timeFormat(item.questiontime);
                item.answertime = yn.timeFormat(item.answertime);
                return item;
            });
        }
    }

    Question.init();
})
