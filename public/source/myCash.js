$(function(){
	//提现～记录tag
	var deposittag={
		container:$('#myCash'),
        deposit:$('#deposit'),
        depositlog:$('#deposit-log'),
        init: function() {
            this.event();
        },
        event:function(){
            var _this=this;
            this.container.find("#deposit").on('click','.check-log',function(){
                _this.deposit.hide();
                _this.depositlog.show();
            });
            this.container.find("#deposit-log").on('click','.return-btn',function(){
                _this.deposit.show();
                _this.depositlog.hide();
            });
        }
	}
	//查询提现记录
	var depositLog={
		operate:$('#deposit-log .deposit-wrap'),
    	init: function() {
    		this.event();
            yn.calendar("#depositstartTime");
            yn.calendar("#depositendTime");
        },
        event:function(){
            var _this=this;
            this.operate.on('click','.operate',function(){
            	// indentAlt.render();
            	console.log("ok")
            })
        }
	}
	//切换提现方式
	var defray={
		container:$('#deposit'),
		init:function(){
			this.event();
		},
		event:function(){
            var _this=this;
            this.container.find('.deposit-type').on('click','span',function(index){
            	$(this).parent().find('.thisclass').removeClass("thisclass");
                $(this).addClass("thisclass");
                var type = $(this).data('type');
                var index=$(this).index();
                _this.container.find('.pattern form:eq('+index+')').show();
                _this.container.find('.pattern form:eq('+index+')').siblings().hide();
                _this.render[type]();
            })
		},
		render:{
			//银行卡提现
			bank:function(){

			},
            //支付宝提现
            alipay:function(){

            },
            //微信提现
            wechat:function(){

            }
		}
	}
	//===================================================//
	defray.init();
	depositLog.init();
	deposittag.init();
	yn.centerMenu.init();
	yn.centerMenu.render({type:'my'});
})