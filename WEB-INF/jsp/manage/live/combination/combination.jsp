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
            url: path + '/combination/zuheList.do',
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
            	params.status = $("#search_status").val();
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
                field: 'combinationid',
                title: 'combinationid',
                visible : false
            }, {
                field: 'teacherName',
                title: '发布人'
            }, {
                field: 'combination_name',
                title: '组合标题'
            },{
                field: 'combination_pic',
                title: '产品图片',
                formatter:imgFormatter
            },{
                field: 'combination_des',
                title: '产品简介'
            }, {
                field: 'order_price',
                title: '订阅价格'
            }, {
                field: 'peep_price',
                title: '瞄一眼'
            }, {
                field: 'target_revenue',
                title: '目标收益'
            }, {
                field: 'combination_maxterm',
                title: '最长期限'
            }, {
                field: 'starttime',
                title: '开始时间'
            },{
                field: 'endtime',
                title: '结束时间'
            },{
                field: 'status',
                title: '审核状态',
                formatter:statusFormatter
            },{
                field: 'createtime',
                title: '发布时间'
            }, {
                field: 'combinationid',
                title: '操作',
                formatter:operatorFormatter
            }]
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
  	
  	function statusFormatter(value,row){
  		if(value==0){
  			return "<font style='color:red;cursor:pointer;' title='未审核'>未审核</font>";
  		}else if(value==1){
  			return "<font style='color:green;cursor:pointer;' title='审批通过'>审批通过</font>";
  		}else if(value==2){
  			return "<font style='color:gary;cursor:pointer;' title='审批未通过'>审批未通过</font>";
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
			   _deleteArr.push(rowDatas[i].combinationid);
	       }
		   $.post(path + '/combination/doOperateSelected.do',{operType:"del",ids:_deleteArr.toString()},function(_backData){
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
	 function operatorFormatter(value,row){
  		 var detailHtml = "<input type='button' id='orderClick' onclick='clickOrder("+value+")' value='订阅用户'>";
  		 return detailHtml;
  	 }
	 function clickOrder(combinationid){		
			//加载后台用户
			orderUserTable(combinationid);
		}
	 
	 function orderUserTable(_combinationid){
		 $('#orderuser_contentTable').bootstrapTable('destroy', null);
		 $('#orderUser').modal('show');
		 $('#orderuser_contentTable').bootstrapTable({
	            method: 'get',
	            height:'500px',
	            cache: false,
	            url: path + '/combination/combinationOrderUser.htm',
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
	            	params.combinationid = _combinationid;
	            	return params;
	            },
	            sidePagination: "server", //服务端请求
	            columns: [{
	                checkbox: true
	            },{
	            	 field: 'photo',
	                 title: '头像',
	                 formatter:imgFormatter
	            }, {
	                field: 'nickname',
	                title: '昵称'
	            }]
	        });
		 //refreshUserTable();
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
					<label for="search_name">状态</label> 
					<select class="form-control" id="search_status">
						<option value="0">未审核</option>
						<option value="1">审核通过</option>
						<option value="2">审核未通过</option>
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
	         <a class="btn btn-warning" href="javascript:;" onclick="doOperate();">
	              <i class="fa fa-check-square-o fa-lg"></i> 审核
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
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">									
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
