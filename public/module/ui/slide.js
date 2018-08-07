/*--

轮播图

ops = {
	container* : 幻灯片容器(固定宽高)
}


--*/

module.exports = (function() {

    var addIndicate = (container, count) => {
        var tags = ""
        _.times(count, i => tags += `<span class="slide-indicate-item" id="slide-indicate-${i}"></span>`)
        container.append(`<div class="slide-indicate">${tags}</div>`)
    }

    return {
        init: function(ops) {
            ops = _.extend({
                interval: 5000
            }, ops)
            var container = ops.container
            var children = container.find("slide-child")
            addIndicate(container, children.length);
            children.each(function() {
                var img = $(this).find('img')
                var src = img.data('src')
                src && img.attr('src', src)
            })
            setInterval(function() {
                var first = container.find('.slide-child').eq(0);
                first.velocity({ 'opacity': 0 }, {
                    duration: 300,
                    complete: function() {
                        container.append(first.html())
                        first.remove()
                    }
                })
            }, ops.interval)
        }
    }
})()
