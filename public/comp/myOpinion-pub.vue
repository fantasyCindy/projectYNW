<template>
    <div>
        <div class="title-1" v-if="!isVip">发布投顾观点</div>
        <div class="title-1" v-if="isVip">发布</div>
        <div class="vip-icon" v-if="isVip"><img src="/public/images/vipact/logo.png"></div>
        <div class="pub-content">
            <el-form label-width="80px">
                <el-form-item label="栏目">
                    <el-radio-group v-model="classify">
                        <el-radio-button :label="item.value" v-for="item in category">{{item.name}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="title"></el-input>
                </el-form-item>
                <el-form-item label="预测" v-show="classify == 2">
                    <el-input placeholder="股票代码/拼音" id="stock-judge" v-model="stockTrigger" style="width:150px"></el-input>
                    <el-input placeholder="请在左侧选择股票" :disabled="true" v-model="selectStock" style="width:150px"></el-input>
                    <el-radio class="radio" v-model="stock_trend" label="0">看涨</el-radio>
                    <el-radio class="radio" v-model="stock_trend" label="1">看跌</el-radio>
                </el-form-item>
                <el-form-item label="正文">
                    <div id="ue-container"></div>
                </el-form-item>
            </el-form>
            <div class="center">
                <el-button type="primary" size="large" @click="submit(1)">保存为草稿</el-button>
                <el-button type="danger" size="large" @click="submit(0)">发布</el-button>
            </div>
        </div>
    </div>
</template>
<script>
var ue, ueInit = require('m/ui/ue.js')
var fn = require('m/lib/fn.js')

/* beautify preserve:start */

var categoryTable = {
    normal: {
        category:[  {name: "大盘", type: "normal", value:0},
                    {name: "题材", type: "normal", value:1},
                    // {name: "鉴股", type: "normal", value:2},
                    // {name: "股票学堂", type: "normal", value:3}
                    ]
    },
    vip: {
        category:[  {name: "操盘绝学", type: "vip", value:4},
                    {name: "独家内参", type: "vip", value:5}]
    }
}


var fieldsTable = {
    0:["title", "content"],
    1:["title", "content"],
    2:["title", "content", "stock", "trend"],
    3:["title", "content"],
    4:["title", "content"],
    5:["title", "content"]
}


// 验证表达式
var expressTable = {
    title: {
        invalid(){
            return !_.trim(this.title)
        },
        msg: '请输入标题'
    },
    content: {
        invalid(){
            return !_.trim(this.content)
        },
        msg: '请输入正文内容'
    },
    trend:{
        invalid(){
            return !_.trim(this.stock_trend)
        },
        msg:'请判断股票趋势'
    },
    stock:{
        invalid(){
            return !_.trim(this.selectStock)
        },
        msg:'请选择股票'
    },
}


 var sendTable = {
    '01345':function(){
         return {
            title: this.title,
             content: this.content,
             is_draft: this.is_draft,
             classify: this.classify,
             article_id:this.article_id
         }
    },
    "2": function(){
        return {
             title: this.title,
             content: this.content,
             is_draft: this.is_draft,
             classify: this.classify,
             stockcode: this.stockcode,
             stockname: this.stockname,
             stock_trend: this.stock_trend,
             article_id:this.article_id
        }
    }
}

var usetType = is_vip== "1" ? "vip" : "normal"
var isVip = is_vip== "1";
var category = categoryTable[usetType].category

/* beautify preserve:end */


export default {
    data() {
            return {
                category,
                isVip,
                usetType,
                up: "",
                down: '',
                selectStock: '',
                stockTrigger: '',


                title: "", //标题
                content: '',
                tags: "", // 推广标签
                link: "", // 推广链接
                classify: isVip ? 4 : 0, //栏目分类
                article_id: "",
                stockcode: "",
                stockname: "",
                stock_trend: "",
                is_draft: 0,
            }
        },
        methods: {

            should(type) {
                if (type == "up") {
                    this.up = "danger"
                    this.down = ""
                }
                if (type == "down") {
                    this.down = "success"
                    this.up = ""
                }
            },

            validate(need) {

                // 查询表达式, 执行验证
                var error = _.find(need, item => {
                    var express = expressTable[item];
                    var isInvalid = express.invalid.call(this, null)
                    if (isInvalid) {
                        layer.msg(express.msg)
                    }
                    return isInvalid
                })

                return !error
            },

            submit(isDraft) {
                this.is_draft = isDraft
                this.content = ue.getContent().replace(/<a.+?>|<\/a>/g, '')

                // 验证表单
                var result = this.validate(fieldsTable[this.classify]);
                if (!result) return;

                var key = _.filter(["01345", "2"], item => {
                    return item.indexOf(this.classify) != -1
                })[0]

                var send = sendTable[key].call(this, null)

                // 发布观点
                $.post("/center/addEditView.htm", send, data => {
                    data = JSON.parse(data)
                    if(data.status == 1){
                        layer.msg("发布成功")
                        this.$router.push({
                            path: '/'
                        })
                    }else () => {return layer.msg(error[data.status])}
                    
                });

            }
        },
        mounted() {
          
            if (store.editData) {
                fn.override(this.$data, store.editData)
            }

            ue = ueInit('ue-container')
            ue.ready(() => {
                ue.setContent
                if (store.editData) {
                    ue.setContent(store.editData.content)
                }
            })

            //显示股票列表
            yn.showStockList('#stock-judge input', {
                onSelect: item => {
                    this.selectStock = item.stockWrap
                    this.stockcode = item.stockCode;
                    this.stockname = item.stockName;
                    this.stockTrigger = ''
                }
            })

        },
        destroyed() {
            ue.destroy();
        }
}
</script>
