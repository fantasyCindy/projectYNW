/**
 * 绘制饼图
 * @param  {[String or jQuery]} id [图形的容器]
 * @param  {[type]} y  [y所占的比例]
 */
yn.drawPie = function(id, y, ops) {
    ops = _.extend({
        base: 100, // 基数
        inner: 0 // 饼图凹进尺寸(图形的默认尺寸为container的尺寸)
    }, ops)

    y = Number(y);
    var datas = [{ color: "#e8e8e8", y: ops.base - y }, { color: "#fe7e00", y: y }];

    var element = function() {
        if (typeof id == "string") {
            return $('#' + id);
        } else {
            return id;
        }
    }()

    element.highcharts({
        chart: {
            type: 'pie',
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0]
        },
        credits: {
            enabled: false
        },
        title: {
            text: ""
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            pie: {
                innerSize: ops.inner,
                allowPointSelect: false,
                dataLabels: {
                    enabled: false
                }
            },
            series: {
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        series: [{
            data: datas
        }]
    });
}