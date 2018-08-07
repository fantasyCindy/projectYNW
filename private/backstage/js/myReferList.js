/*///////////////////////////////////////////////////////////////////*/

yn.navigation.name = yn.navigation.h;

$(function() {
    //内参列表
    var refer = {
        container: null,
        referenceid: null,
        total: $('#myReferList .total'),
        refer_intro: $('#myReferList .refer_intro'),
        text: '',
        list: null,
        bootpag: null,
        page: 1,
        init: function() {
            var self = this;
            self.text = self.refer_intro.text();
            this.container = $('#myReferList .refer_detail');
            this.list = $('#myReferList .refer_content');
            this.event();
            this.bootpag = yn.bootpag(self.container);
            this.bootpag.on('page', function(e, num) {
                self.page = num;
                self.render();
            })
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            if (ynIsTeacher != 1 || ynTeacherId != teacherid || !ynIsLogin) {
                $('#update').remove();
            }
            if (self.text.length > 188) {
                self.refer_intro.html(self.text.substring(0, 183) + '<a class="lookall">查看全部></a>')
            };
        },
        render: function() {
            var self = this;
            yndata.getregerp({ currentPage: self.page }).done(function(data) {
                data.list = _.map(data.list, function(item) {
                    var time = item.pubtime.replace(" ", ":").replace(/\:/g, "-").split("-");
                    for (i = 0; i < time.length; i++) {
                        item.pubtime = time[1] + '-' + time[2] + ' ' + time[3] + ':' + time[4]
                    }
                    return item
                })
                if (status == "0") {
                    self.container.find('.status').html("更新中");
                }
                if (status == "1") {
                    self.container.find('.status').html("预售中");
                }
                if (status == "2") {
                    self.container.find('.status').html("已结束");
                }
                if (ynTeacherId != teacherid && ynIsTeacher != 0 || is_od != 1 && ynIsTeacher != 1) {
                    data.list = '';
                    self.list.html('订阅后方可浏览当前老师内参！');
                    self.bootpag.hide();
                    return;
                };
                self.total.html(data.total + '条内参');
                self.container.find('.refer_content').html(template('refer-template', data.list))
                self.bootpag.bootpag({ page: self.page, total: data.pageNumber });
            })
        },
        event: function() {
            var self = this;
            //内参更新弹窗
            this.container.on('click', '#update', function() {
                    if (status == 2) {
                        layer.msg('抱歉客官，该内参已结束了呢！');
                        return;
                    };
                    if (status == 1) {
                        layer.msg('抱歉客官，该内参还在预售当中！');
                        return;
                    }
                    referalt.render();
                })
                //图片放大
            this.list.on('click', 'img', function() {

                    var src = $(this).attr("src");
                    self.openBigImg(src);
                })
                //查看全部
            this.container.on('click', '.lookall', function() {
                self.refer_intro.html(self.text + '<a class="fold">收起></a>')
            })
            this.container.on('click', '.fold', function() {
                self.refer_intro.html(self.text.substring(0, 183) + '<a class="lookall">查看全部></a>')
            })
        },
        openBigImg: function(_bigImgurl) {
            $.colorbox({
                href: _bigImgurl,
                iframe: true,
                height: "80%",
                width: "80%",
                speed: 200
            });
        }
    }

    //截取服务期
    var toolKit = {
        container: $('#myReferList .refer_detail'),
        init: function() {
            var self = this;
            cutOut('.servestartTime');
            cutOut('.servendTime');
        },
    }

    //内参更新弹窗
    var referalt = {
        container: $('#uprefer'),
        input: $('#insertStockCodeInput'),
        ue: null,
        content: '',
        init: function() {
            var self = this;

            this.ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    ['simpleupload']
                ],
                initialFrameHeight: 319,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                autotypeset: {
                    removeEmptyline: true, //去掉空行
                    removeEmptyNode: false, // 去掉空节点
                }
            });

            this.event();
        },

        event: function() {
            var self = this;
            var ue_init = true;
            //关闭
            this.container.on('click', '> .close', function(e) {
                self.container.hide();
                yn.bodyScroll(true);
            })

            this.container.on('click', '.submit', function() {
                var content = UE.getEditor('ueditContainer').getContent();
                if (content == '') {
                    layer.msg('更新内容不能为空!');
                    return;
                };
                self.content = content.replace(/(<img)\s+(?:class="big_pic")?(.+?(jpg"|png"))/g, '$1  $2 class="big_pic"');
                self.handle(self.content)
            })
            yn.showStockList(this.input, {
                listLen: 4,
                onSelect: function(item) {
                    self.input.val('');
                    if (ue_init == true) {
                        self.ue.setContent('');
                    }
                    ue_init = false;
                    self.ue.execCommand('inserthtml', item.stockWrap);
                }
            })
        },
        handle: function(content) {
            var self = this;
            yndata.addReferp({ content: content }).done(function(data) {
                if (data == "success") {
                    refer.render();
                    layer.msg('发表成功！');
                    self.ue.setContent('');
                    self.container.hide();
                    yn.bodyScroll(true);
                };
            })
        },
        render: function() {
            yn.centerBox(this.container)
            var self = this;
            yn.bodyScroll(false);
            this.container.velocity('transition.expandIn', { duration: 300 })
        }
    }

    //评论列表
    var comment = {
        container: null,
        input: null,
        textarea: null,
        bootpag: null,
        page: 1,
        type: 0,
        init: function() {
            var self = this;
            this.container = $('#myReferList .refer_comment');
            this.input = $('#myReferList .showStockList');
            this.textarea = $('#myReferList textarea');
            this.bootpag = yn.bootpag('#myReferList .refer_comment .pagebreak');
            this.bootpag.on('page', function(e, num) {
                self.page = num;
                self.render();
            })
            if (ynIsTeacher == 1) {
                $('.genius').remove()
            };
            this.event();
        },
        render: function() {
            var self = this;
            var result = [];
            var user_id = ynUserId;
            if (self.type == 2) {
                user_id = puiblisherid;
            };
            yndata.commontlist({ currentPage: self.page, type: self.type, user_id: user_id }).done(function(data) {
                if (data.list == "" || is_od != 1) {
                    self.bootpag.hide();
                    return;
                };
                handleData(data.list);
                self.container.find('.comment_bar').html(template('comment_bar_template', result.reverse()));
                self.bootpag.bootpag({ page: self.page, total: data.pageNumber });
                self.container.find('.cmentnum').html(data.total)
                if (ynIsTeacher != 1) {
                    self.container.find('.reply').hide();
                };
            })

            function handleData(data, replyFlag) {
                _.forEach(data, function(item) {
                    item.photo = item.photo || "/public/images/user.jpg";
                    item._reply = "";
                    item._style = "";
                    if (replyFlag) {
                        item._reply = "<span style='font-size:12px;color:#f57a17;position:relative;top:-1px'>回复" +
                            "<i style='margin:0 10px;' class='fa fa-angle-right'></i></span>";
                        item._style = "isReply";
                    }
                    if (item.childList != '') {
                        handleData(item.childList, item.nickName);
                    }
                    item.content = yn.parseFaceCode(item.content);
                    result.push(item);
                })
            }
        },
        event: function() {
            var self = this;

            this.container.find('.comm_total').on('click', 'span', function() {
                $(this).parent().find('.thisclass').removeClass('thisclass');
                $(this).addClass('thisclass');
                var type = $(this).data('type');
                self.type = type;
                self.render();
            })

            this.container.on('click', '.reply', function() {
                var id = $(this).data('id');
                var name = $(this).data('name')
                self.delegate.reply({ id: id, name: name });
            })
        },
        delegate: {
            reply: function() {}
        }
    }

    //个人简介
    var PersonInfo = {
        container: $('#myReferList .person-info'),
        userId: puiblisherid,
        render: function() {
            var self = this;
            $.getJSON("/userinfo/queryUserAllInfo.htm?user_id=" + this.userId, function(data) {
                self.container.html(template('person-info-template', data));

                self.container.find('button.care').click(function() {
                    if (!ynIsLogin) {
                        yn.login.render();
                        return;
                    }
                    var element = $(this);
                    var item = element.parents('.person-info').find('.name');
                    var teacherid = item.data('id');
                    var type = element.data('type');
                    if (type == "cancel") {
                        yndata.cancelCare(ynUserId, teacherid).done(function() {
                            element.data('type', 'care')
                            element.html('关注');
                        })
                    }

                    if (type == "care") {
                        yndata.addCare(ynUserId, teacherid).done(function() {
                            element.data('type', 'cancel')
                            element.html('取消关注');
                        });
                    }
                })

                self.container.find('button.ask').click(function() {
                    var id = $(this).data('id');
                    var name = $(this).data('name');
                    askWindow.render();
                    askWindow.add(id, name);
                })
            })
        }
    }

    //ta的内参
    var personrefer = {
        container: $('#myReferList .person-refer'),
        render: function() {
            var self = this;
            yndata.TARefer().done(function(data) {
                var teacherroom = '/live/liveDetailRefer.htm?teacherid=' + teacherid;
                self.container.find('.more').attr('href', teacherroom)
                data.referlink = '/referp/list.htm?referenceid=' + data.reference_id;
                self.container.find('.items').html(template('person-refer-template', data.rows));
                if (!ynIsLogin) {
                    self.container.find('.list>a').removeAttr("href");
                }
            })
        }
    }

    //产品状态
    var productStatus = {
        container: $('#myReferList .subscription'),
        info: $('#myReferList .subscription .info'),
        init: function() {
            var self = this;
            var startTimes = startTime.match(/[0-9]+/g);
            var endTimes = endTime.match(/[0-9]+/g);
            var myDate = new Date();
            var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
            var day = myDate.getDate(); //获取当前日(1-31)
            for (var i = 0; i < 3; i++) {
                startTimes[i] = Number(startTimes[i]);
                endTimes[i] = Number(endTimes[i]);
            }
            var startDays = startTimes[0] * 365 + (getCountInMonth(startTimes[0], startTimes[1] - 1) * startTimes[1]) + startTimes[2];
            var endDays = endTimes[0] * 365 + (getCountInMonth(endTimes[0], endTimes[1] - 1) * endTimes[1]) + endTimes[2];
            var currentDays = year * 365 + (getCountInMonth(year, month) * (month + 1)) + day;
            var yetday = currentDays - startDays;
            var percent = yetday / (endDays - startDays) * 100 + '%';
            if (yetday < 0) {
                yetday = 0;
            };
            if (currentDays - endDays > 0) {
                self.container.find('.yetday').html('此内参已结束');
                self.info.addClass('noinfo');
                percent = 100 + "%";

            }
            if (status == 2) {
                self.container.find('.yetday').html('此内参已结束');
                self.info.html('已售罄').addClass('yesinfo');
            };
            this.container.find('.day').html(yetday);
            this.container.find('.progress_bar').css('width', percent);
            if (is_od == 1 && status != 2) {
                self.info.html("已订阅").addClass('yesinfo');
            }
            if (is_od == 0 && status != 2) {
                self.info.html("¥" + price + " 订阅").addClass('noinfo');
                self.info.on('click', function() {
                    if (ynIsTeacher != 0 && ynTeacherId != teacherid) {
                        layer.msg('抱歉，老师无法订阅内参!');
                        return;
                    }
                    subscription.render(referenceid)
                })
            }
        }
    }

    //=================================================//
    //内参列表
    refer.init();
    refer.render()

    //截取服务期
    toolKit.init();

    //内参更新弹窗
    referalt.init();

    //评论列表
    comment.init();
    comment.render()
    comment.delegate.reply = function(info) {
        post.addReply(info.id, info.name);
    }

    //个人简介
    PersonInfo.render()

    //ta的内参
    personrefer.render()

    //产品状态
    productStatus.init();

    //订阅内参
    var subscription = ynmodule.subscription();
    subscription.init();

    //提问窗口
    var askWindow = ynmodule.askWindow();
    askWindow.init()

    var post = new ynmodule.PostComment()
    post.init();
    post.delegate.submit = function(send) {
        if (status != 0) {
            layer.msg('只有更新中的内参才能进行评论哦！');
            return;
        }
        if (is_od != 1) {
            layer.msg('抱歉，评论需订阅才能进行');
            return;
        };
        var send = {
            parent_id: send.parentId,
            content: send.value
        }
        yndata.upCommont(send).done(function(data) {
            if (data == "success") {
                layer.msg('评论成功！');
                comment.page = 1;
                comment.render();
            };
        })
    }
})

//内参list
yndata.getregerp = function(ops) {
    ops = _.extend({
        referenceid: referenceid,
        currentPage: 1,
        pageSize: 10
    }, ops)
    var send = {
        referenceid: ops.referenceid,
        pageSize: ops.pageSize,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/reference_periodical/list.htm', send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.pageSize)])
        defer.resolve(data);
    })
    return defer.promise();
}

//更新内参
yndata.addReferp = function(ops) {
    ops = _.extend({
        referenceid: referenceid,
        content: '',
        puiblisher: puiblisher,
        puiblisherid: puiblisherid
    }, ops)
    var send = {
        referenceid: ops.referenceid,
        content: ops.content,
        puiblisher: ops.puiblisher,
        puiblisherid: ops.puiblisherid
    }
    var defer = $.Deferred();
    $.post('/reference_periodical/add.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//内参评论列表
yndata.commontlist = function(ops) {
    ops = _.extend({
        type: 0,
        content: '',
        referenceid: referenceid,
        user_id: ynUserId,
        productStatus: status,
        pageSize: 10,
        currentPage: 1
    }, ops)
    var send = {
        type: ops.type,
        content: ops.content,
        reference_id: ops.referenceid,
        user_id: ops.user_id,
        productStatus: ops.productStatus,
        pageSize: ops.pageSize,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/reference/commentList.htm', send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.pageSize)])
        defer.resolve(data);
    })
    return defer.promise();
}

//内参用户评论
yndata.upCommont = function(ops) {
    ops = _.extend({
        reference_id: referenceid, //内参id
        create_id: ynUserId, //用户id
    }, ops)
    var send = {
        reference_id: ops.reference_id,
        parent_id: ops.parent_id,
        create_id: ops.create_id,
        content: ops.content,
    }
    var defer = $.Deferred();
    $.post('/reference/addComment.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

//TA的内参
yndata.TARefer = function(ops) {
    ops = _.extend({
        puiblisherid: puiblisherid,
        pageSize: 5,
        currentPage: 1
    }, ops)
    var send = {
        puiblisherid: ops.puiblisherid,
        user_id: ynUserId,
        pageSize: ops.pageSize,
        currentPage: ops.currentPage
    }
    var defer = $.Deferred();
    $.getJSON('/center/reference/teacherReferenceList.htm', send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


//日期截断
function cutOut(select) {
    var trigger = function() {
        if (typeof select == "string") {
            return $(select);
        } else {
            return select
        }
    }();
    var content = trigger.text().substr(0, 10);
    trigger.html(content)
}


//获取每个月的天数
function getCountInMonth(year, month) {
    var monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0) {
        monthArray[1] = 29;
    } else if (year % 4 == 0 && year % 100 != 0) {
        monthArray[1] = 29;
    }
    return monthArray[month - 1];
}
