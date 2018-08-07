/*  
    jsp结构
    <!-- 牛人排行 -->
    <div class="ynw-ranking">
        <div class="title-1">
            <span class="title-icon"></span>
            <a href="${live_path}/live/" class="text">牛人排行</a>
            <span class="color153 f1 ml10">最牛的人都在这里</span>
        </div>
        <div class="ranking-content frame-shadow">
            <p class="ranking-title f5">
                <span class="ranking-title-list select">人气直播</span>
                <span class="ranking-title-list">咨询牛人</span>
                <span class="ranking-title-list">新晋牛人</span>
            </p>
            <div class="ranking-main"></div>
        </div>
    </div>

    初始化
    ynwRanking.init()

    获取数据
    ynwRanking.render()
*/

require('./ynw-ranking.css')
var ajax = require('module/ajax.js')
var local = require('module/lib/localData.js');
var error = require('e/error-type');
var ynwRanking = function() {
    var query = {
            page: 1,
            size: 6,
            unit: "",
            orderStype: 2 //[0=人气直播, 1=咨询牛人, 2=新晋牛人]
        },
        container, rankingMain, rankingTitle;

    var createNormal = arr => {
        var index = 1
        return _.map(arr, item => {
            item._index = index++
                item._link = `${live_path}live/${item.teacherid}/`
            item._text = ['人气数', '回答问题数', '人气数'][query.orderStype]
            item._num = { 0: item.popularity_number, 1: item.answerNum, 2: item.popularity_number }[query.orderStype]
            return `<div class="ranking-main-list ranking-main-list${item._index}">
                        <a href="${item._link}" target="_blank" class="block">
                            <i class="ranking-icon"></i>
                            <img class="image" src="${item.photo}" alt="" />
                            <span class="ranking-text f3 ranking-people">${item.title}</span>
                            <span class="ranking-text ranking-num f3 fr b"><span class="ranking-people-num">${item._text}</span>${item._num}</span>
                        </a>
                    </div>`
        }).join("")
    }

    return {
        init: function() {
            var self = this
            container = $(".ynw-ranking");
            rankingMain = container.find(".ranking-main");
            rankingTitle = container.find(".ranking-title");
            var loading = new yntool.loading({
                container: rankingMain,
                type: 3
            }).render()
            rankingTitle.on('click', '.ranking-title-list', function() {
                $(this).addClass('select').siblings().removeClass('select')
                var type = $(this).data('type')
                query.orderStype = type
                self.render()
            })
        },
        render: function() {
            getData({
                query,
                callback: function(back) {
                    var html = createNormal(back)
                    rankingMain.html(html)
                }
            })
        }
    }
}();

// 获取数据
var getData = (ops) => {
    // var key = 'teacherIndex' + local.joinKey(ops.query);
    // var cache = local.get(key, { timeout: 3600 })
    // if (cache && cache.valid) {
    //     return ops.callback(cache.data)
    // }
    ajax.getJSON("/html/teacherOrderList.htm", {
        rows: ops.query.size,
        page: ops.query.page,
        unit: ops.query.unit,
        orderStype: ops.query.orderStype,
    }, data => {
        if (data.status == 1) {
            ops.callback(data);
        } else() => {
                return layer.msg(error[data.status])
            }
            // local.set(key, data)
    })
};

module.exports = ynwRanking
