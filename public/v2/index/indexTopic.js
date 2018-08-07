var indexTopic = (function() {
    var container;
    var create = item => {
        return `<span class="index-topic-container">
            <span class="topic-title-text"><a href="${yuanzhuo_path}app/topicDetail.htm?topic_id=${item.id}" target="_blank">#${item._topic_title}#</a></span> |
            <span class="topic-attention">${item.attention}</span>人关注
            <span class="topic-comment">${item._commentCount}</span>条投顾讨论
            <span class="topic-addAttention ${item._style}" data-id="${item.id}">${item._attentionText}</span> |
        </span>`
    }

    var createTag = arr => {
        return _.map(arr, item => 　{
            return `<span class="topic-teachers">
            <span class="topic-teacher-photo"><img src="${item.photo}" alt="${item.title}" /></span><i class="item-icon item-icon-guwen"></i>
        </span>`
        }).join('')
    }

    var handle = item => {
        if (item.topic_title.length > 15) {
            item._topic_title = item.topic_title.substr(0, 15) + '..'
        } else {
            item._topic_title = item.topic_title
        }
        if (item.isAttention) {
            item._attentionText = ['+关注', '取消关注'][item.isAttention]
            item._style = ['add', 'cancel'][item.isAttention]
        } else {
            item._attentionText = '+关注'
            item._style = 'add'
        }
        item._commentCount = item.commentCount ? item.commentCount : '0'
        return item
    }

    return {
        init: function() {
            container = $('.index-topic')

            $.getJSON('app/topicIndex.htm', back => {
                var teacherlist = []
                var href = ''
                if (back.data == 1) {
                    return
                }
                if (back.data.teacherList.length > 0) {
                    container.show()
                    $('.banner-wrap').css('height', '500px')
                }
                if (back.data.teacherList.length > 7) {
                    teacherlist = _.take(back.data.teacherList, 7)
                    container.find('.topic-arrow').show()
                } else {
                    teacherlist = back.data.teacherList
                }
                container.find('.index-topic-container').html(create(handle(back.data)))
                container.find('.topic-teacher').html(createTag(teacherlist))

                href = container.find('.topic-title-text a').attr('href')
                container.find('.topic-arrow a').attr('href', href)
            })


            //关注
            container.on('click', '.add', function() {
                if (!ynIsLogin) {
                    return yn.login.render()
                }
                var topicId = $(this).data('id')
                $.post('app/topicAttention.htm', { topic_id: topicId }, back => {
                    if (back.status == '1') {
                        layer.msg('话题关注成功')
                        container.find('.topic-addAttention').text('取消关注').removeClass('add').addClass('cancel')
                        var cur = container.find('.topic-attention').html()
                        container.find('.topic-attention').html(++cur)
                    }
                }, 'json')
            })

            //取消关注
            container.on('click', '.cancel', function() {
                var topicId = $(this).data('id')
                $.post('app/topicAttention.htm', { topic_id: topicId }, back => {
                    if (back.status == '1') {
                        layer.msg('已取消关注')
                        container.find('.topic-addAttention').text('+关注').removeClass('cancel').addClass('add')
                        var cur = container.find('.topic-attention').html()
                        container.find('.topic-attention').html(--cur)
                    }
                }, 'json')
            })
        }
    }
})()


module.exports = indexTopic