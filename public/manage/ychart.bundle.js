/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var theme = __webpack_require__(1);
	var calendar = __webpack_require__(2);
	var lo = __webpack_require__(7);
	var layer = __webpack_require__(8).get();
	var Category = __webpack_require__(11);

	/*///////////////////////////////////////////////////////////////////*/

	var href = window.location.href;
	var match_theme = href.match(/theme=([a-z]+)/);
	var themeName = match_theme ? match_theme[1] : 'grid';
	Highcharts.theme = theme[themeName];
	Highcharts.setOptions(Highcharts.theme);

	/*///////////////////////////////////////////////////////////////////*/

	var time_b = lo.offsetNow(7); // 默认时间的起点
	var time_e = lo.offsetNow(0); // 默认时间的结束

	// 获取订单类型名称
	var getOrderName = function getOrderName(key, index) {
	    var cate = Category[key];
	    return cate[index];
	};

	var getStamp = function getStamp(time) {
	    return new Date(time).getTime();
	};
	var f1 = function f1(timestamp) {
	    return Highcharts.dateFormat("%Y年%m月%d日", timestamp);
	};
	var f2 = function f2(timestamp) {
	    return Highcharts.dateFormat("%Y-%m-%d", timestamp);
	};
	var f3 = function f3(timestamp) {
	    return Highcharts.dateFormat("%m-%d", timestamp);
	};
	var f4 = function f4(timestamp) {
	    return Highcharts.dateFormat("%m月%d日", timestamp);
	};

	var formatNum = function formatNum(obj) {
	    for (var key in obj) {
	        obj[key] = obj[key] || 0;
	    }
	    return obj;
	};

	var groupBy = function groupBy(arr, key) {
	    var t = {};
	    var result = [];

	    arr.forEach(function (item) {
	        if (!t[item[key]]) {
	            t[item[key]] = [];
	        }
	        if (String(item[key])) {
	            t[item[key]].push(item);
	        }
	    });
	    for (var k in t) {
	        result.push(t[k]);
	    }
	    return result;
	};

	/* ops = { container, onchange } */
	var range = function range(ops) {
	    var tag = '<div class="chart-range">\n                <div class="item short">\n                    <span class="subitem active subitem-7" data-value="7">最近7天</span>\n                    <span class="subitem subitem-30" data-value="30">最近30天</span>\n                </div>\n                <div class="item range">\n                    <input type="text" class="begin" placeholder="请选择开始时间">\n                    <span class="break">-</span>\n                    <input type="text" class="end" placeholder="请选择结束时间">\n                    <span class="query-btn" data-value="30">查询</span>\n                </div>\n            </div>';

	    var container = ops.container;
	    container.append(tag);

	    var $b = container.find('input.begin');
	    var $e = container.find('input.end');

	    calendar.add($b);
	    calendar.add($e);

	    // 最近7天
	    container.on('click', '.chart-range .subitem', function () {
	        $b.val("").removeClass('active');
	        $e.val("").removeClass('active');
	        $(this).addClass('active').siblings().removeClass('active');
	        var now = Date.now();
	        var offset = +$(this).data('value') * 24 * 3600 * 1000;

	        if (typeof ops.onchange == "function") {
	            ops.onchange({
	                begin: lo.toDate(now - offset),
	                end: lo.toDate(now)
	            });
	        }
	    });

	    container.on('click', '.query-btn', function () {
	        var vb = _.trim($b.val());
	        var ve = _.trim($e.val());
	        var valid_b = !!Date.parse(vb);
	        var valid_e = !!Date.parse(ve);

	        if (!valid_b) {
	            layer.msg("请输入有效的开始时间");
	            $b.val('');
	            return;
	        }
	        if (!valid_e) {
	            layer.msg("请输入有效时间的结束时间");
	            $e.val('');
	            return;
	        }
	        if (Date.parse(ve) < Date.parse(vb)) {
	            layer.msg("结束时间不能小于开始时间");
	            $e.val('');
	            return;
	        }

	        if (Date.parse(ve) > Date.now()) {
	            layer.msg("结束时间不能大于今天");
	            $e.val('');
	            return;
	        }

	        container.find('.subitem.active').removeClass('active');
	        $b.addClass('active');
	        $e.addClass('active');

	        ops.onchange({
	            begin: vb.replace(/[^\d]+/g, '-'),
	            end: ve.replace(/[^\d]+/g, '-')
	        });
	    });
	};

	/*///////////////////////////////////////////////////////////////////*/

	var theme = function () {
	    var container = $('.theme-option');
	    container.on('click', '.theme-item', function () {
	        var value = $(this).data('type');
	        window.location.href = "/ychart.htm?theme=" + value;
	    });
	}();

	var splineOption = function splineOption() {
	    return {
	        chart: {
	            type: 'areaspline',
	            height: 500
	        },
	        credits: {
	            enabled: false
	        },
	        title: {
	            text: ''
	        },
	        legend: {
	            title: {
	                style: {
	                    fontSize: 16
	                }
	            }
	        },
	        subtitle: {
	            enabled: false
	        },
	        xAxis: {
	            type: 'datetime',
	            title: {
	                text: ''
	            },
	            labels: {
	                formatter: function formatter() {
	                    return f2(this.value);
	                }
	            }
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            min: 0
	        },
	        tooltip: {
	            headerFormat: '',
	            pointFormatter: function pointFormatter() {
	                return f4(this.x) + '<br> <b>' + this.series.name + ':</b> ' + this.y;
	            }
	        },

	        plotOptions: {
	            spline: {
	                marker: {
	                    enabled: true
	                },
	                dataLabels: {
	                    enabled: true
	                }
	            },
	            areaspline: {
	                fillOpacity: 0.1
	            }
	        }
	    };
	};

	var pieOption = function pieOption(ops) {
	    return _.extend({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: ''
	        },
	        legend: {
	            title: {
	                style: {
	                    fontSize: 14
	                }
	            }
	        },
	        credits: {
	            enabled: false
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: Highcharts.theme && Highcharts.theme.contrastTextColor || 'black',
	                        fontSize: 15
	                    }
	                }
	            }
	        }
	    }, ops);
	};

	/*///////////////////////////////////////////////////////////////////*/

	/* 注册分析 */

	var register = function () {

	    var container = $('.chart-register');
	    var backData;
	    var head = container.find('.detail-sum tbody');
	    var ops = splineOption();
	    var tabs = container.find('.chart-tab');

	    range({
	        container: tabs,
	        onchange: function onchange(time) {
	            getData(function (back) {
	                return draw();
	            }, {
	                startTime: time.begin,
	                endTime: time.end
	            });

	            getPieData(function (back) {
	                drawPie();
	            }, {
	                startTime: time.begin,
	                endTime: time.end
	            });
	        }
	    });

	    /* 总的统计数据 */
	    var getTotalData = function getTotalData() {
	        var head = $('.data-sum.top tbody');
	        $.getJSON("/report/query_total.do", function (back) {
	            var total = formatNum(back.total);
	            head.html('<tr>\n                        <td class="label">累计</td>\n                        <td>' + total.cumulat_outuser + '</td>\n                        <td>' + total.cumulat_order + '</td>\n                        <td>' + total.cumulat_article + '</td>\n                        <td>' + total.cumulat_answer + '</td>\n                    </tr>\n                    <tr>\n                        <td class="label">昨日</td>\n                        <td>' + total.outside_user + '</td>\n                        <td>' + total.order_cnt + '</td>\n                        <td>' + total.article_cnt + '</td>\n                        <td>' + total.answer_cnt + '</td>\n                    </tr>');
	        });
	    };

	    var getData = function getData(callback, ops) {
	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);
	        $.getJSON("/report/report_user_daily.do", ops, function (back) {
	            var total = formatNum(back.total);
	            head.html('<tr>\n                        <td>' + total.totalOutside_users + '</td>\n                        <td>' + total.totalInside_users + '</td>\n                        <td>' + total.yesterdayOutside_users + '</td>\n                    </tr>');

	            backData = back.data;
	            callback();
	        });
	    };

	    var draw = function draw() {

	        var handleData = function handleData() {
	            return [{
	                name: "注册用户",
	                data: backData.map(function (item) {
	                    return {
	                        x: getStamp(item.create_time),
	                        y: item.outside_users
	                    };
	                })
	            }];
	        };

	        ops.series = handleData();
	        Highcharts.chart('chart-register-container', ops);
	    };

	    return {
	        render: function render() {
	            container.show();
	            if (backData) return;
	            getData(function (back) {
	                return draw();
	            });
	            getTotalData();
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	/* 订单分析 */

	var order = function () {
	    var container = $('.chart-order');
	    var ops = splineOption();
	    var tabs = container.find('.category-type');
	    var head = container.find('.detail-sum tbody');
	    var backData, cateData;
	    var cur = 'order_cnt';
	    var pieOps = pieOption();

	    range({
	        container: tabs,
	        onchange: function onchange(time) {
	            getData(function (back) {
	                draw();
	            }, {
	                startTime: time.begin,
	                endTime: time.end
	            });

	            getPieData(function (back) {
	                drawPie();
	            }, {
	                startTime: time.begin,
	                endTime: time.end
	            });
	        }
	    });

	    tabs.on('click', '.tab-item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	        cur = $(this).data('key');
	        draw();
	        drawPie();
	    });

	    var getData = function getData(callback, ops) {

	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);

	        $.getJSON("/report/report_payorder_daily.do", ops, function (back) {
	            console.log("订单数据", back);
	            backData = back.data;

	            // 统计信息
	            var total = formatNum(back.total);
	            head.html('<tr>\n                        <td>累计</td>\n                        <td>' + total.totalOrder_cnt + '</td>\n                        <td>' + total.totalActual_price + '</td>\n                        <td>' + total.totalCumulat_users + '</td>\n                        <td>' + Math.round(total.avg_price * 100) / 100 + '</td>\n                    </tr>\n                    <tr>\n                        <td>昨日</td>\n                        <td>' + total.yesterdayOrder_cnt + '</td>\n                        <td>' + total.yesterdayActual_price + '</td>\n                        <td>' + total.yesterdayOrder_users + '</td>\n                        <td>' + Math.round(total.yesterday_avg * 100) / 100 + '</td>\n                    </tr>');

	            callback();
	        });
	    };

	    var draw = function draw() {
	        var handleData = function handleData() {
	            return [{
	                name: tabs.find('.tab-item.active').text(),
	                data: backData.map(function (item) {
	                    item.avg = Math.round(item.actual_price / item.cumulat_users * 100) / 100;
	                    return {
	                        x: getStamp(item.finish_date),
	                        y: item[cur]
	                    };
	                })
	            }];
	        };
	        ops.series = handleData();
	        Highcharts.chart('chart-order-container', ops);
	    };

	    // 获取分类报表数据
	    var getPieData = function getPieData(callback, ops) {
	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);

	        $.getJSON("/report/report_payorder_type_daily.do", ops, function (back) {
	            cateData = back.data.map(function (item) {
	                item.avg = Math.round(item.actual_price / item.order_cnt * 100) / 100;
	                return item;
	            });
	            console.log("订单分类", cateData);
	            callback();
	        });
	    };

	    var drawPie = function drawPie() {

	        var handlePieData = function handlePieData(key) {
	            return [{
	                name: tabs.find('.active').text(),
	                colorByPoint: true,
	                data: groupBy(cateData, key).map(function (arr, index) {
	                    var name = '';
	                    var sum = 0;
	                    arr.forEach(function (item) {
	                        name = item[key];
	                        sum += item[cur];
	                    });
	                    return {
	                        name: getOrderName(key, arr[0][key]),
	                        y: sum
	                    };
	                })
	            }];
	        };

	        Highcharts.chart('chart-order-pie-1', pieOption({
	            title: { text: "商品类型" },
	            series: handlePieData("goodstype")
	        }));
	        pieOps.series = handlePieData("ordertype");
	        Highcharts.chart('chart-order-pie-2', pieOption({
	            title: { text: "订单类型" },
	            series: handlePieData("ordertype")
	        }));
	    };

	    return {
	        render: function render() {
	            container.show();
	            if (backData) return;
	            getData(function (back) {
	                return draw();
	            });
	            getPieData(function () {
	                return drawPie();
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	/*  直播统计 */

	var live = function () {
	    var container = $('.chart-live');
	    var tabs = container.find('.category-type');
	    var cur = 'broadcasting_pv'; // 数据类型
	    var backData = null;
	    var ops = splineOption();
	    var head = container.find('.detail-sum tbody');

	    // 添加时间选择范围
	    var trange = range({
	        container: tabs,
	        onchange: function onchange(time) {
	            getData({
	                startTime: time.begin,
	                endTime: time.end
	            }, function (back) {
	                return draw();
	            });
	        }
	    });

	    var getData = function getData(ops, callback) {
	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);

	        $.getJSON("/report/report_broadcasting_daily.do", ops, function (back) {
	            console.log("直播分析", back);
	            backData = back.data;
	            var total = formatNum(back.total);

	            // 统计信息
	            head.html('<tr>\n                        <td>累计</td>\n                        <td>' + total.totalBroadcasting_cnt + '</td>\n                        <td>' + total.totalBroadcasting_pv + '</td>\n                        <td>' + total.totalMember_cnt + '</td>\n                        <td>' + total.totalUser_cnt + '</td>\n                    </tr>\n                    <tr>\n                        <td>昨日</td>\n                        <td>' + total.yesterdayBroadcasting_cnt + '</td>\n                        <td>' + total.yesterdayroadcasting_pv + '</td>\n                        <td>' + total.yesterdayMember_cnt + '</td>\n                        <td>' + total.yesterdayUser_cnt + '</td>\n                    </tr>');

	            callback();
	        });
	    };

	    // 切换
	    tabs.on('click', '.tab-item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	        cur = $(this).data('key');
	        draw();
	    });

	    var draw = function draw() {

	        // 数据处理
	        var handleData = function handleData() {
	            var filter = backData.map(function (item) {
	                return {
	                    x: getStamp(item.broadcasting_date),
	                    y: +item[cur]
	                };
	            });

	            // 合并求和操作
	            return [{
	                name: tabs.find('.tab-item.active').text(),
	                data: groupBy(filter, 'x').map(function (arr) {
	                    var x = arr[0].x;
	                    var sum = 0;
	                    arr.forEach(function (item) {
	                        return sum += item.y;
	                    });
	                    return [x, sum];
	                })
	            }];
	        };

	        ops.series = handleData();
	        Highcharts.chart('chart-live-container', ops);
	    };

	    return {
	        render: function render() {
	            container.show();
	            if (backData) return;
	            getData({}, function () {
	                return draw();
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	/* 观点分析 */

	var article = function () {
	    var container = $('.chart-article');
	    var backData;
	    var cur = 'article_cnt';
	    var select = container.find('.selectBar select');
	    var tab = container.find('.tab2');
	    var ops = splineOption();
	    var pieOps = pieOption();
	    var head = container.find('.detail-sum tbody');

	    // 时间范围
	    range({
	        container: container.find('.chart-tab'),
	        onchange: function onchange(time) {
	            getData(function () {
	                draw();
	                drawPie();
	            }, {
	                startTime: time.begin,
	                endTime: time.end
	            });
	        }
	    });

	    var getData = function getData(callback, ops) {
	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);

	        $.getJSON("/report/report_broadcasting_article_daily.do", ops, function (back) {

	            var total = formatNum(back.total);

	            // 统计信息
	            head.html('<tr>\n                        <td>累计</td>\n                        <td>' + total.totalArticle_cnt + '</td>\n                        <td>' + (Math.round(total.totalPayarticle_cnt / total.totalArticle_cnt * 10000) / 100 + "%") + '</td>\n                        <td>' + (total.totalPayarticle_price || 0) + '</td>\n                    </tr>\n                    <tr>\n                        <td>昨日</td>\n                        <td>' + total.yesterdayArticle_cnt + '</td>\n                        <td>' + (Math.round(total.yesterdayPayarticle_cnt / total.yesterdayArticle_cnt * 1000) / 100 + "%") + '</td>\n                        <td>' + (total.yesterdayPayarticle_price || 0) + '</td>\n                    </tr>');

	            backData = back.data;
	            callback();
	        });
	    };

	    // 切换
	    container.on('change', '.tab-item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	    });

	    // 过滤数据
	    select.on('change', function () {
	        var val = +$(this).val();
	        if (val == -1) return draw(backData); // 全部
	        var _data = backData.filter(function (item) {
	            return +item.article_type == val;
	        });
	        draw(_data);
	    });

	    // 类型切换
	    tab.on('click', '.tab-item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	        cur = $(this).data('key');
	        draw();
	        drawPie();
	    });

	    // 绘图
	    var draw = function draw(data) {
	        var lineData = data || backData;

	        var handleData = function handleData() {
	            return [{
	                name: tab.find('.active').text(),
	                data: groupBy(lineData, 'article_date').map(function (arr) {
	                    var sum = 0;
	                    arr.forEach(function (item) {
	                        sum += item[cur];
	                    });

	                    return {
	                        x: getStamp(arr[0].article_date),
	                        y: sum
	                    };
	                })
	            }];
	        };

	        ops.series = handleData();
	        Highcharts.chart('chart-article-container', ops);
	    };

	    var drawPie = function drawPie() {

	        var pieSeries = function pieSeries() {
	            return [{
	                name: tab.find('.active').text(),
	                colorByPoint: true,
	                data: groupBy(backData, 'article_type').map(function (arr, index) {
	                    var sum = 0;
	                    arr.forEach(function (item) {
	                        sum += item[cur];
	                    });

	                    return {
	                        name: getOrderName('articleType', +arr[0].article_type),
	                        y: sum
	                    };
	                })
	            }];
	        };

	        pieOps.series = pieSeries();
	        Highcharts.chart('chart-article-pie', pieOps);
	    };

	    return {
	        render: function render() {
	            container.show();
	            if (!backData) {
	                getData(function () {
	                    draw();
	                    drawPie();
	                });
	            }
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	/*  问股分析 */

	var ask = function () {
	    var container = $('.chart-ask');
	    var backData;
	    var cur = 'answer_cnt';
	    var select = container.find('.selectBar select');
	    var tab = container.find('.tab-items');
	    var ops = splineOption();
	    var pieOps = pieOption();
	    var head = container.find('.detail-sum tbody');

	    // 时间范围
	    range({
	        container: container.find('.chart-tab'),
	        onchange: function onchange(time) {
	            getData(function () {
	                draw();
	                drawPie();
	            }, {
	                startTime: time.begin,
	                endTime: time.end
	            });
	        }
	    });

	    var getData = function getData(callback, ops) {
	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);

	        $.getJSON("/report/report_answer_daily.do", ops, function (back) {
	            console.log("问股数据", back);

	            var total = formatNum(back.total);

	            // 统计信息
	            head.html('<tr>\n                        <td>累计</td>\n                        <td>' + total.totalAnswer_cnt + '</td>\n                        <td>' + total.totalAdopt_cnt + '</td>\n                        <td>' + (Math.round(total.totalAdopt_cnt / total.totalAnswer_cnt * 10000) / 100 + "%") + '</td>\n                    </tr>\n                    <tr>\n                        <td>昨日</td>\n                        <td>' + total.yesterdayAnswer_cnt + '</td>\n                        <td>' + total.yesterdayAdopt_cnt + '</td>\n                        <td>' + (Math.round(total.yesterdayAdopt_cnt / total.yesterdayAnswer_cnt * 10000) / 100 + "%") + '</td>\n                    </tr>');

	            backData = back.data.map(function (item) {
	                item.adopt_ratio = Math.round(item.adopt_cnt / item.answer_cnt * 100) / 100 + '%';
	                return item;
	            });
	            callback();
	        });
	    };

	    // 切换
	    container.on('change', '.tab-item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	    });

	    // 过滤数据
	    select.on('change', function () {
	        var val = +$(this).val();
	        if (val == -1) return draw(backData); // 全部
	        var _data = backData.filter(function (item) {
	            return +item.note_type == val;
	        });
	        draw(_data);
	        drawPie(_data);
	    });

	    // 类型切换
	    tab.on('click', '.tab-item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	        cur = $(this).data('key');
	        draw();
	        drawPie();
	    });

	    // 绘图
	    var draw = function draw(data) {
	        var lineData = data || backData;
	        var handleData = function handleData() {
	            return [{
	                name: tab.find('.active').text(),
	                data: groupBy(lineData, 'answer_date').map(function (arr) {
	                    var sum = 0;
	                    arr.forEach(function (item) {
	                        sum += item[cur];
	                    });

	                    return {
	                        x: getStamp(arr[0].answer_date),
	                        y: sum
	                    };
	                })
	            }];
	        };

	        ops.series = handleData();
	        Highcharts.chart('chart-ask-container', ops);
	    };

	    var drawPie = function drawPie(data) {

	        var pieData = data || backData;

	        var pieSeries = function pieSeries() {

	            var data = groupBy(pieData, 'note_type').map(function (arr, index) {
	                var sum = 0;
	                arr.forEach(function (item) {
	                    sum += item[cur];
	                });

	                return {
	                    name: getOrderName("articleType", arr[0].note_type),
	                    y: sum
	                };
	            });

	            return [{
	                name: tab.find('.active').text(),
	                colorByPoint: true,
	                data: data
	            }];
	        };

	        pieOps.series = pieSeries();
	        Highcharts.chart('chart-ask-pie', pieOps);
	    };

	    return {
	        render: function render() {
	            container.show();
	            if (!backData) {
	                getData(function () {
	                    draw();
	                    drawPie();
	                });
	            }
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	/*  投顾分析 */

	var teacher = function () {
	    var container = $('.chart-teacher');
	    var tbody = container.find('.teacher-data tbody');
	    var backData;

	    // 时间范围
	    range({
	        container: container.find('.chart-tab'),
	        onchange: function onchange(time) {
	            getData({ startTime: time.begin, endTime: time.end }, function () {
	                renderList();
	            });
	        }
	    });

	    var getData = function getData(ops, callback) {
	        ops = _.extend({
	            startTime: time_b,
	            endTime: time_e
	        }, ops);

	        $.getJSON("/report/report_teacher_daily.do", ops, function (back) {
	            console.log("投顾数据库", back);

	            // 合并数据
	            backData = groupBy(back.data, 'teacherid').map(function (arr) {
	                var answer_cnt = 0;
	                var article_cnt = 0;
	                var broadcasting_pv = 0;
	                var popularity_number = 0;
	                var good_price = 0;

	                arr.forEach(function (item) {
	                    answer_cnt += item.answer_cnt;
	                    article_cnt += item.article_cnt;
	                    broadcasting_pv += item.broadcasting_pv;
	                    popularity_number += item.popularity_number;
	                    good_price = +item.good_price;
	                });

	                return {
	                    teacherid: arr[0].teacherid,
	                    teacherTile: arr[0].teacherTile,
	                    answer_cnt: answer_cnt,
	                    article_cnt: article_cnt,
	                    broadcasting_pv: broadcasting_pv,
	                    popularity_number: popularity_number,
	                    good_price: good_price
	                };
	            });

	            callback();
	        });
	    };

	    // 显示列表
	    var renderList = function renderList() {

	        var max = { v1: 0, v2: 0, v3: 0, v4: 0, v5: 0 };

	        var tag = backData.map(function (item) {

	            console.log(item);

	            var v1 = item.answer_cnt;
	            var v2 = item.article_cnt;
	            var v3 = item.broadcasting_pv;
	            var v4 = item.popularity_number;
	            var v5 = item.good_price;

	            max.v1 = Math.max(v1, max.v1);
	            max.v2 = Math.max(v2, max.v2);
	            max.v3 = Math.max(v3, max.v3);
	            max.v4 = Math.max(v4, max.v4);
	            max.v5 = Math.max(v5, max.v5);

	            return '<tr>\n                        <td>' + item.teacherTile + '</td>\n                        <td class="vv v1" data-key="v1"><span class="num">' + item.answer_cnt + '</span><i class="line"></i></td>\n                        <td class="vv v2" data-key="v2"><span class="num">' + item.article_cnt + '</span><i class="line"></i></td>\n                        <td class="vv v3" data-key="v3"><span class="num">' + item.broadcasting_pv + '</span><i class="line"></i></td>\n                        <td class="vv v4" data-key="v4"><span class="num">' + item.popularity_number + '</span><i class="line"></i></td>\n                        <td class="vv v5" data-key="v5"><span class="num">' + item.good_price + '</span><i class="line"></i></td>\n                    </tr>';
	        }).join("");

	        tbody.html(tag);
	        tbody.find('.vv').each(function () {
	            var key = $(this).data('key');
	            var maxValue = max[key];
	            var value = +$(this).text();
	            var width = Math.floor(value / maxValue * 140);
	            $(this).find('.line').animate({ width: width + "px" }, 1000);
	        });
	    };

	    return {
	        render: function render() {
	            container.show();
	            if (backData) return;
	            getData({}, function () {
	                return renderList();
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	var menu = function () {
	    var container = $('.charts-menu');

	    var children = {
	        register: register,
	        order: order,
	        live: live,
	        article: article,
	        ask: ask,
	        teacher: teacher
	    };

	    container.on('click', '.item', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	        $('.charts-detail-child').hide();
	        var key = $(this).data('key');
	        children[key].render();
	    });

	    return {
	        current: register,
	        active: function active(type, ops) {
	            container.find('.' + type).addClass('active').siblings().removeClass('active');
	            children[type].render(ops);
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	menu.active('register');

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Highcharts.setOptions({
	    global: {
	        useUTC: true,
	        timezoneOffset: 60 * -8 // 北京时间
	    },
	    lang: {
	        rangeSelectorZoom: "范围：",
	        rangeSelectorFrom: "从",
	        rangeSelectorTo: "至",
	        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	        shortMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	        weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	    }
	});

	/*///////////////////////////////////////////////////////////////////*/

	var snow = {
	    colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	    chart: {
	        backgroundColor: null,
	        style: {
	            fontFamily: 'Signika, serif'
	        }
	    },
	    title: {
	        style: {
	            color: 'black',
	            fontSize: '16px',
	            fontWeight: 'bold'
	        }
	    },
	    subtitle: {
	        style: {
	            color: 'black'
	        }
	    },
	    tooltip: {
	        borderWidth: 0
	    },
	    legend: {
	        itemStyle: {
	            fontWeight: 'bold',
	            fontSize: '13px'
	        }
	    },
	    xAxis: {
	        labels: {
	            style: {
	                color: '#6e6e70'
	            }
	        }
	    },
	    yAxis: {
	        labels: {
	            style: {
	                color: '#6e6e70'
	            }
	        }
	    },
	    plotOptions: {
	        series: {
	            shadow: true
	        },
	        candlestick: {
	            lineColor: '#404048'
	        },
	        map: {
	            shadow: false
	        }
	    },

	    // Highstock specific
	    navigator: {
	        xAxis: {
	            gridLineColor: '#D0D0D8'
	        }
	    },
	    rangeSelector: {
	        buttonTheme: {
	            fill: 'white',
	            stroke: '#C0C0C8',
	            'stroke-width': 1,
	            states: {
	                select: {
	                    fill: '#D0D0D8'
	                }
	            }
	        }
	    },
	    scrollbar: {
	        trackBorderColor: '#C0C0C8'
	    },

	    // General
	    background2: '#E0E0E8'

	};

	var dark = {
	    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	    chart: {
	        backgroundColor: {
	            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
	            stops: [[0, '#2a2a2b'], [1, '#3e3e40']]
	        },
	        style: {
	            fontFamily: '\'Unica One\', sans-serif'
	        },
	        plotBorderColor: '#606063'
	    },
	    title: {
	        style: {
	            color: '#E0E0E3',
	            textTransform: 'uppercase',
	            fontSize: '20px'
	        }
	    },
	    subtitle: {
	        style: {
	            color: '#E0E0E3',
	            textTransform: 'uppercase'
	        }
	    },
	    xAxis: {
	        gridLineColor: '#707073',
	        labels: {
	            style: {
	                color: '#E0E0E3'
	            }
	        },
	        lineColor: '#707073',
	        minorGridLineColor: '#505053',
	        tickColor: '#707073',
	        title: {
	            style: {
	                color: '#A0A0A3'

	            }
	        }
	    },
	    yAxis: {
	        gridLineColor: '#707073',
	        labels: {
	            style: {
	                color: '#E0E0E3'
	            }
	        },
	        lineColor: '#707073',
	        minorGridLineColor: '#505053',
	        tickColor: '#707073',
	        tickWidth: 1,
	        title: {
	            style: {
	                color: '#A0A0A3'
	            }
	        }
	    },
	    tooltip: {
	        backgroundColor: 'rgba(0, 0, 0, 0.85)',
	        style: {
	            color: '#F0F0F0'
	        }
	    },
	    plotOptions: {
	        series: {
	            dataLabels: {
	                color: '#B0B0B3'
	            },
	            marker: {
	                lineColor: '#333'
	            }
	        },
	        boxplot: {
	            fillColor: '#505053'
	        },
	        candlestick: {
	            lineColor: 'white'
	        },
	        errorbar: {
	            color: 'white'
	        }
	    },
	    legend: {
	        itemStyle: {
	            color: '#E0E0E3'
	        },
	        itemHoverStyle: {
	            color: '#FFF'
	        },
	        itemHiddenStyle: {
	            color: '#606063'
	        }
	    },
	    credits: {
	        style: {
	            color: '#666'
	        }
	    },
	    labels: {
	        style: {
	            color: '#707073'
	        }
	    },

	    drilldown: {
	        activeAxisLabelStyle: {
	            color: '#F0F0F3'
	        },
	        activeDataLabelStyle: {
	            color: '#F0F0F3'
	        }
	    },

	    navigation: {
	        buttonOptions: {
	            symbolStroke: '#DDDDDD',
	            theme: {
	                fill: '#505053'
	            }
	        }
	    },

	    // scroll charts
	    rangeSelector: {
	        buttonTheme: {
	            fill: '#505053',
	            stroke: '#000000',
	            style: {
	                color: '#CCC'
	            },
	            states: {
	                hover: {
	                    fill: '#707073',
	                    stroke: '#000000',
	                    style: {
	                        color: 'white'
	                    }
	                },
	                select: {
	                    fill: '#000003',
	                    stroke: '#000000',
	                    style: {
	                        color: 'white'
	                    }
	                }
	            }
	        },
	        inputBoxBorderColor: '#505053',
	        inputStyle: {
	            backgroundColor: '#333',
	            color: 'silver'
	        },
	        labelStyle: {
	            color: 'silver'
	        }
	    },

	    navigator: {
	        handles: {
	            backgroundColor: '#666',
	            borderColor: '#AAA'
	        },
	        outlineColor: '#CCC',
	        maskFill: 'rgba(255,255,255,0.1)',
	        series: {
	            color: '#7798BF',
	            lineColor: '#A6C7ED'
	        },
	        xAxis: {
	            gridLineColor: '#505053'
	        }
	    },

	    scrollbar: {
	        barBackgroundColor: '#808083',
	        barBorderColor: '#808083',
	        buttonArrowColor: '#CCC',
	        buttonBackgroundColor: '#606063',
	        buttonBorderColor: '#606063',
	        rifleColor: '#FFF',
	        trackBackgroundColor: '#404043',
	        trackBorderColor: '#404043'
	    },

	    // special colors for some of the
	    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	    background2: '#505053',
	    dataLabelsColor: '#B0B0B3',
	    textColor: '#C0C0C0',
	    contrastTextColor: '#F0F0F3',
	    maskColor: 'rgba(255,255,255,0.3)'
	};

	var grid = {
	    colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	    chart: {
	        backgroundColor: null,
	        style: {
	            fontFamily: 'Dosis, sans-serif'
	        }
	    },
	    title: {
	        style: {
	            fontSize: '16px',
	            fontWeight: 'bold',
	            textTransform: 'uppercase'
	        }
	    },
	    tooltip: {
	        borderWidth: 0,
	        backgroundColor: 'rgba(219,219,216,0.8)',
	        shadow: false
	    },
	    legend: {
	        itemStyle: {
	            fontWeight: 'bold',
	            fontSize: '13px'
	        }
	    },
	    xAxis: {
	        gridLineWidth: 1,
	        labels: {
	            style: {
	                fontSize: '12px'
	            }
	        }
	    },
	    yAxis: {
	        minorTickInterval: 'auto',
	        title: {
	            style: {
	                textTransform: 'uppercase'
	            }
	        },
	        labels: {
	            style: {
	                fontSize: '12px'
	            }
	        }
	    },
	    plotOptions: {
	        candlestick: {
	            lineColor: '#404048'
	        }
	    },

	    // General
	    background2: '#F0F0EA'

	};

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = { dark: dark, snow: snow, grid: grid };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 *  日历模块

	    var calendar = require('../module/ui/calendar.js')
	 
	    === usage ===
	    
	    // usage-1 : 默认取值info.day
	    calendar.add($el)

	    // usage-2 : 使用回调函数
	    calendar.add($el, info => $el.val(info.time))

	    ------------------------------------------ 
	       
	    info = { 
	        year : "2016",
	        month : "2016-09", 
	        day : "2016-09-10", 
	        time : "2016-09-10 18:20:39"
	    }

	 */

	_.padLeft = _.padLeft || _.padStart;
	_.padRight = _.padRight || _.padEnd;

	__webpack_require__(3);

	var calendar = function () {
	    var $container,
	        $trigger,
	        show = false,
	        $year,
	        $month,
	        $date,
	        delegate = {
	        select: function select(info) {}
	    };

	    //add tag to dom
	    var addToDom = function addToDom() {
	        var caltag = '<div id="yncalendar">' + '<table><thead>' + '<tr><th class="info" colspan="7"><span class="leftMonth">《</span><span><span class="year"></span>年<span class="month"></span>月</span><span class="rightMonth">》</span></th></tr>' + '<tr class="week-title"><th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th></tr>' + '</thead>' + '<tbody>' + '<tr class="firstRow"><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr id="lastRow"><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '</tbody>' + '</table>' + '</div>';

	        $('body').append(caltag);
	        $container = $("#yncalendar");
	        $year = $container.find('.year');
	        $month = $container.find('.month');
	        $date = $container.find('.date');
	    };

	    var render = function render(year, month) {
	        $year.text(year);
	        $month.text(month);
	        var now = getToday();

	        var dayCount = getCountInMonth(year, month);
	        var dayTags = function () {
	            var tag = [];
	            for (var i = 1; i <= dayCount; i++) {
	                tag.push('<p class="value">' + i + '</p>');
	            }
	            return tag;
	        }();

	        //reset
	        $date.empty();
	        $('.today').removeClass('today');

	        //判断1号是星期几
	        var offset = firstDayInMonth(year, month);
	        for (var i = 0; i < dayCount; i++) {
	            $date.eq(offset + i).html(dayTags[i]);
	        }

	        //着色
	        if (+year == now[0] && +month == now[1]) {
	            $date.eq(now[2] - 1 + offset).addClass("today");
	        }

	        $('#lastRow').show();
	        if ($('#lastRow').find('.value').length < 1) {
	            $('#lastRow').hide();
	        }

	        //显示
	        $container.css({
	            'display': 'inline-block',
	            'top': $trigger.offset().top + $trigger.outerHeight() + 'px',
	            'left': $trigger.offset().left + 'px'
	        });
	    };

	    return {
	        init: function init() {
	            addToDom();

	            //点击日期
	            $container.on('click', '.date', function () {
	                var t = getToday({ pad: true }); //["2016", "09", "09", "18", "20", "36"];

	                var _year = _.padLeft($year.text(), 2, "0");
	                var _month = _.padLeft($month.text(), 2, "0");
	                var _day = _.padLeft($(this).find('.value').text(), 2, "0");
	                var _date = [_year, _month, _day].join('-');
	                var _time = _date + " " + [t[3], t[4], t[5]].join(":");

	                var result = {
	                    year: _year,
	                    month: [_year, _month].join('-'),
	                    day: _date,
	                    time: _time
	                };
	                delegate.select(result);
	                $container.hide();
	            });

	            $container.on('mouseenter', function () {
	                show = true;
	            }).on('mouseleave', function () {
	                show = false;
	                $container.hide();
	            });

	            //切换月份
	            $container.on('click', ".leftMonth", function () {
	                var year = +$year.text();
	                var month = +$month.text();
	                var time = getBeforeMonth(year, month);
	                render(time[0], time[1]);
	            });

	            $container.on('click', ".rightMonth", function () {
	                var year = +$year.text();
	                var month = +$month.text();
	                var time = getAfterMonth(year, month);
	                render(time[0], time[1]);
	            });

	            return this;
	        },
	        add: function add($el, handler) {
	            $el.focus(function () {
	                var now = getToday();
	                $trigger = $(this);
	                render(now[0], now[1]);
	                delegate.select = handler || function (info) {
	                    $trigger.val(info.day);
	                };
	            });

	            $el.blur(function () {
	                if (!show) {
	                    $container.hide();
	                }
	            });
	        }
	    };
	}();

	calendar.init();

	/*///////////////////////////////////////////////////////////////////*/

	function getToday(ops) {
	    ops = _.extend({
	        pad: false
	    }, ops);

	    var now = new Date();
	    var today = Number(now.getDate());
	    var month = Number(now.getMonth() + 1);
	    var year = Number(now.getFullYear());
	    var h = +now.getHours();
	    var m = +now.getMinutes();
	    var s = +now.getSeconds();

	    var result = [year, month, today, h, m, s];

	    if (ops.pad) {
	        return _.map(result, function (item) {
	            item = _.padLeft(item, 2, "0");
	            return item;
	        });
	    }

	    return result;
	}

	//下一个月
	function getAfterMonth(year, month) {
	    if (month == 12) {
	        return [++year, 1];
	    }
	    return [year, ++month];
	}

	//上一个月
	function getBeforeMonth(year, month) {
	    if (month == 1) {
	        return [--year, 12];
	    }
	    return [year, --month];
	}

	//每个月1号星期几
	function firstDayInMonth(year, month) {
	    var date = new Date(year, month - 1, 1);
	    return date.getDay();
	}

	//获取每个月的天数
	function getCountInMonth(year, month) {
	    var monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	    if (year % 400 === 0) {
	        monthArray[1] = 29;
	    } else if (year % 4 === 0 && year % 100 !== 0) {
	        monthArray[1] = 29;
	    }
	    return monthArray[month - 1];
	}

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = calendar;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./calendar.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./calendar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "\r\n#yncalendar {\r\n    -webkit-user-select: none;\r\n    display: none;\r\n    position: absolute;\r\n    font-size: 14px;\r\n    font-family: \"SimHei,arial,helvetica,sans-serif,Microsoft YaHei\";\r\n    border: 1px solid #ebebeb;\r\n    border-radius: 10px;\r\n    overflow: hidden;\r\n    background: white;\r\n    z-index: 10000;\r\n    box-shadow: 2px 2px 20px rgba(0,0,0,0.2)\r\n}\r\n\r\n#yncalendar .ynhide {\r\n    display: none\r\n}\r\n\r\n#yncalendar table {\r\n    margin: 20px;\r\n    border-collapse: collapse\r\n}\r\n\r\n#yncalendar td,\r\n#yncalendar th {\r\n    text-align: center;\r\n    padding: 5px 10px;\r\n    border: 1px solid #e6e6e6\r\n}\r\n\r\n#yncalendar .info {\r\n    padding: 10px 10px;\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar .info span {\r\n    display: inline-block;\r\n    margin: 0 5px\r\n}\r\n\r\n#yncalendar .info span span {\r\n    font-size: 18px\r\n}\r\n\r\n#yncalendar .info .leftMonth {\r\n    cursor: pointer;\r\n    float: left;\r\n    margin-right: 10px\r\n}\r\n\r\n#yncalendar .info .rightMonth {\r\n    cursor: pointer;\r\n    float: right;\r\n    margin-left: 10px\r\n}\r\n\r\n#yncalendar td.date {\r\n    cursor: pointer\r\n}\r\n\r\n#yncalendar td.date:hover {\r\n    background: #f0f0f0\r\n}\r\n\r\n#yncalendar td.today {\r\n    border-color: #E12B51;\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar td.today:hover {\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar .week-title th {\r\n    background: #F5F5F5\r\n}", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	function now() {
	    return Date.now();
	}

	var trim = function trim(str) {
	    if (!str) return str;
	    str = String(str);
	    return str.replace(/^\s+|\s+$/, '');
	};

	/*///////////////////////////////////////////////////////////////////*/

	// 遍历source对象给source赋值
	var extend = function extend(source, target) {
	    if (!target) return source;
	    for (var key in source) {
	        if (target[key]) {
	            source[key] = target[key];
	        }
	    }
	    return source;
	};

	var toDate = function toDate(stamp, ops) {

	    var pad = function pad(num) {
	        if (num >= 10) return String(num);
	        if (num < 10) {
	            return "0" + num;
	        }
	    };

	    var time = new Date(stamp);
	    var y = time.getFullYear();
	    var m = +time.getMonth() + 1;
	    var d = time.getDate();

	    return [pad(y), pad(m), pad(d)].join('-');
	};

	var offsetNow = function offsetNow(num) {
	    var now = Date.now();
	    var offset = (+num + 1) * 24 * 3600 * 1000;
	    return toDate(now - offset);
	};

	/*///////////////////////////////////////////////////////////////////*/

	// 遍历target对象给source赋值
	var merge = function merge(source, target) {
	    if (!target) return source;
	    for (var key in target) {
	        if (target[key]) {
	            source[key] = target[key];
	        }
	    }
	    return source;
	};

	/*///////////////////////////////////////////////////////////////////*/

	function debounce(func, wait, options) {
	    var lastArgs,
	        lastThis,
	        maxWait,
	        result,
	        timerId,
	        lastCallTime,
	        lastInvokeTime = 0,
	        leading = false,
	        maxing = false,
	        trailing = true;

	    if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    wait = wait || 0;
	    if (options) {
	        leading = !!options.leading;
	        maxing = 'maxWait' in options;
	        maxWait = maxing ? nativeMax(options.maxWait || 0, wait) : maxWait;
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	    }

	    function invokeFunc(time) {
	        var args = lastArgs,
	            thisArg = lastThis;

	        lastArgs = lastThis = undefined;
	        lastInvokeTime = time;
	        result = func.apply(thisArg, args);
	        return result;
	    }

	    function leadingEdge(time) {
	        // Reset any `maxWait` timer.
	        lastInvokeTime = time;
	        // Start the timer for the trailing edge.
	        timerId = setTimeout(timerExpired, wait);
	        // Invoke the leading edge.
	        return leading ? invokeFunc(time) : result;
	    }

	    function remainingWait(time) {
	        var timeSinceLastCall = time - lastCallTime,
	            timeSinceLastInvoke = time - lastInvokeTime,
	            result = wait - timeSinceLastCall;

	        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	    }

	    function shouldInvoke(time) {
	        var timeSinceLastCall = time - lastCallTime,
	            timeSinceLastInvoke = time - lastInvokeTime;

	        // Either this is the first call, activity has stopped and we're at the
	        // trailing edge, the system time has gone backwards and we're treating
	        // it as the trailing edge, or we've hit the `maxWait` limit.
	        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	    }

	    function timerExpired() {
	        var time = now();
	        if (shouldInvoke(time)) {
	            return trailingEdge(time);
	        }
	        // Restart the timer.
	        timerId = setTimeout(timerExpired, remainingWait(time));
	    }

	    function trailingEdge(time) {
	        timerId = undefined;

	        // Only invoke if we have `lastArgs` which means `func` has been
	        // debounced at least once.
	        if (trailing && lastArgs) {
	            return invokeFunc(time);
	        }
	        lastArgs = lastThis = undefined;
	        return result;
	    }

	    function cancel() {
	        if (timerId !== undefined) {
	            clearTimeout(timerId);
	        }
	        lastInvokeTime = 0;
	        lastArgs = lastCallTime = lastThis = timerId = undefined;
	    }

	    function flush() {
	        return timerId === undefined ? result : trailingEdge(now());
	    }

	    function debounced() {
	        var time = now(),
	            isInvoking = shouldInvoke(time);

	        lastArgs = arguments;
	        lastThis = this;
	        lastCallTime = time;

	        if (isInvoking) {
	            if (timerId === undefined) {
	                return leadingEdge(lastCallTime);
	            }
	            if (maxing) {
	                // Handle invocations in a tight loop.
	                timerId = setTimeout(timerExpired, wait);
	                return invokeFunc(lastCallTime);
	            }
	        }
	        if (timerId === undefined) {
	            timerId = setTimeout(timerExpired, wait);
	        }
	        return result;
	    }
	    debounced.cancel = cancel;
	    debounced.flush = flush;
	    return debounced;
	}

	module.exports = {
	    now: now,
	    debounce: debounce,
	    extend: extend,
	    merge: merge,
	    trim: trim,
	    toDate: toDate,
	    offsetNow: offsetNow
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* 
	    var layer = require('m/moblile/layer.js').get()

	    layer.msg(msg, [callback]) --- 提示信息(自动消失)
	    layer.alert(msg, [callback]) ---提示信息(点击消失)
	    layer.confirm(msg, [callback]) ---确认操作


	 */

	__webpack_require__(9);
	module.exports = function () {

	    var instance;

	    var create = function create() {

	        // var screenHight = $(window).height()

	        var clickHanlder; // 点击时回调

	        var tag = '<div id="module-mobile-layer">\n                        <div class="box">\n                            <div class="msg">\n                                <div class="title">提示信息</div>\n                                <div class="info">这里是提示内容</div>\n                            </div> \n                            <div class="alert">\n                                  <div class="title">提示信息</div>\n                                  <div class="info">这里是提示内容</div>\n                                  <div class="bottom">\n                                        <span class="action" data-type="alert-yes">确定</span>\n                                  </div>\n                            </div> \n                            <div class="confirm">\n                                  <div class="title">提示信息</div>\n                                  <div class="info">这里是提示内容</div>\n                                  <div class="bottom">\n                                        <span class="action" data-type="confirm-no">取消</span>\n                                        <span class="action" data-type="confirm-yes">确定</span>\n                                  </div>\n                            </div> \n                        </div> \n                   </div>';

	        $('body').append(tag);
	        var $container = $('#module-mobile-layer');
	        var $msg = $container.find('.msg');
	        var $alert = $container.find('.alert');
	        var $confirm = $container.find('.confirm');

	        /* event */

	        $container.on('click', '.action', function () {
	            hide();
	            if (typeof clickHanlder == "function") {
	                clickHanlder($(this).data('type'));
	            }
	        });

	        //显示
	        var render = function render(type, val, callback) {
	            type.find('.info').html(val);
	            type.show();
	            $container.show();
	            clickHanlder = callback;
	        };

	        var hide = function hide() {
	            $container.fadeOut();
	            $msg.hide();
	            $alert.hide();
	            $confirm.hide();
	        };

	        /* interface */

	        return {
	            msg: function msg(val, callback) {
	                render($msg, val);
	                setTimeout(function () {
	                    hide();
	                    if (typeof callback == "function") {
	                        callback();
	                    }
	                }, 1500);
	            },
	            alert: function alert(val, callback) {
	                render($alert, val, callback);
	            },
	            confirm: function confirm(val, callback) {
	                render($confirm, val, callback);
	            }
	        };
	    };

	    /* single Instance */
	    return {
	        get: function get() {
	            if (!instance) {
	                instance = create();
	            }
	            return instance;
	        }
	    };
	}();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./layer2.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./layer2.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "#module-mobile-layer {\r\n    position: fixed;\r\n    background: rgba(0, 0, 0, 0.11);\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    display: none;\r\n    text-align: center;\r\n    font-size: 14px;\r\n}\r\n\r\n#module-mobile-layer .box {\r\n    background: white;\r\n    width: 300px;\r\n    margin: auto;\r\n    border-radius: 6px;\r\n    margin-top: 200px;\r\n    box-shadow: 4px 4px 16px rgba(105, 105, 105, 0.24);\r\n}\r\n\r\n#module-mobile-layer .box > * {\r\n    display: none;\r\n}\r\n\r\n#module-mobile-layer .title {\r\n    padding: 10px;\r\n    padding-bottom: 0;\r\n    color: #a1a1a1;\r\n    font-size: 13px;\r\n}\r\n\r\n#module-mobile-layer .msg .title {\r\n    padding-bottom: 10px;\r\n    border-bottom: 1px solid #e6e6e6;\r\n}\r\n\r\n#module-mobile-layer .info {\r\n    padding: 15px 30px;\r\n    font-size: 17px;\r\n    line-height: 1.5em;\r\n    padding-top: 5px;\r\n}\r\n\r\n#module-mobile-layer .msg .info {\r\n    padding: 30px 30px;\r\n}\r\n\r\n#module-mobile-layer .bottom {\r\n    border-top: 1px solid rgb(241, 241, 241);\r\n    overflow: hidden;\r\n}\r\n\r\n#module-mobile-layer .action {\r\n    padding: 13px 0;\r\n    display: inline-block;\r\n    width: 49%;\r\n    color: #6c6cef;\r\n    cursor: pointer;\r\n    float: left;\r\n}\r\n\r\n#module-mobile-layer .action:first-child {\r\n    border-right: 1px solid rgb(235, 235, 235);\r\n}\r\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var category = {
	    goodsType: ["观点", "组合", "课程", "内参", "问股", "直播", "操盘内线"], // 商品分类
	    articleType: ["大盘", "题材", "个股", "股票学堂", "操盘绝学", "独家内参"], // 文章分类
	    orderType: ["充值", "打赏", "送礼物", "购买产品", "瞄一眼"] };

	// 转换
	category.ordertype = category.orderType;
	category.goodstype = category.goodsType;

	module.exports = category;

/***/ }
/******/ ]);