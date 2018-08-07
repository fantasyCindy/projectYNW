<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path}/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	<script type="text/javascript" src="${path}/manage/plugins/multiselect/js/bootstrap-multiselect.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script type="text/javascript" src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<script>
	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/specialty/list.do',
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [50,100,150,200,500],
            contentType: "application/x-www-form-urlencoded",
            //showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            
            	return null;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'id',
                title: 'id',
                visible : false
            }, {
                field: 'name',
                title: '擅长内容',
            }
            , {
                field: 'createtime',
                title: '创建时间',
            }
            ]
        });
        });
	function deleteRows(){
		   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
		   if(rowDatas.length == 0 ){
			   showMsg('请选择要删除的数据！');
			   return;
		   }
		   showConfirm('确认要删除'+rowDatas.length+'条数据吗？',
			function(){
			   var _deleteArr = new Array();
			   for(var i = 0;i<rowDatas.length ; i++){
				   _deleteArr.push(rowDatas[i].id);
		       }
			   $.post(path + '/specialty/delete.do',{ids:_deleteArr.toString()},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('删除成功！');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('删除失败！' + _backData);
			   });
		    });
	   }
	
	function openAddEditModal(_addEditType){
    	$('#addEditFormId')[0].reset();
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
		    loadData4Form($('#addEditFormId'),rowDatas[0]);
		   	$("#id_hidden").val(rowDatas[0].id);
		   	$("#title").val(rowDatas[0].name);
    	}
    	if('add' == _addEditType){
    		$('#addEditFormId fieldset legend').html('新增');
    	}else{
    		$('#addEditFormId fieldset legend').html('修改');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	$('#addEditModal').modal('show');
    }
	function saveOrUpdate(){
		var addEditType = $("#addEditTypeId").val().trim();
		var name = $("#title").val().trim();
		if(addEditType == "add"){
			$.post(path + '/specialty/add.do',{name:name},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('新增成功！');
		   	  			$('#addEditModal').modal('hide');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('新增失败！');
			   });
		}else{
			var id = $("#id_hidden").val().trim();
			$.post(path + '/specialty/update.do',{id:id,name:name},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('更新成功！');
		   	  			$('#addEditModal').modal('hide');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('更新失败！');
			   });
		}
	}
	
	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh', null);
     }
	</script>
  </head>
  
  <body>
    <div class="container-fluid maincontent">
       <div class="row">
       <div style="margin-top: 10px;">
	         <a class="btn btn-primary" href="javascript:;" onclick="openAddEditModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a>
	         <a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('edit');">
	            <i class="fa fa-edit fa-lg"></i> 修改
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRows();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>
	       	
     	</div>
     
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
       <div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content" style="width:300px">
			      <div class="modal-body">
			        <form class="form-inline" id="addEditFormId">
			            <input type="hidden" name="id" id="id_hidden" />
			            <input type="hidden" id="addEditTypeId" />
					    <fieldset>
					      <legend>新增</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      <div class="form-group">
						    <label for="title">擅长事项：</label>
						    <input type="text" class="form-control" name="title" id="title" placeholder=""  data-toggle="tooltip" data-placement="top" title="请输入称号" >
						  </div>
						  <div style="text-align: center;margin-top: 10px;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
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
