require('./refer-hot.css')
var Path = require('m/lib/path.js');

/*///////////////////////////////////////////////////////////////////*/


module.exports = (function() {

    var create = function(item) {
        return `<div class="refer-hot-item">
                    <div class="refer-hot-title">
                        <span class="refer-item-icon"></span>
                        <a class="value" href="${item._link}" target='_blank'>${item._title}</a>
                    </div>
                    <div class="refer-hot-info">
                        <span class="name fl">${item.puiblisher}</span>
                        <span class="time fr">${item._time}</span>
                        <div style="clear:both"></div>
                    </div>
                </div>`
    }


    var url = {
        new: '/center/reference/newList.htm', //最新内参
        hot: '/center/reference/hotList.htm', //热门内参
        hd: '/center/reference/hdList.htm' //互动最多
    }
    var handleData = arr => {
        return _.map(arr, item => {
            var charactors = item.productInfo.match(/[\u4e00-\u9fa5\w]/g)
            item._title = charactors.join("");
            item._time = yn.timeFormat(item.pubtime);
            item._link = `/reference/${item.id}.htm`;
            return item
        })
    }

    return {
        pageSize: 5,
        currentPage: 1,
        render: function(ops) {
            _.extend(this, ops)
            $.getJSON(url[ops.type], {
                user_id: ynUserId,
                pageSize: this.pageSize,
                currentPage: this.currentPage
            }, data => {
                var rows = handleData(data.rows);
                var html = _.map(rows, item => create(item)).join("")
                ops.container.html(html)
                var a = $('.refer-hot .refer-hot-item');
            })
        }
    }
})()
