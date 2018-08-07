yn.navigation.name = ynconfig.navigation.i;
var handleCompositeData = require('~/composite/handleData.js').handleData;
var Profile = require('~/ui/teacher-profile.js');

/*///////////////////////////////////////////////////////////////////*/

$(function() {

    Profile.init();
    Profile.add('.trigger-info');

    /**
     * 搜索关键字
     * filter.onChange : Function
     */
    var filter = (function() {
        var container = $('.filter')
        var state = container.find('> .state')
        var items = container.find('.items')

        var send = {
            user_id: ynUserId,
            cStatus: "0", //空为全部, 0 预售中 1 进行中 2 完成 3 提前关闭 4 提起完成 5 到期失败 6 触及止损
            lprice: "", //最低价
            hprice: "", //最高价
            ltarget_revenue: "", //目标收益下线
            htarget_revenue: "", //目标收益上线
            combination_maxterm: "", //最长期限
            combination_style: "", //操作类型.
            pageSize: 10,
            currentPage: 1
        }


        //重置分类
        var resetCategory = function() {
            items.find('.select').removeClass('select')
            items.find('.all').addClass('select');
            send = {
                user_id: ynUserId,
                cStatus: "0",
                lprice: "",
                hprice: "",
                ltarget_revenue: "",
                htarget_revenue: "",
                combination_maxterm: "",
                combination_style: "",
                pageSize: 10,
                currentPage: 1
            }
        }

        //组合状态取值
        state.on('click', '.item', function() {
            yn.switch($(this));
            resetCategory();
            var value = $(this).data('value');
            if (value == "-1") {
                send.cStatus = ""
            } else {
                send.cStatus = +value
            }
            filter.onChange(send);
        })

        //目标收益取值
        items.on('click', '.goal .value', function() {
            yn.switch($(this));
            var value = $(this).data('value');
            if (value == "-1") {
                send.ltarget_revenue = send.htarget_revenue = ""
            } else {
                var valueArr = value.split("--");
                send.ltarget_revenue = +valueArr[0];
                send.htarget_revenue = +valueArr[1];
            }
            filter.onChange(send);
        })

        //订阅价格取值
        items.on('click', '.price .value', function() {
            yn.switch($(this));
            var value = $(this).data('value');
            if (value == "-1") {
                send.lprice = send.hprice = ""
            } else {
                var valueArr = value.split("--");
                send.lprice = +valueArr[0];
                send.hprice = +valueArr[1];
            }
            filter.onChange(send);
        })

        //最长期限
        items.on('click', '.time .value', function() {
            yn.switch($(this));
            var value = $(this).data('value');
            if (value == "-1") {
                send.combination_maxterm = ""
            } else {
                send.combination_maxterm = +value;
            }
            filter.onChange(send);
        })

        //操作风格取值
        items.on('click', '.style .value', function() {
            yn.switch($(this));
            var value = $(this).data('value');
            if (value == "-1") {
                send.combination_style = ""
            } else {
                send.combination_style = +value;
            }
            filter.onChange(send);
        })

        return {
            initValue: send,
            onChange: function(send) {
                console.log(send)
            },
            getSend: function() {
                return send;
            }
        }
    })()


    //排序
    var sort = (function() {
        var container = $('.sort');
        var item = container.find('.item')

        item.click(function() {
            yn.switch($(this));
        })
    })()


    //组合列表
    var composite = function() {
        var container = $(".composite-items");
        var items = container.find('.items');
        var body = $('body');

        var loading = new yn.loading({
            marign: 200,
            type:3,
            container:items
        });

        var bootpag = yn.bootpag(container)
        bootpag.on('page', function(err, n) {
            var send = filter.getSend();
            send.currentPage = n;
            composite.render(send);
        })

        return {
            render: function(send) {
                loading.render();
                $.getJSON("/composite/compositeportalList.htm", send, function(data) {
                    console.log("组合列表", data);
                    var pageNumber = _.max([1, Math.ceil(+data.total / send.pageSize)])
                    var rows = handleCompositeData(data.rows);
                    if (rows.length < 1) {
                        items.html(ynconfig.none({ margin: 300 }))
                        bootpag.hide();
                        return;
                    }
                    items.html(template("composite-item-template", rows));
                    bootpag.show().bootpag({ page: send.currentPage, total: pageNumber })
                    body.velocity('scroll', { offset: 0 })

                })
            }
        }
    }()

    ///////////////////////////////////////////////////////////////////

    //显示列表
    composite.render(filter.initValue);
    filter.onChange = function(send) {
        composite.render(send);
    }

})
