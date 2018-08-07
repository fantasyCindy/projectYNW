<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head>
	<link rel="stylesheet" href="${path}/web/css/modifyTheme.css">
</head>
<body>
<div id="contentart_theme">
	<div id="modifyTheme">
		<span class="close"><i class="fa fa-close"></i></span>
		<div class="my-body">
			<div class="md-titlebar">修改直播主题</div>
			<div class="md-content">
				<input type="text" value="" id="periodical_id" style="display:none">
				<textarea id="TextAreaT" rows="2" cols="25" maxlength="25" style="border: 1px solid #c7c7c7;" title="实战交易，拒绝忽悠，免费送牛股" value="实战交易，拒绝忽悠，免费送牛股" placeholder="实战交易，拒绝忽悠，免费送牛股"></textarea>
				<p><span><span class="note">(25个字以内)</span><a class="yn-button" id="st-title" onclick="javascript:saveTheme()">发布</a></span></p>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
		$(function(){
			$('#application').click(function(){
				loginart()
			})
		})
        function modifyTheme(periodicalid){
			$("#periodical_id").val(periodicalid);
	        var $box = $('#modifyTheme');
	            $('#contentart_theme').css("display","block");
		        $box.css({
		        	"left": ($(window).width() - $box.width()) / 2-20 +"px",
		            "top": ($(window).height() - $box.height()) / 2 +"px"
		        });
		        console.log($box.height())
		        
		        $(".close").click(function(){
		        	$('#contentart_theme').css("display","none");
		        })
	    }
		//保存修改
		function saveTheme(){
			var periodicalid = $("#periodical_id").val();
			var todaysubject = $("#TextAreaT").val();
			if(todaysubject == ''){
				showErrMsg("主题内容不能为空");
				return;
			}
			var url = path + "/teacher/html/editPeriodical.htmlx";
			$.post(url,{periodicalid:periodicalid,todaysubject:todaysubject},function(data){
				if(data == "success"){
					showTipsMsg("修改成功");
					$('#contentart_theme').css("display","none");
					showMyLive();
				}
			});
		}
	</script>
</body>
</html>