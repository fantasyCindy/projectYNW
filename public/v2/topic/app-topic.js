var Face = require('m/qqface/main.js');

var appTopic = (function(){
	var container,guest,
	isCarry_t = true,  //老师是否折起
	isCarry_d = true,   //话题描述是否折起
	items,
	isAsc = false,
	send = {
		topic_id:topic_id,
		currentPage:1,
		pageSize:100,
		order:''
	}

var create = arr => {
	return arr.map(function(item){
		return `<div class="app-topic-comments-item">
                    <div class="app-comments-top">
                        <span class="app-comments-photo"><img src="${item.teacherPhoto}" alt="" /></span>${item.teacherIcon}
                        <span class="app-comments-name">${item.teacherName}${item.liveIcon}</span>
                    </div>
                    <div class="app-comments-text">${item._content}</div>
                    <a>${item.time}</a>
                </div>`
	})
}

var handle = arr => {
	return arr.map(function(item){
		item._create_time = item.create_time.substr(0,16)
		item.time = `<a class="app-comments-time">${item._create_time}</a>`
		item.style = item.isLive == '1' ? '' : 'hide'
		item.liveIcon = typeof(item.teacher_id) != 'undefined' ? `<span class="app-teacher-live ${item.style}" ></span>`: '<span class="app-host-text">【主持人】</span>'
		item.teacherIcon = typeof(item.teacher_id) != 'undefined' ? `<i class="app-comments-icon"><img src="${item.type_ioc}" alt="" /></i>` : ''
		    // 解析表情符
            item._content = item.content.replace(/\[.+?\]/g, match => {
                var isOld = /face=/.test(match)
                if (isOld) {
                    return yn.parseFaceCode(match)
                } else {
                    var name = Face.getInstance().titleToName(match)
                    if (!name) return match;
                    var src = path + `/public/module/qqface/png/${name}@2x.png`
                    return `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" >`
                }
            })
            return item
	})
}
	return {
		init: function(){
			container = $('#app-topic');
			guest = container.find('.app-topic-guests-items');
			items = container.find('.app-topic-comments-items')
			//点击更多参与嘉宾
			container.on('click','.app-topic-guests-more',function(){
				if(isCarry_t){
					// guest.addClass('carryout')
					$('.guest-long').show()
					$('.guest-short').hide()
					$(this).text('点击收起')
					isCarry_t = false
				}else{
					$('.guest-long').hide()
					$('.guest-short').show()
					// guest.removeClass('carryout')
					$(this).text('点击更多')
					isCarry_t = true
				}
			})
			//展开话题介绍
			container.on('click','.app-topic-carryout',function(){
				if(isCarry_d){
					$(this).text('[收起]')
					$(this).parents('.app-topic-description').find('.app-topic-content-long').show()
					$(this).parents('.app-topic-description').find('.app-topic-content-short').hide()
					isCarry_d = false
				}else{
					$(this).text('[展开]')
					$(this).parents('.app-topic-description').find('.app-topic-content-long').hide()
					$(this).parents('.app-topic-description').find('.app-topic-content-short').show()
					isCarry_d = true
				}
			})
			//正序倒序
			container.on('click','.app-comments-tool',function(){
				if(isAsc){
					appTopic.render({order:''})
					$(this).removeClass('asc')
					isAsc = false
				}else{
					appTopic.render({order:'asc'})
					$(this).addClass('asc')
					isAsc = true
				}
			})
		},
		render: function(ops){
			send = $.extend(send,ops)
			$.getJSON(path + '/app/topicCommentList.htm', send, back => {
                if (back.status == '1') {
                    if (back.data.list.length > 0) {
                        items.html(create(handle(back.data.list)))
                    } else {
                        var none = `<div class="topic-comment-none">
                                    <div class="topic-comment-none-icon"><img src="/public/v2/topic/images/none.png" alt="" /></div>
                                    <div class="topic-comment-nont-text">暂无嘉宾进行评论呢</div>
                                </div>`
                        items.html(none)
                    }
                }
            })	
		}
	}
})()


$(function(){
	appTopic.init()
	appTopic.render()
})