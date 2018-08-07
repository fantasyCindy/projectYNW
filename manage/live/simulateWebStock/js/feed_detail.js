//////////////////////////////////////////////////////////////////
$(function() {
    $('#feedDetail .person .user_left').html(template("person-template", teacherJson)); //个人信息
    hodeDetail() //持仓明细
    createIncomeMonthChart(); //创建月收益图表
    createTotalIncomeChart() //创建总收益图表
    showShIndex(); //折线图
})


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
            if (responding.length < 5) {
                alert('暂时未能查到该股票信息');
                return;
            }
            if (responding[3] === "0.00" || responding[3] === "0") {
                responding[3] = responding[2];
            }
            //停牌
            if (responding[32] == "03") {
                responding = _.map(responding, function(item) {
                    if (item === "0.00" || item === "0") {
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


function colorValue(value, suffix) {
    value = Number(value);
    suffix ? suffix : suffix = "";
    if (value <= 0) {
        return '<span class="green">' + value + suffix + '</span>'
    }
    if (value > 0) {
        return '<span class="red">' + value + suffix + '</span>'
    }
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


//持仓明细
function hodeDetail() {
    var url = path + "/html/webQueryshlist.htmlx";
    $.getJSON(url, { teacherid: teacherid }, function(data) {
        tradeHistory(data)
        $('#feedDetail .detailOne .items').html(template('detail-templateOne', data));
        query();
    })

    function query() {
        //查询股票
        $('.hold_stockcode').each(function(index, element) {
            var code = $(this).text();
            var tr = $(this).parent();
            queryStock(code, function(_data) {
                var now = Number(_data[3]);
                var yesterday = Number(_data[2]);
                var change = now - yesterday / yesterday; //涨跌幅
                var hold = Number(tr.find('.holdingsNumber').text()); //持仓数量
                var cost = Number(tr.find('.cost').text())
                var lostMoney = setDecimal((now - cost) * hold, 2);//盈亏额
                var lost = setDecimal(lostMoney / cost * hold, 2); //盈亏率
                tr.find('.currentPrice').html(_data[3]); //现价
                tr.find('.todaychange').html(colorValue(setDecimal(change, 2), "%"));
                tr.find('.mountrate').html(colorValue(lost));
                tr.find('.mountPandL').html(colorValue(lostMoney))
            })
        })
    }
}



function tradeHistory(_data) {
    var url = path + "/html/webQuerysdlist.htmlx";
    $.getJSON(url, { teacherid: teacherid }, function(data) {
        data = changeData(data, _data, "mountPandL");
        data = changeData(data, _data, "mountrate");
        data = changeData(data, _data, "availableNumber");
        $('#feedDetail .detailTwo .items').html(template('detail-templateTwo', data));
    })

    function changeData(data, _data, property) {
        var types = ["买入", "卖出"];
        for (var i = 0; i < data.length; i++) {
            data[i].actionType = types[data[i].dealtype]
            for (var j = 0; j < _data.length; j++) {
                if (_data[j].stockcode == data[i].stockcode) {
                    data[i][property] = _data[j][property];
                }
            }
        }
        return data
    }
}

//总收益图表
function createTotalIncomeChart() {
    var url1 = path + "/html/webQueryserlist.htmlx";
    $.getJSON(url1, { teacherid: teacherid }, function(data) {
        if (data.length < 1) return;
        data = data[0];
        $("#totalrate").text(Math.round(+data.totalrate * 100) / 100 + "%");
        $("#weekrate").text(data.weekrate);
        $("#mothrate").text(data.mothrate);
        $("#total1").text(data.total1);
        //创建图表
        var y = data.totalrate
        var data2 = {
            color: "#78bef1",
            y: y
        }
        var data1 = {
            y: 1 - y,
            color: "#f1f1f1"
        }
        var datas = [data1, data2];
    })
    var url2 = path + "/html/webQuerysclist.htmlx";
    $.getJSON(url2, { teacherid: teacherid }, function(data) {
        $("#totalcapital").text(data.totalcapital);
    })
    var url3 = path + "/html/webQueryserr.htmlx";
    $.getJSON(url3, { teacherid: teacherid }, function(data) {
        $("#conunt").text(data == null ? 0 : data.conunt);
        $("#shengl").text((data == null ? 0 : data.shengl) + "%");
    })
}

//月收益图表
function createIncomeMonthChart() {
    var url = path + "/html/webQueryMothlist.htmlx";
    $.getJSON(url, { teacherid: teacherid }, function(data) {
        var months = [],
            incomes = [];
        data.forEach(function(v, i) {
            months.push(v.ratedate);
            incomes.push(v.mothrate)
        })
        incomes.reverse();

        $('#incomeMonthChart').highcharts({
            chart: {
                type: 'column',
                height: 190,
            },
            title: {
                text: ""
            },
            credits: {
                enabled: false
            },

            legend: {
                enabled: true,
                symbolWidth: 0
            },

            xAxis: {
                categories: months
            },
            yAxis: {
                gridLineDashStyle: 'dash',
                title: {
                    enabled: false
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '月收益率',
                data: incomes,
                color: "red",
                negativeColor: "green"
            }]
        })
    })
}


//全部，三月，月，日双折线图
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


function showShIndex() {
    var url = path + "/getStockInfoByCodeinser.htm?stockcode=sh000300";
    $.getJSON(url, function(myData) {
        var datas = handleData(myData);
        $.getJSON(path + "/html/webQueryserK.htmlx?teacherid=" + teacherid, function(incomesTwo) {
            var datas2 = [];
            _.each(incomesTwo, function(item, i) {
                datas2.push([item.ratedate, Math.floor(item.totalrate * 100) / 100])
            })

            showChart(datas, datas2);
        })
    })

    function handleData(myData) {
        var datas = [];
        var first = (myData["1"].replace(/\[|\]|%/g, "").split(","))[4];
        for (var key in myData) {
            itemArray = myData[key].replace(/\[|\]|%/g, "").split(",");
            var x = switchTimestamp(itemArray[0]);
            var y = (Number(itemArray[4]) - first) / first;
            y = Math.floor(y * 100) / 100;
            datas.push([x, y]);
        }
        return datas;
    }
}


function showChart(datas, datas2) {
    var options = {
        chart: {
            type: "line"
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: true
        },
        scrollbar: {
            enabled: false
        },

        navigator: {
            enabled: false
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
            selected: 1,
            inputEnabled: false,
            buttons: [{
                type: "day",
                count: 7,
                text: "周"
            }, {
                type: "month",
                count: 1,
                text: "月"
            }, {
                type: "month",
                count: 3,
                text: "三个月"
            }, {
                type: "year",
                count: 1,
                text: "年"
            }]
        },

        xAxis: [{
            type: "datetime",
            dateTimeLabelFormats: {
                week: '%Y-%m-%e'
            },
            labels: {
                formatter: function() {
                    return setDateFormat(this.value)
                }
            },
            lineWidth: 1,
            gridLineWidth: 1,
            gridLineDashStyle: "dash",
            tickPositioner: function() {
                var count = this.ordinalPositions.length;
                var p1 = this.ordinalPositions[Math.round(count / 4)];
                var p2 = this.ordinalPositions[Math.round(count * 2 / 4)];
                var p3 = this.ordinalPositions[Math.round(count * 3 / 4)];
                var positions = [this.min, p1, p2, p3, this.max];
                return positions;
            }
        }, {
            type: "category",
            labels: {
                enabled: false
            },
            tickWidth: 0,
            categories: _.map(datas2, function(item, i) {
                return item[0]
            })
        }],

        yAxis: [{
            opposite: false,
            lineWidth: 0,
            gridLineDashStyle: "dash",
            startOnTick: true,
            endOnTick: true
        }],

        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false,
                }
            }
        },

        series: [{
            data: datas,
            name: "沪深300",
            color: '#6fb4e5',
            lineColor: '#8ac4eb',
            tooltip: {
                headerFormat: "",
                pointFormatter: function() {
                    return this.y + "%"
                }
            },
            marker: {
                enabled: true,
                radius: 3,
            },
        }, {
            data: datas2,
            name: "收益率",
            color: '#f7684f',
            lineColor: '#f86b50',
            tooltip: {
                useHTML: true,
                headerFormat: ""
            },
            marker: {
                enabled: true,
                radius: 3,
            },
            marker: {
                enabled: true,
                radius: 3,
            },
            xAxis: 1
        }]
    };

    var mychart = new Highcharts.StockChart("timeRow", options);
    return mychart;
}

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
    return Highcharts.dateFormat("%Y-%m-%d", timestamp);
}
