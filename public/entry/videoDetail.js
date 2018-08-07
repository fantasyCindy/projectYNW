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


var createVideo = function(vid) {
    var player = new YKU.Player('video-container', {
        styleid: '0',
        client_id: '70bee75ccf5b9678',
        vid: vid,
        newPlayer: true
    });
}

/* /////////////////////////////////////////////////////////////////// */


$(function() {
    
    $($('#video-container').find('param')[2]).attr('value','transparent');
    $('#video-container').find('embed').attr('wmode','opaque');

    var showShare = false;
    var video = {
        container: $('#videoDetail'),
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
        init: function() {

            var createTag = function() {
                if (videoSrc) return `<div class="auto">${videoSrc}</div>`
                if (videoUrl) {
                    return `<div><embed src="${videoUrl}" quality="high"  width="800" height="525"align="middle" allowScriptAccess="always" 
                         autostart=false mode="transparent" type=""></embed></div>`
                }
            }

            // 
            var tag = createTag();
            var videoWrap = $('#video-container')
            if (/youku/.test(tag)) {
                var vidMatch = tag.match(/[0-9a-zA-Z]+==/)
                vidMatch && createVideo(vidMatch[0])
            } else {
                videoWrap.html(tag)
            }

            this.bootpag = yn.bootpag(this.videoComment);
            this.bootpag.on('page', (err, n) => {
                this.page = n;
                this.renderComment();
            })
            this.renderRelative();
            this.renderComment();
            yn.wordCount(this.textarea, {
                limit: 200,
                indicate: this.wordCount
            })

            this.event();
        },

        //相关课程
        renderRelative: function() {
            var self = this;
            yndata.getRelativeVideo(teacherId).done(function(data) {
                data.rows = _.map(data.rows, function(item) {
                    if (item.title.length > 31) {
                        item.title = item.title.substr(0, 31) + "..."
                    }
                    return item;
                })
                self.relative.find('.items').html(template('relative-template', data.rows));
            })
        },

        //视频评论
        renderComment: function() {
            var self = this;
            yndata.getVideoComment(videoId, { page: this.page, row: this.row }).done(function(data) {
                var items = self.videoComment.find('.items')
                if (data.data && data.data.length < 1) {
                    items.html("<p style='text-align:center;margin:50px 0;font-size:15px;'>暂无评论, 赶快抢沙发</p>");
                    self.bootpag.hide()
                    return;
                }

                data.data = _.map(data.data, function(item) {
                    if (!item.createPhoto) {
                        item.createPhoto = "/public/images/user.jpg"
                    }
                    return item;
                })

                items.html(template('video-comment-template', data.data));
                var time = $('#videoComment .time').text()
                console.log('time1',time)
                time = time.substr(0, 10)
                $('.time').html(time)
                console.log(time)
                self.bootpag.show();
                self.bootpag.bootpag({ page: self.page, total: data.pageNumber })
            })
        },

        event: function() {
            var self = this;

            //检测登录
            this.textarea.focus(function() {
                if (!ynIsLogin) return yn.login.render()
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
            this.pubComment.on('click', 'button', () => {
                var content = this.textarea.val();
                content = _.trim(content);
                if (!content) {
                    layer.msg("请输入发布内容")
                    return;
                }
                yndata.postVideoComment(videoId, content).done(data => {
                    this.textarea.val("");
                    this.page = 1;
                    this.renderComment();
                    this.wordCount.text(200);
                })
            })

            //分享
            this.share.on('click', function() {
                yn.positionShare($(this));
            }).on('mouseleave', function() {
                setTimeout(function() {
                    if (!showShare) {
                        self.bd.hide();
                    }
                })
            })

            this.bd.on('mouseenter', () => {
                showShare = true;
            }).on('mouseleave', () => {
                showShare = false;
                this.bd.hide();
            })
        }
    }


    /*------------------------------------------*/

    video.init()
})
