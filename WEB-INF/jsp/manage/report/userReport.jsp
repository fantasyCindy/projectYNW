<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="zh-CN">

    <head>
        <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
            <link href="${path}/manage/live/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
            <link href="${path}/manage/live/ueditor/themes/default/css/ueditor.min.css">
            <script type="text/javascript" src="${path}/manage/live/bootstrap/js/bootstrap-table-all.min.js"></script>
            <script type="text/javascript" src="${path}/manage/live/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
            <script type="text/javascript" src="${path }/manage/live/ueditor/ueditor.config.js"></script>
            <script type="text/javascript" src="${path }/manage/live/ueditor/ueditor.all.min.js">
            </script>
            <script type="text/javascript" src="${path }/manage/live/ueditor/lang/zh-cn/zh-cn.js"></script>
            <script type="text/javascript" src="${path }/manage/live/js/ajaxfileupload.js"></script>
            <script src="${path }/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
            <script src="${path }/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
            <link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
            <script>
            $(function() {
                $('#contentTable').bootstrapTable({
                    method: 'GET',
                    height: tableHeight,
                    cache: false,
                    url: path + '/backreport/userindex/query.do',
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
                        params.pageSize = params.limit;
                        params.currentPage = params.offset / params.limit + 1;
                        var _status = $("#search_status").val();
                        var _startTime = $("#startTime").val();
                        var _endTime = $("#endTime").val();
                        params.usertype = _status;
                        params.startTime = _startTime;
                        params.endTime = _endTime;
                        return params;
                    },
                    rowAttributes: function(row, index) {
                        row.customOrder = index + 1;
                        return row;
                    },
                    columns: [{
                            field: 'customOrder',
                            title: '序号'
                        }, {
                            field: 'user_id',
                            title: 'user_id',
                            visible: false
                        }, {
                            field: 'isteacher',
                            title: '用户状态',
                            formatter: isteacherFormatter
                        }, {
                            field: 'username',
                            title: '姓名'
                        }, {
                            field: 'nickname',
                            title: '昵称'
                        }, {
                            field: 'phone',
                            title: '手机',
                            formatter:phoneFormatter
                        }, {
                            field: 'create_time',
                            title: '注册时间'
                        }, {
                            field: 'mpassword',
                            title: '明文密码'
                        }, {
                            field: 'roleName',
                            title: '角色'
                        }, {
                            field: 'level',
                            title: '用户等级',
                            formatter: levelFormatter
                        }

                        , {
                            field: 'jobName',
                            title: '职业'
                        }, {
                            field: 'fundsName',
                            title: '资金'
                        }, {
                            field: 'investment_styleName',
                            title: '投资风格'
                        }, {
                            field: 'market_time',
                            title: '入市时间'
                        }, {
                            field: 'photo',
                            title: '头像',
                            formatter: photoFormatter
                        }, {
                            field: 'email',
                            title: 'E-mail'
                        }, {
                            field: 'sex',
                            title: '性别',
                            formatter: sexFormatter
                        }
                    ]
                });

                $("#startTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD HH:mm"
                });
                $("#endTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD HH:mm"
                });


                $("input:radio[name=job]").bind("change", function() {
                    var thisVal = $(this).val();
                    if (-1 == thisVal) {
                        $("#otherJob").show();
                    } else {
                        $("#otherJob").hide();
                    }
                });
            });

            function sexFormatter(value, row) {
                if (value == 1) {
                    return "男";
                }
                return "女";
            }

            function phoneFormatter(value) {
                if (value) {
                    value = value.substr(0, 3) + '****' + value.substr(7, 10)
                    return value
                }
            }

            function isteacherFormatter(value, row) {
                if (value == 0) {
                    return "<span style='color:green;'>普通用户</span>";
                } else if (value == 1) {
                    return "<span style='color:red;'>直播老师</span>";
                }
                return value;
            }

            function photoFormatter(value, row) {
                if (value != null && value != "") {
                    if (value.substring(0, 4) == "http") {
                        return "<img src='" + value + "' style='width:100px;'/>";
                    } else {
                        return "<img src='" + path + "/" + value + "' style='width:100px;'/>";
                    }
                }
                return value;
            }

            function levelFormatter(value, row) {
                if (value == 1) {
                    return "初级用户";
                } else if (value == 2) {
                    return "中级用户";
                } else if (value == 3) {
                    return "高级用户";
                }
                return value;
            }

            function roleFormatter(value, row) {
                if (value == 1) {
                    return "超级管理员";
                } else if (value == 2) {
                    return "普通用户";
                } else if (value == 3) {
                    return "直播老师";
                }
                return value;
            }

            function reflushDataTable() {
                $('#contentTable').bootstrapTable('refresh', null);
            }

            function clearquery() {
                $("#queryfrom")[0].reset();
                reflushDataTable();
            }
            </script>
    </head>

    <body>
        <div class="container-fluid maincontent" style="padding-top: 15px">
            <div class="row" style="margin-top:-15px;">
                <div id="custom-toolbar">
                    <form class="form-inline" id="queryfrom">
                        <div class="form-group form-group-padding" style="padding-left: 5px;">
                            <label for="search_name">用户类别</label>
                            <select class="form-control" id="search_status">
                                <option value="">全部用户</option>
                                <option value="0">普通用户</option>
                                <option value="1">直播老师</option>
                            </select>
                        </div>
                        <div class="form-group form-group-padding" style="padding-left: 5px;position: relative;">
                            <label for="search_name">注册时间范围</label>
                            <input type="text" class="form-control" id="startTime">
                        </div>
                        <label class="form-group form-group-padding" style="padding-left: 5px;position: relative;" for="search_name"> 至 </label>
                        <div class="form-group form-group-padding" style="padding-left: 5px;position: relative;">
                            <input type="text" class="form-control" id="endTime">
                        </div>
                        <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
                            <i class="fa fa-search fa-lg"></i> 查询
                        </a>
                        <button type="button" class="btn btn-primary" onclick="clearquery();">
                            <i class="fa fa-search fa-lg"></i> 清空查询条件
                        </button>
                    </form>
                </div>
            </div>
            <div class="row">
                <table id="contentTable" data-toolbar="#custom-toolbar"></table>
            </div>
        </div>
        <script type="text/javascript">
        var ue = UE.getEditor('contentEditor', {
            scaleEnabled: true
        });
        </script>
    </body>

    </html>
