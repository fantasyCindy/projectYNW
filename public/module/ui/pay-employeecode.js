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

require('./pay-employeecode.css')

var ErrorCode = require('../lib/errorCode.js');

module.exports = (function() {

    var instance = null;

    var createInstance = function() {
        var container



        $("body").append(createElement());

        container = $('#pay-employeecode');


        //关闭
        container.on('click', '.pay-cancel', function() {
            container.hide()
            container.find('input').val('')
        })

        //确定
        container.on('click', '.pay-sure', function() {
            console.l
            var val = _.trim(container.find('input').val())
            container.hide()
            instance.onSubmit && instance.onSubmit(+val)
        })






        return {
            render: function() {
                // console.log('options', options)
                // _.extend(ops, options);
                container.velocity('transition.expandIn', { duration: 300 })
            }
        }
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance()
            }
            return instance;
        }
    }

})()


/*///////////////////////////////////////////////////////////////////*/


var createElement = function() {
    return ` <div id="pay-employeecode">
        <div class="pay-container">
            <div class="pay-employee-title">请输入邀请码</div>
            <div class="pay-employee-input"><input type="text"></div>
            <div class="pay-employee-bar">
                <span class="pay-btn pay-sure">确定</span>
                <span class="pay-btn pay-cancel">取消</span>
            </div>
        </div>
    </div>`
}
