/*
    //导入模块
    var referList = require('../module/composite/refer-list.js');

    referList.init({container: $el });

    //渲染视图
    referList.render({ data: Array});
*/

/*///////////////////////////////////////////////////////////////////*/

require('./refer-list.css');
var Path = require('m/lib/path.js');
var Day = require('m/lib/day.js')
var payConfirm = require('m/ui/pay-confirm.js');
var Day = require('~/lib/day.js');
var auth = require('vmodule/userAuth') // 实名认证模块


/*///////////////////////////////////////////////////////////////////*/


/*
    ops = {data, container} //require
*/
module.exports = function() {
    var container, data, contentWidth, countDown;

    var create = data => {
            return `<div class="refer-list-item" id="refer-li">
                    <div class="refer-list-item-wrap">
                        <div class="user_info clear">
                            <div class="user_head fl">
                                <span class="icon status ${data._icon}">${data._text}</span>
                                <div class="cover"><img src="${data.photo_path}" /></div>
                                <div class="name">${data.puiblisher}</div>
                            </div>
                            <div class="content fl">
                                <a class="title" href="${data._link}" target="_blank" style="width:${contentWidth}px">${data._title}${countDown}</a>
                                <div class="middle">
                                    <div class="price fl">
                                        <div class="red">${data._price}</div>
                                        <div class="small">价格</div>
                                    </div>
                                    <div class="num fl">
                                        <div class="red">${data.updatefrequency}<span class="small">（条）</span></div>
                                        <div class="small"><span>${data.updateDay}</span>交易日/更新频率</div>
                                    </div>
                                    <div class="dayCount">
                                        <span class="line"></span>
                                        <span class="point"></span>
                                        <span class="text">${data.runText}</span>
                                    </div>
                                </div>
                                <div class="sub_detail clear ${data._style}">
                                服务时间：${data._startTime}－${data._endTime}
                                </div>
                                <div class="sub_detail clear ${data._style1}">
                                服务时间：无限期
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="agreement">
                        <a href="/protocol.htm?orderid=${data.orderid}&referenceid=${data.id}"  target="_blank">《服务使用协议》</a>
                        <a href="/agreement.htm?orderid=${data.orderid}&referenceid=${data.id}" target="_blank">《风险提示书》</a>
                    </div>
                    ${data._button}
                </div>`
        }
        //开始时间 + 试用时间 = 使用结束时间
    function transferCouponValueTime(startDate, valueTime) {
        var date = new Date(startDate);
        var newDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() + valueTime);
        var year2 = newDate.getFullYear();
        var month2 = newDate.getMonth();
        var day2 = newDate.getDate();
        return year2 + '/' + month2 + '/' + day2
    }

    var getShort = str => str.match(/^[\d\-]+/)[0]

    var handleData = data => {
        var getDay = time => time.match(/^\d+-(\d+-\d+)/)[1].replace(/-/, '.');

        // 按钮状态
        var buttonTable = {
            feed: item => `<span data-link="${item._link}" data-index="${item.reference_id}" class="feedBtn" data-type="feed" data-status='${item.isactivity}'>立即查看</span>`,
            unFeed: item => `<a href="${item._link}" data-index="${item.reference_id}" class="feedBtn" data-type="unFeed" data-status='${item.isactivity}'>去订阅</span></a>`,
            end: item => `<a href="${item._link}" class="feedBtn gray" data-type="end" data-status='${item.isactivity}'>已完成</a>`
        }
        return _.map(data, item => {

            item._link = `/reference/${item.reference_id}.htm`;
            item._pubtime = yn.timeFormat(item.pubtime);
            if (item.referenceType == 1) {
                item._startTime = getDay(item.startTime);
                item._endTime = getDay(item.endTime);
            }
            item._price = item.referenceType == 1 ? `${item.price}<span class="small redNum">（元）</span>` : `${item.price}<span class="small redNum">元/月</span>`;
            item._style = item.referenceType == 0 ? 'hide' : '';
            item._style1 = item.referenceType == 1 ? 'hide' : '';
            item._icon = ["ready", "update", "end"][+item.productStatus];

            var isTrial = item.orderState == '1' && item.isTrial == 1 //正在试用
            var noIsTrial = item.isTrial == 0 //正常订单
            var orderState = item.orderState == '9' && item.isTrial == 1 //试用且过期
            if (isTrial) {
                item._text = '免费试用'
                    //试用倒计时
                var time1 = new Date(item.startTime).getTime()
                var time2 = new Date().getTime()
                if (item.orderServicePeriod && time1 <= time2) { //活动开始后
                    var startTime = item.startTime
                    var orderServicePeriod = item.orderServicePeriod

                    var end = transferCouponValueTime(startTime, +orderServicePeriod)
                    var endTime = new Date(end); //结束时间
                    var difference = endTime.getTime() - new Date().getTime(); //时间差的毫秒数   
                    //计算出相差天数
                    var days = Math.floor(difference / (24 * 3600 * 1000))
                    var style = null
                    if (days > 0) {
                        var orderServicePeriod = item.orderServicePeriod - days
                        style = ''
                        countDown = item.orderServicePeriod ? `<span class="fr countDown">剩余试用天数<span class="countDown-num">${orderServicePeriod}</span>天</span>` : ''
                    } else {
                        countDown = ''
                    }
                } else if (item.orderServicePeriod && time1 > time2) { //活动还未开始
                    countDown = item.orderServicePeriod ? `<span class="fr countDown">剩余试用天数<span class="countDown-num">${item.orderServicePeriod}</span>天</span>` : ''
                }
            } else if (noIsTrial) {
                countDown = ''
                item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];
            } else {
                countDown = ''
                item._text = ["服务中", "热卖中", "已完成"][+item.productStatus];
            }
            if (orderState) {
                countDown = ''
                item._text = '试用已过期'
                item._icon = 'end'
            }

            if (item.title.length > 30) {
                item._title = item.title.substr(0, 30) + ".."
            } else {
                item._title = item.title
            }

            //按钮状态
            var isSelf = +ynTeacherId == +item.teacherid;
            var isFeed = item.is_od == 1
            var isEnd = item.productStatus == 2 // 结束
            var isTry = item.productStatus == "0" && item.orderState == '9' //服务中的内参试用且过期


            // 运行状态
            var total = 1
            var count = 2

            var btnKey = _.find([{
                assert: isEnd,
                action: "end"
            }, {
                assert: isTry,
                action: "unFeed"
            }, {
                assert: isSelf || isFeed,
                action: "feed"
            }, {
                assert: !isFeed,
                action: "unFeed"
            }, ], item => item.assert);

            item._key = btnKey;
            item._button = buttonTable[btnKey.action](item);
            var short_start = getShort(item.startTime),
                short_now = getShort(item.systemTime),
                day_now = new Day(short_now);
                var totalRunCount;
            if (item.referenceType == 1) {
                var short_end = getShort(item.endTime),
                    day_end = new Day(short_end);
                    totalRunCount = day_end.offset(short_start);
            }else{
                totalRunCount = '0'
            }
            var runCount = Math.abs(day_now.offset(short_start)) + 1;
            var runTextTable = {
                0: () => `已服务${runCount}天`,
                1: () => `${--runCount}天后开始服务`,
                2: () => `共运行${totalRunCount}天`
            }
            item.runText = runTextTable[item.productStatus]()
            return item;
        })
    }

    var showConfirm = function(itemData) {
        getOrderNumber(itemData.id, function(data) {
            data = data.data;
            payConfirm.render({
                name: "内参订阅",
                price: itemData.price,
                link: Path.pay(data.orderNum),
                success: () => {
                    layer.msg("支付成功!!");
                    setTimeout(() => window.location.reload(), 500)
                },
                fail: () => layer.msg("支付失败!!")
            })
        })
    }

    return {
        init: function(ops) {
            container = ops.container;

            //点击订阅
            container.on('click', '.feedBtn', _.debounce(function() {
                // if ($(this).data('type') == 'end') {
                //     return layer.msg('内参已结束');
                // }
                var id = $(this).data('index')
                var flag = $(this).data('status') == 1 ? "none" : ""
                // if ($(this).data('type') == "feed") {
                //     auth.get().render(result => { //实名认证
                //         if (result) {
                //             window.location.href = $(this).data('link')
                //         }
                //     }, flag)
                //     return;
                // } else {
                    window.location.href = $(this).data('link')
                // }

                var index = $(this).parents('.refer-list-item').index();
                var itemData = data[index];
                // if (+itemData.productStatus == 2) return layer.msg("已结束");

                //订阅提示(结束前5天提醒)
                if (itemData._key != "unFeed") return;
                var endMatch = itemData.endTime.match(/^[^\s]+/)[0]
                var endTime = new Day(endMatch);
                var offset = endTime.offset(itemData.systemTime.match(/^[^\s]+/)[0]);
                if (offset >= 5) return showConfirm(itemData);
                layer.confirm(`该内参距离结束仅剩${offset}天, 确定要订阅吗?`, () => {
                    showConfirm(itemData);
                })

            }, 200, {
                leading: true,
                trailing: false
            }))
        },

        render: function(ops) {
            data = handleData(ops.data);
            contentWidth = container.width() - 240;
            var html = _.map(data, item => create(item)).join('');
            container.html(html);
        }
    }
}()

/*///////////////////////////////////////////////////////////////////*/

//获取订单
function getOrderNumber(id, callback) {
    var send = {
        goodsId: id, //商品id
        goodsType: 3, //商品类型(0观点，1组合，2课程，3内参 4:问股 5 直播)
        buy_number: 1, //内参数量
        pay_source: 0, //来源 0web
    }
    $.post("/app/buyGoodsPayOrder.htm", send, function(data) {
        callback(data);
    }, 'json');
}
