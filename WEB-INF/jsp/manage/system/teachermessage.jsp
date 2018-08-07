<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
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
  		$('#contentTable').bootstrapTable({
  		  	method: 'GET',
          	height:tableHeight,
          	cache: false,
            url: path + '/teachermessage/getBackstageMessage.htm',
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
            	params.roomid = $("#search_status").val();            	
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'tmessage_id',
                title: 'tmessage_id',
                visible : false
            },{
                field: 'nickName',
                title: '发布人'
            },{
                field: 'tmessagetitle',
                title: '消息标题'
            },{
                field: 'tmessagecontent',
                title: '消息内容'
            }
            , {
                field: 'createtime',
                title: '发布时间'
            },{
                field: 'urllink',
                title: 'url链接'
            }
            ]
        });
  		showSelect();
  		 		
  	});
  	
  
  	 
  	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
 
    
    function saveOrUpdate(){
      
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/teachermessage/add.htm';   	 
   	  $.post(path + _postUrl,_params,function(_backData){
   	  		if("success" == _backData){
   	  			parent.closeProcessWin();
   	  			reflushDataTable();
   	  			showMsg(_backSuccessMsg);
   	  		} else {
	   	  		   parent.closeProcessWin(function(){
	   	  			$('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditModal').find('.showErrInfoP').show();
		   	  		$('#addEditModal').modal('show');
   	  			});
   	  		}
   	  });
    	
    }
    
    
    
   function deletes(){
	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	   if(rowDatas.length == 0 ){
		   showMsg('请选择要删除的消息！');
		    return; 
	   }
	   showConfirm('确认要删除这'+rowDatas.length+'条消息吗？',
		function(){
		   var _ids = new Array;
		   for(var i = 0;i<rowDatas.length ; i++){
			   _ids.push(rowDatas[i].tmessage_id);
	       }
		   $.post(path + '/teachermessage/delete.htm',{ids:_ids.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showOnlyMsg('删除成功！');
	   	  			reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);	
			  		reflushDataTable();
		   });
	    }, function(){});
	     
   }
   
   function showSelect(){
 		$("#search_status").empty();
 		
 		 $.ajax({
            type: "POST",
            async:false,
            url: path + "/broadcasting_room/list.do",
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
   
   
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
       <div class="form-group form-group-padding" style="padding-left: 5px;">
					<label for="search_name">类型</label> 
					<select class="form-control" id="search_status">
							
					</select>
				</div>	
       	<div id="custom-toolbar">
	       <!--   <a class="btn btn-primary" href="javascript:;" onclick="openAddEditModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a> -->
	         <!-- <a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('edit');">
	            <i class="fa fa-trash-o fa-lg"></i> 修改
	         </a> -->
	          <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
	              <i class="fa fa-search fa-lg"></i> 查询
	         </a>  
	         <a class="btn btn-danger" href="javascript:;" onclick="deletes();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>
	        
        </div> 
       </div>
   	   <div class="row">
		  <table id="contentTable" data-toolbar="#custom-toolbar"></table>
       </div>
       
   </div>
  
      <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
       <!-- 
       		<div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="formId">
			            <input type="text" name="message_id" style="display: none;"/>
			            <input type="text" id="addEditTypeId" style="display: none;"/>
					    <fieldset>
					      <legend>新增消息</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
						  
					      <div class="form-group">
						    <label for="titleInput">标题：</label>
						    <input type="text" style="width:310px;" class="form-control" name="messagetitle" id="titleInput" placeholder="标题" data-toggle="tooltip" data-placement="top" title="请输入标题！">
						  </div>
						  
						  <div class="form-group">
						    <label for="urllinkInput">链接：</label>
						    <input type="text" style="width:350px;"class="form-control" name="urllink" id="urllinkInput" placeholder="链接" data-toggle="tooltip" data-placement="top" title="请输入链接！">
						  </div>
						   
					      <div class="form-group">
						    <label for="contentInput">内容：</label>
						    <textarea rows="5" cols="110" id="contentInput" name="messagecontent"></textarea>
						  </div>
						  
						  
						   
						  <div class="form-group">
						    <label for="passwordInput">消息类型：</label>
						    <input type="radio" class="form-control" name="messagetype" value="1" > 自选股提醒
						    <input type="radio" class="form-control" name="messagetype" value="2" > 系统消息 
						    <input type="radio" class="form-control" name="messagetype" value="3" > 问答提醒
						    <input type="radio" class="form-control" name="messagetype" value="4" > 投资组合消息					    
						    <input type="radio" class="form-control" name="messagetype" value="5" > 投资内参消息
						  </div>
						  
						  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div>/.modal-content
			  </div>/.modal-dialog
			</div>/.modal -->
		
   </div>			
       
  </body>
</html>
