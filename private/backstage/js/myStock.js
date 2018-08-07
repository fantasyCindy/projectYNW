(function($) {
    $(function() {

        //菜单
        yn.centerMenu.init();
        yn.centerMenu.render({ type: "my" });

        var simulate = $('#simulate');

        var menu = {
            container: simulate.find('.titles'),
            init: function() {
                this.event();
                content.render(0);
            },
            event: function() {
                //hightligh
                this.container.on('click', 'button', function() {
                    menu.container.find('.select').removeClass('select');
                    $(this).addClass('select');
                    var index = $(this).index();
                    content.render(index);
                })
            }
        }

        var content = {
            container: simulate.find('.contents'),
            children: [],
            init: function() {
                this.children = [hold, buy, sell, backout, history];
            },
            render: function(index) {
                this.container.find('.content').hide();
                realtime.container.hide();
                this.children[index].render();
            }
        }

        //账户信息
        var capital = {
            container: $('#account'),
            init: function() {
                this.render()
            },
            getData: function(callback) {
                var url = "/simulatedStock/querysclist.htm";
                $.getJSON(url, function(data) {
                    console.log("---资产信息---");
                    console.log(data);
                    callback(data);
                })
            },
            render: function() {
                this.getData(function(data) {
                    capital.container.html(template('account-template', data));
                })
            }
        }


        var income = {
            container: $('#income'),
            init: function() {
                this.render();
            },
            render: function() {
                this.getData(function(data) {
                    income.container.html(template('income-template', data));
                })
            },
            getData: function(callback) {
                var url = "/simulatedStock/queryserlist.htm";
                $.getJSON(url, function(data) {
                    log("---收益信息---");
                    log(data);
                    data = data[0]
                    for (var key in data) {
                        if (key == "totalrate" || key == "mothrate" || key == "weekrate" || key == "dayrate") {
                            data[key] = yn.colorValue(yn.setDecimal(data[key]));
                        } else {
                            data[key] = (yn.setDecimal(data[key]));
                        }
                    }
                    callback(data);
                })
            }
        }

        //股票实时信息
        var realtime = {
            container: $('#realtime'),
            stop: false,
            info: null,
            init: function() {},
            render: function(code) {
                var _this = this;
                yn.queryStock(code, { handle: true }).done(function(data) {
                    _this.info = data;
                    _this.stop = data[32] == "3.00" ? true : false
                    _this.container.show().html(template('realtime-template', {
                        responding: data
                    }));
                    _this.renderDone(data);
                })
            },
            renderDone: function(data) {
                buy.setBetween(data[2]);
                sell.setBetween(data[2]);
            }
        }



        //持仓明细
        var hold = {
            container: $('#c1'),
            listOfStockCode: [],
            data: null,
            init: function() {
                this.render();
                this.event()
            },
            getData: function(callback) {
                var _this = this;
                var url = "/simulatedStock/queryshlist.htm";
                $.getJSON(url, function(data) {
                    data = _this.handle(data);
                    console.log("---持仓明细---");
                    console.log(data);
                    _this.data = data;
                    callback(data);
                })
            },
            handle: function(data) {
                return _.map(data, function(item) {
                    hold.listOfStockCode.push(item.stockcode);
                    item.mountPandL = yn.colorValue(parseFloat(item.mountPandL)); //盈亏额
                    item.mountrate = yn.colorValue(parseFloat(item.mountrate)); //盈亏率
                    return item;
                })
            },
            render: function() {
                this.container.show();
                this.getData(function(data) {
                    hold.container.html(template('c1-template', data));
                    _.forEach(hold.listOfStockCode, function(code) {
                        yn.queryStock(code, { handle: true, color: true }).done(function(data) {
                            var item = $('#' + code)
                            item.find('.todayUp').html(data[33]);
                            item.find('.currentPrice').html(data[3]);
                        })
                    })
                })
            },
            event: function() {
                var _this = this;
                this.container.on('click', '.buy', function() {
                    var tr = $(this).parents('tr');
                    var code = tr.find('.stockcode').text();
                    var currentPrice = tr.find('.currentPrice').text();
                    $('#t2').trigger('click');
                    buy.buyStockCode.val(code);
                    buy.buyPrice.val(currentPrice);
                    realtime.render(code);
                })
                this.container.on('click', '.sell', function() {
                    var tr = $(this).parents('tr');
                    var code = tr.find('.stockcode').text();
                    var currentPrice = tr.find('.currentPrice').text();
                    $('#t3').trigger('click');
                    sell.have.val(code);
                    sell.sellPrice.val(currentPrice);
                    realtime.render(code);
                })
            }
        }

        //买入
        var buy = {
            container: $("#c2"),
            canBuy: $('#c2 .canBuy'),
            buyPrice: $('#buy-price'),
            canUse: $('#c2 .canUse'),
            getCanBuy: $('#getCanBuy'),
            buyCount: $('#buy_entrustnumber'),
            buyButton: $("#buyButton"),
            resetButton: $('#buyResetButton'),
            inputs: $("#c2 input"),
            beLeft: $("#buy-between-left"),
            beRight: $("#buy-between-right"),
            buyStockCode: $('#buyStockCode'),
            stockCode: 0,
            canBuyValue: 0,
            canUseValue: 0,
            beLeftValue: 0,
            beRightValue: 0,
            stockInfo: null,
            init: function() {
                var _this = this;
                this.event();
                yn.showStockList('#buyStockCode', {
                    listLen: 5,
                    onSelect: function(item) {
                        _this.stockInfo = item;
                        realtime.render(item.stockCode);
                    }
                });
            },
            render: function() {
                this.reset();
                this.canUseValue = $('#availablefunds').text();
                this.canUse.text(this.canUseValue);
                this.container.show();
            },
            setBetween: function(data) {
                this.beLeftValue = yn.setDecimal(data * 0.9);
                this.beRightValue = yn.setDecimal(data * 1.1);
                this.beLeft.text(this.beLeftValue);
                this.beRight.text(this.beRightValue);
            },
            event: function() {

                var _this = this;

                //重置边框
                this.container.find('input').on('focus', function() {
                    $(this).css({ "border-color": "#e6e6e6" });
                })

                //验证买入价格
                this.buyPrice.on("change", function() {
                    var val = $(this).val();
                    if (!yn.isNumber(val)) {
                        layer.alert("买入价格：请输入有效数字");
                    }
                    val = +val;
                    if (val < _this.beLeftValue || val > _this.beRightValue) {
                        layer.alert("委托价格必须在" + _this.beLeftValue + "和" + _this.beRightValue + "之间");
                        $(this).val("");
                    }
                    _this.canBuyValue = Math.ceil(Math.floor(_this.canUseValue / val) / 100) * 100
                    _this.canBuy.text(_this.canBuyValue);
                })


                //取可买股数的
                this.getCanBuy.on('click', 'span', function() {
                    var radio = +$(this).data('value');
                    console.log(radio)
                    _this.buyCount.val(Math.floor(_this.canBuyValue * radio));
                })

                //买入
                this.buyButton.click(function() {
                    var now = new Date()
                    var hour = new Date().getHours();
                    var minute = now.getMinutes();
                    if ((hour <= 9 && minute <= 30) || (hour >= 11 && minute >= 30 && hour <= 13)) {
                        layer.alert("暂时不能买入,等待开盘");
                        return;
                    }
                    if (hour >= 15 && minute >= 30) {
                        layer.alert("15:00以后不能交易");
                        return;
                    }
                    if (realtime.stop) {
                        layer.alert("该股票已经停盘");
                        return;
                    }

                    var flag = true;
                    _this.inputs.each(function() {
                        if (!$(this).val()) {
                            $(this).css({ "border-color": "red" })
                            layer.alert("表单不能为空");
                            flag = false;
                        }
                    })

                    if (!flag) return;
                    var save = {
                        stockcode: _this.stockInfo.stockCode,
                        price: _this.buyPrice.val(),
                        entrustnumber: _this.buyCount.val(),
                        dealtype: 0,
                        stockname: _this.stockInfo.stockName,
                        currentPrice: realtime.info[3]
                    }

                    $.get("/simulatedStock/buyIn.htm", save, function(data) {
                        if (data == "success") {
                            layer.msg("成功买入");
                            _this.reset();
                            reRender();
                            $('#t4').trigger('click');
                        } else if (data == "15") {
                            layer.alert("当前老师未初始化资金");
                        }
                    });
                })

                //重置
                this.resetButton.click(function() {
                    _this.reset();
                })
            },
            reset: function() {
                this.beLeft.text("");
                this.beRight.text("");
                this.canBuy.text("");
                this.inputs.each(function() {
                    $(this).val("");
                })
            }
        }

        //卖出
        var sell = {
            container: $('#c3'),
            have: $('#stock_hold'),
            sellPrice: $('#sellPrice'),
            beLeft: $("#sell-between-left"),
            beRight: $("#sell-between-right"),
            sellCount: $('#entrustnumber'),
            canSell: $('#canSell'),
            getCanSell: $('#getCanSell'),
            inputs: $('#c3 input'),
            resetButton: $('#sellResetButton'),
            sellButton: $('#sellButton'),
            stockCode: null,
            beLeftValue: 0,
            beRightValue: 0,
            canSellValue: 0,
            init: function() {
                this.event();
            },
            setBetween: function(data) {
                this.beLeftValue = yn.setDecimal(data * 0.9);
                this.beRightValue = yn.setDecimal(data * 1.1);
                this.beLeft.text(this.beLeftValue);
                this.beRight.text(this.beRightValue);
            },
            render: function() {
                this.reset();
                this.container.show();
                var options = '<option value="">选择股票代码</option>';
                _.forEach(hold.data, function(item) {
                    options += '<option value="' + item.stockcode + '">' + item.stockname + '(' + item.stockcode + ')</option>'
                })
                this.have.html(options)
            },
            event: function() {
                var _this = this;

                //重置边框
                this.container.find('input').on('focus', function() {
                    $(this).css({ "border-color": "#e6e6e6" });
                })

                this.have.change(function() {
                    var val = $(this).val();
                    _this.stockCode = val;
                    realtime.render(val);
                    //最多可卖
                    $.get("/simulatedStock/getMostSellOut.htm", {
                        stockcode: val
                    }, function(data) {
                        console.log("--最多可卖---")
                        console.log(data);
                        _this.canSellValue = Number(data);
                        _this.canSell.text(data);
                    })
                })

                //验证卖出价格
                this.sellPrice.on("change", function() {
                    var val = $(this).val();
                    if (!yn.isNumber(val)) {
                        layer.alert("卖出价格：请输入有效数字");
                    }
                    val = +val;
                    if (val < _this.beLeftValue || val > _this.beRightValue) {
                        layer.alert("委托价格必须在" + _this.beLeftValue + "和" + _this.beRightValue + "之间");
                        $(this).val("")
                    }
                })

                //卖出股数
                this.sellCount.change(function() {
                    var val = +$(this).val();
                    if (val > _this.canSellValue) {
                        layer.alert("最多可卖出" + _this.canSellValue);
                        $(this).val("");
                        return;
                    }
                })

                //取可卖股数的
                this.getCanSell.on('click', 'span', function() {
                    var radio = +$(this).data('value');
                    console.log(radio)
                    _this.sellCount.val(Math.floor(_this.canSellValue * radio));
                })

                //重置
                this.resetButton.click(function() {
                    _this.reset();
                });

                //卖出
                this.sellButton.click(function() {
                    var now = new Date()
                    var hour = new Date().getHours();
                    var minute = now.getMinutes();
                    if (hour >= 15) {
                        layer.alert("不能卖出:盘后清算时间");
                        return;
                    }

                    var flag = true;
                    _this.inputs.each(function() {
                        if (!$(this).val()) {
                            $(this).css({ "border-color": "red" });
                            layer.alert("表单不能为空");
                            flag = false;
                        }
                    })
                    if (!flag) return;

                    var save = {
                        stockcode: _this.stockCode,
                        stockname: realtime.container.find('.name').text(),
                        entrustnumber: _this.sellCount.val(),
                        price: _this.sellPrice.val(),
                        currentPrice: realtime.container.find('.now').text(),
                        dealtype: 1
                    }

                    log("---卖出---");
                    log(save);

                    $.get("/simulatedStock/sellOutstock.htm", save, function(data) {
                        if (data == "success") {
                            reRender()
                            $('#t1').trigger('click');
                            return;
                        }
                    });
                });

            },
            reset: function() {
                this.have.val("")
                this.beLeft.text("");
                this.beRight.text("");
                this.canSell.text("");
                this.inputs.each(function() {
                    $(this).val("");
                });
            }
        };



        //撤单
        var backout = {
            container: $('#c4'),
            type: ["买入", "卖出", "未成交"],
            init: function() {
                this.evnet();
            },
            getData: function(callback) {
                var _this = this;
                $.getJSON("/simulatedStock/queryselist.htm", function(data) {
                    data = _.map(data, function(item) {
                        item.dealtype = _this.type[item.dealtype];
                        return item;
                    });
                    console.log("===撤单信息===");
                    console.log(data);
                    callback(data);
                });

            },
            render: function() {
                this.container.show();
                this.getData(function(data) {
                    backout.container.html(template('c4-template', data));
                });
            },
            evnet: function() {
                var _this = this;
                type = {
                    "买入": 0,
                    "卖出": 1,
                    "未成交": 2
                }
                this.container.on('click', '#backoutButton', function() {
                    var element = $(this);
                    var url = "/simulatedStock/returnstockback.htm";
                    var tr = $(this).parents('tr');
                    var send = {
                        stockcode: tr.data('code'),
                        billno: tr.find('td').eq(0).text(),
                        stockname: tr.find('td').eq(1).text(),
                        id: tr.data('id'),
                        price: +tr.find('td').eq(3).text(),
                        entrustnumber: +tr.find('td').eq(4).text(),
                        dealtype: type[tr.find('td').eq(2).text()]
                    }

                    log('---撤单---');
                    log(send);

                    $.get(url, send, function(data) {
                        if (data == "success") {
                            reRender();
                            element.parents('tr').remove();
                        }
                    });
                });
            }
        };

        //历史交易
        var history = {
            container: $('#c5'),
            items: $('#c5 .items'),
            dealtype: ["买入", "卖出", "未成交"],
            bootpag: null,
            query: {
                pageSize: 20,
                currentPage: 1
            },
            init: function() {
                var _this = this;
                this.bootpag = yn.bootpag('#c5', { first: false });
                this.bootpag.on('page', function(e, n) {
                    _this.query.currentPage = n;
                    _this.render();
                })
            },
            getData: function(callback) {
                _this = this;
                $.getJSON("/simulatedStock/querysdlist.htm", this.query, function(data) {
                    log("---历史交易---")
                    console.log(data)
                    data.total = Math.ceil(+data.total / _this.query.pageSize);
                    _this.bootpag.bootpag({ page: _this.currentPage, total: data.total });
                    data = _.map(data.rows, function(item) {
                        item.dealtype = _this.dealtype[item.dealtype];
                        return item
                    })
                    callback(data);
                })
            },
            render: function() {
                this.container.show();
                this.getData(function(data) {
                    _this.items.html(template('c5-template', data));
                })
            }
        }

        ///////////////////////////////////////////////////////////////

        capital.init();
        income.init();
        content.init();
        menu.init();
        hold.init();
        realtime.init();
        buy.init();
        backout.init();
        history.init();
        sell.init();


        ///////////////////////////////////////////////////////////////


        function reRender() {
            capital.render();
            income.render();
        }

        ///////////////////////////////////////////////////////////////

    })

})(jQuery);
