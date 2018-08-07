//某个老师的内参
module.exports.teacher = function(teacherid, ops) {
    ops = _.extend({
        productStatus: "",
        teacherId: teacherid,
        user_id: ynUserId,
        pageSize: 10,
        currentPage: 1
    }, ops)

    var defer = $.Deferred();
    $.getJSON('/center/reference/teacherReferenceList.htm', ops, data => {
        data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.pageSize)]);
        defer.resolve(data);
    })
    return defer.promise();
}

module.exports.teacherHot = function(teacherid, ops) {
    ops = _.extend({
        teacherId: teacherid,
        user_id: ynUserId,
        pageSize: 10,
        currentPage: 1
    }, ops)
    var defer = $.Deferred();
    $.getJSON('/center/reference/hotList.htm', ops, data => {
        defer.resolve(data);
    })
    return defer.promise();
}
