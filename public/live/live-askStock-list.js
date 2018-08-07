var answerWindow = require('m/askStock/answerWindow.js');
require('./live-askStock-list.css');

var handleData = function(data) {
	return _.map(data, function(item) {
		item.questiontime = item.questiontime ? yn.timeFormat(item.questiontime) : '';
		item.answercontent = item.answercontent ? yn.filterHTML(item.answercontent) : '';
		item.zancount = item.zancount || '0';
		item.price = item.questionPrice ? item.questionPrice : 0;
		item.overdue = item.is_reply == 3 ? 'hide' : '';
		item.ignore = item.is_reply == 2 ? 'hide' : '';
		if (item.answercontent && item.answercontent.length > 50) {
			item._answercontent = item.answercontent.substr(0, 50) + '..';
		} else {
			item._answercontent = item.answercontent;
		}
		if (item.questioncontent && item.questioncontent.length > 50) {
			item._questioncontent = item.questioncontent.substr(0, 50) + '..';
		} else {
			item._questioncontent = item.questioncontent;
		}
		return item;
	});
};

module.exports = (function() {
	var container,
		total,
		items,
		type = 0,
		page = 1,
		row = 10;
	var bootpag;
	var typeText = {
		0: '待回答',
		1: '已回答',
		2: '已忽略',
		3: '已过期'
	};
	var templateList = {
		0: 'list-item-template',
		1: 'list-chat-template',
		2: 'list-item-template',
		3: 'list-item-template'
	};
	return {
		init: function() {
			var _this = this;
			container = $('#teacher-ask-win');
			items = container.find('.ask-items');
			total = container.find('.totalCount');

			//页码
			bootpag = yn.bootpag($('.teacher-ask-container'));
			bootpag.on('page', function(err, num) {
				page = num;
				_this.render({ currentPage: num, noteType: type });
			});

			//点击内容以外的区域消失
			container.click(function() {
				container.hide();
				type = 0;
				container.find('.menu-item').removeClass('select');
				container.find('.menu-item.wait').addClass('select');
				answerWindow.hidden();
			});
			container.on('click', '.teacher-ask-wrap', function() {
				return false; //阻止冒泡
			});
			//切换
			container.on('click', '.menu-item', function() {
				if ($(this).hasClass('select')) return;
				$(this).addClass('select').siblings().removeClass('select');
				type = $(this).data('type');
				_this.render({ currentPage: 1, noteType: type });
			});
			//忽略
			container.on('click', '.ignoreButton', function() {
				var self = this;
				layer.confirm('确定忽略该提问吗', function() {
					var noteid = $(self).data('noteid');
					$.post('/consultation/updateNoteIsReply.htm', { noteid: noteid }, (back) => {
						back = JSON.parse(back);
						if (back.status == 1) {
							layer.msg('已忽略');
							setTimeout(function() {
								_this.render({ currentPage: page, noteType: type });
							}, 1000);
						}
					});
				});
			});

			//回答
			container.on('click', '.askButton', function() {
				var question = $(this).parents('.list-item').find('.questioncontent').text();
				var noteid = $(this).data('noteid');
				var code = $(this).data('code');
				var name = $(this).data('name');
				var num = $(this).data('number');
				answerWindow.render(noteid, {
					stockName: name,
					stockCode: code,
					number: num,
					question: question,
					success: function() {
						_this.render({ currentPage: page, noteType: type });
					}
				});
			});
		},
		render(ops) {
			container.show();
			ops = _.extend(
				{
					pageSize: 10,
					currentPage: 1,
					noteType: 0
				},
				ops
			);
			getTeacherNote(ops).done((data) => {
				items.html(template(templateList[type], handleData(data.data.list)));
				bootpag.bootpag({ page: ops.currentPage, total: data.pageNubmer });
				total.html('共有' + data.data.total + '条提问' + typeText[type]);
			});
		}
	};
})();

//根据type获取相关类型问答
function getTeacherNote(ops) {
	ops = _.extend(
		{
			pageSize: 10,
			currentPage: 1,
			noteType: 0
		},
		ops
	);
	var defer = $.Deferred();
	$.getJSON('/consultation/teacherNoteType.htm', ops, (back) => {
		if (back.status == 1) {
			back.pageNubmer = _.max([ 1, Math.ceil(+back.data.total / ops.pageSize) ]);
			defer.resolve(back);
		} else {
			return layer.msg(error[back.status]);
		}
	});
	return defer.promise();
}

$(function() {
	answerWindow.init({
		isPop: false
	});
});
