<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/all.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css">
            <link rel="stylesheet" href="/private/backstage/css/myStock.css">
    </head>

    <body>
        <%@ include file="../common/head.jsp" %>
            <div id="customeStock">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <div class="right shadow">
                            <div id="contentWrap">
                                <!-- begin -->
                                <div id="simulateStock">
                                    <div class="wrap">
                                        <div id="account" class="frame"></div>
                                        <div id="income" class="frame"></div>
                                        <div id="simulate" class="frame">
                                            <h1>我的模拟交易</h1>
                                            <!-- title -->
                                            <div class="titles">
                                                <button id="t1" data-show="hold" class="select">持仓</button>
                                                <button id="t2" data-show="buy">买入</button>
                                                <button id="t3" data-show="sell">卖出</button>
                                                <button id="t4" data-show="revoke">撤单</button>
                                                <button id="t5" data-show="record">历史交易</button>
                                            </div>
                                            <!-- contents -->
                                            <div class="contents">
                                                <!-- 持仓明细 -->
                                                <div id="c1" class="content select"></div>
                                                <!-- 买入 -->
                                                <div id="c2" class="content">
                                                    <div id="buy">
                                                        <table>
                                                            <tr>
                                                                <td>股票代码</td>
                                                                <td class="al">
                                                                    <input type="text" id="buyStockCode" autocomplete="off">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>买入价格</td>
                                                                <td class="al">
                                                                    <input id="buy-price" type="text" placeholder="单位:元">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>买入价格</td>
                                                                <td>
                                                                    <div class="between" style="text-align: center;">
                                                                        <span id="buy-between-left" class="left needClear"></span>元
                                                                        <span>~</span>
                                                                        <span id="buy-between-right" class="right needClear"></span>元
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>可用现金</td>
                                                                <td>
                                                                    <span class="canUse"></span>元最多可买<span class="canBuy buyandsell needClear"></span>股
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>买入股数</td>
                                                                <td class="al">
                                                                    <input id="buy_entrustnumber" type="text">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" id="getCanBuy">取可买股数的
                                                                    <span class="ratio" data-value="0.5">1/2</span>
                                                                    <span class="ratio" data-value="0.33">1/3</span>
                                                                    <span class="ratio" data-value="0.25">1/4</span>
                                                                    <span class="ratio" data-value="0.2">1/5</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <div id="buyButton" class="ynbtn ynred">买入</div>
                                                                    <div id="buyResetButton" class="ynbtn ynred">重置</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!-- 卖出 -->
                                                <div id="c3" class="content">
                                                    <div id="sell">
                                                        <table>
                                                            <tr>
                                                                <td>股票代码</td>
                                                                <td>
                                                                    <select name="" id="stock_hold"></select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>委托价格</td>
                                                                <td>
                                                                    <input type="text" id="sellPrice" placeholder="单位:元">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>卖出价格</td>
                                                                <td>
                                                                    <div class="between" style="text-align: center;">
                                                                        <span id="sell-between-left" class="left needClear"></span>元
                                                                        <span>~</span>
                                                                        <span id="sell-between-right" class="right needClear"></span>元
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>最多卖出</td>
                                                                <td>
                                                                    最多可卖<span id="canSell" class="buyandsell needClear" style="font-weight: bold"></span>股
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>卖出股数</td>
                                                                <td>
                                                                    <input id="entrustnumber" type="text">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2" id="getCanSell">取可卖股数的
                                                                    <span class="ratio" data-value="0.5">1/2</span>
                                                                    <span class="ratio" data-value="0.33">1/3</span>
                                                                    <span class="ratio" data-value="0.25">1/4</span>
                                                                    <span class="ratio" data-value="0.2">1/5</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <div id="sellButton" class="ynbtn ynred">卖出</div>
                                                                    <div id="sellResetButton" class="ynbtn ynred">重置</div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                                <!-- 撤单 -->
                                                <div id="c4" class="content"></div>
                                                <!-- 历史交易 -->
                                                <div id="c5" class="content">
                                                    <div class="items"></div>
                                                </div>
                                            </div>
                                            <div id="realtime" style="display: none"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end -->
                            </div>
                        </div>
                </div>
            </div>
            <%@ include file="_footPlus.jsp" %>
                <!-- 账户信息 -->
                <script id="account-template" type="text/html">
                    <table>
                        <tr>
                            <td colspan="2" class="title1">
                                <h1>账户信息</h1></td>
                        </tr>
                        <tr class="tdheaders">
                            <td>总资产</td>
                            <td>股票市值</td>
                            <td>浮动盈亏</td>
                            <td>可用资金</td>
                            <td>冻结资金</td>
                            <td>初始资金</td>
                        </tr>
                        <tr>
                            <td id="totalcapital">{{#totalcapital}}</td>
                            <td id="stockmarket_value">{{#stockmarket_value}}</td>
                            <td id="floatPandL">{{#floatPandL}}</td>
                            <td id="availablefunds">{{#availablefunds}}</td>
                            <td id="freezingfunds">{{#freezingfunds}}</td>
                            <td>100万</td>
                        </tr>
                    </table>
                </script>
                <!-- 收益 -->
                <script id="income-template" type="text/html">
                    <table>
                        <td colspan="5" class="title1">
                            <h1>收益信息</h1></td>
                        <tr class="tdheaders">
                            <td>周期</td>
                            <td>总收益率</td>
                            <td>月收益率</td>
                            <td>周收益率</td>
                            <td>日收益率</td>
                        </tr>
                        <tr>
                            <td>排行</td>
                            <td>{{total1}}</td>
                            <td>{{total2}}</td>
                            <td>{{total3}}</td>
                            <td>{{total4}}</td>
                        </tr>
                        <tr>
                            <td>收益</td>
                            <td>{{#totalrate}}</td>
                            <td>{{#mothrate}}</td>
                            <td>{{#weekrate}}</td>
                            <td>{{#dayrate}}</td>
                        </tr>
                    </table>
                </script>
                <!-- 持仓 -->
                <script id="c1-template" type="text/html">
                    <table>
                        <tr class="tdheaders">
                            <td>股票代码</td>
                            <td>名称</td>
                            <td>今日涨跌</td>
                            <td>盈亏额</td>
                            <td>盈亏率</td>
                            <td>持仓</td>
                            <td>成本</td>
                            <td>现价</td>
                            <td>操作</td>
                        </tr>
                        {{each}}
                        <tr id="{{$value.stockcode}}" class="item">
                            <td class="stockcode">{{$value.stockcode}}</td>
                            <td class="stockname">{{$value.stockname}}</td>
                            <td class="todayUp"></td>
                            <td class="mountPandL">{{#$value.mountPandL}}</td>
                            <td class="mountrate">{{#$value.mountrate}}</td>
                            <td class="holdingsNumber">{{$value.holdingsNumber}}</td>
                            <td class="cost">{{$value.cost}}</td>
                            <td class="currentPrice"></td>
                            <td>
                                <span class="ynbtn buy">买入</span>
                                <span class="ynbtn sell">卖出</span>
                            </td>
                        </tr>
                        {{/each}}
                    </table>
                </script>
                <!-- 撤单 -->
                <script id="c4-template" type="text/html">
                    <table>
                        <tr class="tdheaders">
                            <td>订单号</td>
                            <td>股票名称</td>
                            <td>交易类型</td>
                            <td>价格</td>
                            <td>数量</td>
                            <td>挂单时间</td>
                            <td>操作</td>
                        </tr>
                        {{each}}
                        <tr data-id="{{$value.id}}" data-code="{{$value.stockcode}}">
                            <td>{{$value.billno}}</td>
                            <td>{{$value.stockname}}</td>
                            <td>{{$value.dealtype}}</td>
                            <td>{{$value.price}}</td>
                            <td>{{$value.entrustnumber}}</td>
                            <td>{{$value.createtime}}</td>
                            <td><span id="backoutButton" class="ynbtn">撤销</span></td>
                        </tr>
                        {{/each}}
                    </table>
                </script>
                <!-- 历史交易 -->
                <script id="c5-template" type="text/html">
                    <table>
                        <tr class="tdheaders">
                            <td>
                                <p>股票名称</p>
                                <p>股票代码</p>
                            </td>
                            <td>
                                <p>委托时间</p>
                                <p>成交时间</p>
                            </td>
                            <td>
                                <p>委托价格</p>
                                <p>成交价格</p>
                            </td>
                            <td>
                                <p>交易数量</p>
                                <p>交易金额</p>
                            </td>
                            <td>
                                <p>操作类型</p>
                            </td>
                            <td>
                                <p>印花税</p>
                                <p>手续费</p>
                            </td>
                            <td>过户费</td>
                        </tr>
                        {{each}}
                        <tr>
                            <td>
                                <p>{{$value.stockcode}}</p>
                                <p>{{$value.stockname}}</p>
                            </td>
                            <td>
                                <p>{{$value.ordertime}}</p>
                                <p>{{$value.dealtime}}</p>
                            </td>
                            <td>
                                <p>{{$value.orderprice}}</p>
                                <p>{{$value.dealprice}}</p>
                            </td>
                            <td>
                                <p>{{$value.dealnumber}}</p>
                            </td>
                            <td>
                                <p>{{$value.dealtype}}</p>
                            </td>
                            <td>
                                <p>{{$value.stampDuty}}</p>
                                <p>{{$value.commission}}</p>
                            </td>
                            <td>
                                <p>{{$value.transferfee}}</p>
                            </td>
                        </tr>
                        {{/each}}
                    </table>
                </script>
                <!-- 股票实时信息 -->
                <script id="realtime-template" type="text/html">
                    <span style="display: none;" id="isStop">{{responding[32]}}</span>
                    <table class="left">
                        <tr>
                            <td colspan="2" class="name">{{responding[0]}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="now">{{responding[3]}}</td>
                        </tr>
                        <tr>
                            <td class="a-r yestoday">昨收价</td>
                            <td class="a-l">{{responding[2]}}</td>
                        </tr>
                        <tr>
                            <td class="a-r open">开盘价</td>
                            <td class="a-l">{{responding[1]}}</td>
                        </tr>
                        <tr>
                            <td class="a-r max">最高价</td>
                            <td class="a-l">{{responding[4]}}</td>
                        </tr>
                        <tr>
                            <td class="a-r min">最低价</td>
                            <td class="a-l">{{responding[5]}}</td>
                        </tr>
                        <tr>
                            <td colspan="2"><span class="ynbtn refreshButton">刷新</span></td>
                        </tr>
                    </table>
                    <table class="right">
                        <tr>
                            <td>卖四</td>
                            <td>{{responding[29]}}</td>
                            <td>{{responding[28]}}</td>
                        </tr>
                        <tr>
                            <td>卖三</td>
                            <td>{{responding[27]}}</td>
                            <td>{{responding[26]}}</td>
                        </tr>
                        <tr>
                            <td>卖二</td>
                            <td>{{responding[25]}}</td>
                            <td>{{responding[24]}}</td>
                        </tr>
                        <tr>
                            <td>卖一</td>
                            <td>{{responding[23]}}</td>
                            <td>{{responding[22]}}</td>
                        </tr>
                        <tr>
                            <td class="current" colspan="3">当前价格: {{responding[3]}}</td>
                        </tr>
                        <tr>
                            <td>买一</td>
                            <td>{{responding[11]}}</td>
                            <td>{{responding[10]}}</td>
                        </tr>
                        <tr>
                            <td>买二</td>
                            <td>{{responding[13]}}</td>
                            <td>{{responding[12]}}</td>
                        </tr>
                        <tr>
                            <td>买三</td>
                            <td>{{responding[15]}}</td>
                            <td>{{responding[14]}}</td>
                        </tr>
                        <tr>
                            <td>买四</td>
                            <td>{{responding[17]}}</td>
                            <td>{{responding[16]}}</td>
                        </tr>
                        <tr>
                            <td>买五</td>
                            <td>{{responding[19]}}</td>
                            <td>{{responding[18]}}</td>
                        </tr>
                    </table>
                </script>
                <script src="/private/backstage/js/backstage.js"></script>
                <script src="/private/backstage/js/myStock.js"></script>
    </body>

    </html>
