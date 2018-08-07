/**
 *  随意赏弹窗
 *  var pay = require('m/lib/pay-any.js')	// 导入模块
 *  var instance = pay.getInstance()		// 创建/获取实例
 *  instance.render({
 *  	onSubmit : price => {
 *  		//点击立即打赏时的回调函数
 *  	}
 *  })
 */

var fn = require('m/lib/fn.js')

module.exports = (function() {
	
    var instance = null

    /* create instance */
    var createInstance = function() {

        $('body').append(createElement())

        var container = $('#playtour')
        var input = container.find('input')
        var balance = 0 //账户余额
        var $balance = container.find('.balance-value');

        yn.centerBox(container)

        /* event */

        // 关闭
        container.find('.close').click(e => container.hide())

        // 快捷输入
        container.find('.support-short-item').click(function() {
            $(this).addClass('thistype').siblings('.thistype').removeClass('thistype')
            input.val($(this).data('type'))
        })



        // 立即打赏
        container.find('.submit').click(function(e) {

            //验证价格
            var val = _.trim(input.val())
            if (!/^[1-9][0-9]*$/.test(val)) {
                return layer.msg("客官，真的不能再少了!");
            }

            // 验证余额
            // if (balance < 1) {
            //     return layer.msg("可用余额不足,请充值")
            // }

            container.hide()
            instance.onSubmit && instance.onSubmit(+val)
        })


        return {
            render(ops) {

                _.extend(this, ops)

                // 查询余额
                getBalance().done(data => {
                    $balance.text(data.balance)
                    balance = +data.balance;
                    // console.log($balance,data.balance,balance)
                })

                // 重置
                input.val("")
                $('.support-short-item.thistype').removeClass('thistype')

                container.velocity('transition.expandIn', { duration: 300 })
            }
        }
    }


    /* single */
    return {
        getInstance() {
            if (!instance) instance = createInstance();
            return instance
        }
    }

})()

/*///////////////////////////////////////////////////////////////////*/


// 查询账户余额
var getBalance = function() {
    var defer = $.Deferred();
    $.getJSON('/useraccount/pay_useraccountDetail.htm', {
        user_id: ynUserId
    }, data => defer.resolve(data))
    return defer.promise();
}

// 创建标签
var createElement = function() {
    return `<div id="playtour" class="hide">
		        <p class="title-1">打赏<span>（本次交易免密码）</span></p>
		        <i class="close fa fa-times-circle fa-2x"></i>
		        <div class="wrap">
		            <div class="getPrice">
		                <div class="group">
		                    <span class="support-short-item" data-type="2">2牛币</br><font>（等价2元）</font></span>
		                    <span class="support-short-item" data-type="16">16牛币</br><font>（等价16元）</font></span>
		                    <span class="support-short-item" data-type="58">58牛币</br><font>（等价58元）</font></span>
		                </div>
		                <div class="pleases">
		                    <span>随意赏:</span>
		                    <input type="text" placeholder="请输入整数(单位:元)"/>
		                    <span>牛币</span>
		                </div>
		                <p class="balance clear">
		                	<span class="fl" id="support-surplus">可用余额
		                	<strong style='margin:0 5px; color:red;' class="balance-value">0</strong>牛币</span>
		                	<a href="/html/recharge.htm" class="gopay fr" target="_blank">余额不足？去充值</a>
		                </p>
		                <div class="info">
		                    <span>赠送无悔，概不退款</span>
		                    <span class="submit fr">立即打赏</span>
		                </div>
		            </div>
		        </div>
		    </div>`
}
