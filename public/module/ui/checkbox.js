/**
 * 复选框
 * 

var checkboxModule = require('../module/ui/checkbox.js');
var checkbox = checkboxModule.checkbox;
new checkbox({
    container: $('body'),
    values: [{ value: 0, text: "hehe" }],
    select: 0,
    multi: false
}).render()

 * 
 * 
 */

require('./checkbox.css');

var checkbox = function(ops) {
    this.props = _.extend({
        container: null,
        values: null, //文字内容
        select: 0, //默认选中第一个
        multi: false, //是否可以多选
        onChange: function() {}
    }, ops)
}

checkbox.prototype = {
    render: function() {
        var _this = this;
        var self = this.props;

        //验证
        var validate = function() {
            if (!self.container) {
                layer.msg("ynUI.checkbox : container not defined");
            }
        }()

        //显示
        var tags = function() {
            return _.map(self.values, function(item, index) {
                var select = self.select === index ? "select" : "";
                return `<span class="ynui-checkbox-item item${index}" data-value="${item.value}">
                    <span class="icon outer"><span class="icon inner ${select}" data-value="${item.value}"></span></span>
                    <span class="txt">${item.text}</span>
                </span>`
            })
        }();

        self.container.html(tags);

        //事件
        var event = function() {
            self.container.on('click', '.ynui-checkbox-item .outer', function() {
                var items = $(this).parent().parent();
                var inner = $(this).find('.inner');
                if (self.multi) {
                    inner.toggleClass('select');
                } else {
                    items.find('.inner.select').removeClass('select');
                    inner.addClass("select");
                }
                self.onChange(_this.getValues());
            })
        }();

        return this;
    },
    getValues: function() {
        var result = [];
        var self = this.props
        self.container.find('.ynui-checkbox-item').each(function() {
            if ($(this).find('.select').length > 0) {
                result.push($(this).data('value'));
            }
        })
        return result;
    },
    select: function(i) {
        if (i >= this.props.values.length) return;
        this.props.container.find('.ynui-checkbox-item .select').removeClass('select');
        this.props.container.find(`.item${i} .inner`).addClass('select');
        return this;
    }
}

module.exports = checkbox
