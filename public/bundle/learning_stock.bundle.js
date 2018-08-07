/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var myCrop = __webpack_require__(1);

	/*///////////////////////////////////////////////////////////////////*/

	var categorys = ["名家战法", "五分钟学炒股 ", "投资心理", "股票百科"];

	var onEnter = function onEnter() {}
	//回车事件


	//回车添加标签
	;document.onkeydown = function (e) {
	    if (e.keyCode == 13) {
	        if (typeof onEnter == "function") {
	            onEnter();
	        }
	    }
	};

	//资讯列表
	var list = function () {
	    var container,
	        head,
	        items,
	        ids = '',
	        title = '',
	        classif = '',
	        page = 1,
	        row = 12,
	        itemsData = [],
	        bootpag,
	        group,
	        categoryVal = '';
	    var event = function event() {
	        //改变每页条数
	        $('#branches').on('change', function () {
	            page = 1;
	            row = $(this).val();
	            list.render();
	        });
	        //删除
	        container.on('click', '.delete', function () {
	            var id = $(this).data('id');

	            layer.confirm("您真的要删除吗?", function (index) {
	                $.post('/learning/del.do', { ids: id }, function (data) {
	                    list.render();
	                    layer.close(index);
	                });
	            });
	        });
	        //全选
	        $('#checkAll').click(function () {
	            var input = $(this).get(0);
	            items.find('input').each(function () {
	                this.checked = input.checked;
	            });
	        });

	        //编辑
	        container.on('click', '.edit', function () {
	            var index = $(this).data('index');
	            var itemData = itemsData[index];
	            menu.show('publish', { data: itemData });
	        });

	        //查询
	        group.on('click', '.btn-inquire', function () {
	            page = 1;
	            title = group.find('input.input_title').val();

	            // 获取分类value
	            categoryVal = $('#list .category1.show').val();
	            list.render();
	        });

	        $('.addTagInput').focus(function () {
	            onEnter = function onEnter() {
	                // alert("enter")
	                var text = $('.addTagInput').val();
	                if (!text) {
	                    return layer.msg('请输入标签');
	                }
	                if (text.length > 6) {
	                    return layer.msg('最多输入6个字');
	                }
	                var length = $('.exist .exist-name').length;
	                if (length > 2) {
	                    $('.addTagInput').val('');
	                    return layer.msg('最多添加3个标签');
	                }
	                $('.exist').append("<span class=\"exist-name\">" + text + "<i class=\"fa fa-times removeTag\" aria-hidden=\"true\"></i></span>");
	                $('.addTagInput').val('');
	            };
	        }).blur(function () {
	            onEnter = null;
	        });

	        //删除标签
	        $('.exist').on('click', '.removeTag', function () {
	            $(this).parent('.exist-name').remove();
	        });

	        // 置顶
	        var key_layer = $('#list .key-layer');
	        var key = $('#list .layer-select');
	        var articleid, title, image, content, keywords;
	        container.on('click', '.toTop', function () {
	            var index = $(this).parents('.item').index();
	            var data = DATA[index];
	            articleid = data.article_id;
	            title = data.title;
	            image = data.title_img;
	            content = data.content;
	            key_layer.show();
	        });
	        $('#list .layer-btn').on('click', function () {
	            content = $('.editContent textarea').val();
	            title = $('.editTitle input').val();
	            keywords = key.val();
	            if (!title) {
	                return layer.msg('请输入标题');
	            }
	            if (!content) {
	                return layer.msg('请输入内容');
	            }
	            var str = "";
	            $('.exist-name').each(function () {
	                str += $(this).text() + ',';
	            });
	            str = str.replace(/,$/, '');
	            if (!str) {
	                return layer.msg('请输入标签');
	                // keywords = key.val();
	            }

	            $.post('/headlines/add.do', { type: 2, articleid: articleid, title: title, image: image, keywords: str, content: content }, function (data) {
	                if (data.status == '1') {
	                    layer.msg('已置顶');
	                }
	                if (data.status == '-1') {
	                    return layer.msg('已经置顶过了');
	                }
	                list.render();
	                key_layer.hide();
	                $('.editContent textarea').val('');
	                $('.editTitle input').val('');
	            }, 'json');
	        });
	        $('#list .close').on('click', function () {
	            key_layer.hide();
	            keywords = key.val('热点');
	            $('.editContent textarea').val('');
	            $('.editTitle input').val('');
	        });

	        //推送
	        var type, title, id, source;
	        container.on('click', '.post', function () {
	            $('#list .push').show();
	            title = $(this).data('title');
	            $('.push .push-title').val(title);
	            id = $(this).data('id');
	        });
	        var source_radio = $('.push-source');
	        $('.push .push-btn').on('click', function () {
	            var val = $('.push .push-title').val();
	            if (!val) {
	                return layer.msg('请输入标题');
	            }
	            source_radio.map(function (e) {
	                if ($(this).is(':checked')) {
	                    source = $(this).data('source');
	                }
	            });
	            if (typeof source == 'string' || typeof source == "undefined") {
	                return layer.msg('请选择推送平台');
	            }

	            $.post('/message/publishMessage.do', { messagetitle: val, messagecontent: val, messagetype: 7, type: 4, newsid: id, source: source }, function (data) {
	                if (data == 'success') {
	                    layer.msg('已推送');
	                    source = '';
	                    source_radio.attr('checked', false);
	                }
	                list.render();
	            });
	            $('#list .push').hide();
	        });
	        $('.push .close').on('click', function () {
	            $('#list .push').hide();
	            source = '';
	            source_radio.attr('checked', false);
	            $('.push .push-title').val('');
	        });

	        //清空
	        group.on('click', '.btn-reset', function () {
	            group.find('input').val('');
	            title = '';
	            $('#list .category1.show').val('0');
	            list.render();
	        });

	        //推荐
	        container.on('click', '.recommend', function () {
	            var isRecommend = $(this).data('recommend');
	            var text = isRecommend == '1' ? '已取消推荐' : '已推荐';
	            var status = isRecommend == '1' ? '0' : '1';
	            var id = $(this).data('id');
	            $.post('/learning/isrecommend.do', { learning_stocksId: id, recommend: status }, function (back) {
	                if (back == 'success') {
	                    layer.msg(text);
	                    list.render();
	                }
	            });
	        });
	    };

	    function compile(data) {
	        return _.map(data, function (item, i) {
	            return "<div class=\"item flex\"><input class=\"checkBox\" type=\"checkbox\" value=\"" + item.id + "\"><a href=\"" + item.link + "\" target=\"_blank\" class=\"title flex1\">" + item.title + "</a><span class=\"small category\">" + categorys[item.ltype] + "</span><span class=\"small time\">" + item.create_time + "</span><span class=\"small action\"><button class=\"delete fl\" data-id=\"" + item.id + "\">\u5220\u9664</button><button class=\"edit fl\" data-id=\"" + item.id + "\" data-index=\"" + i + "\" style=\"margin-left:8px\">\u7F16\u8F91</button><button class=\"recommend fl\" data-id=\"" + item.id + "\" data-recommend=\"" + item.recommend + "\" style=\"margin-left:8px\">" + item.txt + "</button><button class=\"toTop style" + item.backnews_type + "\" data-id='" + item.id + "' data-type='" + item.backnews_type + "'>\u7F6E\u9876</button><button class=\"post style" + item.backnews_type + "\" data-type=\"" + item.backnews_type + "\" data-title=\"" + item.title + "\" data-id=\"" + item.article_id + "\">\u63A8\u9001</button></div>";
	        }).join('');
	    }
	    var handle = function handle(arr) {
	        return _.map(arr, function (item) {
	            item.txt = item.recommend == '1' ? '已推荐' : '推荐';
	            return item;
	        });
	    };
	    return {
	        init: function init() {
	            container = $('#list');
	            head = container.find('.header');
	            items = container.find('.items');
	            group = container.find('.form-group');
	            bootpag = myBootpag(container);
	            bootpag.on('page', function (err, n) {
	                page = n;
	                list.render();
	            });
	            event();
	        },
	        render: function render() {
	            container.show();
	            getNewsList({ page: page, row: row, title: title, type: categoryVal }).done(function (data) {
	                itemsData = data.rows;
	                items.html(compile(handle(itemsData)));
	                bootpag.bootpag({ page: page, total: data.pageNumber });
	            });
	        }
	    };
	}();

	//发布资讯
	var publish = function () {
	    var container, ue, thumb, input, submit, uploadBtn, keywords, description, category, title, backnews_id, id, categoryVal;
	    //验证
	    function validate() {
	        var a = !!_.trim(title.val());
	        var b = !!_.trim(ue.getContent());
	        return a && b;
	    }

	    //表单重置
	    function reset() {
	        title.val("");
	        ue.setContent("");
	        thumb.attr('src', "");
	        input.val("");
	        keywords.val("");
	        backnews_id = "";
	        $('.classify.first').click();
	    }

	    var event = function event() {

	        //重置
	        container.on('click', '.submit .reset', function () {
	            reset();
	        });

	        //删除标签
	        $('.pub-exist').on('click', '.pub-removeTag', function () {
	            $(this).parent('.pub-exist-name').remove();
	        });

	        //提交
	        submit.on('click', _.debounce(function () {
	            if (!validate()) {
	                layer.msg("表单不能为空..");
	                return;
	            }
	            // 获取分类value
	            categoryVal = $('#publish .category1.show').val();

	            var send = {
	                id: id,
	                ltype: $('#publish .category1.show').val(),
	                title: title.val(),
	                content: ue.getContent(),
	                title_img: thumb.attr('src'),
	                keywords: keywords.val().trim()
	            };

	            $.post("/learning/create.do", send, _.debounce(function (data) {

	                if (data == "success") {
	                    layer.msg("发布成功");
	                    send = {
	                        id: '',
	                        ltype: '',
	                        title: '',
	                        content: '',
	                        title_img: '',
	                        keywords: ''
	                    };
	                    id = '';
	                    $('.item-list').click();
	                    reset();
	                } else {
	                    layer.msg('发布失败' + data);
	                }
	            }, 2000, { leading: true, trailing: false }));
	        }));

	        //上传图片
	        uploadBtn.on('click', function () {
	            myCrop.render({ width: 205, height: 130 });
	        });
	    };

	    return {
	        init: function init() {
	            container = $('#publish');
	            thumb = $("#thumb");
	            input = $("#file-upload-container");
	            submit = $('.submit button.publish');
	            uploadBtn = $('.uploadBtn');
	            category = $(".category1");
	            title = $('#news-title');
	            keywords = $("#value-keywords");

	            ue = UE.getEditor('ueditContainer', {
	                toolbars: [['undo', //撤销
	                'redo', //重做
	                'bold', //加粗
	                'indent', //首行缩进
	                'snapscreen', //截图
	                'underline', //下划线
	                'pasteplain', //纯文本粘贴模式
	                'preview', //预览
	                'horizontal', //分隔线
	                'removeformat', //清除格式
	                'fontfamily', //字体
	                'fontsize', //字号
	                'paragraph', //段落格式
	                'simpleupload', //单图上传
	                'insertimage', //多图上传
	                'link', //超链接
	                'insertvideo', //视频
	                'justifyleft', //居左对齐
	                'justifyright', //居右对齐
	                'justifycenter', //居中对齐
	                'justifyjustify', //两端对齐
	                'forecolor', //字体颜色
	                'backcolor', //背景色
	                'fullscreen', //全屏
	                'rowspacingtop', //段前距
	                'rowspacingbottom', //段后距
	                'imageleft', //左浮动
	                'imageright', //右浮动
	                'imagecenter', //居中
	                'lineheight']],
	                initialFrameHeight: 500,
	                elementPathEnabled: false,
	                wordCount: false,
	                enableContextMenu: false,
	                enableAutoSave: false,
	                pasteplain: true,
	                autotypeset: {
	                    removeClass: true,
	                    clearFontSize: true,
	                    removeEmptyline: true, //去掉空行
	                    removeEmptyNode: false, // 去掉空节点
	                    autotypeset: true,
	                    indentValue: '2em'
	                }
	            });

	            event();
	        },

	        render: function render(ops) {
	            container.show();

	            //回填数据
	            var data = _.extend({ data: null }, ops).data;
	            if (data) {
	                console.log('data', data);
	                id = data.id;
	                backnews_id = data.backnews_id;
	                title.val(data.title);
	                category.val(data.ltype);
	                thumb.attr('src', data.title_img);
	                keywords.val(data.keywords);
	                ue.setContent(data.content);
	            }
	        }
	    };
	}();

	var menu = function () {
	    var container,
	        child = {
	        list: list,
	        publish: publish
	    };

	    function showType(type, ops) {
	        $('.content-child').each(function () {
	            var id = $(this).attr('id');
	            if (id == type) {
	                $(this).css("display", "flex");
	                child[id].render(ops);
	            } else {
	                $(this).hide();
	            }
	        });
	    }

	    return {
	        init: function init() {
	            container = $('.title-1');
	            container.on('click', '.item', function () {
	                $(this).parent().find('.select').removeClass('select');
	                $(this).addClass('select');
	                showType($(this).data('type'));
	                $('.submit .reset').click();
	            });
	        },
	        show: function show(type, ops) {
	            return showType(type, ops);
	        }
	    };
	}();

	///////////////////////////////////////////////////////////////////

	$(function () {
	    publish.init();
	    list.init();
	    list.render();
	    menu.init();
	    myCrop.init();

	    //图片上传
	    myCrop.onCrop = function (imageData) {
	        $.post("/backNews/uploadImg.do", {
	            src: imageData
	        }, function (data) {
	            if (data.flag == "success") {
	                layer.msg("上传成功");
	                $("#thumb").attr('src', data.returnPath);
	            } else {
	                layer.alert("上传失败, 请重试");
	            }
	        }, 'json');
	    };
	});

	/*///////////////////////////////////////////////////////////////////*/

	var DATA = null;
	//获取新闻资讯
	//type :  ["热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻"]
	function getNewsList(ops) {
	    var defer = $.Deferred();

	    ops = _.extend({
	        type: "", //
	        page: 1,
	        row: 20,
	        title: ""
	    }, ops);

	    var send = {
	        type: ops.type,
	        currentPage: ops.page,
	        pageSize: ops.row,
	        title: ops.title
	    };

	    $.getJSON("/learning/list.do", send, function (data) {
	        DATA = data.rows;
	        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
	        defer.resolve(data);
	    });

	    return defer.promise();
	}

	//添加页码组件
	//selector支持css选择器和jquery对象
	function myBootpag(selector, ops) {
	    ops = _.extend({
	        first: true
	    }, ops);
	    var timestamp = _.now();
	    var id = "#" + timestamp;
	    var tag = "<ul id=\"" + timestamp + "\" class=\"ynpagination\"></ul>";
	    var container = function () {
	        if (typeof selector != "string") {
	            return selector;
	        } else {
	            return $(selector);
	        }
	    }();

	    container.append(tag);
	    var bootpag = $(id).bootpag({
	        total: 1,
	        page: 1,
	        maxVisible: 5,
	        firstLastUse: ops.first,
	        first: "首页",
	        last: "尾页",
	        next: "下一页",
	        prev: "上一页",
	        leaps: false
	    });
	    bootpag.hide = function () {
	        $(id).hide();
	        return bootpag;
	    };
	    bootpag.show = function () {
	        $(id).show();
	        return bootpag;
	    };
	    return bootpag;
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	   ------------------ 图片裁剪 ------------------------
	   引入cropper
	   <script src="/public/js/cropper.min.js"></script>

	   使用方法:
	   var cropper = require('../module/ui/cropper-model.js'); 导入模块
	   $(function(){
	       cropper.init(); 初始化
	       cropper.render({width, height}); 默认是(160,90)
	       cropper.onCrop = imageData => {...}  回调函数
	   }) 

	 */

	var create = function create(data) {
	    return '<div id="myCropper-overlay" class="hide"><div id="myCropper" class="line crop relative"><span class="fa fa-times-circle absolute close"></span><div class="title"><span class="myCropper-title">\u56FE\u7247\u4E0A\u4F20</span></div><div class="myCropper-content"><div class="myCropper-content-left fl"><div class="myCropper-content-title"><button class="myCropper-btn-choose">+\u9009\u62E9\u56FE\u7247</button><input type="file" class="hide" id="myCropper-input-choose" /></div><div class="myCropper-origin"><img class="myCropper-origin-image" style="max-width: 100%" /></div></div><div class="myCropper-content-right fl"><div class="title">\u56FE\u7247\u9884\u89C8</div><div class="thumb"><canvas id="myCropper-canvas" width="' + data.width + '" height="' + data.height + '" data-state="no"></canvas></div><button class="myCropper-btn-upload">\u4E0A\u4F20\u56FE\u7247</button></div></div></div></div>';
	};

	/*///////////////////////////////////////////////////////////////////*/

	__webpack_require__(2);
	__webpack_require__(6);

	module.exports = function () {
	    var overlay, container, uploadWrap, cover, fileInput, $image, canvas;
	    var props = {
	        width: 160,
	        height: 90
	    };

	    return {
	        init: function init() {
	            var _this = this;

	            $("body").append(create(props));

	            overlay = $("#myCropper-overlay");
	            overlay.height($(window).height());
	            container = $("#myCropper");
	            canvas = document.getElementById('myCropper-canvas');
	            var brush = canvas.getContext('2d');
	            var reader = new FileReader();

	            //选择文件
	            var button = container.find('.myCropper-btn-choose');
	            var btnUpload = container.find('.myCropper-btn-upload');

	            $image = container.find('.myCropper-origin-image');
	            fileInput = $('#myCropper-input-choose');
	            cover = $(".myCropper-result-image");
	            uploadWrap = container.find('.myCropper-content');

	            button.click(function () {
	                fileInput.click();
	                uploadWrap.show();
	                reset();
	            });

	            overlay.on('click', '.close', function () {
	                return overlay.hide() && reset();
	            });

	            fileInput.change(function (e) {
	                var file = this.files[0];
	                reader.readAsDataURL(file);
	            });

	            //重置
	            var reset = function reset() {
	                $(canvas).data('state', 'no');
	                fileInput.val("");
	                $image.attr('src', '').cropper('destroy');
	                brush.clearRect(0, 0, props.width, props.height);
	                cover.attr('src', '');
	            };

	            //上传文件
	            btnUpload.click(function () {
	                if ($(canvas).data('state') == "no") return layer.msg("请先选择图片"); //验证
	                var imageData = canvas.toDataURL();
	                _this.hide();
	                reset();
	                _this.onCrop(imageData);
	            });

	            reader.onload = function (e) {
	                var src = e.target.result;
	                $image.attr('src', src).cropper({
	                    aspectRatio: props.width / props.height,
	                    viewMode: 1,
	                    crop: function crop(e) {
	                        brush.drawImage($(this)[0], e.x, e.y, e.width, e.height, 0, 0, props.width, props.height);
	                        $(canvas).data('state', "yes");
	                    }
	                });
	            };
	        },
	        render: function render(ops) {
	            _.extend(props, ops);
	            canvas.width = props.width;
	            canvas.height = props.height;
	            overlay.show();
	        },
	        hide: function hide() {
	            return overlay.hide();
	        },
	        onCrop: function onCrop() {
	            return console.log("onCrop回调方法没有实现");
	        }
	    };
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./cropper.min.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./cropper.min.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "/*!\n * Cropper v3.0.0-beta\n * https://github.com/fengyuanchen/cropper\n *\n * Copyright (c) 2017 Fengyuan Chen\n * Released under the MIT license\n *\n * Date: 2017-02-25T07:44:44.656Z\n */\n\n.cropper-container{font-size:0;line-height:0;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr;-ms-touch-action:none;touch-action:none}.cropper-container img{display:block;min-width:0!important;max-width:none!important;min-height:0!important;max-height:none!important;width:100%;height:100%;image-orientation:0deg}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{position:absolute;top:0;right:0;bottom:0;left:0}.cropper-wrap-box{overflow:hidden}.cropper-drag-box{opacity:0;background-color:#fff}.cropper-modal{opacity:.5;background-color:#000}.cropper-view-box{display:block;overflow:hidden;width:100%;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75)}.cropper-dashed{position:absolute;display:block;opacity:.5;border:0 dashed #eee}.cropper-dashed.dashed-h{top:33.33333%;left:0;width:100%;height:33.33333%;border-top-width:1px;border-bottom-width:1px}.cropper-dashed.dashed-v{top:0;left:33.33333%;width:33.33333%;height:100%;border-right-width:1px;border-left-width:1px}.cropper-center{position:absolute;top:50%;left:50%;display:block;width:0;height:0;opacity:.75}.cropper-center:after,.cropper-center:before{position:absolute;display:block;content:\" \";background-color:#eee}.cropper-center:before{top:0;left:-3px;width:7px;height:1px}.cropper-center:after{top:-3px;left:0;width:1px;height:7px}.cropper-face,.cropper-line,.cropper-point{position:absolute;display:block;width:100%;height:100%;opacity:.1}.cropper-face{top:0;left:0;background-color:#fff}.cropper-line{background-color:#39f}.cropper-line.line-e{top:0;right:-3px;width:5px;cursor:e-resize}.cropper-line.line-n{top:-3px;left:0;height:5px;cursor:n-resize}.cropper-line.line-w{top:0;left:-3px;width:5px;cursor:w-resize}.cropper-line.line-s{bottom:-3px;left:0;height:5px;cursor:s-resize}.cropper-point{width:5px;height:5px;opacity:.75;background-color:#39f}.cropper-point.point-e{top:50%;right:-3px;margin-top:-3px;cursor:e-resize}.cropper-point.point-n{top:-3px;left:50%;margin-left:-3px;cursor:n-resize}.cropper-point.point-w{top:50%;left:-3px;margin-top:-3px;cursor:w-resize}.cropper-point.point-s{bottom:-3px;left:50%;margin-left:-3px;cursor:s-resize}.cropper-point.point-ne{top:-3px;right:-3px;cursor:ne-resize}.cropper-point.point-nw{top:-3px;left:-3px;cursor:nw-resize}.cropper-point.point-sw{bottom:-3px;left:-3px;cursor:sw-resize}.cropper-point.point-se{right:-3px;bottom:-3px;width:20px;height:20px;cursor:se-resize;opacity:1}@media (min-width:768px){.cropper-point.point-se{width:15px;height:15px}}@media (min-width:992px){.cropper-point.point-se{width:10px;height:10px}}@media (min-width:1200px){.cropper-point.point-se{width:5px;height:5px;opacity:.75}}.cropper-point.point-se:before{position:absolute;right:-50%;bottom:-50%;display:block;width:200%;height:200%;content:\" \";opacity:0;background-color:#39f}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.cropper-hide{position:absolute;display:block;width:0;height:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}", ""]);

	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./cropper-model.css", function() {
				var newContent = require("!!../../../node_modules/_css-loader@0.23.1@css-loader/index.js!./cropper-model.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#myCropper-overlay {\r\n    position: fixed;\r\n    top: 0;\r\n    width: 100%;\r\n    background: gray;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    z-index: 9999;\r\n    text-align: center;\r\n}\r\n\r\n#myCropper {\r\n    position: relative;\r\n    background: white;\r\n    border-radius: 4px;\r\n    margin: auto;\r\n    top: 100px;\r\n    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.15);\r\n    display: inline-block;\r\n    overflow: hidden;\r\n}\r\n\r\n#myCropper > .title {\r\n    font-size: 16px;\r\n    margin-bottom: 15px;\r\n    text-align: left;\r\n    padding: 13px 20px;\r\n    border-bottom: 1px solid rgb(220, 220, 220);\r\n}\r\n\r\n.myCropper-content {\r\n    overflow: hidden;\r\n    background: white;\r\n    margin: 30px;\r\n    text-align: left\r\n}\r\n\r\n.myCropper-content-left {\r\n    border-right: 1px dashed #c7c7c7;\r\n    padding-right: 20px;\r\n}\r\n\r\n.myCropper-btn-choose {\r\n    font-size: 13px;\r\n    background: black;\r\n    border-color: black;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.myCropper-origin {\r\n    width: 400px;\r\n    height: 300px;\r\n    background: rgb(220, 220, 220);\r\n    overflow: hidden;\r\n    float: left;\r\n}\r\n\r\n.myCropper-content-right {\r\n    margin-left: 10px;\r\n    padding-left: 10px;\r\n}\r\n\r\n.myCropper-content-right .title {\r\n    font-size: 16px;\r\n}\r\n\r\n.myCropper-content-right .thumb {\r\n    background: rgb(220, 220, 220);\r\n    margin: 10px 0;\r\n}\r\n#myCropper-canvas {\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    display: block;\r\n}\r\n.myCropper-btn-upload {\r\n    width: 160px !important;\r\n    padding: 10px;\r\n    font-size: 15px;\r\n}\r\n\r\n#myCropper-overlay .close {\r\n    font-size: 26px;\r\n    right: 10px;\r\n    top: 10px;\r\n    cursor: pointer;\r\n}\r\n", ""]);

	// exports


/***/ })
/******/ ]);