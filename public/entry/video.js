var bootpag;
var params = {
    type: "", //类型
    album: "", //专辑
    time: "1", //创建时间
    look: "", //最多观看/最新发布
    page: 1, //页码
    row: 12, //数量
}


/**
 * 分类
 */
var category = (function() {

    var container, videoType

    return {

        init: function() {
            container = $(".category")
            videoType = $('#videoType')

            //切换
            container.on('click', '.sort-item', function() {
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');

                //解析数据
                var filter = $(this).data('filter');
                filter.replace(/[^@]+/g, function(value) {
                    var arr = value.split('=');
                    params[arr[0]] = arr[1]
                })
                params.page = 1;
                video.render(params)
            })

        },

        render: function() {
            ajax.getVideoCategory().done(data => {
                var tags = _.map(data, item => {
                    return '<span class="sort-item" data-filter="type=' + item.type_id + '"> ' + item.name + '</span>';
                }).join('')
                videoType.append(tags);
            })
        }
    }
})()


/**
 * 视频列表
 */
var video = function() {
    var container, category


    var handle = data => {
        var jump = [`${video_path}video/`, `${video_path}/album/detail.htm?albumId=`]
        return _.map(data, function(item) {
            if (!item.teacherName) {
                item.teacherName = "约投顾"
            }
            //根据album_id值, 跳转到不同地址
            item.jump = item.album_id == "-1" ? jump[0] + item.video_id + ".htm" : jump[1] + item.album_id;
            item.create_time = item.create_time.match(/^[0-9\-]+/)[0];
            return item;
        })
    }

    var createItems = arr => {
        return _.map(arr, item => {
            return `<div class="item">
                <span class="time">${item.create_time}</span>
                <a href="${item.jump}" title="${item.title}" target="_blank" class="thum imgw">
                    <img src="${item.image}">
                </a>
                <a href="${item.jump}" target="_blank" class="title block" title="${item.title}">${item.title}</a>
                <div class="author">
                    <span>讲师：${item.teacherName}</span>
                </div>
                <div class="info">
                    <span class="count">${item.look_count}人正在学习..</span>
                </div>
            </div>`
        }).join('')
    }


    return {
        init() {
            container = $(".list")
            ajax.getVideoCount().done(data => {
                $('.total-count').text(data);
            });
        },

        //视频列表
        render() {
            ajax.getVideos(params).done(data => {
                log("视频", data);
                container.html(createItems(handle(data.rows)));
                bootpag.bootpag({ page: params.page, total: +data.pageNumber })
                $('body').velocity('scroll', { duration: 300, offset:150 })
            })
        }

    }
}()


//////////////////////////////////////////////////////////////////


$(function() {

    category.init();
    category.render();

    video.init();
    video.render();

    bootpag = yn.bootpag($("#video"));
    bootpag.on('page', (e, num) => {
        params.page = num;
        video.render();

    })

})



/*--------*/

var ajax = {}

/*视频课程数量*/
ajax.getVideoCount = function() {
    var defer = $.Deferred();
    $.get("/video/collageListCount.htm", function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}


/*课程分类*/
ajax.getVideoCategory = function() {
    var url = "/videoType/select.htm";
    var defer = $.Deferred();
    $.getJSON(url, function(data) {
        defer.resolve(data);
    })
    return defer.promise();
}

/*视频课程*/
ajax.getVideos = function(ops) {
    var defer = $.Deferred();
    ops = _.extend({
        type: "", //类型
        album: "", //专辑
        time: "1", //最新发布
        look: "", //最多观看
        page: 1, //页码
        row: 12 //数量
    }, ops)

    var send = {
        videoType: ops.type,
        byAlbum: ops.album,
        byCreateTime: ops.time,
        byLookCount: ops.look,
        pageSize: ops.row,
        currentPage: ops.page
    }

    $.getJSON("/video/collageList.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })
    return defer.promise();
}
