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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(29);
	yn.centerMenu.init({ render: 'my', light: '我的直播' });
	var error = __webpack_require__(12);
	// var element = require('element-ui')


	/* 
	    


	 */

	// 四种状态, 直播/历史, vip/普通老师
	var table_entry = {
	    vip_living: function vip_living(ops) {
	        return 'http://cp.yueniucj.com/live/vipLive.htm?roomid=34';
	    }, //VIP直播室
	    vip_history: function vip_history(ops) {
	        return live_path + '/live/live-vip-inside.htm#roomid=' + roomid;
	    }, //VIP历史直播
	    normal_living: function normal_living(ops) {
	        return live_path + 'live/' + ynTeacherId + '/';
	    },
	    normal_history: function normal_history(ops) {
	        return live_path + 'live/liveDetailLive.htm?teacherid=' + ynTeacherId + '&periodical=' + ops.pid;
	    }
	};

	var key_user = is_vip == "1" ? "vip" : 'normal';
	var error = __webpack_require__(12);
	new Vue({
	    el: '#myLive',
	    data: {
	        items: [],
	        page: 1,
	        size: 20,
	        total: 0
	    },
	    methods: {
	        getData: function getData() {
	            var defer = $.Deferred();
	            $.getJSON("/center/queryMyLive.htm", {
	                user_id: ynUserId,
	                pageSize: this.size,
	                currentPage: this.page
	            }, function (data) {
	                if (data.status == 1) {
	                    defer.resolve(data);
	                } else {
	                    return layer.msg(error[data.status]);
	                }
	            });
	            return defer.promise();
	        },
	        render: function render() {
	            var _this = this;

	            var handleData = function handleData(arr) {
	                return _.map(arr, function (item) {
	                    item._time = item.starttime.match(/^[^\s]+/)[0];
	                    var isLiving = +item.status == 0;

	                    // 构建查询键
	                    var key_status = isLiving ? 'living' : 'history';
	                    var key = key_user + '_' + key_status;

	                    //查询链接
	                    item._link = table_entry[key]({ pid: item.periodicalid });
	                    item._linkText = isLiving ? '正在直播' : '查看记录';
	                    item._operateText = isLiving ? '关闭直播室' : '--';
	                    item._liveClose = isLiving ? 'liveClose' : '';
	                    return item;
	                });
	            };

	            this.getData().done(function (back) {
	                _this.items = handleData(back.data.list);
	                _this.total = +back.data.total;
	            });
	        },
	        enter: function enter() {
	            $.getJSON("/center/openPeriodical.htm", { user_id: ynUserId }, function (data) {
	                if (data.status == 1) {
	                    var key = key_user + '_living';
	                    location.href = table_entry[key]();
	                } else {
	                    return layer.msg(error[data.status]);
	                }
	            });
	        },
	        liveRoomClose: function liveRoomClose(item) {
	            var self = this;
	            if (item.status == '0') {
	                var periodicalid = item.periodicalid;
	                layer.confirm('确定关闭直播室?', function () {
	                    $.post('/broadcasting/closePeriodical.htm', { periodicalid: periodicalid }, function (back) {
	                        if (back.status == '1') {
	                            layer.msg('直播室已关闭');
	                            self.render();
	                        } else {
	                            return layer.msg(error[back.status]);
	                        }
	                    }, 'json');
	                });
	            }
	        },
	        onPage: function onPage(page) {
	            console.log('page', page);
	            this.page = page;
	            this.render();
	        }
	    },
	    mounted: function mounted() {
	        this.render();
	    }
	});

/***/ }),

/***/ 12:
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

/***/ }),

/***/ 29:
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

/***/ })

/******/ });