var recharge = (function() {
    var container, defraying, defraywin, nextstep, defrayon, defray, amount, ordernum, credit, orderNum = null,
        totalPrice = null;
    var getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var orderNumDetail = function(ops) {
        var defer = $.Deferred();
        $.post('/web/getPayOrderInfo.htm', { orderNum: ops.orderNum }, function(data) {
            defer.resolve(data)
        }, 'json')
        return defer.promise();
    }
    var rencharge = function(totalPrice) {
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
    var payment = function(orderNum) {
        var defer = $.Deferred();
        $.post('/web/webPay.htm', { orderNum: orderNum }, function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    var wechat = function() {
            defrayon.find('.wechatewm').attr("src", "/web/webWxPayQrcode.htm?orderNum=" + orderNum + "&width=308&height=308");
        }
        //支付宝充值
    var alipay = function() {
        payment(orderNum).done(function(data) {
            var data = JSON.parse(data);
            defrayon.find('.alpayifram').attr("src", data.drcodePayUrl);
            defrayon.find('.comlog').attr("href", data.accountPayUrl);
        })
    }
    return {
        init: function() {
            var _this = this;
            container = $('#defray');
            defraying = $('#defray .defray-ing');
            defraywin = $('#defray .defray-win');
            nextstep = $('#defray .defray-next');
            defrayon = $('#defray .defray-online');
            defray = $('#defray .defray-money');
            amount = $('#defray #defray-amount');
            ordernum = $('#defray .ordernum');
            credit = $('#defray .credit');
            orderNum = getQueryString('orderNum'); //支付订单
            var pay_type = getQueryString('pay_type'); //支付类型 0微信1支付宝
            if (ynIsTeacher == "0") {
                defray.find('.payaccount').html(ynUserName);
            } else {
                defray.find('.payaccount').html(ynTeacherName);
            }
            this.event();
            if (orderNum) {
                defray.hide();
                defrayon.show();
                orderNumDetail({ orderNum: orderNum }).done(function(data) {
                    totalPrice = data.totalPrice; //支付金额
                    ordernum.html(data.orderNum);
                    credit.html("" + data.totalPrice + "元");
                    defrayon.find('.defray-type span').eq(pay_type).click();
                })
            }
        },
        event: function() {
            var _this = this;
            nextstep.on('click', function() {
                    totalPrice = Number(amount.val());
                    if (!/^[1-9][0-9]*$/.test(totalPrice)) {
                        layer.msg("客官，真的不能再少了(╯﹏╰) !");
                        return;
                    };
                    defray.hide();
                    defrayon.show();
                    container.find('.process');
                    rencharge(totalPrice).done(function(data) {
                        data = data.data
                        ordernum.html(data.orderNum);
                        credit.html(data.totalPrice + "元");
                        orderNum = data.orderNum;
                        wechat()

                    })
                })
                //支付方式切换
            defrayon.find('.defray-type').on('click', 'span', function() {
                    var index = $(this).index();
                    $(this).parent().find('.thisclass').removeClass("thisclass");
                    $(this).addClass("thisclass");
                    defrayon.find('.defraytag:eq(' + index + ')').show();
                    defrayon.find('.defraytag:eq(' + index + ')').siblings().hide();
                    $(this).data("type") == 'wechat' ? wechat() : alipay();
                })
                //关闭充值
            defrayon.on('click', '.closewin', function() {
                window.close();
            })
        }
    }
})()
$(function() {
    recharge.init();
    ynSocket.paySuccess.render = function(data) {
        console.log('pay', data);
        window.location.href = __path + '/web/showccSuccess.htm';
    }
})