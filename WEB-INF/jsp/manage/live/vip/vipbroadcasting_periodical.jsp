<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
	<link href="${path}/live/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/live/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/live/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	 <script type="text/javascript" src="${path }/live/js/ajaxfileupload.js"></script>
	<style type="text/css">
		.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
		color: #FFFFFF;
		cursor: default;
		background-color: #33AFD4;
		border: 1px solid #ddd;
		border-bottom-color: transparent;
		}
		
		.layui-layer-loading .layui-layer-loading1 {
			width: 250px;
			height: 37px;
			color: #FFFFFF;
			line-height:37px;
			background: url('${path}/plugins/layer/default/loading-1.gif') no-repeat;
			}
	</style>
  </head>
  <script type="text/javascript">
  $(function(){
	  var tabli = $("#tab>li");
	  for(var i=0;i<tabli.length;i++){
		  var liEle = tabli[i];
		  if($(liEle).attr("class") == "active"){
			 if(i == 0){
				 loadPeriodicalData(0);
			 }
		  }
		  $(liEle).bind("click",function(){
			  var index = $(this).index();
			  if(index == 0){
				  loadPeriodicalData(0);
			  }else if(index == 1){
				  loadPeriodicalData(1);
			  }
		  });
	  }
  });
  
  function loadPeriodicalData(_status){
	  $('#tableData').bootstrapTable('destroy');
	  $('#tableData').bootstrapTable({
	      method: 'GET',
	      url: path + '/vip_P/vip_PList.htmlx',
	      cache: false,
	      height: tableHeight,
	      striped: true,
	      pagination: true,
	      pageSize: 50,
	      pageList: [50, 100,150,200,500],
	      contentType: "application/x-www-form-urlencoded",
          sidePagination: "server", //服务端请求
	      search: false,
	      showRefresh: false,
	      minimumCountColumns: 2,
	      clickToSelect: true,
	      queryParams:function(params){
	          	params.pageSize = params.limit;
	          	params.currentPage = params.offset / params.limit +1;
	          	params.productStatus = _status;
	          	params.name = $("#queryName").val();
	          	return params;
	      		},
	      rowAttributes:function(row,index){
	    	  	row.customOrder = index + 1;
	    	  	if(_status == 1){
	    	  		row.shelf = 1;
	    	  	}
	    	  	return row;
	      	  },
	      columns: [{
	          field: 'customOrder',
	          title: '序号'
	      }, {
	          field: 'product_number',
	          title: '编号'
	      },{
	          field: 'name',
	          title: '名称',
	          formatter:nameFormatter
	      },{
	          field: 'createTime',
	          title: '发布时间'
	      },{
	          field: 'serviceperiod',
	          title: '服务周期',
	          formatter:serviceperiodFormatter
	      },{
	          field: 'registrationstartTime',
	          title: '报名开始时间'
	      },{
	          field: 'registrationendTime',
	          title: '报名结束时间'
	      },{
	          field: 'signupStatus',
	          title: '是否满员',
	          formatter:signupStatusFormatter
	      },{
	          field: 'current_person',
	          title: '当前人数'
	      },{
	          field: 'fullpersons',
	          title: '满额人数'
	      },{
	          field: 'id',
	          title: '操作',
	          formatter:operatorFormatter
	      }]
	  });
  }
  
  function nameFormatter(value,row){
	   if(row.shelf == 1){
		   return value;
	   }
	  return "<a href='javascript:;' onclick='openVipLive("+row.id+")'>"+value+"</a>";
  }
  
  function openVipLive(_id){
	  	if(_id != null && _id != ""){
	  		$.get(path+"/vip_P/queryById.htmlx?id="+_id,function(_backData){
	    		eval("var data = " +_backData);
	    		if(data.productStatus == 1){
	    			showOnlyErr("该大金矿已下架,请选择其他的大金矿进行直播！");
	    			refreshData();
	    			return false;
	    		}
	    		window.location.href = "${path}/vipLive/index.htmlx?vipperiodicalId="+_id+"&currentPage=1&pageSize=20";
	    	});
	  	}else{
	  		window.location.href = "${path}/vipLive/index.htmlx?currentPage=1&pageSize=20";
	  	}
		
  }
  
  function operatorFormatter(value,row){
	  var delHtml = "<a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteData("+value+");'><i class='fa fa-trash-o'></i> 删除</a>";
	  if(row.shelf == 1){
		  return delHtml;
	  }else{
		  var editHtml = "<a class='btn btn-info btn-xs' href='javascript:;' onclick='openAddEditModal(\"edit\","+value+");'><i class='fa fa-edit'></i> 修改</a>";
	  	  var shelfHtml = "<a class='btn btn-warning btn-xs' href='javascript:;' onclick='shelfData("+value+");'><i class='fa fa-download'></i> 下架</a>";
		  return editHtml + delHtml + shelfHtml;
	  }
  }
  
  function signupStatusFormatter(value,row){
  	  if(value == 0){
  		  return "否";
  	  }else{
  		  return "是";
  	  }
  }
	 
  function serviceperiodFormatter(value,row){
  	  if(value == 1){
  		  return "一个月";
  	  }else if(value == 3){
  		  return "三个月";
  	  }else if(value == 6){
  		return "六个月";
  	  }else if(value == 12){
  		return "十二个月";
  	  }else{
  		  return value;
  	  }
  }
	 
 
  function shelfData(_Id){
	   showConfirm('确认要下架此产品吗？',
		function(){
		   $.post(path + '/vip_P/shelf.htmlx',{id:_Id},function(_backData){
			   if("success" == _backData){
	   	  			showOnlyMsg('下架成功！');
	   	  		    refreshData();
	   	  	   }else
	   	  			showOnlyErr( _backData);
		   });
		   
	    });
  }
  
  function deleteData(_Id){
	   showConfirm('确认要删除数据吗？',
		function(){
		   $.post(path + '/vip_P/delete.htmlx',{id:_Id},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
	   	  	   }else
	   	  		   showOnlyErr( _backData);
			   refreshData();
		   });
		   
	    });
 }
  
  function publishData(){
	  var _doAddEditType =  $('#addEditTypeId').val();	
	  var _contentVal = $('#nameInput').val();
	  if(!_contentVal){
		  $('#nameInput').tooltip('show');
		  return;
	  }
	  var fullpersonsInputVal = $('#fullpersonsInput').val();
	  if(!fullpersonsInputVal){
		  $('#fullpersonsInput').tooltip('show');
		  return;
	  }
	  var registrationstartTimeInputVal = $('#registrationstartTimeInput').val();
	  if(!registrationstartTimeInputVal){
		  $('#registrationstartTimeInput').tooltip('show');
		  return;
	  }
	  var registrationendTimeInputVal = $('#registrationendTimeInput').val();
	  if(!registrationendTimeInputVal){
		  $('#registrationendTimeInput').tooltip('show');
		  return;
	  }
	  var _params = $('#formId').serialize();
  	  $('#addEditModel').modal('hide');
  	  parent.showProcessWin();
  	  
  	  var _backSuccessMsg = '发布成功！';
  	  var _backFaildMsg = '发布失败！';
  	  var _postUrl = '/vip_P/saveOrUpdate.htmlx';
  	  if('add' != _doAddEditType){
	    _backSuccessMsg = '修改成功！';
	    _backFaildMsg = '修改失败！';
	  }
  	  $.post(path + _postUrl,_params,function(_backData){
  	  		if("success" == _backData){
  	  			parent.closeProcessWin();
  	  		    refreshData();
  	  			showMsg(_backSuccessMsg);
  	  		} else {
	   	  		parent.closeProcessWin(function(){
	   	  			$('#addEditModel').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditModel').find('.showErrInfoP').show();
		   	  		$('#addEditModel').modal('show');
  	  			});
  	  		}
  	  });
	   
  }
  
  function refreshData(){
	  $('#tableData').bootstrapTable('refresh', null);
  }
  
function uploadImage() {
   var validSuccess = validateImgFile("imageInput");
   if(validSuccess){
	   var index = showLoading("图片文件正在上传中，请稍后...");
	   $.ajaxFileUpload({  
       url : path+"/vip_P/fileUpload.htmlx",  
        secureuri : false,  
        fileElementId : 'imageInput',  
        dataType : 'json',  
        success : function(_backData, status) {  
        	layer.close(index);
           	if("success" == _backData.flag){
           		showOnlyMsg("上传图片成功!");
           		$("#hiddenProductImg").val(_backData.returnPath);
           	 	$("#imagehow").attr("src",path+"\\"+_backData.returnPath);
           	}else{
           		showOnlyErr("上传图片失败!");
           	}
        },  
        error : function(data, status, e) { 
        	layer.close(index);
        	showOnlyErr("上传图片失败!"+e); 
       }  
     });  
   }
}  
 
 function openAddEditModal(_addEditType,_id){
   	$('#formId')[0].reset();
   	if('edit' == _addEditType){
   		$.get(path+"/vip_P/queryById.htmlx?id="+_id,function(_backData){
    		eval("var data = " +_backData);
    		loadData4Form($('#formId'),data);
    		if(data.productImg != null && data.productImg != ""){
    			$("#imagehow").attr("src",path+"\\"+data.productImg);
    		}
    	   	$('#formId fieldset legend').html('修改大金矿');
    	   	$('#addEditTypeId').val(_addEditType);
    	   	$('#addEditModel').find('.showErrInfoP').hide();
    	   	$('#addEditModel').modal('show');
    	});
   	}else{
   		$("#imagehow").attr("src","");
   	   	$('#formId fieldset legend').html('新增大金矿');
   	   	$('#addEditTypeId').val(_addEditType);
   	   	$('#addEditModel').find('.showErrInfoP').hide();
   	   	$('#addEditModel').modal('show');
   	}
   
}

  
  </script>
  
  <body>
	<div class="container-fluid maincontent">
		<ul id="tab" class="nav nav-tabs">  
	        <li class="active"><a href="#" data-toggle="tab">在架产品</a></li>  
	        <li><a href="#home" data-toggle="tab">下架产品</a></li>
		</ul>
		<div>
			<div class="row">
		   		<div id="toolBar">
			         <form class="form-inline">
						<div class="form-group form-group-padding" style="padding-left: 5px;">
							<label>大金矿名称：</label> 
							<input type="text" class="form-control" id="queryName" placeholder="输入大金矿名称进行搜索" style="width:300px;">
						</div>
		
						<div class="form-group form-group-padding" style="padding-left: 5px;">
							<a class="btn btn-info" href="javascript:;" onclick="refreshData();"> <i class="fa fa-search fa-lg"></i> 查询
							</a>
						</div>
						<div class="form-group form-group-padding" style="padding-left: 5px;">
							<a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('add',null);"> <i class="fa fa-external-link fa-lg"></i> 发布大金矿
							</a>
						</div>
						<div class="form-group form-group-padding" style="padding-left: 5px;">
							<a class="btn btn-danger" href="javascript:;" onclick="openVipLive(null);"> <i class="fa fa-play-circle fa-lg"></i> 进入大金矿直播
							</a>
						</div>
						
					</form>
		   		</div>
				<table id="tableData" data-toolbar="#toolBar"></table>
		     </div>
	     </div>
    </div>
  	<div>
  		<div class="modal fade" id="addEditModel">
			<div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="formId">
					    <input type="text" name="id" id="hiddenId" style="display: none;"/>
			            <input type="text" id="addEditTypeId" style="display: none;"/>
					    <fieldset>
					      <legend>新增大金矿</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
						  <div class="form-group">
						    <label for="nameInput">名称：</label>
						    <input type="text" class="form-control" name="name" id="nameInput" placeholder="请输入名称" data-toggle="tooltip" data-placement="top" title="请输入名称！" style="width:750px;">
						  </div>
						  
					      <div class="form-group">
						    <label for="serviceperiodSelect">服务周期：</label>
						     <select class="form-control" id="serviceperiodSelect" name="serviceperiod" style="width:300px;">
		   	 					<option value="1">一个月</option>
		   	 					<option value="3">三个月</option>
		   	 					<option value="6">六个月</option>
		   	 					<option value="12">十二个月</option>
      						</select>
						  </div>
						  
					      <div class="form-group">
						    <label for="fullpersonsInput">满额人数：</label>
						    <input type="number" class="form-control" name="fullpersons" id="fullpersonsInput" placeholder="请填写满额人数" style="width:345px;" data-toggle="tooltip" data-placement="top" title="请填写满额人数！">
						  </div>
						  
						    <div class="form-group">
						    <label for="registrationstartTimeInput">报名开始时间：</label>
						    <input type="text" class="form-control" name="registrationstartTime" id="registrationstartTimeInput" placeholder="请选择报名开始日期" style="width:295px;" data-toggle="tooltip" data-placement="top" title="请选择报名开始日期！">
						    <script type="text/javascript">
						    $('#registrationstartTimeInput').datetimepicker({  
					           	  locale:"zh-cn",
					           	  format:"YYYY-MM-DD HH:mm:ss"
					             });  
						    </script>
						  </div>
						  
						   <div class="form-group">
						    <label for="registrationendTimeInput">报名结束时间：</label>
						    <input type="text" class="form-control" name="registrationendTime" id="registrationendTimeInput" placeholder="请选择报名结束日期" style="width:295px;" data-toggle="tooltip" data-placement="top" title="请选择报名结束日期！">
						    <script type="text/javascript">
						    $('#registrationendTimeInput').datetimepicker({  
					           	  locale:"zh-cn",
					           	  format:"YYYY-MM-DD HH:mm:ss"
					             });  
						    </script>
						  </div>
						  
						  <div class="form-group">
						    <label for="nameInput">图片：</label>
						     <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:310px;">
						     <input type="hidden" class="form-control" name="productImg" id="hiddenProductImg">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						     <img id="imagehow" src="" style="width:250px;border:1px solid #FFFFFF;">
						  </div>
						  
						   <div class="form-group">
						    <label for="productInfoTextarea">产品详情：</label>
						    <div>
						    <textarea class="form-control" name="productInfo" id="productInfoTextarea" placeholder="产品详细信息" data-toggle="tooltip" data-placement="top" title="请输入产品详细信息!" style="width: 800px;height: 100px;"></textarea>
						  	</div>
						  </div>
						  
					      <div style="text-align: center;margin-top: 10px">
				            <a href="javascript:void(0);" class="btn btn-success" onclick="publishData();">确认发布</a>
				            <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#addEditModel').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div>
			</div>
		</div>
		
  	</div>	
	   
  </body>
</html>	