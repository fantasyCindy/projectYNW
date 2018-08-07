/**
 * 相关问答
 * include file="../common/relativeAsk.jsp" //将标签放进相应的容器中//
 * o = new ynmodule.ReativeAsk()
 * o.init(stockName, stockCode);
 * o.render();
 */


var ReativeAsk = function() {}
ReativeAsk.prototype = {
    stockCode: null,
    stockName: null,
    page: 1,
    row: 5,
    init: function(stockName, stockCode) {
        this.stockCode = stockCode;
        this.stockName = stockName;
    },
    getData: function(callback) {
        var _this = this;
        $.getJSON("/consultation/queryAboutStocktrend.htm", {
            stockcode: _this.stockCode,
            currentPage: _this.page,
            pageSize: _this.row
        }, function(data) {
            if (data.status == 1) {
                data = data.data
                callback(data);
            }

        })
    },
    render: function() {
        if (!this.stockCode) {
            return;
        }
        var _this = this,
            container = $('#relativeChat'),
            items = container.find('.items'),
            name = container.find('.name'),
            code = container.find('.code'),
            up = container.find('.txts .up .value'),
            down = container.find('.txts .down .value'),
            upLine = container.find('.line .up'),
            downLine = container.find('.line .down'),
            href = container.find('.title a');

        container.show();
        name.text(this.stockName);
        code.text(this.stockCode);
        href.attr('href', `/marketLine.htm?stockcode=${this.stockCode}`)
        this.getData(function(data) {
            console.log("相关问答", data)

            //涨跌
            up.text(data.onCount);
            down.text(data.downCount);
            var total = (+data.onCount) + (+data.downCount);
            upLine.css('width', data.onCount / total * 100 + '%');
            downLine.css('width', data.downCount / total * 100 + "%");

            var questionData = _this.handle(data.note);
            items.html(template('old-template', questionData));
        })
    },
    handle: function(data) {
        return _.map(data, function(item) {
            item.questiontime = yn.timeFormat(item.questiontime);
            return item;
        })
    }
}


/*///////////////////////////////////////////////////////////////////*/

var createItems = arr => {
    return _.map(arr, item => {
        var link = `/consultation/${item.item.noteid}.htm`
        return `<div class="item">
                    <div class="line line1"><a href="${item.link}">${item.item.questioncontent}</a></div>
                    <div class="line line2">
                        <span class="time">${item.item.questiontime}</span>
                        <div class="answer">
                            <span class="count">${item.item.answercount}</span>
                            <span class="txt">人回答</span>
                        </div>
                    </div>
                </div>`
    }).join("")
}

function addToDom(container) {
    container.append(`<div id="relativeChat" class="old frame">
                <div class="title">
                    <a href="" target="_blank">关于<span class="name"></span><span class="code"></span>的过去问答</a>
                </div>
                <div class="content">
                    <div class="line">
                        <span class="value up"></span>
                        <span class="value down"></span>
                    </div>
                    <div class="txts">
                        <span class="txt up"><span class="value"></span>人看涨</span>
                        <span class="txt down"><span class="value"></span>人看跌</span>
                    </div>
                </div>
                <div class="items"></div>
            </div>`)
}
