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
            url: path + '/version/queryVersionList.do',
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
                field: 'versionid',
                title: 'versionid',
                visible : false
            }, {
                field: 'version_type',
                title: '版本名',
                formatter:isPayFormatter
            },{
                field: 'version_number',
                title: '版本号'
            },{
                field: 'description',
                title: '版本描述'
            },{
                field: 'pubtime',
                title: '发布时间'
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
 
  	
  	function isPayFormatter(value,row){
  		 if(value == 0){
  			 return "ios";
  		 }else if(value == 1){
  			return "android";
  		 }
  		 return value;
  	}
  	var val=0;
    function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
    	$("#imgShow").attr("src","");
    	if('edit' == _addEditType){
    		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
    		var version_type=rowDatas.version_type;
		    if(rowDatas.length == 0 ){
			   showMsg('请选择要修改的记录！');
			   return;
		    }
		    if(rowDatas.length > 1 ) {
			   showErr('修改只能选择一条数据！');
			   return;
		    }
		   	val=rowDatas[0].version_type;
		    if (val==1){   
	            $("#apkupload").css("display","block");   
	         } else{
	        	$("#apkupload").css("display","none");  
	         }
	         
		    loadData4Form($('#formId'),rowDatas[0]);
		    
    	}
    	
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('发布新版本');
    	}else{
    		$('#formId fieldset legend').html('修改版本信息');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();    	
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
      var nameVal = $('#titleInput').val();
      var codeVal = $('#codeInput').val();
      var urlVal = $('#hiddenapk').val();    
	  if(!nameVal){
		  $('#titleInput').tooltip('show');	
		  return;
	  }
	  if(val==1){
		  if(!urlVal){
			  $('#apkInput').tooltip('show');	
			  return;
		  }
	  }	  
	  if(!codeVal){
		  $('#codeInput').tooltip('show');	
		  return;
	  }
	  if(isNaN(codeVal)){
		  $('#codeInput').tooltip('show');	
		  return;
	  }
	  
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/version/addorEditVersionNumber.do';
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
			   _delIdArr.push(rowDatas[i].versionid);
	       }
		   $.post(path + '/deleteVersion.do',{ids:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   reflushDataTable();
		   });
		   
	    });
   }
   
   function uploadImage() {
	   var validSuccess = validateApkFile("apkInput");
	   if(validSuccess){
		   var index = showLoading("文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/version/uploadApk.do",  
	        secureuri : false,  
	        fileElementId : 'apkInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {
	        	layer.close(index);
	        	if("-1" == _backData){
	        		showOnlyErr("上传失败!");
	        	}else{
	        		if("success" == _backData.flag){
	        			showOnlyMsg("上传成功!");
	        			console.log("okkkk",_backData.httpFilePath);
		           		$("#hiddenapk").val(_backData.httpFilePath); 
		           	}else{
		           		showOnlyErr("上传失败!");
		           	}
	        	}
	        },  
	        error : function(data, status, e) {
	        	layer.close(index);
	        	showOnlyErr("上传失败："+e);
	       }  
	     });  
	   }
	}
	function validateApkFile(apk){
    	var filepath=$('#'+apk).val();
        var extStart=filepath.substr(filepath.lastIndexOf("."));
        if (extStart == ".apk") {  
            return true;
        }else{
        	return false;
        } 
	}
   
   function upload(e){
	   if(e==0){
		 $("#apkupload").css("display","none");  
	   }else{
		  $("#apkupload").css("display","block"); 
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
			            <input type="hidden" id="hiddenapk" name='apkurl'/>
			            <input type="hidden" id="addEditTypeId" />
			            <input type="hidden" id="versionid" name="versionid" style="display: none;"/>
			            <input type="hidden" name="add_type" value="0"/>
					    <fieldset>
					      <legend>发布版本</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					      <div class="form-group">
						    <label>版本标识：</label>
						    <input type="text" class="form-control" name="version_code" id="codeInput" placeholder="请输入标识/标识位数字" size="50" data-toggle="tooltip" data-placement="top" title="请输入正确标识" style="width:780px;">
						  </div>	
					     <div class="form-group">
						    <label>版本号：</label>
						    <input type="text" class="form-control" name="version_number" id="titleInput" placeholder="请输入版本号" size="50" data-toggle="tooltip" data-placement="top" title="请输入标题！" style="width:780px;">
						  </div>				
						  					  
						   <div class="form-group">
						    <label>系统：</label>
						     	<input type="radio" value="0" name="version_type" onclick="upload(0);" checked="checked"/>ios<input type="radio" value="1" name="version_type" onclick="upload(1);"  style="margin-left: 20px"/>Android
						  </div>
						  <div class="form-group" id="apkupload" style="display: none;">
						    <label>apk文件：</label>
						     <input type="file" class="form-control" name="apkFile" id="apkInput" title="请上传apk文件" style="width:245px;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button>	
						     <span name="apkurl"></span>					     
						  </div>
						  <div class="form-group">
						    <label>描述：</label>						    
						    <textarea rows="" cols="" class="form-control" name="description" id="noteInput" placeholder="描述" style="width:780px; height: 80px;"></textarea>
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
