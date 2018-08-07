<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329" />
            <link rel="stylesheet" href="/private/backstage/css/myNewsPush.css?03291" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="myNews" class="clear">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="content">
                            <div class="title-1">消息推送</div>
                            <div class="fans-menu">
                                <div class="menu">
                                    <table>
                                        <tr>
                                            <td class="select" data-type="0"><span>粉丝用户</span></td>
                                            <td class="menu-item" data-type="1"><span class="record">发送纪录</span><span class="mass">向粉丝群发</span></td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="fans"></div>
                            </div>
                            <div class="record-menu">
                                <div class="menu">
                                    <table>
                                        <tr>
                                            <td class="select" data-type="0"><span>粉丝用户</span></td>
                                            <td class="menu-item" data-type="1"><span class="fansuser">粉丝用户</span></td>
                                        </tr>
                                    </table>
                                </div>
                                <div id="record">
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <script type="text/html" id="fansBar">
                {{each userList}}
                <div class="fans-list" id="{{$value.user_id}}">
                    <div class="fans-user fl"><img src="{{$value.photo}}" /></div>
                    <div class="user-content fl">
                        <p class="title">{{$value.nickname}}</p>
                        <p class="direction">投资方向:{{$value.investment_styleName}}</p>
                        <p class="time">关注时间:{{$value.create_time}}</p>
                        <p class="delete" data-id="{{$value.user_id}}"><i class="icon fa fa-trash-o"></i>删除粉丝</p>
                    </div>
                </div>
                {{/each}}
            </script>
            <script type="text/html" id="recordBar">
                {{each}}
                <p class="leader"><i class="icon fa fa-circle"></i>向 粉丝 群发<span class="time">{{$value.createtime}}</span></p>
                <div class="record-wrap">
                    <p class="title"><span>{{$value.tmessagetitle}}</span><i class="icon fa fa-angle-down"></i></p>
                    <div class="content">{{#$value.tmessagecontent}}</div>
                </div>
                {{/each}}
            </script>
            <%@include file="../common/moudule-mass.jsp" %>
                <%@ include file="../common/front-foot.jsp" %>
                    <script src="/public/source/ynmodule.min.js"></script>
                    <script src="/public/ueditor/ueditor.config.js"></script>
                    <script src="/public/ueditor/ueditor.all.js"></script>
                    
                    <script src="/public/bundle/myFans.bundle.js"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
