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
            $(function() {
                $('#contentTable').bootstrapTable({
                    method: 'GET',
                    height: tableHeight,
                    cache: false,
                    url: path + '/user/list.do',
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
                        params.is_inside = $("#is_inside").val();
                        params.phone = $("#phone").val();
                        params.nickname = $("#nickname").val();
                        params.username = $("#username").val();
                        params.employeecode = $('#employeecode').val();
                        return params;
                    },
                    columns: [{
                            checkbox: true
                        }, {
                            field: 'user_id',
                            title: 'user_id',
                            visible: false
                        }, {
                            field: 'is_inside',
                            title: '用户类型',
                            formatter: function(value) {
                                return ['<font color="green">注册用户</font>', '<font color="red">内部用户</font>'][+value]
                            }
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
                            formatter: phoneFormatter
                        }, {
                            field: 'roleName',
                            title: '角色'
                        }
                        // , {
                        //     field: 'level',
                        //     title: '用户等级',
                        //     formatter:levelFormatter
                        // }

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
                        }, {
                            field: 'create_time',
                            title: '创建时间'
                        }, {
                            field: 'employeecode',
                            title: '邀请码'
                        }, {
                            field: 'note',
                            title: '备注'
                        }
                        /*
                        , {
                            field: 'note',
                            title: '备注'
                        }
                         , {
                            field: 'createName',
                            title: '创建'
                        }
                        , {
                            field: 'create_time',
                            title: '创建时间'
                        } , {
                            field: 'updateName',
                            title: '修改'
                        }
                        , {
                            field: 'update_time',
                            title: '修改时间'
                        } */
                    ]
                });

                //initRoleSelect(null);


                $("input:radio[name=job]").bind("change", function() {
                    var thisVal = $(this).val();
                    if (-1 == thisVal) {
                        $("#otherJob").show();
                    } else {
                        $("#otherJob").hide();
                    }
                });

                $("#queryBeginTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD"
                });
                $("#queryEndTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD"
                });
            });

            function sexFormatter(value, row) {
                if (value == 1) {
                    return "男";
                }
                return "女";
            }

             function phoneFormatter(value){
                if(value){
                    value = value.substr(0,3) + '****' + value.substr(7,10)
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

            // function levelFormatter(value,row){
            //  if(value == 1){
            //   return "初级用户";
            //  }else if(value == 2){
            //   return "中级用户";
            //  }else if(value == 3){
            //   return "高级用户";
            //  }
            //  return value;
            // }

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

            function initRoleSelect(checkVal, _type) {
                $('#roleIdSelect').html("");
                $.get(path + '/role/select.do?type=' + _type, function(_backData) {
                    eval("var roles = " + _backData);
                    if (roles && roles.length > 0) {
                        for (var i = 0; i < roles.length; i++) {
                            var role = roles[i];
                            var roleid = role.role_id;
                            if (roleid == checkVal) {
                                $('#roleIdSelect').append('<option value="' + roleid + '" selected="selected">' + role.rolename + '</option>');
                            } else {
                                $('#roleIdSelect').append('<option value="' + roleid + '">' + role.rolename + '</option>');
                            }
                        }
                    }
                });
            }


            function reflushDataTable() {
                $('#contentTable').bootstrapTable('refresh', null);
            }

            function openAddEditModal(_addEditType) {

                $('#formId')[0].reset();
                $("#imagehow").attr("src", "");
                $("#otherJob").hide();
                if ('add' == _addEditType) {
                    $("input:radio").removeAttr("checked");
                }
                if ('edit' == _addEditType) {
                    var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                    if (rowDatas.length == 0) {
                        showMsg('请选择要修改的数据！');
                        return;
                    }
                    if (rowDatas.length > 1) {
                        showErr('修改只能选择一条数据！');
                        return;
                    }
                    rowDatas[0].birthdayString = rowDatas[0].birthdayStr;
                    $("#oldPassword").val(rowDatas[0].password);
                    loadData4Form($('#formId'), rowDatas[0]);
                    $("#passwordInput").val("******");

                    //初始化角色列表
                    initRoleSelect(rowDatas[0].role_id, 1);
                } else {
                    //初始化角色列表
                    initRoleSelect(null, 1);
                }
                if ('add' == _addEditType) {
                    $('#formId fieldset legend').html('新增用户');
                } else {
                    $('#formId fieldset legend').html('修改用户');

                }
                $("#product").hide();
                $("#service").hide();
                $('#addEditTypeId').val(_addEditType);
                $('#addEditModal').find('.showErrInfoP').hide();
                $('#addEditModal').modal('show');
            }


            function saveOrUpdate() {
                var _doAddEditType = $('#addEditTypeId').val();
                //必填验证

                var _passwordVal = $('#passwordInput').val();
                if (!_passwordVal) {
                    $('#passwordInput').tooltip('show');
                    return;
                }
                if (_passwordVal != "******" && !validPassword(_passwordVal)) {
                    showOnlyErr("密码只能包含字母和数字，其中数字不能开头，并且长度为6-15位!");
                    return false;
                }
                var _phoneVal = $('#phoneInput').val();
                if (!_phoneVal) {
                    $('#phoneInput').tooltip('show');
                    return;
                }
                if (!validTelphone(_phoneVal)) {
                    showOnlyErr("手机号输入错误!");
                    return;
                }

                var emailInputValue = $('#emailInput').val();
                if (emailInputValue != "" && !validEmail(emailInputValue)) {
                    showOnlyErr("邮箱输入错误!");
                    return;
                }

                var nikeNameValue = $('#nicknameInput').val();
                console.log("===", nikeNameValue)
                    // && !validNickname(nikeNameValue)
                if (!nikeNameValue) {
                    showOnlyErr("昵称只能包含汉字、字母、数字和下划线，且长度为3到12位!");
                    return;
                }


                var jobVal = $("input:radio[name=job]:checked").val();
                var otherJobVal = $("#otherJob").val();
                if (jobVal == -1) {
                    if (otherJobVal == "") {
                        showOnlyErr("请填写其他职业!");
                        return;
                    } else {
                        if (otherJobVal.length > 10) {
                            showOnlyErr("请最多用10个字来描述职业");
                            return;
                        }
                    }
                    $("#other").val(otherJobVal);
                }
                var password = $("#passwordInput").val();
                if ("******" == password) {
                    $("#passwordInput").val($("#oldPassword").val());
                }
                var _params = $('#formId').serialize();
                $('#addEditModal').modal('hide');
                parent.showProcessWin();

                var _backSuccessMsg = '创建成功！';
                var _backFaildMsg = '创建失败！';
                var _postUrl = '/user/add.do';
                if ('add' != _doAddEditType) {
                    _backSuccessMsg = '修改成功！';
                    _backFaildMsg = '修改失败！';
                }
                $.post(path + _postUrl, _params, function(_backData) {
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg(_backSuccessMsg);
                    } else if ("1" == _backData) {
                        parent.closeProcessWin(function() {
                            $('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + "用户已存在！");
                            $('#addEditModal').find('.showErrInfoP').show();
                            $('#addEditModal').modal('show');
                        });
                    } else {
                        parent.closeProcessWin(function() {
                            $('#addEditModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
                            $('#addEditModal').find('.showErrInfoP').show();
                            $('#addEditModal').modal('show');
                        });
                    }
                });

            }



            function deletes() {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                if (rowDatas.length == 0) {
                    showMsg('请选择要删除的用户！');
                    return;
                }
                showConfirm('确认要删除这' + rowDatas.length + '个用户吗？',
                    function() {
                        var _ids = new Array;
                        for (var i = 0; i < rowDatas.length; i++) {
                            _ids.push(rowDatas[i].user_id);
                        }
                        $.post(path + '/user/delete.do', {
                            ids: _ids.toString()
                        }, function(_backData) {
                            if ("success" == _backData) {
                                showOnlyMsg('删除成功！');
                                reflushDataTable();
                            } else
                                showOnlyErr('删除失败！' + _backData);
                            reflushDataTable();
                        });
                    },
                    function() {});

            }

            function uploadImage() {
                var validSuccess = validateImgFile("imageInput");
                if (validSuccess) {
                    var index = showLoading("图片文件正在上传中，请稍后...");
                    $.ajaxFileUpload({
                        url: path + "/user/uploadImg.do",
                        secureuri: false,
                        fileElementId: 'imageInput',
                        dataType: 'json',
                        success: function(_backData, status) {
                            layer.close(index);
                            if ("-1" == _backData) {
                                showOnlyErr("上传图片失败!");
                            } else {
                                if ("success" == _backData.flag) {
                                    showOnlyMsg("上传图片成功!");
                                    $("#hiddenImage").val(_backData.returnPath);
                                    $("#imagehow").attr("src", path + "\\" + _backData.returnPath);
                                } else {
                                    showOnlyErr("上传图片失败!");
                                }
                            }
                        },
                        error: function(data, status, e) {
                            layer.close(index);
                            showOnlyErr("上传图片失败：" + e);
                        }
                    });
                }
            }

            function exportUserDetail() {
                showConfirm('确认要导出所有用户吗？', function() {
                    var url = '${path}/user/exportUserDetail.do';
                    var beginTime = $('#queryBeginTime').val();
                    var endTime = $('#queryEndTime').val();
                    var is_inside = $("#is_inside").val();
                    var phone = $("#phone").val();
                    var nickname = $("#nickname").val();
                    var username = $("#username").val();
                    var employeecode = $('#employeecode').val();
                    url += "?is_inside=" + is_inside;
                    url += "&phone=" + phone;
                    url += "&nickname=" + nickname;
                    url += "&username=" + username;
                    url += "&employeecode=" + employeecode;
                    url += "&beginTime=" + beginTime;
                    url += "&endTime=" + endTime;
                    window.location = url;
                });
            }

            function onState() {
                var state = $("#orderState").val();
                console.log("======", state);
                if (state == 1) {
                    $("#product").show();
                    $("#service").show();
                } else {
                    $("#product").hide();
                    $("#service").hide();
                }
            }

            function banned() {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                if (rowDatas.length == 0) {
                    showMsg('请选择要修改的数据！');
                    return;
                }
                if (rowDatas.length > 1) {
                    showErr('修改只能选择一条数据！');
                }
                $('#bannedEditModal').find('.showErrInfoP').hide();
                $("#userid").val(rowDatas[0].user_id);
                $("#bannedEditModal").modal('show');

            }

            function clickBanned(value) {
                var user_id = $("#userid").val();
                var type = value;
                $('#bannedEditModal').find('.showErrInfoP').hide();
                $.post(path + '/user/banned.do', {
                    user_id: user_id,
                    type: type
                }, function(_backData) {
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg("操作成功!");
                    } else if ("error" == _backData) {
                        $('#bannedEditModal').find('.showErrInfoP').html("用户已被禁言");
                        $('#bannedEditModal').find('.showErrInfoP').show();
                        $('#bannedEditModal').modal('show');
                    }
                });
            }
            </script>
    </head>

    <body>
        <div class="container-fluid maincontent" style="padding-top: 15px">
            <div class="row" style="margin-top:-15px;">
                <div id="custom-toolbar">
                    <label>支付模式选择：</label>
                    <select id="is_inside">
                        <option value="">全部</option>
                        <option value="0">注册用户</option>
                        <option value="1">内部用户</option>
                    </select>
                    <label>手机号查询：</label>
                    <input type="text" style="width: 150px; height: 25px;" id="phone">
                    <label>昵称查询：</label>
                    <input type="text" style="width: 150px; height: 25px;" id="nickname">
                    <label>姓名查询：</label>
                    <input type="text" style="width: 150px; height: 25px;" id="username">
                    <label>邀请码查询：</label>
                    <input type="text" style="width: 150px; height: 25px;" id="employeecode">
                    <a class="btn btn-info" href="javascript:;" onclick="reflushDataTable();">
                        <i class="fa fa-search fa-lg"></i> 查询
                    </a>
                    <span class='btn btn-info bannedService' menuCode='bannedService' id="bannedService" onclick="banned()">权限</span>
                    <a class="btn btn-primary" href="javascript:;" onclick="openAddEditModal('add');">
                        <i class="fa fa-plus fa-lg"></i> 新增
                    </a>
                    <a class="btn btn-success" href="javascript:;" onclick="openAddEditModal('edit');">
                        <i class="fa fa-trash-o fa-lg"></i> 修改
                    </a>
                    <!-- <a class="btn btn-danger" href="javascript:;" onclick="deletes();">
                <i class="fa fa-trash-o fa-lg"></i> 删除
           </a> -->
                    </br>
                    <label for="search_name">开始时间</label>
                    <input type="text" style="width: 150px; height: 35px;" id="queryBeginTime">
                    <label for="search_name">结束时间</label>
                    <input type="text" style="width: 150px; height: 35x;" id="queryEndTime">
                    <a class="btn btn-danger" href="javascript:;" onclick="exportUserDetail();">
                        <i class="fa fa-trash-o fa-lg"></i> 导出
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
                                <input type="text" name="user_id" style="display: none;" />
                                <input type="text" id="addEditTypeId" style="display: none;" />
                                <fieldset>
                                    <legend>新增用户</legend>
                                    <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
                                    <div class="form-group">
                                        <label for="insideSelect" style="width:70px;">用户：</label>
                                        <select class="form-control" id="insideSelect" name="is_inside" style="width:163px;">
                                            <option value="0">注册用户</option>
                                            <option value="1">内部用户</option>
                                        </select>
                                    </div>
                                    <div class="form-group" style="display: none">
                                        <label for="noteInput" style="width:100px;">998服务：</label>
                                        <select id="orderState" name="orderState" onclick="onState()" class="form-control" style="width:163px;">
                                            <option value="0">不开通</option>
                                            <option value="1">开通</option>
                                        </select>
                                    </div>
                                    <div class="form-group" id="product" style="display: none">
                                        <label>选择产品：</label>
                                        <select id="goodsId" name="goodsId">
                                            <option value="">请选择</option>
                                            <c:forEach items="${plist }" var="product">
                                                <option value="${product.id }">${product.product_name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                    <div class="form-group" id="service" style="display: none">
                                        <label>选择服务期限：</label>
                                        <c:forEach items="${plist }" var="product">
                                            <select id="price_id" name="price_id">
                                                <option value="">请选择</option>
                                                <c:forEach items="${product.priceList }" var="pr">
                                                    <option value="${pr.id }">${pr.product_price}(${pr.servicePeriod}个月)</option>
                                                </c:forEach>
                                            </select>
                                        </c:forEach>
                                    </div>
                                    <div class="form-group">
                                        <label for="nameInput" style="width:70px;">姓名：</label>
                                        <input type="text" class="form-control" name="username" id="nameInput" placeholder="姓名" data-toggle="tooltip" data-placement="top" title="请输入姓名！" style="width:163px;">
                                    </div>
                                    <div class="form-group">
                                        <label for="passwordInput" style="width:70px;">密码：</label>
                                        <input type="text" class="form-control" name="password" id="passwordInput" placeholder="密码" data-toggle="tooltip" data-placement="top" title="请输入密码！" style="width:163px;">
                                        <input type="hidden" class="form-control" id="oldPassword">
                                    </div>
                                    <!-- <div class="form-group">
                <label for="passwordInput">明文密码：</label>
                <input type="text" class="form-control" name="mpassword" id="passwordInput" placeholder="明文密码" data-toggle="tooltip" data-placement="top" ">
                 <input type="hidden" class="form-control" id="mpassword" >
              </div> -->
                                    <div class="form-group">
                                        <label for="sexSelect" style="width:70px;">性别：</label>
                                        <select class="form-control" id="sexSelect" name="sex" style="width:163px;">
                                            <option value="1">&nbsp;&nbsp;男&nbsp;&nbsp;</option>
                                            <option value="0">&nbsp;&nbsp;女&nbsp;&nbsp;</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="birthdayInput" style="width:70px;">生日：</label>
                                        <input type="text" class="form-control" name="birthdayString" id="birthdayInput" placeholder="生日" style="width:163px;">
                                        <script type="text/javascript">
                                        $('#birthdayInput').datetimepicker({
                                            locale: "zh-cn",
                                            format: "YYYY-MM-DD"
                                        });
                                        </script>
                                    </div>
                                    <div class="form-group">
                                        <label for="emailInput" style="width:70px;">邮箱：</label>
                                        <input type="text" class="form-control" name="email" id="emailInput" placeholder="Email" style="width:163px;">
                                    </div>
                                    <div class="form-group">
                                        <label for="qq_Input" style="width:70px;">QQ：</label>
                                        <input type="text" class="form-control" name="qq" id="qq_Input" placeholder="QQ" style="width:163px;">
                                    </div>
                                    <!-- <div class="form-group">
                <label for="levelSelect">用户等级：</label>
                 <select class="form-control" id="levelSelect" name="level" style="width: 151px;">
                  <option value="1">初级用户</option>
                  <option value="2">中级用户</option>
                  <option value="3">高级用户</option>
                  </select>
              </div> -->
                                    <div class="form-group">
                                        <label for="nicknameInput" style="width:70px;">昵称：</label>
                                        <input type="text" class="form-control" name="nickname" id="nicknameInput" placeholder="昵称" style="width:163px;">
                                    </div>
                                    <div class="form-group">
                                        <label for="phoneInput" style="width:70px;">手机：</label>
                                        <input type="text" class="form-control" name="phone" id="phoneInput" placeholder="手机号码" style="width:163px;" data-toggle="tooltip" data-placement="top" title="请输入手机号！">
                                    </div>
                                    <div class="form-group">
                                        <label for="market_timeInput" style="width:70px;">入市时间：</label>
                                        <input type="text" class="form-control" name="market_time" id="market_timeInput" placeholder="入市时间" style="width:163px;">
                                        <script type="text/javascript">
                                        $('#market_timeInput').datetimepicker({
                                            locale: "zh-cn",
                                            format: "YYYY-MM-DD"
                                        });
                                        </script>
                                    </div>
                                    <div class="form-group">
                                        <label for="roleIdSelect" style="width:70px;">用户角色：</label>
                                        <select class="form-control" id="roleIdSelect" name="role_id" style="width:163px;">
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="employeecodeInput" style="width:70px;">邀请码：</label>
                                        <input type="text" class="form-control" name="employeecode" id="employeecodeInput" placeholder="邀请码" style="width:163px;">
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label for="nameInput" style="width:70px;">头像：</label>
                                        <input type="file" class="form-control" name="imageFile" id="imageInput" style="width:245px;">
                                        <input type="text" class="form-control" name="photo" id="hiddenImage" style="display: none;">
                                        <button type="button" onclick="uploadImage()" class="btn btn-warning">上传</button>
                                        <img id="imagehow" src="" style="width:100px;border:1px solid #FFFFFF;">
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label for="jobInput" style="width:70px;">职业：</label>
                                        <c:forEach items="${jobtypes }" var="itemObj">
                                            <input type="radio" class="form-control" name="job" value="${itemObj.id }"> ${itemObj.job_name }
                                        </c:forEach>
                                        <!--                <input type="radio" class="form-control" name="job" value="-1" id="other"> 其他 <input type="text" class="form-control" id="otherJob" placeholder="请最多用10个字来描述职业" style="display: none;"/> -->
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label for="fundsInput" style="width:70px;">资金：</label>
                                        <c:forEach items="${fundstypes }" var="itemObj">
                                            <input type="radio" class="form-control" name="funds" value="${itemObj.id }"> ${itemObj.founds_name }
                                        </c:forEach>
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label for="investment_styleInput" style="width:70px;">投资风格：</label>
                                        <c:forEach items="${investmenttypes }" var="itemObj">
                                            <input type="radio" class="form-control" name="investment_style" value="${itemObj.id }"> ${itemObj.investment_name }
                                        </c:forEach>
                                    </div>
                                    <br/>
                                    <div class="form-group">
                                        <label for="noteInput" style="width:70px;">备注信息：</label>
                                        <input type="text" class="form-control" name="note" id="noteInput" placeholder="备注" style="width:700px;">
                                    </div>
                                    <div style="text-align: center;">
                                        <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdate();">保存</a>
                                        <a href="javascript:;" class="btn btn-danger" onclick="$('#addEditModal').modal('hide');">关闭</a>
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
            <div class="modal fade" id="bannedEditModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-body">
                            <form class="form-inline" id="formId">
                                <input type="text" id="userid" name="user_id" style="display: none;" />
                                <fieldset>
                                    <legend>点击按钮禁言，禁言后可在禁言管理查看</legend>
                                    <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
                                    <div style="text-align: center;">
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="clickBanned(0);">问股</a>
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="clickBanned(1);">直播互动</a>
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="clickBanned(2);">观点评论</a>
                                        <a href="javascript:void(0);" class="btn btn-success" onclick="clickBanned(3);">拉黑</a>
                                        <a href="javascript:void(0);" class="btn btn-danger" onclick="$('#bannedEditModal').modal('hide');">关闭</a>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    </body>

    </html>
