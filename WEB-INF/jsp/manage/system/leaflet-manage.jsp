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
	<script type="text/javascript">
		$(function(){
	  		$('#contentTable').bootstrapTable({
	  		  	method: 'GET',
	          	height:tableHeight,
	          	cache: false,
	            url: path + '/feedback/list.do',
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
	            	params.status=1;
	            	return params;
	            },
	            columns: [
	            // {
	            //     checkbox: true
	            // },
	            {
	                field: 'image',
	                title: '图片',
	                formatter:function(value){
	                	var res='';
	                	value.split(',').map(function(item) {
	                		if (item!='') {
	                			console.log('1',item)
	                			res+="<img src='"+item+"' class='img-thumbnail img-responsive'/>"
	                		}
                        });
                        return res
	                }
	            }, {
	                field: 'content',
	                title: '反馈内容'
	            },{
	                field: 'createtime',
	                title: '创建时间'
	            }
	            , {
	                field: 'phone',
	                title: '手机号'
	            }
	            , {
	                field: 'name',
	                title: '姓名'
	            }         
	            ,{
	                field: 'url',
	                title: '问题网址'
	            }
	            , {
	                field: 'ftname',
	                title: '问题类型'

	            }]
	        });
		})
	</script>
</head>
<body>
<!-- leaflet-manage -->
	<div class="container-fluid maincontent" style="padding-top: 15px">
		<div class="row">
			<table id="contentTable" data-toolbar="#custom-toolbar"></table>
		</div>
	</div>
</body>
</html>