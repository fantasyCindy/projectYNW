var liveDetailCommon = require('./liveDetail_common.js');
/*///////////////////////////////////////////////////////////////////*/
var href = location.href;
var total = Math.round(__total / 10);
var __href = window.location.href;
var cateMatch = __href.match(/\/([a-z]+)\//)
var pMatch = __href.match(/\/(\d+)\//)
var pageMatch = __href.match(/\d+$/)
var __page = pageMatch ? pageMatch[0] : 1
var __pM = pMatch ? pMatch[1] : 1
var __cate = cateMatch ? cateMatch[1] : "dapan"

var type = cateMatch ? cateMatch[1] : "";
console.log('cate')



$(function() {
    // 选中的状态
    $('#opinion .opinionType-item').each(function(i, el) {
            if ($(this).hasClass(__cate)) {
                $(this).addClass('select')
            }
        })
        // 没有内容的时候
    var none = _.trim($('#opinion .items').html())
    if (!none) {
        return $('#opinion .items').html(ynconfig.none())
    }

    //分类链接修改
    $('.href').each(function() {
            var articleid = $(this).data('articleid')
            var createid = $(this).data('createid')
            if (!type) {
                $(this).attr('href', `${opinion_path}opinion/${articleid}.htm`)
            } else {
                $(this).attr('href', `${opinion_path}${type}/${createid}/${articleid}.htm`)
            }
        })
        // 页码
    var pagination = yn.bootpag('#opinion')
    pagination.bootpag({ page: __page, total: total })
    pagination.on('page', (e, num) => {
        console.log('path', opinion_path)
        location.href = `${opinion_path}${__cate}/${__pM}/?pn=${num}`
    })

})