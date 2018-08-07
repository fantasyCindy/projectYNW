<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <script id="answer-list-template" type="text/html">
        {{each}}
        <div class="answer-list-item" data-id={{$value.noteid}}>
            <div class="question">
                <a href="${ask_path}consultation/{{$value.noteid}}.htm"  target="_blank" class="value">{{#$value.questioncontent}}</a>
                <span class="trend"></span>
            </div>
            <div class="answer">
                <a  href="${ask_path}consultation/{{$value.noteid}}.htm"  target="_blank"  class="value">{{$value.answercontent}}</a>
            </div>
            <div class="info">
                <span class="time">{{$value.answertime}}</span>
                <span class="view">
                    <i class="yn-icon-view"></i>
                    <span class="count">{{$value.note_readcount}}</span>
                </span>
                <span class="comment hide">
                    <i class="yn-icon-comment"></i>
                    <span class="count"></span>
                </span>
                <span class="type hide">
                    <i class="yn-icon-note"></i>
                    <span class="value"></span>
                </span>
            </div>
        </div>
        {{/each}}
    </script>
