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

	"use strict";

	//H5问股

	var getUrlParam = function getUrlParam(name) {
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null) return unescape(r[2]);return null;
	};

	var trend = __webpack_require__(1); // 牛人看涨
	var hot = __webpack_require__(3); // 热问股票
	var ranking = __webpack_require__(5); //解答牛人


	var tab = function () {
	  var container, items, children;

	  return {
	    init: function init() {
	      container = $('#tag');
	      items = container.find('.tab');
	      children = {
	        ranking: ranking,
	        hot: hot,
	        trend: trend
	      };

	      container.on('click', '.tab', function () {
	        var type = $(this).data('type');
	        $(this).addClass('active').siblings().removeClass('active');
	        _.forEach(children, function (item) {
	          return item.hidden();
	        });
	        children[type].render();
	        return false;
	      });
	      container.find('.item').eq(getUrlParam('type') - 1).trigger('click');
	    }
	  };
	}();

	$(function () {
	  trend.init({ wrap: $('.up') });
	  hot.init();
	  ranking.init();
	  tab.init();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	        牛人看涨看跌
	        var m = require('m/trend.js')
	        $(function(){
	            m.init({wrap})
	            m.render()
	        })
	*/

	var local = __webpack_require__(2);

	var createItems = function createItems(arr) {
	    return _.map(arr, function (item) {
	        return '<div class="up_list" data-code="' + item.stockcode + '"><div class="up_msg"><span>' + item.stockname + '</span><span class="price"></span>(<span class="up-per"></span>)</div><div class="up_ratio"><span class="ratio_left" style="width:' + item.upWidth + '%;"></span><span class="ratio_right" style="width:' + item.downWidth + '%;"></span></div><div class="person_num"><span class="p_up">' + item.onNum + '\u4EBA\u770B\u6DA8</span><span class="p_down">' + item.downNum + '\u4EBA\u770B\u8DCC</span></div></div>';
	    }).join('');
	};

	//牛人看涨涨跌
	var getData = function getData(ops, callback) {
	    var key = 'stock-trend' + local.joinKey(ops);
	    var cache = local.get(key, { timeout: 3600 });
	    if (cache && cache.valid) {
	        return callback(cache.data);
	    }

	    $.getJSON("/consultation/querySeeStockTrent.htm", {
	        currentPage: ops.page,
	        pageSize: ops.size,
	        singtype: ops.type
	    }, function (data) {
	        if (data.status == 1) {
	            callback(data);
	            local.set(key, data);
	        }
	    });
	};

	module.exports = function () {
	    var container, items;

	    return {
	        init: function init(ops) {
	            var self = this;
	            var wrap = ops.wrap || $("body");

	            container = $('#tag');
	            items = container.next().find('.up');

	            container.on('click', '.rising-type', function () {
	                container.next().find('.answer').hide();
	                container.next().find('.hotStock').hide();
	                $(this).parent().find('.active').removeClass("active");
	                $(this).addClass("active");
	                var type = $(this).data("id");
	                self.render({ type: type });
	            });
	        },
	        render: function render(ops) {
	            items.show();
	            ops = _.extend({
	                page: 1,
	                size: 5,
	                type: 0 // 0=涨, 1=跌
	            }, ops);
	            getData(ops, function (data) {

	                //设置比例
	                var rows = _.map(data.data.list, function (item) {
	                    var total = +item.onNum + +item.downNum;
	                    item.upWidth = item.onNum / total * 100;
	                    item.downWidth = item.downNum / total * 100;
	                    return item;
	                });

	                rows = _.sortBy(rows, ['downWidth', 'upWidth'][ops.type]);

	                items.html(createItems(rows));
	                //股票价格
	                items.find('.up_list').each(function () {
	                    var price = $(this).find('.price');
	                    var up = $(this).find('.up-per');
	                    yn.queryStock($(this).data('code'), {
	                        handle: true,
	                        color: true
	                    }).done(function (data) {
	                        price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
	                        up.html(data[33]);
	                    });
	                });
	            });
	        },
	        hidden: function hidden() {
	            items.hide();
	        }
	    };
	}();

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    热问股票
	    var hot = require('m/hotStock.js')

	    $(function(){
	        hot.init()
	        hot.render()
	    })

	*/

	var local = __webpack_require__(2);
	var error = __webpack_require__(4);

	module.exports = function () {
	    var container,
	        items,
	        query = {
	        size: 5,
	        page: 1
	    },
	        count = 0;

	    var getData = function getData(callback) {
	        var key = 'hot-ask-stock' + local.joinKey(query);
	        var cache = local.get(key, { timeout: 3600 });
	        if (cache && cache.valid) {
	            return callback(cache.data);
	        }
	        $.getJSON("/consultation/queryHotStock.htm", {
	            pageSize: query.size,
	            currentPage: query.page
	        }, function (data) {
	            callback(data);
	            local.set(key, data);
	        });
	    };

	    var createItems = function createItems(arr) {
	        return _.map(arr, function (item) {
	            return '<div class="stock_list" data-code="' + item.stockcode + '"><div class="stock_left"><p class="stock_name">' + item.stockname + '</p><p class="stock_number">' + item.stockcode + '</p></div><div class="stock_middle"><p class="stock_up price"></p><p class="stock_down up-per"></p></div><div class="stock_right"><p class="ask_txt">\u63D0\u95EE\u6B21\u6570</p><p class="ask_times">' + item.questionstockcount + '</p></div></div>';
	        }).join('');
	    };

	    return {
	        init: function init(ops) {
	            container = $('#yn_askDetail');
	            items = container.find('.hotStock');
	        },
	        render: function render() {
	            items.show();
	            getData(function (data) {
	                if (data.status == 1) {
	                    items.html(createItems(data.data.list));

	                    //查询股票价格
	                    items.find('.stock_list').each(function () {
	                        var price = $(this).find('.price');
	                        var up = $(this).find('.up-per');
	                        yn.queryStock($(this).data('code'), {
	                            handle: true,
	                            color: true
	                        }).done(function (data) {
	                            price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
	                            up.html(data[33]);
	                        });
	                    });
	                } else {
	                    return layer.msg(error[data.status]);
	                }
	            });
	        },
	        hidden: function hidden() {
	            items.hide();
	        }
	    };
	}();

/***/ }),
/* 4 */
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/** 
	 * 解答排行
	 * init({wrap})
	 * render({page,size})
	 * onAsk({id, name})
	 */

	var local = __webpack_require__(2);

	var createItems = function createItems(arr) {
	    return _.map(arr, function (item) {
	        return '<div class="answer_list"><div class="answer_left"><div class="photo"><img src="' + item.photo + '" title="' + item.teachertitle + '"/></div><div class="care">\u5173\u6CE8</div></div><div class="answer_middle"><p class="t-name">' + item.teachertitle + '</p><p class="t-description">' + item._description + '</p></div><div class="answer_right"><div class="consult" data-id="' + item.answeruserid + '">\u54A8\u8BE2</div></div></div>';
	    }).join('');
	};

	var handleData = function handleData(arr) {
	    return _.map(arr, function (item) {
	        item._description = item.description.substr(0, 15) + '...';
	        return item;
	    });
	};

	var getData = function getData(ops, callback) {
	    ops = _.extend({
	        page: 1,
	        size: 5
	    }, ops);

	    var key = "resolve-ranking" + local.joinKey(ops);
	    var cache = local.get(key, { timeout: 3600 });
	    if (cache && cache.valid) {
	        return callback(cache.data);
	    }

	    $.getJSON("/consultation/queryAnswerRanking.htm", {
	        currentPage: ops.page,
	        pageSize: ops.size
	    }, function (data) {
	        if (data.status == 1) {
	            callback(data);
	            local.set(key, data);
	        }
	    });
	};

	module.exports = function () {
	    var container, items;
	    return {
	        init: function init(ops) {
	            var self = this;

	            container = $('#yn_askDetail');
	            items = container.find('.answer');
	            // container.on('click', '.consult', function() {
	            //     var id = $(this).data('id');
	            //     var name = $(this).prev().text();
	            //     self.onAsk({ id, name })
	            // })
	        },
	        render: function render(ops) {
	            items.show();
	            getData(ops, function (data) {
	                console.log("data", data);
	                var rows = data.data.sort(function (a, b) {
	                    return +b.answercount - +a.answercount;
	                });
	                console.log("=rows==", rows);
	                rows = handleData(rows);
	                items.html(createItems(rows));
	            });
	        },
	        onAsk: function onAsk() {
	            console.log('---onAsk function not override---');
	        },
	        hidden: function hidden() {
	            items.hide();
	        }
	    };
	}();

/***/ })
/******/ ]);