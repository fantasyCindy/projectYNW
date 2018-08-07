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

	var DragVerify = __webpack_require__(1); // 拖动验证
	var error = __webpack_require__(6);
	var register = function () {
	    var container, tag, nickname, phone, password, imgCode, error, phone_code, falseCount, __isValid, __submit, employeecode, popRefer, getVoiceCode;
	    var validate = {
	        phone: false,
	        // imgCode: false,
	        phoneCode: false,
	        passWord: false
	    };
	    var setValidate = function setValidate(key, value) {
	        validate[key] = value;
	        falseCount = _.filter(validate, function (item) {
	            return !item;
	        }).length; //获取false的个数
	        __isValid = falseCount < 2; //验证
	        __submit = falseCount == 0;
	        // __isValid ? container.find('.three-pass').show() : container.find('.three-pass').hide()
	        __submit ? container.find('button.btn').removeClass('false') : container.find('button.btn').addClass('false');
	    };

	    var phoneState = {
	        modify: function modify(ops) {
	            var entry = ops.isVoice ? 'voiceCode' : 'msgCode';
	            var modifyBtn = {
	                'voiceCode': function voiceCode() {
	                    getVoiceCode.html('\u60A8\u5C06\u901A\u8FC7\u8BED\u97F3\u63A5\u6536\u9A8C\u8BC1\u7801\uFF0C\u8BF7\u6CE8\u610F\u63A5\u542C\u6765\u7535\uFF01<span id=\'sendCount\'>60</span>s');
	                    tag.find('.phone-state-none').get(0).disabled = true;
	                    var sendCount = $("#sendCount");
	                    tag.find('.phone-state-none').addClass('gray');

	                    var timer = setInterval(function () {

	                        if (+sendCount.text() == 0) {
	                            clearInterval(timer);
	                            timer = null;
	                            getVoiceCode.html('\u672A\u63A5\u6536\u5230\u6765\u7535\uFF1F<span class="txt getVoiceMsg">\u70B9\u51FB\u91CD\u65B0\u83B7\u53D6</span>');
	                            tag.find('.phone-state-none').removeClass('gray');
	                            tag.find('.phone-state-none').get(0).disabled = false;
	                            return;
	                        }

	                        var val = +sendCount.text();
	                        sendCount.text(--val);
	                    }, 1000);
	                },
	                'msgCode': function msgCode() {
	                    tag.html('<button class="phone-state-time"><strong id=\'timeRemained\'>60</strong>\u79D2\u540E\u91CD\u65B0\u83B7\u53D6</button>');
	                    tag.find('.phone-state-time').get(0).disabled = true;
	                    getVoiceCode.hide();
	                    var timeRemained = $("#timeRemained");

	                    var timer = setInterval(function () {

	                        if (+timeRemained.text() == 0) {
	                            clearInterval(timer);
	                            timer = null;
	                            tag.html('<span class="phone-state-none">\u83B7\u53D6\u9A8C\u8BC1\u7801</span>');
	                            getVoiceCode.html('\u6CA1\u6536\u5230\u77ED\u4FE1\uFF1F<span class="txt getVoiceMsg">\u70B9\u6B64\u83B7\u53D6\u8BED\u97F3\u9A8C\u8BC1\u7801</span>');
	                            getVoiceCode.show();
	                            return;
	                        }

	                        var val = +timeRemained.text();
	                        timeRemained.text(--val);
	                    }, 1000);
	                }
	            };
	            modifyBtn[entry]();
	        }
	    };
	    return {
	        init: function init() {
	            container = $('#accountform');
	            tag = $('#sendPhoneCodeId');
	            getVoiceCode = $('.getVoiceCode');
	            nickname = $('input[name="nickname"]');
	            phone = $('input[name="phone"]');
	            password = $('input[name="pwd"]');
	            imgCode = $('input[name="validCode"]');
	            error = $('.three-tip');
	            phone_code = $('input[name="phoneCode"]');
	            popRefer = $('#pop-refer');

	            popRefer.on('click', '.pop-refer-close', function () {
	                popRefer.hide();
	                window.location.href = '/';
	            });
	            // employeecode = $('input[name="employeecode"]')
	            container.on('click', 'button.btn', function () {
	                var url = logintype + "Register.htm";
	                var send = container.find('form').serialize();
	                var res = {};
	                send.split('&').forEach(function (i) {
	                    var j = i.split('=');
	                    res[j[0]] = j[1];
	                });

	                if (__submit) {
	                    $.post(url, send, function (data) {
	                        data = JSON.parse(data);
	                        if (data.status == '1' || data.status == 100002) {
	                            layer.msg('注册成功,自动跳转到首页');
	                            $.post('/public/login.htm', { userName: res.phone, password: res.pwd }, function (data) {
	                                data = JSON.parse(data);
	                                if (data.status == "1") {
	                                    setTimeout(function () {
	                                        window.location.href = '/';
	                                    }, 1500);
	                                }
	                            });
	                        } else {
	                            return layer.msg(error[data.status]);
	                        }
	                    });
	                }
	            });
	            ////////////////////////////////////////////////////////

	            //手机号失去焦点
	            phone.blur(function () {

	                var val = _.trim(phone.val());
	                if (!val) {
	                    error.find('.phoneEmpty').show().siblings().hide();
	                    setValidate('phone', false);
	                    return;
	                } else if (!/^0?1[34578][0-9]{9}$/.test(val)) {
	                    error.find('.phoneFormat').show().siblings().hide();
	                    setValidate('phone', false);
	                    return;
	                } else {
	                    error.find('div').hide();
	                    setValidate('phone', true);
	                }

	                //验证手机号是否已存在
	                $.getJSON('/app/verificationPhonoe.htm', { phone: val }, function (back) {
	                    if (back.status == '30004') {
	                        layer.confirm('该手机号已注册，是否继续绑定是否继续绑定？', { btn: ['回首页', '绑定'] }, function () {
	                            window.location.href = '/';
	                        });
	                    } else if (back.status == '30010') {
	                        error.find('.phoneError').show();
	                    } else if (back.status == '30009') {
	                        layer.msg('该手机号码已绑定');
	                    }
	                });
	            });

	            //手机验证码
	            phone_code.blur(function () {
	                var val = _.trim(phone_code.val());
	                if (!/^[0-9]+$/.test(val)) {
	                    error.find('.sendFormat').show();
	                    setValidate('phoneCode', false);
	                } else if (!val) {
	                    error.find('.sendEmpty').show();
	                    setValidate('phoneCode', false);
	                } else {
	                    error.find('div').hide();
	                    setValidate('phoneCode', true);
	                }
	            });

	            //密码失去焦点
	            password.blur(function () {
	                var val = _.trim(password.val());
	                if (!/^[0-9a-zA-Z_]{6,}$/.test(val)) {
	                    error.find('.passFormat').show();
	                    setValidate('passWord', false);
	                    return;
	                } else if (!val) {
	                    error.find('.passEmpty').show();
	                    setValidate('passWord', false);
	                    return;
	                } else {
	                    error.find('div').hide();
	                    setValidate('passWord', true);
	                }
	            });

	            ////////////////////////////////////////////////////////

	            // $('#imgCodeId').on('click', function () {
	            //     $(this).attr("src", "/validCode.htm?r=" + Math.random());
	            // })


	            /*///////////////////////////////////////////////////////////////////*/
	            //发送验证码
	            function sendCode(ops) {
	                var isVoice = ops.isVoice ? true : false;
	                $.post("/sendPhoneCode.htm", ops, function (data) {
	                    data = JSON.parse(data);
	                    if (data.status == 20012) return layer.msg("短信发送失败，请重试!");
	                    if (data.status == 30002) return layer.msg("图片验证码错误");
	                    if (data.status == 1) {
	                        phoneState.modify({ isVoice: isVoice });
	                    }
	                });
	            }

	            //点击获取短信验证码
	            tag.on('click', '.phone-state-none', function () {

	                // 验证手机号
	                var phoneNumber = phone.val().trim();
	                var isValid = /^1[34578][0-9]{9}$/.test(phoneNumber);
	                if (!isValid) return layer.msg('请输入有效手机号！');

	                //显示拖动验证窗口
	                $('#popup-captcha').show();

	                // 验证成功回调
	                DragVerify(phoneNumber, function (info) {
	                    var send = _.extend({ phone: phoneNumber, source: 2 }, info);
	                    sendCode(send);
	                });

	                /*///////////////////////////////////////////////////////////////////*/

	                // var imgNumber = _.trim(imgCode.val())
	                // if (!/^[0-9A-Za-z]+$/.test(imgNumber)) {
	                //     return layer.msg('图形验证码错误')
	                // }
	            });

	            //点击获取语音验证码
	            getVoiceCode.on('click', '.getVoiceMsg', function () {

	                // 验证手机号
	                var phoneNumber = phone.val().trim();
	                var isValid = /^1[34578][0-9]{9}$/.test(phoneNumber);
	                if (!isValid) return layer.msg('请输入有效手机号！');

	                //显示拖动验证窗口
	                $('#popup-captcha').show();

	                // 验证成功回调
	                DragVerify(phoneNumber, function (info) {
	                    var send = _.extend({ phone: phoneNumber, source: 2, isVoice: 'voice' }, info);
	                    sendCode(send);

	                    // 获取验证码
	                    // $.post("/sendPhoneCode.htm", send, data => {
	                    //     if (+data == -1) return layer.msg("短信发送失败，请重试!");
	                    //     if (+data == 13) return layer.msg("图形验证码错误");
	                    //     if (data == "success") {
	                    //         phoneState.modify();
	                    //     }
	                    // })
	                });

	                /*///////////////////////////////////////////////////////////////////*/

	                // var imgNumber = _.trim(imgCode.val())
	                // if (!/^[0-9A-Za-z]+$/.test(imgNumber)) {
	                //     return layer.msg('图形验证码错误')
	                // }
	            });
	        }
	    };
	}();

	$(function () {
	    register.init();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/* 拖动验证 */

	__webpack_require__(2);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#popup-captcha {\r\n    width: 100%;\r\n    margin: auto;\r\n    height: 50px;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    background: white;\r\n    background: rgba(0, 0, 0, 0.4);\r\n    height: 100%;\r\n    z-index: 1000;\r\n    display: none;\r\n}\r\n\r\n#popup-captcha-box {\r\n    width: 302px;\r\n    margin: auto;\r\n    margin-top: 330px;\r\n    box-shadow: 4px 4px 30px rgba(74, 72, 72, 0.11);\r\n}", ""]);

	// exports


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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