<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>关于我们</title>
	<%@ include file="../common/m-about-common.jspf" %>
</head>
<body>
    <%@ include file="../common/m-about-head.jsp" %>
    <div id="help">
        <h1 class="title"><p class="tc">帮助中心<br><font>Help center</font></p></h1>
        <p class="subtitle"><i class="fa fa-th-list"></i>帮助中心</p>
        <div class="state"><span>约投顾帮助中心是帮助用户更快更准确的了解约投顾每个产品的特色，让您更加了解约投顾，约投顾致力打造全中国股票投资互动交流门户，让中国股民共享财富生活。</span></div>
        <p class="subtitle"><i class="fa fa-th-list"></i>新手指南</p>
        <img src="/private/help/images/helpcenter-03.png">
        <p class="subtitle"><i class="fa fa-th-list"></i>自助服务</p>
        <img src="/private/help/images/helpcenter-04.png">
        <p class="subtitle"><i class="fa fa-th-list"></i>常见问题</p>
        <div style="padding-left:15px">
            <span class="aside tit"><i class="fa fa-angle-right"></i>如何修改已绑定的手机号码？</span>
            <span class="aside">1、访问个人中心－修改个人资料，在绑定手机服务中点击［修改］</span>
            <span class="aside">2、获取手机验证码并输入，点击保存即可完成</span>
            <span class="aside tit"><i class="fa fa-angle-right"></i>平台上的投资顾问都靠谱么？</span>
            <span class="aside">约投顾的投资顾问均为具有职业资格的金融机构在职人员，发表的言论具有专业性、权威性，并且投资顾问均需经过公司内部专业审核，审核通过才可称为专业投资顾问。</span>
            <span class="aside tit"><i class="fa fa-angle-right"></i>如何与投资顾问老师互动？</span>
            <span class="aside">可以通过在线咨询、查看博文等或是对博文进行评论、转载、分享、提问等方式。</span>
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
</body>
</html>