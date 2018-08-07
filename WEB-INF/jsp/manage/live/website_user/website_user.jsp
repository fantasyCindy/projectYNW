<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="<%=path%>/css/tableStyle.css">
<title>网站用户</title>
	<script>
		$(function(){
			$('#showListTableId').datagrid({
				url: '<%=path%>/website_user/list.htmlx',
				title: '网站用户列表',
				//width: '100%',
				//height: getClientHeight(),  
				fit:true,
				fitColumns: true,
				singleSelect: true,
				pagination:true,
				pageSize:10,
				nowrap:false,
				onBeforeLoad: function(param) {
					if (!param) {
						param = new Object();
					}
					var login_name = $('#query_loginname_id').val();
					var name = $('#query_username_id').val();
					param.login_name = login_name;
					param.name = name;
				}/*,
				onClickRow: function(rowIndex, rowData) {
					if (getEvent().shiftKey) {
						var startRowIndex = $('#showListTableId').datagrid('getRowIndex', $('#showListTableId').datagrid('getSelected'));
						var start = rowIndex < startRowIndex ? rowIndex : startRowIndex;
						var end = rowIndex < startRowIndex ? startRowIndex : rowIndex;
						$('#showListTableId').datagrid('clearSelections');
						$('#showListTableId').datagrid('selectRow', startRowIndex);
						for (var i = start ; i <= end; i++) {
							$('#showListTableId').datagrid('selectRow', i);
						}
						return ;
					}
					if (!getEvent().ctrlKey) {
						$('#showListTableId').datagrid('clearSelections');
					}
					var hasSelect = false;
					if (selectCustomerids && selectCustomerids.length > 0) {
						for (var i = 0; i < selectCustomerids.length; i++) {
							if (selectCustomerids[i] == rowData.customerid) {
								hasSelect = true;
							}
						}
					}
					if (!hasSelect || (!getEvent().ctrlKey && selectCustomerids.length > 1)) {
						$('#showListTableId').datagrid('selectRow', rowIndex);
					}
					var nodes = $('#showListTableId').datagrid('getSelections');
					selectCustomerids = [];
					if (nodes && nodes.length > 0) {
						for (var i = 0; i < nodes.length; i++) {
							selectCustomerids[selectCustomerids.length] = nodes[i].customerid;
						}
					}
					return ;
				}*/
			});
			
			var selectCustomerids = [];//记住grid中被选中的行的ID
			
			$('#btnClose').click(function() {
				$('#addNewWindow').window('close');
			});
			$('#btnSave').click(function() {
				$('#infoForm').submit();
			});
			$('#btnSave').linkbutton({plain:false});
			$('#btnClose').linkbutton({plain:false});
			$('#infoForm').form({
			    url:'<%=path%>/website_user/addEdit.htmlx',
			    onSubmit: function() {
			    	if (!$('#infoForm').form('validate')) {
			    		showMsg("信息没有填写完整");
			    		return false;
			    		}
			    	var room_level = $("#room_level").combotree('getValue')
			    	if(room_level==null||room_level==""){
			    		showErr("请选择访问直播室！");
			    		return false;
			    	}
		    			/*if ($("#passwordInputId").val().length<6) {
							showErr("密码至少为6位");
							return false;
						}*/
						/*var myreg=/^1[358]\d{9}$/;
						if(!myreg.test($("#phoneID").val())){                 
							alert('请输入有效的手机号码！');
							return false;
						}*/
						
						if ($("#passwordInputId").val()!=$("#pwd2").val()) {
							showErr("两次密码输入不一致");
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
			$("#login_name_id").attr("readonly",false);
			$('#addNewWindow').window('open');
		}
		
		function editPassword()
		{
			if (!hasSelected(true)) return ;
			var node = $('#showListTableId').datagrid('getSelected');
			$('#infoForm').form('load', node);
			//$('#passwordInputId').val('');
			$('#pwd2').val(node.password);
			$("#login_name_id").attr("readonly",true);
			$('#addNewWindow').window('open');
		}
		
		function refresh()
		{
			$('#showListTableId').datagrid('reload');
		}

		
		function deleteRow() {
			if (!hasSelected(false)) return ;
			confirm("确认删除？", function(e) { if (e) {
				var nodes = $('#showListTableId').datagrid('getSelections');
				var ids = "";
				for(var i = 0;i< nodes.length;i++)
				{
					ids += nodes[i].userid;
					if(i != (nodes.length -1))
						ids += ',';
				}
				$.post('<%=path%>/website_user/delete.htmlx', {ids:ids}, function(data) {
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
		function clearQuery(){
			$("#query_loginname_id").val("");
			$("#query_username_id").val("");
		}
		
		function setUserlevelName(value, rowData, rowIndex){
			return rowData.roomlevel_name;
		}
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body  style="width: 100%;height: 100%;padding: 0;margin: 0;">
<script>$.messager.progress({title:'加载',msg:'系统正在加载，请稍候...'});</script>
<div id="tb" style="height:auto">
	<div>
		登陆名：<input type="text" name="loginname" id="query_loginname_id" />
		姓  名：<input type="text" name="username" id="query_username_id"  />
		<a class="easyui-linkbutton" iconCls="icon-search" plain="false" onclick="refresh();" href="javascript:void(0)">查询</a>
		<a class="easyui-linkbutton" iconCls="icon-reload" plain="false" onclick="clearQuery()" href="javascript:void(0)">清空查询条件</a>
		
		<br/>
		
		<a class="easyui-linkbutton" iconCls="icon-reload" plain="false" onclick="$('#showListTableId').datagrid('reload');" href="javascript:void(0)">刷新</a>
		<a class="easyui-linkbutton" iconCls="icon-add" plain="false" onclick="addNew();" href="javascript:void(0)">添加</a>
		<a class="easyui-linkbutton" iconCls="icon-edit" plain="false" onclick="editPassword();" href="javascript:void(0)">修改/密码</a>
		<a class="easyui-linkbutton" iconCls="icon-remove" plain="false" onclick="deleteRow();" href="javascript:void(0)">删除</a>
		
	</div>
</div>
<table id="showListTableId" idField="userid"  toolbar="#tb">
	<thead>
		<tr>
        	<th field="userid" width="80" hidden="true">用户ID</th>
			<th field="login_name" width="80">手机</th>
			<th field="email" width="80">邮箱</th>
			<th field="userlevel" width="80" formatter="setUserlevelName">可访问直播室</th>
			<th field="password" width="80" hidden="true">密码</th>
			<th field="name" width="80">姓名</th>
			<th field="qq_msn" width="80">QQ</th>
			<th field="note" width="80">备注</th>
			
		</tr>
	</thead>
</table>
<div id="addNewWindow" title="修改网站用户密码" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;">
<a href="#" id="btnSave" iconCls="icon-save">保存</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="userid"/>
		       	 <tr >
	    			<td class="tablealignright">手机：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" id="login_name_id" name="login_name" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">邮箱：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="email" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">访问直播室：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-combobox input" editable="false" name="userlevel" id="room_level" valueField="id" textField="text" url="${path}/broadcasting_room_level/combolist.htmlx"/>
	    			</td>
				 </tr>
		       	 <%--<tr >
	    			<td class="tablealignright">所属直播室:</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-combobox input" editable="false" name="roomid" valueField="id" textField="text" url="${path}/broadcastingRoom/list.htmlx"/>
	    			</td>
				 </tr> --%>
				 <tr >
	    			<td class="tablealignright">姓  名：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox input" name="name" />
	    			</td>
				 </tr>
<%--				 <tr >--%>
<%--	    			<td class="tablealignright">联系方式：</td>--%>
<%--	    			<td class="tablealignleft" colspan="3">--%>
<%--	    				<input class="easyui-validatebox input" name="phone" id="phoneID"/>--%>
<%--	    			</td>--%>
<%--				 </tr>--%>
		       	 <tr >
	    			<td class="tablealignright">密码：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input style="width: 180px;" class="easyui-validatebox" type="password" name="password" required="true" id="passwordInputId"/>
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">确认密码：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input style="width: 180px;" class="easyui-validatebox" type="password" name="validPassword" required="true" id="pwd2"/>
	    			</td>
				 </tr>
				 <tr >
	    			<td class="tablealignright">备   注：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<textarea style="width: 330px; height: 150px;"  name="note" id="noteId"></textarea>
	    			</td>
				 </tr>
        </table>
	</form>
</div>

</body>
</html>

