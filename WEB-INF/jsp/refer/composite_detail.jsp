<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title>约牛，让股民与牛人相约</title>
        <%@ include file="../common/all.min.jspf" %>
            <link rel="stylesheet" href="/public/css/composite_detail.css?v=2">
            <link rel="stylesheet" href="/public/module/ui/pay-confirm.css" />
            <script src="/public/js/highcharts.js"></script>
    </head>

    <body>
        <%@ include file="../common/head.jsp" %>
            <div id="compositeDetail">
                <div id="userContent" class="hide">
                    <div class="yn-left">
                        <!-- 组合详情 -->
                        <div class="frame" id="profile"></div>
                        <!-- 收益 -->
                        <div class="stockIncome frame">
                            <div class="menu">
                                <span class="menu-2-item select" data-name="income">当前收益</span>
                                <span class="menu-2-item" data-name="feed">订阅服务</span>
                                <span class="menu-2-item" data-name="refund">退款保障</span>
                            </div>
                            <div class="content items"></div>
                        </div>
                        <!-- 调仓记录 -->
                        <div class="stockHold frame" id="stockRecord">
                            <div class="menu">
                                <span class="menu-2-item select" data-type="recordHistory">调仓记录</span>
                                <span class="menu-2-item" data-type="recordCurrent">当前持仓</span>
                                <span class="menu-2-item" data-type="recordChart">交流区</span>
                            </div>
                            <div class="content">
                                <div class="items"></div>
                                <!-- 调仓记录 -->
                                <div id="recordHistory" class="child">
                                    <div class="items"></div>
                                </div>
                                <!-- 当前持仓 -->
                                <div id="recordCurrent" class="child hide">
                                    <table>
                                        <thead>
                                            <tr class="header">
                                                <td class="name">股票名称</td>
                                                <td class="price">现价</td>
                                                <td class="up">今日涨跌</td>
                                                <td class="cost">平均成本</td>
                                                <td class="float">浮动盈亏</td>
                                                <td>持仓</td>
                                                <td class="store">仓占位</td>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <!-- 交流区 -->
                                <div id="recordChart" class="hide child">
                                    <div class="impress"></div>
                                    <div class="wrap">
                                        <div class="comments">
                                            <div class="publish-container"></div>
                                            <div class="comments-filter">
                                                <button class="comments-filter-item select" data-value="0">大家说</button>
                                                <button class="comments-filter-item" data-value="1">只看牛人</button>
                                            </div>
                                            <div class="items"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="yn-right">
                        <!-- 订阅 -->
                        <div class="feedBar relative frame">
                            <script type="text/html" id="feedBar-template">
                                <div class="absolute icon-state icon-state-{{_icon}}"></div>
                                <div class="price">
                                    <span class="txt">订阅价</span>
                                    <span class="value">{{_price}}</span>
                                </div>
                                <div class="time">
                                    <div class="">{{#_time}}</div>
                                    <div class="track">
                                        <div class="train" style="width:{{_runRatio}}%"></div>
                                    </div>
                                </div>
                                <div class="submit">{{#_feed}}</div>
                            </script>
                        </div>
                        <!-- 历史业绩 -->
                        <div class="history frame">
                            <div class="yn-title-1">
                                <span class="icon"></span>
                                <span class="txt">历史业绩</span>
                            </div>
                            <div class="items">
                                <script type="text/html" id="history-template">
                                    <div class="avatar fl">
                                        <img src="{{photo}}" width="100%" />
                                    </div>
                                    <div class="info fl">
                                        <div class="title">{{teacherName}} <i class="fa fa-vimeo-square"></i></div>
                                        <div class="layer">投资顾问</div>
                                    </div>
                                </script>
                            </div>
                            <div class="chart">
                                <div class="chart-item chart-item-1">
                                    <span class="txt">平均月收益</span>
                                    <span class="draw inline"></span>
                                </div>
                                <div class="chart-item chart-item-2">
                                    <span class="txt">组合成功率</span>
                                    <span class="draw inline"></span>
                                </div>
                                <div class="chart-item chart-item-3">
                                    <span class="txt">选股成功率</span>
                                    <span class="draw inline"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /*///////////////////////////////////////////////////////////////////*/ -->
                <!-- /*///////////////////////////////////////////////////////////////////*/ -->
                <!-- /*///////////////////////////////////////////////////////////////////*/ -->
                <!-- Teacher -->
                <div id="teacherContent" class="hide">
                    <div class="yn-left">
                        <div class="wealth" id="teacher-wealth">
                            <script id="wealth-template" type="text/html">
                                <table>
                                    <tr>
                                        <td>
                                            <div class="txt">净值</div>
                                            <div class="value">{{_wealthRatio}}</div>
                                        </td>
                                        <td>
                                            <div class="txt">总资产</div>
                                            <div class="value">{{totalcapital}}</div>
                                        </td>
                                        <td>
                                            <div class="txt">可用资金</div>
                                            <div class="value" id="wealth-avaliable">{{availablefunds}}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="txt">总收益</div>
                                            <div class="value">{{floatPandL}}</div>
                                        </td>
                                        <td>
                                            <div class="txt">本周收益</div>
                                            <div class="value weekrate"></div>
                                        </td>
                                        <td>
                                            <div class="txt">当日收益</div>
                                            <div class="value dayrate"></div>
                                        </td>
                                    </tr>
                                </table>
                            </script>
                        </div>
                        <!--profit -->
                        <div class="profit frame">
                            <div class="left">
                                <div id="profit-income"></div>
                            </div>
                            <div class="right">
                                <div id="incomeLineChart"></div>
                            </div>
                        </div>
                        <script id="profit-template" type="text/html">
                            <table>
                                <tr>
                                    <td class="txt">月均收益</td>
                                    <td class="value">{{mothrate}}%</td>
                                </tr>
                                <tr>
                                    <td class="txt">周均收益</td>
                                    <td class="value">{{weekrate}}%</td>
                                </tr>
                                <tr>
                                    <td class="txt">日均收益</td>
                                    <td class="value">{{dayrate}}%</td>
                                </tr>
                                <tr>
                                    <td class="txt">最大盈亏</td>
                                    <td class="value">{{maxEarnings}}%</td>
                                </tr>
                                <tr>
                                    <td class="txt">胜率</td>
                                    <td class="value">{{winrate}}%</td>
                                </tr>
                                <tr>
                                    <td class="txt">初次交易</td>
                                    <td class="value">{{firstTradingTime}}</td>
                                </tr>
                                <tr>
                                    <td class="txt">最近交易</td>
                                    <td class="value">{{lastTradingTime}}</td>
                                </tr>
                            </table>
                        </script>
                    </div>
                    <div class="yn-right">
                        <!-- 组合简介 -->
                        <div class="intro frame"></div>
                        <script id="teacherContent-intro-template" type="text/html">
                            <div class="state absolute icon-state icon-state-{{_icon}}"></div>
                            <div class="yn-title-1">
                                <span class="icon"></span>
                                <span class="txt">组合简介</span>
                            </div>
                            <div class="wrap">
                                <div class="info">
                                    <div class="name">{{combination_name}}</div>
                                    <div class="subject">{{combination_des}}</div>
                                    <div class="image">
                                        <img src="{{combination_pic}}" width="100%" />
                                    </div>
                                </div>
                                <div class="content">
                                    <div class="item">
                                        <span class="txt">目标收益</span>
                                        <span class="value">{{target_revenue}}%</span>
                                        <span class="txt" style="margin-left:40px;">止损线</span>
                                        <span class="value">{{stop_line}}%</span>
                                    </div>
                                    <div class="item">
                                        <span class="txt">开始时间</span>
                                        <span class="value">{{starttime}}</span>
                                    </div>
                                    <div class="item">
                                        <span class="txt">结束时间</span>
                                        <span class="value">{{endtime}}</span>
                                    </div>
                                    <div class="item">
                                        <span class="txt">订阅人数</span>
                                        <span class="value">{{_feedCount}}人</span>
                                    </div>
                                </div>
                            </div>
                        </script>
                    </div>
                    <div class="clear"></div>
                    <!-- 模拟炒股 -->
                    <div id="simulateBar" class="record frame relative">
                        <div id="realtimeContainer" class="absolute"></div>
                        <div class="menu" id="simulate_menu">
                            <span class="menu-item select" data-value="simulate_hold">持仓</span>
                            <span class="menu-item" data-value="simulate_buy">买入</span>
                            <span class="menu-item" data-value="simulate_sell">卖出</span>
                            <span class="menu-item" data-value="simulate_rollback">撤单</span>
                            <span class="menu-item" data-value="simulate_history">查询</span>
                            <span class="menu-item" data-value="simulate_talk">交流区</span>
                        </div>
                        <div class="content" id="simulate-container">
                            <!-- 持仓 -->
                            <div id="simulate_hold" class="child">
                                <table>
                                    <thead>
                                        <tr class="table-header">
                                            <td>股票名称</td>
                                            <td>股票代码</td>
                                            <td>现价</td>
                                            <td>涨跌幅</td>
                                            <td>持仓数量</td>
                                            <td>平均成本</td>
                                            <td>浮动盈亏</td>
                                            <td>仓占比</td>
                                            <td>买入</td>
                                            <td>卖出</td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <!-- 买入 -->
                            <div id="simulate_buy" class="child hide">
                                <div class="line">
                                    <span class="label">股票代码</span>
                                    <input type="text" placeholder="股票代码/拼音" id="buy-stock-code" autocomplete="off" />
                                    <div class="hide" id="buy-select">
                                        <span class="code"></span>
                                        <span class="name"></span>
                                        <span class="icon fa fa-times-circle"></span>
                                    </div>
                                </div>
                                <div class="line buy-price-bar">
                                    <span class="label">买入价格</span>
                                    <div class="wrap absolute">
                                        <div class="inline price-calculate">
                                            <div class="ynbtn bg-green" id="buy-price-minus-btn">
                                                <i class="fa fa-minus"></i>
                                                <span class="txt">0.01</span>
                                            </div>
                                            <div class="limit green">跌停<span id="buy-price-min" class="green"></span></div>
                                        </div>
                                        <input type="text" placeholder="" id="buy-price" autocomplete="off" />
                                        <div class="inline price-calculate red">
                                            <div class="ynbtn bg-red" id="buy-price-plus-btn">
                                                <i class="fa fa-plus"></i>
                                                <span class="txt">0.01</span>
                                            </div>
                                            <div class="limit">涨停<span id="buy-price-max"></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="line">
                                    <span class="label">可用资金</span> RMB：￥
                                    <span id="buy_avaliable"></span>
                                </div>
                                <div class="line buy-count relative">
                                    <span class="label">买入数量</span>
                                    <input type="text" id="buy-count" autocomplete="off" />
                                    <span id="max-buy-count"></span>
                                    <span class="ynbtn limit-item" data-value="0.25">1/4</span>
                                    <span class="ynbtn limit-item" data-value="0.5">1/2</span>
                                    <span class="ynbtn limit-item" data-value="1">全部</span>
                                    <div id="buy-maxCount" class="absolute"></div>
                                </div>
                                <div class="submits ac mgt20">
                                    <button id="submit-buy">买入</button>
                                </div>
                            </div>
                            <!-- 卖出 -->
                            <div class="child hide" id="simulate_sell">
                                <div class="line">
                                    <span class="label">卖出股票</span>
                                    <select id="sell-hold-stock"></select>
                                </div>
                                <div class="line">
                                    <span class="label">委托价格</span>
                                    <input type="text" id="sell-price" autocomplete="off" />
                                    <div class="tip absolute">价格区间<span class="price-min"></span>-<span class="price-max"></span></div>
                                    <div class="inline price-calculate">
                                        <span class="item minus" data-value="-0.01">-0.01</span>
                                        <span class="item plus" data-value="0.01">+0.01</span>
                                    </div>
                                </div>
                                <div class="line">
                                    <span class="label">卖出股数</span>
                                    <input type="text" id="sell-count" autocomplete="off" />
                                    <div class="tip absolute">最多可以卖出<span class="count-max"></span>股</div>
                                    <div class="inline absolute count-calculate">
                                        <span class="item" data-value="0.25">1/4</span>
                                        <span class="item" data-value="0.5">1/2</span>
                                        <span class="item" data-value="1">全部</span>
                                    </div>
                                </div>
                                <div class="line submits">
                                    <button class="submit">卖出</button>
                                </div>
                            </div>
                        </div>
                        <!-- 撤单 -->
                        <div id="simulate_rollback" class="child hild"></div>
                        <!-- 交易记录 -->
                        <div class="child hide" id="simulate_history">
                            <div class="items"></div>
                        </div>
                        <!-- 交流区 -->
                        <div id="simulate_talk" class="child hide">
                            <div class="left">
                                <!-- 评论 -->
                                <div class="comments">
                                    <div class="publish-container"></div>
                                    <div class="comments-filter">
                                        <button class="comments-filter-item select" data-value="0">大家说</button>
                                        <button class="comments-filter-item" data-value="1">只看牛人</button>
                                    </div>
                                    <div class="items"></div>
                                </div>
                            </div>
                            <div class="right">
                                <!-- 印象 -->
                                <div class="impress"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /*/////////////////////////  Template //////////////////////////////////////*/ -->
            <!-- 交易记录 -->
            <script type="text/html" id="simulate-history-template">
                <table>
                    <tr class="header">
                        <td class="name">股票名称</td>
                        <td class="code">股票代码</td>
                        <td class="price">委托价格</td>
                        <td class="count">成交数量</td>
                        <td class="cost">交易价格</td>
                        <td class="type">交易方向</td>
                        <td class="type">盈亏额</td>
                        <td class="time">交易时间</td>
                    </tr>
                    {{each}}
                    <tr>
                        <td class="name">{{$value.stockname}}</td>
                        <td class="code">{{$value.stockcode}}</td>
                        <td class="price">{{$value.orderprice}}</td>
                        <td class="count">{{$value.dealnumber}}</td>
                        <td class="cost">{{$value.dealprice}}</td>
                        <td class="type">{{$value._type}}</td>
                        <td class="type">{{$value._profit}}</td>
                        <td class="time">{{$value._time}}</td>
                    </tr>
                    {{/each}}
                </table>
            </script>
            <!-- 调仓记录 -->
            <script type="text/html" id="recordHistory-template">
                {{each}}
                <div class="item">
                    <table>
                        <tr>
                            <td colspan="5" class="title">{{$value.time}}调仓记录</td>
                        </tr>
                        {{each $value.values}}
                        <tr class="content">
                            <td class="type">
                                <div class="icon type{{$value.dealtype}}"></div>
                            </td>
                            <td class="stock">
                                <span>{{$value.stockname}}</span>
                                <span>{{$value.stockcode}}</span>
                            </td>
                            <td class="addStock">
                                <button class="addStockBtn" data-code="{{$value.stockcode}}" data-name="{{$value.stockname}}">+自选</button>
                            </td>
                            <td class="operate">{{#$value._operate}}</td>
                            <td class="deal">{{$value._deal}}</td>
                            <td class="store">
                            <p>仓占比：{{$value._change}}</p>
                            <p>{{$value._profit}}</p>
                            </td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
                {{/each}}
            </script>
            <!-- 评论 -->
            <script type="text/html" id="simulate_talk-comments-template">
                {{each}}
                <div class="item oh level{{$value._level}}">
                    <div class="inline avatar fl">
                        <img src="{{$value.photo}}" />
                    </div>
                    <div class="inline info fl">
                        <div class="talker">
                            <span class="name">{{$value.nickname}}</span>
                            <div class="inline actions">
                                <spna class="time">{{$value.create_time}}</spna>
                                <span class="action setHide type{{$value.is_hide}} {{$value._hideTextStyle}}" data-id="{{$value.comment_id}}" data-type="{{$value.is_hide}}">{{$value._hideText}}</span>
                                <a href="#simulate_talk" class="action reply level{{$value._level}} {{$value._subLevel}}" data-name="{{$value.nickname}}" data-id="{{$value.comment_id}}">回复</a>
                            </div>
                        </div>
                        <div class="words">{{$value.content}}</div>
                    </div>
                </div>
                {{/each}}
            </script>
            <!-- 撤单 -->
            <script type="text/html" id="simulate-rollback-template">
                <table>
                    <tr class="header">
                        <td>股票名称</td>
                        <td>股票代码</td>
                        <td>持仓数量</td>
                        <td>收益</td>
                        <td>平均成本</td>
                        <td>可卖数量</td>
                        <td>操作</td>
                    </tr>
                    {{each}}
                    <tr>
                        <td>{{$value.stockname}}</td>
                        <td class="code">{{$value.stockcode}}</td>
                        <td class="hold">{{$value.entrustnumber}}</td>
                        <td class="income">---</td>
                        <td class="cost">---</td>
                        <td class="sellCount">---</td>
                        <td class="action rollback">
                            <button>撤单</button>
                        </td>
                    </tr>
                    {{/each}}
                </table>
            </script>
            <!-- 股票实时信息 -->
            <script id="realtime-template" type="text/html">
                <div class="real-left">
                    <div class="stockName">{{#responding[0]}}</div>
                    <div class="stockPrice">{{#responding[3]}}</div>
                    <div class="line yestoday">
                        <span class="txt">昨收价</span>
                        <span class="value">{{#responding[2]}}</span>
                    </div>
                    <div class="line open">
                        <span class="txt">开盘价</span>
                        <span class="value">{{#responding[1]}}</span>
                    </div>
                    <div class="line high">
                        <span class="txt">最高价</span>
                        <span class="value">{{#responding[4]}}</span>
                    </div>
                    <div class="line low">
                        <span class="txt">最低价</span>
                        <span class="value">{{#responding[5]}}</span>
                    </div>
                </div>
                <table class="real-right">
                    <tr>
                        <td>卖四</td>
                        <td>{{#responding[29]}}</td>
                        <td>{{#responding[28]}}</td>
                    </tr>
                    <tr>
                        <td>卖三</td>
                        <td>{{#responding[27]}}</td>
                        <td>{{#responding[26]}}</td>
                    </tr>
                    <tr>
                        <td>卖二</td>
                        <td>{{#responding[25]}}</td>
                        <td>{{#responding[24]}}</td>
                    </tr>
                    <tr>
                        <td>卖一</td>
                        <td>{{#responding[23]}}</td>
                        <td>{{#responding[22]}}</td>
                    </tr>
                    <tr>
                        <td class="current" colspan="3">当前价格: {{#responding[3]}}</td>
                    </tr>
                    <tr>
                        <td>买一</td>
                        <td>{{#responding[11]}}</td>
                        <td>{{#responding[10]}}</td>
                    </tr>
                    <tr>
                        <td>买二</td>
                        <td>{{#responding[13]}}</td>
                        <td>{{#responding[12]}}</td>
                    </tr>
                    <tr>
                        <td>买三</td>
                        <td>{{#responding[15]}}</td>
                        <td>{{#responding[14]}}</td>
                    </tr>
                    <tr>
                        <td>买四</td>
                        <td>{{#responding[17]}}</td>
                        <td>{{#responding[16]}}</td>
                    </tr>
                    <tr>
                        <td>买五</td>
                        <td>{{#responding[19]}}</td>
                        <td>{{#responding[18]}}</td>
                    </tr>
                </table>
            </script>
            <!-- 发表评论 -->
            <script type="text/html" id="publish-template">
                <div class="publish relative">
                    <div class="reply hide">
                        <span class="txt">回复：</span>
                        <span class="name"></span>
                        <span class="fa fa-times-circle"></span>
                    </div>
                    <div class="content">
                        <textarea id="" cols="30" rows="7" placeholder="在这里输入内容..." ></textarea>
                    </div>
                    <div class="bottom oh">
                        <input type="text" class="insertCode fl" autocomplete="off" placeholder="搜索股票" />
                        <button class="submit">提交评论</button>
                        <span class="wordCount fr"><span class="value">200</span>/200</span>
                    </div>
                </div>
            </script>
            <!-- 简介 -->
            <script type="text/html" id="profile-template">
                <div class="top oh">
                    <div class="frame-left fl">
                        <div class="avtar inline">
                            <img src="{{combination_pic}}" alt="" />
                        </div>
                    </div>
                    <div class="frame-right fl">
                        <div class="title">
                            <span class="name">{{combination_name}}</span>
                            <div class="style inline">{{#_style}}</div>
                        </div>
                        <div class="content">{{combination_des}}</div>
                        <div class="data">
                            <div class="inline composite-data-item">
                                <span class="composite-icon inline income-icon"></span>
                                <span class="txt">目标收益</span>
                                <span class="value">{{target_revenue}}</span>
                                <span class="suffix">%</span>
                            </div>
                            <div class="inline composite-data-item">
                                <span class="composite-icon maxtime-icon"></span>
                                <span class="txt">最长期限</span>
                                <span class="value">{{combination_maxterm}}</span>
                                <span class="suffix">天</span>
                            </div>
                            <div class="inline composite-data-item">
                                <span class="composite-icon downline-icon"></span>
                                <span class="txt">止损线</span>
                                <span class="value" style="color:#390">{{stop_line}}</span>
                                <span class="suffix" style="color:#390">%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom relative">
                    <div class="beginTime inline">
                        <span class="txt">开始时间：{{starttime}}</span>
                    </div>
                    <div class="endTime inline">
                        <span class="txt">结束时间：{{endtime}}</span>
                    </div>
                    <div class="fr absolute save hide">
                        <span class="composite-icon favorate-icon"></span>
                        <span class="txt">收藏</span>
                    </div>
                </div>
            </script>
            <!-- 订阅服务 -->
            <script type="text/html" id="feed-template">
                <div class="feed-item">
                    <div class="wrap">
                        <div class="icon"><img src="/public/icons/composite/server-01.png" /></div>
                        <div class="txt">实时接受组合动态(APP推送+网站消息)</div>
                    </div>
                </div>
                <div class="feed-item">
                    <div class="wrap">
                        <div class="icon"><img src="/public/icons/composite/server-02.png" /></div>
                        <div class="txt">查看交易记录和持仓股票</div>
                    </div>
                </div>
                <div class="feed-item">
                    <div class="wrap">
                        <div class="icon"><img src="/public/icons/composite/server-03.png" /></div>
                        <div class="txt">与老师交流投资经验</div>
                    </div>
                </div>
            </script>
            <!-- 退款保障 -->
            <script type="text/html" id="refund-template">
                <div class="refund-items">
                    <div class="inline item item-1">
                        <span class="icon"></span>
                        <span class="txt">运行期满，组合未达到目标收益，视为失败，将全额退还订阅费。</span>
                    </div>
                    <div class="inline item item-2">
                        <span class="icon"></span>
                        <span class="txt">运行期间，收益触及组合止损线，视为失败，将全额退还订阅费。</span>
                    </div>
                    <div class="inline item item-3">
                        <span class="icon"></span>
                        <span class="txt">运行期满，组合达到目标收益，无论当前是否清仓，视为成功；不退还订阅费。</span>
                    </div>
                    <div class="inline item item-4">
                        <span class="icon"></span>
                        <span class="txt">运行期间，组合在清仓状态下达到目标收益，可提前结束运行，视为成功；不退还订阅费。</span>
                    </div>
                </div>
            </script>
            <div class="clear" style="clear:both;"></div>
            <%@ include file="../common/foot.jsp" %>
                <script src="/public/bundle/composite_detail.bundle.js?20170731212255"></script>
    </body>

    </html>
