<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
	<script type="text/javascript" src="${path }/live/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="${path }/live/ueditor/ueditor.all.min.js"> </script>
    <script type="text/javascript" src="${path }/live/ueditor/lang/zh-cn/zh-cn.js"></script>
  </head>
 
  <body>
	<div class="container-fluid maincontent">
		<div style="height: 50px;padding-top: 5px;">
		<select class="form-control" style="border:1px solid #0088cc" id="periodSelectId">
			<option value="-1">--请选择--</option>
			<c:forEach items="${periodList }" var="itemObj">
				<c:if test="${itemObj.checked == 1}">
					<option value="${itemObj.id }" selected="selected">${itemObj.name }</option>
				</c:if>
				<c:if test="${itemObj.checked != 1}">
					<option value="${itemObj.id }">${itemObj.name }</option>
				</c:if>
			</c:forEach>
		</select>
		</div>
		<div id="content" style="border:1px solid #0088cc;overflow-y: auto;padding: 5px;border-radius: 5px;">
			<script type="text/javascript">
				var docHeight = $(document).height();
				$("#content").css("height",docHeight - 380+"px");
			</script>
			<c:forEach items="${liveInfoList }" var="itemObj">
				<div style='font-size:16px;font-weight:bold;'>${itemObj.pubtimeStr }</div>
				<span>${itemObj.content }</span>
			</c:forEach>
		</div>
		<script type="text/javascript">
			document.getElementById("content").scrollTop = document.getElementById("content").scrollHeight;
		</script>
		<div>
			<form id="contentForm">
				<input type="hidden" name="vipperiodicalid" id="hiddenVipperiodicalid" value="${vipperiodicalId }">
				 <textarea id="contentEditor" name="content" style="width:100%;min-height:200px;"></textarea>
				 <script type="text/javascript">
					UE.getEditor('contentEditor',{
			   			scaleEnabled:true
			   			});
				 </script>
			</form>
			
		</div>
		
		<div style="text-align: center;margin-top: 5px;">
		   <a href="javascript:;" class="btn btn-success" onclick="submitData();"><i class="fa fa-send fa-lg"></i> 发送</a>
		</div>
		<script type="text/javascript">
			var _currentPage = 2;
			var _pageSize = 20;
			var _hasMorData = true;
			$("#periodSelectId").bind("change",function(){
				var selectedId = $(this).val();
				if(-1 == selectedId){
					return;
				}
				_currentPage = 1;
				$("#hiddenVipperiodicalid").val(selectedId);
				$("#content").html("");
				_hasMorData = true;
				loadLiveListData(false);
			});
			
			
			function loadLiveListData(isScrollLoad){
				if(!_hasMorData){
					return;
				}
				_hasMorData = false;
				if(isScrollLoad){
					$("#content").prepend("<div id='loading' style='margin:0 auto;text-align:center;'><h5>加载中，请稍后...</h5><div>");
					$("#loadMore").remove();
					$("#noData").remove();
				}
				var _vipperiodicalId = $("#hiddenVipperiodicalid").val();
				$.get("${path}/vipLive/list.htmlx?vipperiodicalId="+_vipperiodicalId+"&currentPage="+_currentPage+"&pageSize="+_pageSize+"",function(_backData){
					_currentPage ++;
					fillLiveListData(_backData,isScrollLoad);
				},"json");
			}
			
			function fillLiveListData(_objArr,isScrollLoad){
				var html = "";
				for(var i = 0;i < _objArr.length;i++){
					html += "<div style='font-size:16px;font-weight:bold;'>"+_objArr[i].pubtime+"</div>";
					html += "<span>"+_objArr[i].content+"</span>";
				}
				if(isScrollLoad){
					$("#loading").remove();
					$("#loadMore").remove();
					$("#noData").remove();
					$("#content").prepend(html);
					document.getElementById("content").scrollTop = document.getElementById("content").scrollHeight - (document.getElementById("content").scrollHeight - 30);
					if(_objArr.length < _pageSize){
						_hasMorData = false;
						$("#content").prepend("<div id='noData' style='margin:0 auto;text-align:center;'><h5>没有更多了...</h5><div>");
					}else{
						$("#content").prepend("<div id='loadMore' style='margin:0 auto;text-align:center;'><h5>向上滚动，加载更多</h5><div>");
						_hasMorData = true;
					}
				}else{
					_hasMorData = true;
					$("#content").append(html);
					document.getElementById("content").scrollTop = document.getElementById("content").scrollHeight;
				}
			}
			
			$("#content").scroll(function(){
				var scrollTop = $(this).scrollTop();
	            if (scrollTop - 50 <= 0) {
	            	if(_hasMorData){
	            		loadLiveListData(true);
	            	}
	            	
	            }
			});
			
			 	
			function submitData(){
				var contentVal = UE.getEditor('contentEditor').getContent();
				  if(!contentVal){
					  showOnlyErr("请填写要发送的内容！");
					  return;
				  }
				 var _params = $('#contentForm').serialize();
				  $.post("${path}/vipLive/save.htmlx",_params,function(_backData){
			   	  		eval("var dataObj = "+_backData);
			   	  		if(dataObj.status == 1){
			   	  			showOnlyMsg("发送成功");
			   	  			var _dataArr = new Array();
			   	  			_dataArr.push(dataObj.data);
			   	  			fillLiveListData(_dataArr);
				   	  		UE.getEditor('contentEditor').setContent("");
			   	  		}else{
			   	  			showOnlyErr("发送失败!");
			   	  		}
			   	  });
			}
			
		</script>
  	</div>	
  </body>
</html>	