require('~/center/center')
var ajax = require('m/ajax.js')
var verification = require('m/id-verify')


var myAuth = function () {
	var container = $('#myAuth'),
		affirm = container.find('.affirm'),
		state1, state2;
	var hint = function (el, text) {
		el.parent().find('.hint').remove()
		text == '' ? el.parent().find('.hint').remove() : el.parent().append(`<div class="hint">${text}</div>`);
	}
	return {
		init: function () {
			$('#name').keyup(function () {
				var reg = /^([\u4e00-\u9fa5\.\·]{2,20}|[a-zA-Z\.\s]{1,20})$/;
				var text = $(this).val()
				var status = reg.test(_.trim(text));
				state1 = status;
				hint($(this), status ? '' : (text == '' ? '姓名不能为空' : '姓名格式错误'));
				state1 && state2 ? affirm.addClass('touch') : affirm.removeClass('touch');
			}).blur(function () {
				$(this).trigger('keyup')
			})

			$('#code').keyup(function () {
				var text = $(this).val()
				var status = verification(_.trim(text));
				state2 = status;
				state1 && state2 ? affirm.addClass('touch') : affirm.removeClass('touch');
				hint($(this), status ? '' : (text == '' ? '身份证号不能为空' : '身份证格式错误'));
			}).blur(function () {
				$(this).trigger('keyup')
			})

			container.on('mouseup', '.touch', function () {
				var send = $('#myAuth_form').serialize()
				ajax.postJSON('/app/verificationIdCard.htm', send, function (data) {
					if (data.status == 1) {
						data = data.data
						whether.init()
					}
					if (data.status == 90000) {
						var Count = data.data.validateCount == 0 ? '您的认证机会已用完，请明天再试' : `您还有${data.data.validateCount}次认证机会`;
						container.find('.error span').html(`身份证号码验证不通过或身份证号码与姓名不匹配，${Count}`)
					}
					if (data.status == 90001) {
						layer.msg('以通过实名制认证')
					}
					if (data.status == 90004) {
						container.find('.error span').html('认证次数已用完，请明天再试')
					}
					if (data.status == 90005) {
						container.find('.error span').html('身份证绑定用户数已达上限')
					}
				})
			})
		}
	}
}()

var whether = function () {
	var container = $('#myAuth');

	return {
		init: function () {
			ajax.postJSON('/app/isIdCard.htm', function (data) {
				data = data.data.isCard
				if (data == 'false') {
					$('#myAuth_form').show()
					$('#success').hide()
				} else {
					$('#success').show()
					$('#myAuth_form').hide()
					ajax.postJSON('/app/userIdCard.htm', function (data) {
						data = data.data
						$('#success .message').html(`${data.username} ${data.idCard}`)
					});
				}
			});
		}
	}
}()


$(function () {

	if (ynIsLogin && ynTeacherId != '') {
		location.href = __path
	}

	whether.init()

	yn.centerMenu.init({
		render: 'my',
		light: '实名认证'
	})

	myAuth.init()
})