import Vue from 'vue';
import VueRouter from 'Vue-router';
Vue.use(VueRouter);
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dataStr).format(pattern)
})

//导入相关路由
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/Photolist.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'

var router = new VueRouter({
	routes: [//配置路由规则
		{path:"/",redirect:'/home'},
		{path: '/home', component: HomeContainer},
		{path: '/member', component: MemberContainer},
		{path: '/shopcar', component: ShopcarContainer},
		{path: '/search', component: SearchContainer},
        {path:'/home/newslist', component: NewsList},
		{path:'/home/newsinfo/:id', component: NewsInfo},
		{path:'/home/photolist', component: PhotoList},
		{path:'/home/goodslist', component: GoodsList},
		{path:'/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'}
	],
	linkActiveClass:'mui-active'
})
export default router