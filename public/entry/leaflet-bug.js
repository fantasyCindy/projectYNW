var cropper = require('~/ui/cropper-v1.2.js').getInstance();
var error = require('e/error-type');
$(function() {
    post.init();
})

var dataInit = (function() {
    var item, content
    return {
        init: function() {
            item = $('input').val('')
            content = $('.form-textarea').val('')
            $('.yet').remove()
            $('.add').show();
            $('select').val('1');
        }
    }
})()

var post = (function() {
    var form, imgBox, imgJoint;
    return {
        init: function() {
            form = $('#leaflet_form');
            imgBox = form.find('.form-imgBox');
            imgJoint = $('#imgJoint');
            form.find('input[name="phone"]').keyup(function() {
                var reg = /^0?1[34578][0-9]{9}$/;
                if (!reg.test($(this).val())) {
                    $(this).css('borderColor', 'red');
                } else {
                    $(this).css('borderColor', 'green');
                }
            })
            var createTag = item => {
                return `<option value="${item.id}">${item.name}</option>`
            }
            $.getJSON('/feedback_type/list.htm', function(data) {
                    if (data.status == 1) {
                        var htm = _.map(data.data, item => createTag(item)).join('')
                        $('#askType').html(htm);
                    }
                })
                //添加图片
            imgBox.on('click', '.add', function() {
                var self = $(this);
                var restrict = imgBox.find('.yet').length;
                cropper.render({ width: 150, height: 150 });
                cropper.onCrop = imageData => {
                    var send = {
                        dataImg: imageData,
                        updateEntity: true,
                        user_id: ynUserId
                    }
                    $.post("/feedback/ImgUpload.htm", send, function(data) {
                        if (data.status == "1") {
                            var src = data.data.returnPath;
                            self.before(`<div class="yet"><img src="${src}"/></div>`);
                            restrict > 8 ? imgBox.find('.add').hide() : '';
                        }
                    }, 'json');
                }
            })
            form.on('click', '.confirm', function() {
                imgBox.find('.yet img').each(function() {
                    imgJoint[0].value += $(this)[0].src + ',';
                })
                console.log('imgJoint', imgJoint[0].value)

                var reg = /^0?1[34578][0-9]{9}$/;
                if (!reg.test($('input[name="phone"]').val())) {
                    return layer.msg('请输入正确的手机号码')
                }
                var send = form.serialize() + '&status=1';
                $.post('/feedback/save.htm', send, function(data) {
                    data = JSON.parse(data)
                    if (data.status == '1') {
                        layer.msg('提交成功')
                        dataInit.init();
                    }else{
                        return layer.msg(error[data.status])
                    }
                })
            })
        }
    }
})()
