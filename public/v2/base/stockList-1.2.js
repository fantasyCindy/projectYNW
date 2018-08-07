/*
显示股票列表
    
var instance = require('../module/ui/stockList-1.2.js');
instance.get().render(ops);

    参数含义
    ops = {
        id: String --- 容器的ID(position = relative)
        listLen: Number, --- 列表长度(最大为10),
        left: Number, --- 定位(位置偏移值),
        top: Number, --- 定位(位置偏移值),
        onSelect({
            stockCode: String, --- 股票代码
            stockName: String, --- 股票名称
            stockPinyin: String, --- 股票拼音
            stockWrap: String --- $000001平安银行$
        }): Function --- 回调函数
    }


    示例
    stockList.get().render({
        id: 'showStockList',
        onSelect: (item, trigger) => {
            trigger.val('')
            alert(item.stockWrap)
        }
    })

*/


require('./stockList.css');
var local = require('./localData.js');

module.exports = (function() {
    var instance, domCache = {}

    // 创建实例
    var createInstance = function() {

        var isValidCode = val => {
            var a = /^[a-zA-Z]{2,5}$/.test(val); //拼音2-5
            var b = /^[036][0-9]{2,5}$/.test(val); //数字3-6
            return a || b
        }

        // 本地缓存前10条查询结果, 7天更新一次
        var getData = (code, callback) => {
            var key = `query-stock-${code}`;
            var cache = local.get(key, { timeout: 3600 * 24 * 7 })
            if (cache && cache.valid) {
                callback(cache.data)
                return;
            }
            $.getJSON(`/queryStock.htm?stockcode=${code}`, back => {
                if (back && back.length > 0) {
                    var data = _.take(back, 10);
                    callback(data)
                    local.set(key, data)
                }
            })
        }

        var createTags = (arr, ops) => {
            var prefixs = { 0: "深市", 3: "深市", 6: "沪市" };
            var tbody = _.map(arr, item => {
                var place = prefixs[String(item.stockcode).substr(0, 1)];
                return `<tr class="ynStockList"> 
                            <td class="place">${place}</td> 
                            <td class="stock_code">${item.stockcode}</td> 
                            <td class="stock_name">${item.stockname}</td> 
                            <td class="pinyin">${item.pinyin}</td> 
                          </tr>`;
            }).join("")
            return `<table>${tbody}</table>`;
        }

        //  实例方法
        return {
            render(ops) {
                // 参数
                ops = _.extend({
                    listLen: 5,
                    left: 0,
                    top: 0,
                    onSelect: function() {}
                }, ops);

                var e = {
                    trigger: null,
                    left: null,
                    top: null,
                    parent: null,
                    $list: null
                }

                // 如果DOM缓存可用, 则使用缓存
                if (domCache[ops.id]) {
                    _.extend(e, domCache[ops.id])
                } else {
                    e.trigger = $(`#${ops.id}`);
                    e.left = ops.left + "px";
                    e.top = e.trigger.height() + ops.top + "px";
                    e.parent = e.trigger.parent();
                    e.parent.append(`<div class="ynStcokListSpacial absolute" style="left:${e.left};top:${e.top}"></div>`)
                    e.$list = e.parent.find('.ynStcokListSpacial') // 股票列表对象

                    // 缓存DOM
                    domCache[ops.id] = e;
                }

                $(document).click(() => e.$list.hide())

                // 点击股票时回调
                e.parent.on('click', 'tr.ynStockList', function() {
                    e.$list.hide()
                    var code = $(this).find('.stock_code').text()
                    var name = $(this).find('.stock_name').text()
                    var pinyin = $(this).find('.pinyin').text()

                    ops.onSelect({
                        stockCode: code,
                        stockName: name,
                        stockPinyin: pinyin,
                        stockWrap: `$${code}${name}$`
                    }, e.trigger);
                    return false
                })

                // 监听键盘
                e.trigger.on('keyup', _.debounce(function() {
                    var val = $(this).val()

                    // 检查是否为有效股票代码
                    if (!isValidCode(val)) {
                        e.$list.hide()
                        return;
                    }
                    getData(val, back => {
                        var data = _.take(back, +ops.listLen) // 截取长度
                        e.$list.show().html(createTags(data, ops))
                    });
                }, 300, { leading: false, trailing: true }))

            }
        }
    }

    // 返回单例
    return {
        get() {
            if (!instance) {
                instance = createInstance()
            }
            return instance
        }
    }
})()
