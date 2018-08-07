var payAny = require('m/ui/pay-any.js')
var payConfirm = require('m/ui/pay-confirm-v1.2.js')
var error = require('m/lib/errorCode.js')

/*
约投顾支付模块
var Confirm = require(../pay-any-package.js)

1.随意赏 + 支付确认
Confirm.render({
    teacherId: Number,   老师ID
    name: '直播送礼...',
    finish: true/false,  是否显示支付完成/支付遇到问题步骤
    callback: function(){}
})

2.only支付确认窗口
Confirm.payconfirm({
    name: '观点打赏...',
    price: number,
    orderNum: number,   订单号必传
    finish: true/false,
    success: function(){}   支付成功回调
})
 */
var params = {}
module.exports = {
    render(ops) {
        console.log('osp',ops)
        var self = this
        params = _.extend({
            type: 0,
            id: null,
            name: '',
            callback: null
        }, ops)
        if (!params.teacherId) {
            layer.msg("pay : teacherId不能为空")
            return;
        }

        // 显示随意赏窗口
        payAny.getInstance().render({
            onSubmit: number => {

                // 获取订单号 
                var isOpinion = params.type == 0;
                var getData = isOpinion ? getOpinionOrder : getGiftOrder;
                getData({ teacherId: params.teacherId, number, id: params.id }, back => {
                    if (back.status == "1") {
                        params.url = "/html/returnshortcutpayJsp.htm?orderNum=" + back.data.orderNum;
                        params.orderNum = back.data.orderNum
                        params.price = number
                        self.payconfirm(params)
                    }
                })
            }

        })
    },
    payconfirm(ops) {
        // 显示支付确认
        payConfirm.getInstance().render({
            type: ops.type,
            price: ops.price,
            link: ops.url,
            referenceid: ops.referenceid,
            userid: ops.userid,
            orderNum: ops.orderNum,
            finish: ops.finish,
            read: ops.read,
            orderid: ops.orderid,
            success: ops.success,
            useNB:ops.useNB
        })
    }

}



/**
 * 获取礼物打赏订单
 * {teacherId, number}
 */
var getGiftOrder = function(ops, callback) {

    // 随意赏=获取红包ID
    $.getJSON("/gift/giftList.htm", back => {
        var data = _.filter(back, item => item.gift_name == "红包")[0];
        var giftId = data.gift_id;

        // 获取订单号
        $.post("/app/appGiftPayOrder.htm", {
            pay_source: "0", //web端
            goodsType: "5", //直播
            teacherId: ops.teacherId,
            buy_number: ops.number, //支付总价
            giftId: giftId, //随意赏=送红包
            sum: ops.number
        }, back => {
            if (+back.status == 1) {
                (typeof callback == 'function') && callback(back)
                return;
            }
            layer.msg(error[back.status])
        }, 'json')
    })


}


/**
 * 获取观点打赏订单
 * {teacherId, number, id}
 */
var getOpinionOrder = function(ops, callback) {
    $.post("/app/appRewardPayOrder.htm", {
        goodsId: ops.id, // 观点ID
        goodsType: 0, //商品类型(0观点，1组合，2课程，3礼物，4内参 5:问股 6 直播)
        totalPrice: ops.number, //支付总价
        pay_source: 0, //来源 0web 1ios 2android
        teacherId: ops.teacherId //老师ID
    }, back => {
        if (+back.status == 1) {
            (typeof callback == 'function') && callback(back)
            return;
        }
        layer.msg(error[back.status])

    }, 'json')
}