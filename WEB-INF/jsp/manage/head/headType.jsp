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
            url: path + '/headtype/list.do',
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
                field: 'id',
                title: 'id',
                visible : false
            }, {
                field: 'type_name',
                title: '头部类型'
            },{
            	field: 'partnerName',
            	title: '上级类型'
            },{
                field: 'create_time',
                title: '创建时间'
            }]
        });  		 
  	});
 
  	
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
    		$('#formId fieldset legend').html('创建');
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
      var title = $('#title').val();
      var keywords = $('#keywords').val();
      var description = $('#description').val();    
	  if(!title){
		  $('#title').tooltip('show');	
		  return;
	  }  
	  var head_type = $(".form-controls:last").val();
	  if(head_type == ""){
		  head_type =  $(".form-controls").val();
	  }
	  var _params = $('#formId').serialize() + '&partnerid='+head_type;
      $('#addEditModal').modal('hide');
   	  parent.showProcessWin();   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/headtype/addOrEdit.do';
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
			   _delIdArr.push(rowDatas[i].id);
	       }
		   $.post(path + '/headtype/del.do',{id:_delIdArr.toString()},function(_backData){
			   if("success" == _backData){
				   showOnlyMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);
			   reflushDataTable();
		   });
		   
	    });
   }
   
   function upload(e){
	   if(e==0){
		 $("#apkupload").css("display","none");  
	   }else{
		  $("#apkupload").css("display","block"); 
	   }
   }
   
   function openpartner(e, el){    
     $("#partneradd").css("display","none");
	   $.getJSON(path + '/headtype/partnerList.do',{partnerid:e},function(_backData){
		  if(_backData != ""){
         	var option = "";
			for (var i = 0; i <_backData.length; i++) {             
               option += "<option value="+_backData[i].id+">"+_backData[i].type_name+"</option>"            
          	}
           $("#from-partner").append("<select id='partnerid' class='form-controls' onchange='openpartner(this.value, this)'> <option value=''>请选择</option>"+option+"</select>");
   	  	}else{
          $(el).nextAll().remove()
   	  		showOnlyErr('没有上级标签！' + _backData);
        }
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
			            <input type="hidden" id="hiddenapk" name='apkurl'/>
			            <input type="hidden" id="addEditTypeId" />
			            <input type="hidden" id="id" name="id" style="display: none;"/>
			            <input type="hidden" name="add_type" value="0"/>
					    <fieldset>
					      <legend>修改</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      
					      <div class="form-group">
						    <label>类型名称：</label>
						    <input type="text" class="form-control" name="type_name" id="title" placeholder="请输入title" size="50" data-toggle="tooltip" data-placement="top" title="请输入正确标识" style="width:780px;">
						  </div>	
					     <div class="form-group">
						    <label>是否选择上级类型：</label>
						    <a class="btn btn-primary" id="partneradd" href="javascript:;" onclick="openpartner();">
            					<i class="fa fa-plus fa-lg"></i> YES
       						</a>
       						<div id="from-partner">
       							
       						</div>
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
