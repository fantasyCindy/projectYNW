//H5问股
var getUrlParam = function(name){
    var reg= new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
    var r= window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}



var trend = require('m/askStock/trend_mobile.js') // 牛人看涨
var hot = require('m/askStock/hotStock_mobile.js') // 热问股票
var ranking = require('m/askStock/resolveRanking_mobile.js') //解答牛人



var tab = (function(){
	var container, items, children;

	return {
		init() {
			container = $('#tag');
			items = container.find('.tab');
			children = {
                ranking,
                hot,
                trend
            }

            container.on('click','.tab',function(){
            	var type = $(this).data('type');
                $(this).addClass('active').siblings().removeClass('active');
                _.forEach(children, item => item.hidden())
                children[type].render(); 
                return false;
            })
            container.find('.item').eq(getUrlParam('type')-1).trigger('click');
		}
	}
})()












$(function(){
	trend.init({ wrap: $('.up') })
	hot.init()
	ranking.init()
	tab.init()
})