<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>${teacher.title}
                <c:forEach items="${specialtys}" var="sp">${sp.name} </c:forEach>约投顾</title>
            <meta name="keywords" content="${teacher.title},<c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
            <meta name="description" content="${teacher.title},${teacher.descriptionString} <c:forEach items=" ${specialtys} " var="sp ">${sp.name},</c:forEach>约投顾"/>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="${path}/private/live/css/liveDetail.css?0730" />
                <link rel="stylesheet" href="${path}/private/live/css/liveDetail_live.css?07301" />
                <link rel="stylesheet" href="${path}/public/module/qqface/sprite.css" />
                <script src="${path}/private/live/js/banner-vip.js"></script>
                <!-- <link rel="stylesheet" href="${path}/public/module/zoomify.css?2" /> -->
    </head>

    <body>
        <div class="img-wrap">
            <div class="img-container">
                <img id="img-wrap-img" src="" alt="">
            </div>
        </div>
        <%-- 今日牛股观察弹窗 --%>
            <div id="todayWin" class="hide">
                <div class="todayWin-wrap">
                    <div class="todayWin-title"></div>
                    <div class="todayWin-text">
                        <textarea name="" id="" cols="54" rows="11"></textarea>
                        <span class="textCount">
              <span class="wordCount">100</span>/100</span>
                    </div>
                    <div class="todayWin-action">
                        <span class="todayWin-sure todayWin-btn">发表</span>
                        <span class="todayWin-cancel todayWin-btn">取消</span>
                    </div>
                </div>
            </div>
            <%@include file="../v2/front-head-v2.jsp" %>
                <!-- liveDetail BEGIN -->
                <div id="liveDetail" class="hide">
                    <!-- 栏目菜单 -->
                    <div class="liveContent clear">
                        <div class="leftBar">
                            <!-- 直播 -->
                            <div id="live" class="leftBarChild ">
                                <div class="today-packUp"></div>
                                <div class="todayTop-wrap"></div>
                                <div class="live-top clear">
                                    <div class="live-photo">
                                        <img src="${teacher.photo}" alt="" />
                                    </div>
                                    <div class="live-msg">
                                        <div class="live-line1">
                                            <span class="live-name">${teacher.title}</span>
                                            <a href="/gegu/${teacher.teacherid}" target="_blank">
                                                <span class="live-person-btn">TA的主页</span>
                                            </a>
                                            <span class="live-subject">今日主题：
                        <span class="living-subject-value">${periodical.todaysubject}</span>
                                            <i class="edit-subject hide"></i>
                                            </span>
                                            <span class="live-time"></span>
                                        </div>
                                        <div class="live-line1">
                                            <span class="live-num">证书编号：${teacher.certificate_num}</span>
                                            <span class="live-risk">风险提示： 以下内容，仅供参考。投资有风险，操作需谨慎。</span>
                                            <span class="close-live hide"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="setting">
                                    <div class="turn inline">
                                        <span class="turn-btn prev">上一期</span>
                                        <span class="turn-btn current">返回当前期</span>
                                        <span class="turn-btn next">下一期</span>
                                    </div>
                                    <div class="sound inline">
                                        <span class="txt">声音提示</span>
                                        <span class="yn-icon-sound"></span>
                                    </div>
                                    <div class="font inline">
                                        <span class="txt">字号</span>
                                        <span class="font-size-item" data-size="large">大</span>
                                        <span class="font-size-item select" data-size="middle">中</span>
                                        <span class="font-size-item" data-size="small">小</span>
                                    </div>
                                </div>
                                <div class="items" id="items-middle">
                                    <div class="today hide">
                                        <div class="today-item"></div>
                                    </div>
                                    <div class="history"></div>
                                </div>
                                <div class="side-tool">
                                    <script>
                                        if (!ynIsTeacher) {
                                            document.write(
                                                '<div class="message care ${attention}"><c:if test="${attention}">已</c:if>关注</div>'
                                            )
                                        }
                                    </script>
                                </div>
                                <div class="backToNow hide">返回底部</div>
                                <div class="tooltip tooltip-live hide">有新的消息</div>
                                <div id="gift">
                                    <yn-gift-pop ref="giftpop" @submit="giftSubmit"></yn-gift-pop>
                                </div>
                            </div>
                            <!-- 发布直播 -->
                            <div id="pubEditer" class=" leftBarChild hide">
                                <div class="yn-title-1">
                                    <span class="yn-title-1-icon"></span>
                                    <span class="txt">发表直播</span>
                                </div>
                                <div class="contents">
                                    <script id="ueditContainer" name="content" type="text/plain"></script>
                                    <div class="info">
                                        <input type="text" class="insertStockCode" id="insertStockCode" placeholder="插入股票代码/拼音" />
                                        <span class="todayHeadlines-wrap hide"></span>
                                        <span class="todayHeadlines-btn" data-id="">
                      <i class="fa fa-plus-square-o" aria-hidden="true"></i>置顶消息发布</span>
                                        <button class="submit">发表</button>
                                        <div style="clear:both;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /////////// Right /////////// -->
                        <div class="rightBar" id="live-chat">
                            <yn-chat-interact ref="chat"></yn-chat-interact>
                        </div>
                    </div>
                    <div class="statement">
                        <p>
                            <span class="statement-title">声明：</span>投顾所发表言论均代表其个人对市场所持观点，网友应充分考虑市场的高风险性，据此操作风险自担。约投顾网站提供此互动平台不代表认可其观点。约投顾所有投顾不提供代客理财或qq咨询、微信咨询等非法业务。有私下进行收费咨询或推销其他产品服务，属于非法个人行为，与约投顾无关，请各位网友务必不要上当受骗！如发现上述违规行为可向约投顾客服举报。客服热线：400-0000-577
                        </p>
                    </div>
                </div>
                <!-- 历史直播 -->
                <div id="liveHistory" class="hide">
                    <div class="yn-title-1">
                        <span class="yn-title-1-icon"></span>
                        <span class="txt">历史直播</span>
                    </div>
                    <div class="items"></div>
                </div>
                <!-- /////////////////////////////////////////////////////////////////// -->
                <!-- 历史直播 -->
                <script type="text/html" id="liveHistory-template">
                    <table>
                        <tr>
                            <td class="time">时间</td>
                            <td class="subject">主题</td>
                            <td class="takeCount">参与人数</td>
                            <td class="broadCastingCount">直播条数</td>
                            <td class="record">操作</td>
                        </tr>
                        {{each}}
                        <tr class="item">
                            <td class="time">{{$value._time}}</td>
                            <td class="subject">{{$value.todaysubject}}</td>
                            <td class="record">
                                <span class="value">{{$value.membercount}}</span>人</td>
                            <td class="broadCastingCount">{{$value.broadCastingCount}}</td>
                            <td class="record">
                                <a class="ynbtn" href="/live/liveDetailLive.htm?teacherid=${teacher.teacherid}&periodical={{$value.periodicalid}}&time{{$value._time}}">查看记录</a>
                            </td>
                        </tr>
                        {{/each}}
                    </table>
                </script>
                <script id="friendTalk-template" type="text/html">
                    {{each}}
                    <div class="item {{$value._isTeacherTalk}}" data-periodicalid="{{$value.periodicalid}}" data-userid="{{$value.userid}}" data-chatid="{{$value.chatid}}">
                        <div class="line line1">
                            <span class="avatar"></span>
                            <span class="name">{{$value.nickName}}</span>
                            <span class="user_type {{$value._isTeacherTalk}}">
                <i class="fa fa-vimeo-square"></i>
              </span>
                        </div>
                        <div class="line line2">
                            <div class="pubContent">{{$value.replyMark}}{{#$value.content}}</div>
                        </div>
                        <div class="line line3">
                            <span class="time">{{$value.ctimeString}}</span>
                            <span class="divice"></span>
                            <a href="#talkWindow" class="reply {{$value.showReply}}" id="{{$value.id}}" data-id="{{$value.id}}">回复</a>
                        </div>
                    </div>
                    {{/each}}
                </script>
                <!-- 礼物 -->
                <div id="modify-subject-container" class="hide">
                    <div id="modify-subject">
                        <span class="close"></span>
                        <div class="my-body">
                            <div class="md-titlebar">修改直播主题</div>
                            <div class="md-content">
                                <textarea rows="8" cols="25" style="border: 1px solid #c7c7c7;" placeholder="实战交易，拒绝忽悠，免费送牛股"></textarea>
                                <div class="oh clear" style="margin-top:12px;">
                                    <span class="fl" style="position:relative;top:8px;color:#999;">
                    <span class="wordCountValue">20</span>/20</span>
                                    <button class="submit fr">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <%@ include file="../common/moudule-ask.jsp" %>
                    <%@ include file="./live-askStock-list.jsp" %>
                        <%@ include file="../common/front-foot.jsp" %>
                            <div id="app">
                                <yn-opinion-pop ref="oppo"></yn-opinion-pop>
                                <yn-zoom-pop ref="zoom"></yn-zoom-pop>
                                <yn-refer-pop ref="referpop" @subscribe="referSubmit"></yn-refer-pop>
                                <yn-ask-pop ref="askpop" @submit="askStockSubmit"></yn-ask-pop>
                                <yn-gift-animation ref="giftanimate"></yn-gift-animation>
                            </div>
                            <script type="text/javascript">
                                var projectPath = "${path}";
                                var periodicalid = "${periodical.periodicalid}";
                                var teacher_isOffline = "${isOffline}";
                                var hasHistoryLive = "${newLive}"
                                var publisher_time = "${periodical.publisher_time}";
                                var room_id = "${periodical.roomid}";
                                var room_teacherid = "${teacher.teacherid}";
                                var room_userid = "${teacher.user_id}";
                                var room_nickName = "${teacher.title}";
                                var isTeacherSelf = (room_userid == ynUserId);
                                var liveStatus = '${periodical.status}';
                                var type_ioc = '${teacher.type_ioc}';

                                var href = window.location.href
                                var hrefTime = href.match(/&time(\d{4}-\d{2}-\d{2})/)
                                var isHrefTime = hrefTime ? hrefTime[1] : ''
                                if (!isHrefTime) {
                                    isHrefTime = publisher_time.substr(0, 11)
                                }
                                $('.live-time').html(isHrefTime)
                            </script>
                            <script src="${path}/public/ueditor/ueditor.config.js"></script>
                            <script src="${path}/public/ueditor/ueditor.all.min.js"></script>
                            <script src="${path}/public/ueditor/lang/zh-cn/zh-cn.js"></script>
                            <script src="${path}/public/js/template.js?695"></script>
                            <!-- <script src="${path}/public/bundle/liveDetail_live.bundle.js?05292"></script> -->
                            <script src="${path}/public/live/dist/global.js"></script>
                            <script src="${path}/public/live/dist/live.bundle.js?0807"></script>
                            <script src="${path}/public/live/dist/liveDetail.bundle.js?20180807"></script>
    </body>

    </html>