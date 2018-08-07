<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	 <link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="${path }/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	<script>
		$(function(){
			create_feedbackTable();
		});
			//生成反馈列表表格
			function create_feedbackTable(){
			$('#Feedback_Table').bootstrapTable({
	  		  	method: 'GET',
	          	height:tableHeight,
	          	cache: false,
	            url: path + "/feedback/list.do",
	            striped: true,
	            pagination: true,
	            pageSize: 50,
	            pageList: [50,100,150,200,500],
	            contentType: "application/x-www-form-urlencoded",
	            sidePagination: "server", //服务端请求
	            search: false,
	            showRefresh: false,
	            minimumCountColumns: 2,
	            clickToSelect: true,
	            queryParams:function(params){
	            	params.nickname = $("#login_nameInput").val().trim();//输入框的值
	            	params.pageSize = params.limit;
	            	params.currentPage = params.offset / params.limit +1;
	            	return params;
	            },
	            columns: [{
	                checkbox: true
	            },{
	                field: 'id',
	                title: 'id',
	                visible : false
	            },{
	                field: 'username',
	                title: '姓名'
	            }
	            , {
	                field: 'nickname',
	                title: '昵称'
	            }
	            ,
	            {
	                field: 'phone',
	                title: '反馈电话'
	            }
	            ,
	            {
	                field: 'content',
	                title: '反馈内容',
	            }
	            , {
	                field: 'createtime',
	                title: '反馈时间'
	            }
	           
	            ]
	        });
			
		}
		function reflushDataTable(){
	     	$('#Feedback_Table').bootstrapTable('refresh',null);
	     }
			
			
		//删除
	   function deletes(){
		   var rowDatas = $('#Feedback_Table').bootstrapTable('getSelections', null);
		   if(rowDatas.length == 0 ){
			   showMsg('请选择要删除的项目！');
			    return; 
		   }
		   showConfirm('确认要删除这'+rowDatas.length+'个项目吗？',
			function(){
			   var _ids = new Array;
			   for(var i = 0;i<rowDatas.length ; i++){
				   _ids.push(rowDatas[i].id);
		       }
			   $.post(path + '/feedback/delete.do',{ids:_ids.toString()},function(_backData){
				   if("success" == _backData){
		   	  			showOnlyMsg('删除成功！');
		   	  			reflushDataTable();
		   	  	   }else
		   	  			showOnlyErr('删除失败！');	
				  		reflushDataTable();
			   });
		    }, function(){});
		     
	   }
		
		//查询
		function queryDisease(){
			create_feedbackTable();
			reflushDataTable();
		}
		function clearquery(){
			$("#login_nameInput").val("");
			reflushDataTable();
		}
			
	</script>
  </head>
  
  <body>
  	  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
	         <form class="form-inline" style="height:20px">
	       		<div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label for="todaysubject">昵称：</label>
				   	 <input type="text" class="form-control" name="nickname" id="login_nameInput" placeholder="输入昵称进行搜索">
				 </div>
				<div class="form-group form-group-padding">
					<button type="button" id="login_nameInput" class="btn btn-info" onclick="queryDisease();;">
			              <i class="fa fa-search fa-lg"></i> 查询
			         </button>
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-primary" onclick="clearquery();">
			              <i class="fa fa-search fa-lg"></i> 清空
			         </button>
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-danger" onclick="deletes();">
			              <i class="fa fa-search fa-lg"></i> 删除
			         </button>
	   			 </div>
   			</form>
       </div>
   	   <div class="row">
		  <table id="Feedback_Table" data-toolbar="#custom-toolbar"></table>
       </div>
   </div>
   
  </body>
</html>
