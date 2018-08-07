var detectBrowser = function(ua) {
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
}



var menu = function() {
    var container,
        start = Date.now(),
        items,
        more,
        size = 20,
        type = "ynw",
        tabChange = false // 是否追加的方式添加数据

    var pad = str => {
        str = String(str)
        if (str.length == 1) {
            return "0" + str
        } else {
            return str
        }
    }

    var now = new Date()
    var today = pad(now.getMonth() + 1) + "-" + pad(now.getDate())

    var create = function(item) {
        item._client = item.client ? detectBrowser(item.client) : ''

        var match = item._client.match(/MSIE-(\d+)/)
        if (match && match[1] < 8) return ""

        var time = item.time.match(/^[^\s]+/)[0];
        var isToday = time == today ? "today" : ""

        return `<div class="error-item flex ${isToday}">
                    <span class="time">${item.time}</span>
                    <span class="url">${item.url}</span>
                    <span class="line">${item.line}</span>
                    <span class="client" alt="${item._client}">${item._client}</span>
                    <span class="msg">${item.msg}</span>
                </div>`
    }

    var reset = function() {
        start = Date.now()
        more.hide()
        items.empty()
    }


    return {
        init: function() {
            container = $('.error-container')
            items = $('.error-items')
            more = $('.error-more')


            $('.error-category').on('click', '.item', function() {
                $(this).addClass('select').siblings().removeClass('select')
                type = $(this).data('type')
                reset()
                menu.render()
            })

            container.on('click', '.error-more', function() {
                menu.render()
            })

        },

        render: function(ops) {
            if (tabChange) {
                reset()
            }
            var param = Object.assign({ size, type, start }, ops)
            $.getJSON('http://121.42.148.94/error/yn/query', param, back => {
                var len = back.docs.length;
                if (len == size) {
                    more.show()
                }
                if (len < 1) {
                    more.hide()
                    return
                }

                start = back.docs[back.docs.length - 1]._id
                var html = back.docs.map(item => create(item)).join("")
                tabChange ? items.html(html) : items.append(html)
                tabChange = false
            })
        }
    }
}()



$(function() {
    menu.init()
    menu.render()
})