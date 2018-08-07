yn.navigation.name = ynconfig.navigation.h;
var PersonInfo = require('~/ui/person-info.js');
var AskWindow = require('base/askWindow.js'); //提问
var Day = require('~/lib/day.js');
var Confirm = require('m/ui/pay-any-package.js');
var Path = require('~/lib/path.js');
var auth = require('vmodule/userAuth') // 实名认证模块
var error = require('e/error-type');
if (!(__data.isOrder || __data.isSelf)) {
    var notFeed = $('.refer_notFeed');
    notFeed.show()
} else {
    require('m/refer_isFeed.js')
}

if (ynIsLogin && !ynIsTeacher) {
    setTimeout(function() {
        if (__data.isactivity != '1') {
            auth.get().render()
        }
    }, 1500)
}
////////////////common///////////////////////////////////
//内参订阅人数
var simulate = {
    '146': {
        "2018-3-26": 23
    },
    '147': {
        "2018-3-29": 23
    },
    '148': {
        "2018-3-29": 15
    },
    '151': {
        "2018-4-3": 8
    },
    '156': {
        "2018-4-18": 8
    },
    '157': {
        "2018-4-18": 5
    },
    '161': {
        "2018-4-23": 16
    },
    '160': {
        "2018-4-23": 11
    },
    '173': {
        "2018-5-23": 12
    },
    '172': {
        "2018-5-23": 6
    },
    '186': {
        "2018-7-30": 6
    },
}


//内参状态
var product = (function() {
    var myReferList, container, progress, feedBtn, runInfo, orderNum, now, pop,content,
        getShort = str => str.match(/^[\d\-]+/)[0],
        dayTag = count => `<span style="color:red;margin:0 3px;">${count}</span>天`,
        short_start =  getShort(__data.start),
        short_end = __data.referenceType == 1 ? getShort(__data.end) : '',
        short_now = getShort(__data.now),
        day_end = new Day(short_end),
        day_now = new Day(short_now),
        runCount = Math.abs(day_now.offset(short_start)) + 1,
        totalRunCount = day_end.offset(short_start),
        isRun = __data.status == "0",
        isReady = __data.status == "1",
        isEnd = __data.status == "2",
        isSelf = __data.isSelf,
        isFeed = __data.isOrder;
    var isStatus = ['服务中', '热卖中', '已完成'][__data.status]  //0服务中 1热卖 2已完成
    $(".subscription .status").text(isStatus); //内参状态
    var actions = {
        feedRun: ops => {
            runInfo.html(`此内参已运行${dayTag(runCount)}`)
            feedBtn.html('<button class="gray">已订阅</button>')
        },
        feedReady: ops => {
            runInfo.html(`此内参${dayTag(--runCount)}后运行`)
            feedBtn.html('<button class="gray">已订阅</button>')
        },
        selfRun: ops => {
            runInfo.html(`此内参已运行${dayTag(runCount)}`)
        },
        selfNotRun: ops => {
            runInfo.html(`此内参${dayTag(--runCount)}后运行`)
        },
        notFeedRun: ops => {
            runInfo.html(`此内参已运行${dayTag(runCount)}`);
            feedBtn.html(`<button class="action-feed">￥${__data.price} <strong style="margin:0 4px;">·</strong> 订阅</button>`)
        },
        notFeedReady: ops => {
            runInfo.html(`此内参${dayTag(--runCount)}后运行`);
            feedBtn.html(`<button class="action-feed">￥${__data.price} <strong style="margin:0 4px;">·</strong> 订阅</button>`)
        },
        end: ops => {
            runInfo.html(`此内参共运行${dayTag(totalRunCount)}`);
            feedBtn.html('<button class="gray">已结束</button>')
        }
    }

    var increase = ops => {
        var tid = orderNum.data('tid')
        if (ops) {
            orderNum.html(+tid + ops)
        } else {
            orderNum.html(tid)
        }

    }

    return {
        init: function() {
            myReferList = $('#myReferList');
            container = $(".product");
            progress = container.find('.progress_bar');
            feedBtn = container.find('.feedBtn');
            runInfo = $('#myReferList').find('.runInfo');
            orderNum = $('.orderNum');
            content = myReferList.find('.refer-intro-text-content');

            //订阅
            myReferList.on('click', '.action-feed', function() {
                if (!ynIsLogin) return yn.login.render();
                if (isFeed || isEnd) return layer.msg("不能订阅");
                if (ynTeacherId != "") return layer.msg("老师不能订阅!")

                //匹配地址栏邀请码，传给订单接口
                var match = __href.match(/ecode=([^]+)/)
                var ecode = match ? match[1] : ''
                var flag = __data.isactivity == 1 ? "none" : ""

                auth.get().render(result => {
                    if (result) {
                        $.post("/app/buyGoodsPayOrder.htm", {
                            goodsId: __data.id, //商品id
                            goodsType: 3,
                            buy_number: 1,
                            pay_source: 0,
                            employeecode: ecode,
                        }, function(data) {
                            if (data.status == 60011) {
                                layer.msg("用户没有开通账户!请联系客服!")
                            }
                            if (data.status == 90002) {
                                realName.init({
                                    show: true
                                })
                            }
                            if (data.status == 60023) {
                                return layer.msg("商品购买时间已过")
                            }
                            if (data.status == 1) {
                                Confirm.payconfirm({
                                    type: 3,
                                    price: __data.price,
                                    referenceid: __data.id,
                                    userid: ynUserId,
                                    orderid: data.data.orderid,
                                    link: Path.pay(data.data.orderNum),
                                    orderNum: data.data.orderNum,
                                    finish: true,
                                    read: true,
                                    useNB:false,
                                    success: () => window.location.reload()
                                })
                            }

                        }, 'json')
                    }
                }, flag)


            })

            //点击图片放大
            content.on('click', 'img', function() {
                var src = $(this).attr('src')
                $('.img-wrap').fadeIn(100).find('#img-wrap-img').attr('src', src)
            })
            $('.img-wrap').click(function() {
                $(this).fadeOut(100)
            })
        },
        render: function() {
            var action = _.find([{
                assert: isEnd,
                action: "end"
            }, {
                assert: isSelf && isRun,
                action: "selfRun"
            }, {
                assert: isSelf && !isRun,
                action: "selfNotRun"
            }, {
                assert: isFeed && isRun,
                action: "feedRun"
            }, {
                assert: isFeed && isReady,
                action: "feedReady"
            }, {
                assert: !isFeed && isRun,
                action: "notFeedRun"
            }, {
                assert: !isFeed && isReady,
                action: "notFeedReady"
            }], item => item.assert).action;
            actions[action]();
            if (!simulate[__data.id]) {
                return increase()
            }

            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            now = year.toString() + '-' + month.toString() + '-' + day.toString();

            var addCount = simulate[__data.id][now]
            if (!addCount) {
                var last = null
                for (var key in simulate[__data.id]) {
                    last = simulate[__data.id][key]
                }
                addCount = last
            }
            increase(addCount)
        }
    }
})()

//他的内参
var hisRefer = (function() {
        var container, items;
        var create = item => {
            return `<div class="item">
                <a href="${item._link}" target="_blank">${item.title}</a>
            </div>`
        }

        var handleData = arr => {
            return _.map(arr, item => {
                item._link = `/reference/${item.id}.htm`;
                return item;
            })
        }

        return {
            init: function() {
                container = $(".person-refer");
                items = container.find('.items');
            },
            render: function() {
                $.getJSON('/center/reference/teacherReferenceList.htm', {
                    puiblisherid: __data.pubId,
                    user_id: ynUserId,
                    pageSize: 6,
                    currentPage: 1
                }, data => {
                    if(data.status == 1){
                        var rows = handleData(data.data.rows);
                    var html = _.map(rows, item => create(item)).join("");
                    items.html(html);
                    }else () => {return layer.msg(error[data.status])}
                })
            }
        }
    })()
    /////////////////////////////////////////////////////////////////





//匹配内参id
var __href = window.location.href;
var match = __href.match(/\/(\d+)\.htm/)
var referId = match ? match[1] : 1


/////////////////////////////////////////////////////
/*
擅长领域
 */
var specialtys = (function() {
    var container, personData
    return {
        init: function() {
            container = $('.specialtys')
            personData = PersonInfo.getData()
        },
        render: function() {
            if (!personData.specialtys) {
                container.find('.items').html(`<div class="none">暂无内容</div>`)
            } else {
                _.each(personData.specialtys, item => {
                    container.find('.items').append(`<span class="specialtyList">${item.name}</span>`)
                })
            }

        }
    }
})()




/*///////////////////////////////////////////////////////////////////*/

$(function() {
    AskWindow.init();
    PersonInfo.render({
        container: $('.person-info'),
        teacherid: __data.createId,
        onAsk: info => AskWindow.aimedRender({
            select: info
        })
    })



    product.init(); //内参信息
    product.render();
    hisRefer.init(); //他的内参
    hisRefer.render();
    setTimeout(function() {
        specialtys.init()
        specialtys.render()
    }, 1000)


    if (/#orgin=appraisal/.test(__href)) {
        $('#myReferList').find('.action-feed').click()
        window.location.hash = ""
    }


})


// console.log("new20170912190714")
