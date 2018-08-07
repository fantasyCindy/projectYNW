var special =(function() {
    var container,items;
    return{
        init: function() {
            container=$('#album');
            items = container.find('.items');
            special_list({album_id:album_id}).done(function(data) {
                console.log('专辑列表',data.rows)
                data.rows = _.map(data.rows, function(item) {
                    if (item.title.length > 15) {
                        item.title = item.title.substr(0, 15) + "...";
                    }
                    if (!item.teacherName) {
                        item.teacherName = "约投顾"
                    }
                    return item;
                })
                items.html(template('video-template', data.rows))
            })
        }
    }
})()
$(function() {
    
    /*///////////////////////////////////////////////////////////////////*/

    special.init()
})
var special_list=function(ops){

    ops = _.extend({
        page: 1,
        row: 5
    },ops)
    var send={
        albumId:ops.album_id,
        currentPage:ops.page,
        pageSize:ops.row
    }
    var defer = $.Deferred();
    $.getJSON("/video/albumList.htm", send, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}