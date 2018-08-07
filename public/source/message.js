$(function() {

    if (!ynIsLogin) {
        yn.login.render();
        yn.login.onClose = function() {
            window.location.href = "/index.htm"
        }
        return;
    }

    $.getJSON('/app/queryNoRead.htm', { source: 0 }, function(back) {
        var sys = _.filter(back.data, function(item) {
            return /[2358]/.test(item.messageType)
        })
        console.log('sys', sys)
        if (sys[0].unReadCount) {
            $('.uncount.unsys').html(sys[0].unReadCount)
        }
        if (sys[1].unReadCount) {
            $('.uncount.unask').html(sys[1].unReadCount)
        }
        if (sys[2].unReadCount) {
            $('.uncount.unlive').html(sys[2].unReadCount)
        }
        if (sys[3].unReadCount) {
            $('.uncount.unrefer').html(sys[3].unReadCount)
        }
    })

    //左侧选项卡
    var menu = (function() {
        var container = $(".body-menu");
        var item = container.find('.menu-item');
        var reference = null;

        item.click(function() {
            yn.switch($(this));
            var type = $(this).data('type');
            $(this).addClass('select').siblings().removeClass('select')
            $(this).find('.uncount').html('')
            menu.current = reference[type];
            menu.current.page = 1;
            menu.current.render();
        })

        return {
            current: null,
            init: function() {
                reference = {
                    system,
                    refer,
                    askStock,
                    live
                }
                this.current = system;
            }
        }
    }());


    //页码
    var body = $('body');
    var container = $("#messeage");
    var items = $('.body-items');
    var bootpag = yn.bootpag($('.body-content'));
    bootpag.on('page', function(err, num) {
        menu.current.page = num;
        menu.current.render();
        body.velocity('scroll', { offset: 0 })
    })

    //加载动画
    var loading = new yn.loading();
    loading.container = items;
    loading.margin = 200;



    //获取数据
    //1:自选股提醒 2:系统消息 3:问答提醒 4:投资组合消息 5:投资内参消息  8:直播消息

    var messageCommon = {
        row: 10,
        param: {
            type: 3,
            page: 1,
            templateId: 'askStock-template'
        },
        getData: function(callback) {
            var self = this;
            $.getJSON("/app/getMessage.htm", {
                source: "0",
                messagetype: self.param.type,
                currentPage: self.param.page,
                pageSize: self.row
            }, function(data) {
                callback(data);
            })
        },
        render: function() {
            var self = this;
            loading.render();
            messageCommon.getData(function(data) {
                console.log("消息" + self.param.type, data);
                if (data.data == "") {
                    items.html(ynconfig.none());
                    bootpag.hide();
                    return;
                }
                var rows = data.data.list;
                items.html(template(self.param.templateId, self.handleData(rows)))
                var pageNumber = _.max([1, Math.ceil(data.data.total / self.row)]);
                bootpag.show().bootpag({ page: self.param.page, total: pageNumber })
            })
        },
        handleData: function(data) {
            return _.map(data, function(item) {
                item._style = item.isread == 1 ? "" : "unread"
                console.log("_style", item._style)
                var match = item.urllink.match(/\d+$/);
                if (match) {
                    item._id = match[0];
                    if (item.messagetype == 3) {
                        item._link = `${ask_path}consultation/${item._id}.htm`
                    } else if (item.messagetype == 5) {
                        item._link = `${live_path}reference/${item._id}.htm`
                    } else if (item.messagetype == 8) {
                        item._link = `${live_path}live/liveDetailLive.htm?teacherid=${item._id}&periodical=${item.goods_id}`
                    }
                }
                return item;
            })
        }
    }

    //系统消息
    var system = {
        page: 1,
        render: function() {
            messageCommon.param = {
                type: 2,
                page: this.page,
                templateId: 'system-template'
            }
            messageCommon.render();
        }
    }

    //内参消息
    var refer = {
        page: 1,
        render: function() {
            messageCommon.param = {
                type: 5,
                page: this.page,
                templateId: 'system-template'
            }
            messageCommon.render();
        }
    }

    //问股消息
    var askStock = {
        page: 1,
        render: function() {
            messageCommon.param = {
                type: 3,
                page: this.page,
                templateId: 'system-template'
            }
            messageCommon.render();
        }
    }

    //直播消息
    var live = {
        page: 1,
        render: function() {
            messageCommon.param = {
                type: 8,
                page: this.page,
                templateId: 'system-template'
            }
            messageCommon.render();
        }
    }


    ////////////////////////////////////////////////////////////// 

    menu.init()

    //default
    system.render();
})