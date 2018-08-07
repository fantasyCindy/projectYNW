<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约投顾 | 我的组合</title>
        <%@ include file="../common/front-common.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css">
            <link rel="stylesheet" href="/public/css/myComposite.css">
            <link rel="stylesheet" href="/public/css/composite.css">
    </head>

    <body>
        <%@ include file="../common/front-head.jsp" %>
            <div id="customeStock" class="clear">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <div class="right shadow">
                            <div id="contentWrap">
                                <div class="yn-title-1 simple">
                                    <span class="icon"></span>
                                    <span class="name">我的组合</span>
                                </div>
                                <!-- 老师端 -->
                                <div id="teacherComposite" class="hide">
                                    <a class="action create" href="${path}/html/compositeCreate.htm" target="_blank">发售新的组合</a>
                                    <div class="switch">
                                        <table>
                                            <tr>
                                                <td data-value="1" class="item select">运行中</td>
                                                <td data-value="0" class="item">预售中</td>
                                                <td data-value="2" class="item">已完成</td>
                                                <td data-value="0" class="verify">审核</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="list"></div>
                                    <div class="page"></div>
                                </div>
                                <!-- 用户端 -->
                                <div id="userComposite" class="hide">
                                    <div class="switch">
                                        <table>
                                            <tr>
                                                <td data-value="1" class="item select">运行中</td>
                                                <td data-value="0" class="item">预售中</td>
                                                <td data-value="2" class="item">已完成</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- 组合列表 -->
                                    <div class="composite-items">
                                        <div class="items"></div>
                                    </div>
                                    <div class="page"></div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            
            <script type="text/html" id="teacherComposite-template">
                <table>
                    <tr>
                        <th>组合名称</th>
                        <th>投资风格</th>
                        <th>当前收益</th>
                        <th>最长期限</th>
                        <th>订阅价</th>
                        <th>{{#_menu_state}}</th>
                        <th>操作</th>
                    </tr>
                    {{each rows}}
                    <tr>
                        <td class="name">{{$value._name}}</td>
                        <td class="style">{{$value._style}}</td>
                        <td class="income">{{$value._income}}%</td>
                        <td class="max">{{$value.combination_maxterm}}天</td>
                        <td class="feed">￥{{$value.order_price}}</td>
                        <td class="state">{{$value._state}}</td>
                        <td class="look">{{#$value._linkHtml}}</td>
                    </tr>
                    {{/each}}
                </table>
            </script>

            <!--TEMPLATE -->
            
            <script type="text/html" id="approve-template">
                <table>
                    <tr>
                        <th>组合名称</th>
                        <th>投资风格</th>
                        <th>当前收益</th>
                        <th>最长期限</th>
                        <th>订阅价</th>
                        <th>
                            <select id="menu-state">
                                <option value="0">待审核</option>
                                <option value="2">被驳回</option>
                            </select>
                        </th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td colspan="7" style="padding:50px 0;">暂无记录</td>
                    </tr>
                </table>
            </script>
            <%@ include file="../common/front-foot.jsp" %>
            <%@  include file="../modules/composite-item.jsp" %>
            <script src="/public/source/yndata.min.js"></script>
            <script src="/public/source/ynmodule.min.js"></script>
            <script src="/public/bundle/myComposite.bundle.js"></script>
    </body>

    </html>
