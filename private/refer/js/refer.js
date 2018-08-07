



/*///////////////////////////////////////////////////////////////////*/



$(function() {

    //内参列表
    var referType = {
        container: $('#refer .refer_type'),
        content: $('#refer .wrap_fl .item'),
        bootpag: null,
        page: 1,
        productStatus: 0,
        lprice: '',
        hprice: '',
        time: '',
        detail: false,
        init: function() {
            var _this = this;
            this.bootpag = yn.bootpag('#refer .wrap_fl');
            this.bootpag.on('page', function(e, num) {
                _this.page = num;
                _this.render();
            })

            this.event();
            this.render();
        },
        event: function() {
            var _this = this;
            this.container.on('click', 'span', function() {
                $(this).parent().find('.thisclass').removeClass('thisclass');
                $(this).addClass('thisclass');
            })
            //内参状态取值
            this.container.find('.productStatus').on('click', 'span', function() {
                _this.productStatus = $(this).data('status');
                _this.render();
            })
            //内参订单价格取值
            this.container.find('.price').on('click', 'span', function() {
                _this.lprice = $(this).data('min');
                _this.hprice = $(this).data('max');
                _this.render();
            })
            //内参时间期限取值
            this.container.find('.time').on('click', 'span', function() {
                _this.time = $(this).data('time');
                _this.render();
            })
            //
            this.content.on('click', '.lookdetail-btn', function() {
                var id = $(this).data('id');
                var is_od =$(this).data('is_od');
                var teacherid = $(this).data('teachid');
                if (_this.productStatus == 2) return;//已结束
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }//是否登陆
                if (ynIsTeacher != 0 && ynTeacherId != teacherid) {
                    layer.msg('对不起，老师无法订阅内参!');
                    return;
                };//不是用户and当前老师!=this.teacherid
                if (is_od != 0 && ynTeacherId == teacherid || is_od == 1) {
                    _this.detail = true;
                }//未订阅 and 当前老师=this.teacherid or 已订阅
                if (_this.detail == true) {
                    var url = '/referp/list.htm?referenceid=' + id;
                    window.location.href = url;

                } else {
                    subscription.render(id)
                }
                console.log()
            })
        },
        handle: function(data) {
            var _this = this;
            data.rows = _.map(data.rows, function(item) {
                item.linkhref = '/referp/list.htm?referenceid=' + item.reference_id;
                item.pubtime = yn.timeFormat(item.pubtime);
                item.startTime = _this.timeFormat(item.startTime);
                item.endTime = _this.timeFormat(item.endTime);
                item.seedetail = item.is_od != 0 ? '查看详情' : '¥' + item.price + ' 订阅';
                if (item.productStatus == 0) {
                    item.status = "更新中";
                }
                if (item.productStatus == 1) {
                    item.status = "预售中";
                }
                if (item.productStatus == 2) {
                    item.status = "已结束";
                }
                return item;
            })
            return data;
        },
        render: function() {
            var _this = this;
            var send = {
                productStatus: _this.productStatus,
                lprice: _this.lprice,
                hprice: _this.hprice,
                time: _this.time,
                page: 10,
                currentPage: _this.page
            }
            yndata.referType(send).done(function(data) {
                _this.handle(data);
                _this.content.html(template('refer-list-template', data)).velocity('transition.expandIn', { duration: 300 });
                _this.bootpag.bootpag({ page: _this.page, total: data.pageNumber });
                if (send.productStatus == 2) {
                    _this.content.find('.lookdetail-btn').html('已售罄').css('background', '#999999');
                };
                if (!ynIsLogin) {
                    _this.content.find('.list>a').removeAttr("href");
                }
            })
        },
        timeFormat: function(time) {
            var data = time.replace(" ", ":").replace(/\:/g, "-").split("-");
            for (i = 0; i < data.length; i++) {
                time = data[1] + '月' + data[2] + '日';
                return time;
            }
        }
    }

    //内参牛人
    var genius = {
        container: $('#refer .genius'),
        init: function() {
            var _this = this;
            yndata.genius().done(function(data) {
                _this.container.find('.item').html(template('genius-template', data))
            })
        }
    }

    //最新内参
    var newrefer = {
        container: $('#refer .newrefer'),
        init: function() {
            var _this = this;
            yndata.newRefer().done(function(data) {
                data.rows = _.map(data.rows, function(item) {
                    item.pubtime = yn.timeFormat(item.pubtime);
                    item.referlink = '/referp/list.htm?referenceid=' + item.reference_id;
                    return item;
                })
                _this.container.find('.item').html(template('newrefer-template', data.rows))
                if (!ynIsLogin) {
                    _this.container.find('.list>a').removeAttr("href");
                }
            })
        }
    }

    //热门内参
    var hotrefer = {
        container: $('#refer .hotrefer'),
        init: function() {
            var _this = this;
            yndata.hotRefer().done(function(data) {
                data.rows = _.map(data.rows, function(item) {
                    item.pubtime = yn.timeFormat(item.pubtime);
                    item.referlink = '/referp/list.htm?referenceid=' + item.reference_id;
                    return item;
                })
                _this.container.find('.item').html(template('hotrefer-template', data.rows))
                if (!ynIsLogin) {
                    _this.container.find('.list>a').removeAttr("href");
                }
            })
        }
    }


    //互动最多
    var interactmax = {
        container: $('#refer .interactmax'),
        init: function() {
            var _this = this;
            yndata.interactmax().done(function(data) {
                data.rows = _.map(data.rows, function(item) {
                    item.pubtime = yn.timeFormat(item.pubtime);
                    item.referlink = '/referp/list.htm?referenceid=' + item.reference_id;
                    return item;
                })
                _this.container.find('.item').html(template('interactmax-template', data.rows))
                if (!ynIsLogin) {
                    _this.container.find('.list>a').removeAttr("href");
                }
            })
        }
    }

    // ===================================================//

    referType.init();
    genius.init();
    newrefer.init();
    hotrefer.init();
    interactmax.init();
    var subscription = ynmodule.subscription();
    subscription.init();
})




yndata.referType = function(ops) {
    ops = _.extend({
        productStatus: 1,
        lprice: '',
        hprice: '',
        time: '',
        page: 10,
        currentPage: 1
    }, ops)
    var send = {
        user_id: ynUserId,
        productStatus: ops.productStatus,
        lprice: ops.lprice,
        hprice: ops.hprice,
        time: ops.time,
        pageSize: ops.page,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/center/reference/portaList.htm', send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.page)])
        defer.resolve(data);
    })
    return defer.promise();
}
yndata.genius = function(ops) {
    ops = _.extend({
        user_id: ynUserId,
        page: 5,
        currentPage: 1
    }, ops)
    var send = {
        user_id: ops.user_id,
        pageSize: ops.page,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/center/reference/teacher.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}
yndata.newRefer = function(ops) {
    ops = _.extend({
        user_id: ynUserId,
        page: 5,
        currentPage: 1
    }, ops)
    var send = {
        user_id: ops.user_id,
        pageSize: ops.page,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/center/reference/newList.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}
yndata.hotRefer = function(ops) {
    ops = _.extend({
        user_id: ynUserId,
        page: 5,
        currentPage: 1
    }, ops)
    var send = {
        user_id: ops.user_id,
        pageSize: ops.page,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/center/reference/hotList.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}
yndata.interactmax = function(ops) {
    ops = _.extend({
        user_id: ynUserId,
        page: 5,
        currentPage: 1
    }, ops)
    var send = {
        user_id: ops.user_id,
        pageSize: ops.page,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/center/reference/hdList.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//生成充值订单号
yndata.rencharge = function(totalPrice) {
    var defer = $.Deferred();
    var send = {
        pay_source: 0,
        totalPrice: totalPrice,
        orderType: 0
    }
    $.post('/app/appRechargeOrder.htm', send, function(data) {
        defer.resolve(data);
    }, 'json');
    return defer.promise();
}

//内参生成预支付订单
yndata.referindentNum = function(ops) {
    ops = _.extend({
        pay_source: 0,
    }, ops)
    var send = {
        goodsId: ops.goodsId, //商品id
        goodsType: ops.goodsType, //商品类型(0观点，1组合，2课程，3内参 4:问股 5 直播)
        buy_number: 1, //内参数量
        pay_source: ops.pay_source, //来源 0web 1ios 2android
    }
    var defer = $.Deferred()
    $.post("/app/buyGoodsPayOrder.htm", send, function(data) {
        defer.resolve(data);
    }, 'json')

    return defer.promise();
}
