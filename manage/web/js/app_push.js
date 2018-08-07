  function openAddEditRoomModal(_addEditType){
   	 
    	$("#img_srcShow").attr("src","");
    	$('#addBroadCastingRoomFormId')[0].reset();
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
		    loadData4Form($('#addBroadCastingRoomFormId'),rowDatas[0]);
		    if(rowDatas[0].img_src != ""){
		    	$("#img_srcShow").attr("src",path + "\\" + rowDatas[0].photo);
		    }
		    
		    //设置teacher选择：
		    var update_teacherids = rowDatas[0].teacherIds;
		    $("#typeid").multiselect('select', update_teacherids);
    	}else{
    	
    		$("#typeid").multiselect("destroy"); 		
    	}
    	if('add' == _addEditType){
    		$('#addHospitalFormId fieldset legend').html('新增直播室');
    	}else{
    		$('#addHospitalFormId fieldset legend').html('修改直播室');
    	}
    	$('#addEditTypeId').val(_addEditType);
    	$('#addEditBroadCastingRoomModal').find('.showErrInfoP').hide();
    	$('#addEditBroadCastingRoomModal').modal('show');
    }
    
    function saveOrUpdateRoom(){
      var _doAddEditType =  $('#addEditTypeId').val();
      //必填验证
      var _title = $('#ptitle').val();
      var pushtext=$('#pushtext').val();
      var apptext=$('#apptext').val();
	  var _radio=$('input:radio[name="ptype"]:checked').val();
	  if(!_title){
		  $('#ptitle').tooltip('show');	
		  return;
	  }	   
	  if(_radio=="5"){
	   var _url =$('#urladdress').val();
	   var pattern = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
	   str = $('#urladdress').val();
	   
	  	if(pattern.test(str)==false){
	  		alert('请输入正确网址');
	  		return;	  		
	  	}
	 	if(!_url){
		  $('#urladdress').tooltip('show');	
		  return;
	  }
	  
	}else if(_radio==6){
		if(!apptext){
			  $('#apptext').tooltip('show');	
			  return;
		  }
	}else{	if(!pushtext){
		  $('#pushtext').tooltip('show');	
		  return;
	  }
	}
	  var _params = $('#addBroadCastingRoomFormId').serialize();
   	  $('#addEditBroadCastingRoomModal').modal('hide');
   	  parent.showProcessWin();
   	  var _backSuccessMsg = '推送成功！';
   	  var _backFaildMsg = '推送失败！';
   	  var _postUrl = '/app_push/addEdit.do';
   	  if('add' != _doAddEditType){
	    _backSuccessMsg = '推送成功！';
	    _backFaildMsg = '推送失败！';
	  }
   	 console.log(_params);
   	  $.post(path + _postUrl,_params,function(_backData){
   	  		if("success" == _backData){
   	  			parent.closeProcessWin();
   	  			reflushDataTable();
   	  			showMsg(_backSuccessMsg);
   	  		} else {
	   	  		   parent.closeProcessWin(function(){
	   	  			$('#addEditHospitalModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
	   	  		    $('#addEditHospitalModal').find('.showErrInfoP').show();
		   	  		$('#addEditHospitalModal').modal('show');
   	  			});
   	  		}
   	  });
    	
    }
    
    
   function deleteRooms(){
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
		   $.post(path + '/app_push/delete.do',{ids:_deleteArr.toString()},function(_backData){
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
      
	//弹出选择推送文章窗口
 	function barticle_listTable(){
		 $('#barticle_addEditModal').modal('show');
		 $('#barticle_listTable').bootstrapTable({
	            method: 'post',
	            height:'500px',
	            cache: false,
	            url: path + '/article/articleList.do',
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
	            	var name = $("#search_article_name").val();
	            	params.title = name;
	            	return params;
	            },
	            sidePagination: "server", //服务端请求
	            columns: [{
	                checkbox: false
	            }, {
	                field: 'text',
	                title: '博文'
	            }, {
	                field: 'id',
	                title: '操作',
	                formatter:opperateFormatter
	            }]
	        });
	 }
	//弹出选择推送直播室窗口
	  function br_listTable(){
		 $('#br_addEditModal').modal('show');
		 $('#br_listTable').bootstrapTable({
	            method: 'post',
	            height:'500px',
	            cache: false,
	            url: path + '/broadcastingRoom/comboxlist.do',
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
	                title: '直播室'
	            }, {
	                field: 'id',
	                title: '操作',
	                formatter:opperateFormatter1
	            }]
	        });
	 }
	  //弹出选择推送老师窗口
	  function teacher_listTable(){
			 $('#teacher_addEditModal').modal('show');
			 $('#teacher_listTable').bootstrapTable({
		            method: 'post',
		            height:'500px',
		            cache: false,
		            url: path + '/teacher/teachercombobox.do',
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
		            },{
		                field: 'text',
		                title: '姓名'
		            }, {
		                field: 'id',
		                title: '操作',
		                formatter:opperateFormatter2
		            }]
		        });
		 } 
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	
function refreshArticleTable(type){
	if(type==0){
	 $('#article_listTable').bootstrapTable('refresh', null);
	}else{
	 $('#br_listTable').bootstrapTable('refresh', null);
	}
		
	 }
 function opperateFormatter(value,row){
  		if(value != "" && value != null){
  			return "<a class='btn btn-success' href='javascript:;' onclick='selectArticle("+value+",\""+row.text+"\")'><i class='fa fa-check-square-o'></i> 选择</a>";
  		}
	 }
 function selectArticle(_val,_name){
		 $("#barticle_id").val(_val);
		 $("#pushtext").val(_name);
		 $('#barticle_addEditModal').modal('hide');
	 }
 function opperateFormatter1(value,row){
  		if(value != "" && value != null){
  			return "<a class='btn btn-success' href='javascript:;' onclick='selectBr("+value+",\""+row.text+"\")'><i class='fa fa-check-square-o'></i> 选择</a>";
  		}
	 }
 function selectBr(_val,_name){
		 $("#roomid").val(_val);
		 $("#pushtext").val(_name);
		 $('#br_addEditModal').modal('hide');
	 }
 function opperateFormatter2(value,row){
		if(value != "" && value != null){
			return "<a class='btn btn-success' href='javascript:;' onclick='selectTeacher("+value+",\""+row.text+"\")'><i class='fa fa-check-square-o'></i> 选择</a>";
		}
	 }	 
 function selectTeacher(_val,_name){
	 $("#teacherid").val(_val);
	 $("#pushtext").val(_name);
	 $('#teacher_addEditModal').modal('hide');
 }
 function opperateFormatter3(value,row){
		if(value != "" && value != null){
			return "<a class='btn btn-success' href='javascript:;' onclick='selectZarticle("+value+",\""+row.text+"\")'><i class='fa fa-check-square-o'></i> 选择</a>";
		}
	 }	 
function selectZarticle(_val,_name){
	 $("#zarticle_id").val(_val);
	 $("#pushtext").val(_name);
	 $('#zarticle_addEditModal').modal('hide');
}
function opperateFormatter4(value,row){
	if(value != "" && value != null){
		return "<a class='btn btn-success' href='javascript:;' onclick='againPush("+value+",\""+row.text+"\")'><i class='fa fa-check-square-o'></i>重新推送</a>";
	}
 } 

function againPush(_val,_name){
	$.post(path+"/app_push/againPush.do",{id:_val},function(data){
		if(data=="success"){
			parent.closeProcessWin();
	  		reflushDataTable();
	  		showMsg("推送成功");
		}
	});
}


