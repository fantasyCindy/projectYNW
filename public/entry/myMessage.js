require('~/center/center.js')



$(function() {
    //菜单
    yn.centerMenu.init({
        render:'my',
        light:'我的私信'
    });


    //信息列表
    var msg = {
        container: $("#mymsg"),
        menu: null,
        items: null,
        data: null,
        page: 1,
        row: 20,
        type: 0,
        bootpag: null,
        init: function() {
            var _this = this;
            this.items = this.container.find('.items');
            this.menu = this.container.find('.menu');
            this.render();
            this.event();
            this.bootpag = yn.bootpag(this.container);
            this.bootpag.on('page', function(e, num) {
                _this.page = num;
                _this.render();
            })
        },
        render: function() {
            var typeName = ["inbox", "sendbox"]
            var _this = this;
            yndata.getMyMsg({
                page: this.page,
                row: this.row,
                type: this.type
            }).done(function(data) {
                if (data.rows.length < 1) {
                    _this.items.html('<p style="margin:50px;text-align:center;">暂无数据</p>')
                    return;
                }
                data.rows = _.map(data.rows, function(item) {
                    item.shortContent = item.content.substr(0, 35) + "...";
                    item.type = typeName[_this.type];
                    return item;
                });
                _this.data = data.rows;
                _this.items.empty().html(template('msg-template', data.rows));
                _this.bootpag.bootpag({ page: _this.page, total: data.pageNumber })

            })
        },
        event: function() {
            var _this = this;
            this.menu.on('click', '.menu-item', function() {
                _this.menu.find('.select').removeClass('select');
                $(this).addClass('select');
                var type = $(this).data('type');
                _this.type = type;
                _this.render();
            })

            //回复
            this.items.on('click', '.item', function() {
                var index = $(this).index();
                var type = $(this).data('type');
                reply.render(index, type);
            })
        }
    }


    //回复窗口
    var reply = {
        container: $('.msg-reply'),
        overlay: $('.msg-reply-overlay'),
        sendName: null,
        sendTime: null,
        sendContent: null,
        textarea: null,
        submit: null,
        wordCount: null,
        replyId: null,
        receiverId: null,
        replyWrap: null,
        init: function() {
            this.set();

            yn.wordCount(this.textarea, {
                indicate: reply.wordCount
            })

            this.event();
        },
        set: function() {
            this.sendName = this.container.find('.send .name .value');
            this.sendTime = this.container.find('.send .time .value');
            this.sendContent = this.container.find('.send .content');
            this.textarea = this.container.find('textarea');
            this.submit = this.container.find('button');
            this.wordCount = this.container.find('.wordCount .value');
            this.replyWrap = this.container.find('.replyWrap');
            var w = document.documentElement.clientWidth;
            var h = window.screen.height;
            var eh = this.container.height();
            var ew = this.container.width();
            this.container.css({
                "left": (w - ew) / 2 + "px",
                "top": "150px"
            })
        },
        render: function(index, type) {
            type == "inbox" ? this.replyWrap.show() : this.replyWrap.hide();
            this.overlay.velocity("transition.fadeIn", { stagger: 100 })
            var data = msg.data[index];
            this.sendName.text(data.createName)
            this.sendTime.text(data.createtime)
            this.sendContent.text(data.content);
            this.replyId = data.id;
            this.receiverId = data.creatorid;
        },
        event: function() {
            var _this = this;
            this.overlay.click(function() {
                $(this).hide();
            })

            this.container.click(function() {
                return false;
            })

            this.container.on('click', '.close', function() {
                _this.overlay.hide();
            })

            this.submit.on('click', function() {
                var val = _this.textarea.val();
                if (!val) {
                    layer.msg("内容不能为空");
                    return
                }
                var send = {
                    receiverId: _this.receiverId,
                    content: val,
                    replyId: _this.replyId
                }

                yndata.postMsg(send.receiverId, send.content, send.replyId).done(function() {
                    _this.overlay.hide();
                    _this.textarea.val('')
                })

            })

        }

    }

    //////////////////////////////////////////////////////////////////////

    msg.init();
    reply.init();

})
