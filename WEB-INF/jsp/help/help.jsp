<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>帮助中心</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/help/css/help.css?0329">
            <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
            <style>
            .li5 {
                background: #D6D6D6;
                border-top: 1px solid rgb(235, 235, 235);
                border-bottom: 1px solid rgb(235, 235, 235);
                border-left: 2px solid #d72621;
                color: #000;
            }
            </style>
            <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                    <div id="navg">
                        <a href="/index.htm">首页</a>
                        <i class="fa fa-angle-right"></i>
                        <a href="#">帮助中心</a>
                    </div>
                    <div id="helpWrap">
                        <!-- <div class="help-banner"><img src="/private/help/images/help-banner.png"></div> -->
                        <div id="help" class="yn-wrap">
                            <%@include file="../help/help-common.jsp" %>
                                <div class="help-right fr">
                                    <!-- 帮助中心 -->
                                    <div class="contentItem" id="help-center">
                                        <h1 class="title"><p class="tc">帮助中心<br/><font>Help center</font></p></h1>
                                        <p class="subtitle"><i class="fa fa-th-list"></i>帮助中心</p>
                                        <div class="state"><span>约投顾帮助中心是帮助用户更快更准确的了解约投顾每个产品的特色，让您更加了解约投顾，约投顾致力打造全中国股票投资互动交流门户，让中国股民共享财富生活。</span></div>
                                        <p class="subtitle"><i class="fa fa-th-list"></i>新手指南</p>
                                        <img src="/private/help/images/helpcenter-03.png">
                                        <p class="subtitle"><i class="fa fa-th-list"></i>自助服务</p>
                                        <img src="/private/help/images/helpcenter-04.png">
                                        <p class="subtitle"><i class="fa fa-th-list"></i>常见问题</p>
                                        <div style="padding-left:15px">
                                            <div class="aside tit"><i class="fa fa-angle-right"></i>如何修改已绑定的手机号码？</div>
                                            <span class="aside">1、访问个人中心－修改个人资料，在绑定手机服务中点击［修改］</span>
                                            <span class="aside">2、获取手机验证码并正确输入，点击保存即可完成</span>
                                            <div class="aside tit"><i class="fa fa-angle-right"></i>平台上的投资顾问都靠谱么？</div>
                                            <span class="aside">约投顾的投资顾问均为具有职业资格的金融机构在职人员，发表的言论具有专业性、权威性，并且投资顾问均需经过公司内部专业审核，审核通过才可称为专业投资顾问。</span>
                                            <div class="aside tit"><i class="fa fa-angle-right"></i>如何与投资顾问老师互动？</div>
                                            <span class="aside">可以通过在线咨询、查看博文等或是对博文进行评论、转载、分享、提问等方式。</span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- footer -->
                    <%@include file="../common/front-foot.jsp" %>
            </body>

    </html>
