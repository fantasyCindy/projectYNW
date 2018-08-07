var layer = require('module/layer.js')


//关注/取消
var attention = (function() {
    var container
    return {
        init: function() {
            container = $('.topic-common')

            //点击老师头像进入直播间
            container.on('click', '.guest-photo', function(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
                var teacherid = $(this).data('teacherid')
                window.location.href = `${live_path}live/${teacherid}`
            })

            container.on('click', function() {
                var topic_id = $(this).data('id')
                window.location.href = __path + `/app/topicDetail.htm?topic_id=${topic_id}`
            })

            //关注
            container.on('click', '.attention0', function(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
                var self = this
                if (!ynIsLogin) {
                    return yn.login.render()
                }
                var topic_id = $(this).parents('.topic-common').data('id')
                $.post(__path + '/app/topicAttention.htm', { topic_id: topic_id }, back => {
                    if (back.status == '1') {
                        layer.msg('话题关注成功')
                        $(self).html('取消关注').addClass('attention1').removeClass('attention0')
                        var cur = $(self).parents('.topic-common').find('.attention-num').html()
                        cur = cur.replace(/\,/g,'')
                        cur = Number(cur) + 1;
                        cur = cur.toLocaleString()
                        $(self).parents('.topic-common').find('.attention-num').html(cur)
                    }
                }, 'json')
            })

            //取消关注
            container.on('click', '.attention1', function(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
                var self = this
                var topic_id = $(this).parents('.topic-common').data('id')
                $.post(__path + '/app/topicAttention.htm', { topic_id: topic_id }, back => {
                    if (back.status == '1') {
                        layer.msg('已取消')
                        $(self).html('+关注').addClass('attention0').removeClass('attention1')
                        var cur = $(self).parents('.topic-common').find('.attention-num').html()
                        cur = cur.replace(/\,/g,'')
                        cur = Number(cur) - 1;
                        cur = cur.toLocaleString()
                        $(self).parents('.topic-common').find('.attention-num').html(cur)
                    }
                }, 'json')
            })
        }
    }
})()



//老师头像切换
var teacher = (function() {
    var container, items, item, list, max, showCount = 3
    return {
        init: function() {
            container = $('.topiclist_left')
            list = container.find('.topic-common')
                //向左
            list.on('click', '.left-arrow', _.debounce(function(e) {
                    if (e && e.stopPropagation) {
                        e.stopPropagation();
                    } else {
                        window.event.cancelBubble = true;
                    }
                    items = $(this).parents('.topic-common').find('.guest-photo-wrap')
                    item = $(this).parents('.topic-common').find('.guest-photo')
                    var cur = parseInt(items.css('left'))
                    if (cur == 0) return
                    var offset = cur + item.outerWidth(true)
                    items.velocity({ left: offset }, { duration: 300 })
                }, 500, { 'leading': true, 'trailing': false }))
                //向右
            list.on('click', '.right-arrow', _.debounce(function(e) {
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
                items = $(this).parents('.topic-common').find('.guest-photo-wrap')
                item = $(this).parents('.topic-common').find('.guest-photo')
                max = item.outerWidth(true) * (item.length - showCount)
                var cur = parseInt(items.css('left'))
                if (cur == -max || item.length < (showCount + 1)) return //头像长度小于3个不能点击切换
                var offset = cur - item.outerWidth(true)
                items.velocity({ left: offset }, { duration: 300 })
            }, 500, { 'leading': true, 'trailing': false }))
        }
    }
})()



// 牛人排行
var ynwRanking = (function() {
    var container, items
    return {
        init: function() {
            container = $('.ranking-content')
            items = container.find('.ranking-main')

            container.on('click', '.ranking-title-list', function() {
                var type = $(this).data('type')
                $(this).addClass('select').siblings().removeClass('select')
                items.hide().each(function(i) {
                    if (type == i) {
                        $(this).fadeIn()
                    }
                })
            })
        }
    }
})()



//添加页码组件
//selector支持css选择器和jquery对象
var bootpag = function(selector, ops) {
    ops = _.extend({
        first: true
    }, ops)
    var timestamp = _.now();
    var id = `#${timestamp}`
    var tag = `<ul id="${timestamp}" class="ynpagination"></ul>`;
    var container = function() {
        if (typeof selector != "string") {
            return selector
        } else {
            return $(selector);
        }
    }()

    container.append(tag);
    var bootpag = $(id).bootpag({
        total: 1,
        page: 1,
        maxVisible: 5,
        firstLastUse: ops.first,
        first: "首页",
        last: "尾页",
        next: "下一页",
        prev: "上一页",
        leaps: false
    })
    bootpag.hide = function() {
        $(id).hide();
        return bootpag;
    }
    bootpag.show = function() {
        $(id).show();
        return bootpag;
    }
    return bootpag;
}


$(function() {
    attention.init()
    teacher.init()
    ynwRanking.init()

    // 页码跳转
    if (__total != 0) {
        var pagination = bootpag($('.topiclist_left'))
        var pagetotal = __total%6 == 0 ? __total/6 : Math.floor(__total/6+1)
        pagination.bootpag({ page: __page, total: pagetotal})
        pagination.on('page', (err, num) => {
            location.href = `${yuanzhuo_path}?pn=${num}`
        })
    }
    if(__page != 1){
        $('.topic-msg-icon').removeClass('topic-msg-icon1')
        $('.topic-title').removeClass('topic-title1')
        $('.attention-num').removeClass('attention-num1')
        $('.comment-num').removeClass('comment-num1')
    } 

    onSelect('圆桌')

})
