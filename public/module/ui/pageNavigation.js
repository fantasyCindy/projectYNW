/*
    pageNavigation = require('../module/ui/pageNavigation.js');
    mypage = pageNavigation(container, {first:true});
    mypage.on('page', (err, num) =>{
        //...
    })

*/

require('./pageNavigation.css')
module.exports = function(selector, ops) {
    ops = _.extend({
        first: true
    }, ops)

    var timestamp = _.now();

    var id = `#${timestamp}`
    var tag = `<ul id="${timestamp}" class="ynpagination"></ul>`;
    var container = (typeof selector != "string") ? selector : $(selector);

    console.log(container)
    container.append(tag);

    var bootpag = $(id).bootpag({
        total: 1,
        page: 1,
        maxVisible: 5,
        firstLastUse: ops.first,
        first: "首页",
        last: "尾页",
        next: "下一页",
        prev: "上一页",
        leaps: false
    })

    bootpag.hide = function() {
        $(id).hide();
        return bootpag;
    }
    bootpag.show = function() {
        $(id).show();
        return bootpag;
    }
    return bootpag;
}
