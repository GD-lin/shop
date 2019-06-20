<template>
	<div class="goodsinfo-container">
		
		<transition
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter"
		>
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<!-- 商品轮播图区域 -->
		<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" ></swiper>
					</div>
				</div>
		</div>
		<!-- 商品购买区域 -->
		<div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价： <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
						</p>
						<p>购买数量: <numbox @getcount="getSelectedCount" :max="goodsinfo.stok_quantity"></numbox></p>
						<p>
							<mt-button type="primary" size="small" >立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
			
			<div class="mui-card">
					<div class="mui-card-header">商品参数</div>
					<div class="mui-card-content">
						<div class="mui-card-content-inner">
							<p>商品货号: {{ goodsinfo.goods_no }}</p>
							<p>库存情况: {{ goodsinfo.stock_quantity }}件</p>
							<p>上架时间: {{ goodsinfo.add_time | dateFormat }}</p>
						</div>
					</div>
					<div class="mui-card-footer">
						<mt-button type="primary" size="large" plain>图文介绍</mt-button>
						<mt-button type="danger" size="large" plain>商品评论</mt-button>
					</div>
				</div>
				
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import swiper from '../subcompoents/swiper.vue'
	import numbox from '../subcompoents/goodsinfo_numbox.vue'
	
	export default {
		data() {
			return {
				id: this.$route.params.id,//将路由参数中的id挂载到data,方便后期调用
				lunbotu: [], //轮播图的数据
				goodsinfo: {},
				ballFlag: false, //控制小球隐藏和显示的标识符
				selectedCount: 1
			}
		},
		created() {
			this.getLunbotu(); 
			this.getGoodsInfo();
		}, 
		methods: {
			getLunbotu() {
				this.$http.get('https://locally.uieee.com/slides').then(res => {
					console.log(res);
					if (res.status === 200) {
						//res.body.message.foreach(item => { item.img = item.src })
						this.lunbotu = res.body;
					
						Toast('加载OK');
					} else {
						Toast('加载失败');
					}
				})
			},
			getGoodsInfo() {
				//获取商品的信息
				this.$http.get("api/goods/getinfo/" + this.id).then(res => {
					console.log(res);
					if (res.body.status === 0) {
						this.goodsinfo = res.body.message[0];
					} else{
						Toast("获取数据失败")
					}
				})
			},
			addToShopcar() {
				this.ballFlag = !this.ballFlag;
				//拼接保存到car里的商品信息对象
				var goodsinfo = {
					id: this.id,
					count: this.selectedCount,
					price: this.goodsinfo.sell_price,
					selected: true,
					title: this.goodsinfo.title
				};
				this.$store.commit("addToCar", goodsinfo )
				
			},
			
			beforeEnter(el) {
				el.style.transform = "translate(0, 0)"
			},
			enter(el, done) {
				el.offsetWidth;
				// 小球动画优化思路
				// 先分析导致动画不准确的本质原因：我们把小球最终位移到的位置，已经局限在了
				// 某一分辨率下的滚动条未滚动的情况下；
				// 只要分辨率和测试的时候不一样，或者滚动条有一定的滚蛋距离之后，问题就出现了
				// 因此，经过分析，得到结论：不能把位置的横纵座标直接写死了；而是应该根据不同情况
				// 下，动态计算这个坐标值
				// 解决思路：先得到徽标的横纵坐标，再得到小球的横纵座标，然后让Y值求差，X值也求差，得到的  				//结果就是横纵坐标要位移的距离
				//如何获取小球的位置：  domObject.getBoundingClientRect()；
				
				//获取小球的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				const badgePosition = document.getElementById("badge").getBoundingClientRect();
				
				const xDist = badgePosition.left - ballPosition.left;
				const yDist = badgePosition.top - ballPosition.top;
				
				
				el.style.transform = "translate(" + xDist + "px, " + yDist + "px)";
				el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
				done();
			},
			afterEnter(el) {
				this.ballFlag = !this.ballFlag;
			},
			getSelectedCount(count) {
				this.selectedCount = count;
				//console.log(this.selectedCount);
			}
		},
		components: {
			swiper,
			numbox
		},
		
	}
</script>

<style lang="scss" scoped>
	.goodsinfo-container {
		background-color: #eee;
		overflow: hidden;
		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}
		
		.mui-card-footer {
			display: block;
			button {
				margin: 15px 0;
			}
		}
	
		.ball {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position: absolute;
			z-index: 99;
			top: 390px;
			left: 146px;
		}
	}
</style>
