module.exports = function(code, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        handle: false, // 是否返回处理过的数据 : 截取2位小数, [33=涨跌幅, 34=涨跌额, 35=涨停价, 36=跌停价]
        color: false // 是否着色,对现价[3],涨跌幅[33]着色, 涨跌额[34]
    }, ops)
    var reg = /[0-9]{6,}/;
    if (!reg.test(String(code))) {
        yn.log("yn.queryStock : stock code is error...");
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
                    return yn.setDecimal(item);
                })

                res[33] = yn.setDecimal((res[3] - res[2]) / res[2] * 100); //涨跌幅
                res[34] = yn.setDecimal(res[3] - res[2]); //涨跌额
                res[35] = yn.setDecimal(res[1] * 1.1) //涨停价
                res[36] = yn.setDecimal(res[1] * 0.9) //跌停价

                //成交量
                res[8] = function() {
                    return yn.setDecimal(res[8] / 1000000) + "万手";
                }()

                // 成交额
                res[9] = function() {
                    if (res[9] == "---") {
                        return "---";
                    }
                    var value = res[9] / 10000;
                    if (value > 10000) {
                        value = yn.setDecimal(value / 10000) + "亿元";
                    } else {
                        value = yn.setDecimal(value) + "万元"
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