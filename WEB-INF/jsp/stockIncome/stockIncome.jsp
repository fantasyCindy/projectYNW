<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title></title>
        <%@ include file="../common/all.jspf" %>
            <%@ include file="data.jsp" %>
                <link rel="stylesheet" href="/private/stockIncome/css/stockIncome.css" />
    </head>

    <body>
        <%@ include file="../common/head.jsp" %>
            <!-- /////////////////////////////////////// 内容 //////////////////////////////////////// -->
            <div id="stockIncome">
                <div class="contentWrap">
                    <div class="frame person" id="teacherInfo">
                        <div class="user_left">
                            <script id="person-template" type="text/html">
                                <div class="avatar">
                                    <img src="{{photo}}">
                                </div>
                                <div class="info">
                                    <div class="title" id="{{teacherid}}">{{title}}</div>
                                    <div class="name">{{title}}</div>
                                    <div class="content">{{description}}</div>
                                </div>
                            </script>
                        </div>
                        <div class="user_right">
                            <div class="chart chartA">
                                <div id="totalRateChart"></div>
                                <div class="info">
                                    <div id="totalrate" class="percentage"></div>
                                    <div class="label">总收益率</div>
                                </div>
                                <div class="data">
                                    <table>
                                        <tr>
                                            <td class="feed" colspan="3">
                                                <span class="ynbtn bgred">
                                            <c:if test="${attention != true }">订阅跟踪</c:if><c:if test="${attention == true }">已订阅</c:if></span> 已有
                                                <span id="feedCount">${teacherFans }</span>人订阅</td>
                                        </tr>
                                        <tr class="title">
                                            <td class="key borderOne">账户总资产</td>
                                            <td class="key  borderOne">交易次数</td>
                                            <td class="key borderOne">胜率</td>
                                        </tr>
                                        <tr class="value">
                                            <td id="totalcapital" class="number borderOne">---</td>
                                            <td id="conunt" class="number  borderOne">---</td>
                                            <td id="shengl" class="number borderOne">---</td>
                                        </tr>
                                        <tr class="title">
                                            <td class="borderOne"><span>周收益</span></td>
                                            <td class="borderOne"><span>月收益</span></td>
                                            <td class="borderOne"><span>排行</span></td>
                                        </tr>
                                        <tr>
                                            <td id="weekrate" class="borderOne"></td>
                                            <td id="mothrate" class="borderOne"></td>
                                            <td id="total1" class="borderOne"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charts">
                        <div class="chart chartOne frame" id="sh300">
                            <div id="sh300Chart"></div>
                        </div>
                        <div class="chart chartTwo frame" id="monthIncom">
                            <div id="monthIncomChart"></div>
                        </div>
                    </div>
                    <!-- 持仓明细 -->
                    <div class="frame" id="hold">
                        <div class="title">持仓明细</div>
                        <div class="items">
                            <div class="items"></div>
                        </div>
                    </div>
                    <!-- 交易记录 -->
                    <div class="frame" id="history">
                        <div class="title">交易记录</div>
                        <div class="items">
                            <div class="items"></div>
                        </div>
                    </div>
                </div>
            </div>
            <%@ include file="../common/foot.jsp" %>
                <!-- ////////////////////////////////////////////////////////////////////////////////////// -->
                <!-- 持仓明细 -->
                <script id="hold-template" type="text/html">
                    <table>
                        <tr class="title">
                            <td>序号</td>
                            <td>股票代码</td>
                            <td>名称</td>
                            <td>今日涨跌</td>
                            <td>盈亏额</td>
                            <td>盈亏率</td>
                            <td>持仓数量</td>
                            <td>成本</td>
                            <td>现价</td>
                        </tr>
                        {{each}}
                        <tr class="item" id="holdItem-{{$value.stockcode}}">
                            <td class="index">{{$value.index}}</td>
                            <td class="hold_stockcode">{{$value.stockcode}}</td>
                            <td class="stockname">{{$value.stockname}}</td>
                            <td class="todaychange">{{$value.todaychange}}</td>
                            <td class="mountPandL">{{#$value.mountPandL}}</td>
                            <td class="mountrate">{{#$value.mountrate}}</td>
                            <td class="holdingsNumber">{{$value.holdingsNumber}}</td>
                            <td class="cost">{{$value.cost}}</td>
                            <td class="currentPrice"></td>
                        </tr>
                        {{/each}}
                    </table>
                </script>
                <!-- 交易记录 -->
                <script id="history-template" type="text/html">
                    <table>
                        <tr class="title">
                            <td>交易时间</td>
                            <td>股票代码</td>
                            <td>名称</td>
                            <td>成交价格</td>
                            <td>盈亏额(元)</td>
                            <td>盈亏率</td>
                            <td>成交数量</td>
                            <td>成交金额</td>
                            <td>交易方向</td>
                        </tr>
                        {{each}}
                        <tr class="item">
                            <td>{{$value.createtime}}</td>
                            <td>{{$value.stockcode}}</td>
                            <td>{{$value.stockname}}</td>
                            <td>{{$value.dealprice}}</td>
                            <td>---</td>
                            <td>---</td>
                            <td>{{$value.dealnumber}}</td>
                            <td>{{$value.dealMoney}}</td>
                            <td>{{$value.actionType}}</td>
                        </tr>
                        {{/each}}
                    </table>
                </script>
                <script src="/public/js/highstock.js"></script>
                <script src="/private/stockIncome/js/stockIncome.js"></script>
    </body>

    </html>
