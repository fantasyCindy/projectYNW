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
                    url: path + '/pay/vipLiveOrder.do',
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
                        params.orderState = $("#state").val();
                        params.is_inside = $("#is_inside").val();
                        params.payMode = $("#payMode").val();
                        params.phone = $("#phone").val();
                        params.orderNum = $("#orderNum").val();
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
                        title: '用户类型',
                        formatter: is_insideFormatter
                    }, {
                        field: 'phone',
                        title: '用户手机号'
                    }, {
                        field: 'username',
                        title: '用户姓名'
                    }, {
                        field: 'nickname',
                        title: '用户昵称'
                    }, {
                        field: 'mpassword',
                        title: '账户密码'
                    }, {
                        field: 'orderName',
                        title: '订单名称'
                    }, {
                        field: 'orderNum',
                        title: '订单号'
                    }, {
                        field: 'totalPrice',
                        title: '价格'
                    }, {
                        field: 'orderState',
                        title: '订单状态',
                        formatter: stateFormatter
                    }, {
                        field: 'payMode',
                        title: '支付方式',
                        formatter: payModeFormatter
                    }, {
                        field: 'pay_source',
                        title: '支付来源',
                        formatter: paySourceFormatter
                    }, {
                        field: 'orderTime',
                        title: '创建时间'
                    }, {
                        field: 'auditTime',
                        title: '审核时间'
                    }, {
                        field: 'endTime',
                        title: '到期时间'
                    }, {
                        field: 'endDay',
                        title: '距离到期时间'
                    }, {
                        field: 'orderState',
                        title: '续费',
                        formatter: renewFormatter
                    }]
                });
            });


            function stateFormatter(value, row) {
                if (value == 6) {
                    return "<font style='color:red;cursor:pointer;' title=''>服务中</font>";
                } else if (value == 7) {
                    return "<font style='color:red;cursor:pointer;' title=''>付款待确认</font>";
                } else if (value == 4) {
                    return "<font style='color:red;cursor:pointer;' title=''>已退款</font>";
                } else if (value == 1) {
                    return "<font style='color:red;cursor:pointer;' title=''>已完成</font>";
                }
            }

            function renewFormatter(value, row) {
                if (value == 6) {
                    return "<a class='btn btn-success' href='javascript:;' onclick='renewModal();'><i class='fa fa-plus fa-lg'></i> 续费  </a>";
                }
            }

            function payModeFormatter(value, row) {
                if (value == 1) {
                    return "<font style='color:red;cursor:pointer;' title=''>支付宝</font>";
                } else if (value == 2) {
                    return "<font style='color:red;cursor:pointer;' title=''>微信</font>";
                } else if (value == 3) {
                    return "<font style='color:red;cursor:pointer;' title=''>ios支付平台</font>";
                } else if (value == 4) {
                    return "<font style='color:red;cursor:pointer;' title=''>余额支付(虚拟币)</font>";
                } else if (value == 5) {
                    return "<font style='color:red;cursor:pointer;' title=''>转账</font>";
                } else {
                    return "<font style='color:red;cursor:pointer;' title=''>余额支付(虚拟币)</font>";
                }
            }

            function paySourceFormatter(value, row) {
                if (value == 0) {
                    return "<font style='color:red;cursor:pointer;' title=''>网页</font>";
                } else if (value == 1) {
                    return "<font style='color:red;cursor:pointer;' title=''>ios</font>";
                } else if (value == 2) {
                    return "<font style='color:red;cursor:pointer;' title=''>安卓</font>";
                } else if (value == 3) {
                    return "<font style='color:red;cursor:pointer;' title=''>h5</font>";
                }
            }

            function is_insideFormatter(value, row) {
                if (value == 0) {
                    return "<font style='color:green;cursor:pointer;' title=''>注册用户</font>";
                } else if (value == 1) {
                    return "<font style='color:red;cursor:pointer;' title=''>内部用户</font>";
                }
            }
            function openaddEditModal(_addEditType) {
                $('#formId')[0].reset();
                $("#imgShow").attr("src", "");
                if ('edit' == _addEditType) {
                    var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                    var version_type = rowDatas.version_type;
                    if (rowDatas.length == 0) {
                        showMsg('请选择要修改的记录！');
                        return;
                    }
                    if (rowDatas.length > 1) {
                        showErr('修改只能选择一条数据！');
                        return;
                    }
                    var style = rowDatas[0].orderState
                    if (style == '7') {
                        $('.form-group.startTime').removeClass('hide');
                    } else {
                        $('.form-group.startTime').addClass('hide');
                    }
                    loadData4Form($('#formId'), rowDatas[0]);
                }

                if ('add' == _addEditType) {
                    $('#formId fieldset legend').html('创建');
                    $("#orderid").val("");
                    $("#product").show();
                    $("#service").show();
                    $('.form-group.startTime').removeClass('hide');
                } else {
                    $('#formId fieldset legend').html('修改');
                    $("#product").hide();
                    $("#service").hide();
                }
                $('#addEditTypeId').val(_addEditType);
                $('#addEditModal').find('.showErrInfoP').hide();
                $('#addEditModal').modal('show');
                $("#from-partner").html("");
                $("#partneradd").css("display", "block");

                $.datetimepicker.setLocale('ch');
                $("#auditTime").datetimepicker({
                    // maxDate: new Date(),
                    format: "Y-m-d H:i:s",
                    showSecond: true,
                });
            }

            function renewModal() {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                console.log("rowDatas",rowDatas[0])
                if(!rowDatas[0]){
                    return showMsg('请选择要续费的用户')
                }
                var userid = rowDatas[0].userid;               
                var roomid = rowDatas[0].goodsId;
                $("#product").show();
                $("#service").show();
                $('#renewModal').find('.showErrInfoP').hide();
                $('#renewModal').modal('show');
                $("#userid").val(userid);
                $("#roomid").val(roomid);
            }

            function renew() {

                var _params = $('#formId1').serialize();
                $.post(path + "/pay/renewPayorder.do", _params, function(_backData) {
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg("续费成功");
                        $('#renewModal').modal('hide');
                    } else {
                        parent.closeProcessWin(function() {
                            $('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
                            $('#addEditModal').find('.showErrInfoP').show();
                            $('#addEditModal').modal('show');
                        });
                    }
                });
            }

            function saveOrUpdate() {
                var _doAddEditType = $('#addEditTypeId').val();
                //必填验证
                var _params = $('#formId').serialize();
                $('#addEditModal').modal('hide');
                parent.showProcessWin();

                var _backSuccessMsg = '创建成功！';
                var _backFaildMsg = '创建失败！';
                var _postUrl = '/pay/addPayorder.do';
                if ('add' != _doAddEditType) {
                    _backSuccessMsg = '修改成功！';
                    _backFaildMsg = '修改失败！';
                    _postUrl = '/pay/editvipLiveOrder.do';
                }

                $.post(path + _postUrl, _params, function(_backData) {
                    console.log('_params', _params);
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg(_backSuccessMsg);
                    } else if ("60020" == _backData) {
                        parent.closeProcessWin();
                        showMsg("该用户已购买此商品并使用");
                    } else if ("60021" == _backData) {
                        parent.closeProcessWin();
                        showMsg("该用户已购买此商品请客服人员尽快联系！");
                    } else if ("11" == _backData) {
                        parent.closeProcessWin();
                        showMsg("该用户不存在！");
                    } else {
                        parent.closeProcessWin(function() {
                            $('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
                            $('#addEditModal').find('.showErrInfoP').show();
                            $('#addEditModal').modal('show');
                        });
                    }
                });

            }

            function updateall() {
                var _params = null;
                $.get(path + "/pay/updateAllorderEndTime.do", _params, function(_backData) {
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg(_backSuccessMsg);
                    } else if ("60020" == _backData) {
                        parent.closeProcessWin();
                        showMsg("该用户已购买此商品并使用");
                    } else if ("60021" == _backData) {
                        parent.closeProcessWin();
                        showMsg("该用户已购买此商品请客服人员尽快联系！");
                    } else if ("11" == _backData) {
                        parent.closeProcessWin();
                        showMsg("该用户不存在！");
                    } else {
                        parent.closeProcessWin(function() {
                            $('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
                            $('#addEditModal').find('.showErrInfoP').show();
                            $('#addEditModal').modal('show');
                        });
                    }
                });

            }

            function reflushDataTable() {
                $('#contentTable').bootstrapTable('refresh', null);
            }
            </script>
    </head>

    <body>
    <div style="font-size:22px;margin:30px 30px;">操盘内线更换后台地址,请移步至 <a target="_blank" style="display: inline-block;color:red" href="http://cp.yueniucj.com/main.do">http://cp.yueniucj.com/main.do</a></div>
        <div class="container-fluid maincontent" style="display: none;">
            <div class="row">
                <div id="custom-toolbar">
                    <label>订单状态：</label>
                    <select id="state">
                        <option value="">全部</option>
                        <option value="7">待确认</option>
                        <option value="6">服务中</option>
                        <option value="4">已退款</option>
                        <option value="1">已完成</option>
                    </select>
                    <label>用户选择：</label>
                    <select id="is_inside">
                        <option value="">全部</option>
                        <option value="0">注册用户</option>
                        <option value="1">内部用户</option>
                    </select>
                    <label>支付模式选择：</label>
                    <select id="payMode">
                        <option value="">全部</option>
                        <option value="1">支付宝</option>
                        <option value="2">微信</option>
                        <option value="3">IOS平台支付</option>
                        <option value="4">余额支付(虚拟币)</option>
                        <option value="5">转账</option>
                    </select>
                    <label>手机号查询：</label>
                    <input type="text" style="width: 150px; height: 25px;" id="phone">
                    <label>订单号查询：</label>
                    <input type="text" style="width: 250px; height: 25px;" id="orderNum">
                    <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
                        <i class="fa fa-search fa-lg"></i> 查询
                    </a>
                    <a class="btn btn-info" href="javascript:;" onclick="openaddEditModal('add');">
                        <i class="fa fa-plus fa-lg"></i> 新增
                        <a class="btn btn-success" href="javascript:;" onclick="openaddEditModal('edit');">
                            <i class="fa fa-trash-o fa-lg"></i> 修改
                        </a>
                        <!-- <a class="btn btn-success" href="javascript:;" onclick="updateall();">
            <i class="fa fa-trash-o fa-lg"></i> 修改订单结束时间
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
                                <input type="hidden" id="hiddenapk" name='apkurl' />
                                <input type="hidden" id="addEditTypeId" />
                                <input type="hidden" id="orderid" name="orderid" style="display: none;" />
                                <input type="hidden" name="add_type" value="0" />
                                <fieldset>
                                    <legend>修改</legend>
                                    <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
                                    <div class="form-group">
                                        <label>用户手机号：</label>
                                        <input type="text" style="width: 150px; height: 25px;" id="phone" name="phone">
                                    </div>
                                    <div class="form-group">
                                        <label>状态：</label>
                                        <select id="orderState" name="orderState">
                                            <option value="7">待确认</option>
                                            <option value="6">服务中</option>
                                            <option value="4">已退款</option>
                                        </select>
                                    </div>
                                    <div class="form-group startTime">
                                        <label>开始时间：</label>
                                        <input type="text" class="form-control" id="auditTime" name="audiTimes">
                                    </div>
                                    <div class="form-group" id="product">
                                        <label>选择产品：</label>
                                        <select id="goodsId" name="goodsId">
                                            <option value="">请选择</option>
                                            <c:forEach items="${plist }" var="product">
                                                <option value="${product.id }">${product.product_name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                    <div class="form-group" id="service">
                                        <label>选择服务期限：</label>
                                        <c:forEach items="${plist }" var="product">
                                            <select id="price_id" name="price_id">
                                                <option value="">请选择</option>
                                                <c:forEach items="${product.priceList }" var="pr">
                                                    <option value="${pr.id }">${pr.product_price}(${pr.servicePeriod}月)</option>
                                                </c:forEach>
                                            </select>
                                        </c:forEach>
                                    </div>
                                    <div style="text-align: center;">
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
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
            <!-- /.modal -->
            <div class="modal fade" id="renewModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-body">
                            <form class="form-inline" id="formId1">
                                <input type="hidden" id="userid" name="userid" style="display: none;" />
                                 <input type="hidden" id="roomid" name="roomid" style="display: none;" />
                                <fieldset>
                                    <legend>续费</legend>
                                    <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
                                    <div class="form-group" id="product">
                                        <label>选择产品：</label>
                                        <select id="goodsId" name="goodsId">
                                            <option value="">请选择</option>
                                            <c:forEach items="${plist }" var="product">
                                                <option value="${product.id }">${product.product_name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                    <div class="form-group" id="service">
                                        <label>选择服务期限：</label>
                                        <c:forEach items="${plist }" var="product">
                                            <select id="price_id" name="price_id">
                                                <option value="">请选择</option>
                                                <c:forEach items="${product.priceList }" var="pr">
                                                    <option value="${pr.id }">${pr.product_price}(${pr.servicePeriod}月)</option>
                                                </c:forEach>
                                            </select>
                                        </c:forEach>
                                    </div>
                                    <div style="text-align: center;">
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="renew();">确认</a>
                                        <a href="javascript:void(0);" class="btn btn-danger close" onclick="$('#renewModal').modal('hide');">关闭</a>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
        </div>
    </body>

    </html>
