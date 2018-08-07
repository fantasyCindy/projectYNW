// 处理组合数据
// 组合状态: 0 预售中 1 进行中 2 完成 3 提前关闭 4 提起完成 5 到期失败 6 触及止损
// 
function handleCompositeData(data) {

    return _.map(data, function(item) {
        item._style = ynconfig.composite_style[item.combination_style][1];
        item._content = item.combination_des.substr(0, 30) + "...";
        item._income = parseFloat(item.target_revenue);
        item._state = ynconfig.composite_state[+item.combination_status][1];
        item._price = +item.order_price === 0 ? "免费" : "￥" + item.order_price;
        item._icon = ["ready", "running", "success"][+item.combination_status]
            
        //计算运行时间
        item._time = function() {

            var getDay = function(time) {
                return time.match(/^[^\s]+/)[0];
            }

            var today = getDay(item.systemTime);
            var start_date = getDay(item.starttime);
            var end_date = getDay(item.endtime);
            var starttime = new yn.day(start_date);
            var endtime = new yn.day(end_date);
            var count = Math.abs(starttime.offset(today)) + 1;
            var runCount = endtime.offset(start_date);

            var a = "<strong>" + count + "</strong>天后运行";
            var b = "已经运行<strong>" + count + "</strong>天";
            var c = "共运行<strong>" + runCount + "</strong>天"
            return [a, b, c][+item.combination_status];
        }()

        //计算订阅状态
        item._feed = function() {
            var isFeed = item.is_od == "1"; //是否订阅
            var isSelf = ynTeacherId == item.teacherid; //是否为老师自己
            var isFree = +item.order_price === 0; //是否免费

            var state = +item.combination_status //[0,1,2]
            var state_ready = state === 0; //预售中
            var state_run = state === 1; //运行中
            var state_done = state === 2; //已结束


            var link = "/html/CompositeDetail.htm?" + item.teacherid + "ZHXQ" + item.combinationid;

            //显示"已结束"
            if (state_done) {
                return '<a href="' + link + '" target="_blank"  class="ynbtn toFeed done">已结束</a>'
            }

            //显示"去订阅" : 非本人+未订阅+预售中, 非本人+运行中+免费
            if ((!isSelf && !isFeed && state_ready) || (!isSelf && state_run && isFree)) {
                return '<a href="' + link + '" target="_blank" class="ynbtn toFeed">订阅</a>';
            }

            //显示"查看详情" : 本人, 已订阅 
            if (isSelf || isFeed) {
                return '<a href="' + link + '" target="_blank"  class="ynbtn toFeed">查看详情</a>'
            }

            //显示"瞄一眼" : 运行中+未订阅
            if (state_run && !isFeed) {
                return '<a href="' + link + '" target="_blank"  class="ynbtn toFeed">瞄一眼</a>'
            }


        }()

        return item;
    })
}
