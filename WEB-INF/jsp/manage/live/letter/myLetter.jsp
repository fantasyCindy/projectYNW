<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/common/common.jspf" %>
  	<meta charset="utf-8">
	<link href="${path}/live/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/live/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/live/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<link href="${path}/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<style type="text/css">
		.nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
		color: #FFFFFF;
		cursor: default;
		background-color: #33AFD4;
		border: 1px solid #ddd;
		border-bottom-color: transparent;
		}
	</style>
  </head>
  <script type="text/javascript">
  $(function(){
	  var tabli = $("#tab>li");
	  for(var i=0;i<tabli.length;i++){
		  var liEle = tabli[i];
		  if($(liEle).attr("class") == "active"){
			 if(i == 1){
				 loadLetterData(0);
			 }
		  }
		  $(liEle).bind("click",function(){
			  var index = $(this).index();
			  if(index == 0){
				  loadLetterData("");
			  }else if(index == 1){
				  loadLetterData(0);
			  }else if(index == 2){
				  loadLetterData(1);
			  }
		  });
	  }
	  
	  $("#queryBeginTime").datetimepicker({  
      	  locale:"zh-cn",
      	 format:"YYYY-MM-DD HH:mm"
      });
		$("#queryEndTime").datetimepicker({  
    	  locale:"zh-cn",
    	  format:"YYYY-MM-DD HH:mm"
    });
  });
  
  function loadLetterData(_status){
	  $('#tableData').bootstrapTable('destroy');
	  $('#tableData').bootstrapTable({
	      method: 'POST',
	      url: path + '/letter/letterList.htmlx',
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
	    	    params.queryName = $("#queryName").val();
	    	  	params.startTime = $("#queryBeginTime").val();
        		params.endTime = $("#queryEndTime").val();
	          	params.pageSize = params.limit;
	          	params.currentPage = params.offset / params.limit +1;
	          	params.status = _status;
	          	params.content = $("#queryContent").val();
	          	return params;
	      		},
	      rowAttributes:function(row,index){
	    	  	row.customOrder = index + 1;
	    	  	return row;
	      	  },
	      columns: [{
	          field: 'customOrder',
	          title: '序号'
	      }, {
	          field: 'createName',
	          title: '提问者'
	      },{
	          field: 'createtime',
	          title: '提问时间'
	      },{
	          field: 'content',
	          title: '提问内容'
	      },{
	          field: 'teacherName',
	          title: '被提问人'
	      },{
	          field: 'replytime',
	          title: '回复时间'
	      },{
	          field: 'replycontent',
	          title: '回复内容'
	      },{
	          field: 'id',
	          title: '操作',
	          formatter:operatorFormatter
	      }]
	  });
  }
  
  function operatorFormatter(value,row){
	  var showHtml = "";
	  /*
  	  if(row.is_reply == 0){
  		  showHtml = "<a class='btn btn-info btn-xs' href='javascript:;' onclick='openAnswerModal("+value+");'><i class='fa fa-reply'></i> 回复</a>";
  	  }
  	   else if(row.is_reply == 1){
  		  showHtml = "<a class='btn btn-info btn-xs' href='javascript:;' onclick='editModal("+value+");'><i class='fa fa-edit'></i> 详情</a>";
  	  } */
  	  var delHtml = "<a class='btn btn-info btn-xs' href='javascript:;' onclick='deleteData("+value+");'><i class='fa fa-trash-o'></i> 删除</a>";
	  return showHtml + delHtml;
  }
	 
 
  function openAnswerModal(_Id){
	 $('#formId')[0].reset();
     $('#addEditModel').find('.showErrInfoP').hide();
	 $("#hiddenId").val(_Id);
	 $('#addEditModel').modal('show');
  }
  
  
  function deleteData(_Id){
	   showConfirm('确认要删除数据吗？',
		function(){
		   $.post(path + '/letter/delete.htmlx',{id:_Id},function(_backData){
			   if("success" == _backData){
	   	  			showMsg('删除成功！');
	   	  	   }else
	   	  			showErr( _backData);
			   refreshData();
		   });
		   
	    });
  }
  
  
  
  function answerData(){
	  var _contentVal = $('#answercontentInput').val();
	  if(!_contentVal){
		  $('#answercontentInput').tooltip('show');
		  return;
	  }
	  var _params = $('#formId').serialize();
  	  $('#addEditModel').modal('hide');
  	  parent.showProcessWin();
  	  
  	  var _backSuccessMsg = '回复成功！';
  	  var _backFaildMsg = '回复失败！';
  	  var _postUrl = '/letter/answerLetter.htmlx';
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
  
  function clearquery(){
		 $("#queryForm")[0].reset();
		 refreshData();
	 }
  
  </script>
  
  <body>
	<div class="container-fluid maincontent">
		<input type="hidden" id="hiddenFsServerIdInput"/>
		<ul id="tab" class="nav nav-tabs">  
	        <li><a href="#" data-toggle="tab">全部私信</a></li>  
	        <li class="active"><a href="#home" data-toggle="tab">待解答</a></li>
	        <li><a href="#home" data-toggle="tab">已解答</a></li>    
		</ul>
		<div>
			<div class="row">
		   		<div id="toolBar">
			         <form class="form-inline" id="queryForm">
						<div class="form-group form-group-padding" style="padding-left: 5px;">
							<label>提问人/解答人：</label> 
							<input type="text" class="form-control" id="queryName" placeholder="输入提问人/解答人姓名进行搜索" style="width:300px;">
						</div>
						<div class="form-group form-group-padding" style="padding-left: 5px;">
							<label>提问/解答内容：</label> 
							<input type="text" class="form-control" id="queryContent" placeholder="输入提问/解答内容进行搜索" style="width:300px;">
						</div>
						<div class="form-group form-group-padding"
							style="padding-left: 5px;position: relative;">
							<label for="search_name">开始时间</label> <input type=text
								class="form-control" id="queryBeginTime" >
						</div>
						<div class="form-group form-group-padding"
							style="padding-left: 5px;position: relative;">
							<label for="search_name">结束时间</label> <input type="text"
								class="form-control" id="queryEndTime" >
						</div>
						<div class="form-group form-group-padding">
							<button type="button"  class="btn btn-info" onclick="refreshData();">
					              <i class="fa fa-search fa-lg"></i> 查询
					         </button>
						</div>
						<div class="form-group form-group-padding">
							<button type="button"  class="btn btn-primary" onclick="clearquery();">
					              <i class="fa fa-search fa-lg"></i> 清空
					         </button>
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
					    <input type="text" name="id" id="hiddenId" style="display:none;"/>
					    <fieldset>
					      <legend>回复私信</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
						  <div class="form-group" style="margin-top: -25px">
						    <label for="answercontentInput">请输入回复内容：</label>
						    <div>
						    <textarea class="form-control" name="replycontent" id="answercontentInput" placeholder="请输入回复内容" data-toggle="tooltip" data-placement="top" title="请输入解答内容!" style="width: 850px;height: 100px;"></textarea>
						  	</div>
						  </div>
					      <div style="text-align: center;margin-top: 10px">
				            <a href="javascript:void(0);" class="btn btn-success" onclick="answerData();">确定</a>
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