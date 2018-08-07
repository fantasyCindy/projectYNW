/*
显示股票列表
    
var slist = require('../module/ui/stockList.js');
slist.init();
slist.add(id, ops);


////////////////////////////////////////////////////////////

    - id: String / $el 
    - ops: {
        listLen: Number, // 列表长度,
        left: Number, //定位,
        top: Number, //定位,
        onSelect(item): Function //回调函数
    }

        item: {
            stockCode: String, //股票代码
            stockName: String, //股票名称
            stockPinyin: String, //股票拼音
            stockWrap: String // $000001平安银行$
        }
*/



require('./stockList.css');
module.exports = (function() {
    var container, backData, timestamp;
    var getData = (code, callback) => $.getJSON(`/queryStock.htm?stockcode=${code}`, data => callback(data));
    var isValidCode = val => {
        var a = /^[a-zA-Z]{2,5}$/.test(val); //拼音2-5
        var b = /^[036][0-9]{2,5}$/.test(val); //数字3-6
        return a || b
    }

    var createList = arr => {
        timestamp = _.now();
        var prefixs = { 0: "深市", 3: "深市", 6: "沪市" };
        var tbody = _.map(arr, item => {
            var place = prefixs[String(item.stockcode).substr(0, 1)];
            return `<tr class="${timestamp} ynStockList"> 
                    <td class="place">${place}</td> 
                    <td class="stock_code">${item.stockcode}</td> 
                    <td class="stock_name">${item.stockname}</td> 
                    <td class="pinyin">${item.pinyin}</td> 
                  </tr>`;
        }).join("")
        return `<table>${tbody}</table>`;
    }

    var viewDidAppear = ops => {
        $(`.${timestamp}`).click(function() {
            var code = $(this).find('.stock_code').text();
            var name = $(this).find('.stock_name').text();
            var pinyin = $(this).find('.pinyin').text();

            var item = {
                stockCode: code,
                stockName: name,
                stockPinyin: pinyin,
                stockWrap: `$${code}${name}$`
            };
            container.hide();
            ops.onSelect(item);
            return false;
        })
    }

    return {

        init: function() {
            $('body').append(`<div id="ynStcokListSpacial"></div>`);
            container = $('#ynStcokListSpacial');
            $(document).click(() => container.hide());
        },

        add: function(id, param) {
            var ops = _.extend({
                listLen: 5,
                left: 0,
                top: 0,
                onSelect: function() {}
            }, param);

            var trigger = typeof id == "string" ? $(id) : id;
            trigger.on('keyup', function() {
                var val = $(this).val();
                if (!isValidCode(val)) return;
                getData(val, data => {
                    data = _.take(data, ops.listLen);
                    console.log('===data',data)
                    //数据返回时会将data[0]保存在trigger中, 作为默认值
                    trigger.data('firstStockCode', data[0].stockcode);
                    trigger.data('firstStockName', data[0].stockname);
                    //render
                    var left = trigger.offset().left + ops.left + "px";
                    var top = trigger.offset().top + trigger.outerHeight() + ops.top + "px";
                    container.show().html(createList(data)).css({ left: left, top: top });
                    viewDidAppear(ops);
                });
            });
        }
    }
})()
