<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>${head.video.title}</title>
            <meta name="keywords" content="${head.video.keywords}" />
            <meta name="description" content="${head.video.description}" />
            <%@ include file="/WEB-INF/jsp/common/front-common.jspf" %>
            <link href="/private/video/css/video.css" rel="stylesheet" />
            
    </head>
    <%@include file="../common/front-head.jsp" %>
        <!--页面主体-->
        <div id="video">
            <div class="title-1">
                <div class="inline value">
                    <span>全部课程</span>
                    (<span class="total-count"></span>)
                </div>
            </div>
            <!-- 分类 -->
            <div class="category">
                <div class="sort">
                    <span>形式：</span>
                    <span class="sort-item select" data-filter="album=">课程</span>
                    <span class="sort-item" data-filter="album=1">专辑</a>
                </div>
                <div class="sort" id="videoType">
                    <span>分类：</span>
                    <span class="select sort-item" id="allType" data-filter="type=">全部</span>
                </div>
                <div class="sort">
                    <span>排序：</span>
                    <span class="select sort-item" data-filter="time=1@look=">最新发布</span>
                    <span class="sort-item" data-filter="look=1@time=">最多观看</span>
                </div>
            </div>
            <!-- 列表 -->
            <div class="list"></div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////// -->
        <!-- TEMPLATE -->
        <%@include file="../common/front-foot.jsp" %>
            <script src="/public/bundle/video.bundle.js"></script>
            </body>

    </html>
