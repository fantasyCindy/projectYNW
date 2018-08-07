/* 
    上传图片模块
*/

var ImageReader = (function () {
    var instance
    var getReader = function () {
        if (!instance) {
            instance = new FileReader
        }
        return instance
    }
    return {
        read: function (file, callback) {
            var reader = getReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
                var src = e.target.result
                var image = new Image()
                image.src = src
                image.onload = function () {
                    if (typeof callback == "function") {
                        callback({
                            src: src,
                            width: image.width,
                            height: image.height,
                            el: image
                        })
                    }
                }
            }
        }
    }

})();

