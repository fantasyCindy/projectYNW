window._bd_share_config = {
    common: {
        onBeforeClick: function(cmd, config) {
            config.bdText = $('#videoInfo .title').text() + '--【约投顾】';
            config.bdDesc = $('#videoInfo .title').text() + '--【约投顾】';
            return config
        },
        onAfterClick: function(cmd) {
            $('.bdsharebuttonbox').hide();
        }
    },
    share: {
        "bdSize": 24,
        "bdStyle": 1,
        "bdCustomStyle": "/public/css/all.css"
    }
}


$(function() {
    var showShare = false;
    var video = {
        container: $('#videoDetail'),
        videoContainer: $('#video'),
        relative: $('#relative'),
        videoComment: $('#videoComment'),
        pubComment: $('#pubComment'),
        textarea: $('#pubContent'),
        page: 1,
        row: 10,
        bootpag: null,
        wordCount: $('#wordCount'),
        share: $('.share'),
        bd: $('.bdsharebuttonbox'),
        videoTag: function() {
            if (videoSrc) {
                return '<div class="auto">' + videoSrc + '</div>'
            } else {
                return '<div><embed src="' + videoUrl + '" quality="high" width="800" height="450" align="middle" allowScriptAccess="always" autostart=false allowFullScreen="true" mode="transparent" type=""></embed></div>'
            }
        },
        init: function() {
            var _this = this;
            this.videoContainer.append(this.videoTag())
            this.bootpag = yn.bootpag(this.videoComment);
            this.bootpag.on('page', function(err, n) {
                _this.page = n;
                _this.renderComment();
            })
            this.renderRelative();
            this.renderComment();
            yn.wordCount(this.textarea, {
                limit: 200,
                indicate: _this.wordCount
            })

            this.event();
        },
        //相关课程
        renderRelative: function() {
            var _this = this;
            yndata.getRelativeVideo(teacherId).done(function(data) {
                data.rows = _.map(data.rows, function(item) {
                    if (item.title.length > 31) {
                        item.title = item.title.substr(0, 31) + "..."
                    }
                    return item;
                })
                _this.relative.find('.items').html(template('relative-template', data.rows));
            })
        },
        //视频评论
        renderComment: function() {
            var _this = this;
            yndata.getVideoComment(videoId, { page: this.page, row: this.row }).done(function(data) {
                var items = _this.videoComment.find('.items')
                if (data.data && data.data.length < 1) {
                    items.html("<p style='text-align:center;margin:50px 0;font-size:15px;'>暂无评论, 赶快抢沙发</p>");
                    _this.bootpag.hide()
                    return;
                }

                data.data = _.map(data.data, function(item) {
                    if (!item.createPhoto) {
                        item.createPhoto = "/public/images/user.jpg"
                    }
                    return item;
                })

                items.html(template('video-comment-template', data.data));
                _this.bootpag.show();
                _this.bootpag.bootpag({ page: _this.page, total: data.pageNumber })
            })
        },
        event: function() {
            var _this = this;

            //检测登录
            this.textarea.focus(function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
            })

            //点赞
            this.container.on('click', '.like', function() {
                var count = $(this).find('.likeCount');
                $.post("/video/editZan.htm", { video_id: videoId }, function(data) {
                    if (data == "success") {
                        layer.msg("谢谢您的赞美")
                        var val = +count.text();
                        count.text(++val);
                        return;
                    }
                    if (data == "complete") {
                        layer.msg("您已经点过赞啦!");
                        return;
                    }
                })
            })

            //发布评论
            this.pubComment.on('click', 'button', function() {
                var content = _this.textarea.val();
                if (!content) {
                    layer.msg("请输入发布内容")
                    return;
                }
                yndata.postVideoComment(videoId, content).done(function(data) {
                    _this.textarea.val("");
                    _this.page = 1;
                    _this.renderComment();
                    _this.wordCount.text(200);
                })
            })

            //分享
            this.share.on('click', function() {
                yn.positionShare($(this));
            }).on('mouseleave', function() {
                setTimeout(function() {
                    if (!showShare) {
                        _this.bd.hide();
                    }
                })
            })

            this.bd.on('mouseenter', function() {
                showShare = true;
            }).on('mouseleave', function() {
                showShare = false;
                _this.bd.hide();
            })
        }
    }


    /*------------------------------------------*/

    video.init()
})
