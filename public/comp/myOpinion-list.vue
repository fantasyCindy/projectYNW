<template>
    <div id="myOpinion">
        <div class="line top">
            <span class="title">观点统计</span>
            <a class="button-1 ynlink" id="postOpinion" @click="showPub">发布投顾观点</a>
        </div>
        <div class="line statistics">
            <table>
                <tr class="theader">
                    <td class="power_count">总影响力</td>
                    <td class="like_count">全部点赞数量</td>
                    <td class="released_count">已发布观点数量</td>
                </tr>
                <tr class="tbody">
                    <td v-text="head.influential"></td>
                    <td v-text="head.zan_count"></td>
                    <td v-text="head.viewcount"></td>
                </tr>
            </table>
        </div>
        <div class="line itemsHead">
            <table>
                <tr>
                    <td class="action" @click="changeTab(0)" :class="{select:select==0}">已发布观点</td>
                    <td class="action" @click="changeTab(1)" :class="{select:select==1}">草稿箱</td>
                </tr>
            </table>
        </div>
        <!-- 已发布 -->
        <div class="line items release" id="opinion-list">
            <div class="nothing" v-if="list.length == 0">暂无数据</div>
            <div class="item" v-for="item in list">
                <div class="title">
                    <a :href="makeLink(item)" target="_blank">{{item.title}}</a>
                </div>
                <div class="info">
                    <span class="type">{{item.classifyName}}</span>
                    <span class="time">{{item.releasedTime}}</span>
                    <span class="info-item" v-if="!isDraft">阅读(<span class="read">{{item.viewnumber}}</span>)</span>
                    <span class="info-item" v-if="!isDraft">点赞(<span class="like">{{item.zan_count}}</span>)</span>
                    <span class="info-item" v-if="!isDraft">评论(<span class="comment">{{item.comment_count}}</span>)</span>
                    <button class="modify fr" @click="modify(item)">修改</button>
                    <button class="delete fr" @click="remove(item.article_id)">删除</button>
                </div>
            </div>
            <div class="center" v-show="!query.isDraft">
                <el-pagination :total="head.viewcount" :page-size="query.row" layout="prev, pager, next" @current-change="onPage"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var error = require('e/error-type');
var where = window.location.href.indexOf('yueniuwang') >= 0 ? 'ynw' : 'cj'
export default {
    data() {
            return {
                query: {
                    page: 1,
                    row: 10,
                    isDraft: false
                },
                select: 0,
                head: {},
                list: [],
                link: __path,
                type: ['dapan', 'ticai', 'jiangu', 'gupiaoxueyuan']
            }
        },
        methods: {
            makeLink(item) {
                var r = ""
                r = `/${this.type[item.classify]}/${ynTeacherId}/${item.article_id}.htm`
                return r
            },
            onPage(page) {
                this.query.page = page;
                this.getData()
                $(window).scrollTop(0)
            },
            remove(id) {
                this.$confirm("确定要删除吗", "温馨提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: select => {
                        if (select == "confirm") {
                            $.post("/center/addEditView.htm", {
                                article_id: id,
                                is_del: 1,
                                dr: 1
                            }, data => {
                                data = JSON.parse(data)
                                if (data.status == "1") {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功'
                                    })
                                    this.getData()
                                    return
                                }else () => {return this.$message.error(error[data.status])}
                                
                            });
                        }
                    }
                })
            },

            /* beautify preserve:start */

             modify(item) {
                store.editData = item;
                this.$router.push({path: '/pub'})
            },

            showPub() {
                store.editData = null
                this.$router.push({path: '/pub'})
            },

            /* beautify preserve:end */

            getData() {
                getMyOpinion(this.query).then(data => {
                    this.head = data.headdata;
                    this.list = data.bodydata;
                    $('body').velocity({
                        scroll: 0
                    }, {
                        offset: 0,
                        duration: 300
                    })
                })
            },

            // 切换
            changeTab(index) {
                this.select = index;
                this.query.isDraft = index == 1;
                this.query.page = 1;
                this.getData()
            }
        },
        mounted() {
            this.getData()
        }
}


/* ajax */

var getMyOpinion = function(ops) {
    ops = _.extend({
        isDraft: false, //是否草稿
        page: 1,
        row: 10
    }, ops)

    var defer = $.Deferred();
    $.getJSON("/center/queryMyView.htm", {
        is_draft: ops.isDraft ? 1 : 0,
        pageSize: ops.row,
        currentPage: ops.page
    }, data => {
        if (data.status == 1) {
            var count = ops.isDraft ? data.data.headdata.draftcount : data.data.headdata.viewcount
            defer.resolve(data.data);
        }else () => {return layer.msg(error[data.status])}
    })
    return defer.promise();
}
</script>
