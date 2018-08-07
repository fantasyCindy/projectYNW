/* 
    倒计时
    run({$el, done}) // 开始倒数
    cancel() // 取消还原
*/

var countDown = (function () {
    var timer = null;
    var originValue = null; // 初始值
    var el = null

    return {
        run({
            $el, // jquery
            done // function
        }) {
            el = $el
            originValue = el.text()
            timer = setInterval(function () {
                var value = +el.text()
                if (value > 1) {
                    value -= 1
                    el.text(value)
                } else {
                    if (typeof done == "function") {
                        done()
                    }
                    countDown.cancel()
                }
            }, 1000)
        },
        cancel() {
            clearInterval(timer)
            el.text(originValue)
            timer = null
        }
    }
})()


module.exports = countDown