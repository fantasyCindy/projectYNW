//个人信息
var info = function() {
    var container, care, question;

    var event = function() {
        //关注
        care.click(function() {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }

            if ((+ynTeacherId == +room_teacherid)) {
                layer.msg("不能关注自己啊")
                return;
            }

            //取消关注
            if ($(this).attr('class').indexOf('true') != -1) {
                yndata.cancelCare(ynUserId, room_teacherid).done(function() {
                    care.removeClass('true').text("关注");
                })
                return;
            }
            //添加关注
            yndata.addCare(ynUserId, room_teacherid).done(function() {
                care.addClass('true').text("取消关注");
            });
        })

        //提问
        var askWindow = ynmodule.askWindow();
        askWindow.init();

        $('.askWin-trigger').click(function() {
            if (ynTeacherId == room_teacherid) {
                layer.msg("扪心自问");
                return;
            }
            var id = room_teacherid;
            var name = $('#teacher-nickName').text();
            askWindow.render();
            askWindow.add(id, name, { reset: true })
        })
    }

    return {
        init: function() {
            container = $('#live-info');
            care = $('#live-info .care');
            question = $('#live-info .ask');
            event();
        }
    }
}()


//菜单
var menu = function() {
    var container;

    //根据地址高亮菜单
    function light() {
        var index = -1;
        var path = {
            'liveDetail': 0,
            'liveDetailLive': 1,
            'liveDetailAnswer': 2,
            'liveDetailOpinion': 3,
            'liveDetailRefer': 5
        }
        var match = location.href.match(/(\w+)\.htm/);
        if (match) {
            index = path[match[1]]
        }
        container.find('.item').eq(index).addClass('select');
    }

    return {
        init: function() {
            container = $('.liveDetail-menu');
            light();
        }
    }
}()


//主题
var subject = function() {
    var container, history, boxWrap, box, eidt, title;
    return {
        init: function() {
            container = $('.living-subject');
            history = container.find('.history');
            edit = container.find(".fa-edit");
            title = $('#living-subject-value');

            //进入历史直播
            history.on('click', function() {
                $('#liveDetail').hide();
                liveHistory.render();
            })

            //显示修改窗口
            container.on('click', '.fa-edit', function() {
                modifyWin.render(title.text());
                modifyWin.delegate.done = function(val) {
                    title.text(val)
                }
            })
        },
        showEidt: function() {
            edit.show()
        }
    }
}()


/**
 * 修改主题窗口
 * render()
 * delegate.done(val)
 */
var modifyWin = function() {
    var id, container, wrap, input, submit, wordCount
    return {
        init: function(_id) {
            id = _id;
            var _this = this;
            wrap = $("#modify-subject-container");
            container = $("#modify-subject");
            input = container.find('textarea')
            submit = container.find('.submit')
            wordCount = container.find('.wordCountValue');

            //居中


            //关闭窗口
            container.on('click', '.close', function() {
                wrap.hide();
                input.val("");
            })

            yn.wordCount(input, {
                indicate: wordCount,
                limit: 25
            })

            //提交
            submit.click(_.debounce(function() {
                if (!input.val()) {
                    layer.msg("主题不能为空")
                    return;
                }
                submit();
            }, 2000, { leading: true, trailing: false }))

            var submit = function() {
                var val = input.val()

                //修改直播主题
                $.post("/center/editPeriodical.htm", {
                    periodicalid: id,
                    todaysubject: val
                }, function(data) {
                    if (data === 0) {
                        lalyer.alert("参数为空");
                        return;
                    }
                    if (data == "success") {
                        layer.msg("修改成功");
                        wrap.hide()
                        _this.delegate.done(val)
                    }
                });
            }
        },
        render: function(data) {
            wrap.show();
            yn.centerBox(container);
            if (data) {
                input.val(data).trigger('keyup');
            }
        },
        delegate: {
            done: function() {}
        }
    }
}()



//正在直播
var living = function() {
    var id, //期刊id
        talkId = "", //发言ID
        container, items, page = 1,
        row = 20,
        nothing = false,
        bootpag,
        templateId = "live-template-2"

    function event() {

        items.on('click', 'img', function() {
            yn.zoomImage($(this));
        })

        //加载更多
        container.on('click', '.loadMore', function() {
            var el = $(this);
            talkId = $(this).next().data('id');
            getData(function(data) {
                var rows = handleData(data.rows)
                el.after(template(templateId, rows));
                if (!data.hasMore) {
                    el.remove();
                }
            })
        })

        //声音提示
        container.on('click', '.yn-icon-sound', function() {
            $(this).toggleClass('stop');
            living.enableAudio = !living.enableAudio;
        })

        //删除直播
        container.on('click', '.delete', function() {
            if (+room_teacherid != ynTeacherId) return;
            var el = $(this);
            var item = $(this).parents(".live-item-2");
            layer.confirm("确定要删除吗?", function(index) {
                var id = el.data('id');
                $.post('/html/broadcasting/delBroadcasting.htm', { id: id }, function(data) {
                    if (data == "success") {
                        item.remove();
                        layer.close(index);
                    } else {
                        layer.msg("dderror : " + data)
                    }
                })
            })
        })
    }

    function getData(callback) {
        $.getJSON("/html/queryLiveInfo.htm", { id: talkId, periodicalid: id, pageSize: row }, function(data) {
            data.hasMore = +data.total - row > 0
            callback(data);
        })
    }

    function handleData(data) {
        data = data.reverse();
        return _.map(data, function(item) {
            item.content = yn.codeFormat(item.content);
            item.deleteStyle = String(+room_teacherid == +ynTeacherId);
            return item;
        });
    }

    return {
        enableAudio: true,
        init: function(periodicalid) {
            id = periodicalid;
            container = $("#live");
            items = container.find('.items');
            living.setting.init();
            event();
        },
        render: function() {
            $("#liveDetail").show();
            getData(function(data) {
                console.log("直播信息", data)
                var rows = handleData(data.rows)

                if (+data.total < 1) {
                    nothing = true;
                    items.html(ynconfig.none({ margin: 250 }));
                    return;
                }

                items.html(template(templateId, rows));

                //加载更多
                if (data.hasMore) {
                    items.prepend(ynconfig.more());
                }

                items.scrollTop(300000);
            })
        },
        onSocket: function(data) {
            if (nothing) {
                items.find('.nothing').remove();
                live.nothing = false;
            }
            data.pubtimeString = data.showTimeStr;
            data.teacherName = data.nickName;
            data.id = data.dataId;
            items.append(template(templateId, [data]));
            items.scrollTop(10000);
            if (living.enableAudio) {
                audio.play();
            }
        },
        onTimer: function() {
            getData(function(data) {
                var rows = handleData(data.rows);
                items.html(template('live-template', rows));
            })
        }
    }
}();

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
            container = live.find('.settting');
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
        yndata.publishLiveContent(id, content).done(function() {
            ue.setContent('');
        })
    }

    return {
        init: function(periodicalid) {
            id = periodicalid;
            container = $("#pubEditer");
            stock = $('.insertStockCode');
            btn = container.find('.submit')
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
                        'simpleupload', //单图上传
                        'insertimage', //多图上传
                        'justifyleft', //居左对齐
                        'justifycenter', //居中对齐
                        'justifyjustify', //两端对齐
                        'fullscreen', //全屏
                        'imagecenter', //居中
                        'lineheight', //行间距
                    ]
                ],
                initialFrameHeight: 250,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                enableAutoSave: false,
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

            yn.showStockList(stock, {
                listLen: 4,
                onSelect: function(item) {
                    stock.val('');
                    ue.execCommand('inserthtml', item.stockWrap);
                }
            })

            event()
        },
        render: function() {
            container.show();
        }
    }
}()


///////////////////////////////////////////////////////////////////

//礼物
var gift = function() {
    var $container;
    return {
        init: function() {
            $container = $("#gift")
            gift.shoppingCart.init();
            gift.giftList.init();
            gift.giftList.render();
            gift.giftList.delegate.click = function(el) {
                gift.shoppingCart.update(el);
            };
            gift.pay.init();
        },
        render: function() {
            $container.show();
        }
    };
}();

/**
 * 礼物列表
 * gift.giftList.init();
 * gift.giftList.render();
 * gift.giftList.init();
 */
gift.giftList = function() {
    var $container, $wrap, $con, $arrow,
        $arrowLeft,
        $arrowRight,
        width, //窗口的宽度
        dis_left = 0, //左侧隐藏的距离
        dis_right, //右侧隐藏的距离
        duration = 400, // 动画时间
        packetId //红包ID


    var getGiftList = function(callback) {
        $.getJSON("/gift/giftList.htm", function(data) {
            data = _.filter(data, function(item) {
                if (item.gift_name == "红包") {
                    packetId = item.gift_id;
                    console.log("红包ID", packetId)
                    return false;
                } else {
                    return true;
                }
            });

            callback(data.concat(data));
        })
    }

    function select(el) {
        el.parent().find('.select').removeClass('select');
        el.addClass('select');
        var price = el.find('.price').data('price');
        gift.giftList.delegate.click(el);
    }

    function event() {
        var _this = this;

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
                if (dis_left === 0) {
                    $arrowLeft.addClass('gray');
                }

                if (dis_right === 0) {
                    $arrowRight.addClass('gray');
                }
            }
        });
    }

    return {
        init: function() {
            $container = $("#allGifts");
            $wrap = $container.find('.gift-item-wrap');
            $arrow = $container.find('.arrow');
            $arrowLeft = $container.find('.arrow.left');
            $arrowRight = $container.find('.arrow.right');
            $con = $container.find('.gift-item-container');
            event();
        },
        render: function() {
            getGiftList(function(data) {
                $wrap.append(template('gift-item-template', data));
                $wrap.css({
                    width: data.length * 104 + "px"
                });

                width = $con.width();
                dis_right = $wrap.width() - $con.width();
            });
        },
        delegate: {
            click: function() {}
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
            if (count === 1) {
                return;
            }
            $count.text(--count);
            calculate()
        });

        //提交
        $submit.click(_.debounce(function() {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            if (ynIsTeacher) {
                layer.msg("老师不能打赏给老师哦");
                return;
            }
            if (+sum === 0) {
                layer.msg("多少也给点!");
                return;
            }
            submit();
        }, 1500, { leading: true, trailing: false }));
    };

    function submit() {
        var send = {
            pay_source: "0", //web端
            goodsType: "5", //直播
            teacherId: room_teacherid,
            buy_number: count, //礼物数量
            giftId: giftId, //随意赏=送红包
            sum: sum
        };

        var support = Support.getInstance();
        support.showConfirm(send);
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
            gift.pay.delegate.click();
        });
    };

    return {
        init: function() {
            $container = $("#gift-pay");
            $circle = $container.find('.circle');
            event();
        },
        delegate: {
            click: function() {}
        }
    };
}();


/**
 * 礼物打赏窗口
 * <%@  include file="../common/moudle-playtour.jsp" %>
 *
 * 使用方法
 * 创建实例: var s = Support.getInstance();
 * 初始化: s.init(teacherid)
 * 显示窗口: s.render();
 * 直接显示确认窗口: s.showConfirm(send, name);
 */
var Support = function() {
    var instance = null;
    var factory = function() {
        var $container;
        var $priceWindow; //价格窗口
        var $inputPrice; //价格
        var $surplus; //剩余牛币
        var surplusValue; //剩余牛币
        var teacherId; //老师ID
        var $confirmWindow; //确认支付框
        var $payButton;

        function event() {

            //关闭
            $container.find('.close').click(function() {
                $container.hide();
            })

            //快捷输入
            $container.find('.support-short-item').click(function() {
                $(this).parent().find('.thistype').removeClass("thistype");
                $(this).addClass("thistype");
                $inputPrice.val($(this).data('type'))
            })

            //跳转
            $container.on('click', '#pay-jump', function() {
                $container.hide()

                //显示支付提示
                var payTip = new ynmodule.JudgePay();
                payTip.init();
                payTip.render();
            })

            //立即赠送
            $container.find('.submit').click(function(e) {
                //验证价格
                var val = $inputPrice.val();
                if (!/^[1-9][0-9]*$/.test(val)) {
                    layer.msg("客官，真的不能再少了!");
                    return;
                }
                var send = {
                    pay_source: "0", //web端
                    goodsType: "5", //直播
                    teacherId: teacherId,
                    buy_number: val,
                    giftId: 11, //随意赏=送红包
                    sum: val
                }
                instance.showConfirm(send, "打赏直播");
            })

            //同意支付
            $container.on('change', '.agreement', function() {
                var checked = $(this).get(0).checked;
                if (checked) {
                    $payButton.show();
                    $('#pay-jump-button').hide();
                } else {
                    $payButton.hide();
                    $('#pay-jump-button').show();
                }
            })
        }


        return {
            init: function(_teacherid) {

                teacherId = _teacherid;
                $container = $('#playtour');
                $inputPrice = $("input#optional");
                $surplus = $("#support-surplus");
                $confirmWindow = $container.find('.confirmPrice');
                $priceWindow = $container.find('.getPrice');
                yn.centerBox($container);
                $payButton = $("#pay-jump");

                event();
            },
            render: function() {

                //重置
                $inputPrice.val("");
                $container.find('.thistype').removeClass("thistype");
                $priceWindow.show();
                $confirmWindow.hide();
                $container.velocity('transition.expandIn', { duration: 300 });

                //显示余额
                yndata.balance().done(function(data) {
                    $surplus.html("可用余额<strong id='surplusValue' style='margin:0 5px; color:red;'>" + data.balance + "</strong>牛币");
                    surplusValue = data.balance;
                })
            },

            //显示确认
            showConfirm: function(send, name) {
                $container.show();
                $priceWindow.hide();
                $confirmWindow.show();

                //确认价格
                $("#shouldPayValue").text(send.sum);
                $('#finalPayValue').text(send.sum);
                $('.confirmPrice .payName').text(name)

                //获取订单号
                $.post("/app/appGiftPayOrder.htm", send, function(data) {
                    if (data.status == "1") {
                        var url = "/html/returnshortcutpayJsp.htm?orderNum=" + data.data.orderNum;
                        $payButton.attr('href', url);
                        $payButton.data('link', url);
                    } else {
                        layer.msg("参数错误 : " + data.status);
                    }
                }, 'json');
            }
        }
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = factory();
            }
            return instance;
        }
    }
}()



/**
 * 历史直播
 * o.init(userid)
 * o.render();
 */
var liveHistory = function() {
    var container, items, page = 1,
        row = 15,
        userid, bootpag;

    function getData(callback) {
        yndata.getMyLiveList({ page: page, row: row, userid: userid }).done(function(data) {
            callback(data);
        });
    }

    function handleData(data) {
        return _.map(data, function(item) {
            item._time = item.starttime.match(/^[^\s]+/)[0];
            return item;
        });
    }


    return {
        init: function(_userid) {
            userid = _userid;
            container = $("#liveHistory");
            items = container.find('.items');
            bootpag = yn.bootpag(container);
            bootpag.on('page', function(err, num) {
                page = num;
                liveHistory.render();
            });
        },
        render: function() {
            container.show();
            getData(function(data) {
                console.log("历史直播", data);
                data.rows = handleData(data.rows);
                items.html(template('liveHistory-template', data.rows));
                bootpag.bootpag({ page: page, total: data.pageNumber });
            });
        }
    }
}();


/**
 * 股友浅聊
 * o.init(id) //id: 期刊ID
 * o.render()
 */
var chat = function() {
    var id, container, items,
        page = 1,
        row = 20,
        nothing = false;

    function getData(callback) {
        yndata.getFriendTalk(id, { page: page, row: row }).done(function(data) {
            callback(data);
        });
    }

    function event() {

        //回复
        container.on('click', ".reply", function() {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }

            var id = $(this).attr("id");
            var name = $(this).parents('.item').find('.name').text();
            talk.setReply(id, { name: name });

            $("body").animate({
                scrollTop: $(document).height() - $(window).height()
            }, 500);
        })

        //加载更多
        container.on('click', '.loadMore', function() {
            var el = $(this);
            var last = $(this).next();
            var send = {
                id: last.data('chatid'), // 最早一条发言ID, 根据ID获取更早数据
                periodicalid: id,
                pageSize: row
            }

            $.getJSON("/html/queryInteractionlist.htm", send, function(data) {
                console.log(data)
                if (+data.total < 1) {
                    el.remove();
                } else {
                    data.rows = chat.handleData(data.rows).reverse();
                    el.after(template('friendTalk-template', data.rows))
                }
            });
        })

        //声音提示
        container.on('click', '.audio', function() {
            $(this).toggleClass('stop');
            chat.enableAudio = !chat.enableAudio;
        })
    }

    return {
        enableAudio: true,
        init: function(periodicalid) {
            id = periodicalid;
            container = $("#friendTalk");
            items = container.find('.items');
            event()
        },
        render: function() {
            getData(function(data) {
                console.log("talk data : ", data);
                if (data.hasMore) {
                    items.prepend(ynconfig.more())
                }

                data = chat.handleData(data);

                //暂无结果
                if (data && data.length < 1) {
                    items.html(ynconfig.none({ margin: 250 }));
                    nothing = true;
                    return;
                }

                items.append(template('friendTalk-template', data));
                items.scrollTop(300000)
            })
        },
        handleData: function(data) {
            return _.map(data, function(item) {

                //回复标记
                item.replyMark = "";
                if (item.replyInteraction) {
                    item.replyMark = "@" + item.replyInteraction.nickName + "："
                }

                //是否为直播老师发言
                if (item.nickName == room_nickName) {
                    item._isTeacherTalk = "true";
                } else {
                    item._isTeacherTalk = "false";
                }

                ////是否显示回复
                if (item.nickName == $('.username').text()) {
                    item.showReply = "true"
                } else {
                    item.showReply = "false"
                }

                //解析表情符
                item.content = yn.parseFaceCode(item.content);
                return item;
            })
        },
        onSocket: function(data) {
            data.ctimeString = data.showTimeStr;
            data.id = data.dataId;
            data.content = data.content.replace(/【回复:(.+)】/g, '@$1：')
            var newTalk = template('friendTalk-template', chat.handleData([data]));
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
            this.getData(function(data) {
                items.html(template('friendTalk-template', data))
            })
        }
    }
}()



//和股友交流
var talk = function() {
    var id, container, textarea, replyInfo, replyId = -1,
        submitBtn, wordCount;

    function event() {

        //验证登录
        textarea.on('focus', function() {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
        });

        //关闭回复
        container.on('click', '.close', function() {
            talk.setReply(-1);
        })

        //表情
        container.on('click', '.face', function() {
            var offset = $(this).offset();
            offset.top = offset.top + 25;
            talk.delegate.clickFace(offset)
            return false
        })

        //提交
        submitBtn.on('click', _.debounce(function() {
            submit()
        }, 5000, { leading: true, trailing: false }))
    }

    function submit() {
        var content = textarea.val();
        if (!content) {
            layer.alert("请填写您的交流信息");
            return;
        }
        var send = {
            content: content,
            prId: id,
            parentid: replyId, //发言(回复的)ID
            user_type: ynIsTeacher
        }

        $.post("/html/interactionComm.htm", send, function(data) {
            if (data == "success") {
                reset();
                layer.msg("提交成功");
            } else {
                layer.alert("提交失败")
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
        init: function(periodicalid) {
            id = periodicalid;
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
        },
        update: function(content) {
            var val = textarea.val();
            textarea.val(val + content);
        },
        delegate: {
            clickFace: function() {}
        }
    };

}();


//////////////////////////////////////////////////////////////////

$(function() {
    info.init();
    menu.init();
});



//websocket推送
var liveDetailSocket = function() {
    try {

        var webSocket;
        webSocketPath = "ws:" + __ynhost + "/websocket";
        webSocket = new ReconnectingWebSocket(webSocketPath);
        webSocket.debug = true;
        webSocket.timeoutInterval = 5400;
        window.onbeforeunload = function() {
            webSocket.close();
        };
        webSocket.onopen = function(event) {
            var key = "1_" + periodicalid;
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
            //互动信息
            if (dataType == "2") {
                chat.onSocket(_data);
            }
        }
    } catch (e) {
        console.log("use timer update data...")
        //IE8使用定时器更新数据
        setInterval(function() {
            living.onTimer();
            chat.onTimer();
        }, 2000);
    }
}
