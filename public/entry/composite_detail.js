//////////////////////////// module ////////////////////////////////////////////
yn.navigation.name = ynconfig.navigation.i;
var Path = require('~/lib/path.js');
var PayConfirm = require('~/ui/pay-confirm.js');
var Track = require('~/ui/track.js').track;
var CustomStock = require('~/ajax/customStock.js');
var HandleCompositeData = require('~/composite/handleData.js').handleData;
var ErrorCode = require('~/lib/errorCode.js');
var Message = require('~/ui/message.js');

/////////////////////////////// globle /////////////////////////////////////////

// 组合ID
var __compositeId = (function() {
    var match = window.location.href.match(/([0-9]+).htm/)
    return +match[1] || "-1";
})()
var __holdStock = []; // 持仓数据
var __compositeData = null; // 组合数据
var __isSelfComposite = !!ynTeacherId && +window.location.href.match(/([0-9]+)\.htm/)[1] == +ynTeacherId;


// 开盘/收盘时间
var __today = yn.now({ pad: true });
var __marketOpenTime = Date.parse([__today[0], __today[1], __today[2]].join('/') + " 09:30:00");
var __marketEndTime = Date.parse([__today[0], __today[1], __today[2]].join('/') + " 15:00:00");


var getLimitHtml = function(ops) {
    var status = +__compositeData.combination_status;
    status = _.min([2, status]);
    var statusText = [
        "组合正在预售中， " + __compositeData.starttime + "开始运行",
        "组合正在运行中，" + ops.msg,
        "组合已结束"
    ][status]
    return '<div style="text-align:center;margin:100px 0;font-size:16px;color:gray">' +
        '<span class="fa fa-dot-circle-o fa-lg" style="margin-right:5px"></span>' +
        '<span>' + statusText + '</span></div>'
}

var getLimitAction = function(ops) {
    return '<div style="text-align:center;margin:100px 0;font-size:16px;color:gray;width:100%">' +
        '<span class="fa fa-dot-circle-o fa-lg" style="margin-right:5px"></span>' +
        '<span>' + ops.msg + '</span></div>'
}

var errorTable = {
    a: "暂时不能买入,等待开盘",
    b: "15:00以后不能交易",
    c: "该股票已经停盘,不能买卖",
    d: "买卖股票的数量必须是100的整数",
    e: "请输入买入价格",
    f: "请选择股票",
    g: '超出可卖数量'
}


/*///////////////////////////////////////////////////////////////////*/


//组合UI
var UIComposite = {};

/**
 * 单个组合类型
 * index : number 
 * return : HTML
 */
UIComposite.style = function(ops) {
    _.extend(this, ops)
}
UIComposite.style.prototype = {
    container: null,
    index: 1,
    render: function() {
        this.container.html(this.html());
    },
    html: function() {
        var values = ynconfig.composite_style[+this.index];
        var time = _.now();
        return `<span id="${time}" class="composite-style" data-value="${values[0]}">${values[1]}</span>`
    }
}

/**
 * 组合样式列表
 * return : HTML
 */
UIComposite.styleList = function() {
    var self = this;
    var items = _.map(ynconfig.composite_style, function(item, index) {
        return self.style(index);
    }).join("")
    return `<div>${items}</div>`
}


/*///////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////*/


//获取组合数据
var getCompositeData = function(callback) {
    var redirect = () => window.location.href = Path.composite.portal();
    $.ajax({
        type: 'GET',
        data: {
            user_id: ynUserId,
            combinationid: __compositeId
        },
        url: "/combination/combinationProfile.htm",
        dataType: 'json',
        success: function(data) {
            if (!data.data || +data.data.status != 1) {
                redirect();
                return;
            }
            data = HandleCompositeData([data.data], "detail");
            __compositeData = data[0];
            callback();
        },
        error: function() {
            redirect();
        }
    })
}


//组合简介
var profile = function() {
    var container;
    return {
        init: function() {
            container = $("#profile");
        },
        render: function() {
            container.html(template("profile-template", __compositeData))
            feedBar.render();
        }
    }
}()



// 当前收益
var stockIncome = (function() {
    var container, chart, items, menu

    var handleData = data => {
        for (var key in data) {
            if (key == "dealrecordCount") continue;
            data[key] = yn.setDecimal(data[key] * 100, { math: 'round' });
        }
        return data;
    }

    // 创建当前收益
    var createIncome = item => {
        item.nowtotalrate = yn.color(item.nowtotalrate, { display: item.nowtotalrate + "%" })
        return `<div class="income-left">
                    <div class="current"><span class="value">${item.nowtotalrate}</span><span class="txt">当前收益</span></div>
                    <div class="other"><table><tr>
                        <td><div class="value">${item.maxtotalrate}%</div><div class="txt">最大盈利</div></td>
                        <td><div class="value">${item.mintotalrate}%</div><div class="txt">最小盈利</div></td>
                        <td><div class="value">${item.dealrecordCount}</div><div class="txt">累计交易次数</div></td>
                    </tr></table></div>
                </div>
                <div class="income-right" id="incomeChart"></div>`
    }

    return {
        init() {
            container = $(".stockIncome")
            chart = $("#incomeChart")
            items = container.find('.items')
            menu = container.find('.menu')
            menu.on("click", '.menu-2-item', function() {
                yn.switch($(this))
                name = $(this).data('name')
                stockIncome.render[name]()
            })
        },
        render: {
            income() {
                $.getJSON("/combination/MaxMinAndNowEarnings.htm", {
                    teacherid: __compositeData.teacherid,
                    combinationid: __compositeId
                }, data => {
                    items.html(createIncome(handleData(data)))
                })

                //收益曲线图
                lastestIncomeChart(data => {
                    data.container = $('#incomeChart');
                    drawArea(data);
                })

            },
            feed: () => items.html(template("feed-template")), // 订阅服务
            refund: () => items.html(template("refund-template")) // 退款保障
        }
    }
})()



//最近收益曲线图
function lastestIncomeChart(callback) {
    //图表:收益曲线图
    $.getJSON("/simulatedStock/queryserK.htm", {
        combinationid: __compositeId,
        teacherId: __compositeData.teacherid,
        currentPage: 1,
        pageSize: 7
    }, function(data) {
        setTimeout(() => {
            callback({
                categories: _.map(data, item => item.datetime.match(/^\d+-(\d+-\d+)/)[1]),
                data: _.map(data, item => +yn.setDecimal(item.totalrate * 100))
            })
        }, 1000);
    })
}


//模拟炒股菜单
var recordMenu = function() {
    var container, hold, children;
    return {
        init: function() {
            var self = this;
            hold = {
                recordHistory: recordHistory,
                recordCurrent: recordCurrent,
                recordChart: recordChart
            }
            container = $("#stockRecord .menu");
            children = $('#stockRecord .child');
            container.on('click', '.menu-2-item', function() {
                yn.switch($(this))
                var type = $(this).data('type');
                children.each(function() {
                    var id = $(this).attr('id');
                    if (type == id) {
                        self.current = id;
                        hold[type].render();
                    } else {
                        $(this).hide();
                    }
                })
            })
        },
        current: null
    }
}()


//调仓记录
var recordHistory = function() {
    var container, items, bootpag
    var handleData = function(data) {
        return _.chain(data).map(function(item) {
            var type = ["买入", "卖出", "未完成"][item.dealtype];
            var matchTime = item.dealtime.match(/[^\s]+/g)
            item._date = matchTime[0];
            item._time = matchTime[1].match(/^\d+:\d+/)[0];
            item._deal = item.dealprice + "元" + type + item.dealnumber + "股";
            item._operate = item._time + '<span class="type' + item.dealtype + '">' + type + '</span>';
            item._change = yn.setDecimal(item.positionrate * 100) + "%";
            item._profit = item.dealtype == 1 ? `盈亏额：${item.profit}元` : ""
            return item;
        }).groupBy(function(item) {
            return item._date;
        }).map(function(value, key) {
            return { time: key, values: value }
        }).value();
    }

    return {
        init: _.once(function() {
            var self = this;
            container = $("#recordHistory")
            items = container.find('.items')
            bootpag = yn.bootpag(container);
            bootpag.on('page', function(err, num) {
                self.render({
                    currentPage: num
                });
            })

            //添加自选
            container.on('click', '.addStockBtn', function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return
                }
                var send = {
                    stockname: $(this).data('name'),
                    stockcode: $(this).data('code')
                }
                CustomStock.add(send);
            })

        }),
        render: function(ops) {
            container.show();
            var param = {
                combinationid: __compositeId,
                pageSize: 11,
                currentPage: 1
            }
            _.extend(param, ops);

            if (!ynIsLogin || !__compositeData.is_od) {
                bootpag.hide();
                items.html(getLimitHtml({ msg: "订阅后方可查看调仓记录" }));
                return;
            }

            $.getJSON("/simulatedStock/querysdlist.htm", param, function(data) {
                console.log("--===---", data);
                var rows = handleData(data.rows);
                if (rows.length < 1) {
                    bootpag.hide();
                    items.html(ynconfig.none({ margin: 50 }))
                    return;
                }
                items.html(template("recordHistory-template", rows));
                var pageNumber = _.max([1, Math.ceil(+data.total / param.pageSize)]);
                bootpag.show().bootpag({ page: self.page, total: pageNumber });
            })
        }
    }
}()



//当前持仓
var recordCurrent = (function() {
    var container = $("#recordCurrent");
    var table;

    var createTag = item => {
        return `<tr class="body">
            <td class="name">${item.stockname}(${item.stockcode})</td>
            <td class="price">${item._current}</td>
            <td class="up">${item._up}</td>
            <td class="cost">${item._cost}</td>
            <td class="float">${item._float}</td>
            <td>${item.holdingsNumber}</td>
            <td class="store">${item._holdRate}</td>
        </tr>`
    }

    return {
        init: function() {
            table = container.find('tbody');
        },
        render: function() {
            container.show();
            if (!ynIsLogin || !__compositeData.is_od) {
                container.html(getLimitHtml({ msg: "订阅后方可查看当前持仓记录" }))
                return;
            }

            table.empty();
            getHoldingStock(item => table.append(createTag(item)))
                .fail(() => container.html(ynconfig.none({ margin: 100 })))
        }
    }
})()


/*
    查询持仓数据 
    返回实时股价，仓占比，浮动盈亏等
*/
function getHoldingStock(callback) {
    var defer = $.Deferred();
    $.getJSON('/simulatedStock/queryshlist.htm?combinationid=' + __compositeId, function(_data) {
        __holdStock = _data;
        var len = _data.length;
        if (len < 1) {
            defer.reject();
            return;
        }
        //查询总资产
        $.getJSON(`/simulatedStock/querysclist.htm?combinationid=${__compositeId}`, function(data) {
            var totalcapital = +data.totalcapital;
            _.times(len, index => {
                var item = _data[index];
                //查询股票
                yn.queryStock(item.stockcode, { handle: true, color: true }).done(data => {
                    var hold = +item.holdingsNumber
                    var price = +yn.filterHTML(data[3]);
                    var cost = +item.cost;

                    item._current = data[3]; //现价
                    item._up = data[33]; //涨跌幅
                    item._cost = yn.setDecimal(item.cost);

                    //浮动盈亏
                    item._float = Math.round((price - cost) * hold * 100) / 100;
                    item._float = yn.color(item._float)

                    //仓占位
                    item._holdRate = yn.setDecimal(price * hold / totalcapital * 100) + "%";
                    callback(item);
                })
            })
        })
    })
    return defer.promise();
}


//交流区
var recordChart = (function() {
    var container, wrap
    return {
        init: function() {
            container = $("#recordChart");
            wrap = container.find('.wrap');

            simulate_talk.publish.init({
                container: container.find('.publish-container')
            });

            simulate_talk.comments.init({
                container: container.find('.comments')
            });
        },
        render: function() {
            container.show();
            var impress = new Impress({
                container: container.find(".impress"),
                clicked: false
            }).render();

            simulate_talk.comments.render();
            impress.clicked = true;
        }
    }
})()



//组合订阅
var feedBar = function() {
    var container;
    var feedTable = {
        done: () => layer.msg("组合已经结束"),
        teacher: () => layer.msg("老师不能订阅"),
        login: () => yn.login.render()
    }

    return {
        init: function() {
            container = $(".feedBar");
            container.on('click', '.toFeed', function() {

                var curType = $(this).data('type')
                var isPeep = curType == 'peep';
                var isDone = curType == "done";

                var query = [
                    { key: "login", assert: !ynIsLogin },
                    { key: "done", assert: isDone },
                    { key: "teacher", assert: !!ynTeacherId }
                ]

                var filter = _.filter(query, item => item.assert);
                if (filter.length > 0) {
                    feedTable[filter[0].key]();
                    return;
                }

                //免费的组合直接订阅成功
                if (__compositeData.order_price === 0) {
                    $.post("/app/freeSubscription.htm", {
                        pay_source: 0,
                        combinationid: __compositeId
                    }, function(data) {
                        if (data == "success") {
                            layer.msg("组合订阅成功")
                            setTimeout(() => window.location.reload(), 800);
                        } else {
                            layer.msg(`组合订阅失败 : ${data}`)
                        }
                    })
                    return;
                }


                var priceKey = isPeep ? 'peep_price' : "order_price";
                var send = {
                    pay_source: 0,
                    goodsId: __compositeId, //组合ID
                    goodsType: 1,
                    buy_number: 1,
                    _type: (isPeep ? 1 : "") //如果是订阅则不传值 如果是瞄一眼则传1
                }

                $.post("/app/buyGoodsPayOrder.htm", send, function(data) {
                    if (!data.data) {
                        var status = ErrorCode[data.status];
                        layer.msg(`错误状态码: ${status}, 请刷新后再试`);
                        return;
                    }

                    var order = data.data.orderNum;
                    PayConfirm.render({
                        name: "组合支付",
                        price: __compositeData[priceKey],
                        link: "/html/returnshortcutpayJsp.htm?orderNum=" + order,
                        fail: data => layer.msg(`支付失败:${data}`),
                        success: data => {
                            layer.msg("支付成功, 页面即将刷新");
                            setTimeout(() => window.location.reload(), 1000)
                        }
                    })
                }, 'json')
            })
        },
        render: function() {
            container.html(template("feedBar-template", __compositeData));
        }
    }
}()



//历史业绩
var teacherHistory = function() {
    var container, items, chart;
    return {
        init: function() {
            container = $('.history');
            items = container.find('.items');
            chart = container.find('.chart');
        },
        render: function() {
            items.html(template('history-template', __compositeData));

            new Track({
                container: chart.find('.chart-item-1 .draw'),
                ratio: 12.5,
                style: "ynui-bg-red"
            }).render();

            new Track({
                container: chart.find('.chart-item-2 .draw'),
                ratio: 22.1,
                style: "ynui-bg-green"
            }).render();

            new Track({
                container: chart.find('.chart-item-3 .draw'),
                ratio: 16.7,
                style: "ynui-bg-blue"
            }).render();

        }
    }
}()


/*////////////////////////////////////////////////////////////*/
/*///////////////////////  self  ////////////////////////////*/
/*//////////////////////////////////////////////////////////*/


//资产
var wealth = function() {
    var container, item;
    var handleData = function(data) {
        data._wealthRatio = yn.setDecimal(+data.totalcapital / 1000000);
        return data;
    }

    return {
        init: function() {
            container = $('#teacher-wealth')
        },
        render: function() {
            var self = this;
            $.getJSON("/simulatedStock/querysclist.htm?combinationid=" + __compositeId, function(data) {
                data = handleData(data);
                container.html(template('wealth-template', data));
                self.done();
            })
        },
        done: function() {
            console.log("wealth done function not override...")
        }
    }
}()


//组合简介
var teacher_Intro = function() {
    var container, loading
    return {
        init: function() {
            container = $("#teacherContent .intro");
            loading = new yn.loading({
                container: container
            })
            loading.render();
        },
        render: function() {
            $.getJSON("/combination/combinationOrderUser.htm", {
                combinationid: __compositeId,
                pageSize: 1,
                currentPage: 1
            }, function(data) {
                __compositeData._feedCount = data.total;
                container.html(template('teacherContent-intro-template', __compositeData));
            })
        }
    }
}();


//股票收益信息
var profit = function() {
    var container
    var handle = function(data) {

        data = _.extend({
            firstTradingTime: "---",
            lastTradingTime: "---",
            mothrate: "---",
            weekrate: "---",
            dayrate: "---",
            maxEarnings: "---",
            winrate: "---",
        }, data)

        data.firstTradingTime = data.firstTradingTime.match(/^[^\s]+/)[0]
        data.lastTradingTime = data.lastTradingTime.match(/^[^\s]+/)[0]
        data.mothrate = yn.setDecimal(data.mothrate); //月均收益
        data.weekrate = yn.setDecimal(data.weekrate * 100); //本均收益
        data.dayrate = yn.setDecimal(data.dayrate * 100); //日均收益/当日收益
        data.maxEarnings = yn.setDecimal(data.maxEarnings * 100);
        data.winrate = yn.setDecimal(data.winrate);
        return data;
    }
    return {
        init: function() {
            container = $("#profit-income")
        },
        render: function() {
            var self = this;
            $.getJSON("/simulatedStock/queryserlist.htm", {
                teacherid: __compositeData.teacherid,
                combinationid: __compositeId
            }, function(data) {
                data = handle(data);
                container.html(template('profit-template', data));
                self.done(data)
            })

            lastestIncomeChart(data => {
                data.container = $('#incomeLineChart');
                data.width = 590;
                data.height = 240;
                drawArea(data)
            })
        },
        done: function(data) {
            $('.dayrate').text(data.dayrate + "%");
            $('.weekrate').text(data.weekrate + "%");
        }
    }
}()

var kline300 = function() {
    return {
        render: function() {
            $.getJSON("/combination/shK.htm", function(data) {
                if (!data || !data.sh300) return;
                data = data.sh300;

            })
        }
    }
}()


//折线图
function drawLine() {
    var ops = {
        chart: {
            height: 250
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: ["09-01", "09-02", "09-03", "09-04", "09-05", "09-06", "09-07", "09-08"],
            tickmarkPlacement: 'on',
            tickInterval: 2
        },
        yAxis: {
            title: {
                enabled: false
            },
            opposite: true,
            labels: {
                formatter: function() {
                    return this.value + "%";
                }
            }
        },
        tooltip: {
            pointFormatter: function() {
                return this.series.name + ":" + this.y + "%";
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '沪深300',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5]
        }, {
            name: '组合收益',
            color: "#d72621",
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1]
        }]
    }

    $('#incomeLineChart').highcharts(ops);
}


/*///////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////*/

//模拟炒股菜单
var simulate_menu = function() {
    var container, children, item, e = {};
    return {
        init: function() {
            var hold = {
                simulate_buy: simulate_buy,
                simulate_hold: simulate_hold,
                simulate_sell: simulate_sell,
                simulate_rollback: simulate_rollback,
                simulate_history: simulate_history,
                simulate_talk: simulate_talk
            }

            container = $("#simulate_menu");
            children = $('#simulateBar .child');
            item = container.find('.menu-item');

            item.click(function() {
                yn.switch($(this));
                var value = $(this).data('value');
                e.text = $(this).text();
                e.value = value;
                children.each(function() {
                    if ($(this).attr('id') == value) {
                        hold[value].render();
                    } else {
                        $(this).hide();
                    }
                    realtime.hide()
                })

            })
        },
        select: function(text) {
            if (e.text == text) return;
            item.each(function() {
                if ($(this).text() == text) {
                    $(this).addClass('select');
                } else {
                    $(this).removeClass('select')
                }
            })
        }
    }
}()


//持仓=老师端
var simulate_hold = function() {
    var container, items, counter = 0,
        rows = {};

    var createTag = function(item) {
        var tag = `<tr data-i=${counter}>
            <td class="name">${item.stockname}</td>
            <td class="code">${item.stockcode}</td>
            <td class="price">${item._current}</td>
            <td class="up">${item._up}</td>
            <td class="holdCount">${item.holdingsNumber}</td>
            <td class="cost">${item.cost}</td>
            <td class="float">${item._float}</td>
            <td class="holdRate">${item._holdRate}</td>
            <td class="action buy"><button>买入</button></td>
            <td class="action sell"><button>卖出</button></td>
        </tr>`
        rows[counter] = item;
        counter++
        return tag;
    }

    return {
        init: function() {
            var self = this
            container = $("#simulate_hold");
            items = container.find('tbody');

            //买入
            container.on('click', '.action.buy', function() {
                var index = $(this).parents('tr').data('i');
                var itemData = rows[index];
                container.hide();
                simulate_buy.render({ data: itemData });
            })

            //卖出
            container.on('click', '.action.sell', function() {
                var index = $(this).parents('tr').data('i');
                var itemData = rows[index];
                container.hide();
                simulate_sell.render({ data: itemData });
            })
        },
        render: function() {
            var self = this
            if (__compositeData.combination_status == 0) {
                container.show().html(getLimitAction({ msg: "组合尚未运行" }))
                return;
            }
            simulate_menu.select("持仓");
            container.show();
            items.empty();
            counter = 0;

            getHoldingStock(item => items.append(createTag(item)))
                .fail(() => container.html(ynconfig.none()))
        }
    }
}()



//股票实时信息
var realtime = function() {
    var container, code;

    return {
        data: null,
        isStop: false, //是否停盘
        init: function() {
            var self = this;
            container = $('#realtimeContainer');

            setInterval(function() {
                if (!code) return;
                self.render(code);
            }, 5000);
        },
        render: function(_code, callback) {
            code = _code;
            var self = this;
            yn.queryStock(code, { handle: true, color: true }).done(function(data) {
                self.isStop = data[32] == "3.00" ? true : false; //股票是否停盘
                container.show().html(template('realtime-template', {
                    responding: data
                }));

                //去格式化:纯数据
                var data = _.map(data, item => yn.filterHTML(item + ""))
                if (callback) {
                    callback(data)
                }
                self.onChange(data);
                self.data = data;
            })
        },
        hide: function() {
            code = null;
            container.hide();
            self.isStop = false;
        },
        onChange: function() {}
    }
}();



//买入股票
var simulate_buy = function() {
    var container, code, price, avaliable,
        count, maxCount, selector,
        selector_code, selector_name,
        price_max, price_min;

    //重置
    var reset = function() {
        selector.hide();
        code.removeAttr('readonly');
        selector_code.text("");
        selector_name.text("");
        container.find('input').val("");
        price_max.text("0.00");
        price_min.text("0.00");
        realtime.hide();
        maxCount.hide();
    }


    //选择股票
    var selectCode = function(stockcode, stockname) {
        code.val("").attr('readonly', 'true');
        selector.show();
        selector_code.text(stockcode);
        selector_name.text(stockname);
    }

    return {
        init: function() {
            container = $("#simulate_buy");
            code = $("#buy-stock-code");
            price = $("#buy-price");
            avaliable = $("#buy_avaliable");
            count = $("#buy-count");
            maxCount = $("#buy-maxCount");
            selector = $("#buy-select");
            selector_code = selector.find('.code');
            selector_name = selector.find('.name');
            price_max = $("#buy-price-max");
            price_min = $("#buy-price-min");

            var maxBuyCountValue = 0; //最多可买

            //设置买入价格
            var priceOld = null //保存上一次输入的值
            var setPriceVal = function(value) {
                var min = +price_min.text()
                var max = +price_max.text()
                if (value > max || value < min) {
                    layer.msg('不能高于涨停价格/不能低于跌停价格')
                    price.val(priceOld);
                    return;
                }
                value = Math.round(value * 100) / 100
                price.val(value);
                priceOld = value;
            }

            yn.showStockList(code, {
                onSelect: function(item) {
                    realtime.render(item.stockCode, function(_data) {
                        price.val(_data[3])
                    });
                    selectCode(item.stockCode, item.stockName);
                }
            })

            //取消选择股票
            selector.find('.icon').click(function() {
                reset();
            })

            //修改股票价格
            price.change(function() {
                setPriceVal($(this).val())
            })

            $("#buy-price-minus-btn").click(function() {
                setPriceVal(+price.val() - 0.01);
            })

            $("#buy-price-plus-btn").click(function() {
                setPriceVal(+price.val() + 0.01);
            })

            //可用资金
            setTimeout(function() {
                avaliable.text($("#wealth-avaliable").text())
            }, 1000)

            //买入数量
            count.change(function() {
                var val = +$(this).val()
                if (val > maxBuyCountValue) {
                    layer.msg("最多可购买" + maxBuyCountValue);
                    $(this).val(maxBuyCountValue)
                }
            })
            count.focus(function() {
                var val = +price.val();
                if (!val) {
                    layer.msg("请先输入买入价格");
                    $(this).val("");
                    return;
                }
                maxBuyCountValue = Math.floor(+avaliable.text() / val);
                maxCount.show().html("最多可买" + maxBuyCountValue + "股")
            })

            //快捷买入数量x
            container.on('click', '.limit-item', function() {
                var ratio = +$(this).data('value');
                var max = Math.floor(+avaliable.text() / +price.val());
                var res = Math.floor(max * ratio / 100) * 100;
                count.val(res)
            })


            //买入操作
            $('#submit-buy').click(function() {
                var now = _.now();
                var val_count = count.val();
                var val_price = price.val();
                var val_stockcode = selector_code.text()
                var val_stockname = selector_name.text()

                var query = [
                    { key: "a", assert: now < __marketOpenTime },
                    { key: "b", assert: now > __marketEndTime },
                    { key: "c", assert: realtime.isStop },
                    { key: "f", assert: !val_stockcode },
                    { key: "d", assert: !val_count || (val_count % 100 !== 0) },
                    { key: "e", assert: !val_price }
                ]

                var filters = _.filter(query, item => item.assert);
                if (filters.length > 0) {
                    layer.msg(errorTable[filters[0].key])
                    return;
                }

                var save = {
                    stockcode: val_stockcode,
                    price: val_price,
                    entrustnumber: val_count, //买入数量
                    dealtype: 0,
                    stockname: val_stockname,
                    currentPrice: realtime.data[3],
                    combinationid: __compositeId
                }

                $.post("/simulatedStock/buyIn.htm", save, function(data) {
                    if (data == "success") {
                        layer.msg("成功买入");
                        setTimeout(() => { window.location.reload(), 500 })
                        return;
                    }
                    if (data == "15") {
                        layer.alert("当前老师未初始化资金");
                    }
                });
            })

        },
        render: function(ops) {
            if (__compositeData.combination_status != 1) {
                container.show().html(getLimitAction({ msg: "仅运行中的组合，才能进行买入操作" }))
                return;
            }
            simulate_menu.select("买入")
            ops = _.extend({
                data: null
            }, ops)

            container.show();
            reset();

            realtime.onChange = function(_data) {
                price_max.text(yn.setDecimal(_data[1] * 1.1));
                price_min.text(yn.setDecimal(_data[1] * 0.9));
            }

            //数据回填
            if (ops.data) {
                selectCode(ops.data.stockcode, ops.data.stockname);
                realtime.render(ops.data.stockcode);
                price.val(ops.data.nowprice);
            }
        }
    }
}()


//卖出操作
var simulate_sell = function() {
    var container, select, price, count,
        price_tip, price_min, price_max,
        count_tip, count_max, price_old,
        sell_count

    //最多可卖
    var setCountMax = function(code) {
        $.get("/simulatedStock/getMostSellOut.htm", {
            stockcode: code,
            combinationid: __compositeId
        }, function(data) {
            count_max.text(data)
        })
    }

    ///价格区间
    var setPriceLimit = function(value) {
        value = +value;
        price.val(value);
        var min = yn.setDecimal(value * 0.9);
        var max = yn.setDecimal(value * 1.1);
        price_tip.show();
        price_min.text(min);
        price_max.text(max);
    }

    //设置价格
    var setPriceVal = function(val) {
        var min = +price_min.text()
        var max = +price_max.text();
        if (val < min || val > max) {
            layer.msg(`${val}价格超过范围`)
            price.val();
            return;
        }
    }

    return {
        init: function() {
            container = $("#simulate_sell");
            select = container.find('select');
            price = $("#sell-price");
            count = $("#sell-count");
            price_tip = container.find('.price-tip');
            price_min = container.find('.price-min');
            price_max = container.find('.price-max');
            count_tip = container.find('.count-tip');
            count_max = container.find('.count-max');

            //股票变动时更新数据
            select.change(function() {
                var val = $(this).val();
                realtime.render(val, function(data) {
                    setPriceLimit(data[3]);
                })
                setCountMax(val);
            })

            //价格增减
            container.find('.price-calculate .item').click(function() {
                var value = parseFloat($(this).data('value'));
                var val = +price.val();
                var result = yn.setDecimal(val + value, {
                    math: "round"
                })
                setPriceVal(result);
            })

            //价格变动时进行验证
            price.change(function() {
                var val = +$(this).val();
                setPriceVal(val);
            })

            //验证卖出股数
            count.change(function() {
                var max = +count_max.text()
                var val = +$(this).val();
                if (!/^[1-9]\d*$/.test(val) || val < 0 || val > max) {
                    layer.msg("超出可卖数量");
                    $(this).val('');
                }
            })

            //快捷数量
            container.find('.count-calculate .item').click(function() {
                var value = +$(this).data('value');
                var max = +count_max.text();
                count.val(Math.floor(Math.floor(max * value) / 100) * 100);
            })

            //卖出操作
            container.find('.submit').click(function() {
                var now = _.now();
                var val_count = +count.val();

                var query = [
                    { key: "a", assert: now < __marketOpenTime },
                    { key: "b", assert: now > __marketEndTime },
                    { key: "c", assert: realtime.isStop },
                    { key: "d", assert: !val_count || (val_count % 100 !== 0) },
                    { key: "g", assert: val_count > +count_max.text() }
                ]

                var filters = _.filter(query, item => item.assert);
                if (filters.length > 0) {
                    layer.msg(errorTable[filters[0].key])
                    return;
                }

                var send = {
                    stockcode: select.val(),
                    stockname: select.find('option:selected').text(),
                    entrustnumber: val_count,
                    price: +price.val(),
                    currentPrice: realtime.data[3],
                    dealtype: 1,
                    combinationid: __compositeId
                }

                $.post("/simulatedStock/sellOutstock.htm", send, function(data) {
                    if (data == "success") {
                        layer.msg("卖出成功");
                        container.hide();
                        realtime.hide();
                        simulate_hold.render();
                        return;
                    } else {
                        layer.msg(`卖出操作失败`)
                    }
                });
            });

        },
        render: function(ops) {
            if (__compositeData.combination_status != 1) {
                container.show().html(getLimitAction({ msg: "仅运行中的组合，才能进行卖出操作" }))
                return;
            }
            simulate_menu.select("卖出");
            if (__holdStock.length < 1) {
                layer.msg("没有股票可以卖出!")
                return
            };
            container.show();
            ops = _.extend({
                data: __holdStock[0]
            }, ops)

            var data = ops.data;

            //填充数据
            select.html(_.map(__holdStock, function(item) {
                return '<option value="' + item.stockcode + '">' + item.stockname + '</option>'
            }).join(""));

            select.val(data.stockcode)
            realtime.render(data.stockcode, function(data) {
                setPriceLimit(data[3])
            })
            setCountMax(data.stockcode);
            count.val("")
        }
    }
}()


//撤单
var simulate_rollback = (function() {
    var container, data;
    return {
        init: function() {
            container = $("#simulate_rollback");

            //撤单
            container.on('click', '.action.rollback', function() {
                var tr = $(this).parents('tr');
                var index = tr.index() - 1;
                var itemData = data[index];
                var send = {
                    stockcode: itemData.stockcode,
                    billno: itemData.billno,
                    stockname: itemData.stockname,
                    id: itemData.id,
                    price: itemData.price,
                    entrustnumber: itemData.entrustnumber,
                    dealtype: itemData.dealtype,
                    combinationid: __compositeId
                }

                $.post("/simulatedStock/returnstockback.htm", send, function(data) {
                    if (data == "success") {
                        layer.msg("撤单成功");
                        tr.remove()
                    } else {
                        layer.msg("error " + data);
                    }
                })
            })
        },
        render: function() {
            if (__compositeData.combination_status == 0) {
                container.show().html(getLimitAction({ msg: "组合尚未运行" }))
                return;
            }
            simulate_menu.select("撤单");
            container.show();
            $.getJSON("/simulatedStock/queryselist.htm?combinationid=" + __compositeId, function(_data) {
                if (_data.length < 1) {
                    container.html(ynconfig.none({ margin: 100 }));
                    return;
                }
                data = _data;
                container.html(template('simulate-rollback-template', data));
            });
        }
    }
})();



//历史记录
var simulate_history = function() {
    var container, items, bootpag;

    var handleData = function(data) {
        return _.map(data, function(item) {
            item._type = ["买入", "卖出", "未完成"][item.dealtype];
            item._time = yn.timeFormat(item.dealtime);
            item._profit = ["---", `${item.profit}元`][item.dealtype]
            return item;
        })
    }

    return {
        page: 1,
        row: 20,
        init: function() {
            var self = this;
            container = $("#simulate_history")
            items = container.find('.items')
            bootpag = yn.bootpag(container)
            bootpag.on('page', function(err, num) {
                self.page = num;
                self.render();
            })
        },
        render: function() {
            if (__compositeData.combination_status == 0) {
                container.show().html(getLimitAction({ msg: "组合尚未运行" }))
                return;
            }
            var self = this;
            simulate_menu.select("查询")
            container.show();
            $.getJSON("/simulatedStock/querysdlist.htm", {
                combinationid: __compositeId,
                pageSize: self.row,
                currentPage: self.page
            }, function(data) {
                var rows = handleData(data.rows);
                items.html(template("simulate-history-template", rows));
                var pageNumber = _.max([1, Math.ceil(+data.total / self.row)])
                bootpag.bootpag({ page: self.page, total: pageNumber })
            })
        }
    }
}()



//组合点赞
var Impress = function(ops) {
    _.extend(this, ops)
}
Impress.prototype = {
    container: null,
    width: 120,
    clicked: true,
    render: function() {
        var self = this;
        var getData = function(callback) {
            $.getJSON(" /composite/statisticsZan.htm", { combinationid: __compositeId }, function(_data) {
                var data = [
                    { name: "技术高", id: 0, count: _data.jsgcount, color: "#5ab0ee" },
                    { name: "收益稳", id: 1, count: _data.sywcount, color: "#ea7a81" },
                    { name: "选股准", id: 2, count: _data.xgzcount, color: "#937fbb" },
                    { name: "回复快", id: 3, count: _data.hfkcount, color: "#2fc1db" },
                    { name: "一般般", id: 4, count: _data.ybbcount, color: "#f3ae76" }
                ];
                callback(data)
            })
        }

        var createTag = function(data) {
            var max = 0;
            var sum = 0;
            _.forEach(data, function(item) {
                sum += item.count;
                max = _.max([max, item.count]);
            })

            return _.map(data, function(item) {
                var zoom = function() {
                    if (sum < 12) {
                        return item.count * 10
                    } else {
                        var ratio = item.count / sum || 0
                        return ratio * self.width;
                    }
                }()
                var w = Math.floor(60 + zoom);
                var f = _.min([Math.floor(w / 60 * 12), 30]);

                var style = `background:${item.color};width:${w}px;height:${w}px;`
                return `<div class="inline item">
                             <div class="graph" style="${style}" data-id="${item.id}">
                                <div class="wrap" style="line-height:${w}px;font-size:${f}px;">
                                 <span class="count">${item.count}</span>
                                 <span class="txt">人</span>
                                </div>
                             </div>
                            <button style="color:${item.color};">${item.name}</button>
                        </div>`
            }).join("");
        }

        getData(function(data) {
            self.container.html(createTag(data))
        })

        //组合点赞
        this.container.on('click', ".graph", _.once(function() {
            if (!__compositeData.is_od) return;
            if (!self.clicked) return;
            $(this).velocity('callout.tada');
            var id = +$(this).data('id');
            $.post('/composite/addZan.htm', {
                combinationid: __compositeId,
                type: id // '点赞类型  0：技术高 1：收益稳 2：选股准 3：回复快 4：一般般',
            }, function(data) {
                if (data == "success") {
                    setTimeout(function() {
                        self.render();
                    }, 500)
                } else {
                    layer.msg("您已经点过赞啦!")
                }
            })
        }))

        return this;
    }
}


//交流区
var simulate_talk = function() {
    var container;
    return {
        init: function() {
            container = $("#simulate_talk");

            this.publish.init({
                container: container.find('.publish-container')
            });

            this.comments.init({
                container: container.find('.comments')
            });
        },
        render: function() {
            container.show();
            if (__compositeData.combination_status == 0) {
                container.html(getLimitAction({ msg: "组合尚未运行" }))
                return;
            }
            this.comments.render();
            new Impress({
                container: $("#simulate_talk .impress"),
                clicked: false
            }).render();
        }
    }
}()


//发布评论
//init({container:$("#container")})
simulate_talk.publish = function() {
    var container, textarea, insertCode, submit, reply, replyId = "";
    return {
        setReply: function(name, id) {
            reply.show();
            reply.find('.name').text(name);
            replyId = id;
        },
        init: function(ops) {
            var self = this;
            container = ops.container;
            var html = template('publish-template');
            container.html(html)
            textarea = container.find('textarea');
            insertCode = container.find('.insertCode');
            submit = container.find('.submit');
            reply = container.find('.reply');

            yn.wordCount(textarea, {
                indicate: container.find('.wordCount .value')
            })

            yn.showStockList(insertCode, {
                onSelect: function(item) {
                    var val = textarea.val();
                    val += item.stockWrap;
                    textarea.val(val).trigger('keyup');
                    insertCode.val("")
                }
            })

            //取消回复
            reply.on('click', ".fa", function() {
                cancelReply();
                return false
            })

            function cancelReply() {
                reply.hide()
                reply.find('.name').text("");
                replyId = "";
            }

            submit.click(_.debounce(function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                if (!textarea.val()) {
                    layer.msg("内容不能为空!")
                    return;
                }
                submitForm()
            }, 3000, { leading: true, trailing: false }))

            var submitForm = function() {
                var send = {
                    parent_id: replyId,
                    combinationid: __compositeId,
                    content: textarea.val(),
                    create_id: ynUserId
                }

                $.post("/composite/addComment.htm", send, function(data) {
                    if (data != "success") {
                        layer.msg(`${data}`);
                        return;
                    }
                    textarea.val("").trigger('keyup');
                    layer.msg("发布成功...");
                    cancelReply();
                    simulate_talk.comments.render({
                        currentPage: 1
                    });
                })
            }
        }
    }
}()


//组合评论
simulate_talk.comments = function() {
    var container, items, bootpag, filter, loading
    return {
        init: function(ops) {
            var self = this;
            container = ops.container;
            items = container.find('.items')
            filter = container.find(".comments-filter")
            bootpag = yn.bootpag(container);
            bootpag.on('page', function(err, num) {
                self.render({
                    currentPage: num
                })
            })

            loading = new yn.loading({
                container: items
            });

            //回复
            container.on('click', '.reply', function() {
                var name = $(this).data('name');
                var id = $(this).data('id');
                simulate_talk.publish.setReply(name, id);
            })

            //大家说
            filter.on('click', '.comments-filter-item', function() {
                yn.switch($(this));
                var value = $(this).data('value');
                self.render({
                    type: +value,
                    currentPage: 1
                })
            })

            //隐藏评论
            container.on('click', '.setHide', function() {
                var el = $(this);
                var id = $(this).data('id');
                var type = (+$(this).data('type') + 1) % 2; //取反
                $.post("/composite/commentHide.htm", {
                    comment_id: id,
                    hide: type
                }, function(data) {
                    if (data == "success") {
                        layer.msg("设置成功");
                        self.render();
                    }
                })
            })

        },

        render: function(ops) {

            if (!__compositeData.is_od) {
                var html = getLimitAction({ msg: "订阅后可以查看和发表评论" });
                container.html(html)
                return;
            }

            var param = _.extend({
                combinationid: __compositeId,
                user_id: ynUserId,
                type: 0, //大家说0 牛人说1
                pageSize: 10,
                currentPage: 1
            }, ops)

            loading.render()

            var handleResult = [];
            var levelHash = {}
            var handleData = function(data) {
                _.forEach(data, function(item) {
                    if (item.parent_id) {
                        item._level = levelHash[item.comment_id] = levelHash[item.parent_id] + 1;
                        item._subLevel = "subLevel";
                    } else {
                        levelHash[item.comment_id] = 0;
                        item._subLevel = "";
                    }

                    //是否显示隐藏
                    item._hideText = item.is_hide === "1" ? "已隐藏" : "隐藏";
                    item._hideTextStyle = __compositeData.teacherid == ynTeacherId ? "" : "hide";

                    handleResult.push(item);
                    if (item.childList.length > 0) {
                        handleData(item.childList.reverse());
                    }
                })
            }

            $.getJSON("/composite/commentList.htm", param, function(data) {
                if (data.rows.length < 1) {
                    items.html(ynconfig.none({ margin: 100 }))
                    return;
                }
                handleData(data.rows);
                items.html(template('simulate_talk-comments-template', handleResult));
                var totalPage = _.max([1, Math.ceil(+data.total / param.pageSize)]);
                bootpag.bootpag({ page: param.currentPage, total: totalPage })
            })
        }
    }
}()


/*///////////////////////////////////////////////////////////////////*/


$(function() {

    //route
    if (__isSelfComposite) {
        showTecherContent();
    } else {
        showUserContent();
    }
})


function showUserContent() {

    //show
    $('#userContent').show();

    //init
    profile.init();
    stockIncome.init();
    feedBar.init();
    teacherHistory.init();
    recordMenu.init();
    recordCurrent.init();
    recordHistory.init();
    recordChart.init();

    //render
    getCompositeData(function(data) {
        profile.render();
        stockIncome.render.income();
        feedBar.render();
        teacherHistory.render();
        recordHistory.render(); //调仓记录
    })
}

function showTecherContent() {

    //show
    $('#teacherContent').show();

    //init
    teacher_Intro.init();
    wealth.init();
    simulate_menu.init();
    realtime.init();
    simulate_buy.init();
    simulate_hold.init();
    simulate_sell.init();
    simulate_rollback.init();
    simulate_history.init();
    simulate_talk.init();
    profit.init();

    //render
    getCompositeData(function(data) {
        teacher_Intro.render();
        wealth.render();
        wealth.done = function() {
            profit.render();
        }
        simulate_hold.render();
    })
}


function drawArea(ops) {
    ops = _.extend({
        categories: ["09-01", "09-02", "09-03", "09-04", "09-05", "09-06"],
        data: [-2, 0, 3, -1, 2, 4],
        width: 410,
        height: 160
    }, ops)
    ops.container.highcharts({
        chart: {
            borderWidth: 0,
            plotBorderWidth: 0,
            marginRight: 0,
            width: ops.width,
            height: ops.height

        },
        tooltip: {
            enabled: true,
            headerFormat: '<span style="font-size: 10px;padding-right:10px;">{point.key}</span>',
            pointFormat: '<b>{point.y}</b><br/>',
            valueSuffix: '%',
            useHTML: true
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            enabled: false,
            text: ''
        },
        yAxis: {
            lineWidth: 0,
            opposite: false,
            title: '',
            labels: {
                formatter: function() {
                    return this.value + '%';
                }
            }
        },
        xAxis: {
            labels: {
                enabled: true,
                font: '12px Helvetica',
                color: '#525151'
            },
            tickmarkPlacement: "on",
            categories: ops.categories
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            data: ops.data
        }]
    });
}
