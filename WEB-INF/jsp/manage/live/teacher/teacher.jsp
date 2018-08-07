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
  <script>
  	$(function(){
  		$('#contentTable').bootstrapTable({
            method: 'get',
            height:tableHeight,
            cache: false,
            url: path + '/teacher/list.do',
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
            	var name = $("#search_name").val();
            	params.username = name;
            	return params;
            },
            sidePagination: "server", //服务端请求
            columns: [{
                checkbox: true
            },{
                field: 'teacherid',
                title: 'teacherid',
                visible : false
            }, {
                field: 'photo',
                title: '头像',
                formatter:imgFormatter
            }, {
                field: 'title',
                title: '称号'
            }, {
                field: 'username',
                title: '姓名'
            }, {
                field: 'nickname',
                title: '昵称'
            }, {
                field: 'username',
                title: '关联用户'
            },{
                field: 'certificate_num',
                title: '证书编号'
            }
            , {
                field: 'description',
                title: '简介'
            }, {
                field: 'phone',
                title: '电话号码'
            }, {
                field: 'email',
                title: '邮箱'
            }, {
                field: 'jobName',
                title: '职业'
            }, {
                field: 'founds_name',
                title: '资金量'
            }, {
                field: 'specialtyList',
                title: '擅长/操作风格'
            },{
                field: 'market_time',
                title: '入市时间'
            }]
        });
  		
  		$("#username").focus(function(){
  			//加载后台用户
  			user_contentTable();
  		});
  		
  		showCheckbox();
  	});
  	
  	function imgFormatter(value,row){
  		if(value != "" && value != null){
  			 console.log("123:"+path+"/"+value);
  			return "<img src='"+path+"/"+value+"' style='width:100px;'/>";
  		}
  	}
  	
  	function showCheckbox(){
  		$("#investmentstyle").empty();
  		
  		 $.ajax({
             type: "POST",
             async:false,
             url: path + "/specialty/list.do",
             dataType: "text",
             success: function(databack){
            	var data = JSON.parse(databack);
       			var row = data.rows;
       			var tag = ''
       			for(var i=0;i<row.length;i++){
        	  			tag +='<input type="checkbox" name="investmentstyle" value='+row[i].id+'>'+row[i].name+'';
       			}
       			$("#investmentstyle").append(tag);      
             }
         });
    	
  	}
  	
  	
    function openAddEditModal(_addEditType){
    	$("[name='investmentstyle']").attr("checked",false);
    	$("#img_srcShow").attr("src","");
    	$('#addEditFormId')[0].reset();
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
		    var specialtys= rowDatas[0].specialtys;		   
		    loadData4Form($('#addEditFormId'),rowDatas[0]);
		    for (var i = 0; i < specialtys.length; i++) {		    	 
				$("[name='investmentstyle']").each(function(){
					if($(this).val()==specialtys[i].id){
						$(this).attr("checked",'true');
					}
				});
			}
		    $("[name='investmentstyle']").show();
		    if(rowDatas[0].photo != ""){
		    	$("#img_srcShow").attr("src",path + "\\" + rowDatas[0].photo);
		    	$("#img_srcShow").show();
		    }else{
		    	$("#img_srcShow").hide();
		    }
    	}else{
    		$("#img_srcShow").hide();
    	}
    	if('add' == _addEditType){
    		$('#addEditFormId fieldset legend').html('新增直播老师');
    	}else{
    		$('#addEditFormId fieldset legend').html('修改直播老师');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditModal').find('.showErrInfoP').hide();
    	$('#addEditModal').modal('show');
    }
    
    function saveOrUpdate(){
      var _doAddEditType =  $('#addEditTypeId').val();
      //必填验证
      var _title = $('#title').val();
	  if(!_title){
		  $('#title').tooltip('show');	
		  return;
	  }
	  
	  var _user_name = $('#username').val();
	  if(!_user_name){
		  $('#username').tooltip('show');	
		  return;
	  }
	
	  var _params = $('#addEditFormId').serialize();
   	  $('#addEditModal').modal('hide');
   	  parent.showProcessWin();
   	  
   	  var _backSuccessMsg = '创建成功！';
   	  var _backFaildMsg = '创建失败！';
   	  var _postUrl = '/teacher/addEdit.do';
   	  if('add' != _doAddEditType){
	    _backSuccessMsg = '修改成功！';
	    _backFaildMsg = '修改失败！';
	  }
   	  
   	 
   	  $.post(path + _postUrl,_params,function(_backData){
   	  		if("success" == _backData){
   	  			parent.closeProcessWin();
   	  			reflushDataTable();
	   	  		if('add' == _doAddEditType){
	   	  			//初始化模拟炒股数据
		  			//initeacher();
		   	 	  }
   	  			showMsg(_backSuccessMsg);
   	  			parent.closeProcessWin(function(){
   	  			$('#addEditHospitalModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
   	  		    $('#addEditHospitalModal').find('.showErrInfoP').show();
	   	  		$('#addEditHospitalModal').modal('show');
	  			});
   	  		} else {
	   	  		   parent.closeProcessWin(function(){
	   	  			$('#addEditHospitalModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditHospitalModal').find('.showErrInfoP').show();
		   	  		$('#addEditHospitalModal').modal('show');
   	  			});
   	  		}
   	  });
   	  
   	 
    	
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
			   _deleteArr.push(rowDatas[i].teacherid);
	       }
		   $.post(path + '/teacher/delete.do',{ids:_deleteArr.toString()},function(_backData){
			   if("success" == _backData){
	   	  			showMsg('删除成功！');
				   reflushDataTable();
	   	  	   }else
	   	  			showErr('删除失败！' + _backData);
		   });
	    });
   }
   
   //上传图片
	function uploadImg_src() {
	   var validSuccess = validateImgFile("img_srcInput");
	   if(validSuccess){
		   $.ajaxFileUpload({  
	       url : path+"/teacher/img_srcUpload.do",  
	        secureuri : false,  
	        fileElementId : 'img_srcInput',  
	        dataType : 'json',  
	        success : function(_backData, status) {  
	           	if("success" == _backData.flag){
	           		$("#hiddenImg_src").val(_backData.returnPath);
	           	 	$("#img_srcShow").attr("src",path+"\\"+_backData.returnPath);
	              	showMsg("上传文件成功");
	              	$("#img_srcShow").show();
	           	}else{
	           		showErr("上传文件失败");
	           	}
	        },  
	        error : function(data, status, e) {  
	            showErr(e);  
	       }  
	     });  
	   }
	}  
   
	 
	 function validateImgFile(fileId){
		   var fileVal = $("#"+fileId).val();
		   if(fileVal == ""){
			   showErr("请选择上传的文件!");
			   return;
		   }
		   if(fileVal.lastIndexOf(".") == -1){
			  showErr("上传图片格式只支持:jpg、jpeg、png等文件格式");
			  return;
		   }
		   var fileSuffix = fileVal.substring(fileVal.lastIndexOf(".")+1,fileVal.length);
		   var upperSuffix = fileSuffix.toUpperCase();
		   if("JPEG" != upperSuffix && "PNG" != upperSuffix && "JPG" != upperSuffix){
			   showErr("上传图片格式只支持:jpg、jpeg、png等文件格式");
			   return;
		   }
		   return true;
	 }
	 
	 function reflushDataTable(){
     	$('#contentTable').bootstrapTable('refresh', null);
     }
	 
	 function user_contentTable(){
		 $('#user_addEditModal').modal('show');
		 $('#user_contentTable').bootstrapTable({
	            method: 'get',
	            height:'500px',
	            cache: false,
	           url: path + '/teacher/getQueryNoteacherUser.do',////开启老师入驻
	            striped: true,
	            pagination: true,
	            pageSize: 10,
	            pageList: [10,20,50,100],
	            contentType: "application/x-www-form-urlencoded",
	            //showRefresh: true,
	            minimumCountColumns: 2,
	            clickToSelect: true,
	            queryParams:function(params){
	            	params.pageSize = params.limit;
	            	params.currentPage = params.offset / params.limit +1;
	            	var name = $("#search_user_name").val();
	            	params.nickname = name;
	            	return params;
	            },
	            sidePagination: "server", //服务端请求
	            columns: [{
	                checkbox: true
	            },{
	                field: 'user_id',//开启老师入驻，需要修改为：user_id
	                title: 'user_id',//开启老师入驻，需要修改为：user_id
	                visible : false
	            }, {
	                field: 'nickname',
	                title: '姓名'
	            }, {
	                field: 'phone',
	                title: '电话',
	                formatter:phoneFormatter
	            }, {
	                field: 'user_id',//开启老师入驻，需要修改为：user_id
	                title: '操作',
	                formatter:opperateFormatter
	            }]
	        });
	 }
	 
	 function refreshUserTable(){
		 $('#user_contentTable').bootstrapTable('refresh', null);
	 }
	 
	 function opperateFormatter(value,row){
  		if(value != "" && value != null){
  			return "<a class='btn btn-success' href='javascript:;' onclick='selectUser("+value+",\""+row.nickname+"\")'><i class='fa fa-check-square-o'></i> 选择</a>";
  		}
	 }
	 function phoneFormatter(value,row){
  		if(value != "" && value != null){
  			return value.substring(0,3)+"****"+value.substring(7,11)
  		}
	 }
	 
	 function selectUser(_val,_name){
		 $("#user_id").val(_val);
		 /* if(_name != "" && _name != null){
			 _name = _name.substring(0,3)+"****"+_name.substring(7,11)
	  		} */
		 $("#username").val(_name);
		 $('#user_addEditModal').modal('hide');
	 }
	 
	 function openAddEditModalUser(_addEditType){
    	$('#formId')[0].reset();
    	if('add' == _addEditType){
    		$('#formId fieldset legend').html('新增用户');
    	}
    	$('#addUserModal').find('.showErrInfoP').hide();
    	$('#addUserModal').modal('show');
    	$('#birthdayInput').datetimepicker({  
        	  locale:"zh-cn",
        	  format:"YYYY-MM-DD"
          });  
    	initRoleSelect(null);
    }
	 
	 function saveOrUpdateUser(){
	      //必填验证
	      var _NameVal = $('#login_nameInput').val();
	      if(!validLoginName(_NameVal)){
			  showOnlyErr("用户名只能包含数字、字母、下划线，并且长度为6-12位!");
			  return false;
		  }
		  var password = $("#passwordInput").val();
		  if(!validPassword(password)){
			  showOnlyErr("密码只能包含字母和数字，其中数字不能开头，并且长度为6-15位!");
			  return false;
		  }
		  var _params = $('#formId').serialize();
	   	  $('#addUserModal').modal('hide');
	   	  parent.showProcessWin();
	   	  
	   	  var _backSuccessMsg = '创建成功！';
	   	  var _backFaildMsg = '创建失败！';
	   	  var _postUrl = '/user/add.do';
	   	  $.post(path + _postUrl,_params,function(_backData){
	   	  		if("success" == _backData){
	   	  			parent.closeProcessWin();
	   	  			refreshUserTable();
	   	  			showMsg(_backSuccessMsg);
	   	  		} else {
		   	  		   parent.closeProcessWin(function(){
		   	  			$('#addUserModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
		   	  		    $('#addUserModal').find('.showErrInfoP').show();
			   	  		$('#addUserModal').modal('show');
	   	  			});
	   	  		}
	   	  });
	 }
	 
	 function initeacher(){
		 var userid =  $("#user_id").val();
		 var _inizj = '/simulatedStock/initzj.do'+'?userid='+userid;
	   	  var _backFaildMsg = '初始化资金失败！';
		  $.post(path + _inizj,function(_backData){
				if("success" == _backData){
	   	  			parent.closeProcessWin();
	   	  			refreshUserTable();
	   	  		} else {
		   	  		   parent.closeProcessWin(function(){
		   	  			$('#addUserModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
		   	  		    $('#addUserModal').find('.showErrInfoP').show();
			   	  		$('#addUserModal').modal('show');
	   	  			});
	   	  		}
	   	  });
	 }
	 
	 function initRoleSelect(checkVal){
   	   $('#roleIdSelect').html("");
 	   $.get(path + '/role/select.do',function(_backData){
 		   eval("var roles = " + _backData);
 		   if(roles && roles.length > 0) {
 			   for(var i = 0;i<roles.length;i++){
 				   var role = roles[i];
 				   var roleid = role.roleid;
 				   if(roleid == checkVal){
 					   $('#roleIdSelect').append('<option value="'+roleid+'" selected="selected">'+role.name+'</option>');
 				   }else{
 					   $('#roleIdSelect').append('<option value="'+roleid+'">'+role.name+'</option>');
 				   } 
 			   }
 		   }
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
					<label for="search_name">姓名</label> <input type="text"
						class="form-control" id="search_name" placeholder="姓名查询">
				</div>
	     	</form>
     	</div>
       	<div id="custom-toolbar">
	         <a class="btn btn-primary" href="javascript:;" onclick="openAddEditModal('add');">
	            <i class="fa fa-plus fa-lg"></i> 新增
	       	 </a>
	         <a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('edit');">
	            <i class="fa fa-edit fa-lg"></i> 修改
	         </a>
	         <a class="btn btn-danger" href="javascript:;" onclick="deleteRows();">
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
						    <label for="title">称号：</label>
						    <input type="text" class="form-control" name="title" id="title" placeholder="称号"  data-toggle="tooltip" data-placement="top" title="请输入称号" >
						  </div>
						  <div class="form-group">
						    <label for="title">证书编号：</label>
						    <input type="text" class="form-control" name="certificate_num" id="certificate_num" placeholder="证书编号"  data-toggle="tooltip" data-placement="top" title="请输入证书编号" >
						  </div>
					      <div class="form-group">
						    <label for="content">关注人数：</label>
						    <input type="number" class="form-control" name="popularity_number" id="popularity_number" placeholder="关注人数"  data-toggle="tooltip" data-placement="top" title="请输入关注人数" >
						  </div>
						  
						  <div class="form-group">
						    <label for="teacher">用户:</label>
						    <input type="text" class="form-control" name="username" id="username" readonly  placeholder="请选择用户" data-toggle="tooltip" data-placement="top" title="请选择用户" >
						  	<input type="hidden" name="user_id" id="user_id">
						  </div>
						  <div class="form-group">
						    <label for="content">投顾类型：</label>
						    <select name="teacher_type" class="form-control">
						    <c:forEach var="type" items="${teacher_type}">
	                            <option value="${type.id}">${type.type_name }</option>
						    </c:forEach>
						    </select>
						  </div>
						  <div class="form-group">
						    <label for="content">投资风格：</label>
						    <div id = "investmentstyle">
						    </div>	
						    </textarea>
						  </div>
						  <div class="form-group">
						    <label for="content">简&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;介：</label>
						    <textarea  class="form-control" name="description" id="description" style="resize: none;width: 700px;height: 100px;"></textarea>
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
