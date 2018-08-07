<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <iframe src="" id="tokenFrame" frameborder="0" style="position:fixed;left:-100%"></iframe>
    <script>
    var __token = "${centralToken}"
    if (!__token) {
        __token = "${sessionScope.centralToken}"
        if (!__token) {
            var __tokenURL = "/loginStatus.htm"
            document.getElementById('tokenFrame').setAttribute('src', __tokenURL)
        }
    }
    </script>
    <div id="yn-header">
        <div class="yn-top">
            <div class="yn-top-wrap clear">
                <c:if test="${frontLoginName != null and frontLoginName !=''}">
                    <div class="isLogin">
                        <span>欢迎您：</span>
                        <span id="ynUserName">
                            <img class="userphoto" src="/private/head/images/user.png" />
                            <a href="/auth/user/userCenter.htm" class="username orghover">${frontLoginName}</a>
                        </span>
                        <a class="logout orghover" id="ynLogout">退出</a>
                        <span class="yn-in">
                            <span id="triger-settle" class="orghover hide">
                                <span style="margin-right: 8px;">|</span>
                        <i class="icon fa fa-user-plus"></i>申请入驻
                        </span>
                        </span>
                    </div>
                </c:if>
                <!-- 注册 -->
                <c:if test="${frontLoginName == null}">
                    <div class="welcome">
                        <span>哞，欢迎来到约投顾！</span>
                        <span>请</span>
                        <a class="yn-sign organe" id="ynLogin">登录</a>
                        <a class="yn-register organe" id="register">免费注册</a>
                        <span class="yn-in">
                            <span id="triger-settle" class="orghover"><i class="icon fa fa-user-plus"></i> 申请入驻</span>
                        </span>
                    </div>
                </c:if>
                <div class="yn-top-company">
                    <a class="envelope fr" href="/backstage/myCenterMessage.htm"><i class="icon fa fa-envelope"></i><i class="msg-circle hide"></i></a>
                    <div class="msgCenter hide">
                        <ul></ul>
                    </div>
                    <span class="mobile tactful fr hide"><i class="icon fa fa-mobile"></i></span>
                    <span class="wechat tactful fr hide"><i class="icon fa fa-wechat"></i></span>
                    <span class="fr yn-top-line">|</span>
                    <span class="fr"><a href="${us_path}help.htm">帮助中心</a></span>
                    <span class="fr yn-top-line">|</span>
                    <span class="rline fr"><i class="icon fa fa-phone"></i>客服热线：400-0000-577</span>
                    <span class="fr yn-top-line">|</span>
                    <span class="rline fr yncode-wrap"><span class="yncode"><i class="yncode-icon"></i>约牛股票<i class="yncode-icon1"></i></span>
                        <span class="ynstock"></span>
                    </span>
            
                </div>
            </div>
        </div>
        <div class="yn-nav">
            <div class="yn-nav-wrap">
                <div class="yn-nav-items">
                    <ul class="clear">
                        <li class="yn-nav-first">
                            <a href="http://www.yuetougu.com">
                                <img src="/public/images/logo_v4.png?1" alt="约投顾" title="约投顾">
                            </a>
                        </li>
                        <li><a href="http://www.yuetougu.com">首页</a></li>
                        <li class="relative"><a href="${live_path}">直播</a><span class="live-hot"><img src="/public/images/Hot.png" alt=""></span></li>
                        <li><a href="${opinion_path}">观点</a></li>
                        <li><a href="${yuanzhuo_path}">圆桌</a></li>
                        <li><a href="${ask_path}">问股</a></li>
                        <li><a href="${xuechaogu_path}">学炒股</a></li>
                        <li><a href="${neican_path}">内参</a></li>
                        <li><a href="${path}/myCenters.htm" id="goMyCenter">我的</a></li>
                        <li class="yn-nav-security">
                            <a href="http://www.yuetougu.com/security.htm" target="_blank"><img src="${path}/public/images/composite/fangweiyanzheng.jpg" alt=""></a>
                        </li>
                    </ul>
                </div>
                <div class="yn-nav-search clear search"><span id="btn_search" class="fr"><i class="icon fa fa-search"></i></span>
                    <input class="fr search-type-item" type="text" value="" title="请输入股票代码/名称拼音缩写" placeholder="请输入股票代码/名称拼音缩写" data-provide="typeahead" autocomplete="off" id="stock_code">
                </div>
            </div>
        </div>
    </div>
    <!-- 登录 -->
    <%@include file="front-login-v2.jsp" %>
        <%@include file="residencies-v2.jsp" %>
