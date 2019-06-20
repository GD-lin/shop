<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/' + item.id">
					<img class="mui-media-object mui-pull-left" src="http://img.lanrentuku.com/img/allimg/1506/5-1506031010440-L.jpg" />
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>
						<p class="mui-ellipsis">
							<span>发表时间：{{ item.add_time | dateFormat }}</span>
							<span>点击：{{ item.click }}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				newsList:[]
			}
		},
		created(){
			this.getNewList()
		},
		methods: {
			getNewList() {
				this.$http.get('api/getnewsList').then(res => {
					
					if (res.body.status === 0) {
						//如果获取数据成功，应该写到data上
						this.newsList = res.body.message;
						
					} else {
						Toast('获取新闻列表失败！')
					}
				}
				)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mui-table-view {
		li{
			h1{font-size: 14px;}
			.mui-ellipsis {
				font-size: 12px;
				color: aqua;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
