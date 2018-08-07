<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="zh-CN">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="../public/module/layui-master/dist/css/layui.css?t=1505289970141" media="all">
        <title>Document</title>
        <style>
        body {
            font-family: "微软雅黑"
        }
        
        #violations {
            padding: 0 20px;
        }
        
        #violations .violations-input input {
            width: 200px;
            height: 40px;
            border-radius: 4px;
            border: none;
            background: #E3E3E3;
            padding-left: 10px;
        }
        
        #violations .violations-add {
            display: inline-block;
            color: #fff;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: rgb(0, 150, 136);
            border-radius: 4px;
            cursor: pointer;
        }
         #violations .violations-update{
         	display: inline-block;
            color: #fff;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #1E9FFF;
            border-radius: 4px;
            cursor: pointer;
         }
        
        #violations table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            margin-top: 30px;
        }
        
        #violations table td {
            border: 1px solid #e6e6e6;
            padding: 7px 0;
        }
        
        #violations thead td {
            background: #BDDEF2;
        }
        
        #violations .violations-del {
            display: inline-block;
            width: 70px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: #d72612;
            cursor: pointer;
            border-radius: 4px;
        }
        
        h1 {
            font-size: 34px;
            margin: 10px 0;
        }
        
        #violations .none {
            padding: 50px 0;
            text-align: center;
        }
        
        #violations #page {
            text-align: center;
        }
        </style>
    </head>

    <body>
        <div id="violations">
            <h1>违禁词库</h1>
            <label for="">新增违禁词</label>
            <span class="violations-input"><input type="text"></span>
            <span class="violations-add">增加</span>
            <span class="violations-update">更新词库</span>
            <table border="1">
                <thead>
                    <tr>
                        <td>违禁词汇</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div id="page"></div>
        </div>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
        <script src="../public/module/layui-master/dist/layui.js?t=1505289970141"></script>
        <script>
        layui.use(['layer', 'laypage'], function() {
            var layer = layui.layer;
            var laypage = layui.laypage; //分页
            var list = (function() {
                var container, total, send = {
                    pageSize: 10,
                    currentPage: 1
                }
                var create = function(arr) {
                    return _.map(arr, function(item) {
                        return ' <tr><td>' + item.forbidden_words + '</td><td><span class="violations-del" data-id=' + item.id + '>删除</span></td></tr> '
                    }).join('')
                }

                return {
                    init: function() {
                        container = $('#violations')
                            //新增
                        container.on('click', '.violations-add', function() {
                            var val = _.trim(container.find('input').val())
                            if (!val) {
                                return layer.msg('请输入内容')
                            }
                            $.post('/violations/addViolations.do', {
                                content: val
                            }, function(back) {
                                if (back == 'success') {
                                    layer.msg('添加成功')
                                    list.render()
                                    container.find('input').val('')
                                }
                            })
                        })

                        //删除
                        container.on('click', '.violations-del', function() {
                            var id = $(this).data('id')
                            $.post('/violations/delViolations.do', {
                                ids: id
                            }, function(back) {
                                if (back == 'success') {
                                    layer.msg('已删除')
                                    list.render()
                                }
                            })
                        })

                            //更新词库
                        container.on('click', '.violations-update', function() {      
                            $.post('/violations/clearViolations.do', function(back) {
                                if (back == 'success') {
                                	layer.msg('更新成功')
                                	list.render()
                                }
                            })
                        })
                    },
                    render: function(ops) {
                        send = _.extend(send, ops)
                        $.post('/violations/violationsList.do', send, function(back) {
                            back = JSON.parse(back)
                            total = back.total
                            if (back.rows.length < 1) {
                                container.find('tbody').html('<tr><td colspan="10"><div class="none">' +
                                    '<span>暂无记录</span></div></td></tr>')
                            } else {
                                container.find('tbody').html(create(back.rows))
                            }
                        })
                    },
                    getTotal: function() {
                        return total
                    }
                }
            })()
            setTimeout(function() {
                //添加页码
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

            $(function() {
                list.init()
                list.render()
            })
        })
        </script>
    </body>

    </html>
