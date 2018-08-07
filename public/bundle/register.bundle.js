/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// var errorCode = require('m/lib/errorCode')

	var error = __webpack_require__(19);
	// 注册
	var register = function () {
	    var $container, $phone, $msg, $getMsgCode, $password, $pop, $popBox, $popRefer, $getVoice, $getVoiceMsg;

	    //获取短信验证码
	    var getPhoneCode = function getPhoneCode(info) {
	        var send = _.extend({
	            phone: $phone.val().trim(),
	            source: 2
	        }, info);

	        var handler = function handler() {
	            $pop.hide();
	            $popBox.html("");

	            $getMsgCode.html("<span id='sendCount'>60</span>秒后再次获取!");
	            $getMsgCode.get(0).disabled = true;
	            $getVoice.hide();
	            var timer = setInterval(function () {
	                var count = $("#sendCount");
	                var value = Number(count.text());
	                if (value > 1) {
	                    value--;
	                    count.text(value);
	                } else {
	                    $getMsgCode.get(0).disabled = false;
	                    $getMsgCode.html("获取手机验证码");
	                    $getVoice.html("\u6CA1\u6536\u5230\u77ED\u4FE1\uFF1F<span class=\"txt getVoiceMsg\">\u70B9\u6B64\u83B7\u53D6\u8BED\u97F3\u9A8C\u8BC1\u7801</span>");
	                    clearInterval(timer);
	                    $getVoice.show();
	                }
	            }, 1000);
	        };

	        $.post("/sendPhoneCode.htm", send, function (back) {
	            back = JSON.parse(back);
	            if (back.status == 20012) return layer.msg("短信发送失败，请重试!");
	            if (back.status == 30002) return layer.msg("图片验证码错误");
	            if (back.status == 1) {
	                setTimeout(handler, 500);
	            }
	        });
	    };

	    //获取语音验证码
	    var getVoiceCode = function getVoiceCode(info) {
	        var send = _.extend({
	            phone: $phone.val().trim(),
	            source: 2,
	            isVoice: 'voice'
	        }, info);

	        var handler = function handler() {
	            $pop.hide();
	            $popBox.html("");

	            $getVoice.html("\u60A8\u5C06\u901A\u8FC7\u8BED\u97F3\u63A5\u6536\u9A8C\u8BC1\u7801\uFF0C\u8BF7\u6CE8\u610F\u63A5\u542C\u6765\u7535\uFF01<span id='voiceCount'>60</span>s");
	            $getVoice.get(0).disabled = true;
	            $getMsgCode.get(0).disabled = true;
	            $getMsgCode.addClass('');

	            var timer1 = setInterval(function () {
	                var count = $("#voiceCount");
	                var val = Number(count.text());
	                if (val > 1) {
	                    val--;
	                    count.text(val);
	                } else {
	                    $getVoice.get(0).disabled = false;
	                    $getVoice.html("\u672A\u63A5\u6536\u5230\u6765\u7535\uFF1F<span class=\"txt getVoiceMsg\">\u70B9\u51FB\u91CD\u65B0\u83B7\u53D6</span>");
	                    clearInterval(timer1);
	                    $getMsgCode.get(0).disabled = false;
	                }
	            }, 1000);
	        };

	        $.post("/sendPhoneCode.htm", send, function (back) {
	            back = JSON.parse(back);
	            if (back.status == 20012) return layer.msg("短信发送失败，请重试!");
	            if (back.status == 30002) return layer.msg("图片验证码错误");
	            if (back.status == 1) {
	                setTimeout(handler, 500);
	            }
	        });
	    };

	    // 事件
	    var event = function event() {
	        $('#submit-btn').click(submit);

	        // 获取短信验证码
	        $getMsgCode.click(function () {
	            var phone = $phone.val().trim();
	            if (!/^1[34578][0-9]{9}$/.test(phone)) {
	                return layer.msg("请输入有效的手机号码");
	            }
	            $pop.show();
	            dragValidate(phone, getPhoneCode);
	        });

	        //获取语音验证码
	        $getVoice.on('click', '.getVoiceMsg', function () {
	            var phone = $phone.val().trim();
	            if (!/^1[34578][0-9]{9}$/.test(phone)) {
	                return layer.msg("请输入有效的手机号码");
	            }
	            $pop.show();
	            dragValidate(phone, getVoiceCode);
	        });

	        //切换密码可见性
	        $('#enable-pass-visible').click(function () {
	            var isPassword = $password.attr('type') == 'password';
	            var target = isPassword ? "text" : 'password';
	            $password.attr('type', target);
	        });

	        //关闭弹窗
	        $popRefer.on('click', '.pop-refer-close', function () {
	            $popRefer.hide();
	            window.location.href = '/';
	        });
	    };

	    var submit = function submit() {
	        var phone = $phone.val().trim();
	        var code = $msg.val().trim();
	        var pass = $password.val().trim();
	        var employeecode = $('#input_code input').val();

	        if (!/^1[34578][0-9]{9}$/.test(phone)) {
	            return layer.msg("请输入有效的手机号码");
	        }
	        if (!/^\d+$/.test(code)) {
	            return layer.msg("请输入短信验证码");
	        }
	        if (!/^[a-zA-Z0-9_]{6,30}$/.test(pass)) {
	            return layer.msg("密码由字母数字或下划线组成,至少6位");
	        }
	        if (!$('#agree').get(0).checked) {
	            return layer.msg("请同意遵守注册协议");
	        }

	        $.post("/user/webRegister.htm", {
	            phone: phone,
	            pwd: pass,
	            phoneCode: code,
	            employeecode: employeecode
	        }, function (back) {
	            back = JSON.parse(back);
	            if (back.status == '1' || back.status == 100002) {
	                return window.location.href = '/';
	            } else if (back.status == 100001) {
	                $popRefer.fadeIn();
	            } else {
	                return layer.msg(error[back.status]);
	            }
	        });
	    };

	    return {
	        init: function init() {
	            $container = $('#register');
	            $phone = $container.find('input[name="phone"]');
	            $msg = $container.find('input[name="phoneCode"]');
	            $getMsgCode = $container.find('#getPhoneCode');
	            $password = $container.find('input[name="pwd"]');
	            $pop = $('#popup-captcha');
	            $popBox = $('#popup-captcha-box');
	            $popRefer = $('#pop-refer');
	            $getVoice = $('.getVoiceCode');
	            $getVoiceMsg = $getVoice.find('.getVoiceMsg');

	            event();
	        }
	    };
	}();

	/* 拖动验证 */
	var dragValidate = function dragValidate(phone, callback) {
	    $.ajax({
	        url: __path + "/geetest/register.htm?t=" + new Date().getTime(),
	        type: "get",
	        dataType: "json",
	        data: { user_name: phone },
	        success: function success(data) {
	            console.log("back", data);
	            initGeetest({
	                gt: data.data.gt,
	                challenge: data.data.challenge,
	                offline: !data.data.success,
	                new_captcha: true,
	                product: "popup"
	            }, handlerPopup);
	        }
	    });

	    function handlerPopup(captchaObj) {
	        captchaObj.appendTo("#popup-captcha-box");
	        captchaObj.onSuccess(function () {
	            //成功回调
	            var validate = captchaObj.getValidate();
	            callback && callback({
	                geetest_challenge: validate.geetest_challenge,
	                geetest_validate: validate.geetest_validate,
	                geetest_seccode: validate.geetest_seccode
	            });
	        });
	    }
	};

	/*///////////////////////////////////////////////////////////////////*/

	$(function () {
	    register.init();
	});

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	    "1": "请求成功",
	    "-1": "请求繁忙",
	    "10001": "股票代码不存在",
	    "10002": "查询条件为空",
	    "20001": "用户未登录",
	    "20002": "token为空",
	    "20003": "用户名不存在",
	    "20004": "密码为空",
	    "20005": "密码不匹配",
	    "20006": "登录失败",
	    "20007": "用户不存在",
	    "20008": "操作失败",
	    "20009": "密码不一致",
	    "20010": "TOKEN 错误",
	    "20011": "参数错误",
	    "20012": "获取验证码失败",
	    "20013": "期刊ID为空",
	    "20014": "直播室ID为空",
	    "20015": "提问内容为空",
	    "20016": "直播室未开启",
	    "20017": "直播老师未关联直播室",
	    "20018": "期刊不存在",
	    "20019": "已在其他终端登陆",
	    "20020": "提问次数超出限制",
	    "20021": "该条问题已被采纳过",
	    "20022": "不是该问题提问人",
	    "30001": "手机验证码为空",
	    "30002": "图片验证码错误",
	    "30003": "手机验证码错误",
	    "30004": "账号已存在",
	    "30005": "注册异常",
	    "30006": "第三方第一次登录",
	    "30007": "第三方非法用户",
	    "30008": "手机号为空",
	    "30009": "手机号已被绑定",
	    "30010": "手机号错误",
	    "30011": "该号码不是约投顾的工作电话，慎防假冒！",
	    "40001": "参数为空",
	    "40002": "服务器异常",
	    "40003": "已点赞",
	    "40004": "评论失败",
	    "40005": "起始值为空",
	    "40006": "查询失败",
	    "40007": "请求方向格式错误",
	    "40008": "用户自选股已经存在",
	    "40009": "关注",
	    "40010": "没有此股票信息",
	    "40011": "取消关注",
	    "40012": "直播老师不存在",
	    "40013": "股票代码和名称不匹配",
	    "40014": "买入股票时资本不够",
	    "50001": "消息为空",
	    "50002": "老师不能提问",
	    "50003": "老师不能关注",
	    "60000": "支付成功",
	    "60001": "商品ID为空",
	    "60002": "商品类型为空",
	    "60003": "订单类型为空",
	    "60004": "订单ID为空",
	    "60005": "订单不存在",
	    "60006": "支付失败",
	    "60007": "签名为空",
	    "60008": "未传支付密码",
	    "60009": "支付密码错误",
	    "60010": "账户余额不足",
	    "60011": "用户没有开通账户",
	    "60012": "支付密码格式不正确",
	    "60013": "充值来源错误",
	    "60014": "订单金额类型不存在",
	    "60015": "订单金额错误",
	    "60016": "产品购买数量错误",
	    "60017": "礼物不存在",
	    "60018": "商品类型不存在",
	    "60019": "商品不存在",
	    "60020": "商品已购买",
	    "60021": "商品已付款请等待客服人员与您联系",
	    "60022": "商品未购买",
	    "70001": "组合不存在",
	    "70002": "组合已技术评价",
	    "70003": "收益信息为空",
	    "70004": "委托记录为空",
	    "80000": '该手机号被用户举报，涉嫌违规操作，目前不能注册账号',
	    "80001": '您输入的内容违反相关规定，不能予以展示!',
	    "90000": "身份证号格式验证不通过",
	    "90001": "已通过实名制验证",
	    "90002": "还没有进行实名制验证",
	    "90003": "还没有进行风险评估",
	    "90004": "当天实名验证次数到达上线",
	    "100001": "活动注册成功",
	    "100002": "活动注册失败",
	    "100003": "活动已过期",
	    "100005": "用户不符合活动条件"
	};

/***/ })

/******/ });