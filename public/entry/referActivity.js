var Confirm = require('m/ui/pay-any-package.js');

var dragVerify = require('m/drag-verify')
var error = require('e/error-type');

var buy = (function() {
    var referData = ''
    var pop = $('#pay-employeecode')
    var employeecode = ''

    var reset = function() {
        pop.find('input').val('')
    }

    return {
        init: function() {
            pop.on('click', '.pay-sure', function() {

                employeecode = pop.find('input').val()

                if (!employeecode) {
                    return layer.msg('请输入邀请码')
                }

                $.getJSON('/reference/activityRefer.htm', back => {
                    if (back.status == '1') {
                        referData = back.data
                        $.post("/app/buyGoodsPayOrder.htm", {
                            goodsId: referData.id, //商品id
                            goodsType: 3,
                            buy_number: 1,
                            pay_source: 0,
                            employeecode: employeecode
                        }, function(back) {
                            if (back.status == 60011) {
                                return layer.msg("用户没有开通账户!请联系客服!")
                            }
                            if (back.status == 60023) {
                                return layer.msg("商品购买时间已过")
                            }
                            if (back.status == 60020) {
                                layer.msg('商品已购买')
                                setTimeout(function() {
                                    window.location.href = __path + '/backstage/myRefer.htm'
                                }, 1000)
                                return
                            }
                            if(back.status == 60023){
                                layer.msg('商品购买时间已过')
                                return
                            }

                            Confirm.payconfirm({
                                name: "内参订阅",
                                price: referData.price,
                                orderid: back.data.orderid,
                                orderNum: back.data.orderNum,
                                finish: true,
                                read: true,
                                success: () => window.location.href = __path + '/backstage/myRefer.htm'
                            })

                        }, 'json')
                    }
                })
                pop.hide()
            })

            pop.on('click', '.pay-cancel', function() {
                employeecode = pop.find('input').val()
                pop.hide()
                $.getJSON('/reference/activityRefer.htm', back => {
                    if (back.status == '1') {
                        referData = back.data
                        $.post("/app/buyGoodsPayOrder.htm", {
                            goodsId: referData.id, //商品id
                            goodsType: 3,
                            buy_number: 1,
                            pay_source: 0,
                            employeecode: employeecode
                        }, function(back) {
                            if (back.status == 60011) {
                                layer.msg("用户没有开通账户!请联系客服!")
                            }
                            if (back.status == 60020) {
                                layer.msg('商品已购买')
                                setTimeout(function() {
                                    window.location.href = __path + '/backstage/myRefer.htm'
                                }, 1000)
                                return
                            }
                            if(back.status == 60023){
                                layer.msg('商品购买时间已过')
                                return
                            }

                            Confirm.payconfirm({
                                name: "内参订阅",
                                price: referData.price,
                                orderid: back.data.orderid,
                                orderNum: back.data.orderNum,
                                finish: true,
                                read: true,
                                success: () => window.location.href = __path + '/backstage/myRefer.htm'
                            })

                        }, 'json')
                    }
                })
            })


        },
        render() {
            reset()
            pop.show()
        }
    }

})()

$(function() {
    buy.init()
})



var register = (function() {
    var content = $('#login_register'),
        container = content.find('.register'),
        phone = container.find('.r-phone'),
        pass = container.find('.r-pass'),
        message = container.find('.r-message'),
        imgcodeVal = container.find('.r-imgcode'),
        invite = container.find('.r-invite'),
        val_invite = null,
        imgCode = container.find('.image-code'),
        goBuy = $('.go-buy')


    var reset = () => container.find('input').val("")

    goBuy.on('click', function() {
        if (!ynIsLogin) {
            register.show()
            return
        }
        buy.render()
    })


    container.on('click', '.l-r-submit', _.debounce(function() {
        register.submit()
    }, 1000, { leading: true, trailing: false }))

    // 密码可见
    container.on('click', '.r-see', function() {
        var isSee = $(this).next().prop('type') == 'password'
        if (isSee) {
            pass.prop({ 'type': 'text' })
            $(this).removeClass('r-see').addClass('r-see1');
        }
    })

    container.on('click', '.r-see1', function() {
        var isSee = $(this).next().prop('type') == 'text'
        if (isSee) {
            pass.prop({ 'type': 'password' })
            $(this).removeClass('r-see1').addClass('r-see');
        }
    })

    // 短信验证
    container.on('click', '.r-code', function() {
        var val = _.trim(phone.val());
        if (!/^0?1[34578][0-9]{9}$/.test(val)) {
            layer.msg("请输入有效手机号")
            return;
        }

        var el = $(this)

        // var imgCode = _.trim(imgcodeVal.val())
        // if(!imgCode){
        //     return layer.msg('请输入图形验证码')
        // }


        //显示拖动验证窗口
        $('#popup-captcha').show()

        dragVerify(val, info => {
            var send = _.extend({ phone: val, source: 2 }, info)
            getPhoneCode(el, send)
        })

    })


    // 获取图片验证码
    imgCode.click(function() {
        $(this).attr('src', '/validCode.htm?' + _.now())
    })


    //关闭
    content.on('click', '.register-top-close', function() {
        content.hide()
        reset()
    })

    //去登录
    container.on('click', '.go-login', function() {
        reset()
        content.hide()
        yn.login.render()
    })
    return {
        show() {
            reset()
            content.show()
                // enterTarget = this
        },
        hidden() {
            reset()
            content.hide()
        },
        submit() {
            var val_phone = _.trim(phone.val())
            var val_pass = _.trim(pass.val())
            var val_message = _.trim(message.val())
            var val_imgCode = _.trim(imgcodeVal.val())
            val_invite = _.trim(invite.val())

            // validate

            if (!/^1[34578][0-9]{9}$/.test(val_phone)) {
                layer.msg("请输入有效手机号")
                return;
            }
            // if (!val_imgCode) {
            //     return layer.msg('请输入图形验证码')
            // }
            if (!/[0-9a-zA-Z_]{6,}$/.test(val_pass)) {
                layer.msg("请输入有效密码(字母数字下划线且至少6位)")
                return;
            }

            if (!val_message) {
                layer.msg("请输入短信验证码")
                return;
            }

            if (!container.find('.r-check').get(0).checked) {
                layer.msg("请先阅读遵守协议")
                return false
            }

            var param = {
                phone: val_phone,
                pwd: val_pass,
                phoneCode: val_message,
                employeecode: val_invite,
            }

            $.post("/user/webRegister.htm", param, data => {
                data = JSON.parse(data)
                if (data.status == '1') {
                    layer.msg('注册成功');
                    $.post('/public/login.htm', { "userName": param.phone, "password": param.pwd }, function(data) {
                        data = JSON.parse(data)
                        if (data.status == "1") {
                            window.location.reload()
                        }
                    })
                }
            })
        }
    }
})()

var getPhoneCode = function(btn, send) {
    btn.html("<span id='sendCount'>60</span>秒后再次获取!");
    btn.get(0).disabled = true;
    var timer = setInterval(function() {
        var count = $("#sendCount");
        var value = Number(count.text());
        if (value > 1) {
            value--
            count.text(value);
        } else {
            btn.get(0).disabled = false;
            btn.html("获取手机验证码");
            clearInterval(timer);
        }
    }, 1000);

    $.post("/sendPhoneCode.htm", send, function(data) {
        data = JSON.parse(data)
        if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
        if (data.status == 30002) return layer.msg("图片验证码错误")
    });
}


$('.referAct-zhanji').unslider();


var teacherVideo = (function() {
    var container = $('.video-pop');
    container.on('click', function() {
        var vid = $(this).data('vid')
        teacherVideo.show(vid)
    })


    var createVideo = function(vid) {
        var player = new YKU.Player('video-container', {
            styleid: '0',
            client_id: '70bee75ccf5b9678',
            vid: vid,
            autoplay: true,
            newPlayer: true,
            show_related: false //是否显示相关推荐
        });
    }
    return {
        show: function(vid) {
            createVideo(vid)
        }
    }
})()


/*
剩余名额
 */
var simulate = {
    0: { first: 0, second: 0, third: 8 },
    1: { first: 0, second: 0, third: 8 },
    2: { first: 0, second: 0, third: 8 },
    3: { first: 0, second: 0, third: 8 },
    4: { first: 0, second: 0, third: 8 },
    5: { first: 0, second: 0, third: 8 },
    6: { first: 1, second: 0, third: 0 },
    7: { first: 0, second: 9, third: 2 },
    8: { first: 0, second: 8, third: 3 },
    9: { first: 0, second: 7, third: 4 },
    10: { first: 0, second: 6, third: 6 },
    11: { first: 0, second: 6, third: 0 },
    12: { first: 0, second: 5, third: 3 },
    13: { first: 0, second: 4, third: 2 },
    14: { first: 0, second: 3, third: 5 },
    15: { first: 0, second: 2, third: 9 },
    16: { first: 0, second: 2, third: 2 },
    17: { first: 0, second: 1, third: 9 },
    18: { first: 0, second: 1, third: 5 },
    19: { first: 0, second: 1, third: 0 },
    20: { first: 0, second: 0, third: 8 },
    21: { first: 0, second: 0, third: 8 },
    22: { first: 0, second: 0, third: 8 },
    23: { first: 0, second: 0, third: 8 },
}
var places1 = $('.referAct-places1')
var places2 = $('.referAct-places2')
var places3 = $('.referAct-places3')
var time = 1000 * 3600 * 60

setInterval(function() {}, time)
var places = (function() {
    var h = new Date().getHours()
    places1.html(simulate[h].first)
    places2.html(simulate[h].second)
    places3.html(simulate[h].third)
})()
