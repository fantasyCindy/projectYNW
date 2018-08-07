<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
pageContext.setAttribute("path", path);

%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <title>约投顾，跟专业投顾一起炒股</title>
            <meta charset="utf-8">
        <link rel="stylesheet" href="${path}/public/module/layui-master/dist/css/layui.css?t=1505289970141" media="all">
            <link rel="stylesheet" href="${path}/public/manage/activityManage/activityManage.css">
    </head>

    <body>
    <div class="activity-manage">
        <h1>活动管理</h1>
        <div class="createBtn">创建活动</div>
        <table>
            <thead>
            <tr>
                    <td class="activeName">活动名称</td>
                    <td>活动开始时间</td>
                    <td>活动结束时间</td>
                    <td>是否开启</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody class="table-wrap">
            
            </tbody>
        </table>
        <div id="page"></div>
        <div class="createWin">
            <div class="createWinContent">
                <div class="createTitle">创建活动</div>
                <div class="createContent">
                <div class="createName createTag"><label for="">活动名称</label><input type="text" class="layui-input"></div>
                <div class="createTime createTag"><label for="">活动时间</label><input type="text" class="layui-input" id="dateTime"></div>
                <div class="isCreate createTag"><label for="">是否开启</label>
                    <select name="" id="">
                        <option value="">请选择</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </div>
                <div class="create-bottom">
                    <span class="createbtn btn-submit">确定</span>
                    <span class="createbtn btn-cancel">取消</span>
                </div>
                </div>
            </div>
        
        </div>
    </div>
   
<script>
  var __path = '${path}'
</script>




        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.core.js"></script>
        <script src="${path}/public/module/layui-master/dist/layui.js?t=1505289970141"></script>
                <script src="${path}/public/manage/activityManage/activityManage.bundle.js"></script>
    </body>

    </html>
