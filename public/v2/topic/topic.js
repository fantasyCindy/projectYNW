var Face = require('m/qqface/main.js');
var layer = require('module/layer.js')

if (ynUserId == create_id || ynIsTeacher) {
    $('.topic-textarea').show()
}

//评论列表
var commentList = (function() {
    var container, page, bootpag, send = {
        topic_id: topic_id,
        currentPage: 1,
        pageSize: 10
    }

    var create = arr => {
        return _.map(arr, item => {
            return `<div class="topic-item clear">
            <div class="topic-item-photo"><a ${item.link} target="_blank"><img src="${item.teacherPhoto}" alt=""></a></div>
            <div class="topic-item-content">
                <div class="topic-item-name"><span><a ${item.link} target="_blank">${item.teacherName}</a></span>${item.teacherIcon}<span class="topic-teacher-status topic-status${item.isLive}"><a ${item.link} target="_blank">${item._text}</a></span><span class="topic-item-delete ${item._style}" data-id="${item.id}">删除</span><span class="topic-item-time">${item._create_time}</span></div>
                <div class="topic-item-text">${item._content}</div>
            </div>
        </div>`
        })
    }

    var handle = arr => {
        return _.map(arr, item => {
            if (typeof(item.teacher_id) != 'undefined') {
                item.link = `href= ${live_path}live/${item.teacher_id}`
            } else {
                item.link = ''
            }
            item.teacherIcon = typeof(item.teacher_id) != 'undefined' ? `<span class="topic-teacher-icon"><i class="topic-teacher-icon-t"><img src=${item.type_ioc} alt="" /></i>${item.type_name}</span> `: '<i class="topic-teacher-icon-a">主持人</i>'
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
            item._style = create_id == ynUserId ? 'show' : 'hide'
            item._create_time = item.create_time.substr(0, 16)
            item._text = ['离开', '正在直播'][item.isLive]
            return item
        })
    }
    return {
        init: function() {
            container = $('.topic-left')
            page = $('.page')
            bootpag = yntool.bootpag(page);
            bootpag.on('page', function(err, n) {
                send.currentPage = n;
                commentList.render()
                $(window).scrollTop(0)
            })


            //删除话题评论
            container.on('click', '.topic-item-delete', function() {
                var self = this
                layer.confirm('确定删除这条评论吗？', function() {
                    var id = $(self).data('id')
                    console.log("===")
                    $.post(__path + '/app/delTopic_comment.htm', { ids: id }, back => {
                        if (back.status == 1) {
                            layer.msg('已删除')
                            commentList.render()
                        }
                    }, 'json')
                })

            })
        },
        render: function() {
            $.getJSON(__path + '/app/topicCommentList.htm', send, back => {
                if (back.status == '1') {
                    if (back.data.list.length > 0) {
                        container.find('.topic-items').html(create(handle(back.data.list)))
                        back.pageNumber = _.max([1, Math.ceil(+back.data.total / send.pageSize)])
                        bootpag.bootpag({ page: send.currentPage, total: back.pageNumber })
                        page.show()
                    } else {
                        var none = `<div class="topic-comment-none">
                                    <div class="topic-comment-none-icon"><img src="/public/v2/topic/images/none.png" alt="" /></div>
                                    <div class="topic-comment-nont-text">暂无嘉宾进行评论呢</div>
                                </div>`
                        container.find('.topic-items').html(none)
                        page.hide()
                    }
                }
            })
        }
    }
})()



//发表评论
var sendComment = (function() {
    var container, wordCount, textarea
    return {
        init: function() {
            container = $('.topic-left')

            container.find('textarea').focus(function() {
                if (!ynIsLogin) {
                    yn.login.render();
                    return
                }
            })
            container.on('click', '.topic-send', _.debounce(function() {
                var val = container.find('textarea').val()
                if (!val) {
                    return layer.msg('请输入内容')
                }
                if (val.length > 500) {
                    return layer.msg('字数不能超过500')
                }
                $.post(__path + '/app/topicComment.htm', { topic_id: topic_id, content: val }, back => {
                    if (back.status == '40012') {
                        return layer.msg('还没有直播老师哦')
                    } else if (back.status == '1') {
                        layer.msg('发布成功')
                    }else if(back.status == '80001'){
                        return layer.msg('您输入的内容违反相关规定，不能予以展示')
                    }
                    container.find('textarea').val('')
                    wordCount.text('500')
                    commentList.render()
                }, 'json')
            }, 2000, { leading: true, trailing: false }))

            //表情
            container.on('click', '.face', function() {
                Face.getInstance().render("face-trigger", title => {
                    var val = container.find('textarea').val()
                    container.find('textarea').val(val + title)
                }, { left: 205, top: 0 })
                return false
            })

            wordCount = container.find('.topic-comment-count .count');
            textarea = container.find('textarea')
                //字数统计
            yn.wordCount(textarea, {
                indicate: wordCount,
                limit: 500
            });
        }
    }
})()


//关注/取消
var attention = (function() {
    var container
    return {
        init: function() {
            container = $('.topic-common')
            if (isAttention) {
                var text = isAttention == 1 ? '取消关注' : '+关注'
                container.find('.topic-attention').html(text)
            } else {
                container.find('.topic-attention').html('+关注').addClass('attention0')
            }
            //关注
            container.on('click', '.attention0', function() {
                if (!ynIsLogin) {
                    return yn.login.render()
                }
                $.post(__path + '/app/topicAttention.htm', { topic_id: topic_id }, back => {
                    if (back.status == '1') {
                        layer.msg('话题关注成功')
                        container.find('.topic-attention').html('取消关注').removeClass('attention0').addClass('attention1')
                        var cur = container.find('.attention-num').html()
                        container.find('.attention-num').html(++cur)
                    }
                }, 'json')
            })

            //取消关注
            container.on('click', '.attention1', function() {
                $.post(__path + '/app/topicAttention.htm', { topic_id: topic_id }, back => {
                    if (back.status == '1') {
                        layer.msg('已取消')
                        container.find('.topic-attention').html('+关注').removeClass('attention1').addClass('attention0')
                        var cur = container.find('.attention-num').html()
                        container.find('.attention-num').html(--cur)
                    }
                }, 'json')
            })
        }
    }
})()


//老师头像切换
var teacher = (function() {
    var container, items, item, max, showCount = 7
    return {
        init: function() {
            container = $('.topic-guest-photos')
            items = container.find('.guest-photo-wrap')
            item = container.find('.guest-photo')
            var w = container.find('.guest-photo').outerWidth(true) * item.length + 20; //赋值
            items.css('width', w + 'px')
            max = container.find('.guest-photo').outerWidth(true) * (item.length - showCount)
                //向左
            container.on('click', '.left-arrow', _.debounce(function() {
                    var cur = parseInt(items.css('left'))
                    if (cur == 0) return
                    var offset = cur + item.outerWidth(true)
                    items.velocity({ left: offset }, { duration: 300 })
                }, 1000, { 'leading': true, 'trailing': false }))
                //向右
            container.on('click', '.right-arrow', _.debounce(function() {
                var cur = parseInt(items.css('left'))
                if (cur == -max || item.length < (showCount + 1)) return //头像长度小于8个不能点击切换
                var offset = cur - item.outerWidth(true)
                items.velocity({ left: offset }, { duration: 300 })
            }, 1000, { 'leading': true, 'trailing': false }))
        }
    }
})()


$(function() {
    sendComment.init();

    commentList.init();
    commentList.render();

    attention.init()
    teacher.init()
    onSelect('圆桌')
})