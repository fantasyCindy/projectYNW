<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="<%=path%>/css/tableStyle.css">
<title>直播室等级维护</title>
	<script>
		$(function(){
			$('#showListTableId').datagrid({
				url: '<%=path%>/broadcasting_room_level/list.htmlx',
				title: '直播室等级列表',
				//width: '100%',
				//height: getClientHeight(),  
				fit:true,
				fitColumns: true,
				singleSelect: true,
				pagination:true,
				pageSize:10,
				nowrap:false,
				toolbar:[{
					id:'btnFlush',
					text:'刷新',
					iconCls:'icon-reload',
					handler:function(){
						$('#showListTableId').datagrid('reload');
					}
				},'-',{
					id:'btnAdd',
					text:'添加',
					iconCls:'icon-add',
					handler:function(){
						addNew();
					}
				},'-',{
					id:'btnEdit',
					text:'修改',
					iconCls:'icon-edit',
					handler:function(){
						updateRow();
					}
				},'-',{
					id:'btnRemove',
					text:'删除',
					iconCls:'icon-remove',
					handler:function(){
						deleteRow();
					}
				}]
			});
			$('#btnClose').click(function() {
				$('#addNewWindow').window('close');
			});
			$('#btnSave').click(function() {
				$('#infoForm').submit();
			});
			$('#btnSave').linkbutton({plain:false});
			$('#btnClose').linkbutton({plain:false});
			$('#infoForm').form({
			    url:'${path}/broadcasting_room_level/addEdit.htmlx',
			    onSubmit: function() {
			    	if (!$('#infoForm').form('validate')) {
			    		showErr("信息没有填写完整");
			    		return false;
			    	}
			        return true;
			    },   
			    success:function(data){
					if(data == 'success' || 'success' == eval(data)) {
						showMsg("保存成功");
						$('#addNewWindow').window('close');
						$('#showListTableId').datagrid('reload');
						$('#showListTableId').datagrid('clearSelections');
					} else if(data == 'exist' || 'exist' == eval(data)){
						showErr("直播室级别已存在,请重新填写数值!");
					} else {
						showErr("保存失败");
					}
			    }
			});
			
			$.messager.progress('close');
		});
		
		function addNew() {
			$('#infoForm').form('clear');
			$('#addNewWindow').window('open');
		}
		function updateRow() {
			if (!hasSelected(true)) return ;
			var node = $('#showListTableId').datagrid('getSelected');
			$('#infoForm').form('load', node);
			$('#addNewWindow').window('open');
		}
		function deleteRow() {
			if (!hasSelected(false)) return ;
			confirm("确认删除？", function(e) { if (e) {
				var nodes = $('#showListTableId').datagrid('getSelections');
				var ids = "";
				for(var i = 0;i< nodes.length;i++)
				{
					ids += nodes[i].levelid;
					if(i != (nodes.length -1))
						ids += ',';
				}
				$.post('<%=path%>/broadcasting_room_level/delete.htmlx', {ids:ids}, function(data) {
					if(data == 'success' || 'success' == eval(data)) {
						showMsg("操作成功");
						$('#showListTableId').datagrid('reload');
						$('#showListTableId').datagrid('clearSelections');
					} else {
						showErr(data);
					}
				});
			} });
		}
		
</script>
</head>
<body  style="width: 100%;height: 100%;padding: 0;margin: 0;">
<script>$.messager.progress({title:'加载',msg:'系统正在加载，请稍候...'});</script>

<table id="showListTableId" idField="levelid">
	<thead>
		<tr>
		        	<th field="id" width="80" hidden="true"></th>
					<th field="roomlevel_name" width="80">直播室等级名称</th>
					<th field="roomlevel" width="280">直播室等级</th>
		</tr>
	</thead>
</table>
<div id="addNewWindow" title="新增/修改直播室等级信息" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:480px;">
<a href="#" id="btnSave" iconCls="icon-save">保存</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="levelid"/>
        		<tr >
	    			<td class="tablealignright">直播室等级名称：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="roomlevel_name" required="true"/>
	    			</td>
				 </tr>
        		<tr >
	    			<td class="tablealignright">直播室等级：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-numberbox input" name="roomlevel" min="1" max="9" />
	    				<span style="color: red;">请填写数值(1-9之间)</span>
	    			</td>
				 </tr>
        </table>
	</form>
</div>
</body>
</html>

