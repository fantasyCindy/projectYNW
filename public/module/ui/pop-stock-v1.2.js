//股票信息弹层

/*
    var popStock = require('../module/ui/popStock.js');
   
   $(function(){
        popStock.init();
        popStock.add(selector)
   })

    - selector : String : css选择器 ; 
    注意 : $(selector).data('code') 为有效的股票代码;
*/

require('./popStock.css');

module.exports = (function() {
    var body, container, name, code, now, up, money, open, top, bottom, hidden = true;

    var append = () => {
        body = $('body');
        var tag = `<div id="popStock"> 
                        <table> 
                            <tr><td colspan="3" class="title"><span class="name"></span><span class="code"></span></td></tr> 
                            <tr><td>当前价：<span class="now"></span></td> 
                            <td>涨跌幅：<span class="up"></span></td> 
                            <td>涨跌额：<span class="money"></span></td></tr> 
                            <tr><td>开盘价：<span class="open"></span></td> 
                            <td>最高价：<span class="top"></span></td> 
                            <td>最低价：<span class="bottom"></span></td></tr> 
                        </table> 
                    </div>`
        body.append(tag);
    }

    var hide = () => {
        setTimeout(() => {
            if (hidden) container.hide()
        }, 100)
    }

    var set = () => {
        container = $("#popStock");
        name = container.find('.name');
        code = container.find('.code');
        now = container.find('.now');
        up = container.find('.up');
        money = container.find('.money');
        open = container.find('.open');
        top = container.find('.top');
        bottom = container.find('.bottom');
    }

    var event = function() {
        //滑入POP取消隐藏
        container.mouseenter(() => hidden = false).mouseleave(() => {
            console.log("learve")
            hidden = true;
            hide();
        });
    }

    var render = $el => {
        //position

        var __top = $el.offset().top + $el.outerHeight();
        var __left = $el.offset().left;
        container.show().css({ top: __top + "px", left: __left + "px" })
        var codeValue = $el.data('code');

        queryStock(codeValue, {
            handle: true,
            color: true
        }).done(data => {
            name.html(data[0]);
            code.html(codeValue);
            now.html(data[3]);
            up.html(data[33]);
            money.html(data[34]);
            open.html(data[1]);
            top.html(data[4]);
            bottom.html(data[5]);
        })
    }

    return {
        init: function() {
            append();
            set();
            event();
        },
        add: selector => {
            body.on('mouseenter', selector, function() {
                render($(this))
            });
            body.on('mouseleave', selector, () => {
                hidden = true;
                hide();
            })
        }
    }
})()


var queryStock = function(code, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        handle: false, // 是否返回处理过的数据 : 截取2位小数, [33=涨跌幅, 34=涨跌额, 35=涨停价, 36=跌停价]
        color: false // 是否着色,对现价[3],涨跌幅[33]着色, 涨跌额[34]
    }, ops)
    var reg = /[0-9]{6,}/;
    if (!reg.test(String(code))) {
        console.log("queryStock : stock code is error...");
        return defer.reject();
    }

    var prefixs = { 0: "sz", 3: "sz", 6: "sh" };
    var prefix = prefixs[String(code).substr(0, 1)];
    $.ajax({
        cache: true,
        url: "http://hq.sinajs.cn/list=" + prefix + code,
        type: "GET",
        dataType: 'script',
        success: function(data) {
            var res = eval('hq_str_' + prefix + code + '.split(",")');
            if (res.length < 5) {
                return defer.reject();
            }
            if (parseInt(res[3]) === 0) {
                res[3] = res[2];
            }

            //格式化数据
            if (ops.handle) {
                res = _.map(res, function(item) {
                    var result = parseFloat(item);
                    if (result === 0) {
                        return "---"
                    }
                    if (!result) {
                        return item;
                    }
                    return setDecimal(item);
                })

                res[33] = setDecimal((res[3] - res[2]) / res[2] * 100); //涨跌幅
                res[34] = setDecimal(res[3] - res[2]); //涨跌额
                res[35] = setDecimal(res[1] * 1.1) //涨停价
                res[36] = setDecimal(res[1] * 0.9) //跌停价

                //成交量
                res[8] = function() {
                    return setDecimal(res[8] / 1000000) + "万手";
                }()

                // 成交额
                res[9] = function() {
                    if (res[9] == "---") {
                        return "---";
                    }
                    var value = res[9] / 10000;
                    if (value > 10000) {
                        value = setDecimal(value / 10000) + "亿元";
                    } else {
                        value = setDecimal(value) + "万元"
                    }
                    return value;
                }();

                //数据格式化前的值
                var now = res[1];

                //数据着色
                if (ops.color) {
                    res[1] = yn.colorValue(res[1], { //开盘价
                        right: res[2]
                    })
                    res[3] = yn.colorValue(res[3], {
                        left: res[34]
                    });
                    res[4] = yn.colorValue(res[4], { //最高价
                        right: now
                    })
                    res[5] = yn.colorValue(res[5], { //最低价
                        right: now
                    })
                    res[33] = yn.colorValue(res[33], {
                        suffix: "%"
                    }); //涨跌幅

                    res[34] = yn.colorValue(res[34]);
                    res[35] = yn.colorValue(res[35], { //涨停价
                        right: now
                    })
                    res[36] = yn.colorValue(res[36], { //跌停价
                        right: now
                    })
                }
            }
            defer.resolve(res);
        }
    });
    return defer.promise();
};


var setDecimal = function(origin, ops) {
    var number = parseFloat(origin);
    if (isNaN(number)) {
        console.log(`setDecimal error : ${origin} is not valid! `)
        return origin
    }
    ops = _.extend({
        step: 2,
        math: "floor"
    }, ops);

    if (number === 0) {
        return _.padRight("0.", ops.step + 2, "0")
    }

    //处理负数
    var prefix = "";
    if (number < 0) {
        number = Math.abs(number);
        prefix = "-";
    }

    //去掉多余的位数
    var step = +_.padRight("1", ops.step + 1, "0"); //相乘的基数:2=>100, 3=>1000
    var zoom = number * step;
    if (zoom < 1) return String(origin).match(/[0.]+[^0]/)[0];

    number = Math[ops.math](zoom) / step;
    var result = String(number).split(".");
    if (result.length < 2) {
        result[1] = "";
    }
    result[1] = _.padRight(result[1], ops.step, "0")
    return prefix + result.join(".");
}


/*  着色 */
var color = function(value, ops) {
    ops = _.extend({
        upColor: '#d53', //结果为正的颜色
        lowColor: "#390", //结果为负的颜色
        display: value,
        exp: () => +value > 0
    }, ops);

    //计算结果为负
    if (ops.exp()) {
        return `<span style="color: ${ops.upColor}">${ops.display}</span>`
    } else {
        return `<span style="color:${ops.lowColor}">${ops.display}</span>`;
    }
};
