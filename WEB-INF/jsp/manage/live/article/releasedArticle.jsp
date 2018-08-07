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
            <style>
            /*关键字提示*/
            
            .hide {
                display: none;
            }
            
            .push {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                position: fixed;
                top: 0;
                left: 0;
                display: none;
            }
            
            .push .layer-container {
                width: 400px;
                height: 250px;
                position: fixed;
                top: 30%;
                left: 40%;
                background: #fff;
            }
            
            .push .layer-title {
                width: 100%;
                height: 40px;
                line-height: 40px;
                background: #F5F5F5;
                text-align: center;
            }
            
            .push .push-btn {
                width: 100px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                margin: 0 auto;
                margin-top: 35px;
                background: #4D90FE;
                border: 1px solid #4D90FE;
                color: #fff;
                border-right: 4px;
                cursor: pointer;
            }
            
            .push .push-msg {
                width: 100%;
                margin-top: 30px;
                padding-left: 20px;
            }
            
            .push .push-title {
                width: 77%;
                height: 40px;
                border-radius: 4px;
                border: 1px solid #ccc;
                display: inline-block;
                margin-left: 10px;
                font-size: 15px;
                padding-left: 10px;
            }
            
            .key-layer {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                position: fixed;
                top: 0;
                left: 0;
                z-index: 300;
                display: none;
            }
            
            .key-layer .layer-container {
                width: 545px;
                height: 535px;
                position: fixed;
                top: 13%;
                left: 40%;
                background: #fff;
            }
            
            .key-layer .layer-title {
                width: 100%;
                height: 40px;
                line-height: 40px;
                background: #F5F5F5;
                text-align: center;
            }
            
            .key-layer .layer-select {
                display: block;
                width: 85%;
                height: 35px;
                margin: 0 auto;
                margin-top: 30px;
            }
            
            .key-layer .layer-btn {
                width: 100px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                margin: 0 auto;
                margin-top: 30px;
                background: #4D90FE;
                border: 1px solid #4D90FE;
                color: #fff;
                border-right: 4px;
                cursor: pointer;
            }
            
            .editTitle,
            .editContent {
                padding-left: 42px;
                margin: 0 auto;
            }
            
            .editTitle input {
                width: 83%;
                height: 40px;
                margin: 20px 10px;
            }
            
            .editContent textarea {
                padding: 10px;
                font-size: 15px;
            }
            
            .editContent {
                margin-top: 10px;
            }
            
            .editTitle input {
                width: 81%;
                height: 40px;
                margin: 10px 10px 0 10px;
            }
            
            .editTag {
                padding-left: 42px;
            }
            
            .editTag .selectTag {
                display: inline-block;
                width: 81%;
                font-size: 13px;
                border: 1px solid rgb(235, 235, 235);
                margin: 10px 10px 0 10px;
                text-align: left;
                padding-left: 5px;
            }
            
            .editTag .selectTag .exist {
                display: inline-block;
            }
            
            .editTag .selectTag .exist .removeTag {
                margin-left: 5px;
                cursor: pointer;
            }
            
            .editTag .selectTag .exist .exist-name {
                display: inline-block;
                padding: 0 8px;
                height: 30px;
                line-height: 30px;
                background: #62a5d9;
                color: #fff;
                border-radius: 2px;
                margin-right: 3px;
            }
            
            .editTag .selectTag .tagName {
                color: #fff;
                background: #62a5d9;
                padding: 3px 5px;
            }
            
            .editTag input {
                /*width: 81%;*/
                height: 40px;
                border: none;
            }
            /*分平台推送*/
            
            .push-platform {
                width: 84%;
                margin: 0 auto;
                margin-top: 20px;
                text-align: left;
                color: #000;
            }
            
            .push-label {
                margin-left: 20px;
                margin-right: 7px;
            }
            
            .push-source {
                width: 16px;
                height: 16px;
                position: relative;
                top: 4px;
                cursor: pointer;
            }
            </style>
            <script>
            $(function() {


                $('.addTagInput').focus(function() {
                    console.log("===")
                    onEnter = function() {
                        var text = $('.addTagInput').val()
                        if (!text) {
                            return layer.msg('请输入标签')
                        }
                        if (text.length > 6) {
                            return layer.msg('最多输入6个字')
                        }
                        var length = $('.exist .exist-name').length;
                        if (length > 2) {
                            $('.addTagInput').val('')
                            return layer.msg('最多添加3个标签')
                        }
                        $('.exist').append('<span class="exist-name">' + text + '<i class="fa fa-times removeTag" aria-hidden="true"></i></span>')
                        $('.addTagInput').val('')
                    }
                }).blur(function() {
                    onEnter = null
                })

                //删除标签
                $('.exist').on('click', '.removeTag', function() {
                    $(this).parent('.exist-name').remove()
                })

                var key_layer = $('.key-layer');
                console.log('layer', key_layer)
                $('#contentTable').bootstrapTable({
                    method: 'POST',
                    height: tableHeight,
                    cache: false,
                    url: path + '/article/ReleasedList.do',
                    striped: true,
                    pagination: true,
                    singleSelect: true,
                    pageSize: 50,
                    pageList: [50, 100, 150, 200, 500],
                    contentType: "application/x-www-form-urlencoded",
                    sidePagination: "server", //服务端请求
                    search: false,
                    showRefresh: false,
                    minimumCountColumns: 2,
                    clickToSelect: true,
                    queryParams: function(params) {
                        params.queryName = $("#queryName").val();
                        params.startTime = $("#queryBeginTime").val();
                        params.endTime = $("#queryEndTime").val();
                        params.pageSize = params.limit;
                        params.currentPage = params.offset / params.limit + 1;
                        var queryTitle = $("#queryTitle").val();
                        params.title = queryTitle;
                        return params;
                    },
                    rowAttributes: function(row, index) {
                        row.customOrder = index + 1;
                        return row;
                    },
                    columns: [{
                        checkbox: true
                    }, {
                        field: 'title',
                        title: '标题'
                    }, {
                        field: 'createrName',
                        title: '创建人'
                    }, {
                        field: 'comment_count',
                        title: '评论数'
                    }, {
                        field: 'zan_count',
                        title: '点赞数'
                    }, {
                        field: 'releasedTime',
                        title: '发布时间'
                    }, {
                        field: 'show_type',
                        title: '是否精品',
                        formatter: function(rows, value) {

                            if (value.show_type == "0") {
                                return "非精品";
                            } else {
                                return "精品";
                            }
                        }
                    }, {
                        field: 'article_id',
                        title: '操作',
                        formatter: operatorFormatter
                    }]
                });

                $("#queryBeginTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD HH:mm"
                });
                $("#queryEndTime").datetimepicker({
                    locale: "zh-cn",
                    format: "YYYY-MM-DD HH:mm"
                });


                loadCountData();

                var onEnter = function() {
                    //回车事件
                }

                //回车添加标签
                document.onkeydown = function(e) {
                    if (e.keyCode == 13) {
                        if (typeof onEnter == "function") {
                            onEnter()
                        }
                    }
                }
            });





            function loadCountData() {
                $.get(path + "/article/countData.do", function(_backData) {
                    eval("var data = " + _backData);
                    $("#releasedArticleCount").val(data.releasedArticleCount);
                    $("#releasedArticleZanCount").val(data.releasedArticleZanCount);
                });
            }

            function operatorFormatter(value, row) {
                var detailHtml = "<a class='btn btn-warning btn-xs' href='${path}/html/articleDetail.htm?article_id=" + value + "#' target='_blank'><i class='fa fa-align-justify'></i> 详情 </a>";
                var deleteHtml = "&nbsp;<a class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteData(" + value + ");'><i class='fa fa-trash-o'></i> 删除 </a>";
                var updateHtml = "&nbsp;<a class='btn btn-info btn-xs' href='javascript:;' onclick='doOperate(" + value + ");'><i class='fa fa-align-justify'></i> 标记精品 </a>";
                var topHtml = "&nbsp;<a class='btn btn-primary btn-xs' href='javascript:;' onclick='toTop(" + value + ");'><i class='fa fa-align-justify'></i> 置顶 </a>";
                var postHtml = "&nbsp;<a class='btn btn-success btn-xs' href='javascript:;' onclick='post(" + value + ");'><i class='fa fa-align-justify'></i> 推送 </a>";
                return detailHtml + deleteHtml + updateHtml + topHtml + postHtml;
            }


            function reflushDataTable() {
                loadCountData();
                $('#contentTable').bootstrapTable('refresh', null);
            }


            function deleteData(_acticleId) {
                showConfirm('确认要删除吗？',
                    function() {
                        $.post(path + '/article/delete.do', {
                            articleId: _acticleId
                        }, function(_backData) {
                            if ("success" == _backData) {
                                showMsg('删除成功！');
                                reflushDataTable();
                            } else
                                showErr('删除失败！' + _backData);
                            reflushDataTable();
                        });
                    },
                    function() {});

            }

            function doOperate(_acticleId) {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                console.log('rowDatas[0].title', rowDatas[0]);
                showOkCancel('确认要标记为精品吗？',
                    function() {

                        $.post(path + '/article/update.do', {
                            operType: "yes",
                            ids: _acticleId.toString()
                        }, function(_backData) {
                            if ("success" == _backData) {
                                showMsg('标记成功！');
                                reflushDataTable();
                            } else
                                showErr('标记失败！' + _backData);
                        });
                    },
                    function() {
                        var _operateeArr = new Array();
                        for (var i = 0; i < rowDatas.length; i++) {
                            _operateeArr.push(rowDatas[i].id);
                        }
                        $.post(path + '/article/update.do', {
                            operType: "no",
                            ids: _acticleId.toString()
                        }, function(_backData) {
                            if ("success" == _backData) {
                                showMsg('标记成功！');
                                reflushDataTable();
                            } else
                                showErr('标记失败！' + _backData);
                        });
                    });
            }
            //置顶
            var articleid, title, image, content, keywords;

            function toTop(_acticleId) {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                console.log('rowDatas[0].title', rowDatas[0]);
                if (!rowDatas[0]) {
                    return showMsg('请选择一个项目');
                }
                articleid = _acticleId;
                image = rowDatas[0].image;
                $('.key-layer').show();
            };

            function closeKeyWords() {
                $('.key-layer').hide();
                $('.key-layer .layer-select').val('热点');
                $('.editContent textarea').val('')
                $('.editTitle input').val('')
            }
            //确定关键字
            function submit() {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                console.log('rowDatas[0].title', rowDatas[0]);
                content = $('.editContent textarea').val()
                title = $('.editTitle input').val()
                if (!title) {
                    return layer.msg('请输入标题')
                }
                if (!content) {
                    return layer.msg('请输入内容')
                }

                var str = ""
                $('.exist-name').each(function() {
                    str += $(this).text() + ','
                })
                str = str.replace(/,$/, '')
                console.log("=str==", str)
                if (!str) {
                    return layer.msg('请输入标签')
                        // keywords = key.val();
                }
                // keywords = $('.key-layer .layer-select').val();
                $.post(path + '/headlines/add.do', {
                    type: 3,
                    articleid: articleid,
                    title: title,
                    image: image,
                    content: content,
                    keywords: str
                }, function(_backData) {
                    if (_backData.status == '1') {
                        showMsg('已置顶');
                        reflushDataTable();
                        $('.key-layer').hide();
                        $('.editContent textarea').val('')
                        $('.editTitle input').val('')
                    }
                    if (_backData.status == '-1') {
                        showErr('置顶失败！' + _backData);
                    }
                }, 'json');
            };

            //推送
            var title_val, article_id;

            function post(_acticleId) {
                var rowDatas = $('#contentTable').bootstrapTable('getSelections', null);
                console.log('rowDatas[0]', rowDatas[0]);
                if (!rowDatas[0]) {
                    return showMsg('请选择一个项目');
                }
                $('.push').show();
                console.log('push', $('.push'));
                title_val = rowDatas[0].title
                article_id = rowDatas[0].article_id
                $('.push .push-title').val(title_val);
            };

            var source = ''
            function editTitle() {
                var val = $('.push .push-title').val();
                var source_radio = $('.push-source');
                if (!val) {
                    return layer.msg('请输入标题')
                }
                source_radio.map(function(e) {
                    if ($(this).is(':checked')) {
                        source = $(this).data('source')
                    }
                })
                if (typeof source == 'string' || typeof source == "undefined") {
                    return layer.msg('请选择推送平台')
                }
                $.post(path + '/message/publishMessage.do', {
                    messagetitle: val,
                    messagecontent: title_val,
                    messagetype: 6,
                    type: 3,
                    newsid: article_id,
                    source: source
                }, function(_backData) {
                    if (_backData == 'success') {
                        showMsg('已推送');
                        reflushDataTable();
                        $('.push').hide();
                        source = ''
                        source_radio.attr('checked',false)
                    } else {
                        showErr('推送失败！' + _backData);
                    }
                });

            }

            function pushClose() {
                $('.push').hide();
                source = ''
                $('.push-source').attr('checked',false)
                $('.push .push-title').val('')
            }

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
                        <label>标题：</label>
                        <input type="text" class="form-control" id="queryTitle" placeholder="输入标题进行搜索">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;">
                        <label>创建人：</label>
                        <input type="text" class="form-control" id="queryName" placeholder="输入姓名进行搜索">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;position: relative;">
                        <label for="search_name">开始时间</label>
                        <input type=text class="form-control" id="queryBeginTime">
                    </div>
                    <div class="form-group form-group-padding" style="padding-left: 5px;position: relative;">
                        <label for="search_name">结束时间</label>
                        <input type="text" class="form-control" id="queryEndTime">
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
                <table id="contentTable" data-toolbar="#custom-toolbar"></table>
            </div>
            <div class="key-layer" id="key-layer">
                <div class="layer-container">
                    <div class="layer-title">编辑<i class="fa fa-times close" onclick="closeKeyWords()" aria-hidden="true" style="font-size:20px;float:right;margin-right:10px;position:relative;top:9px;cursor:pointer;"></i></div>
                    <select name="" class="layer-select hide">
                        <option value="热点">热点</option>
                        <option value="利好消息">利好消息</option>
                        <option value="机会解读">机会解读</option>
                        <option value="风险提示">风险提示</option>
                        <option value="新股">新股</option>
                        <option value="重要公告">重要公告</option>
                        <option value="涨停分析">涨停分析</option>
                        <option value="投资要闻">投资要闻</option>
                        <option value="时评">时评</option>
                        <option value="投资专题">投资专题</option>
                        <option value="观点精选">观点精选</option>
                        <option value="早盘必读">早盘必读</option>
                        <option value="板块异动">板块异动</option>
                        <option value="投资日历">投资日历</option>
                        <option value="龙虎解读">龙虎解读</option>
                        <option value="牛股分析">牛股分析</option>
                        <option value="午评">午评</option>
                        <option value="收评">收评</option>
                        <option value="诊股精选">诊股精选</option>
                        <option value="投顾精选">投顾精选</option>
                        <option value="投资热点">投资热点</option>
                        <option value="涨停解读">涨停解读</option>
                        <option value="宏观要闻">宏观要闻</option>
                    </select>
                    <div class="editTitle">
                        <label for="">标题</label>
                        <input type="text">
                    </div>
                    <div class="editTag">
                        <label for="">标签</label>
                        <div class="selectTag">
                            <div class="exist">
                            </div>
                            <input type="text" placeholder="按回车键添加标签" class="addTagInput">
                        </div>
                    </div>
                    <div class="editContent">
                        <label style="display:inline-block;top:-255px;position: relative;">内容</label>
                        <textarea name="" id="" cols="55" rows="12" placeholder="请编辑内容"></textarea>
                    </div>
                    <div class="layer-btn" onclick='submit()'>确定</div>
                </div>
            </div>
            <!-- 推送弹框 -->
            <div class="push">
                <div class="layer-container">
                    <div class="layer-title">请编辑标题<i class="fa fa-times close" onclick="pushClose()" aria-hidden="true" style="font-size:20px;float:right;margin-right:10px;position:relative;top:9px;cursor:pointer;"></i></div>
                    <div class="push-msg"><span class="">标题</span>
                        <input class="push-title" type="text">
                    </div>
                    <div class="push-platform"><span>分平台推送</span>
                        <label for="" class="push-label">全部</label>
                        <input name="push-source" class="push-source" type="radio" data-source="0">
                        <label for="" class="push-label">ios</label>
                        <input name="push-source" class="push-source" type="radio" data-source="1">
                        <label for="" class="push-label">android</label>
                        <input name="push-source" class="push-source" type="radio" data-source="2">
                    </div>
                    <div class="push-btn" onclick="editTitle()">确认推送</div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
        var ue = UE.getEditor('contentEditor', {
            scaleEnabled: true
        });
        </script>
    </body>

    </html>
