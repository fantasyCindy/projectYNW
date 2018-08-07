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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1); // 个人中心通用设置
	var ajax = __webpack_require__(2); // 自选股接口
	var market = __webpack_require__(3); // 大盘指数
	var stockList = __webpack_require__(5); // 大盘指数


	$(function () {
	    yn.centerMenu.init({ render: 'my', light: '我的自选' });
	    market.render({ container: $("#marquee") });
	    list();
	});

	// 自选列表 
	var list = function list() {
	    var container = $("#table-stock-list");
	    var input = $("#showStockList");
	    var tbody = $("#stock-body");

	    var create = function create(arr) {
	        return _.map(arr, function (item) {
	            var isChecked = selected[item.stockcode] ? "checked" : "";
	            return '<tr class="item" id="' + item.stockid + '"><td class="radio"><input type="checkbox" class="stock_check" ' + isChecked + ' value="' + item.stockcode + '"/></td><td class="stockCode">' + item.stockcode + '</td><td class="stockName">' + item.stockname + '</td><td class="nowPrice">' + item.now + '</td><td class="money">' + item.money + '</td><td class="up">' + item.up + '</td><td class="yesterday">' + item.yesterday + '</td><td class="open">' + item.open + '</td><td class="max">' + item.max + '</td><td class="min">' + item.min + '</td></tr>';
	        }).join('');
	    };

	    var render = function render() {
	        ajax.get().done(function (data) {
	            tbody.html(create(data));
	        });
	    };

	    render();

	    // 定时刷新
	    setInterval(function () {
	        return render();
	    }, 10000);

	    // 搜索股票
	    stockList.get().render({
	        id: 'showStockList',
	        top: 30,
	        onSelect: function onSelect(item, trigger) {
	            trigger.val('');
	            ajax.add({ stockcode: item.stockCode, stockname: item.stockName }).done(function (code) {
	                return render();
	            });
	        }
	    });

	    var selected = {}; //已选择
	    var getValues = function getValues() {
	        var r = [];
	        for (var key in selected) {
	            if (selected[key]) {
	                r.push(key);
	            }
	            return r;
	        }
	    };
	    // 全选
	    $("#select-all").click(function (index, el) {
	        var val = $(this)[0].checked;
	        $(".stock_check").each(function (i, e) {
	            var value = $(this).val();
	            e.checked = val;
	            selected[value] = val;
	        });
	    });

	    $('#table-stock-list').on('click', '.stock_check', function () {
	        $('.stock_check').each(function (i, e) {
	            if (!e.checked) {
	                $('#select-all').attr('checked', false);
	            }
	        });
	    });

	    tbody.on('click', '.stock_check', function () {
	        var isSelect = $(this).get(0).checked;
	        var value = $(this).val();
	        selected[value] = isSelect;
	    });

	    // 显示分时图
	    var imageWrap = $("#klineImg");
	    var kline = $("#klinePhoto");
	    container.on('mouseenter', '.stockName', function () {
	        var code = $(this).parent().find('.stockCode').text();
	        code = code.match(/[0-9]+/)[0];
	        var prefix = yn.stockPrefix(code);
	        var src = 'http://image.sinajs.cn/newchart/min/n/' + prefix + '.gif';
	        kline.attr('src', src);
	        imageWrap.show().css({
	            'top': $(this).offset().top + $(this).height(),
	            left: $(this).offset().left + $(this).width() - 20
	        });
	    }).on('mouseleave', '.stockName', function () {
	        imageWrap.hide();
	    });

	    // 删除自选
	    $('#remove_stock').click(function () {
	        $(".stock_check").each(function (i, e) {
	            if (!e.checked) return;
	            var tr = $(this).parents('tr');
	            var send = {
	                stockcode: tr.find('.stockCode').text(),
	                stockname: tr.find('.stockName').text(),
	                id: tr.attr('id')
	            };
	            ajax.remove(send).done(function () {
	                return render();
	            });
	            selected = {};
	            $('#select-all').attr('checked', false);
	        });
	    });
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	// 设置菜单高亮

	yn.navigation.name = ynconfig.navigation.g;
	yn.logout.path = __path;
	if (!ynIsLogin) {
	    setTimeout(function () {
	        yn.login.render();
	    }, 100);
	    yn.login.onClose = function () {
	        location.href = __path;
	    };
	}

	/*----

	个人中心菜单

	1.初始化
	yn.centerMenu.init({
	    render:'my',
	    light:'我的观点'
	}) 

	1-2.渲染
	yn.centerMenu.render({type:'my'}) 

	----*/
	yn.centerMenu = function () {
	    var container, items, title, light;

	    var createItems = function createItems(arr) {
	        return _.map(arr, function (item) {
	            var select = _.trim(item.menuname) == light ? "select" : "";
	            return "<a class=\"item " + select + "\" id=\"" + item.menu_id + " \" href=\"/" + item.menuurl + "\"><span class=\"txt \">" + item.menuname + "</span><i class=\"fa fa-angle-right \"></i></a>";
	        }).join("");
	    };
	    return {
	        init: function init(ops) {
	            container = $('#centerMenu');
	            items = container.find('.items');
	            title = container.find('.title .name');
	            light = ops.light || "";
	            ops.render && this.render({ type: ops.render });
	        },
	        render: function render(ops) {
	            ops = _.extend({ type: "center" }, ops);
	            var types = {
	                center: { title: "个人设置", url: "/menu/queryWebUserMenu.htm" },
	                my: { title: "个人中心", url: "/menu/queryWebUserMyMenu.htm" }
	            };

	            var type = types[ops.type];
	            var url = type.url;
	            title.text(type.title);
	            new yn.loading({ container: items, margin: 200 }).render();
	            $.getJSON(url, { user_id: ynUserId }, function (data) {
	                return items.html(createItems(data));
	            });
	        }
	    };
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*  添加自选
	    send对象: {stockcode, stockname, [user_id]}
	*/

	var error = __webpack_require__(14);
	var add = function add(send, ops) {
	    var defer = $.Deferred();
	    ops = _.extend({
	        user_id: ynUserId //默认添加到当前用户
	    }, ops);
	    if (!send || !send.stockname || !send.stockcode) {
	        console.log("添加自选参数错误", send);
	        return;
	    }
	    send.user_id = ops.user_id;

	    //查询是否已存在
	    module.exports.get(send.user_id).done(function (data) {
	        var flag = true;
	        _.forEach(data, function (item) {
	            if (+item.stockcode == +send.stockcode) {
	                layer.msg("已存在");
	                flag = false;
	            }
	        });
	        if (flag) {
	            $.post('/addOpStock.htm', send, function (data) {
	                data = JSON.parse(data);
	                if (data.status == '1') {
	                    layer.msg("添加自选成功");
	                    defer.resolve();
	                } else {
	                    return layer.msg(error[data.status]);
	                }
	            });
	        }
	    });
	    return defer.promise();
	};

	/*删除自选股*/
	/*参数(stockname, stockcode, [user_id], id(股票id))*/
	var remove = function remove(send, ops) {

	    var defer = $.Deferred();
	    ops = _.extend({
	        user_id: ynUserId //默认添加到当前用户
	    });
	    send.user_id = ops.user_id;
	    if (!send && !send.stockname & !stockCode && !send.id) {
	        layer.msg("参数错误");
	        return;
	    }
	    $.get('/deleteOpStock.htm', send, function (data) {
	        data = JSON.parse(data);
	        if (data.status == '1') {
	            defer.resolve(send.stockCode);
	        } else {
	            layer.msg("删除自选股失败...");
	            defer.reject(send.stockCode);
	        }
	    });
	    return defer.promise();
	};

	//查询我的自选股
	/*默认获取当前用户id*/
	var get = function get(ops) {
	    ops = _.extend({
	        userid: ynUserId //用户id
	    });
	    var defer = $.Deferred();
	    $.getJSON("/queryOp.htm", { user_id: ops.userid }, function (data) {
	        if (data.status == 1) {
	            data.data = _.chain(data.data).filter(function (item) {
	                return item.stockInfo;
	            }).map(function (item) {
	                return handleItem(item);
	            }).value();
	            defer.resolve(data.data);
	        }
	    });

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
	        };
	        return result;
	    }

	    return defer.promise();
	};

	module.exports = {
	    add: add,
	    get: get,
	    remove: remove
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 *  大盘指数
	 *  var market = require()
	 *  market.render({container})
	 */

	var local = __webpack_require__(4);

	var isStop = function () {
	    var now = new Date(_.now());
	    var hour = now.getHours();
	    var minute = now.getMinutes();

	    // 09:30 => 15:30
	    return hour > 15 || hour < 9 || hour == 15 && minute > 30 || hour == 9 && minute < 30;
	}();

	module.exports = function () {
	    var container, layout;
	    var cacheData = [];
	    var timer;

	    var getData = function getData(callback) {

	        var handleData = function handleData(data) {
	            data.curdot = yn.setDecimal(data.curdot);
	            var rate = parseFloat(data.rate);
	            data.color = rate > 0 ? "red" : "green";
	            if (rate === 0) {
	                data.color = "gray";
	            }
	            return data;
	        };

	        $.getJSON("/html/querySinaMarketData1.htm", function (data) {
	            callback(_.map(["上证指数", "深证成指", "中小板指", "创业板指"], function (item) {
	                return handleData(data.market[item]);
	            }));
	        });
	    };

	    var createHTML = function createHTML(data, index) {
	        return "<div id=\"mi-" + index + "-color\" class=\"marketIndex-item " + data.color + "\"><div class=\"line1\"><span id=\"mi-" + index + "-name\" class=\"name\">" + data.name + "</span><span id=\"mi-" + index + "-curdot\" class=\"curdot\">" + data.curdot + "</span><span class=\"icon\"></span></div><div class=\"line2\"><span id=\"mi-" + index + "-curprice\" class=\"price\">" + data.curprice + "</span><span id=\"mi-" + index + "-rate\" class=\"rate\">" + data.rate + "</span></div></div>";
	    };

	    // 比较数据是否变化
	    var isEqual = function isEqual(a, b) {
	        if (!a || !b) return false;
	        var result = true;
	        _.forEach(a, function (item, index) {
	            if (item !== b[index]) {
	                result = false;
	            }
	        });
	        return result;
	    };

	    var compile = function compile() {
	        if (isStop) {
	            clearInterval(timer);
	            timer = null;
	        }

	        getData(function (data) {
	            _.forEach(data, function (item, index) {
	                if (!isEqual(item, cacheData[index])) {
	                    var tag = createHTML(item, index);
	                    container.find('td').eq(index).html(tag);
	                    cacheData[index] = item;
	                }
	            });
	        });
	    };

	    return {
	        render: function render(ops) {
	            container = ops.container;
	            layout = ops.layout || "line";
	            var types = {
	                line: '<table class="line" id="MarketIndex"><tr><td></td><td></td><td></td><td></td></tr></table>',
	                column: '<table class="column" id="MarketIndex"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>'
	            };
	            container.html(types[layout]);
	            compile();
	            timer = setInterval(function () {
	                compile();
	            }, 5000);
	        }
	    };
	}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 *
	 *    本地缓存数据
	 * 
	 * ---- get(key, {disable, timeout}) 
	 * 
	 *             key : localStorage中的key
	 *             disable : Boolean , 是否禁用缓存, 默认false
	 *             timeout :  Number , 缓存时间(单位:秒) , 默认5分钟
	 *             return :  undefine || { data, valid } 
	 *
	 *  ---- set(key, value)
	 *          
	 *  ---- joinKey  :　拼接对象值的为字符串 : 将查询字符作为key时使用
	 *  
	 *  
	 *
	 * 
	 */

	var JSON = window.JSON || false;
	var db = localStorage;

	var set = function set(key, value) {
	    if (!(JSON && key)) return;
	    value = [_.now(), JSON.stringify(value)].join('@@@@');
	    db.setItem(key, value);
	};

	var get = function get(key, ops) {

	    if (!(JSON && key)) return;

	    ops = _.extend({
	        disable: false,
	        timeout: 3000
	    }, ops);

	    var val = db.getItem(key);
	    if (!(val && /@@@@/.test(val))) return;

	    var split = val.split('@@@@');
	    var data = JSON.parse(split[1]);
	    var time = split[0];

	    // 判断是否超时
	    var valid = !ops.disable && _.now() - time <= ops.timeout * 1000;
	    return { data: data, valid: valid };
	};

	module.exports = {
	    set: set,
	    get: get,
	    joinKey: function joinKey(obj) {
	        var r = [];
	        for (var key in obj) {
	            r.push(String(obj[key]));
	        }
	        return r.join("");
	    }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	显示股票列表
	    
	var instance = require('../module/ui/stockList-1.2.js');
	instance.get().render(ops);

	    参数含义
	    ops = {
	        id: String --- 容器的ID(position = relative)
	        listLen: Number, --- 列表长度(最大为10),
	        left: Number, --- 定位(位置偏移值),
	        top: Number, --- 定位(位置偏移值),
	        onSelect({
	            stockCode: String, --- 股票代码
	            stockName: String, --- 股票名称
	            stockPinyin: String, --- 股票拼音
	            stockWrap: String --- $000001平安银行$
	        }): Function --- 回调函数
	    }


	    示例
	    stockList.get().render({
	        id: 'showStockList',
	        onSelect: (item, trigger) => {
	            trigger.val('')
	            alert(item.stockWrap)
	        }
	    })

	*/

	__webpack_require__(6);
	var local = __webpack_require__(4);

	module.exports = function () {
	    var instance,
	        domCache = {};

	    // 创建实例
	    var createInstance = function createInstance() {

	        var isValidCode = function isValidCode(val) {
	            var a = /^[a-zA-Z]{2,5}$/.test(val); //拼音2-5
	            var b = /^[036][0-9]{2,5}$/.test(val); //数字3-6
	            return a || b;
	        };

	        // 本地缓存前10条查询结果, 7天更新一次
	        var getData = function getData(code, callback) {
	            var key = 'query-stock-' + code;
	            var cache = local.get(key, { timeout: 3600 * 24 * 7 });
	            if (cache && cache.valid) {
	                callback(cache.data);
	                return;
	            }
	            $.getJSON('/queryStock.htm?stockcode=' + code, function (back) {
	                if (back && back.length > 0) {
	                    var data = _.take(back, 10);
	                    callback(data);
	                    local.set(key, data);
	                }
	            });
	        };

	        var createTags = function createTags(arr, ops) {
	            var prefixs = { 0: "深市", 3: "深市", 6: "沪市" };
	            var tbody = _.map(arr, function (item) {
	                var place = prefixs[String(item.stockcode).substr(0, 1)];
	                return '<tr class="ynStockList"><td class="place">' + place + '</td><td class="stock_code">' + item.stockcode + '</td><td class="stock_name">' + item.stockname + '</td><td class="pinyin">' + item.pinyin + '</td></tr>';
	            }).join("");
	            return '<table>' + tbody + '</table>';
	        };

	        //  实例方法
	        return {
	            render: function render(ops) {
	                // 参数
	                ops = _.extend({
	                    listLen: 5,
	                    left: 0,
	                    top: 0,
	                    onSelect: function onSelect() {}
	                }, ops);

	                var e = {
	                    trigger: null,
	                    left: null,
	                    top: null,
	                    parent: null,
	                    $list: null

	                    // 如果DOM缓存可用, 则使用缓存
	                };if (domCache[ops.id]) {
	                    _.extend(e, domCache[ops.id]);
	                } else {
	                    e.trigger = $('#' + ops.id);
	                    e.left = ops.left + "px";
	                    e.top = e.trigger.height() + ops.top + "px";
	                    e.parent = e.trigger.parent();
	                    e.parent.append('<div class="ynStcokListSpacial absolute" style="left:' + e.left + ';top:' + e.top + '"></div>');
	                    e.$list = e.parent.find('.ynStcokListSpacial'); // 股票列表对象

	                    // 缓存DOM
	                    domCache[ops.id] = e;
	                }

	                $(document).click(function () {
	                    return e.$list.hide();
	                });

	                // 点击股票时回调
	                e.parent.on('click', 'tr.ynStockList', function () {
	                    e.$list.hide();
	                    var code = $(this).find('.stock_code').text();
	                    var name = $(this).find('.stock_name').text();
	                    var pinyin = $(this).find('.pinyin').text();

	                    ops.onSelect({
	                        stockCode: code,
	                        stockName: name,
	                        stockPinyin: pinyin,
	                        stockWrap: '$' + code + name + '$'
	                    }, e.trigger);
	                    return false;
	                });

	                // 监听键盘
	                e.trigger.on('keyup', _.debounce(function () {
	                    var val = $(this).val();

	                    // 检查是否为有效股票代码
	                    if (!isValidCode(val)) {
	                        e.$list.hide();
	                        return;
	                    }
	                    getData(val, function (back) {
	                        var data = _.take(back, +ops.listLen); // 截取长度
	                        e.$list.show().html(createTags(data, ops));
	                    });
	                }, 300, { leading: false, trailing: true }));
	            }
	        };
	    };

	    // 返回单例
	    return {
	        get: function get() {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./stockList.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./stockList.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "#ynStcokListSpacial {\r\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\r\n    border: 2px solid #3274D8;\r\n    background: white;\r\n    display: none;\r\n    position: fixed;\r\n    overflow: hidden;\r\n    z-index: 50000\r\n}\r\n\r\n#ynStcokListSpacial .ynStockList td {\r\n    padding: 8px 15px;\r\n    cursor: pointer;\r\n}\r\n\r\n#ynStcokListSpacial .ynStockList:hover td,\r\n#ynStcokListSpacial .ynStockList:first-child td {\r\n    background: #3274D8;\r\n    color: white;\r\n}\r\n\r\n\r\n/* after */\r\n\r\n.ynStcokListSpacial {\r\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\r\n    border: 2px solid #3274D8;\r\n    background: white;\r\n    display: none;\r\n    position: absolute;\r\n    z-index: 50000;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.ynStcokListSpacial .ynStockList td {\r\n    padding: 8px 15px;\r\n    cursor: pointer;\r\n}\r\n\r\n.ynStcokListSpacial .ynStockList:hover td,\r\n.ynStcokListSpacial .ynStockList:first-child td {\r\n    background: #3274D8;\r\n    color: white;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
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


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	    "1": "请求成功",
	    "-1": "请求繁忙",
	    "10001": "股票代码不存在",
	    "10002": "查询条件为空",
	    "20001": "用户未登录",
	    "20002": "token为空",
	    "20003": "用户名不存在",
	    "20004": "密码为空",
	    "20005": "密码不匹配",
	    "20006": "登录失败",
	    "20007": "用户不存在",
	    "20008": "操作失败",
	    "20009": "密码不一致",
	    "20010": "TOKEN 错误",
	    "20011": "参数错误",
	    "20012": "获取验证码失败",
	    "20013": "期刊ID为空",
	    "20014": "直播室ID为空",
	    "20015": "提问内容为空",
	    "20016": "直播室未开启",
	    "20017": "直播老师未关联直播室",
	    "20018": "期刊不存在",
	    "20019": "已在其他终端登陆",
	    "20020": "提问次数超出限制",
	    "20021": "该条问题已被采纳过",
	    "20022": "不是该问题提问人",
	    "30001": "手机验证码为空",
	    "30002": "图片验证码错误",
	    "30003": "手机验证码错误",
	    "30004": "账号已存在",
	    "30005": "注册异常",
	    "30006": "第三方第一次登录",
	    "30007": "第三方非法用户",
	    "30008": "手机号为空",
	    "30009": "手机号已被绑定",
	    "30010": "手机号错误",
	    "40001": "参数为空",
	    "40002": "服务器异常",
	    "40003": "已点赞",
	    "40004": "评论失败",
	    "40005": "起始值为空",
	    "40006": "查询失败",
	    "40007": "请求方向格式错误",
	    "40008": "用户自选股已经存在",
	    "40009": "关注",
	    "40010": "没有此股票信息",
	    "40011": "取消关注",
	    "40012": "直播老师不存在",
	    "40013": "股票代码和名称不匹配",
	    "40014": "买入股票时资本不够",
	    "50001": "消息为空",
	    "50002": "老师不能提问",
	    "50003": "老师不能关注",
	    "60000": "支付成功",
	    "60001": "商品ID为空",
	    "60002": "商品类型为空",
	    "60003": "订单类型为空",
	    "60004": "订单ID为空",
	    "60005": "订单不存在",
	    "60006": "支付失败",
	    "60007": "签名为空",
	    "60008": "未传支付密码",
	    "60009": "支付密码错误",
	    "60010": "账户余额不足",
	    "60011": "用户没有开通账户",
	    "60012": "支付密码格式不正确",
	    "60013": "充值来源错误",
	    "60014": "订单金额类型不存在",
	    "60015": "订单金额错误",
	    "60016": "产品购买数量错误",
	    "60017": "礼物不存在",
	    "60018": "商品类型不存在",
	    "60019": "商品不存在",
	    "60020": "商品已购买",
	    "60021": "商品已付款请等待客服人员与您联系",
	    "60022": "商品未购买",
	    "70001": "组合不存在",
	    "70002": "组合已技术评价",
	    "70003": "收益信息为空",
	    "70004": "委托记录为空",
	    "80000": '该手机号被用户举报，涉嫌违规操作，目前不能注册账号',
	    "90000": "身份证号格式验证不通过",
	    "90001": "已通过实名制验证",
	    "90002": "还没有进行实名制验证",
	    "90003": "还没有进行风险评估",
	    "90004": "当天实名验证次数到达上线",
	    "100001": "活动注册成功",
	    "100002": "活动注册失败",
	    "100003": "活动已过期",
	    "100005": "用户不符合活动条件"
	};

/***/ })
/******/ ]);