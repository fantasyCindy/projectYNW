<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约投顾 | 我的视频</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
            <link rel="stylesheet" href="/private/backstage/css/myVideo.css">
            <link rel="stylesheet" href="/public/css/cropper.min.css">
            
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock" class="clear">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <!-- /*========================  right  ==========================*/ -->
                        <!-- /*======================== Begin   ==========================*/ -->
                        <div class="right shadow">
                            <div id="contentWrap">
                                <div id="myVideo">
                                    <div id="videolist" class="">
                                        <div class="top">
                                            <span class="title">我的视频</span>
                                            <span id="ReleaseVideo" class="ynbutton ynbutton-red">发布视频</span>
                                        </div>
                                        <table class="video_tag">
                                            <tbody>
                                                <tr>
                                                    <td class="menu-item action select" >已发布视频</td>
                                                    <td class="menu-item action">草稿箱</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!-- 列表 -->
                                        <div class="contentWrap" id="myVideo-list"></div>
                                    </div>
                                    <!-- 发布视频 -->
                                    <div id="postVideo" class="hide">
                                        <div class="title-1">发布视频</div>
                                        <div class="split"></div>
                                        <form method="post" action="" id="videoForm">
                                            <input type="text" id="video_id" style="display:none;">
                                            <div class="form-group">
                                                <label for="titeInput">视频标题</label>
                                                <input type="text" class="form-control" name="title" id="titleInput" placeholder="请输入标题" size="50" title="请输入标题！" style="width:482px;">
                                            </div>
                                            <div class="form-group">
                                                <label for="video_typeSelect">视频类型</label>
                                                <select class="form-control" id="video_typeSelect" name="video_type" style="width:212px;">
                                                    <option value="-1">--无--</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="video_srcInput">视频地址</label>
                                                <input type="text" class="form-control" name="video_src" id="video_srcInput" style="width:700px;">
                                            </div>
                                            <div class="form-group">
                                                <label for="album_idSelect">所属专辑</label>
                                                <select class="form-control" id="album_idSelect" name="album_id">
                                                    <option value="-1">--无--</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="album_course_sortInput">专辑课程排序</label>
                                                <input type="number" class="form-control" name="album_course_sort" id="album_course_sortInput" placeholder="专辑课程排序">
                                            </div>
                                            <div class="form-group" style="display: block">
                                                <label for="nameInput">视频封面</label>
                                                <span class="ynbtn uploadBtn cursor">上传图片</span>
                                                <div class="cover">
                                                    <img src="" id="videoCover" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div id="messageContainerWrap" class="qwindow talkWindow-left-child">
                                                    <div class="wrap">
                                                        <div class="title"></div>
                                                        <form id="formId">
                                                            <input type="hidden" id="_periodicalid" />
                                                            <script id="ueditContainer" name="content" type="text/plain"></script>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group actions">
                                                <a id="save_publish" class="ynbutton ynbutton-success">发布视频</a>
                                                <a id="save_draft" class="ynbutton ynbutton-success">保存草稿</a>
                                                <a id="close" class="ynbutton ynbutton-success">关闭</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /*========================  END  ==========================*/ -->
                </div>
            </div>
            </div>
            </div>
            <!-- 在线编辑器BEGIN -->
            <div id="ynEditer">
                <div class="overlay"></div>
                <div id="ynEditWrap">
                    <div class="title">解答问股</div>
                    <div class="wrap">
                        <script id="ynEditModel" name="content" type="text/plain"></script>
                        <div class="info">
                            <input type="text" data-provide="typeahead" id="ynEditStockCode" placeholder="插入股票代码/拼音" />
                            <div class="submit ynbutton ynbutton-red">发表</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 在线编辑器END -->
            <%@ include file="_footPlus.jsp" %>
                <!-- ===模板=== -->
                <!-- 已发布 -->
                <script type="text/html" id="myVideo-template">
                    <table>
                        <tbody>
                            <tr class="head">
                                <td>标题</td>
                                <td>评论</td>
                                <td>点赞</td>
                                <td>操作</td>
                            </tr>
                            {{each}}
                            <tr id="{{$value.video_id}}">
                                <td class="name">
                                    <p class="title">{{$value.title}}</p>
                                    <p class="type">
                                        <span class="label">时间：</span><span>{{$value.create_time}}</span>
                                        <span class="label">专辑：</span><span>{{$value.albumTitle}}</span>
                                    </p>
                                    <p class="type"><span class="label">类型：</span>{{$value.typeName}}</p>
                                </td>
                                <td>{{$value.comment_count}}</td>
                                <td>{{$value.zan_count}}</td>
                                <td class="btns">
                                    <a href="${video_path}video/{{$value.video_id}}.htm" target="_blank">观看</a>
                                    <a data-id="{{$value.video_id}}" class="action-edit">编辑</a>
                                    <a data-id="{{$value.video_id}}" class="action-delete">删除</a>
                                </td>
                            </tr>
                            {{/each}}
                        </tbody>
                    </table>
                </script>
                <!-- 草稿 -->
                <script type="text/html" id="myVideo-draft-template">
                    <table>
                        <tbody>
                            <tr class="head">
                                <td>标题</td>
                                <td>操作</td>
                            </tr>
                            {{each}}
                            <tr id="{{$value.video_id}}">
                                <td class="name">
                                    <p class="title">{{$value.title}}</p>
                                    <p class="type">
                                        <span class="label">时间：</span><span>{{$value.create_time}}</span>
                                        <span class="label">专辑：</span><span>{{$value.albumTitle}}</span>
                                    </p>
                                    <p class="type"><span class="label">类型：</span>{{$value.typeName}}</p>
                                </td>
                                <td class="btns">
                                    <a data-id="{{$value.video_id}}" class="action-edit">编辑</a>
                                    <a data-id="{{$value.video_id}}" class="action-delete">删除</a>
                                </td>
                            </tr>
                            {{/each}}
                        </tbody>
                    </table>
                </script>
                <script src="/public/source/yndata.min.js"></script>
                <script src="/public/js/cropper.min.js"></script>
                <script src="/public/bundle/myVideo.bundle.js"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
