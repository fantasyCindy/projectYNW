$(function(){
	var menucodeStrData = menuCodeStr.split(",");
	$('body a').each(function(i,item){
		if($(this).attr('menucode')){
			var index = menucodeStrData.indexOf($(this).attr('menucode'))
			if(index==-1){
				$(this).attr("style","display:none");
			}
		}
	})
	
})