<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="zh-CN">

    <head>
        <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
            <link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
            <link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
            <script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
            <script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
            <script src="${path}/manage/plugins/datetimepicker/js/moment-with-locales.js"></script>
            <!--  <script src="${path}/manage/plugins/datetimepicker/js/bootstrap-datetimepicker.js"></script>
            <link href="${path}/manage/plugins/datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet"> -->
            <script src="https://cdn.bootcss.com/jquery-datetimepicker/2.5.4/build/jquery.datetimepicker.full.min.js"></script>
            <link href="https://cdn.bootcss.com/jquery-datetimepicker/2.5.4/build/jquery.datetimepicker.min.css" rel="stylesheet">
            <style>
            .hide {
                display: none;
            }
            </style>
            <script>
            $(function() {
                $('#contentTable').bootstrapTable({
                    method: 'GET',
                    url: path + '/useraccount/pay_useraccountUser.do',
                    cache: false,
                    height: tableHeight,
                    striped: true,
                    singleSelect: true,
                    pagination: true,
                    contentType: "application/x-www-form-urlencoded",
                    sidePagination: "server",
                    pageSize: 15,
                    pageList: [50, 100, 150, 200, 500],
                    search: false,
                    showRefresh: false,
                    minimumCountColumns: 2,
                    clickToSelect: true,
                    queryParams: function(params) {
                        params.pageSize = params.limit;
                        params.currentPage = params.offset / params.limit + 1;
                        params.phone = $("#phone").val();
                        params.type = 1;
                        return params;
                    },
                    columns: [{
                        field: 'id',
                        title: 'id',
                        visible: false
                    }, {
                        field: 'userid',
                        title: 'userid',
                        visible: false
                    }, {
                        field: 'phone',
                        title: '用户手机号',
                        formatter: phoneFormatter
                    }, {
                        field: 'nickname',
                        title: '用户昵称'
                    }, {
                        field: 'balance',
                        title: '余额'
                    }]
                });
            });

            
            function phoneFormatter(value){
                if(value){
                    value = value.substr(0,3) + '****' + value.substr(7,10)
                    return value
                }
            }

            function openaddEditModal(_addEditType) {

                $('#addEditModal').find('.showErrInfoP').hide();
                $('#addEditModal').modal('show');
            }


            function saveOrUpdate() {
                var _doAddEditType = $('#addEditTypeId').val();
                //必填验证
                var _params = $('#formId').serialize();
                $('#addEditModal').modal('hide');
                parent.showProcessWin();

                var _backSuccessMsg = '充值成功！';
                var _backFaildMsg = '充值失败！';
                var _postUrl = '/useraccount/recharge.do';
                $.get(path + _postUrl, _params, function(_backData) {
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg(_backSuccessMsg);
                    }else{
                        showMsg(_backFaildMsg)
                    }
                });

            }

            function reflushDataTable() {
                var type = $('#type').val()
                $('#contentTable').bootstrapTable('refresh', {
                    query: {
                        type: type
                    }
                });
            }
            </script>
    </head>

    <body>
        <div class="container-fluid maincontent">
            <div class="row">
                <div id="custom-toolbar">
                    <label>手机号查询：</label>
                    <input type="text" style="width: 150px; height: 25px;position: relative;top:10px;margin-right:20px;" id="phone">
                    <label for="">是否有牛币</label>
                    <select name="type" id="type" style="position: relative;top:2px;margin-right:20px;">
                        <option value="">请选择</option>
                        <option value="1">有牛币用户</option>
                        <option value="">全部用户</option>
                    </select>
                    <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
                        <i class="fa fa-search fa-lg"></i> 查询
                    </a>
                    <a class="btn btn-success" href="javascript:;" onclick="openaddEditModal('edit');">
                        <i class="fa fa-credit-card"></i> 充值
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
                                <fieldset>
                                    <legend>充值</legend>
                                    <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
                                    <div class="form-group">
                                        <label>用户手机号：</label>
                                        <input type="text" style="width: 150px; height: 25px;" id="phone" name="phone">
                                    </div>
                                    <div class="form-group">
                                        <label>充值金额：</label>
                                        <input type="text" style="width: 150px; height: 25px;" id="totalPrice" name="totalPrice">
                                    </div>
                                    <div style="text-align: center;">
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="saveOrUpdate();">确定充值</a>
                                        <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
        </div>
    </body>

    </html>
