<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
  <script>
  	$(function(){

  		$('#contentTable').bootstrapTable({
            method: 'get',
            height:tableHeight,
            cache: false,
            url: path + '/consultation/noteList.do',
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [50,100,150,200,500],
            contentType: "application/x-www-form-urlencoded",
            //showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;
            	params.content = $("#content").val();
            	var _queryBeginTime = $("#queryBeginTime").val();
            	var _queryEndTime = $("#queryEndTime").val();
            	params.ltime = _queryBeginTime
            	params.htime = _queryEndTime
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'noteid',
                title: 'noteid',
                visible : false
            }, {
                field: 'questionuserphoto',
                title: '提问人头像',
                formatter:imgFormatter 
            },{
            	field: 'questionusername',
            	title: '提问人昵称'
            },{
            	field: 'questioncontent',
            	title: '提问内容'
            },{
                field: 'is_reply',
                title: '运行状态',
                formatter:statusFormatter
            },{
                field: 'questiontime',
                title: '提问时间'
            },{
                field: 'noteid',
                title: '操作',
                formatter:opterationFormatter
            }]
        });
  		$("#queryBeginTime").datetimepicker({  
         	  locale:"zh-cn",
         	  format:"YYYY-MM-DD HH:mm"
         });
  		$("#queryEndTime").datetimepicker({  
       	  locale:"zh-cn",
       	  format:"YYYY-MM-DD HH:mm"
       });
  	});
  	
  	
  	function opterationFormatter(value,row){
  	return "<a class='btn btn-info btn-xs' href='javascript:;' onclick='clickOrder("+value+");'><i class='fa fa-history'></i> 查看回答</a>";
  		 
  	}
  	function statusFormatter(value,row){
  		if(value==1){
  			return "<font style='color:red;cursor:pointer;' title='已回复'>已回复</font>";
  		}else if(value==0){
  			return "<font style='color:green;cursor:pointer;' title='未回复'>未回复</font>";
  		}
  		return value;
  	}
  	function imgFormatter(value,row){
  		if(value != "" && value != null){
  			return "<img src="+path+""+value+" style='width:100px;'/>";
  		}
  	}
  	 
   function deleteRows(){
	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	   if(rowDatas.length == 0 ){
		   showMsg('请选择要删除的数据！');
		   return;
	   }
	   showConfirm('确认要删除'+rowDatas.length+'条数据吗？',
		function(){
		   var _deleteArr = new Array();
		   for(var i = 0;i<rowDatas.length ; i++){
			   _deleteArr.push(rowDatas[i].noteid);
	       }
		   $.post(path + '/consultation/deleteNote.do',{noteid:_deleteArr.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showErr('删除失败！' + _backData);
		   });
	    });
   }
   
	 function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh', null);
     }

	 
	 function clickOrder(id){		
			//加载子内参
			orderUserTable(id);
		}	 
	 function orderUserTable(id){
		 $('#orderuser_contentTable').bootstrapTable('destroy', null);
		 $('#orderUser').modal('show');
		 $('#orderuser_contentTable').bootstrapTable({
	            method: 'post',
	            height:'500px',
	            cache: false,
	            url: path + '/consultation/noteAnswerList.do',
	            striped: true,
	            pagination: true,
	            pageSize: 10,
	            pageList: [10,20,50,100],
	            contentType: "application/x-www-form-urlencoded",
	            //showRefresh: true,
	            minimumCountColumns: 2,
	            clickToSelect: true,
	            queryParams:function(params){
	            	params.pageSize = params.limit;
	            	params.currentPage = params.offset / params.limit +1;
	            	params.noteid = id;
	            	return params;
	            },
	            sidePagination: "server", //服务端请求
	            columns: [{
	                checkbox: true
	            },{
	            	 field: 'id',
	                 title: 'id',
	                 visible : false
	            },{
	                field: 'photo',
	                title: '头像',
	                formatter:imgFormatter 
	            }, {
	                field: 'answerusername',
	                title: '回答老师'
	            }, {
	                field: 'answercontent',
	                title: '回答内容'
	            },{
	            	field: 'id',
	                title: '操作',
	                formatter:opterationFormatter1
	            }]
	        });
		 //refreshUserTable();
	 }
	 
	 function opterationFormatter1(value,row){	  		
	  		return "<a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteRows1()'><i class='fa fa-line-chart'></i> 删除</a>";
	  	}
	 function deleteRows1(){
		   var rowDatas = $('#orderuser_contentTable').bootstrapTable('getSelections', null);
		   if(rowDatas.length == 0 ){
			   showMsg('请选择要删除的数据！');
			   return;
		   }
		   showConfirm('确认要删除'+rowDatas.length+'条数据吗？',
			function(){
			   var _deleteArr = new Array();
			   for(var i = 0;i<rowDatas.length ; i++){
				   _deleteArr.push(rowDatas[i].id);
		       }
			   $.post(path + '/consultation/deleteNoteAnswer.do',{id:_deleteArr.toString()},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('删除成功！');
		   	  			refreshUserTable();
		   	  	   }else
		   	  			showErr('删除失败！' + _backData);
			   });
		    });
	   }
	 function refreshUserTable(){
		 $('#orderuser_contentTable').bootstrapTable('refresh', null);
	 }
	 
	 
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       <div style="margin-top: 10px;">
	       	<form class="form-inline">
	       		<div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">问题内容</label>
					<input type="text" class="form-control" id="content">					
				</div>
				<div class="form-group form-group-padding"
					style="padding-left: 5px;position: relative;">
					<label for="search_name">开始时间</label> <input type="text"
						class="form-control" id="queryBeginTime" >
				</div>
				<div class="form-group form-group-padding"
					style="padding-left: 5px;position: relative;">
					<label for="search_name">结束时间</label> <input type="text"
						class="form-control" id="queryEndTime" >
				</div>
	     	</form>
     	</div>
       	<div id="custom-toolbar">
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRows();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>
	          <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
	              <i class="fa fa-search fa-lg"></i> 查询
	         </a>
        </div> 
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>   
		
		<div class="modal fade" id="orderUser">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px; float:right; ">									
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#orderUser').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="orderuser_contentTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->			
   </div>			
       
  </body>
</html>
