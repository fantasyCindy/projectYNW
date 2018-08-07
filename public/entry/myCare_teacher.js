/*///////////////////////////////////////////////////////////////////*/
require('~/center/center.js')
var Str = require('m/lib/string.js');
var error = require('e/error-type');
/*///////////////////////////////////////////////////////////////////*/

var bootpag, loading;



var topic = (function() {
        var container, params = {
            source: 0,
            messagetype: 9,
            currentPage: 1,
            pageSize: 5
        }
        var count = 1;
        var flag = ''
        var newList = []
        var creatItem = item => {
            return `<div class="topic-item">
            <span class="topic-item-photo"><img src="${item.image_path}" alt=""></span>
            <span class="topic-item-content">
            <span class="topic-item-content-name">${item.messagecontent}<i class="topic-teacher-icon"></i>评论了话题</span>
            <span class="topic-item-title"><a href='/app/topicDetail.htm?topic_id=${item.goods_id}' target="_blank">#${item.messagetitle}#</a></span>
            <span class="topic-item-time">${item._time}</span>
            </span>
        </div>`
        }

        var handle = data => {
            return _.map(data, item => {
                // item._time = yn.timeFormat(item.createtime);
                item._time = item.createtime.substr(0, 11)
                return item;
            })
        }
        return {
            init: function() {
                container = $('#mycare')
                container.on('click', '.loadMore', function() {
                    // ++count
                    topic.render({ currentPage: ++count })

                })
            },
            render: function(ops) {
                params = _.extend(params, ops)
                    // loading.render();
                $.getJSON(__path + '/app/getMessage.htm', params, back => {
                    if (back.status == 1) {
                        if (back.data.list.length < 5) {
                            layer.msg('已加载全部')
                            container.find('.loadMore').hide()
                        }
                        if (back.data == '') {
                            container.find('.items').html(ynconfig.none({ margin: 200 }));
                            // bootpag.hide();
                            return;
                        } else {
                            handle(back.data.list).forEach(item => {
                                if (item._time != flag) {
                                    newList.push(`<div class="topic-date">${item._time}</div>`)
                                }
                                newList.push(`<div class="topic-item">
                                    <a href=""><span class="topic-item-photo"><img src="${item.image_path}" alt=""></span></a>
                                    <span class="topic-item-content">
                                    <span class="topic-item-content-name">${item.messagecontent}<i class="topic-teacher-icon"></i>评论了话题</span>
                                    <span class="topic-item-title"><a href='/app/topicDetail.htm?topic_id=${item.goods_id}' target="_blank">#${item.messagetitle}#</a></span>  
                                    </span>
                                </div>`)
                                flag = item._time
                            })
                            container.find('.items').append(newList.join(''))
                            newList = []
                                // bootpag.show();
                                // var pageNumber = _.max([1, Math.ceil(+back.data.total / params.pageSize)]);
                                // bootpag.bootpag({ page: params.currentPage, total: pageNumber });
                        }
                    }else {
                        return layer.msg(error[back.status])
                    }
                })
            }
        }
    })()
    /*///////////////////////////////////////////////////////////////////*/


$(function() {



    var container = $("#mycare");
    var items = container.find('.items');
    // bootpag = yn.bootpag(container).on('page', (err, num) => {
    //     var cur = $(".filter .select");
    //     var className = cur.attr('class');
    //     className.indexOf("live") != -1 && feed.render({ mtype: cur.data('type'), currentPage: num });
    //     className.indexOf('composite') != -1 && composite.render({ currentPage: num })
    //     className.indexOf('topic') != -1 && topic.render({ currentPage: num })
    // });

    loading = new yn.loading({ container: items });

    yn.centerMenu.init({
        render: 'my',
        light: '我关注的话题'
    });


    topic.init()
    topic.render()
})