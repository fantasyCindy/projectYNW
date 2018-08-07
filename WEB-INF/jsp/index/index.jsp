<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../v2/seo-v2.jspf" %>
            <title>${head.index.title}</title>
            <meta name="keywords" content="${head.index.keywords}" />
            <meta name="description" content="${head.index.description}" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/public/v2/index/index.css?v=201807301" />
                <link rel="stylesheet" href="/public/v2/index/layer.css?v=4993" />
                <script>
                var room_teacherid = "${teacher.teacherid}";
                </script>
    </head>

    <body>
        <div id="toTopWin" class="hide">
            <div class="toTop">
                <div class="middle">
                    <img style="float:right;position:relative;top:-25px;" src="/public/images/niugu.png" alt="" />
                </div>
                <div class="know"></div>
            </div>
        </div>
        <div id="price1" class="hide">
            <div class="toTop">
                <div class="close"></div>
                <div class="middle">
                    <img src="/public/v2/index/images/bounced.png?0321" alt="" />
                </div>
                <a href="${neican_path}reference/138.htm" target="_blank" class="know"></a>
            </div>
        </div>
        <%@include file="../v2/front-head-v2.jsp" %>
            <!-- 轮播图 -->
            <div class="banner-wrap relative overflow">
                <div class="banner banner-bg">
                    <ul class="overflow">
                        <li class="banner-list first-slider  slider-item  banner-list4" data-img="/public/v2/index/images/bg3.jpg?1">
                            <span class="bgcolor"></span>
                        </li>
                        <li class="banner-list  slider-item  banner-list4" data-img="/public/v2/index/images/bg2.jpg?1">
                            <span class="bgcolor"></span>
                        </li>
                        <li class="banner-list  slider-item  banner-list4" data-img="/public/v2/index/images/bg4.jpg?1">
                            <span class="bgcolor"></span>
                        </li>
                        <li class="banner-list  slider-item  banner-list4" data-img="/public/v2/index/images/bg4.jpg?1">
                            <span class="bgcolor"></span>
                        </li>
                    </ul>
                    <div class="yn-wrap" style="width:1200px;height: 400px;margin: 0 auto;position: relative;">
                        <a class="next banner-arrow unslider-arrow cursor">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </a>
                        <a class="prev banner-arrow unslider-arrow cursor">
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <div class="banner-content">
                    <div class="banner-left fl">
                        <!--  <div class="banner-num overflow">
                            <div class="banner-num-list"></div>
                        </div> -->
                        <div class="banner-left-icon">业界观点</div>
                        <div class="banner-item"></div>
                    </div>
                    <div class="banner-center fl relative overflow">
                        <div class="banner-small-wrap banner-center-wrap">
                            <!-- Banner图的数量和背景幻灯片的数量保持一致 -->
                            <a <a href="${live_path}live/19" target="_blank" class="fl banner-small first-slider slider-item  banner-small5" data-img="/public/v2/index/images/banner-xiyangyang.jpg?0806"></a>
                            <a href="${live_path}live/62" target="_blank" class="fl banner-small slider-item  banner-small5" data-img="/public/v2/index/images/banner-boduan.jpg?0717"></a>
                            <a href="${live_path}live/71" target="_blank" class="fl banner-small slider-item  banner-small5" data-img="/public/v2/index/images/banner-yingjia.jpg?0427"></a>
                            <a href="${live_path}live/12" target="_blank" class="fl banner-small slider-item  banner-small5" data-img="/public/v2/index/images/banner-jia.jpg?0806"></a>
                        </div>
                    </div>
                    <div class="banner-right fl overflow relative">
                        <div class="img-wrap banner-right-wrap">
                            <a href="${neican_path}refer/19" target="_blank">
                                <img class="banner-refer" src="${path}/public/v2/index/images/xiyangyang.jpg?20180622" alt="" />
                            </a>
                            <a href="${opinion_path}dapan/62" target="_blank">
                                <img class="banner-refer" src="${path}/public/v2/index/images/boduan.jpg?0801" alt="" />
                            </a>
                            <a href="${neican_path}refer/71/" target="_blank">
                                <img class="banner-refer" src="${path}/public/v2/index/images/yingjia.jpg?0420" alt="" />
                            </a>
                            <a href="${neican_path}refer/12/" target="_blank">
                                <img class="banner-refer" src="${path}/public/v2/index/images/jiawenmeng.jpg?0320" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="index-topic hide">
                    <span class="index-topic-icon">投顾圆桌</span>
                    <div class="index-topic-title">
                        <span class="index-topic-container">

            </span>
                        <span class="topic-teacher">

            </span>
                        <span class="topic-arrow hide">
              <a target="_blank">
                <i class="fa fa-angle-right"></i>
              </a>
            </span>
                    </div>
                </div>
            </div>
            <!-- 分为左右两侧 -->
            <div class="index-content yn-wrap">
                <div class="index-left wrap-fl">
                    <!-- <! 热门直播 -->
                    <div class="hot-live clear">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <a href="${live_path}/live/" target="_blank" class="text">直播解盘</a>
                            <span class="liveRoom_action select" data-type="2" data-show="live-active-first">活跃榜</span>
                            <span class="liveRoom_action" data-type="1" data-show="live-pop-first">人气榜</span>
                            <div class="action f1 fr cursor" data-type="live-active-first">
                                <span>换一批</span>
                                <i class="fa fa-refresh"></i>
                            </div>
                        </div>
                        <!-- 活跃榜first -->
                        <div class="content live-active-first">
                            <c:forEach items="${todayList}" var="list" begin="0" end="3" varStatus="status">
                                <div class="hot-live item ${(status.index + 1) % 2 == 0 ? 'fr':'fl'} frame-shadow ${list.status == 0 ? 'online' : 'offline'}" id="teacher${list.roomid}">
                                    <%-- ${item.icon} --%>
                                        <c:if test="${list.is_btop == 1}">
                                            <i class="btop btop1">
                        <img src="${list.tag_img}">
                      </i>
                                        </c:if>
                                        <div class="item-wrap ${list.status == 0 ? '' : 'color153'}">
                                            <div class="item-top overflow">
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" data-userid="${list.user_id}" class="avatar image border-radius fl">
                                                    <img src="${list.photo}" alt="${list.title}">
                                                </a>
                                                <div class="name fl">
                                                    <a href="${live_path}live/${list.teacherid}/" target="_blank">
                                                        <span class="teacherName f3 b">${list.title}</span>
                                                        <span class="color666 f2">
                              <i class='item-icon-guwen'>
                                <img src="${list.type_ioc}" alt="" />
                              </i>
                              ${list.type_name}</span>
                                                    </a>
                                                    <c:if test="${list.status == 0}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> ${fn:substring(list.todaysubject,0,18)}
                                                        </div>
                                                    </c:if>
                                                    <c:if test="${list.status == 1}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> 离线
                                                        </div>
                                                    </c:if>
                                                </div>
                                            </div>
                                            <div class="string f2 overflow relative">
                                                <div class="slide">
                                                    <c:if test="${fn:length(list.broadcastingList) != 0}">
                                                        <c:forEach items="${list.broadcastingList}" var="broadcastingList">
                                                            <div class="info overflow">
                                                                <span class="fl color999">${broadcastingList.pubtimeString}</span>
                                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="fl itemleft">
                                                                    <c:if test="${broadcastingList.contentFilter == ''}">
                                                                        【图片】.....
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) > 45}">
                                                                        ${fn:replace(broadcastingList.contentFilter,"&nbsp;", '')} .. ${fn:replace(broadcastingList.contentFilter,"&nbs", '')} .. ${fn:substring(broadcastingList.contentFilter,0,45)} ..
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) <= 45}">
                                                                        ${broadcastingList.contentFilter}
                                                                    </c:if>
                                                                </a>
                                                            </div>
                                                        </c:forEach>
                                                    </c:if>
                                                    <c:if test="${fn:length(list.broadcastingList) == 0}">
                                                        <div style="margin-top:20px;text-align:center;">暂无直播内容</div>
                                                    </c:if>
                                                </div>
                                                <div class="no-live color666">${list.content}</div>
                                            </div>
                                        </div>
                                        <div class="item-bottom f5 overflow" data-teacherid="${list.teacherid}" data-price="${list.questionsPrice}">
                                            <c:if test="${list.status == 0}">
                                                <span class="item-bottom-span cursor item-care fl">
                          <i class='item-icon item-icon1'></i>
                          <span class="care-live">${list.isAttention == 1 ? '已关注' : '关注'}</span>
                                                </span>
                                                <span class="item-bottom-span cursor item-ask fl ">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="item-bottom-span cursor item-see fl">
                                                    <i class='item-icon item-icon3'></i>立即查看
                                                </a>
                                            </c:if>
                                            <c:if test="${list.status != 0}">
                                                <span class="item-bottom-status item-bottom-status1 cursor item-ask fl">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a target="_blank" href="${live_path}dapan/${list.teacherid}/" class="item-bottom-status cursor fl">
                                                    <i class="item-icon fa fa-file-text-o mr5" aria-hidden="true"></i>观点
                                                </a>
                                            </c:if>
                                        </div>
                                </div>
                            </c:forEach>
                        </div>
                        <!-- 活跃榜换一换 -->
                        <div class="content live-active-second hide">
                            <c:forEach items="${todayList}" var="list" begin="4" end="8" varStatus="status">
                                <div class="hot-live item ${(status.index + 1) % 2 == 0 ? 'fr':'fl'} frame-shadow ${list.status == 0 ? 'online' : 'offline'}" id="teacher${list.roomid}">
                                    <%-- ${item.icon} --%>
                                        <c:if test="${list.is_btop == 1}">
                                            <i class="btop btop1">
                        <img src="${list.tag_img}">
                      </i>
                                        </c:if>
                                        <div class="item-wrap ${list.status == 0 ? '' : 'color153'}">
                                            <div class="item-top overflow">
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" data-userid="${list.user_id}" class="avatar image border-radius fl">
                                                    <img src="${list.photo}" alt="${list.title}">
                                                </a>
                                                <div class="name fl">
                                                    <a href="${live_path}live/${list.teacherid}/" target="_blank">
                                                        <span class="teacherName f3 b">${list.title}</span>
                                                        <span class="color666 f2">
                              <i class='item-icon-guwen'>
                                <img src="${list.type_ioc}" alt="" />
                              </i>
                              ${list.type_name}
                            </span>
                                                    </a>
                                                    <c:if test="${list.status == 0}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> ${fn:substring(list.todaysubject,0,18)}
                                                        </div>
                                                    </c:if>
                                                    <c:if test="${list.status == 1}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> 离线
                                                        </div>
                                                    </c:if>
                                                </div>
                                            </div>
                                            <div class="string f2 overflow relative">
                                                <div class="slide">
                                                    <c:if test="${fn:length(list.broadcastingList) != 0}">
                                                        <c:forEach items="${list.broadcastingList}" var="broadcastingList">
                                                            <div class="info overflow">
                                                                <span class="fl color999">${broadcastingList.pubtimeString}</span>
                                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="fl itemleft">
                                                                    <c:if test="${broadcastingList.contentFilter == ''}">
                                                                        【图片】.....
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) > 45}">
                                                                        ${fn:substring(broadcastingList.contentFilter,0,45)} ..
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) <= 45}">
                                                                        ${broadcastingList.contentFilter}
                                                                    </c:if>
                                                                </a>
                                                            </div>
                                                        </c:forEach>
                                                    </c:if>
                                                    <c:if test="${fn:length(list.broadcastingList) == 0}">
                                                        <div style="margin-top:20px;text-align:center;">暂无直播内容</div>
                                                    </c:if>
                                                </div>
                                                <div class="no-live color666">${list.content}</div>
                                            </div>
                                        </div>
                                        <div class="item-bottom f5 overflow" data-teacherid="${list.teacherid}" data-price="${list.questionsPrice}">
                                            <c:if test="${list.status == 0}">
                                                <span class="item-bottom-span cursor item-care fl">
                          <i class='item-icon item-icon1'></i>
                          <span class="care-live">${list.isAttention == 1 ? '已关注' : '关注'}</span>
                                                </span>
                                                <span class="item-bottom-span cursor item-ask fl ">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="item-bottom-span cursor item-see fl">
                                                    <i class='item-icon item-icon3'></i>立即查看
                                                </a>
                                            </c:if>
                                            <c:if test="${list.status != 0}">
                                                <span class="item-bottom-status item-bottom-status1 cursor item-ask fl">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a target="_blank" href="${live_path}dapan/${list.teacherid}/" class="item-bottom-status cursor fl">
                                                    <i class="item-icon fa fa-file-text-o mr5" aria-hidden="true"></i>观点
                                                </a>
                                            </c:if>
                                        </div>
                                </div>
                            </c:forEach>
                        </div>
                        <!-- 人气榜first -->
                        <div class="content live-pop-first hide">
                            <c:forEach items="${popularityList}" var="list" begin="0" end="3" varStatus="status">
                                <div class="hot-live item ${(status.index + 1) % 2 == 0 ? 'fr':'fl'} frame-shadow ${list.status == 0 ? 'online' : 'offline'}" id="teacher${list.roomid}">
                                    <%-- ${item.icon} --%>
                                        <c:if test="${list.is_btop == 1}">
                                            <i class="btop btop1">
                        <img src="${list.tag_img}">
                      </i>
                                        </c:if>
                                        <div class="item-wrap ${list.status == 0 ? '' : 'color153'}">
                                            <div class="item-top overflow">
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" data-userid="${list.user_id}" class="avatar image border-radius fl">
                                                    <img src="${list.photo}" alt="${list.title}">
                                                </a>
                                                <div class="name fl">
                                                    <a href="${live_path}live/${list.teacherid}/" target="_blank">
                                                        <span class="teacherName f3 b">${list.title}</span>
                                                        <span class="color666 f2">
                              <i class='item-icon-guwen'>
                                <img src="${list.type_ioc}" alt="" />
                              </i>
                              ${list.type_name}
                            </span>
                                                    </a>
                                                    <c:if test="${list.status == 0}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> ${fn:substring(list.todaysubject,0,18)}
                                                        </div>
                                                    </c:if>
                                                    <c:if test="${list.status == 1}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> 离线
                                                        </div>
                                                    </c:if>
                                                </div>
                                            </div>
                                            <div class="string f2 overflow relative">
                                                <div class="slide">
                                                    <c:if test="${fn:length(list.broadcastingList) != 0}">
                                                        <c:forEach items="${list.broadcastingList}" var="broadcastingList">
                                                            <div class="info overflow">
                                                                <span class="fl color999">${broadcastingList.pubtimeString}</span>
                                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="fl itemleft">
                                                                    <c:if test="${broadcastingList.contentFilter == ''}">
                                                                        【图片】.....
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) > 45}">
                                                                        ${fn:substring(broadcastingList.contentFilter,0,45)} ..
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) <= 45}">
                                                                        ${broadcastingList.contentFilter}
                                                                    </c:if>
                                                                </a>
                                                            </div>
                                                        </c:forEach>
                                                    </c:if>
                                                    <c:if test="${fn:length(list.broadcastingList) == 0}">
                                                        <div style="margin-top:20px;text-align:center;">暂无直播内容</div>
                                                    </c:if>
                                                </div>
                                                <div class="no-live color666">${list.content}</div>
                                            </div>
                                        </div>
                                        <div class="item-bottom f5 overflow" data-teacherid="${list.teacherid}" data-price="${list.questionsPrice}">
                                            <c:if test="${list.status == 0}">
                                                <span class="item-bottom-span cursor item-care fl">
                          <i class='item-icon item-icon1'></i>
                          <span class="care-live">${list.isAttention == 1 ? '已关注' : '关注'}</span>
                                                </span>
                                                <span class="item-bottom-span cursor item-ask fl ">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="item-bottom-span cursor item-see fl">
                                                    <i class='item-icon item-icon3'></i>立即查看
                                                </a>
                                            </c:if>
                                            <c:if test="${list.status != 0}">
                                                <span class="item-bottom-status item-bottom-status1 cursor item-ask fl">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a target="_blank" href="${live_path}dapan/${list.teacherid}/" class="item-bottom-status cursor fl">
                                                    <i class="item-icon fa fa-file-text-o mr5" aria-hidden="true"></i>观点
                                                </a>
                                            </c:if>
                                        </div>
                                </div>
                            </c:forEach>
                        </div>
                        <!-- 人气榜换一换 -->
                        <div class="content live-pop-second hide">
                            <c:forEach items="${popularityList}" var="list" begin="4" end="8" varStatus="status">
                                <div class="hot-live item ${(status.index + 1) % 2 == 0 ? 'fr':'fl'} frame-shadow ${list.status == 0 ? 'online' : 'offline'}" id="teacher${list.roomid}">
                                    <%-- ${item.icon} --%>
                                        <c:if test="${list.is_btop == 1}">
                                            <i class="btop btop1">
                        <img src="${list.tag_img}">
                      </i>
                                        </c:if>
                                        <div class="item-wrap ${list.status == 0 ? '' : 'color153'}">
                                            <div class="item-top overflow">
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" data-userid="${list.user_id}" class="avatar image border-radius fl">
                                                    <img src="${list.photo}" alt="${list.title}">
                                                </a>
                                                <div class="name fl">
                                                    <a href="${live_path}live/${list.teacherid}/" target="_blank">
                                                        <span class="teacherName f3 b">${list.title}</span>
                                                        <span class="color666 f2">
                              <i class='item-icon-guwen'>
                                <img src="${list.type_ioc}" alt="" />
                              </i>
                              ${list.type_name}
                            </span>
                                                    </a>
                                                    <c:if test="${list.status == 0}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> ${fn:substring(list.todaysubject,0,18)}
                                                        </div>
                                                    </c:if>
                                                    <c:if test="${list.status == 1}">
                                                        <div class='f2 color666'>
                                                            <i class='item-icon item-icon00'></i> 离线
                                                        </div>
                                                    </c:if>
                                                </div>
                                            </div>
                                            <div class="string f2 overflow relative">
                                                <div class="slide">
                                                    <c:if test="${fn:length(list.broadcastingList) != 0}">
                                                        <c:forEach items="${list.broadcastingList}" var="broadcastingList">
                                                            <div class="info overflow">
                                                                <span class="fl color999">${broadcastingList.pubtimeString}</span>
                                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="fl itemleft">
                                                                    <c:if test="${broadcastingList.contentFilter == ''}">
                                                                        【图片】.....
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) > 45}">
                                                                        ${fn:substring(broadcastingList.contentFilter,0,45)} ..
                                                                    </c:if>
                                                                    <c:if test="${fn:length(broadcastingList.contentFilter) <= 45}">
                                                                        ${broadcastingList.contentFilter}
                                                                    </c:if>
                                                                </a>
                                                            </div>
                                                        </c:forEach>
                                                    </c:if>
                                                    <c:if test="${fn:length(list.broadcastingList) == 0}">
                                                        <div style="margin-top:20px;text-align:center;">暂无直播内容</div>
                                                    </c:if>
                                                </div>
                                                <div class="no-live color666">${list.content}</div>
                                            </div>
                                        </div>
                                        <div class="item-bottom f5 overflow" data-teacherid="${list.teacherid}" data-price="${list.questionsPrice}">
                                            <c:if test="${list.status == 0}">
                                                <span class="item-bottom-span cursor item-care fl">
                          <i class='item-icon item-icon1'></i>
                          <span class="care-live">${list.isAttention == 1 ? '已关注' : '关注'}</span>
                                                </span>
                                                <span class="item-bottom-span cursor item-ask fl ">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="item-bottom-span cursor item-see fl">
                                                    <i class='item-icon item-icon3'></i>立即查看
                                                </a>
                                            </c:if>
                                            <c:if test="${list.status != 0}">
                                                <span class="item-bottom-status item-bottom-status1 cursor item-ask fl">
                          <i class='item-icon item-icon2'></i>提问
                        </span>
                                                <a target="_blank" href="${live_path}dapan/${list.teacherid}/" class="item-bottom-status cursor fl">
                                                    <i class="item-icon fa fa-file-text-o mr5" aria-hidden="true"></i>观点
                                                </a>
                                            </c:if>
                                        </div>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                    <!-- 最新观点 -->
                    <div class="news-opinion">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <a href="${opinion_path}/opinion/" target="_blank" class="text">最新观点</a>
                            <div class="action f1 fr">
                                <a href="${opinion_path}/opinion/" target="_blank">更多</a>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content frame-shadow">
                            <p class="news-title f5">
                                <span class="news-list select cursor" data-type="0">大盘</span>
                                <span class="news-list cursor" data-type="1">题材</span>
                            </p>
                            <%-- 大盘 --%>
                                <div class="news-opinion-content">
                                    <c:forEach items="${dapanList}" var="list">
                                        <a href="${opinion_path}dapan/${list.create_id}/${list.article_id}.htm" title="${list.title}" class="item news-content" target="_blank">
                                            <div class="line line1 overflow">
                                                <div class="image fl overflow">
                                                    <img src="${list.photo}" />
                                                </div>
                                                <div class="string fl">
                                                    <div class="opinion-lastest-title f3">
                                                        <span class="txt">${list.title}</span>
                                                    </div>
                                                    <div class="subtext f2">${list.shortContent}</div>
                                                    <div class="author f2 color999">
                                                        <span class="name author-list">${list.createrName}</span>
                                                        <span class="time author-list">
                              <i class="author-icon"></i>${list.create_timeStr}</span>
                                                        <span class="viewCount author-list">
                              <i class="author-icon"></i>${list.viewnumber}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </c:forEach>
                                </div>
                                <%-- 题材 --%>
                                    <div class="news-opinion-content hide">
                                        <c:forEach items="${ticaiList}" var="list">
                                            <a href="${opinion_path}dapan/${list.create_id}/${list.article_id}.htm" title="${list.title}" class="item news-content" target="_blank">
                                                <div class="line line1 overflow">
                                                    <div class="image fl overflow">
                                                        <img src="${list.photo}" />
                                                    </div>
                                                    <div class="string fl">
                                                        <div class="opinion-lastest-title f3">
                                                            <span class="txt">${list.title}</span>
                                                        </div>
                                                        <div class="subtext f2">${list.shortContent}</div>
                                                        <div class="author f2 color999">
                                                            <span class="name author-list">${list.createrName}</span>
                                                            <span class="time author-list">
                                <i class="author-icon"></i>${list.create_timeStr}</span>
                                                            <span class="viewCount author-list">
                                <i class="author-icon"></i>${list.viewnumber}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </c:forEach>
                                    </div>
                        </div>
                    </div>
                    <!-- 热卖内参 -->
                    <div class="hot-refer">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <a href="${neican_path}" target="_blank" class="text">热卖内参</a>
                            <span class="refer_action select" data-type="0">热卖</span>
                            <span class="refer_action" data-type="1">最新</span>
                            <div class="action huan f1 fr cursor">
                                <span>换一批</span>
                                <i class="fa fa-refresh"></i>
                            </div>
                            <!-- <div class="action f1 fr">
                                <a href="${neican_path}" target="_blank">更多</a>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </div> -->
                        </div>
                        <div class="refer-content"></div>
                    </div>
                </div>
                <div class="index-right wrap-fr clear">
                    <!-- 投顾诊股 -->
                    <div class="ask-stock">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <a href="${ask_path}new/all/" target="_blank" class="text">投顾诊股</a>
                            <span class="f2 ml15 ask-btn cursor"></span>
                            <div class="action f1 fr">
                                <a href="${ask_path}new/all/" target="_blank">更多</a>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="ask-stock-main overflow frame-shadow">
                            <div class="ask-stock-main-content overflow relative">
                                <div class="stock-content">
                                    <c:forEach items="${noteList}" var="list">
                                        <div class="stocklist">
                                            <p class="ask overflow">
                                                <i class="ask-icon fl"></i>
                                                <a class="ask-width  color222 fl f5" target="_blank" href="${ask_path}consultation/${list.noteid}.htm" title="${list.questioncontent}">${list.questioncontent}</a>
                                            </p>
                                            <div class="ask-answer color666 f2 overflow relative">
                                                <i class="ask-icon fl"></i>
                                                <c:if test="${fn:length(list.answercontentStr) > 70}">
                                                    <a class="ask-width ask-answer-content color666 fl ask-content-str" target="_blank" href='${ask_path}consultation/${list.noteid}.htm' title='${fn:substring(list.answercontentStr,0,70)}'>
                            ${fn:substring(list.answercontentStr,0,70)}
                          </a>
                                                    <a class="ask-width ask-answer-content color666 fl ask-content-all hide" target="_blank" href='${ask_path}consultation/${list.noteid}.htm' title='${fn:substring(list.answercontentStr,0,70)}'>
                            ${list.answercontentStr}
                          </a>
                                                </c:if>
                                                <c:if test="${fn:length(list.answercontentStr) <= 70}">
                                                    <a class="ask-width ask-answer-content color666 fl ask-content-str" target="_blank" href='${ask_path}consultation/${list.noteid}.htm' title='${list.answercontentStr}'>
                            ${list.answercontentStr}
                          </a>
                                                </c:if>
                                                <c:if test="${fn:length(list.answercontentStr) > 70}">
                                                    <span class="ask-off cursor">
                            <span class="ask-off-text">展开</span>
                                                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                                                    </span>
                                                </c:if>
                                            </div>
                                            <div class="ask-teacher">
                                                <a href="${live_path}live/${list.answeruserid}/" target="_blank" title="${list.teachertitle}" class="color999">
                                                    <img class="image" src="${list.photo}" alt="${list.teachertitle}" />
                                                    <span>${list.teachertitle}</span>
                                                </a>
                                                <span class="fr color999 ask-time f1">${time}</span>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 约牛头条 -->
                    <div class="ynw-headline">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <a class="text" href="${path}/headline.htm" target="_blank">约牛头条</a>
                            <span class="color153 f1 ml10">大咖解读股市要闻</span>
                            <div class="action f1 fr">
                                <a href="${path}/headline.htm" target="_blank">更多</a>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="headline-content frame-shadow">
                            <c:forEach items="${headlinesList}" var="list" begin="0" end="0">
                                <a target="_blank" href="/headlines/${list.type}/${list.articleid}.htm" class="headline-top">
                                    <p class="headline-top-title f3 b">${list.title}</p>
                                    <div class="headline-top-content f2">${list.shortContent}</div>
                                </a>
                            </c:forEach>
                            <c:forEach items="${headlinesList}" var="list" begin="1" end="7">
                                <a target="_blank" href="/headlines/${list.type}/${list.articleid}.htm" class="headline-list headline-item f5">
                                    <i class="headline-icon"></i>${list.title}</a>
                            </c:forEach>
                        </div>
                    </div>
                    <!-- 牛人排行 -->
                    <div class="ynw-ranking">
                        <div class="title-1">
                            <span class="title-icon"></span>
                            <span class="text">牛人排行</span>
                            <span class="color153 f1 ml10">最牛的人都在这里</span>
                        </div>
                        <div class="ranking-content frame-shadow">
                            <p class="ranking-title f5">
                                <span class="ranking-title-list cursor select" data-type="2">新晋牛人</span>
                                <span class="ranking-title-list cursor" data-type="1">咨询牛人</span>
                                <span class="ranking-title-list cursor" data-type="0">人气直播</span>
                            </p>
                            <%-- 人气 --%>
                                <div class="ranking-main hide">
                                    <c:forEach items="${popularityTeacher}" var="list" varStatus="status">
                                        <div class="ranking-main-list ranking-main-list${status.index + 1}">
                                            <a href="${live_path}live/${list.teacherid}/" target="_blank" class="block">
                                                <i class="ranking-icon"></i>
                                                <img class="image" src="${list.photo}" alt="" />
                                                <span class="ranking-text f3 ranking-people">${list.title}</span>
                                                <span class="ranking-text ranking-num f3 fr b">
                          <span class="ranking-people-num">人气数</span>${list.popularity_number}</span>
                                            </a>
                                        </div>
                                    </c:forEach>
                                </div>
                                <%-- 咨询 --%>
                                    <div class="ranking-main hide">
                                        <c:forEach items="${answerCountTeacher}" var="list" varStatus="status">
                                            <div class="ranking-main-list ranking-main-list${status.index + 1}">
                                                <a href="${live_path}live/${list.teacherid}/" target="_blank" class="block">
                                                    <i class="ranking-icon"></i>
                                                    <img class="image" src="${list.photo}" alt="" />
                                                    <span class="ranking-text f3 ranking-people">${list.title}</span>
                                                    <span class="ranking-text ranking-num f3 fr b">
                            <span class="ranking-people-num">回答问题数</span>${list.answerNum}</span>
                                                </a>
                                            </div>
                                        </c:forEach>
                                    </div>
                                    <%-- 新晋 --%>
                                        <div class="ranking-main">
                                            <c:forEach items="${newTeacher}" var="list" varStatus="status">
                                                <div class="ranking-main-list ranking-main-list${status.index + 1}">
                                                    <a href="${live_path}live/${list.teacherid}/" target="_blank" class="block">
                                                        <i class="ranking-icon"></i>
                                                        <img class="image" src="${list.photo}" alt="" />
                                                        <span class="ranking-text f3 ranking-people">${list.title}</span>
                                                        <span class="ranking-text ranking-num f3 fr b">
                              <span class="ranking-people-num">人气数</span>${list.popularity_number}</span>
                                                    </a>
                                                </div>
                                            </c:forEach>
                                        </div>
                        </div>
                    </div>
                </div>
                <div class="index-bottom">
                    <div class="title-1">
                        <span class="title-icon"></span>
                        <span class="text">友情链接</span>
                    </div>
                    <div class="cooperation container">
                        <div class="items">
                            <a href="http://yueniucj.com/" class="item inline" target="_blank">
                                <img src="${path}/public/images/coop/coop-yn.jpg">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../common/moudule-ask.jsp" %>
                <%@include file="../v2/front-foot-v2.jsp" %>
                    <script src="https://cdn.bootcss.com/unslider/2.0.3/js/unslider-min.js"></script>
                    <script src="/public/js/velocity.js?695"></script>
                    <script src="/public/js/velocity.ui.js?695"></script>
                    <script src="/public/js/template.js?695"></script>
                    <script src="/public/v2/index/index.bundle.js?07303"></script>
                    <script>
                    onSelect('首页')
                    </script>
                    <script id="viewDidLoad"></script>
    </body>

    </html>
