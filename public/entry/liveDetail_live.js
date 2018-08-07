var Face = require('m/qqface/main.js');
var askWindow = require('base/askWindow.js'); //提问
var liveAskStockList = require('base/live-askStock-list.js');
// var local = require('m/lib/localData.js')
var error = require('e/error-type')
    // var payAny = require('m/ui/pay-any.js')
    // var payConfirm = require('m/ui/pay-confirm-v1.2.js')
var Confirm = require('m/ui/pay-any-package.js');
var payShow = require('m/ui/pay-animation.js')
var stockList = require('~/ui/stockList-1.2.js') // 大盘指数
    /*///////////////////////////////////////////////////////////////////*/

var audio, msn, __dataCache = {};
var __href = window.location.href;
var cateMatch = __href.match(/live/)
var __cate = cateMatch ? cateMatch[0] : ""
    // //历史期刊ID
var historyId = (function() {
    var match = window.location.href.match(/periodical=([0-9]+)/)
    return match ? match[1] : periodicalid
})();

var route = {
    liveCommon: function() {
        liveHistory.init(room_userid);
        subject.init(); //主题
        living.init(periodicalid); //直播
        chat.init(periodicalid); //浅聊
        talk.init(); //聊天

        living.render();
        chat.render();
        liveDetailSocket();
    },
    self: function() {
        this.liveCommon();
        modifyWin.init();
        pubLive.init();
        subject.showEidt();
        pubLive.render();
        closeLiveRoom.init();
        liveAskStockList.init();
    },
    user: function() {
        this.liveCommon();
        gift.init();
        gift.render();
    },
    historyList: function() {
        liveHistory.init(room_userid);
        liveHistory.render();
    },
    historyDetail: function() {
        liveHistory.init(room_userid);
        subject.init(); //主题
        // if()
        chat.init(historyId); //浅聊
        living.init(historyId); //直播
        $('#liveContent-title-1').text('第' + historyId + "期直播内容")
        living.history_render();
        chat.render();
    },
    offline: function() {
        this.liveCommon();
    }
}


$(function() {
    //HTML5音频
    try {
        audio = new Audio('/public/media/live_msg.mp3');
        msn = new Audio('/public/media/msn_msg.mp3');
    } catch (e) {
        $('.yn-icon-sound').hide();
    }

    var isOffline = teacher_isOffline == "-1";
    var entries = [
        { entry: 'offline', assert: hasHistoryLive }, //没有在线
        // { entry: 'historyDetail', assert: isOffline && !isTeacherSelf }, //没有在线
        { entry: 'historyDetail', assert: (historyId && (historyId != periodicalid)) || isOffline && !isTeacherSelf }, //历史详情
        { entry: 'historyList', assert: isOffline }, //历史直播
        { entry: 'self', assert: isTeacherSelf }, //老师进入正在直播
        { entry: 'user', assert: true }, //正在直播
    ]
    var entry = _.find(entries, item => item.assert);
    route[entry.entry]();


    if (__cate == "live") {
        var item = $($('.liveDetail-menu .item')[1])
        item.addClass('select')
    }

    if (isTeacherSelf) {
        addTop.init();
        addTop.render();
    }

    topDetail.init();
    topDetail.render();
    askWindow.init();
    sideTool.init();

    //上下期
    turnPeriodical.init()

})


// /*///////////////////////////////////////////////////////////////////*/


//主题
var subject = function() {
    var container, history, boxWrap, box, edit, title;
    return {
        init: function() {
            container = $('.living-subject');
            history = container.find('.history');
            edit = $(".edit-subject");
            title = $('.living-subject-value');

            //进入历史直播
            history.on('click', function() {
                $('#liveDetail').hide();
                liveHistory.render();
            })

            //显示修改窗口
            edit.click(function() {
                modifyWin.render(title.text());
                modifyWin.onDone = function(val) {
                    title.text(val)
                }
            })
        },
        render: function(ops) {
            title.text(ops.title)
        },
        showEidt: function() {
            edit.css('display', 'inline-block')
        }
    }
}()



// /**
//  * 修改主题窗口
//  * render()
//  * delegate.done(val)
//  */
var modifyWin = function() {
    var id, container, wrap, input, submit, wordCount
    return {
        init: function() {
            id = periodicalid;
            var self = this;
            wrap = $("#modify-subject-container");
            container = $("#modify-subject");
            input = container.find('textarea')
            submit = container.find('.submit')
            wordCount = container.find('.wordCountValue');

            //关闭窗口
            container.on('click', '.close', () => wrap.hide() && input.val(""))
            yn.wordCount(input, { indicate: wordCount, limit: 20 })

            //提交
            submit.click(_.debounce(function() {
                if (!input.val()) return layer.msg("主题不能为空");
                submit();
            }, 2000, { leading: true, trailing: false }))

            var submit = function() {
                var val = input.val()

                //修改直播主题
                $.post("/center/editPeriodical.htm", {
                    periodicalid: id,
                    todaysubject: val
                }, function(data) {
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        layer.msg("修改成功");
                        wrap.hide()
                        self.onDone(val)
                    } else {
                        return layer.msg(error[data.status])
                    }
                });
            }
        },
        render: function(data) {
            if (ynTeacherId != room_teacherid) return;
            wrap.show();
            yn.centerBox(container);
            data && input.val(data).trigger('keyup')
        },
        onDone: function() {}
    }
}()

//获取昨天
function getYesterday() {
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
    return s1
}

//获取昨天
function beforeYesterday() {
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000 * 2);
    var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
    return s1
}
//日期获取毫秒数
function getSeconds(date) {
    var time = new Date(date.replace(/-/g, '/'));
    var seconds = time.getTime()
    return seconds
}
//时间转换
function timeFormat(time) {
    //时间转换
    var strtime = time;
    var result;
    var newDate = new Date()
    var date = getSeconds(strtime)
    const sub = Date.now() - date;
    const yesterday = 1000 * 60 * 60 * 48;
    const yesterdayStart = getSeconds(getYesterday() + ' ' + '00:00:00') //昨天开始时间
    const yesterdayEnd = getSeconds(getYesterday() + ' ' + '23:59:59') //昨天结束时间
    const beforeyesterdayStart = getSeconds(beforeYesterday() + ' ' + '00:00:00') //前天开始时间
    const beforeyesterdayEnd = getSeconds(beforeYesterday() + ' ' + '23:59:59') //前天结束时间
    const thisYear = getSeconds(newDate.getFullYear() + '-01-01' + ' ' + '00:00:00') //今年开始时间
    if (date > yesterdayEnd) {
        result = '今天' + strtime.substr(10, 6)
    } else if (date >= yesterdayStart && date <= yesterdayEnd) {
        result = '昨天' + strtime.substr(10, 6)
    } else if (date >= beforeyesterdayStart && date <= beforeyesterdayEnd) {
        result = '前天' + strtime.substr(10, 6)
    } else {
        result = istrtime.substr(0, 16)
    }
    return result
}


// 关注
var addCare = function(teacherid, isCare) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", { teacherid: teacherid }, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            var html = isCare == '关注' ? '关注成功' : '取消成功'
            layer.msg(html);
            defer.resolve();
        } else {
            layer.msg(error[data.status])
        }
    })
    return defer.promise();
}

//正在直播
var living = function() {
    var id, //期刊id
        talkId = "", //发言ID
        container, wrap, items, today, history, page = 1,
        row = 20,
        nothing = false,
        bootpag,
        liveContent;

    var cur = null // 当前显示的是正在直播还是历史直播


    var getData = function(callback) {
        $.getJSON("/html/queryLiveInfo.htm", {
            id: talkId,
            periodicalid: id,
            pageSize: row
        }, function(data) {
            callback(data);
        })
    }

    /*  创建标签 */

    var createItems = arr => {
        return _.map(arr, item => {

            var normalMessage = `<div class="live-item-2 clear" data-id="${item.id}">
                        <div class="time"><span class="time-detail">${item._time}</span></div>
                        <div class="photo avatar"><img src="${item.teacherPhoto}" alt="" /></div>
                        <div class="msg">
                            <span class="name">${item.teacherName}<i class="zhubo-icon"></i></span>
                        </div>
                        <div class="content">
                            <span class="content-jiao"></span>
                            <div class="live-detail">${item.content} ${item.btn}</div>
                            ${item.deleteItem}
                        </div>
                    </div>`
            var card = `<div class="live-item-2 clear" data-id="${item.id}">
                <div class="time"><span class="time-detail">${item._time}</span></div>
                <div class="photo avatar"><img src="${item.teacherPhoto}" alt="" /></div>
                <div class="msg">
                    <span class="name">${item.teacherName}<i class="zhubo-icon"></i></span>
                </div>
                <div class="content">
                    <span class="content-jiao"></span>
                    <div class="message-card ${item.cardName} ${item.style}">
                        <p>${item.answer}</p>
                        <div class="card">
                            <div class="card-title">${item._title}</div>
                            <div class="card-content">${item._quotecontent}</div>
                        </div>
                    </div>
                    ${item.deleteItem}
                </div>
            </div>`
            var tag = item.quotecontent ? card : normalMessage
            return `${tag}`
        }).join("")
    }

    var handleLiveData = arr => {
        return _.map(arr, item => {
            item.content = yn.codeFormat(item.content);
            item.photo = item.photo || item.teacherPhoto
            item.deleteItem = room_teacherid == ynTeacherId ? `<div class="deleteIcon hide delete" data-id="${item.id}"></div>` : "";
            item._link = item.link ? `href = ${item.link}` : ''
            item._time = timeFormat(item.pubtime);
            // 打赏消息
            item.isPay = item.puiblisherid === "0";
            item.answer = '';

            if (item.quotecontent && item.quotecontent.length > 80) {
                item._quotecontent = item.quotecontent.substr(0, 80) + '…'
            } else if (item.quotecontent && item.quotecontent.length < 30) {
                item._quotecontent = item.quotecontent;
                item.style = 'line';
            } else {
                item._quotecontent = item.quotecontent;
                item.style = '';
            }

            if (item.contentFilter && item.contentFilter.length > 60) {
                item._contentFilter = item.contentFilter.substr(0, 60) + '…'
            } else {
                item._contentFilter = item.contentFilter;
            }

            //link
            if (item.link && item.link.indexOf('referenceid') != '-1') {
                item.cardName = 'refer';
                item._title = item._contentFilter;
                item.btn = `<span class="live-link refer">立即查看</span>。`
            } else if (item.link && item.link.indexOf('askStockDetail') != '-1') {
                item.cardName = 'ask';
                item._title = "";
                item.answer = item._contentFilter;
            } else if (item.link && item.link.indexOf('learning') != '-1') {
                item.cardName = 'tactics';
                if (item.contentFilter && item.contentFilter.length > 22) {
                    item._title = item.contentFilter.substr(0, 22) + '…'
                } else {
                    item._title = item.contentFilter;
                }
            } else if (item.link && item.link.indexOf('article_id') != '-1') {
                item.cardName = 'opinion';
                item._title = item._contentFilter;
            } else {
                item.cardName = '';
                item.btn = '';
            }
            return item
        })
    }

    function event() {


        container.find('.photo img').each(function() {
            if ($(this).attr('src') == '') {
                $(this).attr('src', 'http://live.yuetougu.com/public/images/yn.jpg')
            }
        })


        /*滚动到顶部加载更多*/
        var isTop = false
        $('#live .items').scroll(function() {
            var h = $('#live .items').scrollTop()
            if (h == 0 && !isTop) {
                isTop = true
                var scroll = items[0].scrollHeight
                talkId = cur.find('.live-item-2').eq(0).data('id');
                var el = $(this);
                getData(data => {
                    if (data.status == 1) {
                        isTop = false
                        if (data.data.list.length < row) {
                            layer.msg("已加载全部")
                            isTop = true
                        }
                        cur.prepend(createItems(handleLiveData(data.data.list)));
                        items.scrollTop(items[0].scrollHeight - scroll);
                    } else {
                        return layer.msg(error[data.status])
                    }

                })
            }
        })


        /* 声音提示 */

        container.on('click', '.yn-icon-sound', function() {
            $(this).toggleClass('stop');
            living.enableAudio = !living.enableAudio;
        })

        /* 删除直播 */

        container.on('click', '.delete', function() {
            if (+room_teacherid != ynTeacherId) return;
            var el = $(this);
            var item = $(this).parents(".live-item-2");
            layer.confirm("确定要删除吗?", function(index) {
                var id = el.data('id');
                $.post('/html/broadcasting/delBroadcasting.htm', { id: id }, function(data) {
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        layer.msg('已删除')
                        return item.remove() && layer.close(index);
                    } else {
                        return layer.msg(error[data.status])
                    }
                })
            })
        })

    }

    return {
        enableAudio: true,
        init: function(_id) {
            id = _id;
            container = $("#live");
            wrap = $("#liveDetail");
            items = container.find('.items');
            liveContent = container.find('.today-item');
            today = items.find('.today')
            history = items.find('.history')
            living.setting.init();
            tooltip.init();
            event();

            //点击图片放大
            items.on('click', 'img', function() {
                if ($(this).parent().hasClass('avatar')) {
                    return
                }
                var src = $(this).attr('src')
                $('.img-wrap').fadeIn(100).find('#img-wrap-img').attr('src', src)
            })
            $('.img-wrap').click(function() {
                $(this).fadeOut(100)
            })
        },
        history_render: function() {
            cur = history
            history.show()
            wrap.show();
            today.hide();

            getData(data => {
                if (data.status == 1) {
                    if (data.data.list.length < 1) {
                        return
                    }
                    history.append(createItems(handleLiveData(data.data.list)));
                    items.scrollTop(items[0].scrollHeight);
                } else {
                    return layer.msg(error[data.status])
                }
            })
        },
        render: function() {
            cur = today
            history.hide()
            wrap.show();
            today.show();

            getData(data => {
                if (data.status == 1) {
                    if (data.data.list.length < 1) {
                        return
                    }
                    liveContent.html(createItems(handleLiveData(data.data.list)));
                    items.scrollTop(items[0].scrollHeight);
                } else {
                    return layer.msg(error[data.status])
                }
            })


            // /* 是否显示删除图标 */
            // container.find('.deleteIcon').each(function() {
            //     log(+room_teacherid == +ynTeacherId)
            //     if (+room_teacherid == +ynTeacherId) {
            //         $(this).removeClass('hide')
            //     }
            // })
            items.scrollTop(items[0].scrollHeight);
        },

        // 收到推送的消息
        onSocket: function(data) {
            if (nothing) {
                items.find('.nothing').remove();
                live.nothing = false;
            }
            data.pubtimeString = data.showTimeStr;
            data.teacherName = data.nickName;
            data.id = data.dataId;
            data.contentFilter = data.content;
            console.log("=data11=", [data]);
            items.append(createItems(handleLiveData([data])));
            tooltip.render();
            if (living.enableAudio) {
                audio.play();
            }
            // items.scrollTop(items[0].scrollHeight);
        },

        // socket不可用时,通过定时器获数据
        onTimer: function() {
            getData(function(data) {
                if (data.status == 1) {
                    log(data);
                    items.html(createItems(data.data.list));
                } else {
                    return layer.msg(error[data.status])
                }
            })
        }
    }
}();


//side tool
var sideTool = (function() {
    var side
    return {
        init: function() {
            side = $('.side-tool');
            if (ynIsTeacher) {
                //老师查看问股
                side.on('click', '.askStock-message', function() {
                    liveAskStockList.render()

                })
            } else {
                //关注
                side.on('click', '.care', function() {
                    var _this = this;
                    if ($(_this).hasClass('true')) return
                    if (!ynIsLogin) {
                        yn.login.render();
                        return;
                    }
                    if ((+ynTeacherId == +room_teacherid)) return layer.msg("不能关注自己啊");
                    addCare(room_teacherid, "关注").done(data => {
                        $(_this).text('已关注').addClass('true')
                    });
                })

                //用户问股
                side.on('click', '.user-ask', function() {
                        if (!ynIsLogin) {
                            yn.login.render();
                            return;
                        }
                        if ((+ynTeacherId == +room_teacherid)) return layer.msg("扪心自问");
                        askWindow.aimedRender({
                            select: { id: room_teacherid, name: room_nickName }
                        })
                    })
                    //老师查看问股
                side.on('click', '.user-gift', function() {
                        // if (!ynIsLogin) {
                        //     yn.login.render();
                        //     return;
                        // }
                        // if ((+ynTeacherId == +room_teacherid)) return layer.msg("扪心自问");
                        // askWindow.aimedRender({
                        //     select: { id: room_teacherid, name: room_nickName }
                        // })
                })
            }

        }
    }
})()


//提示"您有新消息"
var tooltip = (function() {
    var tip, visible = false,
        items,
        back

    var show = function() {
        if (visible) return;
        tip.css('display', 'inline-block')
        visible = true;
    }

    var hidden = function() {
        tip.css('display', 'none')
        visible = false
    }

    return {
        init() {
            items = $('#live .items')
            tip = $('.tooltip-live')
            back = $('.backToNow')
            tip.click(function() {
                hidden()
                items.scrollTop(3000000)
            })
            back.click(function() {
                back.fadeOut();
                items.scrollTop(3000000)
            })

            // 如果滚动条滚动到底部, 隐藏提示信息
            items.on('scroll', _.debounce(function() {
                var top = $('.live-item-2:last').position().top
                if (top < 510) { //滚动到底部
                    hidden();
                    back.fadeOut();
                }
            }, 500))

            //如果滚动条离开底部，显示回到当前直播位置
            items.on('scroll', _.debounce(function() {
                var top = $('.live-item-2:last').position().top
                if (top > 510) { //滚动到底部
                    back.fadeIn();
                }
            }, 500))

        },
        render() {
            if (ynIsTeacher) {
                return
            }
            show()
        }
    }

})()


//设置功能
living.setting = function() {
    var live, container, fontItem;

    var event = function() {
        fontItem.click(function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select')
            var size = $(this).data('size');
            live.find('.items').attr('id', 'items-' + size);
        })
    }

    return {
        init: function() {
            live = $("#live")
            container = live.find('.setting');
            fontItem = container.find('.font-size-item');
            event()
        }
    }
}()


//发布直播
var pubLive = function() {
    var container, ue, stock, btn, id;
    var event = function() {
        btn.on('click', _.debounce(function() {
            submit();
        }, 2000, { leading: true, trailing: false }))
    }

    var submit = function() {
        var content = ue.getContent();
        if (!content) {
            layer.msg("发布内容不能为空")
            return;
        }
        publishLiveContent(id, content).done(function() {
            ue.setContent('');
        })
    }

    return {
        init: function() {
            id = periodicalid;
            container = $("#pubEditer");
            stock = $('.insertStockCode');
            btn = container.find('.submit');
            ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    [
                        'bold', //加粗
                        'indent', //首行缩进
                        'snapscreen', //截图
                        'underline', //下划线
                        'pasteplain', //纯文本粘贴模式
                        'horizontal', //分隔线
                        'removeformat', //清除格式
                        'fontsize', //字号
                        'forecolor', //文字颜色
                        'simpleupload', //单图上传
                        'insertimage', //多图上传
                        'justifyleft', //居左对齐
                        'justifycenter', //居中对齐
                        'justifyjustify', //两端对齐
                        'fullscreen', //全屏
                        'link', //超链接
                        'unlink', //取消链接
                        'lineheight', //行间距
                    ]
                ],
                enableAutoSave: false,
                saveInterval: 36000000,
                initialFrameHeight: 113,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                pasteplain: true,
                autotypeset: {
                    removeClass: true,
                    clearFontSize: true,
                    removeEmptyline: true, //去掉空行
                    removeEmptyNode: false, // 去掉空节点
                    autotypeset: true,
                    indentValue: '2em'
                }
            });

            // 搜索股票
            stockList.get().render({
                id: 'insertStockCode',
                top: 70,
                onSelect: (item, trigger) => {
                    ue.execCommand('inserthtml', item.stockWrap);
                    stock.val('');
                }
            })

            event()
        },
        render: function() {
            container.show();
        }
    }
}()

//礼物
var gift = function() {
    var $container;
    return {
        init: function() {
            $container = $("#gift")
            gift.shoppingCart.init();
            gift.giftList.init();
            gift.giftList.render();
            gift.pay.init();
        },
        render: function() {
            $container.show();
        }
    };
}();

/**
 * 礼物列表
 */
gift.giftList = function() {
    var $container,
        $wrap,
        $con,
        $arrow,
        $arrowLeft,
        $arrowRight,
        width, //窗口的宽度
        dis_left = 0, //左侧隐藏的距离
        dis_right, //右侧隐藏的距离
        duration = 400, // 动画时间
        packetId, //红包ID
        giftListData // 礼物数据


    var create = arr => {
        return _.map(arr, item => {
            return `<div class="inline item" data-id="${item.gift_id}">
                        <div class="imgw"><img src="${item.gift_photo}" /></div>
                        <div class="txt name">${item.gift_name}</div>
                        <div class="txt price" data-price="${item.gift_price}">￥${item.gift_price}</div>
                    </div>`
        }).join('')
    }

    //
    function select(el) {
        el.parent().find('.select').removeClass('select');
        el.addClass('select');
        var price = el.find('.price').data('price');
        gift.shoppingCart.update(el);
    }

    function event() {

        //高亮选择
        $container.on('click', '.item', function() {
            select($(this));
        });

        //左右滑动
        $arrow.click(_.debounce(function() {
            animate($(this));
        }, duration, { leading: true, trailing: false }));

    }

    function animate(el) {

        var direction = el.data('direction');
        var distance = {
            right: function() {
                return ['-', _.min([width, dis_right])];
            },
            left: function() {
                return ['+', _.min([width, dis_left])];
            }
        }[direction]();

        //animate
        $wrap.velocity({
            left: distance[0] + '=' + distance[1]
        }, {
            duration: duration,
            complete: function() {
                var move = {
                    left: function() {
                        dis_left -= distance[1];
                        dis_right += distance[1];
                    },
                    right: function() {
                        dis_left += distance[1];
                        dis_right -= distance[1];
                    }
                }[direction]();

                //标记
                $arrow.filter('.gray').removeClass('gray');
                if (dis_left === 0) $arrowLeft.addClass('gray');
                if (dis_right === 0) $arrowRight.addClass('gray');
            }
        });
    }

    return {
        init() {
            $container = $("#allGifts");
            $wrap = $container.find('.gift-item-wrap');
            $arrow = $container.find('.arrow');
            $arrowLeft = $container.find('.arrow.left');
            $arrowRight = $container.find('.arrow.right');
            $con = $container.find('.gift-item-container');
            event();
        },
        render() {
            $.getJSON("/gift/giftList.htm", data => {
                giftListData = data;
                data = _.filter(data, item => item.gift_name != "红包"); // 礼物中去掉红包
                $wrap.html(create(data));
                $wrap.css({ width: data.length * 104 + "px" });
                width = $con.width();
                dis_right = $wrap.width() - $con.width();
            })
        },
        getGiftName(id) {
            return _.find(giftListData, item => {
                return +item.gift_id == +id
            }).gift_name
        },
        getPacketId() {
            return _.find(giftListData, item => item.gift_name == "红包").gift_id
        }
    };
}();

//购物车/立即赠送
gift.shoppingCart = function() {
    var $container, $count, $sum, $minus, $plus, $submit, giftId,
        count = 1,
        price = 0,
        sum = 0;

    var event = function() {

        $plus.click(function() {
            $count.text(++count);
            calculate();
        })

        $minus.click(function() {
            if (count === 1) return
            $count.text(--count);
            calculate()
        });

        //提交
        $submit.click(_.debounce(function() {
            if (!ynIsLogin) return yn.login.render();
            if (ynIsTeacher) return layer.msg("老师不能打赏给老师哦");
            if (+sum === 0) return layer.msg("多少也给点!");
            submit();
        }, 1500, { leading: true, trailing: false }));
    };

    function submit() {

        $.post("/app/appGiftPayOrder.htm", {
            pay_source: "0", //web端
            goodsType: "5", //直播
            teacherId: room_teacherid,
            buy_number: count, //礼物数量
            giftId: giftId, //随意赏=送红包
            sum: sum
        }, back => {
            if (back.status == "1") {
                var url = "/html/returnshortcutpayJsp.htm?orderNum=" + back.data.orderNum;

                Confirm.payconfirm({
                    name: '直播送礼',
                    price: sum,
                    link: url,
                    finish: false,
                    orderNum: back.data.orderNum
                })

                return
            }
            layer.msg("参数错误 : " + error[back.status]);
        }, 'json');
    }

    var calculate = function() {
        sum = price * count;
        $sum.text(sum);
    };

    return {
        init: function() {
            $container = $('.gift-send');
            $count = $container.find('.gift-count');
            $sum = $container.find('.sum');
            $minus = $container.find('.minus');
            $plus = $container.find('.plus');
            $submit = $container.find('.submit');
            event();
        },
        update: function(el) {
            price = el.find('.price').data('price');
            giftId = el.data('id');
            calculate();
        }
    };
}();


gift.pay = function() {
    var $container, $circle;

    var event = function() {
        $circle.click(function() {
            if (!ynIsLogin) return yn.login.render();
            if (ynIsTeacher) return layer.msg("老师不能打赏老师哦");

            Confirm.render({
                type: 'livingRoom',
                teacherId: room_teacherid,
                name: '直播打赏',
                finish: false
            })
        });
    };

    return {
        init: function() {
            $container = $("#gift-pay");
            $circle = $container.find('.circle');
            event();
        }
    };
}();




// /**
//  * 历史直播
//  */
var liveHistory = function() {
    var container, items, page = 1,
        row = 11,
        userid, bootpag;

    var handleData = arr => {
        return _.filter(_.map(arr, item => {
            item._time = item.starttime.match(/^[^\s]+/)[0];
            if (+item.status == 0) {
                return false;
            }
            return item;
        }), item => item)
    }


    return {
        init: function(_userid) {
            userid = _userid;
            container = $("#liveHistory");
            items = container.find('.items');
            bootpag = yn.bootpag(container);
            if (!isTeacherSelf) {
                bootpag.hide();
            }
            bootpag.on('page', function(err, num) {
                page = num;
                liveHistory.render();
            });

            /*  放大图片 */
            setTimeout(function() {
                /*  放大图片 */
                items.find('img').each(function() {
                    if ($(this).parent().hasClass('photo')) {
                        return
                    }

                    $(this).zoomify()
                })
            }, 1000)
        },
        render: function() {
            container.show();
            getMyLiveList({ page: page, row: row, userid: userid }).done(function(data) {
                log("历史直播", data);
                data.data.list = handleData(data.data.list);
                items.html(template('liveHistory-template', data.data.list));
                bootpag.bootpag({ page: page, total: data.pageNumber });
            });

        }
    }
}();


// /**
//  * 股友互动
//  */
var chat = function() {
    var periodicalid, container, items, banWin, foreverWin, talkWin,
        page = 1,
        row = 20,
        nothing = false;
    var banStatus //禁言状态
    var EndTime //禁言倒计时
    var banTime //禁言时间
    var userStatus //用户状态


    var handleData = (arr, type) => {
        return _.map(arr, item => {
            item._reply = item.replyInteraction ? `@${item.replyInteraction.nickName}` : ``; // 是否显示回复
            item._isTeacher = room_nickName == item.nickName ? 'isTeacher' : ""; // 是否为老师发言
            item._isSelf = item.nickName == ynUserName ? 'isSelf' : ""; // 是否为自己的发言

            // 解析表情符
            item._content = item.content.replace(/\[.+?\]/g, match => {
                var isOld = /face=/.test(match)
                if (isOld) {
                    return yn.parseFaceCode(match)
                } else {
                    var name = Face.getInstance().titleToName(match)
                    if (!name) return match;
                    var src = `${__path}/public/module/qqface/png/${name}@2x.png`
                    return `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" >`
                }
            })

            item._avatar = (type == "push" ? item.photo : item.photoImg) || '/public/images/yn.jpg' //没有则指定默认头像

            return item;
        })
    }

    // 创建标签
    var createChats = arr => {
        return _.map(arr, item => {
            var type = item.user_type == 2 ? 'pay' : 'normal';
            return chatType[type](item)
        }).join("");
    }

    var chatType = {

        // 打赏消息
        pay: item => {
            return `<div class="chat-pay-item">
                    <span class="time">${item.ctimeString}</span>
                    <span class="content">${item._content}</span>
            </div>`
        },

        // 互动消息
        normal: item => {
            var shouldDelete = isTeacherSelf ? `<div class="absolute delete"><span class="fa fa-times"></span></div>` : '';
            var link = /qlogo|http|https/.test(item.photoImg) ? item.photoImg : projectPath + item._avatar

            var isInside = item.is_inside == 1 && yn.isInside;
            var inside = isInside ? `<strong class="start" style="color:red;font-size:18px">*</strong>` : ''
            var isReferUser = ''
            if (ynIsTeacher) {
                isReferUser = item.is_referUser == 1 ? 'isReferUser' : 'notReferUser'
            } else {
                isReferUser = 'notReferUser'
            }

            return `<div class="item chat-item ${item._isTeacher} ${item._isSelf} ${userStatus}" data-id="${item.id}">
                    <div class="line line1">
                        <div class="inline avatar"><img src="${link}"/></div>
                        <span class="referUser ${isReferUser}"><img src="/public/images/referuser.png" alt="" /></span>
                        <span class="name">${item.nickName}</span>${inside}
                        <span class="user_type"><i class='item-icon-guwen'><img src="${type_ioc}" alt="" /></i></span>
                        ${shouldDelete}
                    </div>
                    <div class="line line2">
                        <div class="pubContent">${item._content} <span class="target">${item._reply}</span></div>
                    </div>
                    <div class="line line3">
                        <span class="time">${item.ctimeString}</span><span class="divice"></span>
                        <select name="" class="banned" data-id="${item.userid}" data-userid="${item.user_id}">
                            <option value="0">禁言</option>
                            <option value="1">禁言1天</option>
                            <option value="-1">永久禁言</option>
                        </select>
                        <a href="#talkWindow" class="reply" data-name="${item.nickName}" id="${item.id}"" >回复</a>
                    </div>
                </div>`
        }

    }
    if (ynIsLogin && !isTeacherSelf) {
        /* 获取用户禁言状态 */
        var isBanned = function() {
                $.post(__path + '/banned/isBanned.htm', back => {
                    back = JSON.parse(back)

                    if (back.data == '1') {
                        banStatus = ''
                    } else {
                        banStatus = back.data.bannedDay
                        banTime = back.data.createTime
                        banTime = banTime.replace(/-/g, '/')
                        EndTime = new Date(banTime).getTime();
                        EndTime += 24 * 60 * 60 * 1000
                    }

                    if (userStatus == 'user') {
                        if (banStatus == '1') {
                            $('#talkWindow .content').hide()
                            banWin.show()
                            countdown()
                            setInterval(function() {
                                countdown()
                            }, 60000)

                        } else if (banStatus == '-1') {
                            $('#talkWindow .content').hide()
                            foreverWin.show()
                        } else if (!banStatus) {
                            $('#talkWindow .content').hide()
                            talkWin.show()
                        }
                    }
                })
            }()
            /*禁言倒计时*/
        var countdown = function() {
            var nowTime = new Date().getTime();
            var t = EndTime - nowTime;
            var h, m;
            if (t >= 0) {
                h = Math.floor(t / 1000 / 60 / 60);
                m = Math.floor(t / 1000 / 60 % 60);
            }
            if (t == 0) {
                layer.msg('禁言解除')
                setTimeout(function() {
                    window.location.reload()
                }, 1000)
                return
            }
            $('.hour').html(h)
            $('.minutes').html(m)
        }
    }




    function event() {

        // 回复
        container.on('click', ".reply", function() {
            if (!ynIsLogin) return yn.login.render();
            var id = $(this).attr("id");
            var name = $(this).data('name')
            talk.setReply(id, { name: name });
            $("body").animate({ scrollTop: $(document).height() - $(window).height() }, 500);
        })

        // 删除
        container.on('click', '.delete', function() {
            if (!ynIsLogin) return yn.login.render();
            var item = $(this).parents('.chat-item');
            var id = item.data("id");
            layer.confirm('确定要删除吗', () => {
                $.post('/interaction/delInteraction.htm', {
                    pid: periodicalid,
                    ids: id
                }, back => {
                    back = JSON.parse(back)
                    if (back.status == '1') {
                        layer.msg("删除成功")
                        item.remove()
                    } else {
                        layer.msg(error[back.status])
                    }
                })
            })
        })

        // 加载更多
        container.on('click', '.loadMore', _.debounce(function() {
            var el = $(this);
            var last = $(this).next();
            var send = {
                id: last.data('id'), // 最早一条发言ID, 根据ID获取更早数据
                periodicalid: periodicalid,
                pageSize: row
            }
            $.getJSON("/html/queryInteractionlist.htm", send, data => {
                if (data.status == 1) {
                    if (data.data.list.length < row) {
                        layer.msg("已加载全部")
                        data.data.list = handleData(data.data.list).reverse();
                        el.after(createChats(data.data.list))
                        el.remove()
                        return
                    }
                    data.data.list = handleData(data.data.list).reverse();
                    el.after(createChats(data.data.list))
                } else {
                    return layer.msg(error[data.status])
                }

            });
        }, 500))

        // 声音提示
        container.on('click', '.audio', function() {
            $(this).toggleClass('stop');
            chat.enableAudio = !chat.enableAudio;
        })
    }

    return {
        enableAudio: true,
        init: function(id) {
            periodicalid = id;
            container = $("#friendTalk");
            items = container.find('.items');
            banWin = $('#talkWindow .nochat'),
                talkWin = $('#talkWindow .chat'),
                foreverWin = $('#talkWindow .nochat-f')
            userStatus = isTeacherSelf ? 'teacher' : 'user';
            /* 禁言 */
            container.on('change', '.line3 .banned', function() {
                var val = $(this).val();
                var id = $(this).data('id')
                var userid = $(this).data('userid')
                var banId = +id ? id : userid;
                if (val === "0") return;
                var self = $(this)
                var text = {
                    "1": "确定要禁言1天吗",
                    "-1": "确定要永久禁言吗"
                }

                layer.confirm(text[val], function() {
                    $.post(__path + '/banned/banned.htm', { userid: banId, bannedDay: val }, back => {
                        if (back.status == '1') {
                            layer.msg('禁言成功')
                            self.val('0')
                        }
                        if (back.status == '40012') {
                            return layer.msg('请重新登录')
                        }
                        if (back.status == '80000') {
                            layer.msg('老师,不能再禁啦')
                            self.val('0')
                        }
                    }, 'json')
                })
            })

            /* 禁言申诉 */
            foreverWin.on('click', function() {
                var self = $(this)
                $.post(__path + '/banned/isAppeal.htm', back => {
                    if (back.status == '20001') {
                        return layer.msg('请登录')
                    }
                    if (back.status == '1') {
                        foreverWin.find('button').html('已提交申诉申请')
                        layer.msg('申诉已提交')
                    }
                    if (back.status == '-1') {
                        layer.msg('禁言解除')
                        window.location.reload()
                    }
                }, 'json')
            })
            event()
        },
        render: function() {
            getFriendTalk(periodicalid, {
                page: page,
                row: row
            }).done(back => {
                back.data = back.data.reverse();
                if (back.hasMore) items.prepend(`<p class="loadMore">加载更多</p>`)
                back.data = handleData(back.data);

                // 暂无结果
                if (back.data && back.data.length < 1) {
                    items.html(ynconfig.none({ margin: 250 }));
                    nothing = true;
                    return;
                }
                items.append(createChats(back.data));
                items.scrollTop(300000)
            });
        },
        onSocket: function(data) {
            data.photoImg = data.photo
            data.ctimeString = data.showTimeStr;
            data.id = data.dataId;
            data.content = data.content.replace(/【回复:(.+)】(.+)/g, `$2<span class="target">@$1</span>`)
            var newTalk = createChats(handleData([data], 'push'));
            if (nothing) {
                items.find('.nothing').remove();
                nothing = false;
            }
            items.append(newTalk);
            items.scrollTop(30000);
            if (chat.enableAudio) {
                msn.play();
            }
        },
        onTimer: function() {
            // 使用定时器更新聊天数据
            this.render();
        }
    }
}()



//股友互动
var talk = function() {
    var container, textarea, replyInfo, replyId = -1,
        submitBtn, wordCount, face;

    function event() {
        textarea.on('focus', () => !ynIsLogin && yn.login.render()) //验证登录
        container.on('click', '.close', () => talk.setReply(-1)); //关闭回复

        //表情
        container.on('click', '.face', function() {
            Face.getInstance().render("face-trigger", title => {
                var val = textarea.val()
                textarea.val(val + title)
            })

            return false
        })

        //提交
        submitBtn.on('click', _.debounce(() => submit(), 2000, { leading: true, trailing: false }))
    }

    function submit() {
        var content = textarea.val();
        if (content.length > 200) {
            content = content.substr(0, 200)
            layer.msg("超出字数限制")
            return;
        }
        if (!content) return layer.msg("请填写您的交流信息");
        var send = {
            content: content,
            prId: periodicalid,
            parentid: replyId, //发言(回复的)ID
            user_type: ynIsTeacher ? '1' : '0'
        }

        $.post("/html/interactionComm.htm", send, data => {
            data = JSON.parse(data)
            if (data.status == 1) {
                reset();
                return layer.msg("提交成功");
            } else if (data.status == 80000) {
                layer.msg('该账号被用户举报，涉嫌违规操作，目前不能与直播间的好友进行互动')
                setTimeout(function() {
                    window.location.reload()
                }, 1000)
            } else if (data.status == 80001) {
                return layer.msg('您输入的内容违反相关规定，不能予以展示！')
            } else {
                return layer.msg(error[data.status])
            }
        });
    }

    function reset() {
        talk.setReply(-1);
        textarea.val('');
        wordCount.text(200);
    }

    return {
        setReply: function(id, ops) {
            //设置回复功能
            ops = _.extend({
                name: ""
            }, ops);

            replyId = id;
            id == -1 ? replyInfo.hide() : replyInfo.show();
            replyInfo.find('.text').text("@" + ops.name);
        },
        init: function() {
            container = $("#talkWindow");
            textarea = container.find('textarea');
            submitBtn = container.find('.submit');
            replyInfo = container.find('.replyInfo');
            wordCount = container.find('.wordCount .value');


            //字数统计
            yn.wordCount(textarea, {
                indicate: wordCount
            });

            container.show();
            event();
        }
    };
}();


// 显示礼物效果
var showPayAnimation = function(data) {
    log("送礼", data)
    var card = new payShow({
        avatar: data.photo,
        title: data.userName,
        sub: '赠送' + data.giftName,
        gift: data.giftPhoto,
        count: data.count
    }).animate()
}


/*///////////////////////////////////////////////////////////////////*/

//websocket推送
var liveDetailSocket = function() {


    var host = ""

    if (/yueniuwang/.test(href)) {
        host = "http://ws.yuetougu.com"
    } else if (/yuetougu/.test(href)) {
        host = "http://ws.yuetougu.com"
    } else {
        host = live_path
    }

    try {
        var webSocket;
        host = host.replace('http:', '')
        webSocketPath = "ws:" + host + "/websocket";
        webSocket = new ReconnectingWebSocket(webSocketPath);
        webSocket.debug = true;
        webSocket.timeoutInterval = 5400;
        window.onbeforeunload = function() {
            webSocket.close();
        };
        webSocket.onopen = function(event) {
            var key = "0_0_0_" + periodicalid;
            webSocket.send(key);
        };
        webSocket.onmessage = function(event) {
            var _data = eval('(' + event.data + ')');
            console.log("push", _data);
            var dataType = _data.dataType;
            //直播消息
            if (dataType == "1") {
                living.onSocket(_data);
                return;
            }
            // 送礼消息
            if (+dataType == 11) {
                showPayAnimation(_data)
                _data.puiblisherid = "0"
                living.onSocket(_data)
                return;
            }
            //互动信息
            if (dataType == "2") {
                chat.onSocket(_data);
            }

        }
    } catch (e) {
        log("use timer update data...")
            //IE8使用定时器更新数据
        setInterval(function() {
            living.onTimer();
            chat.onTimer();
        }, 2000);
    }
}


/*///////////////////////////////////////////////////////////////////*/

//发布直播
var publishLiveContent = function(id, content) {
    if (!ynIsLogin) {
        layer.msg("请登录...");
        return;
    }
    if (!content) {
        layer.msg("请输入内容...");
        return;
    }
    var defer = $.Deferred();
    content = content.replace(/(<img)\s+(?:class="big_pic")?(.+?(jpg"|png"))/g, '$1  $2 class="big_pic"');
    var send = {
        periodicalid: id,
        content: content
    }
    $.post("/teacher/html/broadcasting/addBroadcasting.htm", send, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            layer.msg("发表成功")
            defer.resolve(data);
        } else if (data == 80001) {
            return layer.msg('您输入的内容违反相关规定，不能予以展示！')
        } else {
            return layer.msg(error[data.status])
        }
    })
    return defer.promise();
}


//我的直播列表
var getMyLiveList = function(ops) {

    ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        user_id: room_userid,
        pageSize: ops.row,
        currentPage: ops.page
    }

    var defer = $.Deferred();

    $.getJSON("/center/queryMyLive.htm", send, function(data) {
        if (data.status == 1) {
            //页码
            data.pageNumber = _.max([1, Math.ceil(data.data.total / ops.row)])
            defer.resolve(data);
        }

    })
    return defer.promise();
}


//加载股友互动信息
var getFriendTalk = function(periodicalid, ops) {
    var defer = $.Deferred();
    var ops = _.extend({
        page: 1,
        row: 10
    }, ops)

    var send = {
        periodicalid: periodicalid,
        currentPage: ops.page,
        pageSize: ops.row
    }
    $.getJSON("/html/interactionList.htm", send, function(data) {
        if (data.status == 1) {
            data.hasMore = data.data.length == send.pageSize ? true : false;
            defer.resolve(data);
        }
    })
    return defer.promise();
}


//关闭直播
var closeLiveRoom = (function() {
    var close
    return {
        init: function() {
            close = $('.close-live').show()
            close.on('click', function() {
                if (liveStatus == '0') {
                    layer.confirm('确定关闭直播室？', function() {
                        $.post('/broadcasting/closePeriodical.htm', { periodicalid: periodicalid }, back => {
                            if (back.status == '1') {
                                layer.msg('直播室已关闭')
                                window.location.href = __path + '/backstage/myLive.htm'
                            } else {
                                return layer.msg(error[back.status])
                            }
                        }, 'json')
                    })
                }
            })
        }
    }
})()



//发布置顶消息
var addTop = (function() {
    var container,
        todayWin,
        textarea,
        wordCount,
        tagId = null
    var create = arr => {
        return _.map(arr, item => {
            return `<span class="todayHeadlines" data-id="${item.id}">${item.tag_name}</span>`
        }).join('')
    }

    var reset = function() {
        todayWin.hide()
        textarea.val('')
        todayWin.find('.todayWin-title').text('')
        wordCount.text(100)
    }
    return {
        init: function() {
            container = $('#liveDetail')
            todayWin = $('#todayWin')
            textarea = todayWin.find('textarea')
            wordCount = todayWin.find('.wordCount')
                //弹出窗口
            container.on('click', '.todayHeadlines', function() {
                var text = $(this).text()
                tagId = $(this).data('id')
                todayWin.find('.todayWin-title').text(text)
                todayWin.show()
            })

            //取消
            todayWin.on('click', '.todayWin-cancel', function() {
                    reset()
                })
                //确定
            todayWin.on('click', '.todayWin-sure', _.debounce(function() {
                var val = _.trim(todayWin.find('textarea').val())
                if (!val) {
                    return layer.msg('请输入内容')
                } else if (val.length > 100) {
                    return layer.msg('最多输入100字')
                }
                $.post('/broadcastingTop/addTop.htm', { tag_id: tagId, content: val }, back => {
                    if (back.status == 1) {
                        layer.msg('置顶消息发布成功')
                        reset()
                        topDetail.render()
                    } else {
                        return layer.msg(error[back.status])
                    }
                }, 'json')
            }, 2000, { 'leading': true, 'trailing': false }))

            //字数统计
            yn.wordCount(textarea, {
                indicate: wordCount,
                limit: 100
            });

            //鼠标悬浮
            var timer = null
            container.find('.todayHeadlines-btn').get(0).onmouseenter = container.find('.todayHeadlines-wrap').get(0).onmouseenter = function() {
                    clearTimeout(timer)
                    container.find('.todayHeadlines-wrap').show()
                }
                //鼠标移出
            container.find('.todayHeadlines-btn').get(0).onmouseleave = container.find('.todayHeadlines-wrap').get(0).onmouseleave = function() {
                timer = setTimeout(function() {
                    container.find('.todayHeadlines-wrap').hide()
                }, 500)
            }
        },
        render: function() {
            $.getJSON('/broadcastingTop/getToptag.htm', back => {
                if (back.status == 1) {
                    if (back.data.length > 0) {
                        container.find('.todayHeadlines-wrap').html(create(back.data))
                    } else {
                        container.find('.todayHeadlines-wrap').html('<span class="tag_none"><i class="fa fa-info" aria-hidden="true"></i>暂无标签</span>')
                    }

                } else {
                    return layer.msg(error[back.status])
                }
            })
        }
    }
})()


//有牛股
var topDetail = (function() {
    var container

    var create = item => {
        return `<div class="todayTop">
            ${item.delete}
            <span class="todayTop-title">${item.tag_name}</span>
            <span class="todayTop-close"></span>
            <span class="todayTop-time">${item._create_time}</span><span class="arrow-down"></span></div>
        <div class="todayTop-content hide">${item.content}<span class="arrow-up"></span></div>`

    }
    var handle = item => {
        item._create_time = item.create_time.match(/^\d{4}-([0-9\-]+)/)[1];
        item.delete = isTeacherSelf ? `<span class="todayTop-del" data-id="${item.id}">删除</span>` : ''
        return item
    }

    return {
        init: function() {
            container = $('#live')

            //滑动显示
            container.on('mouseenter', '.todayTop-wrap', function() {
                    container.find('.arrow-down').hide()
                    container.find('.todayTop-content').show().stop().animate({ height: '95px' }, 400)
                })
                //鼠标移除隐藏
            container.on('mouseleave', '.todayTop-wrap', function() {
                container.find('.arrow-down').show()
                container.find('.todayTop-content').stop().animate({ height: '0' }, 400).hide()
            })

            //最小化
            container.on('click', '.todayTop-close', function() {
                    container.find('.todayTop-wrap').hide()
                    container.find('.today-packUp').show()
                })
                //最大化
            container.on('click', '.today-packUp', function() {
                container.find('.today-packUp').hide()
                container.find('.todayTop-wrap').show()
            })

            //删除
            container.on('click', '.todayTop-del', function() {
                var id = $(this).data('id')
                layer.confirm('确定删除此置顶消息吗？', function() {
                    $.post('/broadcastingTop/delTop.htm', { id }, back => {
                        if (back.status == '1') {
                            layer.msg('已删除')
                            container.find('.todayTop-wrap').hide()
                        } else {
                            return layer.msg(error[back.status])
                        }
                    }, 'json')
                })
                container.find('.today-packUp').hide()
                container.find('.todayTop-wrap').show()
            })
        },
        render: function() {
            $.getJSON('/broadcastingTop/topDetail.htm', { periodicalid }, back => {
                if (back.status == '1' && typeof(back.data) != "undefined") {
                    container.find('.todayTop-wrap').show().html(create(handle(back.data)))
                    container.find('.today-packUp').html(back.data.tag_name).hide()
                }
            })
        }
    }
})()

/*上下期*/
var turnPeriodical = (function() {
    var container,
        cur = null,
        data = null,
        curData = null,
        startTime = null,
        length = null,
        limit = 3,
        row = limit - 1
    return {
        init: function() {
            container = $('.setting')
            var href = window.location.href
            var history = href.match(/history=([0-2])/)
            cur = history ? history[1] : "0"
            if (cur == 0) {
                container.find('.next').hide()
                container.find('.current').hide()
            } else if (cur == row) {
                container.find('.prev').hide()
            }

            getMyLiveList({ page: 1, row: limit, userid: room_userid }).done(function(back) {
                data = back.data.list
                length = back.data.list.length
            });
            //上一期
            container.on('click', '.prev', function() {
                    if (length - cur == 1 || length < cur) return;
                    ++cur;
                    curData = data[cur]
                    startTime = data[cur].starttime.substr(0, 11)
                    window.location.href = `/live/liveDetailLive.htm?teacherid=${room_teacherid}&periodical=${curData.periodicalid}&time${startTime}&history=${cur}`

                })
                //下一期
            container.on('click', '.next', function() {
                    if (cur == 0) return;
                    --cur
                    curData = data[cur]
                    startTime = data[cur].starttime.substr(0, 11)
                    window.location.href = `/live/liveDetailLive.htm?teacherid=${room_teacherid}&periodical=${curData.periodicalid}&time${startTime}&history=${cur}`

                })
                //回到当前期
            container.on('click', '.current', function() {
                window.location.href = `${live_path}live/${room_teacherid}/`
            })
        }
    }



})()
