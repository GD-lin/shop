<template>
	<div class="goods-list">
		<div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
			<img src="http://img.lanrentuku.com/img/allimg/1506/5-1506151514180-L.jpg"/>
			<img src="../../assets/shuijiao.jpg" />
			<img src="/src/assets/cbd.jpg" />
			<h1 class="title">{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">{{ item.sell_price }}</span>
					<span class="old">{{ item.market_price }}</span>
				</p>
				<p class="cell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</div>
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	export default {
		data() {
			//data是往自己组件内部，挂载一些私有数据的
			return {
				pageindex: 1, //分页的页数
				goodslist:[] //存放商品列表的数组
			};
		},
		created(){
			this.getGoodsList()
		},
		methods: {
			getGoodsList() {
				//获取商品列表
				this.$http.get("api/getgoods?pageindex" + this.pageindex).then(res => {console.log(res)
					if (res.body.status === 0) {
						//this.goodslist = res.body.message;
						this.goodslist = this.goodslist.concat(res.body.message)
					} else{
						Toast('获取数据失败')
					}
				})
			},
			//加载更多
			getMore() {
				this.pageindex++;
				this.getGoodsList();
			},
			goDetail(id) {
				this.$router.push({ name: "goodsinfo", params: { id } });
			}
		},
	}
</script>

<style lang="scss" scoped>
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 7px;
		justify-content: space-between;
		
		.goods-item {
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin: 4px 0;
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 293px;
			img {
				width: 100%;
			}
			.title {
				font-size: 14px;
			}
			.info {
				background-color: #eee;
				p {
					margin: 0;
					padding: 5px;
				}
				.price{
					.now{
						color: red;
						font-weight: bold;
						font-size:16px;
						
					}
					.old{
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.cell {
					display: flex;
					justify-content: space-between;
					font-size: 13px;
				}
			}
		}
	}
</style>
