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
            url: path + '/reference/list.htm',
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
                field: 'id',
                title: 'id',
                visible : false
            },{
                field: 'teacherid',
                title: 'teacherid',
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
            },{
                field: 'startTime',
                title: '开始时间'
            },{
                field: 'endTime',
                title: '结束时间'
            },{
                field: 'status',
                title: '审核状态',
                formatter:statusFormatter
            },{
                field: 'pubtime',
                title: '发布时间'
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
  	function typeFormatter(value,row){
  		if(value !=null){
  			return "<font style='color:red;cursor:pointer;' title='交流'>交流</font>";
  		}else if(value==1){
  			return "<font style='color:green;cursor:pointer;' title='回复'>回复</font>";
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
			   var teacherids = new Array();
			   for(var i = 0;i<rowDatas.length ; i++){
				   _operateeArr.push(rowDatas[i].id);
				   teacherids.push(rowDatas[i].teacherid);
		       }
			   $.post(path + '/reference/doOperateSelected.htm',{operType:"yes",ids:_operateeArr.toString(),teacherid:teacherids.toString()},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('审核成功！');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('审核失败！' + _backData);
			   });
		    },
		    function(){
		    	 var _operateeArr = new Array();
				   var teacherids = new Array();
				   for(var i = 0;i<rowDatas.length ; i++){
					   _operateeArr.push(rowDatas[i].id);
					   teacherids.push(rowDatas[i].teacherid);
			       }
				   $.post(path + '/reference/doOperateSelected.htm',{operType:"no",ids:_operateeArr.toString(),teacherid:teacherids.toString()},function(_backData){
					   if("success" == _backData){
			   	  		   showMsg('审核成功！');
						   reflushDataTable();
			   	  	   }else
			   	  			showErr('审核失败！' + _backData);
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
		
   </div>			
       
  </body>
</html>
