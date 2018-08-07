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

	var liveDetailCommon = __webpack_require__(1);
	var opinionType = __webpack_require__(14);
	/*///////////////////////////////////////////////////////////////////*/
	var __href = window.location.href;
	var cateMatch = __href.match(/liveDetail/);
	var __cate = cateMatch ? cateMatch[0] : "";
	var match = __href.match(/liveDetail\/(\d+)/);
	var teacherid = match ? match[1] : '';
	//观点
	var opinionList = function () {
	    var container,
	        items,
	        params = {
	        currentPage: 1,
	        pageSize: 4,
	        classify: '0',
	        teacherid: teacherid
	    };
	    var handle = function handle(arr) {
	        return _.map(arr, function (item) {
	            item._time = item.create_time.substr(6, 11);
	            return item;
	        });
	    };
	    return {
	        init: function init() {
	            container = $('#home-opinion');
	            items = container.find('.category');
	            items.html(opinionType.create);
	            items.find('.opinion-type-item').map(function () {
	                var self = this;
	                var val = $(self).attr('value');
	                if (val == 0) {
	                    $(self).addClass('select');
	                }
	            });
	            items.on('click', '.opinion-type-item', function () {
	                var classify = $(this).attr('value');
	                opinionList.render({ classify: classify });
	                $(this).addClass('select').siblings().removeClass('select');
	            });
	        },
	        render: function render(ops) {
	            _.extend(params, ops);
	            $.getJSON("/opinion/queryNewOpinions.htm", params, function (data) {
	                if (data.status == 1) {
	                    if (data.data.list.length < 1) {
	                        container.find('.items').html('<div class="opinion-none">\u6682\u65E0\u8BB0\u5F55</div>');
	                        return;
	                    }
	                    container.find('.items').html(template('opinion-list-item-template', handle(data.data.list)));
	                }
	            });
	        }
	    };
	}();
	// $("#home-opinion .category").html(opinionType.create)
	// var href = window.location.href
	// var match = href.match(/liveDetail\/(d+)/)
	// var params = {
	//     currentPage: 1,
	//     pageSize: 4,
	//     classify: '',
	//     teacherid: ops.teacherid
	// }
	// $('.opinion-type-item').click(function(e) {
	//     params.classify = $(this).val()
	//     $.getJSON("/opinion/queryNewOpinions.htm", params, function(data) {
	//         // data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
	//         // defer.resolve(data);
	//     })
	// })


	$(function () {
	    if (__cate == "liveDetail") {
	        var item = $($('.liveDetail-menu .item')[0]);
	        item.addClass('select');
	    }

	    opinionList.init();
	    opinionList.render();
	    var homt_askStock = $("#home-askStock");

	    //回答分类
	    var category = new ynmodule.AskStockCategory();
	    category.hasAll = false;
	    category.container = homt_askStock.find(".category");
	    category.init();
	    category.render();

	    category.delegate.click = function (select) {
	        mylist.type = select;
	        mylist.render();
	    };

	    //问答列表
	    var mylist = new ynmodule.AskStockWithTeacher();
	    mylist.container = homt_askStock.find('.items');
	    mylist.teacherid = room_teacherid;
	    mylist.type = 2;
	    mylist.row = 4;
	    mylist.init();
	    mylist.render();

	    //观点列表
	    // var opinionList = new ynmodule.opinionList();
	    // opinionList.teacherid = room_teacherid;
	    // opinionList.container = $('#home-opinion .items');
	    // opinionList.type = 0;
	    // opinionList.row = 4;
	    // opinionList.init();
	    // opinionList.render();


	    //擅长领域
	    var goodat = function () {
	        var container = $("#home-goodat");
	        var items = container.find('.items');
	        var data = JSON.parse(__style);
	        items.append(_.map(data, function (item) {
	            return '<span class="item">' + item.name + '</span>';
	        }).join(''));
	    }();

	    //视频课程
	    var video = function () {

	        var create = function create(arr) {
	            return _.map(arr, function (item) {
	                return '<div class="tableView-item"><a class="tableView-title" href="' + item._link + '" target="_blank"><span class="value">' + item.title + '</span></a><div class="tableView-info"><span class="time ' + item._class_time + '">' + item._time + '</span></div></div>';
	            }).join("");
	        };

	        getMyVideo({
	            teacherid: room_teacherid,
	            row: 5
	        }).done(function (data) {
	            var rows = _.map(data.rows, function (item) {
	                item._title = item.title;
	                item._link = video_path + "video/" + item.video_id + '.htm';
	                item._time = yn.timeFormat(item.create_time);
	                item._class_time = "show";
	                return item;
	            });

	            $("#home-video .items").html(create(rows));
	        });
	    }();
	});

	var getMyVideo = function getMyVideo(ops) {
	    ops = _.extend({
	        teacherid: ynTeacherId,
	        page: 1,
	        row: 10,
	        isDraft: false
	    }, ops);

	    var send = {
	        teacherid: ops.teacherid,
	        currentPage: ops.page,
	        pageSize: ops.row,
	        isDraft: ops.isDraft ? 1 : 0
	    };

	    var defer = $.Deferred();
	    $.getJSON("/video/videoList.htm", send, function (data) {
	        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var askWindow = __webpack_require__(2); //提问
	var Care = __webpack_require__(13);

	/*///////////////////////////////////////////////////////////////////*/

	//个人信息
	var info = function () {
	    var container, care, question;
	    return {
	        init: function init() {
	            container = $('#live-info');
	            care = $('#live-info .care');
	            question = $('#live-info .ask');

	            //关注
	            care.click(function () {
	                if (!ynIsLogin) return yn.login.render();
	                if (+ynTeacherId == +room_teacherid) return layer.msg("不能关注自己啊");

	                //取消关注
	                if ($(this).attr('class').indexOf('true') != -1) {
	                    Care.cancel(room_teacherid).done(function () {
	                        care.removeClass('true').text("关注");
	                    });
	                    return;
	                }
	                //添加关注
	                Care.add(room_teacherid).done(function () {
	                    care.addClass('true').text("取消关注");
	                });
	            });

	            $('.askWin-trigger').click(function () {
	                if (ynTeacherId == room_teacherid) return layer.msg("扪心自问");
	                askWindow.render({
	                    select: { id: room_teacherid, name: $('#teacher-nickName').text() }
	                });
	            });
	        }
	    };
	}();

	//菜单
	var menu = function () {
	    var container;

	    //根据地址高亮菜单
	    function light() {
	        if (container.next().find('.askStock-category-item').length != 0) {
	            container.find('.item').eq(2).addClass('select');
	        }
	        if (container.next().find('.opinionType-item').length != 0) {
	            container.find('.item').eq(3).addClass('select');
	        }
	    }

	    return {
	        init: function init() {
	            container = $('.liveDetail-menu');
	            light();
	        }
	    };
	}();

	//公告
	var announce = function () {
	    var container, wordCount, textarea, ue;
	    var deleteMsg = room_userid == ynUserId ? '<span class="action-bar-btn action-bar-delete">\u5220\u9664</span>' : '';
	    var editMsg = room_userid == ynUserId ? '<span class="action-bar-btn action-bar-send edit-msg">\u65B0\u5EFA\u516C\u544A</span>' : '';
	    var sendMsg = room_userid == ynUserId ? '<span class="action-bar-btn action-bar-send send-msg">\u63D0\u4EA4</span>' : '';
	    var cancelEdit = room_userid == ynUserId ? '<span class="action-bar-btn action-bar-cancel">\u53D6\u6D88</span>' : '';

	    var create = function create(item) {
	        return '<div class="action-bar">' + deleteMsg + editMsg + '<span class="action-bar-time">' + item._time + '</span></div><div class="announcement-msg">' + item.content + '</div>';
	    };

	    var createEdit = function createEdit() {
	        return '<div class="action-bar">' + sendMsg + cancelEdit + '</div><div class="announcement-msg-edit"><div contenteditable="true" id="ta-notice"></div><span class="word-count"><span class="wordCount">100</span>/100</span></div>';
	    };

	    var createNone = function createNone() {
	        return '<div class="action-bar">' + editMsg + '</div><div class="announcement-none">\u76EE\u524D\u6682\u65E0\u516C\u544A</div>';
	    };

	    var handle = function handle(item) {
	        item._time = item.pubtime.substr(0, 11);
	        return item;
	    };
	    return {
	        init: function init() {
	            container = $('#live-info');

	            //删除公告
	            container.on('click', '.action-bar-delete', function () {
	                layer.confirm('确定删除此公告？', function () {
	                    $.post(__path + '/notice/delTeacherNotice.htm', function (back) {
	                        if (back.status == 1) {
	                            layer.msg('已删除');
	                            announce.render();
	                        }
	                    }, 'json');
	                });
	            });

	            //发布公告
	            container.on('click', '.edit-msg', function () {
	                container.find('.column3').html(createEdit());
	                wordCount = container.find('.wordCount');
	                textarea = document.getElementById('ta-notice');

	                textarea.onkeyup = function (e) {
	                    var cur = textarea.innerHTML.trim();
	                    console.log(cur.length);
	                    if (100 - cur.length < 0) {
	                        console.log("===", 100 - cur.length);
	                        layer.msg("超出字数限制");
	                        textarea.innerText = cur.substr(0, 100);
	                        return;
	                    } else {
	                        wordCount.text(100 - cur.length);
	                    }
	                };
	            });

	            //取消
	            container.on('click', '.action-bar-cancel', function () {
	                announce.render();
	            });

	            //提交公告
	            container.on('click', '.send-msg', _.debounce(function () {
	                var content = textarea.innerText.replace(/[\n\r]/g, '<br>');
	                console.log('con', content);
	                var length = textarea.innerText.trim().length;
	                if (!content) {
	                    return layer.msg('请输入内容');
	                }
	                if (length > 100) return layer.alert('当前字数' + length + ',最多输入100字');
	                $.post(__path + '/notice/addNotice.htm', { content: content }, function (back) {
	                    if (back.status == 1) {
	                        layer.msg('发布成功');
	                        announce.render();
	                    }
	                }, 'json');
	            }, 2000, { 'leading': true, 'trailing': false }));
	        },
	        render: function render() {
	            $.getJSON(__path + '/notice/teacherNotice.htm', { teacherid: room_teacherid }, function (back) {
	                if (back.data == '') {
	                    container.find('.column3').html(createNone());
	                    return;
	                }
	                container.find('.column3').html(create(handle(back.data)));
	            });
	        }
	    };
	}();
	//////////////////////////////////////////////////////////////////

	$(function () {
	    info.init();
	    menu.init();
	    askWindow.init();
	    announce.init();
	    announce.render();
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 提问窗口

	1.导入模块
	<%@  include file="../v2/base/moudule-ask.jsp" %>
	var askWindow = require('../v2/base/askWindow.js') 

	$(function(){

	    2.初始化
	    askWindow.init(); 

	    3.1 弹出对话框
	    askWindow.render();

	    3.2 弹出对话框并选中某个老师
	    askWindow.render({
	        select: { id:String,  name:String}
	    }) 

	    3.3 邀请回答
	    askWindow.render({
	        invite: { nubmer: Number } //问题流水号
	    }) 

	    3.4 不能选择某些老师
	    askWindow.render({
	        filter:[] //老师ID数组
	    }) 
	})


	/*/ //////////////////////////////////////////////////////////////////*/

	__webpack_require__(3);
	var queryStock = __webpack_require__(7);
	var stockList = __webpack_require__(8);
	var error = __webpack_require__(12);

	var container,
	    questionBar,
	    guideWin,

	//提问次数不足时引导直播弹窗
	option,

	//渲染的选项
	canAskTimes = 3,

	//可提问次数
	filterTeachers; //所有不应显示的老师

	/*///////////////////////////////////////////////////////////////////*/

	function init() {
	    var self = this;
	    container = $('#askTeacherWindow');
	    questionBar = $('#questionField');
	    guideWin = $('#askNoTimesWin');
	    seachBar.init();
	    textarea.init();
	    stockTrend.init();
	    searchResult.init();
	    onlineTeacher.init();
	    onlyInvite.init();
	    showStockList.init();
	    wordCount();
	    layoutBox();

	    container.on('click', '.close-win', function () {
	        console.log('===close-win');
	        container.hide();
	        reset();
	    });

	    //关闭引导直播窗口
	    guideWin.on('click', '.ask-close', function () {
	        guideWin.hide();
	    });

	    //interactive
	    seachBar.onChange = function (data) {
	        return searchResult.render(data);
	    };
	    seachBar.onMax = function () {
	        return searchResult.hide();
	    };
	    searchResult.onSelect = function (data) {
	        return seachBar.append({
	            id: data.id,
	            name: data.name
	        });
	    };
	    onlineTeacher.onSelect = function (data) {
	        return seachBar.append({
	            id: data.id,
	            name: data.name
	        });
	    };

	    //提问提交
	    container.on('click', '.submit button', function () {

	        var errorHandle = {
	            seachBar: function seachBar() {
	                return layer.msg("请选择投资顾问");
	            },
	            textarea: function textarea() {
	                return layer.msg("请输入您的问题");
	            }
	        };

	        var query = [{ key: 'seachBar', assert: seachBar.assert() }, { key: 'textarea', assert: textarea.assert() }];

	        var errorItem = _.find(query, function (item) {
	            return item.assert;
	        });
	        if (errorItem) {
	            errorHandle[errorItem.key]();
	            return;
	        }

	        if (textarea.getValue().trim().length < 3) {
	            return layer.msg('提问至少3个字');
	        }
	        container.hide();
	        var send = {
	            questionuserid: ynUserId,
	            teacherids: seachBar.getValue(),
	            questioncontent: textarea.getValue(),
	            stockcode: stockTrend.getValue().code,
	            stockname: stockTrend.getValue().name,
	            note_source: 0 // 来源
	        };
	        $.post("/consultation/questionNote.htm", send, function (data) {
	            data = JSON.parse(data);
	            if (data.status == '80000') {
	                return layer.msg('该账号被用户举报，涉嫌违规操作，目前不能向投顾问股');
	            } else if (data == '80001') {
	                return layer.msg('您输入的内容违反相关规定，不能予以展示!');
	            } else if (data.status == "1") {
	                // textarea.trigger('keyup');
	                layer.msg("提问成功, 牛人正在为您解答!");
	                self.onClick && self.onClick({
	                    success: 'success'
	                });
	            } else {
	                return layer.msg(error[data.status]);
	            }
	        });
	    });

	    //邀请提交
	    container.on('click', '.invite-submit', function () {
	        container.hide();
	        var send = {
	            questionuserid: ynUserId,
	            teacherids: seachBar.getValue(),
	            note_billno: option.invite.number
	        };
	        $.post("/consultation/invitationTeacher.htm", send, function (data) {
	            layer.msg(data == "success" ? "邀请成功" : '\u9519\u8BEF:' + data);
	        });
	    });
	}

	// 动画
	var addFn = function addFn() {
	    $.fn.extend({
	        animateCss: function animateCss(animationName) {
	            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	            this.addClass('animated ' + animationName).one(animationEnd, function () {
	                $(this).removeClass('animated ' + animationName);
	            });
	        }
	    });
	};

	function render(ops) {
	    if (!ynIsLogin) return yn.login.render();
	    if (ynTeacherId) return layer.msg("老师不能提问!");
	    option = _.extend({
	        select: false, //向某个老师提问
	        invite: false, //是否为邀请回答
	        filter: [] //过滤数组, 这里的老师不会出现在列表中(已经回答过的老师/已经邀请过的老师)
	    }, ops);

	    //处理选项
	    var optionHandler = {
	        select: function select() {
	            return seachBar.add({ id: option.select.id, name: option.select.name });
	        },
	        invite: function invite() {
	            questionBar.hide();
	            onlyInvite.show();
	        }
	    };
	    queryAskTimes(function (count) {
	        reset();
	        // container.show().velocity('transition.expandIn', { duration: 300 });
	        animate();
	        container.fadeIn();
	        container.show();
	        container.find('.times .value').text(count); //显示次数
	        option.select && optionHandler.select(); //选中老师
	        option.invite && optionHandler.invite(); //如果是邀请回答
	        option.filter.push(ynTeacherId);
	        filterTeachers = function () {
	            var temp = option.filter.join("-");
	            return '-' + temp + '-';
	        }();
	        onlineTeacher.render();
	    });
	}

	var animate = function animate() {
	    var box = $('#askTeacherWindow');
	    if (!box.hasOwnProperty('animateCss')) {
	        addFn();
	    }
	    box.animateCss('zoomIn');
	};

	//重置
	function reset() {
	    questionBar.show();
	    textarea.clear();
	    seachBar.clear();
	    searchResult.hide();
	    onlyInvite.hide();
	    stockTrend.hide();
	    $('#ask-win-stock').val('');
	}

	var onlyInvite = function () {
	    var el = {};
	    return {
	        init: function init() {
	            var _this = this;

	            el.container = container.find('.onlyInvite');
	            el.button = el.container.find('button');
	            el.button.click(function () {
	                return _this.onSubmit();
	            });
	        },
	        show: function show() {
	            return el.container.show();
	        },
	        hide: function hide() {
	            return el.container.hide();
	        },
	        onSubmit: function onSubmit() {
	            return log("onSubmit is not override...");
	        }
	    };
	}();

	//搜索栏
	var seachBar = function () {
	    var el = {
	        container: null,
	        select: null,
	        input: null
	    };
	    var selected = [];
	    var createItem = function createItem(id, name) {
	        return '<span class="item" data-id="' + id + '">@' + name + '<i class="fa fa-times-circle close-invite"></i></span>';
	    };

	    //查询所有老师
	    var queryTeacher = function queryTeacher(key) {
	        key = key || "";
	        var defer = $.Deferred();
	        $.getJSON("/consultation/queryLikeTeacher.htm", { likename: key }, function (data) {
	            return defer.resolve(data);
	        });
	        return defer.promise();
	    };

	    var errorHandleTable = {
	        "exist": function exist() {
	            return layer.msg("已存在");
	        },
	        "full": function full() {
	            return layer.msg("最多能邀请三位投顾回答!");
	        },
	        "self": function self() {
	            return layer.msg("不能向自己提问");
	        }
	    };

	    return {
	        init: function init() {
	            var self = this;
	            el.container = container.find('.invite');
	            el.select = el.container.find('.select');
	            el.input = el.container.find('input');

	            //删除选择
	            el.container.on('click', '.close-invite', function () {
	                var parent = $(this).parent();
	                var id = parent.data('id');
	                parent.remove();
	                var index = _.indexOf(selected, id);
	                selected.splice(index, 1);
	            });

	            //搜索 
	            el.input.keyup(_.debounce(function () {
	                var val = $(this).val().replace("@", '');
	                if (!/[\u4e00-\u9fa5]+/.test(val)) return;
	                queryTeacher(val).done(function (data) {
	                    if (data.status == 1) {
	                        self.onChange(data);
	                    } else {
	                        return layer.msg(error[data.status]);
	                    }
	                });
	            }, 1000)).focus(function () {
	                return queryTeacher("").done(function (data) {
	                    return self.onChange(data);
	                });
	            });

	            // 清空搜索字符
	            el.input.blur(function () {
	                $(this).val("");
	            });
	        },

	        //清空
	        clear: function clear() {
	            el.input.val("");
	            el.select.empty();
	            selected = [];
	        },

	        //添加
	        add: function add(info) {
	            if (+info.id == +ynTeacherId) {
	                errorHandleTable.self();
	                return;
	            }
	            el.select.html(createItem(info.id, info.name));
	            selected.push(+info.id); //转成数字
	        },

	        append: function append(info) {
	            var query = [{ key: "self", assert: +info.id == +ynTeacherId }, { key: "exist", assert: _.indexOf(selected, info.id) != -1 }, { key: "full", assert: selected.length == 3 }];
	            var errItem = _.find(query, function (item) {
	                return item.assert;
	            });
	            if (errItem) {
	                errorHandleTable[errItem.key]();
	                return;
	            }

	            el.select.append(createItem(info.id, info.name));
	            selected.push(info.id);
	            if (selected.length == 3) {
	                this.onMax();
	            }
	        },
	        getValue: function getValue() {
	            //获取邀请的老师id
	            var result = "";
	            el.select.find('.item').each(function () {
	                result += $(this).data('id') + "&";
	            });
	            return result.replace(/&$/, "");
	        },
	        assert: function assert() {
	            return el.select.find('.item').length < 1;
	        }, //验证
	        onChange: function onChange() {
	            return log("onChange  note override...");
	        },
	        onMax: function onMax() {
	            return log("onMax : note override...");
	        }
	    };
	}();

	//搜索结果
	var searchResult = function () {
	    var el = {};
	    return {
	        init: function init() {
	            var _this2 = this;

	            var self = this;
	            el.container = container.find('.list');
	            el.title = el.container.find('.info .value');
	            el.items = el.container.find('.list-wrap');

	            el.container.on('click', '.close', function () {
	                return _this2.hide();
	            });
	            el.container.on('click', '.item', function () {
	                self.onSelect({
	                    id: $(this).data('id'),
	                    name: $(this).data('name')
	                });
	            });
	        },
	        render: function render(data) {
	            this.show();
	            var rows = data.data.list;
	            el.title.text(rows.length);
	            rows = _.filter(rows, function (item) {
	                return filterTeachers.indexOf('-' + item.answeruserid + '-') == -1;
	            });
	            el.items.html(template('online-teacher-template', rows));
	        },
	        onSelect: function onSelect(data) {
	            return log('error : searchResult onSelect is not override...');
	        },
	        show: function show() {
	            return el.container.show();
	        },
	        hide: function hide() {
	            return el.container.hide();
	        }
	    };
	}();

	//内容栏
	var textarea = function () {
	    var el = {};
	    return {
	        init: function init() {
	            el.input = container.find('textarea');
	            el.input.keyup(function () {
	                var val = $(this).val();
	                parseStock(val, function (info) {
	                    return info ? stockTrend.render(info) : stockTrend.hide();
	                });
	            });
	        },
	        clear: function clear() {
	            el.input.val("");
	        },
	        getValue: function getValue() {
	            return el.input.val();
	        },
	        assert: function assert() {
	            return !_.trim(el.input.val());
	        }
	    };
	}();

	//股票趋势判断
	var stockTrend = function () {
	    var el = {},
	        code = "",
	        name = "";
	    return {
	        init: function init() {
	            el.container = container.find('.msg');
	            el.code = el.container.find('.msg-code');
	        },
	        hide: function hide() {
	            el.container.hide();
	            code = name = "";
	        },
	        render: function render(info) {
	            code = info.code;
	            name = info.name;
	            el.code.text(code + name);
	            el.container.show();
	        },
	        getValue: function getValue() {
	            return { code: code, name: name };
	        }
	    };
	}();

	//在线老师
	var onlineTeacher = function () {
	    var el = {};
	    return {
	        init: function init() {
	            var self = this;
	            el.items = container.find('.right .items');
	            el.items.on('click', '.item', function () {
	                self.onSelect({
	                    id: $(this).data('id'),
	                    name: $(this).data('name')
	                });
	            });
	        },
	        render: function render() {
	            $.getJSON('/consultation/queryOnlineTeacher.htm?pageSize=20&currentPage=1&userid=' + ynUserId, function (data) {
	                if (data.status == 1) {
	                    var rows = data.data.list;
	                    rows = _.filter(rows, function (item) {
	                        return filterTeachers.indexOf('-' + item.answeruserid + '-') == -1;
	                    });
	                    el.items.html(template('online-teacher-template', rows));
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        },
	        onSelect: function onSelect() {
	            return log("onlineTeacher select...");
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	//查询提问剩余次数
	function queryAskTimes(callback) {
	    if (!ynIsLogin) {
	        yn.login.render();
	        return;
	    }

	    $.getJSON("/consultation/queryTodayQuestionCount.htm", {
	        questionuserid: ynUserId,
	        t: timestamp()
	    }, function (data) {
	        if (data.status == 1) {
	            var remain = canAskTimes - +data.data;
	            if (remain < 1) {
	                // layer.msg("今天已达到提问提问次数上限")
	                guideWin.show();
	                return;
	            }
	            callback(remain);
	        } else {
	            return layer.msg(error[data.status]);
	        }
	    });
	}

	var timestamp = function timestamp() {
	    return new Date().getTime();
	};

	//字数统计
	function wordCount() {
	    var trigger = container.find('textarea');
	    var el = container.find('.wordCount .value');
	    yn.wordCount(trigger, {
	        indicate: el
	    });
	}

	//显示股票列表
	var showStockList = function () {
	    var el = {};
	    return {
	        init: function init() {
	            el.input = container.find('.stockList');
	            el.target = container.find('textarea');
	            stockList.get().render({
	                id: 'ask-win-stock',
	                top: 42,
	                onSelect: function onSelect(item, trigger) {
	                    trigger.val('');
	                    el.target.val(el.target.val() + item.stockWrap).trigger('keyup');
	                    // ajax.add({ stockcode: item.stockCode, stockname: item.stockName }).done(code => render())
	                }
	            });
	        }
	    };
	}();

	//识别股票
	//如果查询成功回调callback({code, name})

	function parseStock(val, callback) {
	    var match = val.match(/[0-9]{6}/g);
	    if (!match) return callback(false);

	    //简单验证
	    var code = _.find(match, function (item) {
	        return isStockCode(item);
	    });
	    if (!code) return callback(false);

	    //查询新浪验证
	    queryStock(code).done(function (data) {
	        if (data && data.length < 6) return callback(false);
	        callback({
	            code: code,
	            name: data[0]
	        });
	    });
	}

	//居中对齐
	function layoutBox() {
	    var w = $(window).width();
	    var h = $(window).height();
	    var cw = container.outerWidth();
	    var ch = container.outerHeight();
	    container.css({
	        left: (w - cw) / 2 + "px",
	        top: (h - ch) / 2 + "px"
	    });
	}

	//查询用户邀请过的老师, 已经邀请过的老师不能再次邀请
	// function queryDidAnswer(callback) {
	//     $.getJSON("/consultation/queryNoteInvitationTeachers.htm", {
	//         Invitation_user_id: ynUserId,
	//         note_billno: option.invite.number
	//     }, function(data) {
	//         var did = [];
	//         if(data.status == 1){
	//         Array.prototype.push.apply(did, _.pluck(data.rows.teachers, 'teacherid'));
	//         callback(did);
	//         }else () => {return layer.msg(error[data.status])}
	//     })
	// }


	var isStockCode = function isStockCode(value) {
	    value = String(value);
	    var reg = /[036][0-9]{5}/;
	    if (reg.test(value)) {
	        return true;
	    } else {
	        return false;
	    }
	};

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    init: init,
	    render: render
	};

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
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./askWindow.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./askWindow.css");
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
	exports.push([module.id, "@keyframes zoomIn {\n    from {\n        opacity: 0;\n        transform: scale3d(.3, .3, .3);\n    }\n    50% {\n        opacity: 1;\n    }\n}\n\n.zoomIn {\n    animation-name: zoomIn;\n}\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n}\n\n#askTeacherWindow {\n    position: fixed;\n    border: 1px solid rgb(200, 200, 200);\n    background: white;\n    width: 900px;\n    font-size: 13px;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);\n    border-radius: 6px;\n}\n\n#askTeacherWindow .onlyInvite {\n    min-height: 150px;\n    text-align: center;\n}\n\n#askTeacherWindow .onlyInvite button {\n    margin: 20px auto;\n    display: inline-block;\n    width: 100px;\n}\n\n#askTeacherWindow>.close {\n    font-size: 28px;\n    position: absolute;\n    right: 5px;\n    top: 5px;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left {\n    float: left;\n    width: 65%;\n    border-right: 1px solid rgb(200, 200, 200);\n    padding: 20px;\n}\n\n#askTeacherWindow .right {\n    float: right;\n    width: 35%;\n}\n\n#askTeacherWindow .left .title {\n    position: relative;\n    overflow: hidden;\n    border-left: 3px solid #d72621;\n    padding-left: 10px;\n    margin: 10px 0;\n}\n\n#askTeacherWindow .left .title .name {\n    font-weight: bold;\n    font-size: 16px;\n}\n\n#askTeacherWindow .left .title .times {\n    position: absolute;\n    right: 0px;\n}\n\n#askTeacherWindow .left .title .times .value {\n    color: #d72621;\n    font-weight: bold;\n    margin: 0 2px;\n}\n\n#askTeacherWindow .left .invite {\n    width: 100%;\n    border: 1px solid rgb(230, 230, 230);\n    overflow: hidden;\n}\n\n#askTeacherWindow .left .invite .list {\n    position: absolute;\n    background: white;\n    width: 550px;\n    left: 20px;\n    top: 100px;\n    padding: 15px;\n    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);\n    border: 1px solid rgb(200, 200, 200);\n    z-index: 100;\n}\n\n#askTeacherWindow .left .invite .list .close {\n    float: right;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left .invite .list .list-wrap {\n    margin-top: 10px;\n    overflow: auto;\n    height: 200px;\n    float: left;\n}\n\n#askTeacherWindow .left .invite .select {\n    font-size: 13px;\n    float: left;\n    padding: 9px 5px;\n    color: #62a5d9;\n}\n\n#askTeacherWindow .left .invite .select .item {\n    margin-right: 8px;\n}\n\n#askTeacherWindow .left .invite .select .fa {\n    margin-left: 5px;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left .invite input {\n    float: left;\n    padding: 10px;\n    border: none;\n    padding-left: 0;\n}\n\n#askTeacherWindow .left .values {\n    margin: 10px 0;\n}\n\n#askTeacherWindow .left textarea {\n    width: 100%;\n    padding: 10px;\n}\n\n#askTeacherWindow .bottom {\n    /*overflow: hidden;*/\n    position: relative;\n}\n\n#askTeacherWindow .bottom .msg {\n    padding: 0 0 10px 0;\n}\n\n#askTeacherWindow .bottom .msg .msg-code {\n    margin: 0 5px;\n    color: #d72621;\n}\n\n#askTeacherWindow .bottom .msg .fa {\n    margin-right: 5px;\n}\n\n#askTeacherWindow .actions {\n    display: inline-block;\n    float: left;\n    position: relative;\n    width: 300px;\n}\n\n#askTeacherWindow .action.search input {\n    padding: 5px;\n}\n\n#askTeacherWindow .action.search .icon {\n    color: gray;\n    position: relative;\n    left: -25px;\n}\n\n#askTeacherWindow .submit {\n    display: inline-block;\n    float: right;\n}\n\n#askTeacherWindow .submit .wordCount {\n    position: relative;\n    top: 6px;\n    right: 10px;\n}\n\n#askTeacherWindow .right {\n    padding: 25px;\n}\n\n#askTeacherWindow .right .content {\n    overflow: auto;\n}\n\n#askTeacherWindow .right .title {\n    color: #575757;\n    font-size: 15px;\n}\n\n#askTeacherWindow .right .items {\n    overflow: auto;\n    max-height: 278px;\n}\n\n#askTeacherWindow .teacher-item {\n    display: block;\n    overflow: hidden;\n    padding: 10px 0;\n    border-bottom: 1px solid rgb(245, 245, 245);\n    cursor: pointer;\n    float: left;\n    width: 245px;\n}\n\n#askTeacherWindow .teacher-item:hover {\n    background: rgb(245, 245, 245);\n}\n\n#askTeacherWindow .teacher-item:first-child {\n    border-top: none;\n}\n\n#askTeacherWindow .teacher-item .avatar {\n    width: 50px;\n    height: 50px;\n    overflow: hidden;\n    float: left;\n    border-radius: 2px;\n}\n\n#askTeacherWindow .teacher-item .avatar img {\n    height: 100%;\n}\n\n#askTeacherWindow .teacher-item .info {\n    float: left;\n    margin-left: 10px;\n}\n\n#askTeacherWindow .teacher-item .info .value {\n    color: #ca2723;\n    margin-right: 10px;\n    margin-left: 5px;\n}\n\n#askTeacherWindow .teacher-item .info .line1 {\n    font-size: 16px;\n    margin-bottom: 10px;\n}\n\n#askTeacherWindow .teacher-item .info .line2 {\n    font-size: 13px;\n    color: gray;\n}\n\n#askTeacherWindow input,\n#askTeacherWindow textarea {\n    outline: none;\n    resize: none;\n    border: 1px solid rgb(235, 235, 235);\n}\n\n.submit button {\n    color: white;\n    font-family: \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", tahoma, arial;\n    font-size: 12px;\n    padding: 5px 15px;\n    border-width: 1px;\n    border-style: solid;\n    border-image: initial;\n    border-radius: 2px;\n    background: rgb(215, 38, 33);\n    border-color: rgb(215, 38, 33);\n}\n\n\n/* 次数用完 */\n\n#askNoTimesWin {\n    width: 470px;\n    background: #fff;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, .3);\n    text-align: center;\n    padding: 20px 0;\n    position: fixed;\n    top: 220px;\n    left: 50%;\n    margin-left: -235px;\n    z-index: 1000;\n}\n\n#askNoTimesWin .goLiveRoom {\n    display: block;\n    width: 140px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    color: #fff;\n    background: #F03333;\n    margin: 40px auto 0 auto;\n    border-radius: 4px;\n    cursor: pointer;\n    text-decoration: none;\n}\n\n#askNoTimesWin .ask-icon {\n    margin: 20px auto;\n}\n\n#askNoTimesWin .ask-tip {\n    margin: 10px auto;\n    color: #666;\n    font-size: 15px;\n}\n\n#askNoTimesWin .ask-close {\n    float: right;\n    position: relative;\n    right: 10px;\n    top: -9px;\n    cursor: pointer;\n}", ""]);

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
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (code, ops) {
	    var defer = $.Deferred();
	    ops = _.extend({
	        handle: false, // 是否返回处理过的数据 : 截取2位小数, [33=涨跌幅, 34=涨跌额, 35=涨停价, 36=跌停价]
	        color: false // 是否着色,对现价[3],涨跌幅[33]着色, 涨跌额[34]
	    }, ops);
	    var reg = /[0-9]{6,}/;
	    if (!reg.test(String(code))) {
	        yn.log("yn.queryStock : stock code is error...");
	        return defer.reject();
	    }

	    var prefixs = { 0: "sz", 3: "sz", 6: "sh" };
	    var prefix = prefixs[String(code).substr(0, 1)];
	    $.ajax({
	        cache: true,
	        url: "http://hq.sinajs.cn/list=" + prefix + code,
	        type: "GET",
	        dataType: 'script',
	        success: function success(data) {
	            var res = eval('hq_str_' + prefix + code + '.split(",")');
	            if (res.length < 5) {
	                return defer.reject();
	            }
	            if (parseInt(res[3]) === 0) {
	                res[3] = res[2];
	            }

	            //格式化数据
	            if (ops.handle) {
	                res = _.map(res, function (item) {
	                    var result = parseFloat(item);
	                    if (result === 0) {
	                        return "---";
	                    }
	                    if (!result) {
	                        return item;
	                    }
	                    return yn.setDecimal(item);
	                });

	                res[33] = yn.setDecimal((res[3] - res[2]) / res[2] * 100); //涨跌幅
	                res[34] = yn.setDecimal(res[3] - res[2]); //涨跌额
	                res[35] = yn.setDecimal(res[1] * 1.1); //涨停价
	                res[36] = yn.setDecimal(res[1] * 0.9); //跌停价

	                //成交量
	                res[8] = function () {
	                    return yn.setDecimal(res[8] / 1000000) + "万手";
	                }();

	                // 成交额
	                res[9] = function () {
	                    if (res[9] == "---") {
	                        return "---";
	                    }
	                    var value = res[9] / 10000;
	                    if (value > 10000) {
	                        value = yn.setDecimal(value / 10000) + "亿元";
	                    } else {
	                        value = yn.setDecimal(value) + "万元";
	                    }
	                    return value;
	                }();

	                //数据格式化前的值
	                var now = res[1];

	                //数据着色
	                if (ops.color) {
	                    res[1] = yn.colorValue(res[1], { //开盘价
	                        right: res[2]
	                    });
	                    res[3] = yn.colorValue(res[3], {
	                        left: res[34]
	                    });
	                    res[4] = yn.colorValue(res[4], { //最高价
	                        right: now
	                    });
	                    res[5] = yn.colorValue(res[5], { //最低价
	                        right: now
	                    });
	                    res[33] = yn.colorValue(res[33], {
	                        suffix: "%"
	                    }); //涨跌幅

	                    res[34] = yn.colorValue(res[34]);
	                    res[35] = yn.colorValue(res[35], { //涨停价
	                        right: now
	                    });
	                    res[36] = yn.colorValue(res[36], { //跌停价
	                        right: now
	                    });
	                }
	            }
	            defer.resolve(res);
	        }
	    });
	    return defer.promise();
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	显示股票列表
	    
	var instance = require('../module/ui/stockList-1.2.js');
	instance.get().render(ops);

	    参数含义
	    ops = {
	        id: String --- 容器的ID(position = relative)
	        listLen: Number, --- 列表长度(最大为10),
	        left: Number, --- 定位(位置偏移值),
	        top: Number, --- 定位(位置偏移值),
	        onSelect({
	            stockCode: String, --- 股票代码
	            stockName: String, --- 股票名称
	            stockPinyin: String, --- 股票拼音
	            stockWrap: String --- $000001平安银行$
	        }): Function --- 回调函数
	    }


	    示例
	    stockList.get().render({
	        id: 'showStockList',
	        onSelect: (item, trigger) => {
	            trigger.val('')
	            alert(item.stockWrap)
	        }
	    })

	*/

	__webpack_require__(9);
	var local = __webpack_require__(11);

	module.exports = function () {
	    var instance,
	        domCache = {};

	    // 创建实例
	    var createInstance = function createInstance() {

	        var isValidCode = function isValidCode(val) {
	            var a = /^[a-zA-Z]{2,5}$/.test(val); //拼音2-5
	            var b = /^[036][0-9]{2,5}$/.test(val); //数字3-6
	            return a || b;
	        };

	        // 本地缓存前10条查询结果, 7天更新一次
	        var getData = function getData(code, callback) {
	            var key = 'query-stock-' + code;
	            var cache = local.get(key, { timeout: 3600 * 24 * 7 });
	            if (cache && cache.valid) {
	                callback(cache.data);
	                return;
	            }
	            $.getJSON('/queryStock.htm?stockcode=' + code, function (back) {
	                if (back && back.length > 0) {
	                    var data = _.take(back, 10);
	                    callback(data);
	                    local.set(key, data);
	                }
	            });
	        };

	        var createTags = function createTags(arr, ops) {
	            var prefixs = { 0: "深市", 3: "深市", 6: "沪市" };
	            var tbody = _.map(arr, function (item) {
	                var place = prefixs[String(item.stockcode).substr(0, 1)];
	                return '<tr class="ynStockList"><td class="place">' + place + '</td><td class="stock_code">' + item.stockcode + '</td><td class="stock_name">' + item.stockname + '</td><td class="pinyin">' + item.pinyin + '</td></tr>';
	            }).join("");
	            return '<table>' + tbody + '</table>';
	        };

	        //  实例方法
	        return {
	            render: function render(ops) {
	                // 参数
	                ops = _.extend({
	                    listLen: 5,
	                    left: 0,
	                    top: 0,
	                    onSelect: function onSelect() {}
	                }, ops);

	                var e = {
	                    trigger: null,
	                    left: null,
	                    top: null,
	                    parent: null,
	                    $list: null

	                    // 如果DOM缓存可用, 则使用缓存
	                };if (domCache[ops.id]) {
	                    _.extend(e, domCache[ops.id]);
	                } else {
	                    e.trigger = $('#' + ops.id);
	                    e.left = ops.left + "px";
	                    e.top = e.trigger.height() + ops.top + "px";
	                    e.parent = e.trigger.parent();
	                    e.parent.append('<div class="ynStcokListSpacial absolute" style="left:' + e.left + ';top:' + e.top + '"></div>');
	                    e.$list = e.parent.find('.ynStcokListSpacial'); // 股票列表对象

	                    // 缓存DOM
	                    domCache[ops.id] = e;
	                }

	                $(document).click(function () {
	                    return e.$list.hide();
	                });

	                // 点击股票时回调
	                e.parent.on('click', 'tr.ynStockList', function () {
	                    e.$list.hide();
	                    var code = $(this).find('.stock_code').text();
	                    var name = $(this).find('.stock_name').text();
	                    var pinyin = $(this).find('.pinyin').text();

	                    ops.onSelect({
	                        stockCode: code,
	                        stockName: name,
	                        stockPinyin: pinyin,
	                        stockWrap: '$' + code + name + '$'
	                    }, e.trigger);
	                    return false;
	                });

	                // 监听键盘
	                e.trigger.on('keyup', _.debounce(function () {
	                    var val = $(this).val();

	                    // 检查是否为有效股票代码
	                    if (!isValidCode(val)) {
	                        e.$list.hide();
	                        return;
	                    }
	                    getData(val, function (back) {
	                        var data = _.take(back, +ops.listLen); // 截取长度
	                        e.$list.show().html(createTags(data, ops));
	                    });
	                }, 300, { leading: false, trailing: true }));
	            }
	        };
	    };

	    // 返回单例
	    return {
	        get: function get() {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./stockList.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./stockList.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "#ynStcokListSpacial {\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\n    border: 2px solid #3274D8;\n    background: white;\n    display: none;\n    position: fixed;\n    overflow: hidden;\n    z-index: 50000\n}\n\n#ynStcokListSpacial .ynStockList td {\n    padding: 8px 15px;\n    cursor: pointer;\n}\n\n#ynStcokListSpacial .ynStockList:hover td,\n#ynStcokListSpacial .ynStockList:first-child td {\n    background: #3274D8;\n    color: white;\n}\n\n\n/* after */\n\n.ynStcokListSpacial {\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\n    border: 2px solid #3274D8;\n    background: white;\n    display: none;\n    position: absolute;\n    z-index: 50000;\n    top: 0;\n    left: 0;\n}\n\n.ynStcokListSpacial .ynStockList td {\n    padding: 8px 15px;\n    cursor: pointer;\n}\n\n.ynStcokListSpacial .ynStockList:hover td,\n.ynStcokListSpacial .ynStockList:first-child td {\n    background: #3274D8;\n    color: white;\n}\n", ""]);

	// exports


/***/ }),
/* 11 */
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
	    var data, valid;

	    if (!(JSON && key)) return;

	    ops = _.extend({
	        disable: false,
	        timeout: 3000
	    }, ops);

	    var val = db.getItem(key);
	    if (!(val && /@@@@/.test(val))) return;

	    var split = val.split('@@@@');

	    try {
	        var data = JSON.parse(split[1]);
	        var time = split[0];
	        // 判断是否超时
	        var valid = !ops.disable && _.now() - time <= ops.timeout * 1000;
	    } catch (e) {
	        data = [];
	        valid = false;
	    }

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
/* 12 */
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*

	    关注列表
	    

	*/

	var error = __webpack_require__(12);
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var types = __webpack_require__(15);

	module.exports = {
	    create: function create() {
	        var tags = "";
	        for (var key in types) {
	            var value = types[key];
	            tags += "<span class=\"opinion-type-item\" value=\"" + key + "\">" + value + "</span>";
	        }
	        return "<div class=\"opinion-type-items\">" + tags + "</div>";
	    }
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	    0: "大盘",
	    1: "题材"
	};

/***/ })
/******/ ]);