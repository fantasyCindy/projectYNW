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
var PayModule = require('m/ui/pay-any-package.js'); //支付模块  pay-confirm-v1.2.js   pay-any.js'
var Path = require('~/lib/path.js');
require('./askWindow.css');
var queryStock = require('base/query-stock.js');
var stockList = require('base/stockList-1.2.js');
var error = require('e/error-type');

var container,
	questionBar,
	guideWin, //提问次数不足时引导直播弹窗
	option, //渲染的选项
	canAskTimes = 3, //可提问次数
	filterTeachers, //所有不应显示的老师
	askSuccess, //提问成功弹窗
	askTimes,
	aimedTeacher,
	aimTeacherid;

/*///////////////////////////////////////////////////////////////////*/
/*submit*/
function SubmitQuestion(send) {
	$.post('/consultation/questionNote.htm', send, function(data) {
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
	setTimeout(function() {
		askSuccess.hide();
	}, 3000);
}

/*支付*/
function pay(params) {
	$.post(
		'/app/appRewardPayOrder.htm',
		params,
		(back) => {
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
					success: () => askStockSuccess()
				});
			}
		},
		'json'
	);
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

	container.on('click', '.close-win', function() {
		container.parent('#askTeacher-wrap').hide();
		reset();
	});

	aimedTeacher.on('click', '.aim-close-win', function() {
		aimedTeacher.parent('#askAimed-wrap').hide();
		reset();
	});

	//关闭提问成功弹窗
	askSuccess.on('click', function() {
		askSuccess.hide();
	});

	//关闭引导直播窗口
	guideWin.on('click', '.ask-close', function() {
		guideWin.hide();
	});

	//interactive
	seachBar.onChange = (data) => searchResult.render(data);
	seachBar.onMax = () => searchResult.hide();
	searchResult.onSelect = (data) =>
		seachBar.append({
			id: data.id,
			name: data.name,
			price: data.price
		});
	onlineTeacher.onSelect = (data) => {
		seachBar.append({
			id: data.id,
			name: data.name,
			price: data.price
		});
	};

	//提问提交
	container.on('click', '.submit button', function() {
		var errorHandle = {
			seachBar: () => layer.msg('请选择投资顾问'),
			textarea: () => layer.msg('请输入您的问题')
		};

		var query = [ { key: 'seachBar', assert: seachBar.assert() }, { key: 'textarea', assert: textarea.assert() } ];

		var errorItem = _.find(query, (item) => item.assert);
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
	aimedTeacher.on('click', '.aim-submit', function() {
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
	container.on('click', '.invite-submit', function() {
		container.hide();
		var send = {
			questionuserid: ynUserId,
			teacherids: seachBar.getValue().result,
			note_billno: option.invite.number
		};
		$.post('/consultation/invitationTeacher.htm', send, function(data) {
			layer.msg(data == 'success' ? '邀请成功' : `错误:${data}`);
		});
	});
}

// 动画
var addFn = function() {
	$.fn.extend({
		animateCss: function(animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});
};

function render(ops) {
	if (!ynIsLogin) return yn.login.render();
	if (ynTeacherId) return layer.msg('老师不能提问!');
	option = _.extend(
		{
			select: false, //向某个老师提问
			invite: false, //是否为邀请回答
			filter: [] //过滤数组, 这里的老师不会出现在列表中(已经回答过的老师/已经邀请过的老师)
		},
		ops
	);

	//处理选项
	var optionHandler = {
		select: () => seachBar.add({ id: option.select.id, name: option.select.name }),
		invite: () => {
			questionBar.hide();
			onlyInvite.show();
		}
	};
	queryAskTimes((count) => {
		var tag =
			count == 0
				? `您的免费提问已用尽，可进入直播间进行互动`
				: `您还剩<span class="value">${count}</span>次免费提问机会`;
		reset();
		// container.show().velocity('transition.expandIn', { duration: 300 });
		animate();
		container.parent('#askTeacher-wrap').fadeIn();
		container.parent('#askTeacher-wrap').show();
		container.find('.times').html(tag); //显示次数
		option.select && optionHandler.select(); //选中老师
		option.invite && optionHandler.invite(); //如果是邀请回答
		option.filter.push(ynTeacherId);
		filterTeachers = (function() {
			var temp = option.filter.join('-');
			return `-${temp}-`;
		})();
		onlineTeacher.render();
	});
}

var animate = function() {
	var box = $('#askTeacherWindow');
	if (!box.hasOwnProperty('animateCss')) {
	}
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

var onlyInvite = (function() {
	var el = {};
	return {
		init: function() {
			el.container = container.find('.onlyInvite');
			el.button = el.container.find('button');
			el.button.click(() => this.onSubmit());
		},
		show: () => el.container.show(),
		hide: () => el.container.hide(),
		onSubmit: () => log('onSubmit is not override...')
	};
})();

//搜索栏
var seachBar = (function() {
	var el = {
		container: null,
		select: null,
		input: null,
		price: null
	};
	var selected = [];
	var createItem = (id, name) =>
		`<span class="item" data-id="${id}">@${name}<i class="fa fa-times-circle close-invite"></i></span>`;

	//查询所有老师
	var queryTeacher = (key) => {
		key = key || '';
		var defer = $.Deferred();
		$.getJSON('/consultation/queryLikeTeacher.htm', { likename: key }, (data) => defer.resolve(data));
		return defer.promise();
	};

	var errorHandleTable = {
		exist: () => layer.msg('已存在'),
		// "full": () => layer.msg("最多能邀请三位投顾回答!"),
		self: () => layer.msg('不能向自己提问')
	};

	return {
		init: function() {
			var self = this;
			el.container = container.find('.invite');
			el.select = el.container.find('.select');
			el.input = el.container.find('input');
			el.price = el.container.find('.price-num');

			//删除选择
			el.container.on('click', '.close-invite', function() {
				var parent = $(this).parent();
				var id = parent.data('id');
				parent.remove();
				var index = _.indexOf(selected, id);
				selected.splice(index, 1);
				el.input.show();
				el.price.html(0);
			});

			//搜索
			el.input
				.keyup(
					_.debounce(function() {
						var val = $(this).val().replace('@', '');
						if (!/[\u4e00-\u9fa5]+/.test(val)) return;
						queryTeacher(val).done((data) => {
							if (data.status == 1) {
								self.onChange(data);
							} else {
								return layer.msg(error[data.status]);
							}
						});
					}, 1000)
				)
				.focus(() => queryTeacher('').done((data) => self.onChange(data)));

			// 清空搜索字符
			el.input.blur(function() {
				$(this).val('');
			});
		},

		//清空
		clear: function() {
			el.input.val('');
			el.select.empty();
			selected = [];
			el.input.show();
			el.price.html('0');
		},

		//添加
		add: function(info) {
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

		append: function(info) {
			var query = [
				{ key: 'self', assert: +info.id == +ynTeacherId },
				{ key: 'exist', assert: _.indexOf(selected, info.id) != -1 }
				// { key: "full", assert: selected.length == 3 }
			];
			var errItem = _.find(query, (item) => item.assert);
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
		getValue: function() {
			//获取邀请的老师id
			var price = el.price.html();
			console.log('=price=', price);
			var result = '';
			el.select.find('.item').each(function() {
				result += $(this).data('id') + '&';
			});
			return { result: result.replace(/&$/, ''), price: price };
		},
		assert: () => el.select.find('.item').length < 1, //验证
		onChange: () => log('onChange  note override...'),
		onMax: () => log('onMax : note override...')
	};
})();

//搜索结果
var searchResult = (function() {
	var el = {};
	return {
		init: function() {
			var self = this;
			el.container = container.find('.list');
			el.title = el.container.find('.info .value');
			el.items = el.container.find('.list-wrap');

			el.container.on('click', '.close', () => this.hide());
			el.container.on('click', '.item', function() {
				var teacherId = $(this).data('id');
				var name = $(this).data('name');
				getPrice({ teacherId: teacherId }).done(function(data) {
					var price = data.data;
					self.onSelect({
						id: teacherId,
						name: name,
						price: price
					});
				});
			});
		},
		render: function(data) {
			this.show();
			var rows = data.data.list;
			el.title.text(rows.length);
			rows = _.filter(rows, (item) => filterTeachers.indexOf(`-${item.answeruserid}-`) == -1);
			el.items.html(template('online-teacher-template', rows));
		},
		onSelect: (data) => log(`error : searchResult onSelect is not override...`),
		show: () => el.container.show(),
		hide: () => el.container.hide()
	};
})();

//内容栏
var textarea = (function() {
	var el = {};
	return {
		init: function() {
			el.input = container.find('textarea');
			el.input.keyup(function() {
				var val = $(this).val();
				parseStock(val, (info) => (info ? stockTrend.render(info) : stockTrend.hide()));
			});
		},
		clear: function() {
			el.input.val('');
		},
		getValue: () => el.input.val(),
		assert: () => !_.trim(el.input.val())
	};
})();

//股票趋势判断
var stockTrend = (function() {
	var el = {},
		code = '',
		name = '';
	return {
		init: function() {
			el.container = container.find('.msg');
			el.code = el.container.find('.msg-code');
		},
		hide: () => {
			el.container.hide();
			code = name = '';
		},
		render: (info) => {
			code = info.code;
			name = info.name;
			el.code.text(code + name);
			el.container.show();
		},
		getValue: () => ({ code: code, name: name })
	};
})();

//内容栏
var textareaAimed = (function() {
	var el = {};
	return {
		init: function() {
			el.input = aimedTeacher.find('textarea');
			el.input.keyup(function() {
				var val = $(this).val();
				parseStock(val, (info) => (info ? stockTrendAimed.render(info) : stockTrendAimed.hide()));
			});
		},
		clear: function() {
			el.input.val('');
		},
		getValue: () => el.input.val(),
		assert: () => !_.trim(el.input.val())
	};
})();

//股票趋势判断
var stockTrendAimed = (function() {
	var el = {},
		code = '',
		name = '';
	return {
		init: function() {
			el.container = aimedTeacher.find('.aim-msg');
			el.code = el.container.find('.msg-code');
		},
		hide: () => {
			el.container.hide();
			code = name = '';
		},
		render: (info) => {
			code = info.code;
			name = info.name;
			el.code.text(code + name);
			el.container.show();
		},
		getValue: () => ({ code: code, name: name })
	};
})();

//获取老师提问价格
function getPrice(ops) {
	var defer = $.Deferred();
	$.getJSON('/teacher/getQuestionsPrice.htm', ops, (back) => {
		if (back.status == 1) {
			defer.resolve(back);
		} else
			() => {
				return layer.msg(error[back.status]);
			};
	});
	return defer.promise();
}

//在线老师
var onlineTeacher = (function() {
	var el = {};
	return {
		init: function() {
			var self = this;
			el.items = container.find('.right .items');
			el.items.on('click', '.item', function() {
				var teacherId = $(this).data('id');
				var name = $(this).data('name');
				getPrice({ teacherId: teacherId }).done(function(data) {
					var price = data.data;
					self.onSelect({
						id: teacherId,
						name: name,
						price: price
					});
				});
			});
		},
		render: function() {
			$.getJSON(`/consultation/queryOnlineTeacher.htm?pageSize=20&currentPage=1&userid=${ynUserId}`, (data) => {
				if (data.status == 1) {
					var rows = data.data.list;
					rows = _.filter(rows, (item) => filterTeachers.indexOf(`-${item.answeruserid}-`) == -1);
					el.items.html(template('online-teacher-template', rows));
				} else
					() => {
						return layer.msg(error[data.status]);
					};
			});
		},
		onSelect: () => log('onlineTeacher select...')
	};
})();

/*///////////////////////////////////////////////////////////////////*/

//查询提问剩余次数
function queryAskTimes(callback) {
	if (!ynIsLogin) {
		yn.login.render();
		return;
	}

	$.getJSON(
		'/consultation/queryTodayQuestionCount.htm',
		{
			questionuserid: ynUserId,
			t: timestamp()
		},
		function(data) {
			if (data.status == 1) {
				askTimes = canAskTimes - +data.data;
				askTimes = askTimes < 1 ? 0 : askTimes;
				callback(askTimes);
			} else {
				return layer.msg(error[data.status]);
			}
		}
	);
}

var timestamp = function() {
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
var showStockList = (function() {
	var el = {};
	return {
		init: function() {
			el.input = container.find('.stockList');
			el.target = container.find('textarea');
			stockList.get().render({
				id: 'ask-win-stock',
				top: 42,
				onSelect: function(item, trigger) {
					trigger.val('');
					el.target.val(el.target.val() + item.stockWrap).trigger('keyup');
					// ajax.add({ stockcode: item.stockCode, stockname: item.stockName }).done(code => render())
				}
			});
		}
	};
})();

//aim-win显示股票列表
//显示股票列表
var showStockListAimed = (function() {
	var el = {};
	return {
		init: function() {
			el.input = aimedTeacher.find('.stockList');
			el.target = aimedTeacher.find('textarea');
			stockList.get().render({
				id: 'stockCode',
				top: 218,
				left: 25,
				onSelect: function(item, trigger) {
					trigger.val('');
					el.target.val(el.target.val() + item.stockWrap).trigger('keyup');
					// ajax.add({ stockcode: item.stockCode, stockname: item.stockName }).done(code => render())
				}
			});
		}
	};
})();

//识别股票
//如果查询成功回调callback({code, name})

function parseStock(val, callback) {
	var match = val.match(/[0-9]{6}/g);
	if (!match) return callback(false);

	//简单验证
	var code = _.find(match, (item) => isStockCode(item));
	if (!code) return callback(false);
	//查询新浪验证
	queryStock(code).done((data) => {
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

var isStockCode = function(value) {
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
	queryAskTimes((count) => {
		console.log('count3112', count);
		var tag =
			count == 0
				? `您的免费提问已用尽，可进入直播间进行互动`
				: `您还剩<span class="value">${count}</span>次免费提问机会`;
		animate();
		aimTeacherid = ops.select.id;
		getPrice({ teacherId: aimTeacherid }).done(function(data) {
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
