/*
    老师简介
    /.导入模块
    var Profile = require('../module/ui/teacher-profile.js');

    //2.初始化
    Profile.init(); 

    3.添加
    //添加触发(CSS选择器)  
    //模块会从选择器中获取teacherid值: $(".selector").data('teacherid'), 确保teacherid属性值存在
    Profile.add('.selector') ; 
    
 */


require('./teacher-profile.css')
var Care = require('m/ajax/care.js');
var error = require("e/error-type")

var profile = function() {

    var container, items, loading, hide = true,
        personData = null,
        indicate_left,
        indicate_right


    var updateCare = function() {

    }

    //事件
    var event = function() {

        //滑入时取消隐藏
        container.on('mouseenter', () => hide = false)
        container.on('mouseleave', () => {
            container.hide();
            hide = true;
            personData = null
        })

        //关注
        container.on('click', '.care', () => {
            if (!ynIsLogin) return yn.login.render()
            var btn = $('#profile-care-btn')
            var ajax = personData._isCare ? Care.cancel : Care.add;
            ajax(personData.teacher.teacherid).done(data => {
                var ret = personData._isCare = !personData._isCare
                var text = ret ? "取消关注" : "关注";
                btn.text(text)
            })
        })
    }


    var handleData = function(data) {
        data._style = (_.pluck(data.teacher.specialtys, 'name').join("，")).length > 40 ? (_.pluck(data.teacher.specialtys, 'name').join("，")).substr(0, 40) + '..' : _.pluck(data.teacher.specialtys, 'name').join("，");
        data._link = "live/" + data.teacher.teacherid + '/';
        data._careText = data.teacher.isAttention ? "取消关注" : "关注";
        data._isCare = String(data.teacher.isAttention);
        data._isOffline = data.isOffline == -1 ? 'hide' : ''
        data._liveTitle = data.liveTitle ? data.liveTitle : '暂未开启直播'
        data._liveTitle = data._liveTitle.length > 22 ? data._liveTitle.substr(0, 22) + '..' : data._liveTitle
        data._certificate_num = data.teacher.teacher_type == 1 ? data.teacher.certificate_num : 'hide'
        if (data.opinion) {
            data._opinionTitle = data.opinion.title.length > 22 ? data.opinion.title.substr(0, 22) + '..' : data.opinion.title
            data.hasOpinion = `href=/opinion/${data.opinion.article_id}`
        } else {
            data._opinionTitle = '暂未发表观点'
            data.hasOpinion = ''
        }

        return data;
    }

    var render = function(trigger, teacherid) {
        loading.render();

        //定位
        var position = (function() {
            var offset = trigger.offset();
            var top = offset.top - 15;

            var left = function() {
                var _left = offset.left;
                if (_left > 800) {
                    //左侧显示
                    indicate_right.show();
                    indicate_left.hide();
                    return _left - 450 - 　5;
                } else {
                    //右侧显示
                    indicate_left.show();
                    indicate_right.hide();
                    return _left + trigger.width() + 5;
                }
            }()

            container.css({ left: left, top: top })
        })()

        $.getJSON("/userinfo/queryUserAllInfo.htm?teacherid=" + teacherid, function(data) {
            if (data.status == 1) {
                personData = handleData(data.data);
                setTimeout(function() {
                    items.html(template('personIntro-template', personData));
                    container.show();
                }, 300)
            } else() => {
                return layer.msg(error[data.status])
            }
        })
    }

    return {
        init: function() {
            $('body').append(getTag());
            container = $('#personIntro');
            items = container.find('.items');
            indicate_left = container.find('.indicate.left');
            indicate_right = container.find('.indicate.right')

            //加载动画
            loading = new yntool.loading();
            loading.container = items;
            loading.margin = 80;
            event();
        },
        add: function(_selector) {
            var self = this;

            //触发显示/隐藏
            $('body').on('mouseenter', _selector, function() {
                hide = false;
                setTimeout(() => {
                    if (!hide) {
                        var teacherid = $(this).data('teacherid'); //从选择器的属性中获取teacherid
                        render($(this), teacherid);
                    }
                }, 350)
            }).on('mouseleave', _selector, function() {
                hide = true;
                setTimeout(() => {
                    if (hide) {
                        container.hide()
                    }
                }, 400)
            })
        }
    }

}()

/*///////////////////////////////////////////////////////////////////*/

module.exports = {
    init: profile.init,
    add: profile.add
}


/*///////////////////////////////////////////////////////////////////*/

function getTag() {
    return `<div id="personIntro" class="hide">
        <span id="personIntro-indicate-right" class="indicate right fa fa-caret-right hide"></span>
        <span id="personIntro-indicate-left" class="indicate left fa fa-caret-left hide"></span>
        <div class="items"></div>
    </div>
    <script type="text/html" id="personIntro-template">
        <div class="line infoView">
            <div class="column column1">
                <div class="teacher-profile-avatar" ><img src="{{teacher.photo}}" style="width:80px;"/></div>
                <div class="buttons"><span class="care {{_isCare}}" id="profile-care-btn">{{_careText}}</span></div>
            </div>
            <div class="column column2">
                <div class="title">
                    <span class="name">{{teacher.nickname}}</span>
                    <i class="item-icon-guwen"><img src="{{teacher.type_ioc}}"></i>
            <a class="ynbtn live-link liveBtn {{_isOffline}}" href="/live/{{teacher.teacherid}}/" target="_blank">看TA直播</a>
                </div>
                <span class="postion">{{teacher.type_name}}</span>
                <span class="number {{_certificate_num}}">证书编号{{_certificate_num}}</span>
                <div class="style">{{_style}}</div>
            </div>
        </div>
        <div class="line countView">
            <div class="msg"><a target="_blank" href="/live/{{teacher.teacherid}}/"><span class="colorLight">直播：</span>{{_liveTitle}}</a></div>
            <div class="msg"><a target="_blank" {{hasOpinion}}><span class="colorLight">观点：</span>{{_opinionTitle}}</a></div>
        </div>
    </script>`
}
