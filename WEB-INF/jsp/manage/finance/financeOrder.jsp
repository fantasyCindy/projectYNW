<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title></title>
        <%@ include file="../common/vue.jspf" %>
<link rel="stylesheet" href="/public/v2/base/base.css?20180206">
            <link rel="stylesheet" href="${path}/manage/pages/financeOrder/financeOrder.css?0322">
                <link rel="stylesheet" href="/public/css/cropper.min.css">
    </head>

    <body>
        <div id="app">
            <div class="query-bar">
                <el-form label-width="80px" :inline="true">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="开始时间">
                                <el-date-picker size="small" v-model="param.startTime" type="date" placeholder="选择日期" change="change">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="结束时间">
                                <el-date-picker size="small" v-model="param.endTime" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="用户类型">
                                <el-select v-model="param.is_inside" placeholder="全部" size="small">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="外部" value="0"></el-option>
                                    <el-option label="内部" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="邀请码">
                                <el-input size="small" v-model="param.employeecode" style="width:120px;" placeholder="请输入邀请码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4 ">
                            <el-form-item label="选择老师">
                                <el-select v-model="param.teacherid" placeholder="全部" size="small">
                                    <el-option v-for="item in teachers" :label="item.nickname" :value="item.teacherid"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="订单类型">
                                <el-select v-model="param.orderType" placeholder="全部" size="small">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="充值" value="0"></el-option>
                                    <el-option label="打赏" value="1"></el-option>
                                    <el-option label="礼物" value="2"></el-option>
                                    <el-option label="购买产品" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="订单状态">
                                <el-select v-model="param.orderState" placeholder="全部" size="small">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="未支付" value="0"></el-option>
                                    <el-option label="已完成" value="1"></el-option>
                                    <el-option label="服务中" value="6"></el-option>
                                    <el-option label="已退款" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="订单来源">
                                <el-select v-model="param.pay_source" placeholder="全部" size="small">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="Web" value="0"></el-option>
                                    <el-option label="iOS" value="1"></el-option>
                                    <el-option label="安卓" value="2"></el-option>
                                    <el-option label="H5" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="订单号">
                                <el-input size="small" v-model="param.orderNum" style="width:120px;" placeholder="请输入订单号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4 ">
                            <el-form-item label="付款方式">
                                <el-select v-model="param.payMode" placeholder="全部" size="small">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="支付宝" value="1"></el-option>
                                    <el-option label="微信" value="2"></el-option>
                                    <el-option label="牛币" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="用户姓名">
                                <el-input size="small" v-model="param.userName" style="width:120px;" placeholder="请输入用户姓名"></el-input>
                            </el-form-item>
                        </el-col></el-row>
                </el-form>
                <div class="query-actions">
                    <el-button type="info" icon="search" @click="submit">查询</el-button>
                    <el-button type="success" icon="upload2" @click="exportFile">导出</el-button>
                    <el-button type="warning" icon="circle-close" @click="reset">清空</el-button>
                </div>
            </div>
            <!-- result -->
            <div class="chart" id="chartBar">
                <div class="wrap">
                    <div class="left">
                        <div class="items">
                            <div class="item">
                                <div class="title">投资内参总销售额</div>
                                <div class="value" id="val-refer">0</div>
                            </div>
                            <div class="item">
                                <div class="title">打赏总销售额</div>
                                <div class="value" id="val-reward">0</div>
                            </div>
                            <div class="item">
                                <div class="title">礼物总销售额</div>
                                <div class="value" id="val-gift">0</div>
                            </div>
                            <div class="item">
                                <div class="title">合计总销售额</div>
                                <div class="value red" id="val-total">0</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div id="chart-container"></div>
                    </div>
                </div>
            </div>
            <!-- list -->
            <div class="query-result">
                <table>
                    <thead>
                        <tr>
                            <td>订单用户</td>
                            <td>真实姓名</td>
                            <td>订单名称</td>
                            <td>消费类型</td>
                            <td>全部价格</td>
                            <td>优惠</td>
                            <td>实付款</td>
                            <td>支付方式</td>
                            <td>支付来源</td>
                            <td>订单状态</td>
                            <td>订单时间</td>
                            <td>订单号</td>
                            <td>注册邀请码</td>
                            <td>订单邀请码</td>
                            <td>投顾名称</td>
                            <td>服务时间</td>
                            <td>用户注册时间</td>
                            <td>订单系统来源</td>
                            <td>退款图片</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-show="list.length<1">
                            <td colspan="100%">
                                <div class="center none">
                                    <span><i class="fa fa-exclamation-circle fa-lg"></i>暂无记录</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="item in list">
                            <td>{{item.nickname}}
                                <i v-if="item.is_inside==1" class="red bold">*</i>
                            </td>
                            <td>{{item.username}}</td>
                            <td>{{item.orderName}}</td>
                            <td>{{item._goodsType}}
                                <a :href="item.contactLink" v-show="item.isRefer" style="display: none;" target="_blank">合同</a>
                                <a :href="item.agreement" v-show="item.isRefer" style="display: none;" target="_blank">风险提示</a>
                                <button @click="makePDF(item)" v-show="item.isRefer" style="display: none;" target="_blank">生成</button>
                            </td>
                            <td>{{item.totalPrice}}</td>
                            <td>--</td>
                            <td class="bold">￥{{item.actual_price}}</td>
                            <td>{{item.payMode}}</td>
                            <td>{{item.pay_source}}</td>
                            <td>{{item.payState}}</td>
                            <td>{{item.time}}</td>
                            <td>{{item.orderNum}}</td>
                            <td>{{item.userEmployeecode}}</td>
                            <td>{{item.employeecode}}</td>
                            <td>{{item.teacherName}}</td>
                            <td>{{item.referStartTime}}至{{item.referEndTime}}</td>
                            <td>{{item.userRegisterTime}}</td>
                            <td v-if="!item.system_code">未知</td>
                            <td v-if="item.system_code == 'yueniucaijing'">约牛股票</td>
                            <td v-if="item.system_code == 'yuetougu'">约投顾</td>
                            <td v-show="item.orderState == 4"><a style="width:50px;height:50px;" :href="item.refund_picture" target="_blank"><img :src='item.refund_picture' alt="" style="width:100px;"></a></td>
                            <td v-show="item.orderState == 4 ? false : true">
                                <!-- <button class="uploadImg" @click="uploadImg(item)">点击上传</button> -->
                                <input type="file" placeholder="点击上传" @change="readFile($event,item)">
                                <!-- <img style="width:100px;" src="" id="showImg" > -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination">
                    <el-pagination :total="total" :page-size="param.pageSize" @current-change="onPage" :current-page="param.currentPage"></el-pagination>
                </div>
            </div>
        </div>
                <script src="/public/js/cropper.min.js"></script>
        <script src="https://cdn.bootcss.com/highcharts/5.0.14/highcharts.js"></script>
        <script src="${path}/manage/pages/financeOrder/mmm.financeOrder.js?v=0322"></script>
    </body>

    </html>
