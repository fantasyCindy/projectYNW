/**回答提问模块
    var Ask = require('../module/ui/askTeacher.js').ask;
    $(function(){
        Ask.init();
        Ask.render(noteid, {
            stockName: null, //股票名称
            stockCode: null, //股票代码
            question: null, //问题内容
            number: null, //流水号
            answerCount: 0 //回答问题数
        });
    })
 */


var getTag = function(ops) {
    return `<div id="answerWindow" class="hide">
        <div class="answerWindow-wrap">
            <div class="title">
                <i class="icon-title fa fa-edit"></i>
                <div class="name">回答问题</div>
                <i class="close-window fa fa-times-circle"></i>
            </div>
            <div class="hide questionBar"></div>
            <div class="content">
                <div class="top">
                    <div class="category action">
                        <span class="name">选择分类：</span>
                        <div class="items inline"></div>
                    </div>
                    <div class="judge action hide">
                        <span class="stockInfo">趋势判断：<span class="value"></span></span>
                        <button class="judge-item judge-item0 up" data-id="0">看涨<i class="fa fa-long-arrow-up"></i></button>
                        <button class="judge-item  judge-item1 down" data-id="1">看跌<i class="fa fa-long-arrow-down"></i></button>
                    </div>
                </div>
                <script id="answerWindow-edit" type="text/plain"></script>
                <div class="bottom">
                    <div class="search">
                        <input type="text" placeholder="搜索股票" .s>
                        <i class="fa fa-search"></i>
                    </div>
                </div>
            </div>
            <button class="submit">提交</button>
        </div>
    </div>`
}

/*///////////////////////////////////////////////////////////////////*/

require('./askTeacher.css')
var Category = require('../askStock/category.js').category;

/*///////////////////////////////////////////////////////////////////*/

var ask = function() {
    var instance = null
    var createInstance = function() {
        return {
            init: init,
            render: render,
        }
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
                return instance
            }
            return instance
        }
    }
}()

/*///////////////////////////////////////////////////////////////////*/

var container,
    input_stock, //插入股票栏
    question, //提问栏
    ue, //编辑器
    category = null, //分类
    judgeBar, //判断股票
    option, //传入选项
    trend = "" //股票判断

function init() {
    $('body').append(getTag());
    container = $("#answerWindow");
    input_stock = container.find('.search input');
    question = container.find('.questionBar');
    judgeBar = container.find('.judge');


    //编辑器初始化
    //UE编辑器的宽度在在初始化时根据容器设置
    ue = UE.getEditor('answerWindow-edit', {
        toolbars: [
            ['forecolor', 'simpleupload']
        ],
        initialFrameHeight: 200,
        elementPathEnabled: false,
        wordCount: false,
        enableContextMenu: false,
        enableAutoSave: false,
        pasteplain: true
    });

    yn.showStockList(input_stock, {
        onSelect: function(item) {
            input_stock.val("");
            ue.focus(true)
            ue.execCommand('insertHtml', '<span syle="color:red;font-weight:bold" class="stockWrap">' + item.stockWrap + '</span>')
        }
    })

    positionBox()
    event();
}


//定位
function positionBox() {
    //居中
    var ww = $(window).width();
    var wh = $(window).height();
    var width = 800;
    var left = (ww - width) / 2;
    var top = (wh - container.height()) / 2 - 150

    container.find('.answerWindow-wrap').css({
        width: width,
        left: left,
        position: "fixed",
        background: "white",
        top: top
    })

    container.css({
        width: ww + "px",
        height: wh + "px",
        left: 0,
        top: 0,
        position: "fixed",
        backgroundColor: "gray",
        backgroundColor: "rgba(0,0,0,0.5)",
    })
}

function event() {
    var self = this;

    //提交
    container.on('click', '.submit', _.debounce(function() {
        submit();
    }, 3000, { leading: true, trailing: false }))

    //鉴股
    container.on('click', '.judge-item', function() {
        $(this).toggleClass('select');
        var id = $(this).data('id');
        //选中后可以取消
        var otherIndex = +!!!+$(this).data('id');
        $('.judge-item' + otherIndex).removeClass('select');
        trend = id;
    })

    //关闭
    container.on('click', '.close-window', function() {
        container.hide();
        yn.bodyScroll(true);
    })
}


/*///////////////////////////////////////////////////////////////////*/



function render(noteid, ops) {
    if (!noteid) {
        layer.alert("noteid为空");
        return;
    }

    option = _.extend({
        stockName: null,
        stockCode: null,
        question: null,
        number: null, //流水号
        answerCount: 0,
    }, ops);


    //第一个回答问题的显示分类
    if (option.answerCount === 0) {
        category = new Category({
            container: container.find('.category .items')
        }).render()
    }

    //显示问题
    if (option.question) {
        question.html(option.question).show()
    }

    //识别股票,显示趋势判断
    if (option.stockCode) {
        judgeBar.show();
        judgeBar.find('.value').text(stockCode + stockName)
    }

    yn.bodyScroll(false);
    container.show();
}


/*///////////////////////////////////////////////////////////////////*/

function submit() {

    var self = this;
    if (ue.getContent().trim() == "") {
        layer.msg("回答内容不能为空");
        return;
    }

    if (category && !category.validate) {
        layer.msg("请选择问题分类")
        return;
    }

    container.hide();

    var send = {
        userid: ynUserId,
        answeruserid: ynTeacherId,
        answercontent: ue.getContent(),
        answerusername: ynTeacherName,
        stock_trend: trend, //0=看涨, 1=看跌,
        note_type: category.getValue() || "",
        noteid: noteid,
        is_reply: 1,
        note_billno: option.number //流水号
    }

    $.post("/consultation/answerNote.htm", send, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            container.hide();
        }else () => {return layer.msg(data.status)}
    })
}

/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    ask: ask.getInstance()
}
