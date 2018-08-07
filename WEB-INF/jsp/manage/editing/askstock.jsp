
<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
    <style type="text/css">
    .hid{display:none;}
      #editing{padding:15px;}
      #editing .nav{border-bottom:1px solid #ededed;position:relative;height:45px;margin-bottom:20px;}
      #editing .nav span{border-radius:3px;display:inline-block;line-height:44px;position:relative;height:44px;border:1px solid #fff;width:80px;text-align:center;cursor:pointer;}
      #editing .nav span.thisclass{border:1px solid #ededed;border-bottom:1px solid #fff;height:44px;position:relative;bottom:-1px;}
      #editing .editing-tag{color:rgb(30,30,30);line-height:25px;}
      #editing .editing-tag input{margin:0 10px;padding:3px;width:280px;border-radius:5px;border:1px solid #e1e1e1;}
      #editing .editing-tag .query-btn{display:inline-block;background:#2e84c1;color:#fff;cursor:pointer;width:60px;text-align:center;line-height:30px;border-radius:5px;}
      #editing .editing-content table{width:100%;text-align:center;line-height:32px;}
      #editing .editing-content table td{border:1px solid #dddede;}
      #editing .editing-content thead{background:#f5f6f7;}
      #editing .editing-content tbody tr:hover{background:#2f72ab !important;transition:all .3s;color:#fff;cursor:pointer;}
      #editing .editing-content tbody tr:nth-of-type(2n+1){background:#effffe;}
      #editing .editing-content tbody tr:nth-of-type(2n){background:#feffff;}
      #editing .editing-content .editing-btn{display:inline-block;line-height:22px;width:50px;color:#fff;cursor:pointer;text-align:center;background:#2e84c1;border-radius:5px;border:1px solid #e1e1e1;}
      #edit-upload{width:700px;box-shadow:2px 2px 20px rgba(0,0,0,0.3);border:1px solid rgb(200,200,200);position:fixed;border-radius:5px;background:#fff;}
      #edit-upload .title{line-height:40px;color:#fff;padding:0 20px;background:#2e84c1;}
      #edit-upload .close{position:absolute;right:11px;top:7px;}
      #edit-upload table{width:100%;color:rgb(30,30,30);}
      #edit-upload table td{vertical-align:top;padding:5px 0;}
      #edit-upload .wrap{padding:0 20px;max-height:400px;overflow-y:auto;}
      #edit-upload .initialize{border:1px solid #e6e7e8;display:inline-block;padding:3px;border-radius:3px;}
      #edit-upload table .append input{display:inline-block;}
      #edit-upload #img_srcInput{border:1px solid #e6e7e8;outline:none;padding:3px;cursor:pointer;}
      #edit-upload #uploadCardBtn{border:none;color:#fff;background:#2e84c1;border-radius:4px;padding:3px 10px;}
      #edit-upload #solidhref{width:200px;}
      #edit-upload .upload-btn{border-top:1px solid #d4d4d6;background:#f7f8f9;text-align:right;margin:0 -20px;}
      #edit-upload .upload-btn span{display:inline-block;cursor:pointer;color:#fff;margin:5px;padding:5px 15px;border-radius:5px;}
      #edit-upload .upload-btn .confirm{background:#fa7f23}
      #edit-upload .upload-btn .cancel{background:#98999a}
      #edit-upload textarea{max-width:584px;width:584px;}
      #edit-upload .vessel:after{content:"";clear:both;display:block;*zoom:1;}
      #edit-upload .vessel img{max-width:100px;max-height:74px;border:1px solid #e1e1e1;}
      #edit-upload .vessel span{position:relative;display:inline-block;margin:0 5px;}
      #edit-upload .vessel .close{font-size:20px;right:-9px;top:-9px;}
    </style>
	</head>
  <body>
      <div id="editing">
        <div class="nav">
          <span class="thisclass" data-type="noediting">未采编</span>
          <span data-type="yesediting">已采编</span>
        </div>
        <div class="editing-tag">
          <p class="query">问股内容：<input type="text" name="questioncontent" id="questioncontent" />投顾：<input type="text" name="teachertitle" id="teachertitle" /> <span class="query-btn">查询</span></p>
        </div>
        <div class="editing-content">
        </div>
      </div>
      <%@ include file="/WEB-INF/jsp/manage/common/moudle-editing.jsp" %>
      <script type="text/html" id="noediting-template">
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>问股内容</td>
            <td>投顾老师</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          {{each}}
            <tr>
              <td class="serial"></td>
              <td>{{$value.questioncontent}}</td>
              <td>{{$value.teachertitle}}</td>
              <td><span class="editing-btn" data-id="{{$value.noteid}}" data-text="{{$value.questioncontent}}">采编</span></td>
            </tr>
          {{/each}}
        </tbody>
      </table>
      </script>
      <script type="text/html" id="yesediting-template">
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>问股内容</td>
            <td>投顾老师</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          {{each}}
            <tr>
              <td class="serial"></td>
              <td>{{$value.questioncontent}}</td>
              <td>{{$value.teachertitle}}</td>
              <td>已采编</td>
            </tr>
          {{/each}}
        </tbody>
      </table>
      </script>
      <script src="/public/js/bootpag.js"></script>
      <script src="/public/js/template.js"></script>
      <script src="/public/js/velocity.js"></script>
      <script src="/public/js/velocity.ui.js"></script>
      <script src="/public/js/layer/layer.js"></script>
      <script type="text/javascript" src="/manage/plugins/ajaxfileupload/ajaxfileupload.js"></script>
      <script type="text/javascript">
        $(function(){
          var bootpag = yn.bootpag($("#editing"));
          bootpag.on('page', function(err, num) {
              editing.page = num;
              editing.render[editing.type]();
          })
          var editing={
            container:$('#editing'),
            content:$('#editing .editing-content'),
            type:"noediting",
            page:1,
            row:20,
            init:function(){
              var _this=this;
              this.event();
              this.render["noediting"]();
            },
            event:function(){
              var _this=this;
              //采编tag
              this.container.find('.nav').on('click','span',function(){
                $(this).parent().find('.thisclass').removeClass("thisclass");
                $(this).addClass("thisclass");
                var type=$(this).data("type");
                _this.page = 1;
                _this.render[type]();
              })
              //查询
              this.container.find('.query .query-btn').on('click',function(){
                var questioncontent=$('#questioncontent').val();
                var teachertitle=$('#teachertitle').val();
                var send={questioncontent:questioncontent,teachertitle:teachertitle}
                yndata.noediting(send).done(function(data){
                  _this.container.find('.editing-content').html(template('noediting-template',data.rows))
                  //排序
                  var len = $('#editing .editing-content tbody tr').length;
                  for(var i = 0;i<len;i++){
                      $('#editing .editing-content tbody tr:eq('+i+') td:first').text(i+1);
                  }
                  //页码
                  var number=1;
                  var result = Math.ceil(+data.total / editing.row);
                  if( result >1){
                    number = result;
                  }
                  bootpag.bootpag({ page: editing.page, total:number});
                })
                
              })
              //采编btn
              this.container.find('.editing-content').on('click','.editing-btn',function(){
                var id=$(this).data("id");
                var content=$(this).data("text");
                editingalt.render();
                editingalt.addtext(id,content);
              })
            },
            render:{
              //未采编
              noediting:function(){
                yndata.noediting({is_intervene:0,row:editing.row,page:editing.page}).done(function(data){
                  editing.container.find('.editing-content').html(template('noediting-template',data.rows))
                  //排序
                  var len = $('#editing .editing-content tbody tr').length;
                  for(var i = 0;i<len;i++){
                      $('#editing .editing-content tbody tr:eq('+i+') td:first').text(i+1);
                  }
                  //页码
                  var number=1;
                  var result = Math.ceil(+data.total / editing.row);
                  if( result >1){
                    number = result;
                  }
                  bootpag.bootpag({ page: editing.page, total:number});
                })
              },
              //已采编
              yesediting:function(){
                yndata.noediting({is_intervene:1,row:editing.row,page:editing.page}).done(function(data){
                  editing.container.find('.editing-content').html(template('yesediting-template',data.rows))
                  //排序
                  var len = $('#editing .editing-content tbody tr').length;
                  for(var i = 0;i<len;i++){
                      $('#editing .editing-content tbody tr:eq('+i+') td:first').text(i+1);
                  }
                  //页码
                  var number=1;
                  var result = Math.ceil(+data.total / editing.row);
                  if( result >1){
                    number = result;
                  }
                  bootpag.bootpag({ page: editing.page, total:number});
                })
              }
            }
          }
          //=========================================//
          editing.init();
          var editingalt=ynmodule.edit();
          editingalt.init();
        })


        var yn={}
        var yndata={}
        var ynmodule={}
        //采编alt
        ynmodule.edit=function(){
          return {
              container: $('#edit-upload'),
              edit_content:$('#edit-upload .edit-content'),
              docObj:$('#img_srcInput'),
              vessel:$('#edit-upload .vessel'),
              wrong:$('#edit-upload .msg-warr'),
              status:null,
              init: function() {
                  this.center();
                  this.event();
              },
              center: function() {
                  var w = $(window).width();
                  var h = $(window).height();
                  var cw = this.container.outerWidth()
                  var ch = this.container.outerHeight()
                  this.container.css({
                      left: (w - cw) / 2 + "px",
                      top: (h - ch) / 2 + "px"
                  })
              },
              event: function() {
                  var _this = this;
                  //关闭
                  this.container.on('click', '> .close', function(e) {
                      _this.container.hide();
                  })
                  //添加图片
                  this.docObj.change(function(){
                    var fileList=this.files.length;
                    var imglist=_this.vessel.find('img').length;
                    console.log(imglist)
                    if (imglist>3) {
                      _this.wrong.show();
                        return;
                    }else{
                      _this.wrong.hide();
                    }
                    for (var i = 0; i <fileList; i++) {
                      var objUrl = _this.addimg(this.files[i]);
                      if (objUrl) {
                        _this.vessel.append('<span style="float:left"><i class="close fa fa-times-circle"></i><img id="img'+i+'" src="'+objUrl+'"/></span>')
                      }
                    };
                  });
                  //delete img
                  this.vessel.on('click','.close',function(){
                    $(this).parent().remove();

                  })
                  //上传图片
                  this.container.on('click','#uploadCardBtn',function(){
                     var photo=$('#img_srcInput').val();
                     if (photo=="") {
                       layer.msg('上传图片不能为空');
                       return;
                     };
                     $.ajaxFileUpload({  
                       url : path+"/intervene/uploadImg.do",  
                        secureuri : false,  
                        fileElementId : 'img_srcInput',  
                        dataType : 'json',  
                        success : function(_backData, status) {
                          _this.status=_backData.returnPath;
                          if("-1" == _backData){
                            layer.msg("上传图片失败!");
                          }else{
                            if("success" == _backData.flag){
                              layer.msg("上传图片成功!");
                              }else{
                                layer.msg("上传图片失败!");
                              }
                          }
                        },  
                        error : function(data, status, e) {
                          layer.msg("上传图片失败："+e);
                       }  
                     })
                      
                  })
                  //确定采编
                  this.container.find('.upload-btn').on('click','.confirm',function(){
                    var intervene_no=_this.container.find('#intervene_no').val();
                    var noteid=_this.container.find('.edit-content').attr("data-noteid");
                    var intervene_content=_this.container.find('#intervene_content').val();
                    var intervene_ImgPath=_this.status;
                    var initialize=$('#edit-upload .initialize').val();
                    if (initialize=="") {
                      layer.msg('不要丢下我(╯﹏╰)！');
                      return;
                    };
                    yndata.editing_confirm({intervene_no:intervene_no,noteid:noteid,intervene_content:intervene_content,intervene_ImgPath:intervene_ImgPath}).done(function(_backData){
                        if("success" == _backData){
                          layer.msg('采编成功');
                          _this.container.hide();
                          window.location.reload();
                        }else{
                          layer.msg('采编失败');
                        }
                    })
                  })
                  //取消采编
                  this.container.find('.upload-btn').on('click','.cancel',function(){
                    $('#edit-upload .initialize').val('');
                    _this.container.hide();
                  })
              },
              render: function() {
                  var _this = this;
                  this.vessel.html('');
                  $('#edit-upload .initialize').val('');
                  this.container.velocity('transition.expandIn', { duration: 300 })
              },
              //采编noteid
              addtext:function(id,content){
                  this.edit_content.html(content);
                  this.edit_content.attr("data-noteid",id);
              },
              addimg:function(file){
                //建立一個可存取到該file的url
                var url = null ; 
                if (window.createObjectURL!=undefined) { // basic
                  url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                  url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                  url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
              }
          }
        }
        //转换base64编码
        // ynmodule.base64=function(img){
        //   var canvas = document.createElement("canvas");
        //   canvas.width = 120;
        //   canvas.height = 120;
        //   var ctx = canvas.getContext("2d");
        //   var img=new Image();
        //   ctx.drawImage(img, 0, 0);
        //   var dataURL = canvas.toDataURL("image/png");
        //   return dataURL
        //   // return dataURL.replace("data:image/png;base64,", "");
        // }
        //采编list
        yndata.noediting=function(ops){
          ops = extend({
              is_intervene:0,
              page: 1,
              row: 20,
              questioncontent:'',
              teachertitle:'',
          }, ops)
          var defer = $.Deferred();
          var send={
              is_intervene:ops.is_intervene,
              pageSize:ops.row,
              currentPage:ops.page,
              questioncontent:ops.questioncontent,
              teachertitle:ops.teachertitle
          }
          $.getJSON('/intervene/queryNoteIntervene.do',send,function(data){
                  defer.resolve(data);        
          }) 
          return defer.promise(); 
        }
        //确定采编
        yndata.editing_confirm=function(ops){
          var defer=$.Deferred();
          var send={
            intervene_no:ops.intervene_no,
            noteid:ops.noteid,
            intervene_content:ops.intervene_content,
            intervene_ImgPath:ops.intervene_ImgPath
          }
          $.post(path+'/intervene/InterveneNote.do',send,function(_backData){
              defer.resolve(_backData);
          });
          return defer.promise();
        }
        //分页
        yn.bootpag = function(selector, ops) {
            ops = extend({
                first: true
            }, ops)
            var tag = '<ul id="ynpagination" class="myPagination"></ul>';
            var container = function() {
                if (typeof selector != "string") {
                    return selector
                } else {
                    return $(selector);
                }
            }()

            container.append(tag);
            var bootpag = $('#ynpagination').bootpag({
                total: 1,
                page: 1,
                maxVisible: 5,
                firstLastUse: ops.first,
                first: "首页",
                last: "尾页",
                next: "下一页",
                prev: "上一页",
                leaps: false
            })
            bootpag.hide = function() {
                $('#ynpagination').hide();
            }
            bootpag.show = function() {
                $('#ynpagination').show()
            }
            return bootpag;
        }

        function extend(target, source) {
            if (source) {
                for (key in source) {
                    var value = source[key];
                    if (typeof value !== undefined) {
                        target[key] = value
                    }
                }
            }
            return target;
        }

      </script>
  </body>
</html>
 