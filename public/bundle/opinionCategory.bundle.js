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

	"use strict";

	var total = __total / 10;
	var href = location.href;
	var __href = window.location.href;
	var cateMatch = __href.match(/\/([a-z]+)\//);
	var pageMatch = __href.match(/\d+$/);
	var __page = pageMatch ? pageMatch[0] : 1;
	var __cate = cateMatch ? cateMatch[1] : "dapan";

	var type = cateMatch ? cateMatch[1] : "";
	console.log("type", type);
	var profile = __webpack_require__(2); //鼠标放到老师头像是显示详细


	if (!(__cate && _.inRange(__page, total))) {
	    location.href = "" + opinion_path + __cate + "/?pn=1";
	}

	var __class = {
	    "鉴股": "jiangu",
	    "题材": "ticai",
	    "大盘": "dapan",
	    "股票学院": "gupiaoxueyuan"
	};

	$(function () {
	    $('.href').each(function () {
	        var articleid = $(this).data('articleid');
	        var createid = $(this).data('createid');
	        if (!type) {
	            $(this).attr('href', opinion_path + "opinion/" + articleid + ".htm");
	        } else {
	            $(this).attr('href', "" + opinion_path + type + "/" + createid + "/" + articleid + ".htm");
	        }
	    });

	    $('.noteType').each(function () {
	        var type = $(this).data('type');
	        var id = $(this).data('id');
	        $(this).attr('href', "" + opinion_path + __class[type] + "/" + id + "/");
	    });

	    var pagination = yn.bootpag('.pagination');
	    pagination.bootpag({ page: __page, total: total });
	    pagination.on('page', function (e, num) {
	        location.href = "" + opinion_path + __cate + "/?pn=" + num;
	    });

	    $('.opinionType-item').each(function (i, el) {
	        if ($(this).hasClass(__cate)) {
	            $(this).addClass('select');
	        }
	    });

	    profile.init();
	    profile.add('.avatar');
	    onSelect('观点');
	});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    老师简介
	    /.导入模块
	    var Profile = require('../module/ui/teacher-profile.js');

	    //2.初始化
	    Profile.init(); 

	    3.添加
	    //添加触发(CSS选择器)  
	    //模块会从选择器中获取teacherid值: $(".selector").data('teacherid'), 确保teacherid属性值存在
	    Profile.add('.selector') ; 
	    
	 */

	__webpack_require__(3);
	var Care = __webpack_require__(7);
	var error = __webpack_require__(8);

	var profile = function () {

	    var container,
	        items,
	        loading,
	        hide = true,
	        personData = null,
	        indicate_left,
	        indicate_right;

	    var updateCare = function updateCare() {};

	    //事件
	    var event = function event() {

	        //滑入时取消隐藏
	        container.on('mouseenter', function () {
	            return hide = false;
	        });
	        container.on('mouseleave', function () {
	            container.hide();
	            hide = true;
	            personData = null;
	        });

	        //关注
	        container.on('click', '.care', function () {
	            if (!ynIsLogin) return yn.login.render();
	            var btn = $('#profile-care-btn');
	            var ajax = personData._isCare ? Care.cancel : Care.add;
	            ajax(personData.teacher.teacherid).done(function (data) {
	                var ret = personData._isCare = !personData._isCare;
	                var text = ret ? "取消关注" : "关注";
	                btn.text(text);
	            });
	        });
	    };

	    var handleData = function handleData(data) {
	        data._style = _.pluck(data.teacher.specialtys, 'name').join("，").length > 40 ? _.pluck(data.teacher.specialtys, 'name').join("，").substr(0, 40) + '..' : _.pluck(data.teacher.specialtys, 'name').join("，");
	        data._link = "live/" + data.teacher.teacherid + '/';
	        data._careText = data.teacher.isAttention ? "取消关注" : "关注";
	        data._isCare = String(data.teacher.isAttention);
	        data._isOffline = data.isOffline == -1 ? 'hide' : '';
	        data._liveTitle = data.liveTitle ? data.liveTitle : '暂未开启直播';
	        data._liveTitle = data._liveTitle.length > 22 ? data._liveTitle.substr(0, 22) + '..' : data._liveTitle;
	        data._certificate_num = data.teacher.teacher_type == 1 ? data.teacher.certificate_num : 'hide';
	        if (data.opinion) {
	            data._opinionTitle = data.opinion.title.length > 22 ? data.opinion.title.substr(0, 22) + '..' : data.opinion.title;
	            data.hasOpinion = 'href=/opinion/' + data.opinion.article_id;
	        } else {
	            data._opinionTitle = '暂未发表观点';
	            data.hasOpinion = '';
	        }

	        return data;
	    };

	    var render = function render(trigger, teacherid) {
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

	            container.css({ left: left, top: top });
	        }();

	        $.getJSON("/userinfo/queryUserAllInfo.htm?teacherid=" + teacherid, function (data) {
	            if (data.status == 1) {
	                personData = handleData(data.data);
	                setTimeout(function () {
	                    items.html(template('personIntro-template', personData));
	                    container.show();
	                }, 300);
	            } else (function () {
	                return layer.msg(error[data.status]);
	            });
	        });
	    };

	    return {
	        init: function init() {
	            $('body').append(getTag());
	            container = $('#personIntro');
	            items = container.find('.items');
	            indicate_left = container.find('.indicate.left');
	            indicate_right = container.find('.indicate.right');

	            //加载动画
	            loading = new yntool.loading();
	            loading.container = items;
	            loading.margin = 80;
	            event();
	        },
	        add: function add(_selector) {
	            var self = this;

	            //触发显示/隐藏
	            $('body').on('mouseenter', _selector, function () {
	                var _this = this;

	                hide = false;
	                setTimeout(function () {
	                    if (!hide) {
	                        var teacherid = $(_this).data('teacherid'); //从选择器的属性中获取teacherid
	                        render($(_this), teacherid);
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

	    /*///////////////////////////////////////////////////////////////////*/

	};function getTag() {
	    return '<div id="personIntro" class="hide"><span id="personIntro-indicate-right" class="indicate right fa fa-caret-right hide"></span><span id="personIntro-indicate-left" class="indicate left fa fa-caret-left hide"></span><div class="items"></div></div><script type="text/html" id="personIntro-template"><div class="line infoView"><div class="column column1"><div class="teacher-profile-avatar" ><img src="{{teacher.photo}}" style="width:80px;"/></div><div class="buttons"><span class="care {{_isCare}}" id="profile-care-btn">{{_careText}}</span></div></div><div class="column column2"><div class="title"><span class="name">{{teacher.nickname}}</span><i class="item-icon-guwen"><img src="{{teacher.type_ioc}}"></i><a class="ynbtn live-link liveBtn {{_isOffline}}" href="/live/{{teacher.teacherid}}/" target="_blank">\u770BTA\u76F4\u64AD</a></div><span class="postion">{{teacher.type_name}}</span><span class="number {{_certificate_num}}">\u8BC1\u4E66\u7F16\u53F7{{_certificate_num}}</span><div class="style">{{_style}}</div></div></div><div class="line countView"><div class="msg"><a target="_blank" href="/live/{{teacher.teacherid}}/"><span class="colorLight">\u76F4\u64AD\uFF1A</span>{{_liveTitle}}</a></div><div class="msg"><a target="_blank" {{hasOpinion}}><span class="colorLight">\u89C2\u70B9\uFF1A</span>{{_opinionTitle}}</a></div></div></script>';
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./teacher-profile.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./teacher-profile.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "#personIntro {\r\n    width: 450px;\r\n    position: absolute;\r\n    border: 1px solid rgb(220, 220, 220);\r\n    background: #fff;\r\n    padding: 20px;\r\n    box-shadow: 2px 2px 15px rgba(0, 0, 0, .3);\r\n    border-radius: 2px;\r\n    z-index: 1000;\r\n}\r\n\r\n#personIntro .indicate {\r\n    font-size: 36px;\r\n    position: absolute;\r\n    color: white;\r\n    top: 25px\r\n}\r\n\r\n#personIntro .indicate.left {\r\n    left: -10px\r\n}\r\n\r\n#personIntro .indicate.right {\r\n    right: -10px\r\n}\r\n\r\n#personIntro .infoView {\r\n    overflow: hidden;\r\n    margin-bottom: 10px\r\n}\r\n\r\n#personIntro .teacher-profile-avatar {\r\n    width: 80px;\r\n    height: 80px;\r\n    overflow: hidden\r\n}\r\n\r\n#personIntro .teacher-profile-avatar img {\r\n    width: 80px;\r\n}\r\n\r\n#personIntro .infoView .column2 {\r\n    margin-left: 10px\r\n}\r\n\r\n#personIntro .infoView .name {\r\n    font-weight: bold;\r\n}\r\n\r\n#personIntro .infoView .title {\r\n    font-size: 18px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n#personIntro .infoView .postion {\r\n    display: inline-block;\r\n    font-size: 13px;\r\n    color: #666;\r\n    margin-top: 10px;\r\n}\r\n\r\n#personIntro .infoView .number {\r\n    display: inline-block;\r\n    font-size: 13px;\r\n    color: #d72621;\r\n    margin-top: 10px;\r\n}\r\n#personIntro .infoView .number.hide{\r\n    display: none;\r\n}\r\n\r\n#personIntro .infoView .title .item-icon-guwen {\r\n    display: inline-block;\r\n    width:14px;\r\n    height:20px;\r\n}\r\n#personIntro .infoView .title .item-icon-guwen img{\r\n    width:100%;\r\n}\r\n\r\n\r\n/* #personIntro .infoView .buttons .care {\r\n    background: black;\r\n    border-color: black;\r\n    color: #fff;\r\n} */\r\n\r\n#personIntro .infoView .buttons .care {\r\n    display: inline-block;\r\n    width: 80px;\r\n    height: 25px;\r\n    border-radius: 4px;\r\n    line-height: 25px;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #ff8487;\r\n    font-size: 14px;\r\n    margin-top: 5px;\r\n    cursor: pointer;\r\n}\r\n\r\n#personIntro .infoView .buttons .care:hover {\r\n    background: #ff5054;\r\n}\r\n\r\n#personIntro .infoView .buttons .sign {\r\n    background: rgb(200, 200, 200);\r\n    border-color: rgb(200, 200, 200)\r\n}\r\n\r\n#personIntro .infoView .style {\r\n    margin-top: 15px;\r\n    width: 300px;\r\n    line-height: 1.5;\r\n    color: #666;\r\n}\r\n\r\n#personIntro .infoView .style .item {\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    padding: 2px\r\n}\r\n\r\n#personIntro .infoView>* {\r\n    float: left\r\n}\r\n\r\n#personIntro .countView {\r\n    border-top: 1px dashed rgb(200, 200, 200);\r\n    padding-top: 15px;\r\n    position: relative\r\n}\r\n\r\n#personIntro .countView .msg {\r\n    margin: 10px 0;\r\n    font-size: 15px;\r\n}\r\n\r\n#personIntro .countView .msg a {\r\n    color: #666;\r\n}\r\n\r\n#personIntro .countView .msg a:hover {\r\n    color: #ff5054;\r\n}\r\n\r\n#personIntro .countView .msg .colorLight {\r\n    color: #ff5054;\r\n    font-weight: bold;\r\n}\r\n\r\n#personIntro .countView table {\r\n    width: 280px\r\n}\r\n\r\n#personIntro .countView td {\r\n    text-align: center;\r\n    padding: 3px 0;\r\n    border-left: 1px solid rgb(220, 220, 220)\r\n}\r\n\r\n#personIntro .countView .value td {\r\n    font-size: 21px;\r\n    font-weight: bold;\r\n    color: #f97b02\r\n}\r\n\r\n#personIntro .countView td:first-child {\r\n    border: none\r\n}\r\n\r\n#personIntro .countView .live-link {\r\n    position: absolute;\r\n    top: 25px;\r\n    right: 5px\r\n}\r\n\r\n\r\n/*  */\r\n\r\n#personIntro .liveBtn {\r\n    display: inline-block;\r\n    width: 80px;\r\n    height: 25px;\r\n    border-radius: 4px;\r\n    line-height: 25px;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #ff8487;\r\n    font-size: 14px;\r\n    margin-left: 15px;\r\n}\r\n\r\n#personIntro .liveBtn.hide {\r\n    display: none;\r\n}\r\n\r\n#personIntro .liveBtn:hover {\r\n    background: #ff5054;\r\n}", ""]);

	// exports


/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*

	    关注列表
	    

	*/

	var error = __webpack_require__(8);
	var list = function list(ops) {
	    ops = _.extend({
	        userid: ynUserId,
	        page: 1,
	        row: 20
	    }, ops);

	    var send = {
	        // user_id: ops.userid,
	        currentPage: ops.page,
	        pageSize: ops.row
	    };

	    var defer = $.Deferred();
	    $.getJSON("/center/attentionList.htm", send, function (data) {
	        if (data.status == 1) {
	            data.pageNumber = _.max([1, +data.total / ops.row]);
	            defer.resolve(data);
	        } else {
	            layer.msg(error[back.status]);
	        }
	    });
	    return defer.promise();
	};

	//添加关注
	var add = function add(teacherid) {
	    var defer = $.Deferred();
	    $.post("/center/attention.htm", { teacherid: teacherid }, function (data) {
	        data = JSON.parse(data);
	        if (data.status == "1") {
	            layer.msg("关注成功");
	            defer.resolve();
	        } else {
	            layer.msg(error[data.status]);
	        }
	    });
	    return defer.promise();
	};

	//取消关注
	var cancel = function cancel(teacherid) {
	    var defer = $.Deferred();
	    $.post("/center/attention.htm", { teacherid: teacherid }, function (data) {
	        data = JSON.parse(data);
	        if (data.status == "1") {
	            layer.msg("取消成功");
	            defer.resolve();
	        } else {
	            layer.msg(error[data.status]);
	        }
	    });
	    return defer.promise();
	};

	module.exports = {
	    add: add,
	    cancel: cancel,
	    list: list
	};

/***/ }),
/* 8 */
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