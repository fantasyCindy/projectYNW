<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
                <link rel="stylesheet" href="/private/myCenter/css/myCenter.css?0329">

                <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                        <div id="customeStock" class="clear">
                            <div class="container">
                                <%@ include file="../backstage/_menu.jsp" %>
                                    <!-- /*========================  right  ==========================*/ -->
                                    <div class="right">
                                        <div id="contentWrap">
                                            <div id="mySelectStock">
                                                <div class="title">我的自选股</div>
                                                <div class="totalStock"></div>
                                                <!-- 跑马灯 -->
                                                <div id="marquee"></div>
                                                <div class="searchBar">
                                                    <input type="text" id="showStockList" data-provide="typeahead" autocomplete="off" placeholder="股票代码/简称/拼音">
                                                    <!-- <span id="add_stock" class="button">添加</span> -->
                                                    <span id="remove_stock" class="button">删除</span>
                                                </div>
                                                <div class="content">
                                                    <table id="table-stock-list">
                                                        <thead>
                                                            <tr class="theader">
                                                                <td class="radio">
                                                                    <input type="checkbox" id="select-all">
                                                                </td>
                                                                <td>代码</td>
                                                                <td>名称</td>
                                                                <td>最新价</td>
                                                                <td>涨跌额</td>
                                                                <td>涨跌幅</td>
                                                                <td>昨收</td>
                                                                <td>今开</td>
                                                                <td>最高</td>
                                                                <td>最低</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="stock-body"></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <!--  -->
                        <div id="klineImg">
                            <div class="imgw"><img id="klinePhoto"></div>
                        </div>
                        <!-- footer -->
                        <%@include file="../common/front-foot.jsp" %>
                            <script src="/public/bundle/myCenter.bundle.js?0127"></script>
                <script>
                    onSelect('我的')
                </script>
                </body>

    </html>
