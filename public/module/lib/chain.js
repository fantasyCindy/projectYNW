/**
 * 职责链
 */
var chain = function(fn) {
    this.fn = fn;
    this.next = null
}

chain.prototype = {
    handle: function() {
        var res = this.fn.apply(this, arguments);
        if (res == "next") {
            // 如果函数返回next, 则继续调用
            return this.next && this.next.handle.apply(this.next, arguments);
        }
        return res
    }
}

module.exports = chain
