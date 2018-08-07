if(document.getElementById('this_is_crmbj_crm'))
{
	var serverAddress = '';
	var loginpage_url = window.location.href;
	if(loginpage_url.indexOf('index.cm') != -1)
	{
		var	s_index = loginpage_url.indexOf('index.cm');
		serverAddress = loginpage_url.substring('http://'.length , s_index - 1);
	

		//如果有this_is_crmbj_crm这个域，表示是在CRM登录页面上，则执行以下逻辑：
		//发送进入登陆页的消息，以及服务器IP给backgroundjs
		chrome.runtime.sendMessage({msg:'loginpage',serverAddress : serverAddress});

		//首先替换掉form表单的提交地址。
		var formObj = document.getElementById('form1');
		var srcAction = formObj.action;
		formObj.action = 'javascript:void(0)';
		var _oldfun = document.getElementById('LoginImg').onclick;
		console.log("------------------------------------------");
		console.log(srcAction)
		
		//为登录按键以及密码框的回车事件添加方法。
		function onButtonPress()
		{
			//获取账号密码等信息，传递给backgroud.js进行websocket验证。
			var username = document.getElementById('j_username').value;
			var password = document.getElementById('j_password').value;
			var channelno = '';
			if(document.getElementById('channelno'))
				channelno = document.getElementById('channelno').value;
			var entLoginName = '';
			if(document.getElementById('entLoginName'))
				entLoginName = document.getElementById('entLoginName').value;

			if(!username || !password)
			{
				alert('用户名、密码必须填写！');
				return;
			}


			formObj.action = srcAction;
					formObj.submit();
					document.getElementById('LoginImg').onclick = _oldfun;

			chrome.runtime.sendMessage({username:username,password:password,channelno:channelno,entLoginName:entLoginName}, function(response) {
				if('3' == response){
					formObj.action = srcAction;
					formObj.submit();
					document.getElementById('LoginImg').onclick = _oldfun;
				}
			});
		}


		//为登录按键以及密码框的回车事件添加方法。
		document.getElementById('LoginImg').onclick = onButtonPress;
		$('#j_password').bind('keydown', function(e) {
			e = e ? e : (window.event ? window.event : null);
			if ($('#j_password').val())
				if (e.keyCode == 13) {
					onButtonPress();
				}
		});
	}
}

//监听来电信息，监听被挤下线的信息。
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if(request.phonenumber)
		{
			//alert('接收到一个来电信息，号码：' + request.phonenumber);
			var _openurl = null;
			if(request.openurl.indexOf('?') != -1)
				_openurl = request.openurl + '&ph=' + request.phonenumber;
			else
				_openurl = request.openurl + '?ph=' + request.phonenumber;
			window.open("http://" + _openurl);
		}else if(request.msg)
		{
			if("2" == request.msg.substring(0,1))
			{
				//如果有退出登录的A标签，则表示已经登录在系统中。
				if(document.getElementById('logoutAtagId'))
				{
					//TODO:被挤下线了，调用注销URL，退出系统。
					window.top.location =  "http://" + request.logouturl;
					alert(msg.substring(2,msg.length));
				}

			}
		}
});

