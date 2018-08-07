 $(function() {

     var search = {
         container: $("#searchRoom"),
         title: $('.result-title'),
         items: $('.result-items'),
         interest: $('#interest'),
         none: $('#none'),
         button: $('.search-submit'),
         input: $("#search-key"),
         init: function() {
             this.render();
             this.event()
         },
         render: function() {

             var len = roomList.length;
             console.log("roomList", roomList)

             //没有结果
             if (len < 1) {
                 this.none.show();
                 this.title.html('没有找到关于<strong>"' + userInput + '"</strong>相关的直播室');
             }

             if (len > 0) {
                 this.none.hide();
                 this.title.html('为您找到关于<strong>"' + userInput + '"</strong>的搜索结果<strong>"' + roomCount + '"</strong>条');
                 this.items.html(template('room-template', roomList));
             }

             this.interest.find('.items').html(template('room-template', _.take(interest, 4)));

         },
         event: function() {

             var _this = this;

             this.items.on('click', '.item', function() {
                 var id = $(this).data('roomid');
                 var url = '/html/live.htm?roomid=' + id;
                 window.location.href = url;
             })

             this.button.on('click', function() {
                 var val = _this.input.val();
                 if (!val) {
                     layer.msg("请输入搜索内容")
                     return;
                 }
                 window.location.href = "/html/queryLiveRooms.htm?queryText=" + val
             })
         }
     }


     /////////////////////////////////////////////////////////////////////

     search.init();
 })
