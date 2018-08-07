<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="<%=path%>/css/tableStyle.css">
<title>直播室公告信息维护</title>
	<script>
		$(function(){
			$('#showListTableId').datagrid({
				url: '<%=path%>/roompubinfo/list.htmlx',
				title: '直播大厅公告列表',
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
					text:'发布新公告',
					iconCls:'icon-add',
					handler:function(){
						addNew();
					}
				},'-',{
					id:'btnEdit',
					text:'修改公告',
					iconCls:'icon-edit',
					handler:function(){
						updateRow();
					}
				},'-',{
					id:'btnRemove',
					text:'删除公告',
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
			    url:'${path}/roompubinfo/addEdit.htmlx',
			    onSubmit: function() {
			    	if (!$('#infoForm').form('validate')) {
			    		showErr("信息没有填写完整");
			    		return false;
			    	}
			    	if(!$('#pubInfoContentID').val())
			    	{
			    		showErr("内容没有填写！");
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
					ids += nodes[i].id;
					if(i != (nodes.length -1))
						ids += ',';
				}
				$.post('<%=path%>/roompubinfo/delete.htmlx', {ids:ids}, function(data) {
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

<table id="showListTableId" idField="id">
	<thead>
		<tr>
		        	<th field="id" width="80" hidden="true"></th>
					<th field="createtimeString" width="80">创建时间</th>
					<th field="content" width="280">内容</th>
					<th field="publisherid" width="80" hidden="true">发布人ID</th>
					<th field="publishername" width="80">发布人</th>
		</tr>
	</thead>
</table>
<div id="addNewWindow" title="新增/修改直播室公告信息" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;">
<a href="#" id="btnSave" iconCls="icon-save">发布</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="id"/>
		       	 <tr >
	    			<td class="tablealignright">内容：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<textarea class="easyui-validatebox" style="width: 300px;height: 200px;" name="content" id="pubInfoContentID"></textarea>
	    			</td>
				 </tr>
        </table>
	</form>
</div>




</body>
</html>

