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

	var bootpag;
	var params = {
	    type: "", //类型
	    album: "", //专辑
	    time: "1", //创建时间
	    look: "", //最多观看/最新发布
	    page: 1, //页码
	    row: 12 };

	/**
	 * 分类
	 */
	var category = function () {

	    var container, videoType;

	    return {

	        init: function init() {
	            container = $(".category");
	            videoType = $('#videoType');

	            //切换
	            container.on('click', '.sort-item', function () {
	                $(this).parent().find('.select').removeClass('select');
	                $(this).addClass('select');

	                //解析数据
	                var filter = $(this).data('filter');
	                filter.replace(/[^@]+/g, function (value) {
	                    var arr = value.split('=');
	                    params[arr[0]] = arr[1];
	                });
	                params.page = 1;
	                video.render(params);
	            });
	        },

	        render: function render() {
	            ajax.getVideoCategory().done(function (data) {
	                var tags = _.map(data, function (item) {
	                    return '<span class="sort-item" data-filter="type=' + item.type_id + '"> ' + item.name + '</span>';
	                }).join('');
	                videoType.append(tags);
	            });
	        }
	    };
	}();

	/**
	 * 视频列表
	 */
	var video = function () {
	    var container, category;

	    var handle = function handle(data) {
	        var jump = [video_path + "video/", video_path + "/album/detail.htm?albumId="];
	        return _.map(data, function (item) {
	            if (!item.teacherName) {
	                item.teacherName = "约投顾";
	            }
	            //根据album_id值, 跳转到不同地址
	            item.jump = item.album_id == "-1" ? jump[0] + item.video_id + ".htm" : jump[1] + item.album_id;
	            item.create_time = item.create_time.match(/^[0-9\-]+/)[0];
	            return item;
	        });
	    };

	    var createItems = function createItems(arr) {
	        return _.map(arr, function (item) {
	            return "<div class=\"item\">\n                <span class=\"time\">" + item.create_time + "</span>\n                <a href=\"" + item.jump + "\" title=\"" + item.title + "\" target=\"_blank\" class=\"thum imgw\">\n                    <img src=\"" + item.image + "\">\n                </a>\n                <a href=\"" + item.jump + "\" target=\"_blank\" class=\"title block\" title=\"" + item.title + "\">" + item.title + "</a>\n                <div class=\"author\">\n                    <span>\u8BB2\u5E08\uFF1A" + item.teacherName + "</span>\n                </div>\n                <div class=\"info\">\n                    <span class=\"count\">" + item.look_count + "\u4EBA\u6B63\u5728\u5B66\u4E60..</span>\n                </div>\n            </div>";
	        }).join('');
	    };

	    return {
	        init: function init() {
	            container = $(".list");
	            ajax.getVideoCount().done(function (data) {
	                $('.total-count').text(data);
	            });
	        },


	        //视频列表
	        render: function render() {
	            ajax.getVideos(params).done(function (data) {
	                log("视频", data);
	                container.html(createItems(handle(data.rows)));
	                bootpag.bootpag({ page: params.page, total: +data.pageNumber });
	                $('body').velocity('scroll', { duration: 300, offset: 150 });
	            });
	        }
	    };
	}();

	//////////////////////////////////////////////////////////////////


	$(function () {

	    category.init();
	    category.render();

	    video.init();
	    video.render();

	    bootpag = yn.bootpag($("#video"));
	    bootpag.on('page', function (e, num) {
	        params.page = num;
	        video.render();
	    });
	});

	/*--------*/

	var ajax = {};

	/*视频课程数量*/
	ajax.getVideoCount = function () {
	    var defer = $.Deferred();
	    $.get("/video/collageListCount.htm", function (data) {
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

	/*课程分类*/
	ajax.getVideoCategory = function () {
	    var url = "/videoType/select.htm";
	    var defer = $.Deferred();
	    $.getJSON(url, function (data) {
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

	/*视频课程*/
	ajax.getVideos = function (ops) {
	    var defer = $.Deferred();
	    ops = _.extend({
	        type: "", //类型
	        album: "", //专辑
	        time: "1", //最新发布
	        look: "", //最多观看
	        page: 1, //页码
	        row: 12 //数量
	    }, ops);

	    var send = {
	        videoType: ops.type,
	        byAlbum: ops.album,
	        byCreateTime: ops.time,
	        byLookCount: ops.look,
	        pageSize: ops.row,
	        currentPage: ops.page
	    };

	    $.getJSON("/video/collageList.htm", send, function (data) {
	        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

/***/ })
/******/ ]);