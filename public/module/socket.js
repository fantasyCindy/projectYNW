/*Socket处理*/

/* 页面底部信息提示 */
var bottomAlert = (function() {
    var instance

    var createInstance = function() {
        $('body').append(`<div id="ynAlert">
            <div class="title">
                <i class="fa fa-envelope"></i>
                <span>您有<span class="count">0</span>条新的消息</span>
                <i class="more fa fa-angle-down"></i>
            </div>
            <div class="items"></div>
        </div>`);

        var container = $("#ynAlert");
        var items = container.find('.items');
        var count = container.find('.count');

        var updateCount = function() {
            var len = items.find('.alert-item').length;
            count.text(len);
            if (len == 0) {
                container.hide();
            }
        }

        // 显示/隐藏
        container.on('click', '.title', function() {
            items.toggle();
        })

        // 跳转
        container.on('click', '.alert-item', function(e) {
            $(this).remove()
            updateCount();
        })

        // 关闭
        container.on('click', '.icon-close', function() {
            $(this).parent('.alert-item').remove()
            updateCount();
            return false;
        })


        /* 创建项目 item = { link, content } */
        var createItem = item => {
            return `<a class="block alert-item" target='_blank' href="${item.link}" >
                        <span>${item.content}</span>
                        <span class="fa fa-times-circle fa-lg icon-close"></span>
                    </a>`
        }

        return {

            /* 添加项目 */
            add(data) {
                container.show()
                items.prepend(createItem(data))
                updateCount()
            }
        }

    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance()
            }
            return instance;
        }
    }
})()

var Message = require('m/ui/message.js')

window.ynSocket = {
    type: {
        "1": "",
        "3": "askStock", //有人向老师提问
        "4": "composite",
        "5": "composite",
        "6": "composite",
        "7": "composite_feed", //购买的组合有了新的动态
        "8": "addCare",
        "9": "askStock", //关注的老师回答了问题
        "10": "paySuccess", //支付成功
        "13": "vipOpinion", //VIP观点
        "14": "referPass", // 通知老师内参审核是否通过
        "15": "publishRefer", // 关注的老师内参有新动态(包括发布新内参和更新内参内容)
        "16": "replyRefer", //内参评论推送给用户(回复)
        "17": "discussRefer", //内参评论推送给老师 
        "18": "buyRefer", //用户购买内参推送给老师 
        "19": "liveInteract", //直播室股友互动回复即时推送 
        "20": "sendGift", //有人送礼
        "21": "liveStart", //21直播开启即时推送
        "22": 'topicComment', //话题评论即时推送
    }
}


/*分发*/
ynSocket.dispatch = function(data) {
    var type = data.dataType;
    ynSocket[this.type[type]].render(data);
}

/*14通知老师内参审核是否通过 */
ynSocket.referPass = {
    render(data) {
        var link = `/backstage/myRefer.htm`
        bottomAlert.getInstance().add({
            link: link,
            content: `${data.content}`
        })
    }
}

/*15关注的老师内参有新动态*/
ynSocket.publishRefer = {
    render(data) {
        var link = `/reference/${data.referid}.htm`
        bottomAlert.getInstance().add({
            link: link,
            content: `${data.content}`
        })
    }
}

/*16内参评论推送给用户(回复)*/
ynSocket.replyRefer = {
    render(data) {
        var link = `/reference/${data.referid}.htm`
        bottomAlert.getInstance().add({
            link: link,
            content: `${data.content}`
        })
    }
}

/*17内参评论推送给老师 */
ynSocket.discussRefer = {
        render(data) {
            var link = `/reference/${data.referid}.htm`
            bottomAlert.getInstance().add({
                link: link,
                content: `${data.content}`
            })
        }
    }
    /*18用户购买内参推送给老师*/
ynSocket.buyRefer = {
        render(data) {
            var link = `/backstage/myRefer.htm`
            bottomAlert.getInstance().add({
                link: link,
                content: `${data.content}`
            })
        }
    }
    /*
    19直播室股友互动回复即时推送
     */
ynSocket.liveInteract = {
    render(data) {
        var link = `/live/${data.teacherid}`
        bottomAlert.getInstance().add({
            link: link,
            content: `${data.content}`
        })
    }
}

/*
20有人送礼
 */
ynSocket.sendGift = {
        render(data) {
            var link = `/live/${data.teacherid}`
            bottomAlert.getInstance().add({
                link: link,
                content: `${data.pushContent}`
            })

        }
    }
    /*
    21直播开启时推送
     */
ynSocket.liveStart = {
    render(data) {
        var link = `/live/${data.teacherid}`
        bottomAlert.getInstance().add({
            link: link,
            content: `${data.content}`
        })
    }
}

//22话题评论即时推送
ynSocket.topicComment = {
    render(data) {
        var link = `/app/topicDetail.htm?topic_id=${data.id}`
        bottomAlert.getInstance().add({
            link: link,
            content: `${data.content}`
        })
    }
}

/* VIP观点推送 */

ynSocket.vipOpinion = {
    render(data) {
        var link = `${live_path}/live/live-vip-inside.htm#roomid=${data.roomid}&classify=${data.classify}&article_id=${data.opinion_id}`
        var type = { "4": "操盘绝学", "5": "独家内参" }
        bottomAlert.getInstance().add({
            link: link,
            content: `VIP老师发布了新的${type[data.classify]}`
        })
    }
}


/* 问股推送 */

ynSocket.askStock = function() {
    return {
        render(data) {

            var link = `/consultation/${data.dataId}.htm`;
            var href = window.location.href;
            /* 有人向某个老师提问 */
            if (data.dataType == 3) {
                if(/\/live\//.test(href)) return;
                bottomAlert.getInstance().add({
                    link: link,
                    content: '您有一条新的提问,请及时回复!'
                })
                return;
            }

            bottomAlert.getInstance().add({
                link: link,
                content: `您关注的投顾【${data.content}】回答了问股`
            })

            updateCount();
        }
    }
}()



/* 组合消息推送 */

ynSocket.composite = function() {
    return {
        render: function(data) {
            new Message({
                type: 1,
                title: "组合消息",
                content: data.content,
                link: `/html/CompositeDetail.htm?00ZHXQ${data.dataId}`
            });
        }
    }
}()

/* 购买组合消息推送 */

ynSocket.composite_feed = function() {
    return {
        render: function(data) {
            new Message({
                type: 1,
                title: "组合订阅",
                content: data.content,
                dismiss: 2000
            });
        }
    }
}()

/*8添加关注消息*/
ynSocket.addCare = function() {
    return {
        render: function(data) {
            new Message({
                type: 1,
                title: "您有新的粉丝",
                content: data.content,
                dismiss: 3000
            });
        }
    }
}()

//10支付成功
ynSocket.paySuccess = function() {
    return {
        render(data) {
            log('paySuccess', data)
        }
    }
}()