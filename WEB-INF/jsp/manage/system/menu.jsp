<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/plugins/treeview/css/default.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/plugins/treeview/js/bootstrap-treeview.min.js"></script>
  <script>
  	$(function(){
       	loadTreeview();
  	});
  	
  	function showTree(_data){
  		$('#treeviewMenu').treeview({
             color: "#428bca",
             expandIcon: 'glyphicon glyphicon-chevron-right',
             collapseIcon: 'glyphicon glyphicon-chevron-down',
             onhoverColor: "#B5B5B5",
             data: _data,
             onNodeSelected:function(event,data){
            	 console.log("onNodeSelected",data)
             }
          });
  	}
  	
  	function loadTreeview(){
  		/*$.get(path+"/menu/list.do?type=0",function(_backData){
	       	setTimeout("showTree("+_backData+");",50);
       	});*/
       	$.get(path+"/menu/list.do",function(_backData){
	       	setTimeout("showTree("+_backData+");",50);
	       	setTimeout("initParentMenuSelect("+_backData+");",50);
       	});
  	}
  	
  	function initParentMenuSelect(_data){
  		$('#parent_idSelect').treeview({
            data: _data,
            onNodeSelected:function(event,data){
            	console.log("onNodeSelected",data.text)
            	$('#menuidSelected').val(data.menuId);
            	$('#menunameSelected').val(data.text);
            	$('#parent_idSelect').hide();
            }
         });
	}
  	
  	function selectedMenu(){
  		$('#parent_idSelect').show();
  	}
  	
  	
    function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
    	if('edit' == _addEditType){
    		var node = $("#treeviewMenu").treeview("getSelected");
    		var nodeParent = $("#treeviewMenu").treeview("getParent",node);
		    if(node.length == 0 ){
			   showMsg('请选择要修改的记录！');
			   return;
		    }
		    if(node.length > 1 ) {
			   showErr('修改只能选择一条数据！');
			   return;
		    }
		    $('#menuidSelected').val(nodeParent.menuId);
        	$('#menunameSelected').val(nodeParent.text);
        	
		    var menu_id = node[0].menuId;
		    var menuname = node[0].text;
		    var iconcls = node[0].icon;
		    var parent_id = node[0].parentid;
		    var menuurl = node[0].menuurl;
		    var sortno = node[0].sortno;
		    var menutype = node[0].menutype;
		    var menucode = node[0].menucode;
		    if(sortno == null || "null" == sortno){
		    	sortno = "";
		    }
		    var oldData = new Object();
		    oldData.menu_id = menu_id;
		    oldData.menuname = menuname;
		    oldData.iconcls = iconcls;
		    oldData.parent_id = parent_id;
		    oldData.menuurl = menuurl;
		    oldData.sortno = sortno;
		    oldData.menutype = menutype;
		    oldData.menucode = menucode;
		    loadData4Form($('#formId'),oldData);
		    //initParentMenuSelect(oldData.parent_id);
        	
		    
    	}
    	
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增菜单');
    	}else{
    		$('#formId fieldset legend').html('修改菜单');
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
   	  var _postUrl = '/menu/add.do';
   	  if('add' != _doAddEditType){
	    _backSuccessMsg = '修改成功！';
	    _backFaildMsg = '修改失败！';
	  }
   	  
   	  $.post(path + _postUrl,_params,function(_backData){
   	  		if("success" == _backData){
   	  			parent.closeProcessWin();
   	  		 	loadTreeview();
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
	   var node = $("#treeviewMenu").treeview("getSelected");
	   if(node.length == 0 ){
		   showMsg('请选择要删除的数据！');
		   return;
	   }
	   showConfirm('确认要删除'+node.length+'条数据吗？',
		function(){
		   var _delIdArr = new Array();
		   for(var i = 0;i<node.length ; i++){
			   _delIdArr.push(node[i].menuId);
	       }
		   $.post(path + '/menu/delete.do',{delIdArr:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showOnlyMsg('删除成功！');
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   loadTreeview();
		   });
		   
	    });
   }
   
   
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row" style="margin-top:10px;margin-bottom:10px;">
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
   	   		 <div id="treeviewMenu" class=""></div>
		  <!-- <table id="contentTable" data-toolbar="#custom-toolbar"></table> -->
       </div>
       
   </div>  
    
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
       
       		<div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="formId">
			            <input type="text" id="addEditTypeId" style="display: none;"/>
			            <input type="text" id="menu_idInput" name="menu_id" style="display: none;"/>
					    <fieldset>
					      <legend>新增菜单</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					      <div class="form-group">
						    <label for="nameInput">菜单名称:</label>
						    <input type="text" class="form-control" name="menuname" id="nameInput" placeholder="菜单名称" data-toggle="tooltip" data-placement="top" title="请输入菜单名称！">
						  </div>
						  
						   <div class="form-group" >
					      	<label for="parent_idSelect">上级菜单:</label>
						    <!-- <select class="form-control" id="parent_idSelect" name="parent_id" style="width:200px;">
					      	</select> -->
					      	<input type="text"  id="menuidSelected" name="parent_id" style="display:none;">
					      	<input type="text" id="menunameSelected" name="parent_menuname" class="form-control" value="" onclick="selectedMenu();" placeholder="分类名称">  
                        	<div id="parent_idSelect" style="height:0px;display: none;">  
						  	</div>
						  </div>
						  
					      <div class="form-group">
						    <label for="resourceInput">菜单Url:&nbsp;&nbsp;</label>
						    <input type="text" class="form-control" name="menuurl" id="resourceInput" placeholder="菜单Url" >
						  </div>
						  
						  <div class="form-group">
						    <label for="iconclsInput">菜单图标:</label>
						    <input type="text" class="form-control" name="iconcls" id="iconclsInput" placeholder="菜单图标">
						  </div>
						  
						  <div class="form-group">
						    <label for="menucodeInput">菜单编码:</label>
						    <input type="text" class="form-control" name="menucode" id="menucodeInput" placeholder="菜单编码">
						   </div>
						   
						   <div class="form-group">
						    <label for="menu_type">菜单类型:</label>
						    <select class="form-control" id="menutype" name="menutype" style="width:200px;">
						    	<option value="0" selected="selected"/>后台菜单
						    	<option value="1"/>前台菜单
					      	</select>
						  </div>
						  
						   <div class="form-group">
						    <label for="sequeueInput">排序：&nbsp;&nbsp;&nbsp;&nbsp;</label>
						    <input type="text" class="form-control" name="sortno" id="sequeueInput" placeholder="排序">
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
