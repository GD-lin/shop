<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
						{{ item.title }}
					</a>

				</div>
			</div>
		</div>
		<!-- 图片列表区域 -->
		<ul>
			<li v-for="item in list" :key="item.id">
				<!-- <img v-lazy="item.img_url" /> -->
				<img :src="photo" />
			</li>
		</ul>
	</div>
</template>

<script>
	//导入mui的js文件
	import mui from '../../lib/mui/js/mui.min.js'
	
	
	export default {
		data() {
			return {
				cates: [],//所有图片分类的数组
				list: [],//图片列表
				photo: require('../../assets/shuijiao.jpg')
			}
		},
		created() {
			this.getAllCategory();
			this.getPhotoListByCateId(0);
		},
		mounted() { //当组件中的dom结构被渲染好并放到页面中后，会执行这个钩子函数
		//如果要操作元素了，最好在mounted里面，因为这里的dom元素是最新的
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods: {
			getAllCategory() {
				//获取所有图片的分类
				this.$http.get("api/getimgcategory").then(res => {
					if (res.body.status === 0) {
						//手动拼接出一个最完整的分类列表
						res.body.message.unshift({ title:"全部", id: 0  })
						this.cates = res.body.message;
					}
				})
			},
			getPhotoListByCateId(cateId) {
				this.$http.get('api/getimages/' + cateId).then(res => {
					if (res.body.status === 0) {
						this.list = res.body.message;
					}
				});
			}
		},

	}
</script>

<style lang="scss" scoped>
	* {
		touch-action: pan-y;
	}

	img[lazy="loading"] {
		width: 40px;
		height: 300px;
		margin: auto;
	}
</style>
