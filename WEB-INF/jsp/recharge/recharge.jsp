<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>我的</title>
            <%@ include file="../common/front-common.jspf" %>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <link rel="stylesheet" href="/private/recharge/css/recharge.css?0730">
                <script>
                /* beautify ignore:start */
            ynTeacherId = '${sessionScope.Teacher.teacherid}';
            ynIsLogin = ${sessionScope.login_user_front.user_id != null};
            ynIsTeacher = ${sessionScope.login_user_front.isteacher == 1};
            ynUserId = "${sessionScope.login_user_front.user_id}";
            ynTeacherName = '${sessionScope.Teacher.nickname}';
            ynUserName = '${sessionScope.login_user_front.nickname}'
            /* beautify ignore:end */
                </script>

                <body>
                    <div id="defray-nav">
                        <div class="defray-wrap">
                            <a href="http://www.yuetougu.com">首页</a>
                            <a href="http://ask.yuetougu.com/">问股</a>
                            <a href="http://live.yuetougu.com/">直播</a>
                            <a href="http://video.yuetougu.com/">视频</a>
                            <a href="http://news.yuetougu.com/">资讯</a>
                            <!-- <a href="/html/findTeacher.htm?hl5">找投顾</a> -->
                            <a href="${path}/myCenters.htm">我的</a>
                        </div>
                    </div>
                    <div id="defray">
                        <div class="defray-wrap clear">
                            <div class="fl" id="logo">
                                <a href="http://www.yuetougu.com">
                                    <img src="/public/images/logo_v4.png" alt="约投顾" title="约投顾">
                                </a>
                                <span class="defray-title">支付中心</span>
                            </div>
                        </div>
                        <div class="defray-money">
                            <div class="defray-wrap">
                                <div class="defray-process">填写充值金额</div>
                                <a href="/myCenter/myIncome.htm" class="fr record">充值记录</a>
                                <div class="defray-ing">
                                    <table>
                                        <tr>
                                            <td>充值账户：</td>
                                            <td class="payaccount"></td>
                                        </tr>
                                        <tr>
                                            <td>充值金额:</td>
                                            <td>
                                                <p>
                                                    <input type="text" id="defray-amount" />牛币</p>
                                                <p>充值金额 1牛币＝1人民币</p>
                                                <span class="defray-next">下一步</span>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="defray-prompt">
                                        <p class="prompt-title">温馨提示：</p>
                                        <p>1、充值成功后，余额可能存在延迟现象，一般1到5分钟内到账，如有问题，请咨询客服；</p>
                                        <p>2、支持微信、支付宝充值。</p>
                                        <p>3、充值金额为整数，不可以为小数。</p>
                                    </div>
                                </div>
                                <div class="defray-win hid">
                                    <p>
                                        <font color="#e20000">恭喜您，充值完成！</font>
                                    </p>
                                    <p>本次充值：<span>400</span>牛币</p>
                                    <p>消费金额：¥<span>40.0</span></p>
                                    <p>充值方式：<span>支付宝</span></p>
                                    <p>充值时间：<span>2016-08-05 12:21:44</span></p>
                                    <p>流水号：<span>564646543546574</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="defray-online hid">
                            <div class="defray-wrap">
                                <div class="defray-process">在线充值</div>
                                <div class="defray-detail">订单号：<span class="ordernum"></span>支付金额：<span class="credit">0</span></div>
                                <div class="defray-type clear">
                                    <span class="thisclass" data-type="wechat"><img src="/private/recharge/images/wechat.png"></span>
                                    <span data-type="alipay"><img src="/private/recharge/images/alipay.png"></span>
                                    <a class="closewin fr">关闭</a>
                                </div>
                                <div class="defray-content">
                                    <div class="defraytag defray-wechat">
                                        <span class="countdown">1分钟后失效，请重新刷新页面操作</span>
                                        <img src="" width="308" height="308" class="wechatewm">
                                    </div>
                                    <div class="defraytag defray-alipay hid">
                                        <span class="countdown">1分钟后失效，请重新刷新页面操作</span>
                                        <iframe scrolling="no" frameborder="0" src="" width="308" height="308" class="alpayifram" /></iframe>
                                        <a class="comlog" href="">电脑登陆账户支付</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%@include file="../common/front-foot.jsp" %>
                        <script type="text/javascript" src="/public/bundle/recharge.bundle.js"></script>
                </body>

    </html>
