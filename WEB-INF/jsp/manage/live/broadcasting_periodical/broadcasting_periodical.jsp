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
  	var roomid = "${roomid}";
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/broadcasting_periodical/list.do',
            striped: true,
            pagination: true,
            pageSize: 50,
            pageList: [50,100,150,200,500],
            contentType: "application/x-www-form-urlencoded",
            //showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            	params.rows = params.limit;
            	params.page = params.offset / params.limit +1;
            	var _queryBeginTime = $("#queryBeginTime").val();
            	var _queryEndTime = $("#queryEndTime").val();
            	var _todaysubject = $("#todaysubject").val();
            	params.todaysubject = _todaysubject;
            	params.queryBeginTime = _queryBeginTime;
            	params.queryEndTime = _queryEndTime;
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'periodicalid',
                title: 'periodicalid',
                visible : false
            }, {
                field: 'broadcastingTime',
                title: '直播时间'
            }, {
                field: 'todaysubject',
                title: '今日主题'
            }, {
                field: 'roomTitle',
                title: '直播室'
            }, {
                field: 'teacherName',
                title: '直播老师'
            }, {
                field: 'membercount',
                title: '参与人数'
            }, {
                field: '',
                title: '回答问题'
            }, {
                field: 'status',
                title: '状态',
                formatter:statusFormatter
            }, {
                field: 'periodicalid',
                title: '操作',
                formatter:opterationFormatter
            }]
        });
  		
  		$("#beginTime").datetimepicker({  
         	  locale:"zh-cn",
         	  format:"HH:mm"
         });
  		$("#endTime").datetimepicker({  
       	  locale:"zh-cn",
       	  format:"HH:mm"
       });
  		$("#queryBeginTime").datetimepicker({  
         	  locale:"zh-cn",
         	 format:"YYYY-MM-DD HH:mm"
         });
  		$("#queryeNDTime").datetimepicker({  
       	  locale:"zh-cn",
       	  format:"YYYY-MM-DD HH:mm"
       });
  	});
  	
  	function statusFormatter(value,row){
  		if(value==0){
  			return "<font style='color:green;cursor:pointer;' title='正在直播'>正在直播</font>";
  		}else if(value==1){
  			return "<font style='color:red;cursor:pointer;' title='已关闭'>已关闭</font>";
  		}
  		return value;
  	}
  	
  	function opterationFormatter(value,row){
  		var status = row.status;
  		if(status==0){
  			return "<a class='btn btn-danger btn-xs' href='javascript:;' onclick='openBroadCasting("+value+",\"1\");'><i class='fa fa-line-chart'></i> 进入直播</a><a class='btn btn-danger btn-xs' href='javascript:;' onclick='closeBroadCasting("+value+");'><i class='fa fa-line-chart'></i> 关闭期刊</a>";
  		}else if(status==1){
  			return "<a class='btn btn-info btn-xs' href='javascript:;' onclick='openBroadCasting("+value+",\"1\");'><i class='fa fa-history'></i> 查看历史</a>";
  		} 
  		return value;
  	}
  	
	 function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh', null);
     }
	 
	 function openBroadCasting(_periodicalid,_type){
		 //历史直播
		window.location.href="${path}/broadcasting/historyDetail.do?dir=def&periodicalid="+_periodicalid;
		 
	 }
	 function closeBroadCasting(_periodicalid){		
		 showConfirm('确认要关闭吗？',
			function(){			   
			   $.post(path + '/broadcasting/closePeriodicalById.do',{operType:"yes",periodicalid:_periodicalid},function(_backData){
				   if("success" == _backData){
		   	  			showMsg('关闭成功！');
					   reflushDataTable();
		   	  	   }else
		   	  			showErr('关闭失败！' + _backData);
			   });
		    });
		 
	 }
	 
	 function clearquery(){
		 $("#queryForm")[0].reset();
	 }
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       <div style="margin-top: 10px;">
	       	<form class="form-inline" id="queryForm">
	       		<div class="form-group form-group-padding" style="padding-left: 5px;">
			      	<label for="todaysubject">主题：</label>
				   	 <input type="text" class="form-control" id="todaysubject" placeholder="输入主题进行搜索">
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
					<button type="button"  class="btn btn-info" onclick="reflushDataTable();">
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
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>  
    
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
		
   </div>			
       
  </body>
</html>
