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

var error = require('e/error-type')

module.exports = (function() {
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
            submit: function() {
                window.location.reload();
            }
        },
        init: function(ops) {
            var _this = this;
            this.set();

            //UE编辑器的宽度在在初始化时根据容器设置
            ops = _.extend({
                isPop: false
            }, ops)

            //弹出框
            if (ops.isPop) {
                this.isPop = true;
                this.showPop();
            }

            this.event();

            //分类
            var categoryItems = yn.noteTypeTag()
            this.category.find('.items').html(categoryItems);

            //编辑器初始化
            this.ue = UE.getEditor('answerWindow-edit', {
                toolbars: [
                    ['forecolor']
                ],
                initialFrameHeight: 200,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true
            });

            yn.showStockList(this.stock, {
                onSelect: function(item) {
                    _this.stock.val("");
                    _this.ue.focus(true)
                    _this.ue.execCommand('insertHtml', '<span syle="color:red;font-weight:bold" class="stockWrap">' + item.stockWrap + '</span>')
                }
            })
        },
        set: function() {
            this.container = $('#answerWindow');
            this.stock = this.container.find('.search input');
            this.judge = this.container.find('.judge');
            this.judgeStock = this.judge.find('.value');
            this.category = this.container.find('.category');
            this.close = this.container.find('.close-window');
            this.wrap = this.container.find('.answerWindow-wrap');
            this.question = this.wrap.find('> .question');
        },
        render: function(noteid, ops) {

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
            this.success = ops.success || (f => f)


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
                this.question.html(ops.question).show()
            }

            //reset
            this.noteid = noteid;
            this.stockCode = ops.stockCode;
            this.stockName = ops.stockName;
            this.number = ops.number
            this.replys = ops.replys;
            this.trend = null;
            this.answerCount = ops.answerCount;


            //识别股票,显示趋势判断
            if (this.stockCode) {
                this.judgeStock.text(this.stockCode + this.stockName)
                this.judge.show();
            }

            this.container.slideDown();
        },
        pickUpCode: function(val, callback) {
            var _this = this;
            var match = val.match(/[0-9]{6}/g);
            if (!match) return;
            var code = _.find(match, function(item) {
                return yn.isStockCode(item);
            })
            if (!code) return;
            yn.queryStock(code).done(function(data) {
                if (data && data.length > 6) {
                    _this.stockcode = code;
                    _this.stockname = data[0];
                    callback(code + data[0]);
                }
            })
        },

        //弹出式窗口
        showPop: function() {
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
            })

            this.container.css({
                width: ww + "px",
                height: wh + "px",
                left: 0,
                top: 0,
                position: "fixed",
                backgroundColor: "rgba(0,0,0,0.5)"
            })
        },
        disappear: function() {
            this.container.hide();
            this.ue.setContent("");
        },
        event: function() {
            var _this = this;

            //提交
            this.container.on('click', '.submit', _.debounce(function() {
                _this.submit();
            }, 3000, { leading: true, trailing: false }))

            //分类 
            this.container.on('click', '.category .item', function() {
                $(this).parent().find('.select').removeClass('select');
                $(this).toggleClass('select');
            })

            //鉴股
            this.container.on('click', '.judge-item', function() {
                $(this).toggleClass('select');
                var id = $(this).data('id');

                //选中后可以取消
                var otherIndex = +!!!+$(this).data('id');
                $('.judge-item' + otherIndex).removeClass('select');
                _this.trend = id;
            })

            //关闭
            this.container.on('click', '.close-window', function() {
                _this.container.hide();
                _this.reset();
                yn.bodyScroll(true);
            })
        },
        reset: function() {
            this.judge.find('.select').removeClass('select');
            this.category.find('.select').removeClass('select');
            this.ue.setContent("");
            this.stock.val('');
        },
        submit: function() {
            var _this = this;
            if (this.ue.getContent().trim() == "") {
                layer.msg("回答内容不能为空");
                return;
            }

            var hasCategory = _this.category.find('.item.select').length > 0;
            if (!hasCategory && _this.answerCount == 0) {
                layer.msg("请选择问题分类")
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
            }

            //是否有回答, 有则不需要传此参数
            if (this.replys.length > 0) {
                send.is_reply = 1
            }

            //已经回答过的老师不能再回答
            if (_.indexOf(this.replys, ynTeacherId) != -1) {
                layer.msg("您已经回答过, 不能再回答...")
                return;
            }



            $.post("/consultation/answerNote.htm", send, data=> {
                data = JSON.parse(data)
                if (data.status == "1") {
                    layer.msg('回复成功');
                    this.success()
                } else() => {
                    return layer.msg(error[data.status]) }
            })
        }
    }
})()
