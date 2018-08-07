var param = {
    width: 460,
    height: 160,
    categories: ["09-01", "09-02", "09-03", "09-04", "09-05", "09-06"],
    data: [-1, 5, 8, 0, 5, 2]
}

/*///////////////////////////////////////////////////////////////////*/

var ops = {
    chart: {
        borderWidth: 0,
        plotBorderWidth: 0,
        marginRight: 0,
        width: param.width,
        height: param.height

    },
    tooltip: {
        enabled: true,
        headerFormat: '<span style="font-size: 10px;padding-right:10px;">{point.key}</span>',
        pointFormat: '<b>{point.y}</b><br/>',
        valueSuffix: '%',
        useHTML: true
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    title: {
        enabled: false,
        text: ''
    },
    yAxis: {
        lineWidth: 0,
        opposite: false,
        title: '',
        labels: {
            formatter: function() {
                return this.value + '%';
            }
        }
    },
    xAxis: {
        labels: {
            enabled: true,
            font: '12px Helvetica',
            color: '#525151'
        },
        tickmarkPlacement: "on",
        categories: param.categories
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stparam: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },
    series: [{
        type: 'area',
        data: param.data
    }]
}


module.exports = {
    draw: function(container, _param, _ops) {
        _.extend(param, _param);
        _.extend(ops, _ops);
        container.highcharts(ops);
    }
}
