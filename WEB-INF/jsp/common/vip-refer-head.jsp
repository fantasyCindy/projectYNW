<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--yueniuwang操盘内线header-->
    <div id="yn-header">
        <div class="yn-wrap">
            <div class="welcome fl">
                <c:if test="${frontLoginName != null and frontLoginName !=''}">
                    <div class="isLogin">
                        <span>欢迎您：</span>
                        <span id="ynUserName">
                            <img class="userphoto" src="/private/head/images/user.png" />
                            <a href="/auth/user/userCenter.htm" class="username orghover">${frontLoginName}</a>
                        </span>
                        <a class="logout orghover" id="ynLogout">退出</a>
                        <span class="yn-in">
                            <span id="triger-settle" class="orghover hide"><i class="icon fa fa-user-plus"></i>申请入驻</span>
                        </span>
                    </div>
                </c:if>
                <!-- 注册 -->
                <c:if test="${frontLoginName == null}">
                    <div>
                        <span>哞，欢迎来约牛！</span>
                        <span>请</span>
                        <a class="yn-sign organe" id="ynLogin">登录</a>
                        <a class="yn-register organe" href="/user/register.htm">免费注册</a>
                        <span class="yn-in">
                            <span id="triger-settle" class="orghover"><i class="icon fa fa-user-plus"></i> 申请入驻</span>
                        </span>
                    </div>
                </c:if>
                <!-- END -->
            </div>
            <div class="account fr">
                <a class="envelope fr" href="/html/returnMessageJsp.htm"><i class="icon fa fa-envelope"></i></a>
                <span class="mobile tactful fr"><i class="icon fa fa-mobile"></i></span>
                <span class="wechat tactful fr"><i class="icon fa fa-wechat"></i></span>
                <span class="rline fr"><a href="${us_path}help.htm">帮助中心</a></span>
                <span class="rline fr"><i class="icon fa fa-phone"></i>电话:010-82177313</span>
            </div>
        </div>
    </div>
    <!--yueniuwang-->
    <div id="yn-top" class="hide">
        <div class="yn-wrap">
            <div class="logo fl">
                <a href="http://www.yuetougu.com">
                    <img src="/public/images/logo_v4.png" alt="约投顾" title="约投顾">
                </a>
            </div>
            <div class="yn-mean fl">
                <ul>
                    <li><a href="http://www.yuetougu.com">首页</a></li>
                    <li><a href="${ask_path}">问股</a></li>
                    <li><a href="${live_path}">直播</a></li>
                    <li><a href="${opinion_path}">观点</a></li>
                    <!-- <li><a href="${path}/combination.htm">组合</a></li> -->
                    <!-- <li><a href="${path}/reference.htm">内参</a></li> -->
                    <li><a href="${video_path}">视频</a></li>
                    <!-- <li><a href="${tougu_path}/tougu/index.htm">找投顾</a></li> -->
                    <li><a href="${news_path}">资讯</a></li>
                    <li><a href="${path}/myCenters.htm" id="goMyCenter">我的</a></li>
                    <li>
                        <a href="http://www.yuetougu.com/html/liveVipAct.htm" target="_blank"><img src="${path}/public/images/vipact/logo1.png" alt=""></a>
                    </li>
                    <li>
                        <a href="http://www.yuetougu.com/security.htm" target="_blank"><img src="${path}/public/images/composite/fangweiyanzheng.jpg" alt=""></a>
                    </li>
                </ul>
            </div>
            <div class="search fr">
                <span class="search-key">
                    <!-- <i class="search-indicate fa fa-caret-down"></i> -->
                    </span>
                <span id="btn_search" class="fr"><i class="icon fa fa-search"></i></span>
                <input class="fr search-type-item" type="text" value="" title="请输入股票名称/代码" placeholder="请输入股票名称/代码" data-provide="typeahead" autocomplete="off" id="stock_code">
                <!-- <input class="fr  search-type-item hide" type="text" value="" title="直播室名称" placeholder="直播室名称" data-provide="typeahead" autocomplete="off" id="search-room-input"> -->
            </div>
        </div>
    </div>
    <!--yueniucj-->
    <nav id="nav" class="m-wrap hide">
        <div class="navwrap">
            <a href='http://www.yueniucj.com/gupiao/' alt="股票" title="股票" target="_blank" class="s18">股票</a>
            <a href='http://www.yueniucj.com/gupiao/redian/' alt="热点" title="热点" target="_blank">热点</a>
            <a href='http://www.yueniucj.com/gupiao/jihui/' alt="机会" title="机会" target="_blank">机会</a>
            <a href='http://www.yueniucj.com/gupiao/fengkong/' alt="[field:typename/]" title="[field:typename/]" target="_blank">风控</a>
            <a href='http://www.yueniucj.com/gupiao/xingu/' alt="新股" title="新股" target="_blank">新股</a>
            <a href='http://www.yueniucj.com/gupiao/rili/' alt="日历" title="日历" target="_blank" class="erect1">日历</a>
            <a href='http://www.yueniucj.com/caijing/' alt="财经" title="财经" target="_blank" class="s18">财经</a>
            <a href='http://www.yueniucj.com/caijing/guonei/' alt="国内" title="国内" target="_blank">国内</a>
            <a href='http://www.yueniucj.com/caijing/guoji/' alt="国际" title="国际" target="_blank">国际</a>
            <a href='http://www.yueniucj.com/caijing/shiping' alt="时评" title="时评" target="_blank">时评</a>
            <a href='http://www.yueniucj.com/caijing/zhuanti/' alt="专题" title="专题" target="_blank" class="erect1">专题</a>
            <a href='http://www.yueniucj.com/study/' alt="学炒股" title="学炒股" target="_blank" class="s18">学炒股</a>
            <a href='http://www.yueniucj.com/study/5fenzhong/' alt="五分钟速成" title="五分钟速成" target="_blank">五分钟速成</a>
            <a href='http://www.yueniucj.com/study/xintai/' alt="投资心理" title="投资心理" target="_blank">投资心理</a>
            <a href='http://www.yueniucj.com/study/zhanfa/' alt="战法精研" title="战法精研" target="_blank" class="erect1">战法精研</a>
            <a href="http://www.yuetougu.com" alt="约牛名家" title="约牛名家" target="_blank" class="s18">约牛名家</a>
            <a href="http://opinion.yuetougu.com/" alt="观点" title="观点" target="_blank">观点</a>
            <a href="http://ask.yuetougu.com/" alt="诊股" title="诊股" target="_blank">诊股</a>
            <a href="http://live.yuetougu.com/" alt="直播" title="直播" target="_blank">直播</a>
        </div>
    </nav>
    <header class="hide">
        <div class="navwrap clear" id="head">
            <div class="fl logo">
                <h1><a href="http://www.yueniucj.com" target="_blank" alt="约牛财经" title="约牛财经">
                <img width="384" src="http://www.yueniucj.com/public/images/logo.png" title="约牛财经" alt="约牛财经">
            </a></h1>
            </div>
            <div class="fr yn-cion">
                <a href="http://www.yuetougu.com/" alt="约投顾" title="约投顾" target="_blank">约投顾</a>
                <a href="http://www.zx0093.com/" alt="约牛决策" title="约牛决策" target="_blank">约牛决策</a>
            </div>
        </div>
    </header>
    <!-- 登录 -->
    <%@include file="front-login.jsp" %>
        <%@include file="residencies.jsp" %>
