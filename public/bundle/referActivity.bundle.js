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

	var Confirm = __webpack_require__(83);

	var dragVerify = __webpack_require__(90);
	var error = __webpack_require__(15);

	var buy = function () {
	    var referData = '';
	    var pop = $('#pay-employeecode');
	    var employeecode = '';

	    var reset = function reset() {
	        pop.find('input').val('');
	    };

	    return {
	        init: function init() {
	            pop.on('click', '.pay-sure', function () {

	                employeecode = pop.find('input').val();

	                if (!employeecode) {
	                    return layer.msg('请输入邀请码');
	                }

	                $.getJSON('/reference/activityRefer.htm', function (back) {
	                    if (back.status == '1') {
	                        referData = back.data;
	                        $.post("/app/buyGoodsPayOrder.htm", {
	                            goodsId: referData.id, //商品id
	                            goodsType: 3,
	                            buy_number: 1,
	                            pay_source: 0,
	                            employeecode: employeecode
	                        }, function (back) {
	                            if (back.status == 60011) {
	                                return layer.msg("用户没有开通账户!请联系客服!");
	                            }
	                            if (back.status == 60023) {
	                                return layer.msg("商品购买时间已过");
	                            }
	                            if (back.status == 60020) {
	                                layer.msg('商品已购买');
	                                setTimeout(function () {
	                                    window.location.href = __path + '/backstage/myRefer.htm';
	                                }, 1000);
	                                return;
	                            }
	                            if (back.status == 60023) {
	                                layer.msg('商品购买时间已过');
	                                return;
	                            }

	                            Confirm.payconfirm({
	                                name: "内参订阅",
	                                price: referData.price,
	                                orderid: back.data.orderid,
	                                orderNum: back.data.orderNum,
	                                finish: true,
	                                read: true,
	                                success: function success() {
	                                    return window.location.href = __path + '/backstage/myRefer.htm';
	                                }
	                            });
	                        }, 'json');
	                    }
	                });
	                pop.hide();
	            });

	            pop.on('click', '.pay-cancel', function () {
	                employeecode = pop.find('input').val();
	                pop.hide();
	                $.getJSON('/reference/activityRefer.htm', function (back) {
	                    if (back.status == '1') {
	                        referData = back.data;
	                        $.post("/app/buyGoodsPayOrder.htm", {
	                            goodsId: referData.id, //商品id
	                            goodsType: 3,
	                            buy_number: 1,
	                            pay_source: 0,
	                            employeecode: employeecode
	                        }, function (back) {
	                            if (back.status == 60011) {
	                                layer.msg("用户没有开通账户!请联系客服!");
	                            }
	                            if (back.status == 60020) {
	                                layer.msg('商品已购买');
	                                setTimeout(function () {
	                                    window.location.href = __path + '/backstage/myRefer.htm';
	                                }, 1000);
	                                return;
	                            }
	                            if (back.status == 60023) {
	                                layer.msg('商品购买时间已过');
	                                return;
	                            }

	                            Confirm.payconfirm({
	                                name: "内参订阅",
	                                price: referData.price,
	                                orderid: back.data.orderid,
	                                orderNum: back.data.orderNum,
	                                finish: true,
	                                read: true,
	                                success: function success() {
	                                    return window.location.href = __path + '/backstage/myRefer.htm';
	                                }
	                            });
	                        }, 'json');
	                    }
	                });
	            });
	        },
	        render: function render() {
	            reset();
	            pop.show();
	        }
	    };
	}();

	$(function () {
	    buy.init();
	});

	var register = function () {
	    var content = $('#login_register'),
	        container = content.find('.register'),
	        phone = container.find('.r-phone'),
	        pass = container.find('.r-pass'),
	        message = container.find('.r-message'),
	        imgcodeVal = container.find('.r-imgcode'),
	        invite = container.find('.r-invite'),
	        val_invite = null,
	        imgCode = container.find('.image-code'),
	        goBuy = $('.go-buy');

	    var reset = function reset() {
	        return container.find('input').val("");
	    };

	    goBuy.on('click', function () {
	        if (!ynIsLogin) {
	            register.show();
	            return;
	        }
	        buy.render();
	    });

	    container.on('click', '.l-r-submit', _.debounce(function () {
	        register.submit();
	    }, 1000, { leading: true, trailing: false }));

	    // 密码可见
	    container.on('click', '.r-see', function () {
	        var isSee = $(this).next().prop('type') == 'password';
	        if (isSee) {
	            pass.prop({ 'type': 'text' });
	            $(this).removeClass('r-see').addClass('r-see1');
	        }
	    });

	    container.on('click', '.r-see1', function () {
	        var isSee = $(this).next().prop('type') == 'text';
	        if (isSee) {
	            pass.prop({ 'type': 'password' });
	            $(this).removeClass('r-see1').addClass('r-see');
	        }
	    });

	    // 短信验证
	    container.on('click', '.r-code', function () {
	        var val = _.trim(phone.val());
	        if (!/^0?1[34578][0-9]{9}$/.test(val)) {
	            layer.msg("请输入有效手机号");
	            return;
	        }

	        var el = $(this);

	        // var imgCode = _.trim(imgcodeVal.val())
	        // if(!imgCode){
	        //     return layer.msg('请输入图形验证码')
	        // }


	        //显示拖动验证窗口
	        $('#popup-captcha').show();

	        dragVerify(val, function (info) {
	            var send = _.extend({ phone: val, source: 2 }, info);
	            getPhoneCode(el, send);
	        });
	    });

	    // 获取图片验证码
	    imgCode.click(function () {
	        $(this).attr('src', '/validCode.htm?' + _.now());
	    });

	    //关闭
	    content.on('click', '.register-top-close', function () {
	        content.hide();
	        reset();
	    });

	    //去登录
	    container.on('click', '.go-login', function () {
	        reset();
	        content.hide();
	        yn.login.render();
	    });
	    return {
	        show: function show() {
	            reset();
	            content.show();
	            // enterTarget = this
	        },
	        hidden: function hidden() {
	            reset();
	            content.hide();
	        },
	        submit: function submit() {
	            var val_phone = _.trim(phone.val());
	            var val_pass = _.trim(pass.val());
	            var val_message = _.trim(message.val());
	            var val_imgCode = _.trim(imgcodeVal.val());
	            val_invite = _.trim(invite.val());

	            // validate

	            if (!/^1[34578][0-9]{9}$/.test(val_phone)) {
	                layer.msg("请输入有效手机号");
	                return;
	            }
	            // if (!val_imgCode) {
	            //     return layer.msg('请输入图形验证码')
	            // }
	            if (!/[0-9a-zA-Z_]{6,}$/.test(val_pass)) {
	                layer.msg("请输入有效密码(字母数字下划线且至少6位)");
	                return;
	            }

	            if (!val_message) {
	                layer.msg("请输入短信验证码");
	                return;
	            }

	            if (!container.find('.r-check').get(0).checked) {
	                layer.msg("请先阅读遵守协议");
	                return false;
	            }

	            var param = {
	                phone: val_phone,
	                pwd: val_pass,
	                phoneCode: val_message,
	                employeecode: val_invite
	            };

	            $.post("/user/webRegister.htm", param, function (data) {
	                data = JSON.parse(data);
	                if (data.status == '1') {
	                    layer.msg('注册成功');
	                    $.post('/public/login.htm', { "userName": param.phone, "password": param.pwd }, function (data) {
	                        data = JSON.parse(data);
	                        if (data.status == "1") {
	                            window.location.reload();
	                        }
	                    });
	                }
	            });
	        }
	    };
	}();

	var getPhoneCode = function getPhoneCode(btn, send) {
	    btn.html("<span id='sendCount'>60</span>秒后再次获取!");
	    btn.get(0).disabled = true;
	    var timer = setInterval(function () {
	        var count = $("#sendCount");
	        var value = Number(count.text());
	        if (value > 1) {
	            value--;
	            count.text(value);
	        } else {
	            btn.get(0).disabled = false;
	            btn.html("获取手机验证码");
	            clearInterval(timer);
	        }
	    }, 1000);

	    $.post("/sendPhoneCode.htm", send, function (data) {
	        data = JSON.parse(data);
	        if (data.status == 20012) return layer.msg("短信发送失败，请重试!");
	        if (data.status == 30002) return layer.msg("图片验证码错误");
	    });
	};

	$('.referAct-zhanji').unslider();

	var teacherVideo = function () {
	    var container = $('.video-pop');
	    container.on('click', function () {
	        var vid = $(this).data('vid');
	        teacherVideo.show(vid);
	    });

	    var createVideo = function createVideo(vid) {
	        var player = new YKU.Player('video-container', {
	            styleid: '0',
	            client_id: '70bee75ccf5b9678',
	            vid: vid,
	            autoplay: true,
	            newPlayer: true,
	            show_related: false //是否显示相关推荐
	        });
	    };
	    return {
	        show: function show(vid) {
	            createVideo(vid);
	        }
	    };
	}();

	/*
	剩余名额
	 */
	var simulate = {
	    0: { first: 0, second: 0, third: 8 },
	    1: { first: 0, second: 0, third: 8 },
	    2: { first: 0, second: 0, third: 8 },
	    3: { first: 0, second: 0, third: 8 },
	    4: { first: 0, second: 0, third: 8 },
	    5: { first: 0, second: 0, third: 8 },
	    6: { first: 1, second: 0, third: 0 },
	    7: { first: 0, second: 9, third: 2 },
	    8: { first: 0, second: 8, third: 3 },
	    9: { first: 0, second: 7, third: 4 },
	    10: { first: 0, second: 6, third: 6 },
	    11: { first: 0, second: 6, third: 0 },
	    12: { first: 0, second: 5, third: 3 },
	    13: { first: 0, second: 4, third: 2 },
	    14: { first: 0, second: 3, third: 5 },
	    15: { first: 0, second: 2, third: 9 },
	    16: { first: 0, second: 2, third: 2 },
	    17: { first: 0, second: 1, third: 9 },
	    18: { first: 0, second: 1, third: 5 },
	    19: { first: 0, second: 1, third: 0 },
	    20: { first: 0, second: 0, third: 8 },
	    21: { first: 0, second: 0, third: 8 },
	    22: { first: 0, second: 0, third: 8 },
	    23: { first: 0, second: 0, third: 8 }
	};
	var places1 = $('.referAct-places1');
	var places2 = $('.referAct-places2');
	var places3 = $('.referAct-places3');
	var time = 1000 * 3600 * 60;

	setInterval(function () {}, time);
	var places = function () {
	    var h = new Date().getHours();
	    places1.html(simulate[h].first);
	    places2.html(simulate[h].second);
	    places3.html(simulate[h].third);
	}();

/***/ }),

/***/ 7:
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

/***/ 8:
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

/***/ 15:
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
	    "100003": "活动已过期",
	    "100005": "用户不符合活动条件"
	};

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var payAny = __webpack_require__(84);
	var payConfirm = __webpack_require__(86);
	var error = __webpack_require__(89);

	/*
	约投顾支付模块
	var Confirm = require(../pay-any-package.js)

	1.随意赏 + 支付确认
	Confirm.render({
	    teacherId: Number,   老师ID
	    name: '直播送礼...',
	    finish: true/false,  是否显示支付完成/支付遇到问题步骤
	    callback: function(){}
	})

	2.only支付确认窗口
	Confirm.payconfirm({
	    name: '观点打赏...',
	    price: number,
	    orderNum: number,   订单号必传
	    finish: true/false,
	    success: function(){}   支付成功回调
	})
	 */
	var params = {};
	module.exports = {
	    render: function render(ops) {
	        var self = this;
	        params = _.extend({
	            type: 'opinion',
	            id: null,
	            name: '',
	            callback: null
	        }, ops);
	        if (!params.teacherId) {
	            layer.msg("pay : teacherId不能为空");
	            return;
	        }

	        // 显示随意赏窗口
	        payAny.getInstance().render({
	            onSubmit: function onSubmit(number) {

	                // 获取订单号 
	                var isOpinion = params.type == "opinion";
	                var getData = isOpinion ? getOpinionOrder : getGiftOrder;
	                getData({ teacherId: params.teacherId, number: number, id: params.id }, function (back) {
	                    if (back.status == "1") {
	                        params.url = "/html/returnshortcutpayJsp.htm?orderNum=" + back.data.orderNum;
	                        params.orderNum = back.data.orderNum;
	                        params.price = number;
	                        self.payconfirm(params);
	                    }
	                });
	            }

	        });
	    },
	    payconfirm: function payconfirm(ops) {
	        // 显示支付确认
	        payConfirm.getInstance().render({
	            name: ops.name,
	            price: ops.price,
	            link: ops.url,
	            referenceid: ops.referenceid,
	            userid: ops.userid,
	            orderNum: ops.orderNum,
	            finish: ops.finish,
	            read: ops.read,
	            orderid: ops.orderid,
	            success: ops.success
	        });
	    }
	};

	/**
	 * 获取礼物打赏订单
	 * {teacherId, number}
	 */
	var getGiftOrder = function getGiftOrder(ops, callback) {

	    // 随意赏=获取红包ID
	    $.getJSON("/gift/giftList.htm", function (back) {
	        var data = _.filter(back, function (item) {
	            return item.gift_name == "红包";
	        })[0];
	        var giftId = data.gift_id;

	        // 获取订单号
	        $.post("/app/appGiftPayOrder.htm", {
	            pay_source: "0", //web端
	            goodsType: "5", //直播
	            teacherId: ops.teacherId,
	            buy_number: ops.number, //支付总价
	            giftId: giftId, //随意赏=送红包
	            sum: ops.number
	        }, function (back) {
	            if (+back.status == 1) {
	                typeof callback == 'function' && callback(back);
	                return;
	            }
	            layer.msg(error[back.status]);
	        }, 'json');
	    });
	};

	/**
	 * 获取观点打赏订单
	 * {teacherId, number, id}
	 */
	var getOpinionOrder = function getOpinionOrder(ops, callback) {
	    $.post("/app/appRewardPayOrder.htm", {
	        goodsId: ops.id, // 观点ID
	        goodsType: 0, //商品类型(0观点，1组合，2课程，3礼物，4内参 5:问股 6 直播)
	        totalPrice: ops.number, //支付总价
	        pay_source: 0, //来源 0web 1ios 2android
	        teacherId: ops.teacherId //老师ID
	    }, function (back) {
	        if (+back.status == 1) {
	            typeof callback == 'function' && callback(back);
	            return;
	        }
	        layer.msg(error[back.status]);
	    }, 'json');
	};

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 *  随意赏弹窗
	 *  var pay = require('m/lib/pay-any.js')	// 导入模块
	 *  var instance = pay.getInstance()		// 创建/获取实例
	 *  instance.render({
	 *  	onSubmit : price => {
	 *  		//点击立即打赏时的回调函数
	 *  	}
	 *  })
	 */

	var fn = __webpack_require__(85);

	module.exports = function () {

	    var instance = null;

	    /* create instance */
	    var createInstance = function createInstance() {

	        $('body').append(createElement());

	        var container = $('#playtour');
	        var input = container.find('input');
	        var balance = 0; //账户余额
	        var $balance = container.find('.balance-value');

	        yn.centerBox(container);

	        /* event */

	        // 关闭
	        container.find('.close').click(function (e) {
	            return container.hide();
	        });

	        // 快捷输入
	        container.find('.support-short-item').click(function () {
	            $(this).addClass('thistype').siblings('.thistype').removeClass('thistype');
	            input.val($(this).data('type'));
	        });

	        // 立即打赏
	        container.find('.submit').click(function (e) {

	            //验证价格
	            var val = _.trim(input.val());
	            if (!/^[1-9][0-9]*$/.test(val)) {
	                return layer.msg("客官，真的不能再少了!");
	            }

	            // 验证余额
	            // if (balance < 1) {
	            //     return layer.msg("可用余额不足,请充值")
	            // }

	            container.hide();
	            instance.onSubmit && instance.onSubmit(+val);
	        });

	        return {
	            render: function render(ops) {

	                _.extend(this, ops);

	                // 查询余额
	                getBalance().done(function (data) {
	                    $balance.text(data.balance);
	                    balance = +data.balance;
	                    // console.log($balance,data.balance,balance)
	                });

	                // 重置
	                input.val("");
	                $('.support-short-item.thistype').removeClass('thistype');

	                container.velocity('transition.expandIn', { duration: 300 });
	            }
	        };
	    };

	    /* single */
	    return {
	        getInstance: function getInstance() {
	            if (!instance) instance = createInstance();
	            return instance;
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	// 查询账户余额
	var getBalance = function getBalance() {
	    var defer = $.Deferred();
	    $.getJSON('/useraccount/pay_useraccountDetail.htm', {
	        user_id: ynUserId
	    }, function (data) {
	        return defer.resolve(data);
	    });
	    return defer.promise();
	};

	// 创建标签
	var createElement = function createElement() {
	    return '<div id="playtour" class="hide"><p class="title-1">\u6253\u8D4F<span>\uFF08\u672C\u6B21\u4EA4\u6613\u514D\u5BC6\u7801\uFF09</span></p><i class="close fa fa-times-circle fa-2x"></i><div class="wrap"><div class="getPrice"><div class="group"><span class="support-short-item" data-type="2">2\u725B\u5E01</br><font>\uFF08\u7B49\u4EF72\u5143\uFF09</font></span><span class="support-short-item" data-type="16">16\u725B\u5E01</br><font>\uFF08\u7B49\u4EF716\u5143\uFF09</font></span><span class="support-short-item" data-type="58">58\u725B\u5E01</br><font>\uFF08\u7B49\u4EF758\u5143\uFF09</font></span></div><div class="pleases"><span>\u968F\u610F\u8D4F:</span><input type="text" placeholder="\u8BF7\u8F93\u5165\u6574\u6570(\u5355\u4F4D:\u5143)"/><span>\u725B\u5E01</span></div><p class="balance clear"><span class="fl" id="support-surplus">\u53EF\u7528\u4F59\u989D<strong style=\'margin:0 5px; color:red;\' class="balance-value">0</strong>\u725B\u5E01</span><a href="/html/recharge.htm" class="gopay fr" target="_blank">\u4F59\u989D\u4E0D\u8DB3\uFF1F\u53BB\u5145\u503C</a></p><div class="info"><span>\u8D60\u9001\u65E0\u6094\uFF0C\u6982\u4E0D\u9000\u6B3E</span><span class="submit fr">\u7ACB\u5373\u6253\u8D4F</span></div></div></div></div>';
	};

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

	'use strict';

	/*  覆盖对象  */

	var override = function override(source, target) {
	    if (!target) return source;
	    for (var key in source) {
	        if (target[key]) {
	            source[key] = target[key];
	        }
	    }
	    return source;
	};

	var extend = override;

	/* 检测手机号 */

	var isMobile = function isMobile(number) {
	    number = number.toString();
	    return (/^1[34578][0-9]{9}$/.test(number)
	    );
	};

	// 清除无效字符
	var clear = function clear(str) {
	    if (typeof str != 'string') return str;
	    var match = str.match(/[\u4e00-\u9fa50-9a-zA-Z，。？：:（）]+/g);
	    if (!match) return str;
	    return match.join("");
	};

	// 限制个数
	var limit = function limit(str, len) {
	    if (typeof str != 'string') return str;
	    return str.length < len ? str : str.substr(0, len) + "..";
	};

	// 清除格式
	var filterHTML = function filterHTML(str) {
	    if (typeof str != 'string') return str;
	    return str.replace(/<.+?>|&nbsp;/g, "");
	};

	/* 
	    清除格式
	    str : 内容
	    len : 限制长度

	 */

	var clean = function clean(str, len) {
	    return limit(clear(filterHTML(str)), len);
	};

	var stockPrefix = function stockPrefix(code) {
	    code = String(code);
	    var prefix = { "0": "sz", "3": "sz", "6": "sh" };
	    return prefix[code.substr(0, 1)] + code;
	};

	/* export */

	module.exports = {
	    override: override,
	    isMobile: isMobile,
	    filterHTML: filterHTML,
	    limit: limit,
	    clean: clean,
	    extend: extend,
	    clear: clear,
	    stockPrefix: stockPrefix
	};

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 支付确认窗口
	    confirm.render({
	        name: String, 支付项目名称
	        price: String, 价格
	        link: String, 立即支付链接
	        success: Function, 支付成功回调
	        fail:Function 支付失败回调,
	        read: Boolean, 是否默认勾选风险揭示书
	        finish: Boolean 是否显示支付完成确认窗口
	    })
	 */

	__webpack_require__(87);

	var ErrorCode = __webpack_require__(89);

	module.exports = function () {

	    var instance = null;

	    var createInstance = function createInstance() {
	        var container,
	            box,
	            confirm,
	            tip,
	            name,
	            price,
	            link,
	            orderNum,
	            agreeTip,
	            items,
	            orderValue,
	            finish,
	            typeBalance,
	            ops = {
	            name: "支付名称",
	            price: 0,
	            link: "#",
	            finish: true,
	            success: function success() {
	                layer.msg("支付成功");
	            },
	            fail: function fail() {
	                layer.msg("支付尚未完成");
	            }
	        };

	        var payStatus = null; //支付状态
	        var accountRemain = 0; //账户余额
	        var payType = 'balance'; // 默认支付类型
	        var goodsType = ""; // 订单类型

	        $("body").append(createElement());

	        container = $('.pay-confirm-overlay');
	        box = container.find('.pay-confirm-box');
	        confirm = $('.pay-item-confirm');
	        tip = container.find('.pay-item-tip');
	        name = container.find('.name .value');
	        price = container.find('.price .value');
	        link = $('#pay-confirm-link');
	        orderNum = container.find('.orderNum-value');
	        agreeTip = container.find('.agree-tip');
	        items = container.find('.defray-item');
	        typeBalance = container.find('.type-nb');

	        //关闭
	        container.on('click', '.close', function () {
	            $.post("/web/getPayStatus.htm", function (data) {
	                if (data == "1" || data == "6") {
	                    ops.success();
	                }
	            });
	            container.hide();
	            reset();
	        });

	        // //立即支付
	        // container.on('click', '.jump', function() {
	        //     if (ops.finish) {
	        //         confirm.hide();
	        //         tip.show();
	        //     } else {
	        //         container.hide()
	        //     }
	        // })

	        //支付完成
	        tip.on('click', '.finish', function () {
	            $.post("/web/getPayStatus.htm", function (data) {
	                if (data == "1" || data == "6") {
	                    container.hide().velocity("transition.bounceDownOut", { duration: 300 });
	                    reset();
	                    ops.success();
	                } else {
	                    container.velocity("callout.shake", { duration: 300 });
	                    ops.fail(data);
	                }
	            });
	        });
	        var reset = function reset() {
	            confirm.show();
	            tip.hide();
	            items.eq(0).find('#roundedOne').click();
	            items.eq(0).find('label').removeClass('disable');
	            // agreeTip.find('input').attr('checked',false)
	            payType = 'balance';
	        };
	        reset();

	        //支付类型
	        var strategy = {
	            balance: function balance() {
	                // console.log('accountRemain',accountRemain)
	                // return
	                if (+accountRemain < 1) {
	                    layer.msg("余额不足,系统将自动跳转充值页面");
	                    setTimeout(function () {
	                        window.location.href = '/html/recharge.htm';
	                    }, 2000);
	                    return;
	                }

	                $.post('/reward/rewardTheacher.htm', { orderNum: orderValue }, function (data) {
	                    if (data == "success") {

	                        // 如果是购买VIP直播室
	                        if (+goodsType == 6) {
	                            layer.alert("商品已付款, 请等待客服人员与您联系", function () {
	                                window.location.href = '/html/liveVipAct.htm';
	                            });
	                            return;
	                        }

	                        layer.msg('支付成功!');
	                        // if (+goodsType == 5) {
	                        //     setTimeout(function() {
	                        //         window.location.reload()
	                        //     }, 1500)
	                        // }
	                        return;
	                    }
	                    // layer.msg(`余额不足, 页面即将跳转到充值页面`);
	                    // setTimeout(function() {
	                    //     window.location.href = "/html/recharge.htm"
	                    // }, 1000)
	                });
	            },

	            wechat: function wechat() {
	                window.open('/html/recharge.htm?pay_type=0&orderNum=' + orderValue);
	                // window.location.href = '/html/recharge.htm?pay_type=0&orderNum=' + orderValue;
	            },
	            alipay: function alipay() {
	                window.open('/html/recharge.htm?pay_type=1&orderNum=' + orderValue);
	            }

	            //切换支付类型
	        };items.on('click', 'label', function () {
	            if ($(this).hasClass('disable')) return;
	            $('.defray-item.thisclass').removeClass('thisclass');
	            var parent = $(this).parents('.defray-item').addClass('thisclass');
	            payType = parent.data("source");
	        });

	        //确认支付
	        container.on('click', '.jump', function () {
	            console.log('payType', payType);
	            if (ynIsTeacher) {
	                return layer.msg('老师不能购买~');
	            }
	            link.off('click');
	            if (agreeTip.is(":visible")) {
	                var flag = agreeTip.find('input').is(':checked');
	                if (!flag) {
	                    layer.msg('请先阅读并同意《风险揭示书》《服务使用协议》');
	                    return false;
	                }
	            }
	            strategy[payType]();
	            if (finish) {
	                confirm.hide();
	                tip.show();
	            } else {
	                container.hide();
	                reset();
	            }
	        });

	        return {
	            render: function render(options) {
	                // console.log('options',options)
	                _.extend(ops, options);
	                orderValue = ops.orderNum;
	                finish = ops.finish;
	                if (ops.name == '内参订阅') {
	                    console.log('ops', ops);
	                    agreeTip.show();
	                    container.find('.agree-tip .service').attr('href', '/protocol.htm?orderid=' + ops.orderid + '&referenceid=' + ops.referenceid);
	                    container.find('.agree-tip .risk').attr('href', '/agreement.htm?orderid=' + ops.orderid + '&referenceid=' + ops.referenceid);
	                    typeBalance.hide();
	                    items.eq(1).find('#roundedTwo').click();
	                    payType = 'wechat';
	                }
	                //风险揭示书默认打钩
	                if (ops.read) {
	                    agreeTip.find('input').attr('checked', true);
	                }
	                // 赋值
	                name.text(ops.name);
	                price.text(ops.price);
	                orderNum.text(ops.orderNum);

	                container.show().velocity('transition.fadeIn', { duration: 300 });
	                box.velocity('transition.swoopIn', { duration: 300 });

	                //查询账户余额
	                $.getJSON('/useraccount/pay_useraccountDetail.htm', { user_id: ynUserId }, function (data) {
	                    accountRemain = +data.balance;
	                    container.find('.yn-balance-value').html("可用余额" + data.balance + "牛币");
	                    if (data.balance < ops.price) {
	                        //余额不足时  不能选余额支付，默认微信支付
	                        items.eq(0).find('#roundedOne').attr({ 'disabled': true, 'checked': false });
	                        items.eq(2).find('#roundedThree').attr('checked', false);
	                        items.eq(0).find('label').addClass('disable');
	                        // items.eq(0).find('#roundedOne').attr('disabled', true)
	                        items.eq(1).find('#roundedTwo').click();
	                        payType = 'wechat';
	                    }
	                });

	                //查询订单信息
	                $.post('/web/getPayOrderInfo.htm', { orderNum: orderNum }, function (data) {
	                    //     console.log("订单信息", data)
	                    goodsType = data.goodsType;
	                    orderInfo = data;
	                    if (+goodsType == 6) {
	                        //goodsType = 6是购买VIP直播室，不能用牛币支付
	                        items.eq(0).remove();
	                    }
	                }, 'json');
	            }
	        };
	    };

	    return {
	        getInstance: function getInstance() {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	var createElement = function createElement() {
	    return '<div class="pay-confirm-overlay"><div class="pay-confirm-box"><div class="title">\u652F\u4ED8\u786E\u8BA4</div><span class="close fa fa-times-circle"></span><div class="content"><div class="pay-item pay-item-confirm"><div class="payment"><div class="price">\u652F\u4ED8\u91D1\u989D<span class="inline fr colorRed">\uFFE5<strong class="value inline"></strong><span class="color666">\u5143</span></span></div><div class="name">\u8BA2\u5355\u63CF\u8FF0<span class="value fr"></span></div><div class="orderNum">\u8BA2\u5355\u7F16\u53F7<span class="orderNum-value fr"></span></div></div><div class="defray-content"><!-- \u4F59\u989D\u652F\u4ED8 --><div data-source="balance" class="defray-item clear type-nb"><div class="rounded fr"><input type="radio" id="roundedOne" name="radio" checked="checked"><label for="roundedOne"></label></div><div class="defray_radio defray-balance clear fl"><div class="apyphoto fl"></div><div class="yn_pay fl"><p class="pay-title" style="position:relative;top:-6px;">\u4F59\u989D\u652F\u4ED8<i class="balance-icon"></i><i class="balance-arrow"></i><span class="yn_balance"><span class="yn-balance-value"></span><a href="/html/recharge.htm" class="colorRed" target="_blank">\u53BB\u5145\u503C</a></span></p></div></div></div><!-- \u5FAE\u4FE1\u652F\u4ED8 --><div data-source="wechat" class="defray-item clear type-wx"><div class="rounded fr"><input type="radio" id="roundedTwo" name="radio"><label for="roundedTwo"></label></div><div class="defray_radio defray-wechat clear fl"><div class="apyphoto fl"></div><div class="yn_pay fl"><span class="pay-title">\u5FAE\u4FE1\u652F\u4ED8</span></div></div></div><!-- \u652F\u4ED8\u5B9D --><div data-source="alipay" class="defray-item clear thisclass type-alipay"><div class="rounded fr"><input type="radio" id="roundedThree" name="radio"><label for="roundedThree"></label></div><div class="defray_radio defray-alipay clear fl"><div class="apyphoto fl"></div><div class="yn_pay fl inline"><span class="pay-title">\u652F\u4ED8\u5B9D\u652F\u4ED8</span></div></div></div></div><div class="agree-tip clear hide"><span class="agree"><input type="checkbox"/><span class="txt">\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F</span></span><a href="" class="risk agree" target="_blank"><span class="blue">\u300A\u98CE\u9669\u63ED\u793A\u4E66\u300B</span></a><a href="" class="service agree" target="_blank"><span class="blue">\u300A\u670D\u52A1\u4F7F\u7528\u534F\u8BAE\u300B</span></a></div><div class="submits"><a id="pay-confirm-link" class="pay-btn jump" target="_blank">\u786E\u8BA4\u652F\u4ED8</a></div></div><div class="pay-item pay-item-tip hide"><div class="payment"><p>\u652F\u4ED8\u5B8C\u6210\u524D\uFF0C\u8BF7\u4E0D\u8981\u5173\u95ED\u6B64\u652F\u4ED8\u9A8C\u8BC1\u7A97\u53E3</p><p><strong>\u8BF7\u57282\u5C0F\u65F6\u5185\u652F\u4ED8\uFF0C\u8D85\u65F6\u5C06\u5173\u95ED\u8BA2\u5355\uFF1B</strong></p><div class="submits"><a class="wrong pay-btn" href="http://us.yuetougu.com/help.htm" target="_blank">\u652F\u4ED8\u9047\u5230\u95EE\u9898</a><a class="finish pay-btn">\u652F\u4ED8\u5B8C\u6210</a></div></div></div></div></div></div>';
	};

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(88);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
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

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "\n.hide {\n    display: none;\n}\n\n.fr {\n    float: right;\n}\n\n.color666 {\n    color: #666;\n}\n\n.inline {\n    display: inline-block;\n}\n\n.pay-confirm-overlay {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background: rgba(245, 245, 245);\n    background: rgba(245, 245, 245, .7);\n    text-align: center;\n    z-index: 10000;\n}\n\n.pay-confirm-box {\n    display: inline-block;\n    margin-top: 200px;\n    background: white;\n    border-radius: 3px;\n    position: relative;\n    width: 500px;\n    text-align: left;\n    margin: auto;\n    margin-top: 100px;\n    box-shadow: 7px 4px 20px 0px hsla(0, 0%, 65%, 0.38);\n}\n\n.pay-confirm-box .title {\n    text-align: left;\n    padding: 10px 20px;\n    font-size: 15px;\n    border-bottom: 1px solid rgb(219, 219, 219);\n}\n\n.pay-confirm-box .content {\n    padding: 30px;\n}\n\n.pay-confirm-box .close {\n    position: absolute;\n    top: 8px;\n    right: 10px;\n    font-size: 25px;\n    cursor: pointer;\n}\n.payment {\n    /* background: url(/public/images/payment.png) no-repeat;\n    padding-left: 120px; */\n    padding-bottom: 25px;\n    border-bottom: 1px dashed #cecece;\n    /*text-align: center;*/\n}\n\n.pay-item-tip .payment{\n    text-align: center;\n    border-bottom:none;\n}\n.payment .name {\n    font-size: 16px;\n    margin-bottom: 15px;\n}\n\n.payment .price {\n    margin-bottom: 15px;\n    font-size: 16px;\n}\n\n.payment .value {\n    color: #d72612;\n}\n\n.pay-confirm-box .submits {\n    text-align: center;\n    margin-top: 25px;\n}\n\n.pay-confirm-box .pay-btn {\n    padding: 6px 20px;\n    border-radius: 2px;\n    background: #d72621;\n    color: white;\n    font-size: 16px;\n    cursor: pointer;\n}\n\n.pay-item-tip .submits {\n    text-align: center;\n}\n\n.pay-item-tip p {\n    margin-bottom: 5px;\n}\n\n.pay-item-tip .wrong {\n    background: #a3a2a2\n}\n\n.finish {\n    background: #f6554a\n}\n\n.agree {\n    position: relative;\n    top: 15px;\n}\n\n.agree .blue {\n    color: #1176E8;\n}\n\n.agree input {\n    position: relative;\n    top: 1px;\n    left: -3px;\n}\n\n.agree .txt {\n    color: #999;\n}\n\n.agree-tip {\n    height: 50px;\n}\n\n.orderNum-value {\n    color: #666\n}\n\n\n/*  */\n\n.defray-content {\n    padding: 15px 0 0 0;\n    border-bottom: 1px dashed #cecece;\n}\n\n.defray-item {\n    height: 60px;\n}\n\n.yn_pay {\n    width: 340px;\n    position: relative;\n    top: 4px;\n    color: #333;\n    font-size:16px;\n}\n\n.type-alipay {\n    background: url(/public/images/alipay.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-wx {\n    background: url(/public/images/wxpay.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-nb {\n    background: url(/public/images/nbpay.png) no-repeat;\n    padding-left: 45px;\n}\n\n.rounded {\n    width: 25px;\n    height: 25px;\n    /* margin: 13px; */\n    position: relative;\n    top:5px;\n    background: #fcfff4;\n    background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n    background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n    background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n    -moz-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);\n    -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);\n    box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);\n}\n\n.rounded label {\n    width: 18px;\n    height: 18px;\n    position: absolute;\n    top: 3px;\n    left: 4px;\n    cursor: pointer;\n    background: -moz-linear-gradient(top, #222222 0%, #45484d 100%);\n    background: -webkit-linear-gradient(top, #222222 0%, #45484d 100%);\n    background: linear-gradient(to bottom, #222222 0%, #45484d 100%);\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n    -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px white;\n    -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px white;\n    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px white;\n}\n\n.rounded label:after {\n    content: '';\n    width: 11px;\n    height: 7px;\n    position: absolute;\n    top: 5px;\n    left: 4px;\n    border: 3px solid #fcfff4;\n    border-top: none;\n    border-right: none;\n    background: transparent;\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n    opacity: 0;\n    transition: all .3s;\n    -moz-transform: rotate(-45deg);\n    -ms-transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}\n.rounded label.disable{\n    background:#D7D7D7;\n}\n.rounded label:hover::after {\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=30);\n    opacity: 0.3;\n}\n.rounded input[type=radio] {\n    visibility: hidden;\n}\n.rounded input[type=radio]:checked+label:after {\n    filter: progid: DXImageTransform.Microsoft.Alpha(enabled=false);\n    opacity: 1;\n}\n\n\n/*  */\n\n.balance-icon {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background: url(/public/images/money.png) no-repeat;\n    position: relative;\n    top: 4px;\n    left: 10px;\n}\n\n.yn_balance {\n    color: #666;\n    font-size: 14px;\n    height: 20px;\n    line-height: 20px;\n    border: 1px solid #E7E5E5;\n    border-left: none;\n    box-shadow: 5px 3px 10px #ececec;\n    padding: 2px 10px;\n}\n\n.balance-arrow {\n    display: inline-block;\n    width: 10px;\n    height: 24px;\n    background: url(/public/images/arrow.png) no-repeat;\n    margin-left: 10px;\n    position: relative;\n    top: 6px;\n    left: 5px;\n}\n\n.colorRed{\n    color: #d72612;\n}\n.orderNum{\n    font-size:16px;\n}\n.yn-balance-value{\n    margin-right:10px;\n}", ""]);

	// exports


/***/ }),

/***/ 89:
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

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/* 拖动验证 */

	__webpack_require__(91);

	module.exports = function (phone, callback) {
	    $.ajax({
	        url: "/geetest/register.htm?t=" + new Date().getTime(),
	        type: "get",
	        dataType: "json",
	        data: { user_name: phone },
	        success: function success(data) {
	            initGeetest({
	                gt: data.data.gt,
	                challenge: data.data.challenge,
	                offline: !data.data.success,
	                new_captcha: true,
	                product: "popup"
	            }, handlerPopup);
	        }
	    });

	    function handlerPopup(captchaObj) {
	        captchaObj.appendTo("#popup-captcha-box");
	        captchaObj.onSuccess(function () {
	            //成功回调
	            setTimeout(function () {
	                $('#popup-captcha').hide();
	                $('#popup-captcha-box').html("");
	            }, 500);
	            var validate = captchaObj.getValidate();
	            callback && callback({
	                geetest_challenge: validate.geetest_challenge,
	                geetest_validate: validate.geetest_validate,
	                geetest_seccode: validate.geetest_seccode
	            });
	        });
	    }
	};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(92);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/_css-loader@0.23.1@css-loader/index.js!./drag-verify.css", function() {
				var newContent = require("!!../../node_modules/_css-loader@0.23.1@css-loader/index.js!./drag-verify.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#popup-captcha {\r\n    width: 100%;\r\n    margin: auto;\r\n    height: 50px;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    background: white;\r\n    background: rgba(0, 0, 0, 0.4);\r\n    height: 100%;\r\n    z-index: 1000;\r\n    display: none;\r\n}\r\n\r\n#popup-captcha-box {\r\n    width: 302px;\r\n    margin: auto;\r\n    margin-top: 330px;\r\n    box-shadow: 4px 4px 30px rgba(74, 72, 72, 0.11);\r\n}", ""]);

	// exports


/***/ })

/******/ });