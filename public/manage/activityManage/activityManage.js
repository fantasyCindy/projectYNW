layui.use(['layer', 'laypage', 'laydate'], function() {
    var list = (function() {
        var container, items, params = {
            currentPage: 1,
            pageSize: 10
        }
        var total = null,
            listData = null
        var create = arr => {
            return _.map(arr, item => {
                return `<tr>
                <td>${item.activity_name}</td>
                <td>${item.start_time}</td>
                <td>${item.end_time}</td>
                <td>${item._text}</td>
                <td class="edit" data-id='${item.id}'>编辑</td>
            </tr>`
            }).join('')
        }

        var handle = arr => {
            return _.map(arr, item => {
                item._text = ['否', '是'][item.is_start]
                return item
            })
        }
        return {
            init: function() {
                container = $('.activity-manage')
                items = container.find('.table-wrap')
                    //编辑
                items.on('click', '.edit', function() {
                    var id = $(this).data('id')
                    var data = _.filter(listData, { id: id })
                    edit.render(data)
                })

            },
            render: function(ops) {
                _.extend(params, ops)
                $.getJSON(__path + '/activity/activityList.do', params, back => {
                    if (back.list.length > 0) {
                        total = back.total
                        listData = back.list
                        items.html(create(handle(back.list)))
                    } else {
                        items.html('<tr><td colspan="10"><div class="activity-none">暂无记录</div></td></tr>')
                    }
                })
            },
            getTotal: function() {
                return total
            }
        }
    })()
    var laypage = layui.laypage; //分页
    setTimeout(function() {
        //页码
        laypage.render({
            elem: 'page',
            count: list.getTotal(),
            skin: '#ececec',
            jump: function(obj, first) {
                list.render({
                    currentPage: obj.curr
                })
            }
        })
    }, 800)

    //创建/修改
    var edit = (function() {
        var container, createWin, params = {},
            time = null,
            start_time = null,
            end_time = null,
            isEdit = false,
            arr = [],
            editTime = null
        return {
            init: function() {
                container = $('.activity-manage')
                createWin = container.find('.createWin')
                container.on('click', '.createBtn', function() {
                    edit.render()
                })
                var min = new Date().getTime()
                    //时间选择器             
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#dateTime',
                    range: '~',
                    type: 'datetime',
                    min: min,

                    done: function(value) {
                        time = value
                    }
                })


                //提交
                createWin.on('click', '.btn-submit', function() {
                    var title = createWin.find('.createName input').val().trim()
                    if (!title) {
                        return layer.msg('请输入活动名称')
                    }
                    var activeTime = time ? time : editTime
                    if (!activeTime) {
                        return layer.msg('请设置活动时间')
                    }
                    arr = activeTime.split("~")
                    start_time = arr[0]
                    end_time = arr[1]
                    var isSelect = createWin.find('.isCreate select').val()
                    if (!isSelect) {
                        return layer.msg('活动是否开启')
                    }
                    params.activity_name = title
                    params.start_time = start_time
                    params.end_time = end_time
                    params.is_start = isSelect
                    $.post(__path + '/activity/addoredit.do', params, back => {
                        if (back == 'success') {
                            if (!isEdit) {
                                layer.msg('创建成功')
                            } else {
                                layer.msg('修改成功')
                            }

                        }
                        edit.reset()
                        list.render()
                    })
                })

                //取消
                createWin.on('click', '.btn-cancel', function() {
                    edit.reset()
                })

            },
            render: function(data) {
                if (data) {
                    isEdit = true
                    params.id = data[0].id
                    editTime = data[0].start_time + '~' + data[0].end_time
                    createWin.find('.createTime input').val(data[0].start_time + '~' + data[0].end_time)
                    createWin.find('.createName input').val(data[0].activity_name)
                    createWin.find('select').val(data[0].is_start)
                }
                createWin.fadeIn()
            },
            reset: function() {
                createWin.hide()
                time = ''
                createWin.find('input').val('')
                createWin.find('select').val('')
                isEdit = false
            }
        }
    })()




    $(function() {
        list.init()
        edit.init()
        list.render()
    })
})