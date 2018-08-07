<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="${path}/css/tableStyle.css">
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>审批网站用户注册申请</title>
<script type="text/javascript">
function statusFormatter(value, rowData, rowIndex) {
	if (value == "0") return "未通过";
	else if (value == "1") return "通过";
	else return "未审核";
}

function dateFormatter(value, rowData, rowIndex) {
	if(value!=null){
	 return formatDate("y-m-d h:i:s",value);
	}
	return value;
}
function formatDate(formatStr, fdate)
{
 var fTime, fStr = 'ymdhis';
 if (!formatStr)
  formatStr= "y-m-d h:i:s";
 if (fdate)
  fTime = new Date(fdate);
 else
  fTime = new Date();
 var formatArr = [
 fTime.getFullYear().toString(),
 (fTime.getMonth()+1).toString(),
 fTime.getDate().toString(),
 fTime.getHours().toString(),
 fTime.getMinutes().toString(),
 fTime.getSeconds().toString() 
 ]
 for (var i=0; i<formatArr.length; i++)
 {
  formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
 }
 return formatStr;
}
function operFormatter(value, rowData, rowIndex) {
	var tmp = "";
	if (rowData.linkeduser) tmp+= "<a href=\"javascript:resetPwd('"+rowData.phonenumber+"','"+rowData.linkeduser+"')\">重置密码</a>";
	if (tmp)
	{
		tmp += "&nbsp;&nbsp;";
	}
	/* else if (rowData.auditstatus=="1" && !rowData.linkeduser) {
		if (tmp) tmp += "&nbsp;&nbsp;";
		tmp+= "<a href=\"javascript:toaddUser('"+rowData.phonenumber+"','"+rowData.id+"')\">添加用户</a>";
	}*/
	 else if (rowData.auditstatus == "2") {
		if (tmp) tmp += "&nbsp;&nbsp;";
		tmp+= "<a href=\"javascript:audit('"+rowData.id+"','"+rowData.phonenumber+"')\">审核</a>";
	} else if (rowData.auditstatus=="0") {
		if (tmp) tmp += "&nbsp;&nbsp;";
		tmp+= "<a href=\"javascript:deleteRow('"+rowData.id+"')\">删除</a>&nbsp;&nbsp;<a href=\"javascript:audit('"+rowData.id+"','"+rowData.phonenumber+"')\">再次审核</a>";
	}
	//deleteRow();
	return tmp;
}
$(function(){
	$("#auditstatuscombo").combobox({
		valueField: 'id',
		textField: 'text',
		required:true,
		data:[{id:'0',text:'拒绝'},{id:'1',text:'通过'}],
		onSelect : function(record)
		{
			if(record.id == '0')
				$('#createUesrTableId').hide();
			else
				$('#createUesrTableId').show();
		}
	});
	$('#showListTableId').datagrid({
		url: path +'/registerRequestlist.htmlx',
		title: '待审批的网站用户注册申请列表',
		//width: '100%',
		//height: getClientHeight(),  
		fit:true,
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
	    url:path +'/auditRegisterRequest.htmlx',
	    onSubmit: function() {
	    	if (!$('#infoForm').form('validate')) {
	    		showMsg("信息没有填写完整");
	    		return false;
	    	}
	    	
	    	if($("#auditstatuscombo").combobox('getValue') == '1'){
		    	if(!$('#login_name_id').val() || $('#login_name_id').val() == '' )
		    	{
		    		showErr("手机必须填写！");
					return ;
		    	}
		    	if(!$('#email_id').val() || $('#email_id').val() == '' )
		    	{
		    		showErr("邮箱必须填写！");
					return ;
		    	}
		    	if(!$('#username_id').val() || $('#username_id').val() == '' )
		    	{
		    		showErr("姓名必须填写！");
					return ;
		    	}
		    	if ($("#pwd1").val().length<6) {
					showErr("密码至少为6位");
					return ;
				}
				if ($("#pwd1").val()!=$("#pwd2").val()) {
					showErr("两次密码输入不一致");
					return ;
				}
			}
	        return true;
	    },   
	    success:function(data){
			if(data == 'success' || 'success' == eval(data)) {
				showMsg("操作成功");
				$('#addNewWindow').window('close');
				$('#showListTableId').datagrid('reload');
				$('#showListTableId').datagrid('clearSelections');
			} else {
				showMsg(data);
			}
	    }
	});
	/*
	$("#addUserForm").form({
		url: path + '/addRequestedUser.htmlx',
		onSubmit:function() {
	        return true;
	    },   
	    success:function(data){
			if(data == 'success' || 'success' == eval(data)) {
				showMsg("操作成功");
				$('#addUserWindow').window('close');
				$('#showListTableId').datagrid('reload');
				$('#showListTableId').datagrid('clearSelections');
			} else {
				showMsg(data);
			}
	    }
	});
	*/
	$("#resetForm").form({
		url: path + '/resetUserPwd.htmlx',
		onSubmit:function() {
	        return true;
	    },   
	    success:function(data){
			if(data == 'success' || 'success' == eval(data)) {
				showMsg("操作成功");
				$('#resetWindow').window('close');
				$('#showListTableId').datagrid('clearSelections');
			} else {
				showMsg(data);
			}
	    }
	});
	
	$.messager.progress('close');
});
/*
function validateAddUser() {
	if (!$('#addUserForm').form('validate')) {
		return ;
	}
	if ($("#pwd1").val().length<6) {
		showErr("密码至少为6位");
		return ;
	}
	if ($("#pwd1").val()!=$("#pwd2").val()) {
		showErr("两次密码输入不一致");
		return ;
	}
	$("#addUserForm").submit();
}
*/
function audit(id,_phone) {	
	$('#infoForm').form('clear');
	$("#hiddenid").val(id);
	$("#hiddenadduserid").val(id);
	$("#auditstatuscombo").combobox("setValue", "1");
	$('#createUesrTableId').show();
	$('#login_name_id').val(_phone);
	$('#username_id').val('网友' + _phone.substring(_phone.length - 4,_phone.length));
	$('#addNewWindow').window('open');
}
/*
function toaddUser(phone, id) {
	$('#addUserForm').form('clear');
	var node = new Object();
	node.id=id;
	node.login_name=phone;
	node.name="网友";
	$('#addUserForm').form('load', node);
	$('#addUserWindow').window('open');
}
*/
function resetPwd(phone, linkeduser) {
	$('#resetForm').form('clear');
	var node = new Object();
	node.linkeduser=linkeduser;
	$('#resetForm').form('load', node);
	$('#resetWindow').window('setTitle', '重置密码-' + phone);
	$('#resetWindow').window('open');
}
function validateResetUser() {
	if (!$('#resetForm').form('validate')) {
		return ;
	}
	if ($("#pwd11").val().length<6) {
		showErr("密码至少为6位");
		return ;
	}
	if ($("#pwd11").val()!=$("#pwd22").val()) {
		showErr("两次密码输入不一致");
		return ;
	}
	$("#resetForm").submit();
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
		$.post(path +'/deleteRegisterRequest.htmlx', {ids:ids}, function(data) {
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
<body>
<script>$.messager.progress({title:'加载',msg:'系统正在加载，请稍候...'});</script>
<table id="showListTableId" idField="teacherid">
	<thead>
		<tr>
		        	<th field="id" width="80" hidden="true">ID</th>
					<th field="phonenumber" width="80">手机号码</th>
					<th field="email" width="80">邮箱</th>
					<th field="ctime" width="80" formatter="dateFormatter">提交时间</th>
					<th field="auditstatus" width="80" formatter="statusFormatter">审核状态</th>
					<th field="auditor" width="80" hidden="true">审核人</th>
					<th field="auditorname" width="80">审核人</th>
					<th field="remark" width="80">审核备注</th>
					<th field="audittime" width="80" formatter="dateFormatter">审核时间</th>
					<th field="linkeduser" width="80" hidden="true">关联用户</th>
					<th field="linkedusername" width="80">关联用户</th>
					<th field="oper" width="80" formatter="operFormatter">操作</th>
		</tr>
	</thead>
</table>
<div style="display:none;">
<div id="addNewWindow" title="审核" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;top: 50px; left: 100px;">
<a href="#" id="btnSave" iconCls="icon-save">保存</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="id" id="hiddenid"/>
		       	 <tr >
	    			<td class="tablealignright tableth">审核状态：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input name="auditStatus" id="auditstatuscombo" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright tableth">审核备注：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<textarea name="remark" style="width: 250px;height:100px;"></textarea>
	    			</td>
				 </tr>
        </table>
        <table width="100%" height="100%" class="rowinsertarea" id="createUesrTableId">
        	<input type="hidden" name="userid" id="hiddenadduserid"/>
		       	 <tr >
	    			<td class="tablealignright tableth" style="width: 77px;">手机：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" name="login_name" readOnly="true" id="login_name_id" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright tableth" style="width: 77px;">邮箱：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" name="email" readOnly="true" id="email_id" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright tableth">姓名：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" name="name" id="username_id" />
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright tableth">密码：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" type="password" name="password"  id="pwd1"/>
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright tableth">确认密码：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" type="password" name="validPassword" id="pwd2"/>
	    			</td>
				 </tr>
        </table>
	</form>
</div>
<!-- 
<div id="addUserWindow" title="添加用户" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;">
<a href="#" onclick="validateAddUser()" class="easyui-linkbutton" iconCls="icon-save">保存</a>  <a href="#" onclick="$('#addUserWindow').window('close')" class="easyui-linkbutton" iconCls="icon-no">关闭</a>  
	<form id="addUserForm" method="post" style="margin: 0px;padding: 0px;">
        
	</form>
</div>
 -->
<div id="resetWindow" title="重置密码" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;">
<a href="#" onclick="validateResetUser()" class="easyui-linkbutton" iconCls="icon-save">保存</a>  <a href="#" onclick="$('#resetWindow').window('close')" class="easyui-linkbutton" iconCls="icon-no">关闭</a>  
	<form id="resetForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="linkeduser"/>
		       	 <tr >
	    			<td class="tablealignright">新密码：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" type="password" name="password" required="true" id="pwd11"/>
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">确认密码：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input class="easyui-validatebox" type="password" name="validPassword" required="true" id="pwd22"/>
	    			</td>
				 </tr>
        </table>
	</form>
</div>
</div>


</body>
</html>