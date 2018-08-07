<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!-- 组合列表 -->
    <script type="text/html" id="composite-item-template">
        {{each}}
        <div class="item relative status{{$value._status}} {{$value._endStyle}}">
            <div class="item-status-icon absolute"></div>
            <div class="item-left">
                <div class="state state{{$value._stateValue}}">{{$value._state}}</div>
                <div class="avatar trigger-info" data-userid={{$value.create_id}}>
                    <img src="{{$value.photo}}" />
                </div>
                <div class="name">
                    <span class="txt">{{$value.teacherName}}</span>
                    <span class="fa fa-vimeo-square"></span>
                </div>
            </div>
            <div class="item-right">
                <div class="title">
                    <span class="txt">{{$value.combination_name}}</span>
                    <span class="type">{{$value._style}}</span>
                </div>
                <div class="content">
                    <span class="txt">{{$value._content}}</span>
                </div>
                <div class="info">
                    <div class="inline info-item">
                        <span class="txt">{{$value._incomeText}}</span>
                        <span class="value">{{#$value._income}}</span>
                    </div>
                    <div class="inline info-item">
                        <span class="txt">最长期限</span>
                        <span class="value gray">{{$value.combination_maxterm}}</span>
                        <span class="txt">天</span>
                    </div>
                    <div class="inline info-item">
                        <span class="txt">订阅价:</span>
                        <span class="value gray">{{$value.order_price}}</span>
                        <span class="txt">牛币</span>
                    </div>
                    <div class="inline info-item action">
                        <div id="" class="start">{{#$value._time}}</div>
                        <div class="buttons">{{#$value._feed}}</div>
                    </div>
                </div>
            </div>
        </div>
        {{/each}}
    </script>
