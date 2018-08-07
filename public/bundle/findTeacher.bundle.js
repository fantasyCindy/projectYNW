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

	var profile = __webpack_require__(1);

	/*///////////////////////////////////////////////////////////////////*/

	$(function () {
	    profile.init();
	    profile.add('.avatar');

	    var dataCache = {};

	    var selectMap = {
	        userhover: $('#userhover'),
	        ranking: $('.ranking')
	    };

	    //观点最热排名
	    yndata.getHotRanking({ orderType: -1 }).done(function (data) {
	        console.log("观点最热排名", data);
	        data = _.map(data, function (item, index) {
	            item._value = item.totalViewNum;
	            return item;
	        });
	        var firstData = [data.shift()];
	        dataCache.hotRanking = data;
	        var totalpage = Math.ceil(data.length / 9);
	        $('.hotRanking .totalIndex').text(totalpage);
	        $('.hotRanking .rankContent .first').html(template('rankContent-template', firstData));
	        $('.hotRanking .rankContent .first .item').addClass('select');
	        $('.hotRanking .rankContent .rest .wrap').html(template('rankContent-template', _.take(data, 9)));
	    });

	    //回答问题最多
	    yndata.getHotRanking({ orderType: 0 }).done(function (data) {
	        console.log("回答问题最多", data);
	        data = _.map(data, function (item, index) {
	            item._value = item.answerNum;
	            return item;
	        });
	        var firstData = [data.shift()];
	        dataCache.fireRanking = data;
	        var totalpage = Math.ceil(data.length / 9);
	        $('.fireRanking .totalIndex').text(totalpage);
	        $('.fireRanking .rankContent .first').html(template('rankContent-template', firstData));
	        $('.fireRanking .rankContent .first .item').addClass('select');
	        $('.fireRanking .rankContent .rest').html(template('rankContent-template', _.take(data, 9)));
	    });

	    //直播最火
	    yndata.getHotRanking({ orderType: 1 }).done(function (data) {
	        console.log("直播最火", data);
	        data = _.map(data, function (item, index) {
	            item._value = item.popularity_number;
	            return item;
	        });
	        var firstData = [data.shift()];
	        dataCache.manyRanking = data;
	        var totalpage = Math.ceil(data.length / 9);
	        $('.manyRanking .totalIndex').text(totalpage);
	        $('.manyRanking .rankContent .first').html(template('rankContent-template', firstData));
	        $('.manyRanking .rankContent .first .item').addClass('select');
	        $('.manyRanking .rankContent .rest').html(template('rankContent-template', _.take(data, 9)));
	    });

	    //turn left
	    $('.indicate.left').on('click', function () {
	        var key = $(this).parents('.ranking').attr('class').replace('ranking ', '');
	        changeData(key, -1);
	    });

	    // turn right
	    $('.indicate.right').on('click', function () {
	        var key = $(this).parents('.ranking').attr('class').replace('ranking ', '');
	        changeData(key, 1);
	    });

	    //切换动画
	    function changeData(key, page) {
	        var count = 9;
	        var container = $('.' + key);
	        var data = dataCache[key];
	        var current = container.find('.currentIndex');
	        var totalIndex = Number(container.find('.totalIndex').text());
	        var currentIndex = Number(current.text());
	        var nextIndex = currentIndex + page;
	        if (nextIndex === 0 || nextIndex == totalIndex + 1) {
	            return;
	        }
	        var begin = (nextIndex - 1) * count;
	        var end = nextIndex * count;
	        data = _.slice(data, begin, end);
	        var rest = container.find('.rest');
	        rest.velocity({
	            height: 0
	        }, {
	            duration: 300,
	            easing: 'swing',
	            complete: function complete() {
	                rest.html(template('rankContent-template', data));
	            }
	        }).velocity('reverse');
	        current.text(currentIndex + page);
	    }

	    //是否显示浮动窗口
	    function layerControl() {
	        var timer,
	            showLayer = false,
	            hideLayer = true;

	        selectMap.ranking.on('mouseenter', '.favicon', function () {
	            showLayer = true;
	            var trigger = $(this);
	            timer = setTimeout(function () {
	                if (showLayer) {
	                    showUserDetail(trigger);
	                }
	            }, 300);
	        });

	        selectMap.ranking.on('mouseleave', '.favicon', function () {
	            showLayer = false;
	            timer = setTimeout(function () {
	                if (hideLayer) {
	                    selectMap.userhover.hide();
	                }
	            }, 300);
	        });

	        selectMap.userhover.on('mouseenter', function () {
	            hideLayer = false;
	        });

	        selectMap.userhover.on('mouseleave', function () {
	            selectMap.userhover.hide();
	        });
	    }

	    //显示浮动窗口
	    function showUserDetail(trigger) {
	        $('.userhoveer-beyond').removeClass('userhoveer-beyond');
	        var winWidth = $(window).width();
	        var left = trigger.offset().left + trigger.outerWidth() - 5;
	        var top = trigger.offset().top;
	        var outer = selectMap.userhover.outerWidth();
	        if (outer + left > winWidth) {
	            selectMap.userhover.addClass('userhoveer-beyond');
	            left = left - outer - trigger.outerWidth() + 5;
	            selectMap.userhover.css({ 'left': left + "px", "top": top + "px" });
	        } else {
	            selectMap.userhover.css({ 'left': left + "px", "top": top + "px" });
	        }

	        //showData
	        var data = {
	            userid: "8956",
	            username: "淘气天尊2",
	            type: "金牌投顾",
	            company: "深圳新兰德",
	            place: "江苏南京",
	            certificate: "A0780616010002",
	            skill: ["基本面分析", "技术面分析", "长线操作", "波段操作", "大盘分析"],
	            replay: "1429",
	            satisfaction: "99%",
	            favorate: "5570"
	        };
	        //dataCache[data.userid] = data;
	        selectMap.userhover.show();
	        selectMap.userhover.find('.content').html(template('userhover-template', data));
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    老师简介
	    /.导入模块
	    var Profile = require('../module/ui/teacher-profile.js');

	    //2.初始化
	    Profile.init(); 

	    3.添加
	    //添加触发(CSS选择器)  
	    //模块会从选择器中获取userid值: $(".selector").data('userid'), 确保userid属性值存在
	    Profile.add('.selector') ; 
	    
	 */

	__webpack_require__(2);
	var Care = __webpack_require__(6);

	var profile = function () {

	    var container,
	        items,
	        loading,
	        hide = true,
	        personData = null,
	        indicate_left,
	        indicate_right;

	    //事件
	    var event = function event() {
	        var _this = this;

	        //滑入时取消隐藏
	        container.on('mouseenter', function () {
	            return hide = false;
	        });
	        container.on('mouseleave', function () {
	            container.hide();
	            hide = true;
	        });

	        //关注
	        container.on('click', '.care.false', function () {
	            if (!ynIsLogin) {
	                yn.login.render();
	                return;
	            }
	            Care.add(ynUserId, personData.teacherid).done(function (data) {
	                $(_this).attr('class', 'care true').text("取消关注");
	            });
	        });

	        //取消关注
	        container.on('click', '.care.true', function () {
	            if (!ynIsLogin) {
	                yn.login.render();
	                return;
	            }
	            Care.cancel(ynUserId, personData.teacherid).done(function () {
	                $(_this).attr('class', 'care false').text("关注");
	            });
	        });
	    };

	    var handleData = function handleData(data) {
	        data._style = _.pluck(data.specialtys, 'name').join("，");
	        data._link = "/live/liveDetailLive.htm?teacherid=" + data.teacherid;
	        data._careText = data.isAttention ? "取消关注" : "关注";
	        data._isCare = String(data.isAttention);
	        return data;
	    };

	    var render = function render(trigger, userid) {
	        loading.render();

	        //定位
	        var position = function () {
	            var offset = trigger.offset();
	            var top = offset.top - 15;

	            var left = function () {
	                var _left = offset.left;
	                if (_left > 800) {
	                    //左侧显示
	                    indicate_right.show();
	                    indicate_left.hide();
	                    return _left - 450 - 5;
	                } else {
	                    //右侧显示
	                    indicate_left.show();
	                    indicate_right.hide();
	                    return _left + trigger.width() + 5;
	                }
	            }();

	            container.css({
	                left: left,
	                top: top
	            });
	        }();

	        container.show();

	        $.getJSON("/userinfo/queryUserAllInfo.htm?user_id=" + userid, function (data) {
	            personData = handleData(data);
	            setTimeout(function () {
	                items.html(template('personIntro-template', personData));
	            }, 300);
	        });
	    };

	    return {
	        init: function init() {
	            $('body').append(getTag());
	            container = $('#personIntro');
	            items = container.find('.items');
	            personData = null;
	            indicate_left = container.find('.indicate.left');
	            indicate_right = container.find('.indicate.right');

	            //加载动画
	            loading = new yn.loading();
	            loading.container = items;
	            loading.margin = 80;
	            event();
	        },
	        add: function add(_selector) {
	            var self = this;

	            //触发显示/隐藏
	            $('body').on('mouseenter', _selector, function () {
	                var _this2 = this;

	                hide = false;
	                setTimeout(function () {
	                    if (!hide) {
	                        var userid = $(_this2).data('userid'); //从选择器的属性中获取userid
	                        render($(_this2), userid);
	                    }
	                }, 350);
	            }).on('mouseleave', _selector, function () {
	                hide = true;
	                setTimeout(function () {
	                    if (hide) {
	                        container.hide();
	                    }
	                }, 400);
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    init: profile.init,
	    add: profile.add
	};

	/*///////////////////////////////////////////////////////////////////*/

	function getTag() {
	    return '<div id="personIntro" class="hide">\n        <span id="personIntro-indicate-right" class="indicate right fa fa-caret-right hide"></span>\n        <span id="personIntro-indicate-left" class="indicate left fa fa-caret-left hide"></span>\n        <div class="items"></div>\n    </div>\n    <script type="text/html" id="personIntro-template">\n        <div class="line infoView">\n            <div class="column column1">\n                <div class="teacher-profile-avatar" >\n                    <img src="{{photo}}" style="width:80px;"/>\n                </div>\n            </div>\n            <div class="column column2">\n                <div class="title">\n                    <span class="name">{{username}}</span>\n                    <i class="fa fa-vimeo-square"></i>\n                    <span class="postion">投资顾问</span>\n                </div>\n                <div class="buttons"><button class="care {{_isCare}}">{{_careText}}</button></div>\n                <div class="style">{{_style}}</div>\n            </div>\n        </div>\n        <div class="line countView">\n            <table>\n                <tr>\n                    <td>人气</td>\n                    <td>回答问题</td>\n                    <td>发布观点</td>\n                    <td>直播条数</td>\n                </tr>\n                <tr class="value">\n                    <td>{{popularity_number}}</td>\n                    <td>{{answerCount}}</td>\n                    <td>{{gdcount}}</td>\n                    <td>{{zbcount}}</td>\n                </tr>\n            </table>\n            <a class="ynbtn live-link" href="{{_link}}" target="_blank">看TA直播</a>\n        </div>\n    </script>';
	}

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
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./teacher-profile.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./teacher-profile.css");
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
	exports.push([module.id, "\r\n#personIntro {\r\n    width: 450px;\r\n    position: absolute;\r\n    border: 1px solid rgb(220, 220, 220);\r\n    background: #fff;\r\n    padding: 20px;\r\n    box-shadow: 2px 2px 15px rgba(0, 0, 0, .3);\r\n    border-radius: 2px;\r\n    z-index:1000;\r\n}\r\n\r\n#personIntro .indicate {\r\n    font-size: 36px;\r\n    position: absolute;\r\n    color: white;\r\n    top: 25px\r\n}\r\n\r\n#personIntro .indicate.left {\r\n    left: -10px\r\n}\r\n\r\n#personIntro .indicate.right {\r\n    right: -10px\r\n}\r\n\r\n#personIntro .infoView {\r\n    overflow: hidden;\r\n    margin-bottom: 10px\r\n}\r\n\r\n#personIntro .teacher-profile-avatar {\r\n    width: 80px ;\r\n    height: 80px;\r\n    overflow: hidden\r\n}\r\n\r\n#personIntro .teacher-profile-avatar img {\r\n    width: 80px;\r\n}\r\n\r\n#personIntro .infoView .column2 {\r\n    margin-left: 10px\r\n}\r\n\r\n#personIntro .infoView .title {\r\n    font-size: 18px;\r\n    margin-bottom: 10px\r\n}\r\n\r\n#personIntro .infoView .title .postion {\r\n    font-size: 12px\r\n}\r\n\r\n#personIntro .infoView .title .fa {\r\n    font-size: 12px;\r\n    color: #d72621\r\n}\r\n\r\n#personIntro .infoView .buttons .care {\r\n    background: black;\r\n    border-color: black\r\n}\r\n\r\n#personIntro .infoView .buttons .sign {\r\n    background: rgb(200, 200, 200);\r\n    border-color: rgb(200, 200, 200)\r\n}\r\n\r\n#personIntro .infoView .style {\r\n    margin-top: 10px;\r\n    width: 300px\r\n}\r\n\r\n#personIntro .infoView .style .item {\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    padding: 2px\r\n}\r\n\r\n#personIntro .infoView > * {\r\n    float: left\r\n}\r\n\r\n#personIntro .countView {\r\n    border-top: 1px solid rgb(200, 200, 200);\r\n    padding-top: 15px;\r\n    position: relative\r\n}\r\n\r\n#personIntro .countView table {\r\n    width: 280px\r\n}\r\n\r\n#personIntro .countView td {\r\n    text-align: center;\r\n    padding: 3px 0;\r\n    border-left: 1px solid rgb(220, 220, 220)\r\n}\r\n\r\n#personIntro .countView .value td {\r\n    font-size: 21px;\r\n    font-weight: bold;\r\n    color: #f97b02\r\n}\r\n\r\n#personIntro .countView td:first-child {\r\n    border: none\r\n}\r\n\r\n#personIntro .countView .live-link {\r\n    position: absolute;\r\n    top: 25px;\r\n    right: 5px\r\n}", ""]);

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
/***/ function(module, exports) {

	"use strict";

	//关注别表
	var list = function list(ops) {
	    ops = _.extend({
	        userid: ynUserId,
	        page: 1,
	        row: 20
	    }, ops);

	    var send = {
	        user_id: ops.userid,
	        currentPage: ops.page,
	        pageSize: ops.row
	    };

	    var defer = $.Deferred();
	    $.getJSON("/center/attentionList.htm", send, function (data) {
	        data.pageNumber = _.max([1, +data.total / ops.row]);
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

	//添加关注
	var add = function add(userid, teacherid) {
	    var defer = $.Deferred();
	    $.post("/center/attention.htm", { user_id: userid, teacherid: teacherid }, function (data) {
	        if (data == "success") {
	            layer.msg("关注成功");
	            defer.resolve();
	        }
	        if (data == "18") {
	            layer.msg("老师不能关注老师");
	        }
	    });
	    return defer.promise();
	};

	//取消关注
	var cancel = function cancel(userid, teacherid) {
	    var defer = $.Deferred();
	    $.post("/center/attention.htm", { user_id: userid, teacherid: teacherid }, function (data) {
	        if (data == "success") {
	            layer.msg("取消成功");
	            defer.resolve();
	        }
	    });
	    return defer.promise();
	};

	module.exports = {
	    add: add,
	    cancel: cancel,
	    list: list
	};

/***/ }
/******/ ]);