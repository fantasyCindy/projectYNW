<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ include file="/WEB-INF/jsp/manage/common/common.jspf"%>
<title>网站后台管理系统</title>

<link href="${path}/manage/bootstrap/css/bootstrap-overrides.css" rel="stylesheet">
<link href="${path}/manage/css/layout.css" rel="stylesheet">
<link href="${path}/manage/css/bootstrap.min.css" rel="stylesheet">
<link href="${path}/manage/css/font-awesome.min.css" rel="stylesheet">
<style type="text/css">
/*左侧菜单*/
.sidebar-menu {
	border-right: 1px solid #c4c8cb;
	overflow-y: auto;
  	overflow-x: hidden
}
/*一级菜单*/
.menu-first {
	height: 40px;
	line-height: 40px;
	background-color: #e9e9e9;
	border-top: 1px solid #efefef;
	border-bottom: 1px solid #e1e1e1;
	padding: 0;
	font-size: 16px;
	font-weight: normal;
	text-align: left;
	padding-left: 25px;
	/* font-family: '微软雅黑'; */
	color:#000000;
}
/*一级菜单鼠标划过状态*/
.menu-first:hover {
	text-decoration: none;
	background-color: #d6d4d5;
	border-top: 1px solid #b7b7b7;
	border-bottom: 1px solid #acacac;
}
/*二级菜单*/
.menu-second li a {
	height: 30px;
	line-height: 30px;
	border-top: 1px solid #efefef;
	border-bottom: 1px solid #efefef;
	font-size: 14px;
	text-align: left;
	color:#000000;
	/* font-family: '微软雅黑'; */
}
/*二级菜单鼠标划过样式*/
.menu-second li a:hover {
	text-decoration: none;
	background-color: #66c3ec;
	border-top: 1px solid #83ceed;
	border-bottom: 1px solid #83ceed;
	border-right: 3px solid #f8881c;
/* 	border-left: 3px solid #66c3ec; */
}
/*二级菜单选中状态*/
.menu-second-selected {
	background-color: #66c3ec;
	height: 31px;
	line-height: 31px;
	border-top: 1px solid #83ceed;
	border-bottom: 1px solid #83ceed;
	border-right: 3px solid #f8881c;
	border-left: 3px solid #66c3ec;
	text-align: center;
}
/*覆盖bootstrap的样式*/
.nav-list,.nav-list li a {
	padding: 0px;
	margin: 0px;
}

.navbar {
	margin-bottom: 0px;
}
.second-menu-temp{
	display:inline-block;
	width:40px;
}
.first-menu-active{
	color:red;
}
</style>
<script type="text/javascript">
	function logoutSys() {
		showConfirm("确定退出系统吗?", function() {
			window.location.href = "${path}/logout.do";
		}, "");
	}
</script>

</head>
<body>

	<!-- navbar -->
	<nav class="navbar navbar-inverse" style="border-radius:0px;">
		<div class="navbar-inner container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href="#" style="color: white;font-size:24px;">网站后台管理系统</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav navbar-right">
					<li style="margin-top: 13px;color:#FFFFFF;">欢迎你：${loginName }</li>
					<li><a href="javascript:;" onclick="logoutSys();" title="退出系统"><i class="fa fa-sign-out fa-mlg" style="font-size:21px;position: relative;top:3px;"></i></a></li>
				</ul>
			</div>s
		</div>
	</nav>
	<!-- end navbar -->


	<!-- sidebar -->
	<div id="sidebar-nav">
		<div class="sidebar-menu">
			<script type="text/javascript">
				var docHeight = $(window).height();
				$(".sidebar-menu").css("height",docHeight - 60 +"px");
			</script>
			<c:forEach var="parent" items="${menus}" varStatus="s">
				<a href="#_M${parent.menu_id }" onclick="javascript:;" class="nav-header menu-first <c:if test="${s.index != 0 }">collapsed</c:if>" data-toggle="collapse" style="text-decoration: none;<c:if test="${s.index == 0 }">color:#FFFFFF;background-color:#08c;</c:if>">
				<i class="${parent.iconcls == null or parent.iconcls == '' ?'glyphicon glyphicon-bookmark':parent.iconcls}"></i> ${parent.menuname}</a>
				<ul id="_M${parent.menu_id }" class="nav nav-list <c:if test="${s.index != 0 }">collapse</c:if> menu-second">
					<c:forEach items="${parent.children }" var="children">
						<li>
							<a href="javascript:;" onclick="changePageAndPointer('${children.menuurl}',this);" >
							<span class="second-menu-temp"></span>
							<i class="${children.iconcls == null or children.iconcls == '' ?'glyphicon glyphicon-bookmark':children.iconcls}"></i> ${children.menuname}</a>
						</li>
					</c:forEach>
				</ul>
			</c:forEach>
		</div>
	</div>
	<!-- end sidebar -->

	<!-- main container -->
	<div class="content">
		<iframe id="contentFrame" style="width: 100%;" scrolling='auto' frameborder='0' src=""></iframe>
	</div>
	<!-- end main container -->
	<!-- <div>
		<h4 style="text-align: center;">直播室</h4>
	</div> -->
	<script>
		$(function() {
			var _height = window.screen.availHeight - screenTop;
			var _frameHeight = _height - 170;
			$('#contentFrame').css('height', _frameHeight + "px");
		});

		function changePageAndPointer(_url, _target) {
			$(_target).parent().parent().prev().css("color","#FFFFFF").css("background-color","#08c");
			$(_target).parent().parent().prev().siblings().css("color","#000000").css("background-color","#e9e9e9");
			$(".sidebar-menu ul li a").css("color","#000000").css("background-color","#FFFFFF");
			$(_target).css("color","#FFFFFF").css("background-color","#08c");
			$('#contentFrame').attr('src', path + _url);
		}
		
		$(".sidebar-menu>a").bind("click",function(){
			$(this).css("color","#FFFFFF").css("background-color","#08c");
			$(this).siblings().css("color","#000000").css("background-color","#e9e9e9");
			$(".sidebar-menu ul li a").css("color","#000000").css("background-color","#FFFFFF");
		});
	</script>

</body>
</html>