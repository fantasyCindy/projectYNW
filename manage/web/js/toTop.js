$(function() {
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
      $("#toTop").fadeIn(); 
    } else {
      $("#toTop").fadeOut();
    }
  });
  $("body").append("<div id=\"toTop\" style=\"border:1px solid #444;background:#333;color:#fff;text-align:center;padding:16px 22px 20px;position:fixed;bottom:42px;right:7px;cursor:pointer;display:none;font-family:verdana;font-size:22px;\"><i class='fa fa-angle-up'></i></div>");
  $("#toTop").click(function(){
    $("body,html").animate({scrollTop:0},800);
  });
});