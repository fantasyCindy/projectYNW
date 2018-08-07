var Calendar = require('../module/ui/calendar.js');
$(function(){
    inquire.init();
    inquire.render();
    indentAlt.init();
})

var inquire=(function(){
	var menu,table,bootpag,param={
		currentPage: 1,
        pageSize: 10
	};
	var payrecord = function(send) {
        send = _.extend({
            currentPage: 1,
            pageSize: 10,
            startTime:'',
            endTime:'',
            orderNum:'',
            status:'',
            payMode:''
        }, send)
        var defer = $.Deferred();
        $.getJSON('/consumption/rechargeList.htm', send, function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.total / send.pageSize)]);
            defer.resolve(data)
        })
        return defer.promise();
    }
	return {
		init:function(){
			var _this=this;
			bootpag=yn.bootpag('#recharge');
			menu=$('#parameter');
			table=$('#payrecord');
			bootpag.on('page', (err, num) => _this.render({ currentPage: num }))
			Calendar.add($('#startTime'));
			Calendar.add($('#endTime'));
			menu.on('click','.inquire-btn',function(){
				var res={}
				var send=menu.serialize();

				//数据反序列化
				send.split('&').forEach(function(i) {
	                var j = i.split('=');
	                res[j[0]] = j[1];
	            });
				_this.render(res);
			})
			//查看详情
			table.on('click','.operate',function(){
				var id=$(this).data("num");
                indentAlt.render(id);
			})
		},
		handle:function(data){
			var _this=this;
			data=_.map(data.list, function(item) {
			    if (item.orderState==0) {
			        item.payMode=3
			    } 
			    item.payMode = ["支付宝","微信","IOS平台支付","余额支付（虚拟币）","转账","后台"][+item.payMode - 1]
			    item.orderState = ["未支付","已支付","已取消","申请退款","退款成功","订单关闭"][+item.orderState]
			    return item;
			})
			return data
		},
		render:function(ops){
			var _this=this;
			payrecord(_.extend(param,ops)).done(function(data){
				bootpag.bootpag({ page: param.currentPage, total: data.pageNumber });
				data=_this.handle(data)
				table.html(template('payrecord-template', data))
			})
		}
	}
})()

var indentAlt=(function(){
	var container;
	var rechargeDetails=function(orderNum){
		var defer=$.Deferred();
		$.getJSON('/consumption/rechargeDetail.htm',{orderNum:orderNum},function(data){
		    defer.resolve(data)
		})
		return defer.promise();
	}
	return {
		init:function(){
			container=$('#rechargetable');
			container.on('click', '> .close', function(e) {
			    container.hide();
		    })
		},
		render: function(id) {
			container.show();
			yn.centerBox(container);
			rechargeDetails(id).done(function(data){
			    if (data.orderState==0) {
                    data.payMode=3
                }
                data.orderState=["未支付","已支付","已取消","申请退款","退款成功","订单关闭"][+data.orderState];
                data.payMode = ["支付宝","微信","未知"][+data.payMode - 1]
                console.log(data)
                container.html(template('rechargetable-template',data)).velocity('transition.expandIn', { duration: 300 })
			})
		}
	}
})()