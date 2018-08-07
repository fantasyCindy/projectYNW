var postComment = require('~/ui/post-comment.js');
var Face = require('m/qqface/main.js');
var error = require('e/error-type');
///////////////////isFeed////////////////////////////


var SHOW_REFER_CONTENT = __data.status == "2" //是否显示内参内容  内参状态 0服务中 1热卖 2已完成

///////////////////isFeed////////////////////////////



$('.refer_isFeed').show()
$('.subscription').show()
    //内参列表
var referContent = (function() {
    var container, items, bootpag, loading, totalCount, param = {
        pageSize: 5,
        currentPage: 1
    };

    var handleData = arr => {
        return _.map(arr, item => {
            var match = item.pubtime.match(/^\d+-(\d+-\d+\s+\d+:\d+)/);
            item._time = match ? match[1] : "---";
            item._content = item.link ? `<a class="pdf-content" href="${item.link}" target="_blank">${item.contentFilter}.pdf</a>` : item.content;
            return item;
        })
    }

    var create = item => {
        return `<div class="refer_list clear">
                <span class="teacherPhoto fl"><img src="${item.teacherPhoto}" alt="" /></span>
                <span class="name fl">${item.puiblisher}<i class="teacher-icon"></i></span>

                <span class="time fl">${item._time}</span>
                <div class="refer_item fl">${item._content}</div>
            </div>`
    }

    return {
        init: function() {
            container = $(".refer_detail");
            items = container.find('.refer_content');
            totalCount = $(".total-refer-count");
            bootpag = yn.bootpag(container).hide();
            bootpag.on('page', (err, num) => this.render({
                currentPage: num
            }));

            //点击图片放大
            items.on('click', 'img', function() {
                if ($(this).hasClass('teacherPhoto')) return;
                var src = $(this).attr('src')
                $('.img-wrap').fadeIn(100).find('#img-wrap-img').attr('src', src)
            })
            $('.img-wrap').click(function() {
                $(this).fadeOut(100)
            })
            $('.refer_intro').on('click', 'img', function() {
                var src = $(this).attr('src')
                $('.img-wrap').fadeIn(100).find('#img-wrap-img').attr('src', src)
            })
        },
        render: function(ops) {
            $(window).scrollTop(0)
            _.extend(param, ops);
            var isSelf = ynTeacherId == __data.createId;
            $.getJSON('/reference_periodical/list.htm', {
                referenceid: __data.id,
                pageSize: param.pageSize,
                currentPage: param.currentPage
            }, function(data) {
                if (data.status == 1) {
                    totalCount.text(data.data.total); //条数
                    if(SHOW_REFER_CONTENT) return;
                    
                    if (__data.isOrder || isSelf) {
                        if (data.data.list.length < 1) {
                            items.html(ynconfig.none({
                                margin: 100
                            }));
                            return;
                        }
                        var rows = handleData(data.data.list);
                        var pageNumber = _.max([1, Math.ceil(+data.data.total / param.pageSize)]);
                        items.html(_.map(rows, item => create(item)).join(""));
                        bootpag.show().bootpag({
                            page: param.currentPage,
                            total: pageNumber
                        })
                    } else {
                        items.html(`<div class="none"><span>订阅后可查看内参！</span></div>`);
                        bootpag.hide();
                    }
                } else() => {
                    return layer.msg(error[data.status])
                }

            })
        },
        referEnd:function(){
            items.html(`<div style="margin:50px auto;text-align:center;">内参已结束，不能查看内容</div>`);
        }
    }
})()


//评论列表
var comments = (function() {
    var container, items, totalCount, bootpag, param = {
        pageSize: 5,
        currentPage: 1
    };

    var result = []

    function handleData(data, replyFlag) {
        _.forEach(data, function(item) {
            item.photo = item.photo || "/public/images/user.jpg";
            item._reply = "";
            item._style = "";
            item._isSelf = __data.isSelf ? 'true' : 'false';
            // item.content = yn.parseFaceCode(item.content)
            //解析表情符
            item._content = item.content.replace(/\[.+?\]/g, match => {
                var isOld = /face=/.test(match)
                if (isOld) {
                    return yn.parseFaceCode(match)
                } else {
                    var name = Face.getInstance().titleToName(match)
                    if (!name) return match;
                    var src = `${__path}/public/module/qqface/png/${name}@2x.png`
                    return `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" >`
                }
            })

            item._teacherIcon = item.create_id == __data.pubId ? 'show' : 'hide' //用户端只有老师评论后面才有回复功能
            if (!__data.isSelf && __data.status != "2") {
                item._replyTeacher = item.create_id == __data.pubId ? 'show' : 'hide'
            }
            item._create_time = item.create_time.substr(0, 16)
            if (!item.nickName) {
                item._nickName = '默认昵称'
            } else {
                item._nickName = item.nickName
            }


            result.push(item);
            if (replyFlag) {
                // item._reply = "<span style='font-size:12px;color:#f57a17;position:relative;top:-1px'>回复" +
                //     "<i style='margin:0 10px;' class='fa fa-angle-right'></i></span>";
                item._reply = ''
                item._style = "isReply";
            }
            if (item.childList && item.childList.length > 0) {
                handleData(item.childList.reverse(), item.nickName);
            }
        })
    }

    return {
        init: function() {
            var self = this;
            container = $(".refer_comment")
            items = container.find('.comment_bar')
            totalCount = container.find('.cmentnum')

            bootpag = yn.bootpag(container).hide()
            bootpag.on('page', (e, num) => this.render({
                currentPage: num
            }))

            // 回复
            container.on('click', '.reply', function() {
                var createid = $(this).data('createid')
                if (+createid == ynUserId) {
                    return layer.msg('自己不能回复自己哦')
                }
                var id = $(this).data('id');
                var name = $(this).data('name')
                self.clickReply({
                    id: id,
                    name: name
                })
            })

            // 删除
            container.on('click', '.delete', function() {
                var id = $(this).data('id');
                layer.confirm('确定要删除吗', function() {
                    $.post("/reference/delcomment.htm", {
                        id: id
                    }, back => {
                        back = JSON.parse(back)
                        if (back.status == '1') {
                            layer.msg('删除成功');
                            setTimeout(function() {
                                window.location.reload()
                            }, 500)
                        } else {
                            return layer.msg(error[back.status])
                        }
                    })
                })
            })
        },
        render: function(props) {
            _.extend(param, props);

            // if (!(__data.isOrder || __data.isSelf) && __data.status != "2") {
            //     return items.html(`<div class="none">订阅后可查看评论!</div>`);
            // }

            $.getJSON('/reference/commentList.htm', {
                type: 0, //0=所有
                reference_id: __data.id,
                productStatus: __data.status,
                pageSize: param.pageSize,
                currentPage: param.currentPage
            }, data => {
                if (data.status == 1) {
                    result = [];
                    if (data.data.list.length < 1) {
                        items.html(ynconfig.none({
                            margin: 100
                        }))
                        return;
                    }

                    handleData(data.data.list);
                    items.html(template('comment_bar_template', result));

                    if (__data.status == '2') {
                        container.find('.reply').remove();
                    }

                    //设置页码
                    totalCount.text(`(${data.data.total})`);
                    var pageNumber = _.max([1, Math.ceil(+data.data.total / param.pageSize)])
                    bootpag.show().bootpag({
                        page: param.currentPage,
                        total: pageNumber
                    })
                } else() => {
                    return layer.msg(error[data.status])
                }

            })
        },
        clickReply: () => layer.msg("override not override...")
    }
})()

//内参更新弹窗
var updateRefer = (function() {
    var container, ue, inputStock;
    return {
        init: function() {
            container = $('#uprefer');
            inputStock = $('#insertStockCodeInput');
            ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    ['simpleupload']
                ],
                initialFrameHeight: 319,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true,
                autotypeset: {
                    removeEmptyline: true, //去掉空行
                    removeEmptyNode: false, // 去掉空节点
                }
            });

            var left = ($(window).width() - 700) / 2;
            container.css('left', left);

            //插入股票
            yn.showStockList(inputStock, {
                listLen: 4,
                top: 0,
                onSelect: item => inputStock.val('') && ue.execCommand('inserthtml', item.stockWrap)
            })

            //关闭
            container.on('click', '> .close', e => {
                container.hide();
                ue.setContent('');
                yn.bodyScroll(true);
            })

            //提交
            container.on('click', '.submit', function() {
                var content = _.trim(UE.getEditor('ueditContainer').getContent());
                if (content == '') return layer.msg('更新内容不能为空!');
                content = content.replace(/(<img)\s+(?:class="big_pic")?(.+?(jpg"|png"))/g, '$1  $2 class="big_pic"');
                container.hide();
                $.post('/reference_periodical/add.htm', {
                    referenceid: __data.id,
                    content: content,
                    puiblisher: __data.name,
                    puiblisherid: __data.pubId
                }, data => {
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        layer.msg('发表成功！');
                        ue.setContent('');
                        yn.bodyScroll(true);
                        referContent.render();
                    } else() => {
                        return layer.msg(error[data.status])
                    }
                })
            })
        },
        render: () => {
            container.velocity('transition.flipXIn', {
                duration: 300
            })
            yn.bodyScroll(false);
        },
    }
})()

//内参简介
var profile = (function() {
    var container, update;
    return {
        init: function() {
            container = $(".refer_detail");
            update = $("#update");
            $("#icon-refer-status").addClass(`status ${__data.icon}`); //内参状态

            //更新内参
            var isRun = __data.status === "0";
            var pass = __data.isSelf && isRun;
            var tag = __data.referenceType == 0 ? `<button class="addPdf">上传文档</button>` : ''
            if (pass) update.html(`<button class="addRefer">更新内参</button>${tag}`);
            update.on('click', '.addRefer', () => {
                if (!pass) return layer.msg("NO Permit");
                updateRefer.render();
            })
            update.on('click', '.addPdf', () => {
                if (!pass) return layer.msg("NO Permit");
                uploadfile.render();
            })
        }
    }
})()



//上传文档
var uploadfile = (function() {
    var container,uploadBtn;
    var formData,file,size,link;
    var n = 2;  //文件小于2M
    return {
        init: function() {
            container = $('.upload');
            uploadBtn = container.find('#uploadFile');
            container.on('click', '.submit', function() {

            })
            container.on('click', '.close', function() {
                uploadfile.hideContainer();
            })

            container.on('change', '.upbtn', function(ev) {
                if(!ev.target.files[0]) return;
                file = ev.target.files[0]
                console.log('file',file)
                size = n * 1024 * 1024;
                if(file.type != 'application/pdf'){
                    file = null;
                    layer.msg('请上传pdf格式的文档');
                    return; 
                } 
                if(file.size > size) {
                    file = null;
                    layer.msg('文档大小不能超过2M');
                    return; 
                }
                formData = new FormData();
                formData.append('pdfFile', file);
                $.ajax({
                    url: '/reference_periodical/referUploadPdf.htm',
                    type: 'POST',
                    data: formData,
                    cache:false,
                    processData:false,
                    contentType:false,
                    success: function(data) {
                        data = JSON.parse(data);
                        if(data.flag == 'success'){
                            selectfile.render(file.name,data.returnPath);
                            uploadfile.hidden();
                            link = data.returnPath
                        }
                    }
                })

            })

            container.on('click','.submit',function(){
                var title = container.find('.up-title').val().trim();
                if(!title) return layer.msg('请输入标题')
                if(title.length > 40) return layer.msg('标题字数应大于1小于40个字')
                if(!file) return layer.msg('请上传附件文档');
                var send = {
                    referenceid:__data.id,
                    puiblisher:__data.name,
                    puiblisherid:__data.pubId,
                    link:link,
                    content: title
                }
                 $.post('/reference_periodical/add.htm', send, data => {
                    data = JSON.parse(data)
                    if (data.status == 1) {
                        layer.msg('发表成功！');
                        uploadfile.hideContainer();
                        referContent.render();
                    } else() => {
                        return layer.msg(error[data.status])
                    }
                })
            })

        },
        render: function() {
            uploadfile.reset();
            uploadfile.showItem();
            selectfile.hidden();
            container.velocity('transition.flipXIn', {
                duration: 300
            })
        },
        hidden:function(){
            uploadBtn.hide();
        },
        showItem:function(){
            uploadBtn.show();
            file = null;
            size = null;
            formData = null;
        },
        reset:function(){
            file = null;
            size = null;
            formData = null;
            container.find('.up-title').val('');
        },
        hideContainer:function(){
            container.hide();
        }
    }
})()

var selectfile = (function(){
    var container;
    return {
        init:function(){
            container = $('#uploadFile-wrap');
            container.on('click','.delete',function(){
                selectfile.hidden();
            })
        },
        render: function(text,href){
            container.find('.fileName').html(`<a href="${href}" target="_blank">${text}</a>`);
            container.show();
        },
        hidden:function(){
            container.hide();
            container.find('.fileName').html('');
            uploadfile.showItem();
        }
    }
})()

$(function() {
    referContent.init(); //内参内容
    referContent.render();
    comments.init(); //内参评论
    comments.render();
    updateRefer.init();
    uploadfile.init();
    selectfile.init();
    profile.init(); //内参介绍

    if (__data.status === "0" && (__data.isOrder || __data.isSelf)) { //添加评论
        var post = new postComment({
            container: $(".postContainer"),
            onSubmit: info => {
                $.post('/reference/addComment.htm', {
                    reference_id: __data.id,
                    parent_id: post.parentId,
                    create_id: ynUserId,
                    content: info.value,
                }, data => {
                    data = JSON.parse(data)
                    if (data.status == 80001) {
                        return layer.msg('您输入的内容违反相关规定，不能予以展示！')
                    } else if (data.status == '1') {
                        layer.msg('发表成功')
                    } else() => {
                            return layer.msg(error[data.status])
                        }
                        // 如果是回复, 则刷新当前页面
                    var param = null
                    if (!info.parentId) {
                        param = {
                            currentPage: 1
                        }
                    }
                    comments.render(param)
                })
            }
        });
        comments.clickReply = info => {
            post.addReply(info.id, info.name)
        }
    }
})
