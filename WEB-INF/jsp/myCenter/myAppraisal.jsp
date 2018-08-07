<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>风险评估</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
                <link rel="stylesheet" href="/public/v2/my/myAppraisal.css?v=0329">

                <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                        <div id="customeStock" class="clear">
                            <div class="container">
                                <%@ include file="../backstage/_menu.jsp"%>
                                    <div class="right">
                                        <div id="myAppraisal">
                                            <div class="titleBar">
                                                <span class="title-1">风险评估</span>
                                            </div>
                                            <div class="questionBar">
                                                <div class="prefix">
                                                    <h1>尊敬的客户：</h1>
                                                    <p class="descript">
                                                        为了正确评估您的风险承受能力，以利于我们更好的为您提供证券投资顾问服务，在您进行证券投资之前，请如实填写此表，或由我司工作人员对你进行问答。根据评估结果，您可以比较客观地了解您的风险承受能力，从而协助您选择适合您的证券投资计划。该评估结果仅供参考，不构成投资建议。（说明：评估表选项中“以上”均包含本数，“以下”均不包含本数。）
                                                    </p>
                                                </div>
                                                <div class="contents">
                                                    <div class="title"></div>
                                                    <div class="subtitle"></div>
                                                    <div class="ques-items"></div>
                                                </div>
                                                <div class="submit">
                                                    <div class="confirm">
                                                        <div>投资者签署确认:</div>
                                                        <div class="indent">本人已经了解并愿意遵守国家有关证券市场管理的法律、法规、规章及相关业务规则，本人在此郑重承诺以上填写的内容真实、准确、完整。若本人提供的信息发生任何重大变化，本人将及时书面通知贵公司。</div>
                                                    </div>
                                                    <button>提交</button>
                                                </div>
                                                <div class="tip">
                                                    <p>本问卷旨在了解您可承受的风险程度等情况，借此协助您选择合适的产品或服务类别，以符合您的风险承受能力。 风险承受能力评估是本公司向投资者履行适当性职责的一个环节，其目的是使本公司所提供的产品或服务与您的风险承受能力等级相匹配。
                                                    </p>
                                                    <p class="">本公司特别提醒您：本公司向投资者履行风险承受能力评估等适当性职责，并不能取代您自己的投资判断，也不会降低产品或服务的固有风险。同时，与产品或服务相关的投资风险、履约责任以及费用等将由您自行承担。
                                                        本公司提示您：本公司根据您提供的信息对您进行风险承受能力评估，开展适当性工作。您应当如实提供相关信息及证明材料，并对所提供的信息和证明材料的真实性、准确性、完整性负责。</p>
                                                    <p>本公司建议：当您的各项状况发生重大变化时，需对您所投资的产品及时进行重新审视，以确保您的投资决定与您可承受的投资风险程度等实际情况一致。</p>
                                                    <p>本公司在此承诺，对于您在本问卷中所提供的一切信息，本公司将严格按照法律法规要求承担保密义务。除法律法规规定的有权机关依法定程序进行查询以外，本公司保证不会将涉及您的任何信息提供、泄露给任何第三方，或者将相关信息用于违法、不当用途。</p>
                                                </div>
                                            </div>
                                            <div class="appraisal-done">
                                                <div class="result">
                                                    <span class="label">您当前的投资风险等级为：</span>
                                                    <span class="value">稳健性</span>
                                                </div>
                                                <div class="re-appraisal">
                                                    <button>重新评测</button>
                                                </div>
                                                <div class="appraisal-back">评估完成，<strong class="appraisal-count">5</strong>秒后跳转</div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <!-- footer -->
                        <%@include file="../common/front-foot.jsp"%>
                            <script src="/public/v2/my/myAppraisal.bundle.js?v=20170803182152"></script>
                <script>
                    onSelect('我的')
                </script>
                </body>

    </html>