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

	yn.navigation.name = "问股";
	// var askWindow = require('m/askStock/askWindow.js') //提问窗口
	var askWindow = __webpack_require__(1); //提问
	var hot = __webpack_require__(20); // 热问股票
	var care = __webpack_require__(22); // 关注接口
	var trend = __webpack_require__(23); // 牛人看涨
	var ranking = __webpack_require__(24); //解答牛人
	var profile = __webpack_require__(25); //鼠标放到老师头像是显示详细信息
	var error = __webpack_require__(19);

	/*///////////////////////////////////////////////////////////////////*/
	$(function () {

	    // 分类高亮/跳转
	    $('.cate-item').each(function (i, el) {
	        var id = $(this).data('id');
	        var type = $(this).data('type');
	        $(this).attr('href', '' + ask_path + __cate + '/' + type + '/');
	        if (type == __type) {
	            $(this).addClass('select');
	        }
	    });

	    $('.type-item').each(function (i, el) {
	        if ($(this).data('id') == __cate) {
	            $(this).addClass('select');
	        }
	    });

	    // 页码跳转
	    var pagination = yn.bootpag($('#Answer'));
	    pagination.bootpag({ page: __page, total: __total / 10 });
	    pagination.on('page', function (err, num) {
	        location.href = '' + ask_path + __cate + '/' + __type + '/?pn=' + num;
	    });

	    // 向他提问
	    $('.info-btn').click(function () {
	        askWindow.aimedRender({
	            select: {
	                id: $(this).data('id'),
	                name: $(this).data('name')
	            }
	        });
	    });

	    // 提问统计数
	    var banner = function () {
	        var container = $('#ask-logo');
	        var items = container.find('.logo-wrap');
	        container.on('click', '.trigger', function () {
	            askWindow.render();
	        });

	        return {
	            render: function render() {
	                var createTag = function createTag(data) {
	                    return '<div class="logo-text"><div class="inline">\u5DF2\u7D2F\u8BA1\u89E3\u51B3<strong>' + data.answercount + '</strong>\u4E2A\u95EE\u9898</div><div class="inline"><strong>' + data.zancount + '</strong>\u4EBA\u5F97\u5230\u4E86\u5E2E\u52A9</div><div class="buttons"><button class="trigger">\u6211\u8981\u95EE\u80A1</button></div></div>';
	                };

	                $.getJSON("/consultation/queryAnswerCountAndReadCount.htm", function (data) {
	                    if (data.status == 1) {
	                        data = data.data;
	                        items.html(createTag(data));
	                    } else (function () {
	                        return layer.msg(error[data.status]);
	                    });
	                });
	            }
	        };
	    }();

	    /*///////////////////////////////////////////////////////////////////*/

	    //在线老师
	    var onlineTeacher = {
	        page: 1,
	        row: 4,
	        container: $('#online-teacher'),
	        init: function init() {
	            this.event();
	        },
	        render: function render() {
	            var self = this;
	            getOnlineTeacher({ page: this.page, row: this.row }).done(function (data) {
	                if (data.data.list.length < 1) {
	                    //layer.msg("没有更多在线老师了")
	                    return;
	                }
	                log("在线老师", data);
	                data.data.list = self.handleData(data.data.list);
	                self.container.find('.content').html(template('onlineTeacher-template', data.data.list));
	            });
	        },
	        handleData: function handleData(data) {
	            return _.map(data, function (item) {
	                item.attentionText = item.attention == "1" ? "取消关注" : "关注";
	                item.careType = item.attention == "1" ? 'cancel' : 'care';
	                item.speaialtyname = function () {
	                    var arr = item.speaialtyname.split(',');
	                    return _.take(arr, 3).join("-");
	                }();
	                item.zancount = item.zancount || 0;
	                return item;
	            });
	        },
	        event: function event() {
	            var self = this;

	            //提问
	            this.container.on('click', '.trigger-ask', function () {
	                askWindow.aimedRender({
	                    select: {
	                        id: $(this).data('id'),
	                        name: $(this).data('name')
	                    }
	                });
	            });

	            //换一换
	            this.container.on('click', '.refresh', function () {
	                self.page = self.page % 2 + 1;
	                self.render();
	            });

	            //关注
	            this.container.on('click', '.trigger-care.care', function () {
	                if (!ynIsLogin) {
	                    yn.login.render();
	                    return;
	                }
	                var element = $(this);
	                var item = element.parents('.item');
	                var teacherid = item.data('id');
	                element.addClass('cancel').removeClass('care');

	                care.add(teacherid).done(function () {
	                    element.text('取消关注');
	                });
	            });
	            //取消关注
	            this.container.on('click', '.trigger-care.cancel', function () {
	                if (!ynIsLogin) {
	                    yn.login.render();
	                    return;
	                }
	                var element = $(this);
	                var item = element.parents('.item');
	                var teacherid = item.data('id');
	                element.addClass('care').removeClass('cancel');
	                care.cancel(teacherid).done(function () {
	                    element.text('关注');
	                });
	            });
	        }

	        ////////////////////////////////////////////////////////////////**/

	    };banner.render();
	    onlineTeacher.init();
	    onlineTeacher.render();
	    askWindow.init();

	    hot.init({ wrap: $(".hot-ask-container") });
	    hot.render();

	    trend.init({ wrap: $('.trend-container') });
	    trend.render();

	    ranking.init({ wrap: $('.ranking-container') });
	    ranking.render();
	    ranking.onAsk = function (person) {
	        askWindow.aimedRender({ select: { id: person.id, name: person.name } });
	    };

	    profile.init();
	    profile.add('.teacher-head');
	    profile.add('.user-photo');
	    profile.add('.user-head');

	    onSelect('问股');
	});

	var getOnlineTeacher = function getOnlineTeacher(ops) {
	    var defer = $.Deferred();
	    ops = _.extend({
	        row: 5,
	        page: 1,
	        userid: ynUserId //根据userid返回是否关注该老师
	    }, ops);

	    var send = {
	        pageSize: ops.row,
	        currentPage: ops.page,
	        userid: ops.userid
	    };

	    $.getJSON("/consultation/queryOnlineTeacher.htm", send, function (data) {
	        defer.resolve(data);
	    });
	    return defer.promise();
	};

/***/ }),
/* 1 */
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

	var PayModule = __webpack_require__(2); //支付模块  pay-confirm-v1.2.js   pay-any.js'
	var Path = __webpack_require__(11);
	__webpack_require__(12);
	var queryStock = __webpack_require__(14);
	var stockList = __webpack_require__(15);
	var error = __webpack_require__(19);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var payAny = __webpack_require__(3);
	var payConfirm = __webpack_require__(5);
	var error = __webpack_require__(10);

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
/* 3 */
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

	var fn = __webpack_require__(4);

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
/* 4 */
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
/* 5 */
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

	__webpack_require__(6);

	var ErrorCode = __webpack_require__(10);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, ".hide {\n    display: none;\n}\n\n.fr {\n    float: right;\n}\n\n.color666 {\n    color: #666;\n}\n\n.inline {\n    display: inline-block;\n}\n\n.pay-confirm-overlay {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    left: 0;\n    top: 0;\n    background: rgba(0, 0, 0, .4);\n    text-align: center;\n    z-index: 10000;\n}\n\n.pay-confirm-box {\n    display: inline-block;\n    margin-top: 200px;\n    background: white;\n    border-radius:2px;\n    position: relative;\n    width: 500px;\n    text-align: left;\n    margin: auto;\n    margin-top: 245px;\n    box-shadow: 7px 4px 20px 0px hsla(0, 0%, 65%, 0.38);\n}\n\n.pay-confirm-box .title {\n    text-align: left;\n    padding: 12px 20px;\n    font-size: 16px;\n    border-bottom: 1px solid rgb(219, 219, 219);\n    font-weight: bold;\n}\n\n.pay-confirm-box .content {\n    padding:20px 30px 25px;\n}\n\n.pay-confirm-box .close {\n    width:9px;\n    height:9px;\n    background:url(/public/v2/base/images/close-icon.png) no-repeat;\n    position: absolute;\n    top: 16px;\n    right: 17px;\n    cursor: pointer;\n}\n\n.payment {\n    padding-bottom: 25px;\n    border-bottom: 1px dashed #cecece;\n}\n\n.pay-item-tip .payment {\n    text-align: center;\n    border-bottom: none;\n    line-height:26px;\n    color:#666;\n    padding-bottom:0;\n    font-size:16px;\n}\n\n.payment .name {\n    font-size: 16px;\n    margin-bottom: 15px;\n}\n\n.payment .price {\n    margin-bottom: 15px;\n    font-size: 16px;\n}\n\n.payment .value {\n    color: #d72612;\n}\n\n.pay-confirm-box .submits {\n    text-align: center;\n    margin-top: 15px;\n}\n\n.pay-confirm-box .pay-btn {\n    display: inline-block;\n    padding: 6px 35px;\n    border-radius: 5px;\n    background: #F6554A;\n    color: white;\n    font-size: 16px;\n    cursor: pointer;\n    margin: 0 10px;\n}\n.pay-confirm-box .pay-btn.jump{\n    padding:9px 20px;\n}\n.pay-confirm-box .pay-btn.finish{\n    padding:6px 46px;\n}\n\n.pay-item-tip .submits {\n    text-align: center;\n    margin-top:20px;\n}\n\n.pay-item-tip .wrong {\n    background: #a3a2a2\n}\n\n.agree .blue {\n    color: #1176E8;\n}\n\n.agree input {\n    position: relative;\n    top: 2px;\n    left: -3px;\n}\n\n.agree .txt {\n    color: #999;\n}\n\n.agree-tip {\n    margin-top:10px;\n    font-size: 12px;\n}\n\n.orderNum-value {\n    color: #666\n}\n\n\n/*  */\n\n.defray-content {\n    padding: 12px 0 0 0;\n    border-bottom: 1px dashed #cecece;\n}\n\n.defray-item {\n    height: 43px;\n    margin: 12px auto;\n}\n\n.yn_pay {\n    width: 340px;\n    position: relative;\n    top: 4px;\n    color: #333;\n    font-size: 16px;\n}\n\n.type-alipay {\n    background: url(/public/v2/base/images/zhifubao.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-wx {\n    background: url(/public/v2/base/images/weixin.png) no-repeat;\n    padding-left: 45px;\n}\n\n.type-nb {\n    background: url(/public/v2/base/images/yue.png) no-repeat;\n    padding-left: 45px;\n}\n\n.defray-item .rounded {\n    width: 14px;\n    height: 14px;\n    position: relative;\n    top: 7px;\n    border: 1px solid #B3B3B3;\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n}\n\n.defray-item.thisclass .rounded {\n    border: 1px solid #CB1F13;\n}\n\n.rounded label {\n    width: 10px;\n    height: 10px;\n    position: absolute;\n    top: 1px;\n    left: 1px;\n    cursor: pointer;\n    background: #B3B3B3;\n    -moz-border-radius: 50px;\n    -webkit-border-radius: 50px;\n    border-radius: 50px;\n}\n\n.defray-item.thisclass .rounded label {\n    background: #CB1F13;\n}\n.defray-item.disable .rounded{\n    background: #cccccc;\n}\n.defray-item.disable .rounded label {\n    background: #cccccc;\n}\n\n\n/*.rounded label:after {\n    content: '';\n    width: 11px;\n    height: 7px;\n    position: absolute;\n    top: 5px;\n    left: 4px;\n    border: 3px solid #fcfff4;\n    border-top: none;\n    border-right: none;\n    background: transparent;\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);\n    opacity: 0;\n    transition: all .3s;\n    -moz-transform: rotate(-45deg);\n    -ms-transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg);\n    transform: rotate(-45deg);\n}*/\n\n\n/*.rounded label.disable {\n    background: #D7D7D7;\n}*/\n\n\n/*.rounded label:hover::after {\n    filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=30);\n    opacity: 0.3;\n}*/\n\n\n/*.rounded input[type=radio] {\n     position:relative;\n    top:1px;\n    left:1px;\n    visibility: hidden;\n}*/\n\n\n/*.rounded input[type=radio]:checked+label {\n    background: #CB1F13;\n    top: 1px;\n    left: 1px;\n}*/\n\n\n/*  */\n\n.balance-icon {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background: url(/public/v2/base/images/balance-icon.png) no-repeat;\n    position: relative;\n    top: 4px;\n    left: 10px;\n}\n\n.yn_balance {\n    color: #666;\n    font-size: 14px;\n    height: 20px;\n    line-height: 20px;\n    border: 1px solid #E7E5E5;\n    border-left: none;\n    box-shadow: 5px 3px 10px #ececec;\n    padding: 2px 10px;\n}\n\n.balance-arrow {\n    display: inline-block;\n    width: 10px;\n    height: 24px;\n    background: url(/public/images/arrow.png) no-repeat;\n    margin-left: 10px;\n    position: relative;\n    top: 6px;\n    left: 5px;\n}\n\n.pay-confirm-overlay .colorRed {\n    color: #F6554A;\n}\n\n.orderNum {\n    font-size: 16px;\n}\n\n.yn-balance-value {\n    margin-right: 10px;\n}\n\n", ""]);

	// exports


/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "@keyframes zoomIn {\n    from {\n        opacity: 0;\n        transform: scale3d(.3, .3, .3);\n    }\n    50% {\n        opacity: 1;\n    }\n}\n\n.clear:after {\n    content: '';\n    display: block;\n    clear: both;\n    _zoom: 1;\n    *zoom: 1;\n}\n\n.zoomIn {\n    animation-name: zoomIn;\n}\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n}\n\n#askTeacher-wrap {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .4);\n    display: none;\n}\n\n#askTeacherWindow {\n    position: absolute;\n    top: 30% !important;\n    left: 50% !important;\n    margin-left: -450px !important;\n    border: 1px solid rgb(200, 200, 200);\n    background: white;\n    width: 900px;\n    font-size: 13px;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);\n    border-radius: 6px;\n}\n\n#askTeacherWindow .onlyInvite {\n    min-height: 150px;\n    text-align: center;\n}\n\n#askTeacherWindow .onlyInvite button {\n    margin: 20px auto;\n    display: inline-block;\n    width: 100px;\n}\n\n#askTeacherWindow>.close {\n    width: 9px;\n    height: 9px;\n    background: url(/public/v2/base/images/close-icon.png);\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left {\n    float: left;\n    width: 65%;\n    border-right: 1px solid rgb(200, 200, 200);\n    padding: 20px;\n}\n\n#askTeacherWindow .right {\n    float: right;\n    width: 35%;\n}\n\n#askTeacherWindow .left .title {\n    position: relative;\n    overflow: hidden;\n    border-left: 3px solid #d72621;\n    padding-left: 10px;\n    margin: 10px 0;\n}\n\n#askTeacherWindow .left .title .name {\n    font-weight: bold;\n    font-size: 16px;\n}\n\n#askTeacherWindow .left .title .times {\n    position: absolute;\n    right: 0px;\n}\n\n#askTeacherWindow .left .title .times .value,.aim-times .value{\n    color: #d72621;\n    margin: 0 2px;\n}\n\n#askTeacherWindow .left .invite {\n    width: 100%;\n    height: 38px;\n    border: 1px solid rgb(230, 230, 230);\n    position: relative;\n}\n\n#askTeacherWindow .price {\n    display: inline-block;\n    float: right;\n    height: 36px;\n    line-height: 36px;\n    margin-right: 7px;\n}\n\n#askTeacherWindow .priceNum {\n    color: #DD503F;\n    font-weight: bold;\n    margin: 0 5px;\n}\n\n#askTeacherWindow .left .invite .list {\n    position: absolute;\n    background: white;\n    width: 542px;\n    left: 0;\n    top: 37px;\n    padding: 15px;\n    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);\n    border: 1px solid rgb(200, 200, 200);\n    z-index: 100;\n}\n\n#askTeacherWindow .left .invite .list .close {\n    width: 9px;\n    height: 9px;\n    background: url(/public/v2/base/images/close-icon.png);\n    float: right;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left .invite .list .list-wrap {\n    margin-top: 10px;\n    overflow: auto;\n    height: 200px;\n    float: left;\n}\n\n#askTeacherWindow .left .invite .select {\n    height: 36px;\n    line-height: 36px;\n    font-size: 13px;\n    float: left;\n    padding: 0 5px;\n    color: #62a5d9;\n}\n\n#askTeacherWindow .left .invite .select .item {\n    margin-right: 8px;\n}\n\n#askTeacherWindow .left .invite .select .fa {\n    margin-left: 5px;\n    cursor: pointer;\n}\n\n#askTeacherWindow .left .invite input {\n    float: left;\n    padding: 10px;\n    border: none;\n    padding-left: 0;\n}\n\n#askTeacherWindow .left .values {\n    margin: 10px 0;\n}\n\n#askTeacherWindow .left textarea {\n    width: 100%;\n    padding: 10px;\n}\n\n#askTeacherWindow .bottom {\n    /*overflow: hidden;*/\n    position: relative;\n}\n\n#askTeacherWindow .bottom .msg {\n    padding: 0 0 10px 0;\n}\n\n#askTeacherWindow .bottom .msg .msg-code {\n    margin: 0 5px;\n    color: #d72621;\n}\n\n#askTeacherWindow .bottom .msg .fa {\n    margin-right: 5px;\n}\n\n#askTeacherWindow .actions {\n    display: inline-block;\n    float: left;\n    position: relative;\n    width: 300px;\n}\n\n#askTeacherWindow .action.search input {\n    padding: 5px;\n}\n\n#askTeacherWindow .action.search .icon {\n    color: gray;\n    position: relative;\n    left: -25px;\n}\n\n#askTeacherWindow .submit {\n    display: inline-block;\n    float: right;\n}\n\n#askTeacherWindow .submit .wordCount {\n    position: relative;\n    top: 6px;\n    right: 10px;\n}\n\n#askTeacherWindow .right {\n    padding: 25px;\n}\n\n#askTeacherWindow .right .content {\n    overflow: auto;\n}\n\n#askTeacherWindow .right .title {\n    color: #575757;\n    font-size: 15px;\n}\n\n#askTeacherWindow .right .items {\n    overflow: auto;\n    max-height: 278px;\n}\n\n#askTeacherWindow .teacher-item {\n    display: block;\n    overflow: hidden;\n    padding: 10px 0;\n    border-bottom: 1px solid rgb(245, 245, 245);\n    cursor: pointer;\n    float: left;\n    width: 245px;\n}\n\n#askTeacherWindow .teacher-item:hover {\n    background: rgb(245, 245, 245);\n}\n\n#askTeacherWindow .teacher-item:first-child {\n    border-top: none;\n}\n\n#askTeacherWindow .teacher-item .avatar {\n    width: 50px;\n    height: 50px;\n    overflow: hidden;\n    float: left;\n    border-radius: 2px;\n}\n\n#askTeacherWindow .teacher-item .avatar img {\n    height: 100%;\n}\n\n#askTeacherWindow .teacher-item .info {\n    float: left;\n    margin-left: 10px;\n}\n\n#askTeacherWindow .teacher-item .info .value {\n    color: #ca2723;\n    margin-right: 10px;\n    margin-left: 5px;\n}\n\n#askTeacherWindow .teacher-item .info .line1 {\n    font-size: 16px;\n    margin-bottom: 10px;\n}\n\n#askTeacherWindow .teacher-item .info .line2 {\n    font-size: 13px;\n    color: gray;\n}\n\n#askTeacherWindow input,\n#askTeacherWindow textarea {\n    outline: none;\n    resize: none;\n    border: 1px solid rgb(235, 235, 235);\n}\n\n.submit button {\n    color: white;\n    font-family: \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", tahoma, arial;\n    font-size: 12px;\n    padding: 5px 15px;\n    border-width: 1px;\n    border-style: solid;\n    border-image: initial;\n    border-radius: 2px;\n    background: rgb(215, 38, 33);\n    border-color: rgb(215, 38, 33);\n}\n\n\n/* 次数用完 */\n\n#askNoTimesWin {\n    width: 470px;\n    background: #fff;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, .3);\n    text-align: center;\n    padding: 20px 0;\n    position: fixed;\n    top: 220px;\n    left: 50%;\n    margin-left: -235px;\n    z-index: 1000;\n}\n\n#askNoTimesWin .goLiveRoom {\n    display: block;\n    width: 140px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    color: #fff;\n    background: #F03333;\n    margin: 40px auto 0 auto;\n    border-radius: 4px;\n    cursor: pointer;\n    text-decoration: none;\n}\n\n#askNoTimesWin .ask-icon {\n    margin: 20px auto;\n}\n\n#askNoTimesWin .ask-tip {\n    margin: 10px auto;\n    color: #666;\n    font-size: 15px;\n}\n\n#askNoTimesWin .ask-close {\n    float: right;\n    position: relative;\n    right: 10px;\n    top: -9px;\n    cursor: pointer;\n}\n\n\n/*askSuccess*/\n\n#askSuccess {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .4);\n    z-index: 998;\n    display: none;\n    cursor: pointer;\n}\n\n#askSuccess .askSuccess-wrap {\n    width: 391px;\n    background: #fff;\n    border-radius: 4px;\n    box-shadow: 0px 0px 4px rgba(102, 102, 102, 0.73);\n    position: absolute;\n    top: 30%;\n    left: 50%;\n    margin-left: -195px;\n    text-align: center;\n    padding: 28px 0;\n    font-size: 16px;\n    color: #666666;\n}\n\n#askSuccess .askSuccess-img {\n    width: 60px;\n    height: 60px;\n    background: url('/public/v2/base/images/askSuccess.png') no-repeat;\n    margin: 0 auto 15px auto;\n}\n\n#askSuccess .askSuccess-text {\n    margin: 12px auto 0 auto;\n}\n\n#askSuccess .askSuccess-text.first {\n    margin-bottom: 18px;\n}\n\n#askSuccess .askSuccess-red {\n    color: #DD503F;\n}\n\n\n/*提问某个投顾*/\n\n#askAimed-wrap {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .4);\n    display: none;\n}\n\n#askAimedTeacher {\n    width: 534px;\n    /*height: 257px;*/\n    padding: 20px 25px;\n    background: #fff;\n    position: fixed;\n    top: 30%;\n    left: 50%;\n    margin-left: -277px;\n    border-radius: 6px;\n    box-shadow: 2px 2px 20px rgba(0, 0, 0, .3);\n}\n\n#askAimedTeacher .aim-close-win {\n    width: 9px;\n    height: 9px;\n    background: url(/public/v2/base/images/close-icon.png);\n    float: right;\n    cursor: pointer;\n    position: relative;\n    top: -10px;\n    right: -15px;\n}\n\n#askAimedTeacher .aim-title {\n    position: relative;\n    overflow: hidden;\n    border-left: 3px solid #d72621;\n    padding-left: 10px;\n    font-size: 16px;\n}\n\n#askAimedTeacher .aim-times {\n    float: right;\n    font-size: 12px;\n    color: #333;\n    position: relative;\n    top: 2px;\n}\n\n#askAimedTeacher #textarea {\n    width: 100%;\n    height: 150px;\n    padding: 13px;\n    font-size: 13px;\n    line-height: 19px;\n}\n\n#askAimedTeacher .aim-content {\n    margin: 14px auto 14px auto;\n}\n\n#askAimedTeacher .aim-bottom {\n    /* position: relative;\n    top: -5px;*/\n}\n\n#askAimedTeacher .aim-line {\n    display: inline-block;\n    float: right;\n    font-size: 14px;\n}\n\n#askAimedTeacher .aim-word,\n#askAimedTeacher .aim-price {\n    color: #999999;\n    margin: 0 5px;\n}\n\n#askAimedTeacher .aim-num,\n.aim-value {\n    color: #DD503F;\n}\n\n#askAimedTeacher .aim-red {\n    color: #DD503F;\n    margin-left: 5px;\n}\n\n#askAimedTeacher .aim-submit {\n    display: inline-block;\n    width: 57px;\n    height: 31px;\n    line-height: 31px;\n    text-align: center;\n    color: #fff;\n    background: rgba(215, 38, 33, 1);\n    border-radius: 2px;\n    cursor: pointer;\n}\n\n#askAimedTeacher #stockCode {\n    display: inline-block;\n    width: 122px;\n    height: 29px;\n    background: rgba(255, 255, 255, 1);\n    font-size: 12px;\n    padding-left: 5px;\n}\n\n#askAimedTeacher .aim-msg {\n    margin-bottom: 10px;\n}\n\n#askAimedTeacher .msg-code {\n    margin: 0 5px;\n    color: #d72621;\n}\n", ""]);

	// exports


/***/ }),
/* 14 */
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
/* 15 */
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

	__webpack_require__(16);
	var local = __webpack_require__(18);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "#ynStcokListSpacial {\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\n    border: 2px solid #3274D8;\n    background: white;\n    display: none;\n    position: fixed;\n    overflow: hidden;\n    z-index: 50000\n}\n#ynStcokListSpacial tr{\n\n}\n#ynStcokListSpacial .ynStockList td {\n    padding: 8px 15px;\n    cursor: pointer;\n}\n\n#ynStcokListSpacial .ynStockList:hover td,\n#ynStcokListSpacial .ynStockList:first-child td {\n    background: #3274D8;\n    color: white;\n}\n\n\n/* after */\n\n.ynStcokListSpacial {\n    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);\n    border: 2px solid #3274D8;\n    background: white;\n    display: none;\n    position: absolute;\n    z-index: 50000;\n    top: 0;\n    left: 0;\n}\n\n.ynStcokListSpacial .ynStockList td {\n    padding: 8px 15px;\n    cursor: pointer;\n    line-height:20px;\n}\n\n.ynStcokListSpacial .ynStockList:hover td,\n.ynStcokListSpacial .ynStockList:first-child td {\n    background: #3274D8;\n    color: white;\n}\n", ""]);

	// exports


/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    热问股票
	    var hot = require('m/hotStock.js')

	    $(function(){
	        hot.init()
	        hot.render()
	    })

	*/

	var local = __webpack_require__(21);
	var error = __webpack_require__(19);
	module.exports = function () {
	    var container,
	        items,
	        query = {
	        size: 5,
	        page: 1
	    },
	        count = 0;

	    var getData = function getData(callback) {
	        var key = 'hot-ask-stock' + local.joinKey(query);
	        var cache = local.get(key, { timeout: 3600 });
	        if (cache && cache.valid) {
	            return callback(cache.data);
	        }
	        $.getJSON(__path + "/consultation/queryHotStock.htm", {
	            pageSize: query.size,
	            currentPage: query.page
	        }, function (data) {
	            callback(data);
	            local.set(key, data);
	        });
	    };

	    var createItems = function createItems(arr) {
	        return _.map(arr, function (item) {
	            return '<a class="item block" href="/marketLine.htm?stockcode=' + item.stockcode + '" target="_blank" data-code="' + item.stockcode + '"><p class="stockcode" data-id="' + item.stockcode + '">' + item.stockname + item.stockcode + '<sapn class="asknumber fr">' + item.questionstockcount + '\u4EBA\u63D0\u95EE</span></p><p class="stockInfo"><span class="price"></span><span class="up"></span><span class="money"></span></p></a>';
	        }).join('');
	    };

	    return {
	        init: function init(ops) {
	            var _this = this;

	            var tag = '<div id="hotAsk" class="frame"><div class="title"><span class="fa-online"></span><span class="text">\u70ED\u95EE\u80A1\u7968</span></div><div class="action"><span class="text">\u6362\u4E00\u6279</span><i class="fa fa-refresh"></i></div><div class="content"></div></div>';

	            var wrap = ops.wrap || $("body");
	            wrap.append(tag);
	            container = $('#hotAsk');
	            items = container.find('.content');

	            // 换一换
	            container.on('click', '.action', function () {
	                count++;
	                query.page = count % 2 + 1;
	                _this.render();
	            });
	        },
	        render: function render() {
	            getData(function (data) {
	                if (data.status == 1) {
	                    items.html(createItems(data.data.list));

	                    //查询股票价格
	                    items.find('.item').each(function () {
	                        var price = $(this).find('.price');
	                        var up = $(this).find('.up');
	                        var money = $(this).find('.money');
	                        yn.queryStock($(this).data('code'), {
	                            handle: true,
	                            color: true
	                        }).done(function (data) {
	                            price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
	                            up.html(data[33]);
	                            money.html(data[34]);
	                        });
	                    });
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    };
	}();

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*

	    关注列表
	    

	*/

	var error = __webpack_require__(19);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	        牛人看涨看跌
	        var m = require('m/trend.js')
	        $(function(){
	            m.init({wrap})
	            m.render()
	        })
	*/

	var local = __webpack_require__(21);
	var error = __webpack_require__(19);

	var createItems = function createItems(arr) {
	    return _.map(arr, function (item) {
	        return '<div class="item" data-code="' + item.stockcode + '"><div class="stockcode"><a href="/marketLine.htm?stockcode=' + item.stockcode + '" target="_blank">' + item.stockname + item.stockcode + '</a><div class="inline chg fr stockInfo"><span class="price"/marketLine.htm?stockcode=></span><span class="up"></span><span class="money"></span></div></div><div class="percent"><div class="upline inline" style="width:' + item.upWidth + '%;"></div><div class="downline inline" style="width:' + item.downWidth + '%;"></div></div><div class="state"><span>' + item.onNum + '\u4EBA\u770B\u6DA8</span><span class="fr">' + item.downNum + '\u4EBA\u770B\u8DCC</span></div></div>';
	    }).join('');
	};

	//牛人看涨涨跌
	var getData = function getData(ops, callback) {
	    var key = 'stock-trend' + local.joinKey(ops);
	    var cache = local.get(key, { timeout: 3600 });
	    if (cache && cache.valid) {
	        return callback(cache.data);
	    }

	    $.getJSON("/consultation/querySeeStockTrent.htm", {
	        currentPage: ops.page,
	        pageSize: ops.size,
	        singtype: ops.type
	    }, function (data) {
	        callback(data);
	        local.set(key, data);
	    });
	};

	module.exports = function () {
	    var container, items, loading;

	    return {
	        init: function init(ops) {
	            var self = this;
	            var wrap = ops.wrap || $("body");
	            wrap.append('\n                <div id="rising">\n                    <div class="title clear">\n                        <span class="rising-type thisclass" data-id="0">\u725B\u4EBA\u770B\u6DA8</span>\n                        <span class="rising-type" data-id="1">\u725B\u4EBA\u770B\u8DCC</span>\n                    </div>\n                    <div class="content"></div>\n                </div>');

	            container = $('#rising');
	            items = container.find('.content');
	            loading = new yn.loading({ type: 2, container: items });

	            container.on('click', '.rising-type', function () {
	                $(this).parent().find('.thisclass').removeClass("thisclass");
	                $(this).addClass("thisclass");
	                var type = $(this).data("id");
	                self.render({ type: type });
	            });
	        },
	        render: function render(ops) {
	            ops = _.extend({
	                page: 1,
	                size: 5,
	                type: 0 // 0=涨, 1=跌
	            }, ops);
	            loading.render();
	            getData(ops, function (data) {
	                if (data.status == 1) {
	                    //设置比例
	                    var rows = _.map(data.data.list, function (item) {
	                        var total = +item.onNum + +item.downNum;
	                        item.upWidth = item.onNum / total * 100;
	                        item.downWidth = item.downNum / total * 100;
	                        return item;
	                    });

	                    rows = _.sortBy(rows, ['downWidth', 'upWidth'][ops.type]);

	                    items.html(createItems(rows));

	                    //股票价格
	                    items.find('.item').each(function () {
	                        var price = $(this).find('.price');
	                        var up = $(this).find('.up');
	                        var money = $(this).find('.money');
	                        yn.queryStock($(this).data('code'), {
	                            handle: true,
	                            color: true
	                        }).done(function (data) {
	                            price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
	                            up.html(data[33]);
	                            money.html(data[34]);
	                        });
	                    });
	                } else {
	                    return layer.msg(error[data.status]);
	                }
	            });
	        }
	    };
	}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/** 
	 * 解答排行
	 * init({wrap})
	 * render({page,size})
	 * onAsk({id, name})
	 */

	var local = __webpack_require__(21);
	var error = __webpack_require__(19);

	var createItems = function createItems(arr) {
	    return _.map(arr, function (item) {
	        return '<div class="item clear"><div class="user-head fl" data-teacherid="' + item.answeruserid + '"><a href="' + live_path + 'live/' + item.answeruserid + '/" target="_blank"><img src="' + item.photo + '" title="' + item.teachertitle + '"/></a></div><div class="string fl"><p class="user-name"><span>' + item.teachertitle + '</span><span class="ask-btn fr" data-id="' + item.answeruserid + '" data-price="' + item.questionPrice + '">\u5411TA\u63D0\u95EE</span></p><p class="count">\u56DE\u7B54<span>' + item.answercount + '</span>\u6709\u5E2E\u52A9<span>' + item.zancount + '</span></p></div></div>';
	    }).join('');
	};

	var getData = function getData(ops, callback) {
	    ops = _.extend({
	        page: 1,
	        size: 5
	    }, ops);

	    var key = "resolve-ranking" + local.joinKey(ops);
	    var cache = local.get(key, { timeout: 3600 });
	    if (cache && cache.valid) {
	        return callback(cache.data);
	    }

	    $.getJSON("/consultation/queryAnswerRanking.htm", {
	        currentPage: ops.page,
	        pageSize: ops.size
	    }, function (data) {
	        callback(data);
	        local.set(key, data);
	    });
	};

	module.exports = function () {
	    var container, items;
	    return {
	        init: function init(ops) {
	            var self = this;
	            var wrap = ops.wrap || $('body');
	            wrap.append('<div id="answerRanking" class="frame">\n                            <div class="title"><span class="fa-online"></span><span class="text">\u89E3\u7B54\u6392\u884C</span></div>\n                            <div class="content"></div>\n                        </div>');

	            container = $('#answerRanking');
	            items = container.find('.content');
	            container.on('click', '.ask-btn', function () {
	                var id = $(this).data('id');
	                var price = $(this).data('price');
	                var name = $(this).prev().text();
	                self.onAsk({ id: id, name: name, price: price });
	            });
	        },
	        render: function render(ops) {
	            getData(ops, function (data) {
	                if (data.status == 1) {
	                    var rows = data.data.sort(function (a, b) {
	                        return +b.answercount - +a.answercount;
	                    });
	                    items.html(createItems(rows));
	                } else {
	                    return layer.msg(error[data.status]);
	                }
	            });
	        },
	        onAsk: function onAsk() {
	            console.log('---onAsk function not override---');
	        }
	    };
	}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	    老师简介
	    /.导入模块
	    var Profile = require('../module/ui/teacher-profile.js');

	    //2.初始化
	    Profile.init(); 

	    3.添加
	    //添加触发(CSS选择器)  
	    //模块会从选择器中获取teacherid值: $(".selector").data('teacherid'), 确保teacherid属性值存在
	    Profile.add('.selector') ; 
	    
	 */

	__webpack_require__(26);
	var Care = __webpack_require__(22);
	var error = __webpack_require__(19);

	var profile = function () {

	    var container,
	        items,
	        loading,
	        hide = true,
	        personData = null,
	        indicate_left,
	        indicate_right;

	    var updateCare = function updateCare() {};

	    //事件
	    var event = function event() {

	        //滑入时取消隐藏
	        container.on('mouseenter', function () {
	            return hide = false;
	        });
	        container.on('mouseleave', function () {
	            container.hide();
	            hide = true;
	            personData = null;
	        });

	        //关注
	        container.on('click', '.care', function () {
	            if (!ynIsLogin) return yn.login.render();
	            var btn = $('#profile-care-btn');
	            var ajax = personData._isCare ? Care.cancel : Care.add;
	            ajax(personData.teacher.teacherid).done(function (data) {
	                var ret = personData._isCare = !personData._isCare;
	                var text = ret ? "取消关注" : "关注";
	                btn.text(text);
	            });
	        });
	    };

	    var handleData = function handleData(data) {
	        data._style = _.pluck(data.teacher.specialtys, 'name').join("，").length > 40 ? _.pluck(data.teacher.specialtys, 'name').join("，").substr(0, 40) + '..' : _.pluck(data.teacher.specialtys, 'name').join("，");
	        data._link = "live/" + data.teacher.teacherid + '/';
	        data._careText = data.teacher.isAttention ? "取消关注" : "关注";
	        data._isCare = String(data.teacher.isAttention);
	        data._isOffline = data.isOffline == -1 ? 'hide' : '';
	        data._liveTitle = data.liveTitle ? data.liveTitle : '暂未开启直播';
	        data._liveTitle = data._liveTitle.length > 22 ? data._liveTitle.substr(0, 22) + '..' : data._liveTitle;
	        data._certificate_num = data.teacher.teacher_type == 1 ? data.teacher.certificate_num : 'hide';
	        if (data.opinion) {
	            data._opinionTitle = data.opinion.title.length > 22 ? data.opinion.title.substr(0, 22) + '..' : data.opinion.title;
	            data.hasOpinion = 'href=/opinion/' + data.opinion.article_id;
	        } else {
	            data._opinionTitle = '暂未发表观点';
	            data.hasOpinion = '';
	        }

	        return data;
	    };

	    var render = function render(trigger, teacherid) {
	        loading.render();

	        //定位
	        var position = function () {
	            var offset = trigger.offset();
	            var top = offset.top - 15;

	            var left = function () {
	                var _left = offset.left;
	                if (_left > 800) {
	                    //左侧显示
	                    indicate_right.show();
	                    indicate_left.hide();
	                    return _left - 450 - 5;
	                } else {
	                    //右侧显示
	                    indicate_left.show();
	                    indicate_right.hide();
	                    return _left + trigger.width() + 5;
	                }
	            }();

	            container.css({ left: left, top: top });
	        }();

	        $.getJSON("/userinfo/queryUserAllInfo.htm?teacherid=" + teacherid, function (data) {
	            if (data.status == 1) {
	                personData = handleData(data.data);
	                setTimeout(function () {
	                    items.html(template('personIntro-template', personData));
	                    container.show();
	                }, 300);
	            } else (function () {
	                return layer.msg(error[data.status]);
	            });
	        });
	    };

	    return {
	        init: function init() {
	            $('body').append(getTag());
	            container = $('#personIntro');
	            items = container.find('.items');
	            indicate_left = container.find('.indicate.left');
	            indicate_right = container.find('.indicate.right');

	            //加载动画
	            loading = new yntool.loading();
	            loading.container = items;
	            loading.margin = 80;
	            event();
	        },
	        add: function add(_selector) {
	            var self = this;

	            //触发显示/隐藏
	            $('body').on('mouseenter', _selector, function () {
	                var _this = this;

	                hide = false;
	                setTimeout(function () {
	                    if (!hide) {
	                        var teacherid = $(_this).data('teacherid'); //从选择器的属性中获取teacherid
	                        render($(_this), teacherid);
	                    }
	                }, 350);
	            }).on('mouseleave', _selector, function () {
	                hide = true;
	                setTimeout(function () {
	                    if (hide) {
	                        container.hide();
	                    }
	                }, 400);
	            });
	        }
	    };
	}();

	/*///////////////////////////////////////////////////////////////////*/

	module.exports = {
	    init: profile.init,
	    add: profile.add

	    /*///////////////////////////////////////////////////////////////////*/

	};function getTag() {
	    return '<div id="personIntro" class="hide"><span id="personIntro-indicate-right" class="indicate right fa fa-caret-right hide"></span><span id="personIntro-indicate-left" class="indicate left fa fa-caret-left hide"></span><div class="items"></div></div><script type="text/html" id="personIntro-template"><div class="line infoView"><div class="column column1"><div class="teacher-profile-avatar" ><img src="{{teacher.photo}}" style="width:80px;"/></div><div class="buttons"><span class="care {{_isCare}}" id="profile-care-btn">{{_careText}}</span></div></div><div class="column column2"><div class="title"><span class="name">{{teacher.nickname}}</span><i class="item-icon-guwen"><img src="{{teacher.type_ioc}}"></i><a class="ynbtn live-link liveBtn {{_isOffline}}" href="/live/{{teacher.teacherid}}/" target="_blank">\u770BTA\u76F4\u64AD</a></div><span class="postion">{{teacher.type_name}}</span><span class="number {{_certificate_num}}">\u8BC1\u4E66\u7F16\u53F7{{_certificate_num}}</span><div class="style">{{_style}}</div></div></div><div class="line countView"><div class="msg"><a target="_blank" href="/live/{{teacher.teacherid}}/"><span class="colorLight">\u76F4\u64AD\uFF1A</span>{{_liveTitle}}</a></div><div class="msg"><a target="_blank" {{hasOpinion}}><span class="colorLight">\u89C2\u70B9\uFF1A</span>{{_opinionTitle}}</a></div></div></script>';
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(27);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./teacher-profile.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./teacher-profile.css");
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

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "#personIntro {\r\n    width: 450px;\r\n    position: absolute;\r\n    border: 1px solid rgb(220, 220, 220);\r\n    background: #fff;\r\n    padding: 20px;\r\n    box-shadow: 2px 2px 15px rgba(0, 0, 0, .3);\r\n    border-radius: 2px;\r\n    z-index: 1000;\r\n}\r\n\r\n#personIntro .indicate {\r\n    font-size: 36px;\r\n    position: absolute;\r\n    color: white;\r\n    top: 25px\r\n}\r\n\r\n#personIntro .indicate.left {\r\n    left: -10px\r\n}\r\n\r\n#personIntro .indicate.right {\r\n    right: -10px\r\n}\r\n\r\n#personIntro .infoView {\r\n    overflow: hidden;\r\n    margin-bottom: 10px\r\n}\r\n\r\n#personIntro .teacher-profile-avatar {\r\n    width: 80px;\r\n    height: 80px;\r\n    overflow: hidden\r\n}\r\n\r\n#personIntro .teacher-profile-avatar img {\r\n    width: 80px;\r\n}\r\n\r\n#personIntro .infoView .column2 {\r\n    margin-left: 10px\r\n}\r\n\r\n#personIntro .infoView .name {\r\n    font-weight: bold;\r\n}\r\n\r\n#personIntro .infoView .title {\r\n    font-size: 18px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n#personIntro .infoView .postion {\r\n    display: inline-block;\r\n    font-size: 13px;\r\n    color: #666;\r\n    margin-top: 10px;\r\n}\r\n\r\n#personIntro .infoView .number {\r\n    display: inline-block;\r\n    font-size: 13px;\r\n    color: #d72621;\r\n    margin-top: 10px;\r\n}\r\n#personIntro .infoView .number.hide{\r\n    display: none;\r\n}\r\n\r\n#personIntro .infoView .title .item-icon-guwen {\r\n    display: inline-block;\r\n    width:14px;\r\n    height:20px;\r\n}\r\n#personIntro .infoView .title .item-icon-guwen img{\r\n    width:100%;\r\n}\r\n\r\n\r\n/* #personIntro .infoView .buttons .care {\r\n    background: black;\r\n    border-color: black;\r\n    color: #fff;\r\n} */\r\n\r\n#personIntro .infoView .buttons .care {\r\n    display: inline-block;\r\n    width: 80px;\r\n    height: 25px;\r\n    border-radius: 4px;\r\n    line-height: 25px;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #ff8487;\r\n    font-size: 14px;\r\n    margin-top: 5px;\r\n    cursor: pointer;\r\n}\r\n\r\n#personIntro .infoView .buttons .care:hover {\r\n    background: #ff5054;\r\n}\r\n\r\n#personIntro .infoView .buttons .sign {\r\n    background: rgb(200, 200, 200);\r\n    border-color: rgb(200, 200, 200)\r\n}\r\n\r\n#personIntro .infoView .style {\r\n    margin-top: 15px;\r\n    width: 300px;\r\n    line-height: 1.5;\r\n    color: #666;\r\n}\r\n\r\n#personIntro .infoView .style .item {\r\n    display: inline-block;\r\n    font-size: 12px;\r\n    padding: 2px\r\n}\r\n\r\n#personIntro .infoView>* {\r\n    float: left\r\n}\r\n\r\n#personIntro .countView {\r\n    border-top: 1px dashed rgb(200, 200, 200);\r\n    padding-top: 15px;\r\n    position: relative\r\n}\r\n\r\n#personIntro .countView .msg {\r\n    margin: 10px 0;\r\n    font-size: 15px;\r\n}\r\n\r\n#personIntro .countView .msg a {\r\n    color: #666;\r\n}\r\n\r\n#personIntro .countView .msg a:hover {\r\n    color: #ff5054;\r\n}\r\n\r\n#personIntro .countView .msg .colorLight {\r\n    color: #ff5054;\r\n    font-weight: bold;\r\n}\r\n\r\n#personIntro .countView table {\r\n    width: 280px\r\n}\r\n\r\n#personIntro .countView td {\r\n    text-align: center;\r\n    padding: 3px 0;\r\n    border-left: 1px solid rgb(220, 220, 220)\r\n}\r\n\r\n#personIntro .countView .value td {\r\n    font-size: 21px;\r\n    font-weight: bold;\r\n    color: #f97b02\r\n}\r\n\r\n#personIntro .countView td:first-child {\r\n    border: none\r\n}\r\n\r\n#personIntro .countView .live-link {\r\n    position: absolute;\r\n    top: 25px;\r\n    right: 5px\r\n}\r\n\r\n\r\n/*  */\r\n\r\n#personIntro .liveBtn {\r\n    display: inline-block;\r\n    width: 80px;\r\n    height: 25px;\r\n    border-radius: 4px;\r\n    line-height: 25px;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #ff8487;\r\n    font-size: 14px;\r\n    margin-left: 15px;\r\n}\r\n\r\n#personIntro .liveBtn.hide {\r\n    display: none;\r\n}\r\n\r\n#personIntro .liveBtn:hover {\r\n    background: #ff5054;\r\n}", ""]);

	// exports


/***/ })
/******/ ]);