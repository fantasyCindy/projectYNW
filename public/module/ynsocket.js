var browser = (function() {
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join('-');
})();


var jsid = localStorage.getItem("jsid")
if (!jsid) {
    jsid = Date.now() + Math.random()
    localStorage.setItem("jsid", jsid)
}

var data = {
    jsid: jsid,
    uid: ynUserId,
    href: window.location.href,
    browser: browser
}

var socket = io("http://101.201.208.248:3001")
socket.on('connect', function() {
    socket.emit("open", data)
})



// 获取IP地址
var getIp = (function() {
    var ip = localStorage.getItem('Ip');
    if (ip) {
        socket.emit("msg", {
            ip: ip
        })
        return;
    }

    try {
        var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
        $.getJSON(url, function(back) {
            socket.emit("msg", {
                ip: back.Ip
            });
            localStorage.setItem('Ip', back.Ip);
        })
    } catch (e) {}

})()
