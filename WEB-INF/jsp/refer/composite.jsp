<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE>
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/all.min_tdk.jspf" %>
        <title>${head.combination.title}</title>
		<meta name="keywords" content="${head.combination.keywords}"/>
		<meta name="description" content="${head.combination.description}"/>
        <link href="/public/css/composite.css" rel="stylesheet">
    </head>

    <body>
        <!-- 引入头部 -->
        <%@ include file="../common/head.jsp" %>
            <div id="composite">
                <div class="yn-left">
                    <!-- 过滤 -->
                    <div class="filter frame">
                        <div class="state">
                            <span class="item select" data-value="0">预售中</span>
                            <span class="item" data-value="1">运行中</span>
                            <span class="item" data-value="2">已完成</span>
                        </div>
                        <div class="items">
                            <div class="item goal">
                                <span class="txt">目标收益：</span>
                                <span class="value select all" data-value="-1">全部</span>
                                <span class="value" data-value="0--10">10%以下</span>
                                <span class="value" data-value="10--20">10-20%</span>
                                <span class="value" data-value="20--30">20-30%</span>
                                <span class="value" data-value="30--100">30%以上</span>
                            </div>
                            <div class="item price">
                                <span class="txt">订阅价格：</span>
                                <span class="value select all" data-value="-1">全部</span>
                                <span class="value" data-value="0--0">免费</span>
                                <span class="value" data-value="0--500">500牛币以下</span>
                                <span class="value" data-value="500--1000">500-1000牛币</span>
                                <span class="value" data-value="1000--2000">1000-2000牛币</span>
                                <span class="value" data-value="2000--10000">2000牛币以上</span>
                            </div>
                            <div class="item time">
                                <span class="txt">最长期限：</span>
                                <span class="value select all" data-value="-1">全部</span>
                                <span class="value" data-value="30">1个月</span>
                                <span class="value" data-value="60">2个月</span>
                                <span class="value" data-value="90">3个月</span>
                                <span class="value" data-value="180">6个月</span>
                            </div>
                            <div class="item style">
                                <span class="txt">操作风格：</span>
                                <span class="value select all" data-value="-1">全部</span>
                                <span class="value" data-value="0">保守型</span>
                                <span class="value" data-value="1">稳健性</span>
                                <span class="value" data-value="2">激进型</span>
                            </div>
                        </div>
                    </div>
                    <!-- 排序 -->
                    <div class="sort frame hide">
                        <div class="item select inline">
                            <span class="txt">热门订阅</span>
                            <i class="fa fa-long-arrow-down hide"></i>
                        </div>
                        <div class="item inline">
                            <span class="txt">目标收益</span>
                            <i class="fa fa-long-arrow-down hide"></i>
                        </div>
                        <div class="item inline">
                            <span class="txt">价格</span>
                            <i class="fa fa-long-arrow-down hide"></i>
                        </div>
                        <div class="item inline">
                            <span class="txt">即将开始</span>
                            <i class="fa fa-long-arrow-down hide"></i>
                        </div>
                        <div class="item inline">
                            <span class="txt">平均月收益</span>
                            <i class="fa fa-long-arrow-down hide"></i>
                        </div>
                    </div>
                    <!-- 组合列表 -->
                    <div class="composite-items frame">
                        <div class="items"></div>
                    </div>
                </div>
                <!-- right -->
                <div class="yn-right">
                    <div class="composite-banner">
                        <img src="/public/banner/composite_banner.png" />
                    </div>
                    <!-- tip -->
                    <%@  include file="../modules/composite-tip.jsp" %>
                </div>
            </div>
            <div class="clear" style="clear:both;"></div>
            <script src="/public/bundle/composite.bundle.js"></script>
            <!-- /////////////////////////////////////////////////////////////////// -->
            <%@  include file="../modules/composite-item.jsp" %>
                <%@ include file="../common/foot.jsp" %>
    </body>

    </html>
