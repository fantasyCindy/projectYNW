<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path }/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<script type="text/javascript" src="${path }/manage/plugins/multiselect/js/bootstrap-multiselect.js"></script>
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'GET',
            url: path + '/album/list.do',
            cache: false,
            height: tableHeight,
            striped: true,
            pagination: true,
            contentType: "application/x-www-form-urlencoded",
            sidePagination: "server",
            pageSize: 50,
            pageList: [50,100,150,200,500],
            search: false,
            showRefresh: false,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'album_id',
                title: 'album_id',
                visible : false
            }, {
                field: 'title',
                title: '专辑标题'
            },{
                field: 'img',
                title: '专辑图片',
                formatter:imgFormatter
            },{
                field: 'teachers',
                title: '讲师'
            },{
                field: 'is_pay',
                title: '是否付费',
                formatter:isPayFormatter
            },{
                field: 'look_count',
                title: '观看次数'
            },{
                field: 'note',
                title: '专辑描述'
            },{
                field: 'createName',
                title: '创建人'
            },{
                field: 'create_time',
                title: '创建时间'
            }]
        });
  		loadTeacherData();
  		 
  	});
  	
  	function loadTeacherData(){
  		$.get("${path}/allTeacherList.htm",function(_backData){
  			if(_backData.status == 1){
  				var dataObj = eval(_backData.data);
  				 for(var i = 0;i<dataObj.length;i++){
   				   var obj = dataObj[i];
   				   var _teacherId = obj.teacherId;
   				   var _teacherName = obj.teacherName;
   				   $('#teachersSelect').append('<option value="'+_teacherId+'">'+_teacherName+'</option>');
   			   }
  				$('#teachersSelect').multiselect("refresh");
  			}
  			 $('#teachersSelect').multiselect({
  	  			 buttonWidth: '200px',
  	  			 maxHeight:300
  	  		 });
  		},"json");
  	}
  	
  	function imgFormatter(value,row){
  		 if(value != null && value != ""){
  			 return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		 }
  		 return value;
  	}
  	
  	function isPayFormatter(value,row){
  		 if(value == 0){
  			 return "否";
  		 }else if(value == 1){
  			return "是";
  		 }
  		 return value;
  	}
  	
    function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
    	$("#imgShow").attr("src","");
    	if('edit' == _addEditType){
    		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
		    if(rowDatas.length == 0 ){
			   showMsg('请选择要修改的记录！');
			   return;
		    }
		    if(rowDatas.length > 1 ) {
			   showErr('修改只能选择一条数据！');
			   return;
		    }
		    loadData4Form($('#formId'),rowDatas[0]);
		    $("#imgShow").attr("src","${path}/"+rowDatas[0].img);
    	}
    	
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增视频专辑');
    	}else{
    		$('#formId fieldset legend').html('修改视频专辑');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
      var nameVal = $('#titleInput').val();
	  if(!nameVal){
		  $('#titleInput').tooltip('show');	
		  return;
	  }
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/album/addOrEdit.do';
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
    
    function reflushDataTable(){
    	$('#contentTable').bootstrapTable('refresh', null);
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
			   _delIdArr.push(rowDatas[i].album_id);
	       }
		   $.post(path + '/album/delete.do',{ids:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   reflushDataTable();
		   });
		   
	    });
   }
   
   function uploadImage() {
	   var validSuccess = validateImgFile("imgInput");
	   if(validSuccess){
		   var index = showLoading("图片文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/album/uploadImg.do",  
	        secureuri : false,  
	        fileElementId : 'imgInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {
	        	layer.close(index);
	        	if("-1" == _backData){
	        		showOnlyErr("上传图片失败!");
	        	}else{
	        		if("success" == _backData.flag){
	        			showOnlyMsg("上传图片成功!");
		           		$("#hiddenImg").val(_backData.returnPath); 
		           	    $("#imgShow").attr("src",path+"\\"+_backData.returnPath);
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
	<div class="container-fluid maincontent">
       <div class="row">
       	<div id="custom-toolbar">
         <a class="btn btn-primary" href="javascript:;" onclick="openaddEditModal('add');">
            <i class="fa fa-plus fa-lg"></i> 新增
       	 </a>
         <a class="btn btn-success" href="javascript:;" onclick="openaddEditModal('edit');">
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
			            <input type="hidden" id="addEditTypeId" />
			            <input type="hidden" id="album_id" name="album_id" style="display: none;"/>
			            <input type="hidden" name="add_type" value="0"/>
					    <fieldset>
					      <legend>新增视频专辑</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					     <div class="form-group">
						    <label for="titleInput">标题：</label>
						    <input type="text" class="form-control" name="title" id="titleInput" placeholder="请输入标题" size="50" data-toggle="tooltip" data-placement="top" title="请输入标题！" style="width:780px;">
						  </div>
						  
						  <div class="form-group">
						    <label for="imgInput">标题图片：</label>
						     <input type="file" class="form-control" name="imgFile" id="imgInput" style="width:245px;">
						     <input type="text" class="form-control" name="img" id="hiddenImg" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						  </div>
						  
						   <div class="form-group">
						    <label for="is_paySelect">是否付费：</label>
						     <select class="form-control" id="is_paySelect" name="is_pay" style="width:212px;">
						     	<option value="0">否</option>
						     	<option value="1">是</option>
      						</select>
						  </div>
						  
						   <div class="form-group">
						    <label for="teachersSelect">讲师：</label>
						     <select class="form-control" id="teachersSelect" name="teachers"  multiple="multiple">
      						</select>
						  </div>
						  
						  <div class="form-group">
						    <label for="noteInput">描述：</label>
						    <input type="text" class="form-control" name="note" id="noteInput" placeholder="描述" style="width:780px;">
						  </div>
						  
						    <div>
						  	<div style="float: left;width: 49%;">
						  		<img id="imgShow" src="" style="width:70%;border:1px solid #FFFFFF;">
						  	</div>
						  	</div>
						  	
						  </div>
					      <div style="text-align: center;">
				            <a href="javascript:void(0);" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
				            <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
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
