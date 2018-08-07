<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>${teacher.title}</title>
            <meta name="keywords" content="${teacher.title},<c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
            <meta name="description" content="${teacher.title},${teacher.descriptionString} <c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link href="/private/live/css/liveDetail.css?v=0329" rel="stylesheet" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <%@ include file="liveDetail_common.jsp" %>
                <div id="liveDetail">
                    <div class="liveContent">
                        <!-- LEFT -->
                        <div class="leftBar">
                            <div id="home-live" class="b220 home-child hide">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的直播</span>
                                </div>
                                <a class="more" href="/live/liveDetailLive.htm?teacherid=${teacher.teacherid}">
                                    <span class="count"></span>
                                    <span class="txt">更多</span>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                                <div class="items">
                                    <div class="avatar"></div>
                                    <div class="info inline">
                                        <p class="living-title">
                                            <span class="txt">正在直播：</span>
                                            <span class="value">${periodical.todaysubject}</span>
                                        </p>
                                        <div class="living-count hide">
                                            <span class="popularity"><span class="value">--</span>人气</span>
                                            <span class="pay"><span class="value">--</span>次赏</span>
                                            <span class="chat"><span class="value">--</span>条互动消息</span>
                                        </div>
                                        <div>
                                            <a href="/live/liveDetailLive.htm?teacherid=${teacher.teacherid}" class="ynbtn">我要参与</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="home-askStock" class="b220 home-child">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的问答</span>
                                </div>
                                <div class="category"></div>
                                <a class="more" href="/gegu/${teacher.teacherid}/">
                                    <span class="count"></span>
                                    <span class="txt">更多</span>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                                <div class="items"></div>
                            </div>
                            <div id="home-opinion" class="b220 home-child">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">TA的观点</span>
                                </div>
                                <a class="more" href="/dapan/${teacher.teacherid}/">
                                    <span class="count"></span>
                                    <span class="txt">更多</span>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                                <div class="category"></div>
                                <div class="items"></div>
                            </div>
                        </div>
                        <!--  RIGHT -->
                        <div class="rightBar">
                            <div id="home-info" class="b220 home-child">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">个人简介</span>
                                </div>
                                <div class="items">${teacher.description}</div>
                            </div>
                            <div id="home-goodat" class="b220 home-child">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">擅长领域</span>
                                </div>
                                <div class="items"></div>
                            </div>
                            <div id="home-video" class="b220 home-child hide">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">视频课程</span>
                                </div>
                                <div class="items"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <%@ include file="../common/moudule-ask.jsp" %>
                    <%@ include file="../common/module-opinion-list-person.jsp" %>
                        <%@ include file="../common/teacher-answer-list.jsp" %>
                            <%@ include file="../common/front-foot.jsp" %>
                                <script type="text/javascript">
                                var projectPath = "${path}";
                                var periodicalid = "${periodical.periodicalid}";
                                var room_id = "${periodical.roomid}";
                                var room_teacherid = "${teacher.teacherid}";
                                var room_userid = "${teacher.user_id}";
                                var isTeacherSelf = (room_userid == ynUserId);
                                var liveStatus = '${periodical.status}';
                                yn.log("isTeacherSelf = " + isTeacherSelf);
                                var __style = '${specialty}'
                                </script>
                                <script src="/public/source/yndata.js?01271"></script>
                                <script src="/public/source/ynmodule.js?01271"></script>
                                <script src="/public/bundle/liveDetail_master.bundle.js?03231"></script>
    </body>

    </html>
