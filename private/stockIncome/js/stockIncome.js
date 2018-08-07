$(function() {
    var teacherid = 10;

    //本地化
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

    //个人信息
    var person = {
        container: $('#teacherInfo'),
        items: null,
        total: $('#totalrate'),
        week: $('#weekrate'),
        month: $('#mothrate'),
        ranking: $('#total1'),
        init: function() {
            this.items = this.container.find('.user_left');
            this.render()
        },
        render: function() {
            var _this = this;
            var data = teacherInfo;
            console.log("===老师个人信息===")
            console.log(data);
            if (!data.photo) {
                data.photo = "/public/images/user.jpg"
            }
            this.items.html(template('person-template', data));

            //收益信息
            $.getJSON("/webstock/webQueryserlist.htm", { teacherid: teacherid }, function(data) {
                yn.log("===收益信息===");
                yn.log(data);
                data = data[0]
                _this.total.text(yn.setDecimal(data.totalrate + 20) + "%");
                _this.week.text(data.weekrate);
                _this.month.text(data.mothrate);
                _this.ranking.text(data.total1);
                var y = Math.abs(data.totalrate * 100) + 20
                yn.drawPie("totalRateChart", y, {
                    inner: 130
                })
            })

            //账户总资产   
            $.getJSON('/webstock/webQuerysclist.htm', { teacherid: teacherid }, function(data) {
                $("#totalcapital").text(data.totalcapital);
            })

            //交易次数和胜率
            $.getJSON("/webstock/webQueryserr.htm", { teacherid: teacherid }, function(data) {
                $("#conunt").text(data === null ? 0 : data.conunt);
                $("#shengl").text((data === null ? 0 : data.shengl) + "%");
            })
        }
    }

    //持仓明细
    var hold = {
        container: $('#hold'),
        items: null,
        init: function() {
            this.items = this.container.find('.items');
            this.render();
        },
        render: function() {
            var _this = this;
            yndata.getHoldStock(teacherid).done(function(data) {
                if (data && data.length < 1) {
                    _this.items.html("<p style='text-align:center;margin:50px'>暂无记录</p>")
                    return;
                }
                data = _this.handle(data);
                _this.items.html(template('hold-template', data));
            })
        },
        handle: function(data) {
            return _.map(data, function(item, i) {
                item.cost = yn.setDecimal(item.cost);
                item.mountPandL = yn.colorValue(item.mountPandL, {
                    display: yn.setDecimal(item.mountPandL)
                });
                item.mountrate = yn.colorValue(parseFloat(item.mountrate), {
                    display: item.mountrate
                });
                item.index = i - 0 + 1;

                //查询股票实时信息
                yn.queryStock(item.stockcode, { handle: true, color: true }).done(function(data) {
                    var element = $('#holdItem-' + item.stockcode);
                    element.find('.currentPrice').html(data[3])
                    element.find('.todaychange').html(data[33]);
                })
                return item;
            })
        }
    }

    //交易记录
    var history = {
        container: $('#history'),
        items: null,
        bootpag: null,
        page: 1,
        row: 10,
        init: function() {
            var _this = this;
            this.items = this.container.find('.items');
            this.render();
            this.bootpag = yn.bootpag(this.container);
            this.bootpag.on('page', function(err, n) {
                _this.page++;
                _this.render();
            })
        },
        render: function() {
            var _this = this;
            yndata.getStockTradeHistory(teacherid, { page: this.page, row: this.row }).done(function(data) {
                if (data.rows && data.rows.length < 1) {
                    _this.items.html("<p style='text-align:center;margin:50px'>暂无记录</p>");
                    return;
                }
                data.rows = _this.handle(data.rows);
                _this.items.html(template('history-template', data.rows));
                _this.bootpag.bootpag({ page: this.page, total: data.pageNumber })
            })
        },
        handle: function(arr) {
            var types = ["买入", "卖出"];
            return _.map(arr, function(item) {
                item.actionType = types[item.dealtype];
                item.dealMoney = Math.round(item.dealprice * item.dealnumber);
                return item;
            })
        }
    }


    //月收益图表
    var monthIncome = {
        container: $('#monthIncome'),
        init: function() {
            this.render()
        },
        render: function() {
            var _this = this;
            yndata.getMonthIncome(teacherid).done(function(data) {
                var months = [];
                var incomes = [];
                _.forEach(data, function(item) {
                    months.push(item.ratedate);
                    incomes.push(item.mothrate)
                })
                _this.draw({
                    months: months,
                    incomes: incomes.reverse()
                })
            })
        },
        draw: function(data) {
            $('#monthIncomChart').highcharts({
                chart: {
                    type: 'column',
                    height: 190,
                },
                title: {
                    text: "过去6个月收益曲线"
                },
                legend: {
                    enabled: false,
                    symbolWidth: 0
                },
                tooltip: {
                    valueSuffix: "%"
                },
                xAxis: {
                    categories: data.months
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
                    data: data.incomes,
                    color: "#d72621",
                    negativeColor: "green"
                }]
            })
        }
    }

    var sh300 = {
        container: $('#sh300'),
        init: function() {
            this.render();
        },
        render: function() {
            var _this = this;
            $.getJSON("/getStockInfoByCodeinser.htm?stockcode=sh000300", function(data) {
                data = _this.handle(data);
                data = _.take(data, 400)
                _this.showChart(data);
            })
        },
        handle: function(myData) {
            var datas = [];
            var first = (myData["1"].replace(/\[|\]|%/g, "").split(","))[4];
            for (var key in myData) {
                itemArray = myData[key].replace(/\[|\]|%/g, "").split(",");
                var x = yn.switchTimestamp(itemArray[0]);
                var y = (Number(itemArray[4]) - first) / first;
                y = Math.floor(y * 100) / 100;
                datas.push([x, y]);
            }
            return datas;
        },
        showChart: function(datas) {

            var options = {
                chart: {
                    type: "spline"
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

                xAxis: {
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
                },

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
                }]
            }

            var mychart = new Highcharts.StockChart("sh300Chart", options);
        }
    }

    /*===========================*/
    
    sh300.init()
    person.init();
    hold.init();
    history.init();
    monthIncome.init();
    

    /*===========================*/

    //format time
    function setDateFormat(timestamp) {
        return Highcharts.dateFormat("%Y.%m.%d", timestamp);
    }

})


// //根据直播老师的ID，查询收益信息表中的全部日数据
// $.getJSON(path + "/html/webQueryserK.htmlx?teacherid=" + teacherid, function(incomesTwo) {
//     var datas2 = [];
//     _.each(incomesTwo, function(item, i) {
//         datas2.push([item.ratedate, Math.floor(item.totalrate * 100) / 100])
//     })

//     showChart(datas, datas2);
// })
