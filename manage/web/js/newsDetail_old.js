 define(['jquery', 'lodash', 'bootpag', 'template'],
     function($, _, bootpag, template) {

         //初始化页码
         var myPage = $('#ynpagination').bootpag({
             total: 1,
             page: 1,
             maxVisible: 5,
             next: "下一页",
             prev: "上一页",
             leaps: false
         })

         //登录
         function authLogin() {
             var logined = false;
             $.ajax({
                 type: "get",
                 url: stock_base + "/web/validLogin.htm",
                 async: false,
                 success: function(_backData) {
                     if ("1" == _backData) {
                         logined = true;
                     } else {
                         logined = false;
                     }
                 }
             });
             console.log("是否登录: " + logined);
             return logined;
         }

         var c = {
             pageSize: 10, //每页显示条数
             textarea: $('#loadMoreComment'),
             wordCount: $('.text-number-value'),
             init: function() {

                 //提交评论
                 $('.btn-current').on('click', function() {
                     if (authLogin()) {
                         c.publishComment();
                     } else {
                         alert("请登录")
                     }
                 })

                 //向他咨询
                 $('#FAQ').on('click', '.info.fr', function() {
                     if (authLogin()) {
                         c.questionFrame()
                     } else {
                         alert("请登录")
                     }
                 })

                 //字数统计
                 c.textarea.keyup(function() {
                     var len = $(this).val().length;
                     if (len >= 200) {
                         c.textarea.val($(this).val().substr(0, 199));
                         alert("超出字数限制");
                         len = 200;
                     }
                     c.wordCount.text(200 - len);
                 })

                 //加载页码
                 c.getComment(1);
                 c.getHotNews();
                 c.getTeacherList();
                 myPage.on('page', function(e, n) {
                     c.getComment(n);
                 })
             },

             //加载评论数据
             getComment: function(currentPage) {
                 var send = "articleId=" + contentId + "&pageSize=" + c.pageSize + "&currentPage=" + currentPage;
                 $.getJSON(stock_base + "/articleCommentList.htm?" + send, function(_backData) {
                     console.log("-------------评论数据------------------");
                     console.log(send);
                     console.log(_backData);
                     eval('var data = ' + _backData.data);
                     var avantar = stock_base + "/article/images/user_head1.png";
                     data = _.map(data, function(item) {
                         if (!item.createPhoto) {
                             item.createPhoto = avantar;
                         }
                         return item;
                     })
                      console.log(_backData.commentCount );
                     myPage.bootpag({ page: currentPage, total: Math.ceil(_backData.commentCount / c.pageSize) });
                     $('.comment-list').html(template('comment-template', data));
                 })
             },

             //发表评论
             publishComment: function() {
                 if (!c.textarea.val()) {
                    alert("评论内容不能为空!");
                     return;
                 }
                 var send = {
                     "article_id": contentId,
                     "content": c.textarea.val()
                 }
                 console.log('------------------ 发表评论 --------------------');
                 console.log(send);
                 $.post(stock_base + "/auth/articleCommentReply.htm", send, function(_backData) {
                     console.log(_backData);
                     if (_backData.status == 1) {
                         c.getComment(1);
                         c.textarea.val('');
                     }
                     if (_backData.status == -1) {
                         alert("评论失败!");
                         return;
                     }
                 }, "json");
             },

             //热点资讯
             getHotNews: function() {
                 $.getJSON(stock_base + '/article/ztjmList.htm?pageSize=5&currentPage=1', function(_back) {
                     console.log("------------------热点资讯--------------------");
                     console.log(_back);
                     var html = template('information-template', _back);
                     $('#getHotNews').html(html);
                 })
             },

             //在线答疑
             getTeacherList: function() {
                 var url = stock_base + "/livingTeacherList.htm?pageSize=5&currentPage=1"
                 $.getJSON(url, function(backData) {
                     console.log("----------------------在线老师列表--------------------");
                     var path = backData.path;
                     eval('var data = ' + backData.data)
                     _.map(data, function(item) {
                         console.log(item);
                         return item
                     })
                     $('.FAQ-list').html(template('FAQ-template', data));
                 })
             },

             //咨询框
             questionFrame: function() {
                 var $box = $('#quiz');
                 $box.css({
                     left: ($("body").width() - $box.width()) / 2 - 20 + "px",
                     top: ($(window).height() - $box.height()) / 2 + "px",
                 });
                 $('#contentart').css({
                     display: "block",
                 })
                 $(".close").click(function() {
                     $('#contentart').css("display", "none");
                 })
             }
         }
         return c;
     })
