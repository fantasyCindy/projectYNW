// realName.init({show:true})


var ajax = require('m/ajax.js');
require('./realName.css')

var creatDom = `<div id="realName">
                    <div class="title">实名认证 <i class="close fa fa-close"></i></div>
                    <form id="Auth_form">
                        <div class="form-group">
                            <label>姓名</label>
                            <input id="AuthName" type="text" name="username" placeholder="请填写您身份证上的姓名">
                        </div>
                        <div class="form-group">
                            <label>身份证号</label>
                            <input id="AuthCode" type="text" name="idCard" placeholder="填写您的15位或18位身份证号">
                        </div>
                        <div class="form-btn">
                            <p class="affirm">确认</p>
                        </div>
                    </form>
                    <div class="name-success">
                        <span class="cg"></span>
                        <p>恭喜您认证成功</p>
                        <a href="/backstage/myAppraisal.htm" target="_blank">去评估</a>
                    </div>
                </div>`;
var verification = function(code) {
    var vcity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }

    var checkcode = function(code) {
            //是否为空  
            if (!code || !iscodeNo(code) || !checkProvince(code) || !checkBirthday(code) || !checkParity(code)) {
                return false;
            }
            return true;

        }
        //检查号码是否符合规范，包括长度，类型  
    var iscodeNo = function(code) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(code) === false) {
            return false;
        }
        return true;
    };
    //取身份证前两位,校验省份  
    var checkProvince = function(code) {
        var province = code.substr(0, 2);
        if (vcity[province] == undefined) {
            return false;
        }
        return true;
    };
    //检查生日是否正确  
    var checkBirthday = function(code) {
        var len = code.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
        if (len == '15') {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = code.match(re_fifteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date('19' + year + '/' + month + '/' + day);
            return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
        if (len == '18') {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = code.match(re_eighteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year + '/' + month + '/' + day);
            return verifyBirthday(year, month, day, birthday);
        }
        return false;
    };
    //校验日期  
    var verifyBirthday = function(year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理  
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
            //判断年份的范围（3岁到100岁之间)  
            var time = now_year - year;
            if (time >= 3 && time <= 100) {
                return true;
            }
            return false;
        }
        return false;
    };
    //校验位的检测  
    var checkParity = function(code) {
        //15位转18位  
        code = changeFivteenToEighteen(code);
        var len = code.length;
        if (len == '18') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var codeTemp = 0,
                i, valnum;
            for (i = 0; i < 17; i++) {
                codeTemp += code.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[codeTemp % 11];
            if (valnum == code.substr(17, 1)) {
                return true;
            }
            return false;
        }
        return false;
    };
    //15位转18位身份证号  
    var changeFivteenToEighteen = function(code) {
        if (code.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var codeTemp = 0,
                i;
            code = code.substr(0, 6) + '19' + code.substr(6, code.length - 6);
            for (i = 0; i < 17; i++) {
                codeTemp += code.substr(i, 1) * arrInt[i];
            }
            code += arrCh[codeTemp % 11];
            return code;
        }
        return code;
    };

    return checkcode(code)
}

var realName = function() {
    var container, affirm, state1, state2;
    var hint = function(el, text) {
        el.parent().find('.hint').remove()
        text == '' ? el.parent().find('.hint').remove() : el.parent().append(`<div class="hint">${text}</div>`);
    }

    function layoutBox() {
        var w = $(window).width();
        var h = $(window).height();
        var cw = container.outerWidth()
        var ch = container.outerHeight()
        container.css({
            left: (w - cw) / 2 + "px",
            top: (h - ch) / 2 + "px"
        })
    }
    return {
        init: function(ops) {
            $('body').append(creatDom)
            container = $('#realName');
            layoutBox()
            affirm = container.find('.affirm')
            $('#AuthName').keyup(_.debounce(function() {
                var reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
                var text=$(this).val()
                var status = reg.test(_.trim(text))
                state1 = status
                hint($(this), status ? '' : (text== '' ? '姓名不能为空':'姓名格式错误'));
                state1 && state2 ? affirm.addClass('touch') : affirm.removeClass('touch')
            }, 1000))
            $('#AuthCode').keyup(_.debounce(function() {
            	var text=$(this).val()
                var status = verification(_.trim(text));
                state2 = status
                state1 && state2 ? affirm.addClass('touch') : affirm.removeClass('touch')
                hint($(this), status ? '' : (text== '' ? '身份证号不能为空':'身份证格式错误'));
            }, 1000))
            container.on('mouseup', '.touch', function() {
                var send = $('#Auth_form').serialize()
                ajax.postJSON('/app/verificationIdCard.htm', send, function(data) {
                    if (data.status == 1) {
                        container.find('.name-success').show()
                        $('#Auth_form').hide()
                    }
                    if (data.status == 90000) {
                    	var Count=data.data.validateCount == 0 ? '您的认证机会已用完，请明天再试' : `您还有${data.data.validateCount}次认证机会`;
						layer.msg(`身份证号码验证不通过或身份证号码与姓名不匹配，${Count}`)
                    }
                    if (data.status == 90001) {
                        layer.msg('以通过实名制认证')
                    }
                    if (data.status == 90004) {
                        layer.msg('认证次数已用完，请明天再试')
                    }
                    if (data.status==90005) {
						layer.msg('身份证绑定用户数已达上限')
					}
                })
            })
            container.on('click', '.close', function() {
                container.hide()
            })
            ops.show && this.render()
        },
        render: function() {
            container.show()
        }
    }
}()

module.exports = realName
