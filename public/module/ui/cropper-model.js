 /*
    ------------------ 图片裁剪 ------------------------
    引入cropper
    <script src="/public/js/cropper.min.js"></script>

    使用方法:
    var cropper = require('../module/ui/cropper-model.js'); 导入模块
    $(function(){
        cropper.init(); 初始化
        cropper.render({width, height}); 默认是(160,90)
        cropper.onCrop = imageData => {...}  回调函数
    }) 

  */


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
                <button class="myCropper-btn-choose">+选择图片</button>
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
            <button class="myCropper-btn-upload">上传图片</button>
        </div>
    </div></div></div>`
 }

 /*///////////////////////////////////////////////////////////////////*/

 require('./cropper.min.css')
 require('./cropper-model.css');

 module.exports = (function() {
     var overlay, container, uploadWrap, cover, fileInput, $image, canvas;
     var props = {
         width: 160,
         height: 90
     }

     return {
         init: function() {
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
                 this.hide();
                 reset();
                 this.onCrop(imageData);
             })

             reader.onload = function(e) {
                 var src = e.target.result;
                 $image.attr('src', src).cropper({
                     aspectRatio: props.width / props.height,
                     viewMode: 1,
                     crop: function(e) {
                         brush.drawImage(
                             $(this)[0],
                             e.x, e.y, e.width, e.height,
                             0, 0, props.width, props.height
                         );
                         $(canvas).data('state', "yes");
                     }
                 })
             }
         },
         render: ops => {
             _.extend(props, ops);
             canvas.width = props.width;
             canvas.height = props.height;
             overlay.show();
         },
         hide: () => overlay.hide(),
         onCrop: () => console.log("onCrop回调方法没有实现")
     }
 })()
