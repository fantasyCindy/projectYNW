/*

使用方法

*/

require('./info.css')

var profile = function(){
    var container,
        bomb_content,
        hide = true;
    var add = function(trigger, html) {
        //定位
        var position = (function() {
            var offset = trigger.offset();
            var top = offset.top - 15;

            var left = function() {
                var _left = offset.left;
                if (_left > 800) {
                    //左侧显示
                    container.addClass('bomb-right');
                    container.removeClass('bomb-left');
                    return _left - 420 - 10;
                } else {
                    //右侧显示
                     container.addClass('bomb-left');
                    container.removeClass('bomb-right');
                    return _left + trigger.width() + 10;
                }
            }()

            container.css({
                left: left,
                top: top
            })
        })()

        container.show();
        bomb_content.html(html)
    }

    //事件
    var event = function() {
        //滑入时取消隐藏
        container.on('mouseenter', () => hide = false)
        container.on('mouseleave', () => {
            container.hide();
            hide = true;
        })
    }
    return {
        init:function(){
            $('body').append(getTag());
            container = $('#bomb-box');
            bomb_content = container.find('.bomb-content');

            event()
        },
        render:function(_element){
            //触发显示/隐藏
            $('body').on('mouseenter', _element, function() {
                hide = false;
                setTimeout(() => {
                    if (!hide) {
                        var html = $(this).html(); //html
                        add($(this), html);
                    }
                }, 350)
            }).on('mouseleave', _element, function() {
                hide = true;
                setTimeout(() => {
                    if (hide) {
                        container.hide()
                    }
                }, 400)
            })
        }
    }
}()

module.exports = {
    init: profile.init,
    render: profile.render
}

function getTag() {
    return ` <div id="bomb-box" class="bomb hide">
                <div class="bomb-content"></div>
            </div>`
}