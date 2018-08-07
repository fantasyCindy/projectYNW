function ynEditerInit() {
    var ynEditModel = UE.getEditor('ynEditModel', {
        toolbars: [
            ['fontsize', 'bold', 'forecolor', 'emotion', "link", 'simpleupload']
        ],
        initialFrameHeight: 200,
        elementPathEnabled: false,
        wordCount: false,
        enableContextMenu: false,
        enableAutoSave: false,
        pasteplain: true
    });

    //关闭弹层
    $('#ynEditer').on('click', '.overlay,close', function() {
        $(this).parent().hide();
    })

    $('#ynEditer').on('click', '.submit', function() {
        ynEditerSubmit();
    })

}

//关闭弹层
function ynEditerSubmit() {
    //clear
    var container = $('#ynEditer');
    container.hide();
    container.find('input').val("");
    var ue = UE.getEditor('ynEditModel');
    var origin = container.data('origin');
    //submit
    if (origin == "myAnswer") {
        submitMyAnswer();
        return;
    }
    ue.setContent('');
}




// showStockCode('ynEditStockCode', function(data) {
//     var input = $('#insertStockCodeInput');
//     var value = data.stock_code + data.stock_name
//     var html = getStockCodeHtml(data.code, value);
//     var ynEditModel = UE.getEditor('ynEditModel');
//     ynEditModel.focus();
//     ynEditModel.execCommand('insertHtml', html);
// })


function getStockCodeHtml(code, text) {
    var html = '<span style="color:black;text-decoration:none" >$</span>';
    html += '<strong class="insertstockcode" data-insertstockcode="' + code + '" style="color:#D12F2F;text-decoration:underline">' + text + '</strong>';
    html += '<span style="color:black;text-decoration:none" >$</span>'
    return html;
}


function showStockCode(id, callback) {

    $("#" + id).typeahead({
        source: function(query, process) {
            $.get(path + "/html/queryStock.htmlx", {
                stockcode: query
            }, function(_backData) {
                showData = eval(_backData);
                process(showData);
            })
        },
        labeler: ['stock_code'],
        propName: 'stock_code',
        minLength: 3,
        highlighter: function(item) {
            return "" + item.stock_code + " " + item.stock_name + " " + item.pinyin;
        },
        updater: function(item) {
            for (var i = 0; i < showData.length; i++) {
                var checkedData = showData[i];
                var stock_code = checkedData.stock_code;
                if (item == stock_code) {
                    if (callback) {
                        callback(checkedData);
                    }
                    //return checkedData.stock_code + " " + checkedData.stock_name;
                }
            }
        }
    });
}


//我的观点
function showMyOpinion() {
    var statisticsData = { influential: "0", zan_count: "0", viewcount: "0" };
    compile("release");
    addEvent();

    //显示数据
    function compile(type) {
        if (type == "release") {
            console.log("请求我的已发布数据");
            var url = path + "/teacher/html/queryMyView.htmlx";
            $.getJSON(url, { userid: userid, is_draft: 0 }, function(data) {
                console.log("==我的观点数据==");
                console.log(data);
                $('#myOpinion .items').html(template('myOpinion-template', data.bodydata));
                if (data.headdata) {
                    statisticsData = data.headdata
                }
                $('#myOpinion .statistics').html(template('myOpinion-statistics-template', statisticsData));
            })
        }
        if (type == "draft") {
            $.getJSON(path + "/teacher/html/queryMyView.htmlx", { userid: userid, is_draft: 1 }, function(data) {
                draftData = data.bodydata;
                $('#myOpinion .items').html(template('myOpinion-template', draftData));
            })
        }
    }

    //事件
    function addEvent() {
        var opinion = $('#myOpinion');
        var items = opinion.find('.items');
        opinion.on('click', '.action', function() {
            $(this).parent().find('.select').removeClass('select');
            $(this).addClass('select');
            var type = $(this).data('type');
            items.attr('class', "line items " + type);
            compile(type);
        })
    }
}


//删除观点
function deleteOpinion(article_id) {
    showConfirmMsg("确定要删除吗？", function() {
        $.post(path + "/teacher/html/addEditView.htmlx", {
            article_id: article_id,
            is_del: 1
        }, function(data) {
            if (data == "success") {
                showMyOpinion();
            }
        });
    });
}



//提交我的回答
function submitMyAnswer() {
    var container = $('#myAnswer');
    var select = container.find('.action.select');
    if(UE.getEditor('ynEditModel').getContent().trim()==""){
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
            window.location.href=path+"/teacher/html/myAnswerIndex.htmlx"; 
        }
    })
}



//我的回答
function showMyAnswer() {
    var statisticsData = { nowMothcount: "0", like_count: "0", avgtime: "0小时+" };
    addEvent();
    compile("task");


    //显示数据
    function compile(type) {
        if (type == "task") {
            $.getJSON(path + '/teacher/html/queryMyanswer.htmlx', { userid: userid, is_reply: 0 }, function(data) {
                var taskData = data.bodydata;
                $('#myAnswer .items').html(template('myAnswer-task-template', taskData));
                if (data.headdata) {
                    statisticsData = data.headdata;
                }
                $('#myAnswer .topWrap').html(template('myAnswer-statistics-template', statisticsData));
            })
        }
        if (type == "done") {
            $.getJSON(path + '/teacher/html/queryMyanswer.htmlx', { userid: userid, is_reply: 1 }, function(data) {
                var doneData = data.bodydata;
                $('#myAnswer .items').html(template('myAnswer-task-template', doneData));
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
            compile(type);
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
    }
}


//我的直播
function showMyLive() {
    $.getJSON(path+'/teacher/html/queryMyLive.htmlx',{userid:userid}, function(data) {
    	$('#myLive .contentWrap').html(template('myLive-template', data));
    })
}
//进入直播
function goMyLiveRoom() {
    $.ajax({
        url: path + "/teacher/html/openPeriodical.htmlx",
        type: "GET",
        data: {
            "userid": userid
        },
        dataType: 'json',
        success: function(data) {
        	if(data =="-1"){
        		showErrMsg("您不是直播老师！");
        		return;
        	}
        	if(data == "-2"){
        		showErrMsg("您尚未开通直播室！");
        		return;
        	}
            window.location.href = path + "/html/live.htmlx?live&roomid=" + data;
        }
    });
}

//我的自选
function showSelectStock() {
    var data = [{
        stockcode: "00001",
        stockname: "平安银行",
        nowPrice: "12.5",
        money: "2566",
        up: "12.36",
        yesterday: "14.25",
        open: "36.25",
        max: "56.30",
        min: "36.23"
    }, {
        stockcode: "00001",
        stockname: "平安银行",
        nowPrice: "12.5",
        money: "2566",
        up: "12.36",
        yesterday: "14.25",
        open: "36.25",
        max: "56.30",
        min: "36.23"
    }];
    $('#mySelectStock .content').html(template('mySelectStock-template', data));
}


//我的投顾动态
function showMyFeeds() {
    var data = [{
        favicon: "images/favicon.png",
        name: "超越赢家",
        type: "投资达人",
        state: "正在直播",
        title: "战神榜, 科士达还能涨价吗?",
        question: "周先生8问：老师好，我持有成飞集成和天奇股份，目前巨亏30%以上，如何解套",
        subject: "欢迎您莅临超越赢家直播室，超越赢家实战内参虽有良好的战绩可供宣传，但超越赢家觉得获得良好战绩的交易 系统更为重要，建议新朋友，新粉丝能够翻到最前面先了解超越赢家的交易系统...",
        time: "37分钟前",
        device: "约牛手机客户端"
    }, {
        favicon: "images/favicon.png",
        name: "超越赢家",
        type: "投资达人",
        state: "正在直播",
        title: "战神榜, 科士达还能涨价吗?",
        question: "周先生8问：老师好，我持有成飞集成和天奇股份，目前巨亏30%以上，如何解套",
        subject: "欢迎您莅临超越赢家直播室，超越赢家实战内参虽有良好的战绩可供宣传，但超越赢家觉得获得良好战绩的交易 系统更为重要，建议新朋友，新粉丝能够翻到最前面先了解超越赢家的交易系统...",
        time: "37分钟前",
        device: "约牛手机客户端"
    }]

    $('#myFeeds .content').html(template('myFeeds-template', data));
}



//我的投顾
function showMyAdviser() {
    var data = [
        { favicon: "images/favicon.png", name: "张思宁", type: "高级顾问", place: "深圳德兰", value: "A股市场, 行业分析", intro: '2004年进入证券行业，长期致力于金融衍生品的研究和实战操作，坚信专业成就价值，财富助力梦想。2004年进入证券行业，长期致力于金融衍生品的研究和实战操作，坚信专业成就价值，财富助力梦想。2004年进入证券行业，长期致力于金融衍生品的研究和实战操作，坚信专业成就价值，财富助力梦想。' },
        { favicon: "images/favicon.png", name: "张思宁", type: "高级顾问", place: "深圳德兰", value: "A股市场, 行业分析", intro: '2004年进入证券行业，长期致力于金融衍生品的研究和实战操作，坚信专业成就价值，财富助力梦想。2004年进入证券行业，长期致力于金融衍生品的研究和实战操作，坚信专业成就价值，财富助力梦想。2004年进入证券行业，长期致力于金融衍生品的研究和实战操作，坚信专业成就价值，财富助力梦想。' }
    ]
    $('#myAdviser .items').html(template('myAdviser-template', data));
}


function showMyGroup() {

    var incomeData = [{ totalIncome: 1.02, favicon: "images/favicon.png", name: "张海佳", tradeCount: "2", subject: "2016大牛股：只做超级强势股，一般5个交易日能有20-30%的波动幅度..." },
        { totalIncome: 2.02, favicon: "images/favicon.png", name: "张海佳", tradeCount: "3", subject: "2016大牛股：只做超级强势股，一般5个交易日能有20-30%的波动幅度..." },
        { totalIncome: 5.02, favicon: "images/favicon.png", name: "张海佳", tradeCount: "4", subject: "2016大牛股：只做超级强势股，一般5个交易日能有20-30%的波动幅度..." },
        { totalIncome: 6.02, favicon: "images/favicon.png", name: "张海佳", tradeCount: "5", subject: "2016大牛股：只做超级强势股，一般5个交易日能有20-30%的波动幅度..." },
        { totalIncome: 7.02, favicon: "images/favicon.png", name: "张海佳", tradeCount: "6", subject: "2016大牛股：只做超级强势股，一般5个交易日能有20-30%的波动幅度..." }
    ]
    incomeData = _.map(incomeData, function(item, index) {
        item.index = index;
        return item;
    });
    var chartData = [
        [1240185600000, 9.21],
        [1240272000000, 9.39],
        [1240358400000, 9.36],
        [1240444800000, 12.91],
        [1240531200000, 15.70],
        [1240790400000, 15.82],
        [1240876800000, 14.70],
        [1240963200000, 13.88],
        [1241049600000, 10.98],
        [1241136000000, 8.18],
        [1241395200000, 6.87],
        [1241481600000, 8.96],
        [1241568000000, 9.93],
        [1241654400000, 10.44],
        [1241740800000, 10.46],
        [1242000000000, 10.51],
        [1242086400000, 3.77],
        [1242172800000, 17.07],
        [1242259200000, 17.56],
        [1242345600000, 14.49],
        [1242604800000, 15.09],
        [1242691200000, 16.21],
        [1242777600000, 18.98],
        [1242864000000, 17.74],
        [1242950400000, 20.50],
        [1243296000000, 18.68],
        [1243382400000, 19.01],
        [1243468800000, 19.30],
        [1243555200000, 19.40]
    ]

    $('#myGroup .items').html(template('myGroup-template', incomeData));
    $('.chart').each(function(index, element) {
        drawChart('itemChart' + index, chartData);
    })


    function drawChart(id, chartData) {
        $('#' + id).highcharts({
            chart: {
                type: 'area',
                spacingBottom: 10,
                spacingTop: 10,
                width: 250,
                height: 60,
                margin: [0, 0, 0, 0],
                backgroundColor: 'rgb(250,250,250)'
            },
            title: { text: '' },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#aaaaaa'],
                            [1, Highcharts.Color('#ffffff').setOpacity(0).get('rgba')]
                        ]
                    },
                    fillOpacity: 0.5,
                    marker: { radius: 0 }
                }
            },
            credits: { enabled: false },
            series: [{
                name: '收益曲线',
                data: chartData
            }],
            xAxis: {
                categories: 'datatime',
                labels: { enabled: false },
                gridLineWidth: 0,
                lineWidth: 0,
                tickWidth: 0
            },
            yAxis: {
                labels: { enabled: false },
                title: { enabled: false },
                gridLineWidth: 0
            },
            tooltip: { enabled: false },
            legend: { enabled: false }
        });
    }
}



//创建组合
function createGroup() {
    $('#createGroup').on('click', '.line3 .action', function() {
        var line3 = $('#createGroup').find('.line3');
        var type = $(this).data('type');
        line3.find('.action.select').removeClass('select');
        $(this).addClass('select');
        line3.attr('class', 'line line3 ' + type);
    })
}


//我的公告
function showMyNotice() {
    $('#myNotice .submit').click(function() {
        alert("发布")
    })
}




//我的内参
function shoMyRefer() {
    var data = [{ name: "春节大礼包", time: "02月01日-20月29日", feed: "1", opinion: "16", sign: "388.00", unsign: "288.00", text: "1内容包括大盘强弱（成败的关键）提示，个股精选，买卖点分享！有高概率机会提示，没有机会就是没有，不做强推！如果有机会进场，进场后我们会对个股进行跟踪！一次最对做两只，做完一内容包括大盘强弱（成败的关键）提示，个股精选，买卖点分享！有高概率机会提示，没有机会就是没有，不做强推！如果有机会进场，进场后我们会对个股进行跟踪！一次最对做两只，做完一 ..." },
        { name: "春节大礼包", time: "02月01日-20月29日", feed: "1", opinion: "16", sign: "388.00", unsign: "288.00", text: "2内容包括大盘强弱（成败的关键）提示，个股精选，买卖点分享！有高概率机会提示，没有机会就是没有，不做强推！如果有机会进场，进场后我们会对个股进行跟踪！一次最对做两只，做完一内容包括大盘强弱（成败的关键）提示，个股精选，买卖点分享！有高概率机会提示，没有机会就是没有，不做强推！如果有机会进场，进场后我们会对个股进行跟踪！一次最对做两只，做完一 ..." },
        { name: "春节大礼包", time: "02月01日-20月29日", feed: "1", opinion: "16", sign: "388.00", unsign: "288.00", text: "3内容包括大盘强弱（成败的关键）提示，个股精选，买卖点分享！有高概率机会提示，没有机会就是没有，不做强推！如果有机会进场，进场后我们会对个股进行跟踪！一次最对做两只，做完一内容包括大盘强弱（成败的关键）提示，个股精选，买卖点分享！有高概率机会提示，没有机会就是没有，不做强推！如果有机会进场，进场后我们会对个股进行跟踪！一次最对做两只，做完一 ..." }
    ]

    $('#myRefer .items').html(template('myRefer-template', data));

    //发售新的内参
    $('#newRefer').click(function() {
        layer.open({
            type: 1,
            title: "发售新投资内参",
            offset: "200px",
            scrollbar: false,
            area: ["500px", "300px"],
            moveType: 1,
            content: '<div style="color:red">Hello world</div>'
        })
    })

    //删除
    $('#myRefer .delete').click(function() {
        alert("Ok")
    })

}



//个人设置
function showSetting() {
    $('#setting').on('click', '.titleBar td', function() {
        $(this).parent().find('.select').removeClass('select');
        $(this).addClass('select');
    })

    $('#setting').on('click', '.editButton', function() {
        alert('OK');
    })

    function compileData(type) {
        if (type == "sign") {

            return;
        }
        if (type == "edit") {

        }
    }
}


//发布观点 或 修改观点
function postAdviser(article_id) {
		$("#myOpinion").hide();
		$("#postAdviser").show();
    var ue = UE.getEditor('ueditContainer', {
        toolbars: [
            ['fontsize', 'bold', 'forecolor', 'emotion', "link", 'simpleupload']
        ],
        initialFrameHeight: 200,
        elementPathEnabled: false,
        wordCount: false,
        enableContextMenu: false,
        enableAutoSave: false,
        pasteplain: true
    });
    
    if(article_id){
    	//回填数据
    	var item = $('#'+article_id);

    	//获取
    	var typeid = item.find('.type').data('typeid');
    	var link = item.find('#link').attr('href');
    	var ueContent = item.find('.content').text();
    	var title = item.find('.title a').text();
    	
    	
    	//设置
    	var pub = $('#postAdviser');
    	pub.find('#link-input').val(link);
    	pub.find('#field-title').val(title);
    	pub.find('.types .select').removeClass('select');
    	pub.find('.types .type').eq(typeid).addClass('select');
    	ue.addListener("ready", function () {
    		ue.setContent($.trim(ueContent));
    	});	
    }

    var container = $('#postAdviser');
    //栏目
    container.on('click', '.type', function() {
        $(this).parent().find('.select').removeClass('select');
        $(this).addClass('select');
    })

    container.on('click', '.deleteTag', function() {
        $(this).parents('.tag').remove();
    })

    //保存
    container.on('click', '.saveButton', function() {
        //获取表达数据
        var send = {
            content: ue.getContent(),
            title: container.find('#field-title').val(),
            tags: function() {
                var result = ''
                var len = container.find('.tag').length;
                container.find('.tag').each(function(index, element) {
                    if (index + 1 == length) {
                        result += $(this).text()
                    } else {
                        result += $(this).text() + ","
                    }
                })
            }(),
            link: $('#link-input').val(),
            classify: container.find('.type.select').index(),
            is_draft: 1,
            article_id:article_id
        }
        $.post(path + "/teacher/html/addEditView.htmlx", send, function() {
            showTipsMsg("保存成功");
            window.location.href=path+"/teacher/html/myViewIndex.htmlx"; 
        });

    })

    //发布
    container.on('click', '.publishButton', function() {
        //获取表达数据
        var send = {
            content: ue.getContent(),
            title: container.find('#field-title').val(),
            tags: function() {
                var result = ''
                var len = container.find('.tag').length;
                container.find('.tag').each(function(index, element) {
                    if (index + 1 == length) {
                        result += $(this).text()
                    } else {
                        result += $(this).text() + ","
                    }
                })
            }(),
            link: $('#link-input').val(),
            classify: container.find('.type.select').index(),
            is_draft: 0
        }
        console.log(send);
        $.post(path + "/teacher/html/addEditView.htmlx", send, function() {
            showTipsMsg("发布成功");
            window.location.href=path+"/teacher/html/myViewIndex.htmlx";  
        });

    })
    
}
function dataBackfillOpinion(){
	$.post("",{},function(){
		
	});
}


function createLabel(input) {
    input = $(input);
    if ($('#postAdviser .tag').length >= 5) {
        return;
    }

    var content = input.val();
    var hasBlank = content.match(/\s+/g);
    if (!hasBlank) {
        return;
    }
    var match = content.match(/[^\s]+/g);
    if (match) {
        input.val("")
        var tags = '<td class="tag"><span class="value">' + match[0] + '</span><i class="deleteTag fa fa-times"></i></td>';
        $('#labels .tags').append(tags);
    }

}
