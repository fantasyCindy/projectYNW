<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>服务协议</title>
            <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" type="text/css" href="/private/protocol/protocol.css?000006">
                <style>
                .deal_content{
                    margin-top:20px;
                }
                .top {
                    margin-top: 20px;
                }
                
                .role {
                    margin-bottom: 35px;
                }
                
                .top .role {
                    width: 48%;
                }
                
                .top {
                    color: #000;
                    font-size: 16px;
                }
                
                .top .role div {
                    margin-bottom: 10px;
                }
                
                .top .role .company {
                    position: relative;
                    display: block;
                    margin-top: 10px;
                }
                
                .bold {
                    font-weight: bolder;
                }
                
                .contractNum-wrap {
                    display: none;
                }
                
                .role1 {
                    position: relative;
                }
                
                .stamp {
                    display: none;
                    width: 115px;
                    position: absolute;
                    left: 200px;
                    top: -20px;
                }
                
                .stamp img {
                    width: 100%;
                }
                </style>
    </head>

    <body style="background:#f8f8f8" class="f14 yahei">
        <!-- 引入头部 -->
        <%@include file="../v2/front-head-v2.jsp" %>
            <div class="deal_content mx1168">
                <h1>《约投顾网站用户注册服务协议》</h1>
                <p class="explain">
                    尊敬的用户，请您仔细阅读以下服务协议，您点击同意并成功注册为约投顾注册用户的行为即视为您自愿接受本服务协议条款，并自愿遵守相关条款的约束。
                </p>
                <p>
                    <strong>第一章 总则</strong>
                </p>
                <p>
                    第一条 约投顾是专注于个人活跃投资者相互交流、分享心得 的互联网社区。
                </p>
                <p>
                    第二条 所有同意并接受本《约投顾网站用户注册服务协议》并注册成功的用户，依法享有约投顾用户的权利并承担相应的义务。
                </p>
                <p>
                    第三条 约投顾注册用户（以下简称：用户），其在网站一切行为活动需遵守本守则。
                </p>
                <p>
                    第四条 本守则最终解释权、修改权归约投顾所有。
                </p>
                <p>
                    第五条 约投顾其他版主或管理所制定的一切规则均不得与本守则相抵触。
                </p>
                <p class="mt20">
                    <strong>第二章 用户的基本权利和义务</strong>
                </p>
                <p>
                    第六条 通过真实、准确的个人资料申请注册成功后 即可成为约投顾用户，获得约投顾的登陆使用权限。
                </p>
                <p>
                    第七条 用户自行承担账号和密码的保管责任，并就其账号密码下一切行为活动负法律责任。
                </p>
                <p>
                    第八条 用户注册账号的使用权归属用户，所有权归属约投顾。
                </p>
                <p>
                    第九条 用户有权在拥有讨论权限的社区版块根据法律法规及本协议规则进行发言、讨论。
                </p>
                <p>
                    第十条 用户有义务提供真实、准确的注册个人资料，并在有变更时做及时更新。
                </p>
                <p>
                    第十一条 约投顾保证不对外公开任何用户的注册资料及用户在使用网络服务时存储在约投顾的非公开内容 ，以下情况除外：
                </p>
                <p>
                    （1）事先获得用户的明确授权；
                </p>
                <p>
                    （2）基于用户服务的需求，向约投顾关联公司、合作伙伴等第三方提供；
                </p>
                <p>
                    （3）根据有关法律法规要求、相关政府主管部门的要求；
                </p>
                <p>
                    （4）为维护社会公众的利益；
                </p>
                <p>
                    （5）为维护约投顾的合法权益；
                </p>
                <p>
                    第十二条 用户需尊重网上道德，不得违反社区用户发布内容的审核管理规定。用户要为此承担一切直接或间接导致的民事或刑事法律责任。
                </p>
                <p>
                    第十三条 用户有权通过网站正式公开渠道，包括但不限于：客服电话、在线客服、电子邮件等方式进行问题问股、申诉，反馈意见和建议。
                </p>
                <p>
                    第十四条 用户同意接受约投顾通过电子邮件、手机短信或其他方式向网站用户发送站内资讯或其他相关信息等。
                </p>
                <p>
                    第十五条 用户发现其账号遭他人非法使用或存在安全漏洞，应立即通知约投顾并提供相应证据。
                </p>
                <p>
                    第十六条 用户可以通过网站提供的支付工具，兑换约投顾虚拟金币，购买约投顾及约投顾合作伙伴的收费网络服务
                </p>
                <p class="mt20">
                    <strong>第三章 用户行为规范</strong>
                </p>
                <p>
                    第十七条 用户注册、使用约投顾网络服务应符合现行法律法规规定。
                </p>
                <p>
                    禁止任何私下有偿或无偿转让账号行为，包括但不限于：向第三方赠予、借用、租用、转让、售卖或者授权他人使用该账号等，因账号问题产生的纠纷问题自行承担法律责任。
                </p>
                <p>
                    禁止用户私下有偿或无偿转让其在约投顾或约投顾合作伙伴处购买的付费产品，包括但不限于：向第三方赠予、借用、租用、转让、售卖或者授权他人使用等，如有上述行为，约投顾将采取法律武器保护合法权益。
                </p>
                <p>
                    第十八条 用户不得通过任何非约投顾官方手段进行注册账号、发布内容、关注他人等。
                </p>
                <p>
                    第十九条 用户注册提供的个人资料不得包含以下违法或不良的信息，否则约投顾有权拒绝该用户使用网站服务：
                </p>
                <p>
                    （1）请勿以党和国家领导人或其他名人的真实姓名 、字号、艺名、笔名、绰号做昵称；
                </p>
                <p>
                    （2）请勿以国家机构或其他机构的名称做昵称；
                </p>
                <p>
                    （3）请勿使用不文明、不健康的昵称，或包含歧视、侮辱、人身攻击、猥亵类词语的昵称；
                </p>
                <p>
                    （5）请勿使用易产生歧义、引起他人误解之昵称；
                </p>
                <p>
                    （6）请勿使用带有广告、疑似广告、联系方式等信息的昵称；
                </p>
                <p>
                    （7）请勿使用带有以上信息内容的图片作为头像。
                </p>
                <p>
                    （8）不得使用隐晦表达等方式规避以上限制
                </p>
                <p>
                    第二十条 约投顾致力于为用户搭建投资学习、经验分享的互动交流平台。
                </p>
                <p>
                    我们鼓励用户自由讨论交流，但用户发布的所有信息须严格遵守国家法律法规及约投顾内容审核管理规定：
                </p>
                <p>
                    【法规类】
                </p>
                <p>
                    （1）遵守《证券法》、《信息网络传播权保护条例》等国家法律法规、规章条例；
                </p>
                <p>
                    （2）严禁危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一；
                </p>
                <p>
                    （3）严禁攻击中国共产党、国家机关、国家体制、国家领导人、国家政策、国家法律法规的内容；
                </p>
                <p>
                    （4）严禁损害国家荣誉和利益；
                </p>
                <p>
                    （5）严禁煽动民族仇恨、民族歧视、破坏民族团结；
                </p>
                <p>
                    （6）严禁破坏国家宗教政策、宣扬邪教和封建迷信；
                </p>
                <p>
                    （7）严禁散布谣言、扰乱社会秩序、破坏社会稳定；
                </p>
                <p>
                    （8）严禁散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪；
                </p>
                <p>
                    （9）严禁侵害他人合法权益；
                </p>
                <p>
                    （10）严禁含有法律法规及其他规范性文件禁止的其他内容；
                </p>
                <p>
                    【网络服务类】
                </p>
                <p>
                    （1）遵守约投顾所有与网络服务相关的协议、规定及管理办法；
                </p>
                <p>
                    （2）不得以任何非法目的使用约投顾网络服务；
                </p>
                <p>
                    （3）不得以任何形式侵犯约投顾的商业利益；
                </p>
                <p>
                    （4）不得侵犯约投顾知识产权等合法权益；
                </p>
                <p>
                    （5）不得侵犯任何第三方的著作权、商标权、名称权、名誉权及其他合法权益；
                </p>
                <p>
                    （6）不得利用约投顾平台上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的内容或其他任何非法的信息资料；
                </p>
                <p>
                    （7）不得利用约投顾平台制作、上传、发布、传播、转载任何含有法律、行政法规禁止的内容；
                </p>
                <p>
                    （8）不得利用约投顾服务平台及相关功能，向其他用户发布代客理财、代客操盘、收益分成、承诺收益等非法证券投资咨询活动信息；
                </p>
                <p>
                    （9）不得利用约投顾平台泄露其他用户的注册资料、联系方式、家庭住址、工作情况以及用户不愿意公开的信息等；
                </p>
                <p>
                    （10）不得发布妨害第三方权益的文件或信息：病毒代码、黑客程序、其他恶意程序等
                </p>
                <p>
                    【网站类】
                </p>
                <p>
                    （1）遵守约投顾内容审核规定，遵守股市直播、博客、论坛等各板块规则；
                </p>
                <p>
                    （2）遵守约投顾付费产品保密原则，未经允许不得以任何方式泄露付费产品的内容；
                </p>
                <p>
                    （3）禁止在约投顾散布传播虚假不实、误导性消息；
                </p>
                <p>
                    （4）禁止发布煽动、诋毁、诽谤、辱骂、人身攻击、侮辱性言论等内容；
                </p>
                <p>
                    （5）禁止发布含有广告或疑似广告性质的内容；
                </p>
                <p>
                    （6）禁止发布带有其他网站链接或代码的内容；
                </p>
                <p>
                    （7）禁止发布任何联系方式、银行帐号等的信息；
                </p>
                <p>
                    （8）禁止发布或负面评论包括时政事件、敏感政治事件、政治段子、重要领导人信息、特殊事件等；
                </p>
                <p>
                    （9）禁止发布、讨论与约投顾无关的产品，包括不限于同类网站、同类产品；
                </p>
                <p>
                    （10）禁止出现用户通过发言、提问、送礼物、发帖回帖等恶意捣乱的行为；
                </p>
                <p>
                    （11）禁止合买、倒卖约投顾任何付费产品的行为；
                </p>
                <p>
                    （12）禁止恶意刷屏、恶意刷点击率行为；
                </p>
                <p>
                    （13）禁止伪造、借用约投顾官方或播主身份及口吻发布信息的行为；
                </p>
                <p>
                    （14） 禁止恶意挑起社区直播间矛盾事件，包括教唆、引诱他人违反社区公约
                </p>
                <p class="mt20">
                    <strong>第四章 处罚规则</strong>
                </p>
                <p>
                    第二十一条 约投顾针对用户违规内容和行为有权直接进行违规处罚，详见《约投顾社区公约》。具体包括：
                </p>
                <p>
                    （1）内容处理：删除、审核不通过；
                </p>
                <p>
                    （2）账号处理：禁言、黑名单、无效账号；
                </p>
                <p>
                    （3）用户处理：禁止网络IP、禁止cookies
                </p>
                <p>
                    第二十二条 用户涉及违法行为，约投顾可上报国家网络管理机关或移交相关司法机关。对约投顾造成不良影响的，约投顾保留追究信息发布者法律责任的权利。
                </p>
                <p class="mt20">
                    <strong>第五章 附则</strong>
                </p>
                <p>
                    第二十三条 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
                </p>
                <p>
                    第二十四条 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
                </p>
                <p>
                    第二十五条 本协议解释权及修订权归重庆东金投资顾问有限公司所有。
                </p>
            </div>
            <%@include file="../common/front-foot.jsp" %>
        
                </script>
    </body>

    </html>
