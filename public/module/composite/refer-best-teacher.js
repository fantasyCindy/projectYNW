/*///////////////////////////////////////////////////////////////////*/

var Path = require('m/lib/path.js')
require('./refer-best-teacher.css')
var local = require('m/lib/localData.js')
var error = require('e/error-type');
/*///////////////////////////////////////////////////////////////////*/

module.exports = (function() {

    var query = {
        pageSize: 5,
        currentPage: 1,
    }

    var handleData = function(arr) {
        return _.map(arr, item => {
            item._link = Path.live.refer(item.teacherid);
            return item;
        })
    }

    var create = function(data) {
        return `<div class="refer-best-teacher">
            <a class="block" href="${live_path}refer/${data.teacherid}/" target='_blank'>
                <div class="avatar fl">
                    <img src="${data.photo}" />
                </div>
                <div class="info fl">
                    <div class="name">${data.title}</div>
                </div>
                <div class="info fr">
                    <div class="rcount">${data.rcount}</div>
                    <div class="subject">发布内参</div>
                </div>
            </a>
        </div>`
    }


    var getData = callback => {
        var key = 'refer-best-teacher' + local.joinKey(query)
        var cache = local.get(key, { timeout: 3600 })
        if (cache && cache.valid) {
            return callback(cache.data)
        }
        $.getJSON('/center/reference/teacher.htm', {
            user_id: ynUserId,
            pageSize: query.pageSize,
            currentPage: query.currentPage
        }, data => {
            callback(data)
            local.set(key, data)
        })
    }

    return {
        render: function(ops) {
            _.extend(query, ops)
            getData(data => {
                if (data.status == 1) {
                    var html = _.map(handleData(data.data), item => create(item)).join("");
                    ops.container.html(html);
                }else () => {return layer.msg(error[data.status])}

            })
        }
    }
})()
