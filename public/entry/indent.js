var Calendar = require('../module/ui/calendar.js');

$(function(){
	general.init()
	general.totalRender()
	// inquire.init()
	// inquire.render();
	indentAlt.init()
})

//总计
var general=(function(){
	var inside,time,send = { currenttime: "",is_inside:'',currentPage: 1,
        pageSize: 10,user_id:''};
	var menu,table,statistics,bootpag,select='全部用户';
	return {
		init:function(){
			var _this=this;
			time=$('#allmarketTime');

			menu=$('#parameter');
			table=$('.indent-wrap').find('table');
			statistics=$('.indent-wrap').find('.statistics-result');
			Calendar.add($('#startTime'));
            Calendar.add($('#endTime'));
			bootpag= yn.bootpag($('#myIncome'));
			bootpag.on('page', (err, num) => {send.currentPage=num;_this.listRender()})
			menu.on('click','.inquire-btn',function(){
				var res={}
				send=menu.serialize();

				//数据反序列化
				send.split('&').forEach(function(i) {
	                var j = i.split('=');
	                res[j[0]] = j[1];
	            });
				_this.render(res);
			})
			//查看详情
			table.on('click','.operate',function(){
				var id=$(this).data("id");
                indentAlt.render(id);
			})
			// 查看用户数据
			table.on('click','.username',function(){
				send.user_id=$(this).data('id');
				_this.totalRender();
				_this.listRender();
			})

			Calendar.add(time, info => {
                time.val(info.day);
            	send.currenttime=time.val();
            	_this.listRender();
            });
            
		},
		handle: function(data) {
            var _this = this;
            data.ytk = data.ytk_count != 0 ? '已退款' + data.ytk_count + '笔共' + data.ytk_price + '元，' : "";
            data.yxf = data.yxf_count != 0 ? '已消费' + data.yxf_count + '笔共' + data.yxf_price + '元，' : "";
            data.tkz = data.tkz_count != 0 ? '退款中' + data.tkz_count + '笔共' + data.tkz_price + '元，' : "";
            data.dzf = data.dzf_count != 0 ? '待支付' + data.dzf_count + '笔共' + data.dzf_price + '元。' : "";
            data.statisresult = '统计查询结果：' + data.ytk + data.yxf + data.tkz + data.dzf;
            data.payorder = _.map(data.payorder, function(item) {
                item.orderState = ["未支付", "已完成", "已取消", "退款申请", "退款成功", "订单关闭", "服务中"][+item.orderState]
                item.goodsType = ["观点", "组合", "课程", "内参", "问股", "直播"][+item.goodsType]
                item.pay_source = ["WEB", "IOS", "ANDROID"][+item.pay_source]
                return item;
            });
            return data
        },
		totalRender:function(){
			var _this=this;
			send.currentPage=1;
			incomeAll(_.extend(send)).done(function(data){
				var tag= !send.user_id ? 'myIncome-title-template':'myIncome-title-sub-template';
				$('.myIncome-title').html(template(tag,data));
                $('.totalmoney').html(template('totalmoney-template', data));
                drawPie(data)
                inside=$('#is_inside');
				if (!send.user_id) {
					inside.val(send.is_inside);
				}
                inside.change(function(){
	            	send.is_inside=$(this).val();
	            	_this.totalRender();
	            });
	            _this.listRender();
			})
		},
		listRender:function(){
			var _this=this;
			incomeAll(_.extend(send)).done(function(data){
				_this.handle(data)
				$('.statistics-result').html(data.statisresult);
                table.find('#indent-list').html(template('indent-list-template', data.payorder));
				bootpag.bootpag({ page: send.currentPage, total: data.pageNumber })
			})
		}
	}
})()

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
                ['投资组合', data.zuhe_price],
                ['课程', data.kecheng_price],
                ['礼物', data.liwu_price],
                ['打赏', data.dahsang_price],
            ]
        }]
    }
    $('#myIcome-chart').highcharts(options);
}

//查询
// var inquire=(function(){
// 	var menu,table,send,statistics,bootpag,param={
// 		currentPage: 1,
//         pageSize: 10
// 	};
// 	return {
// 		init:function(){
// 			var _this=this;
// 			menu=$('#parameter');
// 			table=$('.indent-wrap').find('table');
// 			statistics=$('.indent-wrap').find('.statistics-result');
// 			Calendar.add($('#startTime'));
//             Calendar.add($('#endTime'));
// 			bootpag= yn.bootpag($('#myIncome'));
// 			bootpag.on('page', (err, num) => _this.render({ currentPage: num }))
// 			menu.on('click','.inquire-btn',function(){
// 				var res={}
// 				send=menu.serialize();

// 				//数据反序列化
// 				send.split('&').forEach(function(i) {
// 	                var j = i.split('=');
// 	                res[j[0]] = j[1];
// 	            });
// 				_this.render(res);
// 			})
// 			//查看详情
// 			table.on('click','.operate',function(){
// 				var id=$(this).data("id");
//                 indentAlt.render(id);
// 			})
// 			// 查看用户数据
// 			table.on('click','.username',function(){
// 				var id=$(this).data('id');
// 				console.log(id)
// 				general.render(id);
// 			})
// 		},
// 		handle: function(data) {
//             var _this = this;
//             data.ytk = data.ytk_count != 0 ? '已退款' + data.ytk_count + '笔共' + data.ytk_price + '元，' : "";
//             data.yxf = data.yxf_count != 0 ? '已消费' + data.yxf_count + '笔共' + data.yxf_price + '元，' : "";
//             data.tkz = data.tkz_count != 0 ? '退款中' + data.tkz_count + '笔共' + data.tkz_price + '元，' : "";
//             data.dzf = data.dzf_count != 0 ? '待支付' + data.dzf_count + '笔共' + data.dzf_price + '元。' : "";
//             data.statisresult = '统计查询结果：' + data.ytk + data.yxf + data.tkz + data.dzf;
//             data.payorder = _.map(data.payorder, function(item) {
//                 item.orderState = ["未支付", "已完成", "已取消", "退款申请", "退款成功", "订单关闭", "服务中"][+item.orderState]
//                 item.goodsType = ["观点", "组合", "课程", "内参", "问股", "直播"][+item.goodsType]
//                 item.pay_source = ["WEB", "IOS", "ANDROID"][+item.pay_source]
//                 return item;
//             });
//             return data
//         },
// 		render:function(ops){
// 			var _this=this;
// 			incomeAll(_.extend(param, ops)).done(function(data){
// 				_this.handle(data)
// 				$('.statistics-result').html(data.statisresult);
//                 table.find('#indent-list').html(template('indent-list-template', data.payorder));
// 				bootpag.bootpag({ page: param.currentPage, total: data.pageNumber })
// 			})
// 		}
// 	}
// })()
var indentAlt = (function(){
	var container;
	var incomeDetail=function(id){
		var defer=$.Deferred();
		$.getJSON('/consumption/pay_consumptionDetail.htm',{orderNum:id},function(data){
		    defer.resolve(data)
		})
		return defer.promise();
	}
	return{
		init: function() {
			container=$("#indentable");
			container.on('click', '> .close', function(e) {
			    container.hide();
		    })
		},
		render: function(id) {
			container.show();
			yn.centerBox(container);
			incomeDetail(id).done(function(data){
			data.orderState=["未支付", "已完成", "已取消", "退款申请", "退款成功","订单关闭","服务中"][+data.orderState]
			    container.html(template('indentable-template',data)).velocity('transition.expandIn', { duration: 300 })
			})
		}
    }
})()
function incomeAll(send){
	send = _.extend({
		user_id: '',
		currentPage: 1,
		pageSize: 10,
		currenttime:'',
		startTime:'',
		orderNum:'',
		endTime:'',
		orderState:'',
		is_inside:'',
		source:''
	}, send)
	var defer=$.Deferred();
	$.getJSON('/consumption/indexPay_consumptionDetail.htm',send,function(data){
		data.pageNumber = _.max([1, Math.ceil(+data.total / send.pageSize)]);
	    defer.resolve(data)
	})
	return defer.promise();
}