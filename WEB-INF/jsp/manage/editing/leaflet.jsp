<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>

    <head>
        <meta charset="UTF-8">
        <script>
        var href = window.location.href;
        if (/#/.test(href)) {
            window.location.href = href.match(/^[^#]+/)[0]
        }
        </script>
        <title>后台-落地页管理</title>
        <%@ include file="../../common/vue.jsp" %>
            <link rel="stylesheet" href="/public/manage/manage-leaflet.css">
            <script>
            var path = parent.path;
            var store = {
                url: '/public/manage/leaflet-thumb/',
                edit: null
            }
            </script>
    </head>

    <body>
        <div id="app">
            <router-view></router-view>
        </div>
        <script src="/public/manage/manage-leaflet.bundle.js"></script>
    </body>

    </html>
