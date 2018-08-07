yn.navigation.name = ynconfig.navigation.c;
window._bd_share_config = {
    common: {
        onBeforeClick: function(cmd, config) {
            config.bdText = $('#opinion-detail-title').text() + '--【约投顾】';
            config.bdDesc = $('#opinion-detail-title').text() + '--【约投顾】';
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


var detail = {
    container: null,
    content: null,
    path: "",
    id: null,
    type: 1,
    title: null,
    likeCountValue: null,
    teacherId: null,
    uesrId: null,
    init: function() {
        this.container = $('#newsDetail');
        this.content = $('#newsDetail .article-content');
        this.path = parseURL();

        //解析URL
        function parseURL() {
            var matchArticleURL = location.href.match(/article_id=([0-9]+)/);
            if (!matchArticleURL) {
                location.href = "/index.htm";
                return;
            }
            return "/html/articleDetail.htm?article_id=" + matchArticleURL[1];
        }
    },
    render: function() {
        var _this = this;
        $.get(this.path, function(data) {
            data = data.replace(/<(meta|title|body|html|head|script|link).+>/g, '');
            _this.content.html(data);
            _this.title = $("#opinion-detail-title");
            _this.likeCountValue = $("#like-count-value").text();
            _this.id = _this.title.data('id');
            _this.teacherId = _this.title.data("teacherid");
            _this.uesrId = _this.title.data('userid');

            //相关股票
            var relative = $('#relativeStock');
            var code = relative.data('code');
            if(code){
                var trend = relative.find('.stocktrend');
                trend.text(["看涨", "看跌"][+trend.text()]);
                relative.show();
            }

            //call delegate
            _this.delegate.done();
        })
    },
    delegate: {
        done: function() {}
    }
}


var comment = {
    page: 1,
    row: 10,
    id: null,
    init: function(id) {
        var _this = this;
        this.id = id;
        this.container = $('#article-common');
        this.items = $('#article-common .items');

        this.container.on('click', '.reply', function() {
            var id = $(this).data('id');
            var name = $(this).data('name')
            _this.delegate.reply({ id: id, name: name });
        })
    },
    render: function() {
        var _this = this;
        var result = [];

        yndata.getArticleCommon(this.id, { page: this.page, row: this.row, type: 1 }).done(function(data) {
            console.log("观点评论", data)
            var rows = data.rows.data;
            if (rows.length < 1) {
                _this.items.html(ynconfig.none({ margin: 50 }));
                return;
            }
            handleData(rows);
            _this.items.html(template('comment-template', result.reverse()));
            _this.delegate.done(data);
        })

        function handleData(data, replyFlag) {
            _.forEach(data, function(item) {
                item.createPhoto = item.createPhoto || "/public/images/user.jpg";
                item._reply = "";
                item._style = "";
                if (replyFlag) {
                    item._reply = "<span style='font-size:12px;color:#f57a17;position:relative;top:-1px'>回复" +
                        "<i style='margin:0 10px;' class='fa fa-angle-right'></i></span>";
                    item._style = "isReply";
                }
                if (item.childList.length > 0) {
                    handleData(item.childList, item.createName);
                }
                item.content = yn.parseFaceCode(item.content);
                result.push(item);
            })
        }
    },
    delegate: {
        done: function() {}
    }
}


var action = {
    container: null,
    likeCount: null,
    bd: null,
    showShare: false,
    share: null,
    init: function() {
        this.container = $(".addition");
        this.likeCount = $('#zanCountValue');
        this.bd = $('.bdsharebuttonbox');
        this.share = $('.share');

        this.event();
    },
    event: function() {
        var _this = this;

        //点赞
        this.container.on('click', '.like', function() {
            var el = $(this);
            yndata.like(detail.id).done(function(data) {
                var cur = _this.likeCount.text();
                _this.likeCount.text(+cur + 1)
            })
        })

        //分享
        this.share.on('click', function() {
            yn.positionShare($(this));
        }).on('mouseleave', function() {
            setTimeout(function() {
                if (!_this.showShare) {
                    _this.bd.hide();
                }
            }, 600)
        })

        this.bd.on('mouseenter', function() {
            showShare = true
        }).on('mouseleave', function() {
            showShare = false
            _this.bd.hide();
        })


        //打赏
        this.container.on('click', '.support', function() {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            _this.delegate.pay();
        })
    },
    delegate: {
        pay: function() {}
    }
}


//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

$(function() {

    //详情
    detail.init();
    detail.render();
    detail.delegate.done = function() {
        viewDidLoad();
    }

})

function viewDidLoad() {

    var playtour = ynmodule.playtour();
    playtour.init();

    var userId = detail.userId;
    var teacherId = detail.teacherId;
    var teacherName = $('.person-info .name').text();
    var articleId = detail.id;
    var $live = $(".person-live");
    var $answer = $(".person-answer");
    var $opinion = $(".person-opinion");

    //设置链接
    _.forEach([$live, $answer, $opinion], function(item) {
        var more = item.find('a.more');
        var href = more.attr('href');
        more.attr('href', href + teacherId)
    })


    //页码
    var bootpag = yn.bootpag("#article-common .comment");
    bootpag.on('page', function(err, num) {
        bootpag.bootpag({
            page: num
        });
        comment.page = num;
        comment.render();
    })

    //评论
    comment.init(articleId);
    comment.render();
    comment.delegate.done = function(data) {
        bootpag.bootpag({
            total: data.pageNumber
        })
    }
    comment.delegate.reply = function(info) {
        post.addReply(info.id, info.name);
    }

    //发布
    var post = new ynmodule.PostComment()
    post.init();
    post.delegate.submit = function(send) {
        yndata.postArticleCommon(articleId, send.value, {
            type: 1,
            parentId: send.parentId
        }).done(function() {
            comment.page = 1;
            bootpag.bootpag({
                page: 1
            });
            comment.render();
        })
    }

    //赞
    action.init();
    action.likeCount.text(detail.likeCountValue);
    action.delegate.pay = function() {
        playtour.render(detail.id);
    }

    // 个人信息
    var info = new ynmodule.PersonInfo();
    info.container = $('.person-info');
    info.userId = detail.uesrId;
    info.init();
    info.render();


    //观点
    opinion = new TeacherBestOpinion();
    opinion.container = $opinion.find('.items');
    opinion.teacherid = teacherId;
    opinion.order = "create_time";
    opinion.row = 4;
    opinion.init();
    opinion.render();

    //回答
    bestAnswer = new BestAnswer();
    bestAnswer.container = $answer.find(".items");
    bestAnswer.teacherid = teacherId
    bestAnswer.row = 4;
    bestAnswer.render();

    //直播
    var living = new TeacerLivingInfo();
    living.container = $live.find('.items');
    living.teacherId = teacherId;
    living.render();
}
