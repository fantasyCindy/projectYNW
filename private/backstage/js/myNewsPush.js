$(function() {
    //菜单
    yn.centerMenu.init();
    yn.centerMenu.render();

    var fansbar = {
        container: $('#content'),
        fans: null,
        items: null,
        data: null,
        page: 1,
        row: 10,
        bootpag: null,
        init: function() {
            var _this = this;
            this.fans = this.container.find('#fans');
            this.record = this.container.find('#record');
            this.fans_menu = this.container.find('.fans-menu');
            this.record_menu = this.container.find('.record-menu');
            this.render();
            this.event();
            this.bootpag = yn.bootpag(this.fans_menu);
            this.bootpag.on('page', function(e, num) {
                _this.page = num;
                _this.render();
            })
        },
        render: function() {
            var _this = this;
            yndata.getNewsPush({
                page: this.page,
                row: this.row,
            }).done(function(data) {
                if (data.length < 1) {
                    _this.fans.html('<p style="margin:50px;text-align:center;">暂无数据</p>')
                    return;
                }
                _this.fans.empty().html(template('fansBar', data));
                _this.bootpag.bootpag({ page: _this.page, total: data.pageNumber })
            });
            yndata.getrecord().done(function(data) {
                _this.record.empty().html(template('recordBar', data));
            })
        },
        event: function() {
            var _this = this;
            this.recordclass = this.container.find('.record');
            this.mass = this.container.find('.mass');
            this.select = this.container.find('.select');
            //删除粉丝
            // this.container.on("click", '.delete', function() {
            //     var id = $(this).data('id');
            //     var item = $(this).parents('.fans-lsit');
            //     yndata.removefans(id).done(function() {
            //         item.remove();
            //     });
            // })
            this.container.on("click", '.record', function() {
                _this.record_menu.show();
                _this.recordclass.text("粉丝用户");
                _this.select.find('span').text("历史群发纪录");
                _this.fans_menu.hide();

            })
            this.container.on("click", '.fansuser', function() {
                _this.record_menu.hide();
                _this.recordclass.text("发送纪录");
                _this.select.find('span').text("粉丝用户");
                _this.fans_menu.show();
            })
            this.container.on("click", '.title', function() {
                $(this).parent().find('.content').slideToggle();
            })
            $('.mass').click(function() {
                massmoudule.render();
            })
            $('.subhref').click(function() {
                massmoudule.overlay.hide();
                yn.bodyScroll(true);
                _this.record_menu.show();
                _this.recordclass.text("粉丝用户");
                _this.select.find('span').text("历史群发纪录");
                _this.fans_menu.hide();
            })
        }
    }
    var editer = {
        container: $('#pubEditer'),
        input: $('#insertStockCode'),
        masstitle: $('#masstitle'),
        moudlecontainer: $('.ynmodule-mass'),
        ue: null,
        ueInit: true,
        should: function() {
            var _ = menu.tabSelect;
            if (ynIsLogin && liveStatus != "1" && isTeacherSelf && (_.live || _.answer || _.myAnswer)) {
                this.container.show();
            } else {
                this.container.hide();
            }
        },
        init: function() {
            var _this = this;
            this.ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    ['emotion', 'link']
                ],
                initialFrameHeight: 268,
                initialFrameWidth: 757,
                maximumWords: 500,
                wordCountMsg: '当前已输入{#count}个字符, 您还可以输入{#leave}个字符',
                elementPathEnabled: false,
                wordCount: true,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                autotypeset: {
                    removeClass: true,
                    clearFontSize: true,
                    removeEmptyline: true, //去掉空行
                    removeEmptyNode: false // 去掉空节点
                }
            });

            this.event();
            yn.showStockList(this.input, {
                listLen: 4,
                onSelect: function(item) {
                    _this.input.val('');
                    _this.ue.execCommand('inserthtml', item.stockWrap);
                }
            })
        },
        event: function() {
            var _this = this;
            this.moudlecontainer.find('.submit').click(function(e) {
                e.preventDefault()
                var tmessagecontent = editer.ue.getContent();
                var tmessagetitle = _this.masstitle.val();
                console.log(tmessagetitle)
                if (!tmessagecontent) {
                    layer.alert("内容不能为空");
                    return;
                }
                tmessagecontent = tmessagecontent.replace("&nbsp;", '');
                yndata.mass(tmessagetitle, tmessagecontent).done(function() {
                    editer.ue.setContent('');
                    massmoudule.overlay.hide();
                    yn.bodyScroll(true);
                })
            })
        }
    }

    /////////////////////////////////////////////////////////////////////
    editer.init();
    fansbar.init();
    var massmoudule = ynmodule.mass();
})
