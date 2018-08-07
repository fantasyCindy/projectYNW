<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
	<link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
	<script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="${path }/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
	<link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
	<script type="text/javascript" src="${path }/manage/plugins/multiselect/js/bootstrap-multiselect.js"></script>
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'GET',
            url: path + '/notice/queryNoticeList.do',
            cache: false,
            height: tableHeight,
            striped: true,
            pagination: true,
            contentType: "application/x-www-form-urlencoded",
            sidePagination: "server",
            pageSize: 50,
            pageList: [50,100,150,200,500],
            search: false,
            showRefresh: false,
            minimumCountColumns: 2,
            clickToSelect: true,
            queryParams:function(params){
            	params.pageSize = params.limit;
            	params.currentPage = params.offset / params.limit +1;
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'noticeid',
                title: 'id',
                visible : false
            }, {
                field: 'url',
                title: 'url'
            },{
                field: 'content',
                title: '公告内容'
            },{
                field: 'pubtime',
                title: '发布时间'
            }]
        });  		 
  	});
  	
  	
  	var val=0;
    function openaddEditModal(_addEditType) {
    	$('#formId')[0].reset();
    	$("#imgShow").attr("src","");
    	if('edit' == _addEditType){
    		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
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
    		$('#formId fieldset legend').html('发布新公告');
    	}else{
    		$('#formId fieldset legend').html('修改公告信息');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();    	
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      //必填验证
      var contentVal = $('#contentInput').val();
      var urlVal = $('#urlInput').val(); 
	  if(!contentVal){
		  $('#contentInput').tooltip('show');	
		  return;
	  }		  
	  if(!urlVal){
		  $('#urlInput').tooltip('show');	
		  return;
	  }
	
	  
	  
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/notice/addorEditNotice.do';
   	  if('add' != _doAddEditType){
	    _backSuccessMsg = '修改成功！';
	    _backFaildMsg = '修改失败！';
	  }
   	  
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
    
    function reflushDataTable(){
    	$('#contentTable').bootstrapTable('refresh', null);
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
			   _delIdArr.push(rowDatas[i].noticeid);
	       }
		   $.post(path + '/deleteNotice.do',{ids:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   reflushDataTable();
		   });
		   
	    });
   }
   
   
   
   
  </script> 	
  </head>
  
  <body>
	<div class="container-fluid maincontent">
       <div class="row">
       	<div id="custom-toolbar">
         <a class="btn btn-primary" href="javascript:;" onclick="openaddEditModal('add');">
            <i class="fa fa-plus fa-lg"></i> 新增
       	 </a>
         <a class="btn btn-success" href="javascript:;" onclick="openaddEditModal('edit');">
            <i class="fa fa-trash-o fa-lg"></i> 修改
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
       
       		<div class="modal fade" id="addEditModal">
			  <div class="modal-dialog modal-lg">
			    <div class="modal-content">
			      <div class="modal-body">
			        <form class="form-inline" id="formId">
			            <input type="hidden" id="addEditTypeId" />
			            <input type="hidden" id="noticeid" name="noticeid" style="display: none;"/>
					    <fieldset>
					      <legend>发布公告</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					      <div class="form-group">
						    <label>url：</label>
						    <input type="text" class="form-control" name="url" id="urlInput" placeholder="请输入url" size="50" data-toggle="tooltip" data-placement="top" title="请输入正确url" style="width:780px;">
						  </div>	
					     <div class="form-group">
						    <label>公告内容：</label>
						    <input type="text" class="form-control" name="content" id="contentInput" placeholder="请输入公告内容" size="50" data-toggle="tooltip" data-placement="top" title="请输入公告内容！" style="width:780px;">
						  </div>						  
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
