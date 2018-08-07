 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!-- 向牛人提问 -->
    <div id="askTeacher-wrap" class="hide">
        <div id="askTeacherWindow" style="z-index:1000">
            <div class="close-win close"></div>
            <!-- left -->
            <div class="left">
                <div class="title">
                    <span class="name" id="aswWindow-title">向牛人提问</span>
                    <span class="times"></span>
                </div>
                <div class="invite clear">
                    <div class="select"></div>
                    <input type="text" placeholder="@邀请牛人回答【必填】" autocomplete="off" id="select-input" />
                    <span class="price">价格<span class="priceNum">￥<span class="price-num">0</span></span>
                    </span>
                    <div class="list hide">
                        <div class="action">
                            <span class="info">找到<span class="value"></span>牛人</span>
                            <span class="close"></span>
                        </div>
                        <div class="list-wrap"></div>
                    </div>
                </div>
                <div class="onlyInvite hide">
                    <button class="invite-submit">提交</button>
                </div>
                <div class="content" id="questionField">
                    <div class="values">
                        <textarea cols="30" rows="10" placeholder="内容不超过200字"></textarea>
                    </div>
                    <div class="bottom">
                        <div class="msg hide">
                            <p><i class="fa fa-exclamation-circle"></i>投资顾问将对股票<span class="msg-code"></span>涨跌趋势进行评估</p>
                        </div>
                        <div class="actions">
                            <div class="action search">
                                <input type="text" class="stockList" id="ask-win-stock" placeholder="插入股票" autocomplete="off" />
                            </div>
                        </div>
                        <div class="submit">
                            <span class="wordCount"><span class="value">200</span>/200</span>
                            <button>提问</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- right -->
            <div class="right">
                <div class="title">我要与在线牛人实时交流</div>
                <div class="content">
                    <div class="items"></div>
                </div>
            </div>
            <!-- 在线老师 -->
            <script type="text/html" id="online-teacher-template">
                {{each}}
                <div class="teacher-item item" data-id="{{$value.answeruserid}}" data-name="{{$value.teachertitle}}" data-price="{{$value.questionPrice}}">
                    <div class="avatar"><img src="{{$value.photo}}" /></div>
                    <div class="info">
                        <div class="line line1">
                            <span class="name">{{$value.teachertitle}}</span>
                        </div>
                        <div class="line line2">
                            <span class="answer">回答<span class="value">{{$value.answercount}}</span></span>
                            <span class="help">有帮助<span class="value">{{$value.zancount}}</span></span>
                        </div>
                    </div>
                </div>
                {{/each}}
            </script>
        </div>
    </div>
    <!-- 专门提问某个投顾 -->
    <div id="askAimed-wrap" class="hide">
        <div id="askAimedTeacher" class="" style="z-index:1000">
            <div class="aim-close-win close"></div>
            <div class="aim-title">
                <span class="aim-name" id="aswWindow-title">向牛人提问</span>
                <span class="aim-times"></span>
            </div>
            <div class="aim-content">
                <textarea name="" id="textarea" cols="" rows="12"></textarea>
            </div>
            <div class="aim-msg hide">
                <p><i class="fa fa-exclamation-circle"></i>投资顾问将对股票<span class="msg-code"></span>涨跌趋势进行评估</p>
            </div>
            <div class="aim-bottom">
                <input type="text" placeholder="输入股票代码" id="stockCode" class="stockList">
                <div class="aim-line">
                    <span class="aim-price">价格<span class="aim-red">￥</span><span class="aim-num"></span></span>
                    <span class="aim-word"><span class="aim-count">200</span>/200</span>
                    <span class="aim-submit">提问</span>
                </div>
            </div>
        </div>
    </div>
    <div id="askNoTimesWin" class="hide">
        <div class="ask-close"><img src="/public/icons/close-icon.png"></div>
        <div class="ask-icon"><img src="/public/icons/ask-icon.png" alt=""></div>
        <div class="ask-tip">今天的问股次数已用完</div>
        <div class="ask-tip">您可以去投顾直播间看实时解盘并与老师互动</div>
        <a href="${live_path}/live/" target="_blank" class="goLiveRoom">进入直播</a>
    </div>
    <div id="askSuccess" class="hide">
        <div class="askSuccess-wrap">
            <div class="askSuccess-img"></div>
            <div class="askSuccess-text first">提问成功 !</div>
            <div class="askSuccess-text">如果您的问题<span class="askSuccess-red">12小时</span>内无人回答</div>
            <div class="askSuccess-text">我们将按照付费路径退还（ 提问机会 ）问股金额</div>
        </div>
    </div>
