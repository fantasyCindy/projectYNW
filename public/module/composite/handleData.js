/*
    处理组合数据 || 20161011164150
*/

var Day = require('../lib/day.js');

/*///////////////////////////////////////////////////////////////////*/

var getDay = time => time.match(/^[^\s]+/)[0];

var struct_status = [
    [0, "预售中"],
    [1, "进行中"],
    [2, "已结束"]
];

var struct_style = [
    [0, "保守型"],
    [1, "稳健性"],
    [2, "激进型"]
];

var buttonTable = {
    end: ops => `<a ${ops.link} class="ynbtn toFeed done" data-type="done">已结束</a>`,
    feed: ops => `<a ${ops.link} class="ynbtn toFeed">订阅</a>`,
    feeded: ops => `<a class="ynbtn" data-type="feeded">已订阅</a>`,
    look: ops => `<a ${ops.link} class="ynbtn toFeed">查看详情</a>`,
    peep: ops => `<a ${ops.link} class="ynbtn toFeed" data-type="peep">${ops.peepText}瞄一眼</a>`,
    bottom: ops => `<a ${ops.link} class="ynbtn toFeed" data-type="bottom">已结束</a>`
}

var countTable = [
    ops => `<strong>${ops.count - 1}</strong>天后运行`,
    ops => `已经运行<strong>${ops.count}</strong>天`,
    ops => `共运行<strong>${ops.runCount}</strong>天`
]

var handleData = function(data, source) {
    var isDetailPage = source == "detail";
    return _.map(data, function(item) {

        //组合状态 : 0=预售中，1=进行中， 2=完成，3=提前关闭，4=提前完成，5=到期失败，6=触及止损
        var status = +item.combination_status,
            status_reay = status === 0,
            status_run = status === 1,
            status_done = status === 2,
            status_close = status === 3,
            status_before = status === 4,
            status_fail = status === 5,
            status_bottom = status === 6;

        var isEnd = status > 2;
        var curProgress = _.min([status, 2]); //项目的三种状态
        var isFeed = +item.is_od == 1; //是否订阅
        var isSelf = ynTeacherId == item.teacherid; //是否为老师自己
        var isFree = +item.order_price === 0; //是否免费
        var ops = {
            link: isDetailPage ? "" : `href="/html/CompositeDetail.htm?${item.teacherid}ZHXQ${item.combinationid}" target="_blank"`,
            peepText: isDetailPage ? +item.peep_price + "牛币· " : ""
        }

        var today = getDay(item.systemTime);
        var startDate = getDay(item.starttime); //2016-09-06
        var endDate = getDay(item.endtime); //2016-09-06
        var startTime = new Day(startDate);
        var endTime = new Day(endDate);

        item._style = struct_style[item.combination_style][1];
        item._content = item.combination_des.substr(0, 30) + "...";
        item._incomeText = ["目标收益", "当前收益", "最终收益"][curProgress];

        //当前收益
        item._income = function() {
            var v  = status_run ? item.now_revenue : item.target_revenue; // 运行中当前收益取值now_revenue
            var value = yn.setDecimal(v);
            if (parseFloat(value) === 0) return `<span style="color:rgb(102,102,102)">0.00%</span>`;
            return yn.color(value, { display: `${value}%`, upColor: "red" });
        }()

        item._state = struct_status[curProgress][1]; //组合状态
        item._stateValue = struct_status[curProgress][0];
        item._endStyle = status > 2 ? "isEnd" : "";
        item._price = +item.order_price === 0 ? "免费" : "￥" + item.order_price;
        item._icon = ["ready", "running", "success"][curProgress]
        item._status = status;

        //比例: 返回的数值作为宽度(百分比)
        item._runRatio = (function() {
            if (status_reay) return 0;
            var _today = new Day(today)
            var sum = endTime.offset(startDate);
            return Math.ceil(_today.offset(startDate) / sum * 100)
        })()

        //计算运行时间
        item._time = function() {
            return countTable[curProgress]({
                count: Math.abs(startTime.offset(today)) + 1,
                runCount: function() {
                    if (status > 2) {
                        var t = new Day(getDay(item.completetime));
                        return t.offset(startDate) + 1
                    }
                }()
            });
        }()

        //计算订阅状态
        item._feed = function() {
            var query = [
                { key: 'end', assert: status >= 2 }, //已结束
                { key: "bottom", assert: status_bottom }, //触及止损
                { key: 'feeded', assert: isFeed && isDetailPage }, //已订阅: 详情页已订阅用户, 
                { key: 'look', assert: isSelf || isFeed && !isEnd }, //查看详情: 本人, 已订阅 
                { key: 'peep', assert: status_run && !isFeed && !isFree }, //瞄一眼: 运行中+未订阅+不免费
                { key: 'feed', assert: true } //订阅: 非本人+未订阅+预售中, 非本人+运行中+免费  (!isSelf && !isFeed && status_reay) || (!isSelf && (status_run || status_reay) && isFree && !isFeed) }
            ]
            var keys = _.filter(query, item => item.assert);
            return buttonTable[keys[0].key](ops);
        }()

        return item;
    })
}

/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    handleData: handleData
}
