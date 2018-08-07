<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<!-- tree view 插件 -->
	<link href="${path}/manage/plugins/treeview/css/default.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/plugins/treeview/js/bootstrap-treeview.js"></script>
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'GET',
            url: path + '/role/list.do',
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
                field: 'role_id',
                title: 'role_id',
                visible : false
            }, {
                field: 'rolename',
                title: '角色名称'
            }, {
                field: 'roletype',
                title: '角色类型',
                formatter : role_typeFormatter
            },{
                field: 'rolenote',
                title: '角色说明'
            }]
        });
  		
  		/*$("#role_type").change(function(){ 
  			var thisVal = $(this).children('option:selected').val();
  			if(1 == thisVal){
  				$("#apptypeid_div").show();
  			}else{
  				$("#apptypeid").val("");
  				$("#apptypeid_div").hide();
  			}
 		}); */
  		
  	});
  	
  	function role_typeFormatter(value,row){
  		if(value==0){
  			return "<span style='color:green;'>后台角色</span>";
  		}else if(value==1){
  			return "<span style='color:red;'>前台角色</span>";
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
		    $("#apptypeid_div").show();
    	}else{
    		$("#apptypeid").val("");
			$("#apptypeid_div").hide();
    	}
    	
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增角色');
    	}else{
    		$('#formId fieldset legend').html('修改角色');
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
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/role/add.do';
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
			   _delIdArr.push(rowDatas[i].role_id);
	       }
		   $.post(path + '/role/delete.do',{ids:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   reflushDataTable();
		   });
		   
	    });
   }
   
   function openEditMenu(){
   	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	    if(rowDatas.length == 0 ){
		   showMsg('请选择要修改的记录！');
		   return;
	    }
	    if(rowDatas.length > 1 ) {
		   showErr('修改只能选择一条数据！');
		   return;
	    }
	    $("#menu_roleid").val(rowDatas[0].role_id);
	    initRoleMenu(rowDatas[0].role_id);
	   	$('#editMenuModal').modal('show');
   }
   
   function initRoleMenu(_roleid){
	   $.post(path+"/menu/roleMenuTree.do",{roleid:_roleid},function(_data){
		   var $menuTree = $('#menu_tree').treeview({
		         data: _data,
		         showIcon: true,
		         showCheckbox: true,
		         onNodeChecked: function(event, node) {
		        	 var _parent = $('#menu_tree').treeview('getParent',node);
		        	 if(_parent.id){
			        	 _parent.state.checked= true;
			        	 $('#menu_tree').treeview('checkNode',_parent);
		        	 }
		         },
		         onNodeSelected:function(event, node){
		        	 $('#menu_tree').treeview('checkNode',node);
		         }
		       });
	   });
   }
   
   function saveOrUpdateMenu(){
	   var ch = $('#menu_tree').treeview('getChecked');
	   var menuids = new Array();
	   for(var i=0;i<ch.length;i++){
		   menuids.push(ch[i].id);
	   }
	   var roleid = $("#menu_roleid").val();
	   $.post(path + '/role/saveRoleMenu.do',{roleid:roleid,menuids:menuids.toString()},function(_backData){
		   if("success" == _backData){
			   parent.closeProcessWin();
			   $('#editMenuModal').modal('hide');
   	  		   showOnlyMsg('保存成功！');
			   reflushDataTable();
   	  	   }else
   	  			showOnlyErr('保存失败！' + _backData);
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
         <a class="btn btn-warning" href="javascript:;" onclick="openEditMenu();">
            <i class="fa fa-trash-o fa-lg"></i> 权限设置
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
			            <input type="hidden" id="role_id" name="role_id"/>
					    <fieldset>
					      <legend>新增角色</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					      <div class="form-group">
						    <label for="nameInput">角色名称：</label>
						    <input type="text" class="form-control" name="rolename" id="nameInput" placeholder="角色名称" data-toggle="tooltip" data-placement="top" title="请输入角色名称！">
						  </div>
						  <div class="form-group">
						    <label for="roletype">角色类型：</label>
						    <select class="form-control" id="roletype" name="roletype" style="width:200px;">
						    	<option value="0" selected="selected"/>后台角色
						    	<option value="1"/>前台角色
					      	</select>
						  </div>
						 <!-- <div class="form-group" id="apptypeid_div" style="display: none;">
						    <label for="apptypeid">APP关联ID：</label>
						    <select class="form-control" id="apptypeid" name="apptypeid" style="width:200px;">
						    	<option value="0" />普通用户
						    	<option value="1"/>直播老师
					      	</select>
						  </div>-->
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
			
			<!-- 权限配置 -->
			<div class="modal fade" id="editMenuModal">
			  <div class="modal-dialog modal-lg" >
			    <div class="modal-content">
			      <div class="modal-body">
			      <form class="form-inline">
		            <input type="hidden" id="menu_roleid" name="role_id"/>
				    <fieldset>
				      <legend>角色权限</legend>
				      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
				      <div id="menu_tree" class="" ></div>
				      <div style="text-align: center;">
			            <a href="javascript:void(0);" class="btn btn-success" onclick="saveOrUpdateMenu();">保存</a>
			            <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#editMenuModal').modal('hide');">关闭</a>
			 	      </div>
	 	 			</fieldset>
				  </form>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			
   </div>			
  </body>
</html>
