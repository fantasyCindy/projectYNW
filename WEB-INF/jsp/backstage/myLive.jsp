<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾 | 我的直播</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="${path}/private/backstage/css/backstage.css?0329">
                <link href="https://cdn.bootcss.com/element-ui/1.3.7/theme-default/index.css" rel="stylesheet">
                <%@ include file="../common/vue-common.jsp" %>
                <style>
                    .el-pagination{
                        text-align: center;
                        margin-top:15px;
                    }
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock" class="clear">
                <div class="container">
                    <%@ include file="_menu.jsp" %>
                        <!-- /*========================  right  ==========================*/ -->
                        <div class="right">
                            <div id="contentWrap">
                                <!-- begin -->
                                <div id="myLive">
                                    <div class="top">
                                        <span class="title">我的直播</span>
                                        <span class="ynbutton ynbutton-red" @click="enter">进入直播</span>
                                    </div>
                                    <div class="contentWrap">
                                        <table>
                                            <tr class="head">
                                                <td class="time">直播时间</td>
                                                <td class="subject">当日主题</td>
                                                <td class="participant_count">直播</td>
                                                <td class="popularity">人气</td>
                                                <td class="chat">互动</td>
                                                <td class="record">记录</td>
                                                <td class="operate">操作</td>
                                            </tr>
                                            <tr class="body" v-for='item in items' :class='["status"+item.status]'>
                                                <td class="time center" v-text='item._time'></td>
                                                <td class="subject" v-text='item.todaysubject'></td>
                                                <td class="participant_count center" v-text='item.broadCastingCount + "条"'></td>
                                                <td class="popularity center" v-text='item.popularity'></td>
                                                <td class="chat center" v-text='item.icount + "条"'></td>
                                                <td class="record center">
                                                    <a :href='item._link' v-text='item._linkText'></a>
                                                </td>
                                                <td class="operate" :class='[item._liveClose]' v-text='item._operateText' @click='liveRoomClose(item)'></td>
                                            </tr>
                                        </table>
                                    </div>
                                <el-pagination layout="prev, pager, next" @current-change="onPage" :total="total" :page-size="size" :current-page="page"></el-pagination>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script src="https://cdn.bootcss.com/element-ui/1.3.7/index.js"></script>
                <script src="/public/bundle/myLive.bundle.js?0127"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
