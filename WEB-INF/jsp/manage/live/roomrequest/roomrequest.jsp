<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="${path}/css/tableStyle.css">
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>直播室申请审核</title>
<script type="text/javascript">
function imageFormatter(value) {
	if (value) return "<img src='" + path + value + "' style='width:80;height:80px;'>";
	return value;
}
function auditflatformatter(v,r) {
	if (r.auditflat=='0')
		v='未审核';
	else if (r.auditflat=='1')
		v='通过';
	else if (r.auditflat=='2')
		v='未通过';
	return v;
}
function operformatter(v,r) {
	var html="";
	if (r.auditflat=='0')
		html+="<a href='javascript:;' onclick=\"audit('" + r.roomid + "')\">审核</a>";
	if (html) html+="&nbsp;&nbsp;";
	html+="<a href='javascript:;' onclick=\"deleteRow('" + r.roomid + "')\">删除</a>";
	return html;
}
$(function(){
	$("#auditflatcombobox").combobox({
		valueField:'id',
		textField:'text',
		data:[
		      {id:'1',text:'通过审核'},
		      {id:'2',text:'拒绝'}
		      ]
	});
	$("#query_auditflat").combobox({
		valueField:'id',
		textField:'text',
		data:[
			  {id:'0',text:'未审核'},
		      {id:'1',text:'通过审核'},
		      {id:'2',text:'拒绝'},
		      {id:'',text:'全部'}
		      ]
	});
	$('#showListTableId').datagrid({
		url: '<%=path%>/broadcasting_room/roomrequestlist.htmlx',
		title: '直播室列表',
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
			var auditflat = $('#query_auditflat').combobox("getValue");
			param.auditflat = auditflat;
		}
	});
	$('#btnClose').click(function() {
		$('#addNewWindow').window('close');
	});
	$('#btnSave').click(function() {
			$('#infoForm').form('submit',{
			    url:path + '/broadcasting_room/auditRoomrequest.htmlx',
			    onSubmit: function() {
			        return true;
			    },   
			    success:function(data){
					if(data == 'success' || 'success' == eval(data)) {
						showMsg("操作成功");
						$('#addNewWindow').window('close');
						$('#showListTableId').datagrid('reload');
						$('#showListTableId').datagrid('clearSelections');
					} else {
						showErr("操作失败");
					}
			    }
			});
	});
	$('#btnSave').linkbutton({plain:false});
	$('#btnClose').linkbutton({plain:false});
	
	
	$.messager.progress('close');
});

function audit(roomid) {
	var node = new Object();
	node.roomid=roomid;
	$('#infoForm').form('load', node);
	$('#addNewWindow').window('open');
}

function deleteRow(roomid) {
	confirm("确认删除？", function(e) { if (e) {
		$.post('<%=path%>/broadcasting_room/deleteRequest.htmlx', {ids:roomid}, function(data) {
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

<div id="tb" style="height:auto">
	<div>
		审核状态：<input type="text" class="auditflatcomboboxCls" id="query_auditflat" value="0"/>
		<a class="easyui-linkbutton" iconCls="icon-search" plain="false" onclick="refresh();" href="javascript:void(0)">查询</a>
	</div>
</div>
<table id="showListTableId" idField="roomid" toolbar="#tb">
	<thead>
		<tr>
		        	<th field="roomid" width="80" hidden="true">ID</th>
					<th field="photo" width="80" formatter="imageFormatter">形象图片</th>
					<th field="userid" width="80" hidden="true">申请人</th>
					<th field="auditor" width="80" hidden="true">审核人</th>
					<!-- 
					<th field="position" width="80">直播定位</th>
					 -->
					<th field="title" width="80">标题</th>
					<th field="content" width="80">内容安排</th>
					<th field="timeString" width="80">时间安排</th>
					<th field="auditflat" width="80" hidden="true">审核状态(0未审核，1通过，2未通过)</th>
					<th field="auditflat1" width="80" formatter="auditflatformatter">审核状态</th>
					<th field="userName" width="80">申请人</th>
					<th field="createtimeStr" width="80">申请时间</th>
					<th field="auditorName" width="80">审核人</th>
					<th field="audittimeStr" width="80">审核时间</th>
					<th field="auditremark" width="80">审核备注</th>
					<th field="oper" width="80" formatter="operformatter">操作</th>
		</tr>
	</thead>
</table>
<div id="addNewWindow" title="直播室审核" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px;">
<a href="#" id="btnSave" iconCls="icon-save">确定</a>  <a href="#" id="btnClose" iconCls="icon-no">关闭</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;">
        <table width="100%" height="100%" class="rowinsertarea">
        	<input type="hidden" name="roomid"/>
		       	 <tr >
	    			<td class="tablealignright">审核状态：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input  name="auditflat" id="auditflatcombobox" required="true"/>
	    			</td>
				 </tr>
		       	 <tr >
	    			<td class="tablealignright">备注：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<textarea name="auditremark" style="width:250;height:100;" id="auditremark"></textarea>
	    			</td>
				 </tr>
        </table>
	</form>
</div>


</body>
</html>