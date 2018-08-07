var ajax = require('m/ajax.js')
var Day = require('m/lib/day.js')
var errorCode = require('m/lib/errorCode')

var href = window.location.href;
if (/#register/.test(href)) {
    $('.activeLayer').show()
    window.location.hash = ""
}


//赠送内参
var create = item => {
    return `<div class="status">${item._text}</div>
            <div class="up clear">
                <div class="head fl"><img src="${item.productImg}" alt=""></div>
                <div class="txt fr">
                    <div class="title">${item.title}</div>
                    <span class="txt-left f13">
                        <span class="price"><span class="colorRed f16">${item.price}</span>（元）</span>
                    <span class="priceText">价格</span>
                    </span>
                    <span class="txt-left f13">
                        <span class="price"><span class="colorRed f16">${item.updatefrequency}</span>（条）</span>
                    <span class="priceText">每交易日更新频率</span>
                    </span>
                </div>
            </div>
            <div class="middle">
                <div class="msg name">${item.puiblisher}<span class="refer-icon"></span></div>
                <div class="msg">投资顾问<span class="colorRed"> 证书编号${item.certificate_num}</span></div>
                <div class="msg">运行时间：${item.startTime}至${item.endTime}</div>
            </div>
            <div class="dayCount">
                <span class="line"></span>
                <span class="point"></span>
                <span class="text">${item.runText}</span>
            </div>
            <div class="success-last">
                <div class="colorRed title">[内参介绍]</div>
                <div class="msg">${item.productInfo}</div>                      
            </div>`
}


var activity = (function() {
    var container, free, register, view,
        close, form1, form2,
        active, success, phone, picCode,
        phoneCode, passWord, checkBox,
        side, sideClose, refer

    return {
        init: function() {
            container = $('.activeLayer');
            active = container.find('.activity-wrap')
            success = container.find('.activify-success') // 领取成功
            form1 = active.find('.activity-form1')
            form2 = active.find('.activity-form2')
            free = active.find('.btn1')
            register = active.find('.btn2')
            view = success.find('.success-btn')
            close = $('.activity-close')
            picCode = container.find('.pic')
            phoneCode = container.find('.pcode')
            passWord = container.find('.password')
            checkBox = container.find('.radio input')
            side = $('.activeSide')
            refer = $('.success-refer')


            //侧边栏点击出弹窗
            side.on('click', '.activeOut', function() {
                activity.render()
            })
            side.on('click', '.activeClose', function() {
                side.hide()
            })

            //输入手机号
            free.on('click', function() {
                phone = _.trim(form1.find('.phone input').val())
                var isValid = /^0?1[34578][0-9]{9}$/.test(phone)
                if (!isValid) {
                    layer.msg('手机号码输入有误，请重新输入')
                    return
                }
                $.post('/app/record_phone.htm',{phone: phone, source: 0}, back => {
                    if(back.status == '1'){
                        form1.hide().find('.phone input').val('')
                        form2.show().find('.phone input').val(phone)
                    }
                },'json')              
            })

            //随便看看
            close.on('click', function() {
                activity.closed()
            })
            //关闭弹窗
            container.on('click','.actTopClose', function(){
                activity.closed()
            })

            //图形验证码
            picCode.find('.picCode').click(function() {
                $(this).attr('src', '/validCode.htm?' + _.now())
            })


            //获取验证码
            phoneCode.on('click', '.phoneCode', function() {
                var imgCode = _.trim(picCode.find('input').val());
                var isValid = /^[0-9A-Za-z]+$/.test(imgCode)
                if (!isValid) {
                    return layer.msg('图形验证码错误')
                }
                $.post('/sendPhoneCode.htm', {
                    phone: phone,
                    phone_imgcode: imgCode,
                    source: 2
                }, back => {
                    if (back === "-1") {
                        layer.alert("短信发送失败，请重试!");
                    }
                    if (back === "13") {
                        layer.alert("图片验证码错误");
                    }
                    if (back === "success") {
                        phoneCode.find('.phoneCode').html("<span id='sendCount'>300</span>秒后再次获取!");
                        phoneCode.find('.phoneCode').attr('disabled', true);
                        var timer = setInterval(function() {
                            var count = $("#sendCount");
                            var value = Number(count.text());
                            if (value > 1) {
                                value--
                                count.text(value);
                            } else {
                                phoneCode.find('.phoneCode').get(0).disabled = false;
                                phoneCode.find('.phoneCode').html("获取手机验证码");
                                clearInterval(timer);
                                picCode.find('.picCode').click()
                            }
                        }, 1000);
                    }
                })
            })


            var getShort = str => str.match(/^[\d\-]+/)[0]
            var handle = item => {
                    item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];

                    var short_start = getShort(item.startTime),
                        short_end = getShort(item.endTime),
                        short_now = getShort(item.systemTime),
                        day_end = new Day(short_end),
                        day_now = new Day(short_now),
                        runCount = Math.abs(day_now.offset(short_start)) + 1,
                        totalRunCount = day_end.offset(short_start)

                    var runTextTable = {
                        0: () => `已服务${runCount}天`,
                        1: () => `${--runCount}天后开始服务`,
                        2: () => `共运行${totalRunCount}天`
                    }

                    item.runText = runTextTable[item.productStatus]()
                    return item
                }
                //注册
            register.on('click', function() {
                var params = {
                    phone: phone,
                    pwd: _.trim(passWord.find('input').val()),
                    phoneCode: _.trim(phoneCode.find('input').val()),
                }
                if (!/^0?1[34578][0-9]{9}$/.test(params.phone)) {
                    return layer.msg('请输入正确的手机号码')
                }
                if (!params.phoneCode) {
                    return layer.msg("请输入短信验证码")
                }
                if (!/^[0-9a-zA-Z_]{6,16}$/.test(params.pwd)) {
                    return layer.msg('密码只能包含字母数字下划线且6-16位')
                }
                var check = checkBox.is(':checked')
                if (!check) {
                    return layer.msg('请阅读网站注册协议')
                }
                $.post('/user/phoneFastRegister.htm', params, back => {
                    if (back.status == '1') {
                        $('.activity-bg-done').show() //显示花边背景
                        refer.html(create(handle(back.data)))
                        active.hide();
                        success.show();
                    } else {
                        layer.msg(errorCode[back.status])
                    }
                }, 'json')
            })
        },
        render: function() {
            container.show()
        },
        closed: function() {
            container.hide()
            active.show()
            form1.show()
            form2.hide()
            success.hide()
            container.find('input').val('')
            $('.activity-bg-done').hide()
        }
    }
})();

module.exports = activity
