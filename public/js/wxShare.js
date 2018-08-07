// how to use
// 引用
// <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
// <script src="/public/js/wxShare.js"></script>
// <script>
//     wxShare({
//        title:'自定义标题',
//        desc: '自定义描述',
//        link: '自定义链接',
//        imgUrl: '图标地址'
//      })
// </script>

(function(window, undefined) {
  "use strict";

  function wxShare(shareConfig) {
    var shareContent = {
      title: shareConfig.title || document.title, //分享标题
      desc: shareConfig.desc || "", //分享摘要
      link: shareConfig.link || document.location.href, //分享链接
      imgUrl: shareConfig.imgUrl || "", //分享图标
      type: shareConfig.type || "", //分享类型 music,video,link,默认link
      dataUrl: shareConfig.dataUrl || "" //如果type为music,video，需要提供数据链接，默认为空
    };

    wx.ready(function() {
      wx.showOptionMenu();
      wx.onMenuShareTimeline(shareContent); //分享到朋友圈
      wx.onMenuShareAppMessage(shareContent); //分享到朋友
      wx.onMenuShareQQ(shareContent); //分享到QQ
      wx.onMenuShareWeibo(shareContent); //分享到微博
    });

    (function() {
      var href = window.location.href;
      var getjssdkInfo = null;
      $.post(
        "http://www.yuetougu.com/web/getjssdkInfo.htm",
        { url: href },
        function(back) {
          getjssdkInfo = JSON.parse(back);
          if (getjssdkInfo.status == 1) {
            wx.config({
              debug: false,
              appId: getjssdkInfo.data.appId,
              timestamp: getjssdkInfo.data.timeStamp, // 必填，生成签名的时间戳
              nonceStr: getjssdkInfo.data.nonceStr, // 必填，生成签名的随机串
              signature: getjssdkInfo.data.signature, // 必填，签名，见附录1
              jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo"
              ]
            });
          }
        }
      );
    })();
  }
  window.wxShare = wxShare;
})(window);
