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
            url: path + '/backuser/list.do',
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
            	return params;
            },
            columns: [{
                checkbox: true
            },{
                field: 'user_id',
                title: 'user_id',
                visible : false
            },{
                field: 'name',
                title: '姓名'
            }
            , {
                field: 'nickname',
                title: '昵称'
            }
            , {
                field: 'phone',
                title: '手机'
            },{
                field: 'mpassword',
                title: '明文密码'
            }          
            ,{
                field: 'roleName',
                title: '角色'
            }
            
            , {
                field: 'photo',
                title: '头像',
                formatter:photoFormatter
            }
            , {
                field: 'email',
                title: 'E-mail'
            }, {
                field: 'sex',
                title: '性别',
                formatter:sexFormatter
            }
            ]
        });
  		//initRoleSelect(null);
  		$("input:radio[name=job]").bind("change",function(){
  			var thisVal = $(this).val();
  			if(-1 == thisVal){
  				$("#otherJob").show();
  			}else{
  				$("#otherJob").hide();
  			}
  		});
  	});
  	
  	 function sexFormatter(value,row){
  		 if(value == 1){
  			 return "男";
  		 }
  		 return "女";
  	 }
  	
  	 function photoFormatter(value,row){
  		 if(value != null && value != ""){
  			 return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		 }
  		 return value;
  	 }
  	
  	function initRoleSelect(checkVal,_type){
   	   $('#roleIdSelect').html("");
 	   $.get(path + '/role/select.do?type='+_type,function(_backData){
 		   eval("var roles = " + _backData);
 		   if(roles && roles.length > 0) {
 			   for(var i = 0;i<roles.length;i++){
 				   var role = roles[i];
 				   var roleid = role.role_id;
 				   if(roleid == checkVal){
 					   $('#roleIdSelect').append('<option value="'+roleid+'" selected="selected">'+role.rolename+'</option>');
 				   }else{
 					   $('#roleIdSelect').append('<option value="'+roleid+'">'+role.rolename+'</option>');
 				   } 
 			   }
 		   }
 	   });   
 	}
  	
  	function initJobtypesSelect(){
       $('#roleIdSelect').html("");
  	   $.get(path + '/role/select.do',function(_backData){
  		   eval("var roles = " + _backData);
  		   if(roles && roles.length > 0) {
  			   for(var i = 0;i<roles.length;i++){
  				   var role = roles[i];
  				   var roleid = role.role_id;
  				   if(roleid == checkVal){
  					   $('#roleIdSelect').append('<option value="'+roleid+'" selected="selected">'+role.rolename+'</option>');
  				   }else{
  					   $('#roleIdSelect').append('<option value="'+roleid+'">'+role.rolename+'</option>');
  				   } 
  			   }
  		   }
  	   });   
  	}
  	
  	function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh',null);
     }
  	
    function openAddEditModal(_addEditType){
    	
    	$('#formId')[0].reset();
    	$("#imagehow").attr("src","");
    	$("#otherJob").hide();
    	$("input:radio").removeAttr("checked");
    	if('edit' == _addEditType){
    		var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
		    if(rowDatas.length == 0 ){
			   showMsg('请选择要修改的数据！');
			   return;
		    }
		    
		    if(rowDatas.length > 1 ){
			   showErr('修改只能选择一条数据！');
			   return;
		    }
		    rowDatas[0].birthdayString = rowDatas[0].birthdayStr;
		    $("#oldPassword").val(rowDatas[0].password);
		    loadData4Form($('#formId'),rowDatas[0]);
		    $("#passwordInput").val("******");
		    
		  //初始化角色列表
		  initRoleSelect(rowDatas[0].roleId,0);
    	}else{
    		//初始化角色列表
  		  initRoleSelect(null,0);
    	}
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增用户');
    	}else{
    		$('#formId fieldset legend').html('修改用户');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	$('#addEditModal').modal('show');
    }
    
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();	
      var _NameVal = $('#nameInput').val();
	  if(!_NameVal){
		  $('#nameInput').tooltip('show');	
		  return;
	  }
	  var _passwordVal = $('#passwordInput').val();
	  if(!_passwordVal){
		  $('#passwordInput').tooltip('show');	
		  return;
	  }
	  if(_passwordVal != "******" && !validPassword(_passwordVal)){
		  showOnlyErr("密码只能包含字母和数字，其中数字不能开头，并且长度为6-15位!");
		  return false;
	  }
	  var _phoneVal = $('#phoneInput').val();
	  if(!_phoneVal){
		  $('#phoneInput').tooltip('show');	
		  return;
	  }
	  if(!validTelphone(_phoneVal)){
		  showOnlyErr("手机号输入错误!");
		  return;
	  }
	  
	  var emailInputValue = $('#emailInput').val();
	  if(emailInputValue != "" && !validEmail(emailInputValue)){
		  showOnlyErr("邮箱输入错误!");
		  return;
	  }
	  
	  var nikeNameValue = $('#nicknameInput').val();
	  if(nikeNameValue != "" && !validNickname(nikeNameValue)){
		  showOnlyErr("昵称只能包含汉字、字母、数字和下划线，且长度为3到12位!");
		  return;
	  }
	  
	  
	  var password = $("#passwordInput").val();
	  if("******" == password){
		  $("#passwordInput").val($("#oldPassword").val());
	  }
	  var _params = $('#formId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/backuser/add.do';
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
    
    
    
   function deletes(){
	   var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
	   if(rowDatas.length == 0 ){
		   showMsg('请选择要删除的用户！');
		    return; 
	   }
	   showConfirm('确认要删除这'+rowDatas.length+'个用户吗？',
		function(){
		   var _ids = new Array;
		   for(var i = 0;i<rowDatas.length ; i++){
			   _ids.push(rowDatas[i].user_id);
	       }
		   $.post(path + '/backuser/delete.do',{ids:_ids.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showOnlyMsg('删除成功！');
	   	  			reflushDataTable();
	   	  	   }else
	   	  			showOnlyErr('删除失败！' + _backData);	
			  		reflushDataTable();
		   });
	    }, function(){});
	     
   }
   
   function uploadImage() {
	   var validSuccess = validateImgFile("imageInput");
	   if(validSuccess){
		   var index = showLoading("图片文件正在上传中，请稍后...");
		   $.ajaxFileUpload({  
	       url : path+"/backuser/uploadImg.do",  
	        secureuri : false,  
	        fileElementId : 'imageInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {
	        	layer.close(index);
	        	if("-1" == _backData){
	        		showOnlyErr("上传图片失败!");
	        	}else{
	        		if("success" == _backData.flag){
	        			showOnlyMsg("上传图片成功!");
		           		$("#hiddenImage").val(_backData.returnPath); 
		           	    $("#imagehow").attr("src",path+"\\"+_backData.returnPath);
		           	}else{
		           		showOnlyErr("上传图片失败!");
		           	}
	        	}
	        },  
	        error : function(data, status, e) {
	        	layer.close(index);
	        	showOnlyErr("上传图片失败："+e);
	       }  
	     });  
	   }
	}  
   
   
  </script> 	
  </head>
  
  <body>
  
  
 
  <div class="container-fluid maincontent" style="padding-top: 15px">
       <div class="row" style="margin-top:-15px;">
       	<div id="custom-toolbar">
	         <a class="btn btn-primary" href="javascript:;" menucode="addBackUser" onclick="openAddEditModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a>
	         <a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('edit');">
	            <i class="fa fa-trash-o fa-lg"></i> 修改
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deletes();">
	              <i class="fa fa-trash-o fa-lg"></i> 删除
	         </a>
	         <!--  <a class="btn btn-info" href="javascript:;" onclick="queryDisease();">
	              <i class="fa fa-search fa-lg"></i> 查询
	         </a>  -->
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
			            <input type="text" name="user_id" style="display: none;"/>
			            <input type="text" id="addEditTypeId" style="display: none;"/>
					    <fieldset>
					      <legend>新增用户</legend>
					      <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
					      <div class="form-group">
						    <label for="nameInput">姓名：</label>
						    <input type="text" class="form-control" name="name" id="nameInput" placeholder="姓名" data-toggle="tooltip" data-placement="top" title="请输入姓名！">
						  </div>
						  
					      <div class="form-group">
						    <label for="passwordInput">密码：</label>
						    <input type="text" class="form-control" name="password" id="passwordInput" placeholder="密码" data-toggle="tooltip" data-placement="top" title="请输入密码！">
						     <input type="hidden" class="form-control" id="oldPassword" >
						  </div>
						  
						  <div class="form-group">
						    <label for="sexSelect">性别：</label>
						     <select class="form-control" id="sexSelect" name="sex" style="width: 192px;">
		   	 					<option value="1">&nbsp;&nbsp;男&nbsp;&nbsp;</option>
		   	 					<option value="0">&nbsp;&nbsp;女&nbsp;&nbsp;</option>
      						</select>
						  </div>
						  
						   <div class="form-group">
						    <label for="birthdayInput">生日：</label>
						    <input type="text" class="form-control" name="birthdayString" id="birthdayInput" placeholder="生日" >
						    <script type="text/javascript">
						    $('#birthdayInput').datetimepicker({  
					           	  locale:"zh-cn",
					           	  format:"YYYY-MM-DD"
					             });  
						    </script>
						  </div>
						  
						  <div class="form-group">
						    <label for="emailInput">邮箱：</label>
						    <input type="text" class="form-control" name="email" id="emailInput" placeholder="Email" >
						  </div>
						  
						   <div class="form-group">
						    <label for="qq_Input">QQ：</label>
						    <input type="text" class="form-control" name="qq" id="qq_Input" placeholder="QQ" style="width: 155px;">
						  </div>
						  
						  
						    <div class="form-group">
						    <label for="nicknameInput">昵称：</label>
						    <input type="text" class="form-control" name="nickname" id="nicknameInput" placeholder="昵称" >
						  </div>
						  
						    <div class="form-group">
						    <label for="phoneInput">手机：</label>
						    <input type="text" class="form-control" name="phone" id="phoneInput" placeholder="手机号码" style="width: 192px;" data-toggle="tooltip" data-placement="top" title="请输入手机号！">
						  </div>
						  
						  
						  <div class="form-group">
						    <label for="roleIdSelect">用户角色：</label>
						     <select class="form-control" id="roleIdSelect" name="role_id" style="width: 150px;">
      						</select>
						  </div>
						  
						  <br/>
						  
						   <div class="form-group">
						    <label for="nameInput">头像：</label>
						     <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:245px;">
						     <input type="text" class="form-control" name="photo" id="hiddenImage" style="display: none;">
						     <button type="button" onclick="uploadImage()"  class="btn btn-warning">上传</button> 
						     <img id="imagehow" src="" style="width:100px;border:1px solid #FFFFFF;">
						  </div>
						  
						  
						   <div class="form-group">
						    <label for="noteInput">备注信息：</label>
						    <input type="text" class="form-control" name="note" id="noteInput" placeholder="备注" style="width:700px;">
						  </div>
						  
						  <div style="text-align: center;">
				            <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
				            <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
				 	      </div>
 	 	 			    </fieldset>
					  </form>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
		
   </div>			
       <script src="${path}/manage/plugins/menu-authority/authority.js"></script>
  </body>
</html>
