<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
    <script type="text/javascript" src="/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
  <script>
  	 $(function(){
  		$('#contentTable').bootstrapTable({
  		  	method: 'GET',
          	height:tableHeight,
          	cache: false,
            url: path + '/banner/list.do',
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
                field: 'id',
                title: 'id',
                visible : false
            },{
                field: 'title',
                title: '标题'
            },{
                field: 'terminal_type',
                title: '终端类型',
                formatter:terminal_typeFormatter
            },{
                field: 'url',
                title: 'url'
            },{
                field: 'img',
                title: '标题图片',
                formatter:imageFormatter
            },{
                field: 'is_use',
                title: '是否使用',
                formatter:is_useFormatter
            }
            ]
        });
  	});
  	 
  	 
  	 function imageFormatter(value,row){
  		 if(value != null && value != ""){
  			 return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		 }
  		 return value;
  	 }
  	 function is_useFormatter(value,row){
  		 if(value ==1){
  			 return "<span style='color:green;'>使用中</span>";
  		 }else if(value ==0){
  			 return "<span style='color:red;'>未使用</span>";
  		 }
  		 return value;
  	 }
  	 function terminal_typeFormatter(value,row){
  		 if(value ==0){
  			 return "<span style='color:green;'>PC电脑端</span>";
  		 }else if(value ==1){
  			 return "<span style='color:red;'>移动端</span>";
  		 }
  		 return value;
  	 }
  	 
  	
  	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
    function openAddEditModal(_addEditType){
    	$('#formId')[0].reset();
    	$("#imageshow").attr("src","");
    	$("#showVideo").attr("src","");
    	$("#showVideo").css("width","0px");
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
		    var image = rowDatas[0].img;
		    if(image != null && image != ""){
		    	$("#imageshow").attr("src",path+"\\"+image);
		    }
    	}
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增轮播图');
    	}else{
    		$('#formId fieldset legend').html('修改轮播图');
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
	  var img = $("#hiddenImage").val();
	  if(!img){
		  showOnlyErr("请选择轮播图片");
		  return;
	  }
	  //url验证
	  /* var urlVal = $('#urlInput').val(); */
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/banner/saveOrUpdate.do';
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
 			   _delIdArr.push(rowDatas[i].id);
 	       }
 		   $.post(path + '/banner/delete.do',{ids:_delIdArr.toString()},function(_backData){
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
	       url : path+"/banner/uploadImg.do",  
	        secureuri : false,  
	        fileElementId : 'imageInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {
	        	layer.close(index);
	        	if("-1" == _backData){
	        		showOnlyErr("上传图片失败!");
	        	}else{
	        		if("success" == _backData.flag){
	        			//showOnlyMsg("上传图片成功!");
		           		$("#hiddenImage").val(_backData.httpFilePath); 
		           	    $("#imageshow").attr("src",path+"\\"+_backData.httpFilePath);
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
   
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
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
			            <input type="text" name="id" style="display:none;" />
			            <input type="text" id="addEditTypeId" style="display:none;"/>
			            <input type="text" id="is_draftHidden" name="is_draft" value="0" style="display:none;"/>
					    <fieldset>
					      <legend>新增轮播图</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;margin-top: 0px;margin-bottom: 0px;"></h4>
					      <div class="form-group">
						    <label for="titleInput">标题：</label>
						    <input type="text" class="form-control" name="title" id="titleInput" placeholder="标题" size="50" data-toggle="tooltip" data-placement="top" title="请输入标题！" style="width:780px;">
						  </div>
						   <div class="form-group">
						    <label for="titleInput">URL：</label>
						    <input type="text" class="form-control" name="url" id="urlInput" placeholder="url" size="50" data-toggle="tooltip" data-placement="top" title="请输入url！" style="width:780px;">
						  </div>
					      <div class="form-group">
						    <label for="nameInput">导航图：</label>
						     <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:245px;">
						     <input type="text" class="form-control" name="img" id="hiddenImage" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						  </div>
						  <br/>
					      <div class="form-group">
						  		<img id="imageshow" src="" style="width:70%;border:1px solid #FFFFFF;">
						  </div>
						  <br/>
						  <div class="form-group">
						    <label for="terminal_type">应用终端：</label>
						    <input type="radio" name="terminal_type" id="terminal_type" value="1" checked="checked"> 移动端
						    <input type="radio" name="terminal_type" id="terminal_type" value="0"> PC(电脑端)
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
  </body>
</html>
