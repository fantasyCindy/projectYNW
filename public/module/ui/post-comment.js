// var Face = require('./face.js');
var Face = require('m/qqface/main.js');
require('./post-comment.css');

/*///////////////////////////////////////////////////////////////////*/


/**
 * 发表评论模块
<%@  include file="../common/module-face.jsp" %>
var comments = require('../common/ui/post-common.js');


初始化
var comment = new comments({
    container : $el, //require
    limit:200
});

- parentId
+ addReply(id:String, name:String) 添加回复
+ onSubmit():Function 提交评论

*/


var createTag = function() {
    return `<div id="ynPostComment" class="b220 bg-white">
        <div class="yn-title-1">
            <span class="yn-title-1-icon"></span>
            <span class="txt">发表评论</span>
        </div>
        <div class="content">
            <div class="reply"></div>
            <textarea placeholder="快来发表伟大言论吧" class="block"></textarea>
            <div class="actions oh">
                <div class="inline face face-holder" id="face-trigger"></div>
                <div class="wordCount fr inline">
                    <span class="word-indicate wordValue"></span>/
                    <span class="word-sum wordValue"></span>
                </div>
            </div>
        </div>
        <button class="submit">提交</button>
    </div>`
}


module.exports = function(ops) {
    _.extend(this, ops);
    this.init();
}
module.exports.prototype = {
    container: null,
    limit: 200,
    parentId: null,
    reply: null,
    init: function() {
        var self = this;
        this.container.html(createTag());
        var textarea = this.container.find('textarea');
        var faceHolder = this.container.find('.face-holder');
        var submit = this.container.find('.submit');
        this.reply = this.container.find('.reply');

        //word limit
        this.container.find('.wordValue').text(this.limit);
        yn.wordCount(textarea, {
            indicate: this.container.find('.word-indicate'),
            limit: this.limit
        })

        textarea.on('focus', function() {
            if (!ynIsLogin) {
                yn.login.render();
                textarea.blur();
                return;
            }
        })

        //submit
        submit.click(_.debounce(function() {
            var val = _.trim(textarea.val());
            if (!val || val.length <= 2) {
                layer.msg("至少3个字")
                textarea.val('')
                return;
            }
            var send = { value: val }
            if (self.parentId) {
                send.parentId = self.parentId
            }
            self.onSubmit(send);
            reset()
        }, 2000, { leading: true, trailing: false }));


        var reset = function() {
            self.parentId = null;
            self.reply.empty();
            textarea.val("").trigger('keyup');
        }

        this.reply.on('click', '.reply-close', function() {
            self.reply.empty();
            self.parentId = null;
        })

        //face 
        // var face = new Face();
        // face.onSelect = code => {
        //     var val = textarea.val();
        //     textarea.val(val + code);
        // }
        // faceHolder.click(function() {
        // if (!ynIsLogin) return yn.login.render();
        //     face.render($(this).offset());
        // })

        faceHolder.click(function() {
            if (!ynIsLogin) return yn.login.render();
            Face.getInstance().render('face-trigger', title => {
                var val = self.container.find('textarea').val()
                self.container.find('textarea').val(val + title)
            }, { left: 168, top: 0 })
            return false
        })

    },
    addReply: function(commentId, talker) {
        var tag = '<span class="txt">回复：</span>' +
            '<span class="reply-name">' + talker + '</span>' +
            '<span class="reply-close fa fa-times-circle"></span>';
        this.reply.html(tag)
        this.parentId = commentId;
    },

    onSubmit: function() {
        layer.msg("onSubmit function not override");
    }
}