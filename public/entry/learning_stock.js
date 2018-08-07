var myCrop = require('../module/ui/cropper-model.js');

/*///////////////////////////////////////////////////////////////////*/

var categorys = ["名家战法", "五分钟学炒股 ", "投资心理", "股票百科"];

var onEnter = function() {
    //回车事件
}

//回车添加标签
document.onkeydown = function(e) {
    if (e.keyCode == 13) {
        if (typeof onEnter == "function") {
            onEnter()
        }
    }
}


//资讯列表
var list = function() {
    var container, head, items, ids = '',
        title = '',
        classif = '',
        page = 1,
        row = 12,
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
                    $.post('/learning/del.do', { ids: id }, function(data) {
                        list.render();
                        layer.close(index);
                    })
                })
            })
            //全选
        $('#checkAll').click(function() {
            var input = $(this).get(0);
            items.find('input').each(function() {
                this.checked = input.checked;
            })
        })

        //编辑
        container.on('click', '.edit', function() {
            var index = $(this).data('index');
            var itemData = itemsData[index];
            menu.show('publish', { data: itemData });
        })

        //查询
        group.on('click', '.btn-inquire', function() {
            page = 1;
            title = group.find('input.input_title').val();

            // 获取分类value
            categoryVal = $('#list .category1.show').val()
            list.render();
        })

        $('.addTagInput').focus(function() {
            onEnter = function() {
                // alert("enter")
                var text = $('.addTagInput').val()
                if (!text) {
                    return layer.msg('请输入标签')
                }
                if (text.length > 6) {
                    return layer.msg('最多输入6个字')
                }
                var length = $('.exist .exist-name').length;
                if (length > 2) {
                    $('.addTagInput').val('')
                    return layer.msg('最多添加3个标签')
                }
                $('.exist').append(`<span class="exist-name">${text}<i class="fa fa-times removeTag" aria-hidden="true"></i></span>`)
                $('.addTagInput').val('')
            }
        }).blur(function() {
            onEnter = null
        })

        //删除标签
        $('.exist').on('click', '.removeTag', function() {
            $(this).parent('.exist-name').remove()
        })



        // 置顶
        var key_layer = $('#list .key-layer');
        var key = $('#list .layer-select');
        var articleid, title, image, content, keywords;
        container.on('click', '.toTop', function() {
            var index = $(this).parents('.item').index()
            var data = DATA[index];
            articleid = data.article_id
            title = data.title
            image = data.title_img
            content = data.content
            key_layer.show();
        })
        $('#list .layer-btn').on('click', function() {
            content = $('.editContent textarea').val()
            title = $('.editTitle input').val()
            keywords = key.val();
            if (!title) {
                return layer.msg('请输入标题')
            }
            if (!content) {
                return layer.msg('请输入内容')
            }
            var str = ""
            $('.exist-name').each(function() {
                str += $(this).text() + ','
            })
            str = str.replace(/,$/, '')
            if(!str){
                return layer.msg('请输入标签')
                // keywords = key.val();
            }

            $.post('/headlines/add.do', { type: 2, articleid: articleid, title: title, image: image, keywords: str, content: content }, function(data) {
                if (data.status == '1') {
                    layer.msg('已置顶')
                }
                if (data.status == '-1') {
                    return layer.msg('已经置顶过了')
                }
                list.render();
                key_layer.hide();
                $('.editContent textarea').val('')
                $('.editTitle input').val('')
            }, 'json')
        })
        $('#list .close').on('click', function() {
            key_layer.hide();
            keywords = key.val('热点');
            $('.editContent textarea').val('')
            $('.editTitle input').val('')
        })


        //推送
        var type, title, id,source;
        container.on('click', '.post', function() {
            $('#list .push').show();
            title = $(this).data('title');
            $('.push .push-title').val(title);
            id = $(this).data('id');
        })
            var source_radio = $('.push-source');
        $('.push .push-btn').on('click', function() {
            var val = $('.push .push-title').val();
            if (!val) {
                return layer.msg('请输入标题')
            }
            source_radio.map(function(e){
                if($(this).is(':checked')){
                    source = $(this).data('source')
                }
            })
            if(typeof source == 'string' || typeof source == "undefined"){
                return layer.msg('请选择推送平台')
            }

            $.post('/message/publishMessage.do', { messagetitle: val, messagecontent: val, messagetype: 7, type: 4, newsid: id,source: source }, function(data) {
                if (data == 'success') {
                    layer.msg('已推送')
                    source = ''
                    source_radio.attr('checked',false)
                }
                list.render();
            })
            $('#list .push').hide();
        })
        $('.push .close').on('click', function() {
            $('#list .push').hide();
                    source = ''
                    source_radio.attr('checked',false)
            $('.push .push-title').val('')
        })

        //清空
        group.on('click', '.btn-reset', function() {
            group.find('input').val('');
            title = '';
            $('#list .category1.show').val('0')
            list.render();
        })

        //推荐
        container.on('click', '.recommend', function() {
            var isRecommend = $(this).data('recommend')
            var text = isRecommend == '1' ? '已取消推荐' : '已推荐'
            var status = isRecommend == '1' ? '0' : '1'
            var id = $(this).data('id')
            $.post('/learning/isrecommend.do', { learning_stocksId: id, recommend: status }, back => {
                if (back == 'success') {
                    layer.msg(text)
                    list.render()
                }
            })
        })

    }

    function compile(data) {
        return _.map(data, (item, i) => {
            return `<div class="item flex"><input class="checkBox" type="checkbox" value="${item.id}"><a href="${item.link}" target="_blank" class="title flex1">${item.title}</a>
                <span class="small category">${categorys[item.ltype]}</span>
                <span class="small time">${item.create_time}</span>
                <span class="small action">
                <button class="delete fl" data-id="${item.id}">删除</button>
                <button class="edit fl" data-id="${item.id}" data-index="${i}" style="margin-left:8px">编辑</button>
                <button class="recommend fl" data-id="${item.id}" data-recommend="${item.recommend}" style="margin-left:8px">${item.txt}</button>
                <button class="toTop style${item.backnews_type}" data-id='${item.id}' data-type='${item.backnews_type}'>置顶</button>
                <button class="post style${item.backnews_type}" data-type="${item.backnews_type}" data-title="${item.title}" data-id="${item.article_id}">推送</button>
                </div>`
        }).join('')
    }
    var handle = arr => {
        return _.map(arr, item => {
            item.txt = item.recommend == '1' ? '已推荐' : '推荐'
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
            getNewsList({ page: page, row: row, title: title, type: categoryVal }).done(function(data) {
                itemsData = data.rows;
                items.html(compile(handle(itemsData)));
                bootpag.bootpag({ page: page, total: data.pageNumber })
            })
        }
    }
}()


//发布资讯
var publish = function() {
    var container, ue, thumb, input, submit, uploadBtn, keywords, description,
        category, title, backnews_id, id, categoryVal;
    //验证
    function validate() {
        var a = !!_.trim(title.val());
        var b = !!_.trim(ue.getContent());
        return a && b
    }

    //表单重置
    function reset() {
        title.val("");
        ue.setContent("")
        thumb.attr('src', "")
        input.val("");
        keywords.val("");
        backnews_id = "";
        $('.classify.first').click();
    }

    var event = function() {

        //重置
        container.on('click', '.submit .reset', function() {
            reset();
        })


   
        //删除标签
        $('.pub-exist').on('click', '.pub-removeTag', function() {
            $(this).parent('.pub-exist-name').remove()
        })


        //提交
        submit.on('click', _.debounce(function() {
            if (!validate()) {
                layer.msg("表单不能为空..")
                return;
            }
            // 获取分类value
            categoryVal = $('#publish .category1.show').val()

            var send = {
                id: id,
                ltype: $('#publish .category1.show').val(),
                title: title.val(),
                content: ue.getContent(),
                title_img: thumb.attr('src'),
                keywords: keywords.val().trim(),
            }

            $.post("/learning/create.do", send, _.debounce(function(data) {

                if (data == "success") {
                    layer.msg("发布成功");
                    send = {
                        id: '',
                        ltype: '',
                        title: '',
                        content: '',
                        title_img: '',
                        keywords: ''
                    }
                    id = '';
                    $('.item-list').click();
                    reset();
                } else {
                    layer.msg('发布失败' + data)
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
            category = $(".category1");
            title = $('#news-title');
            keywords = $("#value-keywords");

            ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    [
                        'undo', //撤销
                        'redo', //重做
                        'bold', //加粗
                        'indent', //首行缩进
                        'snapscreen', //截图
                        'underline', //下划线
                        'pasteplain', //纯文本粘贴模式
                        'preview', //预览
                        'horizontal', //分隔线
                        'removeformat', //清除格式
                        'fontfamily', //字体
                        'fontsize', //字号
                        'paragraph', //段落格式
                        'simpleupload', //单图上传
                        'insertimage', //多图上传
                        'link', //超链接
                        'insertvideo', //视频
                        'justifyleft', //居左对齐
                        'justifyright', //居右对齐
                        'justifycenter', //居中对齐
                        'justifyjustify', //两端对齐
                        'forecolor', //字体颜色
                        'backcolor', //背景色
                        'fullscreen', //全屏
                        'rowspacingtop', //段前距
                        'rowspacingbottom', //段后距
                        'imageleft', //左浮动
                        'imageright', //右浮动
                        'imagecenter', //居中
                        'lineheight', //行间距
                    ]
                ],
                initialFrameHeight: 500,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                autotypeset: {
                    removeClass: true,
                    clearFontSize: true,
                    removeEmptyline: true, //去掉空行
                    removeEmptyNode: false, // 去掉空节点
                    autotypeset: true,
                    indentValue: '2em'
                }
            });

            event();
        },

        render: function(ops) {
            container.show();

            //回填数据
            var data = _.extend({ data: null }, ops).data;
            if (data) {
                console.log('data', data);
                id = data.id
                backnews_id = data.backnews_id;
                title.val(data.title);
                category.val(data.ltype);
                thumb.attr('src', data.title_img);
                keywords.val(data.keywords);
                ue.setContent(data.content)
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
                $('.submit .reset').click();
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

var DATA = null;
//获取新闻资讯
//type :  ["热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻"]
function getNewsList(ops) {
    var defer = $.Deferred();

    ops = _.extend({
        type: "", //
        page: 1,
        row: 20,
        title: ""
    }, ops)

    var send = {
        type: ops.type,
        currentPage: ops.page,
        pageSize: ops.row,
        title: ops.title
    }

    $.getJSON("/learning/list.do", send, function(data) {
        DATA = data.rows;
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
