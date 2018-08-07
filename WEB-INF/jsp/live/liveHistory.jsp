<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title>历史直播</title>
        <%@ include file="../common/all.jspf"%>
            <link href="/private/live/css/liveHistory.css" rel="stylesheet">
            <script>
            var roomid = "${room.roomid}";
            var room_teacherid = "${teacher.teacherid}";
            </script>
    </head>

    <body>
        <%@ include file="../common/head.jsp" %>
            <div id="navg">
                <a href="/index.htm">首页</a>
                <i class="fa fa-angle-right"></i>
                <a href="">${room.title}</a>
            </div>
            <!-- 直播信息 -->
            <div id="live-info" class="shadow">
                <div class="subject">
                    <span>今日主题：${periodical.todaysubject}</span>
                </div>
                <div class="person">
                    <div class="column column1 avatar"><img src="${teacher.photo}"/></div>
                    <div class="column column2">
                        <p class="name">${teacher.title}</p>
                        <p class="action">
                            <span class='care ${attention}'><c:if test="${attention}">取消</c:if>关注</span>
                                                    <span class="ask">私信</span>
                        </p>
                        <p class="style">${teacher.investmentstyle}</p>
                    </div>
                    <div class="column column3">
                        <p class="name">${teacher.title}</p>
                        <p class="name">${teacher.investmentstyle}</p>
                    </div>
                </div>
            </div>
            <!-- 直播列表 -->
            <div id="history-list" class="shadow">
                <div class="title">往期直播回顾</div>
                <div class="items">
                    <script type="text/html" id="history-list-template">
                        <table>
                            <tr class="tr-title">
                                <td>直播日期</td>
                                <td>直播主题</td>
                                <td>参与人数</td>
                                <td>直播条数</td>
                                <td>直播条数</td>
                            </tr>
                            {{each}}
                            <tr>
                                <td>{{$value.publisher_timeStringDay}}</td>
                                <td class="subject">{{$value.todaysubject}}</td>
                                <td>{{$value.membercount}}</td>
                                <td>{{$value.broadCastingCount}}</td>
                                <td class="btns">
                                    <button class="btn btn-defatrt" type="button" data-id="{{$value.periodicalid}}">查看记录</button>
                                </td>
                            </tr>
                            {{/each}}
                        </table>
                    </script>
                </div>
            </div>
            <div class="clearfix"></div>
            <%@ include file="../common/moudule-msg.jsp" %>
            <%@ include file="../common/foot.jsp"%>
                <script src="/private/live/js/liveHistory.js"></script>
    </body>

    </html>
