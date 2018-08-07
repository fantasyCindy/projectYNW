/*  
    热门内参
    
    jsp结构
    <!-- 热卖内参 -->
    <div class="hot-refer">
        <div class="title-1">
            <span class="title-icon"></span>
            <span  class="text">热卖内参</span>
            <div class="action f1 fr">
                <a href="/reference.htm">更多</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
        <div class="refer-content overflow"></div>
    </div>

    初始化
    hotRefer.init()

    获取数据
    hotRefer.render()
*/

require('./hot-refer.css')
var ajax = require('module/ajax.js')
var local = require('module/lib/localData.js');
var Day = require('m/lib/day.js')

var hotRefer = function() {
    var query = {
            page: 1,
            size: 8,
            type: 0
        },
        container, referContent, _data;
    var showCount = 4,
        pageCount = 0,
        count = 1

    var handle = arr => {
        var getShort = str => str.match(/^[\d\-]+/)[0]
            // 按钮状态
        var buttonTable = {
            1: item => `<a href="${item._link}" target="_blank" title="${item.title}" class="refer-see f2">去订阅</a>`,
            0: item => `<a href="${item._link}" target="_blank" title="${item.title}" class="refer-see f2">去订阅</a>`,
            2: item => `<a class="refer-see f2">已完成</a>`
        }
        return _.map(arr, item => {
            item._startTime = item.startTime.substring(0, 11)
            item._endTime = item.referenceType == 1 ?  item.endTime.substring(0, 11) : '';
                // item._day = duration(item.startTime,item.systemTime)
            item._link = `${neican_path}reference/${item.id}.htm`
            item._productStatus = ['服务中', '热卖中', '已完成'][item.productStatus]

            if (item.title.length > 30) {
                item._title = item.title.substr(0, 30) + ".."
            } else {
                item._title = item.title
            }
            item._style = item.referenceType == 0 ? 'hide' : '';
            item._style1 = item.referenceType == 1 ? 'hide' : '';
            //按钮状态
            item._button = buttonTable[item.productStatus](item);
            item._price = item.referenceType == 1 ? `${item.price} <i class="f2">（元）</i>` : `${item.price}<i class="f2">&nbsp;元/月</i>`;
            // var short_start = getShort(item.startTime),
            //     short_end = getShort(item.endTime),
            //     short_now = getShort(item.systemTime),
            //     day_end = new Day(short_end),
            //     day_now = new Day(short_now),
            //     runCount = Math.abs(day_now.offset(short_start)) + 1,
            //     totalRunCount = day_end.offset(short_start)
                
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
            var runCount = Math.abs(day_now.offset(short_start)) + 1   
            item._runText = [`已服务${runCount}天`, `${--runCount}天后开始服务`, `共运行${totalRunCount}天`][item.productStatus]



            return item
        })
    }

    var createNormal = arr => {
        arr = handle(arr)
        return _.map(arr, item => {
            return `<div class="refer-item frame-shadow fl">
                        <span class="refer-title f2">${item._productStatus}</span>
                        <div class="refer-center overflow">
                            <a href="${item._link}" target="_blank" class="refer-left fl block cursor">
                                <img class="iamge" src="${item.productImg}" alt="" />
                                <span class="f2 b color666">${item.puiblisher}</span>
                            </a>
                            <div class="refer-right fl">
                                <a href="${item._link}" target="_blank" title="${item._title}" class="f3 b color222 hover">${item.title}</a>
                                <div class="refer-info">
                                    <p class="refer-price refer-info-list f2"><span class="f3 block color">${item._price}</span>价格</p>
                                    <p class="refer-day refer-info-list f2"><span class="f3 block color">${item.updatefrequency}<i class="f2">（条）</i></span><span>${item.updateDay}</span>交易日/更新频率</p>
                                </div>
                            </div>
                        </div>

                        <div class="refer-bottom f2">
                            <div class="refer-more">
                                ${item._runText}
                                ${item._button}
                            </div>
                            <div class="sub_detail clear ${item._style}">
                            服务时间：${item._startTime}－${item._endTime}
                            </div>
                            <div class="sub_detail clear ${item._style1}">
                            服务时间：无限期
                            </div>
                        </div>
                    </div>`
        }).join("")
    }

    return {
        init: function() {
            var _this = this
            container = $(".hot-refer");
            referContent = container.find(".refer-content");
            container.on('click', '.huan', function() {
                if (_data.length <= showCount) return
                count = count % pageCount + 1
                    // _data = _data.reverse()
                    // var html = createNormal(_.take(_data,2))
                    // referContent.html(html)
                hotRefer.getRefer(count)
            })
            var loading = new yntool.loading({
                container: referContent,
                type: 3
            }).render()


            // 点击切换类型
            container.find('.title-1').on('click', '.refer_action', function() {
                $(this).addClass('select').siblings().removeClass('select')
                query.type = $(this).data('type');
                count = 1
                _this.render({ type: query.type })
            })


        },
        render: function(ops) {
            query = _.extend(query, ops)
            var self = this
            getData({
                query,
                callback: function(back) {
                    if (back.status == 1) {
                        _data = back.data.list
                        pageCount = Math.max(Math.ceil(_data.length / showCount), 2) //显示的页数
                            //分配页码
                        _data = _data.map(function(item, index) {
                            item.pageNum = Math.floor(index / showCount) + 1
                            return item
                        })
                        self.getRefer(count)
                    }
                }
            })
        },
        getRefer: function(num) {
            var data = _.filter(_data, function(item) {
                return item.pageNum == num
            })
            var html = createNormal(data)
            referContent.html(html)
        }
    }
}();

// 获取数据
var getData = (ops) => {
    // var key = 'referenceHotList' + local.joinKey(ops.query);
    // var cache = local.get(key, { timeout: 600 })
    // if (cache && cache.valid) return ops.callback(cache.data);

    ajax.getJSON("/center/reference/hotList.htm", {
        pageSize: ops.query.size,
        currentPage: ops.query.page,
        type: ops.query.type
    }, data => {
        ops.callback(data);
        // local.set(key, data)
    })
};

module.exports = hotRefer
