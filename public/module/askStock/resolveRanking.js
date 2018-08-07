/** 
 * 解答排行
 * init({wrap})
 * render({page,size})
 * onAsk({id, name})
 */


var local = require('m/lib/localData.js')
var error = require('e/error-type')

var createItems = arr => {
    return _.map(arr, item => {
        return ` <div class="item clear">
                    <div class="user-head fl" data-teacherid="${item.answeruserid}">
                        <a href="${live_path}live/${item.answeruserid}/" target="_blank">
                            <img src="${item.photo}" title="${item.teachertitle}"/>
                        </a>
                    </div>
                    <div class="string fl">
                        <p class="user-name">
                            <span>${item.teachertitle}</span>
                            <span class="ask-btn fr" data-id="${item.answeruserid}" data-price="${item.questionPrice}">向TA提问</span>
                        </p>
                        <p class="count">回答<span>${item.answercount}</span>有帮助<span>${item.zancount}</span></p>
                    </div>
                </div>`
    }).join('')
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
        callback(data)
        local.set(key, data)
    })
}


module.exports = (function() {
    var container, items;
    return {
        init(ops) {
            var self = this;
            var wrap = ops.wrap || $('body')
            wrap.append(`<div id="answerRanking" class="frame">
                            <div class="title"><span class="fa-online"></span><span class="text">解答排行</span></div>
                            <div class="content"></div>
                        </div>`);

            container = $('#answerRanking');
            items = container.find('.content')
            container.on('click', '.ask-btn', function() {
                var id = $(this).data('id');
                var price = $(this).data('price');
                var name = $(this).prev().text();
                self.onAsk({ id, name,price })
            })
        },
        render(ops) {
            getData(ops, data => {
                if(data.status == 1){
                    var rows = data.data.sort((a, b) => (+b.answercount) - (+a.answercount))
                    items.html(createItems(rows));
                }else{
                    return layer.msg(error[data.status])
                }
                
            });
        },
        onAsk() {
            console.log('---onAsk function not override---')
        }
    }
})()