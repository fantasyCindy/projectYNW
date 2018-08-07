var error = require('m/lib/errorCode.js')


$(function() {

    //支付
    var pay = function() {

        // 从URL中提取订单号
        var orderNum = (function() {
            var match = window.location.href.match(/\d+$/);
            return match ? match[0] : false
        })();

        if (!orderNum) {
            layer.msg('订单号错误, 页面即将关闭!');
            setTimeout(function() {
                window.close();
            }, 3000)
            return;
        }

        var container = $('#defray');
        var submit = $("#pay-submit");
        var items = container.find('.defray-item');

        var payType = 'alipay'; // 默认支付类型
        var goodsType = ""; // 订单类型
        var orderInfo = null; // 订单详情
        var accountRemain = 0; //账户余额


        //查询订单信息
        $.post('/web/getPayOrderInfo.htm', { orderNum }, data => {
            console.log("订单信息", data)
            container.find('.price').text(data.totalPrice);
            container.find('.indent_num').text('订单号：' + data.orderNum);
            container.find('.indent_describe').text('订单描述：' + data.orderName);
            goodsType = data.goodsType;
            orderInfo = data;
            if (+goodsType == 6) {
                items.eq(2).remove();
            }
        }, 'json')


        //支付类型
        var strategy = {
            balance: function() {
                if (accountRemain < 1) {
                    layer.msg("余额不足,系统将自动跳转充值页面");
                    setTimeout(function() {
                        window.location.href = '/html/recharge.htm';
                    }, 2000)
                    return;
                }

                $.post('/reward/rewardTheacher.htm', { orderNum }, data => {
                    if (data == "success") {

                        // 如果是购买VIP直播室
                        if (+goodsType == 6) {
                            layer.alert("商品已付款, 请等待客服人员与您联系", function() {
                                window.location.href = '/html/liveVipAct.htm'
                            })
                            return;
                        }

                        layer.msg('支付成功！页面即将关闭');
                        setTimeout(function() {
                            window.close();
                        }, 1500)
                        return;
                    }
                    layer.msg(`余额不足, 页面即将跳转到充值页面`);
                    setTimeout(function() {
                        window.location.href = "/html/recharge.htm"
                    }, 1000)
                })
            },

            wechat: function() {
                window.location.href = '/html/recharge.htm?pay_type=0&orderNum=' + orderNum;
            },
            alipay: function() {
                window.location.href = '/html/recharge.htm?pay_type=1&orderNum=' + orderNum;
            }
        }

        //切换支付类型
        items.on('click', 'label', function() {
            $('.defray-item.thisclass').removeClass('thisclass');
            var parent = $(this).parents('.defray-item').addClass('thisclass');
            payType = parent.data("source");
        })

        //确认支付
        submit.click(function() {
            submit.off('click');
            strategy[payType]();
        })


        //查询账户余额
        $.getJSON('/useraccount/pay_useraccountDetail.htm', { user_id: ynUserId }, data => {
            accountRemain = +data.balance;
            container.find('.yn_balance').html("可用余额" + data.balance + "牛币")
        })


    }()
})
