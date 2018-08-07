/*

使用方法
var referCategory = require('../module/composite/refer-category.js');
referCategory.render({
    container: $el,
    select: value => {}  点击时回调 
});


*/

require('./refer-category.css');
module.exports = (function() {
    var param = { light: "top" }
    var create = ops => {
        return `<div class="inline ${param.light} refer-category-item select" data-value="">全部</div>
        <div class="inline ${param.light} refer-category-item" data-value="1">热卖中</div>
        <div class="inline ${param.light} refer-category-item" data-value="0">服务中</div>
        <div class="inline ${param.light} refer-category-item" data-value="2">已结束</div>`
    }
    return {
        render: function(ops) {
            _.extend(param, ops);
            ops.container.html(create());
            ops.container.on('click', ".refer-category-item", function() {
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass("select");
                ops.select($(this).data('value'));
            })
        }
    }
})()
