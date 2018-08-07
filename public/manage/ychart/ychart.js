var theme = require('m/highcharts-theme.js')
var calendar = require('m/ui/calendar.js')
var lo = require('m/lib/lo.js')
var layer = require('m/layer2.js').get()
var Category = require('m/category.js')


/*///////////////////////////////////////////////////////////////////*/

var href = window.location.href
var match_theme = href.match(/theme=([a-z]+)/)
var themeName = match_theme ? match_theme[1] : 'grid'
Highcharts.theme = theme[themeName];
Highcharts.setOptions(Highcharts.theme)

/*///////////////////////////////////////////////////////////////////*/

var time_b = lo.offsetNow(7) // 默认时间的起点
var time_e = lo.offsetNow(0) // 默认时间的结束

// 获取订单类型名称
var getOrderName = (key, index) => {
    var cate = Category[key]
    return cate[index];
}

var getStamp = time => new Date(time).getTime()
var f1 = timestamp => Highcharts.dateFormat("%Y年%m月%d日", timestamp)
var f2 = timestamp => Highcharts.dateFormat("%Y-%m-%d", timestamp)
var f3 = timestamp => Highcharts.dateFormat("%m-%d", timestamp)
var f4 = timestamp => Highcharts.dateFormat("%m月%d日", timestamp)

var formatNum = obj => {
    for (var key in obj) {
        obj[key] = obj[key] || 0
    }
    return obj
}

var groupBy = (arr, key) => {
    var t = {}
    var result = []

    arr.forEach(item => {
        if (!t[item[key]]) {
            t[item[key]] = []
        }
        if (String(item[key])) {
            t[item[key]].push(item)
        }
    })
    for (var k in t) {
        result.push(t[k])
    }
    return result;
}



/* ops = { container, onchange } */
var range = function(ops) {
    var tag = `<div class="chart-range">
                <div class="item short">
                    <span class="subitem active subitem-7" data-value="7">最近7天</span>
                    <span class="subitem subitem-30" data-value="30">最近30天</span>
                </div>
                <div class="item range">
                    <input type="text" class="begin" placeholder="请选择开始时间">
                    <span class="break">-</span>
                    <input type="text" class="end" placeholder="请选择结束时间">
                    <span class="query-btn" data-value="30">查询</span>
                </div>
            </div>`

    var container = ops.container
    container.append(tag)

    var $b = container.find('input.begin')
    var $e = container.find('input.end')

    calendar.add($b)
    calendar.add($e)

    // 最近7天
    container.on('click', '.chart-range .subitem', function() {
        $b.val("").removeClass('active')
        $e.val("").removeClass('active')
        $(this).addClass('active').siblings().removeClass('active')
        var now = Date.now()
        var offset = +$(this).data('value') * 24 * 3600 * 1000

        if (typeof ops.onchange == "function") {
            ops.onchange({
                begin: lo.toDate(now - offset),
                end: lo.toDate(now)
            })
        }
    })

    container.on('click', '.query-btn', function() {
        var vb = _.trim($b.val())
        var ve = _.trim($e.val())
        var valid_b = !!Date.parse(vb)
        var valid_e = !!Date.parse(ve)

        if (!valid_b) {
            layer.msg("请输入有效的开始时间")
            $b.val('')
            return
        }
        if (!valid_e) {
            layer.msg("请输入有效时间的结束时间")
            $e.val('')
            return
        }
        if (Date.parse(ve) < Date.parse(vb)) {
            layer.msg("结束时间不能小于开始时间")
            $e.val('')
            return
        }

        if (Date.parse(ve) > Date.now()) {
            layer.msg("结束时间不能大于今天")
            $e.val('')
            return
        }

        container.find('.subitem.active').removeClass('active')
        $b.addClass('active')
        $e.addClass('active')

        ops.onchange({
            begin: vb.replace(/[^\d]+/g, '-'),
            end: ve.replace(/[^\d]+/g, '-')
        })
    })


}


/*///////////////////////////////////////////////////////////////////*/



var theme = (function() {
    var container = $('.theme-option')
    container.on('click', '.theme-item', function() {
        var value = $(this).data('type')
        window.location.href = "/ychart.htm?theme=" + value
    })
})()


var splineOption = function() {
    return {
        chart: {
            type: 'areaspline',
            height: 500
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        legend: {
            title: {
                style: {
                    fontSize: 16
                }
            }
        },
        subtitle: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: ''
            },
            labels: {
                formatter: function() {
                    return f2(this.value)
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0
        },
        tooltip: {
            headerFormat: '',
            pointFormatter: function() {
                return `${f4(this.x)}<br> <b>${this.series.name}:</b> ${this.y}`
            }
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                },
                dataLabels: {
                    enabled: true
                }
            },
            areaspline: {
                fillOpacity: 0.1
            }
        }
    }
}


var pieOption = function(ops) {
    return _.extend({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        legend: {
            title: {
                style: {
                    fontSize: 14
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        fontSize: 15
                    }
                }
            }
        }
    }, ops)
}



/*///////////////////////////////////////////////////////////////////*/


/* 注册分析 */

var register = (function() {

    var container = $('.chart-register')
    var backData
    var head = container.find('.detail-sum tbody')
    var ops = splineOption()
    var tabs = container.find('.chart-tab')

    range({
        container: tabs,
        onchange: time => {
            getData(back => draw(), {
                startTime: time.begin,
                endTime: time.end
            })

            getPieData(back => {
                drawPie()
            }, {
                startTime: time.begin,
                endTime: time.end
            })
        }
    })



    /* 总的统计数据 */
    var getTotalData = function() {
        var head = $('.data-sum.top tbody')
        $.getJSON("/report/query_total.do", back => {
            var total = formatNum(back.total)
            head.html(`<tr>
                        <td class="label">累计</td>
                        <td>${total.cumulat_outuser}</td>
                        <td>${total.cumulat_order}</td>
                        <td>${total.cumulat_article}</td>
                        <td>${total.cumulat_answer}</td>
                    </tr>
                    <tr>
                        <td class="label">昨日</td>
                        <td>${total.outside_user}</td>
                        <td>${total.order_cnt}</td>
                        <td>${total.article_cnt}</td>
                        <td>${total.answer_cnt}</td>
                    </tr>`)
        })
    }

    var getData = function(callback, ops) {
        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)
        $.getJSON("/report/report_user_daily.do", ops, back => {
            var total = formatNum(back.total)
            head.html(`<tr>
                        <td>${total.totalOutside_users}</td>
                        <td>${total.totalInside_users}</td>
                        <td>${total.yesterdayOutside_users}</td>
                    </tr>`)

            backData = back.data
            callback()
        })
    }

    var draw = function() {

        var handleData = function() {
            return [{
                name: "注册用户",
                data: backData.map(item => {
                    return {
                        x: getStamp(item.create_time),
                        y: item.outside_users
                    }
                })
            }]
        }

        ops.series = handleData()
        Highcharts.chart('chart-register-container', ops)
    }

    return {
        render() {
            container.show()
            if (backData) return;
            getData(back => draw())
            getTotalData()
        }
    }

})()


/*///////////////////////////////////////////////////////////////////*/

/* 订单分析 */

var order = (function() {
    var container = $('.chart-order')
    var ops = splineOption()
    var tabs = container.find('.category-type')
    var head = container.find('.detail-sum tbody')
    var backData, cateData
    var cur = 'order_cnt'
    var pieOps = pieOption()



    range({
        container: tabs,
        onchange: time => {
            getData(back => {
                draw()
            }, {
                startTime: time.begin,
                endTime: time.end
            })

            getPieData(back => {
                drawPie()
            }, {
                startTime: time.begin,
                endTime: time.end
            })
        }
    })

    tabs.on('click', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
        cur = $(this).data('key')
        draw()
        drawPie()
    })


    var getData = (callback, ops) => {

        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)

        $.getJSON("/report/report_payorder_daily.do", ops, back => {
            console.log("订单数据", back)
            backData = back.data

            // 统计信息
            var total = formatNum(back.total)
            head.html(`<tr>
                        <td>累计</td>
                        <td>${total.totalOrder_cnt}</td>
                        <td>${total.totalActual_price}</td>
                        <td>${total.totalCumulat_users}</td>
                        <td>${Math.round(total.avg_price * 100)/100}</td>
                    </tr>
                    <tr>
                        <td>昨日</td>
                        <td>${total.yesterdayOrder_cnt}</td>
                        <td>${total.yesterdayActual_price}</td>
                        <td>${total.yesterdayOrder_users}</td>
                        <td>${Math.round(total.yesterday_avg * 100)/100}</td>
                    </tr>`)

            callback()
        })
    }


    var draw = function() {
        var handleData = function() {
            return [{
                name: tabs.find('.tab-item.active').text(),
                data: backData.map(item => {
                    item.avg = Math.round(item.actual_price / item.cumulat_users * 100) / 100
                    return {
                        x: getStamp(item.finish_date),
                        y: item[cur]
                    }
                })
            }]
        }
        ops.series = handleData()
        Highcharts.chart('chart-order-container', ops)
    }


    // 获取分类报表数据
    var getPieData = function(callback, ops) {
        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)

        $.getJSON("/report/report_payorder_type_daily.do", ops, back => {
            cateData = back.data.map(item => {
                item.avg = Math.round(item.actual_price / item.order_cnt * 100) / 100
                return item
            })
            console.log("订单分类", cateData)
            callback()
        })
    }


    var drawPie = function() {

        var handlePieData = function(key) {
            return [{
                name: tabs.find('.active').text(),
                colorByPoint: true,
                data: groupBy(cateData, key).map((arr, index) => {
                    var name = ''
                    var sum = 0;
                    arr.forEach(item => {
                        name = item[key]
                        sum += item[cur]
                    })
                    return {
                        name: getOrderName(key, arr[0][key]),
                        y: sum
                    }
                })
            }]
        }

        Highcharts.chart('chart-order-pie-1', pieOption({
            title: { text: "商品类型" },
            series: handlePieData("goodstype")
        }))
        pieOps.series = handlePieData("ordertype")
        Highcharts.chart('chart-order-pie-2', pieOption({
            title: { text: "订单类型" },
            series: handlePieData("ordertype")
        }))
    }

    return {
        render() {
            container.show()
            if (backData) return;
            getData(back => draw())
            getPieData(() => drawPie())
        }
    }

})()


/*///////////////////////////////////////////////////////////////////*/


/*  直播统计 */

var live = (function() {
    var container = $('.chart-live')
    var tabs = container.find('.category-type')
    var cur = 'broadcasting_pv' // 数据类型
    var backData = null
    var ops = splineOption()
    var head = container.find('.detail-sum tbody')

    // 添加时间选择范围
    var trange = range({
        container: tabs,
        onchange: time => {
            getData({
                startTime: time.begin,
                endTime: time.end
            }, back => draw())
        }
    })

    var getData = function(ops, callback) {
        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)

        $.getJSON("/report/report_broadcasting_daily.do", ops, back => {
            console.log("直播分析", back)
            backData = back.data
            var total = formatNum(back.total)

            // 统计信息
            head.html(`<tr>
                        <td>累计</td>
                        <td>${total.totalBroadcasting_cnt}</td>
                        <td>${total.totalBroadcasting_pv}</td>
                        <td>${total.totalMember_cnt}</td>
                        <td>${total.totalUser_cnt}</td>
                    </tr>
                    <tr>
                        <td>昨日</td>
                        <td>${total.yesterdayBroadcasting_cnt}</td>
                        <td>${total.yesterdayroadcasting_pv}</td>
                        <td>${total.yesterdayMember_cnt}</td>
                        <td>${total.yesterdayUser_cnt}</td>
                    </tr>`)

            callback()
        })
    }


    // 切换
    tabs.on('click', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
        cur = $(this).data('key')
        draw()
    })



    var draw = function() {

        // 数据处理
        var handleData = function() {
            var filter = backData.map(item => {
                return {
                    x: getStamp(item.broadcasting_date),
                    y: +item[cur],
                }
            })

            // 合并求和操作
            return [{
                name: tabs.find('.tab-item.active').text(),
                data: groupBy(filter, 'x').map(arr => {
                    var x = arr[0].x
                    var sum = 0;
                    arr.forEach(item => sum += item.y)
                    return [x, sum]
                })
            }]
        }


        ops.series = handleData()
        Highcharts.chart('chart-live-container', ops)
    }

    return {
        render() {
            container.show()
            if (backData) return;
            getData({}, () => draw())
        }
    }

})()


/*///////////////////////////////////////////////////////////////////*/

/* 观点分析 */

var article = (function() {
    var container = $('.chart-article')
    var backData
    var cur = 'article_cnt'
    var select = container.find('.selectBar select')
    var tab = container.find('.tab2')
    var ops = splineOption()
    var pieOps = pieOption()
    var head = container.find('.detail-sum tbody')

    // 时间范围
    range({
        container: container.find('.chart-tab'),
        onchange: time => {
            getData(() => {
                draw()
                drawPie()
            }, {
                startTime: time.begin,
                endTime: time.end
            })
        }
    })

    var getData = (callback, ops) => {
        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)

        $.getJSON("/report/report_broadcasting_article_daily.do", ops, back => {

            var total = formatNum(back.total)

            // 统计信息
            head.html(`<tr>
                        <td>累计</td>
                        <td>${total.totalArticle_cnt}</td>
                        <td>${Math.round(total.totalPayarticle_cnt / total.totalArticle_cnt * 10000) / 100 +  "%"}</td>
                        <td>${total.totalPayarticle_price || 0}</td>
                    </tr>
                    <tr>
                        <td>昨日</td>
                        <td>${total.yesterdayArticle_cnt}</td>
                        <td>${Math.round(total.yesterdayPayarticle_cnt / total.yesterdayArticle_cnt * 1000) / 100 + "%"}</td>
                        <td>${total.yesterdayPayarticle_price || 0}</td>
                    </tr>`)

            backData = back.data;
            callback()
        })
    }

    // 切换
    container.on('change', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 过滤数据
    select.on('change', function() {
        var val = +$(this).val()
        if (val == -1) return draw(backData) // 全部
        var _data = backData.filter(item => +item.article_type == val)
        draw(_data)
    })

    // 类型切换
    tab.on('click', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
        cur = $(this).data('key')
        draw()
        drawPie()
    })


    // 绘图
    var draw = function(data) {
        var lineData = data || backData

        var handleData = function() {
            return [{
                name: tab.find('.active').text(),
                data: groupBy(lineData, 'article_date').map(arr => {
                    var sum = 0;
                    arr.forEach(item => {
                        sum += item[cur]
                    })

                    return {
                        x: getStamp(arr[0].article_date),
                        y: sum
                    }
                })
            }]
        }

        ops.series = handleData()
        Highcharts.chart('chart-article-container', ops)
    }


    var drawPie = function() {

        var pieSeries = function() {
            return [{
                name: tab.find('.active').text(),
                colorByPoint: true,
                data: groupBy(backData, 'article_type').map((arr, index) => {
                    var sum = 0;
                    arr.forEach(item => {
                        sum += item[cur]
                    })

                    return {
                        name: getOrderName('articleType', +arr[0].article_type),
                        y: sum
                    }

                })
            }]
        }

        pieOps.series = pieSeries()
        Highcharts.chart('chart-article-pie', pieOps)
    }

    return {
        render() {
            container.show()
            if (!backData) {
                getData(() => {
                    draw()
                    drawPie()
                })
            }
        }
    }

})()


/*///////////////////////////////////////////////////////////////////*/


/*  问股分析 */

var ask = (function() {
    var container = $('.chart-ask')
    var backData
    var cur = 'answer_cnt'
    var select = container.find('.selectBar select')
    var tab = container.find('.tab-items')
    var ops = splineOption()
    var pieOps = pieOption()
    var head = container.find('.detail-sum tbody')

    // 时间范围
    range({
        container: container.find('.chart-tab'),
        onchange: time => {
            getData(() => {
                draw()
                drawPie()
            }, {
                startTime: time.begin,
                endTime: time.end
            })
        }
    })

    var getData = (callback, ops) => {
        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)

        $.getJSON("/report/report_answer_daily.do", ops, back => {
            console.log("问股数据", back)

            var total = formatNum(back.total)

            // 统计信息
            head.html(`<tr>
                        <td>累计</td>
                        <td>${total.totalAnswer_cnt}</td>
                        <td>${total.totalAdopt_cnt}</td>
                        <td>${Math.round(total.totalAdopt_cnt / total.totalAnswer_cnt * 10000) / 100 + "%"}</td>
                    </tr>
                    <tr>
                        <td>昨日</td>
                        <td>${total.yesterdayAnswer_cnt}</td>
                        <td>${total.yesterdayAdopt_cnt}</td>
                        <td>${Math.round(total.yesterdayAdopt_cnt / total.yesterdayAnswer_cnt * 10000) / 100 + "%"}</td>
                    </tr>`)

            backData = back.data.map(item => {
                item.adopt_ratio = Math.round(item.adopt_cnt / item.answer_cnt * 100) / 100 + '%';
                return item
            });
            callback()
        })
    }

    // 切换
    container.on('change', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 过滤数据
    select.on('change', function() {
        var val = +$(this).val()
        if (val == -1) return draw(backData) // 全部
        var _data = backData.filter(item => +item.note_type == val)
        draw(_data)
        drawPie(_data)
    })

    // 类型切换
    tab.on('click', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
        cur = $(this).data('key')
        draw()
        drawPie()
    })


    // 绘图
    var draw = function(data) {
        var lineData = data || backData
        var handleData = function() {
            return [{
                name: tab.find('.active').text(),
                data: groupBy(lineData, 'answer_date').map(arr => {
                    var sum = 0;
                    arr.forEach(item => {
                        sum += item[cur]
                    })

                    return {
                        x: getStamp(arr[0].answer_date),
                        y: sum
                    }
                })
            }]
        }

        ops.series = handleData()
        Highcharts.chart('chart-ask-container', ops)
    }


    var drawPie = function(data) {

        var pieData = data || backData

        var pieSeries = function() {

            var data = groupBy(pieData, 'note_type').map((arr, index) => {
                var sum = 0;
                arr.forEach(item => {
                    sum += item[cur]
                })

                return {
                    name: getOrderName("articleType", arr[0].note_type),
                    y: sum
                }

            })


            return [{
                name: tab.find('.active').text(),
                colorByPoint: true,
                data: data
            }]
        }

        pieOps.series = pieSeries()
        Highcharts.chart('chart-ask-pie', pieOps)
    }

    return {
        render() {
            container.show()
            if (!backData) {
                getData(() => {
                    draw()
                    drawPie()
                })
            }
        }
    }

})()

/*///////////////////////////////////////////////////////////////////*/

/*  投顾分析 */

var teacher = (function() {
    var container = $('.chart-teacher')
    var tbody = container.find('.teacher-data tbody')
    var backData

    // 时间范围
    range({
        container: container.find('.chart-tab'),
        onchange: time => {
            getData({ startTime: time.begin, endTime: time.end }, () => {
                renderList()
            })
        }
    })

    var getData = (ops, callback) => {
        ops = _.extend({
            startTime: time_b,
            endTime: time_e
        }, ops)

        $.getJSON("/report/report_teacher_daily.do", ops, back => {
            console.log("投顾数据库", back)

            // 合并数据
            backData = groupBy(back.data, 'teacherid').map(arr => {
                var answer_cnt = 0
                var article_cnt = 0
                var broadcasting_pv = 0
                var popularity_number = 0
                var good_price = 0

                arr.forEach(item => {
                    answer_cnt += item.answer_cnt
                    article_cnt += item.article_cnt
                    broadcasting_pv += item.broadcasting_pv
                    popularity_number += item.popularity_number
                    good_price = +item.good_price
                })

                return {
                    teacherid: arr[0].teacherid,
                    teacherTile: arr[0].teacherTile,
                    answer_cnt,
                    article_cnt,
                    broadcasting_pv,
                    popularity_number,
                    good_price
                }
            })

            callback()
        })
    }

    // 显示列表
    var renderList = function() {

        var max = { v1: 0, v2: 0, v3: 0, v4: 0, v5: 0 }

        var tag = backData.map(item => {

            console.log(item)

            var v1 = item.answer_cnt
            var v2 = item.article_cnt
            var v3 = item.broadcasting_pv
            var v4 = item.popularity_number
            var v5 = item.good_price

            max.v1 = Math.max(v1, max.v1)
            max.v2 = Math.max(v2, max.v2)
            max.v3 = Math.max(v3, max.v3)
            max.v4 = Math.max(v4, max.v4)
            max.v5 = Math.max(v5, max.v5)

            return `<tr>
                        <td>${item.teacherTile}</td>
                        <td class="vv v1" data-key="v1"><span class="num">${item.answer_cnt}</span><i class="line"></i></td>
                        <td class="vv v2" data-key="v2"><span class="num">${item.article_cnt}</span><i class="line"></i></td>
                        <td class="vv v3" data-key="v3"><span class="num">${item.broadcasting_pv}</span><i class="line"></i></td>
                        <td class="vv v4" data-key="v4"><span class="num">${item.popularity_number}</span><i class="line"></i></td>
                        <td class="vv v5" data-key="v5"><span class="num">${item.good_price}</span><i class="line"></i></td>
                    </tr>`

        }).join("")

        tbody.html(tag)
        tbody.find('.vv').each(function() {
            var key = $(this).data('key')
            var maxValue = max[key]
            var value = +$(this).text()
            var width = Math.floor(value / maxValue * 140)
            $(this).find('.line').animate({ width: width + "px" }, 1000)
        })
    }

    return {
        render() {
            container.show()
            if (backData) return;
            getData({}, () => renderList())
        }
    }


})()


/*///////////////////////////////////////////////////////////////////*/


var menu = (function() {
    var container = $('.charts-menu')

    var children = {
        register,
        order,
        live,
        article,
        ask,
        teacher
    }

    container.on('click', '.item', function() {
        $(this).addClass('active').siblings().removeClass('active')
        $('.charts-detail-child').hide()
        var key = $(this).data('key')
        children[key].render()
    })

    return {
        current: register,
        active(type, ops) {
            container.find(`.${type}`).addClass('active').siblings().removeClass('active')
            children[type].render(ops)
        }
    }

})()


/*///////////////////////////////////////////////////////////////////*/

menu.active('register')
