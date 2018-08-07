/* 
    var layer = require('m/moblile/layer.js').get()

    layer.msg(msg, [callback]) --- 提示信息(自动消失)
    layer.alert(msg, [callback]) ---提示信息(点击消失)
    layer.confirm(msg, [callback]) ---确认操作


 */


require('./layer2.css')
module.exports = (function() {

    var instance;

    var create = function() {

        // var screenHight = $(window).height()

        var clickHanlder; // 点击时回调

        var tag = `<div id="module-mobile-layer">
                        <div class="box">
                            <div class="msg">
                                <div class="title">提示信息</div>
                                <div class="info">这里是提示内容</div>
                            </div> 
                            <div class="alert">
                                  <div class="title">提示信息</div>
                                  <div class="info">这里是提示内容</div>
                                  <div class="bottom">
                                        <span class="action" data-type="alert-yes">确定</span>
                                  </div>
                            </div> 
                            <div class="confirm">
                                  <div class="title">提示信息</div>
                                  <div class="info">这里是提示内容</div>
                                  <div class="bottom">
                                        <span class="action" data-type="confirm-no">取消</span>
                                        <span class="action" data-type="confirm-yes">确定</span>
                                  </div>
                            </div> 
                        </div> 
                   </div>`

        $('body').append(tag);
        var $container = $('#module-mobile-layer')
        var $msg = $container.find('.msg')
        var $alert = $container.find('.alert')
        var $confirm = $container.find('.confirm')

        /* event */

        $container.on('click', '.action', function() {
            hide()
            if (typeof clickHanlder == "function") {
                clickHanlder($(this).data('type'))
            }
        })

        //显示
        var render = function(type, val, callback) {
            type.find('.info').html(val);
            type.show()
            $container.show()
            clickHanlder = callback
        }

        var hide = function() {
            $container.fadeOut()
            $msg.hide()
            $alert.hide()
            $confirm.hide()
        }

        /* interface */

        return {
            msg(val, callback) {
                render($msg, val)
                setTimeout(function() {
                    hide();
                    if (typeof callback == "function") {
                        callback()
                    }
                }, 1500)
            },
            alert(val, callback) {
                render($alert, val, callback)
            },
            confirm(val, callback) {
                render($confirm, val, callback)
            }
        }
    }

    /* single Instance */
    return {
        get() {
            if (!instance) {
                instance = create()
            }
            return instance
        }
    }

})()
