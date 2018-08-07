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
	<script type="text/javascript" src="/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/gift/list.htm',
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [50,100,150,200,500],
            contentType: "application/x-www-form-urlencoded",
            //showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;            	          	
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{

                title: 'id',
                visible : false
            }, {
                field: 'gift_name',
                title: '礼物名称'
            }, {
                field: 'gift_price',
                title: '礼物金额'
            }, {
                field: 'gift_photo',
                title: '礼物图标',
                formatter:imgFormatter
            }]
        });
  		
  		//initTeacherCategorySelect();
  		
  	});
  	
  	function initMultiselect(){
  		$("#teacher").multiselect({
			nonSelectedText:"请选择",
			buttonWidth: '310px',
			buttonText: function(options, select) {
                 var labels = [];
                 options.each(function() {
                     if ($(this).attr('label') !== undefined) {
                         labels.push($(this).attr('label'));
                     }
                     else {
                         labels.push($(this).html());
                     }
                 });
                 if(labels==""){
                	 return "请选择";
                 }
                 return labels.join(', ') + '';
            }
		});
  		$("#teacher").multiselect('updateButtonText', "");
  		$("#teacher").multiselect('deselectAll', true);
  	}
  	
  	
  	function imgFormatter(value,row){
  		if(value != "" && value != null){
  			return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		}
  	}
  	
  	
    function openAddEditRoomModal(_addEditType){
    	$("#img_srcShow").attr("src","");
    	$('#addGiftFormId')[0].reset();
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
		    loadData4Form($('#addGiftFormId'),rowDatas[0]);
		    if(rowDatas[0].img_src != ""){
		    	$("#img_srcShow").attr("src",path + "\\" + rowDatas[0].gift_photo);
		    }
		   
    	}else{    	
    		$("#giftid_hidden").val("");
    		$("#img_srcInput").val("");
    	}
    	if('add' == _addEditType){
    		$('#addHospitalFormId fieldset legend').html('新增礼物');
    	}else{
    		$('#addHospitalFormId fieldset legend').html('修改礼物');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditGiftModal').find('.showErrInfoP').hide();
    	$('#addEditGiftModal').modal('show');
    }
    
    
    function saveOrUpdateGift(){
      var _doAddEditType =  $('#addEditTypeId').val();
      //必填验证
      var _gift_name = $('#gift_name').val();
	  if(!_gift_name){
		  $('#gift_name').tooltip('show');	
		  return;
	  }
      var _gift_price = $('#gift_price').val();
	  if(!_gift_price){
		  $('#gift_price').tooltip('show');	
		  return;
	  }
	  
	  
	  var _params = $('#addGiftFormId').serialize();
   	  $('#addEditGiftModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/gift/addEdit.htm';
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
	   	  			$('#addEditHospitalModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditHospitalModal').find('.showErrInfoP').show();
		   	  		$('#addEditHospitalModal').modal('show');
   	  			});
   	  		}
   	  });
    	
    }
    
    
   function deleteRooms(){
	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null); 
	   if(rowDatas.length == 0 ){
		   showMsg('请选择要删除的数据！');
		   return;
	   }
	   showConfirm('确认要删除'+rowDatas.length+'条数据吗？',
		function(){
		   var _deleteArr = new Array();
		   for(var i = 0;i<rowDatas.length ; i++){
			   _deleteArr.push(rowDatas[i].gift_id);
	       }
		   $.post(path + '/gift/delete.htm',{ids:_deleteArr.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showErr('删除失败！' + _backData);
		   });
	    });
   }
   
   //上传直播室图片
	function uploadImg_src() {
	   var validSuccess = validateImgFile("img_srcInput");
	   if(validSuccess){
		   $.ajaxFileUpload({  
	       url : path+"/gift/img_srcUpload.do",  
	        secureuri : false,  
	        fileElementId : 'img_srcInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {  
	           	if("success" == _backData.flag){
	           		$("#gift_photo").val(_backData.returnPath);
	           	 	$("#img_srcShow").attr("src",path+"\\"+_backData.returnPath);
	              	showMsg("上传文件成功");
	           	}else{
	           		showErr("上传文件失败");
	           	}
	        },  
	        error : function(data, status, e) {  
	            showErr(e);  
	       }  
	     });  
	   }
	}  
   
	 
	 function validateImgFile(fileId){
		   var fileVal = $("#"+fileId).val();
		   if(fileVal == ""){
			   showErr("请选择上传的文件!");
			   return;
		   }
		   if(fileVal.lastIndexOf(".") == -1){
			  showErr("上传图片格式只支持:jpg、jpeg、png等文件格式");
			  return;
		   }
		   var fileSuffix = fileVal.substring(fileVal.lastIndexOf(".")+1,fileVal.length);
		   var upperSuffix = fileSuffix.toUpperCase();
		   if("JPEG" != upperSuffix && "PNG" != upperSuffix && "JPG" != upperSuffix){
			   showErr("上传图片格式只支持:jpg、jpeg、png等文件格式");
			   return;
		   }
		   return true;
	 }
	 
	 function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh', null);
     }
	 
	 

  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       	<form class="form-inline">
     	</form>
       	<div id="custom-toolbar">
	        
	         <!-- <a class="btn btn-warning" href="javascript:;" onclick="auditHospitals();">
	              <i class="fa fa-check-square-o fa-lg"></i> 审核
	         </a> -->
	         <form class="form-inline" id="queryForm">
	       		<div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label for="todaysubject">流水号：</label>
				   	 <input type="text" class="form-control" id="todaysubject" placeholder="输入主题进行搜索">
				 </div>				
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-info" onclick="reflushDataTable();">
			              <i class="fa fa-search fa-lg"></i> 查询
			         </button>
			         <a class="btn btn-primary" href="javascript:;" onclick="openAddEditRoomModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a>
	         <a class="btn btn-success" href="javascript:;" onclick="openAddEditRoomModal('edit');">
	            <i class="fa fa-edit fa-lg"></i> 修改
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRooms();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>	
				</div>	
						
	     	</form>
	     	 
        </div> 
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>  
    
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
       
       		<div class="modal fade" id="addEditGiftModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="addGiftFormId">
			            <input type="hidden" name="gift_id" id="giftid_hidden" />
			            <input type="hidden" id="addEditTypeId" />
					    <fieldset>
					      <legend>新增礼物</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
						   <div class="form-group">
						    <label for="img_srcInput">礼物图片：</label>
						     <input type="file" class="form-control" name="img_srcFile" id="img_srcInput" style="width:310px;">
						     <input type="hidden" class="form-control" name="gift_photo" id="gift_photo">
						     <button type="button" onclick="uploadImg_src()"  class="btn btn-warning">上传</button> 
						     <img id="img_srcShow" src="" style="width:250px;border:1px solid #FFFFFF;">
						  </div>
					      
					      <div class="form-group">
						    <label for="title">礼物名：</label>
						    <input type="text" class="form-control" name="gift_name" id="gift_name" placeholder="礼物名称"  data-toggle="tooltip" data-placement="top" title="请输入礼物名称" style="width:310px;">
						  </div>
					      <div class="form-group">
						    <label for="title">礼物金额：</label>
						    <input type="text" class="form-control" name="gift_price" id="gift_price" placeholder="礼物金额" max="15"  data-toggle="tooltip" data-placement="top" title="请输入礼物金额" style="width:310px;">
						  </div>					      
						  </div>						  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdateGift();">保存</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditGiftModal').modal('hide');">关闭</a>
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
