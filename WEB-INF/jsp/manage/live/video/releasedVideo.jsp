<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
	<link href="${path}/live/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/live/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/live/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path }/live/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="${path }/live/ueditor/ueditor.all.min.js"> </script>
    <script type="text/javascript" src="${path }/live/ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" src="${path }/live/js/ajaxfileupload.js"></script>
     <script type="text/javascript" src="${path }/live/ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" src="${path }/live/js/ajaxfileupload.js"></script>
    <script src="${path }/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<link href="${path}/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<style type="text/css">
		.layui-layer-loading .layui-layer-loading1 {
			width: 250px;
			height: 37px;
			color: #FFFFFF;
			line-height:37px;
			background: url('${path}/plugins/layer/default/loading-1.gif') no-repeat;
			}
	</style>
  <script>
  	 $(function(){
  		$('#contentTable').bootstrapTable({
  		  	method: 'POST',
          	height:tableHeight,
          	cache: false,
            url: path + '/video/ReleasedList.htmlx',
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [50,100,150,200,500],
            contentType: "application/x-www-form-urlencoded",
            sidePagination: "server", //服务端请求
            search: false,
            showRefresh: false,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
	    	  	params.startTime = $("#queryBeginTime").val();
          		params.endTime = $("#queryEndTime").val();
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;
            	var queryTitle = $("#queryTitle").val();
            	var queryAlbum = $("#queryAlbumSelect").val();
            	params.title = queryTitle;
            	params.albumId = queryAlbum;
            	return params;
            },rowAttributes:function(row,index){
	   	    	  row.customOrder = index + 1;
	   	    	  return row;
	   	      },
		     columns: [{
		          field: 'customOrder',
		          title: '序号'
		     },
            {
                field: 'title',
                title: '标题'
            },{
                field: 'teacherName',
                title: '创建人'
            },{
                field: 'typeName',
                title: '视频类型'
            },{
                field: 'albumTitle',
                title: '所属专辑'
            },{
                field: 'album_course_sort',
                title: '专辑课程排序'
            },{
                field: 'comment_count',
                title: '评论数'
            },{
                field: 'zan_count',
                title: '点赞数'
            }, {
                field: 'create_time',
                title: '发布时间'
            }, {
                field: 'video_id',
                title: '操作',
                formatter:operatorFormatter
            }]
        });
  		$("#queryBeginTime").datetimepicker({  
       	  locale:"zh-cn",
       	 format:"YYYY-MM-DD HH:mm"
       });
		$("#queryEndTime").datetimepicker({  
     	  locale:"zh-cn",
     	  format:"YYYY-MM-DD HH:mm"
     	});
  		
  		loadCountData();
  		loadVideoTypeSelect(null);
  		loadQueryAlbumSelect();
  		loadVideoAlbumSelect();
  	});
  	 
  	 function loadVideoTypeSelect(_typeId){
 	   $.get(path + '/html/typeSelect.htmlx',function(_backData){
 		   eval("var types = " + _backData);
 		   if(types && types.length > 0) {
 			   for(var i = 0;i<types.length;i++){
 				   var type = types[i];
 				   var type_id = type.type_id;
 				   if(type_id == _typeId){
 					   $('#video_typeSelect').append('<option value="'+type_id+'" selected="selected">'+type.name+'</option>');
 				   }else{
 					   $('#video_typeSelect').append('<option value="'+type_id+'">'+type.name+'</option>');
 				   } 
 			   }
 		   }
 	   });   
  	 }
  	 
 	function loadQueryAlbumSelect(){
   	   $.get(path + '/html/albumSelect.htmlx',function(_backData){
   		  $('#queryAlbumSelect').append("<option value=''>--所有--</option>");
   		   eval("var albums = " + _backData);
   		   if(albums && albums.length > 0) {
   			   for(var i = 0;i<albums.length;i++){
   				   var album = albums[i];
   				   var album_id = album.album_id;
   				   var title = album.title;
   				   $('#queryAlbumSelect').append('<option value="'+album_id+'">'+title+'</option>');
   			   }
   		   }
   	   });   
    	 }
  	 
  	 function loadVideoAlbumSelect(){
   	   $.get(path + '/html/albumSelect.htmlx',function(_backData){
   			$('#album_idSelect').append("<option value='-1'>--无--</option>");
   		   eval("var albums = " + _backData);
   		   if(albums && albums.length > 0) {
   			   for(var i = 0;i<albums.length;i++){
   				   var album = albums[i];
   				   var album_id = album.album_id;
   				   var title = album.title;
				   $('#album_idSelect').append('<option value="'+album_id+'">'+title+'</option>');
   			   }
   		   }
   	   });   
    	 }
  	 
  	 function loadCountData(){
  		$.get(path+"/video/countData.htmlx",function(_backData){
  			if("-1" == _backData){
  				 $("#releasedVideoCount").val("获取数据失败!");
  			   	 $("#releasedVideoLookCount").val("获取数据失败!");
  			}else{
  				eval("var data = "+_backData);
  			   	 $("#releasedVideoCount").val(data.releasedVideoCount);
  			   	 $("#releasedVideoLookCount").val(data.releasedVideoLookCount);
  			}
  		});
  	 }
  	
  	 function operatorFormatter(value,row){
  		 var detailHtml = "";
  		 if(row.album_id == -1){
  			detailHtml = "<a class='btn btn-info btn-xs' href='${path}/video/detail.htm?video&videoId="+row.video_id+"' target='_blank'><i class='fa fa-align-justify'></i> 详情 </a>";
  		 }else{
  			detailHtml = "<a class='btn btn-info btn-xs' href='${path}/video/detail.htm?video&videoId="+row.video_id+"&flag=1' ><i class='fa fa-align-justify'></i> 详情 </a>";
  		 }
  		 //var updateHtml = "<a class='btn btn-info btn-xs' href='javascript:;' onclick='editModal("+value+");'><i class='fa fa-edit'></i> 修改 </a>";
  		 var deleteHtml = "&nbsp;<a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteData("+value+");'><i class='fa fa-trash-o'></i> 删除 </a>";
  		return detailHtml+deleteHtml;
  	 }
  	 
  	function editModal(dataId){
    	$('#formId')[0].reset();
    	$.get(path+"/video/queryById.htmlx?queryId="+dataId,function(_backData){
    		if("-1" == _backData){
    			showOnlyErr("编辑失败，请重试!");
    		}else{
    			eval("var data = " +_backData);
        		$("#video_id").val(data.video_id);
        		$("#titleInput").val(data.title);
        		$("#hiddenImage").val(data.image);
        		$("#video_srcInput").val(data.video_src);
        		$("#video_typeSelect").val(data.video_type);
        		$("#hiddenVideo_url").val(data.video_url);
        		$("#album_idSelect").val(data.album_id);
        		$("#album_course_sortInput").val(data.album_course_sort);
        		if(data.image != null && data.image != ""){
        			$("#imagehow").attr("src","${path}\\"+data.image);
        		}
        		if(data.video_url != null && data.video_url != ""){
        			$("#showVideo").css("width","70%");
        			$("#showVideo").attr("src","${path}\\"+data.video_url);
        		}
        		//UE.getEditor('contentEditor').setContent(data.content);
        		$('#addEditModal').find('.showErrInfoP').hide();
            	$('#addEditModal').modal('show');
    		}
    	});
    }
  	 
  	function reflushDataTable(){
  		loadCountData();
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
    function openAddEditModal(_addEditType){
    	$('#formId')[0].reset();
    	$("#imagehow").attr("src","");
    	$("#showVideo").attr("src","");
    	$("#showVideo").css("width","0px");
    	//UE.getEditor('contentEditor').setContent("");
    	if('edit' == _addEditType){
    		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
		    if(rowDatas.length == 0 ){
			   showMsg('请选择要修改的数据！');
			   return;
		    }
		    
		    if(rowDatas.length > 1 ){
			   showErr('修改只能选择一条数据！');
			   return;
		    }
		    loadData4Form($('#formId'),rowDatas[0]);
    	}
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增视频');
    	}else{
    		$('#formId fieldset legend').html('修改视频');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(type){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
      var titleVal = $('#titleInput').val();
	  if(!titleVal){
		  $('#titleInput').tooltip('show');	
		  return;
	  }
	  var video_srcVal = $("#video_srcInput").val();
	  var video_urlVal = $("#hiddenVideo_url").val();
	  if(!video_srcVal && !video_urlVal){
		  showOnlyErr("视频地址和上传视频不能都为空，请选择一种方式添加视频！");
		  return;
	  }
	  if("save" == type){
		  $("#is_draftHidden").val(1);
	  }
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/video/addEdit.htmlx';
   	  if('add' != _doAddEditType){
	    _backSuccessMsg = '修改成功！';
	    _backFaildMsg = '修改失败！';
	  }
   	  $.post(path + _postUrl,_params,function(_backData){
   	  		if("success" == _backData){
   	  			parent.closeProcessWin();
   	  			reflushDataTable();
   	  			showMsg(_backSuccessMsg);
   	  		} else {
	   	  		   parent.closeProcessWin(function(){
	   	  			$('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditModal').find('.showErrInfoP').show();
		   	  		$('#addEditModal').modal('show');
   	  			});
   	  		}
   	  });
    	
    }
    
    
    
   function deleteData(_videoId){
	   showConfirm('确认要删除吗？',
		function(){
		   $.post(path + '/video/delete.htmlx',{videoId:_videoId.toString()},function(_backData){
			   if("success" == _backData){
				    showOnlyMsg('删除成功！');
	   	  			reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);	
		   });
	    }, function(){});
	     
   }
   
	function uploadImage() {
	   var validSuccess = validateImgFile("imageInput");
	   if(validSuccess){
		   var index = showLoading("图片文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/video/uploadImg.htmlx",  
	        secureuri : false,  
	        fileElementId : 'imageInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {
	        	layer.close(index);
	        	if("-1" == _backData){
	        		showOnlyErr("上传图片失败!");
	        	}else{
	        		if("success" == _backData.flag){
	        			showOnlyMsg("上传图片成功!");
		           		$("#hiddenImage").val(_backData.returnPath); 
		           	    $("#imagehow").attr("src","${path}\\"+_backData.returnPath);
		           	}else{
		           		showOnlyErr("上传图片失败!");
		           	}
	        	}
	        },  
	        error : function(data, status, e) {
	        	layer.close(index);
	        	showOnlyErr("上传图片失败："+e);
	       }  
	     });  
	   }
	}  
   
	function uploadVideo() {
	   var validSuccess = validateVideoFile("videoFileInput");
	   if(validSuccess){
		   var index = showLoading("视频文件正在上传中,请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/video/uploadVideo.htmlx",  
	        secureuri : false,  
	        fileElementId : 'videoFileInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {  
	        	layer.close(index);
	        	if("-1" == _backData){
	        		showOnlyErr("上传视频失败!");
	        	}else{
	        		if("success" == _backData.flag){
	        			showOnlyMsg("上传视频成功!");
		           		$("#hiddenVideo_url").val(_backData.returnPath); 
		           		$("#showVideo").css("width","70%");
		           	    $("#showVideo").attr("src","${path}\\"+_backData.returnPath);
		           	}else{
		           		showOnlyErr("上传视频失败!");
		           	}
	        	}
	        },  
	        error : function(data, status, e) { 
	        	layer.close(index);
	        	showOnlyErr("上传视频失败："+e);
	          }  
	     });  
	   }
	}  
	function clearquery(){
		 $("#queryForm")[0].reset();
		 reflushDataTable();
	 }
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
	       	<form class="form-inline" id="queryForm">
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>标题：</label>
				   	 <input type="text" class="form-control" id="queryTitle" placeholder="输入标题进行搜索">
				 </div>
				 
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>所属专辑：</label>
				   	 <select class="form-control" id="queryAlbumSelect">
      				</select>
				 </div>
		       <div class="form-group form-group-padding"
					style="padding-left: 5px;position: relative;">
					<label for="search_name">开始时间</label> <input type=text
						class="form-control" id="queryBeginTime" >
				</div>
				<div class="form-group form-group-padding"
					style="padding-left: 5px;position: relative;">
					<label for="search_name">结束时间</label> <input type="text"
						class="form-control" id="queryEndTime" >
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-info" onclick="reflushDataTable();">
			              <i class="fa fa-search fa-lg"></i> 查询
			         </button>
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-primary" onclick="clearquery();">
			              <i class="fa fa-search fa-lg"></i> 清空
			         </button>
				</div>
	      	</form>
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>
  
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
       
       		<div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="formId">
			            <input type="text" name="video_id" id="video_id" style="display:none;" />
			            <input type="text" id="addEditTypeId" style="display:none;"/>
			            <input type="text" id="is_draftHidden" name="is_draft" value="0" style="display:none;"/>
					    <fieldset>
					      <legend>新增视频</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;margin-top: 0px;margin-bottom: 0px;"></h4>
					      <div class="form-group">
						    <label for="titleInput">标题：</label>
						    <input type="text" class="form-control" name="title" id="titleInput" placeholder="请输入标题" size="50" data-toggle="tooltip" data-placement="top" title="请输入标题！" style="width:800px;">
						  </div>
						  
						   <div class="form-group">
						    <label for="video_srcInput">视频地址：</label>
						     <input type="text" class="form-control" name="video_src" id="video_srcInput" style="width:500px;">
						  </div>
						  
						   <div class="form-group">
						    <label for="video_typeSelect">视频类型：</label>
						     <select class="form-control" id="video_typeSelect" name="video_type" style="width:212px;">
      						</select>
						  </div>
						  
						   <div class="form-group">
						    <label for="album_idSelect">所属专辑：</label>
						     <select class="form-control" id="album_idSelect" name="album_id">
      						</select>
						  </div>
						  
						  <div class="form-group">
						    <label for="album_course_sortInput">专辑课程排序：</label>
						    <input type="number" class="form-control" name="album_course_sort" id="album_course_sortInput" placeholder="专辑课程排序" >
						  </div>
						  
						  
					      <div class="form-group">
						    <label for="nameInput">标题图片：</label>
						     <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:285px;">
						     <input type="text" class="form-control" name="image" id="hiddenImage" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						  </div>
						  
						 <div class="form-group">
						    <label for="nameInput">上传视频：</label>
						     <input type="file" class="form-control" name="videoFile" id="videoFileInput" style="width:285px;">
						     <input type="text" class="form-control" name="video_url" id="hiddenVideo_url" style="display: none;">
						     <button type="button" onclick="uploadVideo()"  class="btn btn-warning">上传</button> 
						  </div>
						  <div>
						  	<div style="float: left;width: 49%;">
						  		<img id="imagehow" src="" style="width:70%;border:1px solid #FFFFFF;">
						  	</div>
						  	<div style="float: right;width: 49%;">
						  		 <video id="showVideo" src="" controls="controls" style="width:70%;">
								您的浏览器不支持 video 标签。
						 	 </video>
						  	</div>
						  	
						  </div>
					      <div class="form-group">
						    <label for="contentEditor">内容：</label>
						    <textarea id="contentEditor" name="content" style="width:100%;height:100%;"></textarea>
						  </div>
						  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate('save');">保存草稿</a>
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate('publish');">发布视频</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		
   </div>			
   <script type="text/javascript">
   		var ue = UE.getEditor('contentEditor',{
   			scaleEnabled:true
   			});
   </script>    
  </body>
</html>
