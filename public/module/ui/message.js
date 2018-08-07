/*
提示消息

var Message = require('../module/ui/message.js');
var msg = new Message({
        type: 1,
        title: "组合消息1",
        content: "您订阅的组合有了",
        link: `/html/CompositeDetail.htm?00ZHXQ`,
        dismiss: 2000 //2秒后消失
    });

*/

require('./message.css')

module.exports = function(ops) {
    this.id = new Date().getTime();
    _.extend(this, ops);
    this.render();
}

module.exports.prototype = {
    container: null,
    type: 0,
    title: "",
    content: "",
    link: "",
    dismiss: false,
    render: function() {
        var self = this;
        if (!$("#message-item-container").get(0)) {
            $('body').append('<div id="message-item-container"></div>');
        }
        this.container = $("#message-item-container");
        this.container.append(getTag(this));
        var el = $(`#${this.id}`);
        el.velocity('transition.slideRightBigIn', { duration: 300 });
        var hide = () => el.velocity('transition.fadeOut', { duration: 300 });
        el.on('click', '.message-item-close', () => hide());
        if (this.dismiss) setTimeout(() => hide(), this.dismiss); //自动消失
    }
}

function getTag(data) {
    data.content = data.content.substr(0, 18) + '...'
    return `<div class="message-item" id=${data.id}>
        <span class="message-item-icon type${data.type}"></span>
        <a href="${data.link}" class="message-item-info" target="_blank">
            <div class="title">${data.title}</div>
            <div class="content">${data.content}</div>
        </a>
        <span class="message-item-close message-item-icon"></span>
    </div>`
}
