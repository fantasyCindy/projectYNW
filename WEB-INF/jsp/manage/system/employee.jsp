<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<title>约投顾员工信息管理</title>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	 <link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
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
		$('#contentTable').bootstrapTable({
		  	method: 'GET',
        	height:tableHeight,
        	cache: false,
          	url: path + '/employee/queryList.do',
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
          		params.username = $('#username_query').val();
          		params.phone = $('#phone_query').val();
          		params.wechat_number = $('#wechat_number_query').val();
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
         },{
	        	field: 'username',
                title: '姓名'
          },{
	        	field: 'phone',
                title: '电话号码'
          },{
              field: 'wechat_number',
              title: '微信号'
          },{
              field: 'department',
              title: '部门'
          },{
              field: 'company',
              title: '所属公司'
          },{
              field: 'create_time',
              title: '创建时间'
          }]
      });
			
			
		});
  		
	
  	//重新加载table
  	function reflushDataTable(){
   		$('#contentTable').bootstrapTable('refresh',null);
    }
    //清空条件
    function clearquery(){
		 $("#queryForm")[0].reset();
		 reflushDataTable();
	 }
    
    
    //添加或修改员工信息
     function openAddEditModal(_addEditType){
        console.log(_addEditType)
  		$('#formId')[0].reset();
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
	        $('#formId fieldset legend').html('修改员工信息');
			    loadData4Form($('#formId'),rowDatas[0]);
    	}
  		if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增员工信息');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	$('#addEditModal').modal('show');
  	 }
    
     function saveOrUpdate(){
   		var _doAddEditType =  $('#addEditTypeId').val();
   		if(!$('#usernameInput').val()){
   			$('#usernameInput').tooltip('show');
   			return;
   		}
   		/*var phone = $('#phoneInput').val();
   		if(! /^0?1[3458][0-9]{9}$/.test(phone)){
   			$('#phoneInput').tooltip('show');
   			return;
   		}*/
   		if(!$('#wechat_numberInput').val()){
   			$('#wechat_numberInput').tooltip('show');
   			return;
   		}
   		var _backSuccessMsg = '创建成功！';
    	 	var _backFaildMsg = '创建失败！';
    	    var _postUrl = '/employee/saveOrUpdate.do';
    	    if('add' != _doAddEditType){
  	    	_backSuccessMsg = '修改成功！';
  	    	_backFaildMsg = '修改失败！';
 	  	}
    	 	var _params = $('#formId').serialize();

    	   $.post(path+_postUrl,_params,function(_backData){

     			if(_backData.status=='1'){
     				parent.closeProcessWin();
	  	  			showMsg(_backSuccessMsg);
	  	  			btnColse();
	  	  			reflushDataTable();
     			}else {
    	  		    parent.closeProcessWin(function(){
	     	  			$('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	     	  		    $('#addEditModal').find('.showErrInfoP').show();
	       	  			$('#addEditModal').modal('show');
    	  			});
     			}	   
    	   },'json')
   	 }
     
     
     //批量删除
     function deletes(){
 	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
 	   if(rowDatas.length == 0 ){
 		   showMsg('请选择要删除的员工信息！');
 		    return; 
 	   }
 	   showConfirm('确认要删除这'+rowDatas.length+'个员工信息吗？',
 		function(){
 		   var _ids = new Array;
 		   for(var i = 0;i<rowDatas.length ; i++){
 			   _ids.push(rowDatas[i].id);
 	       }
 		   $.post(path + '/employee/delete.do',{ids:_ids.toString()},function(_backData){
 			   if(_backData.status == '1'){
 	   	  			showOnlyMsg('删除成功！');
 	   	  			reflushDataTable();
 	   	  	   }else
 	   	  			showOnlyErr('删除失败！' + _backData);	
 		   },'json');
 	    }, function(){});
 	     
    }
     
     //关闭窗口
     function btnColse(){
  		$('#addEditModal').modal('hide');
  	}
  
  </script> 	
  </head>
  
  <body>
  	<div class="container-fluid maincontent" style="padding-top: 15px">
  		<div class="row" style="margin-top:-15px;">
	       	<form class="form-inline" id="queryForm">
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>姓名：</label>
				   	 <input type="text" class="form-control" name="username" id="username_query" placeholder="输入员工姓名进行搜索">
				 </div>
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>手机号码：</label>
				   	 <input type="text" class="form-control" name="phone" id="phone_query" placeholder="输入员工手机号码进行搜索">
				 </div>
				 <div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label>手机号码：</label>
				   	 <input type="text" class="form-control" name="wechat_number" id="wechat_number_query" placeholder="输入员工微信号进行搜索">
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
	   <div id="type-toolbar" style="margin-top:5px;">
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
	 	<div class="row">
	  		<table id="contentTable" data-toolbar="#"type-toolbar""></table>
	    </div>
  </div>  
  
  <!-- 添加或修改公开课 -->
  <div>
    	<div class="modal fade" id="addEditModal">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		      <div class="modal-body">
		        <form class="form-inline" id="formId">
		            <input type="text" name="id" style="display: none;"/>
		            <input type="hidden" id="addEditTypeId" />
				    <fieldset>
				      <legend>新增员工信息</legend>
				      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					  <div class="form-group">
					    <label for="titleInput">电话号码：</label>
					    <input type="text" class="form-control" name="phone" id="phoneInput" placeholder="电话号码" style="width:200px;height:34px;" 
					    data-toggle="tooltip" data-placement="top" title="请输入电话号码！"> 
					  </div>
				      <div class="form-group">
					    <label for="titleInput">姓名：</label>
					    <input type="text" class="form-control" name="username" id="usernameInput" placeholder="员工（6字以内）" style="width:200px;height:34px;" 
					    data-toggle="tooltip" data-placement="top" title="请输入员工姓名！">
					  </div>
					   </br>
					   
					   <div class="form-group">
					    <label for="rate_increaseInput">微信号码：</label>
					    <input type="text" class="form-control" name="wechat_number" id="wechat_numberInput" placeholder="微信号码" style="width:200px;height:34px;" 
					    data-toggle="tooltip" data-placement="top" title="请输入微信号码！">
					  </div>
					   <div class="form-group">
						    <label for="recommoned_timeInput">部门：</label>
							 <input type="text" class="form-control" name="department" id="departmentInput" placeholder="部门" 
							 	style="width:200px;height:34px" title="请输入部门！">
					    </div>
  					   <div class="form-group">
						    <label for="recommoned_timeInput">所属公司：</label>
							 <input type="text" class="form-control" name="company" id="companyInput" placeholder="所属公司" 
							 	style="width:200px;height:34px" title="请输入公司！">
					    </div>
					   </br>
											   
					  <div style="text-align: center;">
			            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
			            <a href="javascript:;" class="btn btn-danger" onclick="btnColse();">关闭</a>
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
