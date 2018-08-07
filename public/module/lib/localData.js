/**
 *
 *    本地缓存数据
 * 
 * ---- get(key, {disable, timeout}) 
 * 
 *             key : localStorage中的key
 *             disable : Boolean , 是否禁用缓存, 默认false
 *             timeout :  Number , 缓存时间(单位:秒) , 默认5分钟
 *             return :  undefine || { data, valid } 
 *
 *  ---- set(key, value)
 *          
 *  ---- joinKey  :　拼接对象值的为字符串 : 将查询字符作为key时使用
 *  
 *  
 *
 * 
 */


var JSON = window.JSON || false;
var db = localStorage


var set = function(key, value) {
    if (!(JSON && key)) return;
    value = [_.now(), JSON.stringify(value)].join('@@@@')
    db.setItem(key, value)
}


var get = function(key, ops) {

    if (!(JSON && key)) return;

    ops = _.extend({
        disable: false,
        timeout: 3000
    }, ops)
    
    var val = db.getItem(key)
    if (!(val && /@@@@/.test(val))) return;

    var split = val.split('@@@@');
    var data = JSON.parse(split[1]);
    var time = split[0]

    // 判断是否超时
    var valid = !ops.disable && _.now() - time <= ops.timeout * 1000;
    return { data, valid }
}


module.exports = {
    set,
    get,
    joinKey: function(obj) {
        var r = []
        for (var key in obj) {
            r.push(String(obj[key]))
        }
        return r.join("")
    }
}
