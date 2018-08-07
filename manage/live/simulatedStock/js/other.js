/******************************高手更改个性签名**********************************/
function changeQm(e){
    var sign = $("#gxcontent").val();
    var time = new Date().getTime();
    $.ajax({
        type: "POST",
        url: __HTTP_URI+"/index.php?mod=handler&ac=changeqm&_="+time,
        data: "sign="+sign,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                $("#sign").text(sign);
                art.dialog({id:'UpJsfxFrame1'}).close();
				art.dialog({icon: 'succeed',content:'修改成功！！！',time:1});
            }else{
                alert(response.info.message);
            }
        }
    });
}
/******************************订阅动态和模拟交易切换**********************************/
//切换到模拟交易
function swJy(index){
    var tab = $(".use-nav .tab").eq(index);
    getCurrentCc(0);//获取当前持仓数据并显示持仓页面
    tab.siblings().find("a").removeClass("current");
    tab.find("a").addClass("current");
    $("#dy").addClass("ndis");
    $("#jy").removeClass("ndis");
}
//切换到订阅动态
function swdy(index){
    var tab = $(".use-nav .tab").eq(index);
	swMydd(0);
    tab.siblings().find("a").removeClass("current");
    tab.find("a").addClass("current");
    $("#dy").removeClass("ndis");
    $("#jy").addClass("ndis");
}
/******************************自选股操作**************************************************/
//添加自选股
$("#mycodeadd").click(function(){
    var code = $("#mycode").val();
    pattern =/^((3|6|0)(\d){5})$/;
    var time = new Date().getTime();
    if(pattern.exec(code)){
        $.ajax({
            type: "GET",
            url: __HTTP_URI+"/index.php?mod=handler&ac=mycode&stockcode="+code+'&_='+time,
            dataType: "json",
            success: function(response){
                if(response.info.success=='1'){
                    $("#codearea .title").after('<tr dataid="'+response.data.id+'" class="mycode" stockcode="'+response.data.stockcode+'"><td><a href="http://stock.cf8.com.cn/'+response.data.stockcode+'.shtml" target="_blank">'+response.data.stockname+'</a></td><td class="t-red">'+response.data.xj+'</td><td>'+response.data.zdf+'</td><td><a href="javascript:void(0);" onclick="delMycode(this);">删除</a></td></tr>');
                    $("#mycode").val("");
                }else{
                    alert(response.info.message);
                }
            }
        });
    }else{
        alert("股票代码必须是以3、6、0开头的6个数字组成");
    }

});

//删除自选股
function delMycode(e){
    var id = $(e).closest("tr").attr("dataid");
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=handler&ac=mycode&id="+id+'&_='+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                $(e).closest("tr").remove();
            }else{
                alert(response.info.message);
            }
        }
    });
}
/******************************操盘室发布观点**********************************/
//发布观点ajax交互
function ajaxFbMessage(){
    var maxid = $(".row").eq(0).attr("dataid");
    var message = $("#fb").val();
    if(!maxid){
        maxid = 0;
    }
    var time = new Date().getTime();
    $.ajax({
        type: "POST",
        url: __HTTP_URI+"/index.php?mod=handler&ac=ajaxfb&_="+time,
        data: "maxid="+maxid+"&message="+message,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                makeHTML(response.data);
                $("#fb").val("");
                $("#fb-status").text('发布成功');
            }else{
                alert(response.info.message);
            }
        }
    });
}
/******************************订阅动态和自选股新闻切换操作**********************************/
//切换到订阅动态中的订阅动态
function swMydd(index){
    var tab = $("#mydnews .tab").eq(index);
    tab.siblings().find("a").removeClass("current");
    tab.find("a").addClass("current");
    $("#hd_hdlist").removeClass("ndis");
    $("#mystocknews").addClass("ndis");
}
//切换到订阅动态中的自选股资讯
function swMynews(index){
    var tab = $("#mydnews .tab").eq(index);
    getMyggxw(1);
    tab.siblings().find("a").removeClass("current");
    tab.find("a").addClass("current");
    $("#mystocknews").removeClass("ndis");
    $("#hd_hdlist").addClass("ndis");
}
//获取自选股资讯列表
function getMyggxw(curpage){
    var mycodearr = [];
    var i =1;
    $.each($("#codearea .mycode"),function(key,value){
        mycodearr.push($(value).attr("stockcode"));
        if(i == 20){
            return false;
        }
        i++;
    });
    var mycode = mycodearr.join();
    if(!curpage){
        curpage = 1;
    }var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+'/index.php?mod=public&ac=codenews&code='+mycode+'&curpage='+curpage+'&_='+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                var news = '';
                $.each(response.data,function(k,v){
                    news += '<div class="row"><h4><a target="_blank" href="/index.php?mod=public&ac=news&id='+v.id+'">'+ v.title+'</a></h4></div>';
                });
                $("#myggxw").html(news);
                var pager = ajaxPage(response.info.count,response.info.perpage,response.info.curpage,'getMyggxw');//调用分页
                $("#page3").html(pager);
            }else{
                alert( response.info.message );
            }
        }
    });
}
/******************************当前持仓操作**********************************/
//获取当前持仓操盘
function getCurrentCc(obj,self){
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=public&ac=curposition&uid="+_UID+'&_='+time,
        dataType: "json",

        success: function(response){
            if(response.info.success=='1'){
                if(response.data.ustock){
                    setUstock(response.data.ustock);
                }
                if(response.data.lastcc){
                    setLastcc(response.data.lastcc,self);
                }
                if(response.data.lastjy){
                    setLastjy(response.data.lastjy);
                }
                if(isNaN(obj)){
                    var index = $(obj).index();
                }else{
                    var index = obj;//如果是数字表示index位置
                }
                jySwitch(index);//调用切换
            }
        }
    });
}
//设置用户stock
function setUstock(data){
    $("#totalmoney1").text(data.totalmoney);
    $("#totalmoney").text(data.totalmoney);
    $("#marketvalue").text(data.marketvalue);
    if(data.pol>0){
        $("#pol1").addClass('t-red').removeClass('t-green');
        $("#pol").addClass('t-red').removeClass('t-green');
    }else if(data.pol<0){
        $("#pol1").addClass('t-green').removeClass('t-red');
        $("#pol").addClass('t-green').removeClass('t-red');
    }
    $("#pol1").text(data.pol);
    $("#pol").text(data.pol);
    $("#availmoney").text(data.availmoney);
    $("#frozen").text(data.frozen);
    if(data.weekrise>0){
        $("#weekrise").text(data.weekrise+'%').addClass('t-red').removeClass('t-green');
    }else{
        $("#weekrise").text(data.weekrise+'%').addClass('t-green').removeClass('t-red');
    }
    if(data.monthrise>0){
        $("#monthrise").text(data.monthrise+'%').addClass('t-red').removeClass('t-green');
    }else{
        $("#monthrise").text(data.monthrise+'%').addClass('t-green').removeClass('t-red');
    }
}


//设置用户持仓
function setLastcc(data,self){
    var trhtml = '';
    $.each(data,function(k,v){
		trhtml += '<tr class="tabbg">';
		trhtml += '	<td><a target="_blank" href="http://stock.cf8.com.cn/'+ v.stockcode+'.shtml">'+ v.stockcode+'</a></td>';
		trhtml += '	<td><a target="_blank" href="http://stock.cf8.com.cn/'+ v.stockcode+'.shtml">'+ v.stockname+'</a></td>';
		trhtml += '	<td class="'+(v.zdf>0?"t-red":(v.zdf<0?"t-green":""))+'">'+v.zdf+'%</td>';
		trhtml += '	<td class="'+(v.pol>0?"t-red":(v.pol<0?"t-green":""))+'"><em>'+v.pol+'</em></td>';
		trhtml += '	<td class="'+(v.pol>0?"t-red":(v.pol<0?"t-green":""))+'"><em>'+((v.xj-v.averagemoney)/v.averagemoney*100).toFixed(2)+'%</em></td>';
		trhtml += '	<td><em>'+v.totalstock+'</em></td>';
		trhtml += '	<td><em>'+v.availstock+'</em></td>';
		trhtml += '	<td><em>'+v.averagemoney+'</em></td>';
		trhtml += '	<td><em>'+v.xj+'</em></td>';
		trhtml += '	<td><a href="/index.php?mod=handler&ac=gshandler&code='+v.stockcode+'&st=buy">买入</a>';
		if(self==1 && v.availstock>0){
			trhtml += '&nbsp;&nbsp;<a href="/index.php?mod=handler&ac=gshandler&code='+v.stockcode+'|'+v.availstock+'&st=sell">卖出</a>';
		}
		trhtml += '</td>';
		trhtml += '</tr>';
    });
    $("#cctitle").html((trhtml!=''?trhtml:'<tr class="tabbg"><td colspan="10" style="text-align:center;">暂无持仓数据</td></tr>'));
}

//设置用户最近交易
function setLastjy(data){
    var trhtml = '';
    $.each(data,function(k,v){
		trhtml += '<tr class="tabbg">';
		trhtml += '	<td><a class="title linka" href="http://stock.cf8.com.cn/'+ v.stockcode+'.shtml" target="_blank">'+ v.stockname+'</a></td>';
		trhtml += '	<td><a class="title linka" href="http://stock.cf8.com.cn/'+ v.stockcode+'.shtml" target="_blank">'+ v.stockcode+'</a></td>';
		trhtml += '	<td>'+v.transacttime+'</td>';
		trhtml += '	<td>'+v.dealtype+'</td>';
		trhtml += '	<td>'+v.transactprize+'</td>';
		trhtml += '	<td>'+v.dealcount+'</td>';
		trhtml += '</tr>';
    });
    $("#jytitle").html((trhtml!=''?trhtml:'<tr class="tabbg"><td colspan="10" style="text-align:center;">暂无最近交易数据</td></tr>'));
	data.length<3 &&  $("#lastjy_more").hide();
}

/******************************买入卖出公共操作**********************************/
var _hqlist = [];//行情json数据
//    通过代码获取行情
function fetchHq(code){
    var time = new Date().getTime();
    $.ajax({
        async: false,
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=public&ac=hq&_="+time+"&buycode="+code,
        dataType: "json",
        success: function(response){
            if(response && response.info && response.info.success=='1'){
                window._hqlist = response.data.split(',');
            }
        }
    });
}
//将价格可用
function parsePrice(priceString) {
    return (Math.round(parseFloat(priceString) * 100) / 100).toFixed(2)
}
//清除买入/卖出的数据
function clearData(){
    $("#buycode").val("");
    $("#inprice").val("");
    $("#buycount").val("");
    $(".cleardata").text("");
    $("#sinprice").val("");
    $("#sbuycount").val("");
}
/******************************买入操作**********************************/
//切换到买入界面
function getBuy(e){
    var index = $(e).index();
    clearData();
    getAvailmoney();//获取可用金额
    jySwitch(index);
	RecountDown($('#planbuybtn'));
}
//获取可用用户可用金额
function getAvailmoney(){
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=handler&ac=availmoney&_="+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
				$("#availmoney").text(response.data);
				$("#availmoneybuy").text(response.data);
            }else{
                alert(response.info.message);
            }
        }
    });
}
//提示股票代码
function autocompletename(ids){
    $.each(ids,function(k,v){
         $('#'+v).autocomplete(codes,{ width : 190, matchContains: true,formatItem: function(item) {
            return "<span style=float:right>" + item[2] +"</span>" + item[0] + "&nbsp;&nbsp;&nbsp;&nbsp;" + item[1] ;
            },formatMatch:function(item, i, count){
                return item[0]+item[2];
            }, formatResult: function(row) {
                return row[0];
            }}).result(function(event, item){
                $(this).val(item[0]);
                fetchHq(item[0]);
                GetHqBox(window._hqlist);
            });
        });
}
//  设置买行情数据
function GetHqBox(hqlist){
	if(hqlist.length<=0){return false;}
    var xgpname = hqlist[39];
    var Closetime = hqlist[2];
    var xjk = parsePrice(hqlist[13]);
    var xzs = parsePrice(hqlist[12]);
    var xxj = parsePrice(hqlist[3]);
    var xxj1 = xxj;
    var xhigh = parsePrice(hqlist[14]);
    var xlowe = parsePrice(hqlist[15]);
    $("#xgpname").text(xgpname);

    if (xxj==0) {
        $("#xxj").text(" 停牌");
        $("#xxj").attr("class","red");
        $("#jiaged").text(" 停牌");
    }else{
        if(xgpname.indexOf('N')!=-1){
            alert('新股当天不允许交易');
            return false;
        }
        $("#xxj").text(xxj);
        $("#xxj1").text(xxj);
        $("#xzs").text(xzs);
        $("#xjk").text(xjk);
        $("#xhigh").text(xhigh);
        var xhighys = xhigh>xzs ? "red" : (xhigh<xzs ? "green" : ""); $("#xhigh").addClass(xhighys);
        $("#xlowe").text(xlowe);
        var xloweys = xlowe>xzs ? "red" : (xlowe<xzs ? "green" : ""); $("#xlowe").addClass(xloweys);

        $("#zde").text(parsePrice(xxj-xzs));
        var zdl = xzs!=0 ? (xxj-xzs)/xzs*100 : 0; zdl = zdl.toFixed(2);
        var zdlys = zdl>0 ? "red" : (zdl<0 ? "green" : "");
        $("#zdl").text(parsePrice(zdl)+"%");
        $("#zdl").addClass(zdlys);
        $("#zde").addClass(zdlys);
        $("#xxj").addClass(zdlys);
        $("#xxj1").addClass(zdlys);
        $("#inprice").val(xxj);
        var xzjg = Closetime=='15:00:00' ? xxj : xzs;
        if(xgpname.indexOf('ST')!=-1){
            $("#jiagez").text(parsePrice(xzjg*1.05));
            $("#jiaged").text(parsePrice(xzjg*0.95));
        }else{
            $("#jiagez").text(parsePrice(xzjg*1.1));
            $("#jiaged").text(parsePrice(xzjg*0.9));
        }
    }
    var maxBuyAmount = 0;
    if(xxj>0){
        maxBuyAmount = Math.floor(parseFloat($("#availmoney").text()) / 1.003 / xxj / 100, 0) * 100;
        if(isNaN(maxBuyAmount))maxBuyAmount = 0;
    }
    $("#maxBuyAmount").text(maxBuyAmount);
    $("#maxBuyAmount1").text(maxBuyAmount);
    var xb1n = parseInt(hqlist[20], 10);$("#xb1n").text(xb1n);
    var xb1 = parsePrice(hqlist[19]);$("#xb1").text(xb1);
    var xb2n = parseInt(hqlist[24], 10);$("#xb2n").text(xb2n);
    var xb2 = parsePrice(hqlist[23]);$("#xb2").text(xb2);
    var xb3n = parseInt(hqlist[28], 10);$("#xb3n").text(xb3n);
    var xb3 = parsePrice(hqlist[27]);$("#xb3").text(xb3);
    var xb4n = parseInt(hqlist[32], 10);$("#xb4n").text(xb4n);
    var xb4 = parsePrice(hqlist[31]);$("#xb4").text(xb4);
    var xb5n = parseInt(hqlist[36], 10);$("#xb5n").text(xb5n);
    var xb5 = parsePrice(hqlist[35]);$("#xb5").text(xb5);
    var xs1n = parseInt(hqlist[20], 10);$("#xs1n").text(xs1n);
    var xs1 = parsePrice(hqlist[21]);$("#xs1").text(xs1);
    var xs2n = parseInt(hqlist[26], 10);$("#xs2n").text(xs2n);
    var xs2 = parsePrice(hqlist[25]);$("#xs2").text(xs2);
    var xs3n = parseInt(hqlist[30], 10);$("#xs3n").text(xs3n);
    var xs3 = parsePrice(hqlist[29]);$("#xs3").text(xs3);
    var xs4n = parseInt(hqlist[34], 10);$("#xs4n").text(xs4n);
    var xs4 = parsePrice(hqlist[33]);$("#xs4").text(xs4);
    var xs5n = parseInt(hqlist[38], 10);$("#xs5n").text(xs5n);
    var xs5 = parsePrice(hqlist[37]);$("#xs5").text(xs5);

    var xb1ys = xb1>xzs ? "red" : (xb1<xzs ? "green" : "");$("#xb1").addClass(xb1ys);
    var xb2ys = xb2>xzs ? "red" : (xb2<xzs ? "green" : "");$("#xb2").addClass(xb2ys);
    var xb3ys = xb3>xzs ? "red" : (xb3<xzs ? "green" : "");$("#xb3").addClass(xb3ys);
    var xb4ys = xb4>xzs ? "red" : (xb4<xzs ? "green" : "");$("#xb4").addClass(xb4ys);
    var xb5ys = xb5>xzs ? "red" : (xb5<xzs ? "green" : "");$("#xb5").addClass(xb5ys);
    var xs1ys = xs1>xzs ? "red" : (xs1<xzs ? "green" : "");$("#xs1").addClass(xs1ys);
    var xs2ys = xs2>xzs ? "red" : (xs2<xzs ? "green" : "");$("#xs2").addClass(xs2ys);
    var xs3ys = xs3>xzs ? "red" : (xs3<xzs ? "green" : "");$("#xs3").addClass(xs3ys);
    var xs4ys = xs4>xzs ? "red" : (xs4<xzs ? "green" : "");$("#xs4").addClass(xs4ys);
    var xs5ys = xs5>xzs ? "red" : (xs5<xzs ? "green" : "");$("#xs5").addClass(xs5ys);
}
//买入股票的几分之几
function setbuycount(id){
    var maxBuyStr = $('#maxBuyAmount').text();
    if(parseInt(maxBuyStr) < 100) {alert('资金不足');return;}
    if(id && maxBuyStr) {
        var result = parseInt(maxBuyStr)/parseInt(id),res1=0;
        result = parseInt(result/100) * 100;//取整手
        res1 = result < 100 ? 100 : result;
        $('#buycount').val(res1);
    }
}
//刷新买入股票行情
$("#reloadhq").click(function(){
    var code = $("#buycode").val();
    if(code){
        fetchHq(code);
        GetHqBox(window._hqlist);
    }
});
//失去焦点校验买入价格
$("#inprice").blur(function(){
    var buycode=$("#buycode").val(),inprice = $('#inprice').val(),curprice = $('#xxj').text(),gaoprice = $('#jiagez').text(),diprice = $('#jiaged').text();
    if(buycode=='') return;
    if (!isNaN(inprice)){
        if(curprice!='停牌'){
            if(curprice>0){
                if(parseFloat(inprice) > parseFloat(gaoprice) || parseFloat(inprice) < parseFloat(diprice)){alert("委托价格必须在"+diprice+"-"+gaoprice+"之间！");$('#inprice').val(curprice);return;}
                var buyPrice = parsePrice($("#inprice").val()),maxBuyAmount = 0;
                if(buyPrice>0){
                    maxBuyAmount = Math.floor(parseFloat($("#availmoney").text())/ 1.003 / buyPrice / 100, 0) * 100;
                    if(isNaN(maxBuyAmount))maxBuyAmount = 0;
                }
                $("#maxBuyAmount").text(maxBuyAmount);
                $("#maxBuyAmount1").text(maxBuyAmount);
            }else{alert('请输入正确的股票代码！11');$('#buycode').focus();}
        }else{alert('该股票停盘！！！');$('#buycode').focus();}
    }else{alert('请输入数字！');$("#inprice").val(curprice);}
});
//买入股票提交操作
$("#planbuybtn").click(function(){
    var stockcode = $("#buycode").val();
    var prize = $("#inprice").val();
    var buycount = $("#buycount").val();
    if(isNaN(buycount) || buycount<=0){alert('请输入大于0的整数!');$("#buycount").val('');$("#buycount").focus();return;}
    var maxbuynum = parseInt($('#maxBuyAmount').text());
    var buycount = parseInt(buycount);
    if (buycount>0 && buycount % 100 != 0){alert('买入股票数量必须为100的整数倍，请重新输入!');$("#buycount").val('');$("#buycount").focus();return;}
    if (buycount>0 && buycount > maxbuynum) {alert("您的买入数量大于您的可买数量，请检查您的资金账户！！！");$("#buycount").val('');$("#buycount").focus();return;}
    var time = new Date().getTime();
	$.ajax({
		type: "POST",
		url: __HTTP_URI+"/index.php?mod=handler&ac=buy&_="+time,
		data: "stockcode="+stockcode+"&prize="+prize+"&buycount="+buycount,
		dataType: "json",
		success: function(response){
			if(response.info.success=='1'){
				alert(response.info.message);
				if(response.data.htype==1){
					getCurrentCc(0);
					jySwitch(0);
				}else{
					transactDeal(1);
					jySwitch(3);
				}  
			}else{
				alert(response.info.message);
			}
			RecountDown($('#planbuybtn'));
		},
		beforeSend: function(){
			countDown($('#planbuybtn'));
		}
	});
});
/******************************卖出操作**********************************/
//切换到卖出界面
/* function getSell(e){
    var index = $(e).index();
    clearData();
	var code = fcode;
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=public&ac=curposition&k=curpos&uid="+_UID+'&_='+new Date().getTime(),
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                if(response.data.lastcc){
					var options = '<option selected="selected" value="">－－选择股票代码－－</option>';
                    var trhtml = '';
					$.each(response.data.lastcc,function(k,v){
						if(v.availstock>0){
							trhtml += '<tr>';
							trhtml += '<td class="tal"><p class="designation"><a href="http://stock.cf8.com.cn/'+ v.stockcode+'.shtml" class="title linka">'+ v.stockname+'</a><a href="#">'+ v.stockcode+'</a></p></td>';
							trhtml += '<td>'+v.totalstock+'</td><td class="'+(v.pol>0?"t-red":(v.pol<0?"t-green":""))+'">'+v.pol+'</td>';
							trhtml += '<td>'+(v.totalstock*v.xj).toFixed(2)+'</td>';
							trhtml += '<td><a href="javascript:void(0)" onclick="sellposlistchange(\''+ v.stockcode+'|'+ v.availstock+'\')" class="txt_gray">卖出</a></td>';
							trhtml += '</tr>';
							options += '<option value="'+ v.stockcode+'|'+ v.availstock+'">'+ v.stockname+'('+ v.stockcode+')</option>';
						}
					});
					$("#cctitlesell").siblings().remove();
					$("#lastccsell").append((trhtml!=''?trhtml:'<tr><td colspan="6" style="text-align:center;">暂无可卖股票</td></tr>'));
					$("#selplanid").html(options);
					if(code!=''){
						$("#selplanid").val(code).trigger("change");
					}
				}
                jySwitch(index);//调用切换
            }
        }
    });
    jySwitch(index);
}
 */
/* function sellposlistchange(v){
	$("#selplanid").val(v).trigger("change");
} */
//获取可买的股票列表
/* function getAvailstock(){
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=handler&ac=availstock&_="+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                var options = '<option selected="selected" value="">－－选择股票代码－－</option>';
                $.each(response.data,function(k,v){
                    options += '<option value="'+ v.stockcode+'|'+ v.availstock+'">'+ v.stockname+'('+ v.stockcode+')</option>';
                });
                $("#selplanid").html(options);
            }
        }
    });
} */

//切换到卖出界面
function getSell(e){
    var index = $(e).index();
    clearData();
    getAvailstock();
    jySwitch(index);
	RecountDown($('#plansellbtn'));
}
//获取可买的股票列表
function getAvailstock(){
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=handler&ac=availstock&_="+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                var options = '<option selected="selected" value="">－－选择股票代码－－</option>';
                $.each(response.data,function(k,v){
                    options += '<option value="'+ v.stockcode+'|'+ v.availstock+'">'+ v.stockname+'('+ v.stockcode+')</option>';
                });
                $("#selplanid").html(options);
            }
        }
    });
}

//卖出 选择卖出股票改变信息及获取行情
function onchagesel(){
    var plid = $("#selplanid").val();
    if(!plid){
        return;
    }
    var parr = plid.split('|');
    var code = parr[0];
    var sellnum = parseInt(parr[1]);
    $('#sbuycode').val(code);
    $('#smaxBuyAmount').text(sellnum);
    $('#smaxBuyAmount1').text(sellnum);
    if(code){
        fetchHq(code);
        sGetHqBox(window._hqlist);
    }
}
//卖出设置行情
function sGetHqBox(hqlist){

    var xgpname = hqlist[39];
    var Closetime = hqlist[2];
    var xjk = parsePrice(hqlist[13]);
    var xzs = parsePrice(hqlist[12]);
    var xxj = parsePrice(hqlist[3]);
    var xxj1 = xxj;
    var xhigh = parsePrice(hqlist[14]);
    var xlowe = parsePrice(hqlist[15]);
    $("#sxgpname").text(xgpname);

    if (xxj==0) {
        $("#sxxj").text(" 停牌");
        $("#sxxj").attr("class","red");
        $("#sjiaged").text(" 停牌");
    }else{
        $("#sxxj").text(xxj);
        $("#sxxj1").text(xxj);
        $("#sxzs").text(xzs);
        $("#sxjk").text(xjk);
        $("#sxhigh").text(xhigh);
        var xhighys = xhigh>xzs ? "red" : (xhigh<xzs ? "green" : ""); $("#sxhigh").addClass(xhighys);
        $("#sxlowe").text(xlowe);
        var xloweys = xlowe>xzs ? "red" : (xlowe<xzs ? "green" : ""); $("#sxlowe").addClass(xloweys);

        $("#szde").text(parsePrice(xxj-xzs));
        var zdl = xzs!=0 ? (xxj-xzs)/xzs*100 : 0; zdl = zdl.toFixed(2);
        var zdlys = zdl>0 ? "red" : (zdl<0 ? "green" : "");
        $("#szdl").text(parsePrice(zdl)+"%");
        $("#szdl").addClass(zdlys);
        $("#szde").addClass(zdlys);
        $("#sxxj").addClass(zdlys);
        $("#sxxj1").addClass(zdlys);
        $("#sinprice").val(xxj);
        var xzjg = Closetime=='15:00:00' ? xxj : xzs;
        if(xgpname.indexOf('ST')!=-1){
            $("#sjiagez").text(parsePrice(xzjg*1.05));
            $("#sjiaged").text(parsePrice(xzjg*0.95));
        }else{
            $("#sjiagez").text(parsePrice(xzjg*1.1));
            $("#sjiaged").text(parsePrice(xzjg*0.9));
        }
    }
    var xb1n = parseInt(hqlist[20], 10);$("#sxb1n").text(xb1n);
    var xb1 = parsePrice(hqlist[19]);$("#sxb1").text(xb1);
    var xb2n = parseInt(hqlist[24], 10);$("#sxb2n").text(xb2n);
    var xb2 = parsePrice(hqlist[23]);$("#sxb2").text(xb2);
    var xb3n = parseInt(hqlist[28], 10);$("#sxb3n").text(xb3n);
    var xb3 = parsePrice(hqlist[27]);$("#sxb3").text(xb3);
    var xb4n = parseInt(hqlist[32], 10);$("#sxb4n").text(xb4n);
    var xb4 = parsePrice(hqlist[31]);$("#sxb4").text(xb4);
    var xb5n = parseInt(hqlist[36], 10);$("#sxb5n").text(xb5n);
    var xb5 = parsePrice(hqlist[35]);$("#sxb5").text(xb5);
    var xs1n = parseInt(hqlist[20], 10);$("#sxs1n").text(xs1n);
    var xs1 = parsePrice(hqlist[21]);$("#sxs1").text(xs1);
    var xs2n = parseInt(hqlist[26], 10);$("#sxs2n").text(xs2n);
    var xs2 = parsePrice(hqlist[25]);$("#sxs2").text(xs2);
    var xs3n = parseInt(hqlist[30], 10);$("#sxs3n").text(xs3n);
    var xs3 = parsePrice(hqlist[29]);$("#sxs3").text(xs3);
    var xs4n = parseInt(hqlist[34], 10);$("#sxs4n").text(xs4n);
    var xs4 = parsePrice(hqlist[33]);$("#sxs4").text(xs4);
    var xs5n = parseInt(hqlist[38], 10);$("#sxs5n").text(xs5n);
    var xs5 = parsePrice(hqlist[37]);$("#sxs5").text(xs5);

    var xb1ys = xb1>xzs ? "red" : (xb1<xzs ? "green" : "");$("#sxb1").addClass(xb1ys);
    var xb2ys = xb2>xzs ? "red" : (xb2<xzs ? "green" : "");$("#sxb2").addClass(xb2ys);
    var xb3ys = xb3>xzs ? "red" : (xb3<xzs ? "green" : "");$("#sxb3").addClass(xb3ys);
    var xb4ys = xb4>xzs ? "red" : (xb4<xzs ? "green" : "");$("#sxb4").addClass(xb4ys);
    var xb5ys = xb5>xzs ? "red" : (xb5<xzs ? "green" : "");$("#sxb5").addClass(xb5ys);
    var xs1ys = xs1>xzs ? "red" : (xs1<xzs ? "green" : "");$("#sxs1").addClass(xs1ys);
    var xs2ys = xs2>xzs ? "red" : (xs2<xzs ? "green" : "");$("#sxs2").addClass(xs2ys);
    var xs3ys = xs3>xzs ? "red" : (xs3<xzs ? "green" : "");$("#sxs3").addClass(xs3ys);
    var xs4ys = xs4>xzs ? "red" : (xs4<xzs ? "green" : "");$("#sxs4").addClass(xs4ys);
    var xs5ys = xs5>xzs ? "red" : (xs5<xzs ? "green" : "");$("#sxs5").addClass(xs5ys);

}
// 刷新卖出股票行情
$("#sreloadhq").click(function(){
    var code = $("#sbuycode").val();
    fetchHq(code);
    sGetHqBox(window._hqlist);
});
//价格验证
$("#sinprice").blur(function(){
    var sbuycode=$("#sbuycode").val(),sinprice = $('#sinprice').val(),scurprice = $('#sxxj').text(),sgaoprice = $('#sjiagez').text(),sdiprice = $('#sjiaged').text();
    if(sbuycode=='') return;
    if (!isNaN(sinprice)){
        if(scurprice!='停牌'){
            if(parseFloat(sinprice) > parseFloat(sgaoprice) || parseFloat(sinprice) < parseFloat(sdiprice)){alert("委托价格必须在"+sdiprice+"-"+sgaoprice+"之间！");$('#sinprice').val(scurprice);return;}
        }else{alert('该股票停盘！！！');$('#sinprice').focus();return;}
    }else{alert('请输入数字！');$("#sinprice").val(scurprice);return;}
});

//选择可卖出股票数量的几分之几
function ssetbuycount(id){
    var maxBuyStr = parseInt($('#smaxBuyAmount').text());
    if(id && maxBuyStr){
        var result = maxBuyStr/parseInt(id),res1=0;
        result = parseInt(result/100) * 100;//取整数
        res1 = result < 100 ? 100 : result;
        $('#sbuycount').val(res1);
    }
}
//卖出股票操作
$("#plansellbtn").click(function(){
    var stockcode = $("#sbuycode").val();
    var prize = $("#sinprice").val();
    var buycount = $("#sbuycount").val();
    //股票数验证
    var smaxbuynum = parseInt($('#smaxBuyAmount').text());
    if (sbuycount>0 && sbuycount > smaxbuynum) {alert("超出了您的可卖数量!");$("#sbuycount").val('');$("#sbuycount").focus();return;}
    var time = new Date().getTime();
    $.ajax({
        type: "POST",
        url: __HTTP_URI+"/index.php?mod=handler&ac=sell&_="+time,
        data: "stockcode="+stockcode+"&prize="+prize+"&buycount="+buycount,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                alert(response.info.message);
                 if(response.data.htype==1){
                    getCurrentCc(0);
                    jySwitch(0);
                }else{
                    transactDeal(1);
                    jySwitch(3);
                }  
            }else{
                alert(response.info.message);
            }
			RecountDown($('#plansellbtn'));
        },
		beforeSend: function(){
			countDown($('#plansellbtn'));
		}
    });
});
/******************************撤单操作**********************************/
//获取委托中的订单列表
function transactDeal(curpage){
    if( isNaN(curpage) ){
        var obj = curpage;
        var index = $(obj).index();//如果传入的不是当前页面就是当前点击的对象#获得对象位置
        curpage = 1;
    }
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=handler&ac=deal&curpage="+curpage+'&_='+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                var trhtml = '';
                if(response.data){
                    $.each(response.data,function(k,v){
						trhtml += '<tr class="tabbg" did="'+ v.did+'"  dealtypecode="'+ v.dealtypecode+'">';
						trhtml += '	<td>'+ v.did+'</td>';
						trhtml += '	<td><a target="_blank" href="http://stock.cf8.com.cn/'+ v.stockcode+'.shtml">'+ v.stockname+'('+v.stockcode+')</a></td>';
						trhtml += '	<td>'+ v.dealtype+'</td>';
						trhtml += '	<td>'+ v.dealprize+'</td>';
						trhtml += '	<td>'+ v.dealcount+'</td>';
						trhtml += '	<td>'+ v.dealstarttime+'</td>';
						trhtml += '	<td><a href="javascript:void(0);" onclick="cancelDeal(this);">撤单</a></td>';
						trhtml += '</tr>';
                    });
                    $("#dealtitle").html((trhtml!='' ? trhtml : '<tr class="tabbg"><td colspan="10">暂无可撤订单</td></tr>'));
                    var pager = ajaxPage(response.info.count,response.info.perpage,response.info.curpage,'transactDeal');//调用分页
                    $("#page_4").html(pager);
                    if(obj){
                        jySwitch(index);//调用切换
                    }
                }
            }
        }
    });
}
//撤单操作
function cancelDeal(e){
    var did = $(e).closest("tr").attr("did");
    var dealtypecode = $(e).closest("tr").attr("dealtypecode");
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+"/index.php?mod=handler&ac=dealcancel&did="+did+"&dealtypecode="+dealtypecode+'&_='+time,
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                alert('撤单成功');
                $(e).closest("tr").remove();
            }else{
                alert(response.info.message);
            }
        }
    });
}
/******************************普通网友初始化资金**********************************/
function resetMoney(e){
    var time = new Date().getTime();
    $.ajax({
        type: "GET",
        url: __HTTP_URI+'/index.php?mod=handler&ac=restmoney&_='+time,
        dataType: "json",
        success: function(response){
            art.dialog({id:'restmoney1'}).close();
            if(response.info.success==1){
                var message = '<p>您的资金已重置</p><p>此功能一个月只能申请一次！</p>';
                $("#rest-result").find('.message').html(message);
            }else{
                var message = '<p>暂时无法进行资金重置</p><p>'+response.info.message+'</p>';
                $("#rest-result").find('.message').html(message);
            }
            restresult();
        }
    });
}
//检查字数
function checkFontNumQm(e){
    $val = $.trim($(e).val()),
        len = $val.length;
    tempLen = 20;
    if(len > 20){
        $(e).val($val.substring(0,20));
        tempLen = 0;
    }else{
        tempLen = 20 - len;
    }
    $(e).parent().find("em").text(tempLen);
}

/**
 * 获取我的订阅列表
 * @param curpage
 */
function getMydyls(curpage){
    if(!curpage){curpage = 1;}
    $.ajax({
        type: "GET",
        url: __HTTP_URI+'/index.php?mod=public&ac=mydyls&curpage='+curpage+'&_='+new Date().getTime(),
        dataType: "json",
        success: function(response){
            if(response.info.success=='1'){
                var news = '';
                MakeHdHtml(response.data,'replace');
                var pager = ajaxPage(response.info.count,response.info.perpage,response.info.curpage,'getMydyls');//调用分页
                $("#page22").html(pager);
            }else{
                alert(response.info.message);
            }
        }
    });
}