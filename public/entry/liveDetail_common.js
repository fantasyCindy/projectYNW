var askWindow = require('base/askWindow.js'); //提问
var Care = require('../module/ajax/care.js');

/*///////////////////////////////////////////////////////////////////*/

//个人信息
var info = function() {
    var container, care, question;
    return {
        init: function() {
            container = $('#live-info');
            care = $('#live-info .care');
            question = $('#live-info .ask');

            //关注
            care.click(function() {
                if (!ynIsLogin) return yn.login.render();
                if ((+ynTeacherId == +room_teacherid)) return layer.msg("不能关注自己啊");

                //取消关注
                if ($(this).attr('class').indexOf('true') != -1) {
                    Care.cancel(room_teacherid).done(function() {
                        care.removeClass('true').text("关注");
                    })
                    return;
                }
                //添加关注
                Care.add(room_teacherid).done(function() {
                    care.addClass('true').text("取消关注");
                });
            })

            $('.askWin-trigger').click(function() {
                if (ynTeacherId == room_teacherid) return layer.msg("扪心自问");
                var price = $(this).data('price');
                askWindow.aimedRender({
                    select: { id: room_teacherid, name: $('#teacher-nickName').text(),price:price }
                })
            })
        }
    }
}()

//菜单
var menu = function() {
    var container;

    //根据地址高亮菜单
    function light() {
        var href = window.location.href;
        if (container.next().find('.askStock-category-item').length != 0) {
            container.find('.item').eq(1).addClass('select');
        }
        if(/\/dapan\//.test(href) || /\/ticai\//.test(href)){
            container.find('.opinionType-item').addClass('select');
        }
        if(/\/tactics\//.test(href)){
            container.find('.learnType-item').addClass('select');
        }
        if(/\/refer\//.test(href)){
            container.find('.referType-item').addClass('select');
        }
    }

    return {
        init: function() {
            container = $('.liveDetail-menu');
            light();
        }
    }
}()


//公告
var announce = (function() {
        var container, wordCount, textarea, ue
        var deleteMsg = room_userid == ynUserId ? `<span class="action-bar-btn action-bar-delete">删除</span>` : ''
        var editMsg = room_userid == ynUserId ? `<span class="action-bar-btn action-bar-send edit-msg">新建公告</span>` : ''
        var sendMsg = room_userid == ynUserId ? `<span class="action-bar-btn action-bar-send send-msg">提交</span>` : ''
        var cancelEdit = room_userid == ynUserId ? `<span class="action-bar-btn action-bar-cancel">取消</span>` : ''

        var create = item => {
            return `<div class="action-bar">${deleteMsg}${editMsg}
            <span class="action-bar-time">${item._time}</span></div>
          <div class="announcement-msg">${item.content}</div>`
        }

        var createEdit = () => {
            return `<div class="action-bar">${sendMsg}${cancelEdit}</div>
          <div class="announcement-msg-edit">
          <div contenteditable="true" id="ta-notice"></div>
         <span class="word-count"><span class="wordCount">100</span>/100</span></div>`
        }

        var createNone = () => {
            return `<div class="action-bar">${editMsg}</div><div class="announcement-none">目前暂无公告</div>`
        }

        var handle = item => {
            item._time = item.pubtime.substr(0, 11)
            return item
        }
        return {
            init: function() {
                container = $('#live-info');


                //删除公告
                container.on('click', '.action-bar-delete', function() {
                    layer.confirm('确定删除此公告？', function() {
                        $.post(__path + '/notice/delTeacherNotice.htm', back => {
                            if (back.status == 1) {
                                layer.msg('已删除')
                                announce.render()
                            }
                        }, 'json')
                    })

                })


                //发布公告
                container.on('click', '.edit-msg', function() {
                    container.find('.column3').html(createEdit())
                    wordCount = container.find('.wordCount')
                    textarea = document.getElementById('ta-notice')

                    textarea.onkeyup = function(e) {
                        var cur = textarea.innerHTML.trim()
                        if (100 - cur.length < 0) {
                            layer.msg("超出字数限制")
                            textarea.innerText = cur.substr(0, 100)
                            return
                        } else {
                            wordCount.text(100 - cur.length)
                        }
                    }

                })

                //取消
                container.on('click', '.action-bar-cancel', function() {
                    announce.render()
                })

                //提交公告
                container.on('click', '.send-msg', _.debounce(function() {
                    var content = textarea.innerText.replace(/[\n\r]/g, '<br>')
                    var length = textarea.innerText.trim().length
                    if (!content) {
                        return layer.msg('请输入内容')
                    }
                    if (length > 100) return layer.alert('当前字数' + length + ',最多输入100字')
                    $.post(__path + '/notice/addNotice.htm', { content: content }, back => {
                        if (back.status == 1) {
                            layer.msg('发布成功')
                            announce.render()
                        }
                    }, 'json')
                }, 2000, { 'leading': true, 'trailing': false }))

            },
            render: function() {
                $.getJSON(__path + '/notice/teacherNotice.htm', { teacherid: room_teacherid }, back => {
                    if (back.data == '') {
                        container.find('.column3').html(createNone())
                        return
                    }
                    container.find('.column3').html(create(handle(back.data)))
                })
            }
        }
    })()
    //////////////////////////////////////////////////////////////////

$(function() {
    info.init();
    menu.init();
    askWindow.init();
    announce.init();
    announce.render();
});