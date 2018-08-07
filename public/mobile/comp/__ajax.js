function extend(source, target) {
    if (!target) return source
    for (var key in source) {
        if (target[key]) {
            source[key] = target[key]
        }
    }
    return source
}

var layer = require('m/mobile/layer.js')

module.exports = {
    getReferList(ops) {
        var param = extend({
            type: 4, //4 操盘绝学，5独家内参
            limit: 10, //请求条数
            sinceId: '', //起始ID
            direct: "" //请求方向 up down
        }, ops)

        $.getJSON('/app/vipOpinion.htm', param, back => {
            if (ops.callback && typeof ops.callback == 'function') {
                if (back.status == 1) {
                    ops.callback(back.data)
                } else {
                    layer.msg("error" + back.status)
                }
            }
        })
    }
}
