/**
 * 支付确认窗口
    confirm.render({
        name: String, 支付项目名称
        price: String, 价格
        link: String, 立即支付链接
        success: Function, 支付成功回调
        fail:Function 支付失败回调,
        read: Boolean, 是否默认勾选风险揭示书
        finish: Boolean 是否显示支付完成确认窗口
    })
 */

require('./pay-confirm.css');

var ErrorCode = require('../lib/errorCode.js');

var orderType = {
    0: '观点打赏',
    1: '组合',
    2: '课程',
    3: '内参订阅',
    4: '股票提问',
    5: '直播送礼',
    6: 'vip直播室'
};

module.exports = (function() {
    var instance = null;

    var createInstance = function() {
        var container,
            box,
            confirm,
            tip,
            name,
            price,
            link,
            orderNum,
            agreeTip,
            items,
            orderValue,
            finish,
            typeBalance,
            ops = {
                name: '支付名称',
                price: 0,
                link: '#',
                finish: true,
                success: function() {
                    layer.msg('支付成功');
                },
                fail: function() {
                    layer.msg('支付尚未完成');
                }
            };

        var payStatus = null; //支付状态
        var accountRemain = 0; //账户余额
        var payType = 'balance'; // 默认支付类型
        var goodsType = ''; // 订单类型
        var OrderNum = null;

        $('body').append(createElement());

        container = $('.pay-confirm-overlay');
        box = container.find('.pay-confirm-box');
        confirm = $('.pay-item-confirm');
        tip = container.find('.pay-item-tip');
        name = container.find('.name .value');
        price = container.find('.price .value');
        link = $('#pay-confirm-link');
        orderNum = container.find('.orderNum-value');
        agreeTip = container.find('.agree-tip');
        items = container.find('.defray-item');
        typeBalance = container.find('.type-nb');

        //关闭
        container.on('click', '.close', function() {
            $.post('/web/getPayStatus.htm', { orderNum: OrderNum }, function(data) {
                data = JSON.parse(data);
                if (data.status == '1' && (data.data == '6' || data.data == '1')) {
                    ops.success();
                }
            });
            container.hide();
            reset();
        });

        // //立即支付
        // container.on('click', '.jump', function() {
        //     if (ops.finish) {
        //         confirm.hide();
        //         tip.show();
        //     } else {
        //         container.hide()
        //     }
        // })

        //支付完成
        tip.on('click', '.finish', function() {
            $.post('/web/getPayStatus.htm', { orderNum: OrderNum }, function(data) {
                data = JSON.parse(data);
                if (data.status == '1' && (data.data == '6' || data.data == '1')) {
                    container.hide().velocity('transition.bounceDownOut', { duration: 300 });
                    reset();
                    ops.success();
                } else {
                    container.velocity('callout.shake', { duration: 300 });
                    ops.fail(data);
                }
            });
        });
        var reset = function() {
            confirm.show();
            tip.hide();
            container.find('.defray-item.type-nb').removeClass('disable');
            agreeTip.hide().find('.tip-wrap').html('');
        };
        reset();

        //支付类型
        var strategy = {
            balance: function() {
                if (+accountRemain < 1) {
                    layer.msg('余额不足,系统将自动跳转充值页面');
                    setTimeout(function() {
                        window.location.href = '/html/recharge.htm';
                    }, 2000);
                    return;
                }

                $.post('/reward/rewardTheacher.htm', { orderNum: orderValue }, (data) => {
                    if (data == 'success') {
                        layer.msg('支付成功!');

                        return;
                    }
                    // layer.msg(`余额不足, 页面即将跳转到充值页面`);
                    // setTimeout(function() {
                    //     window.location.href = "/html/recharge.htm"
                    // }, 1000)
                });
            },

            wechat: function() {
                window.open('/html/recharge.htm?pay_type=0&orderNum=' + orderValue);
                // window.location.href = '/html/recharge.htm?pay_type=0&orderNum=' + orderValue;
            },
            alipay: function() {
                window.open('/html/recharge.htm?pay_type=1&orderNum=' + orderValue);
            }
        };

        //切换支付类型
        container.on('click', '.defray-item', function() {
            if ($(this).hasClass('disable')) return;
            payType = $(this).data('source');
            console.log('=payType=', payType);
            $(this).addClass('thisclass').siblings().removeClass('thisclass');
        });

        //确认支付
        container.on('click', '.jump', function() {
            console.log('payType', payType);
            if (ynIsTeacher) {
                return layer.msg('老师不能购买~');
            }
            // link.off('click');
            if (agreeTip.is(':visible')) {
                var flag = agreeTip.find('input').is(':checked');
                if (!flag && goodsType == 3) {
                    layer.msg('请先阅读并同意《风险揭示书》《服务使用协议》');
                    return false;
                } else if (!flag && goodsType == 4) {
                    return layer.msg('请先阅读并同意《约投顾问股服务协议》');
                }
            }
            strategy[payType]();
            if (finish) {
                confirm.hide();
                tip.show();
            } else {
                container.hide();
                reset();
            }
        });

        return {
            render: function(options) {
                var self = this;
                _.extend(ops, options);
                OrderNum = ops.orderNum;
                // 赋值
                name.text(orderType[ops.type]);
                price.text(ops.price);
                orderNum.text(ops.orderNum);
                console.log('=ops=', ops);
                if (!ops.useNB) {
                    self.delBanlance();
                } else {
                    typeBalance.show();
                    //查询账户余额
                    $.getJSON('/useraccount/pay_useraccountDetail.htm', { user_id: ynUserId }, (data) => {
                        accountRemain = +data.balance;
                        container.find('.yn-balance-value').html('可用余额' + data.balance + '牛币');
                        if (data.balance < ops.price) {
                            //余额不足时  不能选余额支付，默认微信支付
                            container.find('.defray-item.type-wx').click();
                            container.find('.defray-item.type-nb').addClass('disable');
                        } else {
                            container.find('.defray-item.type-nb').click();
                        }
                    });
                }
                self.orderType(ops.type);
                goodsType = ops.type;
                orderValue = ops.orderNum;
                finish = ops.finish;

                //风险揭示书默认打钩
                if (!ops.read) {
                    agreeTip.find('input').attr('checked', false);
                }

                container.show().velocity('transition.fadeIn', { duration: 300 });
                box.velocity('transition.swoopIn', { duration: 300 });

                // //查询订单信息
                // $.post('/web/getPayOrderInfo.htm', { orderNum }, data => {
                //     //     console.log("订单信息", data)
                //     goodsType = data.goodsType;
                //     orderInfo = data;
                //     if (+goodsType == 6) { //goodsType = 6是购买VIP直播室，不能用牛币支付
                //         items.eq(0).remove();
                //     }
                // }, 'json')
            },
            delBanlance: function() {
                typeBalance.hide();
                container.find('.defray-item.type-wx').click();
            },
            orderType: function(n) {
                var self = this;
                if (n == 3) {
                    //0观点，1组合，2课程，3 内参 4:问股 5 直播 6vip直播室
                    agreeTip.show();
                    container.find('.tip-wrap').html(`
                        <a href="/agreement.htm?orderid=${ops.orderid}&referenceid=${ops.referenceid}" class="risk agree" target="_blank"><span class="blue">《风险揭示书》</span></a>
                        <a href="/protocol.htm?orderid=${ops.orderid}&referenceid=${ops.referenceid}" class="service agree" target="_blank"><span class="blue">《服务使用协议》</span></a>`);
                    self.delBanlance();
                }
                if (n == 4) {
                    agreeTip.show();
                    container
                        .find('.tip-wrap')
                        .html(
                            `<a href="/ask-agreement.htm" class="ask agree" target="_blank"><span class="blue">《约投顾问股服务协议》</span></a>`
                        );
                }
            }
        };
    };

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

/*///////////////////////////////////////////////////////////////////*/

var createElement = function() {
    return ` <div class="pay-confirm-overlay">
        <div class="pay-confirm-box">
            <div class="title">支付确认</div>
            <span class="close"></span>
            <div class="content">
                <div class="pay-item pay-item-confirm">
                    <div class="payment">
                        <div class="price">支付金额<span class="inline fr colorRed">￥<strong class="value inline"></strong></span></div>
                        <div class="name">订单描述<span class="value fr"></span></div>
                        <div class="orderNum">订单编号<span class="orderNum-value fr"></span></div>
                    </div>
                    <div class="defray-content">
                        <!-- 余额支付 -->
                        <div data-source="balance" class="defray-item clear type-nb">
                            <div class="rounded fr">
                                <label for="roundedOne"></label>
                            </div>
                            <div class="defray_radio defray-balance clear fl">
                                <div class="apyphoto fl"></div>
                                <div class="yn_pay fl">
                                    <p class="pay-title" style="position:relative;top:-6px;">余额支付<i class="balance-icon"></i><i class="balance-arrow"></i><span class="yn_balance"><span class="yn-balance-value"></span><a href="/html/recharge.htm" class="colorRed" target="_blank">去充值</a> </span></p>
                                </div>
                            </div>
                        </div>

                        <!-- 微信支付 -->
                        <div data-source="wechat" class="defray-item clear type-wx">
                            <div class="rounded fr">
                                <!--<input type="radio" id="roundedTwo" name="radio">-->
                                <label for="roundedTwo" class="label-wx"></label>
                            </div>
                            <div class="defray_radio defray-wechat clear fl">
                                <div class="apyphoto fl"></div>
                                <div class="yn_pay fl">
                                    <span class="pay-title">微信支付</span>
                                </div>
                            </div>
                        </div>
                        <!-- 支付宝 -->
                        <div data-source="alipay" class="defray-item clear type-alipay">
                            <div class="rounded fr thisclass ">
                                <!--<input type="radio" id="roundedThree" name="radio">-->
                                <label for="roundedThree" class="label-alipay"></label>
                            </div>
                            <div class="defray_radio defray-alipay clear fl">
                                <div class="apyphoto fl"></div>
                                <div class="yn_pay fl inline">
                                    <span class="pay-title">支付宝支付</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="agree-tip clear hide">
                        <span class="agree"><input type="checkbox" checked="checked"/><span class="txt">我已阅读并同意</span></span>
                        <span class="tip-wrap"><span>
                    </div>
                    <div class="submits">
                        <a id="pay-confirm-link" class="pay-btn jump" target="_blank">确认支付</a>
                    </div>
                </div>
                <div class="pay-item pay-item-tip hide">
                    <div class="payment">
                        <p>支付完成前，请不要关闭此支付验证窗口</p>
                        <p><strong>请在2小时内支付，超时将关闭订单</strong></p>
                        <div class="submits">
                            <a class="wrong pay-btn" href="http://us.yuetougu.com/help.htm" target="_blank">支付遇到问题</a>
                            <a class="finish pay-btn">支付完成</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};
