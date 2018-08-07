<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../v2/seo-v2.jspf" %>
            <title>${head.live.title}</title>
            <meta name="keywords" content="${head.live.keywords}" />
            <meta name="description" content="${head.live.description}" />
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link href="/public/v2/live-list/living.css?03291" rel="stylesheet">
             <link href="/public/v2/base/layer.css" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="/public/css/unslider.css" />
    </head>

    <body>
        <!-- 引入头部 -->
        <%@ include file="../v2/front-head-v2.jsp" %>
        <div id="ynlive_list" class="yn-wrap">
            <div id="homeslide" class="slide">
                
            </div>
        </div>
        <div class="yn-wrap">
            <div class="wrap-fl live-left">
                <div id="trends">
                    <p class="title-1">
                        <i class="title-icon"></i>
                        <span class="text">直播动态</span>
                    </p>
                    <div class="trends-list frame-shadow">
                        
                    </div>
                </div>
                <div id="hall" class="hot-live">
                    <p class="title-1">
                        <i class="title-icon"></i>
                        <span class="text">直播大厅</span>
                        <span class="title-btn thisclass" data-type="1">人气榜</span>
                        <span class="title-btn" data-type="2">活跃榜</span>
                    </p>
                    <div class="hall-list clear content">
                        
                    </div>
                </div>
            </div>
            <div id="emerging" class="wrap-fr">
                <p class="title-1">
                    <i class="title-icon"></i>
                    <span class="text">新晋直播</span>
                </p>
                <div class="emerging-list frame-shadow">
        
                </div>
            </div>
        </div>
        <%@ include file="../common/moudule-ask.jsp" %>
        <%@ include file="../v2/front-foot-v2.jsp" %>
        <script src="/public/js/velocity.js?695"></script>
        <script src="/public/js/velocity.ui.js?695"></script>
        <script type="text/javascript" src="/public/v2/live-list/solider.js?26565"></script>
        <script type="text/javascript" src="/public/js/template.js"></script>
        <script type="text/javascript" src="/public/v2/live-list/main.bundle.js?0730"></script>
        <script type="text/javascript">
            var posterTvGrid86804 = new posterTvGrid(
                'homeslide', {
                    className: "posterTvGrid",
                    hotcode: true
                },
                [
                { "img": "/public/v2/live-list/images/live-yingjia.jpg?0122", "title": "", "url": "http://live.yuetougu.com/live/71/" },
                { "img": "/public/v2/live-list/images/live-jiawenmeng.jpg?08061", "title": "", "url": "http://live.yuetougu.com/live/12/" },
                { "img": "/public/v2/live-list/images/live-xiyangyang.jpg?08061", "title": "", "url": "http://live.yuetougu.com/live/19/" },
                { "img": "/public/v2/live-list/images/boduan_live.jpg", "title": "", "url": "http://live.yuetougu.com/live/62/" },
                ]
            );
        </script>
    </body>

    </html>
