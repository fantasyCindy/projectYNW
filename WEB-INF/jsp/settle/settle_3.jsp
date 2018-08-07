<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf"%>
        <title>约牛，让股民与牛人相约</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" type="text/css" href="/private/settle/css/settle.css?0329">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="site-main" style="margin-top:18px;">
                <div class="wrapper">
                    <div class="site-main-single-cnt">
                        <h2 style="text-align: center;">投资机构注册</h2>
                        <div class="steps-wrap steps-wrap-3">
                            <div id="indicate" class="step-item step-item-1"></div>
                            <div class="step-text clearfix">
                                <span class="past">录入机构信息</span>
                                <span class="past1">上传营业执照副本</span>
                                <span class="past2">提交成功</span>
                            </div>
                        </div>
                        <form action="" id="form_1" method="post" class="">
                            <div class="form-split"></div>
                            <h2 class="block-title mt30">基本信息</h2>
                            <table class="table-register mt30">
                                <tbody>
                                    <div class="form-group">
                                        <div class="form-field">
                                            <span class="red">*</span>
                                            <span>机构名称</span>
                                        </div>
                                        <div class="dropdownlist-wrap group-middle">
                                            <input id="txtCompany" type="text" class="form-control" name="company" data-shortname="" placeholder="所在公司">
                                            <div class="dropdownlist-cnt clearfix" style="display: none;">
                                                <div class="dropdownlist-cnt-left">
                                                    <p>索引</p>
                                                    <div>
                                                        <ul>
                                                            <li class="cur">A</li>
                                                            <li>B</li>
                                                            <li>C</li>
                                                            <li>D</li>
                                                            <li>F</li>
                                                            <li>G</li>
                                                            <li>H</li>
                                                            <li>J</li>
                                                            <li>K</li>
                                                            <li>L</li>
                                                            <li>M</li>
                                                            <li>N</li>
                                                            <li>P</li>
                                                            <li>Q</li>
                                                            <li>R</li>
                                                            <li>S</li>
                                                            <li>T</li>
                                                            <li>W</li>
                                                            <li>X</li>
                                                            <li>Y</li>
                                                            <li>Z</li>
                                                            <li></li>
                                                            <li></li>
                                                            <li></li>
                                                            <li></li>
                                                            <li></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="dropdownlist-cnt-right">
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index"></div>
                                                        <div class="list">
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">A</div>
                                                        <div class="list">
                                                            <p shortname="爱建证券">爱建证券有限责任公司</p>
                                                            <p shortname="安信证券">安信证券股份有限公司</p>
                                                            <p shortname="大时代投资">安徽大时代投资咨询有限公司</p>
                                                            <p shortname="华安新兴">安徽华安新兴证券投资咨询有限责任公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">B</div>
                                                        <div class="list">
                                                            <p shortname="高华证券">北京高华证券有限责任公司</p>
                                                            <p shortname="渤海证券">渤海证券股份有限公司</p>
                                                            <p shortname="博星投资">北京博星投资顾问有限公司</p>
                                                            <p shortname="东方高圣">北京东方高圣投资顾问有限公司</p>
                                                            <p shortname="北京股商">北京股商证券投资顾问有限公司</p>
                                                            <p shortname="海问咨询">北京海问咨询有限公司</p>
                                                            <p shortname="和众汇富">北京和众汇富咨询有限公司</p>
                                                            <p shortname="金美林投资">北京金美林投资顾问有限公司</p>
                                                            <p shortname="北京京放">北京京放投资管理顾问有限责任公司</p>
                                                            <p shortname="盛世华商">北京盛世华商投资咨询有限公司</p>
                                                            <p shortname="北京首证">北京首证投资顾问有限公司</p>
                                                            <p shortname="北京指南针">北京指南针科技发展股份有限公司</p>
                                                            <p shortname="中方信富">北京中方信富投资管理咨询有限公司</p>
                                                            <p shortname="中富金石">北京中富金石咨询有限公司</p>
                                                            <p shortname="中和应泰">北京中和应泰财务顾问有限公司</p>
                                                            <p shortname="中资北方">北京中资北方投资顾问有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">C</div>
                                                        <div class="list">
                                                            <p shortname="财达证券">财达证券有限责任公司</p>
                                                            <p shortname="财富证券">财富证券有限责任公司</p>
                                                            <p shortname="财通证券">财通证券股份有限公司</p>
                                                            <p shortname="长城证券">长城证券有限责任公司</p>
                                                            <p shortname="长江证券承销保荐">长江证券承销保荐有限公司</p>
                                                            <p shortname="长江证券">长江证券股份有限公司</p>
                                                            <p shortname="诚浩证券">诚浩证券有限责任公司</p>
                                                            <p shortname="川财证券">川财证券有限责任公司</p>
                                                            <p shortname="长城国瑞证券">长城国瑞证券有限公司</p>
                                                            <p shortname="汇阳投资">成都汇阳投资顾问有限公司</p>
                                                            <p shortname="重庆东金">重庆东金投资顾问有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">D</div>
                                                        <div class="list">
                                                            <p shortname="大通证券">大通证券股份有限公司</p>
                                                            <p shortname="大同证券">大同证券经纪有限责任公司</p>
                                                            <p shortname="德邦证券">德邦证券有限责任公司</p>
                                                            <p shortname="第一创业摩根大通">第一创业摩根大通证券有限责任公司</p>
                                                            <p shortname="第一创业证券">第一创业证券股份有限公司</p>
                                                            <p shortname="东北证券">东北证券股份有限公司</p>
                                                            <p shortname="东方花旗证券">东方花旗证券有限公司</p>
                                                            <p shortname="东方证券">东方证券股份有限公司</p>
                                                            <p shortname="东海证券">东海证券股份有限公司</p>
                                                            <p shortname="东吴证券">东吴证券股份有限公司</p>
                                                            <p shortname="东兴证券">东兴证券股份有限公司</p>
                                                            <p shortname="东莞证券">东莞证券有限责任公司</p>
                                                            <p shortname="北部资产">大连北部资产经营有限公司</p>
                                                            <p shortname="华讯投资">大连华讯投资咨询有限公司</p>
                                                            <p shortname="鼎信汇金">鼎信汇金(北京)投资管理有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">F</div>
                                                        <div class="list">
                                                            <p shortname="方正证券">方正证券股份有限公司</p>
                                                            <p shortname="天信投资">福建天信投资咨询顾问股份有限公司</p>
                                                            <p shortname="中讯研究">福建中讯证券研究有限责任公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">G</div>
                                                        <div class="list">
                                                            <p shortname="高盛高华证券">高盛高华证券有限责任公司</p>
                                                            <p shortname="光大证券">光大证券股份有限公司</p>
                                                            <p shortname="广发证券">广发证券股份有限公司</p>
                                                            <p shortname="广发证券资产管理">广发证券资产管理（广东）有限公司</p>
                                                            <p shortname="广州证券">广州证券股份有限公司</p>
                                                            <p shortname="国都证券">国都证券有限责任公司</p>
                                                            <p shortname="国海证券">国海证券股份有限公司</p>
                                                            <p shortname="国金证券">国金证券股份有限公司</p>
                                                            <p shortname="国开证券">国开证券有限责任公司</p>
                                                            <p shortname="国联证券">国联证券股份有限公司</p>
                                                            <p shortname="国盛证券">国盛证券有限责任公司</p>
                                                            <p shortname="国泰君安证券">国泰君安证券股份有限公司</p>
                                                            <p shortname="国信证券">国信证券股份有限公司</p>
                                                            <p shortname="国元证券">国元证券股份有限公司</p>
                                                            <p shortname="博众投资">广东博众证券投资咨询有限公司</p>
                                                            <p shortname="科德投资">广东科德投资顾问有限公司</p>
                                                            <p shortname="恒生研究所">广州广证恒生证券研究所有限公司</p>
                                                            <p shortname="汇正财经">广州汇正财经顾问有限公司</p>
                                                            <p shortname="广州万隆">广州市万隆证券咨询顾问有限公司</p>
                                                            <p shortname="越声理财">广州越声理财咨询有限公司</p>
                                                            <p shortname="经传多赢">广州经传多赢投资咨询有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">H</div>
                                                        <div class="list">
                                                            <p shortname="海际大和证券">海际大和证券有限责任公司</p>
                                                            <p shortname="海通证券">海通证券股份有限公司</p>
                                                            <p shortname="航天证券">航天证券有限责任公司</p>
                                                            <p shortname="恒泰长财证券">恒泰长财证券有限责任公司</p>
                                                            <p shortname="恒泰证券">恒泰证券股份有限公司</p>
                                                            <p shortname="宏信证券">宏信证券有限责任公司</p>
                                                            <p shortname="宏源证券">宏源证券股份有限公司</p>
                                                            <p shortname="红塔证券">红塔证券股份有限公司</p>
                                                            <p shortname="华安证券">华安证券股份有限公司</p>
                                                            <p shortname="华宝证券">华宝证券有限责任公司</p>
                                                            <p shortname="华创证券">华创证券有限责任公司</p>
                                                            <p shortname="华福证券">华福证券有限责任公司</p>
                                                            <p shortname="华林证券">华林证券有限责任公司</p>
                                                            <p shortname="华龙证券">华龙证券有限责任公司</p>
                                                            <p shortname="华融证券">华融证券股份有限公司</p>
                                                            <p shortname="华泰联合证券">华泰联合证券有限责任公司</p>
                                                            <p shortname="华泰证券">华泰证券股份有限公司</p>
                                                            <p shortname="华西证券">华西证券股份有限公司</p>
                                                            <p shortname="华英证券">华英证券有限责任公司</p>
                                                            <p shortname="华鑫证券">华鑫证券有限责任公司</p>
                                                            <p shortname="港澳资讯">海南港澳资讯产业股份有限公司</p>
                                                            <p shortname="顶点财经">杭州顶点财经网络传媒有限公司</p>
                                                            <p shortname="和讯">和讯信息科技有限公司</p>
                                                            <p shortname="源达咨询">河北源达证券投资咨询有限公司</p>
                                                            <p shortname="九鼎德盛">河南九鼎德盛投资顾问有限公司</p>
                                                            <p shortname="容维投资">黑龙江省容维投资顾问有限责任公司</p>
                                                            <p shortname="金证投资">湖南金证投资咨询顾问有限公司</p>
                                                            <p shortname="巨景投资">湖南巨景证券投资顾问有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">J</div>
                                                        <div class="list">
                                                            <p shortname="江海证券">江海证券有限公司</p>
                                                            <p shortname="金元证券">金元证券股份有限公司</p>
                                                            <p shortname="金百临投资">江苏金百临投资咨询有限公司</p>
                                                            <p shortname="天鼎投资">江苏天鼎投资咨询有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">K</div>
                                                        <div class="list">
                                                            <p shortname="开源证券">开源证券有限责任公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">L</div>
                                                        <div class="list">
                                                            <p shortname="联讯证券">联讯证券股份有限公司</p>
                                                            <p shortname="联合信用">联合信用投资咨询有限公司</p>
                                                            <p shortname="弘历投资">辽宁弘历投资咨询有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">M</div>
                                                        <div class="list">
                                                            <p shortname="民生证券">民生证券股份有限公司</p>
                                                            <p shortname="摩根华鑫证券">摩根士丹利华鑫证券有限责任公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">N</div>
                                                        <div class="list">
                                                            <p shortname="南京证券">南京证券股份有限公司</p>
                                                            <p shortname="海顺投资">宁波海顺投资咨询有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">P</div>
                                                        <div class="list">
                                                            <p shortname="平安证券">平安证券有限责任公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">Q</div>
                                                        <div class="list">
                                                            <p shortname="齐鲁证券">齐鲁证券有限公司</p>
                                                            <p shortname="青岛大摩">青岛市大摩投资咨询有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">R</div>
                                                        <div class="list">
                                                            <p shortname="日信证券">日信证券有限责任公司</p>
                                                            <p shortname="瑞信方正证券">瑞信方正证券有限责任公司</p>
                                                            <p shortname="瑞银证券">瑞银证券有限责任公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">S</div>
                                                        <div class="list">
                                                            <p shortname="山西证券">山西证券股份有限公司</p>
                                                            <p shortname="东方证券资产管理">上海东方证券资产管理有限公司</p>
                                                            <p shortname="光大证券资产管理">上海光大证券资产管理有限公司</p>
                                                            <p shortname="国泰君安资产管理">上海国泰君安证券资产管理有限公司</p>
                                                            <p shortname="海通证券资产管理">上海海通证券资产管理有限公司</p>
                                                            <p shortname="上海华信证券">上海华信证券有限责任公司</p>
                                                            <p shortname="上海证券">上海证券有限责任公司</p>
                                                            <p shortname="申银万国证券">申银万国证券股份有限公司</p>
                                                            <p shortname="世纪证券">世纪证券有限责任公司</p>
                                                            <p shortname="首创证券">首创证券有限责任公司</p>
                                                            <p shortname="山东神光">山东神光咨询服务有限责任公司</p>
                                                            <p shortname="英大投资">山东英大投资顾问有限责任公司</p>
                                                            <p shortname="巨丰投资">陕西巨丰投资资讯有限责任公司</p>
                                                            <p shortname="大智慧">上海大智慧股份有限公司</p>
                                                            <p shortname="东方财富">上海东方财富证券研究所有限公司</p>
                                                            <p shortname="海能投资">上海海能证券投资顾问有限公司</p>
                                                            <p shortname="金汇信息">上海金汇信息系统有限公司</p>
                                                            <p shortname="凯石投资">上海凯石证券投资咨询有限公司</p>
                                                            <p shortname="迈步投资">上海迈步投资管理有限公司</p>
                                                            <p shortname="荣正投资">上海荣正投资咨询有限公司</p>
                                                            <p shortname="森洋投资">上海森洋投资咨询有限公司</p>
                                                            <p shortname="申万研究所">上海申银万国证券研究所有限公司</p>
                                                            <p shortname="世基投资">上海世基投资顾问有限公司</p>
                                                            <p shortname="上海新兰德">上海新兰德证券投资咨询顾问有限公司</p>
                                                            <p shortname="新资源咨询">上海新资源证券咨询有限公司</p>
                                                            <p shortname="亚商投资">上海亚商投资顾问有限公司</p>
                                                            <p shortname="益盟操盘手">上海益盟软件技术股份有限公司</p>
                                                            <p shortname="涌金理财">上海涌金理财顾问有限公司</p>
                                                            <p shortname="证联投资">上海证联投资咨询服务有限责任公司</p>
                                                            <p shortname="证券通投资">上海证券通投资资讯科技有限公司</p>
                                                            <p shortname="上证综研">上海证券之星综合研究有限公司</p>
                                                            <p shortname="中广信息">上海中广信息传播咨询有限公司</p>
                                                            <p shortname="大德汇富">深圳大德汇富咨询顾问有限公司</p>
                                                            <p shortname="君银咨询">深圳君银证券投资咨询顾问有限公司</p>
                                                            <p shortname="国诚投资">深圳市国诚投资咨询有限公司</p>
                                                            <p shortname="怀新投资">深圳市怀新企业投资顾问有限公司</p>
                                                            <p shortname="启富投资">深圳市启富证券投资顾问有限公司</p>
                                                            <p shortname="深圳新兰德">深圳市新兰德证券投资咨询有限公司</p>
                                                            <p shortname="智多盈">深圳市智多盈投资顾问有限公司</p>
                                                            <p shortname="中证投资">深圳市中证投资资讯有限公司</p>
                                                            <p shortname="尊悦投资">深圳市尊悦证券投资顾问有限公司</p>
                                                            <p shortname="珞珈投资">深圳市珞珈投资咨询有限公司</p>
                                                            <p shortname="麟龙投资">沈阳麟龙投资顾问有限公司</p>
                                                            <p shortname="大决策投资">四川大决策证券投资顾问有限公司</p>
                                                            <p shortname="钱坤投资">四川省钱坤证券投资咨询有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">T</div>
                                                        <div class="list">
                                                            <p shortname="太平洋证券">太平洋证券股份有限公司</p>
                                                            <p shortname="天风证券">天风证券股份有限公司</p>
                                                            <p shortname="天源证券">天源证券有限公司</p>
                                                            <p shortname="天相投资">天相投资顾问有限公司</p>
                                                            <p shortname="天一星辰">天一星辰（北京）科技有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">W</div>
                                                        <div class="list">
                                                            <p shortname="万和证券">万和证券有限责任公司</p>
                                                            <p shortname="万联证券">万联证券有限责任公司</p>
                                                            <p shortname="五矿证券">五矿证券有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">X</div>
                                                        <div class="list">
                                                            <p shortname="西部证券">西部证券股份有限公司</p>
                                                            <p shortname="西藏同信证券">西藏同信证券股份有限公司</p>
                                                            <p shortname="西南证券">西南证券股份有限公司</p>
                                                            <p shortname="湘财证券">湘财证券股份有限公司</p>
                                                            <p shortname="新时代证券">新时代证券有限责任公司</p>
                                                            <p shortname="信达证券">信达证券股份有限公司</p>
                                                            <p shortname="兴业证券">兴业证券股份有限公司</p>
                                                            <p shortname="高能投资">厦门高能投资咨询有限公司</p>
                                                            <p shortname="金相投资">厦门金相投资咨询有限公司</p>
                                                            <p shortname="新汇通投资">厦门市新汇通投资咨询有限公司</p>
                                                            <p shortname="鑫鼎盛">厦门市鑫鼎盛控股有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">Y</div>
                                                        <div class="list">
                                                            <p shortname="银泰证券">银泰证券有限责任公司</p>
                                                            <p shortname="英大证券">英大证券有限责任公司</p>
                                                            <p shortname="云南产业投资">云南产业投资管理有限公司</p>
                                                        </div>
                                                    </div>
                                                    <div class="dropdown-item clearfix">
                                                        <div class="index">Z</div>
                                                        <div class="list">
                                                            <p shortname="招商证券">招商证券股份有限公司</p>
                                                            <p shortname="浙商证券资产管理">浙江浙商证券资产管理有限公司</p>
                                                            <p shortname="浙商证券">浙商证券股份有限公司</p>
                                                            <p shortname="中德证券">中德证券有限责任公司</p>
                                                            <p shortname="中金公司">中国国际金融有限公司</p>
                                                            <p shortname="民族证券">中国民族证券有限责任公司</p>
                                                            <p shortname="银河证券">中国银河证券股份有限公司</p>
                                                            <p shortname="中投证券">中国中投证券有限责任公司</p>
                                                            <p shortname="中航证券">中航证券有限公司</p>
                                                            <p shortname="中山证券">中山证券有限责任公司</p>
                                                            <p shortname="中天证券">中天证券有限责任公司</p>
                                                            <p shortname="中信建投">中信建投证券股份有限公司</p>
                                                            <p shortname="中信证券">中信证券(浙江)有限责任公司</p>
                                                            <p shortname="中信证券">中信证券（山东）有限责任公司</p>
                                                            <p shortname="中信证券">中信证券股份有限公司</p>
                                                            <p shortname="中银国际">中银国际证券有限责任公司</p>
                                                            <p shortname="中邮证券">中邮证券有限责任公司</p>
                                                            <p shortname="中原证券">中原证券股份有限公司</p>
                                                            <p shortname="众成证券">众成证券经纪有限公司</p>
                                                            <p shortname="同花顺">浙江同花顺云软件有限公司</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="company-error-msg error-msg" style="line-height:27px;color: rgb(204, 51, 51); display: none;">请选择机构名称</p>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-field"><span class="red">*</span><span>机构简称</span></div>
                                        <div class="form-middle">
                                            <input id="orgShortName" name="orgShortName" type="text" class="form-control">
	                                        <p class="msg-info error-msg" style="color: rgb(204, 51, 51);display:none;">机构简称不能为空</p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-field">
                                            <span class="red">*</span>
                                            <span>机构所在地</span>
                                        </div>
                                        <div class="form-middle">
                                            <select id="select-province" class="form-control" name="select-province">
                                                <option value="0" selected>省份</option>
                                                <option value="1027">安徽</option>
                                                <option value="1">北京</option>
                                                <option value="2229">重庆</option>
                                                <option value="1149">福建</option>
                                                <option value="2909">甘肃</option>
                                                <option value="1936">广东</option>
                                                <option value="2077">广西自治区</option>
                                                <option value="2469">贵州</option>
                                                <option value="2203">海南</option>
                                                <option value="42">河北</option>
                                                <option value="646">黑龙江</option>
                                                <option value="1508">河南</option>
                                                <option value="1683">湖北</option>
                                                <option value="1799">湖南</option>
                                                <option value="1243">江西</option>
                                                <option value="809">江苏</option>
                                                <option value="579">吉林</option>
                                                <option value="462">辽宁</option>
                                                <option value="348">内蒙古自治区</option>
                                                <option value="3060">宁夏自治区</option>
                                                <option value="3009">青海</option>
                                                <option value="1353">山东</option>
                                                <option value="789">上海</option>
                                                <option value="222">山西</option>
                                                <option value="2793">陕西</option>
                                                <option value="2269">四川</option>
                                                <option value="21">天津</option>
                                                <option value="3087">新疆自治区</option>
                                                <option value="2712">西藏自治区</option>
                                                <option value="2566">云南</option>
                                                <option value="926">浙江</option>
                                                <option value="3201">香港特别行政区</option>
                                                <option value="3200">台湾</option>
                                            </select>
                                            <select id="select-city" data-verify="1" class="form-control" name="select-city">
                                                <option value="0">选择城市</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-gulp">
                                        <div class="form-field">
                                            <span class="red">*</span>
                                            <span>法人代表</span>
                                        </div>
                                        <div class="form-middle">
                                            <input type="text" class="txtbox mr10 step1" style="width:306px;" id="artificialPerson" name="artificialPerson" value="">
		                                    <p class="msg-info  error-msg" style="color: rgb(204, 51, 51); display: none;">法人代表不能为空</p>
                                        </div>
                                    </div>
                                </tbody>
                            </table>
                            <div class="form-split"></div>
                            <dl class="block-title-content">
                                <dt>机构简介</dt>
                                <dd>
                                    <textarea id="orgSummary" name="orgSummary" class="agency-text step1"></textarea>
                                    <span class="note"><span id="textCount_1">500</span>/500</span>
                                    <p class="red error-msg" style=" padding-left:126px;color: rgb(204, 51, 51);display:none;" id="orgSummaryMsg">机构简介大于50字</p>
                                </dd>
                            </dl>
                            <div class="form-split"></div>
                            <h2 class="block-title mt30">上传机构LOGO</h2>
                            <div class="pic-upload">
                                <div class="fl">
                                    <input type="hidden" id="logoimg" />
                                    <img id="max1" src="/public/images/sample-2.jpg" class="example fl" width="150px;height:150px;" />
                                    <p class="red error-msg" style="display:none;clear:both" id="head_image_id">请上传机构LOGO</p>
                                </div>
                                <div class="pic-upload-info">
                                    <p class="form-field">要求：</p>
                                    <p>1.可上传副本照片或扫描件，保证信息清晰可见;</p>
                                    <p>2.支持.jpg .gif .png格式照片，大小不超过10M;</p>
                                    <p class="mt5"><a id="upload-orgLogo" class="btn-upload">上传照片</a></p>
                                </div>
                                <div class="pic-upload-result">
                                    <div class="result-1">
                                        <img src="/public/images/sample-2.jpg" id="max2" width="150" height="150">
                                        <p>大</p>
                                    </div>
                                    <div class="result-2 tc">
                                        <img id="mid" src="/public/images/sample-2.jpg" width="75" height="75"></img>
                                        <p>中</p>
                                        <img id="min" src="/public/images/sample-2.jpg" width="50" height="50" class="mt30">
                                        <p>小</p>
                                    </div>
                                </div>
                            </div>
                            <h2 class="block-title mt30">申请人（机构联络人）</h2>
                            <table class="table-register mt30">
                                <tbody>
                                    <div class="form-gulp">
                                        <div class="form-field"><span class="red">*</span><span>姓名</span></div>
                                        <div class="form-middle">
                                            <input type="text" class="form-control" id="txtUsername" name="txtUsername">
		                                    <p class="msg-info error-msg" style="color: rgb(204, 51, 51);display: none;">姓名不能为空</p>
                                        </div>
                                        <div class="form-field">
                                            <span class="red">*</span>
                                            <span>职位</span>
                                        </div>
                                        <div class="form-middle">
                                            <input type="text" class="form-control" id="position" name="position">
		                                    <p class="msg-info error-msg" style="color: rgb(204, 51, 51);display: none;">职位不能为空</p>
                                        </div>
                                    </div>
                                    <tr>
                                        <div class="form-field">
                                            <span class="red">*</span>
                                            <span>邮箱</span>
                                        </div>
                                        <td width="250">
                                            <input type="text" class="txtbox step1" style="width:140px;" id="txtMail" name="txtMail" value="">
                                            <span class="msg-wrap middle">
		                                <span class="msg-info error-msg" style="color: rgb(204, 51, 51);display: none;" id="emailMsg">邮箱不能为空</span>
                                            <i class="icon icon-right" style="display: none;"></i>
                                            </span>
                                        </td>
                                        <td class="field"><span class=""></span><span>座机</span></td>
                                        <td>
                                            <input type="text" class="txtbox" style="width:140px;" id="telephone" name="telephone" value="">
                                            <span class="msg-wrap middle">
		                                <span class="msg-info error-msg" style="color: rgb(204, 51, 51); display: none;" id="telephoneMsg">座机不能为空</span>
                                            <span class="msg-info error-msg" style="color: rgb(204, 51, 51);display: none;" id="telephoneInfoMsg">请按格式输入：010-12345678</span>
                                            <i class="icon icon-right" style="display: none;"></i>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="field"><span class="required">*</span><span>手机号</span></td>
                                        <td colspan="3">
                                            <div class="middle">
                                                <input name="mobile" data-verify="1" id="txtMobile" type="text" class="txtbox step1" maxlength="11" style="width:140px;">
                                                <input class="btn btn-getcode ml5" id="vcode" type="button" value="获取验证码">
                                                <span class="msg-wrap middle" style="margin-top:0;">
		                                    <span class="msg-info error-msg" style="color: rgb(204, 51, 51);display: none;" id="mobileMsg">请填入您的11位手机号</span>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr id="mobileVerifyCode">
                                        <td class="field"><span class="required">*</span><span>验证码</span></td>
                                        <td colspan="3">
                                            <input id="txtVCode" type="text" class="txtbox mr10 step1" style="width:140px;">
                                            <span class="msg-wrap middle">
									    <i class="icon icon-right" style="display: none;" id="vcodeRight"></i>
										<i class="icon icon-error" style="display: none;" id="vcodeError"></i>
		                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="form-split"></div>
                            <h2 class="block-title mt30">邀请码</h2>
                            <table class="table-register mt10">
                                <tbody>
                                    <tr>
                                        <td class="field" style="vertical-align: top; padding-top: 7px;"><span>邀请码</span></td>
                                        <td>
                                            <div>
                                                <input id="inviteCode" name="inviteCode" type="text" class="txtbox" value="">
                                                <span class="msg-wrap middle">
		                                </span>
                                            </div>
                                            <div style="display:none;color:#c33;" id="inviteCodeErrorMsg">邀请码不存在</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="btn-wrap tc btn-wrap-border mt30">
                                <a href="#" class="btn btn-123-40" id="step1">下一步</a>
                            </div>
                        </form>
                        <form action="" id="form_2" method="post" style="display: none">
                            <h2 class="block-title mt30">上传营业执照副本</h2>
                            <div class="pic-upload">
                                <div class="fl">
                                    <input type="hidden" id="yyzzimg" />
                                    <img id="max11" src="/public/images/sample-2.jpg" class="example fl" width="150px;height:150px;" />
                                    <p class="red" style="display:none;clear:both" id="head_image_id">头像不能为空</p>
                                </div>
                                <div class="pic-upload-info">
                                    <p class="field mt30">建议使用清晰的营业执照副本，以提高审核进度</p>
                                    <p>
                                        <b>格式要求：</b> 支持.jpg .gif .png格式照片，大小不超过10 M。
                                    </p>
                                    <p class="mt10">
                                        <a class="btn-upload" id="upload-fake1">上传照片</a>
                                    </p>
                                </div>
                                <div class="pic-upload-result">
                                    <div class="result-1">
                                        <img src="/public/images/sample-2.jpg" id="max22" width="150" height="150">
                                        <p>大</p>
                                    </div>
                                    <div class="result-2 tc">
                                        <img id="mid1" src="/public/images/sample-2.jpg" width="75" height="75"></img>
                                        <p>中</p>
                                        <img id="min1" src="/public/images/sample-2.jpg" width="50" height="50" class="mt30">
                                        <p>小</p>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-wrap tc btn-wrap-border">
                                <a class="btn-123-40" id="step2">下一步</a>
                            </div>
                        </form>
                        <div id="form_3" class="hid">
                            <div class="register-success">
                                <p class="title">申请完成</p>
                                <p class="mt10">感谢您完成网上资料填写环节，我们的工作人员将会于3个工作日内与您取得联系，或者<a href="#" target="_blank">点击下载app</a>实时查看审核进度</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upload-img">
                <iframe></iframe>
                <div class="thickdiv"></div>
                <div class="thickbox">
                    <div class="thicktitle"><span>上传头像</span></div>
                    <a id="closeBox" class="thickclose">×</a>
                    <div class="container">
                        <div class="imageBox">
                            <div class="thumbBox"></div>
                            <div class="spinner">Loading...</div>
                        </div>
                        <div class="action">
                            <div class="new-contentarea tc">
                                <a style="display: block;" href="javascript:void(0)" class="upload-img">
                                    <label for="upload-file">选择图片</label>
                                </a>
                                <input class="" name="upload-file" id="upload-file" type="file">
                            </div>
                            <input id="btnCrop" class="Btnsty_peyton" value="预览" type="button">
                            <input id="btnZoomIn" class="Btnsty_peyton" value="+" type="button">
                            <input id="btnZoomOut" class="Btnsty_peyton" value="-" type="button">
                        </div>
                        <div class="cropped"></div>
                    </div>
                    <button>确认上传</button>
                    <span>确认上传前，请先预览效果。</span>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script type="text/javascript" src="/public/js/cropbox.js"></script>
                <script type="text/javascript" src="/public/js/form.js"></script>
                <script type="text/javascript" src="/private/settle/js/settle_3.js"></script>
                <script type="text/javascript">
                function saveruzhu() {
                    var saveData = {
                        user_id: userid,
                        name: $("#txtUsername").val(), //姓名
                        phone: $('#txtMobile').val(), //电话
                        landline: $('#telephone').val(), //座机
                        email: $('#txtMail').val(), //email
                        province: $('#select-province').find("option:selected").text(), //省份
                        city: $('#select-city').find("option:selected").text(), //城市
                        institutions_name: $('#txtCompany').val(), //公司          
                        short_name: $('#orgShortName').val(), //机构简称
                        legal_representative: $('#artificialPerson').val(), //法人代表
                        invitation_code: $('#inviteCode').val(), //邀请码	          
                        occupation: $("#position").val(),
                        description: $('#orgSummary').val(),
                        logo: $("#logoimg").val(),
                        business_license: $("#yyzzimg").val()
                    }
                    console.log("===保存数据===");
                    console.log(saveData);
                    $.post("${path}/html/investment_institutions/add.htmlx", saveData, function(data) {
                        if (data == "success") {
                            $('#step3-next').click(function() {
                                indicate.attr('class', 'step-item step-item-4');
                                form3.hide();
                                form4.show();
                                window.scrollTo(0, 0);
                            })
                        }
                    });

                }
                </script>
    </body>

    </html>
