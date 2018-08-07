<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329" />
                <link href="/public/css/message.css?0329" rel="stylesheet">
                <style>
                .topic-item {
                    border-left:1px solid #ffadb2;
                    margin-left:9px;
                    padding:10px 14px 0 14px;
                }
                
                .topic-item-photo {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                
                .topic-item-photo img {
                    width: 100%;
                }
                
                .topic-item-content {
                    display: inline-block;
                    width: 93%;
                    height: 60px;
                    line-height: 50px;
                    position: relative;
                    top: -18px;
                    font-size: 15px;
                    border-bottom: 1px dashed #DCDCDC;
                }
                
                .topic-item-content-name {
                    display: inline-block;
                    margin: 0 10px;
                }
                
                .topic-teacher-icon {
                    display: inline-block;
                    width: 12px;
                    height: 14px;
                    background: url(/public/sprite/dist/referStatus.png);
                    background-position: -283px -25px;
                    margin: 0 10px;
                    position: relative;
                    top: 2px;
                }
                
                .topic-item-title a {
                    margin: 0 15px;
                    color: red;
                }
                
                .topic-item-time {
                    display: inline-block;
                    float: right;
                    color: #999;
                    font-size: 13px;
                }
                
                .topic-date {
                    color: #999;
                    background: url(/public/images/time_icon.png) no-repeat;
                    background-color: white;
                    padding-left: 27px;
                }
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right">
                        <div id="contentWrap">
                            <div class="title-1">我的关注</div>
                            <div id="mycare">
                                <div class="filter">
                                    <table>
                                        <tr>
                                            <td class="item live select">投顾动态</td>
                                            <td class="item live" data-type="0">直播</td>
                                            <%-- <td class="item live" data-type="1">问股</td>
                                            <td class="item live" data-type="2">观点</td>
                                            <td class="item live" data-type="4">内参</td> --%>
                                            <td class="item topic" data-type="9">话题</td>
                                            <!-- <td class="item composite" data-type="4">组合消息</td> -->
                                        </tr>
                                    </table>
                                </div>
                                <div class="items"></div>
                            </div>
                        </div>
                    </div>
            </div>
            <!-- 投顾动态 -->
            <script id="feed-template" type="text/html">
                {{each}}
                <div class="body-item">
                    <div class="avatar fl" data-userid="{{$value._userid}}" data-teacherid="{{$value._teacherid}}">
                        <img src="{{$value._photo}}" width="100%" />
                    </div>
                    <div class="text fl">
                        <div class="line title">
                            <a href="{{$value._link}}" target="_blank" class="name">{{$value._name}}</a>
                            <span class="type type{{$value.tmessagetype}}">{{$value._type}}</span>
                            <span class="time">{{$value._time}}</span>
                        </div>
                        <div class="line line2">
                            <a href="{{$value._link}}" target="_blank">{{$value._content}}</a>
                        </div>
                    </div>
                </div>
                {{/each}}
            </script>
                <%@include file="../common/front-foot.jsp" %>
                <script src="/public/v2/base/yntool.js?20170705"></script>
                    <script src="/public/bundle/mycare.bundle.js?0329"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
