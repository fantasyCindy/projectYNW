/*
    热问股票
    var hot = require('m/hotStock.js')

    $(function(){
        hot.init()
        hot.render()
    })

*/

var local = require('m/lib/localData.js')
var error = require('e/error-type')

module.exports = (function() {
    var container, items, query = {
            size: 5,
            page: 1
        },
        count = 0


    var getData = function(callback) {
        var key = 'hot-ask-stock' + local.joinKey(query)
        var cache = local.get(key, { timeout: 3600 })
        if (cache && cache.valid) {
            return callback(cache.data)
        }
        $.getJSON("/consultation/queryHotStock.htm", {
            pageSize: query.size,
            currentPage: query.page
        }, data => {
            callback(data)
            local.set(key, data)
        });
    }

    var createItems = arr => {
        return _.map(arr, item => {
            return `<div class="stock_list" data-code="${item.stockcode}">
                        <div class="stock_left">
                            <p class="stock_name">${item.stockname}</p>
                            <p class="stock_number">${item.stockcode}</p>
                        </div>
                        <div class="stock_middle">
                            <p class="stock_up price"></p>
                            <p class="stock_down up-per"></p>
                        </div>
                        <div class="stock_right">
                            <p class="ask_txt">提问次数</p>
                            <p class="ask_times">${item.questionstockcount}</p>
                        </div>
                    </div>`
        }).join('')
    }


    return {
        init(ops) {
            container = $('#yn_askDetail');
            items = container.find('.hotStock')
        },
        render() {
            items.show()
            getData(data => {
                if (data.status == 1) {
                    items.html(createItems(data.data.list))
                    //查询股票价格
                    items.find('.stock_list').each(function() {
                        var price = $(this).find('.price');
                        var up = $(this).find('.up-per')
                        yn.queryStock($(this).data('code'), {
                            handle: true,
                            color: true
                        }).done(data => {
                            price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
                            up.html(data[33]);
                        })
                    })
                }else{
                    return layer.msg(error[data.status])
                }

            })
        },
        hidden() {
            items.hide()
        }
    }
})()
