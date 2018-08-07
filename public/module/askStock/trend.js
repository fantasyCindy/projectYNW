/*
        牛人看涨看跌
        var m = require('m/trend.js')
        $(function(){
            m.init({wrap})
            m.render()
        })
*/

var local = require('m/lib/localData.js')
var error = require('e/error-type')

var createItems = arr => {
    return _.map(arr, item => {
        return `<div class="item" data-code="${item.stockcode}">
                <div class="stockcode">
                    <a href="/marketLine.htm?stockcode=${item.stockcode}" target="_blank">${item.stockname}${item.stockcode}</a>
                    <div class="inline chg fr stockInfo">
                        <span class="price"/marketLine.htm?stockcode=></span>
                        <span class="up"></span>
                        <span class="money"></span>
                    </div>
                </div>
                <div class="percent">
                    <div class="upline inline" style="width:${item.upWidth}%;"></div>
                    <div class="downline inline" style="width:${item.downWidth}%;"></div>
                </div>
                <div class="state">
                    <span>${item.onNum}人看涨</span>
                    <span class="fr">${item.downNum}人看跌</span>
                </div>
            </div>`
    }).join('')
}


//牛人看涨涨跌
var getData = function(ops, callback) {
    var key = 'stock-trend' + local.joinKey(ops)
    var cache = local.get(key, { timeout: 3600 })
    if (cache && cache.valid) {
        return callback(cache.data)
    }

    $.getJSON("/consultation/querySeeStockTrent.htm", {
        currentPage: ops.page,
        pageSize: ops.size,
        singtype: ops.type
    }, data => {
        callback(data)
        local.set(key, data)
    })
}


module.exports = function() {
    var container, items, loading

    return {
        init(ops) {
            var self = this;
            var wrap = ops.wrap || $("body")
            wrap.append(`
                <div id="rising">
                    <div class="title clear">
                        <span class="rising-type thisclass" data-id="0">牛人看涨</span>
                        <span class="rising-type" data-id="1">牛人看跌</span>
                    </div>
                    <div class="content"></div>
                </div>`)

            container = $('#rising');
            items = container.find('.content')
            loading = new yn.loading({ type: 2, container: items })


            container.on('click', '.rising-type', function() {
                $(this).parent().find('.thisclass').removeClass("thisclass");
                $(this).addClass("thisclass");
                var type = $(this).data("id");
                self.render({ type })
            })
        },

        render(ops) {
            ops = _.extend({
                page: 1,
                size: 5,
                type: 0 // 0=涨, 1=跌
            }, ops)
            loading.render()
            getData(ops, data => {
                if (data.status == 1) {
                    //设置比例
                    var rows = _.map(data.data.list, item => {
                        var total = (+item.onNum) + (+item.downNum);
                        item.upWidth = item.onNum / total * 100;
                        item.downWidth = item.downNum / total * 100;
                        return item;
                    })

                    rows = _.sortBy(rows, ['downWidth', 'upWidth'][ops.type])

                    items.html(createItems(rows))

                    //股票价格
                    items.find('.item').each(function() {
                        var price = $(this).find('.price');
                        var up = $(this).find('.up')
                        var money = $(this).find('.money');
                        yn.queryStock($(this).data('code'), {
                            handle: true,
                            color: true
                        }).done(function(data) {
                            price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
                            up.html(data[33]);
                            money.html(data[34]);
                        })
                    })
                }else  {return layer.msg(error[data.status]);}

            })
        }
    }
}()
