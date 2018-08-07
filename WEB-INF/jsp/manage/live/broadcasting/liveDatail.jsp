<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>  	
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	
	<script type="text/javascript" src="${path }/manage/live/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="${path }/manage/live/ueditor/ueditor.all.min.js"> </script>
    <script type="text/javascript" src="${path }/manage/live/ueditor/ueditor.all.js"> </script>
    <script type="text/javascript" src="${path }/manage/live/ueditor/lang/zh-cn/zh-cn.js"></script>
    
    <link rel="stylesheet" href="${path}/manage/colorbox/colorbox.css" />
	<script src="${path}/manage/colorbox/jquery.colorbox-min.js"></script>
  
    <!-- 直播信息css -->
    <link href="${path}/manage/live/css/teacherLive.css" rel="stylesheet">
    <style>
    .interaction .tabBd p .big_pic{width:45%;height:50%;}
    </style>
  <script>
  	var _periodicalid ="${periodical.periodicalid }";
  	var page=1;
  	var page_inter=1;
  	var rows = 10;
  	var rows_inter = 10;
  	var hasMoreData = true;
  	var hasMoreData_inter = true;
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
	var nScrollHight_inter = 0; //滚动距离总长(注意不是滚动条的长度)
	var nScrollTop = 0; //滚动到的当前位置
	var pre_nScrollHight =0;
	var pre_nScrollHight_inter =0;
  	$(function(){
  		//加载直播信息
  		loadBroadCasting();
  		//加载网友交流
  		loadInteraction();
  		var nDivHight = $("#liveContainter").height();
	  	$("#liveContainter").scroll(function(){
	  		nScrollHight = $(this)[0].scrollHeight;
	  		nScrollTop = $(this)[0].scrollTop;
	  		//if(nScrollTop + nDivHight >= nScrollHight)
	  		//alert("滚动条到底部了");
  		});
	  	$("#interactionContainter").scroll(function(){
	  		nScrollHight_inter = $(this)[0].scrollHeight;
	  		//if(nScrollTop + nDivHight >= nScrollHight)
	  		//alert("滚动条到底部了");
  		});
	  	
  	});
  	
  	function loadBroadCasting(){
  		if(!hasMoreData){
  			return ;
  		}
  		$.post(path+"/broadcasting/getLiveList.do",{periodicalid:_periodicalid,page:page,rows:rows},function(_data){
  			page++;
  			eval("var _dataObject = "+_data);
  			var _total = _dataObject.total;
  			var _length = _dataObject.rows.length;
			if(page>1){
				if(!$("#loadmore")||$("#loadmore").length==0){
					$("#loadmore").remove();
				}
  			}
  			for(var i=0;i<_length;i++){
  				processOneLiveMsg(_dataObject.rows[i],false);
  			}
  			if(_total>_length&&page==2){
  				$("#liveContainter").prepend("<button style='margin-top:10px;' onclick='loadBroadCasting()' id='loadmore' class='btn btn-block btn-large btn-danger' type='button'><i class='fa fa-history'></i>加载更多</button>");
  				$("#liveContainter").scrollTop($("#liveContainter")[0].scrollHeight);
  			}
  			if(page==3){
  				pre_nScrollHight = nScrollHight;
  			}
  			if(_length == 0){
  				hasMoreData = false;
  				$("#loadmore").remove();
  			}else if(_length < rows){
  				hasMoreData = false;
  				$("#loadmore").remove();
  			}else{
  				hasMoreData = true;
  			}
  			if(!hasMoreData){
  				$("#liveContainter").scrollTop((pre_nScrollHight/rows)*_length);
  			}
  			if(hasMoreData&&page>2){
	  			$("#loadmore").remove();
  				if(!$("#loadmore")||$("#loadmore").length==0){
	  				$("#liveContainter").prepend("<button style='margin-top:10px;' onclick='loadBroadCasting()' id='loadmore' class='btn btn-block btn-large btn-danger' type='button'><i class='fa fa-history'></i>加载更多</button>");
	  				$("#liveContainter").scrollTop(pre_nScrollHight-250);
  				}
  			}
  		});
  	}
  	
  	function doAddBroadcasting(){
  		var _content = UE.getEditor('contentEditor').getContent();
  		if(!_content){
  			showMsg("请填写直播信息");
  			return ;
  		}
  		var _params = $('#formId').serialize();
  		var _p=ue.getContent();
  		var result = _p.replace(/(<img)\s+(?:class="big_pic")?(.+?(jpg"|png"))/g, '$1  $2 class="big_pic"');  		
  		$.post(path+"/broadcasting/addBroadcasting.do",{periodicalid:_periodicalid,content:result},function(_data){  			
  			eval("var _dataObject = "+_data);
  			if("1"==_dataObject.status){
  				showMsg("发布成功");				
  				processOneLiveMsg(_dataObject.content,true);
  				ue.setContent(""); 
  			}else{
  				showErr("发布失败");
  			}
  		});
  	}
  	function doAddInteraction(){
  		var _content = $("#interactionContent").val();
  		if(!_content.trim()){
  			showMsg("请填写交流信息");
  			return ;
  		}
  		$.post(path+"/interaction/pubInteraction.htmlx",{periodicalid:_periodicalid,content:_content},function(_data){
  			eval("var _dataObject = "+_data);
  			if("1"==_dataObject.status){
  				showMsg("发布成功");
  				processOneInteractionMsg(_dataObject.content,true);
				$("#interactionContent").val("");
  			}else{
  				showErr(_dataObject.content);
  			}
  		});
  	}
  	//加载网友交流
  	function loadInteraction(){
  		if(!hasMoreData_inter){
  			return ;
  		}
  		$.post(path+"/interaction/list.do",{periodicalid:_periodicalid,page:page_inter,rows:rows_inter},function(_data){
  			page_inter++;
  			eval("var _dataObject = "+_data);
  			var _total = _dataObject.total;
  			var _length = _dataObject.rows.length;
			if(page>1){
				if(!$("#loadmore_inter")||$("#loadmore_inter").length==0){
					$("#loadmore_inter").remove();
				}
  			}
  			for(var i=0;i<_length;i++){
  				processOneInteractionMsg(_dataObject.rows[i],false);
  			}
  			if(_total>_length&&page==2){
  				$("#interactionContainter").prepend("<button style='margin-top:10px;' onclick='loadInteraction()' id='loadmore_inter' class='btn btn-block btn-large btn-danger' type='button'><i class='fa fa-history'></i>加载更多</button>");
  				$("#interactionContainter").scrollTop($("#interactionContainter")[0].scrollHeight);
  			}
  			if(page_inter==3){
  				pre_nScrollHight_inter = nScrollHight_inter;
  			}
  			if(_length == 0){
  				hasMoreData_inter = false;
  				$("#loadmore_inter").remove();
  			}else if(_length < rows){
  				hasMoreData_inter = false;
  				$("#loadmore_inter").remove();
  			}else{
  				hasMoreData_inter = true;
  			}
  			if(!hasMoreData_inter){
  				$("#interactionContainter").scrollTop((pre_nScrollHight_inter/rows_inter)*_length);
  			}
  			if(hasMoreData_inter&&page_inter>2){
	  			$("#loadmore_inter").remove();
  				if(!$("#loadmore_inter")||$("#loadmore_inter").length==0){
	  				$("#interactionContainter").prepend("<button style='margin-top:10px;' onclick='loadInteraction()' id='loadmore_inter' class='btn btn-block btn-large btn-danger' type='button'><i class='fa fa-history'></i>加载更多</button>");
	  				$("#interactionContainter").scrollTop(pre_nScrollHight_inter-250);
  				}
  			}
  		});
  	}
  	
	 //获取直播形式
	 function processOneLiveMsg(_Broadcasting,_type)
	 {
	 	if(!_Broadcasting)
	 		return '';
	 	var str;
	 	str = "<ul id='bid_"+_Broadcasting.id+"'><li>";
	 	str += "<div class='subimg'>";
	 	str += "<img width='61' src='${path}\\"+_Broadcasting.teacherPhoto+"' style='cursor: pointer;'>";
	 	str += "</div><dl><dt><span>";
	 	str += "<strong>"+_Broadcasting.teacherName+"</strong>";
	 	str += "</span>";
	 	str += "<span> "+_Broadcasting.pubtimeString+"</span>";
	 	str += "</dt><dd>";
	 	str += "<p class='conts mt'>";
	 	str += "<strong>"+_Broadcasting.content+"</strong>";
	 	str += "</p>";
	 	var _broadNoteList = _Broadcasting.broadNoteList;
	 	if(_broadNoteList!=null){
	 		for(var j=0;j<_broadNoteList.length;j++){
	 			str += "<div><span style='color: red;'>【纸条问题】</span><span style='color : #00579a;'>"+_broadNoteList[j].questionusernameStr+"：</span>"+_broadNoteList[j].questioncontent+"</div>";
	 			if(_broadNoteList[j].answerusername!=null){
	 				
	 				str += "<div><span style='color: red;'>【纸条回答】</span><span style='color : #00579a;'>"+_broadNoteList[j].answerusername+"：</span>"+_broadNoteList[j].answercontent+"</div>";
	 			}
	 		}
	 	}
	 	str += "</dd></dl></li></ul>";
	 	if(_type){
		 	$("#liveContainter").append(str);
		 	$("#liveContainter").scrollTop($("#liveContainter")[0].scrollHeight);
	 	}else{
		 	$("#liveContainter").prepend(str);
	 	}
	 }
	 
	//获取网友交流形式
	 function processOneInteractionMsg(_obj,_type)
	 {
	 	if(!_obj)
	 		return '';
	 	var str;
	 	str = "<ul id='bid_"+_obj.id+"'><li>";
	 	str += "<div class='subimg'>";
	 	str += "<img width='61' src='${path}\\"+_obj.photoImg+"' style='cursor: pointer;'>";
	 	str += "</div><dl><dt><span>";
	 	str += "<strong>"+_obj.nickName == null ? "" : _obj.nickName+"</strong>";
	 	str += "</span>";
	 	str += "<span> "+_obj.ctimeString+"</span>";
	 	str += "</dt><dd>";
	 	str += "<p class='conts mt'>";
	 	str += "<strong>"+_obj.content+"</strong>";
	 	str += "</p>";
	 	str += "</dd></dl></li></ul>";
	 	if(_type){
		 	$("#interactionContainter").append(str);
		 	$("#interactionContainter").scrollTop($("#interactionContainter")[0].scrollHeight);
	 	}else{
		 	$("#interactionContainter").prepend(str);
	 	}
	 }

	 
	   function _openBigImg(_bigImgurl) {
		$.colorbox({
			href : _bigImgurl,
			iframe : true,
			height : "80%",
			width : "90%",
			speed : 200
		});
	}
	
		$(function(){
  		$(".list").on('click','img', function(i){
               var src = $(this).attr("src");
               _openBigImg(src);
         }); 
  		
  	});
	 
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
	       <div class="container-fluid">
				<div class="row-fluid">
					<div class="span8">
						<div class="alert alert-danger">
							<h4>
								今日主题:${periodical.todaysubject }
								<c:if test="${dir=='def' }">
									<a style="float: right;" class='btn btn-info btn-xs' href='${path }//broadcasting_periodical/index.do'><i class='fa fa-history'></i> 返回</a>
								</c:if>
								<c:if test="${dir!='def' }">
									<a style="float: right;" class='btn btn-info btn-xs' href='${path }/broadcasting/myRoom.htmlx'><i class='fa fa-history'></i> 查看历史</a>
								</c:if>
								<span style="float: right;">参加人数(${periodical.membercount })</span>
							</h4> 
							<h4>
								<span>今日公告:${periodical.announcement }
								<span style="float: right;">开播时间:${periodical.broadcastingTime }</span>
							</h4>
						</div>
					</div>
					<div class="span4">
					</div>
				</div>
			</div>
	   	   <div class="row">
	   	   		<div class="col-lg-8">
	   	   			<div class="col-lg-12">
	   	   				<div class="interaction">	
	   	   					<div class="tabBd">
			   	   				<div class="list" id="liveContainter" style="width: 100%;
			   	   				<c:if test="${isHistory != true }">
			   	   				height: 400px;
			   	   				</c:if>
			   	   				<c:if test="${isHistory == true }">
			   	   				height: 680px;
			   	   				</c:if>
			   	   				border:1px solid #F00; overflow:auto;">
			   	   					
			   	   				</div>
	   	   					</div>
	   	   					
	   	   				</div>
					</div>
					<c:if test="${isHistory != true }">
						<div class="col-lg-12">
							<form class="form-inline" id="formId">
								<input type="hidden" name="periodicalid" value="${periodical.periodicalid }">
			   	   				<textarea id="contentEditor" name="content" style="width: 100%;height: 200px; border: 1px solid;resize: none;">
			   	   				
			   	   				</textarea>
		   	   				</form>
		   	   				<div style="text-align: center; margin-top: 10px;">
		   	   					<a href="javascript:;" class="btn btn-success" onclick="doAddBroadcasting();"><i class="fa fa-send fa-lg"></i> 发送</a>
					 	    </div>
						</div>
					</c:if>
				</div><!-- /.col-lg-6 -->
				
				<div class="col-lg-4">
					<div class="col-lg-12">
						<div class="interaction">	
	   	   					<div class="tabBd">
			   	   				<div class="list" id="interactionContainter" style="width: 100%;
			   	   				<c:if test="${isHistory != true }">
			   	   				height: 480px;
			   	   				</c:if>
			   	   				<c:if test="${isHistory == true }">
			   	   				height: 680px;
			   	   				</c:if>
			   	   				border:1px solid #F00; overflow:auto;">
	   	   					
	   	   						</div>
	   	   					</div>
	   	   				</div>
					</div>
					<c:if test="${isHistory != true }">
						<div class="col-lg-12">
							<div>
								<span style="font-weight: bold;">与网友互动:</span>
							</div>
		   	   				<textarea id="interactionContent" style="width: 100%;height: 200px;resize: none;"></textarea>
		   	   				<div style="text-align: center; margin-top: 10px;">
		   	   					<a href="javascript:;" class="btn btn-success" onclick="doAddInteraction();"><i class="fa fa-send fa-lg"></i> 发送</a>
					 	    </div>
						</div>
					</c:if>
				</div><!-- /.col-lg-6 -->
	       </div>
       
   </div>  
   
   <script type="text/javascript">
   		window.UEDITOR_HOME_URL = "${path}/manage/live/ueditor/";
   		var ue = UE.getEditor('contentEditor',{
   			scaleEnabled:true,
   			elementPathEnabled:false,
   			enableAutoSave:true,
   			toolbars: [[
   			            'fullscreen', 'source', '|', 'undo', 'redo', '|',
   			            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
   			            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
   			            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
   			            'directionalityltr', 'directionalityrtl', 'indent', '|',
   			            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
   			            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
   			            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'attachment', 'webapp', 'pagebreak', 'template', 'background', '|',
   			            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
   			            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
   			            
   			        ]]
   			});
   </script>
    
  </body>
</html>
