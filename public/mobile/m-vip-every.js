 FastClick.attach(document.body);





 $(function() {
     var pswpElement = document.querySelectorAll('.pswp')[0]
     window.openPhotoSwipe = function(items) {
         var options = {
             showAnimationDuration: 0,
             hideAnimationDuration: 0
         }
         var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
         gallery.init();
     }

 })
