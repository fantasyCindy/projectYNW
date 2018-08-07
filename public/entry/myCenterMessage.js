require('~/center/center.js')
var referList = require('~/composite/refer-list.js');

var href = window.location.href
var match = href.match(/\?type=([0-9])/)
var type = match ? match[1] : 5
var error = require('e/error-type');
// window.onhashchange = function() {
//     window.location.reload()
// }
// window.location.hash = ""
/*///////////////////////////////////////////////////////////////////*/


var myMessage = function() {

    // 页码
    var pagination = yn.bootpag('#contentWrap');
    pagination.on('page', function(e, num) {
        list.render({
            currentPage: num
        })
        $(window).scrollTop(0)
    })

    // 菜单
    var menu = (function() {
        var container = $(".category").find('.tab-content')
        var create = arr => {
            return _.map(arr, item => {
                return `<td class="menu-item type${item.messageType}" data-value=${item.messageType}>${item.text}<span class="live-num ${item.style}">(${item._unReadCount})</span></td> `
            }).join('')

        }

        container.on('click', '.menu-item', function() {
            container.find('.select').removeClass('select')
            $(this).addClass('select')
            var value = $(this).data('value')
            list.render({
                messagetype: value,
                currentPage: 1
            })
            pagination.bootpag({ page: 1 })
        })
        var handle = arr => {
            return _.map(arr, item => {
                item._unReadCount = item.unReadCount != 0 ? item.unReadCount : ''
                item._unReadCount = item.unReadCount > 99 ? '99+' : item._unReadCount
                item.style = item.unReadCount == 0 ? 'hide' : 'show'
                item.text = ['', '', '系统消息', '', '', '内参消息', '', '', '直播消息'][item.messageType]
                return item
            })
        }
        return {
            render() {
                $.getJSON('/app/queryNoRead.htm', { source: 0 }, back => {
                    if (back.status == 1) {
                        var filter = _.filter(back.data, item => /[258]/.test(item.messageType))
                        var date = filter.reverse()
                        container.html(create(handle(date)))
                        if (type) {
                            container.find(`.type${type}`).click()
                        }
                        // list.render()
                    }
                })
            }
        }

    })()

    // 列表
    var list = (function() {
        var container, items, params = {
            source: "0",
            pageSize: 8,
            currentPage: 1,
            messagetype: 5
        }
        var create = arr => {
            return _.map(arr, item => {
                return `<div class="msg-item ${item._isread}"><div class="msg-title"><a ${item._link} target="_blank">${item.messagetitle}</a><span class="msg-time">${item._createtime}</span></div>
                    <div class="msg-content ${item._liveStyle}"><a ${item._link} target="_blank">${item._messagecontent}</a></div></div>`
            }).join('')
        }
        var handle = arr => {
            return _.map(arr, item => {
                item._createtime = item.createtime.substr(0, 16)
                item._messagecontent = item.messagecontent ? item.messagecontent : ''
                item._isread = item.isread == 1 ? '' : 'isNotRead'
                item._liveStyle = ''
                var match = item.urllink.match(/\d+$/);
                if (match) {
                    item._id = match[0];
                    if (item.messagetype == 2) {
                        item._link = ''
                    } else if (item.messagetype == 5) {
                        item._link = `href = ${live_path}reference/${item._id}.htm`
                    } else if (item.messagetype == 8) {
                        item._liveStyle = 'hide'
                        item._link = `href = ${live_path}live/liveDetailLive.htm?teacherid=${item._id}&periodical=${item.goods_id}`
                    }
                }
                return item
            })
        }
        return {
            init: function() {
                container = $(".contentBar");
                items = container.find('.items');
            },
            render(ops) {
                _.extend(params, ops)
                $.getJSON("/app/getMessage.htm", params, back => {
                    back.pageNumber = _.max([1, Math.ceil(+back.data.total / params.pageSize)]);
                    if (back.data == '' || back.data.list == '') {
                        items.html(ynconfig.none());
                        pagination.hide()
                        return
                    } else {
                        items.html(create(handle(back.data.list)))
                        pagination.show().bootpag({
                            total: back.pageNumber
                        })
                    }
                })
            }
        }
    })()

    // call
    menu.render()
    list.init()
}


/*///////////////////////////////////////////////////////////////////*/

$(function() {
    yn.centerMenu.init({
        render: 'my',
        light: '我的消息'
    })
    myMessage()
        // ynIsTeacher ? Teacher() : User()
})
