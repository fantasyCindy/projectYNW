/**
 * 表情包

<%@  include file="../common/module-face.jsp" %>
var Face = require('module/ui/face.js');
$(function(){
    face = new Face(); //创建对象
    face.render(offset); //显示
    face.onSelect(faceCode); //选择时回调
})

 */

var Face = function() {
    this.container = $("#expression-wrap");
    this.init();
}

Face.prototype = {
    init: function() {
        var self = this;
        var item = this.container.find('.hand');
        var info = $('#bqInfos');
        var title = info.find('.title');
        var gif = info.find('.gif');

        //表情提示
        item.on('mouseenter', function(e) {
            var o = $(this).position();
            info.css({
                left: o.left - 10,
                top: o.top - 55
            });

            title.text($(this).data('title'));
            gif.attr('src', '/public/icons/face/' + $(this).data('code') + '.gif');

            info.show();
        });

        this.container.on('mouseleave', function() {
            info.hide();
            $(this).hide();
        });

        item.on('click', function() {
            var code = $(this).data('code');
            self.onSelect('[face=' + code + ']');
            self.container.hide();
            return false;
        });
    },
    render: function(offset) {
        this.container.show().css({
            left: offset.left,
            top: offset.top
        });
    },
    onSelect: function(faceCode) {
        alert(faceCode)
    }
}

/*///////////////////////////////////////////////////////////////////*/


module.exports = Face