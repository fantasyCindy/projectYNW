/**
 * 打赏礼物展示
 */

module.exports = (function() {

    var container

    var createItem = ops => {
        return `<div class="gift-show">
					<div class="avatar"><img src="${ops.avatar}"/></div>
					<div class="text">
						<div class="title">${ops.title}</div>
						<div class="giftName">${ops.giftName}</div>
					</div>
        		</div>`
    }

    return {
        render(ops) {
            if (!container) {
                $('body').append(`<div id="gift-show-container"></div>`)
                container = $('#gift-show-container');
            }	

            
            create({
                avatar: 'http://101.201.41.116:8080/public/upload/user/20170223/20170223182009557.jpg',
                title: "小李飞刀送直播老师",
            })
        }
    }

})()
