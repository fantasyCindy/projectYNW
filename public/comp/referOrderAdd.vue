<template>

	<div class="orderList">
		<div class="list-title">新增订单</div>
		<div class="option">
			内参状态<select name="" id="" v-model="send.productStatus">
				<option value="0">更新中</option>
				<option value="1">预售中</option>
			</select>
		</div>
		<div class="query" @click="query">查询</div>
		<table border="1">
			<thead>
				<tr>
					<td>序号</td>
					<td>内参标题</td>
					<td>老师发布人</td>
					<td>内参状态</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in rows">
					<td>{{index+1}}</td>
					<td>{{item.title}}</td>
					<td>{{item.puiblisher}}</td>
					<td>{{item._productStatus}}</td>
					<td><span class="addOrder" @click="addOrder(item)">新增订单</span></td>
				</tr>
			</tbody>
		</table>
		<div class="page" style="height:50px;width:13%;margin:0 auto;margin-top:15px;">
            <el-pagination layout="prev, pager, next" @current-change="onPage" :total="total" :page-size="send.pageSize" :current-page="send.currentPage"></el-pagination>
         </div>
         <div class="addPhone" v-show="show">
            	<div class="addPhone-title">请输入手机号码</div>
            	<div class="input"><input type="text" v-model="phoneNum" /></div>
            	<span class="addBtn" @click="addBtn">添加订单</span>
            	<span class="closeBtn" @click="closed">取消</span>
            </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rows: [],
				send: {
					pageSize: 15,
					currentPage: 1,
					productStatus: 0
				},
				total: '',
				show:false,
				referid: '',
				phoneNum: ''
			}
			
		},
		methods: {
			getData(ops) {
				this.send = _.extend(this.send, ops)
				var handle = arr => {
					return _.map(arr, item => {
						item._productStatus = ['更新中','预售中'][item.productStatus]
						return item
					})
				}
				$.post('/reference/referlist.do',this.send, back => {
					this.rows = handle(back.rows)
					this.total = +back.total
				},'json')
			},
			onPage(page){
				this.send.currentPage = page
				this.getData()
			},
			query(){
				this.send.currentPage = 1
				this.getData()
			},
			addOrder(item){
				console.log('item',item)
				this.referid = item.id
				this.show = true
			},
			addBtn(){
				if(!/^1[34578][0-9]{9}$/.test(_.trim(this.phoneNum))){
					this.$message('请输入正确的手机号码')
					return
				}
				$.post('/reference/addreferOrder.do',{phone: this.phoneNum, goodsId: this.referid},back => {
					if(back == 'success'){
						this.$message({
							message: '新增订单成功',
							type: 'success'
						})
					}
					if(back == '60020'){
						this.$message({
							message: '商品已购买',
							type: 'warning'
						})
					}
					if(back == '20008'){
						this.$message.error('新增失败',)
					}
					if(back == '2'){
						this.$message.error('用户不存在')
					}
					if(back == '11'){
						this.$message.error('参数错误')
					}
				})
				this.closed()
			},
			closed(){
				this.show = false
				this.phoneNum = ''
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>