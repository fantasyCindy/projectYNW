<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div id="relativeChat" class="old hide frame">
        <div class="title">
            <a href="" target="_blank">关于<span class="name"></span><span class="code"></span>的过去问答</a>
        </div>
        <div class="content">
            <div class="line">
                <span class="value up"></span>
                <span class="value down"></span>
            </div>
            <div class="txts">
                <span class="txt up"><span class="value"></span>人看涨</span>
                <span class="txt down"><span class="value"></span>人看跌</span>
            </div>
        </div>
        <div class="items">
            <script type="text/html" id="old-template">
                {{each}}
                <div class="item">
                    <div class="line line1">
                        <a href="/consultation/{{$value.noteid}}.htm">{{$value.questioncontent}}</a>
                    </div>
                    <div class="line line2">
                        <span class="time">{{$value.questiontime}}</span>
                        <span class="answer">
                                        <span class="count">{{$value.answercount}}</span>
                        <span class="txt">人回答</span>
                        </span>
                    </div>
                </div>
                {{/each}}
            </script>
        </div>
    </div>
