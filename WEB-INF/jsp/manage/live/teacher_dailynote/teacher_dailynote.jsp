<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="<%=path%>/css/tableStyle.css">
<title>播主日志; InnoDB free: 9216 kB</title>
	<script>
		$(function(){
			$('#showListTableId').datagrid({
				url: '<%=path%>/teacher_dailynote/list.html',
				title: '播主日志; InnoDB free: 9216 kB列表',
				width: '100%',
				height: getClientHeight(),  
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
					text:'新增',
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
			    url:'<%=path%>/teacher_dailynote/addEdit.html',
			    onSubmit: function() {
			    	if (!$('#infoForm').form('validate')) {
			    		showMsg("信息没有填写完整");
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
						showMsg("保存失败");
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
				$.post('<%=path%>/teacher_dailynote/delete.html', {ids:ids}, function(data) {
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
<div id="ronelayout">
<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div><div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">
<div id="layout" class="wholelayout">
	<div id="mainbody" >
		<div>
			<div id="header" class="mainheader">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td height="24" class="bodytitle">播主日志; InnoDB free: 9216 kB管理</td>
					</tr>
					<tr>
						<td height="28" class="titledesc">播主日志; InnoDB free: 9216 kB</td>
					</tr>
				</table>	
			</div>




<table id="showListTableId" idField="id">
	<thead>
		<tr>
		        	<th field="id" width="80" hidden="true"></th>
					<th field="teacherid" width="80"></th>
					<th field="roomid" width="80"></th>
					<th field="createtime" width="80"></th>
		</tr>
	</thead>
</table>
<div id="addNewWindow" title="新增/修改播主日志; InnoDB free: 9216 kB" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;">
<a href="#" id="btnSave" iconCls="icon-save">保存</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="id"/>
		       	 <tr >
	    			<td class="tablealignright">：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="teacherid" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="roomid" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="createtime" />
	    			</td>
				 </tr>
        </table>
	</form>
</div>




		</div>	
	</div>
</div>
</div></div></div><div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>
</div>
</body>
</html>

