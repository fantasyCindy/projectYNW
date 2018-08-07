/*资讯详情页*/
// var newsId = location.href.match(/([0-9]+)\.html/)[1];
var newsId = backnews_id;

var readCount = (function() {
    var key = "open-last"
    var last = +localStorage.getItem(key) || 0 // 上一次打开时间

    if (_.now() - last > 1000 * 60 * 30) {
        $.post("/article/addNewsViewCount.htm", { backnews_id: newsId }, function(back) {
            if (back == 'success') {
                localStorage.setItem(key, _.now())
            }
        })
    }

})()


// 发布资讯观点
var postNewsComment = function(id, content) {
    var defer = $.Deferred();
    var send = {
        backnews_id: id,
        content: content,
        create_id: ynUserId
    }
    var text = $('#textarea_pubCommon');

    $.post("/article/commentNews.htm", send, function(data) {
        if (data == "success") {
            text.val('')
            defer.resolve(data);
            layer.msg("评论成功")
        }
        data = JSON.parse(data)
        if (data.rows.status == '17') {
            text.val('')
            return layer.msg('请绑定手机后评论')
        }
    })
    return defer.promise();
}


//发表评论
var pubCommon = function() {
    var container, textarea, button;

    function event() {
        //发表评论
        textarea.on('focus', function() {
            if (!ynIsLogin || !ynUserId) {
                yn.login.render();
                $(this).blur()
            }
        })

        button.on('click', function() {
            submit();
        })
    }

    function submit() {
        //validate
        var val = textarea.val();
        val = _.trim(val)
        if (!val) {
            layer.alert("内容不能为空");
            return;
        }

        postNewsComment(newsId, val).done(function() {
            textarea.val('').trigger('keyup');
            comment.render();
        });
    }

    return {
        init: function() {
            container = $('.pubCommon');
            textarea = $("#textarea_pubCommon");
            button = container.find('.submit');

            yn.wordCount(textarea, {
                indicate: container.find('.wordCount .value')
            })

            event();
        }
    }
}()


var comment = function() {
    var container, items, bootpag, page = 1,
        row = 10,
        totalCount;

    function handle(data) {
        return _.map(data, function(item) {
            return item;
        })
    }

    return {
        init: function() {
            container = $(".comment");
            items = container.find('.items');
            totalCount = container.find('.totalCount');
            bootpag = yn.bootpag(container);
            bootpag.on('page', function(err, num) {
                page = num;
                comment.render()
            })
        },
        render: function() {
            getNewsComment(newsId, { page: page, row: row }).done(function(data) {
                data.rows = handle(data.rows);
                bootpag.bootpag({ page: page, total: data.pageNumber })
                items.html(template('news-comment-template', data.rows));
                totalCount.text(data.total);
            })
        }
    }
}()

//获取资讯评论
function getNewsComment(id, ops) {
    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row,
        backnews_id: id
    }

    var defer = $.Deferred();
    $.getJSON("/article/queryNewsComments.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}
//阅读数量
function getViewCount(articleId) {
    var defer = $.Deferred();
    $.getJSON("/articleViewCount.htm", { articleId: articleId }, function(data) {
        if (+data.status == 1) {
            defer.resolve(data);
        } else {
            console.log("xxx: yndata.getViewCount error...", data);
            defer.reject()
        }
    });
    return defer.promise();
}

$(function() {
    pubCommon.init();
    var rising = ynmodule.rising();
    rising.init();
    rising.render(0) //0=涨, 1=跌
    comment.init();
    comment.render();

    //查询阅读量
    getViewCount(newsId).done(function(data) {
        var viewcount = data.rows[0].viewcount;
        $('.viewCountValue').text(viewcount);
    })

    var is_weixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }()
    if (is_weixin) {
        $('#wxcode ').removeClass('wx');
    }


})



///////////////点击图片放大代码在template_news.jsp里,都压缩成一行了，分号该写就写吧，并且不能加注释~~~/////////////////////////////////
// window.onload = function() {
//             var imgs = document.getElementsByTagName('img');
//             for (var i = 0; i < imgs.length; i++) {
//                 var img = imgs[i];
//                 img.onclick = function() {
//                     passValue(this.src)
//                 }
//             }
//         };


//         function passValue(src) {
//             console.log(src);
//         };
