var __orderNum //订单号


/* 获取价格列表 */
$.getJSON("/product/productList.htm ", back => {
    var list = back[0].priceList;
    priceBar.render(list)

    list.forEach((item, i) => {
        if (i == 1) {
            order.render({ priceId: item.id, goodsId: item.product_id })
        }
    })
})


/* 价格列表 */
var priceBar = (function() {
    var items = $('.vip-refer .items')

    var createTags = arr => {
        var unitTable = { "1": "月", "3": "季度", "6": "半年" }
        return _.map(arr, (item, i) => {
            var active = i == 1 ? "active" : '';
            var unit = unitTable[item.servicePeriod];
            return `<div class="item ${active}" data-id="${item.id}" data-pid="${item.product_id}">
                        <span>￥<strong>${item.product_price}/</strong>${unit}</span>
                        <i class="icon"></i>
                     </div>`
        }).join('')
    }

    //选择切换
    items.on('click', '.item', _.debounce(function() {
        $(this).addClass('active').siblings().removeClass('active')
        var priceId = $(this).data('id')
        var goodsId = $(this).data('pid')
        order.render({ priceId, goodsId })
    }, 500, { leading: true, trailing: false }))

    return {
        render(arr) {
            items.html(createTags(arr))
        }
    }
})()


/* 获取订单号 */
var order = (function() {

    var getData = function(ops) {
        $.post('/app/appRewardPayOrder.htm', {
            pay_source: 0,
            goodsType: 6,
            price_id: ops.priceId,
            goodsId: ops.goodsId

        }, back => {
            if (back.status == 1) {
                __orderNum = back.data.orderNum;
                $('.orderNum').text(__orderNum)
                pay.render()

            } else {
                layer.alert("获取订单号失败, 请重试")
            }
        }, 'json')
    }

    return {
        /* ops = {priceId, goodsId} */
        render(ops) {
            getData(ops)
        }
    }
})()



//支付类型
var pay = (function() {
    var container = $('.pay-category')
    var payType = 'card'

    container.on('click', '.item', _.debounce(function() {
        $(this).addClass('active').siblings().removeClass('active')
        payType = $(this).data('type')
        $('.pay-type').hide()
        $('.pay-types').find(`#code-${payType}`).show();
        pay.render()
    }, 500, { leading: true, trailing: false }))

    return {
        render: function(type) {

            if (type) {
                payType = type
            }

            //微信支付
            if (payType == "weixin") {
                $('#code-weixin .content').html(`<img width="200" src="/web/webWxPayQrcode.htm?orderNum=${__orderNum}&width=200&height=200" class="wx"/>`)
            }

            //支付宝
            if (payType == "ali") {

                var computeBtn = item => {
                    return `<div class="alipay-computer">
                                <a href="${item.accountPayUrl}" target="_bank" class="icon"><img src="/public/images/pay/computer.jpg" /></a>
                                <a href="${item.accountPayUrl}" target="_bank" class="text">使用电脑登录支付宝支付</a>
                            </div>`
                }

                var createpay = item => {
                    return `<div class="pay-info ">
                            <iframe scrolling="no" frameborder="0" src="${item.drcodePayUrl}" width="1000" height="308" /></iframe>
                         </div>`
                }

                $.post('/web/webPay.htm', { orderNum: __orderNum }, back => {
                    $('#code-ali .content').html(createpay(back) + computeBtn(back))
                }, 'json');
            }
        }
    }

})()


ynSocket.paySuccess.render = function(data) {
    console.log('pay', data);
    window.location.href = '/web/showccSuccess.htm';
}
