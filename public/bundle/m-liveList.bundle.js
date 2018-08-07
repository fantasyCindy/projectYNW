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

	$(function () {
	    tag.init();
	    tag.render();
	});

	var tag = function () {
	    var container,
	        tag,
	        type = 3;
	    var getUrlParam = function getUrlParam(name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]);
	        return null;
	    };
	    var createItems = function createItems(arr) {
	        return arr.map(function (item) {
	            return "<div class=\"wrap_list clear\"><a href=\"/mobile/m-liveing.htm?teacherid=" + item.teacherid + "\"><div class=\"wrap_cont clear\"><div class=\"photo\"><img src=\"" + item.photo + "\"/></div><div class=\"wrap_intro\"><div class=\"wrap_title\">" + item.title + "</div><div class=\"intro\">" + item.content + "</div></div></div><div class=\"quantity\"><p>" + item.popularity + "</p>\u4EBA\u53C2\u4E0E</div></a></div>";
	        }).join('');
	    };
	    return {
	        init: function init() {
	            var _this = this;
	            var nav = m_config.link(location.href, m_config.livelist);
	            container = $('#liveList');
	            tag = $('#tag');
	            type = parseInt(nav.index) + 1;
	            tag.find('.item').eq(nav.index).addClass('select');
	            this.render();
	            tag.on('click', '.item', function () {
	                $(this).parent().find('.item').removeClass('select');
	                $(this).addClass('select');
	                type = $(this).data('type');
	                _this.render();
	            });
	        },
	        render: function render() {
	            var send = {
	                order: "attentionnumber", // pinyininitials按拼音排序
	                sort: "desc", //desc=?
	                type: type //1=最热, 2=观点最多, 3=互动最多
	            };
	            $.getJSON('/html/broadcastingList.htm', send, function (data) {
	                if (data.status == 1) {
	                    container.html(createItems(data.data));
	                }
	            });
	        }
	    };
	}();

/***/ })
/******/ ]);