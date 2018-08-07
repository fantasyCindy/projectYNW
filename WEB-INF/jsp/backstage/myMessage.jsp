<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
            <%@ include file="../common/front-common.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329" />
            <link rel="stylesheet" href="/private/backstage/css/message.css?0329" />
    </head>

    <body>
        <%@include file="../common/front-head.jsp" %>
            <div id="myInfo" class="clear">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="mymsg">
                            <div class="title-1">我的私信</div>
                            <div class="menu">
                                <table>
                                    <tr>
                                        <td class="menu-item select" data-type="0">收件箱</td>
                                        <td class="menu-item" data-type="1">发件箱</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="items"></div>
                        </div>
                    </div>
            </div>
            <!-- 回复 -->
            <div class="msg-reply-overlay hide overlay">
                <div class="msg-reply">
                    <div class="title"><i class="fa fa-envelope-o fa-lg"></i>私信详情</div>
                    <i class="close fa fa-times-circle fa-2x"></i>
                    <div class="wrap">
                        <div class="send">
                            <div class="send-info">
                                <span class="name">发送人：<span class="value"></span></span>
                                <span class="time">时间：<span class="value"></span></span>
                            </div>
                            <div class="content"></div>
                        </div>
                        <div class="replyWrap">
                            <div class="indicate">
                                <i class="fa fa-angle-double-up fa-lg"></i>
                            </div>
                            <div class="reply">
                                <textarea cols="30" rows="6" placeholder="输入回复内容"></textarea>
                                <div class="wordCount"><span class="value">200</span>/200</div>
                            </div>
                            <button>回复</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 收件箱 -->
            <script id="msg-template" type="text/html">
                {{each}}
                <div class="item" data-type="{{$value.type}}">
                    <span class="state"><i class="fa fa-circle-o"></i></span>
                    <span class="send">{{$value.createName}}</span>
                    <span class="subject">{{$value.shortContent}}</span>
                    <span class="time">{{$value.createtime}}</span>
                </div>
                {{/each}}
            </script>
            <%@include file="../common/front-foot.jsp" %>
            <script src="/public/source/yndata.min.js"></script>
            <script src="/public/source/ynmodule.min.js"></script>
                <script src="${path}/public/bundle/myMessage.bundle.js"></script>
    </body>

    </html>
