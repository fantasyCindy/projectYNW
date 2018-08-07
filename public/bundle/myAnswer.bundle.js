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

	__webpack_require__(1);
	var answerWindow = __webpack_require__(2);
	var error = __webpack_require__(3);

	//是否回复：0:否 1:是 2:以忽略 3:已过期


	$(function () {

	    if (!ynIsLogin) return yn.login.render();
	    yn.centerMenu.init({
	        render: 'my',
	        light: '我的问答'
	    });

	    //回答窗口
	    // var answerWindow = ynmodule.answerWindow();
	    answerWindow.init({
	        isPop: true
	    });

	    //页码
	    var bootpag = yn.bootpag($("#myAnswer"));
	    bootpag.on('page', function (err, num) {
	        _mention.page = num;
	        _mention.render.getNoteData({ currentPage: num, noteType: _mention.contentType });
	    });

	    var _mention = {
	        container: $("#myAnswer"),
	        statistics: null,
	        items: null,
	        page: 1,
	        row: 10,
	        totalCount: null,
	        contentType: 0, //当前显示类型
	        loading: null,
	        price: null,
	        setPriceWin: null,
	        typeText: null,
	        template: null,
	        init: function init() {
	            this.statistics = this.container.find('.statistics');
	            this.items = this.container.find('.items');
	            this.totalCount = this.container.find('.totalCount');
	            this.price = this.container.find('.askPrice');
	            this.setPriceWin = $('#setPrice');
	            this.typeText = {
	                0: "待回答",
	                1: "已回答",
	                2: "已忽略",
	                3: "已过期"
	            };
	            this.template = {
	                0: 'list-item-template',
	                1: 'list-chat-template',
	                2: 'list-item-template',
	                3: 'list-item-template'
	            };
	            _mention.loading = new ynmodule.loading();
	            _mention.loading.margin = 200;
	            _mention.loading.container = this.items;

	            this.render.statistics();
	            this.render.getPrice();
	            this.render.getNoteData({ noteType: _mention.contentType });
	            this.event();
	        },
	        render: {
	            statistics: function statistics() {
	                //统计信息
	                getStatistics().done(function (data) {
	                    data = data.data;
	                    _mention.statistics.html(template('statistics-template', data));
	                });
	            },
	            mention: function mention() {
	                _mention.loading.render();
	                //@我的
	                question_mention({ page: _mention.page, row: _mention.row }).done(function (data) {
	                    data.data.list = _mention.handleData(data.data.list);
	                    _mention.items.html(template('list-item-template', data.data.list));
	                    bootpag.bootpag({ page: _mention.page, total: data.pageNubmer });
	                    _mention.totalCount.text("共有" + data.data.total + "条提问" + this.typeText[ops.noteType]);
	                });
	            },
	            getNoteData: function getNoteData(ops) {
	                _mention.loading.render();
	                getTeacherNote(ops).done(function (data) {
	                    _mention.items.html(template(_mention.template[_mention.contentType], _mention.handleData(data.data.list)));
	                    bootpag.bootpag({ page: ops.currentPage, total: data.pageNubmer });
	                    _mention.totalCount.text("共有" + data.data.total + "条提问" + _mention.typeText[_mention.contentType]);
	                });
	            },
	            getPrice: function getPrice() {
	                _getPrice().done(function (data) {
	                    var price = data.data;
	                    _mention.price.html('￥' + price);
	                });
	            }
	        },

	        handleData: function handleData(data) {
	            return _.map(data, function (item) {
	                item.questiontime = item.questiontime ? yn.timeFormat(item.questiontime) : "";
	                item.answercontent = item.answercontent ? yn.filterHTML(item.answercontent) : "";
	                item.zancount = item.zancount || "0";
	                item.price = item.questionPrice ? item.questionPrice : 0;
	                item.overdue = item.is_reply == 3 ? "hide" : "";
	                item.ignore = item.is_reply == 2 ? "hide" : "";
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
	        },

	        event: function event() {

	            var _this = this;

	            //回答
	            this.container.on('click', '.askButton', function () {
	                var question = $(this).parents('.list-item').find('.questioncontent').text();
	                var noteid = $(this).data('noteid');
	                var code = $(this).data('code');
	                var name = $(this).data('name');
	                answerWindow.render(noteid, {
	                    stockName: name,
	                    stockCode: code,
	                    number: $(this).data('number'),
	                    question: question
	                });
	            });

	            //忽略
	            this.container.on('click', '.ignoreButton', function () {
	                var self = this;
	                layer.confirm('确定忽略该提问吗', function () {
	                    var noteid = $(self).data('noteid');
	                    $.post("/consultation/updateNoteIsReply.htm", { noteid: noteid }, function (back) {
	                        back = JSON.parse(back);
	                        if (back.status == 1) {
	                            layer.msg('已忽略');
	                            setTimeout(function () {
	                                _mention.render.getNoteData({ currentPage: _mention.page, noteType: _mention.contentType });
	                            }, 1000);
	                        }
	                    });
	                });
	            });
	            //分类切换
	            this.container.on('click', '.category td', function () {
	                if ($(this).attr('class').indexOf('select') != -1) return;
	                $(this).parent().find('.select').removeClass('select');
	                $(this).addClass('select');
	                _mention.contentType = $(this).data('type');
	                _mention.render.getNoteData({ currentPage: 1, noteType: _mention.contentType });
	            });

	            // 详情
	            this.container.on('click', 'span.trigger-detail', function () {
	                var noteid = $(this).data('noteid');
	                open(ask_path + "consultation/" + noteid + '.htm');
	            });

	            //设置价格
	            this.container.on('click', '.setting-price', function () {
	                _this.setPriceWin.show();
	            });
	            // //关闭设置价格弹窗
	            _this.setPriceWin.on('click', '.closeWin', function () {
	                closePriceWin(_this.setPriceWin);
	            });
	            // //确认修改
	            _this.setPriceWin.on('click', '.submit', function () {
	                var val = _this.setPriceWin.find('.setPrice-num').val().trim();
	                if (!val) return layer.msg('请输入价格');
	                if (!(/^[0-9]+[0-9]*]*$/.test(val) && +val <= 200)) return layer.msg('请设置价格，范围0~200的整数');
	                $.post('/teacher/updateQuestionsPrice.htm', { questionsPrice: val }, function (back) {
	                    back = JSON.parse(back);
	                    if (back.status == 1) {
	                        layer.msg('设置成功');
	                        closePriceWin(_this.setPriceWin);
	                        _mention.render.getPrice();
	                    } else if (back.status == 50004) {
	                        return layer.msg('本月修改次数已达上限');
	                    }
	                });
	            });
	        }

	        //reset set price window
	    };function closePriceWin(obj) {
	        obj.hide();
	        obj.find('.setPrice-num').val('');
	    }

	    ///////////////////////////////////////////////////////////////////
	    //获取老师提问价格
	    function _getPrice() {
	        var defer = $.Deferred();
	        $.getJSON('/teacher/getQuestionsPrice.htm', function (back) {
	            if (back.status == 1) {
	                defer.resolve(back);
	            } else (function () {
	                return layer.msg(error[back.status]);
	            });
	        });
	        return defer.promise();
	    }
	    _mention.init();
	});

	//查询老师的回答问题信息
	function getStatistics(ops) {
	    ops = _.extend({
	        teacherId: ynTeacherId
	    }, ops);

	    var defer = $.Deferred();
	    $.getJSON("/center/queryTeacherAskStock.htm", {
	        answeruserid: ops.teacherId,
	        t: yn.timestamp()
	    }, function (data) {
	        if (data.status == 1) {
	            defer.resolve(data);
	        } else (function () {
	            return layer.msg(error[data.status]);
	        });
	    });
	    return defer.promise();
	}

	//根据type获取相关类型问答
	function getTeacherNote(ops) {
	    ops = _.extend({
	        pageSize: 10,
	        currentPage: 1
	    }, ops);
	    var defer = $.Deferred();
	    $.getJSON('/consultation/teacherNoteType.htm', ops, function (back) {
	        if (back.status == 1) {
	            back.pageNubmer = _.max([1, Math.ceil(+back.data.total / ops.pageSize)]);
	            defer.resolve(back);
	        } else {
	            return layer.msg(error[back.status]);
	        }
	    });
	    return defer.promise();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	// 设置菜单高亮

	yn.navigation.name = ynconfig.navigation.g;
	yn.logout.path = __path;
	if (!ynIsLogin) {
	    setTimeout(function () {
	        yn.login.render();
	    }, 100);
	    yn.login.onClose = function () {
	        location.href = __path;
	    };
	}

	/*----

	个人中心菜单

	1.初始化
	yn.centerMenu.init({
	    render:'my',
	    light:'我的观点'
	}) 

	1-2.渲染
	yn.centerMenu.render({type:'my'}) 

	----*/
	yn.centerMenu = function () {
	    var container, items, title, light;

	    var createItems = function createItems(arr) {
	        return _.map(arr, function (item) {
	            var select = _.trim(item.menuname) == light ? "select" : "";
	            return "<a class=\"item " + select + "\" id=\"" + item.menu_id + " \" href=\"/" + item.menuurl + "\"><span class=\"txt \">" + item.menuname + "</span><i class=\"fa fa-angle-right \"></i></a>";
	        }).join("");
	    };
	    return {
	        init: function init(ops) {
	            container = $('#centerMenu');
	            items = container.find('.items');
	            title = container.find('.title .name');
	            light = ops.light || "";
	            ops.render && this.render({ type: ops.render });
	        },
	        render: function render(ops) {
	            ops = _.extend({ type: "center" }, ops);
	            var types = {
	                center: { title: "个人设置", url: "/menu/queryWebUserMenu.htm" },
	                my: { title: "个人中心", url: "/menu/queryWebUserMyMenu.htm" }
	            };

	            var type = types[ops.type];
	            var url = type.url;
	            title.text(type.title);
	            new yn.loading({ container: items, margin: 200 }).render();
	            $.getJSON(url, { user_id: ynUserId }, function (data) {
	                return items.html(createItems(data));
	            });
	        }
	    };
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 回答问题
	 * include /common/moudule-answer.jsp
	 * 
	 * answerWindow.init({isPop:false}); //确定显示类型是否弹出式
	 * answerWindow.render(noteid, {
	 *      stockName: null, 股票名称
	        stockCode: null, 股票代码
	        question: null, 如果是弹出式窗口需要显示提问
	        replys: [], 包含已回答老师ID
	        number: null 流水号
	 * })
	 */

	var error = __webpack_require__(3);

	module.exports = function () {
	    return {
	        container: null,
	        wrap: null,
	        stock: null, //插入股票
	        question: null,
	        judge: null,
	        judgeStock: null,
	        category: null,
	        noteid: null,
	        ue: null,
	        stockName: null,
	        stockCode: null,
	        replys: [],
	        close: null,
	        isPop: false,
	        trend: null,
	        answerCount: 0,
	        handler: {
	            submit: function submit() {
	                window.location.reload();
	            }
	        },
	        init: function init(ops) {
	            var _this = this;
	            this.set();

	            //UE编辑器的宽度在在初始化时根据容器设置
	            ops = _.extend({
	                isPop: false
	            }, ops);

	            //弹出框
	            if (ops.isPop) {
	                this.isPop = true;
	                this.showPop();
	            }

	            this.event();

	            //分类
	            var categoryItems = yn.noteTypeTag();
	            this.category.find('.items').html(categoryItems);

	            //编辑器初始化
	            this.ue = UE.getEditor('answerWindow-edit', {
	                toolbars: [['forecolor']],
	                initialFrameHeight: 200,
	                elementPathEnabled: false,
	                wordCount: false,
	                enableContextMenu: false,
	                enableAutoSave: false,
	                pasteplain: true
	            });

	            yn.showStockList(this.stock, {
	                onSelect: function onSelect(item) {
	                    _this.stock.val("");
	                    _this.ue.focus(true);
	                    _this.ue.execCommand('insertHtml', '<span syle="color:red;font-weight:bold" class="stockWrap">' + item.stockWrap + '</span>');
	                }
	            });
	        },
	        set: function set() {
	            this.container = $('#answerWindow');
	            this.stock = this.container.find('.search input');
	            this.judge = this.container.find('.judge');
	            this.judgeStock = this.judge.find('.value');
	            this.category = this.container.find('.category');
	            this.close = this.container.find('.close-window');
	            this.wrap = this.container.find('.answerWindow-wrap');
	            this.question = this.wrap.find('> .question');
	        },
	        render: function render(noteid, ops) {

	            if (!noteid) {
	                layer.msg("noteid is null...");
	                return;
	            }
	            ops = _.extend({
	                stockName: null,
	                stockCode: null,
	                question: null,
	                replys: [], // 已经回答过的老师
	                number: null, //流水号
	                answerCount: 0
	            }, ops);

	            //回调
	            this.success = ops.success || function (f) {
	                return f;
	            };

	            //已经回答过的老师不再显示回答窗口
	            if (_.indexOf(ops.replys, ynTeacherId) != -1) {
	                return;
	            }

	            //如果已经有回答, 则不显示分类操作
	            if (+ops.answerCount > 0) {
	                this.category.hide();
	            } else {
	                this.category.show();
	            }

	            //弹出式窗口
	            if (this.isPop) {
	                yn.bodyScroll(false);
	            }
	            if (ops.question) {
	                this.question.html(ops.question).show();
	            }

	            //reset
	            this.noteid = noteid;
	            this.stockCode = ops.stockCode;
	            this.stockName = ops.stockName;
	            this.number = ops.number;
	            this.replys = ops.replys;
	            this.trend = null;
	            this.answerCount = ops.answerCount;

	            //识别股票,显示趋势判断
	            if (this.stockCode) {
	                this.judgeStock.text(this.stockCode + this.stockName);
	                this.judge.show();
	            }

	            this.container.slideDown();
	        },
	        pickUpCode: function pickUpCode(val, callback) {
	            var _this = this;
	            var match = val.match(/[0-9]{6}/g);
	            if (!match) return;
	            var code = _.find(match, function (item) {
	                return yn.isStockCode(item);
	            });
	            if (!code) return;
	            yn.queryStock(code).done(function (data) {
	                if (data && data.length > 6) {
	                    _this.stockcode = code;
	                    _this.stockname = data[0];
	                    callback(code + data[0]);
	                }
	            });
	        },

	        //弹出式窗口
	        showPop: function showPop() {
	            //居中
	            var ww = $(window).width();
	            var wh = $(window).height();
	            var width = 800;
	            var left = (ww - width) / 2;
	            var top = (wh - this.container.height()) / 2 - 150;
	            this.close.show();

	            this.wrap.css({
	                width: width,
	                left: left,
	                position: "fixed",
	                background: "white",
	                top: top
	            });

	            this.container.css({
	                width: ww + "px",
	                height: wh + "px",
	                left: 0,
	                top: 0,
	                position: "fixed",
	                backgroundColor: "rgba(0,0,0,0.5)"
	            });
	        },
	        disappear: function disappear() {
	            this.container.hide();
	            this.ue.setContent("");
	        },
	        event: function event() {
	            var _this = this;

	            //提交
	            this.container.on('click', '.submit', _.debounce(function () {
	                _this.submit();
	            }, 3000, { leading: true, trailing: false }));

	            //分类 
	            this.container.on('click', '.category .item', function () {
	                $(this).parent().find('.select').removeClass('select');
	                $(this).toggleClass('select');
	            });

	            //鉴股
	            this.container.on('click', '.judge-item', function () {
	                $(this).toggleClass('select');
	                var id = $(this).data('id');

	                //选中后可以取消
	                var otherIndex = +!!!+$(this).data('id');
	                $('.judge-item' + otherIndex).removeClass('select');
	                _this.trend = id;
	            });

	            //关闭
	            this.container.on('click', '.close-window', function () {
	                _this.container.hide();
	                _this.reset();
	                yn.bodyScroll(true);
	            });
	        },
	        reset: function reset() {
	            this.judge.find('.select').removeClass('select');
	            this.category.find('.select').removeClass('select');
	            this.ue.setContent("");
	            this.stock.val('');
	        },
	        submit: function submit() {
	            var _this2 = this;

	            var _this = this;
	            if (this.ue.getContent().trim() == "") {
	                layer.msg("回答内容不能为空");
	                return;
	            }

	            var hasCategory = _this.category.find('.item.select').length > 0;
	            if (!hasCategory && _this.answerCount == 0) {
	                layer.msg("请选择问题分类");
	                return;
	            }

	            this.container.hide();

	            var send = {
	                userid: ynUserId,
	                answeruserid: ynTeacherId,
	                answercontent: _this.ue.getContent(),
	                answerusername: ynTeacherName,
	                stock_trend: _this.trend, //0=看涨, 1=看跌,
	                note_type: _this.category.find('.item.select').data('id'),
	                noteid: _this.noteid,
	                is_reply: 1,
	                note_billno: _this.number //流水号


	                //是否有回答, 有则不需要传此参数
	            };if (this.replys.length > 0) {
	                send.is_reply = 1;
	            }

	            //已经回答过的老师不能再回答
	            if (_.indexOf(this.replys, ynTeacherId) != -1) {
	                layer.msg("您已经回答过, 不能再回答...");
	                return;
	            }

	            $.post("/consultation/answerNote.htm", send, function (data) {
	                data = JSON.parse(data);
	                if (data.status == "1") {
	                    layer.msg('回复成功');
	                    _this2.success();
	                } else (function () {
	                    return layer.msg(error[data.status]);
	                });
	            });
	        }
	    };
	}();

/***/ }),
/* 3 */
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

/***/ })
/******/ ]);