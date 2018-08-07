
var href = window.location.href
var getParam = function (key) {
    var reg = new RegExp(key + "=([^&]+)")
    var match = window.location.href.match(reg)
    return match ? match[1] : "";
}
var account = decodeURI(getParam('account'))
var password = getParam('password')
var host = getParam('host')
var action = getParam('action')



/*///////////////////////////////////////////////////////////////////*/

var actions = {
    "yuetougu": function () {
        $.post(host + '/public/login.htm', {
            userName: account,
            password: password
        }, function (data) {
            if (data === "success") {
                window.location = host
            }
        })
    },
    "goldTD": function () {
        $.post(host + '/common/frontLogin.htm', {
            phoneNumber: account,
            password: password,
            source: 2
        }, function (back) {
            window.location = host
        })
    },
    "manage": function () {
        $.post(host + '/login.do', {
            userName: account,
            password: password
        }, back => {
            window.location = host + "/main.do"
        })
    },
    "kede": function () {
        console.log(account, password, host)
        $.post(host + "/public/login.htm", {
            userName: account,
            password: password
        }, back => {
            window.location.href = `${host}/live/vipLive.htm`
        })
    },
    'soft-1': function () {
        $.post(host + '/login.htm', {
            userName: account,
            password: password,
            login_type: 1,
            goodsType: 1
        }, back => {
            window.location = host + '/index.htm?v1'
        })
    },
    'soft-2': function () {
        $.post(host + '/login.htm', {
            userName: account,
            password: password,
            login_type: 1,
            goodsType: 2
        }, back => {
            window.location = host + '/index.htm?v2'
        })
    }
}

/*///////////////////////////////////////////////////////////////////*/


if (/autoplugin=true/.test(href)) {
    console.log("action >>", action)
    actions[action]()
}
