var myCrop = require('../module/ui/cropper-model.js');

/*///////////////////////////////////////////////////////////////////*/

var categorys = ["移动资讯", "移动精选", "学炒股", "观点"];


//资讯列表
var list = function() {
    var container, head, items, ids = '',
        title = '',
        classif = '',
        page = 1,
        row = 10,
        itemsData = [],
        bootpag,
        group,
        categoryVal = '';
    var event = function() {
        //改变每页条数
        $('#branches').on('change', function() {
                page = 1;
                row = $(this).val();
                list.render();
            })
            //删除
        container.on('click', '.delete', function() {
                var id = $(this).data('id');

                layer.confirm("您真的要删除吗?", function(index) {
                    $.post('/headlines/del.do', { ids: id }, function(data) {
                        list.render();
                        layer.close(index);
                    })
                })
            })
            //全选
            /*
            $('#checkAll').click(function() {
                    var input = $(this).get(0);
                    items.find('input').each(function() {
                        this.checked = input.checked;
                    })
                })
             */

        //编辑
        container.on('click', '.edit', function() {
            var index = $(this).data('index');
            var itemData = itemsData[index];
            menu.show('publish', { data: itemData });
        })

        //绑定相关观点
        container.on('click', '.related', function() {
            var id = $(this).data('id')
            opinion.render(id);
        })

        //相关观点列表
        container.on('click', '.already', function() {
            var id = $(this).data('id')
            alreadyList.render({ id: id })
        })
    }

    function compile(data) {
        return _.map(data, (item, i) => {
            return `<div class="item flex"><input class="checkBox" type="checkbox" value="${item.id}"><a href="${item._link}" target="_blank" class="title flex1">${item.title}</a>
                <span class="small category">${categorys[item.type]}</span>
                <span class="small key_word">${item.keywords}</span>
                <span class="small time">${item.create_time}</span>
                <span class="small action">
                <button class="delete" data-id="${item.id}">删除</button>
                <button class="edit" data-id="${item.id}" data-index="${i}">编辑</button>
                <button class="related" data-id="${item.id}"">绑定相关观点</button>
                <button class="already" data-id="${item.id}"">相关观点列表</button>
                </div>`
        }).join('')
    }

    var handle = arr => {
        return _.map(arr, item => {
            item._link = `/headlines/${item.type}/${item.articleid}.htm`
            return item
        })
    }

    return {
        init: function() {
            container = $('#list');
            head = container.find('.header');
            items = container.find('.items');
            group = container.find('.form-group');
            bootpag = myBootpag(container);
            bootpag.on('page', function(err, n) {
                page = n;
                list.render()
            })
            event()
        },
        render: function() {
            container.show();
            $('#relatedOpinion').hide()
            getNewsList({ page: page, row: row }).done(function(data) {
                itemsData = data.rows;
                items.html(compile(handle(itemsData)));
                bootpag.bootpag({ page: page, total: data.pageNumber })
            })
        }
    }
}()

//观点列表
var opinion = (function() {
    var container, items, bootpag, page, back, add, params = {
        currentPage: 1,
        pageSize: 10
    }
    var last = null

    var create = arr => {
        return _.map(arr, item => {
            return `<div><span class="small s50 title">${item.title}</span>
                    <span class="small s30 key_word">${item.createrName}</span>
                    <button class="add s15" data-artid="${item.article_id}">添加到相关观点</button></div>`
        }).join('')
    }

    return {
        init: function() {
            container = $('#relatedOpinion')
            items = container.find('.relatedItems')
            page = $('.page')
            bootpag = myBootpag(page);
            bootpag.on('page', function(err, n) {
                params.currentPage = n;
                opinion.render()
            })

            //返回头条列表
            container.on('click', '.back', function() {
                list.render()
            })

            //添加相关观点
            container.on('click', '.add', function() {
                var articleId = $(this).data('artid')
                console.log("articleId", articleId)
                var type = '3' //文章类型 0 资讯 1精选 2学炒股 3观点   暂时先传3  
                $.post('/headlines/addHeadlinesArticle.do', { headline_id: last, type: 3, article_id: articleId }, back => {
                    if (back == 'success') {
                        layer.msg('添加成功')
                    } else {
                        layer.msg('已经添加过了')
                    }
                })
            })

            //查询
            container.on('click', '.query', function() {
                var title = $('.qtitle input').val()
                var name = $('.qname input').val()
                opinion.render(last, { title: title, queryName: name })
                $('.qtitle input').val('')
                $('.qname input').val('')
            })
        },
        render: function(id, ops) {
            _.extend(params, ops)
            last = id
            $('#relatedOpinion').show()
            $('#publish').hide()
            $('#list').hide()
            $.post('/article/ReleasedList.do', params, back => {
                items.html(create(back.rows))
                back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)])
                bootpag.bootpag({ page: params.currentPage, total: back.pageNumber })
            }, 'json')
        }
    }
})()



//相关观点列表
var alreadyList = (function() {
    var container, items, bootpag, page, back, add, params = {
        currentPage: 1,
        pageSize: 10
    }

    var create = arr => {
        return _.map(arr, item => {
            return `<div><span class="small s50 title">${item.title}</span>
                    <span class="small s30 key_word">${item.author}</span>
                    <button class="delete s15" data-id="${item.id}">删除相关观点</button></div>`
        }).join('')
    }

    return {
        init: function() {
            container = $('#alreadyOpinion')
            items = container.find('.alreadyItems')
            page = $('.page')
            bootpag = myBootpag(page);
            bootpag.on('page', function(err, n) {
                params.currentPage = n;
                alreadyList.render()
            })

            //返回头条列表
            container.on('click', '.back', function() {
                list.render()
            })

            //删除相关观点
            container.on('click', '.delete', function() {
                var id = $(this).data('id')
                $.post('/headlines/delheadlinesArticle.do', { ids: id }, back => {
                    if (back == 'success') {
                        layer.msg('已删除')
                        alreadyList.render()
                    }
                })
            })

        },
        render: function(ops) {
            _.extend(params, ops)
            container.show()
            $('#relatedOpinion').hide()
            $('#publish').hide()
            $('#list').hide()
            $.post('/headlines/headlinesArticleList.do', params, back => {
                items.html(create(back.rows))
                back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)])
                bootpag.bootpag({ page: params.currentPage, total: back.pageNumber })
            }, 'json')
        }
    }
})()




//发布资讯
var publish = function() {
    var container, ue, thumb, input, submit, uploadBtn, keywords, content, description,
        category, title, backnews_id, id, categoryVal, ue;


    //表单重置
    function reset() {
        title.val("");
        thumb.attr('src', "")
        input.val("");
        keywords.val("热点");
        backnews_id = "";
        // content.val('')
        ue.setContent('')
    }

    var event = function() {

        //重置
        container.on('click', '.submit .reset', function() {
            reset();
        })


        //提交
        submit.on('click', _.debounce(function() {
            if (!_.trim(title.val())) {
                return layer.msg('标题不能为空')
            }
            if (!_.trim(ue.getContent())) {
                return layer.msg('内容不能为空')
            }

            var send = {
                id: id,
                title: title.val(),
                image: thumb.attr('src'),
                keywords: keywords.val(),
                content: ue.getContent()
            }


            $.post("/headlines/add.do", send, _.debounce(function(data) {
                if (data == '{"status":1}') {
                    layer.msg("已保存");
                    reset();
                    $('.item.select').click();
                } else {
                    layer.msg('保存失败' + data)
                }
            }, 2000, { leading: true, trailing: false }))

        }))

        //上传图片
        uploadBtn.on('click', function() {
            myCrop.render({ width: 205, height: 130 });
        })
    }

    return {
        init: function() {
            container = $('#publish');
            thumb = $("#thumb");
            input = $("#file-upload-container");
            submit = $('.submit button.publish');
            uploadBtn = $('.uploadBtn');
            title = $('#news-title');
            keywords = $(".keyw");
            // content = $('.editContents textarea');
            ue = UE.getEditor('edit-headline', {
                toolbars: [
                    ['forecolor',   //颜色
                        'bold',    //加粗 
                        'indent',   //缩进
                        'underline',  //下划线
                        'horizontal',  //分割线
                        'removeformat', //清除格式
                        'simpleupload',  //单图上传
                        'justifycenter',  //左对齐
                        'justifyleft',  //居中
                        'fullscreen',  //全屏
                        'link', //链接
                        'unlink', //取消链接
                        'lineheight', //行间距
                    ]
                ],
                initialFrameHeight: 300,
                elementPathEnabled: false,
                // wordCount: true,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                // maximumWords: 150
            })
            event();
        },

        render: function(ops) {
            container.show();

            //回填数据
            var data = _.extend({ data: null }, ops).data;
            if (data) {
                id = data.id
                title.val(data.title);
                thumb.attr('src', data.image);
                keywords.val(data.keywords);
                // content.val(data.shortContent)
                ue.setContent(data.shortContent)
            }
        }
    }
}()


var menu = function() {
    var container, child = {
        list: list,
        publish: publish
    };

    function showType(type, ops) {
        $('.content-child').each(function() {
            var id = $(this).attr('id');
            if (id == type) {
                $(this).css("display", "flex");
                child[id].render(ops);
            } else {
                $(this).hide();
            }
        });

    }

    return {
        init: function() {
            container = $('.title-1');
            container.on('click', '.item', function() {
                $(this).parent().find('.select').removeClass('select')
                $(this).addClass('select');
                showType($(this).data('type'));
            })
        },
        show: (type, ops) => showType(type, ops)
    }
}()

///////////////////////////////////////////////////////////////////

$(function() {
    publish.init();
    list.init();
    list.render();
    menu.init();
    myCrop.init();
    opinion.init();
    alreadyList.init();

    //图片上传
    myCrop.onCrop = imageData => {
        $.post("/backNews/uploadImg.do", {
            src: imageData
        }, data => {
            if (data.flag == "success") {
                layer.msg("上传成功")
                $("#thumb").attr('src', data.returnPath)
            } else {
                layer.alert("上传失败, 请重试")
            }
        }, 'json')
    }
})


/*///////////////////////////////////////////////////////////////////*/


//获取新闻资讯
//type :  ["热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻"]
function getNewsList(ops) {
    var defer = $.Deferred();

    ops = _.extend({
        page: 1,
        row: 20
    }, ops)

    var send = {
        currentPage: ops.page,
        pageSize: ops.row
    }

    $.getJSON("/headlines/list.do", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })

    return defer.promise()
}


//添加页码组件
//selector支持css选择器和jquery对象
function myBootpag(selector, ops) {
    ops = _.extend({
        first: true
    }, ops)
    var timestamp = _.now();
    var id = `#${timestamp}`
    var tag = `<ul id="${timestamp}" class="ynpagination"></ul>`;
    var container = function() {
        if (typeof selector != "string") {
            return selector
        } else {
            return $(selector);
        }
    }()

    container.append(tag);
    var bootpag = $(id).bootpag({
        total: 1,
        page: 1,
        maxVisible: 5,
        firstLastUse: ops.first,
        first: "首页",
        last: "尾页",
        next: "下一页",
        prev: "上一页",
        leaps: false
    })
    bootpag.hide = function() {
        $(id).hide();
        return bootpag;
    }
    bootpag.show = function() {
        $(id).show();
        return bootpag;
    }
    return bootpag;
}
