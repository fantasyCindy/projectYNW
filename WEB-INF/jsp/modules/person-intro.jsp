<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <div id="personIntro" class="hide">
        <span id="personIntro-indicate-right" class="indicate right fa fa-caret-right hide"></span>
        <span id="personIntro-indicate-left" class="indicate left fa fa-caret-left hide"></span>
        <div class="items"></div>
    </div>
    <script type="text/html" id="personIntro-template">
        <div class="line infoView">
            <div class="column column1">
                <div class="avatar">
                    <img src="{{photo}}" />
                </div>
            </div>
            <div class="column column2">
                <div class="title">
                    <span class="name">{{username}}</span>
                    <i class="fa fa-vimeo-square"></i>
                    <span class="postion">投资顾问</span>
                </div>
                <div class="buttons">
                    <button class="care {{_isCare}}">{{_careText}}</button>
                    <button class="sign">签约</button>
                </div>
                <div class="style">{{_style}}</div>
            </div>
        </div>
        <div class="line countView">
            <table>
                <tr>
                    <td>人气</td>
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
            </table>
            <a class="ynbtn live-link" href="{{_link}}" target="_blank">看TA直播</a>
        </div>
    </script>
