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

	var welfare_login = __webpack_require__(1);
	var welfare_register = __webpack_require__(10);
	var welfare_pay = __webpack_require__(14);
	var welfare_finish = __webpack_require__(17);

	window.location.hash = '';

	var href = window.location.href;
	var initRouter = '/welfare/register';

	if (/router=[a-z\/]+/.test(href)) {
	    initRouter = href.match(/router=([a-z\/]+)/)[1];
	}

	var router = new VueRouter({
	    routes: [{
	        path: '/',
	        redirect: initRouter
	    }, {
	        path: '/welfare/register',
	        component: welfare_register
	    }, {
	        path: '/welfare/login',
	        component: welfare_login
	    }, {
	        path: '/welfare/pay',
	        component: welfare_pay
	    }, {
	        path: '/welfare/finish',
	        component: welfare_finish
	    }]

	});

	new Vue({
	    el: '#app-welfare',
	    watch: {
	        '$route': function $route(to, from) {
	            if (to.path == '/welfare/register') {
	                document.title = '注册';
	            } else if (to.path == '/welfare/login') {
	                document.title = '登录';
	            } else if (to.path == '/welfare/pay') {
	                document.title = '购买';
	            }
	        }
	    },
	    router: router,
	    created: function created() {}
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(3),
	  /* template */
	  __webpack_require__(9),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\Administrator\\Desktop\\YNW\\public\\mobile\\comp\\app-welfare-login.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] app-welfare-login.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-46c10884", Component.options)
	  } else {
	    hotAPI.reload("data-v-46c10884", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var layer = __webpack_require__(4);
	exports.default = {
	    data: function data() {
	        return {
	            send: {
	                userName: '',
	                password: ''
	            },
	            src: '/public/mobile/images/by.png',
	            isPassword: true //密码可见性
	        };
	    },

	    computed: {
	        passwordType: function passwordType() {
	            return this.isPassword ? "text" : "password";
	        },
	        eyeSrc: function eyeSrc() {
	            return this.isPassword ? '/public/mobile/images/by.png' : '/public/mobile/images/zy.png';
	        }
	    },
	    methods: {
	        login: function login() {
	            var self = this;
	            if (!/^1[34578][0-9]{9}$/.test(this.send.userName)) {
	                return layer.msg('请输入有效的手机号码');
	            }
	            if (!/^[a-zA-Z0-9_]{6,30}$/.test(this.send.password)) {
	                return layer.msg('密码由字母数字或下划线组成,至少6位');
	            }
	            $.post('/public/login.htm', this.send, function (back) {
	                back = JSON.parse(back);
	                if (back.status == "1") {
	                    layer.msg('登录成功');
	                    var match = window.location.href.match(/url=([^]+)#/);
	                    var href = match ? match[1] : '';
	                    console.log("==href=", href);
	                    setTimeout(function () {
	                        window.location.href = href;
	                    }, 1000);

	                    return;
	                }
	                if (back === "2") {
	                    layer.msg("用户名不存在");
	                    return;
	                }
	                if (back === "3") {
	                    layer.msg("密码错误");
	                    return;
	                }
	            });
	        }
	    },
	    mounted: function mounted() {
	        var href = window.location.href;
	        $.post("/web/getjssdkInfo.htm", {
	            url: href
	        }, function (data) {
	            var back = JSON.parse(data);
	            if (back.status == 1) {
	                wx.config({
	                    debug: false,
	                    appId: back.data.appId,
	                    timestamp: back.data.timeStamp, // 必填，生成签名的时间戳
	                    nonceStr: back.data.nonceStr, // 必填，生成签名的随机串
	                    signature: back.data.signature, // 必填，签名，见附录1
	                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
	                });
	                wx.ready(function () {
	                    wx.hideOptionMenu();
	                });
	            }
	        });
	    }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);
	module.exports = function () {

	    //common
	    var container,
	        box,
	        msg_container,
	        msg_title,
	        msg_close,
	        confirm_container,
	        confirm_callback,
	        confirm_content,
	        confirm_no,
	        confirm_visible = false,
	        msg_visible = false;

	    var tag = '<div id="layer-item-container" class="hide"><div class="layer-item-wrap"><div class="layer-item-box"><div id="layer-item-msg" class="layer-item hide"><span class="layer-item-icon layer-item-"></span><span class="layer-item-title"></span><span class="layer-item-icon close hide"></span></div><div id="layer-item-confirm" class="layer-item hide"><div class="confirm-title">\u6E29\u99A8\u63D0\u793A</div><div class="confirm-content"></div><div class="buttons"><span class="inline confirm-btn no">\u53D6\u6D88</span><span class="inline confirm-btn yes">\u786E\u5B9A</span></div></div></div></div></div>';

	    var animate = function animate() {
	        if (!box.hasOwnProperty('animateCss')) {
	            addFn();
	        }
	        box.animateCss('zoomIn');
	    };

	    var commonInit = _.once(function () {
	        $('body').append(tag);
	        container = $("#layer-item-container");
	        box = container.find('.layer-item-box');

	        //设置高度
	        var height = _.min([document.body.clientHeight, $(window).height()]);
	        container.height(height);
	        container.on('click', '.close', function () {
	            return container.hide();
	        }); //关闭
	        container.on('click', '.no', function () {
	            return container.hide();
	        }); //取消

	        //确定
	        container.on('click', '.yes', function () {
	            confirm_callback();
	            container.hide();
	        });
	    });

	    var msgInit = _.once(function () {
	        msg_container = $('#layer-item-msg');
	        msg_title = msg_container.find('.layer-item-title');
	        msg_close = msg_container.find('.layer-item-icon.close');
	    });

	    var confirmInit = _.once(function () {
	        confirm_container = $('#layer-item-confirm');
	        confirm_content = confirm_container.find('.confirm-content');
	        confirm_no = confirm_container.find('.no');
	    });

	    var msgCommon = function msgCommon(txt) {
	        commonInit();
	        msgInit();
	        if (confirm_visible) confirm_container.hide();
	        msg_title.text(txt);
	        container.show();
	        msg_container.show();
	        animate();
	        msg_visible = true;
	    };

	    return {
	        msg: function msg(txt) {
	            msgCommon(txt);
	            msg_close.hide();
	            setTimeout(function () {
	                return container.hide();
	            }, 1500);
	        },

	        //alert
	        alert: function alert(txt) {
	            msgCommon(txt);
	            msg_close.show();
	        },

	        confirm: function confirm(txt, callback) {
	            commonInit();
	            confirmInit();
	            confirm_callback = callback;
	            confirm_content.text(txt);
	            if (msg_visible) msg_container.hide();
	            container.show();
	            confirm_container.show();
	            animate();
	            confirm_visible = true;
	        },
	        tan: function tan(txt, callback) {
	            commonInit();
	            confirmInit();
	            confirm_callback = callback;
	            confirm_content.text(txt);
	            if (msg_visible) msg_container.hide();
	            container.show();
	            confirm_container.show();
	            confirm_no.hide();
	            animate();
	            confirm_visible = true;
	        },
	        close: function close() {
	            container.hide();
	        }
	    };
	}();

	var addFn = function addFn() {
	    $.fn.extend({
	        animateCss: function animateCss(animationName) {
	            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	            this.addClass('animated ' + animationName).one(animationEnd, function () {
	                $(this).removeClass('animated ' + animationName);
	            });
	        }
	    });
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/_css-loader@0.23.1@css-loader/index.js!./layer.css", function() {
				var newContent = require("!!../../node_modules/_css-loader@0.23.1@css-loader/index.js!./layer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "@keyframes zoomIn {\r\n    from {\r\n        opacity: 0;\r\n        transform: scale3d(.3, .3, .3);\r\n    }\r\n    50% {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n.zoomIn {\r\n    animation-name: zoomIn;\r\n}\r\n\r\n#layer-item-container {\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100% !important;\r\n    text-align: center;\r\n    z-index: 10000;\r\n    background: rgba(0, 0, 0, 0.09);\r\n}\r\n\r\n#layer-item-container .layer-item-icon {\r\n    background: url(/public/images/ynicons-01.png);\r\n    width: 40px;\r\n    height: 40px;\r\n    float: left;\r\n    background-position: -200px 0\r\n}\r\n\r\n#layer-item-container .layer-item-wrap {\r\n    display: inline-block;\r\n    margin-top: 20%\r\n}\r\n\r\n#layer-item-container .layer-item-box {\r\n    border-radius: 4px;\r\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)\r\n}\r\n\r\n#layer-item-msg {\r\n    background: rgb(50, 50, 50);\r\n    padding: 10px;\r\n    border-radius: 3px\r\n}\r\n\r\n#layer-item-container .layer-item {\r\n    overflow: hidden;\r\n    text-align: left\r\n}\r\n\r\n#layer-item-container .layer-item-icon.close {\r\n    float: right;\r\n    background-position: -80px -120px;\r\n    cursor: pointer\r\n}\r\n\r\n#layer-item-container .layer-item-title {\r\n    display: inline-block;\r\n    padding: 9px 10px;\r\n    font-size: 16px;\r\n    color: white;\r\n    text-align: left\r\n}\r\n\r\n#layer-item-confirm {\r\n    width: 300px;\r\n    padding-bottom: 15px;\r\n    border: 1px solid rgb(220, 220, 220);\r\n    background: white\r\n}\r\n\r\n#layer-item-confirm .confirm-title {\r\n    font-size: 15px;\r\n    border-bottom: 1px solid rgb(220, 220, 220);\r\n    padding: 8px 15px\r\n}\r\n\r\n#layer-item-confirm .confirm-content {\r\n    padding: 20px;\r\n    font-size: 15px\r\n}\r\n\r\n#layer-item-confirm .buttons {\r\n    height: 40px;\r\n    text-align: center!important\r\n}\r\n\r\n#layer-item-confirm .confirm-btn {\r\n    font-size: 15px;\r\n    padding: 5px 25px;\r\n    margin: 0 10px;\r\n    margin-bottom: 10px;\r\n    background: #9a0303;\r\n    border-radius: 3px;\r\n    cursor: pointer;\r\n    color: white;\r\n    text-align: center;\r\n}\r\n\r\n#layer-item-confirm .confirm-btn.yes {\r\n    background: #000000\r\n}", ""]);

	// exports


/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "app-welfare-login"
	  }, [_c('div', {
	    staticClass: "welfare-login-wrap"
	  }, [_c('div', {
	    staticClass: "welfare-msg"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.userName),
	      expression: "send.userName"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "请输入手机号"
	    },
	    domProps: {
	      "value": (_vm.send.userName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "userName", $event.target.value)
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-msg welfare-pass"
	  }, [(!_vm.isPassword) ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.password),
	      expression: "send.password"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "请输入密码"
	    },
	    domProps: {
	      "value": (_vm.send.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "password", $event.target.value)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.isPassword) ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.password),
	      expression: "send.password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "请输入密码"
	    },
	    domProps: {
	      "value": (_vm.send.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "password", $event.target.value)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), _c('span', {
	    staticClass: "welfare-by"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.eyeSrc,
	      "alt": ""
	    },
	    on: {
	      "click": function($event) {
	        _vm.isPassword = !_vm.isPassword
	      }
	    }
	  })])])]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-login-btn",
	    on: {
	      "click": _vm.login
	    }
	  }, [_vm._v("登录")]), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/welfare/register"
	    }
	  }, [_c('div', {
	    staticClass: "go-register"
	  }, [_vm._v("立即注册")])])], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-46c10884", module.exports)
	  }
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(11),
	  /* template */
	  __webpack_require__(13),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\Administrator\\Desktop\\YNW\\public\\mobile\\comp\\app-welfare-register.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] app-welfare-register.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3cdbc744", Component.options)
	  } else {
	    hotAPI.reload("data-v-3cdbc744", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var layer = __webpack_require__(4);
	var error = __webpack_require__(12);
	exports.default = {
	    data: function data() {
	        return {
	            imgCode: '',
	            show: false,
	            isPassword: true, //密码可见性
	            send: {
	                phone: '',
	                phoneCode: '',
	                pwd: '',
	                employeecode: ''
	            },
	            src: '/public/mobile/images/by.png',
	            sendBtn: '获取验证码',
	            isSending: false
	        };
	    },

	    computed: {
	        passwordType: function passwordType() {
	            return this.isPassword ? "text" : "password";
	        },
	        eyeSrc: function eyeSrc() {
	            return this.isPassword ? '/public/mobile/images/by.png' : '/public/mobile/images/zy.png';
	        }
	    },
	    methods: {
	        closed: function closed() {
	            this.show = false;
	            this.imgCode = '';
	            this.isSending = false;
	        },
	        imgPop: function imgPop() {
	            if (!this.send.phone) {
	                return layer.msg('请输入手机号码');
	            }
	            if (/^1[34578][0-9]{9}$/.test(this.send.phone) && !this.isSending) {
	                this.show = true;
	                this.isSending = true;
	            }
	        },
	        changeImgCode: function changeImgCode(e) {
	            var el = $(e.target);
	            el.attr('src', '/validCode.htm?' + Date.now());
	        },
	        sendPhoneCode: function sendPhoneCode() {
	            var self = this;
	            if (!self.imgCode) {
	                return layer.msg('图形验证码为空');
	            }
	            if (this.imgCode) {
	                $.post(__path + '/sendH5PhoneCode.htm', {
	                    phone: this.send.phone,
	                    phone_imgcode: this.imgCode,
	                    source: 0
	                }, function (back) {
	                    back = JSON.parse(back);
	                    if (back.status == '1') {
	                        self.closed();
	                        self.sendBtn = '<span id=\'sendCount\'>60</span>\u79D2\u540E\u518D\u6B21\u83B7\u53D6!';
	                        $('.welfare-phoneCode-btn').html('<span id=\'sendCount\'>60</span>\u79D2\u540E\u518D\u6B21\u83B7\u53D6!');
	                        var timer = setInterval(function () {
	                            var count = $("#sendCount");
	                            var value = Number(count.text());
	                            if (value == 1) {
	                                self.sendBtn = '\u83B7\u53D6\u9A8C\u8BC1\u7801';
	                                self.isSending = false;
	                                $('.welfare-img img').attr('src', '/validCode.htm?' + Date.now());
	                                clearInterval(timer);
	                                timer = null;
	                                return;
	                            }
	                            count.text(--value);
	                        }, 1000);
	                    } else if (back.status == 30002) {
	                        layer.msg('图形验证码错误');
	                        $('.welfare-img img').attr('src', '/validCode.htm?' + Date.now());
	                        self.imgCode = '';
	                        return;
	                    }
	                });
	            }
	        },
	        register: function register() {
	            var self = this;
	            if (!/^1[34578][0-9]{9}$/.test(this.send.phone)) {
	                return layer.msg('请输入有效的手机号码');
	            }
	            if (!/^\d+$/.test(this.send.phoneCode)) {
	                return layer.msg('请输入短信验证码');
	            }
	            if (!/^[a-zA-Z0-9_]{6,30}$/.test(this.send.pwd)) {
	                return layer.msg('密码由字母数字或下划线组成,至少6位');
	            }
	            $.post('/user/webRegister.htm', this.send, function (back) {
	                back = JSON.parse(back);
	                if (back.status == '1' || back.status == 100002) {
	                    layer.msg('注册成功');
	                    setTimeout(function () {
	                        self.autoLogin();
	                    }, 1000);
	                } else {
	                    return layer.msg(error[back.status]);
	                }
	            });
	        },
	        autoLogin: function autoLogin() {
	            //自动登录
	            $.post('/public/login.htm', {
	                userName: this.send.phone,
	                password: this.send.pwd
	            }, function (back) {
	                if (back === "success") {
	                    layer.msg('已为您自动登录');
	                    setTimeout(function () {
	                        var match = window.location.href.match(/url=([^]+)#/);
	                        var href = match ? match[1] : '';
	                        window.location.href = href;
	                    }, 1000);
	                    return;
	                }
	                if (back === "2") {
	                    layer.msg("用户名不存在");
	                    return;
	                }
	                if (back === "3") {
	                    layer.msg("密码错误");
	                    return;
	                }
	            });
	        }
	    },
	    mounted: function mounted() {
	        var href = window.location.href;
	        $.post("/web/getjssdkInfo.htm", {
	            url: href
	        }, function (data) {
	            var back = JSON.parse(data);
	            if (back.status == 1) {
	                wx.config({
	                    debug: false,
	                    appId: back.data.appId,
	                    timestamp: back.data.timeStamp, // 必填，生成签名的时间戳
	                    nonceStr: back.data.nonceStr, // 必填，生成签名的随机串
	                    signature: back.data.signature, // 必填，签名，见附录1
	                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
	                });
	                wx.ready(function () {
	                    wx.hideOptionMenu();
	                });
	            }
	        });
	    }
	};

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "app-welfare-register"
	  }, [_c('div', {
	    staticClass: "welfare-register-wrap"
	  }, [_c('div', {
	    staticClass: "welfare-msg"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.phone),
	      expression: "send.phone"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "请输入手机号"
	    },
	    domProps: {
	      "value": (_vm.send.phone)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "phone", $event.target.value)
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-msg welfare-phoneCode"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.phoneCode),
	      expression: "send.phoneCode"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "手机验证码"
	    },
	    domProps: {
	      "value": (_vm.send.phoneCode)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "phoneCode", $event.target.value)
	      }
	    }
	  }), _c('span', {
	    staticClass: "welfare-phoneCode-btn",
	    domProps: {
	      "innerHTML": _vm._s(_vm.sendBtn)
	    },
	    on: {
	      "click": _vm.imgPop
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-msg welfare-pass"
	  }, [(!_vm.isPassword) ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.pwd),
	      expression: "send.pwd"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "请输入密码"
	    },
	    domProps: {
	      "value": (_vm.send.pwd)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "pwd", $event.target.value)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.isPassword) ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.pwd),
	      expression: "send.pwd"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "请输入密码"
	    },
	    domProps: {
	      "value": (_vm.send.pwd)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "pwd", $event.target.value)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), _c('span', {
	    staticClass: "welfare-by"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.eyeSrc,
	      "alt": ""
	    },
	    on: {
	      "click": function($event) {
	        _vm.isPassword = !_vm.isPassword
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-msg"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.employeecode),
	      expression: "send.employeecode"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "邀请码"
	    },
	    domProps: {
	      "value": (_vm.send.employeecode)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.send, "employeecode", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-login-btn",
	    on: {
	      "click": _vm.register
	    }
	  }, [_vm._v("注册")]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-agree"
	  }, [_c('a', {
	    attrs: {
	      "href": "/public/other/app/refer-serve.html?418529637"
	    }
	  }, [_vm._v("注册即同意《约投顾服务协议》")]), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/welfare/login"
	    }
	  }, [_c('span', {
	    staticClass: "welfare-already"
	  }, [_vm._v("已有账号")])])], 1), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show),
	      expression: "show"
	    }],
	    staticClass: "welfare-pop"
	  }, [_c('div', {
	    staticClass: "welfare-imgCode"
	  }, [_c('div', {
	    staticClass: "welfare-img"
	  }, [_c('img', {
	    attrs: {
	      "src": "/validCode.htm",
	      "alt": ""
	    },
	    on: {
	      "click": function($event) {
	        _vm.changeImgCode($event)
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-imgCode-input"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.imgCode),
	      expression: "imgCode"
	    }],
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.imgCode)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.imgCode = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-code-bar"
	  }, [_c('span', {
	    staticClass: "welfare-code-bar-btn",
	    on: {
	      "click": _vm.sendPhoneCode
	    }
	  }, [_vm._v("确定")]), _vm._v(" "), _c('span', {
	    staticClass: "welfare-code-bar-btn",
	    on: {
	      "click": _vm.closed
	    }
	  }, [_vm._v("取消")])])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3cdbc744", module.exports)
	  }
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(15),
	  /* template */
	  __webpack_require__(16),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\Administrator\\Desktop\\YNW\\public\\mobile\\comp\\app-welfare-pay.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] app-welfare-pay.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4a261e86", Component.options)
	  } else {
	    hotAPI.reload("data-v-4a261e86", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var layer = __webpack_require__(4);
	var href = window.location.href;
	var match = href.match(/referid=(\d+)/);
	var referid = match ? match[1] : '';
	var error = __webpack_require__(12);
	var matcha = href.match(/ecode=([^]+)router/);
	var ecode = matcha ? matcha[1] : '';

	var matchb = window.location.href.match(/url=([^]+)&/); //不需要ecode工号
	var backurl = matchb ? matchb[1] : '';
	exports.default = {
	    data: function data() {
	        return {
	            price: '',
	            show: false,
	            ecode: ecode, //地址栏邀请码
	            employeCode: '', //输入邀请码
	            is_weixin: function () {
	                var ua = navigator.userAgent.toLowerCase();
	                return ua.match(/MicroMessenger/i) == "micromessenger";
	            }()
	        };
	    },

	    methods: {
	        callPay: function callPay() {
	            var self = this;
	            this.ecode = ecode ? ecode : this.employeCode; //如果地址栏传了邀请码ecode就不弹窗口，如果没传ecode就弹邀请码窗口
	            /* 获取订单号 */
	            $.post('/app/buyGoodsPayOrder.htm', {
	                goodsId: referid, //商品id
	                goodsType: 3,
	                buy_number: 1,
	                pay_source: 3,
	                employeecode: this.ecode
	            }, function (back) {
	                if (back.status == 60011) {
	                    layer.msg("用户没有开通账户!请联系客服!");
	                    return;
	                }
	                if (back.status == 60023) {
	                    return layer.msg("商品已经超过购买时间");
	                }
	                if (back.status == 60020) {
	                    layer.msg('商品已购买,请下载APP或者到约投顾官网查看');
	                    return;
	                }
	                if (back.status == 60023) {
	                    layer.msg('商品购买时间已过');
	                    setTimeout(function () {
	                        window.location.href = backurl;
	                    }, 1000);
	                    return;
	                }
	                if (+back.status == 1) {
	                    //微信浏览器使用微信支付
	                    if (self.is_weixin) {
	                        $.get('/web/h5codeCal.htm', {
	                            state: back.data.orderNum
	                            // isTest:1
	                        }, function (url) {
	                            window.location.href = url;
	                        });
	                    }

	                    //其他浏览器调用支付宝
	                    if (!self.is_weixin) {
	                        $.post('/wap/wapPay.htm', {
	                            orderNum: back.data.orderNum
	                        }, function (aliback) {
	                            if (+aliback.status == 1) {
	                                var url = aliback.data;
	                                window.location.href = url;
	                            }
	                        }, 'json');
	                    }
	                }
	            }, 'json');
	        },
	        makeSure: function makeSure() {
	            if (!ynIsLogin) {
	                layer.msg('用户未登录');
	                setTimeout(function () {
	                    window.location.href = '/appwelfare.htm?router=/welfare/login';
	                }, 1000);
	                return;
	            }
	            if (!this.employeCode) {
	                return layer.msg('请输入邀请码');
	            }
	            this.show = false;
	            this.callPay();
	            this.employeCode = '';
	        },
	        ignore: function ignore() {
	            if (!ynIsLogin) {
	                layer.msg('用户未登录');
	                setTimeout(function () {
	                    window.location.href = '/appwelfare.htm?router=/welfare/login';
	                }, 1000);
	                return;
	            }
	            this.employeCode = '';
	            this.show = false;
	            this.callPay();
	        },
	        getReferMsg: function getReferMsg() {
	            var self = this;
	            $.getJSON('/reference/referbyid.htm', {
	                id: referid
	            }, function (back) {
	                if (back.status == 1) {
	                    self.price = back.data.price;
	                } else (function () {
	                    return layer.msg(error[back.status]);
	                });
	            });
	        }
	    },
	    mounted: function mounted() {
	        this.getReferMsg();
	        document.title = "购买";
	        var href = window.location.href;
	        $.post("/web/getjssdkInfo.htm", {
	            url: href
	        }, function (data) {
	            var back = JSON.parse(data);
	            if (back.status == 1) {
	                wx.config({
	                    debug: false,
	                    appId: back.data.appId,
	                    timestamp: back.data.timeStamp, // 必填，生成签名的时间戳
	                    nonceStr: back.data.nonceStr, // 必填，生成签名的随机串
	                    signature: back.data.signature, // 必填，签名，见附录1
	                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
	                });
	                wx.ready(function () {
	                    wx.hideOptionMenu();
	                });
	            }
	        });
	    }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "app-welfare-pay"
	  }, [_vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "app-welfare-pay-price"
	  }, [_vm._v("支付金额"), _c('span', {
	    staticClass: "app-pay-icon"
	  }, [_vm._v("￥"), _c('span', {
	    staticClass: "app-welfare-pay-num",
	    domProps: {
	      "textContent": _vm._s(_vm.price)
	    }
	  }), _vm._v("元")])]), _vm._v(" "), _c('div', {
	    staticClass: "app-welfare-pay-way"
	  }, [_vm._v("支付方式")]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.is_weixin),
	      expression: "is_weixin"
	    }],
	    staticClass: "app-welfare-pay-type pay-type-wx"
	  }, [_vm._v("微信支付"), _c('span', {
	    staticClass: "welfare-buy",
	    on: {
	      "click": function($event) {
	        _vm.ecode ? _vm.callPay() : ++_vm.show
	      }
	    }
	  }, [_vm._v("立即支付")])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.is_weixin),
	      expression: "!is_weixin"
	    }],
	    staticClass: "app-welfare-pay-type pay-type-alipay"
	  }, [_vm._v("支付宝支付"), _c('span', {
	    staticClass: "welfare-buy",
	    on: {
	      "click": function($event) {
	        _vm.ecode ? _vm.callPay() : ++_vm.show
	      }
	    }
	  }, [_vm._v("立即支付")])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show),
	      expression: "show"
	    }],
	    staticClass: "welfare-pop"
	  }, [_c('div', {
	    staticClass: "welfare-imgCode"
	  }, [_c('div', {
	    staticClass: "welfare-img"
	  }, [_vm._v("请输入邀请码")]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-imgCode-input"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.employeCode),
	      expression: "employeCode"
	    }],
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.employeCode)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.employeCode = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "welfare-code-bar"
	  }, [_c('span', {
	    staticClass: "welfare-code-bar-btn",
	    on: {
	      "click": _vm.makeSure
	    }
	  }, [_vm._v("确认")]), _vm._v(" "), _c('span', {
	    staticClass: "welfare-code-bar-btn",
	    on: {
	      "click": _vm.ignore
	    }
	  }, [_vm._v("跳过")])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "app-welfare-pay-logo"
	  }, [_c('img', {
	    attrs: {
	      "src": "/public/images/ytg-logo.png",
	      "alt": ""
	    }
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4a261e86", module.exports)
	  }
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(2)(
	  /* script */
	  null,
	  /* template */
	  __webpack_require__(18),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\Administrator\\Desktop\\YNW\\public\\mobile\\comp\\app-welfare-finish.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] app-welfare-finish.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-66bdcf0e", Component.options)
	  } else {
	    hotAPI.reload("data-v-66bdcf0e", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _vm._m(0)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "app-welfare-payFinish"
	  }, [_c('div', {
	    staticClass: "app-payFnish-title"
	  }, [_vm._v("约投顾 | 内参支付")]), _vm._v(" "), _c('div', {
	    staticClass: "app-payFinish-btn app-pay-continue"
	  }, [_vm._v("继续支付")]), _vm._v(" "), _c('div', {
	    staticClass: "app-payFinish-btn app-pay-finish"
	  }, [_vm._v("支付完成")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-66bdcf0e", module.exports)
	  }
	}

/***/ })
/******/ ]);