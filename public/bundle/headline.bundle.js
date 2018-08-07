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

	var categorys = ["移动资讯", "移动精选", "学炒股", "观点"];

	//资讯列表
	var list = function () {
	    var container,
	        head,
	        items,
	        ids = '',
	        title = '',
	        classif = '',
	        page = 1,
	        row = 10,
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
	                $.post('/headlines/del.do', { ids: id }, function (data) {
	                    list.render();
	                    layer.close(index);
	                });
	            });
	        });
	        //全选
	        /*
	        $('#checkAll').click(function() {
	                var input = $(this).get(0);
	                items.find('input').each(function() {
	                    this.checked = input.checked;
	                })
	            })
	         */

	        //编辑
	        container.on('click', '.edit', function () {
	            var index = $(this).data('index');
	            var itemData = itemsData[index];
	            menu.show('publish', { data: itemData });
	        });

	        //绑定相关观点
	        container.on('click', '.related', function () {
	            var id = $(this).data('id');
	            opinion.render(id);
	        });

	        //相关观点列表
	        container.on('click', '.already', function () {
	            var id = $(this).data('id');
	            alreadyList.render({ id: id });
	        });
	    };

	    function compile(data) {
	        return _.map(data, function (item, i) {
	            return "<div class=\"item flex\"><input class=\"checkBox\" type=\"checkbox\" value=\"" + item.id + "\"><a href=\"" + item._link + "\" target=\"_blank\" class=\"title flex1\">" + item.title + "</a><span class=\"small category\">" + categorys[item.type] + "</span><span class=\"small key_word\">" + item.keywords + "</span><span class=\"small time\">" + item.create_time + "</span><span class=\"small action\"><button class=\"delete\" data-id=\"" + item.id + "\">\u5220\u9664</button><button class=\"edit\" data-id=\"" + item.id + "\" data-index=\"" + i + "\">\u7F16\u8F91</button><button class=\"related\" data-id=\"" + item.id + "\"\">\u7ED1\u5B9A\u76F8\u5173\u89C2\u70B9</button><button class=\"already\" data-id=\"" + item.id + "\"\">\u76F8\u5173\u89C2\u70B9\u5217\u8868</button></div>";
	        }).join('');
	    }

	    var handle = function handle(arr) {
	        return _.map(arr, function (item) {
	            item._link = "/headlines/" + item.type + "/" + item.articleid + ".htm";
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
	            $('#relatedOpinion').hide();
	            getNewsList({ page: page, row: row }).done(function (data) {
	                itemsData = data.rows;
	                items.html(compile(handle(itemsData)));
	                bootpag.bootpag({ page: page, total: data.pageNumber });
	            });
	        }
	    };
	}();

	//观点列表
	var opinion = function () {
	    var container,
	        items,
	        bootpag,
	        page,
	        back,
	        add,
	        params = {
	        currentPage: 1,
	        pageSize: 10
	    };
	    var last = null;

	    var create = function create(arr) {
	        return _.map(arr, function (item) {
	            return "<div><span class=\"small s50 title\">" + item.title + "</span><span class=\"small s30 key_word\">" + item.createrName + "</span><button class=\"add s15\" data-artid=\"" + item.article_id + "\">\u6DFB\u52A0\u5230\u76F8\u5173\u89C2\u70B9</button></div>";
	        }).join('');
	    };

	    return {
	        init: function init() {
	            container = $('#relatedOpinion');
	            items = container.find('.relatedItems');
	            page = $('.page');
	            bootpag = myBootpag(page);
	            bootpag.on('page', function (err, n) {
	                params.currentPage = n;
	                opinion.render();
	            });

	            //返回头条列表
	            container.on('click', '.back', function () {
	                list.render();
	            });

	            //添加相关观点
	            container.on('click', '.add', function () {
	                var articleId = $(this).data('artid');
	                console.log("articleId", articleId);
	                var type = '3'; //文章类型 0 资讯 1精选 2学炒股 3观点   暂时先传3  
	                $.post('/headlines/addHeadlinesArticle.do', { headline_id: last, type: 3, article_id: articleId }, function (back) {
	                    if (back == 'success') {
	                        layer.msg('添加成功');
	                    } else {
	                        layer.msg('已经添加过了');
	                    }
	                });
	            });

	            //查询
	            container.on('click', '.query', function () {
	                var title = $('.qtitle input').val();
	                var name = $('.qname input').val();
	                opinion.render(last, { title: title, queryName: name });
	                $('.qtitle input').val('');
	                $('.qname input').val('');
	            });
	        },
	        render: function render(id, ops) {
	            _.extend(params, ops);
	            last = id;
	            $('#relatedOpinion').show();
	            $('#publish').hide();
	            $('#list').hide();
	            $.post('/article/ReleasedList.do', params, function (back) {
	                items.html(create(back.rows));
	                back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)]);
	                bootpag.bootpag({ page: params.currentPage, total: back.pageNumber });
	            }, 'json');
	        }
	    };
	}();

	//相关观点列表
	var alreadyList = function () {
	    var container,
	        items,
	        bootpag,
	        page,
	        back,
	        add,
	        params = {
	        currentPage: 1,
	        pageSize: 10
	    };

	    var create = function create(arr) {
	        return _.map(arr, function (item) {
	            return "<div><span class=\"small s50 title\">" + item.title + "</span><span class=\"small s30 key_word\">" + item.author + "</span><button class=\"delete s15\" data-id=\"" + item.id + "\">\u5220\u9664\u76F8\u5173\u89C2\u70B9</button></div>";
	        }).join('');
	    };

	    return {
	        init: function init() {
	            container = $('#alreadyOpinion');
	            items = container.find('.alreadyItems');
	            page = $('.page');
	            bootpag = myBootpag(page);
	            bootpag.on('page', function (err, n) {
	                params.currentPage = n;
	                alreadyList.render();
	            });

	            //返回头条列表
	            container.on('click', '.back', function () {
	                list.render();
	            });

	            //删除相关观点
	            container.on('click', '.delete', function () {
	                var id = $(this).data('id');
	                $.post('/headlines/delheadlinesArticle.do', { ids: id }, function (back) {
	                    if (back == 'success') {
	                        layer.msg('已删除');
	                        alreadyList.render();
	                    }
	                });
	            });
	        },
	        render: function render(ops) {
	            _.extend(params, ops);
	            container.show();
	            $('#relatedOpinion').hide();
	            $('#publish').hide();
	            $('#list').hide();
	            $.post('/headlines/headlinesArticleList.do', params, function (back) {
	                items.html(create(back.rows));
	                back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)]);
	                bootpag.bootpag({ page: params.currentPage, total: back.pageNumber });
	            }, 'json');
	        }
	    };
	}();

	//发布资讯
	var publish = function () {
	    var container, ue, thumb, input, submit, uploadBtn, keywords, content, description, category, title, backnews_id, id, categoryVal, ue;

	    //表单重置
	    function reset() {
	        title.val("");
	        thumb.attr('src', "");
	        input.val("");
	        keywords.val("热点");
	        backnews_id = "";
	        // content.val('')
	        ue.setContent('');
	    }

	    var event = function event() {

	        //重置
	        container.on('click', '.submit .reset', function () {
	            reset();
	        });

	        //提交
	        submit.on('click', _.debounce(function () {
	            if (!_.trim(title.val())) {
	                return layer.msg('标题不能为空');
	            }
	            if (!_.trim(ue.getContent())) {
	                return layer.msg('内容不能为空');
	            }

	            var send = {
	                id: id,
	                title: title.val(),
	                image: thumb.attr('src'),
	                keywords: keywords.val(),
	                content: ue.getContent()
	            };

	            $.post("/headlines/add.do", send, _.debounce(function (data) {
	                if (data == '{"status":1}') {
	                    layer.msg("已保存");
	                    reset();
	                    $('.item.select').click();
	                } else {
	                    layer.msg('保存失败' + data);
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
	            title = $('#news-title');
	            keywords = $(".keyw");
	            // content = $('.editContents textarea');
	            ue = UE.getEditor('edit-headline', {
	                toolbars: [['forecolor', //颜色
	                'bold', //加粗 
	                'indent', //缩进
	                'underline', //下划线
	                'horizontal', //分割线
	                'removeformat', //清除格式
	                'simpleupload', //单图上传
	                'justifycenter', //左对齐
	                'justifyleft', //居中
	                'fullscreen', //全屏
	                'link', //链接
	                'unlink', //取消链接
	                'lineheight']],
	                initialFrameHeight: 300,
	                elementPathEnabled: false,
	                // wordCount: true,
	                enableContextMenu: false,
	                enableAutoSave: false,
	                pasteplain: true
	                // maximumWords: 150
	            });
	            event();
	        },

	        render: function render(ops) {
	            container.show();

	            //回填数据
	            var data = _.extend({ data: null }, ops).data;
	            if (data) {
	                id = data.id;
	                title.val(data.title);
	                thumb.attr('src', data.image);
	                keywords.val(data.keywords);
	                // content.val(data.shortContent)
	                ue.setContent(data.shortContent);
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
	    opinion.init();
	    alreadyList.init();

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

	//获取新闻资讯
	//type :  ["热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻"]
	function getNewsList(ops) {
	    var defer = $.Deferred();

	    ops = _.extend({
	        page: 1,
	        row: 20
	    }, ops);

	    var send = {
	        currentPage: ops.page,
	        pageSize: ops.row
	    };

	    $.getJSON("/headlines/list.do", send, function (data) {
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