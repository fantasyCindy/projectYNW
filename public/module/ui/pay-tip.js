/**
 *   使用 pay-confirm-v1.2.js 代替
 */


require('./pay-tip.css')

module.exports = (function() {
    var container, instance = null

    var createTag = function() {
        return `<div id="judgePay" class="hid">
                <p class="title"><span>支付提示</span></p>
                <i class="close fa fa-times-circle"></i>
                <div class="wrap">
                    <div class="payment">
                        <p class="mt20">支付完成前，请不要关闭此支付验证窗口</p>
                        <p class="mt20"><strong>请在2小时内支付，超时将关闭订单；</strong></p>
                        <p class="mt10">
                            <a class="wrong-btn" href="" target="_blank">支付遇到问题</a>
                            <a class="finish-btn" id="finishPay">支付完成</a>
                        </p>
                    </div>
                </div>
            </div>`
    }

    var createInstance = function() {
        container = $('#judgePay');
        yn.centerBox(container);
        container.on('click', '> .close', e => container.hide());
        container.on('click', '#finishPay', function() {
            $.post("/web/getPayStatus.htm", function(data) {
                if (data == "1" || data == "6") {
                    layer.msg('支付完成！感谢打赏老师！');
                    container.hide();
                    instance.success();
                    return
                }
                layer.msg('支付未完成！请稍后再试！');
            })
        })
        return {
            success() {
                console.log("success function not override...")
            },
            render() {
                $('body').append(createTag())
                container.show();
                container.velocity('transition.expandIn', { duration: 300 })
            }
        }
    }
    return {
        getInstance() {
            if (!instance) instance = createInstance();
            return instance;
        }
    }
})()
