/*

//创建对象
var category = new Category({
        container: $el
    }).render()

    category.getValue() //获取值

 */

var noteType = ["个股", "板块", "大盘", "知识"];

var category = function(ops) {
    _.extend(this, ops);
}

category.prototype = {
    validate: false,
    container: null,
    select: null,
    render: function() {
        var self = this;
        var tag = _.map(noteType, function(item, index) {
            var style = index == self.select ? 'select' : '';
            return `<span class="item ${style} askStock-category-item " data-id="${index}">${item}</span>`;
        }).join('')

        this.container.html(tag);
        this.container.on('click', '.askStock-category-item', function() {
            self.validate = true;
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
        })
        return this;
    },
    getValue: function() {
        return this.container.find('.askStock-category-item.select').data('id')
    }
}

module.exports = {
    category: category
}
