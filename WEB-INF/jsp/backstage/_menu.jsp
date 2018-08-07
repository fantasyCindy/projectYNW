<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <div class="left">
        <div id="centerMenu">
            <div class="title">
                <span class="name"></span>
                <span class="icon down fa fa-caret-down"></span>
            </div>
            <div class="items"></div>
            <script id="backstage-template" type="text/html">
                {{each}}
                <a class="item" id="{{$value.menu_id}} " href="/{{$value.menuurl}}">
                    <span class="txt ">{{$value.menuname}}</span>
                    <i class="fa fa-angle-right "></i>
                </a>
                {{/each}}
            </script>
        </div>
    </div>
    


