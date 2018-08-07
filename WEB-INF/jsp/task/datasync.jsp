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
            method: 'post',
            url: path + '/datasync/list.do',
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
                field: 'task_id',
                title: 'task_id',
                visible : false
            },{
                field: 'task_name',
                title: '任务名称'
            },{
                field: 'task_desc',
                title: '任务描述'
            },{
                field: 'last_fetch_time',
                title: '上次执行时间'
            },{
                field: 'execute_class',
                title: '任务执行类'
            },{
                field: 'execute_param',
                title: '任务执行参数'
            },{
                field: 'status',
                title: '任务状态',
                formatter:statusFormatter
            }]
        });  		 
  	});
  	
  	function statusFormatter(value,row){
  		if(value ==0){
  			return "<font style='color:green;'>启用</font>";
  		}else if(value==1){
  			return "<font style='color:red;'>禁用</font>";
  		}
  		return value;
  	}
  	
    function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
    	if('edit' == _addEditType){
    		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
    		var task_id=rowDatas.task_id;
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
    		$('#formId fieldset legend').html('新增定时任务');
    	}else{
    		$('#formId fieldset legend').html('修改定时任务');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();    	
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/datasync/addEdit.do';
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
			   _delIdArr.push(rowDatas[i].task_id);
	       }
		   $.post(path + '/datasync/delete.do',{ids:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			       reflushDataTable();
		   });
		   
	    },function(){});
   }
   
   //设置间隔的方法。
	function settingGap()
	{
		var _task_id = '';
		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	    if(rowDatas.length == 0 ){
		   showMsg('请选择要设置的记录！');
		   return;
	    }
	    if(rowDatas.length > 1 ) {
		   showErr('设置只能选择一条数据！');
		   return;
	    }
		_task_id=rowDatas[0].task_id;
		//根据task_id查询synctask。
		$.getJSON('${path}/datasync/queryTaskById.do?' + Math.random(),{ task_id : _task_id},function(_callBackData){
			_doOpenSettingGapWindow(_callBackData);
		});
	}
	
	
	
	function _doOpenSettingGapWindow(_settingTaskObject)
	{
		var _task_id = _settingTaskObject.task_id;
		$('#addEditExec_gapModal').modal('show');
		
		//清空表单数据。
		$('#task_gap_setting_form_id')[0].reset();
		
		$('#_gap_hidden_task_id').val(_settingTaskObject.task_id);
		if(_settingTaskObject.task_exec_gap){
			$('#term_time_unit_id').val(_settingTaskObject.task_exec_gap.term_time_unit);
		}else{
			$('#term_time_unit_id').val(0);
		}
		if(_settingTaskObject.task_exec_gap){
			$('#regular_unit_id').val(_settingTaskObject.task_exec_gap.regular_unit);
		}else{
			$('#regular_unit_id').val(2);
		}
		
		
		$('#task_name_span_id').text('[' + _settingTaskObject.task_name + ']');
		$('#task_status_span_id').text('[' + _settingTaskObject.statusString + ']');
		
		//绑定onSelect事件，在选择不同的值时需要隐藏不同的区域。
		$('#regular_unit_id').change(regular_unit_change_value);
		
		//设置间隔时间。
		if(_settingTaskObject.task_exec_gap)
		{
			$('input[name="term_type"][value="'+_settingTaskObject.task_exec_gap.term_type+'"]').attr('checked',true);
			$('#_gap_hidden_task_gap_id').val(_settingTaskObject.task_exec_gap.exec_gap_id);
			if("0" == _settingTaskObject.task_exec_gap.term_type)
			{ //如果是间隔时间执行方式。
				$('#term_time_value_input_id').val(_settingTaskObject.task_exec_gap.term_time_value);
				$('#term_time_unit_id').val(_settingTaskObject.task_exec_gap.term_time_unit);
			}else if("1" == _settingTaskObject.task_exec_gap.term_type)
			{ //如果是固定时间执行方式。
				
				$('#regular_unit_id').val(_settingTaskObject.task_exec_gap.regular_unit);
				
				//如果有月，则设置月。
				if(_settingTaskObject.task_exec_gap.regular_month)
					$('#regular_month_id').val(_settingTaskObject.task_exec_gap.regular_month);
				
				//如果有日，则设置日。
				if(_settingTaskObject.task_exec_gap.regular_day)
					$('#regular_day_id').val(_settingTaskObject.task_exec_gap.regular_day);
				
				$('#regular_hour_id').val(_settingTaskObject.task_exec_gap.regular_hour);
				$('#regular_minute_id').val(_settingTaskObject.task_exec_gap.regular_minute);
				
				regular_unit_change_value();
			}
		}else
		{
			//如果没有配置任务周期， 默认选中固定时间的单选按钮
			$('input[name="term_type"][value="1"]').attr('checked',true);
		}
	}
   
   /**
	 * 固定时间的单位选择框发生变化时调用的方法。
	 */
	function regular_unit_change_value()
	{
		var _regular_unitValue = $('#regular_unit_id').find("option:selected").val();
		//如果选择的是天则隐藏后面的月下拉框和日的文本框。
		if(0 ==_regular_unitValue )
		{
			$('#month_span_id').hide();
			$('#day_span_id').hide();
		}
		
		//如果选择的是月，则隐藏后面的月下拉框
		if(1 == _regular_unitValue)
		{
			$('#month_span_id').hide();
			$('#day_span_id').show();
		}
		
		//如果选择的是年，则都显示出来。
		if(2 == _regular_unitValue)
		{
			$('#month_span_id').show();
			$('#day_span_id').show();
		}
	}
   
   function saveOrUpdate_exec_gap(){
	    var _params = $('#task_gap_setting_form_id').serialize();
	   	$('#addEditExec_gapModal').modal('hide');
	   	  parent.showProcessWin();
	   	  var _backSuccessMsg = '创建成功！';
	   	  var _backFaildMsg = '创建失败！';
	   	  var _postUrl = '/datasync/saveTaskGap.do';
	   	  $.post(path + _postUrl,_params,function(_backData){
	   	  		if("success" == _backData){
	   	  			parent.closeProcessWin();
	   	  			reflushDataTable();
	   	  			showMsg(_backSuccessMsg);
	   	  		} else {
		   	  			parent.closeProcessWin(function(){
		   	  			$('#addEditExec_gapModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
		   	  		    $('#addEditExec_gapModal').find('.showErrInfoP').show();
			   	  		$('#addEditExec_gapModal').modal('show');
	   	  			});
	   	  		}
	   	  });
   }
   
   /**
	 * 禁用同步任务
	 */
	function disableSyncTask()
	{
		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	    if(rowDatas.length == 0 ){
		   showMsg('请选择要禁用的记录！');
		   return;
	    }
	    if(rowDatas.length > 1 ) {
		   showErr('只能选择一条数据！');
		   return;
	    }         
		var _task_id = rowDatas[0].task_id;
		
		$.post('<%=path%>/datasync/disableSyncTask.do', {task_id : _task_id}, function(data) {
				if(data == 'success' || data == '"success"') {
					showMsg("任务已禁用!");
					reflushDataTable();
				} else {
					showOnlyErr(data);
				}
			});
	}
	
	/**
	 * 启用同步任务
	 */
	function enableSyncTask()
	{
		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	    if(rowDatas.length == 0 ){
		   showMsg('请选择要禁用的记录！');
		   return;
	    }
	    if(rowDatas.length > 1 ) {
		   showErr('只能选择一条数据！');
		   return;
	    }         
		var _task_id = rowDatas[0].task_id;
		$.post('<%=path%>/datasync/enableSyncTask.do', {task_id : _task_id}, function(data) {
				if(data == 'success' || data == '"success"') {
					showMsg("任务已启用!");
					reflushDataTable();
				}else if(data == 'faild' || data == '"faild"'){
					showOnlyErr('无法启动该任务，任务没有配置执行周期!');
				} else {
					showOnlyErr(data);
				}
		});
	}
	
	/**
	 * 执行同步任务
	 */
	function executeSyncTask()
	{
		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	    if(rowDatas.length == 0 ){
		   showMsg('请选择要禁用的记录！');
		   return;
	    }
	    if(rowDatas.length > 1 ) {
		   showErr('只能选择一条数据！');
		   return;
	    }         
		var node = rowDatas[0];
		if(node.status != 0)
		{
			showConfirm('此任务已被禁用，是否要执行？',function(){
				var _task_id = rowDatas[0].task_id;
				_innerExecuteSyncTask(_task_id);
			},function(){});
		}else
		{
			showConfirm('此任务状态为启用，如果它正在自动执行，手动执行可能会产生冲突，请注意时间周期的配置，是否要执行？',function(){
				var _task_id = rowDatas[0].task_id;
				_innerExecuteSyncTask(_task_id);
			},function(){});
		} 
	}
	
	function _innerExecuteSyncTask(_task_id)
	{
		var index = showLoading("任务正在执行，请稍后...");
		$.post('<%=path%>/datasync/executeSyncTask.do', {task_id : _task_id}, function(data) {
			layer.close(index);
			if(data == 'success' || data == '"success"') {
				showOnlyMsg("任务执行完毕!");
				reflushDataTable();
			} else {
				showOnlyErr(data);
			}
		});
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
          <a class="btn btn-info" href="javascript:;" onclick="settingGap();">
            <i class="fa fa-trash-o fa-lg"></i> 设置任务详情
         </a>
         <a class="btn btn-danger" href="javascript:;" onclick="disableSyncTask();">
            <i class="fa fa-trash-o fa-lg"></i> 禁用
         </a>
          <a class="btn btn-success" href="javascript:;" onclick="enableSyncTask();">
            <i class="fa fa-trash-o fa-lg"></i> 启用
         </a>
          <a class="btn btn-warning" href="javascript:;" onclick="executeSyncTask();">
            <i class="fa fa-trash-o fa-lg"></i> 执行
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
			            <input type="hidden" id="task_id" name="task_id" style="display: none;"/>
					    <fieldset>
					      <legend>新增/修改定时任务</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					      <div class="form-group">
						    <label class="col-sm-3 control-label">任务名称:</label>
						    <div class="col-sm-9">
						    	<input type="text" class="form-control" name="task_name" id="task_nameInput" placeholder="任务名称" size="50" data-toggle="tooltip" data-placement="top" style="width:500px;">
						  	</div>
						  </div>
						  <div class="form-group">
						    <label class="col-sm-3 control-label">任务执行类类名:</label>
						    <div class="col-sm-9">
						    <input type="text" class="form-control" name="execute_class" id="execute_classInput" placeholder="任务执行类类名" size="50" data-toggle="tooltip" data-placement="top" style="width:500px;">
						  	</div>
						  </div>
						  <div class="form-group">
						    <label class="col-sm-3 control-label">任务执行参数:</label>
						    <div class="col-sm-9">
						    <input type="text" class="form-control" name="execute_param" id="execute_paramInput" placeholder="任务执行参数" size="50" data-toggle="tooltip" data-placement="top" style="width:500px;">
						  	</div>
						  </div>
						  <div class="form-group">
						    <label class="col-sm-3 control-label">任务描述:</label>
						    <div class="col-sm-9">
						    <input type="text" class="form-control" name="task_desc" id="task_descInput" placeholder="任务描述" size="50" data-toggle="tooltip" data-placement="top" style="width:500px;">
						  	</div>
						  </div>
						  <div class="form-group">
						    <label class="col-sm-3 control-label">任务状态:</label>
						    <div class="col-sm-9">
							    <select class="form-control" name="status" style="width:500px;">
							      <option value="0">启用</option>
							      <option value="1">禁用</option>
							    </select>
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
			<!-- 设置任务执行时间 -->
			<div class="modal fade" id="addEditExec_gapModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form id="task_gap_setting_form_id" class="form-inline" method="post" style="margin: 0px;padding: 0px;">
						<input type="hidden" name="task_id" id="_gap_hidden_task_id" />
						<input type="hidden" name="exec_gap_id" id="_gap_hidden_task_gap_id" />
				       	<fieldset>
				       		<h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
			    			<div class="form-group">
							    <div class="col-sm-12">
	    						<input type="radio" class="form-control" value="0" name="term_type">间隔执行：
							      <input type="text" id="term_time_value_input_id" name="term_time_value" class="form-control"/>
							      <select id="term_time_unit_id" name="term_time_unit" class="form-control">
			    					  <option value="0" selected="selected">分钟</option>
			    					  <option value="1">小时</option>
			    					  <option value="2">天</option>
			    					</select>执行
							    </div>
							 </div>
							 <div class="form-group">
							 	<div class="col-sm-12">
    							<input type="radio" class="form-control"  value="1" name="term_type">固定时间：
							    <label>固定在每</label>
							       <select id="regular_unit_id" name="regular_unit" class="form-control">
			    					  <option value="2">年</option>
			    					  <option value="1">月</option>
			    					  <option value="0">天</option>
			    					</select>的
			    					<span id="month_span_id">
			    					<select id="regular_month_id" name="regular_month" class="form-control">
			    							<option value="1">一月</option>
			    							<option value="2">二月</option>
			    							<option value="3">三月</option>
			    							<option value="4">四月</option>
			    							<option value="5">五月</option>
			    							<option value="6">六月</option>
			    							<option value="7">七月</option>
			    							<option value="8">八月</option>
			    							<option value="9">九月</option>
			    							<option value="10">十月</option>
			    							<option value="11">十一月</option>
			    							<option value="12">十二月</option>
			    						</select>
			    					</span>
			    					<span id="day_span_id">
			    						<input class="form-control" type="text" style="width:50px;" name="regular_day" id="regular_day_id" />日
			    					</span>
			    					<span>
			    						<input class="form-control" type="text" style="width:50px;"  name="regular_hour" id="regular_hour_id" />时
			    						<input class="form-control" type="text" style="width:50px;"  name="regular_minute" id="regular_minute_id" />分
			    					</span>
			    					</div>
		    					</div>
		    					<div style="text-align: center;">
						            <a href="javascript:void(0);" class="btn btn-success" onclick="saveOrUpdate_exec_gap();">保存</a>
						            <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#addEditExec_gapModal').modal('hide');">关闭</a>
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
