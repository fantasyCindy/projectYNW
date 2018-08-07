webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(14)(
	  /* script */
	  __webpack_require__(15),
	  /* template */
	  __webpack_require__(29),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "D:\\WORKING\\WebRoot\\public\\comp\\myrefer.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] myrefer.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1843297a", Component.options)
	  } else {
	    hotAPI.reload("data-v-1843297a", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 14 */
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


	var newRefer = __webpack_require__(16);
	exports.default = {
	    components: {
	        newRefer: newRefer
	    },
	    data: function data() {
	        return {
	            select: 0,
	            params: {
	                audit: "", //[0,1]是否审核
	                type: ynIsTeacher ? 1 : 0, //老师or用户
	                status: 0, //审核状态 0=待审核, 2=未通过
	                productStatus: 0, //[0,1,2] 更新/预售/结束
	                puiblisherid: ynUserId,
	                currentPage: 1,
	                pageSize: 10
	            },
	            rows: [],
	            showNewRefer: false,
	            newReferFill: {},
	            live_path: live_path,
	            total: ''
	        };
	    },

	    watch: {
	        'params.status': function paramsStatus(val) {
	            this.getData();
	        }
	    },
	    computed: {
	        deleteVisible: function deleteVisible() {
	            return this.select == 1 || this.select == 3 && this.params.status == 2;
	        },
	        statusVisible: function statusVisible() {
	            return this.select == 3;
	        },
	        feedVisible: function feedVisible() {
	            return this.select != 3;
	        },
	        linkVisible: function linkVisible() {
	            return this.select == 0 || this.select == 2;
	        }
	    },

	    //
	    methods: {
	        onPage: function onPage(page) {
	            this.getData({ currentPage: page });
	        },
	        editRefer: function editRefer(id, index) {
	            this.showNewRefer++;
	            this.newReferFill = this.rows[index];
	        },
	        deleteRefer: function deleteRefer(id, index) {
	            var _this = this;

	            layer.confirm('确定要删除吗', function () {
	                $.post('/center/reference/delete.htm', {
	                    referenceid: id
	                }, function (data) {
	                    if (data == 'success') {
	                        layer.msg("删除成功！");
	                        _this.rows.splice(index, 1);
	                        return;
	                    }
	                    layer.msg("删除失败！");
	                });
	            });
	        },
	        menuSelect: function menuSelect(index) {
	            this.select = index;
	            var audit = index == 3;
	            this.params.productStatus = audit ? '' : index;
	            this.params.audit = audit ? "1" : "";
	            this.getData();
	        },
	        getData: function getData(ops) {
	            var _this2 = this;

	            _.extend(this.params, ops);
	            var getTime = function getTime(time) {
	                return time.match(/^[^\s]+/)[0].replace(/-/g, '.');
	            };
	            var handleData = function handleData(arr) {
	                return _.map(arr, function (item) {
	                    item._title = item.title.substr(0, 25);
	                    if (item._title.length > 25) {
	                        item._title += '...';
	                    }
	                    item._start = getTime(item.startTime);
	                    item._end = getTime(item.endTime);
	                    item._statusText = ['待审核', '已通过', '未通过'][item.status];
	                    return item;
	                });
	            };
	            $.getJSON('/center/reference/list.htm', this.params, function (data) {
	                _this2.total = +data.total;
	                // data.pageNumber = _.max([1, Math.ceil(+data.total / this.params.pageSize)]);
	                _this2.rows = handleData(data.rows);
	            });
	        }
	    },
	    mounted: function mounted() {
	        this.getData();
	    }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(17)

	var Component = __webpack_require__(14)(
	  /* script */
	  __webpack_require__(21),
	  /* template */
	  __webpack_require__(28),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "D:\\WORKING\\WebRoot\\public\\comp\\refer-new.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] refer-new.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4e099a82", Component.options)
	  } else {
	    hotAPI.reload("data-v-4e099a82", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(19)("6721b0c8", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4e099a82!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./refer-new.vue", function() {
	     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4e099a82!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./refer-new.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "\n.field{\n    width:115px;\n}\n\n", ""]);

	// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(20)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  update(obj)

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles(parentId, list) {
	  var styles = [];
	  var newStyles = {};
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i];
	    var id = item[0];
	    var css = item[1];
	    var media = item[2];
	    var sourceMap = item[3];
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    };
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] });
	    } else {
	      newStyles[id].parts.push(part);
	    }
	  }
	  return styles;
	};

/***/ }),
/* 21 */
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

	var cropper = __webpack_require__(22);
	var calendar = __webpack_require__(25);
	var day = __webpack_require__(8);

	var crop;

	var getDay = function getDay(time) {
	    return time.match(/^[^\s]+/)[0];
	};
	//验证日期的格式
	var isDateFormat = function isDateFormat(val) {
	    return (/^20[12][0-9][.\-/][01]?[0-9][.\-/][0-3][0-9]$/.test(_.trim(val))
	    );
	};
	var override = function override(source, target) {
	    for (var key in source) {
	        if (target[key]) {
	            source[key] = target[key];
	        }
	    }
	    return source;
	};
	exports.default = {
	    data: function data() {
	        return {
	            show: false,
	            send: {
	                puiblisher: ynTeacherName,
	                puiblisherid: ynUserId,
	                productImg: '',
	                title: '',
	                productInfo: '',
	                price: '',
	                startTime1: '',
	                endTime1: '',
	                serviceperiod: '', //周期
	                teacherid: ynTeacherId,
	                updatefrequency: ''
	            },
	            isEdit: false,
	            text: '',
	            isPass: false
	        };
	    },

	    props: {
	        visible: Number,
	        data: {
	            type: Object,
	            require: false
	        }
	    },
	    watch: {
	        visible: function visible(val) {
	            this.show = true;
	        },
	        data: function data(itemData) {
	            console.log("itemData", itemData.status);
	            itemData.startTime1 = getDay(itemData.startTime);
	            itemData.endTime1 = getDay(itemData.endTime);
	            override(this.send, itemData);
	            this.isEdit = true;
	            this.send.id = itemData.id;
	            this.isPass = itemData.status == '2' ? true : false;
	        }
	    },
	    methods: {
	        close: function close() {
	            this.show = false;
	            this.send = {
	                puiblisher: ynTeacherName,
	                puiblisherid: ynUserId,
	                productImg: '',
	                title: '',
	                productInfo: '',
	                price: '',
	                startTime1: '',
	                endTime1: '',
	                serviceperiod: '', //周期
	                teacherid: ynTeacherId,
	                updatefrequency: ''
	            };
	        },
	        validate: function validate() {
	            if (!_.trim(this.send.title)) {
	                layer.msg('标题不能为空');
	                return false;
	            }

	            if (!_.trim(this.send.productInfo)) {
	                layer.msg('内参详情不能为空');
	                return false;
	            }

	            if (!_.trim(this.send.updatefrequency)) {
	                return layer.msg('更新频率不能为空');
	            }

	            if (/^[0-9]+]$/.test(_.trim(this.send.updatefrequency))) {
	                return layer.msg('更新频率必须为数字');
	            }

	            if (!(/^[1-9]+[0-9]*]*$/.test(this.send.price) && +this.send.price <= 3000)) {
	                layer.msg("请设置价格,范围: 1-3000的整数");
	                return false;
	            }

	            if (!isDateFormat(this.send.startTime1) || !isDateFormat(this.send.endTime1)) {
	                layer.msg("请填写正确的服务周期, 格式:1949-10-01");
	                return false;
	            }

	            var begin = new day(this.send.startTime1);
	            if (begin.offset() < 0) {
	                layer.msg('开始日期不能小于当前日期');
	                return false;
	            }

	            var end = new day(this.send.endTime1);
	            var off = end.offset(this.send.startTime1);
	            this.send.serviceperiod = off;
	            if (off < 7 || off > 60) {
	                layer.msg('服务周期为7-60天之间');
	                return false;
	            }

	            if (!this.send.productImg) {
	                layer.msg('请上传封面图片');
	                return false;
	            }

	            return true;
	        },
	        submit: function submit() {
	            var _this = this;

	            this.text = this.isEdit ? '保存成功' : '创建成功！等待审核~';
	            if (!this.validate()) return;
	            if (this.isEdit && this.isPass) {
	                //未通过的内参编辑后变成待审核
	                this.send.status = '0';
	                this.text = '保存成功,等待审核~';
	            }
	            $.post('/center/reference/add.htm', this.send, function (data) {
	                if (data != "success") return layer.msg('\u521B\u5EFA\u5931\u8D25 : ' + data);
	                layer.msg(_this.text);
	                _this.show = false;
	                _this.send = {
	                    puiblisher: ynTeacherName,
	                    puiblisherid: ynUserId,
	                    productImg: '',
	                    title: '',
	                    productInfo: '',
	                    price: '',
	                    startTime1: '',
	                    endTime1: '',
	                    serviceperiod: '', //周期
	                    teacherid: ynTeacherId,
	                    updatefrequency: ''
	                };
	            });
	        },
	        showCrop: function showCrop() {
	            var _this2 = this;

	            console.log("===");
	            crop = cropper.getInstance();
	            crop.render({ width: 180, height: 180 });
	            crop.onCrop = function (imgData) {
	                $.post(__path + "/auth/user/ImgUpload.htm", {
	                    dataImg: imgData,
	                    user_id: ynUserId
	                }, function (data) {
	                    if (data.status == "success") {
	                        var src = data.returnPath;
	                        _this2.send.productImg = src;
	                    } else {
	                        layer.msg(data);
	                    }
	                }, 'json');
	            };
	        }
	    },
	    mounted: function mounted() {
	        var _this3 = this;

	        var start = $("#startTime");
	        calendar.add(start, function (info) {
	            start.val(info.day);
	            _this3.send.startTime1 = info.day;
	        });

	        var end = $("#endTime");
	        calendar.add(end, function (info) {
	            end.val(info.day);
	            _this3.send.endTime1 = info.day;
	        });

	        yn.wordCount($("#textarea_1"), {
	            limit: 500,
	            indicate: $('#count')
	        });
	    }
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*
	                  ------------------ 图片裁剪 ------------------------
	                  var cropperModel = require('cropper-v1.2.js');   导入模块
	                  var crop = cropperModel.getInstance();
	                      crop.render({width, height});  默认是(160,90)
	                      crop.onCrop = imageData => {...}   回调函数
	             */

	__webpack_require__(23);

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
	    return "<div id=\"myCropper-overlay\" class=\"hide\">\n<div id=\"myCropper\" class=\"line crop relative\">\n    <span class=\"fa fa-times-circle absolute close\"></span>\n    <div class=\"title\">\n        <span class=\"myCropper-title\">\u56FE\u7247\u4E0A\u4F20</span>\n    </div>\n    <div class=\"myCropper-content\">\n        <div class=\"myCropper-content-left fl\">  \n            <div class=\"myCropper-content-title\">\n                <button class=\"myCropper-btn-choose btn\">+\u9009\u62E9\u56FE\u7247</button>\n                <input type=\"file\" class=\"hide\" id=\"myCropper-input-choose\" />\n            </div>\n            <div class=\"myCropper-origin\">\n                <img class=\"myCropper-origin-image\" style=\"max-width: 100%\" />\n            </div>\n        </div>\n        <div class=\"myCropper-content-right fl\">\n            <div class=\"title\">\u56FE\u7247\u9884\u89C8</div>\n            <div class=\"thumb\">\n                <canvas id=\"myCropper-canvas\" width=\"" + data.width + "\" height=\"" + data.height + "\" data-state=\"no\"></canvas>\n            </div>\n            <button class=\"myCropper-btn-upload btn\">\u4E0A\u4F20\u56FE\u7247</button>\n        </div>\n    </div></div></div>";
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./cropper-model.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./cropper-model.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "#myCropper-overlay {\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    background: gray;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    z-index: 9999;\r\n    text-align: center;\r\n}\r\n\r\n#myCropper {\r\n    position: relative;\r\n    background: white;\r\n    border-radius: 4px;\r\n    margin: auto;\r\n    top: 100px;\r\n    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.15);\r\n    display: inline-block;\r\n    overflow: hidden;\r\n}\r\n\r\n#myCropper > .title {\r\n    font-size: 16px;\r\n    margin-bottom: 15px;\r\n    text-align: left;\r\n    padding: 13px 20px;\r\n    border-bottom: 1px solid rgb(220, 220, 220);\r\n}\r\n\r\n.myCropper-content {\r\n    overflow: hidden;\r\n    background: white;\r\n    margin: 30px;\r\n    text-align: left\r\n}\r\n\r\n.myCropper-content-left {\r\n    border-right: 1px dashed #c7c7c7;\r\n    padding-right: 20px;\r\n}\r\n\r\n.myCropper-btn-choose {\r\n    font-size: 13px;\r\n    background: black;\r\n    border-color: black;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.myCropper-origin {\r\n    width: 400px;\r\n    height: 300px;\r\n    background: rgb(220, 220, 220);\r\n    overflow: hidden;\r\n    float: left;\r\n}\r\n\r\n.myCropper-content-right {\r\n    margin-left: 10px;\r\n    padding-left: 10px;\r\n}\r\n\r\n.myCropper-content-right .title {\r\n    font-size: 16px;\r\n}\r\n\r\n.myCropper-content-right .thumb {\r\n    background: rgb(220, 220, 220);\r\n    margin: 10px 0;\r\n}\r\n#myCropper-canvas {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: block;\r\n}\r\n.myCropper-btn-upload {\r\n    width: 160px !important;\r\n    padding: 10px;\r\n    font-size: 15px;\r\n}\r\n\r\n#myCropper-overlay .close {\r\n    font-size: 26px;\r\n    right: 10px;\r\n    top: 10px;\r\n    cursor: pointer;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 *  日历模块

	    var calendar = require('../module/ui/calendar.js')
	 
	    === usage ===
	    
	    // usage-1 : 默认取值info.day
	    calendar.add($el)

	    // usage-2 : 使用回调函数
	    calendar.add($el, info => $el.val(info.time))

	    ------------------------------------------ 
	       
	    info = { 
	        year : "2016",
	        month : "2016-09", 
	        day : "2016-09-10", 
	        time : "2016-09-10 18:20:39"
	    }

	 */

	_.padLeft = _.padLeft || _.padStart;
	_.padRight = _.padRight || _.padEnd;

	__webpack_require__(26);

	var calendar = function () {
	    var $container,
	        $trigger,
	        show = false,
	        $year,
	        $month,
	        $date,
	        delegate = {
	        select: function select(info) {}

	        //add tag to dom
	    };var addToDom = function addToDom() {
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

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js!./calendar.css", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js!./calendar.css");
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

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "\r\n#yncalendar {\r\n    -webkit-user-select: none;\r\n    display: none;\r\n    position: absolute;\r\n    font-size: 14px;\r\n    font-family: \"SimHei,arial,helvetica,sans-serif,Microsoft YaHei\";\r\n    border: 1px solid #ebebeb;\r\n    border-radius: 10px;\r\n    overflow: hidden;\r\n    background: white;\r\n    z-index: 10000;\r\n    box-shadow: 2px 2px 20px rgba(0,0,0,0.2)\r\n}\r\n\r\n#yncalendar .ynhide {\r\n    display: none\r\n}\r\n\r\n#yncalendar table {\r\n    margin: 20px;\r\n    border-collapse: collapse\r\n}\r\n\r\n#yncalendar td,\r\n#yncalendar th {\r\n    text-align: center;\r\n    padding: 5px 10px;\r\n    border: 1px solid #e6e6e6\r\n}\r\n\r\n#yncalendar .info {\r\n    padding: 10px 10px;\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar .info span {\r\n    display: inline-block;\r\n    margin: 0 5px\r\n}\r\n\r\n#yncalendar .info span span {\r\n    font-size: 18px\r\n}\r\n\r\n#yncalendar .info .leftMonth {\r\n    cursor: pointer;\r\n    float: left;\r\n    margin-right: 10px\r\n}\r\n\r\n#yncalendar .info .rightMonth {\r\n    cursor: pointer;\r\n    float: right;\r\n    margin-left: 10px\r\n}\r\n\r\n#yncalendar td.date {\r\n    cursor: pointer\r\n}\r\n\r\n#yncalendar td.date:hover {\r\n    background: #f0f0f0\r\n}\r\n\r\n#yncalendar td.today {\r\n    border-color: #E12B51;\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar td.today:hover {\r\n    background: #E12B51;\r\n    color: white\r\n}\r\n\r\n#yncalendar .week-title th {\r\n    background: #F5F5F5\r\n}", ""]);

	// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show),
	      expression: "show"
	    }],
	    staticClass: "publish-container",
	    attrs: {
	      "id": "newReferBox"
	    }
	  }, [_c('div', {
	    staticClass: "publish-box"
	  }, [_c('span', {
	    staticClass: "close",
	    on: {
	      "click": _vm.close
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-times-circle fa-lg"
	  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "my-body"
	  }, [_c('div', {
	    staticClass: "md-content"
	  }, [_c('div', {
	    staticClass: "refer-info"
	  }, [_c('div', {
	    staticClass: "refer-pic",
	    on: {
	      "click": _vm.showCrop
	    }
	  }, [_c('a', {
	    staticClass: "upload publish-cover-btn relative",
	    attrs: {
	      "id": "upload"
	    }
	  }, [_c('img', {
	    staticClass: "publish-cover-container absolute",
	    attrs: {
	      "src": _vm.send.productImg
	    }
	  })]), _vm._v(" "), _c('p', {
	    staticClass: "note red",
	    attrs: {
	      "id": "imgMsg"
	    }
	  }, [_vm._v("支持JPG、 JPEG和PNG文件尺寸为，大小不超过1M")])]), _vm._v(" "), _c('form', {
	    attrs: {
	      "id": "myReferform"
	    }
	  }, [_c('div', {
	    staticClass: "refer-form"
	  }, [_c('div', [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.title),
	      expression: "send.title"
	    }],
	    staticClass: "txtbox txtbox-name texts publish-title",
	    attrs: {
	      "type": "text",
	      "maxlength": "15",
	      "placeholder": "给投资内参起个名字（不超过15个字，发售后不可修改）"
	    },
	    domProps: {
	      "value": (_vm.send.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.send.title = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "error-msg red",
	    staticStyle: {
	      "display": "none"
	    }
	  }, [_vm._v("请输入不超过15个字的标题")])]), _vm._v(" "), _c('div', {
	    staticClass: "mt10 textarea-wrap"
	  }, [_c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.productInfo),
	      expression: "send.productInfo"
	    }],
	    staticClass: "texts",
	    attrs: {
	      "id": "textarea_1",
	      "maxlength": "500",
	      "placeholder": "要求填写： 内容介绍、服务频次、过往战绩（客观公正）、风险提示等；示例： 本内参坚持基本面+技术面选股，实时捕捉热点，挖掘价值洼地；每日发布1~2只强势牛股，含详细的选股思路、买卖点、波段操作提示；曾成功布局恒生电子 （600570）一月翻番，东方财富（300059）一月涨幅为120%。"
	    },
	    domProps: {
	      "value": (_vm.send.productInfo)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.send.productInfo = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "clearnumber"
	  }, [_c('span', {
	    staticClass: "msg-info c_666 fr",
	    attrs: {
	      "id": "textCount_1"
	    }
	  }, [_c('font', {
	    attrs: {
	      "id": "count"
	    }
	  }, [_vm._v("500")]), _vm._v("/ 500")], 1), _vm._v(" "), _c('span', {
	    staticClass: "error-msg red",
	    staticStyle: {
	      "display": "none"
	    }
	  }, [_vm._v("请输入10-1000字的简介")])])]), _vm._v(" "), _c('table', [_c('tr', [_c('td', {
	    staticClass: "field"
	  }, [_vm._v("每交易日更新频率")]), _vm._v(" "), _c('td', [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.updatefrequency),
	      expression: "send.updatefrequency"
	    }],
	    staticStyle: {
	      "width": "150px",
	      "height": "30px",
	      "margin-left": "10px",
	      "display": "inline-block"
	    },
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.send.updatefrequency)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.send.updatefrequency = $event.target.value
	      }
	    }
	  }), _vm._v(" 次")])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "field"
	  }, [_vm._v("设置价格：")]), _vm._v(" "), _c('td', [_c('span', {
	    staticClass: "field-sub"
	  }, [_vm._v("订阅价")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.price),
	      expression: "send.price"
	    }],
	    staticClass: "txtbox texts publish-price",
	    staticStyle: {
	      "width": "60px"
	    },
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.send.price)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.send.price = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "ml10"
	  }, [_vm._v("牛币")]), _vm._v(" "), _c('span', {
	    staticClass: " red ml10"
	  }, [_vm._v("（价格为1~3000的整数）")])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "field"
	  }, [_vm._v("服务周期：")]), _vm._v(" "), _c('td', {
	    staticClass: "range middle"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.startTime1),
	      expression: "send.startTime1"
	    }],
	    staticClass: "txtbox showdate texts publish-timeBegin",
	    staticStyle: {
	      "width": "79px"
	    },
	    attrs: {
	      "id": "startTime",
	      "autocomplete": "off",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.send.startTime1)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.send.startTime1 = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "refer-to"
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.send.endTime1),
	      expression: "send.endTime1"
	    }],
	    staticClass: "txtbox showdate texts publish-timeEnd",
	    staticStyle: {
	      "width": "79px"
	    },
	    attrs: {
	      "id": "endTime",
	      "autocomplete": "off",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.send.endTime1)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.send.endTime1 = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "red tc",
	    staticStyle: {
	      "padding-bottom": "10px"
	    },
	    attrs: {
	      "id": "dateMsg"
	    }
	  }, [_vm._v("（服务期最长两个月）")])])])]), _vm._v(" "), _c('p', {
	    staticClass: "red"
	  }, [_vm._v("注：内参审核时间72小时以内")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "btn-wrap"
	  }, [_c('button', {
	    staticClass: "btn btn-89-31",
	    attrs: {
	      "id": "submitBtn"
	    },
	    on: {
	      "click": _vm.submit
	    }
	  }, [_vm._v("立即创建")])])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-titlebar"
	  }, [_vm._v("发售新投资内参"), _c('span', {
	    staticClass: "subtit"
	  }, [_vm._v("(定位清晰、内容专注的投资内参更容易被用户定制)")])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4e099a82", module.exports)
	  }
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "teacher-refer"
	    }
	  }, [_c('div', {
	    staticClass: "ynbtn pub-new-refer",
	    on: {
	      "click": function($event) {
	        _vm.showNewRefer++
	      }
	    }
	  }, [_vm._v("发售新内参")]), _vm._v(" "), _c('table', [_c('tr', [_c('td', {
	    staticClass: "menu-item",
	    class: {
	      select: _vm.select == 0
	    },
	    on: {
	      "click": function($event) {
	        _vm.menuSelect(0)
	      }
	    }
	  }, [_vm._v("更新中")]), _vm._v(" "), _c('td', {
	    staticClass: "menu-item",
	    class: {
	      select: _vm.select == 1
	    },
	    on: {
	      "click": function($event) {
	        _vm.menuSelect(1)
	      }
	    }
	  }, [_vm._v("预售中")]), _vm._v(" "), _c('td', {
	    staticClass: "menu-item",
	    class: {
	      select: _vm.select == 2
	    },
	    on: {
	      "click": function($event) {
	        _vm.menuSelect(2)
	      }
	    }
	  }, [_vm._v("已完成")]), _vm._v(" "), _c('td', {
	    staticClass: "menu-item",
	    class: {
	      select: _vm.select == 3
	    },
	    on: {
	      "click": function($event) {
	        _vm.menuSelect(3)
	      }
	    }
	  }, [_vm._v("审核中")])])]), _vm._v(" "), _c('table', {
	    staticClass: "content"
	  }, [_c('tr', [_c('td', [_vm._v("内参名称")]), _vm._v(" "), _c('td', [_vm._v("服务周期")]), _vm._v(" "), _c('td', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.feedVisible),
	      expression: "feedVisible"
	    }]
	  }, [_vm._v("订阅人数")]), _vm._v(" "), _c('td', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.statusVisible),
	      expression: "statusVisible"
	    }]
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.params.status),
	      expression: "params.status"
	    }],
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.params.status = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "0"
	    }
	  }, [_vm._v("待审核")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("未通过")])])]), _vm._v(" "), _c('td', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.linkVisible),
	      expression: "linkVisible"
	    }]
	  }, [_vm._v("操作")]), _vm._v(" "), _c('td', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.deleteVisible),
	      expression: "deleteVisible"
	    }]
	  }, [_vm._v("编辑")]), _vm._v(" "), _c('td', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.deleteVisible),
	      expression: "deleteVisible"
	    }]
	  }, [_vm._v("删除")])]), _vm._v(" "), _c('tr', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.rows.length < 1),
	      expression: "rows.length<1"
	    }]
	  }, [_vm._m(0)]), _vm._v(" "), _vm._l((_vm.rows), function(item, index) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(item._title))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item._start) + " "), _c('span', {
	      staticStyle: {
	        "margin": "0 5px"
	      }
	    }, [_vm._v("至")]), _vm._v(" " + _vm._s(item._end))]), _vm._v(" "), _c('td', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.feedVisible),
	        expression: "feedVisible"
	      }]
	    }, [_vm._v(_vm._s(item.subscribenumber))]), _vm._v(" "), _c('td', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.statusVisible),
	        expression: "statusVisible"
	      }]
	    }, [_vm._v(_vm._s(item._statusText))]), _vm._v(" "), _c('td', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.linkVisible),
	        expression: "linkVisible"
	      }]
	    }, [_c('a', {
	      attrs: {
	        "href": '/reference/' + item.id + '.htm',
	        "target": "_blank"
	      }
	    }, [_vm._v("查看")])]), _vm._v(" "), _c('td', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.deleteVisible),
	        expression: "deleteVisible"
	      }]
	    }, [_c('i', {
	      staticClass: "fa fa-edit",
	      on: {
	        "click": function($event) {
	          _vm.editRefer(item.id, index)
	        }
	      }
	    })]), _vm._v(" "), _c('td', {
	      directives: [{
	        name: "show",
	        rawName: "v-show",
	        value: (_vm.deleteVisible),
	        expression: "deleteVisible"
	      }]
	    }, [_c('i', {
	      staticClass: "fa fa-trash",
	      on: {
	        "click": function($event) {
	          _vm.deleteRefer(item.id, index)
	        }
	      }
	    })])])
	  })], 2), _vm._v(" "), _c('div', {
	    staticClass: "page",
	    staticStyle: {
	      "height": "50px",
	      "width": "13%",
	      "margin": "0 auto",
	      "margin-top": "15px"
	    }
	  }, [_c('el-pagination', {
	    attrs: {
	      "layout": "prev, pager, next",
	      "total": _vm.total,
	      "page-size": _vm.params.pageSize,
	      "current-page": _vm.params.currentPage
	    },
	    on: {
	      "current-change": _vm.onPage
	    }
	  })], 1), _vm._v(" "), _c('newRefer', {
	    attrs: {
	      "visible": _vm.showNewRefer,
	      "data": _vm.newReferFill
	    }
	  })], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    attrs: {
	      "colspan": "10"
	    }
	  }, [_c('div', {
	    staticClass: "center none"
	  }, [_c('span', [_c('i', {
	    staticClass: "fa fa-exclamation-circle fa-lg"
	  }), _vm._v("暂无记录")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1843297a", module.exports)
	  }
	}

/***/ })
]);