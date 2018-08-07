var Face = require('m/qqface/main.js');
var askWindow = require('base/askWindow.js'); //提问
var liveAskStockList = require('./live-askStock-list.js');
var error = require('e/error-type');
var auth = require('vmodule/userAuth'); // 实名认证模块
var Path = require('~/lib/path.js');
var Confirm = require('m/ui/pay-any-package.js');
var payShow = require('m/ui/pay-animation.js');
var stockList = require('~/ui/stockList-1.2.js'); // 大盘指数
/*///////////////////////////////////////////////////////////////////*/

window.hub.on('show-ask-window', (arg) => {
	askWindow.aimedRender(arg);
});
window.hub.on('referOrder', (ops) => {
	if (!ynIsLogin) {
		yn.login.render();
		return;
	}
	auth.get().render((result) => {
		if (result) {
			$.post(
				'/app/buyGoodsPayOrder.htm',
				{
					goodsId: ops.id, //商品id
					goodsType: 3,
					buy_number: 1,
					pay_source: 0,
					employeecode: ''
				},
				function(data) {
					if (data.status == 60011) {
						layer.msg('用户没有开通账户!请联系客服!');
					}
					if (data.status == 90002) {
						realName.init({
							show: true
						});
					}
					if (data.status == 60023) {
						return layer.msg('商品购买时间已过');
					}
					if (data.status == 1) {
						Confirm.payconfirm({
							type: 3,
							price: ops.price,
							referenceid: ops.id,
							userid: ynUserId,
							orderid: data.data.orderid,
							link: Path.pay(data.data.orderNum),
							orderNum: data.data.orderNum,
							finish: true,
							read: true,
							useNB: false,
							success: () => hub.emit('click-refer')
						});
					}
				},
				'json'
			);
		}
	});
});

//互动插入股票
(function() {
	var textarea = $('#insertStock').parents('.content').find('textarea');
	stockList.get().render({
		id: 'insertStock',
		top: 0,
		onSelect: function(item, trigger) {
			trigger.val('');
			textarea.val(textarea.val() + item.stockWrap).trigger('keyup');
			// ajax.add({ stockcode: item.stockCode, stockname: item.stockName }).done(code => render())
		}
	});
})();

var audio,
	msn,
	__dataCache = {};
var __href = window.location.href;
var cateMatch = __href.match(/live/);
var __cate = cateMatch ? cateMatch[0] : '';
// //历史期刊ID
var historyId = (function() {
	var match = window.location.href.match(/periodical=([0-9]+)/);
	return match ? match[1] : periodicalid;
})();

var route = {
	liveCommon: function() {
		subject.init(); //主题
		living.init(periodicalid); //直播

		living.render();
		liveDetailSocket();
		topDetail.init();
		topDetail.render();
	},
	self: function() {
		this.liveCommon();
		modifyWin.init();
		pubLive.init();
		subject.showEidt();
		pubLive.render();
		closeLiveRoom.init();
		liveAskStockList.init();
	},
	user: function() {
		this.liveCommon();
	},
	historyDetail: function() {
		subject.init(); //主题
		liveAskStockList.init();
		living.init(historyId); //直播
		$('#liveContent-title-1').text('第' + historyId + '期直播内容');
		living.history_render();
	},
	offline: function() {
		this.liveCommon();
	}
};
var isOffline = teacher_isOffline == '-1';
var isHistory = (historyId && historyId != periodicalid) || isOffline;
$(function() {
	//HTML5音频
	try {
		audio = new Audio('/public/media/live_msg.mp3');
		msn = new Audio('/public/media/msn_msg.mp3');
	} catch (e) {
		$('.yn-icon-sound').hide();
	}

	var entries = [
		{ entry: 'offline', assert: hasHistoryLive }, //没有在线
		{ entry: 'historyDetail', assert: isHistory }, //历史详情
		{ entry: 'self', assert: isTeacherSelf }, //老师进入正在直播
		{ entry: 'user', assert: true } //正在直播
	];
	var entry = _.find(entries, (item) => item.assert);
	route[entry.entry]();

	if (__cate == 'live') {
		var item = $($('.liveDetail-menu .item')[1]);
		item.addClass('select');
	}

	if (isTeacherSelf) {
		addTop.init();
		addTop.render();
	}

	askWindow.init();
	sideTool.init();

	//上下期
	turnPeriodical.init();
});

// /*///////////////////////////////////////////////////////////////////*/

//主题
var subject = (function() {
	var container, history, boxWrap, box, edit, title;
	return {
		init: function() {
			container = $('.living-subject');
			history = container.find('.history');
			edit = $('.edit-subject');
			title = $('.living-subject-value');

			//进入历史直播
			// history.on('click', function() {
			// 	$('#liveDetail').hide();
			// 	liveHistory.render();
			// });

			//显示修改窗口
			edit.click(function() {
				modifyWin.render(title.text());
				modifyWin.onDone = function(val) {
					title.text(val);
				};
			});
		},
		render: function(ops) {
			title.text(ops.title);
		},
		showEidt: function() {
			edit.css('display', 'inline-block');
		}
	};
})();

// /**
//  * 修改主题窗口
//  * render()
//  * delegate.done(val)
//  */
var modifyWin = (function() {
	var id, container, wrap, input, submit, wordCount;
	return {
		init: function() {
			id = periodicalid;
			var self = this;
			wrap = $('#modify-subject-container');
			container = $('#modify-subject');
			input = container.find('textarea');
			submit = container.find('.submit');
			wordCount = container.find('.wordCountValue');

			//关闭窗口
			container.on('click', '.close', () => wrap.hide() && input.val(''));
			yn.wordCount(input, { indicate: wordCount, limit: 20 });

			//提交
			submit.click(
				_.debounce(
					function() {
						if (!input.val()) return layer.msg('主题不能为空');
						submit();
					},
					2000,
					{ leading: true, trailing: false }
				)
			);

			var submit = function() {
				var val = input.val();

				//修改直播主题
				$.post(
					'/center/editPeriodical.htm',
					{
						periodicalid: id,
						todaysubject: val
					},
					function(data) {
						data = JSON.parse(data);
						if (data.status == 1) {
							layer.msg('修改成功');
							wrap.hide();
							self.onDone(val);
						} else {
							return layer.msg(error[data.status]);
						}
					}
				);
			};
		},
		render: function(data) {
			if (ynTeacherId != room_teacherid) return;
			wrap.show();
			yn.centerBox(container);
			data && input.val(data).trigger('keyup');
		},
		onDone: function() {}
	};
})();

//获取昨天
function getYesterday() {
	var day1 = new Date();
	day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
	var s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();
	return s1;
}

//获取前天天
function beforeYesterday() {
	var day1 = new Date();
	day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000 * 2);
	var s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();
	return s1;
}
//日期获取毫秒数
function getSeconds(date) {
	var time = new Date(date.replace(/-/g, '/'));
	var seconds = time.getTime();
	return seconds;
}
//时间转换
function timeFormat(time) {
	//时间转换
	var strtime = time;
	var result;
	var newDate = new Date();
	var date = getSeconds(strtime);
	const sub = Date.now() - date;
	const yesterday = 1000 * 60 * 60 * 48;
	const yesterdayStart = getSeconds(getYesterday() + ' ' + '00:00:00'); //昨天开始时间
	const yesterdayEnd = getSeconds(getYesterday() + ' ' + '23:59:59'); //昨天结束时间
	const beforeyesterdayStart = getSeconds(beforeYesterday() + ' ' + '00:00:00'); //前天开始时间
	const beforeyesterdayEnd = getSeconds(beforeYesterday() + ' ' + '23:59:59'); //前天结束时间
	const thisYear = getSeconds(newDate.getFullYear() + '-01-01' + ' ' + '00:00:00'); //今年开始时间
	if (date > yesterdayEnd) {
		result = '今天' + strtime.substr(10, 6);
	} else if (date >= yesterdayStart && date <= yesterdayEnd) {
		result = '昨天' + strtime.substr(10, 6);
	} else if (date >= beforeyesterdayStart && date <= beforeyesterdayEnd) {
		result = '前天' + strtime.substr(10, 6);
	} else {
		result = strtime.substr(0, 16);
	}
	return result;
}

// 关注
var addCare = function(teacherid, isCare) {
	var defer = $.Deferred();
	$.post('/center/attention.htm', { teacherid: teacherid }, function(data) {
		data = JSON.parse(data);
		if (data.status == '1') {
			var html = isCare == '关注' ? '关注成功' : '取消成功';
			layer.msg(html);
			defer.resolve();
		} else {
			layer.msg(error[data.status]);
		}
	});
	return defer.promise();
};

//正在直播
var living = (function() {
	var id, //期刊id
		talkId = '', //发言ID
		container,
		wrap,
		items,
		today,
		history,
		page = 1,
		row = 20,
		nothing = false,
		bootpag,
		liveContent;

	var cur = null; // 当前显示的是正在直播还是历史直播

	var getData = function(callback) {
		$.getJSON(
			'/html/queryLiveInfo.htm',
			{
				id: talkId,
				periodicalid: id,
				pageSize: row
			},
			function(data) {
				callback(data);
			}
		);
	};

	/*  创建标签 */

	var createItems = (arr) => {
		return _.map(arr, (item) => {
			var normalMessage = `<div class="live-item-2 clear ${item.messageType}" data-id="${item.id}" data-link="${item.link}">
                        <div class="time"><span class="time-detail">${item._time}</span></div>
                        <div class="photo avatar"><img src="${item.photo}" alt="" /></div>
                        <div class="msg">
                            <span class="name">${item.teacherName}<i class="zhubo-icon ${item._icon}"></i></span>
                        </div>
                        <div class="content">
                            <span class="content-jiao"></span>
                            <div class="live-detail">${item.content} ${item.btn}</div>
                            ${item.deleteItem}
                        </div>
                    </div>`;
			var card = `<div class="live-item-2 clear" data-id="${item.id}" data-link="${item.link}">
                <div class="time"><span class="time-detail">${item._time}</span></div>
                <div class="photo avatar"><img src="${item.photo}" alt="" /></div>
                <div class="msg">
                    <span class="name">${item.teacherName}<i class="zhubo-icon ${item._icon}"></i></span>
                </div>
                <div class="content">
                    <span class="content-jiao"></span>
                    <div class="message-card ${item.cardName} ${item.style}">
                        <p>${item.answer}</p>
                        <div class="card">
                            <div class="card-title">${item._title}</div>
                            <div class="card-content">${item._quotecontent}</div>
                        </div>
                    </div>
                    ${item.deleteItem}
                </div>
            </div>`;
			var tag = item.quotecontent ? card : normalMessage;
			return `${tag}`;
		}).join('');
	};

	var handleLiveData = (arr) => {
		return _.map(arr, (item) => {
			//系统消息
			item.messageType = item.teacherName == '系统消息' ? 'system' : '';
			item._icon = item.teacherName == '系统消息' ? 'hide' : '';
			// item.content = yn.codeFormat(item.content);
			item.photo = item.photo || item.teacherPhoto || item.teacherPhoto_path;
			item.deleteItem =
				room_teacherid == ynTeacherId && !isHistory
					? `<div class="deleteIcon hide delete" data-id="${item.id}"></div>`
					: '';
			item._link = item.link ? `href = ${item.link}` : '';
			item._time = timeFormat(item.pubtime);
			// 打赏消息
			item.isPay = item.puiblisherid === '0';
			item.answer = '';

			if (item.quotecontent && item.quotecontent.length > 80) {
				item._quotecontent = item.quotecontent.substr(0, 80) + '…';
			} else if (item.quotecontent && item.quotecontent.length < 30) {
				item._quotecontent = item.quotecontent;
				item.style = 'line';
			} else {
				item._quotecontent = item.quotecontent;
				item.style = '';
			}

			if (item.contentFilter && item.contentFilter.length > 60) {
				item._contentFilter = item.contentFilter.substr(0, 60) + '…';
			} else {
				item._contentFilter = item.contentFilter;
			}

			//link
			if (item.link && item.link.indexOf('referenceid') != '-1') {
				item.cardName = 'refer';
				item._title = item._contentFilter;
				item.btn = `<span class="live-link refer">立即查看</span>。`;
			} else if (item.link && item.link.indexOf('askStockDetail') != '-1') {
				item.cardName = 'ask';
				item._title = '';
				item.answer = item._contentFilter;
			} else if (item.link && item.link.indexOf('learning') != '-1') {
				item.cardName = 'tactics';
				if (item.contentFilter && item.contentFilter.length > 22) {
					item._title = item.contentFilter.substr(0, 22) + '…';
				} else {
					item._title = item.contentFilter;
				}
			} else if (item.link && item.link.indexOf('article_id') != '-1') {
				item.cardName = 'opinion';
				item._title = item._contentFilter;
			} else {
				item.cardName = '';
				item.btn = '';
			}
			return item;
		});
	};

	function event() {
		//点击观点卡片
		container.on('click', '.message-card.opinion', function() {
			var link = $(this).parents('.live-item-2').data('link');
			var match = link.match(/=([0-9]+)/);
			var id = match ? match[1] : '';
			hub.emit('click-opinion', { id: id, type: 'opinion' });
		});
		//点击战法卡片
		container.on('click', '.message-card.tactics', function() {
			var link = $(this).parents('.live-item-2').data('link');
			var match = link.match(/(learning\/)([0-9]+)/);
			var id = match ? match[2] : '';
			hub.emit('click-opinion', { id: id, type: 'learning' });
		});

		//点击内参卡片
		container.on('click', '.message-card.refer', function() {
			var link = $(this).parents('.live-item-2').data('link');
			var match = link.match(/=([0-9]+)/);
			var id = match ? match[1] : '';
			hub.emit('click-refer', id);
		});

		//点击内参消息
		container.on('click', '.live-link.refer', function() {
			var link = $(this).parents('.live-item-2').data('link');
			var match = link.match(/=([0-9]+)/);
			var id = match ? match[1] : '';
			hub.emit('click-refer', id);
		});

		//点击问股卡片
		container.on('click', '.message-card.ask', function() {
			var link = $(this).parents('.live-item-2').data('link');
			var match = link.match(/=([0-9]+)/);
			var id = match ? match[1] : '';
			hub.emit('click-ask', id);
		});

		/*滚动到顶部加载更多*/
		var isTop = false;
		$('#live .items').scroll(function() {
			var h = $('#live .items').scrollTop();
			if (h == 0 && !isTop) {
				isTop = true;
				var scroll = items[0].scrollHeight;
				talkId = cur.find('.live-item-2').eq(0).data('id');
				var el = $(this);
				getData((data) => {
					if (data.status == 1) {
						isTop = false;
						if (data.data.list.length < row) {
							layer.msg('已加载全部');
							isTop = true;
						}
						cur.prepend(createItems(handleLiveData(data.data.list)));
						items.scrollTop(items[0].scrollHeight - scroll);
					} else {
						return layer.msg(error[data.status]);
					}
				});
			}
		});

		/* 声音提示 */

		container.on('click', '.yn-icon-sound', function() {
			$(this).toggleClass('stop');
			living.enableAudio = !living.enableAudio;
		});

		/* 删除直播 */

		container.on('click', '.delete', function() {
			if (+room_teacherid != ynTeacherId) return;
			var el = $(this);
			var item = $(this).parents('.live-item-2');
			layer.confirm('确定要删除吗?', function(index) {
				var id = el.data('id');
				$.post('/html/broadcasting/delBroadcasting.htm', { id: id }, function(data) {
					data = JSON.parse(data);
					if (data.status == 1) {
						layer.msg('已删除');
						return item.remove() && layer.close(index);
					} else {
						return layer.msg(error[data.status]);
					}
				});
			});
		});
	}

	return {
		enableAudio: true,
		init: function(_id) {
			id = _id;
			container = $('#live');
			wrap = $('#liveDetail');
			items = container.find('#items-middle');
			liveContent = container.find('.today-item');
			today = items.find('.today');
			history = items.find('.history');
			living.setting.init();
			tooltip.init();
			event();

			//点击图片放大

			items.on('click', 'img', function() {
				if ($(this).parent().hasClass('avatar')) {
					return;
				}
				if ($(this).parents('.live-item-2').hasClass('system')) {
					var id = $(this).data('giftid');
					if (!id) return;
					showPayAnimation(id);
					return;
				}
				var src = $(this).attr('src');
				$('.img-wrap').fadeIn(100).find('#img-wrap-img').attr('src', src);
			});
			$('.img-wrap').click(function() {
				$(this).fadeOut(100);
			});
		},
		history_render: function() {
			cur = history;
			history.show();
			wrap.show();
			today.hide();

			getData((data) => {
				if (data.status == 1) {
					if (data.data.list.length < 1) {
						return;
					}
					history.append(createItems(handleLiveData(data.data.list)));
					items.scrollTop(items[0].scrollHeight);
				} else {
					return layer.msg(error[data.status]);
				}
			});
		},
		render: function() {
			cur = today;
			history.hide();
			wrap.show();
			today.show();

			getData((data) => {
				if (data.status == 1) {
					if (data.data.list.length < 1) {
						return;
					}
					liveContent.html(createItems(handleLiveData(data.data.list)));
					items.scrollTop(items[0].scrollHeight);
				} else {
					return layer.msg(error[data.status]);
				}
			});

			// /* 是否显示删除图标 */
			// container.find('.deleteIcon').each(function() {
			//     log(+room_teacherid == +ynTeacherId)
			//     if (+room_teacherid == +ynTeacherId) {
			//         $(this).removeClass('hide')
			//     }
			// })
			items.scrollTop(items[0].scrollHeight);
		},

		// 收到推送的消息
		onSocket: function(data) {
			if (nothing) {
				items.find('.nothing').remove();
				live.nothing = false;
			}
			data.pubtimeString = data.showTimeStr;
			data.teacherName = data.nickName;
			data.id = data.dataId;

			// data.contentFilter = data.content;
			items.append(createItems(handleLiveData([ data ])));
			tooltip.render();
			if (living.enableAudio) {
				audio.play();
			}
			// items.scrollTop(items[0].scrollHeight);
		},

		// socket不可用时,通过定时器获数据
		onTimer: function() {
			getData(function(data) {
				if (data.status == 1) {
					log(data);
					items.html(createItems(data.data.list));
				} else {
					return layer.msg(error[data.status]);
				}
			});
		}
	};
})();

//side tool 关注 问股 礼物
var sideTool = (function() {
	var side;
	return {
		init: function() {
			side = $('.side-tool');
			if (ynIsTeacher) {
				side.html(
					`<div class="askStock-message"><i class="live-circle hide"><i class="live-circle-inset"></i></i>问股消息</div>`
				);
				//老师查看问股
				side.on('click', '.askStock-message', function() {
					liveAskStockList.render();
					side.find('.live-circle').hide();
				});
			} else {
				var giftBtn = isHistory ? '' : `<div class="message user-gift">礼物</div>`;
				side.append(`<div class="message user-ask">问股</div>${giftBtn}`);
				//关注
				side.on('click', '.care', function() {
					var _this = this;
					if ($(_this).hasClass('true')) return;
					if (!ynIsLogin) {
						yn.login.render();
						return;
					}
					if (+ynTeacherId == +room_teacherid) return layer.msg('不能关注自己啊');
					addCare(room_teacherid, '关注').done((data) => {
						$(_this).text('已关注').addClass('true');
					});
				});

				//用户问股
				side.on('click', '.user-ask', function() {
					if (!ynIsLogin) {
						yn.login.render();
						return;
					}
					if (+ynTeacherId == +room_teacherid) return layer.msg('扪心自问');
					askWindow.aimedRender({
						select: { id: room_teacherid, name: room_nickName }
					});
				});
				//用戶点击礼物
				side.on('click', '.user-gift', function() {
					if (!ynIsLogin) {
						yn.login.render();
						return;
					}
					hub.emit('click-gift');
				});
			}
		},
		render: function() {
			side.find('.live-circle').show();
		}
	};
})();

//提示"您有新消息"
var tooltip = (function() {
	var tip,
		visible = false,
		items,
		back;

	var show = function() {
		if (visible) return;
		tip.css('display', 'inline-block');
		visible = true;
	};

	var hidden = function() {
		tip.css('display', 'none');
		visible = false;
	};

	return {
		init() {
			items = $('#live .items');
			tip = $('.tooltip-live');
			back = $('.backToNow');
			tip.click(function() {
				hidden();
				items.scrollTop(3000000);
			});
			back.click(function() {
				back.fadeOut();
				items.scrollTop(3000000);
			});

			// 如果滚动条滚动到底部, 隐藏提示信息
			items.on(
				'scroll',
				_.debounce(function() {
					var top = $('.live-item-2:last').position().top;
					if (top < 510) {
						//滚动到底部
						hidden();
						back.fadeOut();
					}
				}, 500)
			);

			//如果滚动条离开底部，显示回到当前直播位置
			items.on(
				'scroll',
				_.debounce(function() {
					var top = $('.live-item-2:last').position().top;
					if (top > 510) {
						//滚动到底部
						back.fadeIn();
					}
				}, 500)
			);
		},
		render() {
			if (ynIsTeacher) {
				return;
			}
			show();
		}
	};
})();

//设置功能
living.setting = (function() {
	var live, container, fontItem;

	var event = function() {
		fontItem.click(function() {
			$(this).parent().find('.select').removeClass('select');
			$(this).addClass('select');
			var size = $(this).data('size');
			live.find('.items').attr('id', 'items-' + size);
		});
	};

	return {
		init: function() {
			live = $('#live');
			container = live.find('.setting');
			fontItem = container.find('.font-size-item');
			event();
		}
	};
})();

//发布直播
var pubLive = (function() {
	var container, ue, stock, btn, id;
	var event = function() {
		btn.on(
			'click',
			_.debounce(
				function() {
					submit();
				},
				2000,
				{ leading: true, trailing: false }
			)
		);
	};

	var submit = function() {
		var content = ue.getContent();
		if (!content) {
			layer.msg('发布内容不能为空');
			return;
		}
		publishLiveContent(id, content).done(function() {
			ue.setContent('');
		});
	};

	return {
		init: function() {
			id = periodicalid;
			container = $('#pubEditer');
			stock = $('.insertStockCode');
			btn = container.find('.submit');
			ue = UE.getEditor('ueditContainer', {
				toolbars: [
					[
						'simpleupload' //单图上传
					]
				],
				enableAutoSave: false,
				saveInterval: 36000000,
				initialFrameHeight: 113,
				elementPathEnabled: false,
				wordCount: false,
				enableContextMenu: false,
				pasteplain: true,
				autotypeset: {
					removeClass: true,
					clearFontSize: true,
					removeEmptyline: true, //去掉空行
					removeEmptyNode: false, // 去掉空节点
					autotypeset: true,
					indentValue: '2em'
				}
			});

			// 搜索股票
			stockList.get().render({
				id: 'insertStockCode',
				top: 70,
				onSelect: (item, trigger) => {
					ue.execCommand('inserthtml', item.stockWrap);
					stock.val('');
				}
			});

			event();
		},
		render: function() {
			container.show();
		}
	};
})();

// /**
//  * 历史直播
//  */
var liveHistory = (function() {
	var container,
		items,
		page = 1,
		row = 11,
		userid,
		bootpag;

	var handleData = (arr) => {
		return _.filter(
			_.map(arr, (item) => {
				item._time = item.starttime.match(/^[^\s]+/)[0];
				if (+item.status == 0) {
					return false;
				}
				return item;
			}),
			(item) => item
		);
	};

	return {
		init: function(_userid) {
			userid = _userid;
			container = $('#liveHistory');
			items = container.find('.items');
			bootpag = yn.bootpag(container);
			if (!isTeacherSelf) {
				bootpag.hide();
			}
			bootpag.on('page', function(err, num) {
				page = num;
				liveHistory.render();
			});

			/*  放大图片 */
			setTimeout(function() {
				/*  放大图片 */
				items.find('img').each(function() {
					if ($(this).parent().hasClass('photo')) {
						return;
					}

					$(this).zoomify();
				});
			}, 1000);
		},
		render: function() {
			container.show();
			getMyLiveList({ page: page, row: row, userid: userid }).done(function(data) {
				log('历史直播', data);
				data.data.list = handleData(data.data.list);
				items.html(template('liveHistory-template', data.data.list));
				bootpag.bootpag({ page: page, total: data.pageNumber });
			});
		}
	};
})();

// 显示礼物效果
var showPayAnimation = function(id) {
	hub.emit('gift-animation', id);
};

/*///////////////////////////////////////////////////////////////////*/

//websocket推送
var liveDetailSocket = function() {
	var host = '';

	if (/yueniuwang/.test(href)) {
		host = 'http://ws.yuetougu.com';
	} else if (/yuetougu/.test(href)) {
		host = 'http://ws.yuetougu.com';
	} else {
		host = live_path;
	}

	try {
		var webSocket;
		host = host.replace('http:', '');
		webSocketPath = 'ws:' + host + '/websocket';
		webSocket = new ReconnectingWebSocket(webSocketPath);
		webSocket.debug = true;
		webSocket.timeoutInterval = 5400;
		window.onbeforeunload = function() {
			webSocket.close();
		};
		webSocket.onopen = function(event) {
			var key = '0_0_0_' + periodicalid;
			webSocket.send(key);
		};
		webSocket.onmessage = function(event) {
			var _data = eval('(' + event.data + ')');
			console.log('push', _data);
			var dataType = _data.dataType;
			//直播消息
			if (dataType == '1') {
				living.onSocket(_data);
				return;
			}

			// 送礼消息
			if (+dataType == 3) {
				sideTool.render();
				return;
			}
			// 送礼消息
			if (+dataType == 11) {
				showPayAnimation(_data.giftid);
				_data.puiblisherid = '0';
				living.onSocket(_data);
				return;
			}
			//互动信息
			if (dataType == '2') {
				hub.emit('chat-push', _data);
				// chat.onSocket(_data);
			}
		};
	} catch (e) {
		log('use timer update data...');
		//IE8使用定时器更新数据
		setInterval(function() {
			living.onTimer();
			chat.onTimer();
		}, 2000);
	}
};

/*///////////////////////////////////////////////////////////////////*/

//发布直播
var publishLiveContent = function(id, content) {
	if (!ynIsLogin) {
		layer.msg('请登录...');
		return;
	}
	if (!content) {
		layer.msg('请输入内容...');
		return;
	}
	var defer = $.Deferred();
	content = content.replace(/(<img)\s+(?:class="big_pic")?(.+?(jpg"|png"))/g, '$1  $2 class="big_pic"');
	var send = {
		periodicalid: id,
		content: content
	};
	$.post('/teacher/html/broadcasting/addBroadcasting.htm', send, function(data) {
		data = JSON.parse(data);
		if (data.status == '1') {
			layer.msg('发表成功');
			defer.resolve(data);
		} else if (data == 80001) {
			return layer.msg('您输入的内容违反相关规定，不能予以展示！');
		} else {
			return layer.msg(error[data.status]);
		}
	});
	return defer.promise();
};

//关闭直播
var closeLiveRoom = (function() {
	var close;
	return {
		init: function() {
			close = $('.close-live').show();
			close.on('click', function() {
				if (liveStatus == '0') {
					layer.confirm('确定关闭直播室？', function() {
						$.post(
							'/broadcasting/closePeriodical.htm',
							{ periodicalid: periodicalid },
							(back) => {
								if (back.status == '1') {
									layer.msg('直播室已关闭');
									window.location.href = __path + '/backstage/myLive.htm';
								} else {
									return layer.msg(error[back.status]);
								}
							},
							'json'
						);
					});
				}
			});
		}
	};
})();

//发布置顶消息
var addTop = (function() {
	var container,
		todayWin,
		textarea,
		wordCount,
		tagId = null;
	var create = (arr) => {
		return _.map(arr, (item) => {
			return `<span class="todayHeadlines" data-id="${item.id}">${item.tag_name}</span>`;
		}).join('');
	};

	var reset = function() {
		todayWin.hide();
		textarea.val('');
		todayWin.find('.todayWin-title').text('');
		wordCount.text(100);
	};
	return {
		init: function() {
			container = $('#liveDetail');
			todayWin = $('#todayWin');
			textarea = todayWin.find('textarea');
			wordCount = todayWin.find('.wordCount');
			//弹出窗口
			container.on('click', '.todayHeadlines', function() {
				var text = $(this).text();
				tagId = $(this).data('id');
				todayWin.find('.todayWin-title').text(text);
				todayWin.show();
			});

			//取消
			todayWin.on('click', '.todayWin-cancel', function() {
				reset();
			});
			//确定
			todayWin.on(
				'click',
				'.todayWin-sure',
				_.debounce(
					function() {
						var val = _.trim(todayWin.find('textarea').val());
						if (!val) {
							return layer.msg('请输入内容');
						} else if (val.length > 100) {
							return layer.msg('最多输入100字');
						}
						$.post(
							'/broadcastingTop/addTop.htm',
							{ tag_id: tagId, content: val },
							(back) => {
								if (back.status == 1) {
									layer.msg('置顶消息发布成功');
									reset();
									topDetail.render();
								} else {
									return layer.msg(error[back.status]);
								}
							},
							'json'
						);
					},
					2000,
					{ leading: true, trailing: false }
				)
			);

			//字数统计
			yn.wordCount(textarea, {
				indicate: wordCount,
				limit: 100
			});

			//鼠标悬浮
			var timer = null;
			container.find('.todayHeadlines-btn').get(0).onmouseenter = container
				.find('.todayHeadlines-wrap')
				.get(0).onmouseenter = function() {
				clearTimeout(timer);
				container.find('.todayHeadlines-wrap').show();
			};
			//鼠标移出
			container.find('.todayHeadlines-btn').get(0).onmouseleave = container
				.find('.todayHeadlines-wrap')
				.get(0).onmouseleave = function() {
				timer = setTimeout(function() {
					container.find('.todayHeadlines-wrap').hide();
				}, 500);
			};
		},
		render: function() {
			$.getJSON('/broadcastingTop/getToptag.htm', (back) => {
				if (back.status == 1) {
					if (back.data.length > 0) {
						container.find('.todayHeadlines-wrap').html(create(back.data));
					} else {
						container
							.find('.todayHeadlines-wrap')
							.html('<span class="tag_none"><i class="fa fa-info" aria-hidden="true"></i>暂无标签</span>');
					}
				} else {
					return layer.msg(error[back.status]);
				}
			});
		}
	};
})();

//有牛股
var topDetail = (function() {
	var container;

	var create = (item) => {
		return `<div class="todayTop">
            ${item.delete}
            <span class="todayTop-title">${item.tag_name}</span>
            <span class="todayTop-close"></span>
            <span class="todayTop-time">${item._create_time}</span><span class="arrow-down"></span></div>
        <div class="todayTop-content hide">${item.content}<span class="arrow-up"></span></div>`;
	};
	var handle = (item) => {
		item._create_time = item.create_time.match(/^\d{4}-([0-9\-]+)/)[1];
		item.delete = isTeacherSelf ? `<span class="todayTop-del" data-id="${item.id}">删除</span>` : '';
		return item;
	};

	return {
		init: function() {
			container = $('#live');

			//滑动显示
			container.on('mouseenter', '.todayTop-wrap', function() {
				container.find('.arrow-down').hide();
				container.find('.todayTop-content').show().stop().animate({ height: '95px' }, 400);
			});
			//鼠标移除隐藏
			container.on('mouseleave', '.todayTop-wrap', function() {
				container.find('.arrow-down').show();
				container.find('.todayTop-content').stop().animate({ height: '0' }, 400).hide();
			});

			//最小化
			container.on('click', '.todayTop-close', function() {
				container.find('.todayTop-wrap').hide();
				container.find('.today-packUp').show();
			});
			//最大化
			container.on('click', '.today-packUp', function() {
				container.find('.today-packUp').hide();
				container.find('.todayTop-wrap').show();
			});

			//删除
			container.on('click', '.todayTop-del', function() {
				var id = $(this).data('id');
				layer.confirm('确定删除此置顶消息吗？', function() {
					$.post(
						'/broadcastingTop/delTop.htm',
						{ id },
						(back) => {
							if (back.status == '1') {
								layer.msg('已删除');
								container.find('.todayTop-wrap').hide();
							} else {
								return layer.msg(error[back.status]);
							}
						},
						'json'
					);
				});
				container.find('.today-packUp').hide();
				container.find('.todayTop-wrap').show();
			});
		},
		render: function() {
			$.getJSON('/broadcastingTop/topDetail.htm', { periodicalid }, (back) => {
				if (back.status == '1' && typeof back.data != 'undefined') {
					container.find('.todayTop-wrap').show().html(create(handle(back.data)));
					container.find('.today-packUp').html(back.data.tag_name).hide();
				}
			});
		}
	};
})();

/*上下期*/
var turnPeriodical = (function() {
	var container,
		cur = null,
		data = null,
		curData = null,
		startTime = null,
		length = null,
		limit = 3,
		row = limit - 1;
	return {
		init: function() {
			container = $('.setting');
			var href = window.location.href;
			var history = href.match(/history=([0-2])/);
			cur = history ? history[1] : '0';
			if (cur == 0) {
				container.find('.next').hide();
				container.find('.current').hide();
			} else if (cur == row) {
				container.find('.prev').hide();
			}

			getMyLiveList({ page: 1, row: limit, userid: room_userid }).done(function(back) {
				data = back.data.list;
				length = back.data.list.length;
			});
			//上一期
			container.on('click', '.prev', function() {
				if (length - cur == 1 || length < cur) return;
				++cur;
				curData = data[cur];
				startTime = data[cur].starttime.substr(0, 11);
				window.location.href = `/live/liveDetailLive.htm?teacherid=${room_teacherid}&periodical=${curData.periodicalid}&time${startTime}&history=${cur}`;
			});
			//下一期
			container.on('click', '.next', function() {
				if (cur == 0) return;
				--cur;
				curData = data[cur];
				startTime = data[cur].starttime.substr(0, 11);
				window.location.href = `/live/liveDetailLive.htm?teacherid=${room_teacherid}&periodical=${curData.periodicalid}&time${startTime}&history=${cur}`;
			});
			//回到当前期
			container.on('click', '.current', function() {
				window.location.href = `${live_path}live/${room_teacherid}/`;
			});
		}
	};
})();

//我的直播列表
var getMyLiveList = function(ops) {
	ops = _.extend(
		{
			page: 1,
			row: 10
		},
		ops
	);

	var send = {
		user_id: room_userid,
		pageSize: ops.row,
		currentPage: ops.page
	};

	var defer = $.Deferred();

	$.getJSON('/center/queryMyLive.htm', send, function(data) {
		if (data.status == 1) {
			//页码
			data.pageNumber = _.max([ 1, Math.ceil(data.data.total / ops.row) ]);
			defer.resolve(data);
		}
	});
	return defer.promise();
};
