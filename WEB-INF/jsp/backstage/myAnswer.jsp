<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约投顾 | 我的问答</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
            <link rel="stylesheet" href="/private/backstage/css/myAnswer.css?0730" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock">
                <div class="container clear">
                    <%@ include file="_menu.jsp" %>
                        <div class="right shadow">
                            <div id="contentWrap">
                                <!-- /////////////////////////////////////////////////////////////////// -->
                                <div id="myAnswer">
                                    <div class="title-1">
                                        <span class="name">我的回答</span>
                                        <div class="myPrice">当前价格：<span class="askPrice"></span><span class="setting-price">设置价格</span></div>
                                    </div>
                                    <div class="statistics">
                                        <script type="text/html" id="statistics-template">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <div class="txt">本月解答问题数</div>
                                                        <div class="value">{{nowMothcount}}</div>
                                                    </td>
                                                    <td>
                                                        <div class="txt">用户满意度</div>
                                                        <div class="value">{{satisPerc}}</div>
                                                    </td>
                                                    <td>
                                                        <div class="txt">平均响应时间</div>
                                                        <div class="value">{{dif_second}}</div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </script>
                                    </div>
                                    <div class="category">
                                        <table>
                                            <tr>
                                                <td class="menu-item select" data-type="0">
                                                    <div class="txt">待回答</div>
                                                </td>
                                                <td class="menu-item" data-type="1">
                                                    <div class="txt">已回答</div>
                                                </td>
                                                <!-- <td class="menu-item select" data-type="mention">
                                                    <div class="txt">@我的</div>
                                                </td> -->
                                                <td class="menu-item" data-type="2">
                                                    <div class="txt">已忽略</div>
                                                </td>
                                                <td class="menu-item" data-type="3">
                                                    <div class="txt">已过期</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="totalCount"></div>
                                    <div class="items"></div>
                                </div>
                                <!-- /////////////////////////////////////////////////////////////////// -->
                            </div>
                        </div>
                </div>
            </div>
            <!-- set price -->
            <div id="setPrice">
                <div class="setPrice-wrap">
                    <div class="setPrice-content">
                        <div class="setPrice-title">设置价格<span class="setPrice-close closeWin"></span></div>
                        <div class="setPrice-line">
                            问股价格
                            <input class="setPrice-num" type="text"> ￥（ 价格为0~200的整数 ）
                        </div>
                        <div class="tip">温馨提示：当前问股价格每自然月只可更改一次，再次更改请等下个月，如有特殊情况请联系技术人员</div>
                        <div class="setPrice-bottom">
                            <span class="setPrice-btn cancel closeWin">取消</span>
                            <span class="setPrice-btn submit">提交</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--TEMPLATE -->
            <!-- 问答 -->
            <script type="text/html" id="list-item-template">
                {{each}}
                <div class="list-item">
                    <div class="line line1">
                        <span class="icon"></span>
                        <span class="value trigger-detail questioncontent" data-noteid={{$value.noteid}}>{{#$value.questioncontent}}</span>
                        <!-- <span class="type type{{$value.type_source}}">{{$value.type_source_txt}}</span> -->
                    </div>
                    <div class="line line2">
                        <span class="userName"><span class="isReferUser{{$value.is_referUser}}"><img src="/public/images/refer-icon.png" alt=""></span>{{$value.questionusername}}</span>
                        <span class="time">{{$value.questiontime}}</span>
                        <span class="qPrice">价格<span class="askPrice">￥{{$value.price}}</span></span>
                        <span class="ignoreButton {{$value.overdue}} {{$value.ignore}}" data-noteid="{{$value.noteid}}" data-name="{{$value.stockname}}" data-code="{{$value.stockcode}}" data-number="{{$value.note_billno}}">忽略</span>
                        <span class="askButton {{$value.overdue}}" data-noteid="{{$value.noteid}}" data-name="{{$value.stockname}}" data-code="{{$value.stockcode}}" data-number="{{$value.note_billno}}">回答</span>
                    </div>
                </div>
                {{/each}}
            </script>
            <!-- 已回答 -->
            <script type="text/html" id="list-chat-template">
                {{each}}
                <div class="list-item">
                    <div class="line question">
                        <span class="icon"></span>
                        <span class="value trigger-detail" data-noteid={{$value.noteid}}>{{#$value._questioncontent}}</span>
                        <span class="info">
                        <span class="userName"><span class="isReferUser{{$value.is_referUser}}"><img src="/public/images/refer-icon.png" alt=""></span>{{$value.questionusername}}</span>
                        <span class="time">{{$value.questiontime}}</span>
                        <span class="qPrice">价格<span class="askPrice">￥{{$value.price}}</span></span>
                        </span>
                    </div>
                    <div class="line answer">
                        <span class="icon"></span>
                        <span class="value trigger-detail" data-noteid={{$value.noteid}}>{{#$value._answercontent}}</span>
                    </div>
                    <div class="answer-info">
                        <span class="userName">{{$value.answerusername}}</span>
                        <span class="time">{{$value.answertime}}</span>
                        <span class="zancount">{{$value.zancount}}人认为有帮助</span>
                        <!-- <span class="adopt {{$value.adoptStyle}}"><i class="icon-adopt"></i>已采纳</span> -->
                    </div>
                </div>
                {{/each}}
            </script>
            <%@ include file="../common/moudule-answer.jsp" %>
                <%@ include file="_footPlus.jsp" %>
                    <!-- <script src="/public/source/yndata.min.js"></script> -->
                    <script src="/public/source/ynmodule.min.js"></script>
                    <script src="/public/bundle/myAnswer.bundle.js?0730"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
