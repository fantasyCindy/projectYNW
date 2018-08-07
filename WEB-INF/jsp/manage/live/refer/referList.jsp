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
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/reference/referlist.do',
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
            	params.productStatus = $("#search_status").val();
            	var _queryBeginTime = $("#queryBeginTime").val();
            	var _queryEndTime = $("#queryEndTime").val();
            	params.startTime = _queryBeginTime
            	params.endTime = _queryEndTime
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'id',
                title: 'id',
                visible : false
            }, {
                field: 'puiblisher',
                title: '內参发布人'
            }, {
                field: 'title',
                title: '内参标题'
            },{
                field: 'productImg',
                title: '产品图片',
                formatter:imgFormatter
            },{
                field: 'productInfo',
                title: '产品详情'
            }, {
                field: 'price',
                title: '内参价格'
            }, {
                field: 'subscribenumber',
                title: '订阅人数'
            }, {
                field: 'serviceperiod',
                title: '服务周期'
            }, {
                field: 'updatefrequency',
                title: '每周期更新次数'
            }, {
                field: 'startTime',
                title: '开始时间'
            },{
                field: 'endTime',
                title: '结束时间'
            },{
                field: 'productStatus',
                title: '运行状态',
                formatter:statusFormatter
            },{
                field: 'pubtime',
                title: '发布时间'
            },{
                field: 'id',
                title: '操作',
                formatter:opterationFormatter
            },]
        });
  		$("#queryBeginTime").datetimepicker({  
         	  locale:"zh-cn",
         	  format:"YYYY-MM-DD hh:mm"
         });
  		$("#queryEndTime").datetimepicker({  
       	  locale:"zh-cn",
       	  format:"YYYY-MM-DD hh:mm"
       });
  	});
  	
  	
  	function opterationFormatter(value,row){
  		var status = row.productStatus;
  		if(status==1){
  			return "<a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteRows()'><i class='fa fa-line-chart'></i> 关闭内参</a>";
  		}else if(status==0){
  			return "<a class='btn btn-info btn-xs' href='javascript:;' onclick='updateIsActivity("+value+");'><i class='fa fa-history'></i> 更改为活动内参</a><a class='btn btn-info btn-xs' href='javascript:;' onclick='clickOrder("+value+");'><i class='fa fa-history'></i> 查看详细</a><a class='btn btn-info btn-xs' href='javascript:;' onclick='clickComment("+value+");'><i class='fa fa-history'></i> 查看评论</a><a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteRows();'><i class='fa fa-line-chart'></i> 关闭内参</a>";
  		} 
  	}
  	function statusFormatter(value,row){
  		if(value==1){
  			return "<font style='color:red;cursor:pointer;' title='预售中'>预售中</font>";
  		}else if(value==0){
  			return "<font style='color:green;cursor:pointer;' title='更新中'>更新中</font>";
  		}else if(value==2){
  			return "<font style='color:gary;cursor:pointer;' title='已完成'>已完成</font>";
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
			   _deleteArr.push(rowDatas[i].id);
	       }
		   $.post(path + '/reference/doOperateSelected.htm',{operType:"del",ids:_deleteArr.toString()},function(_backData){
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

	 function doOperate(){
		 var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
		   if(rowDatas.length == 0 ){
			   showMsg('请选择要审核的数据！');
			   return;
		   }
		   showOkCancel('确认要审核'+rowDatas.length+'条数据吗？',
			function(){
			   var _operateeArr = new Array();
			   for(var i = 0;i<rowDatas.length ; i++){
				   _operateeArr.push(rowDatas[i].combinationid);
		       }
			   $.post(path + '/combination/doOperateSelected.do',{operType:"yes",ids:_operateeArr.toString()},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('审核成功！');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('审核失败！' + _backData);
			   });
		    },
		    function(){
		    	var _operateeArr = new Array();
				   for(var i = 0;i<rowDatas.length ; i++){
					   _operateeArr.push(rowDatas[i].combinationid);
			       }
				   $.post(path + '/combination/doOperateSelected.do',{operType:"no",ids:_operateeArr.toString()},function(_backData){
					   if("success" == _backData){
			   	  		   showMsg('审核成功！');
						   reflushDataTable();
			   	  	   }else
			   	  			showErr('审核失败！' + _backData);
				   });
		    });
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
	            url: path + '/reference/referplist.do',
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
	            	params.referenceid = id;
	            	return params;
	            },
	            sidePagination: "server", //服务端请求
	            columns: [{
	                checkbox: true
	            },{
	            	 field: 'id',
	                 title: 'id',
	                 visible : false
	            }, {
	                field: 'content',
	                title: '内容'
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
			   $.post(path + '/reference_periodical/deleterow.htm',{id:_deleteArr.toString()},function(_backData){
			   		_backData = JSON.parse(_backData)
				   if("1" == _backData.status){
		   	  			showMsg('删除成功！');
		   	  			refreshUserTable();
		   	  	   }else
		   	  			showErr('删除失败！' + _backData.status);
			   });
		    });
	   }
	 function refreshUserTable(){
		 $('#orderuser_contentTable').bootstrapTable('refresh', null);
	 }
	 
	
	 function clickComment(id){		
			//加载内参评论
		referCommentTable(id);
	 }
	 function referCommentTable(id){
		 $('#referCommentTable').bootstrapTable('destroy', null);
		 $('#referComment').modal('show');
		 $('#referCommentTable').bootstrapTable({
	            method: 'post',
	            height:'500px',
	            cache: false,
	            url: path + '/reference/commentList.do',
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
	            	params.referenceid = id;
	            	return params;
	            },
	            sidePagination: "server", //服务端请求
	            columns: [{
	                checkbox: true
	            },{
	            	 field: 'id',
	                 title: 'id',
	                 visible : false
	            },  {
	                field: 'photo',
	                title: '头像',
	                formatter:imgFormatter
	            }, {
	                field: 'nickName',
	                title: '昵称'
	            },{
	                field: 'content',
	                title: '内容'
	            },{
	            	field: 'id',
	                title: '操作',
	                formatter:opterationFormatter2
	            }]
	        });
		 //refreshUserTable();
	 }
	 function opterationFormatter2(value,row){	  		
	  		return "<a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteRows2()'><i class='fa fa-line-chart'></i> 删除</a>";
	  	}
	 function deleteRows2(){
		   var rowDatas = $('#referCommentTable').bootstrapTable('getSelections', null);
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
			   $.post(path + '/reference/deletecomment.do',{id:_deleteArr.toString() },function(_backData){
				   if("success" == _backData){
		   	  			showMsg('删除成功！');
		   	  			refreshCommentTable();
		   	  	   }else
		   	  			showErr('删除失败！' + _backData);
			   });
		    });
	   }
	 function refreshCommentTable(){
		 $('#referCommentTable').bootstrapTable('refresh', null);
	 }
	 
	 
	 function updateIsActivity(referid){
		   if(referid == null){
			   showMsg('请选择要更改的数据！');
			   return;
		   }
		   showConfirm('确认要更改数据吗？',
			function(){			   
			   $.post(path + '/reference/updateIsActivity.do',{reference_id:referid },function(_backData){
				   if("success" == _backData){
		   	  			showMsg('修改成功！');
		   	  			reflushDataTable();
		   	  	   }else
		   	  			showErr('修改失败！' + _backData);
			   });
		    });
	   }
	 
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       <div style="margin-top: 10px;">
	       	<form class="form-inline">
	       		<div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">状态</label> 
					<select class="form-control" id="search_status">
						<option value="0">更新中</option>
						<option value="1">预售中</option>						
						<option value="2">已完成</option>
					</select>
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
	          <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
	              <i class="fa fa-search fa-lg"></i> 查询
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRows();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
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
					       		<div class="form-group form-group-padding" style="padding-left: 5px;float: right;">									
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
			
			
			<div class="modal fade" id="referComment">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px; float: right;">									
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#referComment').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="referCommentTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
   </div>			
       
  </body>
</html>
