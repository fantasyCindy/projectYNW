<template>
    <div id="teacher-refer">
        <div class="teacher-refer-list">
            <span class="top-close" @click='showNewReferList'>发售新内参</span>
            <table>
                <tr>
                    <td class="menu-item" @click="menuSelect(0)" :class="{select:select==0}">更新中</td>
                    <td class="menu-item" @click="menuSelect(1)" :class="{select:select==1}">预售中</td>
                    <td class="menu-item" @click="menuSelect(2)" :class="{select:select==2}">已完成</td>
                    <td class="menu-item" @click="menuSelect(3)" :class="{select:select==3}">审核中</td>
                </tr>
            </table>
            <table class="content">
                <tr>
                    <td>内参名称</td>
                    <td>服务周期</td>
                    <td v-show='feedVisible'>订阅人数</td>
                    <td v-show='feedVisible'>活动订阅人数</td>
                    <td v-show="statusVisible">
                        <select v-model='params.status'>
                            <option value="0">待审核</option>
                            <option value="2">未通过</option>
                        </select>
                    </td>
                    <td v-show='linkVisible'>操作</td>
                    <td v-show='deleteVisible'>编辑</td>
                    <td v-show="deleteVisible">删除</td>
                </tr>
                <tr v-show="rows.length<1">
                    <td colspan="10">
                        <div class="center none">
                            <span><i class="fa fa-exclamation-circle fa-lg"></i>暂无记录</span>
                        </div>
                    </td>
                </tr>
                <tr v-for='(item, index) in rows'>
                    <td>{{item._title}}</td>
                    <td v-if="item.referenceType == 0">无限期</td>
                    <td v-if="item.referenceType == 1">{{item._start}} <span style="margin:0 5px">至</span> {{item._end}}</td>
                    <td v-show='feedVisible'>{{item.subscribenumber}}</td>
                    <td v-show='feedVisible'>{{item.activitySubscriber}}</td>
                    <td v-show="statusVisible">{{item._statusText}}</td>
                    <td v-show="linkVisible"><a :href="'/reference/' + item.id + '.htm'" target="_blank">查看</a></td>
                    <td v-show='deleteVisible'><i class="fa fa-edit" @click='editRefer(item.id, index)'></i></td>
                    <td v-show="deleteVisible"><i class="fa fa-trash" @click='deleteRefer(item.id, index)'></i></td>
                </tr>
            </table>
            <div class="page" style="height:50px;width:13%;margin:0 auto;margin-top:15px;">
                <el-pagination layout="prev, pager, next" @current-change="onPage" :total="total" :page-size="params.pageSize" :current-page="params.currentPage"></el-pagination>
            </div>
        </div>
        <newRefer v-show="showNewRefer" :data='newReferFill'></newRefer>
    </div>
</template>
<script>
var newRefer = require('comp/refer-new.vue')
var error = require('e/error-type');
export default {
    components: {
        newRefer
    },
    data() {
        return {
            select: 0,
            params: {
                audit: "", //[0,1]是否审核
                type: ynIsTeacher ? 1 : 0, //老师or用户
                status: 0, //审核状态 0=待审核, 2=未通过
                productStatus: 0, //[0,1,2] 更新/预售/结束
                puiblisherid: ynUserId,
                currentPage: 1,
                pageSize: 10
            },
            rows: [],
            showNewRefer: false,
            // teacherReferList:true,
            newReferFill: {},
            live_path: live_path,
            total: '',
        }
    },
    watch: {
        'params.status': function(val) {
            this.getData()
        }
    },
    computed: {
        deleteVisible() {
            return this.select == 1 || (this.select == 3 && this.params.status == 2);
        },
        statusVisible() {
            return this.select == 3
        },
        feedVisible() {
            return this.select != 3
                // return false
        },
        linkVisible() {
            return this.select == 0 || this.select == 2
        }

    },

    //
    methods: {
        onPage(page) {
            this.getData({
                currentPage: page
            })
        },
        editRefer(id, index) {
            $('#myRefer .titleBar').hide()
            $('.teacher-refer-list').attr('style', 'display:none')
            $('.publish-container').attr('style', 'display:block')
            this.showNewRefer = true;
            this.newReferFill = this.rows[index];
        },
        deleteRefer(id, index) {
            layer.confirm('确定要删除吗', () => {
                $.post('/center/reference/delete.htm', {
                    referenceid: id
                }, data => {
                    data = JSON.parse(data)
                    if (data.status == '1') {
                        layer.msg("删除成功！")
                        this.rows.splice(index, 1)
                        return;
                    }else {return layer.msg(error[data.status])}
                })
            })
        },
        menuSelect(index) {
            this.select = index;
            var audit = index == 3;
            this.params.productStatus = audit ? '' : index;
            this.params.audit = audit ? "1" : "";
            this.getData();
        },
        getData(ops) {
            _.extend(this.params, ops)
            var getTime = time => (time.match(/^[^\s]+/)[0]).replace(/-/g, '.')
            var handleData = arr => {
                return _.map(arr, item => {
                    item._title = item.title.substr(0, 25)
                    if (item._title.length > 25) {
                        item._title += '...'
                    }
                    if(item.referenceType == 1){
                        item._start = getTime(item.startTime)
                        item._end = getTime(item.endTime)
                    }
                    item._statusText = ['待审核', '已通过', '未通过'][item.status]
                    return item;
                })
            }
            $.getJSON('/center/reference/list.htm', this.params, data => {
                if (data.status == 1) {
                    this.total = +data.data.total;
                    // data.pageNumber = _.max([1, Math.ceil(+data.total / this.params.pageSize)]);
                    this.rows = handleData(data.data.list);
                }else () => {return layer.msg(error[data.status])}

            })
        },
        showNewReferList() {
            // this.showNewRefer = true
            $('.teacher-refer-list').attr('style', 'display:none')
            $('.publish-container').attr('style', 'display:block')
            $('#myRefer .titleBar').hide()
        }

    },
    mounted() {
        this.getData()
    }
}
</script>
