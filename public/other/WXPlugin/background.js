//主机地址:
var host = "http://101.201.41.116/crm";
// var host = "http://192.168.1.97";

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


var db = chrome.storage.local;
var sm = chrome.runtime.sendMessage;
var om = chrome.runtime.onMessage;
var currentVersion = chrome.runtime.getManifest().version;

var strategy = {
    request: null,
    sender: null,
    sendResponse: null,
    WinXinMsg: function() {
        $.get(host + "/weixin/sendMsgToSys.cm", this.request.value);
    },
    shut: function() {
        chrome.tabs.remove(this.sender.tab.id)
    },
    unread: function() {
        sendToCRM(this.request);
    },
    openwx: function() {
        var _this = this;

        //打开窗口
        chrome.windows.create({
            "url": "https://wx.qq.com?qrzcrm",
            "type": "popup",
            "incognito": true
        }, function(win) {

            //绑定微信号和tabId和windowId
            var obj = {};
            var winId = win.id;
            var tabId = win.tabs[0].id;
            obj[_this.request.wxcode + "@winid"] = winId;
            obj[winId + "@wxcode"] = _this.request.wxcode;
            obj[winId + "@wxuser"] = _this.request.wxuser;
            obj[_this.request.wxcode + "@tabid"] = tabId;
            obj[tabId + "@wxcode"] = _this.request.wxcode;
            obj[tabId + "@wxuser"] = _this.request.wxuser;

            db.set(obj);
        })


    },
    activewx: function() {
        var _key = this.request.wxcode + "@winid";
        db.get(_key, function(res) {
            var winid = res[_key];
            chrome.windows.update(winid, { focused: true });
        })
    },
    avatar: function() {
        // $.post(host + "/weixin/savePhotoImg.cm", this.request);
    },
    notify: function() {
        chrome.notifications.create("plugin_start", {
            type: "basic",
            title: "欢迎您使用秦融资产微信业务系统",
            message: "------ 当前系统版本: " + currentVersion + " ------",
            iconUrl: "icon.png",
        })
    },
    friends: function() {

        //保存好友列表
        var _this = this;

        _console(`post : save friends list ${this.request.isflow}` );
        _console(this.request);

        $.post(host + "/weixin/saveBuddyList.cm", this.request, function(data) {

            _console(`ajax callback ${_this.request.isflow }: save friends list  : ${data}`);

            //第一次使用CRM登录微信
            if (data == "first") {

                //需要用户确认
                chrome.tabs.query({ windowId: _this.sender.tab.windowId }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { message: "firstUse", value: _this.request });
                });
            }

            if (data == 2) {
                alert("微信好友为空");
            }

            //好友列表不匹配, 需要重新登录
            if (data == "false") {
                sendToCRM({ message: "close", tabId: _this.sender.tab.id });
                chrome.tabs.query({ windowId: _this.sender.tab.windowId }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { message: "loginFalse", value: _this.request });
                });
            }
        });
    }
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    strategy.request = request;
    strategy.sender = sender;
    strategy.sendResponse = strategy.sendResponse;

    //登录/退出
    if (request.type == "login") {
        $.post(host + "/weixin/saveLoginOrOutlog.cm", request);
        return;
    }

    if (request.message == "getWinId") {
        sendResponse(sender.tab.windowId);
        return true; // reply must be return true
    }

    strategy[request.message]();
})



//关闭时获取tabId
chrome.tabs.onRemoved.addListener(function(tabId, info) {
    sendToCRM({ message: "close", tabId: tabId });
})


function sendToCRM(msg) {
    chrome.tabs.query({ url: "*://*/*cm" }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

function _console(msg) {
    sendToCRM({ message: "console", msg: msg })
}

//隐身权限
setInterval(function() {
    chrome.extension.isAllowedIncognitoAccess(function(isAllow) {
        sendToCRM({ message: "incognito", isAllow: isAllow })
    })
}, 3000);
