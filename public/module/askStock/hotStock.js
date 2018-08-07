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
        $.getJSON(__path + "/consultation/queryHotStock.htm", {
            pageSize: query.size,
            currentPage: query.page
        }, data => {
            callback(data)
            local.set(key, data)
        });
    }

    var createItems = arr => {
        return _.map(arr, item => {
            return ` <a class="item block" href="/marketLine.htm?stockcode=${item.stockcode}" target="_blank" data-code="${item.stockcode}">
                        <p class="stockcode" data-id="${item.stockcode}">${item.stockname}${item.stockcode}
                            <sapn class="asknumber fr">${item.questionstockcount}人提问</span>
                        </p>
                        <p class="stockInfo"><span class="price"></span><span class="up"></span><span class="money"></span></p>
                    </a>`
        }).join('')
    }


    return {
        init(ops) {
            var tag = `<div id="hotAsk" class="frame">
                        <div class="title">
                            <span class="fa-online"></span>
                            <span class="text">热问股票</span>
                        </div>
                        <div class="action">
                            <span class="text">换一批</span>
                            <i class="fa fa-refresh"></i>
                        </div>
                        <div class="content"></div>
                    </div>`

            var wrap = ops.wrap || $("body")
            wrap.append(tag);
            container = $('#hotAsk');
            items = container.find('.content')

            // 换一换
            container.on('click', '.action', () => {
                count++;
                query.page = count % 2 + 1;
                this.render()
            })
        },
        render() {
            getData(data => {
                if (data.status == 1) {
                    items.html(createItems(data.data.list))

                    //查询股票价格
                    items.find('.item').each(function() {
                        var price = $(this).find('.price');
                        var up = $(this).find('.up')
                        var money = $(this).find('.money');
                        yn.queryStock($(this).data('code'), {
                            handle: true,
                            color: true
                        }).done(data => {
                            price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
                            up.html(data[33]);
                            money.html(data[34]);
                        })
                    })
                }else () => {return layer.msg(error[data.status])}

            })
        }
    }
})()
