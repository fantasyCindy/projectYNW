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
/***/ (function(module, exports) {

	"use strict";

	//导航高亮

	window.m = {};
	m.navigation = function () {
	    var container, li, icon;
	    var getName = function getName(path) {
	        var paths = [{ key: "m-about", name: "关于我们" }, { key: "m-law", name: "法律声明" }, { key: "m-mianze", name: "免责条款" }, { key: "m-fengxian", name: "风险提示" }, { key: "m-account", name: "企业账户" }, { key: "m-help", name: "帮助中心" }, { key: "m-zhaopin", name: "招贤纳士" }, { key: "m-contact", name: "联系我们" }];
	        var name = "";
	        paths.forEach(function (item) {
	            if (path.indexOf(item.key) != -1) {
	                name = item.name;
	            }
	        });
	        return name;
	    };
	    return {
	        name: null,
	        init: function init() {
	            container = $('#navbar');
	            li = container.find('.navbar-collapse li');
	            container.on('click', '.navbar-toggle', function () {
	                event.stopPropagation();
	                container.find('.navbar-collapse').slideToggle(200);
	            });
	            document.onclick = function () {
	                container.find('.navbar-collapse').hide(200);
	            };
	        },
	        select: function select() {
	            //优先使用指定的值, 再从地址中识别
	            var name = this.name || getName(location.href);
	            li.each(function (i) {
	                if ($(this).text() == name) {
	                    container.find('.title').html(name);
	                    $(this).addClass("active");
	                }
	            });
	        }
	    };
	}();

	$(function () {
	    m.navigation.init();
	    m.navigation.select();
	});

/***/ })
/******/ ]);