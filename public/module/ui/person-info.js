/**
 * 个人简介信息
var personInfo = require('../module/ui/person-info.js');
personInfo.render({
    container: $('.person-info'),
    userId: detail.uesrId,
    onAsk: info => askWindow.render({ select: info })
})

 */

    var layer = require('~/ui/layer.js')
var error = require("e/error-type")
var createTag = function(data) {
    return `
            <div class="avatar clear">
            <a href="${opinion_path}dapan/${data.teacher.teacherid}/" target="_blank" class="avatar-photo"><img src="${data.teacher.photo}" alt=""></a>
            <div class="avatar-msg">
                <div class="name">${data.teacher.nickname}<i class="teacherIcon"><img src="${data.teacher.type_ioc}" alt=""></i></div>
                <div class="num" ${data._style}>证书编号：${data.teacher.certificate_num}</div>
                <div class="action">
                <button class="care ${data._isAttentionText}">${data._isCare}</button>
                <button class="ask">提问</button>
            </div>
            </div>
        </div>
            <div class="content">
                ${data.teacher.description}
            </div>
            `
}

require('./person-info.css');


var handleData = function(data) {
    data._isCare = data.teacher.isAttention ? "取消关注" : "关注";
    data._isAttentionText = String(data.teacher.isAttention);
    data._style = data.teacher.certificate_num ? '' : 'style="display:none;"'
    return data;
}

var care = require('../ajax/care.js');

var person = function() {
    var personData
    return {
        render: function(ops) {
            var self = this;
            _.extend(this, ops);
            $.getJSON("/userinfo/queryUserAllInfo.htm?teacherid=" + ops.teacherid, function(data) {
                if (data.status == 1) {
                    personData = data.data.teacher
                        // console.log("用户信息", data);
                    ops.container.html(createTag(handleData(data.data)));
                    //关注
                    ops.container.on('click', 'button.care.false', function() {
                        if (!ynIsLogin) return yn.login.render();
                        var el = $(this);
                        care.add(personData.teacherid).done(() => el.attr('class', 'care true').text("取消关注"));
                    })

                    //取消关注
                    ops.container.on('click', 'button.care.true', function() {
                        if (!ynIsLogin) return yn.login.render();
                        var el = $(this);
                        care.cancel(personData.teacherid).done(() => el.attr('class', 'care false').text("关注"));
                    })

                    //提问
                    ops.container.find('button.ask').click(() => {
                        if (!ynIsLogin) return yn.login.render();
                        self.onAsk({
                            id: personData.teacherid,
                            name: personData.nickname
                        });
                    })

                    self.finish && self.finish({ success: 'success' });
                } else() => {
                    return layer.msg(error[data.status])
                }

            })
        },
        onAsk: function() {
            alert("you click ask button...")
        },
        getData: function() {
            return personData
        }
    }
}()

module.exports = person;
