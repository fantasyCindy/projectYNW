module.exports = (function() {

    var instance;

    var create = function() {

        var tag = `<div id="module-zoom-image">
                        <div class="zoom-box">
                              <img class="zoom-img" />
                        </div>   
                   </div>`


        $('body').append(tag)
        var container = $('#module-zoom-image')
        var box = container.find('.zoom-box')
        var img = container.find('.zoom-img')

        /* event */


        container.on('click', function() {
            container.fadeOut(300)
        })

        box.on('click', function() {
            return false
        })

        /* interface */

        return {

            render(ops) {
                img.attr('src', ops.src)
                container.fadeIn(300)
            }

        }

    }

    /* single Instance */
    return {
        get() {
            if (!instance) {
                instance = create()
            }
            return instance
        }
    }

})()
