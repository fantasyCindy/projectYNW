<template>
    <div id="myOpinion">
        <div class="line top">
            <span class="title">战法统计</span>
            <a class="button-1 ynlink" id="postOpinion" @click="showPub">发布战法</a>
        </div>
        <div class="line itemsHead">
            <table>
                <tr>
                    <td class="action" @click="changeTab(0)" :class="{select:select==0}">已发布战法</td>
                    <!-- <td class="action" @click="changeTab(1)" :class="{select:select==1}">草稿箱</td> -->
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
                    <span class="info-item" v-if="!isDraft">阅读(<span class="read">{{item.viewcount}}</span>)</span>
                    <span class="info-item" v-if="!isDraft">点赞(<span class="like">{{item.zancount}}</span>)</span>
                    <span class="info-item" v-if="!isDraft">评论(<span class="comment">{{item.commentcount}}</span>)</span>
                    <button class="modify fr" @click="modify(item)">修改</button>
                    <button class="delete fr" @click="remove(item.id)">删除</button>
                </div>
            </div>
            <div class="center">
                <el-pagination :total="total" :page-size="query.pageSize" :current-page="query.currentPage" layout="prev, pager, next" @current-change="onPage"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var where = window.location.href.indexOf('yueniuwang') >= 0 ? 'ynw' : 'cj'
var error = require('e/error-type');
export default {
    data() {
            return {
                query: {
                    currentPage: 1,
                    pageSize: 10,
                    teacherid: ynTeacherId
                },
                select: 0,
                list: [],
                link: __path,
                total: ''
            }
        },
        methods: {
            makeLink(item) {
                var r = ""
                r = `/learning/${item.id}.htm`
                return r
            },
            onPage(page) {
                this.query.currentPage = page;
                this.getData()
            },
            remove(id) {
                this.$confirm("确定要删除吗", "温馨提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    callback: select => {
                        if (select == "confirm") {
                            $.post("/learning/delLearning.htm", {
                                id: id
                            }, data => {
                                data = JSON.parse(data);
                                if (data.status == "1") {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功'
                                    })
                                    this.getData()
                                    return
                                }
                                this.$message.error(error[data.status])
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
            getMyOpinion(ops) {
                /* ajax */
                _.extend(this.query, ops)
                var defer = $.Deferred();
                $.getJSON("/learning/teacherTactics.htm", this.query, data => {
                    if (data.status == 1) {
                        defer.resolve(data);
                    } else() => {
                        return layer.msg(error[data.status])
                    }
                })
                return defer.promise();
            },
            getData() {
                this.getMyOpinion().then(data => {
                    this.total = +data.data.total;
                    this.list = data.data.list;
                    $('body').velocity({
                        scroll: 0
                    }, {
                        offset: 0,
                        duration: 300
                    })
                })
            },
        },
        mounted() {
            this.getData()
        }
}
</script>
