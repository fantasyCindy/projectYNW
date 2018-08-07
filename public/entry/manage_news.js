var myCrop = require('../module/ui/cropper-model.js');

/*///////////////////////////////////////////////////////////////////*/

var categorys = ["", "热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻", "风险提示", "利好消息", "投资要闻", "名家战绩", "热点专题", "名家解盘"];

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
                $.post('/backNews/deleteNews.do', { id: id }, function(data) {
                    list.render();
                    layer.close(index);
                })
            })
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
            categoryVal = $('select.show').val()
            list.render();
        })

        // 置顶
        var key_layer = $('#list .key-layer');
        var key = $('#list .layer-select');
        var articleid, title, image, content, keywords, type;
        container.on('click', '.toTop', function() {
            var index = $(this).parents('.item').index()
            var data = DATA[index];
            articleid = data.article_id
            image = data.title_img
            keywords = data.keywords
            var typea = data.backnews_type
            if (typea >= 6 && typea <= 8) { //头条类型 select的value为6,7,8时,传0(移动资讯);值为9,10,11时,传1(移动精选);值为1234时没有置顶功能
                type = 0
            } else if (typea >= 9 && typea <= 11) {
                type = 1
            }
            key_layer.show();

        })
        $('#list .layer-btn').on('click', function() {
            content = $('.editContent textarea').val()
            title = $('.editTitle input').val()
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
            if (!str) {
                return layer.msg('请输入标签')
                    // keywords = key.val();
            }
            $.post('/headlines/add.do', { type: type, articleid: articleid, title: title, image: image, keywords: str, content: content }, function(data) {
                if (data.status == '1') {
                    layer.msg('已置顶')
                } else if (data.status == '-1') {
                    return layer.msg('该消息已置顶过')
                }
                list.render();
            }, 'json')
            key_layer.hide();
            $('.editContent textarea').val('')
            $('.editTitle input').val('')
        })
        $('#list .close').on('click', function() {
            key_layer.hide();
            key.val('热点')
            $('.editContent textarea').val('')
            $('.editTitle input').val('')
        })


        //推送
        var type, title, id, source;
        container.on('click', '.post', function() {
            $('#list .push').show();
            title = $(this).data('title');
            $('.push .push-title').val(title);
            var typea = $(this).data('type')
            if (typea >= 6 && typea <= 8) { //推送类型 select的value为6,7,8时,传1(移动资讯);值为9,10,11时,传2(移动精选);值为1234时没有推送功能
                type = 1

            } else if (typea >= 9 && typea <= 11) {
                type = 2
            }
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
            $.post('/message/publishMessage.do', { messagetitle: val, messagecontent: val, messagetype: 6, type: type, newsid: id,source: source}, function(data) {
                if (data == 'success') {
                    layer.msg('已推送')
                    source = ''
                    source_radio.attr('checked',false)
                }
                list.render();
            })
            $('#list .push').hide();
            $('.push .push-title').val('')
        })
        $('.push .close').on('click', function() {
            $('#list .push').hide();
            source = ''
            source_radio.attr('checked',false)
            $('.push .push-title').val('')
        })

        //清空
        group.on('click', '.btn-reset', function() {
                group.find('input.').val('');
                title = '';
                list.render();
            })
            //重新发布
        group.on('click', '.btn-severity', function() {
                ids = '';
                items.find('input').each(function() {
                    console.log(this.value)
                    ids += this.value + ','
                })
                ids = (ids.substring(ids.length - 1) == ',') ? ids.substring(0, ids.length - 1) : ids;
                $.post('/backNews/createNewsHtmls.do', { ids: ids }, function(data) {
                    console.log("发布返回值", data)
                    if (data == "success") {
                        layer.msg("发布成功");
                        ids = ''
                    } else {
                        layer.msg('发布失败' + data)
                    }
                })
            })
            //全部重新发布
        group.on('click', '.btn-natchSeverity', function() {
            layer.confirm("您真的要全部重新发布吗?", function(index) {
                $.post('/backNews/batchCreateNewsHtmls.do', null, function(data) {
                    if (data == "success") {
                        layer.msg("发布成功");
                    } else {
                        layer.msg('发布失败' + data)
                    }
                    layer.close(index);
                })
            })
        })
    }

    function compile(data) {
        return data.map((item, i) => {
            return `<div class="item flex"><input class="checkBox" type="checkbox" value="${item.id}"><a href="${item.link}" target="_blank" class="title flex1">${item.title}</a>
                <span class="small category">${categorys[item.backnews_type]}</span>
                <span class="small time">${item.create_time}</span>
                <span class="small action">
                <button class="edit fl" data-id="${item.id}" data-index="${i}">编辑</button>
                <button class="delete fl" data-id="${item.id}" style="margin-left:8px;">删除</button>
                <button class="toTop style${item.backnews_type}" data-id="${item.backnews_id}">置顶</button>
                <button class="post style${item.backnews_type}" data-type="${item.backnews_type}" data-title='${item.title}' data-id="${item.backnews_id}">推送</button>
                </div>`
        }).join('')
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
                console.log("列表", data)
                itemsData = data.rows;
                items.html(compile(itemsData));
                bootpag.bootpag({ page: page, total: data.pageNumber })
            })
        }
    }
}()



// 选择分类
var select = function() {
    var container, items, classify;
    return {
        init: function() {
            container = $('.linea');
            container.on('click', '.classify', function() {
                $(this).parent().find('.active').removeClass('active')
                $(this).addClass('active');
                classify = $(this).data('classify');
                container.find('select').hide().removeClass('show');
                $('select' + '.' + classify).show().addClass('show');
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
        description.val("")
        backnews_id = "";
        $('.classify.first').click();
    }

    var event = function() {

        //重置
        container.on('click', '.submit .reset', function() {
                reset();
            })
            // $('.pub-addTagInput').focus(function() {
            //     onEnter = function() {
            //         // alert("enter")
            //         var text = $('.pub-addTagInput').val()
            //         if (!text) {
            //             return layer.msg('请输入标签')
            //         }
            //         if (text.length > 6) {
            //             return layer.msg('最多输入6个字')
            //         }
            //         var length = $('.pub-exist .pub-exist-name').length;
            //         if (length > 2) {
            //             $('.pub-addTagInput').val('')
            //             return layer.msg('最多添加3个标签')
            //         }
            //         $('.pub-exist').append(`<span class="pub-exist-name">${text}<i class="fa fa-times pub-removeTag" aria-hidden="true"></i></span>`)
            //         $('.pub-addTagInput').val('')
            //     }
            // }).blur(function() {
            //     onEnter = null
            // })

        // //删除标签
        // $('.pub-exist').on('click', '.pub-removeTag', function() {
        //     $(this).parent('.pub-exist-name').remove()
        // })

        //提交
        submit.on('click', _.debounce(function() {
            if (!validate()) {
                layer.msg("表单不能为空..")
                return;
            }
            // 获取分类value
            categoryVal = $('#publish select.show').val()
            console.log('valll', categoryVal)

            // var str = ""
            // $('.pub-exist-name').each(function() {
            //     str += $(this).text() + ','
            // })
            // str = str.replace(/,$/, '')
            // if(!str){
            //     return layer.msg('请输入标签')
            // keywords = key.val();
            // }

            var send = {
                id: id,
                backnews_id: backnews_id,
                backnews_type: categoryVal,
                title: title.val(),
                content: ue.getContent(),
                title_img: thumb.attr('src'),
                keywords: keywords.val().trim(),
                description: _.trim(description.val()),
            }

            $.post("/backNews/createNewsHtml.do", send, _.debounce(function(data) {
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
            description = $("#value-description")

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
                id = data.id
                backnews_id = data.backnews_id;
                title.val(data.title);
                // 分类
                if (data.type >= 1 && data.type <= 4) { //分类 value1234为pc端资讯 678为移动端资讯 9 10 11为移动端精选
                    $('#publish .first').click()
                    $('#publish .pc').val(data.type);
                } else if (data.type >= 6 && data.type <= 8) {
                    $('#publish .second').click()
                    $('#publish .mobile').val(data.type);
                } else if (data.type >= 9 && data.type <= 11) {
                    $('#publish .third').click()
                    $('#publish .classic').val(data.type);
                }
                thumb.attr('src', data.title_img);
                keywords.val(data.keywords);
                description.val(data.description);
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
    select.init();

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
        backnews_type: ops.type,
        currentPage: ops.page,
        pageSize: ops.row,
        title: ops.title
    }

    $.getJSON("/backNews/queryBackNews.do", send, function(data) {
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