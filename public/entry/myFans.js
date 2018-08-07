require('~/center/center.js')

var massmoudule = require('~/fans/fansMass.js');

var fansbar =(function() {
    var container,fans,record,fans_menu,self,record_menu,items,data,page=1,row=10,bootpag,recordclass,mass,select;
    var event=function() {
        //删除粉丝
        // this.container.on("click", '.delete', function() {
        //     var id = $(this).data('id');
        //     var item = $(this).parents('.fans-lsit');
        //     yndata.removefans(id).done(function() {
        //         item.remove();
        //     });
        // })
        container.on("click", '.record', function() {
            record_menu.show();
            recordclass.text("粉丝用户");
            select.find('span').text("历史群发纪录");
            fans_menu.hide();
            massmoudule.hide();
            getrecord().done(function(data) {
                if (+data == 0) return layer.alert("参数为空");
                if (+data == 11) return layer.alert("参数错误");
                record.empty().html(template('recordBar', data));
            })

        })
        container.on("click", '.fansuser', function() {
            record_menu.hide();
            massmoudule.hide();
            recordclass.text("发送纪录");
            select.find('span').text("粉丝用户");
            fans_menu.show();
            self.render();
        })
        container.on("click", '.title', function() {
            $(this).parent().find('.content').slideToggle();
        })
        mass.click(function() {
            massmoudule.render();
        })
        $('.subhref').click(function() {
            massmoudule.hide();
            yn.bodyScroll(true);
            record_menu.show();
            recordclass.text("粉丝用户");
            select.find('span').text("历史群发纪录");
            fans_menu.hide();
        })
    }
    var getNewsPush=function(ops){
        ops = _.extend({
            page: 1,
            row: 10,
        }, ops)
        var send = {
            currentPage: ops.page,
            pageSize: ops.row,
        }
        var defer = $.Deferred();
        $.getJSON("/getAttentionUserList.htm", send, function(data) {
            data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
            defer.resolve(data);
        })
        return defer.promise();
    }
    var getrecord=function(){
        var defer = $.Deferred();
        $.getJSON("/getTeacher_message.htm", function(data) {
            defer.resolve(data);
        })
        return defer.promise();
    }
    return{
        init: function() {
            self = this;
            container=$('#content');
            fans = $('#fans');
            record = $('#record');
            fans_menu = container.find('.fans-menu');
            record_menu = container.find('.record-menu');
            recordclass = container.find('.record');
            mass = container.find('.mass');
            select = container.find('.select');
            bootpag = yn.bootpag(fans_menu);
            bootpag.on('page', function(e, num) {
                page = num;
                self.render();
            })
            event();
        },
        render: function() {
            getNewsPush({
                page: page,
                row: row,
            }).done(function(data) {
                if (+data == 0) return layer.alert("参数为空");
                if (+data == 11) return layer.alert("参数错误");
                if (data.length < 1) {
                    fans.html('<p style="margin:50px;text-align:center;">暂无数据</p>')
                    return;
                }
                fans.empty().html(template('fansBar', data));
                bootpag.bootpag({ page: page, total: data.pageNumber })
            });
        }
    }
})()

$(function() {
    //菜单
    yn.centerMenu.init({
        render: 'my',
        light: '我的粉丝'
    });
    /////////////////////////////////////////////////////////////////////
    massmoudule.init();
    fansbar.init();
    fansbar.render();
})
