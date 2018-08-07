 /*
      ------------------ 图片裁剪 ------------------------

     cropper.init() ---初始化
     cropper.onCrop() ---裁切回调
     cropper.showThumbnail() ---显示缩略图

     ------------------- Sample -----------------------

     <link  href="/public/css/cropper.min.css" rel="stylesheet"  />
     <script src="/public/js/cropper.min.js"></script>

      //导入模块
      var cropper = require('../module/ui/cropper.js');
      $(function(){

         //初始化时需要传入容器对象
          cropper.init($el); 

          cropper.onCrop = function(imageData) {
              $.post("/auth/user/ImgUpload.htm", {dataImg: imageData}, function(data) {
                  if (data.status == "success") {
                      cropper.showThumbnail(data.src);
                  }
              }, 'json')
          } 
      }) 

  */


 require('./cropper.css');

 var cropper = function() {
     var uploadResult, uploadWrap, cover, fileInput, $image
     return {
         init: function(cropperContainer) {
             var self = this;

             var tag = `<div id="myCropper" class="line crop">
                            <div class="title">
                                <span class="myCropper-title">组合封面</span>
                                <button class="myCropper-btn-choose">+选择图片</button>
                                <input type="file" class="hide" id="myCropper-input-choose" />
                            </div>
                            <div class="myCropper-result hide">
                                <img class="myCropper-result-image" />
                            </div>
                            <div class="myCropper-content">
                                <div class="myCropper-origin">
                                    <img class="myCropper-origin-image" style="max-width: 100%" />
                                </div>
                                <div class="myCropper-canvas-container inline">
                                    <div class="title">图片预览</div>
                                    <div class="thumb">
                                        <canvas id="myCropper-canvas" width="160" height="90" data-state="no"></canvas>
                                    </div>
                                    <button class="myCropper-btn-upload">上传图片</button>
                                </div>
                            </div>
                        </div>`

             cropperContainer.html(tag);

             var container = $("#myCropper");
             var canvas = document.getElementById('myCropper-canvas');
             var brush = canvas.getContext('2d');
             var reader = new FileReader();

             //选择文件
             var button = container.find('.myCropper-btn-choose');
             var btnUpload = container.find('.myCropper-btn-upload');

             $image = container.find('.myCropper-origin-image');
             fileInput = $('#myCropper-input-choose')
             uploadResult = container.find('.myCropper-result');
             cover = $(".myCropper-result-image");
             uploadWrap = container.find('.myCropper-content');

             button.click(function() {
                 fileInput.click();
                 uploadResult.hide();
                 uploadWrap.show();
                 reset();
             })

             fileInput.change(function(e) {
                 var file = this.files[0];
                 reader.readAsDataURL(file);
             })

             //重置
             var reset = function() {
                 $(canvas).data('state', 'no');
                 fileInput.val("");
                 $image.attr('src', '').cropper('destroy');
                 brush.clearRect(0, 0, 160, 90);
                 cover.attr('src', '');
             }

             //上传文件
             btnUpload.click(function() {
                 //验证
                 if ($(canvas).data('state') == "no") {
                     layer.msg("请先选择图片")
                     return;
                 }
                 var imageData = canvas.toDataURL();
                 self.onCrop(imageData);
             })

             reader.onload = function(e) {
                 var src = e.target.result;
                 $image.attr('src', src).cropper({
                     aspectRatio: 16 / 9,
                     viewMode: 1,
                     crop: function(e) {
                         brush.drawImage(
                             $(this)[0],
                             e.x, e.y, e.width, e.height,
                             0, 0, 160, 90
                         );

                         $(canvas).data('state', "yes");
                     }
                 })
             }
         },
         showThumbnail: function(src) {
             uploadWrap.hide();
             uploadResult.show();
             cover.attr('src', src);
             $image.cropper('destroy');
         },
         onCrop: function() {
             throw "cropper error : onCrop not override..."
         }
     }
 }()


 module.exports = cropper
