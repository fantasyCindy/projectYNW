/* 使用layer2.js */

module.exports = function() {

    //common
    var container, box,
        msg_container, msg_title, msg_close,
        confirm_container, confirm_callback, confirm_content,
        confirm_visible = false,
        msg_visible = false

    var tag = `<div id="layer-item-container" class="hide">
                <div class="layer-item-wrap">
                    <div class="layer-item-box">
                        <div id="layer-item-msg" class="layer-item hide">
                            <span class="layer-item-icon layer-item-"></span>
                            <span class="layer-item-title"></span>
                            <span class="layer-item-icon close hide"></span>
                        </div>
                        <div id="layer-item-confirm"  class="layer-item hide">
                            <div class="confirm-title">温馨提示</div>
                            <div class="confirm-content"></div>
                            <div class="buttons">
                                <span class="inline confirm-btn no">取消</span>
                                <span class="inline confirm-btn yes">确定</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

    var animate = function() {
        var animateType = {
            pop: "transition.expandIn",
            down: "transition.slideDownIn"
        }
        box.velocity(animateType.pop, { duration: 200 });
    }


    var commonInit = _.once(function() {
        $('body').append(tag);
        container = $("#layer-item-container");
        box = container.find('.layer-item-box');

        //设置高度
        var height = _.min([document.body.clientHeight, $(window).height()]);
        container.height(height);
        container.on('click', '.close', () => container.hide()); //关闭
        container.on('click', '.no', () => container.hide()); //取消

        //确定
        container.on('click', '.yes', function() {
            confirm_callback();
            container.hide();
        })
    })

    var msgInit = _.once(function() {
        msg_container = $('#layer-item-msg');
        msg_title = msg_container.find('.layer-item-title');
        msg_close = msg_container.find('.layer-item-icon.close');
    })

    var confirmInit = _.once(function() {
        confirm_container = $('#layer-item-confirm');
        confirm_content = confirm_container.find('.confirm-content');
    })

    var msgCommon = function(txt) {
        commonInit();
        msgInit();
        if (confirm_visible) confirm_container.hide();
        msg_title.text(txt);
        container.show();
        msg_container.show();
        animate();
        msg_visible = true;
    }

    return {
        msg: function(txt) {
            msgCommon(txt);
            msg_close.hide();
            setTimeout(() => container.hide(), 1000)
        },

        //alert
        alert: function(txt) {
            msgCommon(txt);
            msg_close.show();
        },

        confirm: function(txt, callback) {
            commonInit();
            confirmInit();
            confirm_callback = callback;
            confirm_content.text(txt);
            if (msg_visible) msg_container.hide();
            container.show();
            confirm_container.show();
            animate();
            confirm_visible = true
        },
        close: function() {
            container.hide();
        }
    }
}()
