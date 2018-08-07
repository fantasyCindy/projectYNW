/**
 * 
 * 请使用 require('m/ui/pay-confirm-v1.2.js') 模块代替
 */


require('./pay-confirm.css')

var ErrorCode = require('../lib/errorCode.js');


var create = function() {
    return `<div class="pay-confirm-overlay hide">
    <div class="pay-confirm-box">
        <div class="title">支付确认</div>
        <span class="close fa fa-times-circle"></span>
        <div class="content">
            <div class="pay-item pay-item-confirm">
                <div class="payment">
                    <div class="name">支付项目：<span class="value" style="color:red"></span></div>
                    <div class="price">价格：<strong class="value"></strong>元</div>
                    <div class="submits">
                        <span class="pay-btn jump btna">立即支付</span><a id="pay-confirm-link" class="btnb pay-btn jump hide" href="" target="_blank">立即支付</a>
                    </div>
                    <div class="agree-tip clear hide">
                        <a href="" class="service fr agree" target="_blank">《<span class="blue">服务使用协议</span>》</a>
                        <a href="" class="risk fr agree" target="_blank">《<span class="blue">风险揭示书</span>》</a>    
                        <span class="agree fr"><input type="checkbox"/><span class="txt">我已阅读并同意</span></span>
                    </div>                  
                </div>
            </div>
            <div class="pay-item pay-item-tip hide">
                <div class="payment">
                    <p>支付完成前，请不要关闭此支付验证窗口</p>
                    <p><strong>请在2小时内支付，超时将关闭订单；</strong></p>
                    <div class="submits">
                        <a class="wrong pay-btn" href="http://us.yuetougu.com/help.htm" target="_blank">支付遇到问题</a>
                        <a class="finish pay-btn">支付完成</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
}

var pay = function() {
    var container, box, confirm, tip, name, price, link, submitLink,
        ops = {
            name: "支付名称",
            price: 0,
            link: "#",
            success: function() {
                layer.msg("支付成功");
            },
            fail: function() {
                layer.msg("支付失败");
            }
        };

    var payStatus = null; //支付状态

    return {
        init: function() {
            var self = this;
            $("body").append(create());
            container = $('.pay-confirm-overlay');
            box = container.find('.pay-confirm-box');
            confirm = $('.pay-item-confirm');
            tip = container.find('.pay-item-tip');
            name = container.find('.name .value');
            price = container.find('.price .value');
            link = $('#pay-confirm-link');

            //关闭
            container.on('click', '.close', function() {
                $.post("/web/getPayStatus.htm", function(data) {
                    if (data == "1" || data == "6") {
                        ops.success()
                    } else {
                        container.hide();
                        confirm.show();
                        tip.hide();
                        $('.agree input').attr('checked', false)
                    }
                })
            })

            //检查复选框状态 
            container.on('change', '.agree-tip input', function() {
                var flag = $(this).is(':checked')
                console.log("input", flag)
                if (flag) {
                    $('.btna').hide()
                    $('.btnb').show()
                } else {
                    $('.btna').show()
                    $('.btnb').hide()
                }
            })

            //立即支付
            container.on('click', '.jump', function() {
                var agree = container.find('.agree-tip');
                console.log(agree.is(":visible"))
                if (agree.is(":visible")) {
                    var flag = agree.find('input').is(':checked')
                    console.log("flag", flag)
                    if (!flag) {
                        layer.msg('请阅读风险提示书')
                        return false
                    }
                }
                confirm.hide();
                tip.show();
            })

            //支付完成
            tip.on('click', '.finish', function() {
                $.post("/web/getPayStatus.htm", function(data) {
                    if (data == "1" || data == "6") {
                        ops.success()
                    } else {
                        ops.fail(data);
                    }
                })
            })
        },
        render: function(_ops) {
            _.extend(ops, _ops);
            if (_ops.name == "内参订阅") {
                container.find('.agree-tip').show()
                var serviceLink = '/protocol.htm?refer=' + ops.orderid
                var riskLink = '/agreement.htm?refer=' + ops.orderid
                container.find('.agree-tip .service').attr('href', serviceLink)
                container.find('.agree-tip .risk').attr('href', riskLink)
            }
            container.show();
            box.velocity('transition.expandIn', { duration: 300 });
            name.text(ops.name);
            price.text(ops.price);
            link.attr('href', ops.link);
        }
    }
}()

pay.init();

/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    render: pay.render
}
