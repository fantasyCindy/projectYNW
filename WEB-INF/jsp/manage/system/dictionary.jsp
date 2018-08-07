<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	 <link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="${path }/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	
  <script>
  	 $(function(){
  		$('#contentTable').bootstrapTable({
  		  	method: 'GET',
          	height:tableHeight,
          	cache: false,
            url: path + '/dictionary/list.htm',
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
            	params.roomid = $("#search_status").val();            	
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'dictionaryid',
                title: 'dictionaryid',
                visible : false
            },{
                field: 'item_name',
                title: '字典名称'
            },{
                field: 'item_key',
                title: 'key'
            },{
                field: 'ratio',
                title: '比例(牛币:金额)'
            }
            , {
                field: 'dic_name',
                title: '启动页链接'
            }, {
                field: 'updatetime',
                title: '更新时间'
            },{
                field: 'status',
                title: '是否启用',
                formatter:statusFormatter
            }
            ]
        });
  		 		
  	});
  	
  	function statusFormatter(value,row){
  		if(value==1){
  			return "启用";
  		}else if(value==2){
  			return "未启用";
  		}  	 
  	}
  	 
  	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
 
    
  	function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	       	  
  	  var _params = $('#formId').serialize();
  	  $('#addEditModal').modal('hide');
	  parent.showProcessWin();     	  
	  var _backSuccessMsg = '创建成功！';
	  var _backFaildMsg = '创建失败！';
	  var _postUrl = '/dictionary/addOrEditDictionary.htm';
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
		   showMsg('请选择要删除的消息！');
		    return; 
	   }
	   showConfirm('确认要删除这'+rowDatas.length+'条消息吗？',
		function(){
		   var _ids = new Array;
		   for(var i = 0;i<rowDatas.length ; i++){
			   _ids.push(rowDatas[i].tmessage_id);
	       }
		   $.post(path + '/dictionary/delete.htm',{ids:_ids.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showOnlyMsg('删除成功！');
	   	  			reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);	
			  		reflushDataTable();
		   });
	    }, function(){});
	     
   }
   
   
   
   function openaddEditModal(_addEditType) {
   	$('#formId')[0].reset();
   	if('edit' == _addEditType){
   		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
   		var key = rowDatas[0].item_key;
		if(rowDatas.length == 0 ){
			   showMsg('请选择要修改的记录！');
			   return;
		    }
		    if(rowDatas.length > 1 ) {
			   showErr('修改只能选择一条数据！');
			   return;
		    }
		    if(/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(key)){
		    	$("#ratios").hide();
		    	$("#files").show();
		    }else{
		    	$("#files").hide();
		    	$("#ratios").show();
		    }		   
		    loadData4Form($('#formId'),rowDatas[0]);
		    $("#apptypeid_div").show();    
   	}else{
   		$("#apptypeid").val("");
			$("#apptypeid_div").hide();
   	}
   	
   	if('add' == _addEditType){
   		$('#formId fieldset legend').html('新增');
   	}else{
   		$('#formId fieldset legend').html('修改');
   	}
   	$('#addEditTypeId').val(_addEditType);
   	$('#addEditModal').find('.showErrInfoP').hide();
   	
   	$('#addEditModal').modal('show');
   }
   
   function uploadImage() {
	   var validSuccess = validateImgFile("imageInput");
	   if(validSuccess){
		   var index = showLoading("图片文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/dictionary/uploadImg.do",  
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
		           		$("#item_keyInput").val("http://www.yuetougu.com"+_backData.returnPath);
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
   
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
      <!--  <div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">类型</label> 
					<select class="form-control" id="search_status">
							
					</select>
				</div>	 -->
       	<div id="custom-toolbar">
	       <!--   <a class="btn btn-primary" href="javascript:;" onclick="openAddEditModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a> -->
	         <a class="btn btn-success" href="javascript:;" onclick="openaddEditModal('edit');">
	            <i class="fa fa-trash-o fa-lg"></i> 修改
	         </a> 
	          <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
	              <i class="fa fa-search fa-lg"></i> 查询
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
			            <input type="text" name="dictionaryid" style="display: none;"/>
			            <input type="text" id="addEditTypeId" style="display: none;"/>
					    <fieldset>
					      <legend>新增消息</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
						  <div class="form-group">
						    <label for="contentInput">名称：</label>
						     <input type="text" style="width:310px;" class="form-control" name="item_name" id="item_nameInput" placeholder="标题" data-toggle="tooltip" data-placement="top" title="请输入标题！">
						  </div>
						  
					      <div class="form-group">
						    <label for="titleInput">item_key：</label>
						    <input type="text" style="width:310px;" class="form-control" name="item_key" id="item_keyInput" placeholder="标题" data-toggle="tooltip" data-placement="top" title="请输入标题！">
						  </div>
						  
						  <div class="form-group" id="ratios">
						    <label for="urllinkInput">比例 (牛币:金额)：</label>
						    <input type="text" style="width:350px;"class="form-control" name="ratio" id="ratioInput" placeholder="链接" data-toggle="tooltip" data-placement="top" title="请输入链接！">
						  </div>
						  <div class="form-group" id="files">
						   <label for="urllinkInput">启动页链接：</label>
						     <input type="text" style="width:300px;"class="form-control" name="dic_name" id="dicNameInput" placeholder="链接" data-toggle="tooltip" data-placement="top" title="请输入链接！">
						    <label for="nameInput">广告图片：</label>
						     <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:245px;">
						     <input type="text" class="form-control" name="photo" id="hiddenImage" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						     <img id="imagehow" src="" style="width:100px;border:1px solid #FFFFFF;">
						    </div>
					      
						  
						  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div>
			  </div>
			</div>
		
   </div>			
       
  </body>
</html>
