/*  添加自选
    send对象: {stockcode, stockname, [user_id]}
*/
var error = require('e/error-type');
var add = function(send, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        user_id: ynUserId //默认添加到当前用户
    }, ops)
    if (!send || !send.stockname || !send.stockcode) {
        console.log("添加自选参数错误", send);
        return;
    }
    send.user_id = ops.user_id;

    //查询是否已存在
    module.exports.get(send.user_id).done(function(data) {
        var flag = true;
        _.forEach(data, function(item) {
            if (+item.stockcode == +send.stockcode) {
                layer.msg("已存在");
                flag = false;
            }
        });
        if (flag) {
            $.post('/addOpStock.htm', send, function(data) {
                data = JSON.parse(data)
                if (data.status == '1') {
                    layer.msg("添加自选成功")
                    defer.resolve();
                } else {
                    return layer.msg(error[data.status]) }
            })
        }
    })
    return defer.promise();
}


/*删除自选股*/
/*参数(stockname, stockcode, [user_id], id(股票id))*/
var remove = function(send, ops) {

    var defer = $.Deferred();
    ops = _.extend({
        user_id: ynUserId //默认添加到当前用户
    })
    send.user_id = ops.user_id;
    if (!send && !send.stockname & !stockCode && !send.id) {
        layer.msg("参数错误");
        return;
    }
    $.get('/deleteOpStock.htm', send, function(data) {
        data = JSON.parse(data)
        if (data.status == '1') {
            defer.resolve(send.stockCode);
        } else {
            layer.msg("删除自选股失败...");
            defer.reject(send.stockCode);
        }
    })
    return defer.promise();
}


//查询我的自选股
/*默认获取当前用户id*/
var get = function(ops) {
    ops = _.extend({
        userid: ynUserId //用户id
    })
    var defer = $.Deferred();
    $.getJSON("/queryOp.htm", { user_id: ops.userid }, function(data) {
        if (data.status == 1) {
            data.data = _.chain(data.data).filter(function(item) {
                return item.stockInfo
            }).map(function(item) {
                return handleItem(item);
            }).value()
            defer.resolve(data.data);
        }

    })

    function handleItem(item) {

        var data = eval(item.stockInfo);
        var open = yn.setDecimal(+data[1]);
        var yesterday = data[2];
        var now = yn.setDecimal(data[3]) || open; //现价如果没有等于昨日收盘价
        var high = data[4];
        var low = data[5];
        var up = yn.setDecimal((now - yesterday) / yesterday * 100); //涨跌幅
        var money = yn.setDecimal(now - yesterday); //涨跌额

        //返回数据格式
        var result = {
            stockcode: item.stockcode,
            stockname: item.stockname,
            stockid: item.id,
            now: yn.colorValue(now, { left: now - open }),
            money: yn.colorValue(money),
            up: yn.colorValue(up, { suffix: "%" }),
            yesterday: yn.setDecimal(yesterday),
            open: yn.setDecimal(open),
            max: yn.setDecimal(high),
            min: yn.setDecimal(low)
        }
        return result
    }

    return defer.promise();
}

module.exports = {
    add,
    get,
    remove
}
