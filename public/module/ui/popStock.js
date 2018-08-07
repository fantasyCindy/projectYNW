//股票信息弹层

/*
    var popStock = require('../module/ui/popStock.js');
   
   $(function(){
        popStock.init();
        popStock.add(selector)
   })

    - selector : String : css选择器 ; 
    注意 : $(selector).data('code') 为有效的股票代码;
*/

var customStock = require('../ajax/customStock.js');
require('./popStock.css');

module.exports = (function() {
    var body, container, name, code, now, up, money, open, top, bottom, hidden = true;

    var append = () => {
        body = $('body');
        var tag = `<div id="popStock"> 
                        <table> 
                            <tr><td colspan="3" class="title"><span class="name"></span><span class="code"></span></td></tr> 
                            <tr><td>当前价：<span class="now"></span></td> 
                            <td>涨跌幅：<span class="up"></span></td> 
                            <td>涨跌额：<span class="money"></span></td></tr> 
                            <tr><td>开盘价：<span class="open"></span></td> 
                            <td>最高价：<span class="top"></span></td> 
                            <td>最低价：<span class="bottom"></span></td></tr> 
                        </table> 
                        <button class="addToMyStock">添加自选</button>
                    </div>`
        body.append(tag);
    }

    var hide = () => {
        setTimeout(() => {
            if (hidden) container.hide()
        }, 100)
    }

    var set = () => {
        container = $("#popStock");
        name = container.find('.name');
        code = container.find('.code');
        now = container.find('.now');
        up = container.find('.up');
        money = container.find('.money');
        open = container.find('.open');
        top = container.find('.top');
        bottom = container.find('.bottom');
    }

    var event = function() {
        //滑入POP取消隐藏
        container.mouseenter(() => hidden = false).mouseleave(() => {
            console.log("learve")
            hidden = true;
            hide();
        });

        //添加自选
        container.on('click', '.addToMyStock', function() {
            if (!ynIsLogin) return yn.login.render();
            customStock.add({ stockname: name.text(), stockcode: code.text(), })
        });
    }

    var render = $el => {
        //position

        var __top = $el.offset().top + $el.outerHeight();
        var __left = $el.offset().left;
        container.show().css({ top: __top + "px", left: __left + "px" })
        var codeValue = $el.data('code');

        yn.queryStock(codeValue, {
            handle: true,
            color: true
        }).done(data => {
            name.html(data[0]);
            code.html(codeValue);
            now.html(data[3]);
            up.html(data[33]);
            money.html(data[34]);
            open.html(data[1]);
            top.html(data[4]);
            bottom.html(data[5]);
        })
    }

    return {
        init: function() {
            append();
            set();
            event();
        },
        add: selector => {
            body.on('mouseenter', selector, function(){
                render($(this))
            });
            body.on('mouseleave', selector, () => {
                hidden = true;
                hide();
            })
        }
    }
})()
