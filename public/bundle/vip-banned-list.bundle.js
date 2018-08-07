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

	var layer = __webpack_require__(1);
	/* 禁言列表 */
	var list = function () {
	    var container,
	        items,
	        bootpag,
	        params = {
	        currentPage: 1,
	        pageSize: 10
	    };

	    var create = function create(item) {
	        return '<div class="list">\n                <span class="small">' + item.userName + '</span>\n                <span class="small">' + item.createTime + '</span>\n                <span class="small">' + item.txt + '</span>\n                <button data-id=' + item.id + '>\u89E3\u7981</button>\n                </div>';
	    };

	    var handle = function handle(arr) {
	        return _.map(arr, function (item) {
	            if (item.bannedDay == '-1') {
	                item._time = '0';
	            } else {
	                item._time = item.bannedDay;
	            }
	            item.txt = ['永久禁言', '禁言1天'][item._time];
	            return item;
	        });
	    };

	    return {
	        init: function init() {
	            var _this = this;
	            container = $('.banned');
	            bootpag = yn.bootpag('.page');
	            bootpag.on('page', function (err, n) {
	                params.currentPage = n;
	                _this.render();
	            });

	            container.on('click', 'button', function () {
	                var id = $(this).data('id');
	                $.post('/banned/delBanned.htm', { ids: id }, function (back) {
	                    if (back.status == '1') {
	                        layer.msg('已解禁');
	                        list.render();
	                    }
	                }, 'json');
	            });
	        },
	        render: function render() {

	            $.post('/banned/bannedList.htm', params, function (back) {
	                var data = JSON.parse(back.data);
	                if (data.rows.length < 1) {
	                    return container.html('<div style="width:1200px;height:100px;text-align:center;line-height:100px;font-size:20px;background:#fff;">\u6682\u65E0\u6570\u636E</div>');
	                }
	                var html = _.map(handle(data.rows), function (item) {
	                    return create(item);
	                }).join('');
	                container.html(html);
	                var pageNumber = _.max([1, Math.ceil(data.total / params.pageSize)]);
	                bootpag.bootpag({ page: params.currentPage, total: pageNumber });
	            }, 'json');
	        }
	    };
	}();

	$(function () {
	    list.init();
	    list.render();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	/* 使用layer2.js */

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
	        confirm_visible = false,
	        msg_visible = false;

	    var tag = "<div id=\"layer-item-container\" class=\"hide\">\n                <div class=\"layer-item-wrap\">\n                    <div class=\"layer-item-box\">\n                        <div id=\"layer-item-msg\" class=\"layer-item hide\">\n                            <span class=\"layer-item-icon layer-item-\"></span>\n                            <span class=\"layer-item-title\"></span>\n                            <span class=\"layer-item-icon close hide\"></span>\n                        </div>\n                        <div id=\"layer-item-confirm\"  class=\"layer-item hide\">\n                            <div class=\"confirm-title\">\u6E29\u99A8\u63D0\u793A</div>\n                            <div class=\"confirm-content\"></div>\n                            <div class=\"buttons\">\n                                <span class=\"inline confirm-btn no\">\u53D6\u6D88</span>\n                                <span class=\"inline confirm-btn yes\">\u786E\u5B9A</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>";

	    var animate = function animate() {
	        var animateType = {
	            pop: "transition.expandIn",
	            down: "transition.slideDownIn"
	        };
	        box.velocity(animateType.pop, { duration: 200 });
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
	            }, 1000);
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
	        close: function close() {
	            container.hide();
	        }
	    };
	}();

/***/ })
/******/ ]);