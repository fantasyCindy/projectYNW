$(function() {

    //js
    if (!ynIsLogin) {
        yn.login.render();
        return;
    }

    //菜单
    yn.centerMenu.init();
    yn.centerMenu.render({ type: "my" });


    //回答窗口
    var answerWindow = ynmodule.answerWindow();
    answerWindow.init({
        isPop: true
    });

    //页码
    var bootpag = yn.bootpag($("#myAnswer"));
    bootpag.on('page', function(err, num) {
        mention.page = num;
        mention.render[mention.contentType]();
    })

    var mention = {
        container: $("#myAnswer"),
        statistics: null,
        items: null,
        page: 1,
        row: 10,
        totalCount: null,
        contentType: "mention", //当前显示类型
        loading:null,
        init: function() {
            this.statistics = this.container.find('.statistics');
            this.items = this.container.find('.items');
            this.totalCount = this.container.find('.totalCount');
            
            mention.loading = new ynmodule.loading();
            mention.loading.margin = 200;
            mention.loading.container = this.items;

            this.render.statistics();
            this.render.mention();
            this.event();
        },
        render: {
            statistics: function() {
                //统计信息
                yndata.getStatistics().done(function(data) {
                    data = data.rows
                    mention.statistics.html(template('statistics-template', data))
                })
            },
            mention: function() {
                mention.loading.render()
                //@我的
                yndata.question_mention({ page: mention.page, row: mention.row }).done(function(data) {
                    console.log("@", data)
                    data.rows = mention.handleData(data.rows)
                    mention.items.html(template('list-item-template', data.rows))
                    bootpag.bootpag({ page: mention.page, total: data.pageNubmer });
                    mention.totalCount.text("共有" + data.total + "条提问提到我");
                })
            },
            all: function() {
                mention.loading.render()
                //全部问股
                yndata.question_all({ page: mention.page, row: mention.row }).done(function(data) {
                    console.log("待解答", data)
                    data.rows = mention.handleData(data.rows)
                    mention.items.html(template('list-item-template', data.rows))
                    bootpag.bootpag({ page: mention.page, total: data.pageNubmer });
                    mention.totalCount.text("共有" + data.total + "条提问");
                })
            },
            done: function() {
                mention.loading.render()
                //已回答问股
                yndata.question_done({ page: mention.page, row: mention.row }).done(function(data) {
                    console.log("已回答", data)
                    data.rows = mention.handleData(data.rows)
                    mention.items.html(template('list-chat-template', data.rows))
                    bootpag.bootpag({ page: mention.page, total: data.pageNubmer });
                    mention.totalCount.text("共有" + data.total + "条回答");
                })
            }
        },

        handleData: function(data) {
            return _.map(data, function(item) {
                item.time = item.questiontime;
                item.questiontime = yn.timeFormat(item.questiontime);
                item.answercontent = yn.filterHTML(item.answercontent);
                item.type_source_txt = ["@我的", "邀请我的"][+item.type_source];
                item.zancount = item.zancount || "0";
                item.adoptStyle = item.is_adopt == "1" ? "" : "hide";
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

            //分类切换
            this.container.on('click', '.category td', function() {
                if ($(this).attr('class').indexOf('select') != -1) return;
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');
                var type = $(this).data('type');
                _this.contentType = type
                _this.page = 1;
                _this.render[type]();
            })

            // 详情
            this.container.on('click', 'span.trigger-detail', function() {
                var noteid = $(this).data('noteid');
                open("/consultation/askStockDetail.htm?id=" + noteid)
            })
        }
    }

    ///////////////////////////////////////////////////////////////////

    mention.init()

})



function send(from, to, msg) {
    console.log(from + to + msg)
}


var currySend = _.curry(send);
var send2 = currySend("liqiang", "liyong");
send2("Hello world")
