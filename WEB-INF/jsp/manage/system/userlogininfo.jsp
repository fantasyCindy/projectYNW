<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="zh-CN">

    <head>
        <title>约投顾用户登录日志管理</title>
        <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
            <link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
            <link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
            <script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
            <script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
            <script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
            <script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
            <style type="text/css">
            .fl {
                float: left;
            }
            
            .fr {
                float: right;
            }
            
            .absolute {
                position: absolute;
            }
            
            .relative {
                position: relative;
            }
            </style>
            <script>
            $(function() {

                $("#queryBeginTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD"
                });
                $("#queryEndTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD"
                });

                function hiddenPhone(value) {
                   value = value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    return value
                }
				
                function is_inside(value){
                	if(value==0){
                		return '<font color="green">注册用户</font>'
                	}else{
                		return '<font color="red">内部用户</font>'
                	}
                }
                
                $('#contentTable').bootstrapTable({
                    method: 'GET',
                    height: tableHeight,
                    cache: false,
                    url: path + '/userlogininfo/queryUserlogininfoList.do',
                    striped: true,
                    pagination: true,
                    pageSize: 50,
                    pageList: [50, 100, 150, 200, 500],
                    contentType: "application/x-www-form-urlencoded",
                    sidePagination: "server", //服务端请求
                    search: false,
                    showRefresh: false,
                    minimumCountColumns: 2,
                    clickToSelect: true,
                    queryParams: function(params) {
                        params.usernickname = $('#usernickname_query').val();
                        params.phone = $('#phone_query').val();
                        params.userip = $('#userip').val();
                        params.starttime = $('#queryBeginTime').val();
                        params.endtime = $('#queryEndTime').val();
                        params.pageSize = params.limit;
                        params.currentPage = params.offset / params.limit + 1;
                        return params;
                    },
                    columns: [{
                        checkbox: true
                    }, {
                        field: 'id',
                        title: 'id',
                        visible: false
                    }, {
                        field: 'userid',
                        title: 'userid',
                        visible: false
                    }, {
                        field: 'is_inside',
                        title: '是否为内部用户',
                        formatter: is_inside
                    }, {
                        field: 'usernickname',
                        title: '用户名称'
                    }, {
                        field: 'phone',
                        title: '电话号码',
                        formatter: hiddenPhone
                    }, {
                        field: 'userip',
                        title: 'IP地址'
                    }, {
                        field: 'ipcountry',
                        title: 'IP国家'
                    }, {
                        field: 'ipregion',
                        title: 'IP省份'
                    }, {
                        field: 'ipcity',
                        title: 'IP城市'
                    }, {
                        field: 'iparea',
                        title: 'IP地区'
                    }, {
                        field: 'ipcounty',
                        title: 'IP区/县'
                    }, {
                        field: 'ipisp',
                        title: '互联网服务提供商'
                    }, {
                        field: 'userlogintime',
                        title: '用户登录时间'
                    }, {
                        field: 'userouttime',
                        title: '用户退出时间'
                    }]
                });

            });


            //重新加载table
            function reflushDataTable() {
                $('#contentTable').bootstrapTable('refresh', null);
            }
            //清空条件
            function clearquery() {
                $("#queryForm")[0].reset();
                reflushDataTable();
            }
            </script>
    </head>

    <body>
        <div class="container-fluid maincontent" style="padding-top: 15px">
            <div class="row" style="margin-top:-15px;">
                <form class="form-inline" id="queryForm">
                    <div class="form-group form-group-padding" style="padding-left: 5px;">
                        <label>用户名称：</label>
                        <input type="text" class="form-control" name="usernickname" id="usernickname_query" placeholder="输入用户名称进行搜索">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;">
                        <label>手机号码：</label>
                        <input type="text" class="form-control" name="phone" id="phone_query" placeholder="输入用户手机号码进行搜索">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;">
                        <label>ip搜索：</label>
                        <input type="text" class="form-control" name="userip" id="userip" placeholder="输入ip进行搜索">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;position: relative;">
                        <label for="search_name">开始时间</label>
                        <input type="text" style="width: 150px; height: 35px;" id="queryBeginTime">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;position: relative;">
                        <label for="search_name">结束时间</label>
                        <input type="text" style="width: 150px; height: 35px;" id="queryEndTime">
                    </div>
                    <div class="form-group form-group-padding">
                        <button type="button" class="btn btn-info" onclick="reflushDataTable();">
                            <i class="fa fa-search fa-lg"></i> 查询
                        </button>
                    </div>
                    <div class="form-group form-group-padding">
                        <button type="button" class="btn btn-primary" onclick="clearquery();">
                            <i class="fa fa-search fa-lg"></i> 清空
                        </button>
                    </div>
                </form>
            </div>
            <div class="row">
                <table id="contentTable" data-toolbar="#" type-toolbar ""></table>
            </div>
        </div>
    </body>

    </html>
