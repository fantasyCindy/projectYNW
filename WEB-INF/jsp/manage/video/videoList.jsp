<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path }/manage/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="${path }/manage/ueditor/ueditor.all.min.js"> </script>
    <script type="text/javascript" src="${path }/manage/ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" src="${path }/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
  <script>
  	 $(function(){
  		$('#contentTable').bootstrapTable({
  		  	method: 'GET',
          	height:tableHeight,
          	cache: false,
            url: path + '/video/list.do',
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
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;
            	var queryTitle = $("#queryTitle").val();
            	var queryAlbum = $("#queryAlbumSelect").val();
            	params.title = queryTitle;
            	params.albumId = queryAlbum;
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'video_id',
                title: 'video_id',
                visible : false
            },{
                field: 'title',
                title: '标题'
            },{
                field: 'image',
                title: '标题图片',
                formatter:imageFormatter
            },{
                field: 'video_url',
                title: '自定义视频',
                formatter:videoUrlFormatter
            },{
                field: 'video_src',
                title: '视频源地址'
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
                field: 'teacherName',
                title: '讲师'
            },{
                field: 'comment_count',
                title: '评论数'
            },{
                field: 'zan_count',
                title: '点赞数'
            },{
                field: 'look_count',
                title: '观看数'
            }
           /*  , {
                field: 'createName',
                title: '创建人'
            }, {
                field: 'create_time',
                title: '创建时间'
            }, {
                field: 'updateName',
                title: '修改人'
            }, {
                field: 'update_time',
                title: '修改时间'
            } */
            ]
        });
  		
  		loadVideoTypeSelect(null);
  		loadQueryAlbumSelect();
  		loadAlbumSelect();
  		loadTeacherData();
  	});
  	 
  	 function loadVideoTypeSelect(_typeId){
 	   $.get(path + '/videoType/select.htm',function(_backData){
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
  	 
  	function loadTeacherData(){
  		$.get("${path}/allTeacherList.htm",function(_backData){
  			if(_backData.status == 1){
  				var dataObj = eval(_backData.data);
  				 for(var i = 0;i<dataObj.length;i++){
   				   var obj = dataObj[i];
   				   var _teacherId = obj.teacherId;
   				   var _teacherName = obj.teacherName;
   				   $('#teacher_idSelect').append('<option value="'+_teacherId+'">'+_teacherName+'</option>');
   			   }
  				
  			}
  		},"json");
  	}
  	 
  	function loadQueryAlbumSelect(){
  	   $.get(path + '/album/select.htm',function(_backData){
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
  	 
  	 function loadAlbumSelect(){
 	   $.get(path + '/album/select.htm',function(_backData){
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
  	 
  	 function imageFormatter(value,row){
  		 if(value != null && value != ""){
  			 return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		 }
  		 return value;
  	 }
  	 
  	 function videoUrlFormatter(value,row){
  		 if(value != null && value != ""){
  			 return "<video src='"+path+"/"+value+"' controls='controls' style='width:200px;'>你的浏览器不支持Video标签</video>";
  		 }
  		 return value;
  	 }
  	
  	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
    function openAddEditModal(_addEditType){
    	$('#formId')[0].reset();
    	$("#imagehow").attr("src","");
    	$("#showVideo").attr("src","");
    	$("#showVideo").css("width","0px");
    	UE.getEditor('contentEditor').setContent("");
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
		    var image = rowDatas[0].image;
		    var video_url = rowDatas[0].video_url;
		    var content = rowDatas[0].content;
		    if(image != null && image != ""){
		    	$("#imagehow").attr("src",path+"\\"+image);
		    }
		    if(video_url != null && video_url != ""){
		    	$("#showVideo").css("width","70%");
	       	    $("#showVideo").attr("src",path+"\\"+video_url);
		    }
       	 	UE.getEditor('contentEditor').setContent(content);
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
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/video/addOrEdit.do';
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
    
    function deletes(){
 	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
 	   if(rowDatas.length == 0 ){
 		   showMsg('请选择要删除的数据！');
 		   return;
 	   }
 	   showConfirm('确认要删除'+rowDatas.length+'条数据吗？',
 		function(){
 		   var _delIdArr = new Array();
 		   for(var i = 0;i<rowDatas.length ; i++){
 			   _delIdArr.push(rowDatas[i].video_id);
 	       }
 		   $.post(path + '/video/delete.do',{ids:_delIdArr.toString()},function(_backData){
 			   if("success" == _backData){
 				   showOnlyMsg('删除成功！');
 	   	  	   }else
 	   	  			showOnlyErr('删除失败！' + _backData);
 			   reflushDataTable();
 		   });
 		   
 	    });
    }
   
	function uploadImage() {
	   var validSuccess = validateImgFile("imageInput");
	   if(validSuccess){
		   var index = showLoading("图片文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/video/uploadImg.htm",  
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
		           	    $("#imagehow").attr("src",path+"\\"+_backData.returnPath);
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
	       url : path+"/video/uploadVideo.htm",  
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
		           	    $("#showVideo").attr("src",path+"\\"+_backData.returnPath);
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
   
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
	       	<form class="form-inline">
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>标题：</label>
				   	 <input type="text" class="form-control" id="queryTitle" placeholder="输入标题进行搜索">
				 </div>
				 
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>所属专辑：</label>
				   	 <select class="form-control" id="queryAlbumSelect">
      				</select>
				 </div>
	      	</form>
	       	<div id="custom-toolbar">
		         <a class="btn btn-primary" href="javascript:;" onclick="openAddEditModal('add');">
		            <i class="fa fa-plus fa-lg"></i> 新增
		       	 </a>
		       	  <a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('edit');">
		            <i class="fa fa-trash-o fa-lg"></i> 修改
		         </a>
		         <a class="btn btn-danger" href="javascript:;" onclick="deletes();">
		              <i class="fa fa-trash-o fa-lg"></i> 删除
		         </a>
		          <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
		              <i class="fa fa-search fa-lg"></i> 查询
		         </a> 
	        </div> 
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
			            <input type="text" name="video_id" style="display:none;" />
			            <input type="text" id="addEditTypeId" style="display:none;"/>
			            <input type="text" id="is_draftHidden" name="is_draft" value="0" style="display:none;"/>
					    <fieldset>
					      <legend>新增视频</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;margin-top: 0px;margin-bottom: 0px;"></h4>
					      <div class="form-group">
						    <label for="titleInput">标题：</label>
						    <input type="text" class="form-control" name="title" id="titleInput" placeholder="标题" size="50" data-toggle="tooltip" data-placement="top" title="请输入标题！" style="width:780px;">
						  </div>
						  
						   <div class="form-group">
						    <label for="video_srcInput">视频地址：</label>
						     <input type="text" class="form-control" name="video_src" id="video_srcInput" style="width:750px;" placeholder="视频地址">
						  </div>
						  
						   <div class="form-group">
						    <label for="video_typeSelect">视频类型：</label>
						     <select class="form-control" id="video_typeSelect" name="video_type" >
      						</select>
						  </div>
						  
						  <div class="form-group">
						    <label for="album_idSelect">所属专辑：</label>
						     <select class="form-control" id="album_idSelect" name="album_id">
      						</select>
						  </div>
						  
						    <div class="form-group">
						    <label for="teacher_idSelect">讲师：</label>
						     <select class="form-control" id="teacher_idSelect" name="teacher_id">
      						</select>
						  </div>
						  
						  <div class="form-group">
						    <label for="album_course_sortInput">专辑课程排序：</label>
						    <input type="number" class="form-control" name="album_course_sort" id="album_course_sortInput" placeholder="专辑课程排序" >
						  </div>
						  
					      <div class="form-group">
						    <label for="nameInput">标题图片：</label>
						     <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:245px;">
						     <input type="text" class="form-control" name="image" id="hiddenImage" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						  </div>
						  
						 <div class="form-group">
						    <label for="nameInput">上传视频：</label>
						     <input type="file" class="form-control" name="videoFile" id="videoFileInput" style="width:245px;">
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
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate('publish');">提交</a>
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
   		window.UEDITOR_HOME_URL = "${path}/ueditor/";
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
