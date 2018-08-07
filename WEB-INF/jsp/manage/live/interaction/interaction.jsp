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
            url: path + '/interaction/list.do',
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
  	
  	/* function statusFormatter(value,row){
  		if(value==0){
  			return "<font style='color:red;cursor:pointer;' title='未审核'>未审核</font>";
  		}else if(value==1){
  			return "<font style='color:green;cursor:pointer;' title='审批通过'>审批通过</font>";
  		}else if(value==2){
  			return "<font style='color:gary;cursor:pointer;' title='审批未通过'>审批未通过</font>";
  		}
  		return value;
  	} */
  	function typeFormatter(value,row){
  		if(value !=null){
  			return "<font style='color:red;cursor:pointer;' title='交流'>交流</font>";
  		}else if(value==1){
  			return "<font style='color:green;cursor:pointer;' title='回复'>回复</font>";
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
	             url: path + "/broadcasting_room/list.do?is_vip=0",
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
	 
	 
	/*  function doOperate(){
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
			   $.post(path + '/interaction/doOperateSelected.htmlx',{operType:"yes",ids:_operateeArr.toString()},function(_backData){
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
				   $.post(path + '/interaction/doOperateSelected.htmlx',{operType:"no",ids:_operateeArr.toString()},function(_backData){
					   if("success" == _backData){
			   	  		   showMsg('审核成功！');
						   reflushDataTable();
			   	  	   }else
			   	  			showErr('审核失败！' + _backData);
				   });
		    });
	 } */
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
        </div> 
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>  
    
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
       
       		<div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="addEditFormId">
			            <input type="hidden" name="teacherid" id="teacherid_hidden" />
			            <input type="hidden" id="addEditTypeId" />
					    <fieldset>
					      <legend>新增直播老师</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
						   <div class="form-group">
						    <label for="img_srcInput">头像：</label>
						     <input type="file" class="form-control" name="img_srcFile" id="img_srcInput" >
						     <input type="hidden" class="form-control" name="photo" id="hiddenImg_src">
						     <button type="button" onclick="uploadImg_src()"  class="btn btn-warning">上传</button> 
						     <img id="img_srcShow" src="" style="width:250px;border:1px solid #FFFFFF;">
						  </div>
					      <br/>
					      <div class="form-group">
						    <label for="title">称号：</label>
						    <input type="text" class="form-control" name="title" id="title" placeholder="称号"  data-toggle="tooltip" data-placement="top" title="请输入称号" >
						  </div>
					      <div class="form-group">
						    <label for="content">姓名：</label>
						    <input type="text" class="form-control" name="name" id="name" placeholder="姓名"  data-toggle="tooltip" data-placement="top" title="请输入姓名" >
						  </div>
					      <div class="form-group">
						    <label for="content">关注人数：</label>
						    <input type="number" class="form-control" name="popularity_number" id="popularity_number" placeholder="关注人数"  data-toggle="tooltip" data-placement="top" title="请输入关注人数" >
						  </div>
					      <div class="form-group">
						    <label for="content">电话号码：</label>
						    <input type="text" class="form-control" name="phonenumber" id="phonenumber" placeholder="电话号码"  data-toggle="tooltip" data-placement="top" title="请输入电话号码" >
						  </div>
						  <div class="form-group">
						    <label for="content">职业：</label>
						    <input type="text" class="form-control" name="job" id="job" placeholder="职业"  data-toggle="tooltip" data-placement="top" title="请输入职业" >
						  </div>
						  <div class="form-group">
						    <label for="content">资金量：</label>
						    <input type="text" class="form-control" name="funds" id="funds" placeholder="资金量"  data-toggle="tooltip" data-placement="top" title="请输入资金量" >
						  </div>
						  <div class="form-group">
						    <label for="content">入市时间：</label>
						    <input type="date" class="form-control" name="markettimeStr" id="markettimeStr"   data-toggle="tooltip" data-placement="top">
						  </div>
						  <div class="form-group">
						    <label for="teacher">用户:</label>
						    <input type="text" class="form-control" name="user_name" id="user_name" readonly  placeholder="请选择用户" data-toggle="tooltip" data-placement="top" title="请选择用户" >
						  	<input type="hidden" name="user_id" id="user_id">
						  </div>
						  
						  <div class="form-group">
						    <label for="content">投资风格：</label>
						    <textarea  class="form-control" rows="3" cols="100" name="investmentstyle" id="investmentstyle" style="resize: none;">
						    	
						    </textarea>
						  </div>
						  
						  <div style="text-align: center;margin-top: 10px;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			
			
			<div class="modal fade" id="user_addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">
									<label for="search_user_name">姓名</label> <input type="text"
										class="form-control" id="search_user_name" placeholder="姓名查询">
										
									<a class="btn btn-info" href="javascript:;" onclick="refreshUserTable();">
							              <i class="fa fa-search fa-lg"></i> 查询
							         </a>
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#user_addEditModal').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="user_contentTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		
   </div>			
       
  </body>
</html>
