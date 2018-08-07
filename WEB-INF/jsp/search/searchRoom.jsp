<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title></title>
        <%@ include file="../common/all.jspf" %>
            <link rel="stylesheet" href="/private/search/css/search.css" />
            <%@ include file="data.jsp" %>
                <script>
                var roomList = ${queryRoomList};
                var interest = ${roomList};
                var userInput = "${queryText}";
                var roomCount = "${roomCount}";
                </script>
                <script>
                yn.log("查询结果", roomList)
                yn.log("感兴趣的", interest);
                yn.log("用户输入", userInput);
                yn.log("roomCount", roomCount);
                </script>
    </head>

    <body>
        <%@ include file="../common/head.jsp" %>
            <div id="navg">
                <a href="/index.htm">首页</a>
                <i class="fa fa-angle-right"></i>
                <a href="">搜索直播室</a>
            </div>
            <div id="searchRoom" class="container">
                <div class="searchRoom-left shadow">
                    <div class="searchBar">
                        <input type="text" placeholder="直播室名称/直播室号" id="search-key" />
                        <button class="search-submit">快速搜索</button>
                    </div>
                    <div id="result">
                        <div class="result-title"></div>
                        <div class="result-items"></div>
                        <div class="hide" id="none">
                            <h3>建议：</h3>
                            <p>您可以更换关键字，再次搜索</p>
                            <p>股民学院可以查看全部视频</p>
                        </div>
                    </div>
                </div>
                <div class="searchRoom-right shadow">
                    <div id="interest">
                        <div class="yn-title-1">
                            <i class="yn-title-1-icon"></i>
                            <span class="txt">您可能感兴趣的投顾</span>
                        </div>
                        <div class="items"></div>
                    </div>
                </div>
            </div>
            <%@ include file="../common/foot.jsp" %>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <!-- 直播室 -->
                <script id="room-template" type="text/html">
                    {{each}}
                    <a href="/live/liveDetailLive.htm?teacherid=" target="_blank" class="item" data-roomid="{{$value.roomid}}">
                        <div class="imgw">
                            <img src="{{$value.photo}}" />
                        </div>
                        <div class="name">{{$value.title}}</div>
                        <div class="style">{{$value.live_style}}</div>
                    </a>
                    {{/each}}
                </script>
                <script src="/private/search/js/searchRoom.js"></script>
    </body>

    </html>
