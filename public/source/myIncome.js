
//菜单
var menu = {
    container: $('#myWallet .myincome-tag'),
    myicome_type:$('#myWallet .myicome-type'),
    select:'myIncome',
    init: function() {
        var _this = this;
        this.container.on('click', 'td', function(index) {
            $(this).parent().find('.thisclass').removeClass("thisclass");
            $(this).addClass("thisclass");
            var type = $(this).data('type');
            _this.delegate.click(type);
            _this.select = type;
            _this.myicome_type.hide();
            $('#' + _this.select).show();
        })
    },
    delegate:{
        click:function(){}
    }
}
//查询
var qlIndent = {
    param_record: {
        startTime: "",
        endTime: "",
        orderState: "",
        type: "",
        source: "",
        orderNum:'',
        pageSize: 10,
        currentPage: 1
    },
    param_pay: {
        startTime:'',
        endTime:'',
        status:'',
        payMode:'',
        orderNum:'',
        pageSize: 10,
        currentPage: 1
    },
    currenttime:'',
    init: function() {
        var time_start=$('#indentquerystartTime'),//消费记录起始时间
        allmarketTime=$('#allmarketTime'),//消费记录月总额
        time_end= $('#indentqueryendTime'),//消费记录结束时间
        depositstartTime= $('#depositstartTime'),//充值记录起始时间
        depositendTime= $('#depositendTime'),//充值记录结束时间
        pay_type= $('#recharge #pay_type'),//充值方式
        pay_status= $('#pay_status'),//充值状态
        indent_num=$('#indent_num'),//订单号
        pay_num=$('#pay_num'),//流水号
        indent_type= $('#indent_type'),//订单类型
        indent_status= $('#indent_status'),//订单状态
        indent_source= $('#indent_source'),//订单来源
        submit= $('#myIncome .inquire-btn'),//消费查询btn
        pay_btn= $('#recharge .inquire-btn')//充值查询btn
        var _this = this;
        var calendar = yn.calendar();
        calendar.add(allmarketTime, function(info) {
            allmarketTime.val(info.month);
        });
        calendar.add(time_start);
        calendar.add(time_end);
        calendar.add(depositstartTime);
        calendar.add(depositendTime);

        $(document).on('focus','input',function(){
            $(this).html('');
        })
        
        submit.on('click', function() {
            _this.param_record.startTime= time_start.val();
            _this.param_record.endTime= time_end.val();
            _this.param_record.orderState= indent_status.val();
            _this.param_record.type= indent_type.val();
            _this.param_record.source= indent_source.val();
            _this.param_record.orderNum=indent_num.val();
            _this.param_record.pageSize= 10;
            _this.param_record.currentPage= 1
            _this.delegate.click_query_btn(_this.param_record);
        })
        pay_btn.on('click', function() {
            _this.param_pay.startTime= depositstartTime.val();
            _this.param_pay.endTime= depositendTime.val();
            _this.param_pay.status= pay_status.val();
            _this.param_pay.payMode= pay_type.val();
            _this.param_pay.orderNum=pay_num.val();
            _this.param_pay.pageSize= 10;
            _this.param_pay.currentPage= 1;
            _this.delegate.query_pay(_this.param_pay);
        })
        $(document).on('keydown', function(e) {
            var ev = document.all ? window.event : e;
            _this.currenttime = allmarketTime.val();
            if (ev.keyCode == 13) {
                _this.delegate.allmarke({currenttime:_this.currenttime});
            }
        })
    },
    delegate: {
        allmarke:function(){},//总销售/消费额
        click_query_btn: function() {},//消费记录
        query_pay: function() {}//充值记录
    }
}
//总销售/消费额
var marker={
    container:null,
    init:function(){
        this.container=$('#myIncome');
    },
    handle:function(data){
        var _this=this;
        
        data.moneystatus = ynIsTeacher  ? "销售" : "消费";
        return data;
    },
    render:function(option){
        var _this=this;
        yndata.getExpense(option).done(function(data){
            data=_this.handle(data);
            _this.container.find('.balance').html(data.balance)
            _this.container.find('.totalmoney').html(template('totalmoney-template', data));
            drawPie(data)
        })
    }
}
//消费记录
var myIncome = {
    container: null,
    init: function() {
        this.container = $('#myIncome');
        this.container.on('click', '.deposit-href', function() {
            judgePay.render();
        })
    },
    handle: function(data) {
        var _this = this;
        data.ytk = data.ytk_count != 0 ? '已退款' + data.ytk_count + '笔共' + data.ytk_price + '元，' : "";
        data.yxf = data.yxf_count != 0 ? '已消费' + data.yxf_count + '笔共' + data.yxf_price + '元，' : "";
        data.tkz = data.tkz_count != 0 ? '退款中' + data.tkz_count + '笔共' + data.tkz_price + '元，' : "";
        data.dzf = data.dzf_count != 0 ? '待支付' + data.dzf_count + '笔共' + data.dzf_price + '元。' : "";
        data.statisresult = '统计查询结果：' + data.ytk + data.yxf + data.tkz + data.dzf;
        data.payorder = _.map(data.payorder, function(item) {
            item.orderState = ["待支付", "已完成", "已取消", "退款中", "已归款", "已关闭", "服务中"][+item.orderState]
            item.goodsType = ["观点", "组合", "课程", "内参", "问股", "直播"][+item.goodsType]
            item.pay_source = ["WEB", "IOS", "ANDROID"][+item.pay_source]
            return item;
        });
        return data
    },
    render: function(option) {
        var _this = this;
        yndata.getExpense(option).done(function(data) {
            _this.handle(data);
            _this.container.find('.statistics-result').html(data.statisresult);
            _this.container.find('#indent-list').html(template('indent-list-template', data.payorder));
            _this.event.done(data.pageNumber)
        })
    },
    event: {
        done: function() {}
    }
}
//充值记录
var recharge = {
    container:null,
    init: function() {
        this.container = $('#recharge');
    },
    handle: function(data) {
        var _this = this;
        data.list = _.map(data.list, function(item) {
            if (item.orderState==0) {
                item.payMode=3
            };
            item.payMode = ["支付宝", "微信","暂未选择"][+item.payMode -1]
            item.orderState = ["待支付", "已完成", "已取消", "退款中", "已归款", "已关闭", "服务中"][+item.orderState]
            return item;
        })
        return data
    },
    render: function(option) {
        var _this = this;
        yndata.payrecord(option).done(function(data) {
            _this.handle(data)
            _this.container.find('#payrecord').html(template('payrecord-template', data.list));
            _this.event.done(data.pageNumber)
        })
    },
    event:{
        done:function(){}
    }
}
//绘制环形饼图
function drawPie(data) {
    var options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
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
                    distance: -50,
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
                ['投资组合', data.zuhe_price],
                ['课程', data.kecheng_price],
                ['礼物', data.liwu_price],
                ['打赏', data.dahsang_price],
            ]
        }]
    }
    $('#myIcome-chart').highcharts(options);
}


/////////////////////////////////////////////////////////

$(function() {
    var bootpag = yn.bootpag('#myWallet');
    bootpag.on('page', function(e, num) {
        if( menu.select == "myIncome"){
            qlIndent.param_record.currentPage = num;
            myIncome.render(qlIndent.param_record)    
        }
        if( menu.select == "recharge"){
            qlIndent.param_pay.currentPage = num;
            myIncome.render(qlIndent.param_pay)    
        }
        bootpag.bootpag({page:num})
    })

    //查询
    qlIndent.init();
    qlIndent.delegate.allmarke=function(send){
        //总销售／消费额
        marker.render(send)
    }
    qlIndent.delegate.click_query_btn = function(send) {
        //消费记录查询
        myIncome.render(send)
    }
    qlIndent.delegate.query_pay=function(send){
        //充值记录查询
        recharge.render(send)
    }

    //总消费／销售额
    marker.init();
    marker.render(qlIndent.currenttime)

    //消费记录
    myIncome.init();
    myIncome.render(qlIndent.param_record);
    myIncome.event.done = function(total){
        bootpag.bootpag({total:total})
    }

    //充值记录
    recharge.init();
    recharge.event.done=function(total){
        bootpag.bootpag({total:total})
    }

    menu.init();
    menu.delegate.click = function(type){
        if(type == "recharge") {
            recharge.render(qlIndent.param_pay);
        }
        if(type == "myIncome") {
            myIncome.render(qlIndent.param_record);
        }
    }
})




$(function() {
    // //验证手机号
    // yn.inputVerify("#phone", {
    //     blur: function(_this) {
    //         return yn.isMobile(_this.val());
    //     }
    // })
    // //确认密码
    // yn.inputVerify('#confirm_password1', {
    // blur: function(_this) {
    //     var val = _this.val();
    //     return val == $("#new_password1").val() && val;
    // }
    // })
    // yn.inputVerify('#confirm_password2', {
    //     blur: function(_this) {
    //         var val = _this.val();
    //         return val == $("#new_password2").val() && val;
    //     }
    // })
    // //获取验证码
    // $('#sendPhoneCodeId').click(function() {
    //     yndata.getPhoneCode($(this), $('#phone').val());
    // })
    // //手机验证码
    // yn.inputVerify('#phoneCode', {
    //     blur: function(_this) {
    //         return _this.val() !== "";
    //     }
    // })
    //支付密码修改
    var defray = {
        container: $('#defray'),
        init: function() {
            this.event();
        },
        event: function() {
            var _this = this;
            this.container.on('click', '.finish-btn', function() {
                var old_password = _this.container.find('#old_password').val(),
                    new_password = _this.container.find('#new_password1').val(),
                    confirm_password = _this.container.find('#confirm_password1').val(),
                    send = {
                        old_password: old_password,
                        new_password: new_password,
                        confirm_password: confirm_password
                    };
                yndata.defray(send)
            })
        },
        render: function() {
            var _this = this;
            this.container.show();
            bootpag.hide();
        }
    }
    //忘记支付密码
    var forget = {
        container: $('#forget'),
        init: function() {
            this.event();
        },
        event: function() {
            var _this = this;
            this.container.on('click', '.finish-btn', function() {
                var new_password = _this.container.find('#new_password2').val(),
                    confirm_password = _this.container.find('#confirm_password2').val(),
                    phone = _this.container.find('#phone').val(),
                    phoneCode = _this.container.find('#phoneCode').val();
                send = {
                    new_password: new_password,
                    confirm_password: confirm_password,
                    phone: phone,
                    phoneCode: phoneCode
                };
                yndata.forget(send)
            })
        },
        render: function() {
            var _this = this;
            this.container.show();
            bootpag.hide();
        }
    }
    //订单详情
    var findIndent = {
        operateone: $('#myWallet #indent-list'),
        operatetwo: $('#myWallet .deposit-wrap'),
        init: function() {
            this.event();
        },
        event: function() {
            this.operateone.on('click', '.operate', function() {
                var id = $(this).data("id");
                indentAlt.render(id);
            })
            this.operatetwo.on('click', '.operate', function() {
                var orderNum = $(this).data("num");
                rechargetable.render(orderNum);
            })
        }
    }

    //indentAlt
    var indentAlt = {
        container: $("#indentable"),
        init: function() {
            this.center();
            this.event();
        },
        center: function() {
            var w = $(window).width();
            var h = $(window).height();
            var cw = this.container.outerWidth()
            var ch = this.container.outerHeight()
            this.container.css({
                left: (w - cw) / 2 + "px",
                top: (h - ch) / 2 + "px"
            })
        },
        event: function() {
            var _this = this;
            this.container.on('click', '> .close', function(e) {
                _this.container.hide();
            })
        },
        render: function(id) {
            var _this = this
            yndata.incomeDetail(id).done(function(data) {
                data.orderState = ["未支付", "已完成", "已取消", "退款申请", "退款成功", "订单关闭", "服务中"][+data.orderState]
                _this.container.html(template('indentable-template', data)).velocity('transition.expandIn', { duration: 300 })
            })
        }
    }
    //rechargetable
    var rechargetable = {
        container: $('#rechargetable'),
        init: function() {
            this.center();
            this.event();
        },
        center: function() {
            var w = $(window).width();
            var h = $(window).height();
            var cw = this.container.outerWidth()
            var ch = this.container.outerHeight()
            this.container.css({
                left: (w - cw) / 2 + "px",
                top: (h - ch) / 2 + "px"
            })
        },
        event: function() {
            var _this = this;
            this.container.on('click', '> .close', function(e) {
                _this.container.hide();
            })
        },
        render: function(orderNum) {
            var _this = this;
            yndata.rechargeDetails(orderNum).done(function(data) {
                if (data.orderState==0) {
                    data.payMode=3
                };
                data.orderState = ["未支付", "已支付", "已取消", "申请退款", "退款成功", "订单关闭"][data.orderState];
                data.payMode = ["支付宝", "微信","暂未选择"][+data.payMode - 1]
                _this.container.html(template('rechargetable-template', data)).velocity('transition.expandIn', { duration: 300 })
            })
        }
    }

    // =================================================================//
    ////消费类心～充值记录～支付密码修改～忘记密码修改tag
    //消费记录
    myIncome.init();
    marker.init();
    //充值记录
    recharge.init();
    //左侧菜单
    yn.centerMenu.init();
    yn.centerMenu.render({ type: 'my' });
    //订单弹窗
    indentAlt.init();
    //充值记录弹窗
    rechargetable.init();
    //点击订单详情
    findIndent.init();
    //支付提示
    var judgePay = new ynmodule.JudgePay();
    judgePay.init();
    //支付密码修改
    defray.init();
    //忘记支付密码
    forget.init();
})
//消费记录
yndata.getExpense = function(ops) {
    ops = _.extend({
        teacherid: ynTeacherId,
        user_id: ynUserId,
        currentPage: 1,
        pageSize: 10,
        currenttime: '',
        startTime: '',
        endTime: '',
        orderState: '',
        orderNum:'',
        type: '',
        source: ''
    }, ops)

    var defer = $.Deferred();
    var send = {
        user_id: ops.user_id,
        teacherid: ops.teacherid,
        pageSize: ops.pageSize,
        currentPage: ops.currentPage,
        currenttime: ops.currenttime,
        startTime: ops.startTime,
        endTime: ops.endTime,
        orderState: ops.orderState,
        orderNum:ops.orderNum,
        type: ops.type,
        source: ops.source
    }
    $.getJSON('/consumption/indexPay_consumptionDetail.htm', send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.pageSize)]);
        defer.resolve(data)
    })
    return defer.promise();
}
//充值记录
yndata.payrecord = function(ops) {
    ops = _.extend({
        userId: ynUserId,
        currentPage: 1,
        pageSize: 10,
        startTime: '',
        endTime: '',
        orderNum:'',
        status: '',
        payMode: ''
    }, ops)
    var defer = $.Deferred();
    var send = {
        userId: ops.userId,
        pageSize: ops.pageSize,
        currentPage: ops.currentPage,
        startTime: ops.startTime,
        endTime: ops.endTime,
        orderNum:ops.orderNum,
        status: ops.status,
        payMode: ops.payMode
    }
    $.getJSON('/consumption/rechargeList.htm', send, function(data) {
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
yndata.rechargeDetails = function(orderNum) {
    var defer = $.Deferred();
    $.getJSON('/consumption/rechargeDetail.htm', { orderNum: orderNum }, function(data) {
        defer.resolve(data)
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
