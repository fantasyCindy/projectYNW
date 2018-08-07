var Calendar = require('../module/ui/calendar.js');
var Path = require('../module/lib/path.js');
require('~/center/center.js')

/*///////////////////////////////////////////////////////////////////*/

$(function() {
    yn.centerMenu.init({
        render: 'my',
        light: '我的钱包'
    });

    walletMenu.init();
    wealth.init(); //我的资产
    wealth.render();
    filter.init(); //查询
    record.init(); //记录
    record.render();
    // recharge.init(); //充值记录
})

/*///////////////////////////////////////////////////////////////////*/



//菜单
var walletMenu = (function() {
    var container, current, links;
    return {
        init: function() {
            links = {
                record: record,
                recharge: recharge
            }
            container = $(".wallet-menu");
            container.on('click', 'td', function() {
                yn.switch($(this));
                var type = $(this).data('type');
                for (var key in links) {
                    var target = links[key];
                    key == type ? target.render() : target.hide()
                }
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/



//我的资产
var wealth = (function() {
    var container, items, balance, totalPrice, consume,input, send = { currenttime: "" };
    var handleData = data => {
        data.moneystatus = ynIsTeacher == "1" ? "销售" : "消费";
        data._style = ynIsTeacher ? 'hide' : ''
        return data;
    }

    return {
        init: function() {
            container = $(".wealth");
            balance = container.find('.balance');
            totalPrice = container.find('.totalPrice')
             consume = container.find('.consume')
            items = container.find('.info');
            input = container.find('input');
            Calendar.add(input, info => {
                input.val(info.month);
                send.currenttime = input.val();
                this.render();
            });
        },
        render: function() {
            getConsumeData(send).done(data => {
                console.log("我的资产信息", data);
                balance.html(data.balance)
                if(ynIsTeacher){
                    consume.hide()
                }else{
                    totalPrice.html(data.total_price)
                }
                
                
                items.html(template('totalmoney-template', handleData(data)));
                drawPie(data)
            })
        }
    }
})()

//绘制饼图
function drawPie(data) {
    var options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            width: 300,
            height: 200
        },
        colors: [
            '#ec5e1a',
            '#f7ca36',
            '#f70084',
            '#6e38d5',
            '#30b1d3'
        ],
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                showInLegend: true,
                center: ['25%', '50%']
            }
        },
        legend: {
            layout: 'vertical', //图例布局：垂直排列
            floating: true,
            align: 'right',
            verticalAlign: 'top',
        },
        series: [{
            name: "总销售额",
            type: 'pie',
            innerSize: '50%',
            data: [
                ['投资内参', data.neican_price],
                // ['投资组合', data.zuhe_price],
                // ['课程', data.kecheng_price],
                ['礼物', data.liwu_price],
                ['打赏', data.dahsang_price],
            ]
        }]
    }
    $('#myIcome-chart').highcharts(options);
}


/*///////////////////////////////////////////////////////////////////*/

//查询
var filter = (function() {
    var container, start, end, type, status, source, orderNum;
    return {
        init: function() {
            container = $(".filter");
            start = container.find('.time_start');
            end = container.find('.time_end');
            type = container.find('.type');
            status = container.find('.status');
            source = container.find('.source');
            orderNum = container.find('.orderNum');
            Calendar.add(start);
            Calendar.add(end);

            //提交查询
            container.on('click', '.submit', function() {
                console.log("query")
                var query = {
                    startTime: _.trim(start.val()),
                    endTime: _.trim(end.val()),
                    orderState: status.val(),
                    orderNum: _.trim(orderNum.val()),
                    type: type.val(),
                    source: source.val(),
                    currentPage: 1
                }
                console.log("query1", query)
                record.render(query);
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/

//消费记录列表
var record = (function() {
    var container, items, bootpag, param = {
        currentPage: 1,
        pageSize: 10
    };
    var expireTime = 40 * 60 * 1000; //未支付订单过期时间
    var create = item => {
        return `<tr>
                <td>${item.name}</td><td>${item._type}</td><td>${item.totalPrice}</td>
                <td>${item._status}</td><td>${item.orderNum}</td><td>${item._source}</td>
                <td>${item.time}</td>
                <td>${item._pay}</td>
            </tr>`
    }
    var handleData = arr => {
        return _.map(arr, item => {
            item._link = `/html/returnshortcutpayJsp.htm?orderNum=${item.orderNum}`;
            item._status = ["待支付", "已完成", "已取消", "退款中", "已归款", "已关闭", "服务中"][item.orderState];
            item.name = ynIsTeacher ? item.nickname : item.teacherName

            //过判断是否过期
            var isExpire = (_.now() - Date.parse(item.orderTime)) > expireTime
            if (isExpire && item.orderState == 0) item._status = "未支付";
            item._type = ["观点", "组合", "课程", "内参", "问股", "直播", "操盘内线"][+item.goodsType];
            item._source = ["WEB", "IOS", "ANDROID","H5","后台"][+item.pay_source];
            item._pay = item._status == "待支付" ? `<a href="${item._link}" target="_blank">去支付</a>` : "";
            return item;
        })
    }
    return {
        init: function() {
            container = $("#record-consume");
            items = $('.trade-items');
            bootpag = yn.bootpag(container);
            bootpag.on('page', (err, num) => this.render({ currentPage: num }))
        },
        render: function(ops) {
            container.show();
            getConsumeData(_.extend(param, ops)).done(data => {
                console.log("记录02", data);
                var rows = data.payorder;
                if (rows.length < 1) {
                    items.html(`<tr><td colspan="9"><div style="margin:100px;">没有查到记录</div></td></tr>`)
                    bootpag.hide();
                    return;
                }
                items.html(_.map(handleData(rows), item => create(item)).join(""));
                bootpag.show().bootpag({ page: param.currentPage, total: data.pageNumber })
            })
        },
        hide: () => container.hide()
    }
})()


/*///////////////////////////////////////////////////////////////////*/

//充值记录
var recharge = (function() {
    var container, items, start, end, type, status, orderNum, bootpag, param = {
        currentPage: 1,
        pageSize: 10
    };
    var create = item => {
        return `<tr>
                <td>${item._type}</td>
                <td>${item.totalPrice}</td>
                <td>${item.orderTime}</td>
                <td>${item._state}</td>
                <td>${item.orderNum}</td>
            </tr>`
    }
    var getQuery = () => {
        return {
            startTime: _.trim(start.val()),
            endTime: _.trim(end.val()),
            orderNum: _.trim(orderNum.val()),
            status: status.val(),
            payMode: type.val(),
            currentPage: 1
        }
    }
    var handleData = arr => {
        return _.map(arr, item => {
            item._state = ["未支付", "已完成", "已取消", "退款申请", "退款成功", "订单关闭", "服务中"][item.orderState];
            item._type = item.payMode ? ["系统充值", "支付宝", "微信", "IOS平台", '余额', '转账'][item.payMode] : '未知';
            return item;
        })
    }
    return {
        init: function() {
            container = $("#record-recharge");
            items = container.find('.items tbody');
            start = container.find('.time_start');
            end = container.find('.time_end');
            type = container.find('.type');
            status = container.find('.status');
            orderNum = container.find('.orderNum');
            Calendar.add(start);
            Calendar.add(end);
            container.on('click', '.query-btn', () => this.render(getQuery()));
            bootpag = yn.bootpag(container).hide();
            bootpag.on('page', (err, num) => this.render({ currentPage: num }));
        },
        render: function(ops) {
            container.show();
            _.extend(param, ops);
            getRechargeData(param).done(data => {
                console.log("充值记录==", data);
                var list = handleData(data.list);
                if (list && list.length < 1) {
                    bootpag.hide();
                    items.html(`<td colspan="5" style="padding:100px;border:none;font-size:16px;background:rgb(245,245,245);">暂无记录</td>`)
                    return;
                }
                items.html(_.map(list, item => create(item)).join(""));
                bootpag.show().bootpag({ page: param.currentPage, total: data.pageNumber })
            })
        },
        hide: () => container.hide()
    }
})()


/*////////////////////////// Data /////////////////////////////////////*/


//消费记录数据
function getConsumeData(send) {
    send = _.extend({
        teacherid: ynTeacherId,
        user_id: ynUserId,
        currentPage: 1,
        pageSize: 1
    }, send);
    var defer = $.Deferred();
    $.getJSON('/consumption/indexPay_consumptionDetail.htm', send, data => {
        data.pageNumber = _.max([1, Math.ceil(+data.total / send.pageSize)]);
        defer.resolve(data)
    })
    return defer.promise();
}


//充值记录数据
function getRechargeData(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        userId: ynUserId,
        pageSize: 10,
        currentPage: 1,
        startTime: "",
        endTime: "",
        orderNum: "",
        status: "",
        payMode: ""
    }, ops)
    $.getJSON('/consumption/rechargeList.htm', ops, data => {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.pageSize)]);
        defer.resolve(data)
    })
    return defer.promise();
}


//订单详情
yndata.indentDetail = function() {
    var defer = $.Deferred();
    $.getJSON('/consumption/pay_consumptionDetail.htm', { id: id }, function(data) {
        defer.resolve(data)
    })
    return defer.promise();
}


yndata.defray = function(ops) {
    ops = _.extend({
        user_id: ynUserId,
    }, ops)
    var defer = $.Deferred();
    var send = {
        user_id: ops.user_id,
        old_password: ops.old_password,
        new_password: ops.new_password,
        confirm_password: ops.confirm_password
    }
    $.post('/useraccount/updatePay_useraccountPassword.htm', send, function(data) {
        if (data == "success") {
            layer.msg('密码修改成功！')
            return;
        } else {
            layer.msg('密码修改失败！')
        }
    })
    return defer.promise();
}



yndata.forget = function(ops) {
    ops = _.extend({
        user_id: ynUserId,
    }, ops)
    var defer = $.Deferred();
    var send = {
        user_id: ops.user_id,
        new_password: ops.new_password,
        confirm_password: ops.confirm_password,
        phone: ops.phone,
        phoneCode: ops.phoneCode
    }
    $.post('/useraccount/forgetUseraccountPassword.htm', send, function(data) {
        if (data == "success") {
            layer.msg('密码修改成功！')
            return;
        } else {
            layer.msg('密码修改失败！')
        }
    })
    return defer.promise();
}

yndata.incomeDetail = function(id) {
    var defer = $.Deferred();
    $.getJSON('/consumption/pay_consumptionDetail.htm', { orderNum: id }, function(data) {
        defer.resolve(data)
    })
    return defer.promise();
}
