<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/all.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css" />
            <style>
            .help .title-1 {
                margin-bottom: 10px;
            }
            
            .help .items {
                padding: 20px;
            }
            
            .help .item {
                margin: 10px 0;
                line-height: 25px;
                padding-top: 15px;
                border-top: 1px solid rgb(240, 240, 240);
            }
            
            .help .item:first-child {
                border-top: none;
            }
            
            .help .item .title {
                font-size: 16px;
                color: #cf1928;
            }
            </style>
    </head>

    <body>
        <%@include file="../common/head.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="contentWrap">
                            <div class="title-1">帮助中心</div>
                            <div class="content help">
                                <div class="items">
                                    <div class="item">
                                        <div class="title">什么是股市直播?</div>
                                        <div class="content">约投顾股市直播间是直播播主与投资者的网上互动交流平台。播主通过在自己的直播间，及时发布最新看法和观点，投资者通过互动栏与播主进行实时沟通交流，共同学习、切磋和进步。</div>
                                    </div>
                                    <div class="item">
                                        <div class="title">如何与老师进行沟通？</div>
                                        <div class="content">在右侧"互动栏"与播主和股友进行及时交流。</div>
                                    </div>
                                    <div class="item">
                                        <div class="title">给老师提问?</div>
                                        <div class="content">在直播右侧"我要发纸条"，提交内容直接与播主沟通。</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <%@include file="../common/foot.jsp" %>
            <script src="/private/backstage/js/backstage.js"></script>
                <script type='text/javascript'>
                $(function() {
                    yn.centerMenu.init();
                    yn.centerMenu.render();
                })
                </script>
    </body>

    </html>
