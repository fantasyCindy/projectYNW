<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/all.min_tdk.jspf" %>
            <title>${head.teacher.title}</title>
            <meta name="keywords" content="${head.teacher.keywords}" />
            <meta name="description" content="${head.teacher.description}" />
            <link rel="stylesheet" href="/private/findTeacher/css/findTeacher.css">
    </head>

    <body>
        <!-- 引入头部 -->
        <%@ include file="../common/head.jsp" %>
            <!-- contents -->
            <div id="findTeacher">
                <div id="TeacherRanking">
                    <div class="Rankingtop">
                        <span class="title">投资顾问排行</span>
                        <span class="time">最后更新时间：${datetime }</span>
                        <span class="fr">
                        <a href="${path}/html/rule.htm" target="_blank"><i class="fa fa-list-ul"></i>排行规则</a>
                    </span>
                    </div>
                    <div class="Rankingbott ">
                        <div class="summary-item summary-item1">
                            <div>入驻投顾</div>
                            <div class="num">${teacherCount}</div>
                        </div>
                        <div class="summary-item summary-item2">
                            <div>发布观点</div>
                            <div class="num">${articleCount}</div>
                        </div>
                        <div class="summary-item summary-item3">
                            <div>发布直播</div>
                            <div class="num">${brCount}</div>
                        </div>
                        <div class="summary-item summary-item4">
                            <div>解答问题</div>
                            <div class="num">${noteCount}</div>
                        </div>
                        <div class="summary-item summary-item5">
                            <div>影响人数</div>
                            <div class="num">${viewnumber}</div>
                        </div>
                    </div>
                </div>
                <!-- 排行详细 -->
                <div id="ThreeRanking">
                    <script id="rankContent-template" type="text/html">
                        {{each}}
                        <div class="item">
                            <span class="sort">{{$value.index}}</span>
                            <div class="favicon">
                                <a href="${live_path}/live/liveDetail.htm?teacherid={{$value.teacherid}}" target="_blank" class="avatar" data-userid="{{$value.user_id}}">
                                    <img src="{{$value.photo_path}}">
                                </a>
                            </div>
                            <div class="info">
                                <div class="row1">
                                    <div class="left inline">
                                        <span>NO.</span>
                                        <span class="sortIndex">
                                            <span>{{$value.index}}</span>
                                        </span>
                                        <i class="icon fa fa-circle"></i>
                                    </div>
                                </div>
                                <div class="row2">
                                    <div class="wrap">
                                        <a href="${live_path}/live/liveDetail.htm?teacherid={{$value.teacherid}}" class="name" target="_blank">{{$value.title}}</a>
                                        <span class="index">{{$value._value}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{/each}}
                    </script>
                    <div class="ranking hotRanking">
                        <div class="ranktitle">
                            <span><i class="icon fa fa-commenting"></i>观点最热排行</span>
                            <span class="indicates">
                            <span class="indicate left"><i class="fa fa-caret-left"></i></span>
                            <span class="currentIndex">1</span>
                            <span class="divide">/</span>
                            <span class="totalIndex"></span>
                            <span class="indicate right"><i class="fa fa-caret-right"></i></span>
                            </span>
                        </div>
                        <div class="rankContent">
                            <div class="first"></div>
                            <div class="rest">
                                <div class="wrap"></div>
                            </div>
                        </div>
                    </div>
                    <div class="ranking manyRanking">
                        <div class="ranktitle">
                            <span><i class="icon fa fa-tv"></i>直播人气排行</span>
                            <span class="indicates">
                            <span class="indicate left"><i class="fa fa-caret-left"></i></span>
                            <span class="currentIndex">1</span>
                            <span class="divide">/</span>
                            <span class="totalIndex"></span>
                            <span class="indicate right"><i class="fa fa-caret-right"></i></span>
                            </span>
                        </div>
                        <div class="rankContent">
                            <div class="first"></div>
                            <div class="rest"></div>
                        </div>
                    </div>
                    <div class="ranking fireRanking">
                        <div class="ranktitle">
                            <span><i class="icon fa fa-comments-o"></i>解答最多排行</span>
                            <span class="indicates">
                            <span class="indicate left"><i class="fa fa-caret-left"></i></span>
                            <span class="currentIndex">1</span>
                            <span class="divide">/</span>
                            <span class="totalIndex"></span>
                            <span class="indicate right"><i class="fa fa-caret-right"></i></span>
                            </span>
                        </div>
                        <div class="rankContent">
                            <div class="first"></div>
                            <div class="rest"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 引入尾部 -->
            <%@ include file="../common/foot.jsp" %>
                <script src="/public/bundle/findTeacher.bundle.js"></script>
    </body>

    </html>
