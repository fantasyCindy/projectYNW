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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	$(function () {

	    /*///////////////////////////////////////////////////////////////////*/

	    document.oncontextmenu = function () {
	        return false;
	    };

	    var app = function () {
	        var container = $('#app');
	        var current = "public";

	        return {
	            // 修改类型样式名称
	            changeType: function changeType(type) {
	                if (current == type) return;
	                var className = container.attr('class');
	                var reg = new RegExp(current);
	                container.attr('class', className.replace(reg, type));
	                current = type;
	            }
	        };
	    }();

	    /* 顶部菜单栏 */
	    var topBar = function () {
	        var container = $('#app-top');

	        // 点击高亮
	        container.on('click', '.top-item', function () {
	            $(this).addClass('active').siblings().removeClass('active');
	            var type = $(this).data('value');
	            app.changeType(type);
	        });
	    }();

	    /* 列表 */
	    var list = function () {
	        var container = $('#app-list');
	        var create = function create(arr) {
	            return arr.map(function (item) {});
	        };

	        // 双击
	        container.on('dblclick', '.list-item', function (e) {
	            alert($(this).text());
	        });

	        // 快捷发送
	        container.on('click', '.send.icon', function (e) {
	            alert("快捷发送");
	            return false;
	        });

	        container.on('contextmenu', '.list-item', function (e) {
	            contextmenu.render({
	                x: e.pageX,
	                y: e.pageY
	            });
	            return false;
	        });
	    }();

	    /*  右键菜单 */
	    var contextmenu = function () {
	        var container = $('#contextmenu');
	        var items = container.find('.items');

	        var create = function create(arr) {
	            return arr.map(function (item) {
	                var tag = ' <div class="ct-item">\n                            <span class="value">' + item.name + '</span>\n                        </div>';
	            });
	        };

	        document.onclick = function () {
	            container.hide();
	        };

	        // select
	        container.on('click', '.ct-item', function () {});

	        return {
	            // ctx = {x, y, [[1, 2], [3, 4]]}

	            render: function render(ops) {
	                container.css({
	                    "top": ops.y + 10 + "px",
	                    "left": Math.min(140, ops.x) + "px"
	                });
	                // items.html(create(ops.data))
	                container.show();
	            }
	        };
	    }();

	    /*///////////////////////////////////////////////////////////////////*/
	});

/***/ }
/******/ ]);