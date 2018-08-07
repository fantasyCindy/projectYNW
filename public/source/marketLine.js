//////////////////////////////////////////
$(function() {
    var userid = ynUserId;

    var relative = new ynmodule.ReativeAsk();

    var stock = {
        container: $('#stockInfo'),
        shareInfo: $('#shareInfo'),
        stockName: $('#stock_name'),
        stockCode: $('#page_stock_code'),
        up: $('#_up'), //涨跌额
        radio: $('#_radio'), //涨跌幅
        now: $('#_now'), //当前价格
        open: $('#_open'), //开盘
        high: $('#_high'), //最高
        low: $('#_low'),
        dealCount: $('#_dealCount'), //成交量
        top: $('#_top'), //涨停价
        yesterday: $('#_yesterday'), //昨收价
        dealMoney: $('#_dealMoney'), //成交额
        bottom: $('#_bottom'), //跌停价
        init: function() {
            var _this = this;
            this.event();
            yn.queryStock(stockcode, {
                handle: true,
                color: true
            }).done(function(data) {
                _this.render(data);
            })
        },
        render: function(data) {
            this.stockCode.text(stockcode);
            this.stockName.text(data[0]);
            this.now.html(data[3]);
            this.up.html(data[33]);
            this.radio.html(data[34]);
            this.open.html(data[1]);
            this.yesterday.html(data[2]);
            this.high.html(data[4]);
            this.low.html(data[5]);
            this.dealCount.html(data[8]);
            this.dealMoney.html(data[9]);
            this.top.html(data[35]);
            this.bottom.html(data[36]);
            //添加￥符号
            var theNow = this.now.find('span');
            theNow.text("￥" + theNow.text());

            //显示相关问股
            relative.init(data[0], stockcode)
            relative.render();
        },
        event: function() {
            var _this = this;
            this.shareInfo.on('click', 'button', function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                addMyCustomStock({
                    stockcode: _this.stockCode.text(),
                    stockname: _this.stockName.text()
                }).done(function(data) {
                    console.log("=data==", data)
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        layer.msg("添加成功")
                        myStock.render();
                    } else {
                        return layer.msg(error[data.status])
                    }
                })
            })
        }
    }

    //我的自选
    var myStock = {
        visible: false,
        container: $('#MyOptional'),
        items: null,
        data: null,
        init: function() {
            this.event();
            this.items = this.container.find('.items');
            if (ynIsLogin) {
                this.render();
            }
        },
        render: function() {
            var _this = this;
            if (!this.visible) {
                this.container.show();
                this.visible = true;
            }
            getMyCustomStock().done(function(data) {
                console.log("=456=data=", data)
                _this.data = data;
                _this.items.html(template('MyOptional-template', data))
            })
        },
        event: function() {
            var _this = this;
            this.container.on('click', 'button', function() {
                var element = $(this);
                layer.confirm("确定要取消吗?", function(index) {
                    layer.close(index);
                    var i = element.parents('tr').index() - 1;
                    var itemData = _this.data[i];
                    removeMyCustomStock({
                        stockcode: itemData.stockcode,
                        stockname: itemData.stockname,
                        id: itemData.stockid
                    }).done(function() {
                        _this.render();
                    })
                })
                return false;
            })
            this.container.on('click', 'tr.body', function() {
                var i = $(this).index() - 1;
                var code = _this.data[i].stockcode.match(/\d+/)[0];
                window.location.href = "/marketLine.htm?stockcode=" + code;
            })
        }
    }

    //精彩观点
    var article = {
        container: $('#articles'),
        init: function() {
            this.items = this.container.find('.items');
            this.render()
        },
        render: function() {
            var _this = this;
            getHotArticle({
                row: 7
            }).done(function(data) {
                _this.items.html(template('article-template', data));
                var time = $('#articles .time').text()
                console.log('time1', time)
                time = time.substr(0, 10)
                $('#articles .time').html(time)
                console.log(time)
            })
        }
    }

    //获取最新观点
    function getHotArticle(ops) {
        var defer = $.Deferred();
        ops = _.extend({
            page: 1,
            row: 5,
            showType: 0 // 普通观点=0， 精品观点=1
        }, ops);

        $.ajax({
            url: "/html/lastedArticle.htm?",
            dataType: 'json',
            data: { page: ops.page, rows: ops.row, showType: 0 },
            success: function(data) {
                if (data.status == 1) {
                    data = _.map(data.data, function(item) {
                        item.link_path = item.link_path.replace("http://www.yuetougu.com/", '');
                        return item;
                    })
                    defer.resolve(data);
                } else {
                    return layer.msg(error[data.status])
                }
            }
        });
        return defer.promise();
    };

    /*删除自选股*/
    /*参数(stockname, stockcode, [user_id], id(股票id))*/
    function removeMyCustomStock(send, ops) {

        var defer = $.Deferred();
        ops = _.extend({
            user_id: ynUserId //默认添加到当前用户
        })
        send.user_id = ops.user_id;
        if (!send && !send.stockname & !stockCode && !send.id) {
            layer.msg("yndta.removeMyCustomStock : 参数错误");
            return;
        }
        $.get('/deleteOpStock.htm', send, function(data) {
            data = JSON.parse(data)
            if (data.status == '1') {
                defer.resolve(send.stockCode);
            } else {
                layer.msg("yndta.addMyCustomStock: 删除自选股失败...");
                defer.reject(send.stockCode);
            }
        })
        return defer.promise();
    }


    //查询我的自选股
    /*默认获取当前用户id*/
    function getMyCustomStock(ops) {
        ops = _.extend({
            userid: ynUserId //用户id
        })
        var defer = $.Deferred();
        $.getJSON("/queryOp.htm", { user_id: ops.userid }, function(data) {
            if (data.status == 1) {
                data.data = _.chain(data.data).filter(function(item) {
                    return item.stockInfo
                }).map(function(item) {
                    return handleItem(item);
                }).value()
                defer.resolve(data.data);
            }

        })

        function handleItem(item) {

            var data = eval(item.stockInfo);
            var open = yn.setDecimal(+data[1]);
            var yesterday = data[2];
            var now = yn.setDecimal(data[3]) || open; //现价如果没有等于昨日收盘价
            var high = data[4];
            var low = data[5];
            var up = yn.setDecimal((now - yesterday) / yesterday * 100); //涨跌幅
            var money = yn.setDecimal(now - yesterday); //涨跌额

            //返回数据格式
            var result = {
                stockcode: item.stockcode,
                stockname: item.stockname,
                stockid: item.id,
                now: yn.colorValue(now, { left: now - open }),
                money: yn.colorValue(money),
                up: yn.colorValue(up, { suffix: "%" }),
                yesterday: yn.setDecimal(yesterday),
                open: yn.setDecimal(open),
                max: yn.setDecimal(high),
                min: yn.setDecimal(low)
            }
            return result
        }

        return defer.promise();
    }


    /*添加自选
    send对象: {stockcode, stockname, [user_id]}
    */
    function addMyCustomStock(send, ops) {
        var defer = $.Deferred();
        ops = _.extend({
            user_id: ynUserId //默认添加到当前用户
        }, ops)
        if (!send || !send.stockname || !send.stockcode) {
            console.log("添加自选参数错误", send);
            return;
        }
        send.user_id = ops.user_id;

        //查询是否已存在
        $.post('/addOpStock.htm', send, function(data) {
            defer.resolve(data); return
            data = JSON.parse(data)
            if (data.status == 40008) {
                return layer.msg('自选股已存在')
            }
        })

        return defer.promise();
    }

    /*///////////////////////////////////////////////////////////////////*/

    var tabBar = function() {
        var container = $(".tabBar");
        var item = $(".shareContainer");
        container.on('click', "td", function() {
            var showID = $(this).data('show');
            item.hide();
            $('#' + showID).show();
            $(this).addClass('select').siblings().removeClass('select')
            var type = $(this).data('type');
            kline.render[type]();
        })
    }()


    /*///////////////////////////////////////////////////////////////////*/

    stock.init();
    myStock.init();
    article.init();
});


/*///////////////////////////////////////////////////////////////////*/

//K线图
// 0:时间, 1:开盘价, 2:最高价,  3.:收盘价, 4:最低价, 5:成交量, 6:均线5,  7:均线10 , 8:均线30, 9:前收价, 10:涨跌幅, 11：周编号， 12：月编号

var kline = function() {
    var container = null;
    var klineDayData = [];
    weekLineData = [];
    monthLineData = [];
    var stockMatch = window.location.href.match(/\d{6}/);
    if (!stockMatch) {
        layer.msg("股票代码错误");
        return;
    }
    var stockcode = stockMatch[0];

    //获取数据
    var getData = function(callback) {
        if (klineDayData.length > 0) {
            callback(klineDayData);
            return
        }
        $.getJSON("/getStockInfoByCodeinser.htm?stockcode=" + stockcode, function(data) {
            klineDayData = handleData(data);
            callback(klineDayData);
        })
    }

    //计算日K数据
    var handleData = function(data) {
        var result = [];
        var kweek = 1;
        _.forEach(data, function(item) {
            item = item.replace(/\[|\]|%/g, "").split(",");
            item = _.map(item, function(value) {
                value = parseFloat(value);
                return value
            })

            //转换为时间戳
            item[0] = yn.switchTimestamp(item[0]);

            //编号
            var time = new Date(item[0])
            var day = +time.getDay();
            var month = +time.getMonth();
            var year = +time.getFullYear();

            //周标记
            if (day == 1) kweek++;
            item[11] = kweek;

            //月标记
            item[12] = year * 10000 + month;
            result.push(item);
        })
        return result;
    }


    //计算周K数据
    var getweekLineData = function(callback) {
        if (weekLineData.length > 0) {
            callback(weekLineData);
            return;
        }
        getData(function(data) {

            //根据周标记对日K进行分组
            var result = _.chain(data).groupBy(function(item) {
                return item[11]
            }).map(function(item, i, collection) {
                return calculate(item, i, collection);
            }).value()
            weekLineData = result
            callback(result);
        })
    }


    //计算月K数据
    var getMonthLineData = function(callback) {
        if (monthLineData.length > 0) {
            callback(monthLineData);
            return;
        }
        getData(function(data) {
            //根据月标记对日K进行分组
            var result = _.chain(data).groupBy(function(item) {
                return item[12]
            }).map(function(item, i, collection) {
                return calculate(item, i, collection);
            }).value()
            monthLineData = result;
            callback(result);
        })
    }



    //计算周/月/平均值
    function calculate(item, index, collection) {
        // item = [[], []]
        var result = [],
            len = item.length,
            last = len - 1;

        result[0] = item[last][0]; //时间
        result[1] = item[0][1]; //开盘价

        //最高价    
        result[2] = function() {
            return _.max(_.map(item, function(day, index) {
                return day[2]
            }))
        }()

        //最低价 
        result[4] = function() {
            return _.min(_.map(item, function(day, index) {
                return day[4]
            }))
        }()

        result[3] = item[last][3]; //收盘价
        result[5] = item[last][5]; //成交量 
        result[6] = item[last][6]; //5日均线 
        result[7] = item[last][7]; //10日均线 
        result[8] = item[last][8]; //30日均线

        //前收价
        result[9] = function() {
            if (index < 1) return 0;
            var last = collection[index - 1];
            if (!last) return 0;
            return (last[last.length - 1])[3];
        }()

        //张跌幅 
        result[10] = +yn.setDecimal((result[3] - result[9]) / result[3] * 100, 2);
        return result
    }

    /*///////////////////////////////////////////////////////////////////*/

    return {
        render: {
            day: function() {
                getData(function(data) {
                    drawKline(data, "container_day");
                })
            },
            week: function() {
                getweekLineData(function(data) {
                    drawKline(data, "container_week");
                })
            },
            month: function() {
                getMonthLineData(function(data) {
                    drawKline(data, "container_month");
                })
            }
        }
    }
}()

/*///////////////////////////////////////////////////////////////////*/

//绘制K线图
//


//change column color
var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
var seriesPointAttr;
Highcharts.seriesTypes.column.prototype.drawPoints = function() {
    var merge = Highcharts.merge,
        series = this,
        chart = this.chart,
        points = series.points,
        i = points.length;

    while (i--) {
        var candlePoint = chart.series[0].points[i];
        if (candlePoint.open !== undefined && candlePoint.close !== undefined) {
            //开盘价小于
            var color = (candlePoint.open < candlePoint.close) ? '#DD2200' : '#33AA11';
            seriesPointAttr = merge(series.pointAttr);
            seriesPointAttr[''].fill = color;
            seriesPointAttr.hover.fill = Highcharts.Color(color).brighten(0.1).get();
            seriesPointAttr.select.fill = color;
        } else {
            seriesPointAttr = merge(series.pointAttr);
        }
        points[i].pointAttr = seriesPointAttr;
    }
    originalDrawPoints.call(this);
}

//global setting
Highcharts.setOptions({
    global: {
        useUTC: true,
        timezoneOffset: 60 * -8 // Beijing
    },
    lang: {
        rangeSelectorZoom: "范围：",
        rangeSelectorFrom: "从",
        rangeSelectorTo: "至",
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        shortMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    }
})

function drawKline(data, elementID) {

    // data:  [时间, 开盘价, 最高价, 最低价, 收盘价,  成交量, 5, 10 ,30, 昨日收盘价, 涨跌幅]

    var ohlc = []; //K线图数据
    var volume = []; //柱形图数据
    var average5 = []; //5日平均数据
    var average10 = []; //10日平均数据
    var average30 = []; //30日平均数据
    var len = data.length;


    _.forEach(data, function(item) {
        ohlc.push([
            item[0], // 时间
            item[1], // 开盘价
            item[2], // 最高价
            item[4], // 最低价
            item[3], // 收盘价
            item[9], // 前收价
            item[10] // 涨幅
        ]);

        volume.push([
            item[0], // 时间
            item[5] //成交量
        ]);

        average5.push([
            item[0], +yn.setDecimal(item[6], 2)
        ]);

        average10.push([
            item[0], +yn.setDecimal(item[7], 2)
        ]);

        average30.push([
            item[0], +yn.setDecimal(item[8], 2)
        ]);
    });

    //要选中的时间范围
    var buttonSelected = $("#" + elementID).data('select');

    var options = {

        chart: {
            showAxes: true
        },

        title: {
            text: ''
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
            itemWidth: 160,
            symbolWidth: 0,
            useHTML: true,
            labelFormatter: setLegend
        },

        navigator: {
            enabled: true,
            baseSeries: 4
        },

        rangeSelector: {
            buttonTheme: {
                width: 50,
                height: 14,
                style: {
                    fontSize: "smaller"
                }
            },
            inputBoxHeight: 13,
            labelStyle: {
                color: "black",
                fontSize: "smaller"
            },
            inputStyle: {
                fontSize: "smaller"
            },
            selected: buttonSelected,
            inputDateFormat: "%Y-%m-%d",
            buttons: [{
                type: "month",
                count: 3,
                text: "三个月"
            }, {
                type: "month",
                count: 6,
                text: "半年"
            }, {
                type: "year",
                count: 1,
                text: "一年"
            }, {
                type: "year",
                count: 3,
                text: "三年"
            }, {
                type: "all",
                text: "全部"
            }]
        },

        xAxis: {
            labels: {
                formatter: function() {
                    return setDateFormat2(this.value);
                }
            },
            lineWidth: 1,
            gridLineWidth: 1,
            gridLineDashStyle: "dash",
            events: {
                afterSetExtremes: function() {
                    var x = this.chart.xAxis[0];
                    var y = this.chart.yAxis[0];
                    y.setExtremes(y.dataMin, y.dataMax);
                }
            },
            tickLength: 10,
            tickPositioner: function() {
                var count = this.ordinalPositions.length;
                var p1 = this.ordinalPositions[Math.round(count / 4)];
                var p2 = this.ordinalPositions[Math.round(count * 2 / 4)];
                var p3 = this.ordinalPositions[Math.round(count * 3 / 4)];
                var positions = [this.min, p1, p2, p3, this.max];
                return positions;
            }
        },

        yAxis: [{
            opposite: false,
            lineWidth: 0,
            gridLineDashStyle: "dash",
            height: "60%",
            startOnTick: true,
            endOnTick: true
        }, {
            opposite: false,
            height: "20",
            lineWidth: 0,
            top: "70%",
            height: "25%",
            gridLineDashStyle: "dash",
            offset: 0,
            labels: {
                enabled: false
            },
            title: {
                text: "成交量"
            }
        }],

        tooltip: {
            borderColor: "green",
            positioner: setTooltipPostion
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: false,
                    radius: 0
                },
                lineWidth: 1,
                tooltip: {
                    enabled: false,
                    pointFormat: ""
                },
            },
            series: {
                dataGrouping: {
                    enabled: false,
                },
                states: {
                    hover: {
                        enabled: false, //hide highlight
                    }
                },
                turboThreshold: 3000
            }
        },

        series: [{
            type: 'candlestick',
            data: ohlc,
            name: "收盘",
            color: '#33AA11',
            upColor: '#DD2200',
            lineColor: '#33AA11',
            upLineColor: '#DD2200',
            keys: ["x", "open", "high", "low", "close", "old", "up"],
            tooltip: {
                useHTML: true,
                headerFormat: "",
                pointFormatter: tooltipTag,
            }
        }, {
            type: 'column',
            name: '成交量',
            data: volume,
            yAxis: 1,
            tooltip: {
                enabled: true,
                pointFormatter: function() {
                    return "成交量：" + yn.setDecimal(this.y / 10000, 2) + "万手" + "<br>"
                }
            },
            minPointLength: 2
        }, {
            type: 'spline',
            name: 'MA5',
            color: '#d53668',
            data: average5,
            tooltip: {
                enabled: true,
                useHTML: true,
                pointFormatter: function() {
                    return '<span style="color:#CC3668">MA5：' + this.y + '</span><br>'
                }
            }
        }, {
            type: 'spline',
            name: 'MA10',
            color: '#f49100',
            data: average10,
            tooltip: {
                enabled: true,
                pointFormatter: function() {
                    return '<span style="color:#F06600">MA10：' + this.y + '</span><br>'
                }
            }
        }, {
            type: 'spline',
            name: 'MA30',
            color: '#b42cfe',
            data: average30,
            tooltip: {
                enabled: true,
                pointFormatter: function() {
                    return '<span style="color:#AA2CFE">MA30：' + this.y + '</span><br>'
                }
            },
        }]
    };


    function tooltipTag() {
        var color = "red";
        if (this.up < 0) {
            color = '#1aa31a';
        }
        var date = Highcharts.dateFormat("%Y年%m月%d日", this.x);
        return '<span style="color:blue">' + date + '</span><br>' +
            '<span>开盘价：</span>' + this.open + '<br>' +
            '<span>最高价：</span>' + this.high + '<br>' +
            '<span>最低价：</span>' + this.low + '<br>' +
            '<span>收盘价：</span>' + this.close + '<br>' +
            '<span>前收价：</span>' + this.old + '<br>' +
            '<span>涨跌幅：</span><span style="color:' + color + '" >' + this.up + '%</span><br>'
    }


    function setLegend() {
        if (this.name == "收盘") {
            var date = setDateFormat(this.point.x);
            return '<span style="font-weight:normal">' + date + '&nbsp;&nbsp;&nbsp;&nbsp;收盘&nbsp;:&nbsp;<span style="color:green">' + this.point.y + '</span></span>';
        }
        if (this.name == "成交量") {
            return '成交量&nbsp;:&nbsp;' + yn.setDecimal(this.point.y / 10000, 2) + "万手"
        };
        return '<span style="color:gray">' + this.name + ' : ' + this.point.y + '</span>'
    }


    function setTooltipPostion(labelWidth, labelHeight, point) {
        var tooltipX;
        var chart = this.chart;
        if (point.plotX + labelWidth > chart.plotWidth) {
            tooltipX = point.plotX + chart.plotLeft - labelWidth - 30;
        } else {
            tooltipX = point.plotX + chart.plotLeft + 30;
        }
        return {
            x: tooltipX,
            y: 60
        };
    }

    //////////////////////////////////////////////////////////////////////
    var mychart = new Highcharts.StockChart(elementID, options);
    //////////////////////////////////////////////////////////////////////


    //format time
    function setDateFormat(timestamp) {
        return Highcharts.dateFormat("%Y年%m月%d日", timestamp);
    }

    function setDateFormat2(timestamp) {
        return Highcharts.dateFormat("%Y-%m-%d", timestamp);
    }


} //drawKline end
