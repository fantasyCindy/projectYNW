<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
  	
  	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path}/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	<script type="text/javascript" src="${path}/manage/plugins/multiselect/js/bootstrap-multiselect.js"></script>
	<script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
	<script type="text/javascript" src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="${path}/manage/live/js/validate.js"></script>
	<script type="text/javascript" src="${path}/manage/web/js/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="${path}/manage/web/js/app_push.js"></script>

  <script>
  	jQuery.noConflict();
  	
  	jQuery(function(){
  	//判断推送类型读取下拉框 
    jQuery("input.pushtype").on('click',function(){
  			var type= $('input:radio[name="ptype"]:checked').val();
  			if(type==1){
  			br_listTable();
  			$('#urladdress').attr("readonly","readonly");
  			$('#urladdress').val("");
  			}else if(type==2){
  	  		teacher_listTable();
  	  		$('#urladdress').attr("readonly","readonly");
			$('#urladdress').val("");
  			}else if(type==3){
  			barticle_listTable();
  			$('#urladdress').attr("readonly","readonly");
  			$('#urladdress').val("");
  			} else if(type==4){
  			zarticle_listTable();
  			$('#urladdress').attr("readonly","readonly");
  			$('#urladdress').val("");
  			}else if(type==5){
  				$("#urladdress").removeAttr("readonly");
  				$('#apptext').attr("readonly","readonly");
  	  			$('#apptext').val("");
  			}else if(type==6){
  				$("#apptext").removeAttr("readonly");
  				$('#urladdress').attr("readonly","readonly");
  	  			$('#urladdress').val("");
  			} 				
  				$("#pushtext").val("");  				
  				$("#roomid").val("");
  				$("#teacherid").val("");
  				$("#barticle_id").val("");
  				$("#zarticle_id").val("");
  			
    		
  	});  	
  	})
  	
  	$(function(){  	
  		$('#contentTable').bootstrapTable({
            method: 'post',
            height:tableHeight,
            cache: false,
            url: path + '/apppush/list.htm',
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
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'roomid',
                title: 'roomid',
                visible : false
            }, {
                field: 'ptitle',
                title: '推送标题',                
            }, {
                field: 'ptype',
                title: '推送类型',
                formatter:function(value){
				if (value==1){
					return "直播推送";
				} else if(value==2){
					return "老师推送";
				}else if(value==3){
					return "文章推送";
				}else if(value==4){
					return "资讯推送";
				}else if(value==5){
					return "URL推送";
				}else{
					return "纯文本推送";
				}
			}

            }, {
                field: 'room_name',
                title: '推送直播'
            }, {
                field: 'teacher_name',
                title: '推送老师'
            }, {
                field: 'article_name',
                title: '推送文章'
            }, {
                field: 'zarticle_id',
                title: '推送资讯ID'
            }, {
                field: 'url',
                title: '推送网址'
            }, {
                field: 'text',
                title: '推送纯文本内容'
            }, {
                field: 'pushtime',
                title: '推送时间'                
            }, {
                field: 'id',
                title: '操作',
                formatter:opperateFormatter4
                
            }]
        });
  		
  	});
  	
  		
  //弹出选择推送资讯窗口
	  function zarticle_listTable(){
			 $('#zarticle_addEditModal').modal('show');
			 $('#zarticle_listTable').bootstrapTable({
		            method: 'post',
		            height:'500px',
		            cache: false,
		            url:  '${path}/article/articlecomboxList.htm',
		            striped: true,
		            pagination: true,
		            pageSize: 10,
		            pageList: [50,100,150,200,500],
		            contentType: "application/x-www-form-urlencoded",
		            //showRefresh: true,
		            minimumCountColumns: 2,
		            clickToSelect: true,
		            queryParams:function(params){
		            	params.pageSize = params.limit;
		            	params.currentPage = params.offset / params.limit +1;
		            	var name = $("#search_br_name").val();
		            	params.title = name;
		            	return params;
		            },
		            sidePagination: "server", //服务端请求
		            columns: [{
		                checkbox: false
		            }, {
		                field: 'text',
		                title: '资讯文章'
		            }, {
		                field: 'id',
		                title: '操作',
		                formatter:opperateFormatter3
		            }]
		        });
		 } 
	  
	 
  
	 
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       	<form class="form-inline">
     	</form>
       	<div id="custom-toolbar">
	         <a class="btn btn-primary" href="javascript:;" onclick="openAddEditRoomModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 推送
	       	 </a>
	         <a class="btn btn-success" href="javascript:;" onclick="openAddEditRoomModal('edit');">
	            <i class="fa fa-edit fa-lg"></i> 修改
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRooms();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>
	         <!-- <a class="btn btn-warning" href="javascript:;" onclick="auditHospitals();">
	              <i class="fa fa-check-square-o fa-lg"></i> 审核
	         </a> -->
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
       
       		<div class="modal fade" id="addEditBroadCastingRoomModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="addBroadCastingRoomFormId">
			        	<input type="hidden" name="id" id="id" />
			            <input type="hidden" id="addEditTypeId" />
					    <fieldset>
					      <legend>推送新的消息</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
						   <div class="form-group">
						    <label for="title">推送标题：</label>
						    <input type="text" class="form-control" name="ptitle" id="ptitle" placeholder="推送标题"  data-toggle="tooltip" data-placement="top" title="请输入标题" style="width:310px;">
						   </div>
					      
					      <div class="form-group">
						    <label for="title">推送类型：</label>
						   	<input class="pushtype" name="ptype" type="radio" value="1" />直播
						   	<input class="pushtype"  name="ptype" type="radio" value="2" />直播老师
						   	<input class="pushtype"  name="ptype" type="radio" value="3" />文章
						   	<input class="pushtype"  name="ptype" type="radio" value="4" />资讯
						   	<input name="ptype"  class="pushtype" type="radio" value="5" />网址
						   	<input name="ptype"  class="pushtype" type="radio" value="6" />纯文本
						   	<br>
						   	<br>
						   	<label for="title">推送文本：</label>
					  		<input type="text" class="form-control" name="pushtext" id="pushtext" placeholder=""  data-toggle="tooltip" data-placement="top" title="" style="width:310px;" readonly="true">						
		      				<input type="text" class="form-control" name="url" id="urladdress" placeholder="推送网址"  data-toggle="tooltip" data-placement="top" title="请输入网站地址" style="width:310px;" readonly="true">
							<input type="hidden" name="barticle_id" id="barticle_id" style="display:none" />
							<input type="hidden" name="zarticle_id" id="zarticle_id" style="display:none" />
							<input type="hidden" name="roomid" id="roomid" style="display:none" />
							<input type="hidden" name="teacherid" id="teacherid"  />
							<br>
							<br>
							<label for="title">推纯文本：</label>
							<textarea rows="5" cols="50" id="apptext" name="text" readonly="true"></textarea>
							<!-- xl -->
							 </div>					  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdateRoom();">推送</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditBroadCastingRoomModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		
   </div>
   <!--弹出文章表格 -->
   <div class="modal fade" id="barticle_addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">
									<label for="search_article_name">文章名称</label> <input type="text"
										class="form-control" id="search_article_name" placeholder="文章查询">
										
									<a class="btn btn-info" href="javascript:;" onclick="refreshArticleTable(0);">
							              <i class="fa fa-search fa-lg"></i> 查询
							         </a>						       
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#barticle_addEditModal').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="barticle_listTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
   			
   <!--弹出直播表格 -->
   <div class="modal fade" id="br_addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">
									<label for="search_br_name">直播室</label> <input type="text"
										class="form-control" id="search_br_name" placeholder="直播查询">
										
									<a class="btn btn-info" href="javascript:;" onclick="refreshArticleTable(1);">
							              <i class="fa fa-search fa-lg"></i> 查询
							         </a>						       
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#br_addEditModal').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="br_listTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			<!--弹出老师表格 -->
  			 <div class="modal fade" id="teacher_addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">
									<label for="search_br_name">直播室</label> <input type="text"
										class="form-control" id="search_br_name" placeholder="直播查询">
										
									<a class="btn btn-info" href="javascript:;" onclick="refreshArticleTable(1);">
							              <i class="fa fa-search fa-lg"></i> 查询
							         </a>						       
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#teacher_addEditModal').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="teacher_listTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			<!--弹出资讯表格 -->
  			 <div class="modal fade" id="zarticle_addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			      	<div class="container-fluid maincontent">
				       <div class="row">
				       <div style="margin-top: 10px;">
					       	<form class="form-inline">
					       		<div class="form-group form-group-padding" style="padding-left: 5px;">
									<label for="search_br_name">资讯</label> <input type="text"
										class="form-control" id="search_br_name" placeholder="资讯查询">
										
									<a class="btn btn-info" href="javascript:;" onclick="refreshArticleTable(1);">
							              <i class="fa fa-search fa-lg"></i> 查询
							         </a>						       
							         <a href="javascript:;" class="btn btn-danger" onclick="$('#zarticle_addEditModal').modal('hide');">
							         	<i class="fa fa-times"></i> 关闭
							         </a>
								</div>
								
					     	</form>
				     	</div>
				       </div>
				   	   <div class="row">
						  <table id="zarticle_listTable" data-toolbar="#user-toolbar"></table>
				       </div>
				       
				   </div> 
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
   
   
       
  </body>
</html>
