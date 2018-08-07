/**
 *  大盘指数
 *  var market = require()
 *  market.render({container})
 */

var local = require('m/lib/localData.js')

var isStop = (function() {
    var now = new Date(_.now())
    var hour = now.getHours();
    var minute = now.getMinutes();

    // 09:30 => 15:30
    return hour > 15 || hour < 9 || (hour == 15 && minute > 30) || (hour == 9 && minute < 30);
})()

module.exports = function() {
    var container, layout;
    var cacheData = [];
    var timer;

    var getData = callback => {

        var handleData = function(data) {
            data.curdot = yn.setDecimal(data.curdot);
            var rate = parseFloat(data.rate);
            data.color = rate > 0 ? "red" : "green"
            if (rate === 0) {
                data.color = "gray";
            }
            return data;
        }

        $.getJSON("/html/querySinaMarketData1.htm", data => {
            callback(_.map(["上证指数", "深证成指", "中小板指", "创业板指"], item => handleData(data.market[item])));
        });

    }

    var createHTML = (data, index) => {
        return `<div id="mi-${index}-color" class="marketIndex-item ${data.color}">
                        <div class="line1">
                            <span id="mi-${index}-name" class="name">${data.name}</span>
                            <span id="mi-${index}-curdot"  class="curdot">${data.curdot}</span>
                            <span class="icon"></span>
                        </div>  
                        <div class="line2">
                            <span id="mi-${index}-curprice"  class="price">${data.curprice}</span>
                            <span id="mi-${index}-rate"  class="rate">${data.rate}</span>
                        </div>
                    </div>`
    }

    // 比较数据是否变化
    var isEqual = function(a, b) {
        if (!a || !b) return false;
        var result = true;
        _.forEach(a, (item, index) => {
            if (item !== b[index]) {
                result = false;
            }
        })
        return result
    }

    var compile = function() {
        if (isStop) {
            clearInterval(timer);
            timer = null;
        }
        
        getData(data => {
            _.forEach(data, (item, index) => {
                if (!isEqual(item, cacheData[index])) {
                    var tag = createHTML(item, index);
                    container.find('td').eq(index).html(tag);
                    cacheData[index] = item;
                }
            })
        })
    }

    return {
        render: function(ops) {
            container = ops.container;
            layout = ops.layout || "line"
            var types = {
                line: '<table class="line" id="MarketIndex"><tr><td></td><td></td><td></td><td></td></tr></table>',
                column: '<table class="column" id="MarketIndex"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>'
            }
            container.html(types[layout]);
            compile();
            timer = setInterval(function() {
                compile();
            }, 5000)
        }
    }
}()
