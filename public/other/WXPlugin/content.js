console.log("---- content.js ----");
var db = chrome.storage.local;
var sm = chrome.runtime.sendMessage;
var om = chrome.runtime.onMessage;
var host = "";


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////    微信业务    ////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


var contact = {
    tab: null,
    chat: null,
    container: null,
    items: null,
    list: [],
    top: 0,
    placeholder: null,
    scrollCount: 1,
    myFriends:null,
    init: function() {
        var _this = this;
        this.set();

        //check click success
        var ready = setInterval(function() {
            contact.tab.click();
            var className = contact.tab.attr('class');
            if (className.indexOf("web_wechat_tab_friends_hl") != -1) {
                clearInterval(ready);
                contact.getData(function(data) {
                    var send = {
                        message: "friends",
                        wxname: start.name,
                        isflow: 0,
                        wechat_number: start.wxcode,
                        friends: JSON.stringify(data)
                    };
                    console.log("--- friends List ---");
                    console.log(send);
                    sm(send);
                })
            }
        }, 200);
    },
    set: function() {
        this.tab = $('.panel .tab .tab_item:eq(2) .chat i');
        this.chat = $('.panel .tab .tab_item:eq(0) .chat i');
        this.container = $('.panel .nav_view:eq(1)');
        this.items = $('#navContact');
        this.placeholder = this.container.find('.top-placeholder');
    },
    getData: function(callback) {
        var id = Math.floor(Math.random() * 1000000000);
        var count = 0;
        var timer = setInterval(function() {
            contact.items.scrollTop(500 * contact.scrollCount);
            var now = contact.placeholder.css('height');

            //滚动到底部
            if (now == contact.top) {
                clearInterval(timer);
                contact.chat.click();
                var list = contact.list;
                console.log("msg : get friends done");

                //去重
                var friends = [];
                var favicon = [];
                var _res = {};

                list.forEach(function(item, i, source) {
                    var match = item.name.match(/[0-9]*[\u4e00-\u9fa5]*\w*/g);
                    if (!match) return;
                    item.name = match.join("");

                    //hash
                    if (!_res[item.name]) {

                        friends.push({
                            nickName: item.name,
                            province: "",
                            city: "",
                            pyInitial: "",
                            pyQuanPin: "",
                            sex: "",
                            alias: "",
                            imgid: item.fid
                        });

                        favicon.push({
                            src: host + item.src,
                            imgid: item.fid,
                            username: start.wxuser
                        })

                        _res[item.name] = 1;
                    }
                })

                callback(friends);
                return;
            }

            //获取好友
            var nickname = contact.container.find('h4.nickname');
            nickname.each(function(i, e) {
                var src = host + $(this).parent().prev().find('img').attr('src');

                //追加
                contact.list.push({
                    name: $(this).text(),
                    src: src,
                    fid: Date.now() + id + "-" + count
                });
                count++;
            })
            contact.scrollCount++;
            contact.top = now;
        }, 100);
    },

    removeSpecial: function(str) {
        var result = "---";
        str = str.replace(/<.+?>/g, "");
        var match = str.match(/[0-9\w]*[\u4E00-\u9FA5]*/g);
        if (match) {
            result = match.join("");
        }
        return result;
    },
    changeCode: function(arr) {
        var result = [];
        var count = 0;
        var len = arr.length;
        arr.forEach(function(item) {
            var image = new Image();
            //image.crossOrigin = "";
            image.src = item.src;
            image.onload = function() {
                item.src = getBase64Image(image);
                result.push(item);
                count++;
                if (count >= len) {
                   // sendAvatar();
                }
            }
        });

        function sendAvatar() {
            var index = 0;
            var timer_avatar = setInterval(function() {
                var item = result[index];
                item.message = "avatar";
                sm(item);
                index++;
                if (index == result.length) {
                    clearInterval(timer_avatar);
                }
            }, 1000);
        }
    }
}


//微信聊天
var wx = {
    header: null,
    name: null,
    user: {},
    port_msg: null,
    friendsData: null,
    init: function() {
        this.set();
        this.event();
        this.getData();
        this.unread();
        this.runtime();
    },
    set: function() {
        this.header = $('.panel .header');
        this.name = start.name;
    },
    event: function() {

        var _this = this;

        //reset mark
        $('.main').on('click', '.chat_item', function() {
            var key = $(this).data('cm').username;
            if (wx.user[key] === undefined) {
                wx.user[key] = {
                    last: "",
                    count: 0,
                };
            }
            wx.user[key].count = 0;
        })


        //重新登录
        $('body').on('click', '.button.yes', function() {
            console.log("click yes...");
            console.log(_this.friendsData);
            _this.friendsData.isflow = parseInt(1);  //confirmed
            sm(_this.friendsData);
            $('#wx-tip-overlay').remove();
        })

        //确认绑定
        $('body').on('click', '.button.no', function() {
            console.log("click no...");
            sm({ message: "shut" });
        })
    },
    getData: function() {

        //获取聊天记录
        setInterval(function() {
            $('.chat_item').each(function(i, e) {
                var key = $(this).data('cm').username;
                if (wx.user[key] === undefined) {
                    wx.user[key] = {
                        last: "",
                        count: 0,
                    };
                }
                //正在聊天项
                if ($(this).attr('class').indexOf('active') != -1) {
                    var content = $(this).find('.info .msg .ng-binding').text().trim();

                    //如果为空或者和上一条记录相同则不保存
                    if (content === "" || content == wx.user[key].last) {
                        return;
                    }

                    //在聊天窗口中获取记录
                    var classname = $('#chatArea .scroll-content .message:last').attr('class');
                    var msgType = "receive";
                    if (classname == "message ng-scope me") {
                        msgType = "send";
                    }
                    wx.sendMsg($(this), msgType);
                    wx.user[key].last = content;
                    return;
                }

                //查找标记
                var mark = $(this).find('.icon.web_wechat_reddot_middle');
                var count = Number(mark.text());
                if (!count) {
                    count = 0;
                }

                if (count > wx.user[key].count) {

                    //保存
                    var _content = wx.sendMsg($(this), "receive");

                    //存储标记
                    wx.user[key].count = count;
                    wx.user[key].last = _content;
                }
            });
        }, 200);
    },
    unread: function() {
        setInterval(function() {
            var sum = 0;
            $('.icon.web_wechat_reddot_middle').each(function(i, e) {
                var value = Number($(this).text())
                sum += value;
            })
            sm({ "message": "unread", sum: sum, wxcode: start.wxcode });
        }, 1000);
    },
    sendMsg: function(item, type) {
        var content = item.find('.info .msg .ng-binding').text().trim();
        var msg = {
            wechat_number: start.wxcode,
            wxname: start.name,
            username: start.wxuser,
            type: 0,
            content: content,
            time: item.find('.ext .attr').text().trim() + ":" + (new Date()).getSeconds(),
            issend: type == "send" ? 1 : 0
        }
        if (type == "send") {
            msg.from = wx.name;
            msg.to = item.find(".nickname_text").text().trim();
        } else if (type == "receive") {
            msg.from = item.find(".nickname_text").text().trim();
            msg.to = wx.name;
        }
        console.log(msg);
        sm({ "message": "WinXinMsg", value: msg });
        return content;
    },
    runtime: function() {
        var _this = this;
        om.addListener(function(request, send) {
            //第一次使用CRM登录微信
            if (request.message == "firstUse") {
                _this.friendsData = request.value;
                console.log("handler : first use ")
                $('body').append('<div id="wx-tip-overlay">' +
                    '<div id="wx-tip">' +
                    '<p class="title">绑定微信号: <strong>非常重要</strong></p>' +
                    '<p class="content content1">请确认您登录的微信账号是否正确, 请一定要确认是否一致? ' +
                    '<p class="content content2"><span class="txt txt1">以后只能用绑定的微信号登录, 绑定后不能修改. </span><span class="txt txt2">绑定错误将永久影响聊天记录的保存.</span></p>' +
                    '<p class="content content3"><span class="txt">该提示仅出现一次</span></p>' +
                    '<p class="item"><span class="txt">微信号: ' + request.value.wechat_number + '</span></p>' +
                    '<p class="item"><span class="txt">微信昵称: ' + request.value.wxname + '<span></p>' +
                    '<div class="buttons"><span class="button no">重新登录</span><span class="button yes">确认绑定</span></div>' +
                    '</div></div>')
            }

            //账号登录错误
            if (request.message == "loginFalse") {
                //提示
                $('body').append('<div id="wx-tip-overlay">' +
                    '<div id="wx-tip"><div class="wrap">' +
                    '<p class="title">请使用<strong>' + request.value.wechat_number + '</strong>账号登录</p>' +
                    '<p class="content content1">账号错误, 页面在<strong style="margin:0 5px" id="wx-tip-time">10</strong>秒后关闭!' +
                    '</div></div></div>')

                //倒计时
                var __timer = setInterval(function() {
                    var time = $('#wx-tip-time');
                    var value = time.text() - 0;
                    if (value == 0) {
                        clearInterval(__timer);
                        sm({ message: "shut" });
                    } else {
                        time.text(value - 1)
                    }
                }, 1000)
            }
        })
    }
}


//before login
var start = {
    version: null,
    name: null,
    wxcode: null,
    wxuser: null,
    init: function() {
        console.log("fn : start init...");
        var _this = this;
        this.version = (chrome.runtime.getManifest()).version;

        host = window.location.href.match(/^.+?com/)[0];
        console.log("host", host);

        this.tip();

        //从缓存中获取微信号
        sm({ message: "getWinId" }, function(winId) {
            db.get([`${winId}@wxcode`, `${winId}@wxuser`], function(res) {
                console.log("--- current winId data ---")
                console.log(res);
                _this.wxcode = res[`${winId}@wxcode`];
                _this.wxuser = res[`${winId}@wxuser`];
                _this.check();
            })
        })
    },

    tip: function() {
        var loginBox = $('.login_box');
        var qrcode = $('.qrcode');
        var title = qrcode.find('.sub_title');
        var img = qrcode.find('img');
        var extension = qrcode.find('.extension');
        title.css({ "font-weight": "900", "color": "#B1F707", "backgroundColor": "black", "padding": "10px", "fontSie": "30px" })
        var url = location.href;
        if (/qrzcrm/.test(url)) {
            console.log("msg : start url test success...")
            title.html("扫描二维码登录微信账号");
            extension.html("<p sytle='marginTop:80px;fontSie:14px;'>秦融资产微信业务系统</p>")
        } else {
            console.log("msg : start url test fail...");
            loginBox.css({ "backgroundColor": "black" });
            img.hide();
            extension.hide();
            title.html("错误<br/>请在<span style='color:red;margin:0 5px;'>秦融资产CRM系统</span>登录微信账号")
                .css({ "marginTop": "220px" });
        }
    },
    check: function() {
        var timer = setInterval(function() {
            var name = $('.display_name').text();
            if (name !== "") {
                clearInterval(timer);
                console.log("msg : userLogin...")
                start.name = name;
                setTimeout(function() {
                    //等待3秒钟,如果显示账号错误, 则不开启微信记录
                    if ($("#wx-tip-overlay").get(0)) {
                        return;
                    }
                    start.login();
                }, 3000)

            }
        }, 500);
    },
    login: function() {
        var src = host + $('.main_inner .panel .header .avatar img').attr('src');
        changeBase64(src, function(path) {
            var data = {
                message: "login",
                type: "login",
                username: start.wxuser, //业务员工号
                version: start.version,
                wechat_number: start.wxcode,
                wxphoto: path
            }
            console.log("msg: login success...");
            sm(data);
        })
        contact.init();
        wx.init();
    }
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////    CRM业务    ////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



//open wx
$('body').on('click', '.vv-account', function(e) {
    e.preventDefault();
    var _parent = $(this).parent();
    var wxcode = _parent.attr('id');
    var wxuser = $('#for-wx-user').text();
    var className = _parent.attr('class');
    if (className.indexOf('light') != -1) {
        console.log("--- light > activewx ---");
        sm({ "message": "activewx", "wxcode": wxcode });
        return;
    }
    console.log(`pop : wxcode = ${wxcode}, wxuser = ${wxuser}`);
    sm({ "message": "openwx", "wxcode": wxcode, "wxuser": wxuser });
})


var account = {
    element: null,
    helper: $('#pvirsion'),
    init: function() {

        console.log("fn : account init");

        //关闭微信消时会读取缓存数据, 所以不能在刷新时清空缓存.

        var now = Date.now();
        db.get({ cacheTime: false }, function(res) {
            if (!res.cacheTime) {
                db.set({ cacheTime: now })
            } else {
                //如果已经在, 比较时间戳, 超过一天则清空一次缓存
                var offset = now - res.cacheTime;
                if (offset > 86400) {
                    console.log("msg : clear cache...")
                    db.clear();
                }
            }
        })

        this.set();
        this.runtime();
    },

    set: function() {
        var v = (chrome.runtime.getManifest()).version;
        this.helper.append('<span class="version-numer">V' + v + '</span>')
    },
    setValue: function(request) {
        var item = $("#" + request.wxcode)
        item.addClass("light");
        var unread = item.find('.unread');
        var value = item.find('.value');
        if (request.sum > 0) {
            unread.show();
            value.text(request.sum);
        } else {
            unread.hide();
        }
    },

    tabClose: function(code, user) {
        var item = $("#" + code);
        item.removeClass("light");
        item.find(".unread").hide();
        var data = {
            type: "login",
            message: "logout",
            wechat_number: code,
            username: user
        }
        console.log(`msg : ${data.wechat_number} of ${data.username}  logout ...`);
        sm(data);
    },
    strategy: {
        request: null,
        sender: null,
        sendResponse: null,
        unread: function() {
            account.setValue(this.request);
        },
        close: function() {
            var _key1 = this.request.tabId + "@wxcode";
            var _key2 = this.request.tabId + "@wxuser";

            //从缓存中查询
            db.get([_key1, _key2], function(res) {
                var code = res[_key1];
                var user = res[_key2];
                if (code) {
                    account.tabClose(code, user);
                }
            })
        },
        incognito: function() {
            //未开启隐身权限
            account.helper.find('.allow').text(this.request.isAllow).attr('id', Date.now());
        },
        console: function() {
            var msg = this.request.msg;
            console.log("--- background.js ---");
            console.log(msg)
        }
    },

    runtime: function() {
        var _this = this;
        om.addListener(function(request, sender, sendResponse) {
            _this.strategy.request = request;
            _this.strategy.sender = sender;
            _this.strategy.sendResponse = sendResponse;
            _this.strategy[request.message]();
        })
    }
}

///////////////////////////////////////////////////////////////////

Array.prototype.unique = function() {
    var len = this.length;
    var res = [];
    var json = {};
    for (var i = 0; i < len; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}

Array.prototype.unique_obj = function(param) {
    var len = this.length;
    var res = [];
    var json = {};
    for (var i = 0; i < len; i++) {
        if (!json[this[i]][param]) {
            res.push(this[i]);
            json[this[i]][param] = 1;
        }
    }
    return res;
}


function changeBase64(src, callback) {
    var image = new Image();
    image.src = src;
    image.onload = function() {
        callback(getBase64Image(image));
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

Date.prototype.formatNow = function(delimter) {
    var now = new Date()
    if (!delimter || (typeof delimter != "string")) {
        delimter = ""
    }

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return [year, month, date].join(delimter);
}

///////////////////////////////////////////////////////////////////


//路由

$(function() {
    var url = window.location.href;

    if (/qq.com/.test(url)) {
        console.log("msg : entrance wx...")
        start.init()
    }

    if (/.cm/.test(url)) {
        console.log("msg : entrance crm...");
        sm({ message: "notify" });
        account.init();
    }
});
