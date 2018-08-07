<template>
	<div class="orderList">
		<div class="list-title">订单列表  
		<span class="totalprice">总价<span v-html="totalPrice" class="totalPrice"></span>元</span>
		<span class="totalOrder">共有<span v-html="total" class="totalPrice"></span>笔订单</span>
		</div>
		<div class="option">
			用户状态<select name="" id="" v-model="send.is_inside">
				<!-- <option value="">全部</option> -->
				<option value="0">外部用户</option>
				<!-- <option value="1">内部用户</option> -->
			</select>
		</div>
		<div class="option">
			老师<select name="" id="" v-model="send.teacherid">
				<option value="">全部老师</option>
				<option :value="item.teacherid" :label="item.nickname" v-for="item in teacherList"></option>
			</select>
		</div>
		<div class="option">
			邀请码<input type="text" v-model="send.employeeCode">
		</div>
		<div class="option">
			<el-form label-width="80px" :inline="true" style="width：400px;position:relative;top:-6px;">
				<el-form-item label="开始日期">
					<el-date-picker v-model="send.startTime" type="date" placeholder="选择开始日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束日期">
					<el-date-picker v-model="send.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
				</el-form-item>
			</el-form>
		</div>
		<div class="query" @click="query" style="position:relative;top:-1px;">查询</div>
		<div class="query export" @click="exportList" style="position:relative;top:-1px;">导出</div>
		<div class="query clean" @click="clean" style="position:relative;top:-1px;">清空</div>
		<table border="1">
			<thead>
				<tr>
					<td>序号</td>
					<td>昵称</td>
					<td>内参名称</td>
					<td>金额</td>
					<td>订单号</td>
					<td>时间</td>
					<td>是否内部用户</td>
					<td>支付来源</td>
					<td>支付方式</td>
					<td>邀请码</td>
				</tr>
			</thead>
			<tbody>
				<tr v-show="rows.length<1">
	                <td colspan="10">
	                    <div class="center none">
	                        <span><i class="fa fa-exclamation-circle fa-lg"></i>暂无记录</span>
	                    </div>
	                </td>
            	</tr>
				<tr v-for="(item,index) in rows">
					<td>{{index+1}}</td>
					<td>{{item.nickname}}</td>
					<td>{{item.orderName}}</td>
					<td>{{item.totalPrice}}</td>
					<td>{{item.orderNum}}</td>
					<td>{{item.orderTime}}</td>
					<td>{{item._isInside}}</td>
					<td>{{item._pay_source}}</td>
					<td>{{item._payMode}}</td>
					<td>{{item.employeecode}}</td>
				</tr>
			</tbody>
		</table>
		<div class="page" style="height:50px;width:13%;margin:0 auto;margin-top:15px;">
            <el-pagination layout="prev, pager, next" @current-change="onPage" :total="total" :page-size="send.pageSize" :current-page="send.currentPage"></el-pagination>
         </div>
	</div>
</template>

<script>
var formatDate = require('m/date.js')
	export default {
		data() {
			return {
				rows: [],
				send: {
					pageSize: 15,
					currentPage: 1,
					is_inside: 0,
					teacherid: '',
					employeeCode: '',
					startTime: '',
					endTime: '' 
				},
				total: '',
				totalPrice: '',
				teacherList: [],
				startTime: '',
				endTime: '',
				url: ''
			}
			
		},
		methods: {
			getData(ops) {
				this.send = _.extend(this.send, ops)
				var handle = arr => {
					return _.map(arr, item => {
						item._isInside = ['否','是'][item.is_inside]
						item._payMode = ['','支付宝','微信','IOS平台支付','余额支付','转账','后台'][item.payMode]
						item._pay_source = ['web','ios','android','H5'][item.pay_source]
						return item
					})
				}
				$.getJSON('/reference/referOrderList.do',this.send, back => {
					this.totalPrice = back.totalPrice
					this.rows = handle(back.list)
					this.total = +back.total
				})
			},
			onPage(page){
				this.send.currentPage = page
				this.getData()
			},
			query() {
				if(this.send.startTime){
					var date = new Date(this.send.startTime.getTime())
					this.send.startTime = formatDate(date,"yyyy-MM-dd HH:mm:ss")
				}
				if(this.send.endTime){
					
					var date = new Date(this.send.endTime.getTime())
					this.send.endTime = formatDate(date,"yyyy-MM-dd HH:mm:ss")
				}
				this.send.currentPage = 1
				this.getData()	
			},
			exportList() {
				var self = this
				layer.confirm("确定导出订单列表吗？",{time: 5000}, function(){
					self.url = `${path}/reference/exportOrderDetail.do?teacherid=${self.send.teacherid}&is_inside=${self.send.is_inside}&employeeCode=${self.send.employeeCode}&startTime=${self.send.startTime}&endTime=${self.send.endTime}`
					console.log("==self.url =",self.url )
					window.location.href = self.url
				})
			},
			clean() {
				this.send = {
					pageSize: 15,
					currentPage: 1,
					is_inside: '',
					teacherid: '',
					employeeCode: '',
					startTime: '',
					endTime: '' 
				}
			}
		},
		mounted() {
			this.getData()

			$.getJSON('/teacher/list.do', back => {
				this.teacherList = back.rows
			})
		}
	}
</script>