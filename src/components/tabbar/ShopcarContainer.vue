<template>
	<div class="shopcar-container">
		<div class="goods-list">
			<div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<!-- $store.getters.getGoodsSelected是一个对象
							* [item.id],对象引用其属性
							*  -->
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])" ></mt-switch>
						<img src="http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj6ckx9tlwj30u00fqk8n.jpg"/>
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p>
								<span class="price">${{ item.price }}</span>
								<numbox :goodsid="item.id" :goodscount="item.count"></numbox>
								<!-- 索引i删除goodslist里的对象，id删除store里的对象 -->
								<a href="#" @click.prevent="remove(item.id, i)">删除</a>
							</p>
						</div>
						</div>
					</div>
			</div>
			
			<div class="mui-card">
					<div class="mui-card-content">
						<div class="mui-card-content-inner jiesuan">
							<div class="left">
								<p>总计(不含运费)</p>
								<p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价 ￥<span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
							</div>
							<mt-button type="danger">去结算</mt-button>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
	
	import numbox from '../subcompoents/shopcar_numbox.vue'
	export default {
		data() {
			return {
				goodslist:[]
			}
		},
		created() {
			this.getGoodsList();
			
		},
		methods:{
			getGoodsList() {
				var idArr = [];
				this.$store.state.car.forEach(item => {
					idArr.push(item.id)
				});
				//如果购物车中没有商品，则直接返回，不需要请求接口，否则会报错
				if (idArr.length <= 0){
					return;
				}
				this.goodslist = this.$store.state.car;
				// this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(res => {
				// 	if (res.body.status === 0) {
				// 		this.goodslist = res.body.message;
				// 	}
				// })
			},
			selectedChanged(id, val) {
				this.$store.commit('updateGoodsSelected', {id, selected: val});
			},
			remove(id, index) {
				this.goodslist.splice(index, 1);
				this.$store.commit('removeFormCar', id)
			}
		},
		components: {
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-container {
		background-color: #eee;
		overflow: hidden;
		.goods-list {
			.mui-card-content-inner {
				display: flex;
				align-items: center;
			}
			img {
				width: 60px;
				height: 60px;
			}
			h1 {
				font-size: 13px;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price{color: red; font-weight: bold}
			}
		}
		.jiesuan {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red {
				color: red;
				font-size: bold;
				font-size: 16px;
			}
		}
	}
</style>
