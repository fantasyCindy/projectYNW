/**
 * 提问窗口

1.导入模块
<%@  include file="common/moudule-ask.jsp" %>
var askWindow = require('../module/askStock/askWindow.js') 

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

require('./askWindow.css');
var queryStock = require('../query-stock.js')
var stockList = require('~/ui/stockList-1.2.js');
var error = require('e/error-type')
var container,
    questionBar,
    guideWin,
    option, //渲染的选项
    canAskTimes = 3, //可提问次数
    filterTeachers //所有不应显示的老师

/*///////////////////////////////////////////////////////////////////*/


function init() {
    var self = this
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

    container.on('click', '.close-win', function() {
        container.hide();
        reset();
    })

    //关闭引导直播窗口
    guideWin.on('click', '.ask-close', function() {
        guideWin.hide()
    })

    //interactive
    seachBar.onChange = data => searchResult.render(data);
    seachBar.onMax = () => searchResult.hide();
    searchResult.onSelect = data => seachBar.append({
        id: data.id,
        name: data.name
    })
    onlineTeacher.onSelect = data => seachBar.append({
        id: data.id,
        name: data.name
    })

    //提问提交
    container.on('click', '.submit button', function() {

        var errorHandle = {
            seachBar: () => layer.msg("请选择投资顾问"),
            textarea: () => layer.msg("请输入您的问题")
        }

        var query = [
            { key: 'seachBar', assert: seachBar.assert() },
            { key: 'textarea', assert: textarea.assert() }
        ]

        var errorItem = _.find(query, item => item.assert)
        if (errorItem) {
            errorHandle[errorItem.key]()
            return;
        }

        if (textarea.getValue().trim().length < 3) {
            return layer.msg('提问至少3个字')
        }
        container.hide();
        var send = {
            questionuserid: ynUserId,
            teacherids: seachBar.getValue(),
            questioncontent: textarea.getValue(),
            stockcode: stockTrend.getValue().code,
            stockname: stockTrend.getValue().name,
            note_source: 0 // 来源
        }
        $.post("/consultation/questionNote.htm", send, function(data) {
            data = JSON.parse(data)
            if (data.status == '80000') {
                return layer.msg('该账号被用户举报，涉嫌违规操作，目前不能向投顾问股')
            } else if (data == '80001') {
                return layer.msg('您输入的内容违反相关规定，不能予以展示!')
            } else if (data.status == "1") {
                // textarea.trigger('keyup');
                layer.msg("提问成功, 牛人正在为您解答!");
                self.onClick && self.onClick({
                    success: 'success'
                })
            } else {
                return layer.msg(error[data.status])
            }
        })
    })

    //邀请提交
    container.on('click', '.invite-submit', function() {
        container.hide();
        var send = {
            questionuserid: ynUserId,
            teacherids: seachBar.getValue(),
            note_billno: option.invite.number
        }
        $.post("/consultation/invitationTeacher.htm", send, function(data) {
            layer.msg(data == "success" ? "邀请成功" : `错误:${data}`);
        })
    })
}


function render(ops) {
    if (!ynIsLogin) return yn.login.render();
    if (ynTeacherId) return layer.msg("老师不能提问!");
    option = _.extend({
        select: false, //向某个老师提问
        invite: false, //是否为邀请回答
        filter: [] //过滤数组, 这里的老师不会出现在列表中(已经回答过的老师/已经邀请过的老师)
    }, ops)

    //处理选项
    var optionHandler = {
        select: () => seachBar.add({ id: option.select.id, name: option.select.name }),
        invite: () => {
            questionBar.hide();
            onlyInvite.show();
        }
    }

    queryAskTimes(count => {
        reset();
        // var animate = function() {
        //     var box = $('.transition.expandIn')
        //     if (!box.hasOwnProperty('animateCss')) {
        //         addFn()
        //     }
        //     box.animateCss('zoomIn')
        // }
        // animate()
        container.show().velocity('transition.expandIn', { duration: 300 });
        container.show();
        container.find('.times .value').text(count); //显示次数
        option.select && optionHandler.select(); //选中老师
        option.invite && optionHandler.invite(); //如果是邀请回答
        option.filter.push(ynTeacherId);
        filterTeachers = function() {
            var temp = option.filter.join("-");
            return `-${temp}-`;
        }();
        onlineTeacher.render();
    })
}

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

var onlyInvite = function() {
    var el = {};
    return {
        init: function() {
            el.container = container.find('.onlyInvite');
            el.button = el.container.find('button');
            el.button.click(() => this.onSubmit())
        },
        show: () => el.container.show(),
        hide: () => el.container.hide(),
        onSubmit: () => log("onSubmit is not override...")
    }
}()


//搜索栏
var seachBar = function() {
    var el = {
        container: null,
        select: null,
        input: null
    };
    var selected = [];
    var createItem = (id, name) => `<span class="item" data-id="${id}">@${name}<i class="fa fa-times-circle close-invite"></i></span>`;

    //查询所有老师
    var queryTeacher = key => {
        key = key || "";
        var defer = $.Deferred();
        $.getJSON("/consultation/queryLikeTeacher.htm", { likename: key }, data => defer.resolve(data))
        return defer.promise()
    }

    var errorHandleTable = {
        "exist": () => layer.msg("已存在"),
        "full": () => layer.msg("最多能邀请三位投顾回答!"),
        "self": () => layer.msg("不能向自己提问")
    }

    return {
        init: function() {
            var self = this;
            el.container = container.find('.invite');
            el.select = el.container.find('.select');
            el.input = el.container.find('input');

            //删除选择
            el.container.on('click', '.close-invite', function() {
                var parent = $(this).parent();
                var id = parent.data('id');
                parent.remove();
                var index = _.indexOf(selected, id);
                selected.splice(index, 1);
            })

            //搜索 
            el.input.keyup(_.debounce(function() {
                var val = $(this).val().replace("@", '');
                if (!/[\u4e00-\u9fa5]+/.test(val)) return;
                queryTeacher(val).done(data => self.onChange(data))
            }, 1000)).focus(() => queryTeacher("").done(data => self.onChange(data)));

            // 清空搜索字符
            el.input.blur(function() {
                $(this).val("")
            })

        },

        //清空
        clear: function() {
            el.input.val("");
            el.select.empty();
            selected = [];
        },

        //添加
        add: function(info) {
            if (+info.id == +ynTeacherId) {
                errorHandleTable.self();
                return;
            }
            el.select.html(createItem(info.id, info.name))
            selected.push(+info.id); //转成数字
        },

        append: function(info) {
            var query = [
                { key: "self", assert: +info.id == +ynTeacherId },
                { key: "exist", assert: _.indexOf(selected, info.id) != -1 },
                { key: "full", assert: selected.length == 3 }
            ]
            var errItem = _.find(query, item => item.assert)
            if (errItem) {
                errorHandleTable[errItem.key]();
                return;
            }

            el.select.append(createItem(info.id, info.name))
            selected.push(info.id);
            if (selected.length == 3) {
                this.onMax()
            }

        },
        getValue: function() {
            //获取邀请的老师id
            var result = ""
            el.select.find('.item').each(function() {
                result += $(this).data('id') + "&"
            })
            return result.replace(/&$/, "");
        },
        assert: () => el.select.find('.item').length < 1, //验证
        onChange: () => log("onChange  note override..."),
        onMax: () => log("onMax : note override...")
    }
}()


//搜索结果
var searchResult = function() {
    var el = {};
    return {
        init: function() {
            var self = this;
            el.container = container.find('.list');
            el.title = el.container.find('.info .value');
            el.items = el.container.find('.list-wrap');

            el.container.on('click', '.close', () => this.hide())
            el.container.on('click', '.item', function() {
                self.onSelect({
                    id: $(this).data('id'),
                    name: $(this).data('name')
                })
            })
        },
        render: function(data) {
            this.show();
            var rows = data.rows;
            el.title.text(rows.length);
            rows = _.filter(rows, item => filterTeachers.indexOf(`-${item.answeruserid}-`) == -1);
            el.items.html(template('online-teacher-template', rows));
        },
        onSelect: data => log(`error : searchResult onSelect is not override...`),
        show: () => el.container.show(),
        hide: () => el.container.hide()
    }
}()


//内容栏
var textarea = function() {
    var el = {};
    return {
        init: function() {
            el.input = container.find('textarea');
            el.input.keyup(function() {
                var val = $(this).val();
                parseStock(val, info => info ? stockTrend.render(info) : stockTrend.hide())
            })
        },
        clear: function() {
            el.input.val("")
        },
        getValue: () => el.input.val(),
        assert: () => !_.trim(el.input.val())
    }
}()


//股票趋势判断
var stockTrend = function() {
    var el = {},
        code = "",
        name = "";
    return {
        init: function() {
            el.container = container.find('.msg');
            el.code = el.container.find('.msg-code');
        },
        hide: () => {
            el.container.hide();
            code = name = "";
        },
        render: info => {
            code = info.code;
            name = info.name;
            el.code.text(code + name);
            el.container.show();
        },
        getValue: () => ({ code: code, name: name })
    }
}()



//在线老师
var onlineTeacher = function() {
    var el = {}
    return {
        init: function() {
            var self = this;
            el.items = container.find('.right .items');
            el.items.on('click', '.item', function() {
                self.onSelect({
                    id: $(this).data('id'),
                    name: $(this).data('name')
                })
            })
        },
        render: function() {
            $.getJSON(`/consultation/queryOnlineTeacher.htm?pageSize=20&currentPage=1&userid=${ynUserId}`, data => {
                if (data.status == 1) {
                    var rows = data.data.list;
                    rows = _.filter(rows, item => filterTeachers.indexOf(`-${item.answeruserid}-`) == -1);
                    el.items.html(template('online-teacher-template', rows));
                }else () => {return layer.msg(error[data.status])}

            })
        },
        onSelect: () => log("onlineTeacher select...")
    }
}()



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
    }, function(data) {
        var remain = canAskTimes - +data.rows;
        if (remain < 1) {
            // layer.msg("今天已达到提问提问次数上限")
            guideWin.show()
            return;
        }
        callback(remain);
    })
}

var timestamp = function() {
    return new Date().getTime();
}

//字数统计
function wordCount() {
    var trigger = container.find('textarea');
    var el = container.find('.wordCount .value');
    yn.wordCount(trigger, {
        indicate: el
    })
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
}

//显示股票列表
var showStockList = function() {
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
            })
        }
    }
}();



//识别股票
//如果查询成功回调callback({code, name})

function parseStock(val, callback) {
    var match = val.match(/[0-9]{6}/g);
    if (!match) return callback(false);

    //简单验证
    var code = _.find(match, item => isStockCode(item))
    if (!code) return callback(false)

    //查询新浪验证
    queryStock(code).done(data => {
        if (data && data.length < 6) return callback(false);
        callback({
            code: code,
            name: data[0]
        })
    })
}

//居中对齐
function layoutBox() {
    var w = $(window).width();
    var h = $(window).height();
    var cw = container.outerWidth()
    var ch = container.outerHeight()
    container.css({
        left: (w - cw) / 2 + "px",
        top: (h - ch) / 2 + "px"
    })
}


//查询用户邀请过的老师, 已经邀请过的老师不能再次邀请
function queryDidAnswer(callback) {
    $.getJSON("/consultation/queryNoteInvitationTeachers.htm", {
        Invitation_user_id: ynUserId,
        note_billno: option.invite.number
    }, function(data) {
        var did = [];
        Array.prototype.push.apply(did, _.pluck(data.rows.teachers, 'teacherid'));
        callback(did);

    })
}


var isStockCode = function(value) {
    value = String(value);
    var reg = /[036][0-9]{5}/
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}




/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    init: init,
    render: render
}