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

	yn.navigation.name = ynconfig.navigation.h;
	var referList = __webpack_require__(25);
	var BestTeacher = __webpack_require__(56);
	var newRefer = __webpack_require__(60);
	var error = __webpack_require__(20);

	/*///////////////////////////////////////////////////////////////////*/

	//分类
	var fitler = function () {
	    var container;
	    return {
	        init: function init() {
	            container = $(".filter-items");

	            //高亮
	            container.on('click', '.filter-item', function () {
	                yn.switch($(this));
	            });

	            //状态
	            container.on('click', '.status-item', function () {
	                list.render({
	                    productStatus: $(this).data('status'),
	                    currentPage: 1
	                });
	                var status = $(this).data('status');
	            });

	            //价格
	            container.on('click', '.price-item', function () {
	                list.render({
	                    currentPage: 1,
	                    lprice: $(this).data('min'),
	                    hprice: $(this).data('max')
	                });
	            });

	            //时间
	            container.on('click', '.time-item', function () {
	                list.render({
	                    currentPage: 1,
	                    time: $(this).data('time')
	                });
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	//列表
	var list = function () {
	    var container,
	        items,
	        bootpag,
	        loading,
	        props = {
	        ynUserId: null,
	        productStatus: "", //状态
	        lprice: "", //价格下限
	        hprice: "", //价格上限
	        time: "", //时间
	        pageSize: 10,
	        currentPage: 1
	    };

	    var body;

	    return {
	        init: function init() {
	            var _this = this;

	            container = $("#refer-list");
	            items = container.find('.refer-items');
	            bootpag = yn.bootpag(container);
	            bootpag.on('page', function (err, num) {
	                return _this.render({ currentPage: num });
	            });
	            loading = new yn.loading({
	                container: items,
	                margin: 200,
	                type: 3
	            });
	            body = $("body");
	        },
	        render: function render(ops) {
	            $(window).scrollTop(0);
	            _.extend(props, ops);
	            loading.render();
	            $.getJSON('/center/reference/portaList.htm', props, function (data) {
	                if (data.status == 1) {
	                    if (data.data.list.length < 1) {
	                        items.html(ynconfig.none({ margin: 200 }));
	                        bootpag.hide();
	                        return;
	                    }
	                    referList.render({ data: data.data.list });
	                    bootpag.show().bootpag({ page: props.currentPage, total: _.max([1, Math.ceil(+data.data.total / props.pageSize)]) });
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	$(function () {
	    fitler.init();
	    list.init();
	    list.render();
	    referList.init({ container: $(".refer-items") });
	    onSelect('内参');
	    // BestTeacher.render({ container: $(".refer-best .items") }) //内参牛人
	    // newRefer.render({ type: "new", container: $(".refer-lastest .items") }) //最新内参
	    // newRefer.render({ type: "hot", container: $(".refer-hot .items") }) //热门内参
	    // newRefer.render({ type: "hd", container: $(".refer-talkest .items") }) //互动最多
	});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./pay-confirm.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./pay-confirm.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".hide {\n    display: none;\n}\n\n.fr {\n    float: right;\n}\n\n.color666 {\n    color: #666;\n}\n\n.inline {\n    display: inline-block;\n}\n\n.pay-confirm-overlay {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background: rgba(0, 0, 0, .4);\n    text-align: center;\n    z-index: 10000;\n}\n\n.pay-confirm-box {\n    display: inline-block;\n    margin-top: 200px;\n    background: white;\n    border-radius:2px;\n    position: relative;\n    width: 500px;\n    text-align: left;\n    margin: auto;\n    margin-top: 245px;\n    box-shadow: 7px 4px 20px 0px hsla(0, 0%, 65%, 0.38);\n}\n\n.pay-confirm-box .title {\n    text-align: left;\n    padding: 12px 20px;\n    font-size: 16px;\n    border-bottom: 1px solid rgb(219, 219, 219);\n    font-weight: bold;\n}\n\n.pay-confirm-box .content {\n    padding:20px 30px 25px;\n}\n\n.pay-confirm-box .close {\n    width:9px;\n    height:9px;\n    background:url(/public/v2/base/images/close-icon.png) no-repeat;\n    position: absolute;\n    top: 16px;\n    right: 17px;\n    cursor: pointer;\n}\n\n.payment {\n    padding-bottom: 25px;\n    border-bottom: 1px dashed #cecece;\n}\n\n.pay-item-tip .payment {\n    text-align: center;\n    border-bottom: none;\n    line-height:26px;\n    color:#666;\n    padding-bottom:0;\n    font-size:16px;\n}\n\n.payment .name {\n    font-size: 16px;\n    margin-bottom: 15px;\n}\n\n.payment .price {\n    margin-bottom: 15px;\n    font-size: 16px;\n}\n\n.payment .value {\n    color: #d72612;\n}\n\n.pay-confirm-box .submits {\n    text-align: center;\n    margin-top: 15px;\n}\n\n.pay-confirm-box .pay-btn {\n    display: inline-block;\n    padding: 6px 35px;\n    border-radius: 5px;\n    background: #F6554A;\n    color: white;\n    font-size: 16px;\n    cursor: pointer;\n    margin: 0 10px;\n}\n.pay-confirm-box .pay-btn.jump{\n    padding:9px 20px;\n}\n.pay-confirm-box .pay-btn.finish{\n    padding:6px 46px;\n}\n\n.pay-item-tip .submits {\n    text-align: center;\n    margin-top:20px;\n}\n\n.pay-item-tip .wrong {\n    background: #a3a2a2\n}\n\n.agree .blue {\n    color: #1176E8;\n}\n\n.agree input {\n    position: relative;\n    top: 2px;\n    left: -3px;\n}\n\n.agree .txt {\n    color: #999;\n}\n\n.agree-tip {\n    margin-top:10px;\n    font-size: 12px;\n}\n\n.orderNum-value {\n    color: #666\n}\n\n\n/*  */\n\n.defray-content {\n    padding: 12px 0 0 0;\n    border-bottom: 1px dashed #cecece;\n}\n\n.defray-item {\n    height: 43px;\n    margin: 12px auto;\n}\n\n.yn_pay {\n    width: 340px;\n    position: relative;\n    top: 4px;\n    color: #333;\n    font-size: 16px;\n}\n\n.type-alipay {\n    background: url(/public/v2/base/images/zhifubao.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-wx {\n    background: url(/public/v2/base/images/weixin.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-nb {\n    background: url(/public/v2/base/images/yue.png) no-repeat;\n    padding-left: 45px;\n}\n\n.defray-item .rounded {\n    width: 14px;\n    height: 14px;\n    position: relative;\n    top: 7px;\n    border: 1px solid #B3B3B3;\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n}\n\n.defray-item.thisclass .rounded {\n    border: 1px solid #CB1F13;\n}\n\n.rounded label {\n    width: 10px;\n    height: 10px;\n    position: absolute;\n    top: 1px;\n    left: 1px;\n    cursor: pointer;\n    background: #B3B3B3;\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n}\n\n.defray-item.thisclass .rounded label {\n    background: #CB1F13;\n}\n.defray-item.disable .rounded{\n    background: #cccccc;\n}\n.defray-item.disable .rounded label {\n    background: #cccccc;\n}\n\n\n/*.rounded label:after {\n    content: '';\n    width: 11px;\n    height: 7px;\n    position: absolute;\n    top: 5px;\n    left: 4px;\n    border: 3px solid #fcfff4;\n    border-top: none;\n    border-right: none;\n    background: transparent;\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n    opacity: 0;\n    transition: all .3s;\n    -moz-transform: rotate(-45deg);\n    -ms-transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}*/\n\n\n/*.rounded label.disable {\n    background: #D7D7D7;\n}*/\n\n\n/*.rounded label:hover::after {\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=30);\n    opacity: 0.3;\n}*/\n\n\n/*.rounded input[type=radio] {\n     position:relative;\n    top:1px;\n    left:1px;\n    visibility: hidden;\n}*/\n\n\n/*.rounded input[type=radio]:checked+label {\n    background: #CB1F13;\n    top: 1px;\n    left: 1px;\n}*/\n\n\n/*  */\n\n.balance-icon {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background: url(/public/v2/base/images/balance-icon.png) no-repeat;\n    position: relative;\n    top: 4px;\n    left: 10px;\n}\n\n.yn_balance {\n    color: #666;\n    font-size: 14px;\n    height: 20px;\n    line-height: 20px;\n    border: 1px solid #E7E5E5;\n    border-left: none;\n    box-shadow: 5px 3px 10px #ececec;\n    padding: 2px 10px;\n}\n\n.balance-arrow {\n    display: inline-block;\n    width: 10px;\n    height: 24px;\n    background: url(/public/images/arrow.png) no-repeat;\n    margin-left: 10px;\n    position: relative;\n    top: 6px;\n    left: 5px;\n}\n\n.pay-confirm-overlay .colorRed {\n    color: #F6554A;\n}\n\n.orderNum {\n    font-size: 16px;\n}\n\n.yn-balance-value {\n    margin-right: 10px;\n}\n\n", ""]);

	// exports


/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	    "1": "请求成功",
	    "-1": "请求繁忙",
	    "10001": "股票代码不存在",
	    "10002": "查询条件为空",
	    "20001": "登录失效",
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
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	var liveDetailTable = {
	    composite: live_path + "/html/liveDetail_composite.htm"
	};

	module.exports = {

	    //首页

	    //组合
	    composite: {
	        portal: function portal() {
	            return __path + "/html/returnCompositeJsp.htm";
	        },
	        detail: function detail(compositeId, teacherId) {
	            teacherId = teacherId || "YN";
	            return __path + "/html/CompositeDetail.htm?" + teacherId + "ZHXQ" + compositeId;
	        },
	        create: function create(id) {
	            id = "?EDIT" + id || "";
	            return __path + "/html/compositeCreate.htm" + id;
	        }
	    },

	    //直播
	    live: {
	        detail: function detail(type) {
	            return liveDetailTable[type];
	        },
	        refer: function refer(id) {
	            return live_path + "/live/liveDetailRefer.htm?teacherid=" + id;
	        }
	    },

	    //内参
	    refer: {
	        detail: function detail(id) {
	            return __path + "/referp/list.htm?referenceid=" + id;
	        }
	    },

	    //支付
	    pay: function pay(order) {
	        return __path + "/html/returnshortcutpayJsp.htm?orderNum=" + order;
	    },

	    //视频
	    video: {
	        portal: video_path + "/video/index.htm",
	        detail: function detail(id) {
	            return video_path + "/video/detail.htm?videoId=" + id;
	        }
	    },

	    //个人中心
	    center: {
	        stock: __path + "/myCenter/myCenter.htm"
	    },

	    //资讯
	    news: {
	        portal: news_path + "/article/index.htm"
	    },

	    //观点

	    opinion: {
	        portal: opinion_path + "/opinion",
	        detail: function detail(id) {
	            return opinion_path + "/opinion/" + id + ".htm";
	        }
	    }
	};

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
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
	    "30011": "该号码不是约投顾的工作电话，慎防假冒！",
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
	    "60023": "商品购买时间已过",
	    "70001": "组合不存在",
	    "70002": "组合已技术评价",
	    "70003": "收益信息为空",
	    "70004": "委托记录为空",
	    "80000": '该手机号被用户举报，涉嫌违规操作，目前不能注册账号',
	    "80001": '您输入的内容违反相关规定，不能予以展示!',
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
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    //导入模块
	    var referList = require('../module/composite/refer-list.js');

	    referList.init({container: $el });

	    //渲染视图
	    referList.render({ data: Array});
	*/

	/*///////////////////////////////////////////////////////////////////*/

	__webpack_require__(26);
	var Path = __webpack_require__(12);
	var Day = __webpack_require__(28);
	var payConfirm = __webpack_require__(29);
	var Day = __webpack_require__(28);
	var auth = __webpack_require__(30); // 实名认证模块


	/*///////////////////////////////////////////////////////////////////*/

	/*
	    ops = {data, container} //require
	*/
	module.exports = function () {
	    var container, data, contentWidth, countDown;

	    var create = function create(data) {
	        return '<div class="refer-list-item" id="refer-li"><div class="refer-list-item-wrap"><div class="user_info clear"><div class="user_head fl"><span class="icon status ' + data._icon + '">' + data._text + '</span><div class="cover"><img src="' + data.photo_path + '" /></div><div class="name">' + data.puiblisher + '</div></div><div class="content fl"><a class="title" href="' + data._link + '" target="_blank" style="width:' + contentWidth + 'px">' + data._title + countDown + '</a><div class="middle"><div class="price fl"><div class="red">' + data._price + '</div><div class="small">\u4EF7\u683C</div></div><div class="num fl"><div class="red">' + data.updatefrequency + '<span class="small">\uFF08\u6761\uFF09</span></div><div class="small"><span>' + data.updateDay + '</span>\u4EA4\u6613\u65E5/\u66F4\u65B0\u9891\u7387</div></div><div class="dayCount"><span class="line"></span><span class="point"></span><span class="text">' + data.runText + '</span></div></div><div class="sub_detail clear ' + data._style + '">\u670D\u52A1\u65F6\u95F4\uFF1A' + data._startTime + '\uFF0D' + data._endTime + '</div><div class="sub_detail clear ' + data._style1 + '">\u670D\u52A1\u65F6\u95F4\uFF1A\u65E0\u9650\u671F</div></div></div></div><div class="agreement"><a href="/protocol.htm?orderid=' + data.orderid + '&referenceid=' + data.id + '" target="_blank">\u300A\u670D\u52A1\u4F7F\u7528\u534F\u8BAE\u300B</a><a href="/agreement.htm?orderid=' + data.orderid + '&referenceid=' + data.id + '" target="_blank">\u300A\u98CE\u9669\u63D0\u793A\u4E66\u300B</a></div>' + data._button + '</div>';
	    };
	    //开始时间 + 试用时间 = 使用结束时间
	    function transferCouponValueTime(startDate, valueTime) {
	        var date = new Date(startDate);
	        var newDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() + valueTime);
	        var year2 = newDate.getFullYear();
	        var month2 = newDate.getMonth();
	        var day2 = newDate.getDate();
	        return year2 + '/' + month2 + '/' + day2;
	    }

	    var getShort = function getShort(str) {
	        return str.match(/^[\d\-]+/)[0];
	    };

	    var handleData = function handleData(data) {
	        var getDay = function getDay(time) {
	            return time.match(/^\d+-(\d+-\d+)/)[1].replace(/-/, '.');
	        };

	        // 按钮状态
	        var buttonTable = {
	            feed: function feed(item) {
	                return '<span data-link="' + item._link + '" data-index="' + item.reference_id + '" class="feedBtn" data-type="feed" data-status=\'' + item.isactivity + '\'>\u7ACB\u5373\u67E5\u770B</span>';
	            },
	            unFeed: function unFeed(item) {
	                return '<a href="' + item._link + '" data-index="' + item.reference_id + '" class="feedBtn" data-type="unFeed" data-status=\'' + item.isactivity + '\'>\u53BB\u8BA2\u9605</span></a>';
	            },
	            end: function end(item) {
	                return '<a href="' + item._link + '" class="feedBtn gray" data-type="end" data-status=\'' + item.isactivity + '\'>\u5DF2\u5B8C\u6210</a>';
	            }
	        };
	        return _.map(data, function (item) {

	            item._link = '/reference/' + item.reference_id + '.htm';
	            item._pubtime = yn.timeFormat(item.pubtime);
	            if (item.referenceType == 1) {
	                item._startTime = getDay(item.startTime);
	                item._endTime = getDay(item.endTime);
	            }
	            item._price = item.referenceType == 1 ? item.price + '<span class="small redNum">\uFF08\u5143\uFF09</span>' : item.price + '<span class="small redNum">\u5143/\u6708</span>';
	            item._style = item.referenceType == 0 ? 'hide' : '';
	            item._style1 = item.referenceType == 1 ? 'hide' : '';
	            item._icon = ["ready", "update", "end"][+item.productStatus];

	            var isTrial = item.orderState == '1' && item.isTrial == 1; //正在试用
	            var noIsTrial = item.isTrial == 0; //正常订单
	            var orderState = item.orderState == '9' && item.isTrial == 1; //试用且过期
	            if (isTrial) {
	                item._text = '免费试用';
	                //试用倒计时
	                var time1 = new Date(item.startTime).getTime();
	                var time2 = new Date().getTime();
	                if (item.orderServicePeriod && time1 <= time2) {
	                    //活动开始后
	                    var startTime = item.startTime;
	                    var orderServicePeriod = item.orderServicePeriod;

	                    var end = transferCouponValueTime(startTime, +orderServicePeriod);
	                    var endTime = new Date(end); //结束时间
	                    var difference = endTime.getTime() - new Date().getTime(); //时间差的毫秒数   
	                    //计算出相差天数
	                    var days = Math.floor(difference / (24 * 3600 * 1000));
	                    var style = null;
	                    if (days > 0) {
	                        var orderServicePeriod = item.orderServicePeriod - days;
	                        style = '';
	                        countDown = item.orderServicePeriod ? '<span class="fr countDown">\u5269\u4F59\u8BD5\u7528\u5929\u6570<span class="countDown-num">' + orderServicePeriod + '</span>\u5929</span>' : '';
	                    } else {
	                        countDown = '';
	                    }
	                } else if (item.orderServicePeriod && time1 > time2) {
	                    //活动还未开始
	                    countDown = item.orderServicePeriod ? '<span class="fr countDown">\u5269\u4F59\u8BD5\u7528\u5929\u6570<span class="countDown-num">' + item.orderServicePeriod + '</span>\u5929</span>' : '';
	                }
	            } else if (noIsTrial) {
	                countDown = '';
	                item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];
	            } else {
	                countDown = '';
	                item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];
	            }
	            if (orderState) {
	                countDown = '';
	                item._text = '试用已过期';
	                item._icon = 'end';
	            }

	            if (item.title.length > 30) {
	                item._title = item.title.substr(0, 30) + "..";
	            } else {
	                item._title = item.title;
	            }

	            //按钮状态
	            var isSelf = +ynTeacherId == +item.teacherid;
	            var isFeed = item.is_od == 1;
	            var isEnd = item.productStatus == 2; // 结束
	            var isTry = item.productStatus == "0" && item.orderState == '9'; //服务中的内参试用且过期


	            // 运行状态
	            var total = 1;
	            var count = 2;

	            var btnKey = _.find([{
	                assert: isEnd,
	                action: "end"
	            }, {
	                assert: isTry,
	                action: "unFeed"
	            }, {
	                assert: isSelf || isFeed,
	                action: "feed"
	            }, {
	                assert: !isFeed,
	                action: "unFeed"
	            }], function (item) {
	                return item.assert;
	            });

	            item._key = btnKey;
	            item._button = buttonTable[btnKey.action](item);
	            var short_start = getShort(item.startTime),
	                short_now = getShort(item.systemTime),
	                day_now = new Day(short_now);
	            var totalRunCount;
	            if (item.referenceType == 1) {
	                var short_end = getShort(item.endTime),
	                    day_end = new Day(short_end);
	                totalRunCount = day_end.offset(short_start);
	            } else {
	                totalRunCount = '0';
	            }
	            var runCount = Math.abs(day_now.offset(short_start)) + 1;
	            var runTextTable = {
	                0: function _() {
	                    return '\u5DF2\u670D\u52A1' + runCount + '\u5929';
	                },
	                1: function _() {
	                    return --runCount + '\u5929\u540E\u5F00\u59CB\u670D\u52A1';
	                },
	                2: function _() {
	                    return '\u5171\u8FD0\u884C' + totalRunCount + '\u5929';
	                }
	            };
	            item.runText = runTextTable[item.productStatus]();
	            return item;
	        });
	    };

	    var showConfirm = function showConfirm(itemData) {
	        getOrderNumber(itemData.id, function (data) {
	            data = data.data;
	            payConfirm.render({
	                name: "内参订阅",
	                price: itemData.price,
	                link: Path.pay(data.orderNum),
	                success: function success() {
	                    layer.msg("支付成功!!");
	                    setTimeout(function () {
	                        return window.location.reload();
	                    }, 500);
	                },
	                fail: function fail() {
	                    return layer.msg("支付失败!!");
	                }
	            });
	        });
	    };

	    return {
	        init: function init(ops) {
	            container = ops.container;

	            //点击订阅
	            container.on('click', '.feedBtn', _.debounce(function () {
	                // if ($(this).data('type') == 'end') {
	                //     return layer.msg('内参已结束');
	                // }
	                var id = $(this).data('index');
	                var flag = $(this).data('status') == 1 ? "none" : "";
	                // if ($(this).data('type') == "feed") {
	                //     auth.get().render(result => { //实名认证
	                //         if (result) {
	                //             window.location.href = $(this).data('link')
	                //         }
	                //     }, flag)
	                //     return;
	                // } else {
	                window.location.href = $(this).data('link');
	                // }

	                var index = $(this).parents('.refer-list-item').index();
	                var itemData = data[index];
	                // if (+itemData.productStatus == 2) return layer.msg("已结束");

	                //订阅提示(结束前5天提醒)
	                if (itemData._key != "unFeed") return;
	                var endMatch = itemData.endTime.match(/^[^\s]+/)[0];
	                var endTime = new Day(endMatch);
	                var offset = endTime.offset(itemData.systemTime.match(/^[^\s]+/)[0]);
	                if (offset >= 5) return showConfirm(itemData);
	                layer.confirm('\u8BE5\u5185\u53C2\u8DDD\u79BB\u7ED3\u675F\u4EC5\u5269' + offset + '\u5929, \u786E\u5B9A\u8981\u8BA2\u9605\u5417?', function () {
	                    showConfirm(itemData);
	                });
	            }, 200, {
	                leading: true,
	                trailing: false
	            }));
	        },

	        render: function render(ops) {
	            data = handleData(ops.data);
	            contentWidth = container.width() - 240;
	            var html = _.map(data, function (item) {
	                return create(item);
	            }).join('');
	            container.html(html);
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	//获取订单
	function getOrderNumber(id, callback) {
	    var send = {
	        goodsId: id, //商品id
	        goodsType: 3, //商品类型(0观点，1组合，2课程，3内参 4:问股 5 直播)
	        buy_number: 1, //内参数量
	        pay_source: 0 //来源 0web
	    };
	    $.post("/app/buyGoodsPayOrder.htm", send, function (data) {
	        callback(data);
	    }, 'json');
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-list.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-list.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "#refer-li.refer-list-item {\r\n    border-top: 1px solid #e6e7e8;\r\n    margin-bottom: 15px;\r\n    background: #fff;\r\n    width: 100%;\r\n    height: 210px;\r\n    box-shadow: 5px 2px 6px rgba(216, 211, 211, 0.8);\r\n    position: relative;\r\n}\r\n\r\n#refer-li.refer-list-item .icon.status {\r\n    width: auto;\r\n    height: auto;\r\n    background: rgb(255, 80, 84);\r\n    color: #fff;\r\n    display: inline-block;\r\n    padding: 5px 12px;\r\n    border-radius: 0 40px 40px 0;\r\n    position: absolute;\r\n    left:0;\r\n}\r\n\r\n#refer-li.refer-list-item .cover {\r\n    width: 85px;\r\n    height: 85px;\r\n    border-radius: 50%;\r\n    margin: 35px auto 10px auto;\r\n    overflow: hidden;\r\n}\r\n\r\n#refer-li.refer-list-item .cover img {\r\n    width: 100%;\r\n}\r\n\r\n#refer-li.refer-list-item .cover .name {\r\n    text-align: center;\r\n    margin-top: 10px;\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n}\r\n\r\n.refer-list-item:first-child {\r\n    border-top: none;\r\n}\r\n\r\n#refer-li.refer-list-item .title {\r\n    font-size: 18px;\r\n    color: rgb(30, 30, 30);\r\n    line-height: 35px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n#refer-li.refer-list-item .user_info {\r\n    margin-bottom: 20px;\r\n}\r\n\r\n#refer-li.refer-list-item .user_head {\r\n    position: relative;\r\n    width: 199px;\r\n    height: 210px;\r\n    text-align: center;\r\n    background: #f6f6f6;\r\n}\r\n\r\n#refer-li.refer-list-item .user_head img {\r\n    border: none;\r\n    height: 100%;\r\n}\r\n\r\n#refer-li.refer-list-item .content {\r\n    padding: 10px;\r\n    line-height: 28px;\r\n    height: 190px;\r\n    overflow: hidden;\r\n    background: #fff;\r\n    position: relative;\r\n}\r\n\r\n#refer-li.refer-list-item .content .title {\r\n    display: block;\r\n    font-size: 22px;\r\n    font-weight: bold;\r\n}\r\n\r\n#refer-li.refer-list-item .content .middle {\r\n    height: 100px;\r\n    padding-left: 50px;\r\n}\r\n\r\n#refer-li.refer-list-item .content .middle .price,\r\n#refer-li.refer-list-item .content .middle .num {\r\n    width: 30%;\r\n    height: 100px;\r\n    text-align: left;\r\n    padding-top: 20px;\r\n}\r\n\r\n#refer-li.refer-list-item .content .red {\r\n    font-size: 28px;\r\n    color: #fe292d;\r\n    font-weight: bold;\r\n}\r\n\r\n#refer-li.refer-list-item .content .small {\r\n    font-size: 14px;\r\n    color: gray;\r\n}\r\n#refer-li.refer-list-item .content .redNum{\r\n    margin-left:5px;\r\n}\r\n#refer-li.refer-list-item .sub_detail {\r\n    width:300px;\r\n    color: gray;\r\n    margin-top: 10px;\r\n}\r\n\r\n#refer-li.refer-list-item .sub_detail>span {\r\n    line-height: 28px;\r\n    margin-right: 15px;\r\n    font-size: 12px;\r\n}\r\n\r\n#refer-li.refer-list-item .feedBtn:hover {\r\n    background: #d63c40;\r\n}\r\n\r\n#refer-li.refer-list-item .feedBtn.gray {\r\n    background: #b8b8b8;\r\n    box-shadow: 0 0 5px 0 #b8b8b8;\r\n}\r\n\r\n#refer-li.refer-list-item .dayCount {\r\n    position: absolute;\r\n    bottom: 40px;\r\n    left: 0px;\r\n    width: 100%;\r\n    overflow: hidden;\r\n}\r\n\r\n#refer-li.refer-list-item .dayCount .line {\r\n    height: 1px;\r\n    border-bottom: 1px solid #ffe6e9;\r\n    display: inline-block;\r\n    width: 60%;\r\n    position: relative;\r\n    top: -3px;\r\n}\r\n\r\n#refer-li.refer-list-item .dayCount .point {\r\n    width: 5px;\r\n    height: 5px;\r\n    display: inline-block;\r\n    background: #ffe6e9;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    left: -5px;\r\n    top: -1px;\r\n}\r\n\r\n#refer-li.refer-list-item .refer-list-item-wrap .end {\r\n    background: #b8b8b8;\r\n}\r\n\r\n#refer-li.refer-list-item .refer-list-item-wrap .end {\r\n    background: #b8b8b8;\r\n}\r\n\r\n#refer-li.refer-list-item .refer-list-item-wrap .ready {\r\n    background: #e3b03d;\r\n}\r\n\r\n#refer-li.refer-list-item .agreement {\r\n    position: absolute;\r\n    bottom: 10px;\r\n    left: 680px;\r\n    font-size: 12px;\r\n    display: none;\r\n}\r\n\r\n#refer-li.refer-list-item .agreement a {\r\n    color: #0798ff;\r\n}\r\n\r\n#refer-li.refer-list-item .feedBtn {\r\n    background: #e54c4f;\r\n    box-shadow: 1px 3px 12px 0 rgba(209, 62, 65, 0.58);\r\n    color: white;\r\n    border-radius: 3px;\r\n    width: 80px;\r\n    display: inline-block;\r\n    text-align: center;\r\n    height: 30px;\r\n    line-height: 30px;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    left: 920px;\r\n    bottom: 40px;\r\n}\r\n.refer-list-item .countDown{\r\n    font-size:15px;\r\n    color:#333;\r\n    font-weight: normal;\r\n}\r\n.refer-list-item .countDown-num{\r\n    color:red;\r\n}", ""]);

	// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";

	/*
	    
	    ---------------天数计算---------------------------
	    
	    //导入模块
	    var Day = require('../lib/day.js');

	    //创建对象
	    var a = new Day("2016-09-09")

	    //获取时间戳
	    a.stamp -->Number : 405341545645645

	    //天数计算
	    a.add(2) -->String : "2016-09-11"

	    //距离今天的天数
	    a.offset()  -->Number : 2

	    //距离某天的天数
	    a.offset("2016-09-06") -->Number : 3

	 */

	var now = function now() {
	    return new Date().getTime();
	};
	var isDay = function isDay(str) {
	    return str.match(/^(20[12]\d)[/\-]([01]*[0-9])[/\-](\d+)/);
	};
	var getStamp = function getStamp(arr) {
	    var time = _.map(arr, function (item) {
	        return _.padLeft(item, 2, "0");
	    }).join("/") + " 00:00:00"; //_.padLeft("string",length,"填充符")从左填充
	    return Date.parse(time);
	};

	var ___day = function ___day(val) {
	    this.stamp = function () {
	        if (typeof val != "string") {
	            console.log(val + "\u4E0D\u662F\u5B57\u7B26\u7C7B\u578B");
	            return;
	        }
	        if (!isDay(val)) {
	            console.log(val + "\u683C\u5F0F\u4E0D\u6B63\u786E");
	            return;
	        }

	        var match = isDay(val);
	        var timestamp = getStamp([match[1], match[2], match[3]]);

	        //日期是否有效
	        if (!!!timestamp) {
	            console.log(val + "\u4E0D\u662F\u6709\u6548\u7684\u65E5\u671F");
	            return;
	        }
	        return timestamp;
	    }();
	};

	___day.prototype = {
	    add: function add(dayCount) {
	        var milli = function () {
	            return 1000 * 3600 * 24 * dayCount;
	        }();

	        var newStamp = this.stamp + milli;
	        var date = new Date(newStamp);
	        var year = date.getFullYear();
	        var month = function () {
	            var m = +date.getMonth() + 1;
	            if (m < 10) {
	                m = "0" + m;
	            }
	            return m;
	        }();
	        var day = date.getDate();
	        return [year, month, day].join("-");
	    },
	    offset: function offset(_date) {
	        var current = _date && new ___day(_date).stamp + 1 || now();
	        return Math.floor((this.stamp - current) / (3600 * 24 * 1000)) + 1;
	    }

	    /*///////////////////////////////////////////////////////////////////*/

	};module.exports = ___day;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 
	 * 请使用 require('m/ui/pay-confirm-v1.2.js') 模块代替
	 */

	__webpack_require__(7);

	var ErrorCode = __webpack_require__(11);

	var create = function create() {
	    return '<div class="pay-confirm-overlay hide"><div class="pay-confirm-box"><div class="title">\u652F\u4ED8\u786E\u8BA4</div><span class="close fa fa-times-circle"></span><div class="content"><div class="pay-item pay-item-confirm"><div class="payment"><div class="name">\u652F\u4ED8\u9879\u76EE\uFF1A<span class="value" style="color:red"></span></div><div class="price">\u4EF7\u683C\uFF1A<strong class="value"></strong>\u5143</div><div class="submits"><span class="pay-btn jump btna">\u7ACB\u5373\u652F\u4ED8</span><a id="pay-confirm-link" class="btnb pay-btn jump hide" href="" target="_blank">\u7ACB\u5373\u652F\u4ED8</a></div><div class="agree-tip clear hide"><a href="" class="service fr agree" target="_blank">\u300A<span class="blue">\u670D\u52A1\u4F7F\u7528\u534F\u8BAE</span>\u300B</a><a href="" class="risk fr agree" target="_blank">\u300A<span class="blue">\u98CE\u9669\u63ED\u793A\u4E66</span>\u300B</a><span class="agree fr"><input type="checkbox"/><span class="txt">\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F</span></span></div></div></div><div class="pay-item pay-item-tip hide"><div class="payment"><p>\u652F\u4ED8\u5B8C\u6210\u524D\uFF0C\u8BF7\u4E0D\u8981\u5173\u95ED\u6B64\u652F\u4ED8\u9A8C\u8BC1\u7A97\u53E3</p><p><strong>\u8BF7\u57282\u5C0F\u65F6\u5185\u652F\u4ED8\uFF0C\u8D85\u65F6\u5C06\u5173\u95ED\u8BA2\u5355\uFF1B</strong></p><div class="submits"><a class="wrong pay-btn" href="http://us.yuetougu.com/help.htm" target="_blank">\u652F\u4ED8\u9047\u5230\u95EE\u9898</a><a class="finish pay-btn">\u652F\u4ED8\u5B8C\u6210</a></div></div></div></div></div></div>';
	};

	var pay = function () {
	    var container,
	        box,
	        confirm,
	        tip,
	        name,
	        price,
	        link,
	        submitLink,
	        ops = {
	        name: "支付名称",
	        price: 0,
	        link: "#",
	        success: function success() {
	            layer.msg("支付成功");
	        },
	        fail: function fail() {
	            layer.msg("支付失败");
	        }
	    };

	    var payStatus = null; //支付状态

	    return {
	        init: function init() {
	            var self = this;
	            $("body").append(create());
	            container = $('.pay-confirm-overlay');
	            box = container.find('.pay-confirm-box');
	            confirm = $('.pay-item-confirm');
	            tip = container.find('.pay-item-tip');
	            name = container.find('.name .value');
	            price = container.find('.price .value');
	            link = $('#pay-confirm-link');

	            //关闭
	            container.on('click', '.close', function () {
	                $.post("/web/getPayStatus.htm", function (data) {
	                    if (data == "1" || data == "6") {
	                        ops.success();
	                    } else {
	                        container.hide();
	                        confirm.show();
	                        tip.hide();
	                        $('.agree input').attr('checked', false);
	                    }
	                });
	            });

	            //检查复选框状态 
	            container.on('change', '.agree-tip input', function () {
	                var flag = $(this).is(':checked');
	                console.log("input", flag);
	                if (flag) {
	                    $('.btna').hide();
	                    $('.btnb').show();
	                } else {
	                    $('.btna').show();
	                    $('.btnb').hide();
	                }
	            });

	            //立即支付
	            container.on('click', '.jump', function () {
	                var agree = container.find('.agree-tip');
	                console.log(agree.is(":visible"));
	                if (agree.is(":visible")) {
	                    var flag = agree.find('input').is(':checked');
	                    console.log("flag", flag);
	                    if (!flag) {
	                        layer.msg('请阅读风险提示书');
	                        return false;
	                    }
	                }
	                confirm.hide();
	                tip.show();
	            });

	            //支付完成
	            tip.on('click', '.finish', function () {
	                $.post("/web/getPayStatus.htm", function (data) {
	                    if (data == "1" || data == "6") {
	                        ops.success();
	                    } else {
	                        ops.fail(data);
	                    }
	                });
	            });
	        },
	        render: function render(_ops) {
	            _.extend(ops, _ops);
	            if (_ops.name == "内参订阅") {
	                container.find('.agree-tip').show();
	                var serviceLink = '/protocol.htm?refer=' + ops.orderid;
	                var riskLink = '/agreement.htm?refer=' + ops.orderid;
	                container.find('.agree-tip .service').attr('href', serviceLink);
	                container.find('.agree-tip .risk').attr('href', riskLink);
	            }
	            container.show();
	            box.velocity('transition.expandIn', { duration: 300 });
	            name.text(ops.name);
	            price.text(ops.price);
	            link.attr('href', ops.link);
	        }
	    };
	}();

	pay.init();

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    render: pay.render
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* 
	    实名认证弹窗
	    var auth = require('vmodule/userAuth')
	    auth.get().render(back => {
	        alert(back) // 认证结果
	    })
	*/

	var ajax = __webpack_require__(31);
	var verification = __webpack_require__(32);
	var countDonw = __webpack_require__(33);
	__webpack_require__(34);

	/*///////////////////////////////////////////////////////////////////*/

	var _isVerify = true; // 是否认证
	var _isAppraisal = true; // 是否评估

	// 检查是否实名认证
	var check = function () {
	    $.post('/app/isIdCard.htm', function (back) {
	        if (back.status == 1) {
	            _isVerify = back.data.isCard == 'false' ? false : true;
	            _isAppraisal = back.data.isRisk == 'false' ? false : true;
	        }
	    }, 'json');
	}();

	var w = $(window).width();
	var h = $(window).height();

	var layoutBox = function layoutBox(box) {
	    var cw = box.outerWidth();
	    var ch = box.outerHeight();
	    box.css({
	        left: (w - cw) / 2 + 'px',
	        top: (h - ch) / 2 - 250 + 'px'
	    });
	};

	var createElement = function createElement() {
	    return '<div id="auth-overlay" class="123456"><div id="auth-verify"><div class="title"><span class="value">\u8BA4\u8BC1\u4E0E\u8BC4\u4F30</span><i class="close fa fa-close"></i></div><div class="auth-remind">\u5E94\u8BC1\u76D1\u4F1A\u8981\u6C42\uFF0C\u540C\u65F6\u4E3A\u4E86\u4FDD\u969C\u60A8\u7684\u8D44\u91D1\u8D22\u4EA7\u5B89\u5168\uFF0C\u8BF7\u8FDB\u884C\u5B9E\u540D\u8BA4\u8BC1</div><div class="auth-remind">\u8BA4\u8BC1\u4FE1\u606F\u4EC5\u4F5C\u5907\u6848\u4F7F\u7528\uFF0C\u4E0D\u4F1A\u4EE5\u4EFB\u4F55\u5F62\u5F0F\u900F\u9732\u7ED9\u7B2C\u4E09\u65B9\uFF0C\u8BF7\u653E\u5FC3\u4F7F</div><div class="auth-frame card"><div class="form-item verify-form"><div class="line"><span class="form-text">\u771F\u5B9E\u59D3\u540D</span><input class="auth-verify-name" type="text" placeholder="\u586B\u5199\u60A8\u8EAB\u4EFD\u8BC1\u4E0A\u7684\u540D\u5B57"></div><div class="line"><span class="form-text">\u8EAB\u4EFD\u8BC1\u53F7</span><input class="auth-verify-code" type="text" placeholder="15\u621618\u4F4D\u8EAB\u4EFD\u8BC1\u53F7\u7801"></div><div class="line submitBar"><div class="auth-error"></div><div class="submit">\u786E\u8BA4</div></div></div><div class="form-item done"><div class="result"><div class="icon-done-big icon"></div><p>\u606D\u559C\u60A8\u8BA4\u8BC1\u6210\u529F!</p></div><div class="to-btn"><span class="count-down">4</span>\u79D2\u540E\u5F00\u59CB\u98CE\u9669\u8BC4\u4F30</div></div></div><div class="auth-frame appraisal"><div class="appraisal-tip">\u53EA\u9700\u4E00\u6B21\u98CE\u9669\u8BC4\u4F30\uFF0C\u65B9\u4FBF\u6211\u4EEC\u4E3A\u60A8\u66F4\u597D\u5730\u670D\u52A1\uFF01</div><div class="appraisal-btn">\u53BB\u8BC4\u4F30</div></div></div></div>';
	};

	var verify = function () {
	    var instance = null;

	    var createInstance = function createInstance() {
	        var callback; //验证回调

	        $('body').append(createElement());
	        var container = $('#auth-verify');
	        var frame_card = container.find('.auth-frame.card');
	        var frame_appraisal = container.find('.auth-frame.appraisal');
	        var group_form = container.find('.verify-form'); // 评估表单
	        var group_success = container.find('.form-item.done'); //评估完成
	        var error = container.find('.auth-error');
	        var name = container.find('.auth-verify-name');
	        var code = container.find('.auth-verify-code');
	        var submit = container.find('.submit');
	        var overlay = $('#auth-overlay');
	        overlay.css({
	            width: w + 'px',
	            height: h + 'px'
	        });

	        layoutBox(container);

	        var reset = function reset() {
	            overlay.hide();
	            error.text('');
	            name.val('');
	            code.val('');
	        };

	        var showError = function showError(text) {
	            error.text(text);
	            error.addClass('shake');
	            setTimeout(function () {
	                error.removeClass('shake');
	            }, 1000);
	        };

	        var toAppraisal = function toAppraisal() {
	            window.location.href = '/backstage/myAppraisal.htm?jump=' + window.location.href;
	        };

	        // 评估完成
	        var showSuccess = function showSuccess() {
	            _isVerify = true;
	            container.find('.close').hide();
	            group_success.show();
	            group_form.hide();
	            countDonw.run({
	                $el: container.find('.count-down'),
	                done: function done() {
	                    toAppraisal();
	                }
	            });
	        };

	        if (!_isVerify) {
	            // 未认证
	            frame_card.show();
	        } else {
	            frame_appraisal.show();
	        }

	        frame_card.find('input').focus(function () {
	            error.text('');
	        });

	        container.on('click', '.close', function () {
	            reset();
	            if (typeof callback == 'function') {
	                callback(false);
	            }
	        });

	        container.on('click', '.appraisal-btn', function () {
	            toAppraisal();
	        });

	        /* Event */

	        submit.on('click', function () {
	            var val_name = name.val().replace(/^\s+|\s+$/, '');
	            var val_code = code.val().replace(/^\s+|\s+$/, '');
	            var valid_name = /^[\u4e00-\u9fa5\.]{2,20}$/.test(val_name);
	            var valid_code = verification(val_code);

	            if (!valid_name) {
	                return showError('真实姓名为中文汉字(2-20)');
	            }

	            if (!valid_code) {
	                return showError('请填写有效身份证号');
	            }

	            $.post('/app/verificationIdCard.htm', {
	                username: val_name,
	                idCard: val_code
	            }, function (data) {
	                if (data.status == 1 || data.status == 90001) {
	                    _isVerify = true;
	                    return showSuccess();
	                }

	                if (data.status == 90000) {
	                    return showError('\u8FD8\u6709' + data.data.validateCount + '\u6B21\u8BA4\u8BC1\u673A\u4F1A');
	                }

	                if (data.status == 90004) {
	                    return showError('认证次数已用完，请明天再试');
	                }

	                if (data.status == 90005) {
	                    layer.msg('身份证绑定用户数已达上限');
	                }
	            }, 'json');
	        });

	        return {
	            render: function render(_callback, flag) {
	                // 如果第二个参数为“none”， 不验证
	                if (flag == 'none') {
	                    _callback(true);
	                    return;
	                }

	                callback = _callback;

	                // 已经认证完毕
	                console.log('=969696', _isAppraisal && _isVerify);
	                if (_isAppraisal && _isVerify) {
	                    console.log(8520);
	                    if (typeof callback == 'function') {
	                        callback(true);
	                    }
	                    return;
	                }

	                overlay.show();
	            }
	        };
	    };

	    return {
	        get: function get() {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	}();

	module.exports = verify;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    ajax: function ajax(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }

	        $.ajax({
	            url: url,
	            data: param,
	            dataType: 'json',
	            success: function success(data) {
	                callback(data);
	            },
	            error: function error(err) {
	                console.log('===err', err);
	            }
	        });
	    },
	    getJSON: function getJSON(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }
	        $.getJSON(url, param, function (back) {
	            callback(back);
	        });
	    },
	    postJSON: function postJSON(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }
	        $.post(url, param, function (back) {
	            callback(back);
	        }, 'json');
	    },
	    post: function post(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }
	        $.post(url, param, function (back) {
	            callback(back);
	        });
	    }
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	var IDVerify = function IDVerify(code) {
	    code = String(code);

	    var vcity = {
	        11: "北京",
	        12: "天津",
	        13: "河北",
	        14: "山西",
	        15: "内蒙古",
	        21: "辽宁",
	        22: "吉林",
	        23: "黑龙江",
	        31: "上海",
	        32: "江苏",
	        33: "浙江",
	        34: "安徽",
	        35: "福建",
	        36: "江西",
	        37: "山东",
	        41: "河南",
	        42: "湖北",
	        43: "湖南",
	        44: "广东",
	        45: "广西",
	        46: "海南",
	        50: "重庆",
	        51: "四川",
	        52: "贵州",
	        53: "云南",
	        54: "西藏",
	        61: "陕西",
	        62: "甘肃",
	        63: "青海",
	        64: "宁夏",
	        65: "新疆",
	        71: "台湾",
	        81: "香港",
	        82: "澳门",
	        91: "国外"
	    };

	    var checkcode = function checkcode(code) {
	        //是否为空  
	        if (!code || !iscodeNo(code) || !checkProvince(code) || !checkBirthday(code) || !checkParity(code)) {
	            return false;
	        }
	        return true;
	    };

	    //检查号码是否符合规范，包括长度，类型  
	    var iscodeNo = function iscodeNo(code) {
	        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	        if (reg.test(code) === false) {
	            return false;
	        }
	        return true;
	    };

	    //取身份证前两位,校验省份  
	    var checkProvince = function checkProvince(code) {
	        var province = code.substr(0, 2);
	        if (vcity[province] == undefined) {
	            return false;
	        }
	        return true;
	    };

	    //检查生日是否正确  
	    var checkBirthday = function checkBirthday(code) {
	        var len = code.length;
	        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
	        if (len == '15') {
	            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
	            var arr_data = code.match(re_fifteen);
	            var year = arr_data[2];
	            var month = arr_data[3];
	            var day = arr_data[4];
	            var birthday = new Date('19' + year + '/' + month + '/' + day);
	            return verifyBirthday('19' + year, month, day, birthday);
	        }
	        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
	        if (len == '18') {
	            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	            var arr_data = code.match(re_eighteen);
	            var year = arr_data[2];
	            var month = arr_data[3];
	            var day = arr_data[4];
	            var birthday = new Date(year + '/' + month + '/' + day);
	            return verifyBirthday(year, month, day, birthday);
	        }
	        return false;
	    };

	    //校验日期  
	    var verifyBirthday = function verifyBirthday(year, month, day, birthday) {
	        var now = new Date();
	        var now_year = now.getFullYear();
	        //年月日是否合理  
	        if (birthday.getFullYear() == year && birthday.getMonth() + 1 == month && birthday.getDate() == day) {
	            //判断年份的范围（3岁到100岁之间)  
	            var time = now_year - year;
	            if (time >= 3 && time <= 100) {
	                return true;
	            }
	            return false;
	        }
	        return false;
	    };

	    //校验位的检测  
	    var checkParity = function checkParity(code) {
	        //15位转18位  
	        code = changeFivteenToEighteen(code);
	        var len = code.length;
	        if (len == '18') {
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var codeTemp = 0,
	                i,
	                valnum;
	            for (i = 0; i < 17; i++) {
	                codeTemp += code.substr(i, 1) * arrInt[i];
	            }
	            valnum = arrCh[codeTemp % 11];
	            if (valnum == code.substr(17, 1)) {
	                return true;
	            }
	            return false;
	        }
	        return false;
	    };

	    //15位转18位身份证号  
	    var changeFivteenToEighteen = function changeFivteenToEighteen(code) {
	        if (code.length == '15') {
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var codeTemp = 0,
	                i;
	            code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6);
	            for (i = 0; i < 17; i++) {
	                codeTemp += code.substr(i, 1) * arrInt[i];
	            }
	            code += arrCh[codeTemp % 11];
	            return code;
	        }
	        return code;
	    };

	    return checkcode(code);
	};

	module.exports = IDVerify;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";

	/* 
	    倒计时
	    run({$el, done}) // 开始倒数
	    cancel() // 取消还原
	*/

	var countDown = function () {
	    var timer = null;
	    var originValue = null; // 初始值
	    var el = null;

	    return {
	        run: function run(_ref) {
	            var $el = _ref.$el,
	                done = _ref.done;

	            el = $el;
	            originValue = el.text();
	            timer = setInterval(function () {
	                var value = +el.text();
	                if (value > 1) {
	                    value -= 1;
	                    el.text(value);
	                } else {
	                    if (typeof done == "function") {
	                        done();
	                    }
	                    countDown.cancel();
	                }
	            }, 1000);
	        },
	        cancel: function cancel() {
	            clearInterval(timer);
	            el.text(originValue);
	            timer = null;
	        }
	    };
	}();

	module.exports = countDown;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./userAuth.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./userAuth.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "#auth-verify {\r\n    width: 450px;\r\n    background: white;\r\n    border: 1px solid #ededed;\r\n    box-shadow: 8px 7px 13px rgba(201, 201, 201, 0.19);\r\n    border-radius: 4px;\r\n    margin: auto;\r\n    position: absolute;\r\n    -webkit-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n#auth-overlay {\r\n    background: white;\r\n    background: rgba(255, 255, 255, 0.21);\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    display: none;\r\n}\r\n\r\n#auth-verify {\r\n    animation-name: myZoomIn;\r\n    animation-duration: 0.3s;\r\n}\r\n\r\n.shake {\r\n    animation-name: myShake;\r\n    animation-duration: 0.6s;\r\n}\r\n\r\n@keyframes myZoomIn {\r\n    from {\r\n        transform: scale3d(.1, .1, .1);\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        transform: scale3d(1, 1, 1);\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n@keyframes myShake {\r\n    from, to {\r\n        transform: translate3d(0, 0, 0);\r\n    }\r\n    10%, 30%, 50%, 70%, 90% {\r\n        transform: translate3d(-10px, 0, 0);\r\n    }\r\n    20%, 40%, 60%, 80% {\r\n        transform: translate3d(10px, 0, 0);\r\n    }\r\n}\r\n\r\n#auth-verify .title {\r\n    padding: 10px;\r\n    border-bottom: 1px solid #f5f5f5;\r\n    position: relative;\r\n    font-size: 15px;\r\n    text-indent: 10px;\r\n    font-weight: bold;\r\n    margin-bottom:10px;\r\n}\r\n\r\n#auth-verify .close:hover {\r\n    color: red;\r\n}\r\n\r\n#auth-verify .auth-frame {\r\n    padding: 20px 20px 30px 20px;\r\n}\r\n\r\n#auth-verify .form-text {\r\n    font-size: 13px;\r\n    display: inline-block;\r\n    width: 60px;\r\n    text-align: right;\r\n    margin-right: 10px;\r\n}\r\n\r\n#auth-verify .close {\r\n    position: absolute;\r\n    right: 10px;\r\n    cursor: pointer;\r\n    font-size: 15px;\r\n}\r\n\r\n#auth-verify .auth-frame.card .line {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n#auth-verify .auth-frame {\r\n    position: relative;\r\n    display: none;\r\n}\r\n\r\n#auth-verify .auth-frame.card input {\r\n    height: 35px;\r\n    line-height: 35px;\r\n    text-indent: 10px;\r\n    width: 285px;\r\n    display: inline-block;\r\n    border-radius: 3px;\r\n    background: #f7f7f7;\r\n}\r\n\r\n#auth-verify .auth-frame.card .submitBar {\r\n    position: relative;\r\n    text-align: center;\r\n    margin-top: 40px;\r\n}\r\n\r\n#auth-verify .auth-frame.card .auth-error {\r\n    color: red;\r\n    position: absolute;\r\n    bottom: 52px;\r\n    text-align: center;\r\n    width: 100%;\r\n    font-size: 13px;\r\n    font-weight: bold;\r\n}\r\n\r\n#auth-verify .auth-frame.card .submit {\r\n    background: #c40f0f;\r\n    width: 320px;\r\n    margin: auto;\r\n    padding: 10px;\r\n    border-radius: 4px;\r\n    font-size: 15px;\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n\r\n#auth-verify .auth-frame.card .form-item.done {\r\n    display: none;\r\n    text-align: center;\r\n}\r\n\r\n#auth-verify .form-item.done .icon-done-big {\r\n    background-image: url(/public/sprite/src/done-big.png);\r\n    background-position: 0px 0px;\r\n    width: 84px;\r\n    height: 84px;\r\n    margin: auto;\r\n}\r\n\r\n#auth-verify .form-item.done .to-btn {\r\n    background: #4a4a4a;\r\n    width: 250px;\r\n    padding: 5px;\r\n    border-radius: 3px;\r\n    color: white;\r\n    margin: 15px auto;\r\n}\r\n\r\n#auth-verify .form-item.done p {\r\n    font-size: 15px;\r\n    color: #16d528;\r\n    margin: 10px auto;\r\n}\r\n\r\n#auth-verify .auth-frame.appraisal {\r\n    text-align: center;\r\n}\r\n\r\n#auth-verify .appraisal-btn {\r\n    background: #d31010;\r\n    width: 300px;\r\n    margin: auto;\r\n    padding: 5px;\r\n    border-radius: 3px;\r\n    margin-top: 15px;\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n#auth-verify .auth-remind{\r\n    font-size: 12px;\r\n    color: #8B8B8B;\r\n    text-align: center;\r\n    margin-top: 2px;\r\n}", ""]);

	// exports


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*///////////////////////////////////////////////////////////////////*/

	var Path = __webpack_require__(12);
	__webpack_require__(57);
	var local = __webpack_require__(59);
	var error = __webpack_require__(20);
	/*///////////////////////////////////////////////////////////////////*/

	module.exports = function () {

	    var query = {
	        pageSize: 5,
	        currentPage: 1
	    };

	    var handleData = function handleData(arr) {
	        return _.map(arr, function (item) {
	            item._link = Path.live.refer(item.teacherid);
	            return item;
	        });
	    };

	    var create = function create(data) {
	        return '<div class="refer-best-teacher"><a class="block" href="' + live_path + 'refer/' + data.teacherid + '/" target=\'_blank\'><div class="avatar fl"><img src="' + data.photo + '" /></div><div class="info fl"><div class="name">' + data.title + '</div></div><div class="info fr"><div class="rcount">' + data.rcount + '</div><div class="subject">\u53D1\u5E03\u5185\u53C2</div></div></a></div>';
	    };

	    var getData = function getData(callback) {
	        var key = 'refer-best-teacher' + local.joinKey(query);
	        var cache = local.get(key, { timeout: 3600 });
	        if (cache && cache.valid) {
	            return callback(cache.data);
	        }
	        $.getJSON('/center/reference/teacher.htm', {
	            user_id: ynUserId,
	            pageSize: query.pageSize,
	            currentPage: query.currentPage
	        }, function (data) {
	            callback(data);
	            local.set(key, data);
	        });
	    };

	    return {
	        render: function render(ops) {
	            _.extend(query, ops);
	            getData(function (data) {
	                if (data.status == 1) {
	                    var html = _.map(handleData(data.data), function (item) {
	                        return create(item);
	                    }).join("");
	                    ops.container.html(html);
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    };
	}();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-best-teacher.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-best-teacher.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "/*内参牛人*/\r\n.refer-best-teacher {\r\n    overflow: hidden;\r\n    border-top: 1px solid rgb(245, 245, 245);\r\n    padding: 15px;\r\n    background: white;\r\n}\r\n\r\n.refer-best-teacher .avatar {\r\n    width: 40px;\r\n    height: 40px;\r\n    overflow: hidden;\r\n    border-radius: 3px;\r\n}\r\n\r\n.refer-best-teacher .avatar img {\r\n    height: 100%;\r\n}\r\n\r\n.refer-best-teacher .info {\r\n    margin-left: 20px;\r\n    height:40px;\r\n}\r\n\r\n.refer-best-teacher .info .name {\r\n    font-size: 16px;\r\n    line-height: 40px;\r\n}\r\n\r\n.refer-best-teacher .info .rcount{\r\n    text-align: center;\r\n    color: #D11313;\r\n}\r\n\r\n.refer-best-teacher .info .subject {\r\n    margin-top: 5px;\r\n    color: gray;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(61);
	var Path = __webpack_require__(12);

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = function () {

	    var create = function create(item) {
	        return '<div class="refer-hot-item"><div class="refer-hot-title"><span class="refer-item-icon"></span><a class="value" href="' + item._link + '" target=\'_blank\'>' + item._title + '</a></div><div class="refer-hot-info"><span class="name fl">' + item.puiblisher + '</span><span class="time fr">' + item._time + '</span><div style="clear:both"></div></div></div>';
	    };

	    var url = {
	        new: '/center/reference/newList.htm', //最新内参
	        hot: '/center/reference/hotList.htm', //热门内参
	        hd: '/center/reference/hdList.htm' //互动最多
	    };
	    var handleData = function handleData(arr) {
	        return _.map(arr, function (item) {
	            var charactors = item.productInfo.match(/[\u4e00-\u9fa5\w]/g);
	            item._title = charactors.join("");
	            item._time = yn.timeFormat(item.pubtime);
	            item._link = '/reference/' + item.id + '.htm';
	            return item;
	        });
	    };

	    return {
	        pageSize: 5,
	        currentPage: 1,
	        render: function render(ops) {
	            _.extend(this, ops);
	            $.getJSON(url[ops.type], {
	                user_id: ynUserId,
	                pageSize: this.pageSize,
	                currentPage: this.currentPage
	            }, function (data) {
	                var rows = handleData(data.rows);
	                var html = _.map(rows, function (item) {
	                    return create(item);
	                }).join("");
	                ops.container.html(html);
	                var a = $('.refer-hot .refer-hot-item');
	            });
	        }
	    };
	}();

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(62);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-hot.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-hot.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".refer-hot-item {\r\n    overflow: hidden;\r\n    border-top: 1px solid rgb(245, 245, 245);\r\n    padding: 15px 20px;\r\n    padding-left: 35px;\r\n    position: relative;\r\n}\r\n\r\n.refer-hot-item:first-child {\r\n    border-top: none;\r\n}\r\n\r\n.refer-hot-item a:hover {\r\n    color: #d72621;\r\n}\r\n\r\n.refer-hot-title {\r\n    font-size: 15px;\r\n    height: 21px;\r\n    overflow: hidden;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.refer-item-icon {\r\n    width: 6px;\r\n    height: 6px;\r\n    background: #d72621;\r\n    display: inline-block;\r\n    position: absolute;\r\n    top: 23px;\r\n    left: 15px;\r\n    margin-right: 5px;\r\n    border-radius: 0;\r\n}\r\n\r\n.refer-hot-info {\r\n    font-size: 12px;\r\n    color: gray;\r\n}\r\n\r\n.refer-hot-info .time {\r\n    margin-left: 5px;\r\n}\r\n\r\n.value{\r\n    font-size:16px;\r\n}\r\n\r\n/*.refer-hot .refer-item-icon{\r\n    width:16px;\r\n    height:16px;\r\n    position: absolute;\r\n    top: 18px;\r\n    left: 15px;\r\n    text-align: center;\r\n    line-height: 16px;\r\n    color:#fff;\r\n    font-size:13px;\r\n}\r\n.refer-talkest .refer-item-icon{\r\n    background: #C9C1C1;\r\n}*/", ""]);

	// exports


/***/ })
/******/ ]);