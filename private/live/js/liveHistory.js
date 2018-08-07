(function($) {
    $(function() {

        var myBootpag = yn.bootpag("#history-list", {
            first: false
        });
        
        myBootpag.on('page', function(e, num) {
            history.page = num;
            history.render()
        })

        var liveInfo = {
            container: $('#live-info'),
            care: $('#live-info .care'),
            init: function() {
                this.event();
            },
            event: function() {
                var _this = this;
                this.care.click(function() {
                    if (!ynIsLogin) {
                        yn.login.render();
                        return;
                    }
                    //cancel care
                    if ($(this).attr('class').indexOf('true') != -1) {
                        yndata.cancelCare(ynUserId, room_teacherid).done(function() {
                            _this.care.removeClass('true').text("关注");
                        })
                        return;
                    }
                    //add care
                    yndata.addCare(ynUserId, room_teacherid).done(function() {
                        _this.care.addClass('true').text("取消关注");
                    });
                })

                //提问
                this.container.on('click', '.ask', function() {
                    if (!ynIsLogin) {
                        yn.login.render();
                        return;
                    }
                    msg.render(room_teacherid);
                })
            }
        }

        //直播列表
        var history = {
            container: $('#history-list'),
            items: null,
            button: null,
            page: 1,
            init: function() {
                this.items = this.container.find('.items');
                this.button = this.container.find('button');
                this.render();
                this.event();
            },
            getData: function(callback) {
                var ops = { page: this.page }
                yndata.getLiveHistory(roomid, ops).done(function(data) {
                    callback(data);
                })
            },
            render: function() {
                this.getData(function(data) {
                    $('#history-list .items').html(template('history-list-template', data.rows));
                    myBootpag.bootpag({ page: history.page, total: data.pageNumber })
                })
            },
            event: function() {
                //查看记录
                this.container.on('click', 'button', function() {
                    var id = $(this).data('id');
                    window.location.href = "/html/periodicalDetail.htm?periodicalid=" + id;
                })
            }
        }

        ////////////////////////////////////////////////////////////////

        history.init();
        liveInfo.init();
        var msg = ynmodule.msg();
    })
})(jQuery)
