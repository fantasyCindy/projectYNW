<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div id="teacher-ask-win" class="hide">
        <div class="teacher-ask-wrap">
            <div class="teacher-ask-container">
                <div class="category">
                    <table>
                        <tr>
                            <td class="menu-item wait select" data-type="0">
                                <div class="txt">待回答</div>
                            </td>
                            <td class="menu-item" data-type="1">
                                <div class="txt">已回答</div>
                            </td>
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
                <div class="ask-items"></div>
                <div id="answerWindow" class="hide">
                    <div class="answerWindow-wrap">
                        <div class="title">
                            <div class="name">回答问题</div>
                            <i class="close-window"></i>
                        </div>
                        <div class="hide question"></div>
                        <div class="content">
                            <div class="top">
                                <div class="category action">
                                    <span class="name">选择分类：</span>
                                    <div class="items inline"></div>
                                </div>
                                <div class="judge action hide">
                                    <span class="stockInfo">趋势判断：<span class="value"></span></span>
                                    <button class="judge-item judge-item0 up" data-id="0">看涨<i class="fa fa-long-arrow-up"></i></button>
                                    <button class="judge-item  judge-item1 down" data-id="1">看跌<i class="fa fa-long-arrow-down"></i></button>
                                </div>
                            </div>
                            <script id="answerWindow-edit" type="text/plain"></script>
                            <div class="bottom">
                                <div class="search">
                                    <input type="text" placeholder="插入股票">
                                </div>
                                <button class="submit">提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 待问答 -->
    <script type="text/html" id="list-item-template">
        {{each}}
        <div class="list-item">
            <div class="line line1">
                <span class="ask-icon"></span>
                <p class="value trigger-detail questioncontent" data-noteid={{$value.noteid}}>{{$value._questioncontent}}</p>
                <!-- <span class="type type{{$value.type_source}}">{{$value.type_source_txt}}</span> -->
            </div>
            <div class="line line2">
                <span class="userName">{{$value.questionusername}}</span>
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
            <div class="list-question">
                <div class="line line1">
                    <span class="ask-icon"></span>
                    <p class="value trigger-detail questioncontent" data-noteid={{$value.noteid}}>{{$value.questioncontent}}</p>
                </div>
                <div class="line line2">
                    <span class="userName">{{$value.questionusername}}</span>
                    <span class="time">{{$value.questiontime}}</span>
                    <span class="qPrice">价格<span class="askPrice">￥{{$value.price}}</span></span>
                </div>
            </div>
            <div class="list-answer">
                <div class="line line1">
                    <span class="answer-icon"></span>
                    <p class="value trigger-detail questioncontent" data-noteid={{$value.noteid}}>{{$value.answercontentStr}}</p>
                </div>
                <div class="line line2">
                    <span class="time">{{$value.answertime}}</span>
                    <span class="ignoreButton hide {{$value.overdue}} {{$value.ignore}}" data-noteid="{{$value.noteid}}" data-name="{{$value.stockname}}" data-code="{{$value.stockcode}}" data-number="{{$value.note_billno}}">忽略</span>
                    <span class="askButton {{$value.overdue}}" data-noteid="{{$value.noteid}}" data-name="{{$value.stockname}}" data-code="{{$value.stockcode}}" data-number="{{$value.note_billno}}">回答</span>
                </div>
            </div>
        </div>
        {{/each}}
    </script>
