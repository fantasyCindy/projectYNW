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

	$(function () {

	    __webpack_require__(1);
	    var local = __webpack_require__(2);
	    yn.centerMenu.init({ render: 'my', light: '我的战法' });

	    var list = __webpack_require__(3);
	    var pub = __webpack_require__(8);

	    var router = new VueRouter({
	        routes: [{ path: "/", component: list }, { path: "/pub", component: pub }]
	    });

	    var vm = new Vue({
	        el: '#contentWrap',
	        router: router
	    });
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	// 设置菜单高亮

	yn.navigation.name = ynconfig.navigation.g;
	yn.logout.path = __path;
	if (!ynIsLogin) {
	    setTimeout(function () {
	        yn.login.render();
	    }, 100);
	    yn.login.onClose = function () {
	        location.href = __path;
	    };
	}

	/*----

	个人中心菜单

	1.初始化
	yn.centerMenu.init({
	    render:'my',
	    light:'我的观点'
	}) 

	1-2.渲染
	yn.centerMenu.render({type:'my'}) 

	----*/
	yn.centerMenu = function () {
	    var container, items, title, light;

	    var createItems = function createItems(arr) {
	        return _.map(arr, function (item) {
	            var select = _.trim(item.menuname) == light ? "select" : "";
	            return "<a class=\"item " + select + "\" id=\"" + item.menu_id + " \" href=\"/" + item.menuurl + "\"><span class=\"txt \">" + item.menuname + "</span><i class=\"fa fa-angle-right \"></i></a>";
	        }).join("");
	    };
	    return {
	        init: function init(ops) {
	            container = $('#centerMenu');
	            items = container.find('.items');
	            title = container.find('.title .name');
	            light = ops.light || "";
	            ops.render && this.render({ type: ops.render });
	        },
	        render: function render(ops) {
	            ops = _.extend({ type: "center" }, ops);
	            var types = {
	                center: { title: "个人设置", url: "/menu/queryWebUserMenu.htm" },
	                my: { title: "个人中心", url: "/menu/queryWebUserMyMenu.htm" }
	            };

	            var type = types[ops.type];
	            var url = type.url;
	            title.text(type.title);
	            new yn.loading({ container: items, margin: 200 }).render();
	            $.getJSON(url, { user_id: ynUserId }, function (data) {
	                return items.html(createItems(data));
	            });
	        }
	    };
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 *
	 *    本地缓存数据
	 * 
	 * ---- get(key, {disable, timeout}) 
	 * 
	 *             key : localStorage中的key
	 *             disable : Boolean , 是否禁用缓存, 默认false
	 *             timeout :  Number , 缓存时间(单位:秒) , 默认5分钟
	 *             return :  undefine || { data, valid } 
	 *
	 *  ---- set(key, value)
	 *          
	 *  ---- joinKey  :　拼接对象值的为字符串 : 将查询字符作为key时使用
	 *  
	 *  
	 *
	 * 
	 */

	var JSON = window.JSON || false;
	var db = localStorage;

	var set = function set(key, value) {
	    if (!(JSON && key)) return;
	    value = [_.now(), JSON.stringify(value)].join('@@@@');
	    db.setItem(key, value);
	};

	var get = function get(key, ops) {

	    if (!(JSON && key)) return;

	    ops = _.extend({
	        disable: false,
	        timeout: 3000
	    }, ops);

	    var val = db.getItem(key);
	    if (!(val && /@@@@/.test(val))) return;

	    var split = val.split('@@@@');
	    var data = JSON.parse(split[1]);
	    var time = split[0];

	    // 判断是否超时
	    var valid = !ops.disable && _.now() - time <= ops.timeout * 1000;
	    return { data: data, valid: valid };
	};

	module.exports = {
	    set: set,
	    get: get,
	    joinKey: function joinKey(obj) {
	        var r = [];
	        for (var key in obj) {
	            r.push(String(obj[key]));
	        }
	        return r.join("");
	    }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(4)(
	  /* script */
	  __webpack_require__(5),
	  /* template */
	  __webpack_require__(7),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\Administrator\\Desktop\\YNW\\public\\comp\\myTactics-list.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] myTactics-list.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3d8f5e1e", Component.options)
	  } else {
	    hotAPI.reload("data-v-3d8f5e1e", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 4 */
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
/* 5 */
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

	var where = window.location.href.indexOf('yueniuwang') >= 0 ? 'ynw' : 'cj';
	var error = __webpack_require__(6);
	exports.default = {
	    data: function data() {
	        return {
	            query: {
	                currentPage: 1,
	                pageSize: 10,
	                teacherid: ynTeacherId
	            },
	            select: 0,
	            list: [],
	            link: __path,
	            total: ''
	        };
	    },

	    methods: {
	        makeLink: function makeLink(item) {
	            var r = "";
	            r = '/learning/' + item.id + '.htm';
	            return r;
	        },
	        onPage: function onPage(page) {
	            this.query.currentPage = page;
	            this.getData();
	        },
	        remove: function remove(id) {
	            var _this = this;

	            this.$confirm("确定要删除吗", "温馨提示", {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning',
	                callback: function callback(select) {
	                    if (select == "confirm") {
	                        $.post("/learning/delLearning.htm", {
	                            id: id
	                        }, function (data) {
	                            data = JSON.parse(data);
	                            if (data.status == "1") {
	                                _this.$message({
	                                    type: 'success',
	                                    message: '删除成功'
	                                });
	                                _this.getData();
	                                return;
	                            }
	                            _this.$message.error(error[data.status]);
	                        });
	                    }
	                }
	            });
	        },


	        /* beautify preserve:start */

	        modify: function modify(item) {
	            store.editData = item;
	            this.$router.push({ path: '/pub' });
	        },
	        showPub: function showPub() {
	            store.editData = null;
	            this.$router.push({ path: '/pub' });
	        },


	        /* beautify preserve:end */
	        getMyOpinion: function getMyOpinion(ops) {
	            /* ajax */
	            _.extend(this.query, ops);
	            var defer = $.Deferred();
	            $.getJSON("/learning/teacherTactics.htm", this.query, function (data) {
	                if (data.status == 1) {
	                    defer.resolve(data);
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	            return defer.promise();
	        },
	        getData: function getData() {
	            var _this2 = this;

	            this.getMyOpinion().then(function (data) {
	                _this2.total = +data.data.total;
	                _this2.list = data.data.list;
	                $('body').velocity({
	                    scroll: 0
	                }, {
	                    offset: 0,
	                    duration: 300
	                });
	            });
	        }
	    },
	    mounted: function mounted() {
	        this.getData();
	    }
	};

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "myOpinion"
	    }
	  }, [_c('div', {
	    staticClass: "line top"
	  }, [_c('span', {
	    staticClass: "title"
	  }, [_vm._v("战法统计")]), _vm._v(" "), _c('a', {
	    staticClass: "button-1 ynlink",
	    attrs: {
	      "id": "postOpinion"
	    },
	    on: {
	      "click": _vm.showPub
	    }
	  }, [_vm._v("发布战法")])]), _vm._v(" "), _c('div', {
	    staticClass: "line itemsHead"
	  }, [_c('table', [_c('tr', [_c('td', {
	    staticClass: "action",
	    class: {
	      select: _vm.select == 0
	    },
	    on: {
	      "click": function($event) {
	        _vm.changeTab(0)
	      }
	    }
	  }, [_vm._v("已发布战法")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "line items release",
	    attrs: {
	      "id": "opinion-list"
	    }
	  }, [(_vm.list.length == 0) ? _c('div', {
	    staticClass: "nothing"
	  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.list), function(item) {
	    return _c('div', {
	      staticClass: "item"
	    }, [_c('div', {
	      staticClass: "title"
	    }, [_c('a', {
	      attrs: {
	        "href": _vm.makeLink(item),
	        "target": "_blank"
	      }
	    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('div', {
	      staticClass: "info"
	    }, [_c('span', {
	      staticClass: "type"
	    }, [_vm._v(_vm._s(item.classifyName))]), _vm._v(" "), _c('span', {
	      staticClass: "time"
	    }, [_vm._v(_vm._s(item.releasedTime))]), _vm._v(" "), (!_vm.isDraft) ? _c('span', {
	      staticClass: "info-item"
	    }, [_vm._v("阅读("), _c('span', {
	      staticClass: "read"
	    }, [_vm._v(_vm._s(item.viewcount))]), _vm._v(")")]) : _vm._e(), _vm._v(" "), (!_vm.isDraft) ? _c('span', {
	      staticClass: "info-item"
	    }, [_vm._v("点赞("), _c('span', {
	      staticClass: "like"
	    }, [_vm._v(_vm._s(item.zancount))]), _vm._v(")")]) : _vm._e(), _vm._v(" "), (!_vm.isDraft) ? _c('span', {
	      staticClass: "info-item"
	    }, [_vm._v("评论("), _c('span', {
	      staticClass: "comment"
	    }, [_vm._v(_vm._s(item.commentcount))]), _vm._v(")")]) : _vm._e(), _vm._v(" "), _c('button', {
	      staticClass: "modify fr",
	      on: {
	        "click": function($event) {
	          _vm.modify(item)
	        }
	      }
	    }, [_vm._v("修改")]), _vm._v(" "), _c('button', {
	      staticClass: "delete fr",
	      on: {
	        "click": function($event) {
	          _vm.remove(item.id)
	        }
	      }
	    }, [_vm._v("删除")])])])
	  }), _vm._v(" "), _c('div', {
	    staticClass: "center"
	  }, [_c('el-pagination', {
	    attrs: {
	      "total": _vm.total,
	      "page-size": _vm.query.pageSize,
	      "current-page": _vm.query.currentPage,
	      "layout": "prev, pager, next"
	    },
	    on: {
	      "current-change": _vm.onPage
	    }
	  })], 1)], 2)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3d8f5e1e", module.exports)
	  }
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(4)(
	  /* script */
	  __webpack_require__(9),
	  /* template */
	  __webpack_require__(12),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\Administrator\\Desktop\\YNW\\public\\comp\\myTactics-pub.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] myTactics-pub.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-970ba20c", Component.options)
	  } else {
	    hotAPI.reload("data-v-970ba20c", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ }),
/* 9 */
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

	var ue,
	    ueInit = __webpack_require__(10);
	var fn = __webpack_require__(11);
	var error = __webpack_require__(6);

	// 验证表达式
	var expressTable = {
	    title: {
	        invalid: function invalid() {
	            return !_.trim(this.title);
	        },

	        msg: '请输入标题'
	    },
	    keywords: {
	        invalid: function invalid() {
	            return !_.trim(this.keyWords);
	        },

	        msg: '请输入关键词'
	    },
	    content: {
	        invalid: function invalid() {
	            return !_.trim(this.content);
	        },

	        msg: '请输入正文内容'
	    }

	    /* beautify preserve:end */

	};exports.default = {
	    data: function data() {
	        return {
	            send: {
	                title: '',
	                content: '',
	                ltype: 0,
	                keywords: '',
	                id: '',
	                teacherid: ynTeacherId
	            },
	            isEdit: false,
	            text: ''
	        };
	    },

	    methods: {
	        should: function should(type) {
	            if (type == "up") {
	                this.up = "danger";
	                this.down = "";
	            }
	            if (type == "down") {
	                this.down = "success";
	                this.up = "";
	            }
	        },
	        validate: function validate(need) {
	            var _this = this;

	            // 查询表达式, 执行验证
	            var error = _.find(need, function (item) {
	                var express = expressTable[item];
	                var isInvalid = express.invalid.call(_this, null);
	                if (isInvalid) {
	                    layer.msg(express.msg);
	                }
	                return isInvalid;
	            });

	            return !error;
	        },
	        submit: function submit() {
	            var _this2 = this;

	            this.send.content = ue.getContent().replace(/<a.+?>|<\/a>/g, '');

	            // 验证表单
	            if (!this.send.title) {
	                return layer.msg('请输入标题');
	            }
	            if (!this.send.keywords) {
	                return layer.msg('请输入关键词');
	            }
	            if (!this.send.content) {
	                return layer.msg('请输入内容');
	            }

	            // 发布观点
	            $.post("/learning/addLearning.htm", this.send, function (data) {
	                data = JSON.parse(data);
	                if (data.status == 1) {
	                    _this2.text = _this2.isEdit ? '修改成功' : '发布成功';
	                    layer.msg(_this2.text);
	                    _this2.$router.push({
	                        path: '/'
	                    });
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    },
	    mounted: function mounted() {

	        if (store.editData) {
	            this.isEdit = true;
	            fn.override(this.$data, store.editData);
	            console.log("data33", store.editData);
	            this.send.title = store.editData.title;
	            this.send.keywords = store.editData.keywords;
	            this.send.id = store.editData.id;
	        }

	        ue = ueInit('ue-container');
	        ue.ready(function () {
	            ue.setContent;
	            if (store.editData) {
	                ue.setContent(store.editData.content);
	            }
	        });
	    },
	    destroyed: function destroyed() {
	        ue.destroy();
	    }
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function (id) {

	    return UE.getEditor(id, {
	        toolbars: [['bold', //加粗
	        'indent', //首行缩进
	        'snapscreen', //截图
	        'underline', //下划线
	        'pasteplain', //纯文本粘贴模式
	        'horizontal', //分隔线
	        'removeformat', //清除格式
	        'fontsize', //字号
	        'forecolor', //文字颜色
	        'simpleupload', //单图上传
	        'insertimage', //多图上传
	        'justifyleft', //居左对齐
	        'justifycenter', //居中对齐
	        'justifyjustify', //两端对齐
	        'fullscreen', //全屏
	        'imagecenter', //居中
	        'lineheight']],
	        enableAutoSave: false,
	        saveInterval: 36000000,
	        initialFrameHeight: 250,
	        elementPathEnabled: false,
	        wordCount: false,
	        enableContextMenu: false,
	        pasteplain: true,
	        autotypeset: {
	            removeClass: true,
	            clearFontSize: true,
	            removeEmptyline: true, //去掉空行
	            removeEmptyNode: false, // 去掉空节点
	            autotypeset: true,
	            indentValue: '2em'
	        }
	    });
	};

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(!_vm.isVip) ? _c('div', {
	    staticClass: "title-1"
	  }, [_vm._v("发布战法")]) : _vm._e(), _vm._v(" "), (_vm.isVip) ? _c('div', {
	    staticClass: "title-1"
	  }, [_vm._v("发布")]) : _vm._e(), _vm._v(" "), (_vm.isVip) ? _c('div', {
	    staticClass: "vip-icon"
	  }, [_c('img', {
	    attrs: {
	      "src": "/public/images/vipact/logo.png"
	    }
	  })]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "pub-content"
	  }, [_c('el-form', {
	    attrs: {
	      "label-width": "80px"
	    }
	  }, [_c('el-form-item', {
	    attrs: {
	      "label": "标题"
	    }
	  }, [_c('el-input', {
	    model: {
	      value: (_vm.send.title),
	      callback: function($$v) {
	        _vm.$set(_vm.send, "title", $$v)
	      },
	      expression: "send.title"
	    }
	  })], 1), _vm._v(" "), _c('el-form-item', {
	    attrs: {
	      "label": "关键词"
	    }
	  }, [_c('el-input', {
	    attrs: {
	      "placeholder": "请输入内容"
	    },
	    model: {
	      value: (_vm.send.keywords),
	      callback: function($$v) {
	        _vm.$set(_vm.send, "keywords", $$v)
	      },
	      expression: "send.keywords"
	    }
	  })], 1), _vm._v(" "), _c('el-form-item', {
	    attrs: {
	      "label": "正文"
	    }
	  }, [_c('div', {
	    attrs: {
	      "id": "ue-container"
	    }
	  })])], 1), _vm._v(" "), _c('div', {
	    staticClass: "center"
	  }, [_c('el-button', {
	    attrs: {
	      "type": "danger",
	      "size": "large"
	    },
	    on: {
	      "click": function($event) {
	        _vm.submit(0)
	      }
	    }
	  }, [_vm._v("发布")])], 1)], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-970ba20c", module.exports)
	  }
	}

/***/ })
/******/ ]);