<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>约牛，让股民与牛人相约</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" type="text/css" href="/private/settle/css/settle.css?0329">
                <link href="http://cdn.bootcss.com/cropper/3.0.0-beta/cropper.min.css" rel="stylesheet">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="site-main" style="margin-top:18px;">
                <div class="wrapper">
                    <div class="site-main-single-cnt">
                        <h2 style="text-align: center;">投资顾问注册</h2>
                        <div class="steps-wrap steps-wrap-2">
                            <div id="indicate" class="step-item step-item-1"></div>
                            <div class="step-text clearfix">
                                <span class="past">录入个人信息</span>
                                <span class="past1">上传照片</span>
                                <span class="past2">填写您的擅长领域</span>
                                <span class="past3">注册完成</span>
                            </div>
                        </div>
                        <form id="form_1" method="post" class="form-item">
                            <h2 class="block-title">基本信息</h2>
                            <div class="form-group">
                                <div class="form-field">
                                    <span class="red">*</span>
                                    <span>真实姓名</span>
                                </div>
                                <div class="form-middle">
                                    <input name="real_name" id="txtUsername" type="text" class="form-control" placeholder="请输入姓名">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span><span class="red">*</span>身份证号</span>
                                </div>
                                <div class="form-middle">
                                    <input name="id_card" id="txtID" type="text" class="form-control" maxlength="18" placeholder="请输入身份证号">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-field"><span><span class="red">*</span>性别</span>
                                </div>
                                <div class="form-middle">
                                    <label>
                                        <input name="sex" type="radio" value="0" checked="checked">男</label>
                                    <label>
                                        <input name="sex" type="radio" value="1">女</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span class="red">*</span>
                                    <span>手机号</span></div>
                                <div class="form-middle">
                                    <input name="phone" id="txtMobile" type="text" class="form-control" disabled="disabled" placeholder="请输入手机号" style="width:179px;">
                                    <span class="link btn-getcode" id="modify"></span>
                                    <p class="error-msg" style="line-height:27px;color: rgb(204, 51, 51);display: none;">您输入的手机号有误，请重新输入</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <span><span class="red">*</span>短信验证码</span>
                                <input type="text" name="phoneCode" class="form-control" id="mobile_hidden" style="width:100px;" placeholder="短信验证码">
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span class="red">*</span>
                                    <span>QQ号</span>
                                </div>
                                <div class="form-middle">
                                    <input name="qq" id="txtQQ" type="text" class="form-control" placeholder="请输入QQ">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span><span class="red">*</span>邮箱</span>
                                </div>
                                <div class="form-middle">
                                    <input name="email" id="txtMail" type="email" class="form-control" placeholder="请输入emil">
                                </div>
                            </div>
                            <div class="form-split"></div>
                            <h2 class="block-title">所属机构</h2>
                            <div class="form-group">
                                <div class="form-field">
                                    <i class="red">*</i>
                                    <span>所在公司</span>
                                </div>
                                <div class="dropdownlist-wrap form-middle">
                                    <input id="txtCompany" type="text" class="form-control" name="company" data-shortname="" placeholder="所在公司">
                                    <%@include file="../common/company.jsp" %>
                                </div>
                                <span class="msg-wrap middle">
                                    <span class="msg-info">选择您所供职的公司，需与证券业协会备案公司相同</span>
                                </span>
                                <p class="company-error-msg" style="line-height:27px;color: rgb(204, 51, 51); display: none;">请选择所在公司</p>
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span>就职所在地</span>
                                </div>
                                <div class="form-middle">
                                    <select id="select-province" class="form-control" name="province">
                                        <option value="0" selected>选择省份</option>
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
                                    </select>
                                    <select id="select-city" class="form-control" name="city">
                                        <option value="0">选择城市</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group hide">
                                <div class="form-field">
                                    <span class="red">*</span>
                                    <span>所在岗位</span>
                                </div>
                                <div class="form-middle">
                                    <select id="position" name="occupation" class="form-control ">
                                        <option value="4">证券公司投资顾问</option>
                                    </select>
                                    <span class="msg-wrap middle">
                                        <span class="msg-info">选择您的职业资格证的类别</span>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span class="red">*</span>
                                    <span>资格证号</span>
                                </div>
                                <div>
                                    <input name="qualification_certificate" id="txtNumber" type="text" class="form-control" placeholder="输入资格证编码">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-field">
                                    <span class="red">*</span>
                                    <span>从业年限</span>
                                </div>
                                <div class="form-middle">
                                    <select id="experienceScope" name="investment_life" class="form-control">
                                        <option value="1">3年以下</option>
                                        <option value="2">3-5年</option>
                                        <option value="3">5-10年</option>
                                        <option value="4">10年以上</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-split"></div>
                            <!-- <h2 class="block-title mt30">邀请码</h2>
                            <div class="form-group">
                                <div class="form-field"><span>邀请码</span></div>
                                <td class="form-middle">
                                    <input id="inviteCode" name="invitation_code" type="text" class="form-control">
                                </td>
                            </div> -->
                            <div class="btn-wrap tc btn-wrap-border mt30">
                                <a class="btn btn-123-40" id="step1">下一步</a>
                            </div>
                        </form>
                        <form id="form_2" method="post" class="hid form-item">
                            <h2 class="block-title">上传头像</h2>
                            <div class="pic-upload">
                                <div class="fl">
                                    <img id="max1" src="/public/images/sample-2.jpg" class="avatar step2-input example fl" width="150px;height:150px;" />
                                    <input type="hidden" id="tximg" name="tximg" />
                                </div>
                                <div class=" pic-upload-info">
                                    <p class="form-field ">建议使用能展现个人风采的真实照片，如您在社交网站有较高知名度，也可使用同样头像：</p>
                                    <p><b>格式要求：</b> 支持.jpg .gif .png格式照片，大小不超过10M。</p>
                                    <p><a class="btn-upload" id="upload-fake1">上传照片</a></p>
                                </div>
                                <div class="pic-upload-result ">
                                    <div class="result-1 ">
                                        <img src="/public/images/sample-2.jpg" id="max2" class="avatar" width="150" height="150 ">
                                        <p>大</p>
                                    </div>
                                    <div class="result-2 tc ">
                                        <img id="mid" src="/public/images/sample-2.jpg" class="avatar" width="75" height="75 "></img>
                                        <p>中</p>
                                        <img id="min" src="/public/images/sample-2.jpg" class="avatar" width="50" height="50" class="mt30">
                                        <p>小</p>
                                    </div>
                                </div>
                            </div>
                            <h2 class="block-title mt30 ">上传身份证照片</h2>
                            <div class="pic-upload">
                                <div class="fl">
                                    <img src="/public/images/sample-3.jpg" id="cardId" class="cardImg example fl" width="200">
                                    <input type="hidden" id="sfzimg" name="sfzimg" />
                                    <p class="red" style="display:none;clear: both;" id="identity_image_id">身份证照片不能为空</p>
                                </div>
                                <div class="pic-upload-info" style="width:540px;">
                                    <p class="form-field">身份证上传要求</p>
                                    <p class="mt10">照片或扫描件必须本人手持身份证，保证头像清晰可辩认，保证身份证信息清晰可见</p>
                                    <p><b>格式要求：</b> 支持.jpg .gif .png格式照片，大小不超过10 M</p>
                                    <p class="mt20"><span id="uploadCardBtn" class="btn-upload">立即上传</span></p>
                                </div>
                            </div>
                            <div class="btn-wrap tc btn-wrap-border">
                                <a class="btn btn-123-40 before-step" data-to="form_1">上一步</a>
                                <a class="btn btn-123-40" id="step2">下一步</a>
                            </div>
                        </form>
                        <form id="form_3" method="post" class="hid form-item">
                            <h2 class="block-title mt30">选择投资方向</h2>
                            <div class="custom-checkbox-wrap f1">
                                <input type="hidden" id="tzfx" name="tzfx" />
                                <ul class="custom-checkbox clearfix mt30" id="investType"></ul>
                            </div>
                            <h2 class="block-title mt30">选择擅长领域</h2>
                            <div class="custom-checkbox-wrap f1">
                                <input type="hidden" id="specialty" name="specialtyList" />
                                <ul class="custom-checkbox-2 mt30" id="labelList"></ul>
                            </div>
                            <h2 class="block-title mt30">个人简介</h2>
                            <div class="f1">
                                <div class="register-editor-wrap mt25">
                                    <textarea class="miniediter" id="textarea_1" name="description" style="height:134px;"></textarea>
                                    <div id="maxnember"><span id="textCount_1">500</span>/500</div>
                                </div>
                            </div>
                            <div class="f1 mt30">
                                <p class="form-middle protocol">
                                    <input id="agreeCheck" name="Checkbox1" type="checkbox" class="mr10">我已经同意<a href="http://www.yuetougu.com/yn-protocol.htm" class="link" style="margin-top:-3px" target="_blank">约投顾平台投顾服务协议</a></p>
                            </div>
                            <div class="btn-wrap tc btn-wrap-border mt30">
                                <span class="btn btn-123-40 before-step" data-to="form_2">上一步</span>
                                <span class="btn btn-123-40" id="step3">下一步</span>
                            </div>
                        </form>
                        <div id="success" class="hid form-item">
                            <div class="register-success" id="result1">
                                <p class="title">申请完成</p>
                                <p class="mt10">感谢您完成网上资料填写环节，我们的工作人员将会于3个工作日内与您取得联系。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/js/cropper.min.js"></script>
                <script type="text/javascript" src="/public/bundle/counselor_enter.bundle.js?v=20170413174346"></script>
    </body>

    </html>
