//重定向
browserRedirect();

$(function() {
    if (!__code) {
        $("#relativeStock").hide();
    }
    var location = window.location.href;
    if (location.indexOf('type=share') != -1) {
        $('.title , .opinion-title').show();
        $('.publish, .opinion-publish').show();
    }
    $('.content').find('img').removeAttr('style');
    $('.content').find('a').removeAttr('href');

    var __code = "${article.stockcode}";
    var __isVip = "${article.is_vip}";

    var is_weixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }()
    var href = window.location.href
    var match = href.match(/\&from=(h5)/)
    var from = match ? match[1] : ''
    if (from == 'h5') {
        $('.top').show()
        $('.logo-bar').show()
        $('.footer').show()
    }
    if (is_weixin) {
        $('#wxcode').show()
        $('.top').show()
        $('.logo-bar').show()
        $('.footer').show()
    }
})

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //...
    } else {
        var href = window.location.href;
        var parseNews = href.match(/\/jx\/([a-z]+)\//);
        var parseOpinion = href.match(/article_id=([0-9]+)/);

        //资讯
        if (parseNews) {
            var index = href.match(/[0-9]+/g);
            window.location.href = "/article/newDetail.htm?" + parseNews[1] + index[0] + index[1];
        }

        //观点
        if (parseOpinion) {
            window.location.href = '/article/newDetail.htm?article_id=' + parseOpinion[1];
        }
    }
}
