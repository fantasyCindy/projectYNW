var total = __total / 10;
var href = location.href;
var __href = window.location.href;
var cateMatch = __href.match(/\/([a-z]+)\//)
var pageMatch = __href.match(/\d+$/)
var __page = pageMatch ? pageMatch[0] : 1
var __cate = cateMatch ? cateMatch[1] : "dapan"

var type = cateMatch ? cateMatch[1] : "";
console.log("type", type)
var profile = require('base/teacher-profile.js'); //鼠标放到老师头像是显示详细


if (!(__cate && _.inRange(__page, total))) {
    location.href = `${opinion_path}${__cate}/?pn=1`;
}

var __class = {
    "鉴股": "jiangu",
    "题材": "ticai",
    "大盘": "dapan",
    "股票学院": "gupiaoxueyuan"
}

$(function() {
    $('.href').each(function() {
        var articleid = $(this).data('articleid')
        var createid = $(this).data('createid')
        if (!type) {
            $(this).attr('href', `${opinion_path}opinion/${articleid}.htm`)
        } else {
            $(this).attr('href', `${opinion_path}${type}/${createid}/${articleid}.htm`)
        }
    })

    $('.noteType').each(function() {
        var type = $(this).data('type')
        var id = $(this).data('id')
        $(this).attr('href', `${opinion_path}${__class[type]}/${id}/`)
    })

    var pagination = yn.bootpag('.pagination')
    pagination.bootpag({ page: __page, total: total })
    pagination.on('page', (e, num) => {
        location.href = `${opinion_path}${__cate}/?pn=${num}`
    })

    $('.opinionType-item').each(function(i, el) {
        if ($(this).hasClass(__cate)) {
            $(this).addClass('select')
        }
    })


    profile.init();
    profile.add('.avatar')
    onSelect('观点')
})