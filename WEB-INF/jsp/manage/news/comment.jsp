<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
    <script type="text/javascript" src="/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>    
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
    <script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
  <script>
  	 $(function(){
  		$('#contentTable').bootstrapTable({
  		  	method: 'GET',
          	height:tableHeight,
          	cache: false,
            url: path + '/backNews/commentList.do',
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
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;
            	var _queryBeginTime = $("#queryBeginTime").val();
            	var _queryEndTime = $("#queryEndTime").val();
            	params.title = $("#title").val();
            	params.content = $("#content").val();
            	params.startTime = _queryBeginTime;
            	params.endTime = _queryEndTime;
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'id',
                title: 'id',
                visible : false
            },{
                field: 'article_name',
                title: '资讯文章名'
            },{
                field: 'content',
                title: '评论内容'
            },{
                field: 'nickname',
                title: '评论人'
            },{
                field: 'create_time',
                title: '评论时间'
            }
            ]
        });
  	});
  	 
  	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
    function deletes(){
 	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
 	   if(rowDatas.length == 0 ){
 		   showMsg('请选择要删除的数据！');
 		   return;
 	   }
 	   showConfirm('确认要删除'+rowDatas.length+'条数据吗？',
 		function(){
 		   var _delIdArr = new Array();
 		   for(var i = 0;i<rowDatas.length ; i++){
 			   _delIdArr.push(rowDatas[i].id);
 	       }
 		   $.post(path + '/backNews/delComment.do',{ids:_delIdArr.toString()},function(_backData){
 			   if("success" == _backData){
 				   showOnlyMsg('删除成功！');
 	   	  	   }else
 	   	  			showOnlyErr('删除失败！' + _backData);
 			   reflushDataTable();
 		   });
 		   
 	    });
    }	
   
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
  			<form class="form-inline">	       		       		
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
				<div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">文章名</label>
					<input type="text" class="form-control" id="title">					
				</div>
				<div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">评论内容</label>
					<input type="text" class="form-control" id="content">					
				</div>
	     	</form>
       <div class="row" style="margin-top:-15px;">
	       	<div id="custom-toolbar">		        
		         <a class="btn btn-danger" href="javascript:;" onclick="deletes();">
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
  </body>
</html>
