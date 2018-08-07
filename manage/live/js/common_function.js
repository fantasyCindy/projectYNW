function authLogin(){
	var logined = false;
	$.ajax({  
       type : "post",  
       url : path+"/html/authLogin.htmlx",  
       async : false,  
       success : function(_backData){
       	 console.log("是否登录: " + _backData);
            if("1" == _backData){
            	logined =  true;
     		}else{
     			return false;
     		}
         }  
    }); 
	return logined;
}

function showTipsMsg(_content) {
	var index = layer.msg(_content);
	setTimeout(function() {
		layer.close(index);
	}, 2000);
}


function showErrMsg(_content) {
	layer.alert(_content, {
		title:"错误信息", 
	    icon: 2,
	    skin: 'layer-ext-moon'
	});
}
function showConfirmMsg(_content,confirmFun){
	var index = layer.confirm(_content, {
	    btn: ['确定','取消'] //按钮
	}, function(){
		layer.close(index);
		confirmFun();
	}, function(){
		layer.close(index);
	});
}



function privateLetter(){
	$("#private").click(function(event){
    	event.stopPropagation();
    	if(authLogin()){
    		$("#textarea_1").val("");
    		$("#divTop").slideToggle();
    	}else{
    		showErrMsg("用户未登录！");
    		return;
    	}
    });
    $(document).click(function(){
         $("#divTop").slideUp();
    })
    $('#divTop').click(function(){
         return false;
    });
}

function attentionTeacher(_teacherId,_obj){
	if(_teacherId == ""){
		showErrMsg("关注失败：老师Id为空!");
		return;
	}
	if(authLogin()){
		$.post(path+"/html/webuserTeacher/attention.htmlx",{teacherid:_teacherId},function(_backData){
			if("1" == _backData){
				showTipsMsg("已关注");
				$(_obj).html("已关注");
			}else if("-1"){
				showTipsMsg("已取消");
				$(_obj).html("+关注");
			}else{
				showErrMsg("关注失败!");
			}
		});
	}else{
		showErrMsg("用户未登录!");
		return;
	}
}

function attentionTeacher1(_teacherId,_obj){
	if(_teacherId == ""){
		showErrMsg("关注失败：老师Id为空!");
		return;
	}
	if(authLogin()){
		$.post(path+"/webuserTeacher/attention.htmlx",{teacherid:_teacherId},function(_backData){
			if("1" == _backData){
				showTipsMsg("已订阅");
				$(_obj).html("已订阅");
			}else if("-1"){
				showTipsMsg("已取消");
				$(_obj).html("+订阅跟踪");
			}else{
				showErrMsg("关注失败!");
			}
		});
	}
}


function getTeacherFans(_teacherId){
	$.get(path+"/html/queryTeacherFans.htmlx?teacherId="+_teacherId,function(_backData){
		$("#fansCountId").html(_backData);
	});
}

function sendLetter(_teacherId,_content){
	if(_teacherId == ""){
		showErrMsg("发送失败：老师Id为空!");
		return;
	}
	if(_content == ""){
		showErrMsg("私信内容不能为空！");
		return false;
	}
	if(authLogin()){
		$.post(path+"/html/letter/questionLetter.htmlx",{teacherid:_teacherId,content:_content.toString()},function(_backData){
			if("success" == _backData){
				showTipsMsg("提问成功!");
				$("#divTop").hide();
			}else{
				showErrMsg("提问失败!");
			}
		});
	}
}

function showLoading(_content){
	var index = layer.load(1, {
	    shade: [0.8, '#393D49'], 
	    content:"<span style='padding-left:40px;'>"+_content+"</span>"
	});
	return index;
}
function largerImage(_obj){
	layer.open({
	    type: 1,
	    title: false,
	    closeBtn: 0,
	    area: ['600px', '500px'],
	    skin: 'layui-layer-nobg', //没有背景色
	    shadeClose: true,
	    content: "<img style='width:100%;height:100%;' src='"+$(_obj).attr("src")+"' />"
	});
}
function isMobileAgent(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid||isiOS){
		return true;
	}
	return false;
}