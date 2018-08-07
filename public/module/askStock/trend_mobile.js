/*
        牛人看涨看跌
        var m = require('m/trend.js')
        $(function(){
            m.init({wrap})
            m.render()
        })
*/
var local = require('m/lib/localData.js')

var createItems = arr => {
    return _.map(arr, item => {
        return `<div class="up_list" data-code="${item.stockcode}">
                        <div class="up_msg">
                            <span>${item.stockname}</span>
                            <span class="price"></span>
                            (<span class="up-per"></span>)                                                         
                        </div>
                        <div class="up_ratio">
                            <span class="ratio_left" style="width:${item.upWidth}%;"></span>
                            <span class="ratio_right" style="width:${item.downWidth}%;"></span>
                        </div>
                        <div class="person_num">
                            <span class="p_up">${item.onNum}人看涨</span>
                            <span class="p_down">${item.downNum}人看跌</span>
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
        if(data.status == 1){
            callback(data)
            local.set(key, data)
        }
    })
}


module.exports = function() {
    var container, items

    return {
        init(ops) {
            var self = this;
            var wrap = ops.wrap || $("body")

            container = $('#tag');
            items = container.next().find('.up')


            container.on('click', '.rising-type', function() { 
                container.next().find('.answer').hide()
                container.next().find('.hotStock').hide()
                $(this).parent().find('.active').removeClass("active");
                $(this).addClass("active");
                var type = $(this).data("id");
                self.render({ type })
            })
        },

        render(ops) {
            items.show()
            ops = _.extend({
                page: 1,
                size: 5,
                type: 0 // 0=涨, 1=跌
            }, ops)
            getData(ops, data => {

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
                items.find('.up_list').each(function() {
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
            })
        },
        hidden() {
            items.hide();
        }
    }
}()
