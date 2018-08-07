<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>${head.video.title}</title>
            <meta name="keywords" content="${head.video.keywords}" />
            <meta name="description" content="${head.video.description}" />
            <%@ include file="/WEB-INF/jsp/common/front-common.jspf" %>
                <link href="/private/video/css/videoDetail.css" rel="stylesheet" />
                <script>
                var videoId = '${video.video_id}';
                var videoUrl = '${video.video_url}';
                var videoSrc = '${video.video_src}';
                var teacherId = '${video.teacher_id}';
                var teacherName = '${video.teacherName}';
                </script>
    </head>
    <!-- 分享 -->
    <div class="bdsharebuttonbox" data-tag="share_questionDetail">
        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
    </div>
    <%@include file="../common/front-head.jsp" %>
        <!-- 视频容器 -->
        <div id="video">
            <div id="video-container"></div>
        </div>
        <!-- END -->
        <div class="container " id="videoDetail">
            <div class="videoDetail-left shadow">
                <!-- 视频说明  -->
                <div id="videoInfo">
                    <div class="imgw">
                        <img src="${video.image}">
                    </div>
                    <div class="info">
                        <h2 class="title">${video.title}</h2>
                        <div class="line line2">
                            <span class="name">讲师：<span class="t-name">${video.teacherName}</span></span>
                            <span class="time"></span>
                            <span class="view">浏览：${video.look_count}</span>
                        </div>
                        <p class="content">${video.content}</p>
                    </div>
                </div>
                <!-- 分享 -->
                <div class="actions">
                    <div class="like inline">
                        <span class="yn-icon-like"></span>
                        <span class="likeCount txt">${video.zan_count}</span>
                    </div>
                    <div class="share inline">
                        <span class="yn-icon-share"></span>
                        <span class="txt">分享</span>
                    </div>
                </div>
                <div class="commentBar">
                    <!-- 发布评论 -->
                    <div id="pubComment">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">发表评论</span>
                        </div>
                        <textarea name="" id="pubContent" placeholder="快来发表伟大言论吧!" cols="30" rows="5"></textarea>
                        <div class="wordCountWrap"><span id="wordCount">200</span>/200</div>
                        <button>提交</button>
                    </div>
                    <!-- 视频评论 -->
                    <div id="videoComment">
                        <div class="yn-title-1">
                            <span class="yn-title-1-icon"></span>
                            <span class="txt">精彩评论(${video.comment_count})</span>
                        </div>
                        <div class="items"></div>
                    </div>
                </div>
            </div>
            <!-- 相关课程 -->
            <div id="relative" class="videoDetail-right shadow">
                <div class="yn-title-1">
                    <span class="yn-title-1-icon"></span>
                    <span class="txt">相关课程</span>
                </div>
                <div class="items"></div>
            </div>
        </div>
        <div class="clearfix"></div>
        <%@include file="../common/front-foot.jsp" %>
            <!-- 相关课程 -->
            <script id="relative-template" type="text/html">
                {{each}}
                <a class="item" href="${video_path}video/{{$value.video_id}}.htm">
                    <div class="imgw">
                        <img src="{{$value.image}}" />
                    </div>
                    <div class="title">{{$value.title}}</div>
                </a>
                {{/each}}
            </script>
            <!-- 视频评论 -->
            <script id="video-comment-template" type="text/html">
                {{each}}
                <div class="item">
                    <span class="imgw">
                      <img src="{{$value.createPhoto}}" />
                    </span>
                    <div class="comment">
                        <p class="name">{{$value.createName}}</p>
                        <p class="content">{{$value.content}}</p>
                    </div>
                    <div class="time">{{$value.create_time}}</div>
                </div>
                {{/each}}
            </script>
            <script src="/public/source/yndata.min.js"></script>
            <script src="/public/js/bdshare.js"></script>
            <script type="text/javascript" src="//player.youku.com/jsapi"></script>
            <script src="/public/bundle/videoDetail.bundle.js?v=20170214131312"></script>
            <script>
            var time = '${video.create_time}'
            time = time.substr(0, 10)
            $('.time').html(time)
            console.log(time)

            var name = '${video.teacherName}'
            console.log('name',name)
            if(!name){
                console.log('ddd')
                $('.t-name').text('约投顾')
            }
            </script>
            </body>

    </html>
