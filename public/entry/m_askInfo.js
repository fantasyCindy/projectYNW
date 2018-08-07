
/*  回答设置 */
// var answers = (function() {
//     var container = $('#m-askInfo')
//     // 点击有帮助
//     container.on('click', '.action-help', function() {
//         var el = $(this);
//         var index = el.parents('.m-ask-item').index();
//         var data = __answer[index];

//         $.post("/consultation/answerZan.htm", { id: data.id }, function(back) {
//             if (back == "success") {
//                 var count = el.find('.zan');
//                 count.text(+count.text() + 1);
//                 layer.msg("多谢您的点赞")
//             }
//             if (back == "complete") {
//                 layer.msg("您已经点过赞啦!");
//             }
//             if (+back === 0) {
//                 layers.msg("参数为空")
//             }
//         })
//     })

// })()


