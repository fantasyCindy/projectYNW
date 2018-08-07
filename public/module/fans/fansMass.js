/**
 * 粉丝群发窗口

1.导入模块
<%@  include file="common/moudule-mass.jsp" %>
var massmoudule = require('~/module/fans/fansMass.js') 

$(function(){

    2.初始化
    massmoudule.init(); 

    3.1 弹出对话框
    massmoudule.render();

    3.2 弹出对话框并选中某个老师
    massmoudule.render({
        select: { id:String,  name:String}
    }) 
})
**/
require('./fansMass.css');

var container,input,code,button,ue;

function init(){
    container=$('#massBox');
    editer.init();
    container.on('click','.close',function(){
        container.hide();
        reset();
    })
    layoutBox();
}
function hide(){
    container.hide();
}

var editer=function(){
    var mass=function(title, content){
        var defer = $.Deferred();
        var send = {
            tmessagetitle: title,
            tmessagecontent: content
        }
        $.post("/teachermessage/add.htm", send, function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    return {
        init:function(){
            input=$('#masstitle');
            code=$('#insertStockCode');
            button=container.find('.submit');
            ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    ['emotion', 'link']
                ],
                initialFrameHeight: 268,
                initialFrameWidth: 600,
                maximumWords: 500,
                wordCountMsg: '当前已输入{#count}个字符, 您还可以输入{#leave}个字符',
                elementPathEnabled: false,
                wordCount: true,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                autotypeset: {
                    removeClass: true,
                    clearFontSize: true,
                    removeEmptyline: true, //去掉空行
                    removeEmptyNode: false // 去掉空节点
                }
            });
            yn.showStockList(code, {
                listLen: 4,
                onSelect: function(item) {
                    code.val('');
                    ue.execCommand('inserthtml', item.stockWrap);
                }
            })
            button.on('click',function(){
                var tmessagecontent = ue.getContent();
                var tmessagetitle = input.val();
                console.log(tmessagetitle)
                if (!tmessagecontent) {
                    layer.msg("内容不能为空");
                    return;
                }
                tmessagecontent = tmessagecontent.replace("&nbsp;", '');
                mass(tmessagetitle, tmessagecontent).done(function(data) {
                    if (data == "success") {
                        layer.msg("发送成功");
                        container.hide();
                        reset();
                    } else {
                        layer.alert('发送失败')
                        yn.log("msg : send message to all", data)
                    }
                    
                })
            })
        }
    }
}()

function reset(){
    input.val('');
    code.val('');
    ue.setContent('');
}

function render(){
    container.show().velocity('transition.expandIn', { duration: 300 });
}

function layoutBox() {
    var w = $(window).width();
    var h = $(window).height();
    var cw = container.outerWidth()
    var ch = container.outerHeight()
    container.css({
        left: (w - cw) / 2 + "px",
        top: (h - ch) / 2 + "px"
    })
}

module.exports = {
    init: init,
    render: render,
    hide:hide
}