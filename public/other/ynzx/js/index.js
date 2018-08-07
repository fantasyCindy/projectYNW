var login, register;

var navigation = (function(){
    var container, list, items
    return {
        init: function(){
            container = $('.page-index')
            list = container.find('.menu .list');
            items = container.find('.yn-content');
            list.on('click',function(){
                var index = $(this).index()
                navigation.unselect()
                $(this).addClass('select')
                items.find('.list-content').hide()
                $(items.find('.list-content')[index]).show()
                register.hidden()
                login.hidden()
            })
            //登录
            container.on('click','.login', function(){
                items.find('.list-content').hide()
                navigation.unselect()
                $(this).addClass('select')
                login.render()
            })
            //注册
            container.on('click','.register', function(){
                items.find('.list-content').hide()
                navigation.unselect()
                $(this).addClass('select')
                register.render()
            })

            container.on('click','.news-download',function(){
                items.find('.list-content').hide()
                navigation.unselect()
                $('.login').addClass('select')
                login.render()
            })
        },
        unselect: function(){
            list.removeClass('select')
            $('.login').removeClass('select')
            $('.register').removeClass('select')
        }
    }
})()


login = (function(){
    var container,phone, password
    return {
        init: function(){
            container = $('.yn-login')
            container.on('click','.login-submit', function(){
                var phoneNum = (container.find('.login-phone input').val()).trim()
                var pwd = (container.find('.login-password input').val()).trim()
                if(!phoneNum){
                    return alert('请输入手机号')
                }
                if(!pwd){
                    return alert('请输入密码')
                }
                alert('登录成功')
                login.clean()
            })
            /*去注册*/ 
            container.on('click', '.go-register', function(){
                register.render()
            })
        },
        render: function(){
            container.show()
            register.hidden()
        },
        clean: function(){
            container.find('input').val('')
        },
        hidden: function(){
            container.hide()
        }
    }
})()

register = (function(){
    var container,phone, password, confirm, name
    return {
        init: function(){
            container = $('.yn-register')
            container.on('click','.register-submit', function(){
                var name = (container.find('.register-name input').val()).trim()
                var confirm = (container.find('.register-confirm input').val()).trim()
                var phoneNum = (container.find('.register-phone input').val()).trim()
                var pwd = (container.find('.register-password input').val()).trim()
                if(!name){
                    return alert('请输入用户名')
                }
                if(!phoneNum){
                    return alert('请输入手机号')
                }
                if(!pwd){
                    return alert('请输入密码')
                }
                if(!(confirm === pwd)){
                    return alert('两次密码输入不一致')
                }
                alert('注册成功')
                register.clean()
            })
            /*去登录*/
            container.on('click', '.go-login', function(){
                login.render()
            })
        },
        render: function(){
            container.show()
            login.hidden()
        },
        clean: function(){
            container.find('input').val('')
        },
        hidden: function(){
            container.hide()
        }
    }
})()

$(function(){
    navigation.init();
    login.init();
    register.init();
})