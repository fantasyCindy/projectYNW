<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>${questioncontent}_今日个股大盘涨跌停推荐查询-约投顾 </title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta name="keywords" content="${questioncontent},今日个股大盘涨跌停推荐查询,约投顾问股,约投顾" />
                <meta name="description" content="${questioncontent},${answercontent},与牛人相约,约投顾股民问股,名师回答。" />
                <link href="/private/askStock/css/askStockDetail.css?070301" rel="stylesheet" />
                <script src="/public/js/bdshare.js"></script>   
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
                .stock{
                    color: #5187e9;
                    margin: 0 34px 12px;
                }
                </style> 
                <script>
                    var is_reply = "${note[0].is_reply}";  //0待回答1已回答2已忽略3已过期
                </script>   
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="navg">
                <a href="/index.htm">首页</a>
                <i class="fa fa-angle-right"></i>
                <a class="gegu" href="${ask_path}new/all/">问股</a>
                <i class="fa fa-angle-right"></i>
                <a href="#">问股详情</a>
            </div>
            <div id="askStockDetail">
                <div class="left">
                    <!-- 问题 -->
                    <div class="question frame" id="detailQuestion">
                        <c:forEach items="${note}" var="note">
                            <div class="line line1">
                                <span class="icon"></span>
                                <span class="name" id="questionName">${note.questioncontent}</span>
                            </div>
                                <div class="stock">${note.stockcode}${note.stockname}</div>
                            <div class="line line2">
                                <span class="puber" data-inside='${note.is_inside}' data-id="${note.questionuserid}">${note.questionusername}</span>
                                <span class="time hide">${note.questiontime}</span>
                                <span class="qPrice">价格<span class="askPrice">
                                    <c:if test="${note.questionPrice == null}">￥0</c:if>
                                    <c:if test="${note.questionPrice != null}">￥${note.questionPrice}</c:if>
                                </span></span>
                                <span class="from hide">来源：<span class="value">${note.source_name}</span></span>
                                <div class="share">
                                    <div class="shareIcon inline">
                                        <span class="fa fa-share-alt"></span>
                                        <span class="txt">分享</span>
                                    </div>
                                </div>
                            </div>
                        </c:forEach>
                    </div>
                    <!-- 回答 -->
                    <div class="answer">
                        <div class="items">
                            <c:forEach items="${note_answer}" var="answer">
                                <div class="item">
                                    <div class="line line1">
                                        <span class="imgw" data-teacherid="${answer.answeruserid}"><img src="${answer.photo}"></span>
                                        <span class="name">${answer.answerusername}</span>
                                        <p class="time"><span>${answer.answertime}</span></p>
                                        <a class="living hide" href="/live/${answer.answeruserid}/" target="_blank">正在直播</a>
                                    </div>
                                    <div class="line line2">
                                        <div class="contents">${answer.answercontent}</div>
                                    </div>
                                    <div class="info overflow">
                                        <div class="action fl action-help">
                                            <span class="icon help">
                                                
                                            </span>有帮助(<span class="txt">${answer.zancount}</span>)
                                        </div>
                                        <div class="action fl action-use hide">
                                            <span class="icon use"></span>
                                            <span class="txt">采纳</span>
                                        </div>
                                        <div class="up fl hide">
                                            <span class="icon "></span>
                                            <span class="txt">看涨</span>
                                        </div>
                                        <div class="down fl hide">
                                            <span class="icon "></span>
                                            <span class="down">看跌</span>
                                        </div>
                                    </div>
                                    <div class="accept accept-icon hide"></div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                    <!-- 未回答 -->
                    <div class="is_reply is_reply-item${note[0].is_reply}">
                        <div class="is-reply-content is_reply${note[0].is_reply}"></div>
                        <div class="is-reply-text">
                            <c:if test="${note[0].is_reply == 0 || note[0].is_reply == 2}">投顾尚未回复，请耐心等待</c:if>
                            <c:if test="${note[0].is_reply == 3}">投顾被外星人抓走了，无法回复此问题</c:if>
                    </div>
                        <div class="is-reply-btn">去直播间看看</div>
                    </div>
                    <!-- 风险提示 -->
                    <div class="tip frame">
                        <span class="icon"></span>
                        <span class="txt">风险提示：【以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎】</span>
                    </div>
                    <!-- 回答提问 -->
                    <div id="answerWindow" class="hide">
                        <div class="answerWindow-wrap">
                            <div class="title">
                                <i class="icon-title fa fa-edit"></i>
                                <div class="name">回答问题</div>
                            </div>
                            <div class="hide question"></div>
                            <div class="content">
                                <div class="top">
                                    <div class="category action hide">
                                        <span class="name">选择分类：</span>
                                        <div class="items inline">
                                            <span class="item askStock-category-item" data-id="2">个股</span>
                                            <span class="item askStock-category-item" data-id="1">板块</span>
                                            <span class="item askStock-category-item" data-id="0">大盘</span>
                                            <span class="item askStock-category-item" data-id="3">知识</span>
                                        </div>
                                    </div>
                                    <div class="judge action" style="display: none">
                                        <span class="stockInfo">趋势判断：<span class="value"></span></span>
                                        <button class="judge-item judge-item0 up" data-id="0">看涨<i class="fa fa-long-arrow-up"></i></button>
                                        <button class="judge-item  judge-item1 down" data-id="1">看跌<i class="fa fa-long-arrow-down"></i></button>
                                    </div>
                                </div>
                                <script id="answerWindow-edit" type="text/plain"></script>
                                <div class="bottom">
                                    <div class="search">
                                        <input type="text" placeholder="搜索股票" id="showStockList">
                                        <i class="fa fa-search"></i>
                                    </div>
                                </div>
                            </div>
                            <button class="submit">提交</button>
                        </div>
                    </div>
                </div>
                <!-- right -->
                <div class="right">
                    <div class="ask frame">
                        <div class="column column1">
                            <i class="icon"></i>
                            <span class="txt  ask-title"></span>
                        </div>
                        <div class="column column2">
                            <div class="line line1">
                                <i class="icon"></i>
                                <span class="number questionCount">0</span>
                                <span class="txt"></span>
                            </div>
                            <div class="line line2">
                                <span>已提问问题数</span>
                            </div>
                        </div>
                    </div>
                    <div class="chart frame hide">
                        <div class="content"></div>
                    </div>
                    <div class="hot-ask-container"></div>
                </div>
            </div>
            <div class="bdsharebuttonbox" data-tag="share_questionDetail">
                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            </div>
            <%@include file="../common/moudule-ask.jsp" %>
                <%@include file="../common/front-foot.jsp" %>
                    <script src="/public/v2/base/yntool.js?20170705"></script>
                    <script type="text/javascript" src="/public/ueditor/ueditor.config.js"></script>
                    <script type="text/javascript" src="/public/ueditor/ueditor.all.min.js"></script>
                    <script type="text/javascript" src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
                    <script src="/public/bundle/askStockDetail.bundle.js?0730"></script>
                    <script>
                    var time = $('.answer .time').text()
                    time = time.substr(0, 16)
                    $('.answer .time').html(time)
                    </script>
    </body>
