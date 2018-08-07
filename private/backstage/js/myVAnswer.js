//提交我的回答
function submitMyAnswer() {
    var container = $('#myAnswer');
    var select = container.find('.action.select');
    if (UE.getEditor('ynEditModel').getContent().trim() == "") {
        showErrMsg("回答内容不能为空");
        return;
    }
    var send = {
        noteid: select.data('noteid'),
        answercontent: UE.getEditor('ynEditModel').getContent()
    }
    var url = path + "/teacher/html/answer.htmlx";
    $.post(url, send, function(data) {
        if (data = 'success') {
            showTipsMsg("回答成功");
            window.location.href = path + "/teacher/html/myAnswerIndex.htmlx";
        }
    })
}

//我的问答
function showMyAnswer() {
    var pageSize = 10;
    var statisticsData = { nowMothcount: "0", like_count: "0", avgtime: "0小时+" };
    $('#myAnswer .topWrap').html(template('myAnswer-statistics-template', statisticsData));
    addEvent();
    compile("task", 1);


    //页码更新
    myBootpag.bootpag('page', function(e, number) {
        alert("OOO")
        var type = $('.action.select').data('type');
        alert(number)
        compile(type, number);
    })


    function compile(type, currentPage) {

        //待解答咨询
        if (type == "task") {
            $.getJSON(path + '/teacher/html/queryMyanswer.htmlx', { userid: userid, is_reply: 0, pageSize: pageSize, currentPage: currentPage }, function(data) {
                if (data == "-1") {
                    showErrMsg("身份信息有误，请联系客服！");
                    return;
                }
                $('#myAnswer .items').html(template('myAnswer-task-template', data.bodydata));
                //设置页码
                if (data.headdata) {
                    statisticsData = data.headdata;
                    var total = Math.ceil(statisticsData.noanswercount / pageSize);
                    if (total <= 1) total = 1;
                    myBootpag.bootpag({ page: currentPage, total: total })
                }
                $('#myAnswer .topWrap').html(template('myAnswer-statistics-template', statisticsData));


            })
        }

        //已解答咨询
        if (type == "done") {
            $.getJSON(path + '/teacher/html/queryMyanswer.htmlx', {
                userid: userid,
                is_reply: 1,
                pageSize: pageSize,
                currentPage: currentPage
            }, function(data) {
                var doneData = data.bodydata;
                $('#myAnswer .items').html(template('myAnswer-task-template', doneData));
                if (data.headdata) {
                    var total = data.headdata.alreadycount / pageSize;
                    if (total <= 1) {
                        total = 1;
                    }
                    myBootpag.bootpag({ page: currentPage, total: total })
                }
            })
        }
    }


    //事件
    function addEvent() {
        var container = $('#myAnswer');
        var items = container.find('.items');
        container.on('click', '.itemsHead .action', function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
            var type = $(this).data('type');
            items.attr('class', "line items " + type);
            compile(type, 1);
        })

        //点击回答
        $('#myAnswer').on('click', '.yes', function() {
            $('#myAnswer .action.select').removeClass('select');
            $(this).addClass('select');
            var edit = $('#ynEditer');
            edit.data('origin', 'myAnswer');
            var overlay = $('#ynEditer .overlay');
            overlay.width($(window).width());
            overlay.height($(window).height());
            edit.show()
        })

        //页码切换
        myBootpag.on('page', function(e, n) {
            var type = $('.action.select').data('type');
            compile(type, n);
        })
    }
}
