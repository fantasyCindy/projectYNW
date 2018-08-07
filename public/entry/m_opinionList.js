var appendDom=(function(){
	var box;
	return{
		init:function(){
			box=$('#m-opinionList');
			var type=m.getUrlParam('type');
			var currentPage=parseInt(m.getUrlParam('currentPage'));
			var pageNumber = Math.ceil(+total / 10)
			var creat;
			if (currentPage==1) {
				creat=`<div id="bootpag"><a href="/mobile/m-opinionList.htm?type=${type}&pageSize=10&currentPage=${currentPage+1}">下一页</a></div>`;
			}
			if (currentPage== pageNumber) {
				creat=`<div id="bootpag"><a href="/mobile/m-opinionList.htm?type=${type}&pageSize=10&currentPage=${currentPage-1}">上一页</a></div>`;
			}
			if (currentPage > 1 && currentPage < pageNumber) {
				creat=`<div id="bootpag">
						<a href="/mobile/m-opinionList.htm?type=${type}&pageSize=10&currentPage=${currentPage-1}">上一页</a>
						<a href="/mobile/m-opinionList.htm?type=${type}&pageSize=10&currentPage=${currentPage+1}">下一页</a>
						</div>`;
			};
			box.append(creat);
		}
	}
})()

$(function(){
	appendDom.init();
})