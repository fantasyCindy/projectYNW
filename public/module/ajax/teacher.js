var local = require('m/lib/localData.js')

//投顾老师相关数据

var recommend = function(ops, callback) {
    ops = _.extend({
        type: 0,
        row: 7
    }, ops);

    var key = 'live_list_recommend' + local.joinKey(ops)
    var cache = local.get(key, { timeout: 3600 })
    if (cache && cache.valid) {
        return callback(cache.data)
    }
    $.getJSON("/html/roomOrderList.htm", { orderStype: ops.type, rows: ops.row }, function(data) {
        data = _.compact(data);
        callback(data)
        local.set(key, data)
    });
}


// 直播大厅数据
var broadcast = function(ops, callback) {
    ops = _.extend({
        order: "attentionnumber", // pinyininitials按拼音排序
        sort: "desc", //desc=?
        type: 2 //1=最热, 2=观点最多, 3=互动最多
    }, ops)

    var key = 'live_list_broadcast' + local.joinKey(ops)
    var cache = local.get(key, { tiemout: 3600 })
    if (cache && cache.valid) {
        return callback(cache.data)
    }

    $.getJSON(__path + "/html/broadcastingList.htm", {
        order: ops.order,
        sort: ops.sort,
        type: ops.type
    }, data => {
        callback(data)
        local.set(key, data)
    })

}


//老师排行
var hot = function(ops, callback) {
    ops = _.extend({
        page: 1,
        row: 7,
        type: "total", //total=综合排名, ask=回答问题最多 ，emerging=新晋直播
        unit: null //统计单位:[null, "month"]
    }, ops);

    var send = {
        orderStype: ops.type,
        rows: ops.row,
    };

    var types = {
        total: 0,
        ask: 1,
        emerging: 2
    }
    send.orderStype = types[ops.type]

    if (ops.unit == "month") {
        send.monNum = 5;
    }

    var key = 'live_list_hot' + local.joinKey(send)
    var cache = local.get(key, { timeout: 3600 })
    if (cache && cache.valid) {
        return callback(cache.data)
    }

    $.ajax({
        url: "/html/teacherOrderList.htm?",
        data: send,
        dataType: 'json',
        success: function(data) {
            data = _.map(data, function(item, i) {
                item.index = i + 1;
                return item;
            });
            callback(data)
            local.set(key, data)
        }
    });
};

module.exports = {
    hot: hot,
    broadcast: broadcast,
    recommend: recommend
}
