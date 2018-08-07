require('~/center/center.js')



$(function() {

    //未登录
    if (!ynIsLogin) {
        yn.login.render();
        yn.login.onClose = function() {
            location.href = "/index.htm"
        }
        return;
    }

    //菜单
    yn.centerMenu.init({
        render: 'my',
        light: '我的自选股'
    });

    //跑马灯
    var marketIndex = yn.MarketIndex();
    marketIndex.render($("#marquee"))

    //自选股信息
    showSelectStock();

})

function showSelectStock() {
    var c = {
        selectAll: false,
        checkeBoxAll: $('#select-all'),
        data: null,
        table: $('#table-stock-list'),
        once: false,
        klineImg: $('#klineImg'),
        datas: [],
        init: function() {
            c.toggleBox();
            c.warning();
            c.showKline();
            c.remove();
            c.render();

            //显示股票列表
            yn.showStockList('#showStockList', {
                onSelect: function(item) {
                    $("#showStockList").val('');
                    //添加自选
                    var send = {
                        stockcode: item.stockCode,
                        stockname: item.stockName
                    }
                    yndata.addMyCustomStock(send).done(function(code) {
                        c.render();
                    })
                }
            });

            //timer
            setInterval(function() {
                c.render();
            }, 10000);
        },
        render: function() {
            yndata.getMyCustomStock().done(function(data) {
                c.datas = data;
                console.log(data)
                c.table.html(template('mySelectStock-template', data));
            })
        },

        toggleBox: function() {
            $('#mySelectStock').on('click', '#select-all', function() {
                if (c.selectAll) {
                    $("input[type='checkbox']").each(function(i, e) {
                        e.checked = false;
                    })
                    c.selectAll = false;

                } else {
                    $("input[type='checkbox']").each(function(i, e) {
                        e.checked = true;
                    })
                    c.selectAll = true;
                }
            })
        },
        warning: function() {
            c.table.on('click', '.warning', function() {
                var _this = $(this);
                var parent = _this.parent();
                var html = $('#popContent').html();
                yn.popView(html, {
                    callback: function(view) {
                        var checkbox = view.find("input[type='checkbox']");
                        view.find('.stock_name').text(parent.find('.stockName').text())
                        view.find('.stock_code').text(parent.find('.stockCode').text())
                        view.find('.current').html(parent.find('.nowPrice').html())
                        view.find('.up').text(parent.find('.up').text());
                        checkbox.each(function(i, e) {
                            e.checked = false;
                        })

                        //listen once
                        if (!c.once) {
                            checkbox.click(function() {
                                var input = $(this).parent().next().find('input').get(0);
                                input.disabled = !input.disabled
                            })
                            c.once = true;
                        }
                    }
                });
            })
        },
        showKline: function() {
            //显示分时图
            c.table.on('mouseenter', '.stockName', function() {
                var code = $(this).parent().find('.stockCode').text();
                var prefix = yn.stockPrefix(code);
                var src = "http://image.sinajs.cn/newchart/min/n/" + prefix + ".gif";
                c.klineImg.find('.imgw img').attr('src', src);
                c.klineImg.show().css({
                    'top': $(this).offset().top + $(this).height(),
                    left: $(this).offset().left + $(this).width() - 20
                })
            }).on('mouseleave', '.stockName', function() {
                c.klineImg.hide();
            })
        },
        //删除自选股
        remove: function() {
            $('#remove_stock').click(function() {
                c.table.find('input').each(function(i, e) {
                    if (!e.checked) {
                        return;
                    }
                    var tr = $(this).parents('tr');
                    var send = {
                        stockcode: tr.find('.stockCode').text(),
                        stockname: tr.find('.stockName').text(),
                        id: tr.attr('id')
                    }
                    yndata.removeMyCustomStock(send).done(function() {
                        c.render();
                    })
                })
            })
        }
    }

    c.init();
}
