var myCrop = require('../module/ui/cropper-model.js');
/*///////////////////////////////////////////////////////////////////*/

//资讯列表
// var list = function() {
//     var container, head, items, ids = '',
//         title = '',
//         classif = '',
//         page = 1,
//         row = 12,
//         itemsData = [],
//         bootpag,
//         group,
//         categoryVal = '';
//     var event = function() {
//         //改变每页条数
//         $('#branches').on('change', function() {
//                 page = 1;
//                 row = $(this).val();
//                 list.render();
//             })
//             //删除
//         container.on('click', '.delete', function() {
//                 var id = $(this).data('id');

//                 layer.confirm("您真的要删除吗?", function(index) {
//                     $.post('/headlines/del.do', { ids: id }, function(data) {
//                         console.log("delete action back : ", data);
//                         list.render();
//                         layer.close(index);
//                     })
//                 })
//             })

//         //编辑
//         container.on('click', '.edit', function() {
//             var index = $(this).data('index');
//             var itemData = itemsData[index];
//             menu.show('publish', { data: itemData });
//         })
//     }

//     function compile(data) {
//         return _.map(data, (item, i) => {
//             return `<div class="item flex">
//                 <span class="id flex1">${item.title}</span>
//                 <span class="name flex1">${item.title}</span>
//                 <span class="small code">${categorys[item.type]}</span>
//                 <span class="small parantid">${item.keywords}</span>
//                 <span class="small levelid">${item.create_time}</span>
//                 <span class="small level">
//                 <button class="delete" data-id="${item.id}">删除</button>
//                 <button class="edit" data-id="${item.id}" data-index="${i}">增加标签</button>
//                 </div>`
//         }).join('')
//     }

//     return {
//         init: function() {
//             container = $('#list');
//             head = container.find('.header');
//             items = container.find('.items');
//             group = container.find('.form-group');
//             bootpag = myBootpag(container);
//             bootpag.on('page', function(err, n) {
//                 page = n;
//                 list.render()
//             })
//             event()
//         },
//         render: function() {
//             container.show();
//             console.log('val2222', categoryVal)
//             getNewsList({ page: page, row: row }).done(function(data) {
//                 itemsData = data.rows;
//                 console.log("itemsData===", itemsData)
//                 items.html(compile(itemsData));
//                 bootpag.bootpag({ page: page, total: data.pageNumber })
//             })
//         }
//     }
// }()


var list = (function() {
    var container, items, name, code, level, addTag, parantid, val_level, bootpag, params = {
        pageSize:10,
        currentPage: 1
    }
    var itemsData = []

    var create = item => {
        return `<div class="item flex">
                <span class="title small">${item.id}</span>
                <span class="small">${item.name}</span>
                <span class="small">${item.code}</span>
                <span class="small">${item.parantName}</span>
                <span class="small">${item.levelid}</span>
                <span class="small">${item.level}</span>
                <span class="small">
                <button class="delete" data-id="${item.id}">删除</button>
                <button class="edit" data-id="${item.id}">增加标签</button>
                </div>`
    }
    return {
        init: function() {
            container = $('#list .items');
            var listpage = $('#list')
            name = $('#add-lay .name input')
            code = $('#add-lay .code input')
            level = $('#add-lay .level input')

            bootpag = myBootpag(listpage);
            bootpag.on('page', function(err, n) {
                params.currentPage = n;
                list.render()
            })

            addTag = $('#add-lay')
            $('.btn-wrap .add').on('click', function() {
                addTag.show();
                level.val('1')
            })
            $('#add-lay .close').on('click', function() {
                addTag.hide();
                $('#add-lay .content .input').val('');
            })
            $('#add-lay .save').on('click', function() {
                var val_name = name.val()
                var val_code = code.val()
                var levelVal = level.val()
                if (!val_name || !val_code) {
                    return layer.msg('输入不能为空')
                }
                var levelid
                if (!parantid) {
                    parantid = ''
                    levelid = val_level
                } else if (!val_level) {
                    val_level = ''
                    levelid = parantid
                } else {
                    levelid = val_level + ',' + parantid
                }
                $.post('/app/addCode.do', { name: val_name, code: val_code, level: levelVal, parantid: parantid, levelid: levelid }, back => {
                    if (back == 'success') {
                        layer.msg('创建成功')
                        addTag.hide();
                        addTag.find('input').val('')
                        list.render()
                    }
                })
            })

            container.on('click', '.edit', function() {
                addTag.show();
                var index = $(this).parents('.item').index()
                var itemData = itemsData[index];
                var itemLevel = itemData.level
                addTag.find('.inputName').val(itemData.name)
                addTag.find('.inputCode').val(itemData.code)
                addTag.find('.inputLevel').val(++itemLevel)
                parantid = itemData.id
                val_level = itemData.levelid
            })
            container.on('click', '.delete', function() {
                var id = $(this).data('id');
                $.post('/app/delcode.do', { ids: id }, back => {
                    if (back == 'success') {
                        layer.msg('已删除')
                        list.render()
                    }
                })
            })


        },
        render: function() {
            $.post('/app/codeList.do', params, back => {
                itemsData = back.rows
                var html = _.map(back.rows, item => create(item)).join('')
                container.html(html)
                back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)])
                bootpag.bootpag({ page: params.currentPage, total: back.pageNumber })
            }, 'json')
        }
    }
})()

///////////////////////////////////////////////////////////////////

$(function() {
    list.init();
    list.render();




})

//添加页码组件
// selector支持css选择器和jquery对象
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

/*///////////////////////////////////////////////////////////////////*/
