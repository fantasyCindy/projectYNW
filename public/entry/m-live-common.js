var menu = function() {
    var container, li;
    var paths = [
        { key: 'live', name: '直播' },
        { key: 'ask', name: '问答' },
        { key: 'opinion', name: '观点' }
    ]
    var light = function(path) {
        var name = '';
        container.next()
        paths.forEach(item => {
            if (path.indexOf(item.key) != -1) {
                name = item.name;
            }
        })
        li.each(function(i) {
            if ($(this).text().match(name) == name) {
                $(this).addClass("cur");
            }
        })
    }
    return {
        init: function() {
            container = $('#live-tag');
            li = container.find('span');
            container.find('a').each(function() {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?teacherid=' + __teacherId)
            })
            var name = container.next().attr('id');
            light(name);
        }
    }
}()
var intro = (function() {
    var container;
    return {
        init: function() {
            container = $('#live-info');
            $.getJSON('/app/appTeacherDetail.htm', { teacherid: __teacherId }, function(data) {
                if (data.status == 1) {
                    data = data.data;
                    container.find('.photo img').attr('src', data.photo);
                    container.find('.nickname').text(data.nickname);
                    container.find('.instrument span:first-child').prepend(data.popularity_number);
                    container.find('.instrument span:nth-of-type(2)').prepend(data.answerCount);
                    container.find('.instrument span:last-child').prepend(data.influential);
                    container.find('.intro span').append(data.description)
                    data.specialtys.map(function(item) {
                        container.find('.advantage').append(`<span>${item.name}</span>`)
                    })
                };
            })
        }
    }
})()
$(function() {
    menu.init();
    intro.init();
})
