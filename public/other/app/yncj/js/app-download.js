$(function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iphone/i)) {
        $('.app-download-btn').attr('href', "https://itunes.apple.com/us/app/约牛财经/id1335868422?l=zh&ls=1&mt=8")
    } else {
        $('.app-download-btn').attr('href', "http://www.yuetougu.com/public/other/app/yncj/apk/app-server-release_1.0.0.apk")
    }

    if (ua.match(/weibo/i)) {
        $('.app-download-btn').click(function() {
            alert("请点击右上角'...'选择在浏览器中打开")

        })
    }
})
