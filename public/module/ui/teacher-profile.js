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

    //事件
    var event = function() {

        //滑入时取消隐藏
        container.on('mouseenter', () => hide = false)
        container.on('mouseleave', () => {
            container.hide();
            hide = true;
        })

        //关注
        container.on('click', '.care.false', () => {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            Care.add(personData.teacher.teacherid).done(data => {
                $(this).attr('class', 'care true').text("取消关注")
            });
        })

        //取消关注
        container.on('click', '.care.true', () => {
            if (!ynIsLogin) {
                yn.login.render();
                return;
            }
            Care.cancel(personData.teacher.teacherid).done(() => {
                $(this).attr('class', 'care false').text("关注")
            })
        })
    }


    var handleData = function(data) {
        data._style = (_.pluck(data.teacher.specialtys, 'name').join("，")).length > 40 ? (_.pluck(data.teacher.specialtys, 'name').join("，")).substr(0, 40) + '..' : _.pluck(data.teacher.specialtys, 'name').join("，");
        data._link = "live/" + data.teacher.teacherid + '/';
        data._careText = data.teacher.isAttention ? "取消关注" : "关注";
        data._isCare = String(data.teacher.isAttention);
        data._isOffline = data.isOffline == -1 ? 'hide' : ''
        data._liveTitle = data.liveTitle.length > 22 ? data.liveTitle.substr(0, 22) + '..' : data.liveTitle
        data._opinionTitle = data.opinion.title.length > 22 ? data.opinion.title.substr(0, 22) + '..' : data.opinion.title
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

            container.css({
                left: left,
                top: top
            })
        })()

        container.show();

        $.getJSON("/userinfo/queryUserAllInfo.htm?teacherid=" + teacherid, function(data) {
            personData = handleData(data);
            setTimeout(function() {
                items.html(template('personIntro-template', personData));
            }, 300)
        })
    }

    return {
        init: function() {
            $('body').append(getTag());
            container = $('#personIntro');
            items = container.find('.items');
            personData = null;
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
                        console.log("teacherid", teacherid)
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
                <div class="teacher-profile-avatar" >
                    <img src="{{teacher.photo}}" style="width:80px;"/>
                </div>
                <div class="buttons"><span class="care {{_isCare}}">{{_careText}}</span></div>
            </div>
            <div class="column column2">
                <div class="title">
                    <span class="name">{{teacher.nickname}}</span>
                    <i class="fa fa-vimeo-square"></i>
                    
            <a class="ynbtn live-link liveBtn {{_isOffline}}" href="/live/{{teacher.teacherid}}/" target="_blank">看TA直播</a>
                   
                </div>
                <span class="postion">投资顾问</span>
                <span class="number">证书编号{{teacher.certificate_num}}</span>
                <div class="style">{{_style}}</div>
            </div>
        </div>
        <div class="line countView">
            <!--<table>
                <tr>
                    <td>粉丝</td>
                    <td>回答问题</td>
                    <td>发布观点</td>
                    <td>直播条数</td>
                </tr>
                <tr class="value">
                    <td>{{popularity_number}}</td>
                    <td>{{answerCount}}</td>
                    <td>{{gdcount}}</td>
                    <td>{{zbcount}}</td>
                </tr>
            </table>-->
            <div class="msg"><a target="_blank" href="/live/{{teacher.teacherid}}/"><span class="colorLight">直播：</span>{{_liveTitle}}</a></div>
            <div class="msg"><a target="_blank" href="/opinion/{{opinion.article_id}}"><span class="colorLight">观点：</span>{{_opinionTitle}}</a></div>
        </div>
    </script>`
}