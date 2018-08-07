var clear = str => str.match(/[\u4e00-\u9fa50-9a-zA-Z，。？：（）]+/g).join("");
var limit = (str, len) => {
    var _len = str.length;
    return _len < len ? str : str.substr(0, len) + "..."
}

//过滤HTML标签
yn.filterHTML = function(content, ops) {
    if (typeof content != 'string') return content
    ops = _.extend({
        substr: 0,
        discern: false,
        trim: false
    }, ops)

    var result = content.replace(/<.+?>/g, function(value) {
        if (value.indexOf("img") != -1) {
            return "[图片]"
        } else {
            return ""
        }
    });
    if (ops.substr > 0) {
        result = result.substr(0, ops.substr) + "...";
    }

    if (ops.discern) {
        result = yn.codeFormat(result);
    }
    if (ops.trim) {
        var matches = result.match(/[\u4E00-\u9FA5\w\d，。？！：:'"“”%-~\[\]]+/g);
        result = matches.join("");
    }
    return result;
}


module.exports = {
    clear: clear,
    limit: limit,
    filter: filter
}
