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

	var cropper = __webpack_require__(1).getInstance();
	var error = __webpack_require__(6);
	$(function () {
	    post.init();
	});

	var dataInit = function () {
	    var item, content;
	    return {
	        init: function init() {
	            item = $('input').val('');
	            content = $('.form-textarea').val('');
	            $('.yet').remove();
	            $('.add').show();
	            $('select').val('1');
	        }
	    };
	}();

	var post = function () {
	    var form, imgBox, imgJoint;
	    return {
	        init: function init() {
	            form = $('#leaflet_form');
	            imgBox = form.find('.form-imgBox');
	            imgJoint = $('#imgJoint');
	            form.find('input[name="phone"]').keyup(function () {
	                var reg = /^0?1[34578][0-9]{9}$/;
	                if (!reg.test($(this).val())) {
	                    $(this).css('borderColor', 'red');
	                } else {
	                    $(this).css('borderColor', 'green');
	                }
	            });
	            var createTag = function createTag(item) {
	                return '<option value="' + item.id + '">' + item.name + '</option>';
	            };
	            $.getJSON('/feedback_type/list.htm', function (data) {
	                if (data.status == 1) {
	                    var htm = _.map(data.data, function (item) {
	                        return createTag(item);
	                    }).join('');
	                    $('#askType').html(htm);
	                }
	            });
	            //添加图片
	            imgBox.on('click', '.add', function () {
	                var self = $(this);
	                var restrict = imgBox.find('.yet').length;
	                cropper.render({ width: 150, height: 150 });
	                cropper.onCrop = function (imageData) {
	                    var send = {
	                        dataImg: imageData,
	                        updateEntity: true,
	                        user_id: ynUserId
	                    };
	                    $.post("/feedback/ImgUpload.htm", send, function (data) {
	                        if (data.status == "1") {
	                            var src = data.data.returnPath;
	                            self.before('<div class="yet"><img src="' + src + '"/></div>');
	                            restrict > 8 ? imgBox.find('.add').hide() : '';
	                        }
	                    }, 'json');
	                };
	            });
	            form.on('click', '.confirm', function () {
	                imgBox.find('.yet img').each(function () {
	                    imgJoint[0].value += $(this)[0].src + ',';
	                });
	                console.log('imgJoint', imgJoint[0].value);

	                var reg = /^0?1[34578][0-9]{9}$/;
	                if (!reg.test($('input[name="phone"]').val())) {
	                    return layer.msg('请输入正确的手机号码');
	                }
	                var send = form.serialize() + '&status=1';
	                $.post('/feedback/save.htm', send, function (data) {
	                    data = JSON.parse(data);
	                    if (data.status == '1') {
	                        layer.msg('提交成功');
	                        dataInit.init();
	                    } else {
	                        return layer.msg(error[data.status]);
	                    }
	                });
	            });
	        }
	    };
	}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*
	                  ------------------ 图片裁剪 ------------------------
	                  var cropperModel = require('cropper-v1.2.js');   导入模块
	                  var crop = cropperModel.getInstance();
	                      crop.render({width, height});  默认是(160,90)
	                      crop.onCrop = imageData => {...}   回调函数
	             */

	__webpack_require__(2);

	module.exports = function () {
	    var instance;
	    var createInstance = function createInstance() {
	        var overlay, container, uploadWrap, cover, fileInput, $image, canvas;
	        var props = {
	            width: 160,
	            height: 90

	            /*——*/
	        };$("body").append(create(props));
	        overlay = $("#myCropper-overlay");
	        overlay.height($(window).height());
	        container = $("#myCropper");
	        canvas = document.getElementById('myCropper-canvas');
	        var brush = canvas.getContext('2d');
	        var reader = new FileReader();

	        //选择文件
	        var button = container.find('.myCropper-btn-choose');
	        var btnUpload = container.find('.myCropper-btn-upload');

	        $image = container.find('.myCropper-origin-image');
	        fileInput = $('#myCropper-input-choose');
	        cover = $(".myCropper-result-image");
	        uploadWrap = container.find('.myCropper-content');

	        button.click(function () {
	            fileInput.click();
	            uploadWrap.show();
	            reset();
	        });

	        overlay.on('click', '.close', function () {
	            return overlay.hide() && reset();
	        });

	        fileInput.change(function (e) {
	            var file = this.files[0];
	            reader.readAsDataURL(file);
	        });

	        //重置
	        var reset = function reset() {
	            $(canvas).data('state', 'no');
	            fileInput.val("");
	            $image.attr('src', '').cropper('destroy');
	            brush.clearRect(0, 0, props.width, props.height);
	            cover.attr('src', '');
	        };

	        //上传文件
	        btnUpload.click(function () {
	            if ($(canvas).data('state') == "no") return layer.msg("请先选择图片"); //验证
	            var imageData = canvas.toDataURL();
	            instance.hide();
	            reset();
	            instance.onCrop(imageData);
	        });

	        reader.onload = function (e) {
	            var src = e.target.result;

	            // 设置比例
	            // var ratio = props.ratio == "free" ? NaN : props.width / props.height

	            $image.attr('src', src).cropper({
	                // aspectRatio: ratio,
	                aspectRatio: props.width / props.height,
	                viewMode: 1,
	                // 裁切时
	                crop: function crop(e) {
	                    brush.clearRect(0, 0, props.width, props.height);
	                    brush.drawImage($(this)[0], e.x, e.y, e.width, e.height, //图形 
	                    0, 0, props.width, props.height
	                    // 0, 0, props.width, props.width * e.height / e.width //画布
	                    );
	                    $(canvas).data('state', "yes");
	                }
	            });
	        };

	        return {
	            render: function render(ops) {
	                _.extend(props, ops);
	                // props.ratio = ops.ratio
	                canvas.width = ops.width;
	                canvas.height = ops.height;
	                overlay.show();
	            },
	            hide: function hide() {
	                return overlay.hide();
	            },
	            onCrop: function onCrop() {
	                return console.log("onCrop回调方法没有实现");
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

	var create = function create(data) {
	    return "<div id=\"myCropper-overlay\" class=\"hide\"><div id=\"myCropper\" class=\"line crop relative\"><span class=\"fa fa-times-circle absolute close\"></span><div class=\"title\"><span class=\"myCropper-title\">\u56FE\u7247\u4E0A\u4F20</span></div><div class=\"myCropper-content\"><div class=\"myCropper-content-left fl\"><div class=\"myCropper-content-title\"><button class=\"myCropper-btn-choose btn\">+\u9009\u62E9\u56FE\u7247</button><input type=\"file\" class=\"hide\" id=\"myCropper-input-choose\" /></div><div class=\"myCropper-origin\"><img class=\"myCropper-origin-image\" style=\"max-width: 100%\" /></div></div><div class=\"myCropper-content-right fl\"><div class=\"title\">\u56FE\u7247\u9884\u89C8</div><div class=\"thumb\"><canvas id=\"myCropper-canvas\" width=\"" + data.width + "\" height=\"" + data.height + "\" data-state=\"no\"></canvas></div><button class=\"myCropper-btn-upload btn\">\u4E0A\u4F20\u56FE\u7247</button></div></div></div></div>";
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
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./cropper-model.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./cropper-model.css");
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
	exports.push([module.id, "#myCropper-overlay {\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    background: gray;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    z-index: 9999;\r\n    text-align: center;\r\n}\r\n\r\n#myCropper {\r\n    position: relative;\r\n    background: white;\r\n    border-radius: 4px;\r\n    margin: auto;\r\n    top: 100px;\r\n    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.15);\r\n    display: inline-block;\r\n    overflow: hidden;\r\n}\r\n\r\n#myCropper > .title {\r\n    font-size: 16px;\r\n    margin-bottom: 15px;\r\n    text-align: left;\r\n    padding: 13px 20px;\r\n    border-bottom: 1px solid rgb(220, 220, 220);\r\n}\r\n\r\n.myCropper-content {\r\n    overflow: hidden;\r\n    background: white;\r\n    margin: 30px;\r\n    text-align: left\r\n}\r\n\r\n.myCropper-content-left {\r\n    border-right: 1px dashed #c7c7c7;\r\n    padding-right: 20px;\r\n}\r\n\r\n.myCropper-btn-choose {\r\n    font-size: 13px;\r\n    background: black;\r\n    border-color: black;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.myCropper-origin {\r\n    width: 400px;\r\n    height: 300px;\r\n    background: rgb(220, 220, 220);\r\n    overflow: hidden;\r\n    float: left;\r\n}\r\n\r\n.myCropper-content-right {\r\n    margin-left: 10px;\r\n    padding-left: 10px;\r\n}\r\n\r\n.myCropper-content-right .title {\r\n    font-size: 16px;\r\n}\r\n\r\n.myCropper-content-right .thumb {\r\n    background: rgb(220, 220, 220);\r\n    margin: 10px 0;\r\n}\r\n#myCropper-canvas {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: block;\r\n}\r\n.myCropper-btn-upload {\r\n    width: 160px !important;\r\n    padding: 10px;\r\n    font-size: 15px;\r\n}\r\n\r\n#myCropper-overlay .close {\r\n    font-size: 26px;\r\n    right: 10px;\r\n    top: 10px;\r\n    cursor: pointer;\r\n}\r\n", ""]);

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