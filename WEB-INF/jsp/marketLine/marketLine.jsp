<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>股票行情约投顾</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link href="/private/marketLine/css/marketLine.css?05041" rel="stylesheet" />
    </head>
        <%@include file="../v2/front-head-v2.jsp" %>
        <div id="navg">
            <a href="/index.htm">首页</a>
            <i class="fa fa-angle-right"></i>
            <a href="#">股票行情</a>
        </div>
        <div id="marketLine">
            <div class="marketLine_left fl">
                <div class="stock-top">
                    <div class="fl" id="shareInfo">
                        <h3 id="stock_name"></h3>
                        <p id="page_stock_code"></p>
                        <button>添加自选</button>
                    </div>
                    <div id="stockInfo" class="fr">
                        <table>
                            <tr>
                                <td colspan="4">
                                    <span id="_now"></span>
                                    <span id="_up"></span>
                                    <span id="_radio"></span>
                                </td>
                            </tr>
                            <tr>
                                <td><span class="txt">今开：</span><span id="_open"></span></td>
                                <td><span class="txt">最高：</span><span id="_high"></span></td>
                                <td><span class="txt">成交量：</span><span id="_dealCount"></span></td>
                                <td><span class="txt">涨停价：</span><span id="_top"></span></td>
                            </tr>
                            <tr>
                                <td><span class="txt">昨收：</span><span id="_yesterday"></span></td>
                                <td><span class="txt">最低：</span><span id="_low"></span></td>
                                <td><span class="txt">成交额：</span><span id="_dealMoney"></span></td>
                                <td><span class="txt">跌停价：</span><span id="_bottom"></span></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- K线 -->
                <div id="shareDetail" class="idhover">
                    <div class="tabBar">
                        <table>
                            <tbody>
                                <tr>
                                    <td id="minute" class="item select" data-show="container_minute">分时</td>
                                    <td id="dayUnit" class="item" data-type="day" data-show="container_day">日K</td>
                                    <td id="weekUnit" class="item" data-type="week" data-show="container_week">周K</td>
                                    <td id="monthUnit" class="item" data-type="month" data-show="container_month">月K</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="shareSheetWrap">
                        <div class="spline"></div>
                        <div id="container_minute" class="shareContainer">
                            <img width="100%" src="http://image.sinajs.cn/newchart/min/n/${codeStr}.gif" alt="">
                        </div>
                        <div id="container_day" data-select="0" class="shareContainer"></div>
                        <div id="container_week" data-select="2" class="shareContainer"></div>
                        <div id="container_month" data-select="4" class="shareContainer"></div>
                    </div>
                </div>
                <!-- 精彩观点 -->
                <div id="articles" class="idhover">
                    <p class="tit"><span>精彩观点</span></p>
                    <div class="items"></div>
                </div>
            </div>
            <div class="marketLine_right fr">
                <!-- 我的自选 -->
                <div id="MyOptional" class="idhover hide">
                    <p class="tit">
                        <span>我的自选</span>
                        <a href="http://ask.yuetougu.com/myCenter/myCenter.htm" target="_blank" class="more">更多<i class="fa fa-angle-right"></i></a>
                    </p>
                    <div class="items"></div>
                </div>
                <!-- 相关问答 -->
                <%@include file="../common/relativeAsk.jsp" %>
            </div>
        </div>
        <%@include file="../common/front-foot.jsp" %>
            <!-- /////////////////////////////////////////////////////////////////// -->
            <!-- 我的自选 -->
            <script id="MyOptional-template" type='text/html'>
                <table>
                    <tr class="head">
                        <td><span>股票名称</span></td>
                        <td><span>当前价</span></td>
                        <td><span>涨跌幅</span></td>
                        <td><span>操作</span></td>
                    </tr>
                    {{each}}
                    <tr class="body">
                        <td><span>{{$value.stockname}}</span></td>
                        <td><span>{{#$value.now}}</span></td>
                        <td><span>{{#$value.up}}</span></td>
                        <td>
                            <button>取消</button>
                        </td>
                    </tr>
                    {{/each}}
                </table>
            </script>
            <!-- 问股 -->
            <script type="text/html" id="askStock-template">
                {{each}}
                <div class="item">
                    <span class="time">{{$value.answertime}}</span>
                    <div class="quesition">
                        <span class="user">{{$value.questionusername}}：</span>
                        <span class="stock">{{$value.stock_code}}{{$value.stock_name}}</span>
                        <span>{{$value.questioncontent}}</span>
                    </div>
                    {{if $value.answercontent}}
                    <div class="answer">
                        <div class="answercont">
                            <span class="nickname">{{$value.teachertitle}}</span>
                            <i class="fa fa-vimeo-square"></i>：
                            <span class="answertext">{{#$value.answercontent}}</span>
                        </div>
                    </div>
                    {{/if}}
                </div>
                {{/each}}
            </script>
            <!-- 观点 -->
            <script type="text/html" id="article-template">
                {{each}}
                <a class="item" href="${opinion_path}opinion/{{$value.article_id}}.htm" target="_blank">
                    <span class="avatar">
                        <img src="{{$value.photo}}" />
                        <p class="name">{{$value.createrName}}</p>
                    </span>
                    <div class="story">
                        <p class="titleShort">{{$value.titleShort}}</p>
                        <p class="contentShort">{{$value.shortContent}}</p>
                    </div>
                    <span class="time">{{$value.create_time}}</span>
                </a>
                {{/each}}
            </script>
            <script type="text/javascript">
            var stockcode = "${code}";
            </script>
            <!-- <script type="text/javascript" src="/public/source/yndata.min.js"></script> -->
            <script type="text/javascript" src="/public/source/ynmodule.js?0127"></script>
            <script type="text/javascript" src="/public/js/highstock.js"></script>
            <script type="text/javascript" src="/public/source/marketLine.js?01271"></script>
            </body>

    </html>
