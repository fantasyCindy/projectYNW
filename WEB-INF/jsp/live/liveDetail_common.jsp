<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!-- 直播信息 -->
    <div id="live-info">
        <div class="person">
            <div class="column column1 avatar"><img src="${teacher.photo}" /></div>
            <div class="column column2">
                <div class="name">
                    <span class="value" id="teacher-nickName">${teacher.title}</span>
                    <i class="item-icon-guwen"><img src="${teacher.type_ioc}"></i>
                    <span class="type">
                       ${teacher.type_name}
                </span>
                    <c:if test="${teacher.certificate_num != null and teacher.certificate_num !=''}">
                        <span class="t-number" style="color:#d72621">证书编号${teacher.certificate_num}</span>
                    </c:if>
                    <table>
                        <tr>
                            <td>
                                <span class="txt">粉丝</span>
                                <span class="value1 liveCountValue">${popularity_number}</span>
                            </td>
                            <td>
                                <span class="txt">直播人气</span>
                                <span class="value1 liveCountValue">${popularity}</span>
                            </td>
                            <td>
                                <span class="txt">回答问题</span>
                                <span class="value1 answerCountValue">${answerCount}</span>
                            </td>
                            <td class="view">
                                <span class="txt">发布观点</span>
                                <span class="value1 opinionViewValue">${articleCount}</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <p class="action">
                    <span class='care ${attention}'><c:if test="${attention}">取消</c:if>关注</span>
                    <span class="ask askWin-trigger" data-price="${teacher.questionsPrice}">提问</span>
                </p>
            </div>
            <div class="column column3"></div>
        </div>
    </div>
    <div class="liveDetail-menu menu">
        <div class="wrap">
            <a class="item" href="${live_path}live/${teacher.teacherid}/">直播</a>
            <a class="item askStock-category-item" href="${ask_path}gegu/${teacher.teacherid}/">问答</a>
            <a class="item opinionType-item" href="${opinion_path}dapan/${teacher.teacherid}/">观点</a>
            <c:if test="${teacher.teacher_type != 2}">
                <a class="item referType-item" href="${neican_path}refer/${teacher.teacherid}">内参</a>
            </c:if>
            <a class="item learnType-item" href="${xuechaogu_path}tactics/${teacher.teacherid}">名家战法</a>
        </div>
    </div>
