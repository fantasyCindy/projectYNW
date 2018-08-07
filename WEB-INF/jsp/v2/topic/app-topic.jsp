<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
        <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
            <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
pageContext.setAttribute("path", path);

%>
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

                <head>
                    <title>${topic.topic_title}</title>
                    <meta charset="utf-8">
                    <meta name="renderer" content="webkit">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                    <meta content=always name=referrer>
                    <meta http-equiv="Content-Language" content="zh-CN" />
                    <meta http-equiv="Cache-Control" content="no-siteapp" />
                    <meta name="baidu-site-verification" content="98ebBPqVhQ" />
                    <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="shortcut icon" href="/public/images/favicon.ico">
                    <link rel="stylesheet" href="${path}/public/module/qqface/sprite.css" />
                    <link rel="stylesheet" href="${path}/public/v2/topic/app-topic.css?20180606" />
                    <script>
                    var topic_id = '${topic.id}'
                    var path = "${path}"
                    </script>
                </head>

                <body>
                    <div class="header logo-bar">
                        <a href="http://m.live.yuetougu.com/"><img src="http://m.live.yuetougu.com/public/images/yn-h5/logo.jpg"></a>
                        <span class="textTop">约投顾</span>
                        <!-- <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniuwang.yueniu" class="download">下载APP</a> -->
                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniu.finance&ckey=CK1396958283535" class="download">下载APP</a>
                    </div>
                    <div class="app-download-wrap">
                        <div class="app-download">
                            <span class="download-line app-download-logo"><span class="app-logo"><img src="http://www.yuetougu.com/public/images/yn-h5/yn-logo.png" alt="" /></span></span>
                            <span class="download-line app-download-text">约投顾<i class="icon-line"></i><span class="icon-right">与牛有约，纵横股海</span></span>
                            <span class="download-line app-download-btn"><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniuwang.yueniu" class="download-btn">立即下载</a></span>
                        </div>
                    </div>
                    <div id="app-topic">
                        <div class="app-topic-common">
                            <div class="app-topic-bg"><img src="/public/v2/topic/images/app-topic-bg.jpg" alt="" />
                                <div class="app-topic-top">
                                    <div class="app-topic-content">
                                        <div class="app-topic-title">${topic.topic_title}</div>
                                        <div class="app-topic-description">
                                            <c:if test="${fn:length(topic.topic_content) > 75}">
                                                <div class="app-topic-content-long">${topic.topic_content}</div>
                                                <div class="app-topic-content-short">${fn:substring(topic.topic_content,0,75)}...</div>
                                                <div class="app-topic-carryout">[展开]</div>
                                            </c:if>
                                            <c:if test="${fn:length(topic.topic_content) <= 75}">
                                                ${topic.topic_content}
                                            </c:if>
                                            <div class="app-topic-time"><a>${fn:substring(topic.create_time,0,11)}</a></div>
                                            <div class="app-topic-msg">
                                                <span class="app-topic-msg-item app-topic-msg-host">主持人：${topic.nickname}</span>
                                                <span class="app-topic-msg-item app-topic-msg-num">投顾讨论：
                                                <c:if test="${topic.commentCount == null}">0</c:if>
                                                ${topic.commentCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="app-topic-guests">
                                    <div class="app-topic-guests-title">参与嘉宾</div>
                                    <div class="app-topic-guests-items">
                                        <c:if test="${fn:length(topic.teacherList) < 1}">
                                            <div class="topic-comment-none">
                                                <div class="topic-comment-none-icon"><img src="/public/v2/topic/images/none.png" alt="" /></div>
                                                <div class="topic-comment-nont-text">暂无参与嘉宾</div>
                                            </div>
                                        </c:if>
                                        <div class="guest-short">
                                            <c:forEach items="${topic.teacherList}" var="list" begin="0" end="1">
                                                <div class="app-topic-guests-item clear">
                                                    <div class="app-guests-photo"><img src="${list.photo}" alt="" /></div>
                                                    <div class="app-guests-msg">
                                                        <div class="app-guests-name">${list.title}<i class="app-guests-icon"><img src="${list.type_ioc}" alt="" /></i></div>
                                                        <c:if test="${fn:length(list.description) > 32}">
                                                            <div class="app-guests-description">${fn:substring(list.description,0,32)}...</div>
                                                        </c:if>
                                                        <c:if test="${fn:length(list.description) <= 32}">
                                                            <div class="app-guests-description">${list.description}</div>
                                                        </c:if>
                                                    </div>
                                                </div>
                                            </c:forEach>
                                        </div>
                                        <c:if test="${fn:length(topic.teacherList) > 2}">
                                            <div class="guest-long">
                                                <c:forEach items="${topic.teacherList}" var="list">
                                                    <div class="app-topic-guests-item clear">
                                                        <div class="app-guests-photo"><img src="${list.photo}" alt="" /></div>
                                                        <div class="app-guests-msg">
                                                            <div class="app-guests-name">${list.title}<i class="app-guests-icon"><img src="${list.type_ioc}" alt="" /></i></div>
                                                            <c:if test="${fn:length(list.description) > 32}">
                                                                <div class="app-guests-description">${fn:substring(list.description,0,32)}...</div>
                                                            </c:if>
                                                            <c:if test="${fn:length(list.description) <= 32}">
                                                                <div class="app-guests-description">${list.description}</div>
                                                            </c:if>
                                                        </div>
                                                    </div>
                                                </c:forEach>
                                            </div>
                                        </c:if>
                                    </div>
                                    <c:if test="${fn:length(topic.teacherList) > 2}">
                                        <div class="app-topic-guests-more">点击更多</div>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                        <div class="app-topic-comments">
                            <div class="app-topic-comments-bar">
                                <div class="app-topic-comments-title">圆桌讨论</div><span class="app-comments-tool"></span></div>
                            <div class="app-topic-comments-items">
                            </div>
                        </div>
                    </div>
                    <footer>
                        <nav>
                            <ul>
                                <li><a href="/mobile/m-live.htm" title="关于我们">首页</a></li>
                                <li><a href="/m-about.htm" title="关于我们">关于我们</a></li>
                                <li><a href="/m-law.htm" title="法律声明">法律声明</a></li>
                                <li><a href="/m-mianze.htm" title="免责条款">免责条款</a></li>
                                <li><a href="/m-fengxian.htm" title="风险提示">风险提示</a></li>
                                <li><a href="/m-help.htm" title="帮助中心">帮助中心</a></li>
                            </ul>
                        </nav>
                        <p class="tc">Copyright©2018云南产业投资管理有限公司</p>
                    </footer>
                    </script>
                    <script src="http://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
                    <script src="/public/v2/topic/app-topic.bundle.js?201806216888"></script>
                    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
                    <script src="/public/js/wxShare.js"></script>
                    <script>
                    var is_weixin = function() {
                        var ua = navigator.userAgent.toLowerCase();
                        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                            return true;
                        } else {
                            return false;
                        }
                    }()
                    var is_QQ = function() {
                        var ua = navigator.userAgent.toLowerCase();
                        if (ua.match(/qq/i)) {
                            return true;
                        } else {
                            return false;
                        }
                    }()
                    var is_weibo = function() {
                        var ua = navigator.userAgent.toLowerCase();
                        if (ua.match(/weibo/i)) {
                            return true;
                        } else {
                            return false;
                        }
                    }()

                    if (is_QQ || is_weixin || is_weibo) {
                        $('.app-download-wrap').css('display', 'block')
                    }

                    wxShare({
                        title: '${topic.topic_title}',
                        desc: '${fn:substring(topic.topic_content,0,25)}...',
                        link: path + '/app/appTopic.htm?topic_id=' + '${topic.id}',
                        imgUrl: 'http://www.yuetougu.com/public/images/yn-h5/yn-logo.png'
                    })

                    var _hmt = _hmt || [];
                    (function() {
                        var hm = document.createElement("script");
                        hm.src = "https://hm.baidu.com/hm.js?cdf5cc671e64a2ce9d27df535342c9ae";
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(hm, s);
                    })();

                    var href = window.location.href
                    var match = href.match(/\&from=(h5)/)
                    var from = match ? match[1] : ''
                    if (from == 'h5') {
                        $('.logo-bar').show()
                        $('footer').show()
                        $('.app-download-wrap').hide()
                    } else {
                        $('.logo-bar').hide()
                        $('footer').hide()
                    }

                    if (href.indexOf("app=yngp") != '-1') {
                        $('.textTop').html("约牛股票")
                    }
                    </script>
                </body>

                </html>
