require('~/center/center.js') // 个人中心通用设置
var ajax = require('~/ajax/customStock.js') // 自选股接口
var market = require('~/market-index.js') // 大盘指数
var stockList = require('~/ui/stockList-1.2.js') // 大盘指数


$(function() {
    yn.centerMenu.init({ render: 'my', light: '我的自选' })
    market.render({ container: $("#marquee") })
    list();
})

// 自选列表 
var list = function() {
    var container = $("#table-stock-list")
    var input = $("#showStockList");
    var tbody = $("#stock-body")

    var create = arr => {
        return _.map(arr, item => {
            var isChecked = selected[item.stockcode] ? "checked" : "";
            return `<tr class="item" id="${item.stockid}">
                        <td class="radio"><input type="checkbox" class="stock_check" ${isChecked} value="${item.stockcode}"/></td>
                        <td class="stockCode">${item.stockcode}</td>
                        <td class="stockName">${item.stockname}</td>
                        <td class="nowPrice">${item.now}</td>
                        <td class="money">${item.money}</td>
                        <td class="up">${item.up}</td>
                        <td class="yesterday">${item.yesterday}</td>
                        <td class="open">${item.open}</td>
                        <td class="max">${item.max}</td>
                        <td class="min">${item.min}</td>
                    </tr>`
        }).join('')
    }

    var render = function() {
        ajax.get().done(data => {
            tbody.html(create(data))
        })
    }

    render()

    // 定时刷新
    setInterval(() => render(), 10000)

    // 搜索股票
    stockList.get().render({
        id: 'showStockList',
        top: 30,
        onSelect: (item, trigger) => {
            trigger.val('')
            ajax.add({ stockcode: item.stockCode, stockname: item.stockName }).done(code => render())
        }
    })

    var selected = {}; //已选择
    var getValues = () => {
            var r = [];
            for (var key in selected) {
                if (selected[key]) {
                    r.push(key)
                }
                return r;
            }
        }
        // 全选
    $("#select-all").click(function(index, el) {
        var val = $(this)[0].checked
        $(".stock_check").each(function(i, e) {
            var value = $(this).val();
            e.checked = val;
            selected[value] = val;
        })
    })

    $('#table-stock-list').on('click', '.stock_check', function() {
        $('.stock_check').each(function(i, e) {
            if (!e.checked) {
                $('#select-all').attr('checked', false)
            }
        })
    })


    tbody.on('click', '.stock_check', function() {
        var isSelect = $(this).get(0).checked;
        var value = $(this).val();
        selected[value] = isSelect;
    })

    // 显示分时图
    var imageWrap = $("#klineImg");
    var kline = $("#klinePhoto")
    container.on('mouseenter', '.stockName', function() {
        var code = $(this).parent().find('.stockCode').text();
        code = code.match(/[0-9]+/)[0];
        var prefix = yn.stockPrefix(code);
        var src = `http://image.sinajs.cn/newchart/min/n/${prefix}.gif`;
        kline.attr('src', src);
        imageWrap.show().css({
            'top': $(this).offset().top + $(this).height(),
            left: $(this).offset().left + $(this).width() - 20
        })
    }).on('mouseleave', '.stockName', function() {
        imageWrap.hide();
    })

    // 删除自选
    $('#remove_stock').click(function() {
        $(".stock_check").each(function(i, e) {
            if (!e.checked) return;
            var tr = $(this).parents('tr');
            var send = {
                stockcode: tr.find('.stockCode').text(),
                stockname: tr.find('.stockName').text(),
                id: tr.attr('id')
            }
            ajax.remove(send).done(() => render())
            selected = {}
            $('#select-all').attr('checked', false)
        })
    })
}
