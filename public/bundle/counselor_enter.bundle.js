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

	var _toConsumableArray2 = __webpack_require__(19);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var cropper = __webpack_require__(73);
	var imgModel = __webpack_require__(76);
	var error = __webpack_require__(15);
	/*///////////////////////////////////////////////////////////////////*/

	/* 控制显示隐藏 */

	var step = function () {
	    var container, children;
	    return {
	        init: function init() {
	            container = $('#indicate');
	            children = {
	                step1: step1,
	                step2: step2,
	                step3: step3,
	                step4: step4

	                //点击上一步
	            };$('.before-step').click(function () {
	                $('.form-item').hide();
	                var id = $(this).data('to');
	                $('#' + id).show();
	            });
	        },
	        indicator: function indicator(step) {
	            container.attr('class', 'step-item step-item-' + step);
	        },
	        showChild: function showChild(type, ops) {
	            for (var key in children) {
	                children[key].hide();
	            }
	            children[type].render && children[type].render(ops);
	        }
	    };
	}();

	/* 所在公司 */

	var company = function () {
	    var wrap, indexLeft, indexRight, indexContent, indexItem, data, companyInput;
	    return {
	        init: function init() {
	            wrap = $('.dropdownlist-wrap');
	            indexLeft = $('.dropdownlist-cnt-left div ul li');
	            indexRight = $('.dropdownlist-cnt-right .index');
	            indexContent = $('.dropdownlist-cnt-right');
	            indexItem = $('.dropdownlist-cnt-right .dropdown-item');
	            companyInput = $('#txtCompany');
	            this.dropDown(); //下拉
	            this.jump(); //调用索引点击跳转效果  
	        },
	        dropDown: function dropDown() {
	            //点击下拉
	            var list = $('.dropdownlist-cnt');
	            wrap.click(function (e) {
	                e.stopPropagation();
	                $(this).find('.dropdownlist-cnt').toggle();
	                $('.SSContainerDivWrapper').hide();
	                $('.newListSelected').css({
	                    position: 'static'
	                });
	            });
	            list.click(function (e) {
	                //ABCD索引
	                e.stopPropagation();
	            });
	            $('.dropdownlist-cnt p').mouseenter(function () {
	                $(this).addClass('hover');
	            }).mouseleave(function () {
	                $(this).removeClass('hover');
	            }).on('click', function () {
	                companyInput.val($(this).text());
	                companyInput.attr('data-verify', '1');
	                companyInput.attr('data-shortName', $(this).attr('shortname'));
	                list.hide();
	            });
	            $(document).click(function () {
	                list.hide();
	            });
	        },
	        jump: function jump() {
	            indexContent.scrollTop(0);

	            function get_list(_val) {
	                var _this;
	                indexRight.each(function () {
	                    if ($(this).text() == _val) {
	                        _this = $(this);
	                    }
	                });
	                return _this;
	            }

	            indexLeft.click(function () {
	                var index_val = $(this).text(),
	                    _list,
	                    _all_height = indexContent.offset().top,
	                    scroll_top = indexContent.scrollTop(),
	                    _list_height,
	                    _height;

	                indexLeft.removeClass('cur');
	                $(this).addClass('cur');

	                _list = get_list(index_val);
	                _list_height = _list.offset().top;
	                _height = _list_height - _all_height;
	                indexContent.scrollTop(_height + scroll_top);
	            });
	        }
	    };
	}();

	/* 第一步 */

	var step1 = function () {
	    var container, next, identity, phone, province, city, _modify, phoneCode, textarea, photoCode, imgCode;

	    var formValues; // 保存表单数据

	    var renderCity = function renderCity(provinceid) {
	        $.getJSON("/address/queryCity.htm", { parentid: provinceid }, function (data) {
	            if (data.status == 1) {
	                var tags = _.map(data.data, function (item) {
	                    return '<option value="' + item.address_id + '">' + item.address_name + '</option>';
	                });
	                city.html(tags);
	            }
	        });
	    };

	    var phoneState = {
	        none: function none() {
	            _modify.html("<span class='phone-state-none'>获取验证码</span>");
	            phone.prop('disabled', false);
	        },
	        modify: function modify() {
	            var count = 0;
	            _modify.html("<strong id='timeRemained'>60</strong>秒后重新获取");
	            var timeRemained = $("#timeRemained");
	            var timer = setInterval(function () {
	                if (count === 60) {
	                    clearInterval(timer);
	                    timer = null;
	                    phoneState.none();
	                    return;
	                }
	                var val = +timeRemained.text();
	                timeRemained.text(--val);
	                count++;
	            }, 1000);
	        }
	    };

	    var event = function event() {

	        //切换职业
	        $('#applyType').on('click', 'li', function () {
	            $(this).addClass('checked').siblings().removeClass('checked');
	        });

	        //字数统计
	        yn.wordCount(textarea, { limit: 2000, indicate: $('#textCount_2') });

	        // 图片验证码切换
	        imgCode.on('click', function () {
	            $(this).attr('src', '/validCode.htm?' + _.now());
	        });

	        //获取验证码
	        _modify.on('click', '.phone-state-none', function () {
	            var moblie = phone.val();
	            if (!yn.isMobile(+moblie)) {
	                imgCode.attr('src', '/validCode.htm?' + _.now());
	                layer.msg('手机号格式错误');
	                return;
	            }

	            // 显示图片验证码
	            imgModel.get().render({
	                callback: function callback(val, info) {
	                    if (val == "yes") {

	                        // 发送短信
	                        $.post("/sendPhoneCode.htm", { phone: moblie, phone_imgcode: info.value, source: 1 }, function (data) {
	                            data = JSON.parse(data);
	                            if (data.status == 20012) return layer.msg("短信发送失败，请重试!");
	                            if (data.status == 30002) return layer.msg("图片验证码错误");
	                            if (data.status == "1") {
	                                layer.msg('验证码已发送');
	                                phoneState.modify();
	                            }
	                        });
	                    }
	                }
	            });
	        });

	        //城市联动
	        province.on('change', function () {
	            var id = $(this).val();
	            renderCity(id);
	        });

	        next.on('click', function () {

	            var phone = _.trim($('#txtMobile').val());
	            var msg = _.trim($('#mobile_hidden').val());

	            //真实姓名
	            if (!/^[\u4e00-\u9fa5]{2,7}$/.test(_.trim($('#txtUsername').val()))) {
	                return layer.msg("真实姓名为2-7个汉字");
	            }

	            //身份证号
	            if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_.trim($('#txtID').val()))) {
	                return layer.msg("请输入有效身份证号");
	            }

	            // 手机号码
	            if (!/^1[35789]\d{9}$/.test(phone)) {
	                return layer.msg("请输入有效手机号码");
	            }

	            // 短信验证码
	            if (!/^\d{4,6}$/.test(msg)) {
	                return layer.msg("请输入短信验证码");
	            }

	            //QQ号码
	            if (!/^\d{5,12}$/.test(_.trim($('#txtQQ').val()))) {
	                return layer.msg("请输入QQ号码");
	            }

	            //邮箱号码
	            if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(_.trim($('#txtMail').val()))) {
	                return layer.msg("请输入有效邮箱");
	            }

	            //所在公司
	            if (!/^[^\s]{5,}$/.test(_.trim($('#txtCompany').val()))) {
	                return layer.msg("请输入所在公司");
	            }

	            // 资格证号
	            if (!/^[a-zA-Z][0-9]{13}$/.test(_.trim($('#txtNumber').val()))) {
	                return layer.msg("资格证编号为字母+13位数字");
	            }

	            // 验证短信验证码是否正确
	            $.post('/validPhoneCode.htm', {
	                phone: phone,
	                phoneCode: msg
	            }, function (data) {
	                data = JSON.parse(data);
	                if (data.status == 20012) return layer.msg("短信发送失败，请重试!");
	                if (data.status == 30002) return layer.msg("图片验证码错误");
	                if (data.status == 1) {
	                    // 下一步
	                    formValues = container.serialize();
	                    step.showChild('step2');
	                }
	            });
	        });
	    };

	    return {

	        init: function init() {
	            container = $('#form_1');
	            next = $('#step1');
	            identity = $('#identityId');
	            phone = $('#txtMobile');
	            province = $('#select-province');
	            city = $('#select-city');
	            _modify = $('#modify');
	            phoneCode = $('#mobile_hidden');
	            photoCode = $('#photoCode');
	            imgCode = $('#imgCode');
	            textarea = $('#textarea_2');
	            phoneState.none();

	            event();

	            // 获取个人信息
	            $.getJSON("/center/queryUserInfo.htm?user_id=" + ynUserId, function (back) {
	                if (back.status == 1) {
	                    phone.val(back.data.phone); // 回填手机号码
	                } else (function () {
	                    return layer.msg(error[back.status]);
	                });
	            });
	        },
	        render: function render() {
	            container.show();
	            step.indicator(1);
	        },
	        hide: function hide() {
	            container.hide();
	        },
	        getValues: function getValues() {
	            return formValues;
	        }
	    };
	}();

	/* 第二步 */

	var step2 = function () {
	    var container,
	        formValues = [];

	    // 图片上传回调
	    var onCrop = function onCrop(callback) {
	        cropper.getInstance().onCrop = function (imageData) {
	            $.post("/auth/user/rzImgUpload.htm", {
	                dataImg: imageData,
	                updateEntity: true,
	                user_id: ynUserId
	            }, function (data) {
	                if (data.status == "success") {
	                    typeof callback == "function" && callback(data.returnPath);
	                }
	            }, 'json');
	        };
	    };

	    return {
	        init: function init() {
	            container = $('#form_2');

	            // 上传头像
	            $('#upload-fake1').click(function () {
	                cropper.getInstance().render({ width: 200, height: 200 });
	                onCrop(function (src) {
	                    $(".avatar").attr({ src: src });
	                    formValues[0] = "tximg=" + src;
	                });
	            });

	            // 上传身份证
	            $('#uploadCardBtn').click(function () {
	                cropper.getInstance().render({ width: 200, height: 200, ratio: 'free' });
	                onCrop(function (src) {
	                    $('.cardImg').attr({ src: src });
	                    formValues[1] = 'sfzimg=' + src;
	                });
	            });

	            //点击下一步
	            $('#step2').click(function () {
	                if (!formValues[0]) {
	                    return layer.msg("请上传头像");
	                }
	                if (!formValues[1]) {
	                    return layer.msg("请上传身份证照片");
	                }
	                step.showChild('step3');
	            });
	        },
	        render: function render() {
	            step.indicator(2);
	            container.show();
	        },
	        hide: function hide() {
	            container.hide();
	        },
	        getValues: function getValues() {
	            return formValues.join('&');
	        }
	    };
	}();

	/*  第三步 */

	var step3 = function () {
	    var container, investType, labelList, specialtys, agreeCheck, next;

	    var renderTimes = 0;
	    return {
	        init: function init() {
	            container = $('#form_3');
	            investType = $('#investType');
	            labelList = $('#labelList');
	            agreeCheck = $('#agreeCheck');
	            next = $('#step3');

	            // 字数统计
	            yn.wordCount($('#textarea_1'), {
	                indicate: $('#textCount_1'),
	                limit: 500
	            });

	            labelList.on('click', 'li', function () {
	                $(this).toggleClass('checked');
	            });

	            investType.on('click', 'li', function () {
	                $(this).toggleClass('checked');
	            });

	            // 提交数据
	            next.click(function (e) {
	                e.preventDefault();

	                var input_list = $('#tzfx')[0];
	                var input_type = $('#specialty')[0];
	                input_list.value = _.map([].concat((0, _toConsumableArray3.default)(investType.find('li.checked'))), function (item) {
	                    return $(item).data('id');
	                }).join(","); // 获取投资方向
	                input_type.value = _.map([].concat((0, _toConsumableArray3.default)(labelList.find('li.checked'))), function (item) {
	                    return $(item).data('id');
	                }).join(","); // 获取选择擅长领域

	                if (!input_list.value) return layer.msg("请选择投资方向");
	                if (!input_type.value) return layer.msg("请选择擅长领域");
	                if (!$('#textarea_1').val()) return layer.msg("请填写个人简介");
	                if (!agreeCheck.get(0).checked) return layer.msg("请同意约投顾平台投顾服务协议");

	                // 拼接表单数据
	                var send = [step1.getValues(), step2.getValues(), container.serialize()].join("&");

	                $.post('/applycome/addApplyCome.htm', send, function (data) {
	                    if (data == "success") return step.showChild('step4');
	                    if (data == "4") return layer.msg("短信验证码错误");
	                    layer.msg('\u9519\u8BEF:' + data);
	                });
	            });
	        },

	        render: function render() {
	            step.indicator(3);
	            container.show();

	            if (renderTimes == 0) {
	                renderTimes++;

	                //投资方向
	                $.getJSON("/investmenttypes/select.htm", function (data) {
	                    if (data.status == 1) {
	                        var tag = '';
	                        var isSelect = '';
	                        _.forEach(data.data, function (item) {
	                            if (data.investment_name == item.investment_name) {
	                                isSelect = 'checked';
	                            } else {
	                                isSelect = '';
	                            }
	                            tag += '<li class="' + isSelect + '" data-id="' + item.id + '">' + item.investment_name + '</li>';
	                        });
	                        investType.html(tag);
	                    }
	                });

	                $.getJSON("/center/queryUserInfo.htm", { user_id: ynUserId }, function (data) {
	                    specialtys = data.specialtys;
	                });

	                //擅长领域
	                $.getJSON("/center/specialty.htm", function (back) {
	                    var gootTags = '';
	                    _.forEach(back.rows, function (item) {
	                        var isSelect = '';
	                        //是否是老师擅长的添加check参数
	                        _.forEach(specialtys, function (_item) {
	                            if (+_item.id == +item.id) {
	                                isSelect = "checked";
	                            }
	                        });
	                        gootTags += '<li class="' + isSelect + '" data-id="' + item.id + '">' + item.name + '</li>';
	                    });
	                    labelList.html(gootTags);
	                });
	            }
	        },

	        hide: function hide() {
	            return container.hide();
	        }
	    };
	}();

	var step4 = function () {
	    var container;
	    return {
	        init: function init() {
	            container = $('#success');
	        },
	        render: function render() {
	            step.indicator(4);
	            container.show();
	        },
	        hide: function hide() {
	            container.hide();
	        }
	    };
	}();

	$(function () {
	    if (!ynIsLogin) {
	        yn.login.render();
	        $('#login').on('click', '.close', function () {
	            window.location.href = "/index.htm";
	        });
	        return;
	    }
	    company.init();
	    step.init();
	    step1.init();
	    step2.init();
	    step3.init();
	    step4.init();
	});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
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
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(20);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	__webpack_require__(66);
	module.exports = __webpack_require__(30).Array.from;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(23)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(26)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(24);
	var defined = __webpack_require__(25);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(27);
	var $export = __webpack_require__(28);
	var redefine = __webpack_require__(43);
	var hide = __webpack_require__(33);
	var has = __webpack_require__(44);
	var Iterators = __webpack_require__(45);
	var $iterCreate = __webpack_require__(46);
	var setToStringTag = __webpack_require__(62);
	var getPrototypeOf = __webpack_require__(64);
	var ITERATOR = __webpack_require__(63)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(29);
	var core = __webpack_require__(30);
	var ctx = __webpack_require__(31);
	var hide = __webpack_require__(33);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.3' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(32);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(34);
	var createDesc = __webpack_require__(42);
	module.exports = __webpack_require__(38) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(35);
	var IE8_DOM_DEFINE = __webpack_require__(37);
	var toPrimitive = __webpack_require__(41);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(38) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(36);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(38) && !__webpack_require__(39)(function () {
	  return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(39)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(36);
	var document = __webpack_require__(29).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(36);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33);


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(47);
	var descriptor = __webpack_require__(42);
	var setToStringTag = __webpack_require__(62);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(33)(IteratorPrototype, __webpack_require__(63)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(35);
	var dPs = __webpack_require__(48);
	var enumBugKeys = __webpack_require__(60);
	var IE_PROTO = __webpack_require__(57)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(40)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(61).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(34);
	var anObject = __webpack_require__(35);
	var getKeys = __webpack_require__(49);

	module.exports = __webpack_require__(38) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(50);
	var enumBugKeys = __webpack_require__(60);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(44);
	var toIObject = __webpack_require__(51);
	var arrayIndexOf = __webpack_require__(54)(false);
	var IE_PROTO = __webpack_require__(57)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(52);
	var defined = __webpack_require__(25);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(53);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(51);
	var toLength = __webpack_require__(55);
	var toAbsoluteIndex = __webpack_require__(56);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(24);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(24);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(58)('keys');
	var uid = __webpack_require__(59);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(29);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(29).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(34).f;
	var has = __webpack_require__(44);
	var TAG = __webpack_require__(63)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(58)('wks');
	var uid = __webpack_require__(59);
	var Symbol = __webpack_require__(29).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(44);
	var toObject = __webpack_require__(65);
	var IE_PROTO = __webpack_require__(57)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(25);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx = __webpack_require__(31);
	var $export = __webpack_require__(28);
	var toObject = __webpack_require__(65);
	var call = __webpack_require__(67);
	var isArrayIter = __webpack_require__(68);
	var toLength = __webpack_require__(55);
	var createProperty = __webpack_require__(69);
	var getIterFn = __webpack_require__(70);

	$export($export.S + $export.F * !__webpack_require__(72)(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(35);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(45);
	var ITERATOR = __webpack_require__(63)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(34);
	var createDesc = __webpack_require__(42);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(71);
	var ITERATOR = __webpack_require__(63)('iterator');
	var Iterators = __webpack_require__(45);
	module.exports = __webpack_require__(30).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(53);
	var TAG = __webpack_require__(63)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(63)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*
	                  ------------------ 图片裁剪 ------------------------
	                  var cropperModel = require('cropper-v1.2.js');   导入模块
	                  var crop = cropperModel.getInstance();
	                      crop.render({width, height});  默认是(160,90)
	                      crop.onCrop = imageData => {...}   回调函数
	             */

	__webpack_require__(74);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(75);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#myCropper-overlay {\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    background: gray;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    z-index: 9999;\r\n    text-align: center;\r\n}\r\n\r\n#myCropper {\r\n    position: relative;\r\n    background: white;\r\n    border-radius: 4px;\r\n    margin: auto;\r\n    top: 100px;\r\n    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.15);\r\n    display: inline-block;\r\n    overflow: hidden;\r\n}\r\n\r\n#myCropper > .title {\r\n    font-size: 16px;\r\n    margin-bottom: 15px;\r\n    text-align: left;\r\n    padding: 13px 20px;\r\n    border-bottom: 1px solid rgb(220, 220, 220);\r\n}\r\n\r\n.myCropper-content {\r\n    overflow: hidden;\r\n    background: white;\r\n    margin: 30px;\r\n    text-align: left\r\n}\r\n\r\n.myCropper-content-left {\r\n    border-right: 1px dashed #c7c7c7;\r\n    padding-right: 20px;\r\n}\r\n\r\n.myCropper-btn-choose {\r\n    font-size: 13px;\r\n    background: black;\r\n    border-color: black;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.myCropper-origin {\r\n    width: 400px;\r\n    height: 300px;\r\n    background: rgb(220, 220, 220);\r\n    overflow: hidden;\r\n    float: left;\r\n}\r\n\r\n.myCropper-content-right {\r\n    margin-left: 10px;\r\n    padding-left: 10px;\r\n}\r\n\r\n.myCropper-content-right .title {\r\n    font-size: 16px;\r\n}\r\n\r\n.myCropper-content-right .thumb {\r\n    background: rgb(220, 220, 220);\r\n    margin: 10px 0;\r\n}\r\n#myCropper-canvas {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: block;\r\n}\r\n.myCropper-btn-upload {\r\n    width: 160px !important;\r\n    padding: 10px;\r\n    font-size: 15px;\r\n}\r\n\r\n#myCropper-overlay .close {\r\n    font-size: 26px;\r\n    right: 10px;\r\n    top: 10px;\r\n    cursor: pointer;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 76 */
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

	__webpack_require__(77);
	var lo = __webpack_require__(79);

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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(78);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#model-valid-img {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: white;\r\n    background: rgba(255, 255, 255, 0.33);\r\n    z-index: 100;\r\n}\r\n\r\n\r\n/*///////////////////////////////////////////////////////////////////*/\r\n\r\n#model-valid-img {\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: white;\r\n    background: rgba(80, 80, 80, 0.33);\r\n    z-index: 100;\r\n}\r\n\r\n#model-valid-img .box {\r\n    width: 400px;\r\n    margin: auto;\r\n    margin-top: 200px;\r\n    background: rgb(255, 255, 255);\r\n    border-radius: 4px;\r\n    box-shadow: 1px 1px 15px rgba(92, 92, 92, 0.21);\r\n    overflow: hidden;\r\n}\r\n\r\n#model-valid-img .box .title {\r\n    border-bottom: 1px solid #e8e8e8;\r\n    padding: 15px;\r\n}\r\n\r\n#model-valid-img .box .contentBar {\r\n    padding: 40px;\r\n}\r\n\r\n#model-valid-img .bottom {\r\n    overflow: hidden;\r\n    border-top: 1px solid #d4d4d4;\r\n    background: #efefef;\r\n}\r\n\r\n#model-valid-img .bottom .b-btn {\r\n    float: left;\r\n    width: 50%;\r\n    text-align: center;\r\n    padding: 10px 0;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n}\r\n\r\n#model-valid-img .bottom .yes {\r\n    border-left: 1px solid #d4d4d4;\r\n}\r\n\r\n#model-valid-img .valid-img {\r\n    overflow: hidden;\r\n}\r\n\r\n#model-valid-img .valid-img input {\r\n    padding: 6px;\r\n    float: left;\r\n    margin-right: 10px;\r\n    background: #f1f1f1;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 79 */
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

/***/ })
/******/ ]);