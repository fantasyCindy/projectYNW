<template>
	<div class="topicList">
        <div class="topicList-title">
            <i class="topicList-title-icon"></i> 话题列表
            <router-link to="/topicPublish"><div class="goPublish">发布话题</div></router-link>
        </div>
        <div class="topicList-table">
            <table>
                <tr class="table-title">
                    <td class="topic-titles">标题</td>
                    <td>移动端</td>
                    <td>关注人数</td>
                    <td>评论</td>
                    <td>时间</td>
                    <td>操作</td>
                </tr>
                <tr v-show="rows.length<1">
                	<td colspan="10">
                    <div class="center none">
                        <span><i class="fa fa-exclamation-circle fa-lg"></i>暂无记录</span>
                    </div>
                </td>
                </tr>
                <tr v-for="(item,index) in rows">
                    <td class="topic-item-title"><a :href='link(item)' target="_blank">#{{item.topic_title}}#</a></td>
                    <td class="topic-item-title"><a :href='mobile_link(item)' target="_blank">#{{item.topic_title}}#</a></td>
                    <td>{{item.attention}}</td>
                    <td>{{item.commentCount}}</td>
                    <td>{{item.create_time}}</td>
                    <td class="topicDelete" @click="deleteTopic(item.id, index)">删除</td>
                </tr>
            </table>
        </div>
        <div class="page" style="height:50px;width:13%;margin:0 auto;margin-top:15px;">
            <el-pagination layout="prev, pager, next" @current-change="onPage" :total="total" :page-size="send.pageSize" :current-page="send.currentPage"></el-pagination>
         </div>
    </div>
</template>


<script>
	export default {
		data() {
			return {
				rows: [],
				send: {
				currentPage: 1,
				pageSize: 10
				},
				total: ''
			}			
		},
		methods: {
			link(item){
				var href = ''
				href = `/app/topicDetail.htm?topic_id=${item.id}`
				return href	
			},
			mobile_link(item){
				var mobile_href = ''
				mobile_href = `/app/appTopic.htm?topic_id=${item.id}`
				return mobile_href
			},
			getData(ops) {
				this.send = _.extend(this.send, ops)
				$.getJSON(__path + '/app/myTopic.htm', this.send, back => {
					this.rows = back.data.list
					this.total = back.data.total
				})
			},
			onPage(page) {
	            this.getData({currentPage: page})
	        },
			deleteTopic(id, index) {
				layer.confirm('确定删除此话题？', function(){
					$.post(__path + '/app/delTopic.htm', {topic_id: id}, back => {
						if(back.status == '1'){
							layer.msg('已删除')
							setTimeout(function(){
								window.location.reload()
							},500)					
						}
					},'json')
				})			
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>