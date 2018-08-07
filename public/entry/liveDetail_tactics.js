var liveDetailCommon = require('./liveDetail_common.js');
/*///////////////////////////////////////////////////////////////////*/
var href = location.href;
var total = Math.round(__total / 10);
var __href = window.location.href;
var cateMatch = __href.match(/\/([a-z]+)\//)
var pMatch = __href.match(/tactics\/(\d+)/)
var pageMatch = __href.match(/pn=(\d+$)/)
var __page = pageMatch ? pageMatch[1] : 1
var __pM = pMatch ? pMatch[1] : 1
var __cate = cateMatch ? cateMatch[1] : "dapan"

var type = cateMatch ? cateMatch[1] : "";

$(function() {
    // 选中的状态
    // if ($('.liveDetail-menu').find('.item').length != 6) {   //达人没有内参
    //     $('.liveDetail-menu').find('.item').eq(4).addClass('select');
    // }else{
    //     $('.liveDetail-menu').find('.item').eq(5).addClass('select');
    // }

    if (!$('.contentStr').html()) {
        $('.img').show()
    }
    $('.contentStr').each(function() {
        if ($(this).html()) {
            $(this).parent().find('.img').hide()
        } else {
            $(this).parent().find('.img').show()
        }
    })
    if (type == "tactics") {
        var item = $($('.liveDetail-menu .item')[5])
        item.addClass('select')
    }
    // 页码
    if (__total) {
        var pagination = yn.bootpag('#myRefer')
        pagination.bootpag({ page: __page, total: total })
        pagination.on('page', (e, num) => {
            console.log('path', opinion_path)
            location.href = `${opinion_path}${__cate}/${__pM}/?pn=${num}`
        })
    } else {
        $('.refer-items').html('<div style="margin:50px 0;text-align:center;">暂无内容</div>')
    }

})