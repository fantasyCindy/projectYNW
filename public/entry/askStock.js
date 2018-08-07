yn.navigation.name = "问股";
// var askWindow = require('m/askStock/askWindow.js') //提问窗口
var askWindow = require('base/askWindow.js'); //提问
var hot = require('m/askStock/hotStock.js') // 热问股票
var care = require("m/ajax/care.js") // 关注接口
var trend = require('m/askStock/trend.js') // 牛人看涨
var ranking = require('m/askStock/resolveRanking.js') //解答牛人
var profile = require('base/teacher-profile.js'); //鼠标放到老师头像是显示详细信息
var error = require('e/error-type')


/*///////////////////////////////////////////////////////////////////*/
$(function() {

    // 分类高亮/跳转
    $('.cate-item').each(function(i, el) {
        var id = $(this).data('id');
        var type = $(this).data('type');
        $(this).attr('href', `${ask_path}${__cate}/${type}/`)
        if (type == __type) {
            $(this).addClass('select')
        }
    })

    $('.type-item').each(function(i, el) {
        if ($(this).data('id') == __cate) {
            $(this).addClass('select')
        }
    })

    // 页码跳转
    var pagination = yn.bootpag($('#Answer'))
    pagination.bootpag({ page: __page, total: __total / 10 })
    pagination.on('page', (err, num) => {
        location.href = `${ask_path}${__cate}/${__type}/?pn=${num}`
    })


    // 向他提问
    $('.info-btn').click(function() {
        askWindow.aimedRender({
            select: {
                id: $(this).data('id'),
                name: $(this).data('name')
            }
        });
    })

    // 提问统计数
    var banner = function() {
        var container = $('#ask-logo');
        var items = container.find('.logo-wrap');
        container.on('click', '.trigger', function() {
            askWindow.render();
        })

        return {
            render: function() {
                var createTag = data => {
                    return `<div class="logo-text">
                                <div class="inline">已累计解决<strong>${data.answercount}</strong>个问题</div>
                                <div class="inline"><strong>${data.zancount}</strong>人得到了帮助</div>
                                <div class="buttons"><button class="trigger">我要问股</button></div>
                            </div>`
                }

                $.getJSON("/consultation/queryAnswerCountAndReadCount.htm", data => {
                    if (data.status == 1) {
                        data = data.data
                        items.html(createTag(data))
                    }else () => {return layer.msg(error[data.status])}

                })
            }
        }
    }()

    /*///////////////////////////////////////////////////////////////////*/


    //在线老师
    var onlineTeacher = {
        page: 1,
        row: 4,
        container: $('#online-teacher'),
        init: function() {
            this.event();
        },
        render: function() {
            var self = this;
            getOnlineTeacher({ page: this.page, row: this.row }).done(function(data) {
                if (data.data.list.length < 1) {
                    //layer.msg("没有更多在线老师了")
                    return;
                }
                log("在线老师", data)
                data.data.list = self.handleData(data.data.list)
                self.container.find('.content').html(template('onlineTeacher-template', data.data.list));
            })
        },
        handleData: function(data) {
            return _.map(data, function(item) {
                item.attentionText = item.attention == "1" ? "取消关注" : "关注"
                item.careType = item.attention == "1" ? 'cancel' : 'care'
                item.speaialtyname = function() {
                    var arr = item.speaialtyname.split(',');
                    return _.take(arr, 3).join("-");
                }()
                item.zancount = item.zancount || 0
                return item;
            })
        },
        event: function() {
            var self = this;

            //提问
            this.container.on('click', '.trigger-ask', function() {
                askWindow.aimedRender({
                    select: {
                        id: $(this).data('id'),
                        name: $(this).data('name')
                    }
                });
            })

            //换一换
            this.container.on('click', '.refresh', function() {
                self.page = self.page % 2 + 1;
                self.render();
            })

            //关注
            this.container.on('click', '.trigger-care.care', function() {
                    if (!ynIsLogin) {
                        yn.login.render();
                        return;
                    }
                    var element = $(this);
                    var item = element.parents('.item');
                    var teacherid = item.data('id');
                    element.addClass('cancel').removeClass('care')

                    care.add(teacherid).done(function() {
                        element.text('取消关注');
                    });
                })
                //取消关注
            this.container.on('click', '.trigger-care.cancel', function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                var element = $(this);
                var item = element.parents('.item');
                var teacherid = item.data('id');
                element.addClass('care').removeClass('cancel')
                care.cancel(teacherid).done(function() {
                    element.text('关注');
                })

            })
        }
    }


    ////////////////////////////////////////////////////////////////**/

    banner.render()
    onlineTeacher.init();
    onlineTeacher.render()
    askWindow.init();

    hot.init({ wrap: $(".hot-ask-container") })
    hot.render()

    trend.init({ wrap: $('.trend-container') })
    trend.render()

    ranking.init({ wrap: $('.ranking-container') })
    ranking.render()
    ranking.onAsk = person => {
        askWindow.aimedRender({ select: { id: person.id, name: person.name} })
    }


    profile.init();
    profile.add('.teacher-head')
    profile.add('.user-photo')
    profile.add('.user-head')

    onSelect('问股')

})


var getOnlineTeacher = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        row: 5,
        page: 1,
        userid: ynUserId //根据userid返回是否关注该老师
    }, ops);

    var send = {
        pageSize: ops.row,
        currentPage: ops.page,
        userid: ops.userid
    };

    $.getJSON("/consultation/queryOnlineTeacher.htm", send, function(data) {
        defer.resolve(data);
    });
    return defer.promise();
}
