/*
    
    ----UI

    answerWindow : 回答提问对话框
    askWindow :　提问对话框
    face : 表情包
    playtour : 观点打赏
    support : 礼物打赏
    JudgePay : 支付提示
    msg :　私信
    TableView 
    PostComment : 发布评论

    ----老师

    hotAsk　：热问股票
    rising : 牛人看涨看跌
    answerRanking : 解答排行
    

    ----观点

    opinionList :　查询所有的观点
    opinionType : 观点分类
    hotOpinion : 热门观点
    TeacherBestOpinion :　查询某个老师的观点，可以基于不同的字段排序

    ----问答

    AskStockWithTeacher : 我的问答
    AskStockCategory :　问答分类
    relativeChat : 相关问答
    BestAnswer : 查询某个老师的问答, 可以基于不同的字段排序

    ----直播

    TeacerLivingInfo :查询老师的正在直播信息　：基于发言ID分页
    ----内参
    subscription:订阅内参
 */

///////////////////////////////////////////////////////////////////*/
window.ynmodule = {}
    ///////////////////////////////////////////////////////////////////*/



/*will delete...*/

/**
 * 加载动画
 * o = new ynmodule.loading({})
 */
ynmodule.loading = function(ops) {
    _.extend(this, ops)
}
ynmodule.loading.prototype = {
    container: null,
    type: 2,
    margin: 60,
    render: function() {
        var tag = `<div class="loading" style="text-align:center;"><img class="inline" style="margin:${this.margin}px 0;" src="/public/icons/loading${this.type}.gif"/></div>`
        this.container.html(tag);
    }
}


/**
 * 发送私信
 * 
 * 1. include: common/msg.jsp
 * 2. 初始化(DOM加载完毕) : var msg = ynmoudle.msg(); 
 * 3. 显示弹层：msg.render(teacherId), 
 */
ynmodule.msg = function() {
    var obj = {
        container: $('#ynmsg'),
        overlay: $("#ynmsg-overlay"),
        trigger: null,
        textarea: null,
        button: null,
        teacherId: null,
        wordCount: null,
        init: function() {
            var _this = this;
            this.trigger = this.container.find('.trigger');
            this.textarea = this.container.find('textarea');
            this.button = this.container.find('.submit');
            this.wordCount = this.container.find('.wordCount .value');
            this.align();
            this.event();
            yn.showStockList(this.trigger, {
                listLen: 5,
                fixed: true,
                onSelect: function(item) {
                    var val = _this.textarea.val();
                    _this.textarea.val(val + item.stockWrap).trigger('keyup');
                    _this.trigger.val("");
                }
            })
            yn.wordCount(this.textarea, {
                indicate: this.wordCount,
                limit: 200
            })
        },
        align: function(callback) {
            var dw = $(window).width();
            var dh = $(window).height();
            var cw = this.container.width();
            var ch = this.container.height();
            var left = (dw - cw) / 2;
            var top = (dh - ch) / 2;
            this.overlay.css({
                "width": dw + "px",
                "height": dh + "px"
            })
            this.container.css({
                "left": left + "px",
                "top": top + "px"
            })
        },
        reset: function() {
            this.trigger.val("");
            this.textarea.val("")
        },
        render: function(teacherId) {
            this.teacherId = teacherId;
            this.reset();
            this.overlay.show();
            yn.bodyScroll(false);
        },
        event: function() {
            var _this = this;
            this.overlay.click(function() {
                $(this).hide();
                yn.bodyScroll(true);
            })

            this.container.on('click', '.close', function() {
                _this.overlay.hide();
                yn.bodyScroll(true);
            })

            this.container.click(function() {
                return false;
            })

            this.container.on('click', '.submit', function() {
                if (!_this.teacherId) {
                    layer.alert("ynmoudle.quiz : teacherId error...");
                    return;
                }
                var val = _this.textarea.val()
                if (!val) {
                    layer.alert("内容不能为空");
                    return;
                }
                yndata.postMsg(_this.teacherId, val).done(function() {
                    yn.bodyScroll(true);
                    _this.overlay.hide();
                })
            })

        }
    }
    obj.init();
    return obj;
}


ynmodule.mass = function() {
    var obj = {
        container: $('.ynmodule-mass'),
        overlay: $(".friends-mass"),
        input: null,
        textarea: null,
        button: null,
        wordCount: null,
        init: function() {
            var _this = this;
            this.textarea = this.container.find('textarea');
            this.button = this.container.find('.submit');
            this.wordCount = this.container.find('.wordCount .value');
            this.input = this.container.find('input');
            this.align();
            this.event();
            yn.wordCount(this.textarea, {
                indicate: this.wordCount,
                limit: 200
            })
        },
        align: function(callback) {
            var dw = $(window).width();
            var dh = $(window).height();
            var cw = this.container.width();
            var ch = this.container.height();
            var left = (dw - cw) / 2;
            var top = (dh - ch) / 2;
            this.overlay.css({
                "width": dw + "px",
                "height": dh + "px"
            })
            this.container.css({
                "left": left + "px",
                "top": top + "px"
            })
        },
        reset: function() {
            this.textarea.val("");
            this.input.val("");
        },
        render: function() {
            this.reset();
            this.overlay.show();
            yn.bodyScroll(false);
        },
        event: function() {
            var _this = this;
            this.overlay.click(function() {
                $(this).hide();
                yn.bodyScroll(true);
            })

            this.container.on('click', '.close', function() {
                _this.overlay.hide();
                yn.bodyScroll(true);
            })

            this.container.click(function() {
                return false;
            })
        }
    };
    obj.init();
    return obj;
};



/**
 * 提问窗口(重构中...)
 * include ../common/moudule-ask.jsp
 */
var QuestionModel = function() {};
QuestionModel.prototype = {
    $times: null, //提问次数
    select: null,
    textarea: null,
    judge: null,
    online: null,
    stockList: null,
    init: function() {
        var _this = this;
        //检查提问次数
        yndata.getAskTimes().done(function(data) {
            if (+data < 1) {
                layer.alert("您今天提问次数已经达到上限")
                return;
            }
            _this.$times.text(data);
        })
    }
};


/**
 * 热问股票
 * <%@  include file="../common/moudule-hotAsk.jsp" %>
 * var hotAsk = ynmodule.hotAsk()
 * hotAsk.init()
 * hotAsk.render()
 */

ynmodule.hotAsk = function() {
    return {
        container: $('#hotAsk'),
        items: null,
        pageSize: 5,
        currentPage: 1,
        count: 0,
        init: function() {
            var _this = this;
            this.items = this.container.find('.content');
            this.event();
            this.getData(function(data) {
                _this.render(data);
            })
        },
        getData: function(callback) {
            yndata.hotAsk({
                pageSize: this.pageSize,
                currentPage: this.currentPage
            }).done(function(data) {
                console.log("热问股票", data)
                callback(data.rows);
            });
        },
        render: function(data) {
            var _this = this;
            this.items.html(template('hotAsk-template', data));
            //查询股票价格
            this.items.find('.item').each(function() {
                var price = $(this).find('.price');
                var up = $(this).find('.up')
                var money = $(this).find('.money');
                yn.queryStock($(this).data('code'), {
                    handle: true,
                    color: true
                }).done(function(data) {
                    price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
                    up.html(data[33]);
                    money.html(data[34]);
                })
            })
        },

        event: function() {
            var _this = this;
            //换一换
            this.container.on('click', '.action', function() {
                _this.count++;
                _this.currentPage = _this.count % 2 + 1;
                _this.getData(function(data) {
                    _this.render(data);
                })
            })
        }
    }
}



/**
 * 牛人看涨跌
 * <%@  include file="../common/moudule-rising.jsp" %>
 * o = ynmodule.rising();
 * o.init();
 * o.render(0) //0=涨, 1=跌
 */
ynmodule.rising = function() {
    return {
        container: $('#rising'),
        items: null,
        page: 1,
        row: 5,
        percent: null,
        upline: null,
        downline: null,
        loading: null,
        init: function() {
            this.items = this.container.find('.content');
            this.percent = this.container.find('.percent');
            this.upline = this.percent.find('.upline');
            this.downline = this.percent.find('.downline');
            this.event();

            //加载动画
            this.loading = new ynmodule.loading();
            this.loading.type = 2;
            this.loading.container = this.items;
        },
        render: function(type) {
            var _this = this;
            this.loading.render();
            yndata.rising({
                page: this.page,
                row: this.row,
                type: type // 0=涨, 1=跌
            }).done(function(data) {
                console.log("牛人看涨跌", data);

                //设置比例
                data.rows = _.map(data.rows, function(item) {
                    var total = (+item.onNum) + (+item.downNum);
                    item.upWidth = item.onNum / total * 100;
                    item.downWidth = item.downNum / total * 100;
                    return item;
                })

                data.rows = _.sortBy(data.rows, ['downWidth', 'upWidth'][type]);
                _this.items.html(template('rising-template', data.rows));

                //股票价格
                _this.items.find('.item').each(function() {
                    var price = $(this).find('.price');
                    var up = $(this).find('.up')
                    var money = $(this).find('.money');
                    yn.queryStock($(this).data('code'), {
                        handle: true,
                        color: true
                    }).done(function(data) {
                        price.html(data[3].replace(/>([0-9.]+)</, '>￥$1<'));
                        up.html(data[33]);
                        money.html(data[34]);
                    })
                })
            })
        },
        event: function() {
            var _this = this;
            this.container.find('.title').on('click', 'span', function() {
                $(this).parent().find('.thisclass').removeClass("thisclass");
                $(this).addClass("thisclass");
                var type = $(this).data("id");
                _this.render(type)
            })
        }
    }
}


/**
 * 解答排行
 * var answerRanking = ynmodule.answerRanking()
 * answerRanking.init({wrap:$('#container')});
 * answerRanking.render({page:1, row:10})
 */

ynmodule.answerRanking = function() {
    return {
        container: null,
        page: null,
        row: null,
        handler: {
            showQuestionWindow: function() {}
        },
        init: function(ops) {

            ops = _.extend({
                wrap: $('body'),
                page: 1,
                row: 5
            }, ops)

            var tag = `<div id="answerRanking" class="frame">
                    <div class="title">
                        <span class="fa-online"></span>
                        <span class="text">解答排行</span>
                    </div>
                    <div class="content"></div>
                    <script type="text/html" id="answerRanking-template">
                        {{each}}
                        <div class="item clear">
                            <div class="user-head fl">
                                <a href="/live/liveDetailLive.htm?teacherid={{$value.answeruserid}}">
                                <img src="{{$value.photo}}" title="{{$value.teachertitle}}"/>
                                </a>
                            </div>
                            <div class="string fl">
                                <p class="user-name">
                                    <span>{{$value.teachertitle}}</span>
                                    <span class="ask-btn fr" data-id="{{$value.answeruserid}}">向TA提问</span>
                                </p>
                                <p class="count">回答<span>{{$value.answercount}}</span>有帮助<span>{{$value.zancount}}</span></p>
                            </div>
                        </div>
                        {{/each}}
                    </script>
            </div>`

            ops.wrap.append(tag);
            this.page = ops.page;
            this.row = ops.row;
            this.container = $('#answerRanking');
            this.event();
        },
        render: function(ops) {

            var _this = this;
            yndata.answerask({ page: this.page, row: this.row }).done(function(data) {
                console.log(" 解答排行", data)
                data = data.rows.sort(function(a, b) {
                    return (+b.answercount) - (+a.answercount);
                })
                _this.container.find('.content').html(template('answerRanking-template', data));
            });
        },
        handleData: function(data) {
            return _.map(data, function(item) {
                return item;
            })
        },
        event: function() {
            var _this = this;
            this.container.on('click', '.ask-btn', function() {
                var id = $(this).data('id');
                var name = $(this).prev().text();
                var element = {
                    id: id,
                    name: name
                }
                _this.handler.showQuestionWindow(element);
            })
        }
    }
}


/**
 * 相关问答
 * include file="../common/relativeAsk.jsp" //将标签放进相应的容器中//
 * o = new ynmodule.ReativeAsk()
 * o.init(stockName, stockCode);
 * o.render();
 */
ynmodule.ReativeAsk = function() {}
ynmodule.ReativeAsk.prototype = {
    stockCode: null,
    stockName: null,
    page: 1,
    row: 5,
    init: function(stockName, stockCode) {
        this.stockCode = stockCode;
        this.stockName = stockName;
    },
    getData: function(callback) {
        var _this = this;
        $.getJSON("/consultation/queryAboutStocktrend.htm", {
            stockcode: _this.stockCode,
            currentPage: _this.page,
            pageSize: _this.row
        }, function(data) {
            if (data.status == 1) {
                data = data.data
                callback(data);
            }

        })
    },
    render: function() {
        if (!this.stockCode) {
            return;
        }
        var _this = this,
            container = $('#relativeChat'),
            items = container.find('.items'),
            name = container.find('.name'),
            code = container.find('.code'),
            up = container.find('.txts .up .value'),
            down = container.find('.txts .down .value'),
            upLine = container.find('.line .up'),
            downLine = container.find('.line .down'),
            href = container.find('.title a');

        container.show();
        name.text(this.stockName);
        code.text(this.stockCode);
        href.attr('href', `/marketLine.htm?stockcode=${this.stockCode}`)
        this.getData(function(data) {
            console.log("相关问答", data)

            //涨跌
            up.text(data.onCount);
            down.text(data.downCount);
            var total = (+data.onCount) + (+data.downCount);
            upLine.css('width', data.onCount / total * 100 + '%');
            downLine.css('width', data.downCount / total * 100 + "%");

            var questionData = _this.handle(data.note);
            items.html(template('old-template', questionData));
        })
    },
    handle: function(data) {
        return _.map(data, function(item) {
            item.questiontime = yn.timeFormat(item.questiontime);
            return item;
        })
    }
}


/**
 * 观点打赏
 * 1. include: common/moudle-playtour.jsp
 * 2. 初始化(DOM加载完毕) : var playtour = ynmodule.playtour();
 * playtour.init();
 * 3. 显示弹层：playtour.render(), 
 */
ynmodule.playtour = function() {

    return {
        container: $('#playtour'),
        group: $('#playtour .group'),
        optional: $('#playtour #optional'),
        confirmPrice: $('#playtour .confirmPrice'),
        getPrice: $('#playtour .getPrice'),
        goodsId: null,
        balance: null,
        init: function() {
            var _this = this;
            yn.centerBox(this.container);
            this.event();
            yndata.balance().done(function(data) {
                _this.container.find('.balance .fl').text("可用余额" + data.balance + "牛币")
            })
        },
        event: function() {
            var _this = this;
            //关闭
            this.container.on('click', '> .close', function(e) {
                _this.confirmPrice.hide();
                _this.getPrice.show();
                _this.container.hide();
            })

            //打赏type
            this.group.on('click', 'span', function() {
                $(this).parent().find('.thistype').removeClass("thistype");
                $(this).addClass("thistype");
                var datatype = _this.container.find('.thistype').data("type");
                _this.optional.val(datatype);
                _this.optional.focus();
            })

            //同意支付
            this.container.on('change', '.agreement', function() {
                var checked = $(this).get(0).checked;
                if (checked) {
                    $('#pay-jump').show();
                    $('#pay-jump-button').hide();
                } else {
                    $('#pay-jump').hide();
                    $('#pay-jump-button').show();
                }
            })

            this.container.on('click', '.submit', function() {
                var teacherid = $('.publish-source').data("id");
                var optional = _this.optional.val();
                if (!/^[1-9][0-9]*$/.test(optional)) {
                    layer.msg("客官，真的不能再少了(╯﹏╰) !");
                    return;
                };
                _this.confirmPrice.show();
                _this.getPrice.hide();
                _this.confirmPrice.find('.payName').html('观点打赏');
                $('#shouldPayValue').html(optional);
                $('#finalPayValue').html(optional);
                yndata.indentNum({ goodsId: _this.goodsId, goodsType: 0, totalPrice: optional, teacherId: teacherid }).done(function(data) {
                    if (data.status == "1") {
                        var url = "/html/returnshortcutpayJsp.htm?orderNum=" + data.data.orderNum;
                        $('#pay-jump').attr('href', url)
                    } else {
                        layer.msg("参数错误 : " + data.status);
                        return;
                    }
                })
            })
            $('#pay-jump').on('click', function() {
                _this.reset();
                var payTip = new ynmodule.JudgePay();
                payTip.init();
                payTip.render();
            })
        },
        reset: function() {
            this.confirmPrice.hide();
            this.getPrice.show();
            this.container.hide();
            this.container.find('input').val("")
        },
        render: function(goodsId) {
            var _this = this;
            this.goodsId = goodsId;
            this.container.velocity('transition.expandIn', { duration: 300 })
            this.optional.val('');
            this.group.find('.thistype').removeClass("thistype");
            yndata.balance().done(function(data) {
                _this.balance = data.balance;
                _this.container.find('.balance .fl').text("可用余额" + data.balance + "牛币")
            })
        }
    }
}



/*@=module=@*/

/**
 * 支付提示
 * <%@  include file="../common/moudule-judgePay.jsp" %>
 * o = new ynmoudle.judgePay(); 
 * o.init()
 * o.render()
 */
ynmodule.JudgePay = function() {}
ynmodule.JudgePay.prototype = {
    container: null,
    init: function() {
        var _this = this;
        this.container = $('#judgePay');
        yn.centerBox(this.container);

        //关闭
        this.container.on('click', '> .close', function(e) {
            _this.container.hide();
        })

        //支付完成
        this.container.on('click', '#finishPay', function() {
            yndata.payStatus().done(function(data) {
                console.log(data)
                if (data == "1" || data == "6") {
                    layer.msg('支付完成！感谢打赏老师！');
                    _this.container.hide();
                } else {
                    layer.msg('支付未完成！请稍后再试！');
                }
            })
        })
    },
    render: function() {
        this.container.show();
        this.container.velocity('transition.expandIn', { duration: 300 })
    }
}


/**
 * 观点分类导航
var opinionType = new ynmodule.opinionType()
opinionType.init();
opinionType.render({select:0});
opinionType.delegate.click = function(type) {
    type : [0, 1, 2, 3]
}
 */
ynmodule.opinionType = function() {
    this.container = null;
    this.select = 0
}
ynmodule.opinionType.prototype = {
    init: function() {
        var _this = this;
        this.container.on('click', '.opinionType-item', function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
            var type = $(this).data('id');
            _this.delegate.click(type)
        })
    },
    render: function(ops) {
        this.container.html(yn.opinionType({ select: this.select }))
    },
    delegate: {
        click: function(type) {
            alert(type)
        }
    }
}



/**
 * 观点列表 : 
 *  include file="../common/module-opinion-list.jsp" 
   opinionList = new ynmodule.opinionList();
    opinionList.init();
    opinionList.render();

    type : [大盘,题材,鉴股,股票学院]
 */


ynmodule.opinionList = function() {}
ynmodule.opinionList.prototype = {
    container: null,
    teacherid: null,
    bootpag: null,
    page: 1,
    row: 15,
    type: 0,
    init: function() {
        var _this = this;
        if (this.bootpag) {
            this.bootpag.on('page', function(err, num) {
                _this.page = num;
                _this.render()
            })
        }
    },
    render: function() {
        var _this = this;

        function handleData(data) {
            return _.map(data, function(item) {
                item.create_time = yn.timeFormat(item.create_time);
                item.detail = "/article/newDetail.htm?article_id=" + item.article_id
                item.trendStyle = item.stock_trend || "hide"
                item.trend_text = ["看涨", "看跌"][item.stock_trend]
                return item;
            })
        }

        function setBootpag(totalNumber) {
            if (_this.bootpag) {
                if (totalNumber == -1) {
                    _this.bootpag.hide()
                    return;
                }
                _this.bootpag.show();
                _this.bootpag.bootpag({ page: _this.page, total: totalNumber });
            }
        }

        yndata.getOpinion({
            page: this.page,
            row: this.row,
            type: this.type,
            teacherid: this.teacherid
        }).done(function(data) {
            console.log("观点列表", data)
            data.rows = handleData(data.rows);
            if (data.rows.length < 1) {
                _this.container.html(ynconfig.none({ margin: 100 }))
                setBootpag(-1);
                return;
            }
            _this.container.html(template('opinion-list-item-template', data.rows))
            setBootpag(data.pageNumber);
            _this.delegate.done({ total: data.total });
        })

    },
    delegate: {
        done: function(info) {}
    }
}


/**
 * 热门观点
 * hotOpinion.init($container);
   hotOpinion.render();
 */
ynmodule.hotOpinion = function() {
    var container;

    var handleData = function(data) {
        return _.map(data, function(item, i) {
            item.create_time = yn.timeFormat(item.create_time);
            item.index = i + 1;
            item.red = i <= 2;
            item.noteType = ynconfig.opinionType[item.classify].name
            item.detail = "/article/newDetail.htm?article_id=" + item.article_id;
            return item;
        })
    }

    var compile = function(data) {
        return _.map(data, function(item) {
            return `<div class="hot-opinion-item">
                    <span class="index ${item.red}">${item.index}</span>
                    <div class="content">
                        <a href="${item.detail}" target="_blank" class="name">${item.title}</a>
                        <div class="info">
                            <span class="author">${item.createrName}</span>
                            <span class="time">${item.create_time}</span>
                            <span class="noteType"><i class="yn-icon yn-icon-note"></i>${item.noteType}</span>
                        </div>
                    </div>
                </div>`
        }).join('');
    }

    return {
        init: function(_container) {
            container = _container;

        },
        render: function() {
            yndata.queryOpinion().done(function(data) {
                container.html(compile(handleData(data.rows)))
            })

        }
    }
}


/**
 * 表情包
 * include file="../common/module-face.jsp"
 * var face = new ynmodule.face();
 * face.init();
 * face.render(offset);
 * face.delegate.select(faceCode)
 */
ynmodule.face = function() {
    this.container = $("#expression-wrap");
}

ynmodule.face.prototype = {
    init: function() {
        var item = this.container.find('.hand');
        var info = $('#bqInfos');
        var title = info.find('.title');
        var gif = info.find('.gif');
        var _this = this;

        //表情提示
        item.on('mouseenter', function(e) {
            var o = $(this).position();
            info.css({
                left: o.left - 10,
                top: o.top - 55
            });

            title.text($(this).data('title'));
            gif.attr('src', '/public/icons/face/' + $(this).data('code') + '.gif');

            info.show();
        });

        this.container.on('mouseleave', function() {
            info.hide();
            $(this).hide();
        });

        item.on('click', function() {
            var code = $(this).data('code');
            _this.delegate.select('[face=' + code + ']');
            _this.container.hide();
            return false;
        });
    },
    render: function(offset) {
        this.container.show().css({
            left: offset.left,
            top: offset.top
        });
    },
    delegate: {
        select: function(faceCode) {
            alert(faceCode)
        }
    }
}



/**
 * 我的问答
 */
ynmodule.AskStockWithTeacher = function() {}
ynmodule.AskStockWithTeacher.prototype = {
    container: null,
    teacherid: null,
    type: "",
    page: 1,
    row: 15,
    bootpag: null,
    total: -1,
    init: function() {},
    render: function() {
        var _this = this;

        var setBootpag = function(pageNumber) {
            if (_this.bootpag) {
                if (pageNumber == -1) {
                    _this.bootpag.hide();
                    return;
                }
                _this.bootpag.show();
                _this.bootpag.bootpag({ page: _this.page, total: pageNumber })
            }
        }

        yndata.getMyAnswerWithType(this.teacherid, {
            page: this.page,
            row: this.row,
            type: this.type
        }).done(function(data) {
            console.log("问答列表", data);
            data.data = _this.handleData(data.data);
            if (data.data.length < 1) {
                _this.container.html(ynconfig.none({ margin: 100 }));
                setBootpag(-1);
                return;
            }
            _this.container.html(template('answer-list-template', data.data));
            setBootpag(data.pageNumber);

            //总数
            if (_this.type === "" && +_this.total == -1) {
                _this.total = data.total;
                _this.delegate.done({ total: data.total })
            }
        })
    },
    handleData: function(data) {
        return _.map(data, function(item) {
            item.answertime = yn.timeFormat(item.answertime);
            item.answercontent = yn.filterHTML(item.answercontent);
            return item;
        })
    },
    delegate: {
        done: function(info) {}
    }
}

/**
 * 我的问答分类
 */
ynmodule.AskStockCategory = function() {
    this.select = -1;
    this.container = null;
    this.hasAll = true;
}

ynmodule.AskStockCategory.prototype = {
    init: function() {
        var _this = this;
        this.container.on('click', '.askStock-category-item', function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
            var id = $(this).data('id');
            _this.delegate.click(id);
        })
    },
    render: function() {
        var ops = { select: this.select }
        ops.hasAll = this.hasAll;
        if (!this.hasAll) {
            ops.select = 2
        }
        this.container.append(yn.getAskStockCategory(ops));
    },
    delegate: {
        click: function(select) {
            alert(select)
        }
    }
}


/**
 * 查询老师的问答, 可以基于不同的字段排序
 * include file="../common/tableView.jsp"
 */
var BestAnswer = function() {}
BestAnswer.prototype = {
    teacherid: null,
    container: null,
    row: 8,
    sort: "note_readcount", //// sort : questiontime提问时间，note_readcount，阅读量，zancount点赞量，answertime回答时间
    render: function() {
        var _this = this;
        yndata.queryTeacherHotAnswer(this.teacherid, {
            row: _this.row,
            sort: _this.sort
        }).done(function(data) {
            var rows = handleData(data.rows);
            var tableView = new TableView();
            tableView.container = _this.container;
            tableView.data = rows;
            tableView.init();
            tableView.render();
        })

        function handleData(data) {
            return _.map(data, function(item) {
                item._title = item.questioncontent;
                item._content = yn.filterHTML(item.answercontent);
                item._time = yn.timeFormat(item.answertime);
                item._link = "/consultation/askStockDetail.htm?id=" + item.noteid
                item._class_time = "show";
                item._class_view = "show";
                item._count_view = item.note_readcount
                return item;
            })
        }
    }
}


/**
 *  TableView
 *  include talbeView.jsp
 *  _title, _content, _time,  _link, _count_view, _count_zan, _count_comment
 *  _class_time, _class_zan, _class_view, _class_comment
 */
var TableView = function() {
    this.container = null;
    this.data = null;
}

TableView.prototype = {
    init: function() {},
    render: function() {
        this.data = this.dataMap(this.data);
        this.container.html(template('tableView-template', this.data))
    },
    dataMap: function(data) {
        return _.map(data, function(item) {
            item._title = item._title || "";
            item._content = item._content || "";
            item._time = item._time || "";
            item._link = item._link || "#";
            item._count_view = item._count_view || "";
            item._count_zan = item._count_zan || "";
            item._count_comment = item._count_comment || "";

            item._class_content = item._style_content || "";
            item._class_time = item._class_time || "hide";
            item._class_zan = item._class_zan || "hide";
            item._class_view = item._class_view || "hide";
            item._class_comment = item._class_comment || "hide";

            return item;
        })
    }
}


/**
 * 老师观点
 *   include file="bestOpinion.jsp"
 *   var a = new TeacherBestOpinion()
 *   a.render();
 */
var TeacherBestOpinion = function() {}
TeacherBestOpinion.prototype = {
    order: "viewnumber", ////comment_count，zan_count，cai_count，create_time，viewnumber  评论数据，赞数量，踩数量，创建时间，浏览量
    container: null,
    teacherid: null,
    row: 5,
    init: function() {},
    render: function() {
        var _this = this;
        var handleData = function(data) {
            return _.map(data, function(item) {
                item._content = function() {
                    var result = "";
                    result = item.opinionShortContent.replace(/^【.+?】/, '')
                    return result
                }()

                return item;
            })
        }
        yndata.getTeacherBestOpinion(this.teacherid, { row: this.row, order: this.order }).done(function(data) {
            console.log("精彩观点", data);
            data.rows = handleData(data.rows);
            _this.container.html(template('bestOpinion-list-template', data.rows));
        })
    }
}


/**
 * 查询老师的正在直播信息
 * o.container, o.teacherId
 * o.render()
 */
var TeacerLivingInfo = function() {}
TeacerLivingInfo.prototype = {
        container: null, //*
        teacherId: null, //*
        ItemId: "", //直播发言ID
        page: 1,
        row: 3,
        init: function() {},
        render: function() {
            var _this = this;
            yndata.getTeacherLiveInfo(this.teacherId, { page: this.page, row: this.row, id: this.ItemId }).done(function(data) {
                console.log("直播信息", data);
                if (+data.total < 1) {
                    return;
                }
                var rows = handleData(data.rows.periodical);
                _this.container.html(createHTML(rows));
            })

            function handleData(data) {
                return _.map(data, function(item) {
                    if (item.contentFilter.length > 100) {
                        item.contentFilter = item.contentFilter.substr(0, 100) + "..."
                    }
                    return item;
                })
            }

            function createHTML(data) {
                return _.map(data, function(item) {
                    return `<div class="living-item">
                    <div class="living-time">${item.pubtimeString}</div>
                    <div class="living-content">${item.contentFilter}</div>
                </div>`
                }).join("")
            }
        }
    }
    /**
     * 订阅内参
     * 1. include: common/moudle-subscription.jsp
     * 2. 初始化(DOM加载完毕) : var subscription = ynmodule.subscription();
     * subscription.init();
     * 3. subscription.render(), 
     * 
     */


ynmodule.subscription = function() {
    return {
        container: $('#subscription'),
        group: $('#subscription .group'),
        confirmPrice: $('#subscription .confirmPrice'),
        getPrice: $('#subscription .getPrice'),
        goodsId: null,
        balance: null,
        teacherid: null,
        optional: null,
        init: function() {
            var _this = this;
            yn.centerBox(this.container);
            this.event();
            yndata.balance().done(function(data) {
                _this.container.find('.balance .fl').html("可用余额" + data.balance + "牛币")
            })
        },
        event: function() {
            var _this = this;
            //关闭
            this.container.on('click', '> .close', function(e) {
                    _this.confirmPrice.hide();
                    _this.getPrice.show();
                    _this.container.hide();
                })
                //同意支付
            this.container.on('change', '.agreement', function() {
                var checked = $(this).get(0).checked;
                if (checked) {
                    $('#pay-jump').show();
                    $('#pay-jump-button').hide();
                } else {
                    $('#pay-jump').hide();
                    $('#pay-jump-button').show();
                }
            })
            this.container.on('click', '.submit', function() {
                _this.confirmPrice.show();
                _this.getPrice.hide();
                _this.confirmPrice.find('.payName').html('内参订阅');
                $('#shouldPayValue').html(_this.optional);
                $('#finalPayValue').html(_this.optional);
                yndata.referindentNum({ goodsId: _this.goodsId, goodsType: 3, }).done(function(data) {
                    if (data.status == "1") {
                        var url = "/html/returnshortcutpayJsp.htm?orderNum=" + data.data.orderNum;
                        $('#pay-jump').attr('href', url)
                    } else {
                        layer.msg("参数错误 : " + data.status);
                        return;
                    }
                })
            })
            this.container.on('click', '#pay-jump', function() {
                _this.reset();
                var payTip = new ynmodule.JudgePay();
                payTip.init();
                payTip.render();
            })
        },
        reset: function() {
            this.confirmPrice.hide();
            this.getPrice.show();
            this.container.hide();
        },
        render: function(goodsId) {
            var _this = this;
            this.goodsId = goodsId;

            this.container.velocity('transition.expandIn', { duration: 300 })

            yndata.balance().done(function(data) {
                this.balance = data.balance;
            })
            yndata.referInquire({ id: goodsId }).done(function(data) {
                _this.handle(data)
            })
        },
        handle: function(data) {
            this.teacherid = data.teacherid;
            this.optional = data.price;
            this.container.find('.group .title').html(data.title);
            this.container.find('.price').html(data.price);

        }
    }
}


/**
 * 发表评论模块
<%@  include file="../common/postComment.jsp" %>
<%@  include file="../common/module-face.jsp" %>
 * o = new ynmodule.PostComment
 * o.delegate.submit({value})
 * o.addReply(id, name);
 */
// ynmodule.PostComment = function(ops) {
//     _.extend(this, ops)
// }
// ynmodule.PostComment.prototype = {
//     container: null,
//     limit: 200,
//     parentId: null,
//     reply: null,
//     init: function() {
//         var _this = this;
//         this.container = $('#ynPostComment');
//         var textarea = this.container.find('textarea');
//         var faceHolder = this.container.find('.face-holder');
//         var submit = this.container.find('.submit');
//         this.reply = this.container.find('.reply');

//         //word limit
//         this.container.find('.wordValue').text(this.limit);
//         yn.wordCount(textarea, {
//             indicate: this.container.find('.word-indicate'),
//             limit: this.limit
//         })

//         textarea.on('focus', function() {
//             if (!ynIsLogin) {
//                 yn.login.render();
//                 textarea.blur();
//                 return;
//             }
//         })

//         //submit
//         submit.click(_.debounce(function() {
//             var val = textarea.val();
//             if (!val || val.length < 3) {
//                 layer.msg("至少3个字")
//                 return;
//             }
//             var send = { value: val }
//             if (_this.parentId) {
//                 send.parentId = _this.parentId
//             }
//             _this.delegate.submit(send);
//             reset()
//         }, 2000, { leading: true, trailing: false }));


//         var reset = function() {
//             _this.parentId = null;
//             _this.reply.empty();
//             textarea.val("").trigger('keyup');
//         }

//         this.reply.on('click', '.reply-close', function() {
//             _this.reply.empty();
//             _this.parentId = null;
//         })

//         //face 
//         var face = new ynmodule.face();
//         face.init();
//         face.delegate.select = function(code) {
//             var val = textarea.val();
//             textarea.val(val + code);
//         }
//         faceHolder.click(function() {
//             if (!ynIsLogin) {
//                 yn.login.render();
//                 return;
//             }
//             face.render($(this).offset());
//         })
//     },
//     addReply: function(commentId, talker) {
//         var tag = '<span class="txt">回复：</span>' +
//             '<span class="reply-name">' + talker + '</span>' +
//             '<span class="reply-close fa fa-times-circle"></span>';
//         this.reply.html(tag)
//         this.parentId = commentId;
//     },
//     delegate: {
//         submit: function() {
//             alert("delegate.submit not override");
//         }
//     }
// }



/**
 * 个人简介信息
 * <%@  include file="../modules/person-info.jsp" %>
 * o = new ynmoudle.PersonInfo()
 * o.container
 * o.uesrId 
 * o.init()
 * o.render()
 */
ynmodule.PersonInfo = function() {}
ynmodule.PersonInfo.prototype = {
    container: null,
    uesrId: null,
    askWindow: null,
    init: function() {
        this.askWindow = ynmodule.askWindow();
        this.askWindow.init();
    },
    render: function() {
        var personData = null;
        var _this = this;
        if (!this.userId) {
            throw "ynmodule.PersonInfo.userId 属性不能为空"
            return;
        }

        var handleData = function(data) {
            data._isCare = data.isAttention ? "取消关注" : "关注";
            data._isAttentionText = String(data.isAttention);
            return data;
        }

        $.getJSON("/userinfo/queryUserAllInfo.htm?user_id=" + this.userId, function(data) {
            console.log("用户信息", data);
            personData = handleData(data);
            _this.container.html(template('person-info-template', personData));

            //关注
            _this.container.on('click', 'button.care.false', function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                var el = $(this);
                yndata.addCare(ynUserId, personData.teacherid).done(function() {
                    el.attr('class', 'care true').text("取消关注");
                });
            })

            //取消关注
            _this.container.on('click', 'button.care.true', function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                var el = $(this);
                yndata.cancelCare(ynUserId, personData.teacherid).done(function() {
                    el.attr('class', 'care false').text("关注");
                });
            })

            //提问
            _this.container.find('button.ask').click(function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                _this.askWindow.render();
                _this.askWindow.add(data.teacherid, data.title)
            })
        })
    }
}
