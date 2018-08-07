/* 观察者 */

class Observe {
    constructor() {
        this.queue = []
    }

    observable(obj) {
        var self = this
        return new Proxy(obj, {
            set: function(target, name, value) {
                if (target[name] === value) return;
                self.queue.forEach(fn => fn({
                    target,
                    name,
                    value
                }))
                target[name] = value
            }
        })
    }

    addListener(fn) {
        if (typeof fn !== "function") return;
        this.queue.push(fn)
    }
}


/*///////////////////////////////////////////////////////////////////*/

/* 职责链 */

class Chain {
    constructor(fn) {
        this.fn = fn
        this.next = null
    }

    next(next) {
        this.next = next
    }

    handle() {
        var ret = this.fn.apply(this, arguments);
        if (ret == "next") {
            return this.next && this.next.handle.apply(this.next, arguments);
        }
        return ret
    }
}

/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    Observe,
    Chain
}
