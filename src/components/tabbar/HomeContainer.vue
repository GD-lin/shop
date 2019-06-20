<template>
	<div>
		<!-- 轮播图区域 -->
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
		
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/newslist">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻智讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/photolist">
		                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/goodslist">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/newslist">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/newslist">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4"><router-link to="/home/newslist">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul> 
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import swiper from '../subcompoents/swiper.vue'

export default {
	data() {
		return {
			lunbotuList: []
		};
	},
	created() {
		this.getLunbotu();
	},
	methods: {
		getLunbotu() {
			//获取轮播图数据
			this.$http.get('https://locally.uieee.com/slides').then(res => {
				//
				//console.log(res.data)
				
				if (res.status === 200) {
					this.lunbotuList = res.body;

					Toast('加载OK');
				} else {
					Toast('加载失败');
				}
				//if(result.)
			});
		}
	},
	components: {
		swiper
	},
};
</script>

<style scoped lang="scss" >

.mui-grid-view.mui-grid-9 {
	background-color: #fff;
	border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	border: 0;
}
</style>
