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
/******/ 	__webpack_require__.p = "./public/budnle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Checkbox = __webpack_require__(1),
	    Slider = __webpack_require__(6),
	    Calendar = __webpack_require__(9),
	    cropper = __webpack_require__(12),
	    Day = __webpack_require__(15);

	/*///////////////////////////////////////////////////////////////////*/

	//获取组合ID
	var __combinationid = function () {
	    var match = location.href.match(/\d+$/);
	    if (!match) return null;
	    return match[0];
	}();

	$(function () {

	    var peep = $("#peep_price"); //瞄一眼
	    var textarea = $('#composite-intro textarea'); //组合简介
	    var isFreePrice = false;
	    var el_name = $("#fName"); //组合名称
	    var el_cover; //组合封面
	    var el_intro = $("#fIntro");

	    yn.wordCount(textarea, {
	        limit: 100,
	        indicate: $('#info-word-count')
	    });

	    //操作风格
	    var fStyle = new Checkbox({
	        container: $('#composite-style .checkboxs'),
	        values: [{ value: 0, text: "保守型" }, { value: 1, text: "稳健性" }, { value: 2, text: "激进型" }]
	    }).render();

	    //最长期限
	    var fMaxTime = new Checkbox({
	        container: $('#max-life .checkboxs'),
	        values: [{ value: 30, text: "30天" }, { value: 60, text: "60天" }, { value: 90, text: "90天" }, { value: 180, text: "180天" }],
	        onChange: function onChange(values) {
	            var val = beginTime.val();
	            if (val) {
	                var day = new Day(val);
	                endTime.text(day.add(values[0]));
	            }
	        }
	    }).render();

	    //免费订阅
	    var freeFeed = new Checkbox({
	        container: $('#feedPayType'),
	        values: [{ value: "pay", text: "付费订阅" }, { value: "free", text: "免费订阅" }],
	        select: 0,
	        onChange: function onChange(value) {
	            switchPayType(value);
	        }
	    }).render();

	    var switchPayType = function switchPayType(value) {
	        var wrap = $("#FeedPayType-items");
	        value == "pay" ? wrap.show() : wrap.hide();
	        isFreePrice = value == 'free' ? true : false;
	    };

	    //日历
	    var beginTime = $('#beginTime');
	    var endTime = $("#endTime");
	    Calendar.add(beginTime, function (info) {
	        beginTime.val(info.day);
	        var time = new Day(info.day);
	        endTime.text(time.add(fMaxTime.getValues()[0]));
	    });

	    //止损线
	    var downline = new Slider({
	        range: [-30, 3],
	        color: "green",
	        container: $('#downline'),
	        unit: "%",
	        formatText: ["-30%", "3%"],
	        onMove: function onMove(e) {
	            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
	        }
	    }).render();

	    //目标收益
	    var income = new Slider({
	        container: $('#income'),
	        range: [5, 100],
	        unit: "%",
	        color: "red",
	        formatText: ["5%", "100%"],
	        onMove: function onMove(e) {
	            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
	        }
	    }).render();

	    //订阅价
	    var feedPrice = new Slider({
	        range: [10, 6400],
	        container: $('#feedPrice'),
	        color: "blue",
	        unit: "牛币",
	        onMove: function onMove(e) {
	            var val = e.range[0] + Math.ceil(e.sum * e.percent);
	            e.result.val(val);
	            validatePeep(val);
	        }
	    }).render();

	    peep.change(function () {
	        var feed = +feedPrice.result.val();
	        validatePeep(feed);
	    });

	    //验证瞄一眼价格
	    function validatePeep(feed) {
	        var max = Math.floor(_.min([100, feed * 0.1]));
	        var min = 1;
	        var val = +peep.val();
	        if (val > max) {
	            peep.val(max);
	            return;
	        }
	        if (val < min) {
	            return peep.val(1);
	        }
	        peep.val(Math.floor(peep.val()));
	    }

	    //显示提示
	    $('.slider .item').on('mouseenter', '.doubt', function () {
	        $(this).parents('.item').find('.slider-tip').show();
	    }).on('mouseleave', '.doubt', function () {
	        $(this).parents('.item').find('.slider-tip').hide();
	    });

	    //组合封面
	    cropper.init($("#cropperContainer"));
	    el_cover = $(".myCropper-result-image");
	    cropper.onCrop = function (imageData) {
	        $.post("/auth/user/ImgUpload.htm", {
	            dataImg: imageData,
	            user_id: ynUserId
	        }, function (data) {
	            if (data.status == "success") {
	                layer.msg("图片上传成功");
	                var src = data.returnPath;
	                cropper.showThumbnail(src);
	            }
	        }, 'json');
	    };

	    //submit
	    var submit = function () {
	        var container = $('.submit');
	        var button = container.find('button');

	        //提交
	        button.click(_.debounce(function () {
	            submitData();
	        }, 2000, { leading: true, trailing: false }));

	        var validateTable = {
	            a: "组合标题4-20个字",
	            b: "请上传组合封面",
	            c: "组合简介限制为10-100字字符",
	            d: "运行开始时间不能为空",
	            e: "运行开始时间不能小于当前时间",
	            f: "请填写瞄一眼价格"
	        };

	        //提交数据
	        function submitData() {

	            //表单
	            var val_title = _.trim(el_name.val()); //组合名称
	            var val_cover = el_cover.attr('src'); //组合封面
	            var val_intro = _.trim(el_intro.val()); //组合简介
	            var val_btime = beginTime.val(); //开始时间
	            var val_offset = new Day(val_btime).offset(); //运行时长
	            var val_etime = endTime.text(); //结束时间
	            var val_peep = +peep.val();

	            var query = [{ key: "a", assert: !val_title || val_title.length > 20 || val_title < 4 }, { key: "b", assert: !val_cover }, { key: "c", assert: !val_intro || val_intro.length < 10 }, { key: "d", assert: !val_btime }, { key: "e", assert: val_offset < 0 }, { key: "f", assert: !val_peep }];

	            var filters = _.filter(query, function (item) {
	                return item.assert;
	            });
	            if (filters.length > 0) {
	                layer.msg(validateTable[filters[0].key]);
	                return;
	            }

	            var send = {
	                combinationid: __combinationid,
	                combination_name: val_title,
	                combination_des: val_intro,
	                combination_pic: val_cover,
	                combination_style: fStyle.getValues()[0],
	                combination_maxterm: fMaxTime.getValues()[0],
	                create_id: +ynUserId,
	                teacherid: +ynTeacherId,
	                starttime_str: val_btime,
	                endtime_str: val_etime,
	                stop_line: +downline.result.val(), //止损线
	                target_revenue: +income.result.val(), //目标收益
	                order_price: isFreePrice ? 0 : +feedPrice.result.val(), //订阅价格
	                peep_price: isFreePrice ? 0 : +val_peep //瞄一眼价格
	            };

	            $.post("/composite/compositeCreate.htm", send, function (data) {
	                if (data == "success") {
	                    layer.msg("组合创建成功");
	                    setTimeout(function () {
	                        window.close();
	                    }, 1000);
	                } else {
	                    throw "error : " + data;
	                }
	            });
	        }
	    }();

	    //组合编辑时回填数据
	    var fillData = function () {

	        if (!__combinationid) return;
	        var getCompositeData = function getCompositeData() {
	            var defer = $.Deferred();
	            $.ajax({
	                data: {
	                    user_id: ynUserId,
	                    combinationid: __combinationid
	                },
	                dataType: 'json',
	                url: "/combination/combinationProfile.htm",
	                type: "GET",
	                success: function success(data) {
	                    console.log("组合数据=", data);
	                    data = data.data;
	                    var isSelf = +data.teacherid == +ynTeacherId && +data.status === 2;
	                    if (isSelf) {
	                        defer.resolve(data);
	                        return;
	                    }
	                    defer.reject();
	                },
	                fail: function fail() {
	                    defer.reject();
	                }
	            });
	            return defer.promise();
	        };

	        //填充数据
	        getCompositeData().done(function (data) {
	            __combinationid = data.combinationid;
	            el_name.val(data.combination_name);
	            el_intro.val(data.combination_des);
	            cropper.showThumbnail(data.combination_pic);
	            fStyle.select(data.combination_style);
	            fMaxTime.select(_.indexOf([30, 60, 90, 180], data.combination_maxterm));
	            beginTime.val(data.starttime);
	            var isFree = +data.order_price === 0;
	            if (isFree) freeFeed.select(1) && switchPayType('free');
	            if (!isFree) {
	                feedPrice.setOffset(data.order_price);
	                peep.val(data.peep_price);
	            }
	            downline.setOffset(data.stop_line);
	            income.setOffset(data.target_revenue);
	        });
	    }();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 复选框
	 * 

	var checkboxModule = require('../module/ui/checkbox.js');
	var checkbox = checkboxModule.checkbox;
	new checkbox({
	    container: $('body'),
	    values: [{ value: 0, text: "hehe" }],
	    select: 0,
	    multi: false
	}).render()

	 * 
	 * 
	 */

	__webpack_require__(2);

	var checkbox = function checkbox(ops) {
	    this.props = _.extend({
	        container: null,
	        values: null, //文字内容
	        select: 0, //默认选中第一个
	        multi: false, //是否可以多选
	        onChange: function onChange() {}
	    }, ops);
	};

	checkbox.prototype = {
	    render: function render() {
	        var _this = this;
	        var self = this.props;

	        //验证
	        var validate = function () {
	            if (!self.container) {
	                layer.msg("ynUI.checkbox : container not defined");
	            }
	        }();

	        //显示
	        var tags = function () {
	            return _.map(self.values, function (item, index) {
	                var select = self.select === index ? "select" : "";
	                return "<span class=\"ynui-checkbox-item item" + index + "\" data-value=\"" + item.value + "\">\n                    <span class=\"icon outer\"><span class=\"icon inner " + select + "\" data-value=\"" + item.value + "\"></span></span>\n                    <span class=\"txt\">" + item.text + "</span>\n                </span>";
	            });
	        }();

	        self.container.html(tags);

	        //事件
	        var event = function () {
	            self.container.on('click', '.ynui-checkbox-item .outer', function () {
	                var items = $(this).parent().parent();
	                var inner = $(this).find('.inner');
	                if (self.multi) {
	                    inner.toggleClass('select');
	                } else {
	                    items.find('.inner.select').removeClass('select');
	                    inner.addClass("select");
	                }
	                self.onChange(_this.getValues());
	            });
	        }();

	        return this;
	    },
	    getValues: function getValues() {
	        var result = [];
	        var self = this.props;
	        self.container.find('.ynui-checkbox-item').each(function () {
	            if ($(this).find('.select').length > 0) {
	                result.push($(this).data('value'));
	            }
	        });
	        return result;
	    },
	    select: function select(i) {
	        if (i >= this.props.values.length) return;
	        this.props.container.find('.ynui-checkbox-item .select').removeClass('select');
	        this.props.container.find(".item" + i + " .inner").addClass('select');
	        return this;
	    }
	};

	module.exports = checkbox;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

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
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./checkbox.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./checkbox.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".ynui-checkbox-item {\n    margin-right: 10px;\n}\n\n.ynui-checkbox-item .outer {\n    width: 16px;\n    height: 16px;\n    display: inline-block;\n    border: 1px solid rgb(150, 150, 150);\n    position: relative;\n    top: 3px;\n    border-radius: 50%;\n    margin-right: 3px;\n    cursor: pointer;\n    background: rgb(245, 245, 245);\n}\n\n.ynui-checkbox-item .inner {\n    width: 6px;\n    height: 6px;\n    display: inline-block;\n    background: white;\n    border-radius: 50%;\n    position: absolute;\n    left: 4px;\n    top: 4px;\n}\n\n.ynui-checkbox-item .inner.select {\n    background: red;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 滑块
	 *
	 * 选项
	 
	    //创建对象
	    var o = new slider({
	        container: $('#income'),
	        range: [5, 100],  //默认是[1, 100]
	        unit: "%", //单位
	        color: "red", //支持["black", green", "red", "blue"] 
	        formatText: ["5%", "100%"], //两端字符格式化

	        //滑动事件
	        onMove: function(e) {
	            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
	        }
	    }).render();

	    //方法:设置值
	    o.setOffset(20)

	 */

	__webpack_require__(7);

	var slider = function slider(ops) {
	    this.props = _.extend({
	        container: null,
	        range: [1, 100],
	        color: "black",
	        unit: "",
	        formatText: null,
	        onMove: function onMove(e) {}
	    }, ops);

	    this.props.formatText = ops.formatText || this.props.range;
	};

	slider.prototype = {
	    result: null,
	    render: function render() {
	        var self = this.props;
	        var _this = this;
	        var sum = Math.abs(self.range[1] - self.range[0]);
	        var tags = function () {
	            var left = self.formatText[0];
	            var right = self.formatText[1];
	            return "<div class=\"ynUI-slider\">\n                        <span class=\"indicate-left-text indicate-text\">" + left + "</span>\n                        <div class=\"inline track\">\n                            <span class=\"selectbar " + self.color + "\"></span>\n                            <span class=\"scrollbar\">\n                                <span class=\"indicate\"></span>\n                            </span>\n                        </div>\n                        <span class=\"indicate-right-text indicate-text\">" + right + "</span>\n                        <input type=\"text\" class=\"result\" value=\"" + self.range[0] + "\"/>\n                        <span class=\"unit\">" + self.unit + "</span>\n                    </div>";
	        }();
	        self.container.html(tags);
	        this.result = self.container.find('.result');
	        var lastResultValue = self.range[0]; //保存上一次输入的值

	        //事件
	        var event = function () {
	            var drag = false;
	            var track = self.container.find('.track');
	            var scrollbar = self.container.find('.scrollbar');
	            var selectbar = self.container.find('.selectbar');

	            var width = track.width();
	            var begin = track.offset().left;
	            var end = begin + width;

	            function setPosition(p) {
	                scrollbar.css('left', p);
	                selectbar.css('width', p);
	            }

	            scrollbar.on('mousedown', function () {
	                drag = true;
	            });

	            $('body').on('mousemove', function (e) {
	                if (!drag) return;
	                var x = Math.floor(e.pageX);
	                if (x > end || x < begin) return;

	                var offset = x - begin;
	                setPosition(offset);

	                //回调
	                self.onMove({
	                    result: _this.result, //结果
	                    percent: offset / width, //比例值
	                    sum: sum, //取值总和
	                    range: self.range
	                });
	            });

	            $('body').on('mouseup', function () {
	                drag = false;
	            });

	            //直接输入
	            _this.result.change(function () {
	                var val = $(this).val();
	                if (val === "") {
	                    //如果为空, 设置为上一次输入的值
	                    $(this).val(lastResultValue);
	                }
	                val = +val;
	                var inRange = _.inRange(val, self.range[0], self.range[1]);
	                if (inRange) {
	                    var p = (val + Math.abs(self.range[0])) / sum * width;
	                    setPosition(p);
	                    lastResultValue = val;
	                } else {
	                    $(this).val(lastResultValue);
	                }
	            });
	        }();

	        return this;
	    },
	    setOffset: function setOffset(offset) {
	        var inRange = _.inRange(offset, this.props.range[0], this.props.range[1]);
	        if (inRange) {
	            this.result.val(offset);
	            this.result.trigger('change');
	        } else {
	            layer.msg("ynui.slider : offset value is invalid ");
	        }
	    }
	};

	module.exports = slider;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./slider.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./slider.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".ynUI-slider {\r\n    margin: 0 10px;\r\n    display: inline-block;\r\n}\r\n\r\n.ynUI-slider .track {\r\n    width: 500px;\r\n    height: 20px;\r\n    background: rgb(230, 230, 230);\r\n    position: relative;\r\n    top: 4px;\r\n    border-radius: 2px;\r\n}\r\n\r\n.ynUI-slider .track .selectbar {\r\n    width: 0;\r\n    height: 20px;\r\n    background: rgb(160, 160, 160);\r\n    background: #283048;\r\n    background: -webkit-linear-gradient(to left, #283048, #859398);\r\n    background: linear-gradient(to left, #283048, #859398);\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n}\r\n\r\n.ynUI-slider .track .selectbar.red {\r\n    background: #FF4E50;\r\n    background: -webkit-linear-gradient(to left, #FF4E50, #F9D423);\r\n    background: linear-gradient(to left, #FF4E50, #F9D423);\r\n}\r\n\r\n.ynUI-slider .track .selectbar.blue {\r\n    background: #02AAB0;\r\n    background: -webkit-linear-gradient(to left, #02AAB0, #00CDAC);\r\n    background: linear-gradient(to left, #02AAB0, #00CDAC);\r\n}\r\n\r\n.ynUI-slider .track .selectbar.green {\r\n    background: #56ab2f;\r\n    background: -webkit-linear-gradient(to left, #56ab2f, #a8e063);\r\n    background: linear-gradient(to left, #56ab2f, #a8e063);\r\n}\r\n\r\n.ynUI-slider .scrollbar {\r\n    width: 10px;\r\n    height: 25px;\r\n    background: rgb(60, 60, 60);\r\n    position: absolute;\r\n    top: -2px;\r\n    cursor: pointer;\r\n}\r\n\r\n.ynUI-slider .scrollbar .indicate {\r\n    width: 3px;\r\n    height: 12px;\r\n    display: inline-block;\r\n    position: relative;\r\n    top: 6px;\r\n    left: 3px;\r\n    border-left: 1px solid rgb(150, 150, 150);\r\n    border-right: 1px solid rgb(150, 150, 150);\r\n}\r\n\r\n.ynUI-slider .noselect {\r\n    user-select: none;\r\n    -webkit-user-select: none;\r\n    margin: 0 10px;\r\n}\r\n\r\n.ynUI-slider .result {\r\n    width: 50px;\r\n    background: rgb(245, 245, 245);\r\n    padding: 3px;\r\n    display: inline-block;\r\n    margin-left: 5px;\r\n    text-align: center;\r\n    font-weight: bold;\r\n    font-size: 13px;\r\n}\r\n\r\n.ynUI-slider .indicate-text {\r\n    display: inline-block;\r\n    width: 50px;\r\n    text-align: center;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 日历模块
	 
	    依赖 : jquery, lodash(padLeft, map, extend)

	    //导入模块
	    var calendar = require('../module/ui/calendar.js');
	 
	    ---- 用法1:默认取值 info.day
	    calendar.add($el);

	    ---- 用法2: 使用回调函数: 自定义取值
	    calendar.add($el, function(info) {
	        $el.val(info.time)
	    })

	    ------------------------------------------ 
	       
	    info = { 
	        year : "2016",
	        month : "2016-09", 
	        day : "2016-09-10", 
	        time : "2016-09-10 18:20:39"
	    }

	 */

	__webpack_require__(10);

	var calendar = function () {
	    var $container,
	        $trigger,
	        show = false,
	        $year,
	        $month,
	        $date,
	        delegate = {
	        select: function select(info) {}
	    };

	    //add tag to dom
	    var addToDom = function addToDom() {
	        var caltag = '<div id="yncalendar">' + '<table><thead>' + '<tr><th class="info" colspan="7"><span class="leftMonth">《</span><span><span class="year"></span>年<span class="month"></span>月</span><span class="rightMonth">》</span></th></tr>' + '<tr class="week-title"><th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th></tr>' + '</thead>' + '<tbody>' + '<tr class="firstRow"><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '<tr id="lastRow"><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' + '</tbody>' + '</table>' + '</div>';

	        $('body').append(caltag);
	        $container = $("#yncalendar");
	        $year = $container.find('.year');
	        $month = $container.find('.month');
	        $date = $container.find('.date');
	    };

	    var render = function render(year, month) {
	        $year.text(year);
	        $month.text(month);
	        var now = getToday();

	        var dayCount = getCountInMonth(year, month);
	        var dayTags = function () {
	            var tag = [];
	            for (var i = 1; i <= dayCount; i++) {
	                tag.push('<p class="value">' + i + '</p>');
	            }
	            return tag;
	        }();

	        //reset
	        $date.empty();
	        $('.today').removeClass('today');

	        //判断1号是星期几
	        var offset = firstDayInMonth(year, month);
	        for (var i = 0; i < dayCount; i++) {
	            $date.eq(offset + i).html(dayTags[i]);
	        }

	        //着色
	        if (+year == now[0] && +month == now[1]) {
	            $date.eq(now[2] - 1 + offset).addClass("today");
	        }

	        $('#lastRow').show();
	        if ($('#lastRow').find('.value').length < 1) {
	            $('#lastRow').hide();
	        }

	        //显示
	        $container.css({
	            'display': 'inline-block',
	            'top': $trigger.offset().top + $trigger.outerHeight() + 'px',
	            'left': $trigger.offset().left + 'px'
	        });
	    };

	    return {
	        init: function init() {
	            addToDom();

	            //点击日期
	            $container.on('click', '.date', function () {
	                var t = getToday({ pad: true }); //["2016", "09", "09", "18", "20", "36"];

	                var _year = _.padLeft($year.text(), 2, "0");
	                var _month = _.padLeft($month.text(), 2, "0");
	                var _day = _.padLeft($(this).find('.value').text(), 2, "0");
	                var _date = [_year, _month, _day].join('-');
	                var _time = _date + " " + [t[3], t[4], t[5]].join(":");

	                var result = {
	                    year: _year,
	                    month: [_year, _month].join('-'),
	                    day: _date,
	                    time: _time
	                };
	                delegate.select(result);
	                $container.hide();
	            });

	            $container.on('mouseenter', function () {
	                show = true;
	            }).on('mouseleave', function () {
	                show = false;
	                $container.hide();
	            });

	            //切换月份
	            $container.on('click', ".leftMonth", function () {
	                var year = +$year.text();
	                var month = +$month.text();
	                var time = getBeforeMonth(year, month);
	                render(time[0], time[1]);
	            });

	            $container.on('click', ".rightMonth", function () {
	                var year = +$year.text();
	                var month = +$month.text();
	                var time = getAfterMonth(year, month);
	                render(time[0], time[1]);
	            });

	            return this;
	        },
	        add: function add($el, handler) {
	            $el.focus(function () {
	                var now = getToday();
	                $trigger = $(this);
	                render(now[0], now[1]);
	                delegate.select = handler || function (info) {
	                    $trigger.val(info.day);
	                };
	            });

	            $el.blur(function () {
	                if (!show) {
	                    $container.hide();
	                }
	            });
	        }
	    };
	}();

	calendar.init();

	/*///////////////////////////////////////////////////////////////////*/

	function getToday(ops) {
	    ops = _.extend({
	        pad: false
	    }, ops);

	    var now = new Date();
	    var today = Number(now.getDate());
	    var month = Number(now.getMonth() + 1);
	    var year = Number(now.getFullYear());
	    var h = +now.getHours();
	    var m = +now.getMinutes();
	    var s = +now.getSeconds();

	    var result = [year, month, today, h, m, s];

	    if (ops.pad) {
	        return _.map(result, function (item) {
	            item = _.padLeft(item, 2, "0");
	            return item;
	        });
	    }

	    return result;
	}

	//下一个月
	function getAfterMonth(year, month) {
	    if (month == 12) {
	        return [++year, 1];
	    }
	    return [year, ++month];
	}

	//上一个月
	function getBeforeMonth(year, month) {
	    if (month == 1) {
	        return [--year, 12];
	    }
	    return [year, --month];
	}

	//每个月1号星期几
	function firstDayInMonth(year, month) {
	    var date = new Date(year, month - 1, 1);
	    return date.getDay();
	}

	//获取每个月的天数
	function getCountInMonth(year, month) {
	    var monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	    if (year % 400 === 0) {
	        monthArray[1] = 29;
	    } else if (year % 4 === 0 && year % 100 !== 0) {
	        monthArray[1] = 29;
	    }
	    return monthArray[month - 1];
	}

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = calendar;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./calendar.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./calendar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\r\n#yncalendar {\r\n    -webkit-user-select: none;\r\n    display: none;\r\n    position: absolute;\r\n    font-size: 14px;\r\n    font-family: \"SimHei,arial,helvetica,sans-serif,Microsoft YaHei\";\r\n    border: 1px solid #ebebeb;\r\n    border-radius: 10px;\r\n    overflow: hidden;\r\n    background: white;\r\n    z-index: 10000\r\n}\r\n\r\n#yncalendar .ynhide {\r\n    display: none\r\n}\r\n\r\n#yncalendar table {\r\n    margin: 20px;\r\n    border-collapse: collapse\r\n}\r\n\r\n#yncalendar td,\r\n#yncalendar th {\r\n    text-align: center;\r\n    padding: 5px 10px;\r\n    border: 1px solid #e6e6e6\r\n}\r\n\r\n#yncalendar .info {\r\n    padding: 10px 10px;\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar .info span {\r\n    display: inline-block;\r\n    margin: 0 5px\r\n}\r\n\r\n#yncalendar .info span span {\r\n    font-size: 18px\r\n}\r\n\r\n#yncalendar .info .leftMonth {\r\n    cursor: pointer;\r\n    float: left;\r\n    margin-right: 10px\r\n}\r\n\r\n#yncalendar .info .rightMonth {\r\n    cursor: pointer;\r\n    float: right;\r\n    margin-left: 10px\r\n}\r\n\r\n#yncalendar td.date {\r\n    cursor: pointer\r\n}\r\n\r\n#yncalendar td.date:hover {\r\n    background: #f0f0f0\r\n}\r\n\r\n#yncalendar td.today {\r\n    border-color: #E12B51;\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar td.today:hover {\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar .week-title th {\r\n    background: #F5F5F5\r\n}", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	     ------------------ 图片裁剪 ------------------------

	    cropper.init() ---初始化
	    cropper.onCrop() ---裁切回调
	    cropper.showThumbnail() ---显示缩略图

	    ------------------- Sample -----------------------

	    <link  href="/public/css/cropper.min.css" rel="stylesheet"  />
	    <script src="/public/js/cropper.min.js"></script>

	     //导入模块
	     var cropper = require('../module/ui/cropper.js');
	     $(function(){

	        //初始化时需要传入容器对象
	         cropper.init($el); 

	         cropper.onCrop = function(imageData) {
	             $.post("/auth/user/ImgUpload.htm", {dataImg: imageData}, function(data) {
	                 if (data.status == "success") {
	                     cropper.showThumbnail(data.src);
	                 }
	             }, 'json')
	         } 
	     }) 

	 */

	__webpack_require__(13);

	var cropper = function () {
	    var uploadResult, uploadWrap, cover, fileInput, $image;
	    return {
	        init: function init(cropperContainer) {
	            var self = this;

	            var tag = '<div id="myCropper" class="line crop">\n                            <div class="title">\n                                <span class="myCropper-title">组合封面</span>\n                                <button class="myCropper-btn-choose">+选择图片</button>\n                                <input type="file" class="hide" id="myCropper-input-choose" />\n                            </div>\n                            <div class="myCropper-result hide">\n                                <img class="myCropper-result-image" />\n                            </div>\n                            <div class="myCropper-content">\n                                <div class="myCropper-origin">\n                                    <img class="myCropper-origin-image" style="max-width: 100%" />\n                                </div>\n                                <div class="myCropper-canvas-container inline">\n                                    <div class="title">图片预览</div>\n                                    <div class="thumb">\n                                        <canvas id="myCropper-canvas" width="160" height="90" data-state="no"></canvas>\n                                    </div>\n                                    <button class="myCropper-btn-upload">上传图片</button>\n                                </div>\n                            </div>\n                        </div>';

	            cropperContainer.html(tag);

	            var container = $("#myCropper");
	            var canvas = document.getElementById('myCropper-canvas');
	            var brush = canvas.getContext('2d');
	            var reader = new FileReader();

	            //选择文件
	            var button = container.find('.myCropper-btn-choose');
	            var btnUpload = container.find('.myCropper-btn-upload');

	            $image = container.find('.myCropper-origin-image');
	            fileInput = $('#myCropper-input-choose');
	            uploadResult = container.find('.myCropper-result');
	            cover = $(".myCropper-result-image");
	            uploadWrap = container.find('.myCropper-content');

	            button.click(function () {
	                fileInput.click();
	                uploadResult.hide();
	                uploadWrap.show();
	                reset();
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
	                brush.clearRect(0, 0, 160, 90);
	                cover.attr('src', '');
	            };

	            //上传文件
	            btnUpload.click(function () {
	                //验证
	                if ($(canvas).data('state') == "no") {
	                    layer.msg("请先选择图片");
	                    return;
	                }
	                var imageData = canvas.toDataURL();
	                self.onCrop(imageData);
	            });

	            reader.onload = function (e) {
	                var src = e.target.result;
	                $image.attr('src', src).cropper({
	                    aspectRatio: 16 / 9,
	                    viewMode: 1,
	                    crop: function crop(e) {
	                        brush.drawImage($(this)[0], e.x, e.y, e.width, e.height, 0, 0, 160, 90);

	                        $(canvas).data('state', "yes");
	                    }
	                });
	            };
	        },
	        showThumbnail: function showThumbnail(src) {
	            uploadWrap.hide();
	            uploadResult.show();
	            cover.attr('src', src);
	            $image.cropper('destroy');
	        },
	        onCrop: function onCrop() {
	            throw "cropper error : onCrop not override...";
	        }
	    };
	}();

	module.exports = cropper;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./cropper.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./cropper.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#myCropper {\r\n    position: relative;\r\n    overflow: hidden;\r\n}\r\n\r\n#myCropper .title {\r\n    font-size: 16px;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.myCropper-btn-choose {\r\n    font-size: 13px;\r\n    margin-left: 15px;\r\n    background: black;\r\n    border-color: black;\r\n}\r\n\r\n.myCropper-origin {\r\n    width: 420px;\r\n    height: 270px;\r\n    background: rgb(220, 220, 220);\r\n    overflow: hidden;\r\n    float: left;\r\n}\r\n\r\n.myCropper-canvas-container {\r\n    float: left;\r\n    margin-left: 20px;\r\n}\r\n\r\n.myCropper-canvas-container .thumb {\r\n    background: rgb(220, 220, 220);\r\n    width: 160px;\r\n    height: 90px;\r\n    margin: 10px 0;\r\n}\r\n\r\n\r\n/**/\r\n\r\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

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
	    }).join("/") + " 00:00:00";
	    return Date.parse(time);
	};

	var ___day = function ___day(val) {
	    this.stamp = function () {
	        if (typeof val != "string") {
	            console.log(val + "不是字符类型");
	            return;
	        }
	        if (!isDay(val)) {
	            console.log(val + "格式不正确");
	            return;
	        }

	        var match = isDay(val);
	        var timestamp = getStamp([match[1], match[2], match[3]]);

	        //日期是否有效
	        if (!!!timestamp) {
	            console.log(val + "不是有效的日期");
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
	};

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = ___day;

/***/ }
/******/ ]);