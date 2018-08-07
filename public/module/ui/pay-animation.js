/* 
	打赏效果展示

	var card = new Card({
		avatar: String, -- 头像
		title: String, -- 标题
		sub: String, -- 子标题
		gift: String -- 礼物图片
		count: Number -- 礼物数量
	})

	card.animate({
		type: String -- 动画类型
		duration: Number  -- 动画时长
	})
	
 */



require('./pay-animation.css')

var index = 1;

var createElement = item => {
    return `<div class="pay-show-item" id="${item.id}">
				<div class="avatar"><img src="${item.avatar}" /></div>
				<div class="info">
					<div class="title">${item.title}</div>
					<div class="sub">${item.sub}</div>
				</div>
				<div class="gift"><img src="${item.gift}" /></div>
				<div class="count">
					<span class="icon">X</span>
					<span class="value">${item.count}</span>
				</div>
			</div>`
}

var Card = function(ops) {

    var id = `pay-animation-${index++}`;
    ops = _.extend({
        id: id,
        avatar: "http://101.201.41.116:8080/public/upload/user/20160725/20160725152444777.jpg",
        title: "股友赠送礼物",
        sub: "鲜花",
        gift: "http://101.201.41.116:8080/public/upload/gift/20170224/20170224152813910.png",
        count: "1"
    }, ops)

    $('body').append(createElement(ops));
    this.el = $(`#${id}`)
}


Card.prototype = {

    animate: function(ops) {
        ops = _.extend({
            type: "move",
            duration: 15000
        }, ops)

        var self = this;
        var top = _.range(1, 6) * 10;

        this.el.velocity({
            left: '120%',
        }, {
            duration: ops.duration,
            complete: () => {
                self = null
            }
        })
    }
}

module.exports = Card
