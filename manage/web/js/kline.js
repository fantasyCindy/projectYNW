/*说明

[时间, 前收价, 开盘价,最高价,最低价,收盘价,当日成交量, 当日成交额, __, __, __];

*/
var kline = new Array();
$.ajax({  
   type : "get",  
   url : path+"/getStockInfoByCodeinser.htm?stockcode="+stockcode,
   async : false,  
   success : function(_backData){
   		eval("var _backData = "+_backData);
   		for(var key in _backData){
   			var obj2 = _backData[key];
   			obj2 = obj2.split(",");
   			return ;
   			kline.push(obj2);
   		}
     }  
});
