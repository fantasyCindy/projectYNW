function validAllChinese(str) {
	var reg = /^[\u4E00-\u9FA5]{0,4}$/;
	if (str == "" || str == null) {
		return false
	}
	if (reg.test(str)) {
		return true
	}
	return false
}
function validNickname(str) {
	var reg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9_]){2,8}$/;
	if (str == "" || str == null) {
		return false
	}
	if (reg.test(str)) {
		return true
	}
	return false
}

function validLoginName(str){
	var reg = /^([a-zA-Z0-9_]){6,12}$/;
	if (str == "" || str == null) {
		return false
	}
	if (reg.test(str)) {
		return true
	}
	return false
}

function validAge(str) {
	var reg = /^\d{2}$/;
	if (reg.test(str)) {
		return true
	}
	return false
}
function validTelphone(str) {
	var reg = /^0?1[34578][0-9]{9}$/;
	if (reg.test(str)) {
		return true
	}
	return false
}
function validPassword(str) {
	var reg = /^[a-zA-Z0-9]{6,16}$/;
	if (reg.test(str)) {
		return true
	}
	return false
}
function validCardNo(card) {
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (reg.test(card)) {
		return true
	}
	return false
}
function validEmail(str) {
	var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	if (reg.test(str)) {
		return true
	}
	return false
};