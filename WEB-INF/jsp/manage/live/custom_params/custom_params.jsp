<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
<link rel="stylesheet" href="<%=path%>/css/tableStyle.css">
<title>自定义参数信息</title>
	<script>
	
		$(function(){
			$('#infoForm').form({
			    url:'<%=path%>/custom_params/save.htmlx',
			    success:function(data){
					if((data) == 'success' || eval(data) == 'success') {
						showMsgAlert("保存成功");
						$('#addNewWindow').window('close');
						$('#showListTableId').datagrid('reload');
						$('#showListTableId').datagrid('clearSelections');
					} else {
						showMsgAlert((data));
					}
			    }
			});
		});
	
		function saveParams()
		{
			$('#infoForm').submit();
		}
		function modifyPhoto(name,value) {
			$("#photonameid").val(name);
			$("#fileSpan").html("<input type='file' name='photofile' id='photofile' style='height:25px;' />");
			$('#modifyPhotoWindow').window('open');
		}
		function saveNewPhoto()
		{
			$('#photoForm').form('submit',{
			    onSubmit: function() {
			    	if (!$('#photoForm').form('validate')) {
			    		return false;
			    	}
			    	if(document.getElementById('photofile'))
			    	{
				    	if (!$("#photofile").val()) {
				    		showErr("请上传头像");
				    		return false;
				    	}
			    	}
			        return true;
			    },
			    success:function(data){
					if(data == 'success'  || 'success' == eval(data)) {
						showMsg("保存成功");
						$('#modifyPhotoWindow').window('close');
						window.top.focusTab(path+"/custom_params/index.htmlx", "系统参数配置");
					} else {
						showErr("保存失败 : " + data);
					}
			    }
			});
		}
	</script>
	
	<style>
		.odd{
			background-color:#CCCCFF;
		}
	</style>
</head>
<body>
<div  style=" overflow:scroll;height: 100%;" > 
			<div id="header" class="mainheader" style="padding: 10px;">
				系统参数配置。
			</div>
<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-save" onclick="saveParams();">保存</a>  
	<form id="infoForm" method="post" style="margin: 0px;padding: 0px;" action="<%=path%>/custom_params/save.htmlx">
        <table width="100%" height="100%" class="rowinsertarea">
       		 <c:forEach items="${o.customParamsList}" var="oneParam" varStatus="pos">
		       	 <tr ${pos.index % 2 != 0 ? 'class="odd"' : ''} >
	    			<td class="tablealignleft" style="width: 130px;"><strong>${oneParam.paramtitle}：</strong></td>
	    			<td class="tablealignleft" style="width:200px;">
	    				<c:if test="${oneParam.paramtype == 0}">
	    					<input class="easyui-validatebox input" style="height: 25px;" name="${oneParam.paramname}" value="${oneParam.paramvalue}" />
	    				</c:if>
	    				<c:if test="${oneParam.paramtype == 1}">
	    					<select name="${oneParam.paramname}" style="width:180px;height: 25px;">
	    						<c:forEach items="${oneParam.paramconsultMap}" var="oneMap">
		    						<option value="${oneMap.value}" ${ oneMap.value eq  oneParam.paramvalue ? 'selected="selected"' : ''} >
		    							${oneMap.key}
		    						</option>
	    						</c:forEach>
	    					</select>
	    				</c:if>
	    				<c:if test="${oneParam.paramtype == 2}">
	    					<img id="${oneParam.paramname}" src="${path }${oneParam.paramvalue}" style="width:200px;height:48px"/>
	    				</c:if>
	    			</td>
	    			<td class="tablealignleft" style="width: 130px;">
	    				<c:if test="${oneParam.paramtype == 2}">
	    				建议大小：<strong style="color: green;">650X120</strong>
	    				<a class="easyui-linkbutton" href="javascript:modifyPhoto('${oneParam.paramname}','${oneParam.paramvalue}')">点击修改</a>
	    				</c:if>
	    				<c:if test="${oneParam.paramtype != 2}">
	    				建议:<strong style="color: green;">${oneParam.parameditadv}</strong>
	    				</c:if>
	    			</td>
	    			<td class="tablealignleft" style="padding: 10px;">
	    				<strong>${oneParam.paramnote}</strong>
	    			</td>
				 </tr>
			 </c:forEach>
        </table>
	</form>

</div>

<div style="display:none;">
<div id="modifyPhotoWindow" title="修改图片" class="easyui-window" resizable="false" closed="true" modal="true"  style="width:420px; height:300px;">
<a class="easyui-linkbutton" href="#" onclick="saveNewPhoto()" id="photoSave" iconCls="icon-save">保存</a>  <a class="easyui-linkbutton" href="javascript:void(0);" onclick="$('#modifyPhotoWindow').window('close');" iconCls="icon-no">关闭</a>  
	<form id="photoForm" action="${path}/custom_params/modifyPhoto.htmlx" method="post" style="margin: 0px;padding: 0px;" enctype="multipart/form-data">
        <table width="100%" height="100%" class="rowinsertarea"  cellpadding="0" cellspacing="0">
        	<input type="hidden" name="teacherid"/>
		       	 <tr >
	    			<td class="tablealignright">头像：</td>
	    			<td class="tablealignleft" colspan="3">
	    				<input type="hidden" id="photonameid" name="name">
	    				<span id="fileSpan"></span>
	    			</td>
				 </tr>
        </table>
	</form>
</div>
</div>
</body>
</html>