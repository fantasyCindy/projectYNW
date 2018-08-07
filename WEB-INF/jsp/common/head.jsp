<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
                        <span>欢迎来到约投顾！</span>
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
                <span class="mobile tactful fr hide"><i class="icon fa fa-mobile"></i></span>
                <span class="wechat tactful fr hide"><i class="icon fa fa-wechat"></i></span>
                <span class="rline fr"><a href="${us_path}help.htm">帮助中心</a></span>
                <span class="rline fr"><i class="icon fa fa-phone"></i>电话:010-82177313</span>
            </div>
        </div>
    </div>
    <div id="yn-top">
        <div class="yn-wrap">
            <div class="logo fl">
                <a href="http://www.yuetougu.com">
                    <img src="/public/images/logo_v4.png?1" alt="约投顾" title="约投顾">
                </a>
            </div>
            <div class="yn-mean fl">
                <ul>
                    <li><a href="http://www.yuetougu.com">首页</a></li>
                    <li class="relative"><a href="${live_path}">直播</a><span class="live-hot"><img src="/public/images/Hot.png" alt=""></span></li>
                    <li><a href="${opinion_path}">观点</a></li>
                    <li><a href="${ask_path}">问股</a></li>
                    <!-- <li><a href="${path}/combination.htm">组合</a></li> -->
                    <li><a href="${path}/learnstock.htm">学炒股</a></li>
                    <li><a href="${path}/reference.htm">内参</a></li>
                    <!-- <li><a href="${video_path}">视频</a></li> -->
                    <!-- <li><a href="${tougu_path}/tougu/index.htm">找投顾</a></li> -->
                    <!-- <li><a href="${news_path}">资讯</a></li> -->
                    <li><a href="${path}/myCenters.htm" id="goMyCenter">我的</a></li>
                    <li class="hide"><a href="http://www.yuetougu.com/html/liveVipAct.htm" target="_blank"><img src="${path}/public/images/vipact/logo1.png" alt=""></a></li>
                    <li><a href="http://www.yuetougu.com/security.htm" target="_blank"><img src="${path}/public/images/composite/fangweiyanzheng.jpg" alt=""></a></li>
                </ul>
            </div>
            <div class="search fr">
                <span class="search-key">
                    <span class="key">搜股票</span>
                <!-- <i class="search-indicate fa fa-caret-down"></i> -->
                </span>
                <span id="btn_search" class="fr"><i class="icon fa fa-search"></i></span>
                <input class="fr search-type-item" type="text" value="" title="请输入股票代码/名称拼音缩写" placeholder="请输入股票代码/名称拼音缩写" data-provide="typeahead" autocomplete="off" id="stock_code">
                <!-- <input class="fr  search-type-item hide" type="text" value="" title="直播室名称" placeholder="直播室名称" data-provide="typeahead" autocomplete="off" id="search-room-input"> -->
            </div>
        </div>
    </div>
