<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>

    <head>
        
        <%@ include file="../common/seo.jspf" %>
        <title>约投顾 | 个人设置</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css?03291">
            <link rel="stylesheet" href="/public/css/cropper.min.css" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock" class="clear">
                <div class="container">
                    <%@include file="_menu.jsp" %>
                        <!-- /*========================  right  ==========================*/ -->
                        <div class="right">
                            <div id="contentWrap">
                                <!-- begin -->
                                <div id="setting">
                                    <div class="titleBar">
                                        <table>
                                            <tr>
                                                <td data-show="personInfoBar" class="select">注册信息</td>
                                                <td data-show="signCondition">签约条件</td>
                                                <td data-show="modifyPassword">修改密码</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="contentBar">
                                        <div class="setting-child" id="personInfoBar"></div>
                                        <!-- 编辑个人信息 -->
                                        <div id="teacherRegister" style="display: none" class="setting-child">
                                            <div id="site-main-right">
                                                <div id="con_1" class="tab-cnt-userinfo">
                                                    <p class="title">
                                                        <span class="fr" id="operatorArea">
                                                            <a href="" class="link btnEdit" id="editId" style="display:none">编辑</a>
                                                        </span>
                                                        </span>
                                                        <span>我的基本信息</span>
                                                    </p>
                                                    <!-- 头像 -->
                                                    <div class="favicons">
                                                        <span class="fav1">
                                                            <img src="">
                                                            <div class="figure">大</div>
                                                        </span>
                                                        <span class="fav2">
                                                             <img src="">
                                                              <div class="figure">中</div>
                                                        </span>
                                                        <span class="fav3">
                                                            <img src="">
                                                            <div class="figure">小</div>
                                                         </span>
                                                        <div id="modifyFaviconBtn" class="uploadButton ynbutton ynbutton-blue">修改头像</div>
                                                    </div>
                                                    <!--  -->
                                                    <div class="block-edit block-1-edit" style="display:block">
                                                        <table class="table-register mt30">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="field"><span class="required">*</span><span>姓名</span></td>
                                                                    <td class="middle">
                                                                        <input name="userName" id="txtUserName" value="" type="text" class="txtbox" style="width:179px;" placeholder="2~12个字符">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="field">
                                                                        <span>性别</span>
                                                                        <div class="sexGroup">
                                                                            <span class="item">
                                                                    <input type="radio"  id="sex-male" name="sex" value="1" />男</span>
                                                                            <span class="item"> 
                                                                    <input type="radio" id="sex-female" name="sex" value="0"/>女</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="field"><span class="required">*</span>
                                                                        <span>手机号</span></td>
                                                                    <td>
                                                                        <div class="middle">
                                                                            <input id="txtMobile" type="text" class="txtbox" style="width:179px;" value="" maxlength="11">
                                                                            <button id="btnModify" class="btn btn-getcode ml5" style="display:inline-block;">修改</button>
                                                                        </div>
                                                                        <p class="error-msg" id="mobileErrorInfo" style="display: none;">手机号码为11位数字</p>
                                                                    </td>
                                                                </tr>
                                                                <tr id="modifyBlock" style="">
                                                                    <td class="field"><span>验证码</span></td>
                                                                    <td>
                                                                        <div class="middle">
                                                                            <input id="txtVCode" type="text" class="txtbox" style="width:179px;">
                                                                            <i class="icon icon-right hidden" id="vcode-right"></i>
                                                                            <i class="icon icon-error hidden" id="vcode-wrong"></i>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="field">
                                                                        <span class="required">*</span>
                                                                        <span>QQ号</span>
                                                                    </td>
                                                                    <td>
                                                                        <div class="middle">
                                                                            <input id="txtQQ" type="text" class="txtbox" style="width:179px;">
                                                                        </div>
                                                                        <p class="error-msg" id="qqErrorInfo" style="display: none;"></p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="field">邮箱</td>
                                                                    <td>
                                                                        <div class="middle">
                                                                            <input id="txtMail" type="text" class="txtbox" style="width:179px;" value="">
                                                                        </div>
                                                                        <p class="error-msg" id="emailErrorInfo" style="display: none;"></p>
                                                                    </td>
                                                                </tr>
                                                                <!-- 省份 -->
                                                                <tr>
                                                                    <td class="field">
                                                                        <span class="select-title">选择省份</span>
                                                                        <select id="select-province" class="select-form" name="select-province">
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
                                                                            <option value="澳门特别行政区">澳门特别行政区</option>
                                                                            <option value="3201">香港特别行政区</option>
                                                                            <option value="3200">台湾</option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="field">
                                                                        <span class="select-title">城市</span>
                                                                        <select id="select-city" class="select-form" name="select-city">
                                                                            <option value="0">选择城市</option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="field">
                                                                        <span class="select-title">投资年限</span>
                                                                        <select id="select-year" class="select-form" name="select-year">
                                                                            <option value="">选择投资年限</option>
                                                                            <option value="3年以下">3年以下</option>
                                                                            <option value="3-5年">3-5年</option>
                                                                            <option value="5-10年">5-10年</option>
                                                                            <option value="10年以上">10年以上</option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div style="width:100%">
                                                        <p class="title"><span>擅长领域</span></p>
                                                        <div class="block-edit block-3-edit" style="display: block;">
                                                            <div class="block-3-edit-inner">
                                                                <h2 class="block-title mt30">选择投资方向<span>(1-3项)</span></h2>
                                                                <ul class="custom-checkbox clearfix mt30" id="investType"></ul>
                                                                <h2 class="block-title mt30">选择擅长领域<span></span></h2>
                                                                <ul class="custom-checkbox-2 clearfix mt30" id="labelList">
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="personIntro">
                                                        <p>个人简介</p>
                                                        <textarea name="personalInfo" id="personalInfo" cols="100" rows="6" placeholder="输入个人简介"></textarea>
                                                        <p class="wordCount"><span class="value">350</span>/350</p>
                                                    </div>
                                                    <div id="btn-wrap" class="tc">
                                                        <span id="btnSave" href="" class="btn btn-113-30 mr30">保存</span>
                                                        <span id="btnCancel" href="" class="btn btn-113-30 ynlink" data-click="./segment/setting.html" data-complete="showSetting()">取消</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="signCondition" style="display: none;" class="setting-child">
                                        <div class="title">用户类型</div>
                                        <div class="items">
                                            <span class="item">绑定证券用用户</span>
                                        </div>
                                        <div class="info">
                                            <div class="name">以下签约条件设置正在开发中....</div>
                                            <div class="conditions">
                                                <div class="item">1.用户资金量条件</div>
                                                <div class="item">2.开户的券商条件</div>
                                                <div class="item">3.设置用户佣金</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="modifyPassword" style="display: none;" class="setting-child">
                                        <div id="contentWrap">
                                            <div class="content">
                                                <div id="updatePassword">
                                                    <div class="item">
                                                        <span class="txt">原密码</span>
                                                        <input type="password" id="old" placeholder="原密码" autocomplete="off" />
                                                    </div>
                                                    <div class="item">
                                                        <span class="txt">新密码</span>
                                                        <input type="password" id="new" placeholder="密码包含字母 / 数字 / 下划线且至少6位" class="verify" autocomplete="off" />
                                                    </div>
                                                    <div class="item">
                                                        <span class="txt">确认密码</span>
                                                        <input type="password" id="confirm" class="verify" autocomplete="off" />
                                                    </div>
                                                    <div>
                                                        <button class="submit">提交</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end -->
                            </div>
                        </div>
                </div>
            </div>
            <!-- /////////////////////////////////////////////////////////////////// -->
            <!-- Template -->
            <!-- 个人基本信息 -->
            <script id="personInfoBar-template" type="text/html">
                <div class="state_done">
                    <span class="editButton">编辑</span>
                    <div class="line basicInfo">
                        <div class="title-2">我的基本信息</div>
                        <div class="basicInfo-content">
                            <div class="favicon">
                                <img src="{{user_photo}}">
                            </div>
                            <div class="info">
                                <p>
                                    <span class="txt">姓名</span>
                                    <span class="value nickname">{{username}}</span>
                                </p>
                                <p>
                                    <span class="txt">性别</span>
                                    <span class="value sex" id="sex">
                                        {{if sex==1}}男{{/if}}{{if sex==0}}女{{/if}}
                                    </span>
                                </p>
                                <p>
                                    <span class="txt">手机</span>
                                    <span class="value mobile">{{phone}}</span>
                                </p>
                                <p>
                                    <span class="txt">QQ</span>
                                    <span class="value qq">{{qq}}</span>
                                </p>
                                <p>
                                    <span class="txt">邮箱</span>
                                    <span class="value mail">{{email}}</span>
                                </p>
                                <p>
                                    <span class="txt">城市</span>
                                    <span class="value city" id="city">{{cityname}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="line export">
                        <div class="title-2">擅长领域</div>
                        <div class="info">
                            <div class="goodat">
                                <span class="title">擅长领域</span>
                                <div class="goodat-items">
                                    {{each specialtys}}
                                    <span class="goodat-item">{{$value.name}}</span> {{/each}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="line personInfo">
                        <div class="title-2">个人简介</div>
                        <div class="content">
                            <p>{{description}}</p>
                        </div>
                    </div>
                </div>
            </script>
            <%@include file="../common/front-foot.jsp" %>
            <script src="/public/js/cropper.min.js"></script>
                <script src="/public/bundle/mySetting.bundle.js?0127"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
