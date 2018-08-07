<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329" />
                <link href="/public/css/message.css?0329" rel="stylesheet">
                <style>
                #myInfo{
                    margin-top:18px;
                }
                #mycare {
                    margin: 20px auto;
                }
                
                .topic-item {
                    border-left: 1px solid #ffadb2;
                    margin-left: 9px;
                    padding: 10px 14px 0 14px;
                }
                
                .topic-item-photo {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                }
                
                .topic-item-photo img {
                    width: 100%;
                }
                
                .topic-item-content {
                    display: inline-block;
                    width: 93%;
                    height: 60px;
                    line-height: 50px;
                    position: relative;
                    top: -18px;
                    font-size: 15px;
                    border-bottom: 1px dashed #DCDCDC;
                }
                
                .topic-item-content-name {
                    display: inline-block;
                    margin: 0 10px;
                }
                
                .topic-teacher-icon {
                    display: inline-block;
                    width: 12px;
                    height: 14px;
                    background: url(/public/sprite/dist/referStatus.png);
                    background-position: -283px -25px;
                    margin: 0 10px;
                    position: relative;
                    top: 2px;
                }
                
                .topic-item-title a {
                    margin: 0 15px;
                    color: red;
                }
                
                .topic-item-time {
                    display: inline-block;
                    float: right;
                    color: #999;
                    font-size: 13px;
                }
                
                .topic-date {
                    color: #999;
                    background: url(/public/images/time_icon.png) no-repeat;
                    background-color: white;
                    padding-left: 27px;
                }
                
                .loadMore {
                    line-height: 40px;
                    text-align: center;
                    background: #ececec;
                    width: 96%;
                    margin-left: 20px;
                    color: #626161;
                    cursor: pointer;
                }
                #contentWrap{
                    padding-top:0;
                }
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right">
                        <div id="contentWrap">
                            <div class="title-1">我关注的话题</div>
                            <div id="mycare">
                                <div class="items"></div>
                                <div class="loadMore" id="#loadMore">加载更多></div>
                            </div>
                        </div>
                    </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/bundle/myCare_teacher.bundle.js?0127"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
