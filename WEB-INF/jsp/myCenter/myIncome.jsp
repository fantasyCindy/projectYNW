<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
                <link rel="stylesheet" href="/private/myCenter/css/myIncome.css?0329">
                <script>
                ynIsLogin = ${sessionScope.login_user_front.user_id != null};
                if (!ynIsLogin) window.location.href = `/index.htm`;
                </script>

                <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                        <div id="customeStock" class="clear">
                            <div class="container">
                                <%@ include file="../backstage/_menu.jsp"%>
                                    <div class="right">
                                        <div id="myWallet">
                                            <!-- 菜单 -->
                                            <div class="wallet-menu">
                                                <table>
                                                    <tr>
                                                        <td data-type="record" class="wallet-menu-incom select">消费记录</td>
                                                        <!-- <td data-type="recharge" class="wallet-menu-recharge">充值记录</td> -->
                                                    </tr>
                                                </table>
                                            </div>
                                            <!-- /*//////////////////////////////// 消费记录 ///////////////////////////////////*/ -->
                                            <div id="record-consume" class="">
                                                <!-- 我的资产 -->
                                                <div class="wealth">
                                                    <div class="account">
                                                        <span class="txt">我的资产</span><span class="balance"></span>
                                                        <span class="txt consume">已消费</span><span class="totalPrice consume"></span>
                                                        <!-- <a href="/html/recharge.htm" class="recharge" target="_blank">充值</a> -->
                                                        <span class="txt">日期</span>
                                                        <input autocomplete="off" placeholder="选择月份" type="text">
                                                    </div>
                                                    <div class="info"></div>
                                                </div>
                                                <!-- 查询栏 -->
                                                <div class="filter">
                                                    <table>
                                                        <tr>
                                                            <td>日期
                                                                <input class="time_start" autocomplete="off" type="text">至
                                                                <input class="time_end" autocomplete="off" type="text">
                                                            </td>
                                                            <td>订单类型
                                                                <select class="type">
                                                                    <option value="">全部</option>
                                                                    <option value="1">打赏</option>
                                                                    <option value="2">送礼物</option>
                                                                    <option value="3">购买产品</option>
                                                                </select>
                                                            </td>
                                                            <td>订单状态
                                                                <select class="status">
                                                                    <option value="">全部</option>
                                                                    <option value="0">待支付</option>
                                                                    <option value="1">已完成</option>
                                                                    <option value="3">退款中</option>
                                                                    <option value="4">已退款</option>
                                                                    <option value="5">已关闭</option>
                                                                    <option value="6">服务中</option>
                                                                </select>
                                                            </td>
                                                            <td>订单来源
                                                                <select class="source">
                                                                    <option value="">全部</option>
                                                                    <option value="0">WEB</option>
                                                                    <option value="1">IOS</option>
                                                                    <option value="2">ANDROID</option>
                                                                    <option value="3">H5</option>
                                                                    <option value="4">后台</option>
                                                                </select>
                                                            </td>
                                                            <td>订单号:
                                                                <input class="orderNum" type="text" />
                                                                <button class="submit">查询</button>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <!-- 消费记录 -->
                                                <div class="trade-record">
                                                    <table class="trade-table">
                                                        <thead>
                                                            <tr>
                                                                 <script>
                                                                    if(ynIsTeacher){
                                                                        document.write('<td>用户名</td>')
                                                                    }else{
                                                                        document.write('<td>直播老师</td>')
                                                                    }
                                                                </script>
                                                                <td>消费类型</td>
                                                                <td>实付款</td>
                                                                <td>订单状态</td>
                                                                <td>订单号</td>
                                                                <td>订单来源</td>
                                                                <td>时间</td>
                                                                <td>操作</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="indent-list" class="trade-items"></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- /*//////////////////////////////// 充值记录 ///////////////////////////////////*/ -->
                                            <div id="record-recharge" class="hide">
                                                <table class="query">
                                                    <tbody>
                                                        <tr>
                                                            <td>日期
                                                                <input class="time_start" autocomplete="off" type="text">至
                                                                <input class="time_end" autocomplete="off" type="text">
                                                            </td>
                                                            <td>充值方式
                                                                <select class="type">
                                                                    <option value="">全部</option>
                                                                    <option value="1">支付宝</option>
                                                                    <option value="2">微信</option>
                                                                </select>
                                                            </td>
                                                            <td>充值状态
                                                                <select class="status">
                                                                    <option value="">全部</option>
                                                                    <option value="0">待支付</option>
                                                                    <option value="1">已完成</option>
                                                                    <option value="3">退款中</option>
                                                                    <option value="4">已退款</option>
                                                                    <option value="5">已关闭</option>
                                                                    <option value="6">服务中</option>
                                                                </select>
                                                            </td>
                                                            <td>流水号:
                                                                <input class="orderNum" type="text" />
                                                                <span class="query-btn">查询</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="items">
                                                    <table>
                                                        <thead>
                                                            <td>充值方式</td>
                                                            <td>充值金额</td>
                                                            <td>充值时间</td>
                                                            <td>充值状态</td>
                                                            <td>流水号</td>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- /*///////////////////////////////////////////////////////////////////*/ -->
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <!-- /*///////////////////////////////////////////////////////////////////*/ -->
                        <!-- 我的资产模板 -->
                        <script type="text/html" id="totalmoney-template">
                            <table width="100%">
                                <tr>
                                    <td class="left-td">
                                        <div class="item inline">
                                            <div class="subitem">
                                                <p class="data-title">内参{{moneystatus}}额</p>
                                                <p class="data-total">
                                                    <font color="#e20000" size="4">￥{{neican_price}}</font></p>
                                            </div>
                                        </div>
                                        <i class="line"></i>
                                        <div class="item inline">
                                            <!--  <div class="subitem">
                                            <p class="data-title">投资组合总{{moneystatus}}额</p>
                                            <p class="data-total">
                                                <font color="#e20000" size="4">{{zuhe_price}}</font>牛币</p>
                                        </div> -->
                                            <div class="subitem">
                                                <p class="data-title">打赏{{moneystatus}}额</p>
                                                <p class="data-total">
                                                    <font color="#e20000" size="4">￥{{dahsang_price}}</font></p>
                                            </div>
                                        </div>
                                        <i class="line"></i>
                                        <div class="item inline">
                                            <div class="subitem">
                                                <p class="data-title">礼物{{moneystatus}}额</p>
                                                <p class="data-total">
                                                    <font color="#e20000" size="4">￥{{liwu_price}}</font></p>
                                            </div>
                                            <!--  <div class="subitem">
                                            <p class="data-title">课程总{{moneystatus}}额</p>
                                            <p class="data-total">
                                                <font color="#e20000" size="4">{{kecheng_price}}</font>牛币</p>
                                        </div>
                                        <div class="subitem">
                                            <p class="data-title">合计总{{moneystatus}}额</p>
                                            <p class="data-total">
                                                <font color="#e20000" size="4">{{total_price}}</font>牛币</p>
                                        </div> -->
                                        </div>
                                    </td>
                                    <td style="width:300px;">
                                        <div id="myIcome-chart"></div>
                                    </td>
                                </tr>
                            </table>
                        </script>
                        <!-- /*///////////////////////////////////////////////////////////////////*/= -->
                        <!-- footer -->
                        <%@include file="../common/front-foot.jsp"%>
                            <script src="/public/source/yndata.min.js"></script>
                            <script src="/public/source/ynmodule.min.js"></script>
                            <script src="/public/js/highcharts.js"></script>
                            <script src="/public/bundle/myWallet.bundle.js?0104"></script>
                <script>
                    onSelect('我的')
                </script>
                </body>

    </html>
