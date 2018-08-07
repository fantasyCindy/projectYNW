<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>
                <c:choose>
                    <c:when test="${noteTitle != null}">${noteTitle}</c:when>
                    <c:otherwise>${head.note.title}</c:otherwise>
                </c:choose>
            </title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta name="keywords" content="<c:choose><c:when test='${noteKey != null}'>${noteKey }</c:when><c:otherwise>${head.note.keywords}</c:otherwise></c:choose>" />
                <meta name="description" content="<c:choose><c:when test='${noteDescription != null}'>${noteDescription}</c:when><c:otherwise>${head.note.description}</c:otherwise></c:choose>" />
                <link href="/private/askStock/css/askStock2.css?03291" rel="stylesheet" />
                <script>
                /* beautify preserve:start */

            var __total = ${total}
            var __href = window.location.href;
            var typeMatch = __href.match(/(?:best|new)\/([a-z]+)/)
            var cateMatch = __href.match(/best|new/)
            var pageMatch = __href.match(/\d+$/)
            var __page = pageMatch ? pageMatch[0] : 1
            var __cate = cateMatch ? cateMatch[0] : "new"
            var __type = typeMatch ? typeMatch[1] : "all"
           /* beautify preserve:end */
                </script>
                
                <style>
                #personIntro .liveBtn{
                    display:inline !important;
                    width: 90px !important;
                    height: 20px;
                    border-radius: 4px;
                    line-height: 20px;
                    text-align: center;
                    color: #fff;
                    background: #ff8487;
                    font-size: 14px;
                    margin-left: 15px;
                    position:relative;
                    top:4px;
                    border:none !important;
                }
                </style>    
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="ask-logo">
                <div class="logo-wrap"></div>
            </div>
            <div id="askStock">
                <!-- left -->
                <div class="frame-left fl">
                    <div id="online-teacher" class="frame">
                        <div class="wrap clear">
                            <div class="title">
                                <span class="fa-online"></span>
                                <span class="text">在线老师</span>
                                <span class="tip">有问必答，为您指点股道</span>
                            </div>
                            <div class="action refresh">
                                <span class="text">换一批</span>
                                <i class="fa fa-refresh"></i>
                            </div>
                            <div class="content clear"></div>
                        </div>
                    </div>
                    <div id="Answer" class="frame">
                        <div class="wrap">
                            <div class="b220">
                                <div class="type-title">
                                    <a class="item type-item" href="${ask_path}new/all/" data-id="new">最新回答</a>
                                    <a class="item type-item" href="${ask_path}best/all/" data-id="best">精彩回答</a>
                                </div>
                                <div class="sub-title cate-title">
                                    <a class="item cate-item" data-id="0" data-type="all">全部</a>
                                    <a class="item cate-item" data-id="3" data-type="gegu">个股</a>
                                    <a class="item cate-item" data-id="2" data-type="bankuai">板块</a>
                                    <a class="item cate-item" data-id="1" data-type="panmian">大盘</a>
                                    <a class="item cate-item" data-id="4" data-type="zhishi">知识</a>
                                </div>
                            </div>
                            <div class="content">
                                <c:forEach var="note" items="${noteList}">
                                    <div class="item" data-noteid="${note.noteid}">
                                        <div class="question clear">
                                            <span class="faquestion"></span>
                                            <a href="${ask_path}consultation/${note.noteid}.htm" target="_blank" class="content-wrap">
                                                ${note.questioncontent}
                                                <span class="judge-state onNum judge-state${note.onNum}">${note.onNum}人看涨</span>
                                                <span class="judge-state downNum judge-state${note.downNum}">${note.downNum}人看跌</span>
                                            </a>
                                        </div>
                                        <div class="answer clear">
                                            <div class="overflow">
                                                <span class="faanswer fl"></span>
                                                <a href="${ask_path}consultation/${note.noteid}.htm" target="_blank" class="fl content-wrap">${note.answercontent}</a>
                                            </div>
                                            <div class="info clear">
                                                <div class="user-photo fl" data-teacherid="${note.answeruserid}">
                                                    <a href="${ask_path}gegu/${note.answeruserid}/"><img src="${note.photo}" /></a>
                                                </div>
                                                <span class="user-name">${note.teachertitle}</span>
                                                <span class="time">${fn:substring(note.answertime,0,16)}</span>
                                                <span class="info-btn" data-id="${note.answeruserid}" data-name="${note.teachertitle}" data-price="${note.questionPrice}">向TA提问</span>
                                                <span class="fr count">
                                                    <span class="look"><i></i><span class="value">${note.note_readcount}</span></span>
                                                <span class="read"><i></i><span class="value">${note.answercount}</span></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- right -->
                <div class="frame-right fr">
                    <div class="hot-ask-container"></div>
                    <div class="trend-container"></div>
                    <div class="ranking-container"></div>
                </div>
            </div>
            <%@include file="../common/moudule-ask.jsp" %>
                <%@include file="../common/front-foot.jsp" %>
                    <!-- 在线老师 -->
                    <script type="text/html" id="onlineTeacher-template">
                        {{each}}
                        <div class="item clear" data-id="{{$value.answeruserid}}" data-name="{{$value.teachertitle}}">
                            <div class="teacher-head fl" data-teacherid="{{$value.answeruserid}}">
                                <a target="_blank" title="{{$value.teachertitle}}" href="${live_path}live/{{$value.answeruserid}}/">
                                    <img src="{{$value.photo}}" alt="{{$value.teachertitle}}" />
                                </a>
                            </div>
                            <div class="string fl">
                                <div class="name">{{$value.teachertitle}}</div>
                                <div class="tec-tag"><span class="style">{{$value.speaialtyname}}</span></div>
                                <div class="context">
                                    <span>回答<span style="margin:0 2px">{{$value.answercount}}</span>问题</span>
                                    <span style="margin:0 5px">{{$value.zancount}}人认为有帮助</span>
                                </div>
                                <div class="operative">
                                    <span class="trigger-ask" data-id="{{$value.answeruserid}}" data-name="{{$value.teachertitle}}" data-price="{{$value.questionPrice}}">提问</span>
                                    <span class="trigger-care care" data-type="{{$value.careType}}">{{$value.attentionText}}</span>
                                </div>
                            </div>
                        </div>
                        {{/each}}
                    </script>
                    <script src="/public/v2/base/yntool.js?20170705"></script>
                    <script type="text/javascript" src="/public/bundle/askStock.bundle.js?0730"></script>
                    </script>
    </body>

    </html>
