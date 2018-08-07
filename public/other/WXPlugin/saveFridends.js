var contactTimer = {
    tab: null,
    chat: null,
    container: null,
    items: null,
    list: [],
    top: 0,
    placeholder: null,
    scrollCount: 1,
    self: null,
    friends: [],
    favicon: [],
    init: function(callback) {
        var _this = this;
        this.set();
        this.placeholder = this.container.find('.top-placeholder');
        var ready = setInterval(function() {
            _this.tab.click();
            var className = _this.tab.attr('class');
            if (className.indexOf("web_wechat_tab_friends_hl") != -1 && _this.items.find('h4.nickname').length > 6) {
                clearInterval(ready);
                _this.getData(function() {
                    callback(_this.friends, _this.favicon);
                });
            }
        }, 300);
    },
    set: function() {
        this.tab = $('.panel .tab .tab_item:eq(2) .chat i');
        this.chat = $('.panel .tab .tab_item:eq(0) .chat i');
        this.container = $('.panel .nav_view:eq(1)');
        this.items = $('#navContact');
    },
    getData: function(callback) {
        var _this = this;
        var id = Math.floor(Math.random() * 1000000000);
        var count = 0;
        var timer = setInterval(function() {
            _this.items.scrollTop(500 * _this.scrollCount);
            var now = _this.placeholder.css('height');

            if (now == _this.top) {
                clearInterval(timer);
                _this.chat.click();
                var list = _this.list;
                console.log("msg : get friends done...");

                //unique
                var _res = {};
                list.forEach(function(item, i, source) {
                    var match = item.name.match(/[0-9]*[\u4e00-\u9fa5]*\w*/g);
                    if (!match) return;
                    item.name = match.join("");
                    if (!_res[item.name]) {
                        _this.friends.push({
                            nickName: item.name,
                            imgid: item.fid
                        })
                        _this.favicon.push({
                            imgid: item.fid,
                            src: "https://wx.qq.com" + item.src
                        })
                        _res[item.name] = 1;
                    }
                })
                callback();
                return;
            }

            var nickname = _this.container.find('h4.nickname');
            nickname.each(function(i, e) {
                var src = "https://wx.qq.com" + $(this).parent().prev().find('img').attr('src');
                _this.list.push({
                    name: $(this).text(),
                    src: src,
                    fid: Date.now() + id + "-" + count
                });
                count++;
            });
            _this.scrollCount++;
            _this.top = now;
        }, 100);
    }
};