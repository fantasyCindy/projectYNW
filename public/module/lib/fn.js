/*  覆盖对象  */

var override = function(source, target) {
    if (!target) return source;
    for (var key in source) {
        if (target[key]) {
            source[key] = target[key]
        }
    }
    return source;
}

var extend = override;

/* 检测手机号 */

var isMobile = function(number) {
    number = number.toString()
    return /^1[34578][0-9]{9}$/.test(number)
}


// 清除无效字符
var clear = str => {
    if (typeof str != 'string') return str;
    var match = str.match(/[\u4e00-\u9fa50-9a-zA-Z，。？：:（）]+/g);
    if (!match) return str;
    return match.join("");
};


// 限制个数
var limit = (str, len) => {
    if (typeof str != 'string') return str;
    return str.length < len ? str : str.substr(0, len) + ".."
}


// 清除格式
var filterHTML = str => {
    if (typeof str != 'string') return str;
    return str.replace(/<.+?>|&nbsp;/g, "");
}


/* 
    清除格式
    str : 内容
    len : 限制长度

 */

var clean = (str, len) => {
    return limit(clear(filterHTML(str)), len)
}

var stockPrefix = code => {
    code = String(code);
    var prefix = { "0": "sz", "3": "sz", "6": "sh" };
    return prefix[code.substr(0, 1)] + code;
};


/* export */

module.exports = {
    override,
    isMobile,
    filterHTML,
    limit,
    clean,
    extend,
    clear,
    stockPrefix
}
