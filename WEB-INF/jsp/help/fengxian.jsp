<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>风险提示</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/help/css/help.css?0329">
            <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
            <style>
            .li4 {
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
                        <a>风险提示</a>
                    </div>
                    <div id="helpWrap">
                        <!-- <div class="help-banner"><img src="/private/help/images/help-banner.png"></div> -->
                        <div id="help" class="yn-wrap">
                            <%@include file="../help/help-common.jsp" %>
                                <div class="help-right fr">
                                    <!-- 风险提示 -->
                                    <div class="contentItem" id="risk">
                                        <h1 class="title"><p class="tc">风险提示<br/><font>Risk warning</font></p></h1>
                                        <aside class="texind">
                                            欢迎您访问约投顾。约投顾本着对广大注册用户和网站访客负责的态度，特作此风险提示，请仔细阅读。任何机构和个人进入本网站，即视为已充分阅读、理解并接受下列内容。本网站保留对风险提示的修改、解释权。
                                        </aside>
                                        <h2 class="subtitle">一、应用风险</h2>
                                        <aside>本网站所有与证券市场相关的财经金融资讯和行情数据信息等内容均由网站注册用户提供。注册用户的操作思路、策略报告、经验分享等仅代表其个人观点，仅限于用户间交流和探讨，不代表我网站观点，不具有证券投资咨询信息性质，不构成对任何股票、债券或任何金融产品的购买邀请，不构成财务、税务、投资建议、投资咨询意见或其他意见，不应成为其他注册用户或网站访客做出任何投资或其他决定的唯一依据。据此入市，风险自担，公司不承担任何经济和法律责任。</aside>
                                        <h2 class="subtitle">二、侵权风险</h2>
                                        <aside>用户自行承担注册的用户名产生的结果和责任，同意约投顾没有义务审查用户申请注册的用户名是否侵犯他人的在先权利。用户及访客提供的言论及资源，须自行保证不侵犯他人的在先权利，用户的侵权行为及责任自行承担。</aside>
                                        <h2 class="subtitle">三、账户风险</h2>
                                        <aside>用户自行承担注册账号及密码的保管责任，并就其账号及密码项下之一切活动负全部责任。用户应注意网络安全防护，定期更改密码、设置密码安全保护问题，防止账号密码泄露，保证个人信息安全。</aside>
                                        <h2 class="subtitle">四、模拟风险</h2>
                                        <aside>本网站提供的模拟炒股操作平台，非股市实盘。该模拟炒股操作平台可能因证券交易所发布的数据信息、网站技术瑕疵、人工失误等出现系统问题，用户对此风险须有足够的了解。</aside>
                                        <h2 class="subtitle">五、规则风险</h2>
                                        <aside>注册用户在约投顾提供的模拟炒股操作平台进行模拟买卖交易时，会受到模拟炒股比赛规则的限制，如止损卖出、违规强制卖出等规则。这些比赛规则都极大的影响与此相关的买卖、投资信息的质量和准确程度。其他注册用户和网站访客查阅本网站某一注册用户的买卖记录时，对此风险须有足够的认识。</aside>
                                        <h2 class="subtitle">六、变更风险</h2>
                                        <aside>注册用户的观点、意见发布之后，其观点意见可能因证券市场宏观、微观因素变化或国家政策调整而不再准确或失效，由此而导致的信息失效风险。</aside>
                                        <h2 class="subtitle">七、选择风险</h2>
                                        <aside>注册用户自身因素，如投资经验、教育背景、研究水平等都极大地影响发表在本网站信息的质量和特点。所有注册用户和网站访客均可将符合自身投资特点的其他注册用户提供的信息、意见作为参考。本网站对注册用户和网站访客自由参考其他注册用户信息意见后的收益不做任何保证。</aside>
                                        <h2 class="subtitle">八、自身风险</h2>
                                        <aside>注册用户和网站访客以其他注册用户提供的信息作为投资参考时，因自身的错误理解或操作不当，导致投资不当所造成的损失和风险。</aside>
                                        <h2 class="subtitle">九、虚拟风险</h2>
                                        <aside>注册用户的个人信息、投资计划等，均通过网络发布，注册用户和网站访客应对网络的虚拟性、不确定性有充分的认识。</aside>
                                        <h2 class="subtitle">十、第三方服务风险</h2>
                                        <aside>如网络服务接入商、短信发送商、移动运营商的服务问题、技术问题、网关问题等造成注册用户和网站访客接收网站信息延迟、错误、异常等，对用户造成的第三方服务风险。</aside>
                                        <h2 class="subtitle">十一、经营风险</h2>
                                        <aside>由于国家政策、法规的调整、变化，我网站无法继续经营产生的经营风险。</aside>
                                        <h2 class="subtitle">十二、链接风险</h2>
                                        <aside>约投顾网络服务可能会提供与其他国际互联网网站或资源进行链接。对于前述网站或资源是否可以利用，约投顾不予担保。</aside>
                                        <aside>上述风险提示不保证包括注册用户和网站访客用户浏览、参考本网站信息的全部风险，用户对此应有清醒的认识，并能够根据自身经济实力、投资经验和心理承受能力独立做出投资决定。用户完全同意所有证券投资风险及一切损失和后果由自身承担，本网站不承担任何经济责任和法律责任。</aside>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- footer -->
                    <%@include file="../common/front-foot.jsp" %>
            </body>

    </html>
