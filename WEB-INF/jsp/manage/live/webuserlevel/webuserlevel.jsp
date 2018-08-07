<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="<%=path%>/css/tableStyle.css">
<title>直播室用户权限维护</title>
	<script>
	/*function roomlevelFormatter(v) {
		if (!v || v == "1") {
			v = "<span style='color:green'>普通</span>";
		} else if (v == "2") {
			v = "<span style='color:blue'>初级</span>";
		} else if (v == "3") {
			v = "<span style='color:orange'>中级</span>";
		} else if (v == "4") {
			v = "<span style='color:red'>高级</span>";
		}
		return v;
	}*/
		$(function(){
			/*$("#roomlevel").combobox({
				valueField: 'id',
				textField: 'text',
				url : '${path}/broadcasting_room_level/combolist.htmlx'
				//data:[{id:'1',text:'普通'},{id:'2',text:'初级'},{id:'3',text:'中级'},{id:'4',text:'高级'}]
			});*/
			$('#showListTableId').datagrid({
				url: '<%=path%>/webuserlevel/list.htmlx',
				title: '直播室用户权限列表',
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
			    url:'${path}/webuserlevel/addEdit.htmlx',
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
					} else {
						showErr("保存失败");
					}
			    }
			});
			
			$.messager.progress('close');
		});
		
		function addNew() {
			$('#infoForm').form('clear');
			//$("#roomlevel").combobox("setValue",1);
			$('#addNewWindow').window('open');
		}
		function updateRow() {
			if (!hasSelected(true)) return ;
			var node = $('#showListTableId').datagrid('getSelected');
			$('#infoForm').form('load', node);
			/*if (!node.roomlevel) {
				$("#roomlevel").combobox("setValue",1);
			}*/
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
				$.post('<%=path%>/webuserlevel/delete.htmlx', {ids:ids}, function(data) {
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
		        	<th field="levelid" width="80" hidden="true"></th>
					<th field="name" width="80">用户级别名称</th>
					<%-- <th field="number" width="280">级别编号</th>--%>
					<th field="minfunds" width="80">最小资金量（万元）</th>
					<th field="maxfunds" width="80">最大资金量（万元）</th>
					<th field="remark" width="80">说明</th>
					<th field="roomlevel_name" width="80" >可访问的直播室</th>
					<th field="roomlevel" width="80" hidden="true"></th>
		</tr>
	</thead>
</table>
<div id="addNewWindow" title="新增/修改直播室公告信息" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:480px;">
<a href="#" id="btnSave" iconCls="icon-save">发布</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="levelid"/>
        		<tr >
	    			<td class="tablealignright">用户级别名称：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="name" required="true"/>
	    			</td>
				 </tr>
        		<%--<tr >
	    			<td class="tablealignright">级别编号：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-numberbox input" name="number" />
	    			</td>
				 </tr> --%>
        		<tr >
	    			<td class="tablealignright">最小资金量（万元）：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-numberbox input" name="minfunds" maxlength="5" required="true"/>
	    			</td>
				 </tr>
        		<tr >
	    			<td class="tablealignright">最大资金量（万元）：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-numberbox input" name="maxfunds" maxlength="5" required="true"/>（0代表无上限）
	    			</td>
				 </tr>
        		<tr >
	    			<td class="tablealignright">可访问的直播室等级：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-combobox input"  name="roomlevel" required="true"  valueField="roomlevel" textField="roomlevel_name"  url="${path}/broadcasting_room_level/combolist.htmlx"/>
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">说明：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<textarea class="easyui-validatebox" style="width: 300px;height: 200px;" name="remark"></textarea>
	    			</td>
				 </tr>
        </table>
	</form>
</div>




</body>
</html>

