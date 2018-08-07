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

	var error = __webpack_require__(1);
	var recommended = function () {
	    var container,
	        items,
	        params = {
	        currentPage: 1,
	        pageSize: 10
	    };

	    var create = function create(arr) {
	        return _.map(arr, function (item) {
	            return '<li class="right-item"><a href="/learning/' + item.id + '.htm" target="_blank">' + item._title + '</a></li>';
	        }).join('');
	    };

	    var handle = function handle(arr) {
	        return _.map(arr, function (item) {
	            if (item.title.length > 18) {
	                item._title = item.title.substr(0, 18) + '..';
	            } else {
	                item._title = item.title;
	            }
	            return item;
	        });
	    };

	    return {
	        init: function init() {
	            container = $('.right-list');
	        },
	        render: function render(ops) {
	            _.extend(params, ops);
	            $.getJSON('/learning/studyStockRecommend.htm', params, function (back) {
	                if (back.status == 1) {
	                    container.html(create(handle(back.data.list)));
	                } else (function () {
	                    return layer.msg(error[back.status]);
	                });
	            });
	        }
	    };
	}();

	//添加页码组件
	//selector支持css选择器和jquery对象
	var bootpag = function bootpag(selector, ops) {
	    ops = _.extend({
	        first: true
	    }, ops);
	    var timestamp = _.now();
	    var id = '#' + timestamp;
	    var tag = '<ul id="' + timestamp + '" class="ynpagination"></ul>';
	    var container = function () {
	        if (typeof selector != "string") {
	            return selector;
	        } else {
	            return $(selector);
	        }
	    }();

	    container.append(tag);
	    var bootpag = $(id).bootpag({
	        total: 1,
	        page: 1,
	        maxVisible: 5,
	        firstLastUse: ops.first,
	        first: "首页",
	        last: "尾页",
	        next: "下一页",
	        prev: "上一页",
	        leaps: false
	    });
	    bootpag.hide = function () {
	        $(id).hide();
	        return bootpag;
	    };
	    bootpag.show = function () {
	        $(id).show();
	        return bootpag;
	    };
	    return bootpag;
	};

	$(function () {
	    // list.init()
	    // list.render()

	    //导航高亮
	    $('#learnStock .item').each(function (i, el) {
	        var type = $(this).data('type');
	        // $(this).attr('href', `${xuechaogu_path}/${type}`)

	        if (type == __type) {
	            $(this).addClass('select');
	        }
	        if (__type == 'xcg') {
	            $('#learnStock .item.xcg').addClass('select');
	        }
	    });

	    // 页码跳转
	    if (__total != 0) {
	        var pagination = bootpag($('.container'));
	        pagination.bootpag({ page: __page, total: __total / 10 });
	        pagination.on('page', function (err, num) {
	            location.href = '' + xuechaogu_path + __type + '/?pn=' + num;
	        });
	    }

	    recommended.init();
	    recommended.render();

	    onSelect('学炒股');
	});

/***/ }),
/* 1 */
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
	    "30002": "验证码错误",
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
	    "100003": "活动已过期",
	    "100005": "用户不符合活动条件"
	};

/***/ })
/******/ ]);