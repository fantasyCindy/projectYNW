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
	var referCategory = __webpack_require__(22);
	var referList = __webpack_require__(25);
	var referData = __webpack_require__(36);
	var Str = __webpack_require__(37);
	var Path = __webpack_require__(12);
	var error = __webpack_require__(20);

	/*///////////////////////////////////////////////////////////////////*/
	var list = function () {
	    var container,
	        items,
	        bootpag,
	        page,
	        param = {
	        currentPage: 1,
	        pageSize: 10,
	        productStatus: ""
	    };
	    return {
	        init: function init() {
	            container = $("#myRefer");
	            items = $(".refer-items");
	            page = $('.page');
	            bootpag = yn.bootpag(page);
	            bootpag.on('page', function (err, n) {
	                param.currentPage = n;
	                list.render();
	                $('body').animate({
	                    scrollTop: 0
	                }, {
	                    duration: 500
	                });
	            });
	        },
	        render: function render(ops) {
	            _.extend(param, ops);
	            referData.teacher(room_teacherid, param).done(function (data) {
	                if (data.status == 1) {
	                    if (data.data.rows.length < 1) {
	                        items.html(ynconfig.none({ margin: 200 }));
	                        bootpag.hide();
	                        return;
	                    }
	                    items.html(referList.render({ data: data.data.rows }));
	                    data.pageNumber = _.max([1, Math.ceil(+data.data.total / param.pageSize)]);
	                    bootpag.show().bootpag({ page: param.currentPage, total: data.pageNumber });
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    };
	}();

	//热门内参
	var hot = function () {
	    var items;
	    var create = function create(item) {
	        return '<a href="' + item._link + '" target="_blank" class="block hotRefer-item">' + item.title + '</a>';
	    };
	    var handleData = function handleData(arr) {
	        return _.map(arr, function (item) {
	            item._title = Str.clean(item.productInfo, 20);
	            item._link = '/reference/' + item.reference_id + '.htm';
	            return item;
	        });
	    };
	    return {
	        init: function init() {
	            items = $(".hotRefer-items");
	        },
	        render: function render() {
	            referData.teacherHot(room_teacherid).done(function (data) {
	                if (data.status == 1) {
	                    if (data.data.list.length < 1) {
	                        items.html(ynconfig.none({ margin: 50 }));
	                        return;
	                    }
	                    items.html(_.map(handleData(data.data.list), function (item) {
	                        return create(item);
	                    }).join(""));
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    };
	}();

	$(function () {
	    referCategory.render({
	        container: $(".refer-category"),
	        light: "bottom",
	        select: function select(value) {
	            list.render({ productStatus: value, currentPage: 1 });
	        }
	    });

	    referList.init({ container: $(".refer-items") });
	    list.init();
	    list.render();
	    hot.init();
	    hot.render();
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var askWindow = __webpack_require__(2); //提问
	var Care = __webpack_require__(21);

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
	                var price = $(this).data('price');
	                askWindow.aimedRender({
	                    select: { id: room_teacherid, name: $('#teacher-nickName').text(), price: price }
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
	        var href = window.location.href;
	        if (container.next().find('.askStock-category-item').length != 0) {
	            container.find('.item').eq(1).addClass('select');
	        }
	        if (/\/dapan\//.test(href) || /\/ticai\//.test(href)) {
	            container.find('.opinionType-item').addClass('select');
	        }
	        if (/\/tactics\//.test(href)) {
	            container.find('.learnType-item').addClass('select');
	        }
	        if (/\/refer\//.test(href)) {
	            container.find('.referType-item').addClass('select');
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
	                    if (100 - cur.length < 0) {
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

	var PayModule = __webpack_require__(3); //支付模块  pay-confirm-v1.2.js   pay-any.js'
	var Path = __webpack_require__(12);
	__webpack_require__(13);
	var queryStock = __webpack_require__(15);
	var stockList = __webpack_require__(16);
	var error = __webpack_require__(20);

	var container,
	    questionBar,
	    guideWin,

	//提问次数不足时引导直播弹窗
	option,

	//渲染的选项
	canAskTimes = 3,

	//可提问次数
	filterTeachers,

	//所有不应显示的老师
	askSuccess,

	//提问成功弹窗
	askTimes,
	    aimedTeacher,
	    aimTeacherid;

	/*///////////////////////////////////////////////////////////////////*/
	/*submit*/
	function SubmitQuestion(send) {
		$.post('/consultation/questionNote.htm', send, function (data) {
			data = JSON.parse(data);
			if (data.status == '80000') {
				return layer.msg('该账号被用户举报，涉嫌违规操作，目前不能向投顾问股');
			} else if (data == '80001') {
				return layer.msg('您输入的内容违反相关规定，不能予以展示!');
			} else if (data.status == '1') {
				// textarea.trigger('keyup');
				askStockSuccess();
				// self.onClick && self.onClick({
				//     success: 'success'
				// })
			} else {
				return layer.msg(error[data.status]);
			}
		});
	}

	function askStockSuccess() {
		askSuccess.show();
		setTimeout(function () {
			askSuccess.hide();
		}, 3000);
	}

	/*支付*/
	function pay(params) {
		$.post('/app/appRewardPayOrder.htm', params, function (back) {
			// if (back.status == 60011) {
			//     layer.msg("用户没有开通账户!请联系客服!")
			// }
			// if (back.status == 60023) {
			//     return layer.msg("商品购买时间已过")
			// }
			if (back.status != 1) {
				return layer.msg(error[back.status]);
			}
			if (back.status == 1) {
				PayModule.payconfirm({
					type: '4', //0观点，1组合，2课程，3 内参 4:问股 5 直播 6vip直播室
					price: params.totalPrice,
					// referenceid: __data.id,
					userid: ynUserId,
					orderid: back.data.orderid,
					link: Path.pay(back.data.orderNum),
					orderNum: back.data.orderNum,
					finish: true,
					read: true,
					useNB: false, //是否能用牛币
					success: function success() {
						return askStockSuccess();
					}
				});
			}
		}, 'json');
	}

	function init() {
		container = $('#askTeacherWindow');
		questionBar = $('#questionField');
		guideWin = $('#askNoTimesWin');
		askSuccess = $('#askSuccess');
		aimedTeacher = $('#askAimedTeacher'); //针对某个老师提问
		seachBar.init();
		textarea.init();
		stockTrend.init();
		textareaAimed.init();
		stockTrendAimed.init();
		searchResult.init();
		onlineTeacher.init();
		onlyInvite.init();
		showStockList.init();
		showStockListAimed.init();
		wordCount();
		wordCountAimed();
		layoutBox();

		container.on('click', '.close-win', function () {
			container.parent('#askTeacher-wrap').hide();
			reset();
		});

		aimedTeacher.on('click', '.aim-close-win', function () {
			aimedTeacher.parent('#askAimed-wrap').hide();
			reset();
		});

		//关闭提问成功弹窗
		askSuccess.on('click', function () {
			askSuccess.hide();
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
				name: data.name,
				price: data.price
			});
		};
		onlineTeacher.onSelect = function (data) {
			seachBar.append({
				id: data.id,
				name: data.name,
				price: data.price
			});
		};

		//提问提交
		container.on('click', '.submit button', function () {
			var errorHandle = {
				seachBar: function seachBar() {
					return layer.msg('请选择投资顾问');
				},
				textarea: function textarea() {
					return layer.msg('请输入您的问题');
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
			container.parent('#askTeacher-wrap').hide();
			var totalPrice = seachBar.getValue().price;
			if (askTimes < 1 && totalPrice != 0) {
				var params = {
					pay_source: 0,
					goodsType: 4, //0观点，1组合，2课程，3 内参 4:问股 5 直播 6vip直播室
					totalPrice: seachBar.getValue().price,
					teacherId: seachBar.getValue().result,
					questioncontent: textarea.getValue(),
					stockcode: stockTrend.getValue().code,
					stockname: stockTrend.getValue().name
				};
				pay(params);
			} else {
				var send = {
					questionuserid: ynUserId,
					teacherids: seachBar.getValue().result,
					questioncontent: textarea.getValue(),
					stockcode: stockTrend.getValue().code,
					stockname: stockTrend.getValue().name,
					note_source: 0 // 来源
				};
				SubmitQuestion(send);
			}
			reset();
		});

		//提问某个老师 提交
		aimedTeacher.on('click', '.aim-submit', function () {
			var val = aimedTeacher.find('#textarea').val().trim();
			if (val.length < 3) {
				return layer.msg('提问至少3个字');
			}
			aimedTeacher.parent('#askAimed-wrap').hide();
			if (askTimes < 1 && teacehrPrice != 0) {
				var price = aimedTeacher.find('.aim-line .aim-num').text().trim(); //显示次数
				var params = {
					pay_source: 0,
					goodsType: 4, //0观点，1组合，2课程，3 内参 4:问股 5 直播 6vip直播室
					totalPrice: teacehrPrice,
					teacherId: aimTeacherid,
					questioncontent: val,
					stockcode: stockTrendAimed.getValue().code,
					stockname: stockTrendAimed.getValue().name
				};
				pay(params);
				reset();
			} else {
				var send = {
					questionuserid: ynUserId,
					teacherids: aimTeacherid,
					questioncontent: val,
					stockcode: stockTrendAimed.getValue().code,
					stockname: stockTrendAimed.getValue().name,
					note_source: 0 // 来源
				};
				SubmitQuestion(send);
				reset();
			}
		});

		//邀请提交
		container.on('click', '.invite-submit', function () {
			container.hide();
			var send = {
				questionuserid: ynUserId,
				teacherids: seachBar.getValue().result,
				note_billno: option.invite.number
			};
			$.post('/consultation/invitationTeacher.htm', send, function (data) {
				layer.msg(data == 'success' ? '邀请成功' : '\u9519\u8BEF:' + data);
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
		if (ynTeacherId) return layer.msg('老师不能提问!');
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
			var tag = count == 0 ? '\u60A8\u7684\u514D\u8D39\u63D0\u95EE\u5DF2\u7528\u5C3D\uFF0C\u53EF\u8FDB\u5165\u76F4\u64AD\u95F4\u8FDB\u884C\u4E92\u52A8' : '\u60A8\u8FD8\u5269<span class="value">' + count + '</span>\u6B21\u514D\u8D39\u63D0\u95EE\u673A\u4F1A';
			reset();
			// container.show().velocity('transition.expandIn', { duration: 300 });
			animate();
			container.parent('#askTeacher-wrap').fadeIn();
			container.parent('#askTeacher-wrap').show();
			container.find('.times').html(tag); //显示次数
			option.select && optionHandler.select(); //选中老师
			option.invite && optionHandler.invite(); //如果是邀请回答
			option.filter.push(ynTeacherId);
			filterTeachers = function () {
				var temp = option.filter.join('-');
				return '-' + temp + '-';
			}();
			onlineTeacher.render();
		});
	}

	var animate = function animate() {
		var box = $('#askTeacherWindow');
		if (!box.hasOwnProperty('animateCss')) {}
		addFn();
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
		aimedTeacher.find('textarea').val('');
		stockTrendAimed.hide();
		$('#ask-win-stock').val('');
		$('#stockCode').val('');
		container.find('.wordCount .value').html(200);
		aimedTeacher.find('.aim-word .aim-count').html(200);
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
				return log('onSubmit is not override...');
			}
		};
	}();

	//搜索栏
	var seachBar = function () {
		var el = {
			container: null,
			select: null,
			input: null,
			price: null
		};
		var selected = [];
		var createItem = function createItem(id, name) {
			return '<span class="item" data-id="' + id + '">@' + name + '<i class="fa fa-times-circle close-invite"></i></span>';
		};

		//查询所有老师
		var queryTeacher = function queryTeacher(key) {
			key = key || '';
			var defer = $.Deferred();
			$.getJSON('/consultation/queryLikeTeacher.htm', { likename: key }, function (data) {
				return defer.resolve(data);
			});
			return defer.promise();
		};

		var errorHandleTable = {
			exist: function exist() {
				return layer.msg('已存在');
			},
			// "full": () => layer.msg("最多能邀请三位投顾回答!"),
			self: function self() {
				return layer.msg('不能向自己提问');
			}
		};

		return {
			init: function init() {
				var self = this;
				el.container = container.find('.invite');
				el.select = el.container.find('.select');
				el.input = el.container.find('input');
				el.price = el.container.find('.price-num');

				//删除选择
				el.container.on('click', '.close-invite', function () {
					var parent = $(this).parent();
					var id = parent.data('id');
					parent.remove();
					var index = _.indexOf(selected, id);
					selected.splice(index, 1);
					el.input.show();
					el.price.html(0);
				});

				//搜索
				el.input.keyup(_.debounce(function () {
					var val = $(this).val().replace('@', '');
					if (!/[\u4e00-\u9fa5]+/.test(val)) return;
					queryTeacher(val).done(function (data) {
						if (data.status == 1) {
							self.onChange(data);
						} else {
							return layer.msg(error[data.status]);
						}
					});
				}, 1000)).focus(function () {
					return queryTeacher('').done(function (data) {
						return self.onChange(data);
					});
				});

				// 清空搜索字符
				el.input.blur(function () {
					$(this).val('');
				});
			},

			//清空
			clear: function clear() {
				el.input.val('');
				el.select.empty();
				selected = [];
				el.input.show();
				el.price.html('0');
			},

			//添加
			add: function add(info) {
				if (+info.id == +ynTeacherId) {
					errorHandleTable.self();
					return;
				}
				el.select.html(createItem(info.id, info.name));
				el.price.html(info.price);
				// selected.push(+info.id); //转成数字
				selected.splice(0, 1, info.id);
				el.input.hide();
			},

			append: function append(info) {
				var query = [{ key: 'self', assert: +info.id == +ynTeacherId }, { key: 'exist', assert: _.indexOf(selected, info.id) != -1
					// { key: "full", assert: selected.length == 3 }
				}];
				var errItem = _.find(query, function (item) {
					return item.assert;
				});
				if (errItem) {
					errorHandleTable[errItem.key]();
					return;
				}
				el.price.html(info.price);
				el.select.html(createItem(info.id, info.name));
				// selected.push(info.id);
				selected.splice(0, 1, info.id);
				el.input.hide();
				// if (selected.length == 3) {
				//     this.onMax()
				// }
			},
			getValue: function getValue() {
				//获取邀请的老师id
				var price = el.price.html();
				console.log('=price=', price);
				var result = '';
				el.select.find('.item').each(function () {
					result += $(this).data('id') + '&';
				});
				return { result: result.replace(/&$/, ''), price: price };
			},
			assert: function assert() {
				return el.select.find('.item').length < 1;
			}, //验证
			onChange: function onChange() {
				return log('onChange  note override...');
			},
			onMax: function onMax() {
				return log('onMax : note override...');
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
					var teacherId = $(this).data('id');
					var name = $(this).data('name');
					getPrice({ teacherId: teacherId }).done(function (data) {
						var price = data.data;
						self.onSelect({
							id: teacherId,
							name: name,
							price: price
						});
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
				el.input.val('');
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
		    code = '',
		    name = '';
		return {
			init: function init() {
				el.container = container.find('.msg');
				el.code = el.container.find('.msg-code');
			},
			hide: function hide() {
				el.container.hide();
				code = name = '';
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

	//内容栏
	var textareaAimed = function () {
		var el = {};
		return {
			init: function init() {
				el.input = aimedTeacher.find('textarea');
				el.input.keyup(function () {
					var val = $(this).val();
					parseStock(val, function (info) {
						return info ? stockTrendAimed.render(info) : stockTrendAimed.hide();
					});
				});
			},
			clear: function clear() {
				el.input.val('');
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
	var stockTrendAimed = function () {
		var el = {},
		    code = '',
		    name = '';
		return {
			init: function init() {
				el.container = aimedTeacher.find('.aim-msg');
				el.code = el.container.find('.msg-code');
			},
			hide: function hide() {
				el.container.hide();
				code = name = '';
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

	//获取老师提问价格
	function getPrice(ops) {
		var defer = $.Deferred();
		$.getJSON('/teacher/getQuestionsPrice.htm', ops, function (back) {
			if (back.status == 1) {
				defer.resolve(back);
			} else (function () {
				return layer.msg(error[back.status]);
			});
		});
		return defer.promise();
	}

	//在线老师
	var onlineTeacher = function () {
		var el = {};
		return {
			init: function init() {
				var self = this;
				el.items = container.find('.right .items');
				el.items.on('click', '.item', function () {
					var teacherId = $(this).data('id');
					var name = $(this).data('name');
					getPrice({ teacherId: teacherId }).done(function (data) {
						var price = data.data;
						self.onSelect({
							id: teacherId,
							name: name,
							price: price
						});
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
				return log('onlineTeacher select...');
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

		$.getJSON('/consultation/queryTodayQuestionCount.htm', {
			questionuserid: ynUserId,
			t: timestamp()
		}, function (data) {
			if (data.status == 1) {
				askTimes = canAskTimes - +data.data;
				askTimes = askTimes < 1 ? 0 : askTimes;
				callback(askTimes);
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

	//字数统计
	function wordCountAimed() {
		var trigger = aimedTeacher.find('textarea');
		container.find('.wordCount .value');
		var el = aimedTeacher.find('.aim-word .aim-count');
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

	//aim-win显示股票列表
	//显示股票列表
	var showStockListAimed = function () {
		var el = {};
		return {
			init: function init() {
				el.input = aimedTeacher.find('.stockList');
				el.target = aimedTeacher.find('textarea');
				stockList.get().render({
					id: 'stockCode',
					top: 218,
					left: 25,
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
			left: (w - cw) / 2 + 'px',
			top: (h - ch) / 2 + 'px'
		});
	}

	var isStockCode = function isStockCode(value) {
		value = String(value);
		var reg = /[036][0-9]{5}/;
		if (reg.test(value)) {
			return true;
		} else {
			return false;
		}
	};

	/*针对某个老师提问*/
	var teacehrPrice = null;
	function aimedRender(ops) {
		if (!ynIsLogin) return yn.login.render();
		if (ynTeacherId) return layer.msg('老师不能提问!');
		queryAskTimes(function (count) {
			console.log('count3112', count);
			var tag = count == 0 ? '\u60A8\u7684\u514D\u8D39\u63D0\u95EE\u5DF2\u7528\u5C3D\uFF0C\u53EF\u8FDB\u5165\u76F4\u64AD\u95F4\u8FDB\u884C\u4E92\u52A8' : '\u60A8\u8FD8\u5269<span class="value">' + count + '</span>\u6B21\u514D\u8D39\u63D0\u95EE\u673A\u4F1A';
			animate();
			aimTeacherid = ops.select.id;
			getPrice({ teacherId: aimTeacherid }).done(function (data) {
				teacehrPrice = data.data;
				aimedTeacher.parent('#askAimed-wrap').fadeIn();
				aimedTeacher.parent('#askAimed-wrap').show();
				aimedTeacher.find('.aim-times').html(tag); //显示次数
				aimedTeacher.find('.aim-line .aim-num').html(teacehrPrice); //显示价格
			});
		});
	}

	/*///////////////////////////////////////////////////////////////////*/

	var instance = {
		init: init,
		render: render,
		aimedRender: aimedRender
	};

	module.exports = instance;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var payAny = __webpack_require__(4);
	var payConfirm = __webpack_require__(6);
	var error = __webpack_require__(11);

	/*
	约投顾支付模块
	var Confirm = require(../pay-any-package.js)

	1.随意赏 + 支付确认
	Confirm.render({
	    teacherId: Number,   老师ID
	    name: '直播送礼...',
	    finish: true/false,  是否显示支付完成/支付遇到问题步骤
	    callback: function(){}
	})

	2.only支付确认窗口
	Confirm.payconfirm({
	    name: '观点打赏...',
	    price: number,
	    orderNum: number,   订单号必传
	    finish: true/false,
	    success: function(){}   支付成功回调
	})
	 */
	var params = {};
	module.exports = {
	    render: function render(ops) {
	        console.log('osp', ops);
	        var self = this;
	        params = _.extend({
	            type: 0,
	            id: null,
	            name: '',
	            callback: null
	        }, ops);
	        if (!params.teacherId) {
	            layer.msg("pay : teacherId不能为空");
	            return;
	        }

	        // 显示随意赏窗口
	        payAny.getInstance().render({
	            onSubmit: function onSubmit(number) {

	                // 获取订单号 
	                var isOpinion = params.type == 0;
	                var getData = isOpinion ? getOpinionOrder : getGiftOrder;
	                getData({ teacherId: params.teacherId, number: number, id: params.id }, function (back) {
	                    if (back.status == "1") {
	                        params.url = "/html/returnshortcutpayJsp.htm?orderNum=" + back.data.orderNum;
	                        params.orderNum = back.data.orderNum;
	                        params.price = number;
	                        self.payconfirm(params);
	                    }
	                });
	            }

	        });
	    },
	    payconfirm: function payconfirm(ops) {
	        // 显示支付确认
	        payConfirm.getInstance().render({
	            type: ops.type,
	            price: ops.price,
	            link: ops.url,
	            referenceid: ops.referenceid,
	            userid: ops.userid,
	            orderNum: ops.orderNum,
	            finish: ops.finish,
	            read: ops.read,
	            orderid: ops.orderid,
	            success: ops.success,
	            useNB: ops.useNB
	        });
	    }
	};

	/**
	 * 获取礼物打赏订单
	 * {teacherId, number}
	 */
	var getGiftOrder = function getGiftOrder(ops, callback) {

	    // 随意赏=获取红包ID
	    $.getJSON("/gift/giftList.htm", function (back) {
	        var data = _.filter(back, function (item) {
	            return item.gift_name == "红包";
	        })[0];
	        var giftId = data.gift_id;

	        // 获取订单号
	        $.post("/app/appGiftPayOrder.htm", {
	            pay_source: "0", //web端
	            goodsType: "5", //直播
	            teacherId: ops.teacherId,
	            buy_number: ops.number, //支付总价
	            giftId: giftId, //随意赏=送红包
	            sum: ops.number
	        }, function (back) {
	            if (+back.status == 1) {
	                typeof callback == 'function' && callback(back);
	                return;
	            }
	            layer.msg(error[back.status]);
	        }, 'json');
	    });
	};

	/**
	 * 获取观点打赏订单
	 * {teacherId, number, id}
	 */
	var getOpinionOrder = function getOpinionOrder(ops, callback) {
	    $.post("/app/appRewardPayOrder.htm", {
	        goodsId: ops.id, // 观点ID
	        goodsType: 0, //商品类型(0观点，1组合，2课程，3礼物，4内参 5:问股 6 直播)
	        totalPrice: ops.number, //支付总价
	        pay_source: 0, //来源 0web 1ios 2android
	        teacherId: ops.teacherId //老师ID
	    }, function (back) {
	        if (+back.status == 1) {
	            typeof callback == 'function' && callback(back);
	            return;
	        }
	        layer.msg(error[back.status]);
	    }, 'json');
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 *  随意赏弹窗
	 *  var pay = require('m/lib/pay-any.js')	// 导入模块
	 *  var instance = pay.getInstance()		// 创建/获取实例
	 *  instance.render({
	 *  	onSubmit : price => {
	 *  		//点击立即打赏时的回调函数
	 *  	}
	 *  })
	 */

	var fn = __webpack_require__(5);

	module.exports = function () {

	    var instance = null;

	    /* create instance */
	    var createInstance = function createInstance() {

	        $('body').append(createElement());

	        var container = $('#playtour');
	        var input = container.find('input');
	        var balance = 0; //账户余额
	        var $balance = container.find('.balance-value');

	        yn.centerBox(container);

	        /* event */

	        // 关闭
	        container.find('.close').click(function (e) {
	            return container.hide();
	        });

	        // 快捷输入
	        container.find('.support-short-item').click(function () {
	            $(this).addClass('thistype').siblings('.thistype').removeClass('thistype');
	            input.val($(this).data('type'));
	        });

	        // 立即打赏
	        container.find('.submit').click(function (e) {

	            //验证价格
	            var val = _.trim(input.val());
	            if (!/^[1-9][0-9]*$/.test(val)) {
	                return layer.msg("客官，真的不能再少了!");
	            }

	            // 验证余额
	            // if (balance < 1) {
	            //     return layer.msg("可用余额不足,请充值")
	            // }

	            container.hide();
	            instance.onSubmit && instance.onSubmit(+val);
	        });

	        return {
	            render: function render(ops) {

	                _.extend(this, ops);

	                // 查询余额
	                getBalance().done(function (data) {
	                    $balance.text(data.balance);
	                    balance = +data.balance;
	                    // console.log($balance,data.balance,balance)
	                });

	                // 重置
	                input.val("");
	                $('.support-short-item.thistype').removeClass('thistype');

	                container.velocity('transition.expandIn', { duration: 300 });
	            }
	        };
	    };

	    /* single */
	    return {
	        getInstance: function getInstance() {
	            if (!instance) instance = createInstance();
	            return instance;
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	// 查询账户余额
	var getBalance = function getBalance() {
	    var defer = $.Deferred();
	    $.getJSON('/useraccount/pay_useraccountDetail.htm', {
	        user_id: ynUserId
	    }, function (data) {
	        return defer.resolve(data);
	    });
	    return defer.promise();
	};

	// 创建标签
	var createElement = function createElement() {
	    return '<div id="playtour" class="hide"><p class="title-1">\u6253\u8D4F<span>\uFF08\u672C\u6B21\u4EA4\u6613\u514D\u5BC6\u7801\uFF09</span></p><i class="close fa fa-times-circle fa-2x"></i><div class="wrap"><div class="getPrice"><div class="group"><span class="support-short-item" data-type="2">2\u725B\u5E01</br><font>\uFF08\u7B49\u4EF72\u5143\uFF09</font></span><span class="support-short-item" data-type="16">16\u725B\u5E01</br><font>\uFF08\u7B49\u4EF716\u5143\uFF09</font></span><span class="support-short-item" data-type="58">58\u725B\u5E01</br><font>\uFF08\u7B49\u4EF758\u5143\uFF09</font></span></div><div class="pleases"><span>\u968F\u610F\u8D4F:</span><input type="text" placeholder="\u8BF7\u8F93\u5165\u6574\u6570(\u5355\u4F4D:\u5143)"/><span>\u725B\u5E01</span></div><p class="balance clear"><span class="fl" id="support-surplus">\u53EF\u7528\u4F59\u989D<strong style=\'margin:0 5px; color:red;\' class="balance-value">0</strong>\u725B\u5E01</span><a href="/html/recharge.htm" class="gopay fr" target="_blank">\u4F59\u989D\u4E0D\u8DB3\uFF1F\u53BB\u5145\u503C</a></p><div class="info"><span>\u8D60\u9001\u65E0\u6094\uFF0C\u6982\u4E0D\u9000\u6B3E</span><span class="submit fr">\u7ACB\u5373\u6253\u8D4F</span></div></div></div></div>';
	};

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 支付确认窗口
	    confirm.render({
	        name: String, 支付项目名称
	        price: String, 价格
	        link: String, 立即支付链接
	        success: Function, 支付成功回调
	        fail:Function 支付失败回调,
	        read: Boolean, 是否默认勾选风险揭示书
	        finish: Boolean 是否显示支付完成确认窗口
	    })
	 */

	__webpack_require__(7);

	var ErrorCode = __webpack_require__(11);

	var orderType = {
	    0: '观点打赏',
	    1: '组合',
	    2: '课程',
	    3: '内参订阅',
	    4: '股票提问',
	    5: '直播送礼',
	    6: 'vip直播室'
	};

	module.exports = function () {
	    var instance = null;

	    var createInstance = function createInstance() {
	        var container,
	            box,
	            confirm,
	            tip,
	            name,
	            price,
	            link,
	            orderNum,
	            agreeTip,
	            items,
	            orderValue,
	            finish,
	            typeBalance,
	            ops = {
	            name: '支付名称',
	            price: 0,
	            link: '#',
	            finish: true,
	            success: function success() {
	                layer.msg('支付成功');
	            },
	            fail: function fail() {
	                layer.msg('支付尚未完成');
	            }
	        };

	        var payStatus = null; //支付状态
	        var accountRemain = 0; //账户余额
	        var payType = 'balance'; // 默认支付类型
	        var goodsType = ''; // 订单类型
	        var OrderNum = null;

	        $('body').append(createElement());

	        container = $('.pay-confirm-overlay');
	        box = container.find('.pay-confirm-box');
	        confirm = $('.pay-item-confirm');
	        tip = container.find('.pay-item-tip');
	        name = container.find('.name .value');
	        price = container.find('.price .value');
	        link = $('#pay-confirm-link');
	        orderNum = container.find('.orderNum-value');
	        agreeTip = container.find('.agree-tip');
	        items = container.find('.defray-item');
	        typeBalance = container.find('.type-nb');

	        //关闭
	        container.on('click', '.close', function () {
	            $.post('/web/getPayStatus.htm', { orderNum: OrderNum }, function (data) {
	                data = JSON.parse(data);
	                if (data.status == '1' && (data.data == '6' || data.data == '1')) {
	                    ops.success();
	                }
	            });
	            container.hide();
	            reset();
	        });

	        // //立即支付
	        // container.on('click', '.jump', function() {
	        //     if (ops.finish) {
	        //         confirm.hide();
	        //         tip.show();
	        //     } else {
	        //         container.hide()
	        //     }
	        // })

	        //支付完成
	        tip.on('click', '.finish', function () {
	            $.post('/web/getPayStatus.htm', { orderNum: OrderNum }, function (data) {
	                data = JSON.parse(data);
	                if (data.status == '1' && (data.data == '6' || data.data == '1')) {
	                    container.hide().velocity('transition.bounceDownOut', { duration: 300 });
	                    reset();
	                    ops.success();
	                } else {
	                    container.velocity('callout.shake', { duration: 300 });
	                    ops.fail(data);
	                }
	            });
	        });
	        var reset = function reset() {
	            confirm.show();
	            tip.hide();
	            container.find('.defray-item.type-nb').removeClass('disable');
	            agreeTip.hide().find('.tip-wrap').html('');
	        };
	        reset();

	        //支付类型
	        var strategy = {
	            balance: function balance() {
	                if (+accountRemain < 1) {
	                    layer.msg('余额不足,系统将自动跳转充值页面');
	                    setTimeout(function () {
	                        window.location.href = '/html/recharge.htm';
	                    }, 2000);
	                    return;
	                }

	                $.post('/reward/rewardTheacher.htm', { orderNum: orderValue }, function (data) {
	                    if (data == 'success') {
	                        layer.msg('支付成功!');

	                        return;
	                    }
	                    // layer.msg(`余额不足, 页面即将跳转到充值页面`);
	                    // setTimeout(function() {
	                    //     window.location.href = "/html/recharge.htm"
	                    // }, 1000)
	                });
	            },

	            wechat: function wechat() {
	                window.open('/html/recharge.htm?pay_type=0&orderNum=' + orderValue);
	                // window.location.href = '/html/recharge.htm?pay_type=0&orderNum=' + orderValue;
	            },
	            alipay: function alipay() {
	                window.open('/html/recharge.htm?pay_type=1&orderNum=' + orderValue);
	            }
	        };

	        //切换支付类型
	        container.on('click', '.defray-item', function () {
	            if ($(this).hasClass('disable')) return;
	            payType = $(this).data('source');
	            console.log('=payType=', payType);
	            $(this).addClass('thisclass').siblings().removeClass('thisclass');
	        });

	        //确认支付
	        container.on('click', '.jump', function () {
	            console.log('payType', payType);
	            if (ynIsTeacher) {
	                return layer.msg('老师不能购买~');
	            }
	            // link.off('click');
	            if (agreeTip.is(':visible')) {
	                var flag = agreeTip.find('input').is(':checked');
	                if (!flag && goodsType == 3) {
	                    layer.msg('请先阅读并同意《风险揭示书》《服务使用协议》');
	                    return false;
	                } else if (!flag && goodsType == 4) {
	                    return layer.msg('请先阅读并同意《约投顾问股服务协议》');
	                }
	            }
	            strategy[payType]();
	            if (finish) {
	                confirm.hide();
	                tip.show();
	            } else {
	                container.hide();
	                reset();
	            }
	        });

	        return {
	            render: function render(options) {
	                var self = this;
	                _.extend(ops, options);
	                OrderNum = ops.orderNum;
	                // 赋值
	                name.text(orderType[ops.type]);
	                price.text(ops.price);
	                orderNum.text(ops.orderNum);
	                console.log('=ops=', ops);
	                if (!ops.useNB) {
	                    self.delBanlance();
	                } else {
	                    typeBalance.show();
	                    //查询账户余额
	                    $.getJSON('/useraccount/pay_useraccountDetail.htm', { user_id: ynUserId }, function (data) {
	                        accountRemain = +data.balance;
	                        container.find('.yn-balance-value').html('可用余额' + data.balance + '牛币');
	                        if (data.balance < ops.price) {
	                            //余额不足时  不能选余额支付，默认微信支付
	                            container.find('.defray-item.type-wx').click();
	                            container.find('.defray-item.type-nb').addClass('disable');
	                        } else {
	                            container.find('.defray-item.type-nb').click();
	                        }
	                    });
	                }
	                self.orderType(ops.type);
	                goodsType = ops.type;
	                orderValue = ops.orderNum;
	                finish = ops.finish;

	                //风险揭示书默认打钩
	                if (!ops.read) {
	                    agreeTip.find('input').attr('checked', false);
	                }

	                container.show().velocity('transition.fadeIn', { duration: 300 });
	                box.velocity('transition.swoopIn', { duration: 300 });

	                // //查询订单信息
	                // $.post('/web/getPayOrderInfo.htm', { orderNum }, data => {
	                //     //     console.log("订单信息", data)
	                //     goodsType = data.goodsType;
	                //     orderInfo = data;
	                //     if (+goodsType == 6) { //goodsType = 6是购买VIP直播室，不能用牛币支付
	                //         items.eq(0).remove();
	                //     }
	                // }, 'json')
	            },
	            delBanlance: function delBanlance() {
	                typeBalance.hide();
	                container.find('.defray-item.type-wx').click();
	            },
	            orderType: function orderType(n) {
	                var self = this;
	                if (n == 3) {
	                    //0观点，1组合，2课程，3 内参 4:问股 5 直播 6vip直播室
	                    agreeTip.show();
	                    container.find('.tip-wrap').html('\n                        <a href="/protocol.htm?orderid=' + ops.orderid + '&referenceid=' + ops.referenceid + '" class="risk agree" target="_blank"><span class="blue">\u300A\u98CE\u9669\u63ED\u793A\u4E66\u300B</span></a>\n                        <a href="/agreement.htm?orderid=' + ops.orderid + '&referenceid=' + ops.referenceid + '" class="service agree" target="_blank"><span class="blue">\u300A\u670D\u52A1\u4F7F\u7528\u534F\u8BAE\u300B</span></a>');
	                    self.delBanlance();
	                }
	                if (n == 4) {
	                    agreeTip.show();
	                    container.find('.tip-wrap').html('<a href="/ask-agreement.htm" class="ask agree" target="_blank"><span class="blue">\u300A\u7EA6\u6295\u987E\u95EE\u80A1\u670D\u52A1\u534F\u8BAE\u300B</span></a>');
	                }
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

	/*///////////////////////////////////////////////////////////////////*/

	var createElement = function createElement() {
	    return '<div class="pay-confirm-overlay"><div class="pay-confirm-box"><div class="title">\u652F\u4ED8\u786E\u8BA4</div><span class="close"></span><div class="content"><div class="pay-item pay-item-confirm"><div class="payment"><div class="price">\u652F\u4ED8\u91D1\u989D<span class="inline fr colorRed">\uFFE5<strong class="value inline"></strong></span></div><div class="name">\u8BA2\u5355\u63CF\u8FF0<span class="value fr"></span></div><div class="orderNum">\u8BA2\u5355\u7F16\u53F7<span class="orderNum-value fr"></span></div></div><div class="defray-content"><!-- \u4F59\u989D\u652F\u4ED8 --><div data-source="balance" class="defray-item clear type-nb"><div class="rounded fr"><label for="roundedOne"></label></div><div class="defray_radio defray-balance clear fl"><div class="apyphoto fl"></div><div class="yn_pay fl"><p class="pay-title" style="position:relative;top:-6px;">\u4F59\u989D\u652F\u4ED8<i class="balance-icon"></i><i class="balance-arrow"></i><span class="yn_balance"><span class="yn-balance-value"></span><a href="/html/recharge.htm" class="colorRed" target="_blank">\u53BB\u5145\u503C</a></span></p></div></div></div><!-- \u5FAE\u4FE1\u652F\u4ED8 --><div data-source="wechat" class="defray-item clear type-wx"><div class="rounded fr"><!--<input type="radio" id="roundedTwo" name="radio">--><label for="roundedTwo" class="label-wx"></label></div><div class="defray_radio defray-wechat clear fl"><div class="apyphoto fl"></div><div class="yn_pay fl"><span class="pay-title">\u5FAE\u4FE1\u652F\u4ED8</span></div></div></div><!-- \u652F\u4ED8\u5B9D --><div data-source="alipay" class="defray-item clear type-alipay"><div class="rounded fr thisclass "><!--<input type="radio" id="roundedThree" name="radio">--><label for="roundedThree" class="label-alipay"></label></div><div class="defray_radio defray-alipay clear fl"><div class="apyphoto fl"></div><div class="yn_pay fl inline"><span class="pay-title">\u652F\u4ED8\u5B9D\u652F\u4ED8</span></div></div></div></div><div class="agree-tip clear hide"><span class="agree"><input type="checkbox" checked="checked"/><span class="txt">\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F</span></span><span class="tip-wrap"><span></div><div class="submits"><a id="pay-confirm-link" class="pay-btn jump" target="_blank">\u786E\u8BA4\u652F\u4ED8</a></div></div><div class="pay-item pay-item-tip hide"><div class="payment"><p>\u652F\u4ED8\u5B8C\u6210\u524D\uFF0C\u8BF7\u4E0D\u8981\u5173\u95ED\u6B64\u652F\u4ED8\u9A8C\u8BC1\u7A97\u53E3</p><p><strong>\u8BF7\u57282\u5C0F\u65F6\u5185\u652F\u4ED8\uFF0C\u8D85\u65F6\u5C06\u5173\u95ED\u8BA2\u5355</strong></p><div class="submits"><a class="wrong pay-btn" href="http://us.yuetougu.com/help.htm" target="_blank">\u652F\u4ED8\u9047\u5230\u95EE\u9898</a><a class="finish pay-btn">\u652F\u4ED8\u5B8C\u6210</a></div></div></div></div></div></div>';
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./pay-confirm.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./pay-confirm.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".hide {\n    display: none;\n}\n\n.fr {\n    float: right;\n}\n\n.color666 {\n    color: #666;\n}\n\n.inline {\n    display: inline-block;\n}\n\n.pay-confirm-overlay {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background: rgba(0, 0, 0, .4);\n    text-align: center;\n    z-index: 10000;\n}\n\n.pay-confirm-box {\n    display: inline-block;\n    margin-top: 200px;\n    background: white;\n    border-radius:2px;\n    position: relative;\n    width: 500px;\n    text-align: left;\n    margin: auto;\n    margin-top: 245px;\n    box-shadow: 7px 4px 20px 0px hsla(0, 0%, 65%, 0.38);\n}\n\n.pay-confirm-box .title {\n    text-align: left;\n    padding: 12px 20px;\n    font-size: 16px;\n    border-bottom: 1px solid rgb(219, 219, 219);\n    font-weight: bold;\n}\n\n.pay-confirm-box .content {\n    padding:20px 30px 25px;\n}\n\n.pay-confirm-box .close {\n    width:9px;\n    height:9px;\n    background:url(/public/v2/base/images/close-icon.png) no-repeat;\n    position: absolute;\n    top: 16px;\n    right: 17px;\n    cursor: pointer;\n}\n\n.payment {\n    padding-bottom: 25px;\n    border-bottom: 1px dashed #cecece;\n}\n\n.pay-item-tip .payment {\n    text-align: center;\n    border-bottom: none;\n    line-height:26px;\n    color:#666;\n    padding-bottom:0;\n    font-size:16px;\n}\n\n.payment .name {\n    font-size: 16px;\n    margin-bottom: 15px;\n}\n\n.payment .price {\n    margin-bottom: 15px;\n    font-size: 16px;\n}\n\n.payment .value {\n    color: #d72612;\n}\n\n.pay-confirm-box .submits {\n    text-align: center;\n    margin-top: 15px;\n}\n\n.pay-confirm-box .pay-btn {\n    display: inline-block;\n    padding: 6px 35px;\n    border-radius: 5px;\n    background: #F6554A;\n    color: white;\n    font-size: 16px;\n    cursor: pointer;\n    margin: 0 10px;\n}\n.pay-confirm-box .pay-btn.jump{\n    padding:9px 20px;\n}\n.pay-confirm-box .pay-btn.finish{\n    padding:6px 46px;\n}\n\n.pay-item-tip .submits {\n    text-align: center;\n    margin-top:20px;\n}\n\n.pay-item-tip .wrong {\n    background: #a3a2a2\n}\n\n.agree .blue {\n    color: #1176E8;\n}\n\n.agree input {\n    position: relative;\n    top: 2px;\n    left: -3px;\n}\n\n.agree .txt {\n    color: #999;\n}\n\n.agree-tip {\n    margin-top:10px;\n    font-size: 12px;\n}\n\n.orderNum-value {\n    color: #666\n}\n\n\n/*  */\n\n.defray-content {\n    padding: 12px 0 0 0;\n    border-bottom: 1px dashed #cecece;\n}\n\n.defray-item {\n    height: 43px;\n    margin: 12px auto;\n}\n\n.yn_pay {\n    width: 340px;\n    position: relative;\n    top: 4px;\n    color: #333;\n    font-size: 16px;\n}\n\n.type-alipay {\n    background: url(/public/v2/base/images/zhifubao.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-wx {\n    background: url(/public/v2/base/images/weixin.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-nb {\n    background: url(/public/v2/base/images/yue.png) no-repeat;\n    padding-left: 45px;\n}\n\n.defray-item .rounded {\n    width: 14px;\n    height: 14px;\n    position: relative;\n    top: 7px;\n    border: 1px solid #B3B3B3;\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n}\n\n.defray-item.thisclass .rounded {\n    border: 1px solid #CB1F13;\n}\n\n.rounded label {\n    width: 10px;\n    height: 10px;\n    position: absolute;\n    top: 1px;\n    left: 1px;\n    cursor: pointer;\n    background: #B3B3B3;\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n}\n\n.defray-item.thisclass .rounded label {\n    background: #CB1F13;\n}\n.defray-item.disable .rounded{\n    background: #cccccc;\n}\n.defray-item.disable .rounded label {\n    background: #cccccc;\n}\n\n\n/*.rounded label:after {\n    content: '';\n    width: 11px;\n    height: 7px;\n    position: absolute;\n    top: 5px;\n    left: 4px;\n    border: 3px solid #fcfff4;\n    border-top: none;\n    border-right: none;\n    background: transparent;\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n    opacity: 0;\n    transition: all .3s;\n    -moz-transform: rotate(-45deg);\n    -ms-transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}*/\n\n\n/*.rounded label.disable {\n    background: #D7D7D7;\n}*/\n\n\n/*.rounded label:hover::after {\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=30);\n    opacity: 0.3;\n}*/\n\n\n/*.rounded input[type=radio] {\n     position:relative;\n    top:1px;\n    left:1px;\n    visibility: hidden;\n}*/\n\n\n/*.rounded input[type=radio]:checked+label {\n    background: #CB1F13;\n    top: 1px;\n    left: 1px;\n}*/\n\n\n/*  */\n\n.balance-icon {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background: url(/public/v2/base/images/balance-icon.png) no-repeat;\n    position: relative;\n    top: 4px;\n    left: 10px;\n}\n\n.yn_balance {\n    color: #666;\n    font-size: 14px;\n    height: 20px;\n    line-height: 20px;\n    border: 1px solid #E7E5E5;\n    border-left: none;\n    box-shadow: 5px 3px 10px #ececec;\n    padding: 2px 10px;\n}\n\n.balance-arrow {\n    display: inline-block;\n    width: 10px;\n    height: 24px;\n    background: url(/public/images/arrow.png) no-repeat;\n    margin-left: 10px;\n    position: relative;\n    top: 6px;\n    left: 5px;\n}\n\n.pay-confirm-overlay .colorRed {\n    color: #F6554A;\n}\n\n.orderNum {\n    font-size: 16px;\n}\n\n.yn-balance-value {\n    margin-right: 10px;\n}\n\n", ""]);

	// exports


/***/ }),
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	    "1": "请求成功",
	    "-1": "请求繁忙",
	    "10001": "股票代码不存在",
	    "10002": "查询条件为空",
	    "20001": "登录失效",
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
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	var liveDetailTable = {
	    composite: live_path + "/html/liveDetail_composite.htm"
	};

	module.exports = {

	    //首页

	    //组合
	    composite: {
	        portal: function portal() {
	            return __path + "/html/returnCompositeJsp.htm";
	        },
	        detail: function detail(compositeId, teacherId) {
	            teacherId = teacherId || "YN";
	            return __path + "/html/CompositeDetail.htm?" + teacherId + "ZHXQ" + compositeId;
	        },
	        create: function create(id) {
	            id = "?EDIT" + id || "";
	            return __path + "/html/compositeCreate.htm" + id;
	        }
	    },

	    //直播
	    live: {
	        detail: function detail(type) {
	            return liveDetailTable[type];
	        },
	        refer: function refer(id) {
	            return live_path + "/live/liveDetailRefer.htm?teacherid=" + id;
	        }
	    },

	    //内参
	    refer: {
	        detail: function detail(id) {
	            return __path + "/referp/list.htm?referenceid=" + id;
	        }
	    },

	    //支付
	    pay: function pay(order) {
	        return __path + "/html/returnshortcutpayJsp.htm?orderNum=" + order;
	    },

	    //视频
	    video: {
	        portal: video_path + "/video/index.htm",
	        detail: function detail(id) {
	            return video_path + "/video/detail.htm?videoId=" + id;
	        }
	    },

	    //个人中心
	    center: {
	        stock: __path + "/myCenter/myCenter.htm"
	    },

	    //资讯
	    news: {
	        portal: news_path + "/article/index.htm"
	    },

	    //观点

	    opinion: {
	        portal: opinion_path + "/opinion",
	        detail: function detail(id) {
	            return opinion_path + "/opinion/" + id + ".htm";
	        }
	    }
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "@keyframes zoomIn {\n    from {\n        opacity: 0;\n        transform: scale3d(.3, .3, .3);\n    }\n    50% {\n        opacity: 1;\n    }\n}\n\n.clear:after {\n    content: '';\n    display: block;\n    clear: both;\n    _zoom: 1;\n    *zoom: 1;\n}\n\n.zoomIn {\n    animation-name: zoomIn;\n}\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n}\n\n#askTeacher-wrap {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .4);\n    display: none;\n}\n\n#askTeacherWindow {\n    position: absolute;\n    top: 30% !important;\n    left: 50% !important;\n    margin-left: -450px !important;\n    border: 1px solid rgb(200, 200, 200);\n    background: white;\n    width: 900px;\n    font-size: 13px;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);\n    border-radius: 6px;\n}\n\n#askTeacherWindow .onlyInvite {\n    min-height: 150px;\n    text-align: center;\n}\n\n#askTeacherWindow .onlyInvite button {\n    margin: 20px auto;\n    display: inline-block;\n    width: 100px;\n}\n\n#askTeacherWindow>.close {\n    width: 9px;\n    height: 9px;\n    background: url(/public/v2/base/images/close-icon.png);\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left {\n    float: left;\n    width: 65%;\n    border-right: 1px solid rgb(200, 200, 200);\n    padding: 20px;\n}\n\n#askTeacherWindow .right {\n    float: right;\n    width: 35%;\n}\n\n#askTeacherWindow .left .title {\n    position: relative;\n    overflow: hidden;\n    border-left: 3px solid #d72621;\n    padding-left: 10px;\n    margin: 10px 0;\n}\n\n#askTeacherWindow .left .title .name {\n    font-weight: bold;\n    font-size: 16px;\n}\n\n#askTeacherWindow .left .title .times {\n    position: absolute;\n    right: 0px;\n}\n\n#askTeacherWindow .left .title .times .value,.aim-times .value{\n    color: #d72621;\n    margin: 0 2px;\n}\n\n#askTeacherWindow .left .invite {\n    width: 100%;\n    height: 38px;\n    border: 1px solid rgb(230, 230, 230);\n    position: relative;\n}\n\n#askTeacherWindow .price {\n    display: inline-block;\n    float: right;\n    height: 36px;\n    line-height: 36px;\n    margin-right: 7px;\n}\n\n#askTeacherWindow .priceNum {\n    color: #DD503F;\n    font-weight: bold;\n    margin: 0 5px;\n}\n\n#askTeacherWindow .left .invite .list {\n    position: absolute;\n    background: white;\n    width: 542px;\n    left: 0;\n    top: 37px;\n    padding: 15px;\n    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);\n    border: 1px solid rgb(200, 200, 200);\n    z-index: 100;\n}\n\n#askTeacherWindow .left .invite .list .close {\n    width: 9px;\n    height: 9px;\n    background: url(/public/v2/base/images/close-icon.png);\n    float: right;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left .invite .list .list-wrap {\n    margin-top: 10px;\n    overflow: auto;\n    height: 200px;\n    float: left;\n}\n\n#askTeacherWindow .left .invite .select {\n    height: 36px;\n    line-height: 36px;\n    font-size: 13px;\n    float: left;\n    padding: 0 5px;\n    color: #62a5d9;\n}\n\n#askTeacherWindow .left .invite .select .item {\n    margin-right: 8px;\n}\n\n#askTeacherWindow .left .invite .select .fa {\n    margin-left: 5px;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left .invite input {\n    float: left;\n    padding: 10px;\n    border: none;\n    padding-left: 0;\n}\n\n#askTeacherWindow .left .values {\n    margin: 10px 0;\n}\n\n#askTeacherWindow .left textarea {\n    width: 100%;\n    padding: 10px;\n}\n\n#askTeacherWindow .bottom {\n    /*overflow: hidden;*/\n    position: relative;\n}\n\n#askTeacherWindow .bottom .msg {\n    padding: 0 0 10px 0;\n}\n\n#askTeacherWindow .bottom .msg .msg-code {\n    margin: 0 5px;\n    color: #d72621;\n}\n\n#askTeacherWindow .bottom .msg .fa {\n    margin-right: 5px;\n}\n\n#askTeacherWindow .actions {\n    display: inline-block;\n    float: left;\n    position: relative;\n    width: 300px;\n}\n\n#askTeacherWindow .action.search input {\n    padding: 5px;\n}\n\n#askTeacherWindow .action.search .icon {\n    color: gray;\n    position: relative;\n    left: -25px;\n}\n\n#askTeacherWindow .submit {\n    display: inline-block;\n    float: right;\n}\n\n#askTeacherWindow .submit .wordCount {\n    position: relative;\n    top: 6px;\n    right: 10px;\n}\n\n#askTeacherWindow .right {\n    padding: 25px;\n}\n\n#askTeacherWindow .right .content {\n    overflow: auto;\n}\n\n#askTeacherWindow .right .title {\n    color: #575757;\n    font-size: 15px;\n}\n\n#askTeacherWindow .right .items {\n    overflow: auto;\n    max-height: 278px;\n}\n\n#askTeacherWindow .teacher-item {\n    display: block;\n    overflow: hidden;\n    padding: 10px 0;\n    border-bottom: 1px solid rgb(245, 245, 245);\n    cursor: pointer;\n    float: left;\n    width: 245px;\n}\n\n#askTeacherWindow .teacher-item:hover {\n    background: rgb(245, 245, 245);\n}\n\n#askTeacherWindow .teacher-item:first-child {\n    border-top: none;\n}\n\n#askTeacherWindow .teacher-item .avatar {\n    width: 50px;\n    height: 50px;\n    overflow: hidden;\n    float: left;\n    border-radius: 2px;\n}\n\n#askTeacherWindow .teacher-item .avatar img {\n    height: 100%;\n}\n\n#askTeacherWindow .teacher-item .info {\n    float: left;\n    margin-left: 10px;\n}\n\n#askTeacherWindow .teacher-item .info .value {\n    color: #ca2723;\n    margin-right: 10px;\n    margin-left: 5px;\n}\n\n#askTeacherWindow .teacher-item .info .line1 {\n    font-size: 16px;\n    margin-bottom: 10px;\n}\n\n#askTeacherWindow .teacher-item .info .line2 {\n    font-size: 13px;\n    color: gray;\n}\n\n#askTeacherWindow input,\n#askTeacherWindow textarea {\n    outline: none;\n    resize: none;\n    border: 1px solid rgb(235, 235, 235);\n}\n\n.submit button {\n    color: white;\n    font-family: \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", tahoma, arial;\n    font-size: 12px;\n    padding: 5px 15px;\n    border-width: 1px;\n    border-style: solid;\n    border-image: initial;\n    border-radius: 2px;\n    background: rgb(215, 38, 33);\n    border-color: rgb(215, 38, 33);\n}\n\n\n/* 次数用完 */\n\n#askNoTimesWin {\n    width: 470px;\n    background: #fff;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, .3);\n    text-align: center;\n    padding: 20px 0;\n    position: fixed;\n    top: 220px;\n    left: 50%;\n    margin-left: -235px;\n    z-index: 1000;\n}\n\n#askNoTimesWin .goLiveRoom {\n    display: block;\n    width: 140px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    color: #fff;\n    background: #F03333;\n    margin: 40px auto 0 auto;\n    border-radius: 4px;\n    cursor: pointer;\n    text-decoration: none;\n}\n\n#askNoTimesWin .ask-icon {\n    margin: 20px auto;\n}\n\n#askNoTimesWin .ask-tip {\n    margin: 10px auto;\n    color: #666;\n    font-size: 15px;\n}\n\n#askNoTimesWin .ask-close {\n    float: right;\n    position: relative;\n    right: 10px;\n    top: -9px;\n    cursor: pointer;\n}\n\n\n/*askSuccess*/\n\n#askSuccess {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .4);\n    z-index: 998;\n    display: none;\n    cursor: pointer;\n}\n\n#askSuccess .askSuccess-wrap {\n    width: 391px;\n    background: #fff;\n    border-radius: 4px;\n    box-shadow: 0px 0px 4px rgba(102, 102, 102, 0.73);\n    position: absolute;\n    top: 30%;\n    left: 50%;\n    margin-left: -195px;\n    text-align: center;\n    padding: 28px 0;\n    font-size: 16px;\n    color: #666666;\n}\n\n#askSuccess .askSuccess-img {\n    width: 60px;\n    height: 60px;\n    background: url('/public/v2/base/images/askSuccess.png') no-repeat;\n    margin: 0 auto 15px auto;\n}\n\n#askSuccess .askSuccess-text {\n    margin: 12px auto 0 auto;\n}\n\n#askSuccess .askSuccess-text.first {\n    margin-bottom: 18px;\n}\n\n#askSuccess .askSuccess-red {\n    color: #DD503F;\n}\n\n\n/*提问某个投顾*/\n\n#askAimed-wrap {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .4);\n    display: none;\n}\n\n#askAimedTeacher {\n    width: 534px;\n    /*height: 257px;*/\n    padding: 20px 25px;\n    background: #fff;\n    position: fixed;\n    top: 30%;\n    left: 50%;\n    margin-left: -277px;\n    border-radius: 6px;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, .3);\n}\n\n#askAimedTeacher .aim-close-win {\n    width: 9px;\n    height: 9px;\n    background: url(/public/v2/base/images/close-icon.png);\n    float: right;\n    cursor: pointer;\n    position: relative;\n    top: -10px;\n    right: -15px;\n}\n\n#askAimedTeacher .aim-title {\n    position: relative;\n    overflow: hidden;\n    border-left: 3px solid #d72621;\n    padding-left: 10px;\n    font-size: 16px;\n}\n\n#askAimedTeacher .aim-times {\n    float: right;\n    font-size: 12px;\n    color: #333;\n    position: relative;\n    top: 2px;\n}\n\n#askAimedTeacher #textarea {\n    width: 100%;\n    height: 150px;\n    padding: 13px;\n    font-size: 13px;\n    line-height: 19px;\n}\n\n#askAimedTeacher .aim-content {\n    margin: 14px auto 14px auto;\n}\n\n#askAimedTeacher .aim-bottom {\n    /* position: relative;\n    top: -5px;*/\n}\n\n#askAimedTeacher .aim-line {\n    display: inline-block;\n    float: right;\n    font-size: 14px;\n}\n\n#askAimedTeacher .aim-word,\n#askAimedTeacher .aim-price {\n    color: #999999;\n    margin: 0 5px;\n}\n\n#askAimedTeacher .aim-num,\n.aim-value {\n    color: #DD503F;\n}\n\n#askAimedTeacher .aim-red {\n    color: #DD503F;\n    margin-left: 5px;\n}\n\n#askAimedTeacher .aim-submit {\n    display: inline-block;\n    width: 57px;\n    height: 31px;\n    line-height: 31px;\n    text-align: center;\n    color: #fff;\n    background: rgba(215, 38, 33, 1);\n    border-radius: 2px;\n    cursor: pointer;\n}\n\n#askAimedTeacher #stockCode {\n    display: inline-block;\n    width: 122px;\n    height: 29px;\n    background: rgba(255, 255, 255, 1);\n    font-size: 12px;\n    padding-left: 5px;\n}\n\n#askAimedTeacher .aim-msg {\n    margin-bottom: 10px;\n}\n\n#askAimedTeacher .msg-code {\n    margin: 0 5px;\n    color: #d72621;\n}\n", ""]);

	// exports


/***/ }),
/* 15 */
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
/* 16 */
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

	__webpack_require__(17);
	var local = __webpack_require__(19);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "#ynStcokListSpacial {\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\n    border: 2px solid #3274D8;\n    background: white;\n    display: none;\n    position: fixed;\n    overflow: hidden;\n    z-index: 50000\n}\n#ynStcokListSpacial tr{\n\n}\n#ynStcokListSpacial .ynStockList td {\n    padding: 8px 15px;\n    cursor: pointer;\n}\n\n#ynStcokListSpacial .ynStockList:hover td,\n#ynStcokListSpacial .ynStockList:first-child td {\n    background: #3274D8;\n    color: white;\n}\n\n\n/* after */\n\n.ynStcokListSpacial {\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\n    border: 2px solid #3274D8;\n    background: white;\n    display: none;\n    position: absolute;\n    z-index: 50000;\n    top: 0;\n    left: 0;\n}\n\n.ynStcokListSpacial .ynStockList td {\n    padding: 8px 15px;\n    cursor: pointer;\n    line-height:20px;\n}\n\n.ynStcokListSpacial .ynStockList:hover td,\n.ynStcokListSpacial .ynStockList:first-child td {\n    background: #3274D8;\n    color: white;\n}\n", ""]);

	// exports


/***/ }),
/* 19 */
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
/* 20 */
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
	    "60023": "商品购买时间已过",
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*

	    关注列表
	    

	*/

	var error = __webpack_require__(20);
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*

	使用方法
	var referCategory = require('../module/composite/refer-category.js');
	referCategory.render({
	    container: $el,
	    select: value => {}  点击时回调 
	});


	*/

	__webpack_require__(23);
	module.exports = function () {
	    var param = { light: "top" };
	    var create = function create(ops) {
	        return '<div class="inline ' + param.light + ' refer-category-item select" data-value="">\u5168\u90E8</div><div class="inline ' + param.light + ' refer-category-item" data-value="1">\u70ED\u5356\u4E2D</div><div class="inline ' + param.light + ' refer-category-item" data-value="0">\u670D\u52A1\u4E2D</div><div class="inline ' + param.light + ' refer-category-item" data-value="2">\u5DF2\u7ED3\u675F</div>';
	    };
	    return {
	        render: function render(ops) {
	            _.extend(param, ops);
	            ops.container.html(create());
	            ops.container.on('click', ".refer-category-item", function () {
	                $(this).parent().find('.select').removeClass('select');
	                $(this).addClass("select");
	                ops.select($(this).data('value'));
	            });
	        }
	    };
	}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-category.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-category.css");
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

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, ".refer-category-item {\r\n    padding: 10px 20px;\r\n    border-bottom: 3px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n}\r\n\r\n.refer-category-item.top {\r\n    border-top: 3px solid white;\r\n}\r\n\r\n.refer-category-item.top.select {\r\n    border-top: 3px solid #d72621;\r\n}\r\n\r\n.refer-category-item.bottom {\r\n    border-bottom: 3px solid white;\r\n}\r\n\r\n.refer-category-item.bottom.select {\r\n    border-bottom: 3px solid #d72621;\r\n}\r\n\r\n.refer-category-item.select {\r\n    color: #d72621;\r\n}\r\n", ""]);

	// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    //导入模块
	    var referList = require('../module/composite/refer-list.js');

	    referList.init({container: $el });

	    //渲染视图
	    referList.render({ data: Array});
	*/

	/*///////////////////////////////////////////////////////////////////*/

	__webpack_require__(26);
	var Path = __webpack_require__(12);
	var Day = __webpack_require__(28);
	var payConfirm = __webpack_require__(29);
	var Day = __webpack_require__(28);
	var auth = __webpack_require__(30); // 实名认证模块


	/*///////////////////////////////////////////////////////////////////*/

	/*
	    ops = {data, container} //require
	*/
	module.exports = function () {
	    var container, data, contentWidth, countDown;

	    var create = function create(data) {
	        return '<div class="refer-list-item" id="refer-li"><div class="refer-list-item-wrap"><div class="user_info clear"><div class="user_head fl"><span class="icon status ' + data._icon + '">' + data._text + '</span><div class="cover"><img src="' + data.photo_path + '" /></div><div class="name">' + data.puiblisher + '</div></div><div class="content fl"><a class="title" href="' + data._link + '" target="_blank" style="width:' + contentWidth + 'px">' + data._title + countDown + '</a><div class="middle"><div class="price fl"><div class="red">' + data._price + '</div><div class="small">\u4EF7\u683C</div></div><div class="num fl"><div class="red">' + data.updatefrequency + '<span class="small">\uFF08\u6761\uFF09</span></div><div class="small"><span>' + data.updateDay + '</span>\u4EA4\u6613\u65E5/\u66F4\u65B0\u9891\u7387</div></div><div class="dayCount"><span class="line"></span><span class="point"></span><span class="text">' + data.runText + '</span></div></div><div class="sub_detail clear ' + data._style + '">\u670D\u52A1\u65F6\u95F4\uFF1A' + data._startTime + '\uFF0D' + data._endTime + '</div><div class="sub_detail clear ' + data._style1 + '">\u670D\u52A1\u65F6\u95F4\uFF1A\u65E0\u9650\u671F</div></div></div></div><div class="agreement"><a href="/protocol.htm?orderid=' + data.orderid + '&referenceid=' + data.id + '" target="_blank">\u300A\u670D\u52A1\u4F7F\u7528\u534F\u8BAE\u300B</a><a href="/agreement.htm?orderid=' + data.orderid + '&referenceid=' + data.id + '" target="_blank">\u300A\u98CE\u9669\u63D0\u793A\u4E66\u300B</a></div>' + data._button + '</div>';
	    };
	    //开始时间 + 试用时间 = 使用结束时间
	    function transferCouponValueTime(startDate, valueTime) {
	        var date = new Date(startDate);
	        var newDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() + valueTime);
	        var year2 = newDate.getFullYear();
	        var month2 = newDate.getMonth();
	        var day2 = newDate.getDate();
	        return year2 + '/' + month2 + '/' + day2;
	    }

	    var getShort = function getShort(str) {
	        return str.match(/^[\d\-]+/)[0];
	    };

	    var handleData = function handleData(data) {
	        var getDay = function getDay(time) {
	            return time.match(/^\d+-(\d+-\d+)/)[1].replace(/-/, '.');
	        };

	        // 按钮状态
	        var buttonTable = {
	            feed: function feed(item) {
	                return '<span data-link="' + item._link + '" data-index="' + item.reference_id + '" class="feedBtn" data-type="feed" data-status=\'' + item.isactivity + '\'>\u7ACB\u5373\u67E5\u770B</span>';
	            },
	            unFeed: function unFeed(item) {
	                return '<a href="' + item._link + '" data-index="' + item.reference_id + '" class="feedBtn" data-type="unFeed" data-status=\'' + item.isactivity + '\'>\u53BB\u8BA2\u9605</span></a>';
	            },
	            end: function end(item) {
	                return '<a href="' + item._link + '" class="feedBtn gray" data-type="end" data-status=\'' + item.isactivity + '\'>\u5DF2\u5B8C\u6210</a>';
	            }
	        };
	        return _.map(data, function (item) {

	            item._link = '/reference/' + item.reference_id + '.htm';
	            item._pubtime = yn.timeFormat(item.pubtime);
	            if (item.referenceType == 1) {
	                item._startTime = getDay(item.startTime);
	                item._endTime = getDay(item.endTime);
	            }
	            item._price = item.referenceType == 1 ? item.price + '<span class="small redNum">\uFF08\u5143\uFF09</span>' : item.price + '<span class="small redNum">\u5143/\u6708</span>';
	            item._style = item.referenceType == 0 ? 'hide' : '';
	            item._style1 = item.referenceType == 1 ? 'hide' : '';
	            item._icon = ["ready", "update", "end"][+item.productStatus];

	            var isTrial = item.orderState == '1' && item.isTrial == 1; //正在试用
	            var noIsTrial = item.isTrial == 0; //正常订单
	            var orderState = item.orderState == '9' && item.isTrial == 1; //试用且过期
	            if (isTrial) {
	                item._text = '免费试用';
	                //试用倒计时
	                var time1 = new Date(item.startTime).getTime();
	                var time2 = new Date().getTime();
	                if (item.orderServicePeriod && time1 <= time2) {
	                    //活动开始后
	                    var startTime = item.startTime;
	                    var orderServicePeriod = item.orderServicePeriod;

	                    var end = transferCouponValueTime(startTime, +orderServicePeriod);
	                    var endTime = new Date(end); //结束时间
	                    var difference = endTime.getTime() - new Date().getTime(); //时间差的毫秒数   
	                    //计算出相差天数
	                    var days = Math.floor(difference / (24 * 3600 * 1000));
	                    var style = null;
	                    if (days > 0) {
	                        var orderServicePeriod = item.orderServicePeriod - days;
	                        style = '';
	                        countDown = item.orderServicePeriod ? '<span class="fr countDown">\u5269\u4F59\u8BD5\u7528\u5929\u6570<span class="countDown-num">' + orderServicePeriod + '</span>\u5929</span>' : '';
	                    } else {
	                        countDown = '';
	                    }
	                } else if (item.orderServicePeriod && time1 > time2) {
	                    //活动还未开始
	                    countDown = item.orderServicePeriod ? '<span class="fr countDown">\u5269\u4F59\u8BD5\u7528\u5929\u6570<span class="countDown-num">' + item.orderServicePeriod + '</span>\u5929</span>' : '';
	                }
	            } else if (noIsTrial) {
	                countDown = '';
	                item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];
	            } else {
	                countDown = '';
	                item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];
	            }
	            if (orderState) {
	                countDown = '';
	                item._text = '试用已过期';
	                item._icon = 'end';
	            }

	            if (item.title.length > 30) {
	                item._title = item.title.substr(0, 30) + "..";
	            } else {
	                item._title = item.title;
	            }

	            //按钮状态
	            var isSelf = +ynTeacherId == +item.teacherid;
	            var isFeed = item.is_od == 1;
	            var isEnd = item.productStatus == 2; // 结束
	            var isTry = item.productStatus == "0" && item.orderState == '9'; //服务中的内参试用且过期


	            // 运行状态
	            var total = 1;
	            var count = 2;

	            var btnKey = _.find([{
	                assert: isEnd,
	                action: "end"
	            }, {
	                assert: isTry,
	                action: "unFeed"
	            }, {
	                assert: isSelf || isFeed,
	                action: "feed"
	            }, {
	                assert: !isFeed,
	                action: "unFeed"
	            }], function (item) {
	                return item.assert;
	            });

	            item._key = btnKey;
	            item._button = buttonTable[btnKey.action](item);
	            var short_start = getShort(item.startTime),
	                short_now = getShort(item.systemTime),
	                day_now = new Day(short_now);
	            var totalRunCount;
	            if (item.referenceType == 1) {
	                var short_end = getShort(item.endTime),
	                    day_end = new Day(short_end);
	                totalRunCount = day_end.offset(short_start);
	            } else {
	                totalRunCount = '0';
	            }
	            var runCount = Math.abs(day_now.offset(short_start)) + 1;
	            var runTextTable = {
	                0: function _() {
	                    return '\u5DF2\u670D\u52A1' + runCount + '\u5929';
	                },
	                1: function _() {
	                    return --runCount + '\u5929\u540E\u5F00\u59CB\u670D\u52A1';
	                },
	                2: function _() {
	                    return '\u5171\u8FD0\u884C' + totalRunCount + '\u5929';
	                }
	            };
	            item.runText = runTextTable[item.productStatus]();
	            return item;
	        });
	    };

	    var showConfirm = function showConfirm(itemData) {
	        getOrderNumber(itemData.id, function (data) {
	            data = data.data;
	            payConfirm.render({
	                name: "内参订阅",
	                price: itemData.price,
	                link: Path.pay(data.orderNum),
	                success: function success() {
	                    layer.msg("支付成功!!");
	                    setTimeout(function () {
	                        return window.location.reload();
	                    }, 500);
	                },
	                fail: function fail() {
	                    return layer.msg("支付失败!!");
	                }
	            });
	        });
	    };

	    return {
	        init: function init(ops) {
	            container = ops.container;

	            //点击订阅
	            container.on('click', '.feedBtn', _.debounce(function () {
	                // if ($(this).data('type') == 'end') {
	                //     return layer.msg('内参已结束');
	                // }
	                var id = $(this).data('index');
	                var flag = $(this).data('status') == 1 ? "none" : "";
	                // if ($(this).data('type') == "feed") {
	                //     auth.get().render(result => { //实名认证
	                //         if (result) {
	                //             window.location.href = $(this).data('link')
	                //         }
	                //     }, flag)
	                //     return;
	                // } else {
	                window.location.href = $(this).data('link');
	                // }

	                var index = $(this).parents('.refer-list-item').index();
	                var itemData = data[index];
	                // if (+itemData.productStatus == 2) return layer.msg("已结束");

	                //订阅提示(结束前5天提醒)
	                if (itemData._key != "unFeed") return;
	                var endMatch = itemData.endTime.match(/^[^\s]+/)[0];
	                var endTime = new Day(endMatch);
	                var offset = endTime.offset(itemData.systemTime.match(/^[^\s]+/)[0]);
	                if (offset >= 5) return showConfirm(itemData);
	                layer.confirm('\u8BE5\u5185\u53C2\u8DDD\u79BB\u7ED3\u675F\u4EC5\u5269' + offset + '\u5929, \u786E\u5B9A\u8981\u8BA2\u9605\u5417?', function () {
	                    showConfirm(itemData);
	                });
	            }, 200, {
	                leading: true,
	                trailing: false
	            }));
	        },

	        render: function render(ops) {
	            data = handleData(ops.data);
	            contentWidth = container.width() - 240;
	            var html = _.map(data, function (item) {
	                return create(item);
	            }).join('');
	            container.html(html);
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	//获取订单
	function getOrderNumber(id, callback) {
	    var send = {
	        goodsId: id, //商品id
	        goodsType: 3, //商品类型(0观点，1组合，2课程，3内参 4:问股 5 直播)
	        buy_number: 1, //内参数量
	        pay_source: 0 //来源 0web
	    };
	    $.post("/app/buyGoodsPayOrder.htm", send, function (data) {
	        callback(data);
	    }, 'json');
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-list.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./refer-list.css");
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

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "#refer-li.refer-list-item {\r\n    border-top: 1px solid #e6e7e8;\r\n    margin-bottom: 15px;\r\n    background: #fff;\r\n    width: 100%;\r\n    height: 210px;\r\n    box-shadow: 5px 2px 6px rgba(216, 211, 211, 0.8);\r\n    position: relative;\r\n}\r\n\r\n#refer-li.refer-list-item .icon.status {\r\n    width: auto;\r\n    height: auto;\r\n    background: rgb(255, 80, 84);\r\n    color: #fff;\r\n    display: inline-block;\r\n    padding: 5px 12px;\r\n    border-radius: 0 40px 40px 0;\r\n    position: absolute;\r\n    left:0;\r\n}\r\n\r\n#refer-li.refer-list-item .cover {\r\n    width: 85px;\r\n    height: 85px;\r\n    border-radius: 50%;\r\n    margin: 35px auto 10px auto;\r\n    overflow: hidden;\r\n}\r\n\r\n#refer-li.refer-list-item .cover img {\r\n    width: 100%;\r\n}\r\n\r\n#refer-li.refer-list-item .cover .name {\r\n    text-align: center;\r\n    margin-top: 10px;\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n}\r\n\r\n.refer-list-item:first-child {\r\n    border-top: none;\r\n}\r\n\r\n#refer-li.refer-list-item .title {\r\n    font-size: 18px;\r\n    color: rgb(30, 30, 30);\r\n    line-height: 35px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n#refer-li.refer-list-item .user_info {\r\n    margin-bottom: 20px;\r\n}\r\n\r\n#refer-li.refer-list-item .user_head {\r\n    position: relative;\r\n    width: 199px;\r\n    height: 210px;\r\n    text-align: center;\r\n    background: #f6f6f6;\r\n}\r\n\r\n#refer-li.refer-list-item .user_head img {\r\n    border: none;\r\n    height: 100%;\r\n}\r\n\r\n#refer-li.refer-list-item .content {\r\n    padding: 10px;\r\n    line-height: 28px;\r\n    height: 190px;\r\n    overflow: hidden;\r\n    background: #fff;\r\n    position: relative;\r\n}\r\n\r\n#refer-li.refer-list-item .content .title {\r\n    display: block;\r\n    font-size: 22px;\r\n    font-weight: bold;\r\n}\r\n\r\n#refer-li.refer-list-item .content .middle {\r\n    height: 100px;\r\n    padding-left: 50px;\r\n}\r\n\r\n#refer-li.refer-list-item .content .middle .price,\r\n#refer-li.refer-list-item .content .middle .num {\r\n    width: 30%;\r\n    height: 100px;\r\n    text-align: left;\r\n    padding-top: 20px;\r\n}\r\n\r\n#refer-li.refer-list-item .content .red {\r\n    font-size: 28px;\r\n    color: #fe292d;\r\n    font-weight: bold;\r\n}\r\n\r\n#refer-li.refer-list-item .content .small {\r\n    font-size: 14px;\r\n    color: gray;\r\n}\r\n#refer-li.refer-list-item .content .redNum{\r\n    margin-left:5px;\r\n}\r\n#refer-li.refer-list-item .sub_detail {\r\n    width:300px;\r\n    color: gray;\r\n    margin-top: 10px;\r\n}\r\n\r\n#refer-li.refer-list-item .sub_detail>span {\r\n    line-height: 28px;\r\n    margin-right: 15px;\r\n    font-size: 12px;\r\n}\r\n\r\n#refer-li.refer-list-item .feedBtn:hover {\r\n    background: #d63c40;\r\n}\r\n\r\n#refer-li.refer-list-item .feedBtn.gray {\r\n    background: #b8b8b8;\r\n    box-shadow: 0 0 5px 0 #b8b8b8;\r\n}\r\n\r\n#refer-li.refer-list-item .dayCount {\r\n    position: absolute;\r\n    bottom: 40px;\r\n    left: 0px;\r\n    width: 100%;\r\n    overflow: hidden;\r\n}\r\n\r\n#refer-li.refer-list-item .dayCount .line {\r\n    height: 1px;\r\n    border-bottom: 1px solid #ffe6e9;\r\n    display: inline-block;\r\n    width: 60%;\r\n    position: relative;\r\n    top: -3px;\r\n}\r\n\r\n#refer-li.refer-list-item .dayCount .point {\r\n    width: 5px;\r\n    height: 5px;\r\n    display: inline-block;\r\n    background: #ffe6e9;\r\n    border-radius: 50%;\r\n    position: relative;\r\n    left: -5px;\r\n    top: -1px;\r\n}\r\n\r\n#refer-li.refer-list-item .refer-list-item-wrap .end {\r\n    background: #b8b8b8;\r\n}\r\n\r\n#refer-li.refer-list-item .refer-list-item-wrap .end {\r\n    background: #b8b8b8;\r\n}\r\n\r\n#refer-li.refer-list-item .refer-list-item-wrap .ready {\r\n    background: #e3b03d;\r\n}\r\n\r\n#refer-li.refer-list-item .agreement {\r\n    position: absolute;\r\n    bottom: 10px;\r\n    left: 680px;\r\n    font-size: 12px;\r\n    display: none;\r\n}\r\n\r\n#refer-li.refer-list-item .agreement a {\r\n    color: #0798ff;\r\n}\r\n\r\n#refer-li.refer-list-item .feedBtn {\r\n    background: #e54c4f;\r\n    box-shadow: 1px 3px 12px 0 rgba(209, 62, 65, 0.58);\r\n    color: white;\r\n    border-radius: 3px;\r\n    width: 80px;\r\n    display: inline-block;\r\n    text-align: center;\r\n    height: 30px;\r\n    line-height: 30px;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    left: 920px;\r\n    bottom: 40px;\r\n}\r\n.refer-list-item .countDown{\r\n    font-size:15px;\r\n    color:#333;\r\n    font-weight: normal;\r\n}\r\n.refer-list-item .countDown-num{\r\n    color:red;\r\n}", ""]);

	// exports


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";

	/*
	    
	    ---------------天数计算---------------------------
	    
	    //导入模块
	    var Day = require('../lib/day.js');

	    //创建对象
	    var a = new Day("2016-09-09")

	    //获取时间戳
	    a.stamp -->Number : 405341545645645

	    //天数计算
	    a.add(2) -->String : "2016-09-11"

	    //距离今天的天数
	    a.offset()  -->Number : 2

	    //距离某天的天数
	    a.offset("2016-09-06") -->Number : 3

	 */

	var now = function now() {
	    return new Date().getTime();
	};
	var isDay = function isDay(str) {
	    return str.match(/^(20[12]\d)[/\-]([01]*[0-9])[/\-](\d+)/);
	};
	var getStamp = function getStamp(arr) {
	    var time = _.map(arr, function (item) {
	        return _.padLeft(item, 2, "0");
	    }).join("/") + " 00:00:00"; //_.padLeft("string",length,"填充符")从左填充
	    return Date.parse(time);
	};

	var ___day = function ___day(val) {
	    this.stamp = function () {
	        if (typeof val != "string") {
	            console.log(val + "\u4E0D\u662F\u5B57\u7B26\u7C7B\u578B");
	            return;
	        }
	        if (!isDay(val)) {
	            console.log(val + "\u683C\u5F0F\u4E0D\u6B63\u786E");
	            return;
	        }

	        var match = isDay(val);
	        var timestamp = getStamp([match[1], match[2], match[3]]);

	        //日期是否有效
	        if (!!!timestamp) {
	            console.log(val + "\u4E0D\u662F\u6709\u6548\u7684\u65E5\u671F");
	            return;
	        }
	        return timestamp;
	    }();
	};

	___day.prototype = {
	    add: function add(dayCount) {
	        var milli = function () {
	            return 1000 * 3600 * 24 * dayCount;
	        }();

	        var newStamp = this.stamp + milli;
	        var date = new Date(newStamp);
	        var year = date.getFullYear();
	        var month = function () {
	            var m = +date.getMonth() + 1;
	            if (m < 10) {
	                m = "0" + m;
	            }
	            return m;
	        }();
	        var day = date.getDate();
	        return [year, month, day].join("-");
	    },
	    offset: function offset(_date) {
	        var current = _date && new ___day(_date).stamp + 1 || now();
	        return Math.floor((this.stamp - current) / (3600 * 24 * 1000)) + 1;
	    }

	    /*///////////////////////////////////////////////////////////////////*/

	};module.exports = ___day;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 
	 * 请使用 require('m/ui/pay-confirm-v1.2.js') 模块代替
	 */

	__webpack_require__(7);

	var ErrorCode = __webpack_require__(11);

	var create = function create() {
	    return '<div class="pay-confirm-overlay hide"><div class="pay-confirm-box"><div class="title">\u652F\u4ED8\u786E\u8BA4</div><span class="close fa fa-times-circle"></span><div class="content"><div class="pay-item pay-item-confirm"><div class="payment"><div class="name">\u652F\u4ED8\u9879\u76EE\uFF1A<span class="value" style="color:red"></span></div><div class="price">\u4EF7\u683C\uFF1A<strong class="value"></strong>\u5143</div><div class="submits"><span class="pay-btn jump btna">\u7ACB\u5373\u652F\u4ED8</span><a id="pay-confirm-link" class="btnb pay-btn jump hide" href="" target="_blank">\u7ACB\u5373\u652F\u4ED8</a></div><div class="agree-tip clear hide"><a href="" class="service fr agree" target="_blank">\u300A<span class="blue">\u670D\u52A1\u4F7F\u7528\u534F\u8BAE</span>\u300B</a><a href="" class="risk fr agree" target="_blank">\u300A<span class="blue">\u98CE\u9669\u63ED\u793A\u4E66</span>\u300B</a><span class="agree fr"><input type="checkbox"/><span class="txt">\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F</span></span></div></div></div><div class="pay-item pay-item-tip hide"><div class="payment"><p>\u652F\u4ED8\u5B8C\u6210\u524D\uFF0C\u8BF7\u4E0D\u8981\u5173\u95ED\u6B64\u652F\u4ED8\u9A8C\u8BC1\u7A97\u53E3</p><p><strong>\u8BF7\u57282\u5C0F\u65F6\u5185\u652F\u4ED8\uFF0C\u8D85\u65F6\u5C06\u5173\u95ED\u8BA2\u5355\uFF1B</strong></p><div class="submits"><a class="wrong pay-btn" href="http://us.yuetougu.com/help.htm" target="_blank">\u652F\u4ED8\u9047\u5230\u95EE\u9898</a><a class="finish pay-btn">\u652F\u4ED8\u5B8C\u6210</a></div></div></div></div></div></div>';
	};

	var pay = function () {
	    var container,
	        box,
	        confirm,
	        tip,
	        name,
	        price,
	        link,
	        submitLink,
	        ops = {
	        name: "支付名称",
	        price: 0,
	        link: "#",
	        success: function success() {
	            layer.msg("支付成功");
	        },
	        fail: function fail() {
	            layer.msg("支付失败");
	        }
	    };

	    var payStatus = null; //支付状态

	    return {
	        init: function init() {
	            var self = this;
	            $("body").append(create());
	            container = $('.pay-confirm-overlay');
	            box = container.find('.pay-confirm-box');
	            confirm = $('.pay-item-confirm');
	            tip = container.find('.pay-item-tip');
	            name = container.find('.name .value');
	            price = container.find('.price .value');
	            link = $('#pay-confirm-link');

	            //关闭
	            container.on('click', '.close', function () {
	                $.post("/web/getPayStatus.htm", function (data) {
	                    if (data == "1" || data == "6") {
	                        ops.success();
	                    } else {
	                        container.hide();
	                        confirm.show();
	                        tip.hide();
	                        $('.agree input').attr('checked', false);
	                    }
	                });
	            });

	            //检查复选框状态 
	            container.on('change', '.agree-tip input', function () {
	                var flag = $(this).is(':checked');
	                console.log("input", flag);
	                if (flag) {
	                    $('.btna').hide();
	                    $('.btnb').show();
	                } else {
	                    $('.btna').show();
	                    $('.btnb').hide();
	                }
	            });

	            //立即支付
	            container.on('click', '.jump', function () {
	                var agree = container.find('.agree-tip');
	                console.log(agree.is(":visible"));
	                if (agree.is(":visible")) {
	                    var flag = agree.find('input').is(':checked');
	                    console.log("flag", flag);
	                    if (!flag) {
	                        layer.msg('请阅读风险提示书');
	                        return false;
	                    }
	                }
	                confirm.hide();
	                tip.show();
	            });

	            //支付完成
	            tip.on('click', '.finish', function () {
	                $.post("/web/getPayStatus.htm", function (data) {
	                    if (data == "1" || data == "6") {
	                        ops.success();
	                    } else {
	                        ops.fail(data);
	                    }
	                });
	            });
	        },
	        render: function render(_ops) {
	            _.extend(ops, _ops);
	            if (_ops.name == "内参订阅") {
	                container.find('.agree-tip').show();
	                var serviceLink = '/protocol.htm?refer=' + ops.orderid;
	                var riskLink = '/agreement.htm?refer=' + ops.orderid;
	                container.find('.agree-tip .service').attr('href', serviceLink);
	                container.find('.agree-tip .risk').attr('href', riskLink);
	            }
	            container.show();
	            box.velocity('transition.expandIn', { duration: 300 });
	            name.text(ops.name);
	            price.text(ops.price);
	            link.attr('href', ops.link);
	        }
	    };
	}();

	pay.init();

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    render: pay.render
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/* 
	    实名认证弹窗
	    var auth = require('vmodule/userAuth')
	    auth.get().render(back => {
	        alert(back) // 认证结果
	    })
	*/

	var ajax = __webpack_require__(31);
	var verification = __webpack_require__(32);
	var countDonw = __webpack_require__(33);
	__webpack_require__(34);

	/*///////////////////////////////////////////////////////////////////*/

	var _isVerify = true; // 是否认证
	var _isAppraisal = true; // 是否评估

	// 检查是否实名认证
	var check = function () {
	    $.post('/app/isIdCard.htm', function (back) {
	        if (back.status == 1) {
	            _isVerify = back.data.isCard == 'false' ? false : true;
	            _isAppraisal = back.data.isRisk == 'false' ? false : true;
	        }
	    }, 'json');
	}();

	var w = $(window).width();
	var h = $(window).height();

	var layoutBox = function layoutBox(box) {
	    var cw = box.outerWidth();
	    var ch = box.outerHeight();
	    box.css({
	        left: (w - cw) / 2 + 'px',
	        top: (h - ch) / 2 - 250 + 'px'
	    });
	};

	var createElement = function createElement() {
	    return '<div id="auth-overlay" class="123456"><div id="auth-verify"><div class="title"><span class="value">\u8BA4\u8BC1\u4E0E\u8BC4\u4F30</span><i class="close fa fa-close"></i></div><div class="auth-remind">\u5E94\u8BC1\u76D1\u4F1A\u8981\u6C42\uFF0C\u540C\u65F6\u4E3A\u4E86\u4FDD\u969C\u60A8\u7684\u8D44\u91D1\u8D22\u4EA7\u5B89\u5168\uFF0C\u8BF7\u8FDB\u884C\u5B9E\u540D\u8BA4\u8BC1</div><div class="auth-remind">\u8BA4\u8BC1\u4FE1\u606F\u4EC5\u4F5C\u5907\u6848\u4F7F\u7528\uFF0C\u4E0D\u4F1A\u4EE5\u4EFB\u4F55\u5F62\u5F0F\u900F\u9732\u7ED9\u7B2C\u4E09\u65B9\uFF0C\u8BF7\u653E\u5FC3\u4F7F</div><div class="auth-frame card"><div class="form-item verify-form"><div class="line"><span class="form-text">\u771F\u5B9E\u59D3\u540D</span><input class="auth-verify-name" type="text" placeholder="\u586B\u5199\u60A8\u8EAB\u4EFD\u8BC1\u4E0A\u7684\u540D\u5B57"></div><div class="line"><span class="form-text">\u8EAB\u4EFD\u8BC1\u53F7</span><input class="auth-verify-code" type="text" placeholder="15\u621618\u4F4D\u8EAB\u4EFD\u8BC1\u53F7\u7801"></div><div class="line submitBar"><div class="auth-error"></div><div class="submit">\u786E\u8BA4</div></div></div><div class="form-item done"><div class="result"><div class="icon-done-big icon"></div><p>\u606D\u559C\u60A8\u8BA4\u8BC1\u6210\u529F!</p></div><div class="to-btn"><span class="count-down">4</span>\u79D2\u540E\u5F00\u59CB\u98CE\u9669\u8BC4\u4F30</div></div></div><div class="auth-frame appraisal"><div class="appraisal-tip">\u53EA\u9700\u4E00\u6B21\u98CE\u9669\u8BC4\u4F30\uFF0C\u65B9\u4FBF\u6211\u4EEC\u4E3A\u60A8\u66F4\u597D\u5730\u670D\u52A1\uFF01</div><div class="appraisal-btn">\u53BB\u8BC4\u4F30</div></div></div></div>';
	};

	var verify = function () {
	    var instance = null;

	    var createInstance = function createInstance() {
	        var callback; //验证回调

	        $('body').append(createElement());
	        var container = $('#auth-verify');
	        var frame_card = container.find('.auth-frame.card');
	        var frame_appraisal = container.find('.auth-frame.appraisal');
	        var group_form = container.find('.verify-form'); // 评估表单
	        var group_success = container.find('.form-item.done'); //评估完成
	        var error = container.find('.auth-error');
	        var name = container.find('.auth-verify-name');
	        var code = container.find('.auth-verify-code');
	        var submit = container.find('.submit');
	        var overlay = $('#auth-overlay');
	        overlay.css({
	            width: w + 'px',
	            height: h + 'px'
	        });

	        layoutBox(container);

	        var reset = function reset() {
	            overlay.hide();
	            error.text('');
	            name.val('');
	            code.val('');
	        };

	        var showError = function showError(text) {
	            error.text(text);
	            error.addClass('shake');
	            setTimeout(function () {
	                error.removeClass('shake');
	            }, 1000);
	        };

	        var toAppraisal = function toAppraisal() {
	            window.location.href = '/backstage/myAppraisal.htm?jump=' + window.location.href;
	        };

	        // 评估完成
	        var showSuccess = function showSuccess() {
	            _isVerify = true;
	            container.find('.close').hide();
	            group_success.show();
	            group_form.hide();
	            countDonw.run({
	                $el: container.find('.count-down'),
	                done: function done() {
	                    toAppraisal();
	                }
	            });
	        };

	        if (!_isVerify) {
	            // 未认证
	            frame_card.show();
	        } else {
	            frame_appraisal.show();
	        }

	        frame_card.find('input').focus(function () {
	            error.text('');
	        });

	        container.on('click', '.close', function () {
	            reset();
	            if (typeof callback == 'function') {
	                callback(false);
	            }
	        });

	        container.on('click', '.appraisal-btn', function () {
	            toAppraisal();
	        });

	        /* Event */

	        submit.on('click', function () {
	            var val_name = name.val().replace(/^\s+|\s+$/, '');
	            var val_code = code.val().replace(/^\s+|\s+$/, '');
	            var valid_name = /^[\u4e00-\u9fa5\.]{2,20}$/.test(val_name);
	            var valid_code = verification(val_code);

	            if (!valid_name) {
	                return showError('真实姓名为中文汉字(2-20)');
	            }

	            if (!valid_code) {
	                return showError('请填写有效身份证号');
	            }

	            $.post('/app/verificationIdCard.htm', {
	                username: val_name,
	                idCard: val_code
	            }, function (data) {
	                if (data.status == 1 || data.status == 90001) {
	                    _isVerify = true;
	                    return showSuccess();
	                }

	                if (data.status == 90000) {
	                    return showError('\u8FD8\u6709' + data.data.validateCount + '\u6B21\u8BA4\u8BC1\u673A\u4F1A');
	                }

	                if (data.status == 90004) {
	                    return showError('认证次数已用完，请明天再试');
	                }

	                if (data.status == 90005) {
	                    layer.msg('身份证绑定用户数已达上限');
	                }
	            }, 'json');
	        });

	        return {
	            render: function render(_callback, flag) {
	                // 如果第二个参数为“none”， 不验证
	                if (flag == 'none') {
	                    _callback(true);
	                    return;
	                }

	                callback = _callback;

	                // 已经认证完毕
	                console.log('=969696', _isAppraisal && _isVerify);
	                if (_isAppraisal && _isVerify) {
	                    console.log(8520);
	                    if (typeof callback == 'function') {
	                        callback(true);
	                    }
	                    return;
	                }

	                overlay.show();
	            }
	        };
	    };

	    return {
	        get: function get() {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	}();

	module.exports = verify;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	    ajax: function ajax(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }

	        $.ajax({
	            url: url,
	            data: param,
	            dataType: 'json',
	            success: function success(data) {
	                callback(data);
	            },
	            error: function error(err) {
	                console.log('===err', err);
	            }
	        });
	    },
	    getJSON: function getJSON(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }
	        $.getJSON(url, param, function (back) {
	            callback(back);
	        });
	    },
	    postJSON: function postJSON(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }
	        $.post(url, param, function (back) {
	            callback(back);
	        }, 'json');
	    },
	    post: function post(url, param, callback) {
	        if (typeof param == "function") {
	            callback = param;
	            param = {};
	        }
	        $.post(url, param, function (back) {
	            callback(back);
	        });
	    }
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	var IDVerify = function IDVerify(code) {
	    code = String(code);

	    var vcity = {
	        11: "北京",
	        12: "天津",
	        13: "河北",
	        14: "山西",
	        15: "内蒙古",
	        21: "辽宁",
	        22: "吉林",
	        23: "黑龙江",
	        31: "上海",
	        32: "江苏",
	        33: "浙江",
	        34: "安徽",
	        35: "福建",
	        36: "江西",
	        37: "山东",
	        41: "河南",
	        42: "湖北",
	        43: "湖南",
	        44: "广东",
	        45: "广西",
	        46: "海南",
	        50: "重庆",
	        51: "四川",
	        52: "贵州",
	        53: "云南",
	        54: "西藏",
	        61: "陕西",
	        62: "甘肃",
	        63: "青海",
	        64: "宁夏",
	        65: "新疆",
	        71: "台湾",
	        81: "香港",
	        82: "澳门",
	        91: "国外"
	    };

	    var checkcode = function checkcode(code) {
	        //是否为空  
	        if (!code || !iscodeNo(code) || !checkProvince(code) || !checkBirthday(code) || !checkParity(code)) {
	            return false;
	        }
	        return true;
	    };

	    //检查号码是否符合规范，包括长度，类型  
	    var iscodeNo = function iscodeNo(code) {
	        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	        if (reg.test(code) === false) {
	            return false;
	        }
	        return true;
	    };

	    //取身份证前两位,校验省份  
	    var checkProvince = function checkProvince(code) {
	        var province = code.substr(0, 2);
	        if (vcity[province] == undefined) {
	            return false;
	        }
	        return true;
	    };

	    //检查生日是否正确  
	    var checkBirthday = function checkBirthday(code) {
	        var len = code.length;
	        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
	        if (len == '15') {
	            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
	            var arr_data = code.match(re_fifteen);
	            var year = arr_data[2];
	            var month = arr_data[3];
	            var day = arr_data[4];
	            var birthday = new Date('19' + year + '/' + month + '/' + day);
	            return verifyBirthday('19' + year, month, day, birthday);
	        }
	        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
	        if (len == '18') {
	            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	            var arr_data = code.match(re_eighteen);
	            var year = arr_data[2];
	            var month = arr_data[3];
	            var day = arr_data[4];
	            var birthday = new Date(year + '/' + month + '/' + day);
	            return verifyBirthday(year, month, day, birthday);
	        }
	        return false;
	    };

	    //校验日期  
	    var verifyBirthday = function verifyBirthday(year, month, day, birthday) {
	        var now = new Date();
	        var now_year = now.getFullYear();
	        //年月日是否合理  
	        if (birthday.getFullYear() == year && birthday.getMonth() + 1 == month && birthday.getDate() == day) {
	            //判断年份的范围（3岁到100岁之间)  
	            var time = now_year - year;
	            if (time >= 3 && time <= 100) {
	                return true;
	            }
	            return false;
	        }
	        return false;
	    };

	    //校验位的检测  
	    var checkParity = function checkParity(code) {
	        //15位转18位  
	        code = changeFivteenToEighteen(code);
	        var len = code.length;
	        if (len == '18') {
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var codeTemp = 0,
	                i,
	                valnum;
	            for (i = 0; i < 17; i++) {
	                codeTemp += code.substr(i, 1) * arrInt[i];
	            }
	            valnum = arrCh[codeTemp % 11];
	            if (valnum == code.substr(17, 1)) {
	                return true;
	            }
	            return false;
	        }
	        return false;
	    };

	    //15位转18位身份证号  
	    var changeFivteenToEighteen = function changeFivteenToEighteen(code) {
	        if (code.length == '15') {
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var codeTemp = 0,
	                i;
	            code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6);
	            for (i = 0; i < 17; i++) {
	                codeTemp += code.substr(i, 1) * arrInt[i];
	            }
	            code += arrCh[codeTemp % 11];
	            return code;
	        }
	        return code;
	    };

	    return checkcode(code);
	};

	module.exports = IDVerify;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";

	/* 
	    倒计时
	    run({$el, done}) // 开始倒数
	    cancel() // 取消还原
	*/

	var countDown = function () {
	    var timer = null;
	    var originValue = null; // 初始值
	    var el = null;

	    return {
	        run: function run(_ref) {
	            var $el = _ref.$el,
	                done = _ref.done;

	            el = $el;
	            originValue = el.text();
	            timer = setInterval(function () {
	                var value = +el.text();
	                if (value > 1) {
	                    value -= 1;
	                    el.text(value);
	                } else {
	                    if (typeof done == "function") {
	                        done();
	                    }
	                    countDown.cancel();
	                }
	            }, 1000);
	        },
	        cancel: function cancel() {
	            clearInterval(timer);
	            el.text(originValue);
	            timer = null;
	        }
	    };
	}();

	module.exports = countDown;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./userAuth.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./userAuth.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "#auth-verify {\r\n    width: 450px;\r\n    background: white;\r\n    border: 1px solid #ededed;\r\n    box-shadow: 8px 7px 13px rgba(201, 201, 201, 0.19);\r\n    border-radius: 4px;\r\n    margin: auto;\r\n    position: absolute;\r\n    -webkit-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n#auth-overlay {\r\n    background: white;\r\n    background: rgba(255, 255, 255, 0.21);\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    display: none;\r\n}\r\n\r\n#auth-verify {\r\n    animation-name: myZoomIn;\r\n    animation-duration: 0.3s;\r\n}\r\n\r\n.shake {\r\n    animation-name: myShake;\r\n    animation-duration: 0.6s;\r\n}\r\n\r\n@keyframes myZoomIn {\r\n    from {\r\n        transform: scale3d(.1, .1, .1);\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        transform: scale3d(1, 1, 1);\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n@keyframes myShake {\r\n    from, to {\r\n        transform: translate3d(0, 0, 0);\r\n    }\r\n    10%, 30%, 50%, 70%, 90% {\r\n        transform: translate3d(-10px, 0, 0);\r\n    }\r\n    20%, 40%, 60%, 80% {\r\n        transform: translate3d(10px, 0, 0);\r\n    }\r\n}\r\n\r\n#auth-verify .title {\r\n    padding: 10px;\r\n    border-bottom: 1px solid #f5f5f5;\r\n    position: relative;\r\n    font-size: 15px;\r\n    text-indent: 10px;\r\n    font-weight: bold;\r\n    margin-bottom:10px;\r\n}\r\n\r\n#auth-verify .close:hover {\r\n    color: red;\r\n}\r\n\r\n#auth-verify .auth-frame {\r\n    padding: 20px 20px 30px 20px;\r\n}\r\n\r\n#auth-verify .form-text {\r\n    font-size: 13px;\r\n    display: inline-block;\r\n    width: 60px;\r\n    text-align: right;\r\n    margin-right: 10px;\r\n}\r\n\r\n#auth-verify .close {\r\n    position: absolute;\r\n    right: 10px;\r\n    cursor: pointer;\r\n    font-size: 15px;\r\n}\r\n\r\n#auth-verify .auth-frame.card .line {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n#auth-verify .auth-frame {\r\n    position: relative;\r\n    display: none;\r\n}\r\n\r\n#auth-verify .auth-frame.card input {\r\n    height: 35px;\r\n    line-height: 35px;\r\n    text-indent: 10px;\r\n    width: 285px;\r\n    display: inline-block;\r\n    border-radius: 3px;\r\n    background: #f7f7f7;\r\n}\r\n\r\n#auth-verify .auth-frame.card .submitBar {\r\n    position: relative;\r\n    text-align: center;\r\n    margin-top: 40px;\r\n}\r\n\r\n#auth-verify .auth-frame.card .auth-error {\r\n    color: red;\r\n    position: absolute;\r\n    bottom: 52px;\r\n    text-align: center;\r\n    width: 100%;\r\n    font-size: 13px;\r\n    font-weight: bold;\r\n}\r\n\r\n#auth-verify .auth-frame.card .submit {\r\n    background: #c40f0f;\r\n    width: 320px;\r\n    margin: auto;\r\n    padding: 10px;\r\n    border-radius: 4px;\r\n    font-size: 15px;\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n\r\n#auth-verify .auth-frame.card .form-item.done {\r\n    display: none;\r\n    text-align: center;\r\n}\r\n\r\n#auth-verify .form-item.done .icon-done-big {\r\n    background-image: url(/public/sprite/src/done-big.png);\r\n    background-position: 0px 0px;\r\n    width: 84px;\r\n    height: 84px;\r\n    margin: auto;\r\n}\r\n\r\n#auth-verify .form-item.done .to-btn {\r\n    background: #4a4a4a;\r\n    width: 250px;\r\n    padding: 5px;\r\n    border-radius: 3px;\r\n    color: white;\r\n    margin: 15px auto;\r\n}\r\n\r\n#auth-verify .form-item.done p {\r\n    font-size: 15px;\r\n    color: #16d528;\r\n    margin: 10px auto;\r\n}\r\n\r\n#auth-verify .auth-frame.appraisal {\r\n    text-align: center;\r\n}\r\n\r\n#auth-verify .appraisal-btn {\r\n    background: #d31010;\r\n    width: 300px;\r\n    margin: auto;\r\n    padding: 5px;\r\n    border-radius: 3px;\r\n    margin-top: 15px;\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n#auth-verify .auth-remind{\r\n    font-size: 12px;\r\n    color: #8B8B8B;\r\n    text-align: center;\r\n    margin-top: 2px;\r\n}", ""]);

	// exports


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	//某个老师的内参

	module.exports.teacher = function (teacherid, ops) {
	    ops = _.extend({
	        productStatus: "",
	        teacherId: teacherid,
	        user_id: ynUserId,
	        pageSize: 10,
	        currentPage: 1
	    }, ops);

	    var defer = $.Deferred();
	    $.getJSON('/center/reference/teacherReferenceList.htm', ops, function (data) {
	        data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.pageSize)]);
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

	module.exports.teacherHot = function (teacherid, ops) {
	    ops = _.extend({
	        teacherId: teacherid,
	        user_id: ynUserId,
	        pageSize: 10,
	        currentPage: 1
	    }, ops);
	    var defer = $.Deferred();
	    $.getJSON('/center/reference/hotList.htm', ops, function (data) {
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	"use strict";

	/*///////////////////////////////////////////////////////////////////*/

	//

	var clear = function clear(str) {
	    if (typeof str !== 'string') return str;
	    var match = str.match(/[\u4e00-\u9fa50-9a-zA-Z，。？：:（）]+/g);
	    return match ? match.join("") : str;
	};

	//
	var limit = function limit(str, len) {
	    return str.length < len ? str : str.substr(0, len) + "...";
	};

	//
	var filterHTML = function filterHTML(str) {
	    if (typeof str !== 'string') return str;
	    return str.replace(/<.+?>|&nbsp;/g, "");
	};

	//清除格式+限制个数+清除无效字符
	var clean = function clean(str, len) {
	    return limit(clear(filterHTML(str)), len);
	};

	//股票添加链接
	var AddCodeLink = function AddCodeLink(ops) {
	    ops = _.extend({
	        code: "000001",
	        className: "fire-pop-stock",
	        show: "---"
	    }, ops);
	    var style = "style=\"background:rgb(235,235,235);padding:5px 10px;border:1px solid rgb(220,220,220);border-radius:2px;\"";
	    return "<a href=\"/marketLine.htm?stockcode=" + ops.code + "\" " + style + " target=\"_blank\" data-code=\"" + ops.code + "\" class=\"" + ops.className + "\">" + ops.show + "</a>";
	};

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    clear: clear,
	    limit: limit,
	    filterHTML: filterHTML,
	    clean: clean,
	    AddCodeLink: AddCodeLink
	};

/***/ })
/******/ ]);