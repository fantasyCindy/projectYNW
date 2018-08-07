<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾 | 个人设置</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?03291">
                <link rel="stylesheet" href="/public/css/cropper.min.css" />
                <link rel="stylesheet" href="/private/backstage/css/myInfo.css?0329">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="customeStock" class="clear">
                <div class="container">
                    <%@include file="_menu.jsp" %>
                        <!-- /*========================  right  ==========================*/ -->
                        <div class="right">
                            <div id="contentWrap">
                                <div id="setting">
                                    <div class="titleBar">
                                        <table>
                                            <tr>
                                                <td @click="tab($event)" data-show="personInfoBar" class="select">注册信息</td>
                                                <td data-show="modifyPassword">修改密码</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="titleBar" id="vue-titleBar">
                                        <div class="action">
                                            <span class="item" @click="edit" v-text="text"></span>
                                        </div>
                                    </div>
                                    <div class="contentBar">
                                        <!-- 个人信息 -->
                                        <div class="setting-child" id="personInfoBar" v-show="visible">
                                            <div class="state_done">
                                                <div class="line basicInfo">
                                                    <div class="basicInfo-content">
                                                        <div class="favicon">
                                                            <img :src="info.photo_path">
                                                        </div>
                                                        <div class="info">
                                                            <p>
                                                                <span class="txt">姓名</span>
                                                                <span class="value nickname" v-text="info.username"></span>
                                                            </p>
                                                            <p>
                                                                <span class="txt">昵称</span>
                                                                <span class="value nickname" v-text="info.nickname"></span>
                                                            </p>
                                                            <p>
                                                                <span class="txt">性别</span>
                                                                <span class="value sex" id="sex" v-cloak>{{info.sex | sexMap}}</span>
                                                            </p>
                                                            <p>
                                                                <span class="txt">手机</span>
                                                                <span class="value mobile" v-text="info.phone"></span>
                                                            </p>
                                                            <p>
                                                                <span class="txt">QQ</span>
                                                                <span class="value qq" v-text="info.qq"></span>
                                                            </p>
                                                            <p>
                                                                <span class="txt">邮箱</span>
                                                                <span class="value mail" v-text="info.email"></span>
                                                            </p>
                                                            <p>
                                                                <span class="txt">城市</span>
                                                                <span class="value city" id="city" v-text="info.cityname"></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 编辑信息 -->
                                        <div class="setting-child" id="editBar" v-show="visible" style="display: none">
                                            <div class="line">
                                                <div class="avatars">
                                                    <div class="item big">
                                                        <div class="imgw"><img :src="info.photo"></div>
                                                        <div class="figure">大</div>
                                                    </div>
                                                    <div class="item  middle">
                                                        <div class="imgw"><img :src="info.photo"></div>
                                                        <div class="figure">中</div>
                                                    </div>
                                                    <div class="item small">
                                                        <div class="imgw"><img :src="info.photo"></div>
                                                        <div class="figure">小</div>
                                                    </div>
                                                    <div style="clear:both;"></div>
                                                    <div id="modify-avatar" class="btn" @click="modifyAvatar">修改头像</div>
                                                </div>
                                            </div>
                                            <div class="forms">
                                                <div class="line">
                                                    <span class="label">姓名</span>
                                                    <input type="text" placeholder="填写姓名" v-model="info.username" />
                                                </div>
                                                <div class="line">
                                                    <span class="label">昵称</span>
                                                    <input type="text" placeholder="1-20位的数字/字母或汉字" v-model="info.nickname" />
                                                </div>
                                                <div class="line">
                                                    <span class="label">性别</span>
                                                    <div class="inline">
                                                        <select v-model="info.sex">
                                                            <option value="1">男</option>
                                                            <option value="0">女</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="line">
                                                    <span class="label">验证码</span>
                                                    <input type="text" placeholder="输入图片验证码" v-model="validCode">
                                                    <span class="valid img" @click="timestamp=Date.now()"><img :src="'/validCode.htm?' + timestamp"></span>
                                                </div>
                                                <div class="line">
                                                    <span class="label">手机</span>
                                                    <input type="text" placeholder="填写手机" v-model="info.phone" v-bind:disabled='inputDisabled' />
                                                    <div class="modify-phone" v-show="msgStatus==0" @click="modifyPhone">修改</div>
                                                    <div class="modify-phone msg" v-show="msgStatus==1" @click="getPhoneCode" v-text="'获取短信验证码'"></div>
                                                    <div class="modify-phone void" v-show="msgStatus==2" v-text="timeCount + '秒后重新获取' "></div>
                                                    <div class="getVoiceCode" v-show="voiceStatus==1">没收到短信？<span class="txt getVoiceMsg" @click="getVoiceCode">点此获取语音验证码</span></div>
                                                    <div class="getVoiceCode" v-show="voiceStatus==2">您将通过语音接收验证码，请注意接听来电！<span id='sendCount' v-text="timeCount"></span>s</div>
                                                    <div class="getVoiceCode" v-show="voiceStatus==3">未接收到来电？<span class="txt getVoiceMsg" @click="getVoiceCode">点击重新获取</span></div>
                                                </div>
                                                <div class="line" style="position:relative" v-show="msgVisible">
                                                    <span class="label">验证码</span>
                                                    <input type="text" placeholder="输入短信验证码/语音验证码" v-model="phoneCode">
                                                </div>
                                                <div class="line">
                                                    <span class="label">QQ</span>
                                                    <input type="text" placeholder="填写QQ" v-model="info.qq" />
                                                </div>
                                                <div class="line">
                                                    <span class="label">邮箱</span>
                                                    <input type="text" placeholder="填写邮箱" v-model="info.email" />
                                                </div>
                                                <div class="line">
                                                    <span class="label">省份</span>
                                                    <select v-model="info.provinceid" id="select-province">
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
                                                </div>
                                                <div class="line">
                                                    <span class="label">城市</span>
                                                    <select id="select-city"></select>
                                                </div>
                                                <div class="line">
                                                    <div class="btn" @click="submit">保存修改</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--修改密码 -->
                                    <div id="modifyPassword" class="setting-child" style="display:none">
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
                            </div>
                        </div>
                </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="/public/js/cropper.min.js"></script>
                <script src="https://cdn.bootcss.com/vue/2.5.9/vue.min.js"></script>
                <script src="/public/bundle/myInfo.bundle.js?v=0329"></script>
                <script>
                    onSelect('我的')
                </script>
    </body>

    </html>
