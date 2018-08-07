 /*
                   ------------------ 图片裁剪 ------------------------
                   var cropperModel = require('cropper-v1.2.js');   导入模块
                   var crop = cropperModel.getInstance();
                       crop.render({width, height});  默认是(160,90)
                       crop.onCrop = imageData => {...}   回调函数
              */


 require('./cropper-model.css');

 module.exports = (function() {
     var instance
     var createInstance = function() {
         var overlay, container, uploadWrap, cover, fileInput, $image, canvas;
         var props = {
             width: 160,
             height: 90,
         }

         /*——*/
         $("body").append(create(props));
         overlay = $("#myCropper-overlay");
         overlay.height($(window).height())
         container = $("#myCropper");
         canvas = document.getElementById('myCropper-canvas');
         var brush = canvas.getContext('2d');
         var reader = new FileReader();

         //选择文件
         var button = container.find('.myCropper-btn-choose');
         var btnUpload = container.find('.myCropper-btn-upload');

         $image = container.find('.myCropper-origin-image');
         fileInput = $('#myCropper-input-choose')
         cover = $(".myCropper-result-image");
         uploadWrap = container.find('.myCropper-content');

         button.click(function() {
             fileInput.click();
             uploadWrap.show();
             reset();
         });

         overlay.on('click', '.close', () => overlay.hide() && reset());

         fileInput.change(function(e) {
             var file = this.files[0];
             reader.readAsDataURL(file);
         })

         //重置
         var reset = function() {
             $(canvas).data('state', 'no');
             fileInput.val("");
             $image.attr('src', '').cropper('destroy');
             brush.clearRect(0, 0, props.width, props.height);
             cover.attr('src', '');
         }

         //上传文件
         btnUpload.click(() => {
             if ($(canvas).data('state') == "no") return layer.msg("请先选择图片"); //验证
             var imageData = canvas.toDataURL();
             // debugger;
             instance.hide();
             reset();
             instance.onCrop(imageData);
         })


         reader.onload = function(e) {
             var src = e.target.result;

             // 设置比例
             var ratio = props.ratio == "free" ? NaN : props.width / props.height

             $image.attr('src', src).cropper({
                 aspectRatio: ratio,
                 // aspectRatio: props.width / props.height,
                 viewMode: 1,
                 // 裁切时
                 crop: function(e) {
                     brush.clearRect(0, 0, props.width, props.height);
                     brush.drawImage(
                         $(this)[0],
                         e.x, e.y, e.width, e.height,  //图形 
                         0, 0, props.width, props.height
                         // 0, 0, props.width, props.width * e.height / e.width //画布
                     );
                     // debugger
                     $(canvas).data('state', "yes");
                 }
                 
             })
         }

         return {
             render: ops => {
                  _.extend(props, ops);
                 // props.ratio = ops.ratio
                 canvas.width = ops.width;
                 canvas.height = ops.height;
                 overlay.show();
             },
             hide: () => overlay.hide(),
             onCrop: () => console.log("onCrop回调方法没有实现")
         }
     }
     return {
         getInstance() {
             if (!instance) {
                 instance = createInstance()
             }
             return instance
         }
     }
 })()


 var create = function(data) {
     return `<div id="myCropper-overlay" class="hide">
<div id="myCropper" class="line crop relative">
    <span class="fa fa-times-circle absolute close"></span>
    <div class="title">
        <span class="myCropper-title">图片上传</span>
    </div>
    <div class="myCropper-content">
        <div class="myCropper-content-left fl">  
            <div class="myCropper-content-title">
                <button class="myCropper-btn-choose btn">+选择图片</button>
                <input type="file" class="hide" id="myCropper-input-choose" />
            </div>
            <div class="myCropper-origin">
                <img class="myCropper-origin-image" style="max-width: 100%" />
            </div>
        </div>
        <div class="myCropper-content-right fl">
            <div class="title">图片预览</div>
            <div class="thumb">
                <canvas id="myCropper-canvas" width="${data.width}" height="${data.height}" data-state="no"></canvas>
            </div>
            <button class="myCropper-btn-upload btn">上传图片</button>
        </div>
    </div></div></div>`
 }
