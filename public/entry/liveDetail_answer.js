 var liveDetailCommon = require('./liveDetail_common.js');

 /*///////////////////////////////////////////////////////////////////*/
 var href = location.href;
 var total = Math.round(__total / 10);
 var __href = window.location.href;
 var cateMatch = __href.match(/\/([a-z]+)\//)
 var pageMatch = __href.match(/\d+$/)
 var pMatch = __href.match(/\/(\d+)\//)
 var __page = pageMatch ? pageMatch[0] : 1
 var __pM = pMatch ? pMatch[1] : 1
 var __cate = cateMatch ? cateMatch[1] : "gegu"

 $(function() {
     // 选中的状态
     $('#myAnswer .askStock-category-item').each(function(i, el) {
             if ($(this).hasClass(__cate)) {
                 $(this).addClass('select')
             }
         })
         // 没有内容的时候
     var none = _.trim($('#myAnswer .items').html())
     if (!none) {
         return $('#myAnswer .items').html(ynconfig.none())
     }
     // 页码
     var pagination = yn.bootpag('#myAnswer')
     pagination.bootpag({ page: __page, total: total })
     pagination.on('page', (e, num) => {
         console.log('path', ask_path)
         setTimeout(function() {
             location.href = `${ask_path}${__cate}/${__pM}/?pn=${num}`
         }, 1000)
     })

 })