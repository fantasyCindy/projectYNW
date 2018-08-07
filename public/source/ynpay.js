var ynpay = {}

/**
 * 支付确认窗口
 *  var confirm = PayConfirm.getInstance();
    confirm.render({
        name: "组合支付",
        price: '2048,
        link: "/html/returnshortcutpayJsp.htm?orderNum=2568953"
    })
 */
var PayConfirm = function() {
    var instance = null;
    var createInstance = function() {
        var container, name, price, link
        return {
            name: "",
            price: 0,
            link: "",
            event: _.once(function() {
                container.on('click', '.close', function() {
                    container.hide();
                })

                container.on('click', '.submit', function() {
                    container.hide();
                    var tip = PayTip.getInstance();
                    tip.render();
                })
            }),
            render: function(ops) {
                var self = this;
                _.extend(this, ops);

                if (container) {
                    self.visible();
                    return;
                }

                var tag = function() {
                    return `<div id="PayConfirm">
                        <div class="title">支付确认</div>
                        <div class="close fa fa-times-circle"></div>
                        <div class="content">
                            <div class="name">支付项目：<strong>${self.name}</strong></div>
                            <div class="price">价格：<strong style="color:red">${self.price}</strong>元</div>
                        </div>
                        <div class="submits"><a class="submit" href="${self.link}" target="_blank">立即支付</a></div>
                    </div>`
                }()

                $('body').append(tag);
                container = $("#PayConfirm").velocity('transition.expandIn', { duration: 300 });
                name = container.find('.name strong');
                price = container.find('.price strong');
                link = container.find('.submit a');
                yn.centerBox(container);
                self.event();
            },
            visible: function() {
                container.show().velocity('transition.expandIn', { duration: 300 });
                name.text(this.name);
                price.text(this.price);
                link.attr('href', this.link);
            }
        }
    }
    return {
        getInstance: function() {
            return instance || (function() {
                instance = createInstance();
                return instance
            })()
        }
    }
}()


/**
 * 支付提示
 * <%@  include file="../common/moudule-judgePay.jsp" %>
 * var tip = PayTip.getInstance();
   tip.render();
 */
var PayTip = function() {
    var instance = null;
    var create = function() {
        var container = $('#judgePay');
        yn.centerBox(container);
        return {
            event: _.once(function() {
                //关闭
                container.on('click', '.close', function() {
                    container.hide();
                })

                //支付完成
                container.on('click', '#finishPay', function() {
                    yndata.payStatus().done(function(data) {
                        if (data == "1" || data == "6") {
                            layer.msg('支付完成！感谢打赏老师！');
                            container.hide();
                        } else {
                            layer.msg('支付未完成！请稍后再试！');
                        }
                    })
                })
            }),
            render: function() {
                container.show();
                this.event();
            }
        }
    }

    return {
        getInstance: function() {
            return instance || (function() {
                instance = create();
                return instance;
            })()
        }
    }
}()
