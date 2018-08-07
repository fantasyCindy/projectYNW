<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>${head.refer.title}</title>
            <meta name="keywords" content="${head.refer.keywords}" />
            <meta name="description" content="${head.refer.description}" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/refer/css/refer.css?03291">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="refer">
                <div class="left">
                    <div class="filter-items">
                        <div class="status">
                            <span class="filter-item status-item select" data-status=''>全部</span>
                            <span class="filter-item status-item" data-status='1'>热卖中</span>
                            <span class="filter-item status-item" data-status="0">服务中</span>
                            <span class="filter-item status-item" data-status="2">已完成</span>
                        </div>
                        <div class="subItem">
                            <div class="price">
                                <span>订单价格：</span>
                                <span class="filter-item price-item select" data-min="" data-max="">全部</span>
                                <span class="filter-item price-item" data-min="1" data-max="500">1-500</span>
                                <span class="filter-item price-item" data-min="500" data-max="1000">500-1000</span>
                                <span class="filter-item price-item" data-min="1000" data-max="3000">1000-3000</span>
                            </div>
                            <div class="time hide">
                                <span>时间期限：</span>
                                <span class="filter-item time-item select" data-time=''>全部</span>
                                <span class="filter-item time-item" data-time='7'>7日</span>
                                <span class="filter-item time-item" data-time='30'>1个月</span>
                                <span class="filter-item time-item" data-time='60'>2个月</span>
                            </div>
                        </div>
                    </div>
                    <div id="refer-list">
                        <div class="refer-items"></div>
                    </div>
                </div>
                <div class="right fr hide">
                    <div class="refer-best b220 wrap">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">内参牛人</span>
                        </div>
                        <div class="items"></div>
                    </div>
                    <div class="refer-lastest b220 wrap">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">最新内参</span>
                        </div>
                        <div class="items">
                        </div>
                    </div>
                    <div class="refer-hot b220 wrap">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">热门内参</span>
                        </div>
                        <div class="items">
                        </div>
                    </div>
                    <div class="refer-talkest b220 wrap">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">互动最多</span>
                        </div>
                        <div class="items">
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <%@ include file="../common/moudule-judgePay.jsp" %>
                    <script type="text/javascript" src="/public/bundle/refer.bundle.js?0730"></script>
    </body>

    </html>
