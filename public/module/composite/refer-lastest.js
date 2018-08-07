/*
	最新内参

	var referLastest = require('../module/composite/refer-lastest.js');
    referLastest.render({
        container: $("#refer"),
        row: 3
    })

*/

var Path = require('../lib/path.js');

var create = data => {
    return `<div class="refer-lastest-item">
            <div class="title">${data._title}</div>
            <div class="icon ${data._icon} status"></div>
            <div class="cover">
                <img src="${data.productImg}" />
            </div>
            <div class="time">服务周期：${data._startTime}-${data._endTime}</div>
            <div class="actions">
                <a class="link" href="${data._link}" target="_blank">去订阅</a>
            </div>
        </div>`
}

require('./refer-lastest.css')

module.exports = (function() {

    var param = {
        row: 3,
        page: 1
    }

    var handleData = function(rows) {
        var getTime = time => time.match(/^[^\s]+/)[0].replace(/[\-/]/g, '.');
        return _.map(rows, item => {
            item._title = (() => {
                var len = item.title.length;
                if (len < 10) return item.title;
                return item.title.substr(0, 10) + '..'
            })()
            item._startTime = getTime(item.startTime);
            item._endTime = getTime(item.endTime);
            item._link = `reference/${item.id}.htm`;
            item._icon = ["update", "ready", "end"][+item.productStatus]
            return item;
        })
    }

    return {
        render: function(ops) {
            _.extend(param, ops);
            $.getJSON("/center/reference/newList.htm", { pageSize: ops.row, currentPage: ops.page }, _data => {
                console.log("内参数", _data);
                var rows = handleData(_data.rows);
                var html = _.map(rows, item => create(item)).join("");
                ops.container.html(html)
            })
        }
    }
})()
