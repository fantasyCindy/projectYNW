<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>${articletitle}_个股大盘涨跌停推荐-约投顾 </title>
            <meta name="keywords" content="${articletitle},个股大盘涨跌停推荐,今日股市行情分析,约牛观点,约投顾" />
            <meta name="description" content="${articletitle},${articlecontent},个股大盘涨跌停推荐,今日股市行情分析,约牛观点,约投顾" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="${path}/public/module/qqface/sprite.css?123" />
                <link rel="stylesheet" href="/public/css/opinionDetail.css?03291" />
                <script src="/public/js/bdshare.js"></script>
                <script>
                var __detail = {
                    teacherId: '${teacher[0].teacherid}',
                    userId: "${teacher[0].user_id}",
                    id: '${article.article_id}'
                }
                var __name = {
                    "鉴股": "jiangu",
                    "大盘": "dapan",
                    "题材": "ticai",
                    "股票学院": "gupiaoxueyuan",
                }
                var __classifyName = "${article.classifyName}"
                </script>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="navg">
                <a href="${path}/index.htm">首页</a>
                <i class="fa fa-angle-right"></i>
                <a href="${opinion_path}">观点</a>
                <i class="fa fa-angle-right"></i>
                <a class="dapan" href="#">${article.classifyName}</a>
                <i class="fa fa-angle-right"></i>
                <a href="#">${article.title}</a>
            </div>
            <div id="newsDetail">
                <div class="news">
                    <div class="wrap b220">
                        <div class="article-content">
                            <div class="opinion-title" id="opinion-detail-title">${article.title}</div>
                            <div class="opinion-publish">
                                <span class="publish-source" data-id="${article.create_id}">${teacher[0].title}</span>
                                <span class="publish-date">${fn:substring(article.create_time,0,16)}</span>
                                <span>阅读(<span id="view-count-value">${article.viewnumber}</span>)</span>
                                <span class="hide">点赞(<span class="likeCount" id="like-count-value">${article.zan_count}</span>)</span>
                            </div>
                            <div id="relativeStock" class="hide" data-code="${article.stockcode}">
                                <span class="txt">相关股票：</span>
                                <a class="stockcode yn-code" data-code="${article.stockcode}" href="/marketLine.htm?stockcode=${article.stockcode}" target="_blank">${article.stockcode} ${article.stockname}</a>
                                <span class="stocktrend trend${article.stock_trend}">${article.stock_trend_text}</span>
                            </div>
                            <div class="content" id="articleContent">${article.content}</div>
                            <div class="tip">
                                <p class="tip-title">风险提示：以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎。</p>
                            </div>
                        </div>
                        <!-- 赞赏功能 -->
                        <div class="addition">
                            <div id='article-actions'>
                                <div class='action support'><span class='txt'>赏</span></div>
                                <div class="support-users">
                                    <div class="length hide"><span class="value"></span>人打赏</div>
                                    <div class="items center"></div>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="inline like">
                                    <i class="icon yn-icon-like"></i>
                                    <span class="txt" id="zanCountValue">${article.zan_count}</span>
                                </div>
                                <div class="inline share">
                                    <i class="yn-icon-share"></i>
                                    <span class="txt">分享</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--相关阅读-->
                    <div id="related">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">相关阅读</span>
                        </div>
                        <div class="items">
                            <c:forEach items="${beforeList}" var="befor">
                                <a href="${opinion_path}opinion/${befor.article_id}.htm" target="_blank">
                                    <div class="item">
                                        <div class="item-left">
                                            <img src="${befor.image_path }" alt="">
                                        </div>
                                        <div class="item-right">
                                            <div class="item-title">${befor.title}</div>
                                            <div class="item-content">${befor.content}</div>
                                        </div>
                                    </div>
                                </a>
                            </c:forEach>
                        </div>
                    </div>
                    <div id="article-common">
                        <!-- 精彩评论 -->
                        <div class="comment b220 bg-white">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span>
                                <span class="txt">精彩评论</span>
                            </div>
                            <div class="items"></div>
                        </div>
                        <!-- 发表 -->
                        <div class="yncomment"></div>
                    </div>
                </div>
                <!-- right -->
                <div class="frame-right">
                    <div class="right-container">
                        <!-- 个人简介 -->
                        <div class="person-info">
                        </div>
                        <!-- 直播 -->
                        <div class="person-live">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span>
                                <span class="txt">TA的直播</span>
                            </div>
                            <a class="more" href="${live_path}live/" target="_blank">
                                <span class="txt">更多</span>
                                <i class="fa fa-angle-right fa-lg"></i>
                            </a>
                            <div class="items"></div>
                        </div>
                        <!-- 问股 -->
                        <div class="person-answer">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span>
                                <span class="txt">TA的问股</span>
                            </div>
                            <a class="more" href="${ask_path}gegu/" target="_blank">
                                <span class="txt">更多</span>
                                <i class="fa fa-angle-right fa-lg"></i>
                            </a>
                            <div class="items"></div>
                        </div>
                        <!-- 问股 -->
                        <div class="person-opinion">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span>
                                <span class="txt">TA的观点</span>
                            </div>
                            <a class="more" href="${opinion_path}dapan/" target="_blank">
                                <span class="txt">更多</span>
                                <i class="fa fa-angle-right fa-lg"></i>
                            </a>
                            <div class="items"></div>
                        </div>
                    </div>
                    <div class="namecard"></div>
                </div>
            </div>
            <div style="clear:both;"></div>
            <!-- 精彩评论 -->
            <script type="text/html" id="comment-template">
                {{each}}
                <div class="comment-item {{$value._style}}">
                    <div class="avatar">
                        <img src="{{$value.createPhoto}}">
                    </div>
                    <div class="user_comment">
                        <div class="oh">
                            <span class="user_name">{{$value.createName}}</span>
                            <span class="comment_time">{{$value.create_time}}</span>
                            <a href="#ynPostComment" class="reply fr" data-userid="{{$value.create_id}}" data-name="{{$value.createName}}" data-id="{{$value.comment_id}}">回复</a>
                        </div>
                        <div class="user_comment_text"> {{#$value._reply}}{{#$value._content}}</div>
                    </div>
                </div>
                {{/each}}
            </script>
            <div class="bdsharebuttonbox" data-tag="share_questionDetail">
                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            </div>
            <!-- Table -->
            <script type="text/html" id="tableView-template">
                {{each}}
                <div class="tableView-item">
                    <a class="tableView-title" href="${ask_path}consultation/{{$value.noteid}}.htm" target="_blank">
                        <span class="value">{{$value._title}}</span>
                    </a>
                    <a class="tableView-content {{$value._class_content}}" href="${ask_path}consultation/{{$value.noteid}}.htm" target="_blank">{{$value._content}}</a>
                    <div class="tableView-info">
                        <span class="time {{$value._class_time}}">{{$value._time}}</span>
                        <span class="view {{$value._class_view}}">
                            <span class="txt">阅读</span>
                        <span class="value">{{$value._count_view}}</span>
                        </span>
                        <span class="zan {{$value._class_zan}}">
                                <span class="txt">赞</span>
                        <span class="value">{{$value._count_zan}}</span>
                        </span>
                        <span class="comment {{$value._class_comment}}">
                             <span class="txt">评论</span>
                        <span class="value">{{$value._count_comment}}</span>
                        </span>
                    </div>
                </div>
                {{/each}}
            </script>
            <!-- 观点 -->
            <script id="bestOpinion-list-template" type="text/html">
                {{each}}
                <div class="bestOpinion-item">
                    <div class="bestOpinion-item-title">
                        <span class="yn-icon-circle"></span>
                        <a href="${opinion_path}opinion/{{$value.article_id}}.htm" target="_blank" class="value">{{$value.title}}</a>
                    </div>
                    <div class="bestOpinion-item-content">
                        <a href="${opinion_path}opinion/{{$value.article_id}}.htm" target="_blank" class="value">{{$value._content}}</a>
                    </div>
                    <div class="bestOpinion-item-info">
                        <span class="time">{{$value.create_timeStr}}</span>
                        <span class="view">阅读 : {{$value.viewnumber}}</span>
                    </div>
                </div>
                {{/each}}
            </script>
            <%@ include file="../common/module-face.jsp" %>
                <%@ include file="../common/moudule-ask.jsp" %>
                    <%@ include file="../common/front-foot.jsp" %>
                    <script src="/public/v2/base/yntool.js?20170705"></script>
                        <script src="/public/bundle/opinionDetail.bundle.js?0730"></script>
    </body>

    </html>
