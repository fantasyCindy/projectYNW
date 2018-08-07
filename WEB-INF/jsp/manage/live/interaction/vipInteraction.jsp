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
	<script src="/public/js/reconnecting-websocket.js"></script>
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/interaction/viplist.do',
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
            	var roomid = $("#search_status").val();
            	var _queryBeginTime = $("#queryBeginTime").val();
            	var _queryEndTime = $("#queryEndTime").val();
            	params.roomid = roomid;
            	params.queryBeginTime = _queryBeginTime;
            	params.queryEndTime = _queryEndTime;
            	params.content = $("#content").val();
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
                field: 'nickName',
                title: '昵称'
            }, {
                field: 'content',
                title: '内容'
            }, {
                field: 'ctime',
                title: '发表时间'
            }, {
                field: 'parentid',
                title: '类型',
                formatter:typeFormatter
            }, {
                field: 'status',
                title: '审核',
                formatter:statusFormatter
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
  		 showSelect();
  	});

  	function typeFormatter(value,row){
  		if(value == -1){
  			return "<font style='color:red;cursor:pointer;' title='交流'>交流</font>";
  		}else{
  			return "<font style='color:green;cursor:pointer;' title='回复'>回复</font>";
  		}
  		return value;
  	}
  	function statusFormatter(value,row){
  		if(value == 0){
  			return "<font style='color:red;cursor:pointer;' title='交流'>未审批</font>";
  		}else if(value == 1){
  			return "<font style='color:green;cursor:pointer;' title='回复'>通过</font>";
  		}else if(value == 2){
  			return "<font style='color:green;cursor:pointer;' title='回复'>未通过</font>";
  		}
  		return value;
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
		   $.post(path + '/interaction/doOperateSelected.do',{operType:"del",ids:_deleteArr.toString()},function(_backData){
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
	 function showSelect(){
	  		$("#search_status").empty();
	  		
	  		 $.ajax({
	             type: "POST",
	             async:false,
	             url: path + "/broadcasting_room/list.do?is_vip=1",
	             dataType: "text",
	             success: function(databack){
	            	var data = JSON.parse(databack);
	            	console.log(data);
	       			var row = data.rows;
	       			var tag = '<option value="">全部</option>	 '
	       			for(var i=0;i<row.length;i++){
	        	  			tag +='<option value='+row[i].roomid+'>'+row[i].title+'';
	       			}
	       			$("#search_status").append(tag);      
	             }
	         });
	    	
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
				   _operateeArr.push(rowDatas[i].id);
		       }
			   $.post(path + '/interaction/doOperateSelected.do',{operType:"yes",ids:_operateeArr.toString()},function(_backData){
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
					   _operateeArr.push(rowDatas[i].id);
			       }
				   $.post(path + '/interaction/doOperateSelected.do',{operType:"no",ids:_operateeArr.toString()},function(_backData){
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
					<label for="search_name">直播室</label> 
					<select class="form-control" id="search_status">
										
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
				<div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">互动内容</label>
					<input type="text" class="form-control" id="content">					
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
	          <a class="btn btn-info" href="javascript:;" onclick="doOperate();">
	              <i class="fa fa-search fa-lg"></i>审核
	         </a>
        </div> 
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>  
    			
   <script type="text/javascript">
   		var YNSOCKET = function() {
	        var host = path.replace("http:", "");
	        try {
	            var webSocket;
	            webSocketPath = "ws:" + host + "/websocket";
	            webSocket = new ReconnectingWebSocket(webSocketPath);
	            webSocket.debug = true;
	            webSocket.timeoutInterval = 5400;
	            webSocket.onopen = function(event) {
	                var key = [1, 0, 0, 0].join('_')
	                webSocket.send(key);
	            };
	            webSocket.onmessage = function(event) {
	                var data = JSON.parse(event.data);
	                console.log('---push---', data)
	                if (data.dataType==12) {
	                	$('#contentTable').bootstrapTable('insertRow',{index:0, row: data})
	                }
	            };
	        } catch (e) {
	            return;
	        }
	    }()

   </script>
  </body>
</html>
