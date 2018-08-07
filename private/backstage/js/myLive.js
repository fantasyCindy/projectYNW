$(function() {

    //菜单
    yn.centerMenu.init();
    yn.centerMenu.render({ type: "my" });

    var myBootpag = yn.bootpag('.myPagination');
    myBootpag.on('page', function(e, num) {
        live.page = num;
        live.update();
    })

    var live = {
        container: null,
        modify: null,
        modifyBox: null,
        page: 1,
        row: 20,
        init: function() {
            this.set();
            this.event();
            this.update();
        },
        set: function() {
            this.container = $("#myLive");
            this.modify = $('#contentart_theme');
            this.modifyBox = $("#modifyTheme");
        },
        getData: function(callback) {
            yndata.getMyLiveList({ page: this.page, row: this.row }).done(function(data) {
                data.rows = _.map(data.rows, function(item) {
                    item._time = item.starttime.match(/^[^\s]+/)[0];
                    return item;
                })
                callback(data)
            })
        },
        update: function() {
            this.getData(function(data) {
                console.log("我的直播", data)
                $('#myLive .contentWrap').html(template('myLive-template', data.rows));
                myBootpag.bootpag({ page: this.page, total: data.pageNumber });
            })
        },
        event: function() {
            //enter
            this.container.on('click', '#enterLive', function() {
                //开通直播室
                $.getJSON("/center/openPeriodical.htm", { user_id: ynUserId }, function(data) {
                    console.log("进入直播室返回", data)
                    if (data == "-1") {
                        layer.alert("您不是直播老师！");
                        return;
                    }
                    if (data == "-2") {
                        layer.alert("您尚未开通直播室！");
                        return;
                    }
                    location.href = '/live/liveDetailLive.htm?teacherid=' + data;
                })
            })

            //查看记录
            this.container.on('click', '.enterLive', function() {
                var id = $(this).data('id');
                var href = "/live/liveDetailLive.htm?teacherid=" + ynTeacherId + "&periodical=" + id;
                window.location = href;
            })

            //修改主题
            this.container.on('click', '.modify', function() {
                var id = $(this).data('id');
                $("#st-title").data('id', id);
                live.modify.show();
                live.modifyBox.css({
                    "left": ($(window).width() - live.modifyBox.width()) / 2 - 20 + "px",
                    "top": ($(window).height() - live.modifyBox.height()) / 4 + "px"
                });
            })

            //close modify
            this.modify.on('click', ".close", function() {
                live.modify.hide();
            })

            //修改主题
            this.modify.on('click', "#st-title", function() {
                var periodicalid = $(this).data('id');
                var todaysubject = $("#TextAreaT").val();
                if (todaysubject === '') {
                    layer.alert("主题内容不能为空", { icon: 2 });
                    return;
                }
                $.post("/center/editPeriodical.htm", {
                    periodicalid: periodicalid,
                    todaysubject: todaysubject
                }, function(data) {
                    console.log("--")
                    console.log(data)
                    if (data === 0) {
                        alyer.alert("参数为空")
                        return;
                    }
                    if (data == "success") {
                        layer.alert("修改成功");
                        live.modify.hide().find('textarea').val("");
                        live.init();
                    }
                });
            })
        }
    }


    //直播统计
    var sum = function() {
        return {
            render: function(data) {
                var items = $("#myLive .body");
                var len = items.length - 1;
                var liveCount = 0;
                var popularCount = 0;
                var chatCount = 0;
                var curMonth = null;

                //显示统计信息
                var insert = function(el, type) {
                    var html = '<tr class="count-item"><td colspan="6">' +
                        '<i class="fa fa-arrow-circle-up" style="margin:0 5px"></i>' +
                        '<span>直播统计：' + liveCount + '条</span>' +
                        '<span>人气统计：' + popularCount + '次浏览</span>' +
                        '<span>互动统计：' + chatCount + '条</span>' +
                        '</td></tr>';

                    if (type == "after") {
                        el.after(html);
                    } else {
                        el.before(html);
                    }

                    liveCount = 0;
                    popularCount = 0;
                    chatCount = 0;
                    curMonth = null;
                }

                items.each(function(i, el) {
                    var itemData = data[i];
                    var month = itemData._time.match(/-(.+)-/)[1];
                    if (!curMonth) {
                        curMonth = month;
                    }
                    if (curMonth == month) {
                        liveCount += +itemData.broadCastingCount;
                        popularCount += +itemData.popularity;
                        chatCount += +itemData.icount
                    } else {
                        insert($(this), 'before');
                    }

                    if (i == len) {
                        insert($(this), 'after');
                    }
                })
            }
        }
    }()


    ///////////////////////////////////////////////////////////////////

    live.init();
})