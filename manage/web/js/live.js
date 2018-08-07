$(function() {
    //获取热门直播室
    getHotHomes();
    //获取最新咨询
    getLastedNote();
    //获取人气上升排行
    /*$.ajax({
	  url: path+"/html/popuBroadCastingList.htmlx?callback=?",
	  dataType: 'jsonp',
   	  jsonp: 'jsoncallback',
	  success: function(data) {
		  	$("#popu_broadcast_list").html("");
			for(var i=0;i<data.length;i++){
				var _html = getPopuRoomHtml(data[i]);
				$("#popu_broadcast_list").append(_html);
			}
	  },
	  error: function(d,msg) {
	  		
	  }
	});*/
    //获取精彩博文
    wonderfulArticleFunction();
    //热门资讯
    getHotArticleMethod();
    //视频课程
    getVideoMethod();
    //热门直播室换一换
    $("#hot_home_changes").click(function() {
        getHotHomes();
    });
    //最新咨询换一换
    $("#lasted_note_changes").click(function() {
        getLastedNote();
    });
    //视频课程换一换
    $("#video_changes").click(function() {
        getVideoMethod();
    });
    //热门资讯换一换
    $("#hot_article_changes").click(function() {
        getHotArticleMethod();
    });
    //精彩博文换一换
    $("#wonderful_article_changes").click(function() {
        wonderfulArticleFunction();
    });
});


 console.log("======index.js=====");


var home_page = 1;
var home_rows = 8;

function getHotHomes() {
    $.ajax({
        url: path + "/html/broadcastingList.htmlx?callback=?",
        data: { order: "", sort: "", page: home_page, rows: home_rows },
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function(data) {
            home_page++;
            var _length = data.length;
            if (_length != 0) {
                $("#live_list_ul").html("");
            }
            for (var i = 0; i < _length; i++) {
                var _html = getLiveHtml(data[i]);
                $("#live_list_ul").append(_html);
            }
            if (_length < home_rows && home_page > 2) {
                home_page = 1;
            }
        },
        error: function(d, msg) {

        }
    });
}
var note_page = 1;
var note_rows = 6;

/**
 * [getLastedNote description]
 * @return {[type]} [description]
 */
function getLastedNote() {
    $.ajax({
        url: path + "/html/noteList.htmlx?callback=?",
        data: { page: note_page, rows: note_rows },
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function(data) {
            note_page++;
            var _length = data.length;
            if (_length != 0) {
                $("#note_list_div").html("");
            }
            for (var i = 0; i < data.length; i++) {
                var _html = getNoteHtml(data[i]);
                $("#note_list_div").append(_html);
            }
            if (_length < note_rows && note_page > 2) {
                note_page = 1;
            }
        },
        error: function(d, msg) {

        }
    });
}
var video_page = 1;
var video_rows = 4;

function getVideoMethod() {
    $.get(path + "/video/list.htm", { pageSize: video_rows, currentPage: video_page }, function(data) {
        eval("var data = " + data);
        video_page++;
        var _length = data.length;
        if (_length != 0) {
            $("#video_list").html("");
        }
        for (var i = 0; i < data.length; i++) {
            var _html = getVideo(data[i], (i + 1));
            $("#video_list").append(_html);
        }
        if (_length < video_rows && video_page > 2) {
            video_page = 1;
        }
        $("#pic_list_1").cxScroll();
    });
}
var hot_article_page = 1;
var hot_article_rows = 3;

function getHotArticleMethod() {
    $.get(path + "/article/rmzxList.htm", { pageSize: hot_article_rows, currentPage: hot_article_page }, function(data) {
        eval("var data = " + data);
        hot_article_page++;
        var _length = data.length;
        if (_length != 0) {
            $("#hot_Article").html("");
        }
        for (var i = 0; i < data.length; i++) {
            var _html = getHotArticle(data[i]);
            $("#hot_Article").append(_html);
        }
        if (_length < hot_article_rows && hot_article_page > 2) {
            hot_article_page = 1;
        }
    });
}
var won_article_page = 1;
var won_article_rows = 5;

function wonderfulArticleFunction() {
    $.ajax({
        url: path + "/html/lastedArticle.htmlx?callback=?",
        dataType: 'jsonp',
        data: { page: won_article_page, rows: won_article_rows },
        jsonp: 'jsoncallback',
        success: function(data) {
            won_article_page++;
            var _length = data.length;
            if (_length != 0) {
                $("#articles_list_ul").html("");
            }
            for (var i = 0; i < data.length; i++) {
                var _html = getArticleHtml(data[i]);
                $("#articles_list_ul").append(_html);
            }
            if (_length < won_article_rows && won_article_page > 2) {
                won_article_page = 1;
            }
        },
        error: function(d, msg) {

        }
    });
}
//拼接直播室
function getLiveHtml(_obj) {
	 console.log("拼接直播室");
    var _content = _obj.content;
    if (_content && _content.length > 18) {
        _content = _content.substring(0, 18) + "...";
    }
    var _html = "";
    _html += "<li class='item'>";
    _html += "<div class='row'>";
    _html += "<a href='" + path + "/html/live.htmlx?roomid=" + _obj.roomid + "'>";
    _html += "<div class='col-xs-4 teacher_head'>";
    _html += "<img src='" + path + _obj.photo + "'/>";
    _html += "</div>";
    _html += "</a>";
    _html += "<div class='col-xs-8 teacher_state'>";
    _html += "<h4><a href='" + path + "/html/live.htmlx?roomid=" + _obj.roomid + "'>" + _obj.title + "</a></h4>";
    //_html+="<p class='fans'><img src='"+path+"/web/images/xz.png'/> <span>粉丝:</span><a>"+_obj.attentionnumber+"</a></p>";
    _html += "<span class='tag'>" + _obj.content + "</span>";
    _html += "<div class='actions'><span class='action'>价值投资</span><span class='action'>个股挖掘</span><span class='action'>短线交易</span></div>";
    _html += "</div>";
    _html += "</div>";
    _html += "</li>";
    return _html;
}

//拼接大金矿
function getVipBrodcastHtml(_obj) {
    var _html = "";
    _html += "<li>";
    _html += "<div class='col-xs-2'><img style='width:42px;height:42px;' src='" + path + _obj.productImg + "'></div>";
    _html += "<div class='col-xs-10'>";
    _html += "<p>" + _obj.name + "<span class='time'>" + _obj.createTimeStr + "</span></p>";
    _html += "<span>" + _obj.productInfoShort + "</span>";
    _html += "</div>";
    _html += "</li>";
    return _html;
}
//拼接精彩博文
function getArticleHtml(_obj) {
    var _html = "";
    _html += "<li><a href='" + path + "/html/articleDetail.htmlx?article_id=" + _obj.article_id + "' target='_black'>";
    _html += "<h4>《" + _obj.title + "》</h4>";
    _html += "</a>";
    _html += "<p class='right'>..." + _obj.createrName + "<span>" + _obj.create_timeStr + "</span>发表</p>";
    _html += "</li>";
    return _html;
}
//拼接最近咨询
function getNoteHtml(_obj) {
    var _html = "";
    _html += "<li>";
    _html += "<p><span>【问】</span><a>" + _obj.questioncontent + "</a></p>";
    _html += "<p><span>【答】</span><a>" + _obj.answercontent + "</a></p>";
    _html += "<p class='right'><a>" + _obj.liveRoomName + "直播室</a><a href='" + path + "/html/live.htmlx?roomid=" + _obj.roomid + "' style='cursor:pointer;'>去咨询</a></p>";
    _html += "</li>";
    return _html;
}
//拼接人气上升排行
function getPopuRoomHtml(_obj) {
    var _html = "";
    _html += "<li><a href='" + path + "/html/live.htmlx?roomid=" + _obj.roomid + "' target='_black'>" + _obj.title + "</a></li>";
    return _html;
}
//拼接热门资讯
function getHotArticle(_obj) {
    var _content = _obj.content;
    if (_content.length > 80) {
        _content = _content.substring(0, 80) + "....";
    }
    var _html = "";
    _html += "<li>";
    _html += "<div class='row'>";
    _html += "<div class='col-xs-2 teacher_head'>";
    if (_obj.title_img != null && _obj.title_img != "") {
        _html += "<img src='" + path + _obj.title_img + "'/>";
    } else {
        _html += "<img src='" + path + "/article/images/news.png'>";
    }
    _html += "</div>";
    _html += "<div class='col-xs-10 teacher_state'>";
    _html += "<a href='" + path + _obj.link + "' target='_black'>";
    _html += "<h4 class='title'>" + _obj.title + "</h4>";
    _html += "<span class='subtitle'>" + _content + "</span></a>";
    _html += "<div><a>约牛网</a><span> " + _obj.publish_timeStr + "</span></div><div><a><i class='fa fa-eye'></i>" + _obj.viewcount + "次</a></div>";
    _html += "</div>";
    _html += "</div>";
    _html += "</li>";
    return _html;
}
//拼接视频
function getVideo(_obj, _index) {
    var _html = "";
    _html += "<li class='list_video_" + _index + "'>";
    _html += "<div><h2><a href='" + path + "/video/detail.htm?video&videoId=" + _obj.video_id + "' target='_blank'>";
    _html += "<span>" + _obj.title + "</span></a>";
    _html += "<img src='" + path + "/web/images/video_play.png'/></h2><p><span>讲师：</span>";
    _html += "<a href='' target='_blank'>" + _obj.teacherName + "</a></p></div></li>";
    return _html;
}
