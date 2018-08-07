<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="../common/seo.jspf" %>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>招贤纳士</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/help/css/help.css?0329">
            <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
            <style>
            .li6 {
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
                        <a>招贤纳士</a>
                    </div>
                    <div id="helpWrap">
                        <!-- <div class="help-banner"><img src="/private/help/images/help-banner.png"></div> -->
                        <div id="help" class="yn-wrap">
                            <%@include file="../help/help-common.jsp" %>
                                <div class="help-right fr">
                                    <!-- 加入我们 -->
                                    <div class="contentItem" id="join">
                                        <h1 class="title"><p class="tc">招纳贤士<br/><font>Join us</font></p></h1>
                                        <h2 class="hot">热招职位</h2>
                                        <p class="jobs"><i class="fa fa-edit"></i><strong>H5前端开发工程师</strong></p>
                                        <span class="depict"><strong>工作职责:</strong></span>
                                        <span>1. 参与公司网站、各软件项目的设计和开发工作；</span>
                                        <span>2. 负责移动端WEB/WAP网站和Web App开发,确保在不同平移动设备、浏览器上均拥有良好的兼容性（需要兼容微信浏览器，以及Webkit内核的移动端浏览器，包括Chrome，360等）和优质的用户体验；</span>
                                        <span>3. 负责支持推广运营需要的活动页/宣传页等交互效果比较丰富的H5页面；</span>
                                        <span>4. 对浏览器兼容性问题有丰富经验。处理过移动web设备兼容性问题者优先，</span>
                                        <span class="depict"><strong>任职要求 ：</strong></span>
                                        <span>1、精通HTML/HTML5/CSS3/Javascript/页面模板等前端技术，熟悉W3C标准，能编写兼容多种浏览器的前端页面代码，可提升搜索引擎收录。</span>
                                        <span>2、精通Ajax、JavaScript、Xml、DOM、DHTML等前端技术，使用过jquery、ext、Dojo、Prototype等js框架的至少一种。</span>
                                        <span>3、熟悉主流移动web开发框架，并有过1年以上实际项目开发经验，比如Jquery，Jquery mobile，bootstrap, zepto等前端框架,AngualrJS等框架</span>
                                        <span>4、能够通过使用的框架或者自编类库解决移动设备的显示层和业务层兼容性问题优先</span>
                                        <span>5、熟练掌握盒模型、各种尺寸屏幕的响应式布局以及浏览器和移动设备兼容性。</span>
                                        <span>6、对用户体验、交互操作流程、及用户需求有深入理解</span>
                                        <span>7、具有如下经验者可优先<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具有移动终端上加载性能优化者优先<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具有移动证券项目开发经验者优先</span>
                                        <p class="jobs"><i class="fa fa-edit"></i><strong>运营经理&运营总监</strong></p>
                                        <span class="depict"><strong>工作职责：</strong></span>
                                        <span>1、根据产品特性，制定和执行合理的运营目标、完善的运营计划、策划运营活动，完成提升用户量、活跃度等业务指标；</span>
                                        <span>2、提升平台价值和粘性，提高用户活跃度，负责APP下载量、注册人数、日活等运营指标。</span>
                                        <span>3、负责新型网络媒体渠道的开拓、建立、监控、维护和优化；为公司的战略发展提供决策依据；</span>
                                        <span>4、积极寻求市场推广资源，负责对外合作，落实执行并对执行结果负责</span>
                                        <span>5、负责金融业务的日常管理，协调内外关系，建立健全各项管理制度、程序，优化工作流程，提高工作效率。</span>
                                        <span>6、搭建及管理运营团队、带领并培养团队成员，激励运营团队的工作热情及工作效率、行使运营工作的指导、监督和管理权力。</span>
                                        <span class="depict"><strong>任职要求：</strong></span>
                                        <span>1、从事互联网运营工作3年以上，深入了解互联网行业。有金融行业经验者可加分。</span>
                                        <span>2、熟悉微信、微博推广、社区论坛推广、搜索引擎排名等推广方式及能力。</span>
                                        <span>3、熟悉移动互联网行业，熟悉各种软件商店、论坛、手机厂商或渠道商，了解Android产品各市场的规则，熟悉IOS和Android平台及App产品，对App的推广和运营有深刻的认识</span>
                                        <span>4、对运营数据、用户行为数据敏感，利用工具进行数据分析和挖掘，提升内容运营质量，改善用户运营策略，提出产品改进需求</span>
                                        <span>5、善于处理和应对大量并行工作，高效的执行力，跨部门合作的沟通能力。具有较强的自我管理和时间管理能力；愿意与团队共同成长。</span>
                                        <p class="jobs"><i class="fa fa-edit"></i><strong>测试工程师</strong></p>
                                        <span class="depict"><strong>工作职责：</strong></span>
                                        <span>1、负责WEB项目和手机APP项目的软件测试，产品的质量和保证；</span>
                                        <span>2、根据产品需求和设计文档，制定测试计划，设计测试数据和测试用例，并分析测试需求、设计测试流程； 提交测试报告。完整地记录测试结果，编写相关的技术文档</span>
                                        <span>3、执行具体测试任务并确认测试结果、缺陷跟踪，完成测试报告以及测试结果分析； </span>
                                        <span>4、在测试各环节与开发、产品等部门沟通保证测试输入和输出的正确性和完备性； </span>
                                        <span>5、提出对产品的进一步改进的建议，并评估改进方案是否合理；</span>
                                        <span class="depict"><strong>任职要求：</strong></span>
                                        <span>1、熟悉linux系统，能编写完整shell脚本；熟练使用python、java语言辅助测试。</span>
                                        <span>2、熟悉测试流程，能够编写测试用例，区分功能测试和性能测试</span>
                                        <span>3、熟练使用loadrunner、jmeter等测试工具进行性能测试工作</span>
                                        <span>4、熟悉使用appium、selenium自动化测试工具，熟悉手机端自动化测试软件，单元测试软件，UI测试软件等</span>
                                        <span>5、根据产品需求和产品设计,编写功能测试设计和用例,开发自动化测试用例脚本并执行。</span>
                                        <span>6、2年以上测试工作经验； </span>
                                        <span>7、工作态度认真严谨，有较强的表达能力和沟通能力及文档编辑能力，对细节认真思考；测试领域新技术，方法的研究应用与推广,提升行业影响力；</span>
                                        <span>8、拥有金融行业工作经验，熟悉股票，基金专业知识者优先考虑</span>
                                        <div class="map"><span><i class="fa fa-map-marker"></i>工作地点：北京</span><span><i class="fa fa-envelope"></i>邮箱yunnanchanyehr@sina.com(邮件标题请注明应聘职位)</span></div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- footer -->
                    <%@include file="../common/front-foot.jsp" %>
            </body>

    </html>
