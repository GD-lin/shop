<template>
	<div class="newsinfo-container">
		<!-- 大标题 -->
		<h3 class="title">{{ newsinfo.title }}</h3>
		<!-- 子标题 -->
		<p class="subtitle">
			<span>发表时间: {{ newsinfo.add_time | dateFormat }}</span>
			<span>点击：{{ newsinfo.click }}次</span>
		</p>
		<!-- 内容区域 -->
		<div class="content" v-html="newsinfo.content"></div>
		<!-- 评论子组件区域 -->
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	import comment from '../subcompoents/comment.vue'
	
	export default {
		data() {
			return {
				id:this.$route.params.id,
				newsinfo: {}
			}
		},
		created(){
			this.getNewsInfo()
		},
		methods: {
			getNewsInfo() {
				this.$http.get('api/getnew/' + this.id).then(res => {
					
					if (res.body.status === 0) {
						this.newsinfo = res.body.message[0];
					} else {
						Toast('获取新闻失败！');
					}
				})
			}
		},
		components: {
			//注册子组件的节点
			'comment-box': comment
		},
	}
</script>

<style lang="scss" scoped>
	.newsinfo-container{
		padding: 0 4px;
		.title{
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
			color:red;
		}
		.subtitle{
			font-size: 13px;
			color: 226aff;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
