/*

    关注列表
    

*/

var error = require("e/error-type")
var list = function(ops) {
    ops = _.extend({
        userid: ynUserId,
        page: 1,
        row: 20
    }, ops)

    var send = {
        // user_id: ops.userid,
        currentPage: ops.page,
        pageSize: ops.row
    }

    var defer = $.Deferred();
    $.getJSON("/center/attentionList.htm", send, function(data) {
        if (data.status == 1) {
            data.pageNumber = _.max([1, +data.total / ops.row])
            defer.resolve(data);
        }else{
            layer.msg(error[back.status])
        }

    })
    return defer.promise();
}

//添加关注
var add = function(teacherid) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", {teacherid: teacherid }, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            layer.msg("关注成功");
            defer.resolve();
        }else{
            layer.msg(error[data.status])
        }

    })
    return defer.promise();
}


//取消关注
var cancel = function(teacherid) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", {teacherid: teacherid }, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            layer.msg("取消成功");
            defer.resolve();
        }else{
            layer.msg(error[data.status])
        }
    })
    return defer.promise();
}

module.exports = {
    add: add,
    cancel: cancel,
    list: list
}
