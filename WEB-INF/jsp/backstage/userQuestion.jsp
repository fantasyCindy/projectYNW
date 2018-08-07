<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css?0730" />
            <link rel="stylesheet" href="/private/backstage/css/userQuestion.css?0730" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="myquertion">
                            <div class="title-1">我的提问</div>
                            <div class="ques">
                                <span class="ques-num"></span>
                                <span class="ques-btn trigger-askWin">提问</span></div>
                            <div class="menu">
                                <table>
                                    <tr>
                                        <td class="menu-item select" data-type="done">已回答</td>
                                        <td class="menu-item" data-type="unanswer">待回答</td>
                                        <td class="menu-item" data-type="evaluate">已采纳</td>
                                        <td class="menu-item" data-type="overdue">已过期</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="sum"></div>
                            <div class="items"></div>
                        </div>
                    </div>
            </div>
            <!-- 已采纳 -->
            <script id="myquertion-accept-template" type="text/html">
                {{each}}
                <div class="item">
                    <div class="user-ask">
                        <i class="yn-ask"></i>
                        <a href="/consultation/{{$value.noteid}}.htm" target="_blank">{{#$value.questioncontent}}</a>
                    </div>
                    <div class="feedback clear">
                        <span>{{$value.teachertitle}}</span>
                        <span class="name">{{$value.questionusername}}</span>
                        <span style="margin:0 10px;">{{$value.questiontime}}</span>
                        <span class="qPrice">价格<span class="askPrice">￥{{$value.price}}</span></span>
                    </div>
                </div>
                {{/each}}
            </script>
            <!-- 待回答 -->
            <script id="myquertion-noask-template" type="text/html">
                {{each}}
                <div class="item">
                    <div class="user-ask">
                        <i class="yn-ask"></i>
                        <a href="/consultation/{{$value.noteid}}.htm" target="_blank">{{#$value._questioncontent}}</a>
                    </div>
                    <div class="feedback clear">
                        <span>{{$value.answerer}}</span>
                        <span style="margin:0 10px;">{{$value.questiontime}}</span>
                        <span class="qPrice">价格<span class="askPrice">￥{{$value.price}}</span></span>
                    </div>
                </div>
                {{/each}}
            </script>
            <!-- 已回答 -->
            <script id="myquertion-yesask-template" type="text/html">
                {{each}}
                <div class="item">
                    <div class="user-ask">
                        <i class="yn-ask"></i>
                        <a href="/consultation/{{$value.noteid}}.htm" target="_blank">{{#$value.questioncontent}}</a>
                    </div>
                    <div class="feedback clear">
                        <span>{{$value.teachertitle}}</span>
                        <span style="margin:0 10px;">{{$value.answertime}}</span>
                        <span class="qPrice">价格<span class="askPrice">￥0</span></span>
                    </div>
                </div>
                {{/each}}
            </script>
            <%@  include file="../common/moudule-ask.jsp" %>
                <%@include file="../common/front-foot.jsp" %>
                    <script src="/public/bundle/myAsk.bundle.js?0730"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
