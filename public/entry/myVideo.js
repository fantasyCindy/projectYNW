 /*///////////////////////////////////////////////////////////////////*/

 var cropper = require('~/ui/cropper-v1.2.js').getInstance();
 require('~/center/center.js')

 /*///////////////////////////////////////////////////////////////////*/

 $(function() {
    //菜单
    yn.centerMenu.init({ render: 'my', light: '我的视频' });
    //图片上传
    cropper.onCrop = img => {
        $.post("/teacher/html/uploadImg.htm", {
            dataImg: img,
            user_id: ynUserId
        }, data => {
            if (data.status != "success") return layer.msg(`错误:${data}`);
            var src = data.returnPath;
            $("#videoCover").attr('src', src);
        }, 'json');
    }
    videoList.init();
    videoList.render();
    issue.init();
})

var videoList=(function(){
    var menu,table,bootpag,stack,param={
        page: 1,
        row: 10,
        isDraft:0
    };
    var getMyVideo=function (ops) {
        ops = _.extend({
            teacherid: ynTeacherId,
            page: 1,
            row: 10,
            isDraft: 0 //0已发布 1草稿
        }, ops)

        var send = {
            teacherid: ops.teacherid,
            currentPage: ops.page,
            pageSize: ops.row,
            isDraft: ops.isDraft
        }

        var defer = $.Deferred();
        $.getJSON("/video/videoList.htm", send, function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
            defer.resolve(data);
        })
        return defer.promise();
    }
    var deleteVideo=function (id) {
        var defer = $.Deferred();
        $.post("/video/deleteVideo.htm", { videoId: id }, function(data) {
            if (data == "success") {
                layer.msg("删除成功");
                defer.resolve();
            } else {
                layer.msg(data);
            }
        })
        return defer.promise();
    }
    return {
        init:function(){
            var _this=this;
            menu=$('#videolist .video_tag');
            table=$('#myVideo-list');
            bootpag = yn.bootpag('#videolist');
            bootpag.on('page', (e, num) => {
                param.page = num;
                _this.render();
            })
            //已发布or草稿tag
            menu.on('click','.menu-item',function(){
                $(this).parent().find('.action').removeClass('select');
                $(this).addClass('select');
                param.page=1;
                param.isDraft=$(this).index();
                _this.render();
            })
            //编辑已发布or草稿视频
            table.on('click', '.action-edit', function() {
                 var tr = $(this).parents('tr');
                 var index = tr.index() - 1;
                 $('#videolist').hide();
                 issue.render(stack[index]);
            })
            //已发布or草稿视频删除
            table.on('click', '.action-delete', function() {
                var id = $(this).data('id');
                layer.confirm("确定要删除吗",function(index) {
                    deleteVideo(id).done(function() {
                        _this.render();
                    })
                    layer.close(index);
                })
            })
            $('#ReleaseVideo').on('click', function() {
                $('#videolist').hide();
                issue.render();
            })
        },
        render:function(){
            getMyVideo(param).done(function(data){
                if (data.rows.length < 1) {
                    table.html("<p style='text-align:center;font-size:16px;margin:50px'>暂无内容</p>")
                    return;
                }
                stack = data.rows;
                var tag=['myVideo-template','myVideo-draft-template'][param.isDraft]
                table.html(template(tag, data.rows))
                bootpag.bootpag({page:param.page, total: data.pageNumber })
            })
        }
    }
 })()

var issue=(function(){
    var container,type,album,title,video,rank,image,video_id,ue;
    var fill=function(data){
        if (!data) return;
        title.val(data.title);
        video_id.val(data.video_id);
        video.val(data.video_src);
        type.val(data.video_type);
        album.val(data.album_id);
        rank.val(data.album_course_sort)
        image.attr('src', data.image)
        ue.setContent(data.content);
    }
    var getSelect=function(){
        //视频类型
        $.getJSON("/video/videoTypeList.htm", function(data) {
            var tags = ""
            _.forEach(data, function(item) {
                tags += '<option value=' + item.type_id + '>' + item.name + '</option>'
            })
            type.append(tags);
        })

        //所属专辑
        $.getJSON("/video/frontAlbumList.htm", function(data) {
            var tags = ""
            _.forEach(data, function(item) {
                tags += '<option value=' + item.album_id + '>' + item.title + '</option>'
            })
            album.append(tags);
        })
    }
    var event=function(){
        //上传图片
        $(".uploadBtn").on('click', function() {
            cropper.render({ width: 200, height: 200 })
        })

        //保存
        $('#save_draft').click(function() {
            var send = _getFormData();
            if (send) {
                send.is_draft = 1;
                $.post("/teacher/html/addEditVideo.htm", send, function(data) {
                    if (data == "success") {
                        window.location.href = "/backstage/myVideo.htm";
                    } else {
                        layer.msg("视频发布失败, 请重试...")
                    }
                })
            }
        })

        //发布
        $('#save_publish').click(function() {
            var send = _getFormData();
            if (send) {
                send.is_draft = 0;
                $.post("/teacher/html/addEditVideo.htm", send, function(data) {
                    if (data == "success") {
                        window.location.href = "/backstage/myVideo.htm";
                    } else {
                        layer.msg("视频发布失败, 请重试...")
                    }
                })
            }
        })

        //关闭
        $('#close').click(function() {
            $('#videolist').show();
            container.hide();
        })
    }
    function _getFormData() {
        var title = $('#titleInput').val();
        var video_src = $("#video_srcInput").val();
        var src = image.attr('src');
        if (title === '') {
            layer.msg("标题不能为空");
            return false;
        }
        if (video_src === '') {
            layer.msg("视频地址不能为空");
             return false;
        }
        if (src === '') {
            layer.msg("请上传视频封面");
            return false;
        }
        var videoId = $("#video_id").val();
        var video_type = $('#video_typeSelect').val();
        var content = $.trim(ue.getContent());
        var album_id = $('#album_idSelect').val();
        return {
            video_id: videoId,
            create_id: ynUserId,
            title: title,
            video_src: video_src,
            video_type: video_type,
            album_id: album.val(),
            album_course_sort:rank.val(),
            image: src,
            content: content
        }
    }
    return{
        init:function(){
            container= $('#postVideo');
            type= $("#video_typeSelect");
            album= $('#album_idSelect');
            title= $('#titleInput');
            video= $("#video_srcInput");
            rank= $("#album_course_sortInput");
            image= $('#videoCover');
            video_id= $('#video_id');
            ue = UE.getEditor('ueditContainer', {
                toolbars: [
                    ['fontsize', 'bold', 'forecolor', 'emotion', 'simpleupload']
                ],
                initialFrameHeight: 200,
                elementPathEnabled: false,
                wordCount: false,
                enableContextMenu: false,
                enableAutoSave: false,
                pasteplain: true
            });
            getSelect();
            event();
        },
        render:function(ops){
            this.reset();
            container.show();
            fill(ops);
        },
        reset:function(){
            $('#videoForm')[0].reset();
            image.removeAttr('src');
            video_id.val('');
            ue.setContent("");
        }
    }
})()