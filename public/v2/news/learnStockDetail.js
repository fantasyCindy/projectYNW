$(function() {
    if (room_teacherid) {
        var layer = require('~/ui/layer.js')
        var personInfo = require('m/ui/person-info.js');
        var AskWindow = require('base/askWindow.js'); //提问
        
        $('.person-info').show()
        AskWindow.init();
        // 个人信息
        personInfo.render({
            container: $('.person-info'),
            teacherid: room_teacherid,
            onAsk: info => AskWindow.aimedRender({ select: info })
        })
    } else {
        $('.person-info').hide()
    }
})