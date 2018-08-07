$(function() {
    if (!ynIsLogin) return yn.login.render();
    var recharge = {
            container: $('#defray'),
            defraying: $('#defray .defray-ing'),
            defraywin: $('#defray .defray-win'),
            nextstep: $('#defray .defray-next'),
            defrayon: $('#defray .defray-online'),
            defray: $('#defray .defray-money'),
            amount: $('#defray #defray-amount'),
            ordernum: $('#defray .ordernum'),
            credit: $('#defray .credit'),
            orderNum: null,
            totalPrice: null,
            init: function() {
                var _this = this;
                this.orderNum = _this.getQueryString('orderNum'); //支付订单
                var pay_type = _this.getQueryString('pay_type'); //支付类型 0微信1支付宝
                if (ynIsTeacher == "0") {
                    _this.defray.find('.payaccount').html(ynUserName);
                } else {
                    _this.defray.find('.payaccount').html(ynTeacherName);
                }
                this.event();
                if (_this.orderNum) {
                    _this.defray.hide();
                    _this.defrayon.show();
                    orderNumDetail({ orderNum: _this.orderNum }).done(function(data) {
                        _this.totalPrice = data.totalPrice; //支付金额
                        _this.ordernum.html(data.orderNum);
                        _this.credit.html("" + data.totalPrice + "元");
                        _this.defrayon.find('.defray-type span').eq(pay_type).click();
                    })
                }
            },
            event: function() {
                var _this = this;
                //下一步
                this.nextstep.on('click', function() {
                        _this.totalPrice = Number(_this.amount.val());
                        if (!/^[1-9][0-9]*$/.test(_this.totalPrice)) {
                            layer.msg("客官，真的不能再少了(╯﹏╰) !");
                            return;
                        };
                        _this.defray.hide();
                        _this.defrayon.show();
                        _this.container.find('.process');
                        yndata.rencharge(_this.totalPrice).done(function(data) {
                            _this.ordernum.html(data.data.orderNum);
                            _this.credit.html(data.data.totalPrice + "元");
                            _this.orderNum = data.data.orderNum;
                            _this.render["wechat"]()

                        })
                    })
                    //支付方式切换
                this.defrayon.find('.defray-type').on('click', 'span', function() {
                        var index = $(this).index();
                        $(this).parent().find('.thisclass').removeClass("thisclass");
                        $(this).addClass("thisclass");
                        _this.defrayon.find('.defraytag:eq(' + index + ')').show();
                        _this.defrayon.find('.defraytag:eq(' + index + ')').siblings().hide();
                        var type = $(this).data("type");
                        _this.render[type]();
                    })
                    //关闭充值
                this.defrayon.on('click', '.closewin', function() {
                    window.close();
                })
            },
            render: {
                //微信充值
                wechat: function() {
                    recharge.defrayon.find('.wechatewm').attr("src", "/web/webWxPayQrcode.htm?orderNum=" + recharge.orderNum + "&width=308&height=308");
                },
                //支付宝充值
                alipay: function() {
                    yndata.alipay(recharge.orderNum).done(function(data) {
                        var data = JSON.parse(data);
                        recharge.defrayon.find('.alpayifram').attr("src", data.drcodePayUrl);
                        recharge.defrayon.find('.comlog').attr("href", data.accountPayUrl);
                    })
                }
            },
            // getpayorder : function(name) {
            //     var match = window.location.href.match(/order=([0-9]+)/);
            //     // if (!match || +match[1] % 567 !== 0 || !sessionStorage["yn" + match[1]]) {
            //     //     layer.alert("订单号错误")
            //     //     return;
            //     // }
            //     var value = sessionStorage["yn" + match[1]];
            //     var reg = new RegExp(name + "=([^&]+)", "i");
            //     return value.match(reg)[1];
            // },
            getQueryString: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        }
        //=======================================================//
    recharge.init();
    ynSocket.paySuccess.render=function(data){
        console.log('pay',data);
        window.location.href = __path+'/web/showccSuccess.htm';
    }
})
orderNumDetail = function(ops) {
    var defer = $.Deferred();
    $.post('/web/getPayOrderInfo.htm', { orderNum: ops.orderNum }, function(data) {
        defer.resolve(data)
    }, 'json')
    return defer.promise();
}
