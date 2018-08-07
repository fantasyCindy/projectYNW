

$(function () {
    $('.role').click(function () {
        const key = $(this).data('key')
        var link = config[key]
        if (link) {
            var host = link.host ? link.host : link.url
            var url = `${link.url}?autoplugin=true&account=${link.acount}&password=${link.password}&action=${link.action}&host=${host}`;
            chrome.tabs.create({ url: url })
        } else {
            alert("尚未添加")
        }
    })


    // 其他功能
    var action = $('.actions')
    var actions = {
        'iframe-free': function () {
            chrome.tabs.executeScript({
                code: `window.open(document.getElementsByTagName('iframe')[0].src)`
            })
        }
    }


    //actions
    action.on('click', '.item', function () {
        var key = $(this).data('key')
        actions[key]()
    })
})

