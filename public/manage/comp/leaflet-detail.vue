<template>
    <div class="leaflet-detail">
        <div class="titleBar overflow">
            <div class="value fl">编辑落地页</div>
            <div class="action fl">
                <el-button @click="gotoList">返回列表</el-button>
            </div>
        </div>
        <div class="contentBar overflow flex">
            <div class="avatar fl shrink">
                <img :src="url + image.name">
            </div>
            <!-- 编辑 -->
            <div class="contents fl grow">
                <div class="action">
                    <el-button icon="plus" type="danger" @click="dialogVisible = true">增加网址</el-button>
                </div>
                <div class="url-items">
                    <div class="item" v-for="item in items">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-input :value="path+item.url">
                                    <template slot="prepend"><a :href="path+item.url" target="_blank">网址</a></template>
                                </el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input disabled="true" :value="item.wechat">
                                    <template slot="prepend">微信号</template>
                                </el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="success" @click="edit(item)">编辑</el-button>
                                <el-button type="danger" @click="remove(item)">删除</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div style="text-align:center">
                    <el-pagination layout="prev,pager,next" small :total="total" :page-size="pageSize" @current-change="onPage"></el-pagination>
                </div>
            </div>
        </div>
        <!-- 创建弹窗 -->
        <el-dialog title="增加网址" v-model="dialogVisible">
            <el-input placeholder="请输入要绑定的微信号" v-model="newWinxin">
                <template slot="prepend">微信号</template>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="createItem">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改微信号 -->
        <el-dialog title="编辑微信" v-model="dialogWinxin">
            <el-input placeholder="请输入要绑定的微信号" v-model="editWinxin">
                <template slot="prepend">微信号</template>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWinxin = false">取 消</el-button>
                <el-button type="primary" @click="modifyWechat">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                url: store.url,
                image: {},
                items: [],
                dialogVisible: false,
                dialogWinxin: false,
                newWinxin: '', // 新创建的微信
                editWinxin: '', //要编辑的微信
                path: path,
                modifyItem: '' //要修改项
            }
        },
        computed: {
            template: function() {
                var match = this.image.name.match(/^[^.]+/)
                return match ? match[0] : ''
            }
        },
        methods: {
            onPage(page) {
                this.currentPage = page;
                this.getList()
            },
            gotoList() {
                this.$router.push({
                    path: '/'
                })
            },

            // 修改微信
            modifyWechat() {
                var valid = /^[a-zA-Z\d]{4,30}$/.test(this.editWinxin)
                if (!valid) {
                    this.$message.error('请输入有效微信号')
                    return;
                }

                $.post('/leaflet/addoredit.do', {
                    id: this.modifyItem.id,
                    wechat: _.trim(this.editWinxin),
                    template: this.template
                }, back => {
                    if (back == "success") {
                        this.$message({
                            type: 'success',
                            message: "修改成功"
                        })
                        this.dialogWinxin = false;
                        this.getList();
                        return;
                    }
                    this.$message.error(`修改失败:${back}`)
                })

            },

            // 创建网址
            createItem() {
                if (!/[a-zA-Z\d]+/.test(this.newWinxin)) {
                    this.$message.error("请输入有效微信号")
                    return;
                }

                this.dialogVisible = false;

                //创建模板
                $.post('/leaflet/addoredit.do', {
                    wechat: _.trim(this.newWinxin),
                    template: this.template
                }, back => {
                    if (back == "success") {
                        this.$message({
                            type: 'success',
                            message: "创建成功"
                        })
                        this.dialogVisible = false;
                        this.newWinxin = "";
                        this.getList();
                        return;
                    }
                    this.$message.error(`创建失败:${back}`)
                })
            },

            edit(item) {
                this.modifyItem = item;
                this.dialogWinxin = true;
                this.editWinxin = item.wechat
            },

            // 删除微信号
            remove(item) {
                this.$confirm("确定要删除吗", '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    callback: back => {
                        if (back == "confirm") {
                            $.post('/leaflet/del.do', {
                                ids: item.id
                            }, back => {
                                if (back == "success") {
                                    this.$message({
                                        type: 'success',
                                        message: "删除成功"
                                    })
                                    this.getList();
                                    return;
                                }
                            })
                        }
                    }
                })
            },

            // 获取列表数据
            getList() {
                $.getJSON('/leaflet/list.do', {
                    template: this.template,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }, back => {
                    console.log("返回的数据", back)
                    this.items = back.rows;
                    this.total = +back.total
                })
            }
        },
        mounted() {
            this.image = store.edit;
            this.getList()
        }
}
</script>
