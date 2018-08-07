var intervalCount;
var loginTimeout;
function showLoginTip(content) {
	layer.open({
				style : "background-color:#fff; border:none;width:90%;text-align:center;color:#666;font-size:18px",
				content : "<div>"+content+"<br><span style='font-size:10px'><span id='count'>5</span>秒后自动进入登录页</span></div>",
				btn : [ "进入登录页" ],
				yes : function(index) {
					layer.close(index);
					redirectLogin();
				},
				end : function() {
					clearInterval(intervalCount);
					clearTimeout(loginTimeout);
				}
			});
	intervalCount = setInterval("calcRedirectCount('count');", 1000);
	loginTimeout = setTimeout("redirectLogin();", 5000);
}
function calcRedirectCount(countId) {
	var count = $("#" + countId).text();
	if (count > 0) {
		count--;
		$("#" + countId).text(count);
	} else {
		$("#" + countId).text(count);
		clearInterval(intervalCount);
	}
}
function redirectLogin() {
	window.location.href = path + "/login.htm";
}

function authLogin(){
		var logined = false;
		$.ajax({  
	       type : "get",  
	       url : path+"/web/validLogin.htm",
	       async : false,  
	       success : function(_backData){ 
	            if("1" == _backData){
	            	logined =  true;
	     		}else{
	     			logined = false;
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

function attentionTeacher(_teacherId){
	if(_teacherId == ""){
		showErrMsg("关注失败：老师Id为空!");
		return;
	}
	if(authLogin()){
		$.post("/webuserTeacher/attention.htmlx",{teacherid:_teacherId},function(_backData){
			if(path+"1" == _backData){
				showTipsMsg("已关注");
			}else{
				showTipsMsg("已取消");
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
		$.post(path+"/letter/questionLetter.htmlx",{teacherid:_teacherId,content:_content},function(_backData){
			if("success" == _backData){
				showTipsMsg("提问成功!");
			}else{
				showErrMsg("提问失败!");
			}
		});
	}
}