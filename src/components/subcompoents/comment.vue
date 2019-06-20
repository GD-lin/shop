<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr />
		<textarea placeholder="请输入要BB的内容()最多吐槽120个字" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
				<div class="cmt-title">
					第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
				</div>
				<div class="cmt-body">
					{{ item.content === 'undefined' ? '此用户很懒，嘛都没说' : item.content }}
				</div>
			</div>
		</div>
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex: 1,//默认展示第一页数据
				comments: [],
				msg:''//评论输入的内容
			}
		},
		created() {
			this.getComments()
		},
		methods: {
			//获取评论
			getComments() {
				this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(res => {
					console.log(res)
					if (res.body.status === 0) {
						//this.comments = res.body.message;
						//每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
						this.comments = this.comments.concat( res.body.message)
					} else{
						Toast("获取评论失败！");
					}
				})
			},
			//加载更多
			getMore() {
				this.pageIndex++;
				this.getComments();
			},
			postComment() {
				//发表评论
				//参数1：请求url地址
				//参数2：提交给服务器的数据对象{ content:this.msg }
				//参数3：定义提交时候，表单中数据的格式 { emulateJSON: true }
				this.$http.post('api/postcomment/' + this.$route.params.id, {content: this.msg.trim()}).then(function(res){
					if (res.body.status === 0) {
						//拼接出一个评论对象
						var cmt = { user_name: '匿名用户', 
									add_time : Date.now(),
									content: this.msg.trim()
								  };
						this.comments.unshift(cmt);
						this.msg = "";
					} else{
						
					}
				})
			}
		},
		props: ["id"]
	}
</script>

<style lang="scss" scoped>
	.cmt-container {
		h3 {
			font-size: 18px;
		}
		textarea {
			font-size: 12px;
			height: 85px;
			margin: 0;
		}
		.cmt-list {
			margin: 5px 0 1px;
			.cmt-item {
				font-size: 13px;
				.cmt-title {
					line-height: 30px;
					background-color: #ccc;
				}
				.cmt-body {
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>
