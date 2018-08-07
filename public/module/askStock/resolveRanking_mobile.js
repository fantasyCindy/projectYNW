/** 
 * 解答排行
 * init({wrap})
 * render({page,size})
 * onAsk({id, name})
 */


var local = require('m/lib/localData.js')

var createItems = arr => {
    return _.map(arr, item => {
        return ` <div class="answer_list">
                        <div class="answer_left">
                            <div class="photo"><img src="${item.photo}" title="${item.teachertitle}"/></div>
                            <div class="care">关注</div>
                        </div>
                        <div class="answer_middle">
                            <p class="t-name">${item.teachertitle}</p>
                            <p class="t-description">${item._description}</p>
                        </div>
                        <div class="answer_right">
                            <div class="consult" data-id="${item.answeruserid}">咨询</div>
                        </div>
                    </div>`
    }).join('')
}

var handleData = arr => {
    return _.map(arr, item => {
        item._description = item.description.substr(0, 15) + '...'
        return item
    })
}


var getData = function(ops, callback) {
    ops = _.extend({
        page: 1,
        size: 5,
    }, ops);

    var key = "resolve-ranking" + local.joinKey(ops)
    var cache = local.get(key, { timeout: 3600 })
    if (cache && cache.valid) {
        return callback(cache.data)
    }

    $.getJSON("/consultation/queryAnswerRanking.htm", {
        currentPage: ops.page,
        pageSize: ops.size
    }, function(data) {
        if (data.status == 1) {
            callback(data)
            local.set(key, data)
        }
    })
}


module.exports = (function() {
    var container, items;
    return {
        init(ops) {
            var self = this;

            container = $('#yn_askDetail');
            items = container.find('.answer')
                // container.on('click', '.consult', function() {
                //     var id = $(this).data('id');
                //     var name = $(this).prev().text();
                //     self.onAsk({ id, name })
                // })
        },
        render(ops) {
            items.show()
            getData(ops, data => {
                console.log("data",data)
                var rows = data.data.sort((a, b) => (+b.answercount) - (+a.answercount))
                console.log("=rows==",rows)
                rows = handleData(rows)
                items.html(createItems(rows));
            });
        },
        onAsk() {
            console.log('---onAsk function not override---')
        },
        hidden() {
            items.hide()
        }
    }
})()
