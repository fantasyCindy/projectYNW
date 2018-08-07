<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <script type="text/html" id="tableView-template">
        {{each}}
        <div class="tableView-item">
            <a class="tableView-title" href="{{$value._link}}" target="_blank">
                <span class="value">{{$value._title}}</span>
            </a>
            <a class="tableView-content {{$value._class_content}}" href="{{$value._link}}" target="_blank">{{$value._content}}</a>
            <div class="tableView-info">
                <span class="time {{$value._class_time}}">{{$value._time}}</span>
                <span class="view {{$value._class_view}}">
                    <span class="txt">阅读</span>
                <span class="value">{{$value._count_view}}</span>
                </span>
                <span class="zan {{$value._class_zan}}">
                        <span class="txt">赞</span>
                <span class="value">{{$value._count_zan}}</span>
                </span>
                <span class="comment {{$value._class_comment}}">
                     <span class="txt">评论</span>
                <span class="value">{{$value._count_comment}}</span>
                </span>
            </div>
        </div>
        {{/each}}
    </script>
