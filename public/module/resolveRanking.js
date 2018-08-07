/** 
 * 解答排行
 * @return {[type]}
 */


var createItems = arr => {
    return _.map(arr, item => {
        return ` <div class="item clear">
                    <div class="user-head fl">
                        <a href="/live/liveDetailLive.htm?teacherid=${item.answeruserid}}">
                            <img src="${item.photo}}" title="${item.teachertitle}}"/>
                        </a>
                    </div>
                    <div class="string fl">
                        <p class="user-name">
                            <span>${item.teachertitle}}</span>
                            <span class="ask-btn fr" data-id="${item.answeruserid}}">向TA提问</span>
                        </p>
                        <p class="count">回答<span>${item.answercount}}</span>有帮助<span>${item.zancount}}</span></p>
                    </div>
                </div>`
    }).join('')
}


module.exports = function() {
    var container, items;
    return {
        init: function(ops) {
            var wrap = ops.wrap || $('body')
            wrap.append(`<div id="answerRanking" class="frame">
                            <div class="title"><span class="fa-online"></span><span class="text">解答排行</span></div>
                            <div class="content"></div>
                        </div>`);

            container = $('#answerRanking');
            items = container.find('.content')
            container.on('click', '.ask-btn', function() {
                var id = $(this).data('id');
                var name = $(this).prev().text();
                var element = { id, name }
            })
        },
        render: function(ops) {
            getData(ops).done(data => {
                console.log(" 解答排行", data)
                if (data.status == 1) {
                    data = data.data.sort(function(a, b) {
                        return (+b.answercount) - (+a.answercount);
                    })
                    _this.container.find('.content').html(template('answerRanking-template', data));
                }else () => {
                    return layer.msg(error[data.status])
                }

            });
        },
        handleData: function(data) {
            return _.map(data, function(item) {
                return item;
            })
        }
    }
}


var getData = function(ops) {
    ops = _.extend({
        page: 1,
        row: 5,
    }, ops);

    var defer = $.Deferred();
    $.getJSON("/consultation/queryAnswerRanking.htm", {
        currentPage: ops.page,
        pageSize: ops.row
    }, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}
