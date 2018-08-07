<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div class="activeLayer activity-refer" style="display:none;">
        <div class="activity">
            <div class="activity-bg activity-bg-sun"></div>
            <div class="activity-bg activity-bg-done"></div>
            <div class="activity-wrap">
                <div class="activity-top"><img src="/public/v2/index/images/top.png?321" alt=""><i class="actTopClose" aria-hidden="true"><img src="/public/v2/index/images/close1.png" alt=""></i></div>
                <div class="activity-content">
                    <span class="tab"><img src="/public/v2/index/images/tu.png?321" alt=""></span>
                   <!--  <span class="tab"><img src="/public/v2/index/images/zhibo.png" alt=""></span>
                    <span class="tab"><img src="/public/v2/index/images/wengu.png" alt=""></span> -->
                    <!--  -->
                    <div class="activity-form1">
                        <div class="phone">
                            <input type="text" placeholder="输入手机号">
                        </div>
                        <div class="btn1">领取掘金策略体验</div>
                    </div>
                    <!--  -->
                    <div class="activity-form2" style="display: none">
                        <div class="phone">
                            <input type="text" placeholder="输入手机号" disabled="disabled">
                        </div>
                        <div class="pic">
                            <input type="text" placeholder="图形验证码"><img class="picCode" src="${path}/validCode.htm" alt=""></div>
                        <div class="pcode">
                            <input type="text" placeholder="短信验证码"><span class="phoneCode">获取验证码</span></div>
                        <div class="password">
                            <input type="password" placeholder="请输入6-16位密码">
                        </div>
                        <div class="btn2">完成注册</div>
                        <div class="radio">
                            <input type="checkbox">我已阅读并同意遵守<a href="/protocol.htm" target="_blank">《约投顾网站注册协议》</a></div>
                    </div>

                    <div class="activity-close">随便看看</div>

                    <div class="activity-bottom">
                        <div class="txt">活动规则</div>
                        <div class="txt">1.活动时间：2017年8月1日至2017年8月14日</div>
                        <div class="txt">2.活动期间，新注册用户可领取一份内参免费体验5个交易日。每个新用户只能领取一次。</div>
                        <div class="txt">3.免费内参试用期限：用户领取内参当日起连续5个交易日（如当日是交易日，含当日，如当日非交易日，从下一个交易日开始计算）。</div>
                        <div class="txt">4.活动最终解释权归约投顾网站所有。</div>
                    </div>
                </div>
            </div>
            <div class="activify-success" style="display: none;">
                <div class="success-container">
                    <div class="success-banner"><img src="/public/v2/index/images/banner.png" alt=""></div>
                    <div class="success-refer clear"></div>
                    <div class="success-btn"><a href="/backstage/myRefer.htm">立即查看</a></div>
                </div>
            </div>
        </div>
    </div>