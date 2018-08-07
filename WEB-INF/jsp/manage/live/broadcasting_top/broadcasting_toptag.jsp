<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="zh-CN">

    <head>
        <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
            <link href="${path}/manage/bootstrap/css/bootstrap-table.min.css" rel="stylesheet">
            <link href="${path}/manage/plugins/multiselect/css/bootstrap-multiselect.css" rel="stylesheet">
            <script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-all.min.js"></script>
            <script type="text/javascript" src="${path}/manage/bootstrap/js/bootstrap-table-zh-CN.min.js"></script>
            <script type="text/javascript" src="${path}/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
            <script type="text/javascript" src="${path}/manage/plugins/multiselect/js/bootstrap-multiselect.js"></script>
            <script>
            $(function() {

                //图片上传
                var fileInput = $('#image-upload')
                var preview = $('#image-preview')
                fileInput.change(function(e) {
                    var file = e.target.files[0]
                    var reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function(e) {
                        var src = e.target.result
                        preview.attr('src', src)
                        $('#tag_img').val(src)
                    }
                })

                //APP图片上传
                var fileInput = $('#app-image-upload')
                var preview = $('#app-image-preview')
                fileInput.change(function(e) {
                    var file = e.target.files[0]
                    var reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function(e) {
                        var src = e.target.result
                        preview.attr('src', src)
                        $('#apptTag_img').val(src)
                    }
                })

                $('#contentTable').bootstrapTable({
                    method: 'get',
                    height: tableHeight,
                    cache: false,
                    url: path + '/broadcastingTop/toptagList.do',
                    striped: true,
                    pagination: true,
                    pageSize: 50,
                    pageList: [50, 100, 150, 200, 500],
                    contentType: "application/x-www-form-urlencoded",
                    //showRefresh: true,
                    minimumCountColumns: 2,
                    clickToSelect: true,
                    queryParams: function(params) {
                        params.pageSize = params.limit;
                        params.currentPage = params.offset / params.limit + 1;
                        return params;
                    },
                    sidePagination: "server", //服务端请求
                    columns: [{
                        checkbox: true
                    }, {
                        field: 'id',
                        title: 'id',
                        visible: false
                    }, {
                        field: 'tag_name',
                        title: '标签名称'
                    }, {
                        field: 'tag_img',
                        title: '标签图片',
                        formatter: imgFormatter
                    },{
                        field: 'phonetag_name',
                        title: 'APP标签',
                        // formatter: imgFormatter
                    },  {
                        field: 'create_time',
                        title: '创建时间'
                    }]
                });


            });


            function imgFormatter(value, row) {
                if (value != "" && value != null) {
                    return "<img src='" + path + "/" + value + "' style='width:100px;'/>";
                }
            }


            function openAddEditRoomModal(_addEditType) {

                $("#img_srcShow").attr("src", "");
                $('#addBroadCastingRoomFormId')[0].reset();
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
                    loadData4Form($('#addBroadCastingRoomFormId'), rowDatas[0]);
                    if (rowDatas[0].img_src != "") {
                        $("#img_srcShow").attr("src", path + "\\" + rowDatas[0].photo);
                    }
                    console.log(rowDatas[0]);
                } else {
                    $("#roomid_hidden").val("");
                    $("#img_srcInput").val("");

                }
                if ('add' == _addEditType) {
                    $('#addHospitalFormId fieldset legend').html('新增标签');
                } else {
                    $('#addHospitalFormId fieldset legend').html('修改标签');
                    $('#roomid_hidden').val(rowDatas[0].id);
                }
                $('#addEditTypeId').val(_addEditType);
                $('#addEditBroadCastingRoomModal').find('.showErrInfoP').hide();
                $('#addEditBroadCastingRoomModal').modal('show');
            }


            function saveOrUpdateRoom() {
                var _doAddEditType = $('#addEditTypeId').val();
                var appTag = $('#phonetag_name').val()
                if(appTag.length > 3){
                    showMsg('app标签最多设置3个字')
                    return
                }
                //必填验证
                var _title = $('#tag_name').val();
                if (!_title) {
                    $('#tag_name').tooltip('show');
                    return;
                }

                var _params = $('#addBroadCastingRoomFormId').serialize();
                $('#addEditBroadCastingRoomModal').modal('hide');
                parent.showProcessWin();

                var _backSuccessMsg = '创建成功！';
                var _backFaildMsg = '创建失败！';
                var _postUrl = '/broadcastingTop/addToptag.do';
                if ('add' != _doAddEditType) {
                    _backSuccessMsg = '修改成功！';
                    _backFaildMsg = '修改失败！';
                }

                $.post(path + _postUrl, _params, function(_backData) {
                    if ("success" == _backData) {
                        parent.closeProcessWin();
                        reflushDataTable();
                        showMsg(_backSuccessMsg);
                        $('#image-preview').attr('src', '')
                    } else {
                        parent.closeProcessWin(function() {
                            $('#addEditHospitalModal').find('.showErrInfoP').html(_backFaildMsg + _backData);
                            $('#addEditHospitalModal').find('.showErrInfoP').show();
                            $('#addEditHospitalModal').modal('show');
                        });
                    }
                });

            }


            function deleteRooms() {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                if (rowDatas.length == 0) {
                    showMsg('请选择要删除的数据！');
                    return;
                }
                showConfirm('确认要删除' + rowDatas.length + '条数据吗？',
                    function() {
                        var _deleteArr = new Array();
                        for (var i = 0; i < rowDatas.length; i++) {
                            _deleteArr.push(rowDatas[i].id);
                        }
                        $.post(path + '/broadcastingTop/delToptag.do', {
                            ids: _deleteArr.toString()
                        }, function(_backData) {
                            if ("success" == _backData) {
                                showMsg('删除成功！');
                                reflushDataTable();
                            } else
                                showErr('删除失败！' + _backData);
                        });
                    });
            }

            function reflushDataTable() {
                $('#contentTable').bootstrapTable('refresh', null);
            }

            function modelCancel() {
                $('#addEditBroadCastingRoomModal').modal('hide');
                $('#image-preview').attr('src', '')
            }
            </script>
    </head>

    <body>
        <div class="container-fluid maincontent">
            <div class="row">
                <form class="form-inline">
                </form>
                <div id="custom-toolbar">
                    <a class="btn btn-primary" href="javascript:;" onclick="openAddEditRoomModal('add');">
                        <i class="fa fa-plus fa-lg"></i> 新增
                    </a>
                    <a class="btn btn-success" href="javascript:;" onclick="openAddEditRoomModal('edit');">
                        <i class="fa fa-edit fa-lg"></i> 修改
                    </a>
                    <a class="btn btn-danger" href="javascript:;" onclick="deleteRooms();">
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
            <div class="modal fade" id="addEditBroadCastingRoomModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-body">
                            <form class="form-inline" id="addBroadCastingRoomFormId">
                                <input type="hidden" name="id" id="roomid_hidden" />
                                <input type="hidden" id="addEditTypeId" />
                                <fieldset>
                                    <legend style="max-height:760px;overflow-y:auto;">新增标签</legend>
                                    <h4 class="alert alert-danger showErrInfoP" style="display: none;"></h4>
                                    <div class="form-group">
                                        <label for="title">标签：</label>
                                        <input type="text" class="form-control" name="tag_name" id="tag_name" placeholder="标签" data-toggle="tooltip" data-placement="top" title="请输入标签" style="width:310px;">
                                    </div>
                                    <div class="form-group">
                                        <label for="title">标签图片：</label>
                                        <input type="file" id="image-upload">
                                        <div style="width:150px;"><img class="form-control" name="" src="" id="image-preview" width="100%"></div>
                                        <input type="hidden" name="dataImg" id="tag_img" />
                                    </div>
                                    <%-- <div class="form-group">
                                        <label for="title">APP标签图片：</label>
                                        <input type="file" id="app-image-upload">
                                        <div style="width:150px;"><img class="form-control" name="" src="" id="app-image-preview" width="100%"></div>
                                        <input type="hidden" name="phoneDataImg" id="apptTag_img" />
                                    </div> --%>
                                    <div class="form-group">
                                        <label for="title">APP标签：</label>
                                        <input type="text" class="form-control" name="phonetag_name" id="phonetag_name" placeholder="标签" data-toggle="tooltip" data-placement="top" title="请输入标签" style="width:310px;">
                                    </div>
                                    <div style="text-align: center;">
                                        <a href="javascript:;" class="btn btn-success" onclick="saveOrUpdateRoom();">保存</a>
                                        <a href="javascript:;" class="btn btn-danger" onclick="modelCancel()">关闭</a>
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
