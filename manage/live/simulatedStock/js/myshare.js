var localpath = "l92.168.1.112:9999";

var yn = {
    getJSON: function(url, callback) {
        if (url === "demoURL") {
            callback();
            return
        }
        $.getJSON(url, function(data) {
            callback(data);
        })
    }
}

$(function() {
    addEvent();
    main()
})

function main() {
    showCapital() //资产
    showIncome() //收益
    showHoldDetail(); //持仓
    showBackout(); //挂单
}


//资产信息
function showCapital() {
    //var data = { "teacherid": 1, "totalcapital": 7238.001, "stockmarket_value": 7420.0005, "floatPandL": -92762.0, "availablefunds": 18100.99951, "freezingfunds": 11704.0, "initialfunds": 100000.0, "createtime": "2016-03-28 11:37:47", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }
    var demoURL = path + "/simulatedStock/querysclist.htmlx";
    yn.getJSON(demoURL, function(data) {
        for (key in data) {
            if (key == "floatPandL") {
                data[key] = colorValue(setDecimal(data[key], 2));
            } else {
                data[key] = (setDecimal(data[key], 2));
            }
        }
        $('#account').html(template('account-template', data));
    })
}

//收益
function showIncome() {
    var url = path + "/simulatedStock/queryserlist.htmlx";
    //var data = [{ "teacherid": 1, "totalrate": -0.38397130370140076, "total1": 1, "total2": 1, "total3": 1, "total4": 1, "mothrate": 0.0, "weekrate": 0.0, "dayrate": 0.0, "datetime": "2016-03-28 13:24:50", "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }];
    yn.getJSON(url, function(data) {
        data = data[0]
        for (key in data) {
            if (key == "totalrate" || key == "mothrate" || key == "weekrate" || key == "dayrate") {
                data[key] = colorValue(setDecimal(data[key], 2));
            } else {
                data[key] = (setDecimal(data[key], 2));
            }
        }
        $('#income').html(template('income-template', data));
    })
}


//持仓明细
function showHoldDetail() {
    //var data = [{ "id": 2, "teacherid": 1, "stockcode": "000001", "stockname": "平安银行", "todaychange": "", "mountPandL": -0.214, "mountrate": "-0.02%", "holdingsNumber": 500, "availableNumber": 0, "cost": 10.96, "nowprice": 10.7, "createtime": "2016-03-25 13:18:26", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }]
    var demoURL = path + "/simulatedStock/queryshlist.htmlx ";
    yn.getJSON(demoURL, function(data) {
        data = _.map(data, function(item, i) {
            item.mountPandL = colorValue(parseFloat(item.mountPandL));
            item.mountrate = colorValue(parseFloat(item.mountrate));
            return item;
        })
        $('#c1').html(template('c1-template', data));
        //计算涨跌
        $('#c1').find('.item').each(function(i, e) {
            var tr = $(this);
            var code = tr.find('.stockcode').text();
            var cost = Number(tr.find('.cost').text());
            queryStock(code, function(responding) {
                //现价
                var now = responding[3];
                console.log("---------" + responding[3])
                tr.find('.currentPrice').text(responding[3]);
                console.log("=========================")
                    //涨跌幅
                var value = setDecimal((responding[3] - responding[2]) / responding[2] * 100, 2);
                tr.find('.currentUp').html(colorValue(value, "%"));
                //计算盈亏率
                var mountrate = setDecimal((now - cost) / cost * 100, 2);
                tr.find('.mountrate').html(colorValue(mountrate, "%"));
                //计算盈亏额
                tr.find('.mountPandL').html(colorValue(setDecimal(mountrate * cost, 2)));

            })
        })
    })

}


//撤单/挂单明细
function showBackout() {
    var defer = $.Deferred();
    //var data = [{ "billno": 1603242030560001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 12.0, "entrustnumber": 100, "createtime": "2016-03-24 20:30:59", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242032370001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 13.0, "entrustnumber": 150, "createtime": "2016-03-24 20:32:37", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242034090001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 12.2, "entrustnumber": 100, "createtime": "2016-03-24 20:34:10", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242051510001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 1.0, "entrustnumber": 10, "createtime": "2016-03-24 20:51:51", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242052490001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 10.0, "entrustnumber": 10, "createtime": "2016-03-24 20:52:50", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242058160001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 10.0, "entrustnumber": 10, "createtime": "2016-03-24 20:58:16", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242102420001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 10.0, "entrustnumber": 10, "createtime": "2016-03-24 21:02:43", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603242110320001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 2.0, "entrustnumber": 2, "createtime": "2016-03-24 21:10:33", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "billno": 1603251103200001, "holdingsdetailsId": 1, "stockcode": "000001", "stockname": "平安银行", "dealtype": 0, "price": 100.0, "entrustnumber": 100, "createtime": "2016-03-25 11:03:21", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }]
    var dealtype = { 0: "买入", 1: "卖出", 2: "未成交" };
    var demoURL = path + "/simulatedStock/queryselist.htmlx";
    yn.getJSON(demoURL, function(data) {
        data = _.map(data, function(item, i) {
            item.dealtype = dealtype[item.dealtype];
            return item;
        });
        $('#c4').html(template('c4-template', data));
    })
    return defer.promise();
}

//交易记录
function showHistory() {
    //var data = [{ "holdingsdetailsId": 1, "orderprice": 10.7, "dealprice": 10.7, "dealnumber": 200, "ordertime": "2016-03-25 13:18:59", "dealtime": "2016-03-25 13:19:00", "dealtype": 0, "stampDuty": 0.0, "commission": 0.0, "transferfee": 0.0, "createtime": "2016-03-25 13:19:00", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "holdingsdetailsId": 1, "orderprice": 12.0, "dealprice": 10.7, "dealnumber": 100, "ordertime": "2016-03-25 13:20:43", "dealtime": "2016-03-25 13:21:03", "dealtype": 0, "stampDuty": 0.0, "commission": 0.0, "transferfee": 0.0, "createtime": "2016-03-25 13:21:03", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }, { "holdingsdetailsId": 1, "orderprice": 10.7, "dealprice": 10.7, "dealnumber": 100, "ordertime": "2016-03-25 13:21:57", "dealtime": "2016-03-25 13:22:13", "dealtype": 0, "stampDuty": 0.0, "commission": 0.0, "transferfee": 0.0, "createtime": "2016-03-25 13:22:14", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }]
    var dealtype = { 0: "买入", 1: "卖出", 2: "未成交" };
    var demoURL = path + "/simulatedStock/querysdlist.htmlx"
    yn.getJSON(demoURL, function(data) {
        data = _.map(data, function(item, i) {
            item.dealtype = dealtype[item.dealtype];
            return item
        })
        $('#c5').html(template('c5-template', data));
    })
}

//显示股票信息
function showStockInfo(code) {
    queryStock(code, function(responding) {
        $('#realtime').html(template('realtime-template', { responding: responding }))
        var left = setDecimal(+responding[2] * 0.9, 2);
        var right = setDecimal(+responding[2] * 1.1, 2);
        $('.between').find('.left').text(left);
        $('.between').find('.right').text(right);
    })
}

//实时查询股票
function queryStock(code, callback) {
    var reg = /[0-9]{6,}/;
    if (!reg.test(String(code))) {
        alert("请输入正确的股票代码")
        return;
    }
    var prefixs = { 0: "sz", 3: "sz", 6: "sh" }
    var prefix = prefixs[String(code).substr(0, 1)];
    console.log("正在查询" + prefix + code);
    $.ajax({
        cache: true,
        url: "http://hq.sinajs.cn/list=" + prefix + code,
        type: "GET",
        dataType: 'script',
        success: function(data) {
            var responding = eval('hq_str_' + prefix + code + '.split(",")');
            if(responding.length < 5){
                alert('暂时未能查到该股票信息');
                return;
            }
            if (responding[3] === "0.00" || responding[3]==="0") {
                responding[3] = responding[2];
            }
            //停牌
            if(responding[32] == "03"){
                responding = _.map(responding,function(item){
                    if(item === "0.00" || item==="0"){
                        item = "--"
                    }
                    return item;
                })
            }
            console.log(responding);
            callback(responding);
        }
    })
}

function route(id) {
    $('#realtime').empty().hide();
    switch (id) {
        case "t1":
            showHoldDetail();
            return;
        case "t2":
            buyViewInit();
            return;
        case "t3":
            sellViewInit();
        case "t4":
            showBackout();
            return;
        case "t5":
            showHistory();
            return;
    }
}

function buyViewInit() {
    $('#realtime').show();
    $('#c2 input').val("");
    $('#c2 .needClear').text("")
    var avalible = $('#availablefunds').text();
    $('#c2 .canUse').text(avalible);
}

//卖出
function sellViewInit() {
    $('#c3 input').val("");
    $('#c3 .needClear').text("")
    $('#c3 select').val("");
    $('#realtime').show();
    if ($('#stock_hold option').length < 2) {
        showDropList();
    }

    function showDropList() {
        //查询持仓
        //var data = [{ "id": 2, "teacherid": 1, "stockcode": "000001", "stockname": "平安银行", "todaychange": "", "mountPandL": -0.214, "mountrate": "-0.02%", "holdingsNumber": 500, "availableNumber": 0, "cost": 10.96, "nowprice": 10.7, "createtime": "2016-03-25 13:18:26", "creator": 1, "idColumnName": "id", "tablePrefix": "live_", "sqlOrderBy": "" }]
        var demoURL = path + "/simulatedStock/queryshlist.htmlx ";
        yn.getJSON(demoURL, function(data) {
            var options = ""
            _.each(data, function(item, i) {
                options += '<option value="' + item.stockcode + '">' + item.stockname + '(' + item.stockcode + ')</option>'
            })
            $('#stock_hold').append(options);
        })
    }
}


function addEvent() {

    //标题高亮 
    $('#simulate .titles').on('click', 'td', function(e) {
        $('#simulate .select').removeClass('select');
        $(this).addClass('select');
        var id = $(this).attr('id');
        var index = id.match(/\d/)[0];
        $('#simulate .contents .content').hide()
        $('#simulate .contents').find('#c' + index).show();
        route(id);
    });

    //显示股票信息
    /*showStockList('#stock_code', function(code) {
        showStockInfo(code);
    });*/

    var showData;
    $("#stock_code").typeahead({
        source: function(query, process) {
            $.get(path + "/html/queryStock.htmlx", { stockcode: query }, function(_backData) {
                showData = eval(_backData);
                process(showData);
            })
        },
        labeler: ['stock_code'],
        propName: 'stock_code',
        highlighter: function(item) {
            return "" + item.stock_code + "  " + item.stock_name + "  " + item.pinyin;
        },
        updater: function(item) {
            for (var i = 0; i < showData.length; i++) {
                var checkedData = showData[i];
                var stock_code = checkedData.stock_code;
                if (item == stock_code) {
                    showStockInfo(checkedData.stock_code);
                    return checkedData.stock_code + "  " + checkedData.stock_name;
                }
            }
        }
    });


    $('#simulateStock').on('click', '.refreshButton', function() {
        var selects = { "t2": "#stock_code", "t3": "#stock_hold" }
        var select = $('#simulate .titles').find('.select').attr('id');
        var id = selects[select];
        var code = $(id).val().match(/^[0-9]+/)[0];
        showStockInfo(code);
    })

    $("#c1").on('click', ".buy", function() {
        var tr = $(this).parents('tr');
        var code = tr.find('.stockcode').text();
        var currentPrice = tr.find('.currentPrice').text()
        $('#simulate #t2').trigger('click');
        $('#stock_code').val(code);
        $('#buy_price').val(currentPrice);
        showStockInfo(code);
    })

    $("#c1").on('click', ".sell", function() {
        var tr = $(this).parents('tr');
        var code = tr.find('.stockcode').text();
        var currentPrice = tr.find('.currentPrice').text()
        $('#simulate #t3').trigger('click');
        $('#stock_hold').val(code);
        $('#sellPrice').val(currentPrice);
        showStockInfo(code);
    })


    //买入按钮
    $('#c2').on('click', '#buyButton', function() {
        var now = new Date()
        var hour = new Date().getHours();
        var minute = now.getMinutes();
        if (hour <= 9 && minute <= 30) {
            alert("暂时不能买入,等待开盘");
            return;
        }
        console.log("是否停盘" + $('#realtime #isStop').text());
        if($('#realtime #isStop').text() == "03"){
            alert("该股票已经停盘");
            return;
        }
        var realtime = $('#realtime');
        //验证
        var verify = true;
        var inputs = $('#buy input');
        inputs.each(function() {
            if (!$(this).val()) {
                verify = false;
                return;
            }
        })
        if (!verify) {
            alert("表单不能为空");
            return;
        };
        var url = path + "/simulatedStock/buyIn.htmlx"
        var send = {
            stockcode: $('#c2 #stock_code').val().match(/^[0-9]+/)[0],
            price: $('#c2 #buy_price').val(),
            entrustnumber: $('#c2 #buy_entrustnumber').val(),
            dealtype: 0,
            stockname: realtime.find('.name').text(),
            currentPrice: realtime.find('.now').text()
        }
        console.log(send);
        $.get(url, send, function(data) {
            if (data == "success") {
                main();
                inputs.val("");
                $('#simulate #t4').trigger('click');
            }
        });
    })

    //买入价格
    $('#c2 #buy_price').on('change', function() {
        var price = +$(this).val();
        var left = +$('#c2 .between').find('.left').text();
        var right = +$('#c2 .between').find('.right').text();
        if (price < left || price > right) {
            alert("委托价格必须在" + left + "和" + right + "之间");
            $(this).val("");
            return;
        }
        var canUse = $('#availablefunds').text();
        var value = Math.floor(canUse / price);
        console.log(value);
        $('#c2 .canBuy').text(value);
    })

    // 1/2, 1/3, 1/4
    $('#c2 .ratio').click(function() {
        var thisvalue = setDecimal(eval($(this).text()), 2);
        var canBuy = +$('#c2').find('.canBuy').text();
        if (!canBuy) {
            return;
        }
        var result = Math.floor(canBuy * thisvalue);
        $('#buy_entrustnumber').val(result);
    })

    // $('#stock_code').change(function() {
    //     var code = $(this).val().match(/^\d+/)[0];
    //     showStockInfo(code);
    // })

    //买入重置
    $('#c2 #buyResetButton').on('click', function() {
        $('#buy input').val("");
    })

    $('#c2 #buy_entrustnumber').change(function() {
        var thisValue = +$(this).val();
        var can = +$('#c2 .canBuy').text();
        if (thisValue > can) {
            alert("超出最多可买股数");
            $(this).val("");
            return;
        }
    })


    // 1/2, 1/3, 1/4
    $('#c3 .ratio').click(function() {
        var thisvalue = setDecimal(eval($(this).text()), 2);
        var canBuy = +$('#c3').find('.canSell').text();
        if (!canBuy) {
            return;
        }
        var result = Math.floor(canBuy * thisvalue);
        $('#entrustnumber').val(result);
    })

    $('#stock_hold').change(function() {
        var code = $(this).val();
        showStockInfo(code);
        var hold = $('#c1').find('tr#' + code).find('.holdingsNumber').text();
        $('#c3 .canSell').text(hold);
    })

    //卖出价格
    $('#sellPrice').change(function() {
        var price = +$(this).val();
        var left = +$('#c3 .between').find('.left').text();
        var right = +$('#c3 .between').find('.right').text();
        if (price < left || price > right) {
            alert("委托价格必须在" + left + "和" + right + "之间");
            $(this).val("");
            return;
        }
    })

    //卖出操作
    $('#c3 #sellButton').on('click', function() {
        var c3 = $('#c3');
        var realtime = $('#realtime');
        var now = new Date().getHours();
//        if (now >= 15) {
//            alert("不能卖出:盘后清算时间");
//            return;
//        }
        var url = path + "/simulatedStock/sellOutstock.htmlx";
        var send = {
            stockcode: $('#stock_hold').val(),
            stockname: realtime.find('.name').text(),
            entrustnumber: $('#entrustnumber').val(),
            price: c3.find('#sellPrice').val(),
            currentPrice: realtime.find('.now').text(),
            dealtype: 1
        }
        console.log(send);
        $.get(url, send, function(data) {
            if (data == "success") {
                main();
                $('#simulate #t4').trigger('click');
                return;
            }
//            if(data == "10001"){
//            	alert("今天买入的股票，不能卖出");
//            }
        })
    })

    $('#entrustnumber').change(function() {
        var val = $(this).val();
        var canSell = +$('#c3 .canSell').text();
        console.log(canSell);
        if (val > canSell) {
            alert("最多可卖出" + canSell);
            $(this).val("");
            return;
        }
    })

    $("#c3 #sellResetButton").click(function() {
        $("#sell input").val("");
    })

    //撤单操作
    $('#c4').on('click', '#backoutButton', function() {
        var element = $(this);
        var url = path + "/simulatedStock/returnstockback.htmlx";
        var send = {
            billno: $(this).parents('tr').find('td').eq(0).text(),
            stockname: $(this).parents('tr').find('td').eq(1).text(),
            id: $(this).parents('tr').find('#billnoid').text()
        }
        console.log(send);
        $.getJSON(url, send, function(data) {
            console.log(data);
            if (data == "success") {
                element.parents('tr').remove();
            }
        })
    })
}

//显示股票列表
function showStockList(id, callback) {
    $('body').append('<div id="yn_stcok_list"></div>');
    var list = $('#yn_stcok_list');
    var trigger = $(id);

    //trigger event
    trigger.on('keyup', function() {
        var code = $(this).val();
        var demoURL = path + "/html/queryStock.htmlx?stockcode=" + code; //股票查询地址
        yn.getJSON(demoURL, function(stockDatas) {
            if (stockDatas.length < 1) {
                list.hide();
                return;
            };
            append(_.first(stockDatas, 10));
            layout();
        })
    });

    trigger.blur(function() {
        try {
            var inList = (list.attr('class')).indexOf('mouseIn') != -1;
            if (!inList) {
                list.hide();
            }
        } catch (e) {}
    })

    function append(datas) {
        var tags = function() {
            var tbody = '';
            _.each(datas, function(item, i) {
                tbody += '<tr><td class="stock_code">' + item.stock_code + '</td>' +
                    '<td class="stock_name">' + item.stock_name + '</td>' +
                    '<td class="pinyin">' + item.pinyin + '</td></tr>'
            })
            return '<table>' + tbody + '</table>';
        }();
        list.empty().append(tags).show();
    }

    function layout() {
        var left = trigger.offset().left + 10;
        var top = trigger.offset().top + trigger.height() + 10;
        list.css({ left: left, top: top });
    }

    list.on('click', 'tr', function() {
        var stock_code = $(this).find('.stock_code').text();
        trigger.val(stock_code);
        list.empty().hide();
        callback(stock_code);
    })

    list.mouseenter(function() {
        list.addClass('mouseIn');
    })

    list.mouseleave(function() {
        list.removeClass('mouseIn');
    })
}



//setDecimal(1.256689, 2) => 1.25
function setDecimal(number, count) {
    count = Number(count);
    number = Number(number);
    var step = function() {
        var result = "1";
        for (var i = 0; i < count; i++) {
            result = result + "0";
        }
        return Number(result);
    }();
    return Math.floor(number *= step) / step;
}


function colorValue(value, suffix) {
    suffix ? suffix : suffix = "";
    if (value <= 0) {
        return '<span class="green">' + value + suffix + '</span>'
    }
    if (value > 0) {
        return '<span class="red">' + value + suffix + '</span>'
    }
}
