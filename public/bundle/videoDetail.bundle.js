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

	'use strict';

	window._bd_share_config = {
	    common: {
	        onBeforeClick: function onBeforeClick(cmd, config) {
	            config.bdText = $('#videoInfo .title').text() + '--【约投顾】';
	            config.bdDesc = $('#videoInfo .title').text() + '--【约投顾】';
	            return config;
	        },
	        onAfterClick: function onAfterClick(cmd) {
	            $('.bdsharebuttonbox').hide();
	        }
	    },
	    share: {
	        "bdSize": 24,
	        "bdStyle": 1,
	        "bdCustomStyle": "/public/css/all.css"
	    }
	};

	var createVideo = function createVideo(vid) {
	    var player = new YKU.Player('video-container', {
	        styleid: '0',
	        client_id: '70bee75ccf5b9678',
	        vid: vid,
	        newPlayer: true
	    });
	};

	/* /////////////////////////////////////////////////////////////////// */

	$(function () {

	    $($('#video-container').find('param')[2]).attr('value', 'transparent');
	    $('#video-container').find('embed').attr('wmode', 'opaque');

	    var showShare = false;
	    var video = {
	        container: $('#videoDetail'),
	        relative: $('#relative'),
	        videoComment: $('#videoComment'),
	        pubComment: $('#pubComment'),
	        textarea: $('#pubContent'),
	        page: 1,
	        row: 10,
	        bootpag: null,
	        wordCount: $('#wordCount'),
	        share: $('.share'),
	        bd: $('.bdsharebuttonbox'),
	        init: function init() {
	            var _this = this;

	            var createTag = function createTag() {
	                if (videoSrc) return '<div class="auto">' + videoSrc + '</div>';
	                if (videoUrl) {
	                    return '<div><embed src="' + videoUrl + '" quality="high"  width="800" height="525"align="middle" allowScriptAccess="always" \n                         autostart=false mode="transparent" type=""></embed></div>';
	                }
	            };

	            // 
	            var tag = createTag();
	            var videoWrap = $('#video-container');
	            if (/youku/.test(tag)) {
	                var vidMatch = tag.match(/[0-9a-zA-Z]+==/);
	                vidMatch && createVideo(vidMatch[0]);
	            } else {
	                videoWrap.html(tag);
	            }

	            this.bootpag = yn.bootpag(this.videoComment);
	            this.bootpag.on('page', function (err, n) {
	                _this.page = n;
	                _this.renderComment();
	            });
	            this.renderRelative();
	            this.renderComment();
	            yn.wordCount(this.textarea, {
	                limit: 200,
	                indicate: this.wordCount
	            });

	            this.event();
	        },

	        //相关课程
	        renderRelative: function renderRelative() {
	            var self = this;
	            yndata.getRelativeVideo(teacherId).done(function (data) {
	                data.rows = _.map(data.rows, function (item) {
	                    if (item.title.length > 31) {
	                        item.title = item.title.substr(0, 31) + "...";
	                    }
	                    return item;
	                });
	                self.relative.find('.items').html(template('relative-template', data.rows));
	            });
	        },

	        //视频评论
	        renderComment: function renderComment() {
	            var self = this;
	            yndata.getVideoComment(videoId, { page: this.page, row: this.row }).done(function (data) {
	                var items = self.videoComment.find('.items');
	                if (data.data && data.data.length < 1) {
	                    items.html("<p style='text-align:center;margin:50px 0;font-size:15px;'>暂无评论, 赶快抢沙发</p>");
	                    self.bootpag.hide();
	                    return;
	                }

	                data.data = _.map(data.data, function (item) {
	                    if (!item.createPhoto) {
	                        item.createPhoto = "/public/images/user.jpg";
	                    }
	                    return item;
	                });

	                items.html(template('video-comment-template', data.data));
	                var time = $('#videoComment .time').text();
	                console.log('time1', time);
	                time = time.substr(0, 10);
	                $('.time').html(time);
	                console.log(time);
	                self.bootpag.show();
	                self.bootpag.bootpag({ page: self.page, total: data.pageNumber });
	            });
	        },

	        event: function event() {
	            var _this2 = this;

	            var self = this;

	            //检测登录
	            this.textarea.focus(function () {
	                if (!ynIsLogin) return yn.login.render();
	            });

	            //点赞
	            this.container.on('click', '.like', function () {
	                var count = $(this).find('.likeCount');
	                $.post("/video/editZan.htm", { video_id: videoId }, function (data) {
	                    if (data == "success") {
	                        layer.msg("谢谢您的赞美");
	                        var val = +count.text();
	                        count.text(++val);
	                        return;
	                    }
	                    if (data == "complete") {
	                        layer.msg("您已经点过赞啦!");
	                        return;
	                    }
	                });
	            });

	            //发布评论
	            this.pubComment.on('click', 'button', function () {
	                var content = _this2.textarea.val();
	                content = _.trim(content);
	                if (!content) {
	                    layer.msg("请输入发布内容");
	                    return;
	                }
	                yndata.postVideoComment(videoId, content).done(function (data) {
	                    _this2.textarea.val("");
	                    _this2.page = 1;
	                    _this2.renderComment();
	                    _this2.wordCount.text(200);
	                });
	            });

	            //分享
	            this.share.on('click', function () {
	                yn.positionShare($(this));
	            }).on('mouseleave', function () {
	                setTimeout(function () {
	                    if (!showShare) {
	                        self.bd.hide();
	                    }
	                });
	            });

	            this.bd.on('mouseenter', function () {
	                showShare = true;
	            }).on('mouseleave', function () {
	                showShare = false;
	                _this2.bd.hide();
	            });
	        }
	    };

	    /*------------------------------------------*/

	    video.init();
	});

/***/ })
/******/ ]);