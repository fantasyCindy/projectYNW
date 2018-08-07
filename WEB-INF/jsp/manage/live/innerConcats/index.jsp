<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="${path}/css/tableStyle.css">
<title>内部联系人管理</title>
	<script>
		$(function(){
			$('#showListTableId').datagrid({
				url: '${path}/innerConcats/list.htmlx',
				title: '内部联系人列表',
				//width: '100%',
				//height: getClientHeight(),  
				fit : true,
				fitColumns: true,
				singleSelect: true,
				pagination:true,
				pageSize:10,
				nowrap:false
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
			    url:'<%=path%>/innerConcats/add.htmlx',
			    onSubmit: function() {
			    	if (!$('#infoForm').form('validate')) {
			    		showMsg("信息没有填写完整");
			    		return false;
			    	}
			        return true;
			    },   
			    success:function(data){
					if(data == 'success'||eval(data)=='success') {
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
				$.post('${path}/innerConcats/delete.htmlx', {ids:ids}, function(data) {
					if(data == 'success'||eval(data)=='success') {
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
<body>
<script>$.messager.progress({title:'加载',msg:'系统正在加载，请稍候...'});</script>
<%--工具条--%>
<div id="tb" style="height:auto">
	<div>
<%--		<a class="easyui-linkbutton" iconCls="icon-reload" plain="true" onclick="refresh()" href="javascript:void(0)">刷新</a>--%>
		<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addNew()" href="javascript:void(0)" >新增</a>
		<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="updateRow()" href="javascript:void(0)" >修改</a>
		<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="deleteRow()" href="javascript:void(0)" >删除</a>
	</div>
</div>
<div id="header" class="mainheader">
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td height="24" class="bodytitle">内部联系人管理，可以为系统的使用人员进行联系方式设置。</td>
		</tr>
	</table>	
</div>
<table id="showListTableId" idField="id" toolbar="#tb">
	<thead>
		<tr>
			<th field="id" width="10" hidden="true">ID</th>
			<th field="name" width="80">联系人姓名</th>
			<th field="phone" width="80" >联系人号码</th>
		</tr>
	</thead>
</table>
<%--将除了主table之外的页面控件放到这个隐藏的DIV中--%>

<div style="display:none">
	<div id="addNewWindow" title="新增/修改内部联系人" class="easyui-window" resizable="false" closed="true" modal="true"  style="top:50px;width:420px;">
		<a href="#" id="btnSave" iconCls="icon-save">保存</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
		<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
	        <table width="100%" height="100%" class="rowinsertarea">
	        	<input type="hidden" name="id"/>
	        	<tr>
	        		<td class="tablealignright">联系人名称：</td><td class="tablealignleft" colspan="3"><input class="easyui-validatebox input" name="name" required="true"/>
	        		</td>
	        	</tr>
	        	<tr>
	        		<td class="tablealignright">联系人号码：</td><td class="tablealignleft"  colspan="3"><input class="easyui-validatebox input" name="phone"></input></td>
	        	</tr>
	        </table>
		</form>
	</div>
</div>
</body>
</html>
