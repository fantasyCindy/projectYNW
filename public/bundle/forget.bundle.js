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

	/**
	 * 找回密码
	 * 
	 */

	var imgLayer = __webpack_require__(1);
	var error = __webpack_require__(7);
	/*///////////////////////////////////////////////////////////////////*/

	$(function () {

	    var indicate = $("#step-indicate");
	    var phoneCode;
	    var step1 = function () {
	        var container = $(".step1");
	        var messageCode = $("#message-code");
	        var input_phone = $("#input_phone");
	        var input_message_code = $("#input_message_code");
	        var voiceCode = $('.getVoiceCode');
	        var getVoiceMsg = $('.getVoiceMsg');
	        var getMsgCode = $('.getMsgCode');

	        // 短信验证码
	        messageCode.on('click', '.getMsgCode', function () {

	            var val = _.trim(input_phone.val());
	            if (!val) {
	                return layer.msg('请输入手机号码');
	            }

	            // 检测手机号码是否已经注册
	            $.post("/user/isMobileNO.htm", { phone: val }, function (back) {
	                back = JSON.parse(back);
	                if (back.status == "1") {
	                    // 显示图片验证码
	                    imgLayer.get().render({
	                        callback: function callback(type, info) {
	                            if (type == "yes") {

	                                //发送短信
	                                $.post(__path + '/sendH5PhoneCode.htm', {
	                                    phone: val,
	                                    phone_imgcode: info.value,
	                                    source: 0
	                                }, function (data) {
	                                    data = JSON.parse(data);
	                                    if (data.status == '1') {
	                                        countDown({ 'isVoice': false });
	                                    } else {
	                                        return layer.msg(error[data.status]);
	                                    }
	                                });
	                            }
	                        }
	                    });
	                } else {
	                    return layer.msg(error[back.status]);
	                }
	            });
	        });

	        // 语音验证码
	        voiceCode.on('click', '.getVoiceMsg', function () {

	            var val = _.trim(input_phone.val());
	            if (!val) {
	                return layer.msg('请输入手机号码');
	            }

	            // 检测手机号码是否已经注册
	            $.post("/user/isMobileNO.htm", { phone: val }, function (back) {
	                back = JSON.parse(back);
	                if (back.status == "1") {
	                    // 显示图片验证码
	                    imgLayer.get().render({
	                        callback: function callback(type, info) {
	                            if (type == "yes") {
	                                //发送短信
	                                $.post(__path + '/sendH5PhoneCode.htm', {
	                                    phone: val,
	                                    phone_imgcode: info.value,
	                                    source: 0,
	                                    isVoice: 'voice'
	                                }, function (data) {
	                                    data = JSON.parse(data);
	                                    if (data.status == '1') {
	                                        countDown({ 'isVoice': true });
	                                    } else {
	                                        return layer.msg(error[data.status]);
	                                    }
	                                });
	                            }
	                        }
	                    });
	                } else {
	                    layer.msg("用户不存在");
	                }
	            });
	        });

	        // 倒计时
	        var countDown = function countDown(ops) {
	            var isVoice = ops.isVoice;
	            // if (!yn.isMobile(val)) return layer.msg("请输入正确手机号码");
	            if (isVoice) {
	                voiceCode.html('\u60A8\u5C06\u901A\u8FC7\u8BED\u97F3\u63A5\u6536\u9A8C\u8BC1\u7801\uFF0C\u8BF7\u6CE8\u610F\u63A5\u542C\u6765\u7535\uFF01<span id=\'sendCount\'>60</span>s');
	                messageCode.find('.getMsgCode').get(0).disabled = true;
	                messageCode.find('.getMsgCode').addClass('isDisable');
	            } else {
	                voiceCode.hide();
	                messageCode.html('<button class="getMsgCode"><span id=\'sendCount\'>60</span>\u79D2\u540E\u53EF\u518D\u6B21\u83B7\u53D6!</button>');
	            }
	            var btn = $(this);
	            var val = _.trim(input_phone.val());

	            var timer = setInterval(function () {
	                var count = $("#sendCount");
	                var value = Number(count.text());
	                if (value > 1) {
	                    value--;
	                    count.text(value);
	                } else {
	                    if (isVoice) {
	                        voiceCode.html('\u672A\u63A5\u6536\u5230\u6765\u7535\uFF1F<span class="txt getVoiceMsg">\u70B9\u51FB\u91CD\u65B0\u83B7\u53D6</span>');
	                        messageCode.find('.getMsgCode').get(0).disabled = false;
	                        messageCode.find('.getMsgCode').removeClass('isDisable');
	                    } else {
	                        messageCode.html('<button class="getMsgCode">\u83B7\u53D6\u77ED\u4FE1\u9A8C\u8BC1\u7801</button>');
	                        voiceCode.html('\u6CA1\u6536\u5230\u77ED\u4FE1\uFF1F<span class="txt getVoiceMsg">\u70B9\u6B64\u83B7\u53D6\u8BED\u97F3\u9A8C\u8BC1\u7801</span>');
	                        voiceCode.show();
	                    }
	                    clearInterval(timer);
	                }
	            }, 1000);
	        };

	        return {
	            hide: function hide() {
	                return container.hide();
	            },

	            submit: function submit() {

	                var phone = _.trim(input_phone.val());
	                phoneCode = _.trim(input_message_code.val());
	                if (!yn.isMobile(phone)) return layer.msg('手机号码不正确！');
	                if (!/[0-9]{4,6}/.test(phoneCode)) return layer.msg('请填写验证码');
	                step1.hide();
	                step2.show();
	                curStep = step2;

	                // 验证短信
	                // $.post('/validPhoneCode.htm', {
	                //     phone: phone,
	                //     phoneCode: phoneCode
	                // }, function(data) {
	                //     data = JSON.parse(data)
	                //     if (data.status == 20012) return layer.msg("短信发送失败，请重试!")
	                //     if (data.status == 30002) return layer.msg("图片验证码错误")
	                //     if (data.status == 1) {
	                //         step1.hide()
	                //         step2.show()
	                //         curStep = step2;
	                //     }
	                // })
	            }
	        };
	    }();

	    var step2 = function () {
	        var container = $(".step2");
	        var newPass = $("#input_new");
	        var confirm = $("#input_confirm");

	        return {
	            show: function show() {
	                curStep = step2;
	                container.show();
	                indicate.attr('class', 'step-item-2');
	            },
	            hide: function hide() {
	                return container.hide();
	            },
	            submit: function submit() {

	                var val_new = _.trim(newPass.val());
	                var val_confirm = _.trim(confirm.val());
	                if (!/^[0-9a-zA-Z_\-@$]{6,}$/.test(val_new)) return layer.msg("密码必须包含字母/下划线或数字, 且至少6位");
	                if (val_confirm != val_new) return layer.msg("两次输入不一致");

	                $.post(__path + '/user/forget.htm', {
	                    phone_u: _.trim($("#input_phone").val()),
	                    newPassword: _.trim(newPass.val()),
	                    phoneCode: _.trim(phoneCode)
	                }, function (data) {
	                    data = JSON.parse(data);
	                    if (data.status == '1') {
	                        $('#next').hide();
	                        step2.hide();
	                        step3.show();
	                        return;
	                    } else {
	                        return layer.msg(error[data.status]);
	                    }
	                });
	            }
	        };
	    }();

	    var step3 = function () {
	        var container = $(".step3");
	        var count = container.find('.count');
	        yn.login.redirect = function () {
	            window.location.href = __path;
	        };

	        return {
	            show: function show() {
	                container.show();
	                indicate.attr('class', 'step-item-3');
	                setTimeout(function () {
	                    window.close();
	                }, 1000);
	            }
	        };
	    }();

	    // 下一步
	    var curStep = step1;
	    var btn = $("#next");
	    btn.click(function () {
	        curStep.submit();
	    });
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* 

	        var layer = require('valid-img-model.js')
	        layer.get().render({
	            callback: (type, info) =>{
	                 if(type == "yes"){
	                      alert(info.value)
	                 }
	            }
	        })

	 */

	/*///////////////////////////////////////////////////////////////////*/

	__webpack_require__(2);
	var lo = __webpack_require__(6);

	module.exports = function () {
	    var instance,
	        params = {
	        callback: null
	    },
	        imgCode,
	        input;

	    var create = function create() {

	        $('body').append('<div id="model-valid-img">\n                        <div class="box">\n                            <div class="title">\u8BF7\u8F93\u5165\u56FE\u7247\u9A8C\u8BC1\u7801</div>   \n                            <div class="contentBar">\n                                <div class="valid-img">\n                                  <input type="text"/>\n                                  <img src="/validCode.htm"/>\n                                </div>\n                            </div>\n                            <div class="bottom">\n                                <span class="no b-btn">\u53D6\u6D88</span>\n                                <span class="yes b-btn">\u786E\u5B9A</span>\n                            </div>\n                        </div>\n                </div>');

	        var container = $('#model-valid-img');
	        imgCode = container.find('.valid-img img');
	        input = container.find('input');

	        //更新图片验证码
	        var updateImgCode = function updateImgCode() {
	            imgCode.attr('src', '/validCode.htm?' + Math.random());
	        };

	        // 切换验证码
	        container.on('click', 'img', function () {
	            updateImgCode();
	        });

	        // 取消
	        container.on('click', '.no', function () {
	            container.hide();
	            typeof params.callback == "function" && params.callback('no');
	        });

	        // 确定
	        container.on('click', '.yes', function () {

	            if (!$('.valid-img input').val()) {
	                return layer.msg("请输入验证码");
	            }

	            container.hide();
	            if (typeof params.callback == "function") {
	                params.callback('yes', { value: input.val() });
	            }
	        });

	        var reset = function reset() {
	            updateImgCode();
	            input.val("");
	        };

	        return {
	            render: function render(ops) {
	                params = lo.extend(params, ops);
	                reset();
	                container.fadeIn(300);
	            }
	        };
	    };

	    return {
	        get: function get() {
	            if (!instance) {
	                instance = create();
	            }
	            return instance;
	        }
	    };
	}();

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
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./valid-img-model.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./valid-img-model.css");
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
	exports.push([module.id, "#model-valid-img {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: white;\r\n    background: rgba(255, 255, 255, 0.33);\r\n    z-index: 100;\r\n}\r\n\r\n\r\n/*///////////////////////////////////////////////////////////////////*/\r\n\r\n#model-valid-img {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: white;\r\n    background: rgba(80, 80, 80, 0.33);\r\n    z-index: 100;\r\n}\r\n\r\n#model-valid-img .box {\r\n    width: 400px;\r\n    margin: auto;\r\n    margin-top: 200px;\r\n    background: rgb(255, 255, 255);\r\n    border-radius: 4px;\r\n    box-shadow: 1px 1px 15px rgba(92, 92, 92, 0.21);\r\n    overflow: hidden;\r\n}\r\n\r\n#model-valid-img .box .title {\r\n    border-bottom: 1px solid #e8e8e8;\r\n    padding: 15px;\r\n}\r\n\r\n#model-valid-img .box .contentBar {\r\n    padding: 40px;\r\n}\r\n\r\n#model-valid-img .bottom {\r\n    overflow: hidden;\r\n    border-top: 1px solid #d4d4d4;\r\n    background: #efefef;\r\n}\r\n\r\n#model-valid-img .bottom .b-btn {\r\n    float: left;\r\n    width: 49%;\r\n    text-align: center;\r\n    padding: 10px 0;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n}\r\n\r\n#model-valid-img .bottom .yes {\r\n    border-left: 1px solid #d4d4d4;\r\n}\r\n\r\n#model-valid-img .valid-img {\r\n    overflow: hidden;\r\n}\r\n\r\n#model-valid-img .valid-img input {\r\n    padding: 6px;\r\n    float: left;\r\n    margin-right: 10px;\r\n    background: #f1f1f1;\r\n}\r\n", ""]);

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

/***/ }),
/* 7 */
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

/***/ })
/******/ ]);