//我的观点
$(function() {

    //菜单
    yn.centerMenu.init();
    yn.centerMenu.render({ type: "my" });

    var judgeStockWrap = $("#judge-stockWrap");
    var judgeStockCode = $("#judge-stockcode");
    var judgeStockName = $("#judge-stockname");


    var Group = function() {
        this.list = [];
    }

    Group.prototype = {
        show: function() {
            _.forEach(this.list, function(item) {
                item.show();
            })
        },
        hide: function() {
            _.forEach(this.list, function(item) {
                item.hide();
            })
        },
        validate: function() {
            var result = _.map(this.list, function(item) {
                return item.validate();
            })

            //综合验证结果
            var verify = _.compact(result).length == this.list.length;

            //显示错误信息
            if (!verify) {
                layer.msg(this.list[_.indexOf(result, false)].errorMsg)
            }

            return verify
        },
        add: function(item) {
            this.list.push(item);
        }
    }

    var GroupItem = function(element, errorMsg) {
        this.element = element;
        this.father = element.parent();
        this.errorMsg = errorMsg
    }

    GroupItem.prototype = {
        validate: function() {
            if (this.element.get(0).tagName == "INPUT") {
                var val = this.element.val();
                return !!val
            }
        },
        show: function() {
            this.father.show();
        },
        hide: function() {
            this.father.hide();
            this.reset();
        },
        getVal: function() {
            if (this.element.get(0).tagName == "INPUT") {
                return this.element.val();
            }
        },
        reset: function() {
            if (this.element.get(0).tagName == "INPUT") {
                this.element.val("");
            }
        }
    }

    //标题
    var input_title = new GroupItem($("#field-title"), "标题不能为空");
    input_title.reset = function() {}

    //预测
    var input_judge = new GroupItem($("#judgeItems"), "请对股票进行判断");
    input_judge.validate = function() {
        return this.element.find('.select').length > 0;
    }
    input_judge.getVal = function() {
        return this.element.find('.select').data('value');
    }
    input_judge.reset = function() {
        return this.element.find('.select').removeClass('select');
    }

    //股票
    var selectStock = new GroupItem(judgeStockWrap, "请选择预测股票");
    selectStock.show = function() {
        this.element.hide();
    }
    selectStock.reset = function() {
        judgeStockName.text('')
        judgeStockCode.text('')
    }
    selectStock.validate = function() {
        return !!judgeStockCode.text()
    }

    //推广标签
    var input_tag = new GroupItem($("#tag-input"), "请输入推广标签");
    input_tag.father = $("#tag-input-parent");
    input_tag.validate = function() {
        return true;
    };


    //观点解读
    var input_link = new GroupItem($("#link-input"), "请输入观点解读链接");
    input_link.validate = function() {
        return true;
    }

    //个股表单组合
    var form_stock = new Group();
    form_stock.add(input_title);
    form_stock.add(selectStock);
    form_stock.add(input_judge);

    //版块表单组合
    var form_plate = new Group();
    form_plate.add(input_title);
    form_plate.add(input_link);
    form_plate.add(input_tag);

    form_plate.show();

    //根据字符获取引用
    function getForm(formType) {
        var form = {
            form_stock: form_stock,
            form_plate: form_plate
        }
        return form[formType];
    }

    //切换表单
    function changeForm(el) {
        yn.switch(el);
        form_plate.hide();
        form_stock.hide();

        var currentType = el.data('form');
        pub.formType = currentType;

        var currentForm = getForm(currentType);
        currentForm.show();
    }

    //显示股票列表
    yn.showStockList('#stock-judge', {
        onSelect: function(item) {
            $("#stock-judge").val("");
            judgeStockWrap.show();
            judgeStockCode.text(item.stockCode);
            judgeStockName.text(item.stockName);
        }
    })

    var myOpinion = $('#myOpinion');

    // 发布观点
    $('#postOpinion').click(function() {
        myOpinion.hide();
        pub.render();
        pub.id = null
    })

    //页码
    var myBootpag = yn.bootpag(myOpinion)
    myBootpag.on('page', function(e, num) {
        titles.current.page = num;
        titles.current.render();
        $('body').velocity("scroll", { duration: 750, offset: 0 })
    })


    //标题栏
    var titles = function() {
        var _this = this;
        var container = $('.itemsHead');

        //切换
        container.on('click', 'td', function() {
            yn.switch($(this));
            var types = {
                published: published,
                draft: draft
            }
            var type = $(this).data('type');
            _this.current = types[type];
            _this.current.render();
        })

        return {
            current: null
        }
    }()


    /**
     * 已发布观点
     * render()
     * delegate.done(data)
     * delegate.modify(data)
     */
    var published = function() {
        var container = $("#opinion-list"),
            isDraft = false,
            row = 20,
            publishedData = null

        //修改
        container.on('click', '.modify', function() {
            var index = $(this).parents('.item').index();
            var data = publishedData[index];
            published.delegate.modify(data);
        })

        return {
            page: 1,
            render: function() {
                var _this = this;
                yndata.getMyOpinion({ page: this.page, row: row, isDraft: isDraft }).done(function(data) {
                    console.log("已经发布观点", data)
                    publishedData = data.bodydata;
                    container.html(template("myOpinion-template", data.bodydata));
                    myBootpag.bootpag({ page: _this.page, total: data.pageNumber });
                    _this.delegate.done(data);
                })
            },
            delegate: {
                done: function() {},
                modify: function() {}
            }
        }
    }()


    /**
     * 统计数据
     */
    var statistics = function() {
        var container = $('.statistics');
        return {
            render: function(data) {
                container.html(template('myOpinion-statistics-template', data.headdata));
            }
        }
    }()


    /**
     * 草稿箱
     * render()
     * deleate.edit(data)
     */
    var draft = function() {
        var container = $("#opinion-list"),
            editBtn = $("#editButton"),
            isDraft = true,
            row = 20,
            draftData = null

        //编辑观点
        container.on('click', '.action-edit', function() {
            var index = $(this).parents('.item').index();
            var data = draftData[index];
            draft.delegate.edit(data);
        })

        //删除观点
        container.on('click', '.action-delete', function() {
            var id = $(this).data('id');
            var item = $(this).parents('.item');
            yndata.removeOpinion(id).done(function() {
                item.remove();
            });
        })

        return {
            page: 1,
            render: function() {
                var _this = this;
                yndata.getMyOpinion({ page: this.page, row: row, isDraft: isDraft }).done(function(data) {
                    console.log("草稿箱", data)
                    draftData = data.bodydata;
                    container.html(template("draft-template", data.bodydata));
                    myBootpag.bootpag({ page: _this.page, total: data.pageNumber });
                })
            },
            delegate: {
                edit: function() {}
            }
        }
    }()

    //发布观点
    var pub = function() {
        var container = $('#postAdviser')

        //初始化编辑器
        var ue = UE.getEditor('ueditContainer', {
            toolbars: [
                [
                    'bold', //加粗
                    'forecolor',
                    'indent', //首行缩进
                    'snapscreen', //截图
                    'removeformat', //清除格式
                    'simpleupload', //单图上传
                    'justifyleft', //居左对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'fullscreen', //全屏
                    'imagecenter', //居中
                    'lineheight' //行间距
                ]
            ],
            initialFrameHeight: 600,
            elementPathEnabled: false,
            wordCount: false,
            enableContextMenu: false,
            enableAutoSave: false,
        })

        //观点分类
        var noteTypes = $("#noteTypes");

        //观点分类, 不同的栏目显示不同的分组
        noteTypes.on('click', '.item', function() {
            changeForm($(this));
        });


        //看涨看跌
        container.on('click', '.judgeItem', function() {
            yn.switch($(this));
        });

        //删除tag
        container.on('click', '.deleteTag', function() {
            $(this).parents('.tag').remove();
        });

        //推广标签格式化
        container.on('keyup', '#tag-input', function() {
            input = $(this);
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
                input.val("");
                var tags = '<td class="tag"><span class="value">' + match[0] + '</span><i class="deleteTag fa fa-times"></i></td>';
                $('#labels .tags').append(tags);
            }
        });

        return {
            type: 0,
            id: null,
            data: null,
            formType: 'form_stock',
            render: function(data) {
                container.show();

                //数据回填
                if (data) {
                    pub.data = data;
                    pub.id = data.article_id;
                    container.find('.types .select').removeClass('select');
                    $("#field-title").val(data.title) //标题

                    //分类
                    noteTypes.find('.item').each(function(index, element) {
                        $(this).attr('class', 'item');
                        if (index == +data.classify) {
                            changeForm($(this));
                        }
                    });
                    ue.setContent(data.content); //内容

                    //鉴股
                    if (data.stock_trend !== "") {
                        $('.judgeItem' + data.stock_trend).addClass('select');
                        judgeStockWrap.show();
                        judgeStockCode.text(data.stockcode);
                        judgeStockName.text(data.stockname)
                    }
                }
            },
            getValues: function() {
                var category = noteTypes.find('.item.select');

                //验证
                var form = getForm(category.data('form'));
                if (!form.validate()) {
                    return;
                }

                var content = $.trim(ue.getContent());
                if (content === "") {
                    layer.msg("内容不能为空");
                    return;
                }

                return {
                    title: input_title.getVal(),
                    content: content,
                    tags: function() {
                        var result = [];
                        $('td.tag').each(function(index, element) {
                            result.push($(this).text());
                        });
                        return result.join(',');
                    }(),
                    link: input_link.getVal(),
                    classify: category.data('value'),
                    article_id: pub.article_id,
                    stockcode: judgeStockCode.text(),
                    stockname: judgeStockName.text(),
                    stock_trend: input_judge.getVal(),
                    create_time: yn.now({ pad: true, join: true }),
                    type: pub.type
                };
            }
        };
    }();


    //发布按钮
    var buttons = function() {
        var container = $('.buttons');
        var saveBtn = container.find('.saveButton');
        var pubBtn = container.find('.publishButton');

        //发布
        pubBtn.click(_.debounce(function() {
            var send = pub.getValues();

            //修改已发布
            if (pub.id) {
                send.article_id = pub.id;
                send.create_time = pub.data.create_time //保持发布时间
            }

            yndata.postOpinion(send, { is_draft: 0 }).done(function() {
                window.location.reload();
            });
        }, 2000, { 'leading': true, trailing: false }));


        //保存
        saveBtn.click(_.debounce(function() {
            var send = pub.getValues();
            send.article_id = pub.id
            yndata.postOpinion(send, { is_draft: 1 }).done(function() {
                window.location.reload();
            });
        }, 2000, { 'leading': true, trailing: false }));

    }();




    /////////////////////////////////////////////////////////////////////


    published.render();
    published.delegate.done = function(data) {
        titles.current = published;
        statistics.render(data);
    };
    published.delegate.modify = function(data) {
        myOpinion.hide();
        pub.type = 1;
        pub.render(data);
    };
    draft.delegate.edit = function(data) {
        myOpinion.hide();
        pub.type = 0;
        pub.render(data);
    };
})
