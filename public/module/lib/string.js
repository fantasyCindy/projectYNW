/*///////////////////////////////////////////////////////////////////*/


//
var clear = str => {
    if (typeof str !== 'string') return str;
    var match = str.match(/[\u4e00-\u9fa50-9a-zA-Z，。？：:（）]+/g)
    return match ? match.join("") : str
}

//
var limit = (str, len) => str.length < len ? str : str.substr(0, len) + "...";

//
var filterHTML = str => {
    if (typeof str !== 'string') return str;
    return str.replace(/<.+?>|&nbsp;/g, "")
}

//清除格式+限制个数+清除无效字符
var clean = (str, len) => limit(clear(filterHTML(str)), len);

//股票添加链接
var AddCodeLink = ops => {
    ops = _.extend({
        code: "000001",
        className: "fire-pop-stock",
        show: "---"
    }, ops)
    var style = `style="background:rgb(235,235,235);padding:5px 10px;border:1px solid rgb(220,220,220);border-radius:2px;"`
    return `<a href="/marketLine.htm?stockcode=${ops.code}"  ${style} target="_blank" data-code="${ops.code}" class="${ops.className}">${ops.show}</a>`
}

/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    clear,
    limit,
    filterHTML,
    clean,
    AddCodeLink
}
