var living = require('./living.js') // 直播动态
var hot_live = require('index/hot-live.js') // 直播大厅
var emerging = require('./emerging.js') // 新晋直播
var profile = require('base/teacher-profile.js'); //鼠标放到老师头像是显示详细信息
var info = require('base/info.js'); //鼠标放到文字显示不全的位置显示详细信息
var error = require('e/error-type');
$(function() {
    living.render()
    hot_live.init()
    hot_live.render({ type: 1 }, '/html/liveRoomList.htm', { count: 8 })
    emerging.init('#emerging .emerging-list', )
    emerging.render('/html/teacherOrderList.htm', {
        page: 1,
        rows: 10,
        unit: 'month',
        orderStype: 2
    })
    profile.init();
    profile.add('.avatar')

    info.init()
    info.render('.bomb-tan')

    // 直播大厅点击切换
    $('#hall').find('.title-1').on('click', '.title-btn', function() {
        $(this).parent().find('.thisclass').removeClass('thisclass');
        $(this).addClass('thisclass');
        var type = $(this).data('type');
        hot_live.render({ type: type }, '/html/liveRoomList.htm', { count: 8 })
    })
    onSelect('直播')
})
