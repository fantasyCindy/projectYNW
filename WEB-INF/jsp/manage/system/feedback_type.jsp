<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
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
			create_feedbackTable();
		});
			//生成反馈列表表格
			function create_feedbackTable(){
			$('#Feedback_Table').bootstrapTable({
	  		  	method: 'GET',
	          	height:tableHeight,
	          	cache: false,
	            url: path + "/feedback_type/list.do",
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
	            	params.nickname = $("#login_nameInput").val().trim();//输入框的值
	            	params.pageSize = params.limit;
	            	params.currentPage = params.offset / params.limit +1;
	            	return params;
	            },
	            columns: [{
	                checkbox: true
	            },{
	                field: 'id',
	                title: 'id',
	                visible : false
	            },{
	                field: 'name',
	                title: '类型名称'
	            }	           
	            ]
	        });
			
		}
		function reflushDataTable(){
	     	$('#Feedback_Table').bootstrapTable('refresh',null);
	     }
			
		function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
    	$("#imgShow").attr("src","");
    	if('edit' == _addEditType){
    		var rowDatas = $('#Feedback_Table').bootstrapTable('getSelections', null);
    		var version_type=rowDatas.version_type;
		    if(rowDatas.length == 0 ){
			   showMsg('请选择要修改的记录！');
			   return;
		    }
		    if(rowDatas.length > 1 ) {
			   showErr('修改只能选择一条数据！');
			   return;
		    }	         
		    loadData4Form($('#formId'),rowDatas[0]);		    
    	}
    	
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('创建');
    		$("#id").val("");
    	}else{
    		$('#formId fieldset legend').html('修改');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();    	
    	$('#addEditModal').modal('show');
    	$("#from-partner").html("");
    	$("#partneradd").css("display","block");
    }

    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/feedback_type/add.do';
   	  if('add' != _doAddEditType){
	    _backSuccessMsg = '修改成功！';
	    _backFaildMsg = '修改失败！';
	  }
   	  
   	  $.post(path + _postUrl,_params,function(_backData){
   	  		if("success" == _backData){
   	  			parent.closeProcessWin();
   	  			reflushDataTable();
   	  			showMsg(_backSuccessMsg);
   	  		}else if( "error" ==_backData){
   	  			parent.closeProcessWin();
   	  			showMsg("该类型数据已存在");
   	  		} else {
	   	  			parent.closeProcessWin(function(){
	   	  			$('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditModal').find('.showErrInfoP').show();
		   	  		$('#addEditModal').modal('show');
   	  			});
   	  		}
   	  });
    	
    }
			
		//删除
	   function deletes(){
		   var rowDatas = $('#Feedback_Table').bootstrapTable('getSelections', null);
		   if(rowDatas.length == 0 ){
			   showMsg('请选择要删除的项目！');
			    return; 
		   }
		   showConfirm('确认要删除这'+rowDatas.length+'个项目吗？',
			function(){
			   var _ids = new Array;
			   for(var i = 0;i<rowDatas.length ; i++){
				   _ids.push(rowDatas[i].id);
		       }
			   $.post(path + '/feedback_type/delete.do',{ids:_ids.toString()},function(_backData){
				   if("success" == _backData){
		   	  			showOnlyMsg('删除成功！');
		   	  			reflushDataTable();
		   	  	   }else
		   	  			showOnlyErr('删除失败！');	
				  		reflushDataTable();
			   });
		    }, function(){});
		     
	   }
		
		//查询
		function queryDisease(){
			create_feedbackTable();
			reflushDataTable();
		}
		function clearquery(){
			$("#login_nameInput").val("");
			reflushDataTable();
		}
			
	</script>
  </head>
  
  <body>
  	  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
	         <form class="form-inline" style="height:20px">
	         <div class="form-group form-group-padding">
					<button type="button" id="login_nameInput" class="btn btn-info" onclick="openaddEditModal('add');">
			              <i class="fa fa-plus fa-lg"></i> 新增
			         </button>
				</div>
	                	
				<div class="form-group form-group-padding">
					<button type="button" id="login_nameInput" class="btn btn-info" onclick="queryDisease();">
			              <i class="fa fa-search fa-lg"></i> 查询
			         </button>
				</div>
				<div class="form-group form-group-padding">
					<button type="button"  class="btn btn-danger" onclick="deletes();">
			              <i class="fa fa-search fa-lg"></i> 删除
			         </button>
	   			 </div>
	   			 <div class="form-group form-group-padding">
					<button type="button"  class="btn btn-danger" onclick="openaddEditModal('edit');">
			              <i class="fa fa-plus fa-lg"></i> 修改
			         </button>
	   			 </div>
            	
         </a>
   			</form>
       </div>
   	   <div class="row">
		  <table id="Feedback_Table" data-toolbar="#custom-toolbar"></table>
       </div>
   </div>
   <!-- 以下这个DIV存放所有的弹出窗口。 -->
       <div>
       
       		<div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="formId">
			            <input type="hidden" id="hiddenapk" name='apkurl'/>
			            <input type="hidden" id="addEditTypeId" />
			            <input type="hidden" id="id" name="id" style="display: none;"/>
			            <input type="hidden" name="add_type" value="0"/>
					    <fieldset>
					      <legend>修改</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>					      
					     <div class="form-group">
						    <label>名称：</label>
						    <input type="text" style="width: 150px; height: 25px;" id="name" name="name">
						  </div>
					      <div style="text-align: center;">
				            <a href="javascript:void(0);" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
				            <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
   </div>	
  </body>
</html>
