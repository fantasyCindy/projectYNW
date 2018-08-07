var groupDatas = []

$(function() {
    
    $.getJSON(path + "/getStockInfoByCodeinser.htm?stockcode=" + stockcode, function(_data) {
        groupDatas = dispatchData(_data);
        if ($('.waitingForChart').get(0)) {
            var id = $('.waitingForChart').attr('id');
            decideForChart(id);
        }
    })

});

///////////////////////////////////////////////////////////////////

function dispatchData(callbackData) {
    var dayGroup = [],
        weekGroup = [],
        monthGroup = [],
        flag = "";

    /*-----------------------------------*/
    //日K数据

    _.forEach(callbackData, function(item) {
        item1 = item.replace(/\[|\]|%/g, "").split(",");
        item1[0] = switchTimestamp(item1[0]);
        item2 = _.map(item1, function(value) {
            return Number(value);
        })
        dayGroup.push(item2)
    })


    /*-----------------------------------*/
    //编号
    var kweek = 1;
    _.forEach(dayGroup, function(item) {
        var time = new Date(item[0])
        var day = time.getDay();
        var month = time.getMonth();
        var year = time.getFullYear();
        if (day == 1) {
            kweek += 1;
        }
        item[11] = kweek;
        item[12] = year + "-" + month;
    })

    //分组

    weekGroup = _.groupBy(dayGroup, function(item) {
        return item[11];
    })

    monthGroup = _.groupBy(dayGroup, function(item) {
        return item[12];
    })

    //周K数据
    // 0:时间, 1:开盘价, 2:最高价, 3:最低价 , 4:收盘价, , 5:成交量, 6:均线5,  7:均线10 , 8:均线30, 9:前收价, 10:涨跌幅, 11：周编号， 12：月编号
    weekGroup = _.map(weekGroup, function(item, index, collection) {
        item = _.take(item, 5);
        return calculate(item, index, collection);
    })

    /*-----------------------------------*/
    //月K数据
    monthGroup = _.map(monthGroup, function(item, index, collection) {
        return calculate(item, index, collection)
    })

    function calculate(item, index, collection) {
        var result = [],
            len = item.length,
            last = len - 1;

        result[0] = item[last][0]; //时间
        result[1] = item[0][1]; //开盘价

        //最高价    
        result[2] = function() {
            var max = _.map(item, function(value, index) {
                return value[2]
            })
            return _.max(max);
        }()

        //最低价 
        result[3] = function() {
            var min = _.map(item, function(value, index) {
                return value[3]
            })
            return _.min(min);
        }()

        result[4] = item[last][4]; //收盘价
        result[5] = item[last][5]; //成交量 
        result[6] = item[last][6]; //5日均线 
        result[7] = item[last][7]; //10日均线 
        result[8] = item[last][8]; //30日均线

        //前收价
        result[9] = function() {
            if (index > 1) {
                var last = collection[index - 1];
                return (last[last.length - 1])[4];
            } else {
                return 0;
            }
        }()

        //张跌幅 
        result[10] = setDecimal((result[4] - result[9]) / result[4] * 100, 2);
        return result
    }

    return [dayGroup, weekGroup, monthGroup];
}


//tab switch
$('.tabBar').on('click', 'td', function() {
    $(this).parent().find('.select').removeClass('select');
    $(this).addClass('select');
    var index = $(this).index();
    $('.shareContainer').hide();
    $('.shareContainer').eq(index).show();
    var id = $(this).attr('id');
    if (groupDatas.length < 1) {
        if ("dayUnitweekUnitmonthUnit".indexOf(id) != -1) {
            $('.waitingForChart').removeClass('waitingForChart');
            $('#' + id).addClass('waitingForChart');
        }
        return;
    }
    decideForChart(id)
})

function decideForChart(id) {
    if (id == "dayUnit") {
        createChart(groupDatas[0], "container");
        return
    }
    if (id == "weekUnit") {
        createChart(groupDatas[1], "container_week");
        return
    }
    if (id == "monthUnit") {
        createChart(groupDatas[2], "container_month");
    }
}



function createChart(data, elementID) {
    // data:  [时间, 开盘价, 最高价, 最低价, 收盘价,  成交量, 5, 10 ,30, 昨日收盘价, 涨跌幅]
    var ohlc = []; //K线图数据
    var volume = []; //柱形图数据
    var average5 = []; //5日平均数据
    var average10 = []; //10日平均数据
    var average30 = []; //30日平均数据
    var dataLength = data.length;
    if (dataLength < 1) {
        alert("股票数据为空")
        return;
    };

    for (var i = 0; i < dataLength; i += 1) {
        var item = data[i];
        ohlc.push([
            item[0], // 时间
            item[1], // 开盘价
            item[2], // 最高价
            item[3], // 最低价
            item[4], // 收盘价
            item[9], // 前收价
            item[10] // 涨幅

        ]);
        volume.push([
            item[0], // 时间
            item[5] //成交量
        ]);
        average5.push([
            item[0], setDecimal(item[6], 2)
        ]);
        average10.push([
            item[0], setDecimal(item[7], 2)
        ]);
        average30.push([
            item[0], setDecimal(item[8], 2)
        ]);
    }

    var buttonSelected = function() {
        switch (elementID) {
            case "container":
                return 0;
            case "container_week":
                return 2;
            case "container_month":
                return 4;
            default:
                alert("elementID not found");
        }
    }()



    //change column color
    var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
    Highcharts.seriesTypes.column.prototype.drawPoints = function() {
        var merge = Highcharts.merge,
            series = this,
            chart = this.chart,
            points = series.points,
            i = points.length;

        while (i--) {
            var candlePoint = chart.series[0].points[i];
            if (candlePoint.open != undefined && candlePoint.close != undefined) {
                var color = (candlePoint.open < candlePoint.close) ? '#DD2200' : '#33AA11';
                var seriesPointAttr = merge(series.pointAttr);
                seriesPointAttr[''].fill = color;
                seriesPointAttr.hover.fill = Highcharts.Color(color).brighten(0.1).get();
                seriesPointAttr.select.fill = color;
            } else {
                var seriesPointAttr = merge(series.pointAttr);
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
                    return "成交量：" + setDecimal(this.y / 10000, 2) + "万手" + "<br>"
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
            return '成交量&nbsp;:&nbsp;' + setDecimal(this.point.y / 10000, 2) + "万手"
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


} //createChart end


//number: String/Number
//count: String/Number
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


//time to timestamp
//switchTimestamp(19851206) => 946915200000
function switchTimestamp(time) {
    time = String(time);
    var year = Number(time.substr(0, 4));
    var month = Number(time.substr(4, 2)) - 1;
    var day = Number(time.substr(6, 7));
    var timestamp = Date.parse(new Date(year, month, day));
    return timestamp;
}

//format time
function setDateFormat(timestamp) {
    return Highcharts.dateFormat("%Y年%m月%d日", timestamp);
}

function setDateFormat2(timestamp) {
    return Highcharts.dateFormat("%Y-%m-%d", timestamp);
}
