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

	/*///////////////////////////////////////////////////////////////////*/

	__webpack_require__(1);
	var Str = __webpack_require__(2);
	var error = __webpack_require__(9);
	/*///////////////////////////////////////////////////////////////////*/

	var bootpag, loading;

	var topic = function () {
	    var container,
	        params = {
	        source: 0,
	        messagetype: 9,
	        currentPage: 1,
	        pageSize: 5
	    };
	    var count = 1;
	    var flag = '';
	    var newList = [];
	    var creatItem = function creatItem(item) {
	        return '<div class="topic-item"><span class="topic-item-photo"><img src="' + item.image_path + '" alt=""></span><span class="topic-item-content"><span class="topic-item-content-name">' + item.messagecontent + '<i class="topic-teacher-icon"></i>\u8BC4\u8BBA\u4E86\u8BDD\u9898</span><span class="topic-item-title"><a href=\'/app/topicDetail.htm?topic_id=' + item.goods_id + '\' target="_blank">#' + item.messagetitle + '#</a></span><span class="topic-item-time">' + item._time + '</span></span></div>';
	    };

	    var handle = function handle(data) {
	        return _.map(data, function (item) {
	            // item._time = yn.timeFormat(item.createtime);
	            item._time = item.createtime.substr(0, 11);
	            return item;
	        });
	    };
	    return {
	        init: function init() {
	            container = $('#mycare');
	            container.on('click', '.loadMore', function () {
	                // ++count
	                topic.render({ currentPage: ++count });
	            });
	        },
	        render: function render(ops) {
	            params = _.extend(params, ops);
	            // loading.render();
	            $.getJSON(__path + '/app/getMessage.htm', params, function (back) {
	                if (back.status == 1) {
	                    if (back.data.list.length < 5) {
	                        layer.msg('已加载全部');
	                        container.find('.loadMore').hide();
	                    }
	                    if (back.data == '') {
	                        container.find('.items').html(ynconfig.none({ margin: 200 }));
	                        // bootpag.hide();
	                        return;
	                    } else {
	                        handle(back.data.list).forEach(function (item) {
	                            if (item._time != flag) {
	                                newList.push('<div class="topic-date">' + item._time + '</div>');
	                            }
	                            newList.push('<div class="topic-item">\n                                    <a href=""><span class="topic-item-photo"><img src="' + item.image_path + '" alt=""></span></a>\n                                    <span class="topic-item-content">\n                                    <span class="topic-item-content-name">' + item.messagecontent + '<i class="topic-teacher-icon"></i>\u8BC4\u8BBA\u4E86\u8BDD\u9898</span>\n                                    <span class="topic-item-title"><a href=\'/app/topicDetail.htm?topic_id=' + item.goods_id + '\' target="_blank">#' + item.messagetitle + '#</a></span>  \n                                    </span>\n                                </div>');
	                            flag = item._time;
	                        });
	                        container.find('.items').append(newList.join(''));
	                        newList = [];
	                        // bootpag.show();
	                        // var pageNumber = _.max([1, Math.ceil(+back.data.total / params.pageSize)]);
	                        // bootpag.bootpag({ page: params.currentPage, total: pageNumber });
	                    }
	                } else {
	                    return layer.msg(error[back.status]);
	                }
	            });
	        }
	    };
	}();
	/*///////////////////////////////////////////////////////////////////*/

	$(function () {

	    var container = $("#mycare");
	    var items = container.find('.items');
	    // bootpag = yn.bootpag(container).on('page', (err, num) => {
	    //     var cur = $(".filter .select");
	    //     var className = cur.attr('class');
	    //     className.indexOf("live") != -1 && feed.render({ mtype: cur.data('type'), currentPage: num });
	    //     className.indexOf('composite') != -1 && composite.render({ currentPage: num })
	    //     className.indexOf('topic') != -1 && topic.render({ currentPage: num })
	    // });

	    loading = new yn.loading({ container: items });

	    yn.centerMenu.init({
	        render: 'my',
	        light: '我关注的话题'
	    });

	    topic.init();
	    topic.render();
	});

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
/***/ (function(module, exports) {

	"use strict";

	/*///////////////////////////////////////////////////////////////////*/

	//

	var clear = function clear(str) {
	    if (typeof str !== 'string') return str;
	    var match = str.match(/[\u4e00-\u9fa50-9a-zA-Z，。？：:（）]+/g);
	    return match ? match.join("") : str;
	};

	//
	var limit = function limit(str, len) {
	    return str.length < len ? str : str.substr(0, len) + "...";
	};

	//
	var filterHTML = function filterHTML(str) {
	    if (typeof str !== 'string') return str;
	    return str.replace(/<.+?>|&nbsp;/g, "");
	};

	//清除格式+限制个数+清除无效字符
	var clean = function clean(str, len) {
	    return limit(clear(filterHTML(str)), len);
	};

	//股票添加链接
	var AddCodeLink = function AddCodeLink(ops) {
	    ops = _.extend({
	        code: "000001",
	        className: "fire-pop-stock",
	        show: "---"
	    }, ops);
	    var style = "style=\"background:rgb(235,235,235);padding:5px 10px;border:1px solid rgb(220,220,220);border-radius:2px;\"";
	    return "<a href=\"/marketLine.htm?stockcode=" + ops.code + "\" " + style + " target=\"_blank\" data-code=\"" + ops.code + "\" class=\"" + ops.className + "\">" + ops.show + "</a>";
	};

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    clear: clear,
	    limit: limit,
	    filterHTML: filterHTML,
	    clean: clean,
	    AddCodeLink: AddCodeLink
	};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
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