var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject) {
    Sys.ie = ua.match(/msie ([\d.]+)/)[1];
    if (Sys.ie <= 7) {
        alert('你目前的IE版本为' + Sys.ie + '版本太低，请升级！');
        location.href = "http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie";
    }
}

//baidu push
(function() {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};


var ynconfig = {
    none: function(ops) {
        ops = _.extend({
            text: "暂无记录",
            margin: 260,
            fontSize: 14
        }, ops)
        return "<p class='nothing' style='background:white;text-align:center;padding:" + ops.margin + "px 0;font-size:" + ops.fontSize + "px'>" +
            "<i class='fa fa-exclamation-circle fa-lg' style='margin-right:5px'></i>" + ops.text + "</p>"
    },
    more: function() {
        return '<p class="loadMore">加载更多</p>';
    },
    noteType: { "a2": "个股", "a1": "板块", "a0": "大盘", "a3": "知识" },
    askStockCategory: [
        { id: -1, name: "全部" },
        { id: 2, name: "个股" },
        { id: 1, name: "板块" },
        { id: 0, name: "大盘" },
        { id: 3, name: "知识" }
    ],
    totalAskTime: 100, //用户提问次数
    inviteLimit: 3, //用户邀请老师的个数
    opinionType: [
        { id: 0, name: "大盘" },
        { id: 1, name: "题材" },
        { id: 2, name: "鉴股" },
        { id: 3, name: "股票学院" }
    ],
    newsType: [
        { id: 0, name: "热门资讯" },
        { id: 2, name: "涨停揭秘" },
        { id: 3, name: "宏观要闻" },
        { id: 4, name: "个股资讯" },
        { id: 5, name: "重点新闻" }
    ],
    //导航栏
    navigation: {
        a: "问股",
        b: "直播",
        c: "观点",
        d: "视频",
        e: "资讯",
        f: "找投顾",
        g: "我的",
        h: "内参",
        i: "组合"
    },
    //组合状态
    composite_state: [
        [0, "预售"],
        [1, "进行中"],
        [2, "完成"],
        [3, "提前关闭"],
        [4, "提前完成"],
        [5, "到期失败"],
        [6, "触及止损"]
    ],
    composite_style: [
        [0, "保守型"],
        [1, "稳健性"],
        [2, "激进型"]
    ]

}




yn.head = function() {
    var pop = yn.popStock();

    //股票代码
    $('body').on('mouseenter', '.yn-code', function() {
        pop.render($(this));
        return false;
    })

    $('body').on('mouseleave', '.yn-code', function() {
        pop.hide();
        return false;
    })


    //搜索
    var search = {
        key: $('.search-key'),
        table: null,
        body: $('body'),
        input: $('#stock_code'),
        inputRoom: $('#search-room-key'),
        searchRoomInput: $("#search-room-input"),
        searchBtn: $('#btn_search'),
        typeIndex: 0,
        init: function() {
            this.event();
            yn.showStockList('#stock_code', {
                listLen: 8,
                left: -82,
                top: 2,
                onSelect: function(item) {
                    window.location.href = "/marketLine.htm?stockcode=" + item.stockCode;
                }
            });
        },
        event: function() {
            var _this = this;

            //点击搜索
            this.searchBtn.on('click', function() {
                submit();
            })

            //enter搜索
            this.input.keyup(function(e) {
                if (e.keyCode == 13) {
                    submit();
                }
            })

            this.searchRoomInput.keyup(function(e) {
                if (e.keyCode == 13) {
                    submit();
                }
            })

            function submit() {
                var input = $('.search-type-item:visible');
                var url = "";
                if (+_this.typeIndex == 1) {
                    url = "/html/queryLiveRooms.htm?queryText=" + input.val()
                }

                if (+_this.typeIndex == 0) {
                    var first = input.data('firstStockCode');
                    if (!first) {
                        layer.alert("没有相关结果(股票代码至少三位)");
                        return;
                    } else {
                        url = "/marketLine.htm?stockcode=" + first;
                    }
                }
                window.location.href = url;
            }


            //搜直播
            this.key.on('click', function() {
                var left = $(this).offset().left + "px";
                var top = $(this).offset().top + "px";
                _this.body.append('<table id="searchKeyItems">' +
                    '<tr><td class="search-key-item" data-id="stock_code">搜股票</td></tr>' +
                    '<tr><td class="search-key-item" data-id="search-room-input">搜直播</td></tr>' +
                    '</table>')
                _this.table = $('#searchKeyItems');
                _this.table.css({
                    "left": left,
                    "top": top
                });
                return false;
            })

            //搜索类型
            this.body.on('click', '.search-key-item', function(e) {
                e.stopPropagation();
                var text = $(this).text();
                _this.typeIndex = $(this).parent().index();
                var id = $(this).data('id');
                $('.search-type-item').hide();
                $('#' + id).show();
                _this.key.find('.key').text(text);
                _this.table.remove();
            })

            this.body.on('click', function() {
                $('#searchKeyItems').remove();
            })
        }
    }

    //入驻
    var settle = {
        container: $('#contentart_res'),
        trigger: $('#triger-settle'),
        box: $('#residencies'),
        init: function() {
            this.event();
            if (+ynIsTeacher != 1) {
                this.trigger.show();
            }
        },
        render: function() {
            var _this = this;
            var w = $(window).width();
            var h = $(window).height();
            this.container.show();
            var bw = this.box.width();
            var bh = this.box.height();
            var left = (w - bw) / 2 + 'px';
            var top = (h - bh) / 2 + 'px';
            this.box.css({
                "left": left,
                "top": top
            })
        },
        disappear: function() {
            this.container.hide();
        },
        event: function() {
            var _this = this;
            this.trigger.click(function() {
                _this.render();
            })
            this.container.click(function() {
                _this.disappear();
            })
            this.box.click(function() {
                return false;
            })
            this.box.on('click', '.close', function() {
                _this.container.hide();
            })
            this.box.on('click', 'a', function() {
                var link = $(this).attr('href');
                location.href = link;
            })
        }
    }


    var foot = {
        imgcode: $('#imgCodeId'),
        imgCodeInput: $('#comCode'),
        init: function() {
            this.event();
            yn.inputVerify("#comCode", {
                blur: function(_this) {
                    var defer = $.Deferred();
                    var val = _this.val();
                    $.get("/validateImgCode.htm", {
                        code: val
                    }, function(data) {
                        if (data == "success") {
                            defer.resolve(true);
                        } else {
                            defer.resolve(false);
                        }
                    })
                    return defer.promise();
                }
            })

        },
        event: function() {
            var _this = this;
            $('.feedback-trigger').click(function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                } else {
                    feedback.render();
                }
            })

            //验证码换一换
            $('#changeImg').click(function() {
                _this.imgcode.attr("src", "/validCode.htm?" + new Date().getTime())
            })
        }
    }

    search.init();
    settle.init();
    foot.init();

}

//////////////////////////////////////////////////////////////////////

$(function() {
    yn.login.init();
    yn.header.init();
    yn.navigation.init();
    yn.navigation.select();
    yn.sidebar();
    yn.head();
})
