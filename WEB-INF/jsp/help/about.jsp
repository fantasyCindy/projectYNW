<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>关于我们</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/help/css/help.css?0423">
            <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
            <style>
            .li1 {
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
                        <i class="fa fa-angle-right"></i>
                        <a>关于我们</a>
                    </div>
                    <div id="helpWrap">
                        <!-- <div class="help-banner"><img src="/private/help/images/help-banner.png"></div> -->
                        <div id="help" class="yn-wrap">
                            <%@include file="../help/help-common.jsp" %>
                                <div class="help-right fr">
                                    <!-- 关于我们 -->
                                    <div class="contentItem" id="aboutus">
                                        <div class="about-title">公司介绍</div>
                                        <p>约投顾成立于2016年，是由云南产业投资管理有限公司打造的互联网投资咨询服务平台。</p>
                                        <p>云南产业投资管理有限公司，成立于1997，是一家具有20年资产管理经验的投资管理机构。公司总部位于云南，在郑州等多地均有设立分公司，建立起了辐射全国的投资服务网络。</p>
                                        <div class="about-title">专业资质-经营许可证</div>
                                        <p>云南产投是中国证监会首批颁发认证的专业投资咨询机构，执业资格证书编号：zx0093，具有专业、丰富、合规、可信的证券投资咨询经验。</p>
                                        <p>云南产投拥有证监会认证的精英投顾团队，长期精耕细作在市场一线，全面、客观、旗帜鲜明地分析股票行情，撰写专业的宏观研究、数据分析、企业调研、个股解读等深度投资内参，通过互联网、移动互联网互动直播（文字、视频、音频）、为股民提供支持和参考。</p>
                                        <div class="zigezheng">
                                            <div style="margin:50px 0 30px 0">经营证券期货业务许可证统一信用代码（境外机构编码）:</div><img src="${path}/public/images/vipact/zheng3.jpg" alt=""> </div>
                                        <div class="about-title">经营理念</div>
                                        <!-- <div class="about-stitle">与牛有约，纵横股海</div> -->
                                        <!-- <div class="about-stitle">约牛网，助力财富梦想</div> -->
                                        <p style="margin-top:20px;">约投顾秉承“开放、透明、协作”的互联网思维，坚持“专业，合规，实用”的经营理念，专注投资咨询服务。</p>
                                        <div class="help-img"><img src="${path}/private/help/images/zhuanye.png" alt="">专业</div>
                                        <div class="help-img"><img src="${path}/private/help/images/hege.png" alt="">合格</div>
                                        <div class="help-img"><img src="${path}/private/help/images/shiyong.png" alt="">实用</div>
                                        <p style="margin-top:20px;">约投顾基于核心证券投资咨询业务，提供证券研究分析、金融数据研究、软件服务、资讯传递及投资培训等产品。凭借专业、深厚的研究实力与先进的互联网技术经验，通过开放、透明、协作的互联网思维，不断改进传统的投资咨询服务体验，以“帮助投资者实现财富增长”为使命，为投资者理清投资管理目标、捕捉价值洼地、研判个股潜在价值、制定精准投资策略。</p>
                                        <div class="about-title">办公环境</div>
                                        <div class="about-office">
                                            <!-- <img src="${path}/private/help/images/office1.jpg" alt=""> -->
                                            <img src="${path}/private/help/images/office3.jpg" alt="">
                                            <!-- <img src="${path}/private/help/images/office2.jpg" alt=""> -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- footer -->
                    <%@include file="../common/front-foot.jsp" %>
            </body>

    </html>
