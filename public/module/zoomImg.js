/**
 *  放大图片
    var zoom = require('zoomImg.js')
    zoom.get().render('/public/image/*.jpg')

 */

require('./zoomImg.css')

module.exports = function() {
    var instance

    var create = function() {
        var body = $('body');
        var tag = `<div id="ynPopImageOverlay">
                    <div id="ynPopImage"><img /></div>
               </div>`;

        body.append(tag);
        var container = $('#ynPopImage');
        var overlay = $('#ynPopImageOverlay');
        var img = container.find('img')

        // close
        overlay.click(function() {
            overlay.hide();
        })

        container.click(function() {
            return false
        })

        return {
            render(src) {
                img.attr('src', src)
                overlay.show()
            }
        }

    }

    // single
    return {
        get() {
            if (!instance) {
                instance = create()
            }
            return instance
        }
    }
}
