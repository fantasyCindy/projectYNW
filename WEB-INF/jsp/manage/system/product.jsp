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
	<script src="${path}/public/js/lodash.js"></script>
	<script src="${path}/public/module/ui/cropper.min.js"></script>
	<script type="text/javascript" src="${path}/public/module/ui/cropper.js"></script>
  <style type="text/css">
    .fl{
      float:left;
    }
    .fr{
      float:right;
    }
    .absolute{
      position:absolute;
    }
    .relative{
      position:relative;
    }
  </style>
  <script>
  	$(function(){
  		cropper.init();
 	    cropper.onCrop = imageData => {
 	        $.post(path+'/product/uploadImg.do', { imageFile: imageData }, back => {
 	            $('#hiddenImage').val(back.returnPath)
 	            $('#imagehow').attr('src',back.returnPath)
 	        }, 'json')
 	    }
  		
  		$('#contentTable').bootstrapTable({
            method: 'GET',
            url: path + '/product/list.do',
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
                field: 'id',
                title: 'id',
                visible : false
            }, {
                field: 'product_name',
                title: '产品名称'
            }, {
                field: 'product_profiles',
                title: '产品简介'
            },  {
                field: 'product_img',
                title: '产品配图',
                formatter:photoFormatter
            }, {
                field: 'type_name',
                title: '产品类型'
            },{
                field: 'create_time',
                title: '创建时间'
            }]
        });
  		
  	});
  	
  	 function photoFormatter(value,row){
  		 if(value != null && value != ""){
  			 return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		 }
  		 return value;
  	 }
    function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
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
    	}
    	
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增产品类型');
    	}else{
    		$('#formId fieldset legend').html('修改产品类型');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
      var menu_nameVal = $('#nameInput').val();
	  if(!menu_nameVal){
		  $('#nameInput').tooltip('show');	
		  return;
	  }
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  console.log(_params);
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/product/saveorupdate.do';
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
			   _delIdArr.push(rowDatas[i].id);
	       }
		   $.post(path + '/product/del.do',{ids:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   reflushDataTable();
		   });
		   
	    });
   }
   
   function uploadImage() {
	   cropper.render({width:256, height:160})
	   /* var validSuccess = validateImgFile("imageInput");
	   if(validSuccess){
		   var index = showLoading("图片文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/product/uploadImg.do",  
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
	   } */
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
			            <input type="hidden" id="id" name="id" style="display: none;"/>
					    <fieldset>
					      <legend>新增产品类型</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      <div class="form-group">
						    <label for="nameInput">产品名称：</label>
						    <input type="text" class="form-control" name="product_name" id="nameInput" placeholder="产品类型名称" data-toggle="tooltip" data-placement="top" title="请输入产品类型名称！">
						  </div>
						  <div class="form-group">
						    <label for="nameInput">产品简介：</label>
						    <input type="text" class="form-control" name="product_profiles" id="profilesInput" placeholder="产品简介" data-toggle="tooltip" data-placement="top" title="请输入产品简介！">
						  </div>
						  <div class="form-group">
						    <label for="nameInput">产品价格：</label>
						    <input type="text" class="form-control" name="product_price" id="priceInput" placeholder="产品价格" data-toggle="tooltip" data-placement="top" title="请输入产品价格！">
						  </div>						  
						  <div class="form-group">
						    <label for="nameInput">产品配图：</label>
						     <input type="text" class="form-control" name="product_img" id="hiddenImage" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						     <img id="imagehow" src="" style="width:100px;border:1px solid #FFFFFF;">
						  </div>
						   <div class="form-group">
						    <label for="nameInput">产品类型：</label>
						    <select class="form-control" name="typeid" id="typeid" class="selectpicker show-tick form-control">
						 		<c:forEach var="list" items="${ptlist }">
						 			<option value="${list.id }">${list.type_name}</option>
						 		</c:forEach>
      						</select>
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
