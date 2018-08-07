  require('~/center/center.js')

  $(function() {
      updatePassword.init();
      updatePassword.event();

      //菜单
      yn.centerMenu.init({
          render: 'center',
          light: '修改密码'
      });
  })


  var updatePassword = (function() {
      var container, old, newPass, confirm, submit, isValide_new, isValide_confirm
      return {
          init: function() {
              container = $("#myInfo")
              old = $('#old')
              newPass = $('#new')
              confirm = $('#confirm')
              submit = $('.submit')
          },
          event: function() {

              submit.on('click', function() {
                  if (!_.trim(old.val())) return layer.msg('原密码不能为空')
                  if (!_.trim(newPass.val())) return layer.msg('新密码不能为空')
                  if (!_.trim(confirm.val())) return layer.msg('确认密码不能为空')

                  isValide_new = /^[a-zA-Z0-9_]{6,}/.test(_.trim(newPass.val()))
                  isValide_confirm = _.trim(newPass.val()) === _.trim(confirm.val())

                  if (!isValide_new) {
                      return layer.msg('新密码格式错误')
                  }
                  if (!isValide_confirm) {
                      return layer.msg('两次密码不一致')
                  }
                  var send = {
                      user_id: ynUserId,
                      oldPassword: _.trim(old.val()),
                      newPassword: _.trim(newPass.val()),
                  }

                  $.post('/auth/user/editPassword.htm', send, back => {
                      if (back.status == "16") {
                          layer.alert("原密码错误, 请重试...")
                          return;
                      }
                      if (back.status == "success") {
                          layer.msg("修改成功");
                          container.find('input').val('');
                      }
                  }, 'json')
              })
          }
      }
  })()
