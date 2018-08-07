<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path}/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	<script type="text/javascript" src="${path}/manage/plugins/multiselect/js/bootstrap-multiselect.js"></script>
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/broadcasting_room/list.do',
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
                field: 'roomid',
                title: 'roomid',
                visible : false
            }, {
                field: 'photo',
                title: '形象图片',
                formatter:imgFormatter
            }, {
                field: 'teacherNames',
                title: '直播老师'
            }, {
                field: 'title',
                title: '标题'
            }, {
                field: 'live_style',
                title: '直播风格'
            }, {
                field: 'content',
                title: '直播室介绍',
                width: 400
            },{
                field: 'createtime',
                title: '创建时间'
            }]
        });
  		
  		initTeacherCategorySelect();
  		
  	});
  	
  	
  	function initTeacherCategorySelect(){
		$("#teacher").html("");
	   $.post(path + '/teacher/combobox.do',null,function(_data){
		   if(_data && _data.length > 0){
			   for(var i = 0;i<_data.length;i++){
				   $('#teacher').append('<option value="'+_data[i].id+'">'+_data[i].text+'</option>');
			   }
		   }
	   });   
	}
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
    	initMultiselect();
    	$("#img_srcShow").attr("src","");
    	$('#addBroadCastingRoomFormId')[0].reset();
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
		    loadData4Form($('#addBroadCastingRoomFormId'),rowDatas[0]);
		    if(rowDatas[0].img_src != ""){
		    	$("#img_srcShow").attr("src",path + "\\" + rowDatas[0].photo);
		    }
		    console.log(rowDatas[0]);
		    //设置teacher选择：
		    var update_teacherids = rowDatas[0].teacherIds;
		    $("#teacher").multiselect('select', update_teacherids);
    	}else{
    		$("#teacher").multiselect("destroy");
    		$("#roomid_hidden").val("");
    		$("#img_srcInput").val("");
    		initMultiselect();
    	}
    	if('add' == _addEditType){
    		$('#addHospitalFormId fieldset legend').html('新增直播室');
    	}else{
    		$('#addHospitalFormId fieldset legend').html('修改直播室');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditBroadCastingRoomModal').find('.showErrInfoP').hide();
    	$('#addEditBroadCastingRoomModal').modal('show');
    }
    
    
    function saveOrUpdateRoom(){
      var _doAddEditType =  $('#addEditTypeId').val();
      //必填验证
      var _title = $('#title').val();
	  if(!_title){
		  $('#title').tooltip('show');	
		  return;
	  }
      var _live_style = $('#live_style').val();
	  if(!_live_style){
		  $('#live_style').tooltip('show');	
		  return;
	  }
	  
      var _content = $('#content').val();
	  if(!_content){
		  $('#content').tooltip('show');	
		  return;
	  }
	  
	  var _params = $('#addBroadCastingRoomFormId').serialize();
   	  $('#addEditBroadCastingRoomModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/broadcasting_room/addEdit.do';
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
			   _deleteArr.push(rowDatas[i].roomid);
	       }
		   $.post(path + '/broadcasting_room/delete.do',{ids:_deleteArr.toString()},function(_backData){
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
	       url : path+"/broadcasting_room/img_srcUpload.do",  
	        secureuri : false,  
	        fileElementId : 'img_srcInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {  
	           	if("success" == _backData.flag){
	           		$("#hiddenImg_src").val(_backData.returnPath);
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
	         <a class="btn btn-primary" href="javascript:;" onclick="openAddEditRoomModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a>
	         <a class="btn btn-success" href="javascript:;" onclick="openAddEditRoomModal('edit');">
	            <i class="fa fa-edit fa-lg"></i> 修改
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRooms();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>
	         <!-- <a class="btn btn-warning" href="javascript:;" onclick="auditHospitals();">
	              <i class="fa fa-check-square-o fa-lg"></i> 审核
	         </a> -->
	          <a class="btn btn-info" href="javascript:;" onclick="queryHospital();">
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
       
       		<div class="modal fade" id="addEditBroadCastingRoomModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="addBroadCastingRoomFormId">
			            <input type="hidden" name="roomid" id="roomid_hidden" />
			            <input type="hidden" id="addEditTypeId" />
					    <fieldset>
					      <legend style="max-height:760px;overflow-y:auto;">新增直播室</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
						   <div class="form-group">
						    <label for="img_srcInput">直播室图片：</label>
						     <input type="file" class="form-control" name="img_srcFile" id="img_srcInput" style="width:310px;">
						     <input type="hidden" class="form-control" name="photo" id="hiddenImg_src">
						     <button type="button" onclick="uploadImg_src()"  class="btn btn-warning">上传</button> 
						     <img id="img_srcShow" src="" style="width:250px;border:1px solid #FFFFFF;">
						  </div>
					      
					      <div class="form-group">
						    <label for="title">直播室标题：</label>
						    <input type="text" class="form-control" name="title" id="title" placeholder="直播室标题"  data-toggle="tooltip" data-placement="top" title="请输入标题" style="width:310px;">
						  </div>
					      <div class="form-group">
						    <label for="title">直播室风格：</label>
						    <input type="text" class="form-control" name="live_style" id="live_style" placeholder="直播室风格" max="15"  data-toggle="tooltip" data-placement="top" title="请输入直播室风格" style="width:310px;">
						  </div>
					      <div style="margin-top: 10px;">
						    <label for="content">直播室介绍：</label>
						    <textarea  style="width: 80%;height: 200px;resize:none;" class="form-control" name="content" id="content" placeholder="直播室介绍"  data-toggle="tooltip" data-placement="top" title="请输入介绍" ></textarea>
						  </div>
						  <br/>
						  <div class="form-group">
						    <label for="teacher">直播老师&nbsp;&nbsp;&nbsp;&nbsp;:</label>
						    <select multiple="multiple" class="form-control" id="teacher" name="teacherids" >
						    	
		      				</select>
						  </div>
						  
						  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdateRoom();">保存</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditBroadCastingRoomModal').modal('hide');">关闭</a>
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
